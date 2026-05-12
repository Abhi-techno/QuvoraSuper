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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, User, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ trigger, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const isRegister = (e.currentTarget as any).id === 'register-form';
      
      if (isRegister) {
        if (!termsAccepted) {
          toast({ variant: "destructive", title: "Terms Required", description: "Please agree to the terms." });
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome!", description: "Your account is ready." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back!", description: "Signed in successfully." });
      }
      router.push('/explore');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Auth Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[92vh] glass rounded-t-[3rem] p-0 border-none outline-none">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/10 rounded-full" />
        
        <div className="max-w-md mx-auto h-full flex flex-col p-8 pt-14">
          <SheetHeader className="mb-10 text-center">
            <div className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center mb-6 mx-auto shadow-2xl shadow-black/5 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={64} height={64} priority />
            </div>
            <SheetTitle className="text-3xl font-black tracking-tight">Access Quvora</SheetTitle>
            <SheetDescription className="text-muted-foreground text-sm font-medium mt-1">
              Direct Email & Password Authentication
            </SheetDescription>
          </SheetHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/5 rounded-2xl p-1 h-14">
              <TabsTrigger value="login" className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all">Join</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form id="login-form" onSubmit={handleEmailAuth} className="space-y-6">
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
                  {loading ? "Verifying..." : "Access Dashboard"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form id="register-form" onSubmit={handleEmailAuth} className="space-y-6">
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
                      <Input className="h-14 pl-12 rounded-2xl bg-black/5 border-none font-medium" placeholder="Min 6 characters" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-1">
                    <Checkbox id="terms" checked={termsAccepted} onCheckedChange={c => setTermsAccepted(c as boolean)} />
                    <label htmlFor="terms" className="text-[10px] font-medium leading-tight text-muted-foreground">
                      I agree to the <span className="text-primary font-bold">Terms of Service</span>.
                    </label>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/20" disabled={loading || !termsAccepted}>
                  {loading ? "Initializing..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}