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
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, User, Eye, EyeOff, MailWarning, Loader2, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirestore } from '@/firebase';
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface RegisterSheetProps {
  trigger: React.ReactNode;
}

export function RegisterSheet({ trigger }: RegisterSheetProps) {
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast({ variant: "destructive", title: "Terms Required", description: "Please agree to the terms to continue." });
      return;
    }
    
    setLoading(true);
    try {
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
    } catch (error: any) {
      toast({ variant: "destructive", title: "Registration Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!auth.currentUser || resendTimer > 0) return;
    try {
      await sendEmailVerification(auth.currentUser);
      setResendTimer(60);
      toast({ title: "Email Sent", description: "A new verification link has been sent." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-fit max-h-[85vh] glass-thick p-0 border-none shadow-2xl gpu-accelerated focus:outline-none"
      >
        <div className="max-w-md mx-auto flex flex-col px-6 pb-10">
          {!showVerifyPrompt ? (
            <div>
              <div className="flex flex-col items-center mb-6 text-center">
                <div className="w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center mb-3 shadow-lg border border-black/5 overflow-hidden">
                  <Image src="/icons/icon-192.png" alt="Quvora" width={36} height={36} priority />
                </div>
                <SheetHeader className="space-y-1">
                  <SheetTitle className="text-xl font-black tracking-tighter">Join Quvora</SheetTitle>
                  <SheetDescription className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                    Create Your Official Identity
                  </SheetDescription>
                </SheetHeader>
              </div>

              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-2">
                  <div className="space-y-1 px-1">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input className="h-12 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="Arjun Varma" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-1 px-1">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input className="h-12 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="name@email.com" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-1 px-1">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                      <Input className="h-12 pl-12 pr-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" placeholder="Min. 6 characters" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 active:scale-90 transition-transform">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-start gap-3 p-3 bg-primary/[0.03] rounded-2xl border border-primary/10 mx-1">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={c => setTermsAccepted(c as boolean)} className="mt-0.5 rounded-md" />
                    <label htmlFor="terms" className="text-[9px] font-bold leading-relaxed text-foreground/60">
                      I agree to the <span className="text-primary font-black underline underline-offset-4">Terms & Conditions</span>.
                    </label>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.97] transition-all mt-4" disabled={loading || !termsAccepted}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  {loading ? "Joining..." : "Join Quvora"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-5 shadow-inner">
                <MailWarning className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <SheetHeader className="mb-6">
                <SheetTitle className="text-xl font-black tracking-tighter">Check Your Inbox</SheetTitle>
                <SheetDescription className="text-muted-foreground text-[10px] font-bold leading-relaxed px-4 uppercase tracking-tight">
                  Verification sent to <span className="text-foreground font-black lowercase">{email}</span>. Click it to activate.
                </SheetDescription>
              </SheetHeader>
              
              <div className="w-full space-y-2.5">
                <Button 
                  variant="outline" 
                  className="w-full h-14 rounded-2xl border-none glass font-black text-[9px] uppercase tracking-widest active:scale-[0.97] transition-all"
                  disabled={resendTimer > 0}
                  onClick={handleResendEmail}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Link"}
                </Button>
                
                <Button 
                  className="w-full h-14 rounded-2xl font-black text-[9px] uppercase tracking-widest bg-foreground text-background active:scale-[0.97] transition-all"
                  onClick={() => setShowVerifyPrompt(false)}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
