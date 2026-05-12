'use client';

import React, { useState } from 'react';
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
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface LoginSheetProps {
  trigger: React.ReactNode;
}

export function LoginSheet({ trigger }: LoginSheetProps) {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      if (!userCredential.user.emailVerified) {
        toast({ 
          variant: "destructive", 
          title: "Verification Required", 
          description: "Please check your inbox to verify your account." 
        });
        return;
      }

      router.push('/explore');
      setOpen(false);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Login Failed", 
        description: error.message 
      });
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
        className="h-fit max-h-[85vh] glass-thick p-0 border-none shadow-2xl gpu-accelerated focus:outline-none"
      >
        <div className="max-w-md mx-auto flex flex-col px-6 pb-10 pt-2">
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-14 h-14 rounded-[1.5rem] bg-white flex items-center justify-center mb-3 shadow-lg border border-black/5 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={36} height={36} priority />
            </div>
            <SheetHeader className="space-y-1">
              <SheetTitle>Welcome Back</SheetTitle>
              <SheetDescription className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
                Secure AI Superapp Login
              </SheetDescription>
            </SheetHeader>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1.5 px-1">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <Input 
                    className="h-14 pl-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" 
                    placeholder="name@email.com" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <div className="space-y-1.5 px-1">
                <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                  <Input 
                    className="h-14 pl-12 pr-12 rounded-2xl bg-foreground/[0.04] border-none font-bold text-sm" 
                    placeholder="••••••••" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 active:scale-90 transition-transform">
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>
            </div>
            <Button 
              className="w-full h-16 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.97] transition-all mt-4" 
              disabled={loading}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ArrowRight className="w-5 h-5 mr-2" />}
              {loading ? "Verifying..." : "Login to Quvora"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-4 py-2 opacity-30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[8px] font-black uppercase tracking-widest text-foreground">End-to-End Encryption</span>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
