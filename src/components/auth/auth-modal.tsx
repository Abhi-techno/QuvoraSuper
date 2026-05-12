
'use client';

import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, User, Eye, EyeOff, MailWarning, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ trigger, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter();
  const auth = useAuth();
  const db = useFirestore();
  const { toast } = useToast();
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Verification States
  const [showVerifyPrompt, setShowVerifyPrompt] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleResendEmail = async () => {
    if (!auth.currentUser || resendTimer > 0) return;
    try {
      await sendEmailVerification(auth.currentUser);
      setResendTimer(60);
      toast({ title: "Email Sent", description: "A new verification link has been sent to your inbox." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const isRegister = (e.currentTarget as any).id === 'register-form';

    try {
      if (isRegister) {
        if (!termsAccepted) {
          toast({ variant: "destructive", title: "Terms Required", description: "Please agree to the terms to continue." });
          setLoading(false);
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Create Firestore Profile with immutable role logic
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          role: 'user',
          createdAt: serverTimestamp(),
          isVerified: false
        });

        await sendEmailVerification(userCredential.user);
        setShowVerifyPrompt(true);
        setResendTimer(60);
        toast({ title: "Account Created", description: "Please verify your email to access Quvora." });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          setShowVerifyPrompt(true);
          setResendTimer(60);
          toast({ variant: "destructive", title: "Email Not Verified", description: "Please verify your email to proceed." });
          return;
        }

        router.push('/explore');
        setOpen(false);
      }
    } catch (error: any) {
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered. Please login instead.";
      toast({ variant: "destructive", title: "Authentication Error", description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto max-h-[94vh] glass-thick rounded-t-[3rem] p-0 border-none outline-none overflow-hidden">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-black/10 rounded-full z-50" />
        
        <div className="max-w-md mx-auto h-full flex flex-col p-8 pt-10 pb-12 overflow-y-auto">
          {!showVerifyPrompt ? (
            <>
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-xl shadow-black/5 overflow-hidden border border-black/5">
                  <Image src="/icons/icon-192.png" alt="Quvora" width={48} height={48} priority />
                </div>
                <SheetTitle className="text-2xl font-black tracking-tighter">Welcome to Quvora</SheetTitle>
                <SheetDescription className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">
                  India's AI Marketplace
                </SheetDescription>
              </div>

              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/5 rounded-2xl p-1 h-12">
                  <TabsTrigger value="login" className="rounded-xl font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
                  <TabsTrigger value="register" className="rounded-xl font-black text-[10px] uppercase tracking-[0.2em] data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Join</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-0">
                  <form id="login-form" onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-12 pl-12 rounded-2xl bg-black/5 border-none font-bold text-sm" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-12 pl-12 pr-12 rounded-2xl bg-black/5 border-none font-bold text-sm" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground active:scale-90 transition-transform">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-4" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                      {loading ? "Authenticating..." : "Access Dashboard"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-0">
                  <form id="register-form" onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-12 pl-12 rounded-2xl bg-black/5 border-none font-bold text-sm" placeholder="Arjun Varma" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-12 pl-12 rounded-2xl bg-black/5 border-none font-bold text-sm" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-12 pl-12 pr-12 rounded-2xl bg-black/5 border-none font-bold text-sm" placeholder="Min. 6 chars" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground active:scale-90 transition-transform">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-2 bg-primary/5 rounded-2xl border border-primary/10">
                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={c => setTermsAccepted(c as boolean)} className="mt-0.5" />
                        <label htmlFor="terms" className="text-[10px] font-bold leading-tight text-foreground/70">
                          I agree to the <span className="text-primary font-black">Terms & Conditions</span> of Quvora.
                        </label>
                      </div>
                    </div>
                    <Button className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-[0.2em] bg-primary shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all mt-2 disabled:opacity-50" disabled={loading || !termsAccepted}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {loading ? "Joining..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500 py-6">
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 shadow-inner">
                <MailWarning className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter mb-2">Check your inbox</h2>
              <SheetDescription className="text-muted-foreground text-[11px] font-bold leading-relaxed mb-10 px-6 uppercase tracking-tight">
                We've sent a secure verification link to <span className="text-foreground font-black lowercase">{email}</span>. Click it to activate your dashboard.
              </SheetDescription>
              
              <div className="w-full space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-none glass font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-95 transition-all"
                  disabled={resendTimer > 0}
                  onClick={handleResendEmail}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Verification Link"}
                </Button>
                
                <Button 
                  className="w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-black text-white hover:bg-black/90 active:scale-95 transition-all"
                  onClick={() => setShowVerifyPrompt(false)}
                >
                  Back to Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
