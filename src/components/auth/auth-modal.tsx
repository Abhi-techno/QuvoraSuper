
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
import { Lock, Mail, User, Eye, EyeOff, ShieldCheck, MailWarning, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
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
      toast({ title: "Email Sent", description: "Verification link sent to your inbox." });
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
        
        // Create Firestore Profile
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name,
          email,
          role: 'user', // System default, not changeable by user
          createdAt: serverTimestamp(),
          isVerified: false
        });

        await sendEmailVerification(userCredential.user);
        setShowVerifyPrompt(true);
        setResendTimer(60);
        toast({ title: "Verification Sent", description: "Please check your email to verify your account." });
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          setShowVerifyPrompt(true);
          setResendTimer(60);
          toast({ variant: "destructive", title: "Email Not Verified", description: "Please verify your email to access the dashboard." });
          return;
        }

        router.push('/explore');
        setOpen(false);
      }
    } catch (error: any) {
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') msg = "This email is already registered. Please login.";
      toast({ variant: "destructive", title: "Auth Error", description: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[92vh] glass rounded-t-[3rem] p-0 border-none outline-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/10 rounded-full" />
        
        <div className="max-w-md mx-auto h-full flex flex-col p-8 pt-14 overflow-y-auto pb-12">
          {!showVerifyPrompt ? (
            <>
              <SheetHeader className="mb-10 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-black/5 overflow-hidden">
                  <Image src="/icons/icon-192.png" alt="Quvora" width={64} height={64} priority />
                </div>
                <SheetTitle className="text-3xl font-black tracking-tight">Access Quvora</SheetTitle>
                <SheetDescription className="text-muted-foreground text-sm font-medium mt-1">
                  India's secure AI marketplace.
                </SheetDescription>
              </SheetHeader>

              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 rounded-2xl p-1 h-14">
                  <TabsTrigger value="login" className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
                  <TabsTrigger value="register" className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Join</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form id="login-form" onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-14 pl-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-14 pl-12 pr-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="••••••••" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full h-14 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/20" disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {loading ? "Verifying..." : "Access Dashboard"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form id="register-form" onSubmit={handleAuth} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-14 pl-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="Arjun Varma" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-14 pl-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input className="h-14 pl-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="Min 6 characters" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-1">
                        <Checkbox id="terms" checked={termsAccepted} onCheckedChange={c => setTermsAccepted(c as boolean)} />
                        <label htmlFor="terms" className="text-[10px] font-medium leading-tight text-muted-foreground">
                          I agree to the <span className="text-primary font-bold">Terms & Conditions</span> of Quvora.
                        </label>
                      </div>
                    </div>
                    <Button className="w-full h-14 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/20" disabled={loading || !termsAccepted}>
                      {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                      {loading ? "Initializing..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-500 py-10">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8">
                <MailWarning className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-black tracking-tight mb-2">Verify your email</h2>
              <SheetDescription className="text-muted-foreground text-sm font-medium mb-10 px-4">
                We've sent a link to <span className="font-bold text-foreground">{email}</span>. Please click it to activate your account.
              </SheetDescription>
              
              <div className="w-full space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-none glass-thick font-bold"
                  disabled={resendTimer > 0}
                  onClick={handleResendEmail}
                >
                  {resendTimer > 0 ? `Resend available in ${resendTimer}s` : "Resend Verification Email"}
                </Button>
                
                <Button 
                  className="w-full h-14 rounded-2xl font-black bg-primary text-white"
                  onClick={() => setShowVerifyPrompt(false)}
                >
                  Return to Login
                </Button>
              </div>
              
              <p className="mt-8 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Check your spam folder if you don't see it.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
