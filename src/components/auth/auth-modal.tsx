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
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          setShowVerifyPrompt(true);
          setResendTimer(60);
          toast({ variant: "destructive", title: "Verification Required", description: "Please activate your account via email." });
          return;
        }

        router.push('/explore');
        setOpen(false);
      }
    } catch (error: any) {
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered. Please login.";
      toast({ variant: "destructive", title: "Error", description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-fit max-h-[92vh] glass-thick rounded-t-[3rem] p-0 border-none shadow-2xl gpu-accelerated focus:outline-none"
      >
        {/* iOS Drag Handle Area */}
        <div className="flex flex-col items-center pt-3 pb-2 shrink-0">
          <div className="w-10 h-1.5 bg-foreground/10 rounded-full opacity-30" />
        </div>
        
        <div className="max-w-md mx-auto flex flex-col px-6 pb-12 pt-2">
          {!showVerifyPrompt ? (
            <div>
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="w-16 h-16 rounded-[1.8rem] bg-white flex items-center justify-center mb-4 shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
                  <Image src="/icons/icon-192.png" alt="Quvora" width={40} height={40} priority />
                </div>
                <SheetHeader className="space-y-1">
                  <SheetTitle className="text-2xl font-black tracking-tighter">Welcome to Quvora</SheetTitle>
                  <SheetDescription className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/60">
                    Secure AI Marketplace
                  </SheetDescription>
                </SheetHeader>
              </div>

              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-foreground/[0.04] rounded-[1.2rem] p-1 h-12">
                  <TabsTrigger value="login" className="rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Login</TabsTrigger>
                  <TabsTrigger value="register" className="rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Join</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="mt-0 focus:outline-none">
                  <form id="login-form" onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1.5 px-1">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                          <Input className="h-14 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5 px-1">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                          <Input className="h-14 pl-12 pr-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 active:scale-90 transition-transform">
                            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.97] transition-all mt-2" disabled={loading}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                      {loading ? "Authenticating..." : "Access Dashboard"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="mt-0 focus:outline-none">
                  <form id="register-form" onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-3">
                      <div className="space-y-1.5 px-1">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                          <Input className="h-14 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="Arjun Varma" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5 px-1">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                          <Input className="h-14 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-1.5 px-1">
                        <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                          <Input className="h-14 pl-12 pr-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="Min. 6 characters" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 active:scale-90 transition-transform">
                            {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                          </button>
                        </div>
                      </div>
                      <div className="mx-1 mt-2 flex items-start gap-4 p-4 bg-primary/[0.03] rounded-3xl border border-primary/10">
                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={c => setTermsAccepted(c as boolean)} className="mt-0.5 rounded-md" />
                        <label htmlFor="terms" className="text-[10px] font-bold leading-relaxed text-foreground/60">
                          I agree to the <span className="text-primary font-black">Terms & Conditions</span> of the Quvora ecosystem.
                        </label>
                      </div>
                    </div>
                    <Button className="w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.97] transition-all mt-2" disabled={loading || !termsAccepted}>
                      {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                      {loading ? "Joining..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center mb-6 shadow-inner">
                <MailWarning className="w-10 h-10 text-primary animate-pulse" />
              </div>
              <SheetHeader className="mb-8">
                <SheetTitle className="text-3xl font-black tracking-tighter">Check your inbox</SheetTitle>
                <SheetDescription className="text-muted-foreground text-[11px] font-bold leading-relaxed px-4 uppercase tracking-tight">
                  We've sent a secure verification link to <span className="text-foreground font-black lowercase">{email}</span>. Click it to activate your dashboard.
                </SheetDescription>
              </SheetHeader>
              
              <div className="w-full space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-16 rounded-2xl border-none glass font-black text-[10px] uppercase tracking-widest shadow-sm active:scale-[0.97] transition-all"
                  disabled={resendTimer > 0}
                  onClick={handleResendEmail}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Verification Link"}
                </Button>
                
                <Button 
                  className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-foreground text-background hover:opacity-90 active:scale-[0.97] transition-all"
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
