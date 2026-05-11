
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Eye, EyeOff, Lock, Mail, User, ShieldCheck, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

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
          toast({ variant: "destructive", title: "Terms Required", description: "You must agree to the terms to continue." });
          setLoading(false);
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome!", description: "Account created successfully." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back!", description: "Signed in successfully." });
      }
      router.push('/explore');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Auth Error",
        description: error.message || "Failed to authenticate.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast({ variant: "destructive", title: "Email Needed", description: "Enter your email to reset password." });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: "Reset Sent", description: "Check your inbox." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[88vh] glass-thick rounded-t-[3.5rem] p-0 overflow-hidden outline-none border-none">
        {/* iOS Drag Handle */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-foreground/20 rounded-full z-50" />
        
        <div className="max-w-md mx-auto h-full flex flex-col p-8 pt-14 overflow-y-auto">
          <SheetHeader className="mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-[1.8rem] bg-primary flex items-center justify-center text-white font-black text-4xl mb-6 mx-auto shadow-2xl shadow-primary/20"
            >
              Q
            </motion.div>
            <SheetTitle className="text-center text-3xl font-black tracking-tighter leading-none">Quvora ID</SheetTitle>
            <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-[8px] font-black uppercase tracking-[0.4em]">Encrypted Security Shell</p>
            </div>
          </SheetHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass rounded-2xl p-1.5 h-14">
              <TabsTrigger value="login" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                id="login-form" 
                onSubmit={handleEmailAuth} 
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-15 rounded-2xl border-none text-sm pl-13 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="name@example.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-2">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="text-[9px] h-auto p-0 font-black uppercase tracking-widest text-primary/70"
                      onClick={handleForgotPassword}
                    >
                      Recover
                    </Button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-15 rounded-2xl border-none text-sm pl-13 pr-14 focus:ring-1 focus:ring-primary/50" 
                      placeholder="••••••••" 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button className="w-full h-15 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/30 transition-all active:scale-95 disabled:opacity-40" disabled={loading}>
                  {loading ? "Verifying..." : "Access Dashboard"}
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <motion.form 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                id="register-form" 
                onSubmit={handleEmailAuth} 
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">Display Name</Label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-15 rounded-2xl border-none text-sm pl-13 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-15 rounded-2xl border-none text-sm pl-13 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="name@example.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-2">Secure Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-15 rounded-2xl border-none text-sm pl-13 pr-14 focus:ring-1 focus:ring-primary/50" 
                      placeholder="Minimum 6 characters" 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-3 px-1">
                  <Checkbox 
                    id="terms" 
                    className="mt-1 border-white/20 data-[state=checked]:bg-primary"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className="text-[10px] font-medium leading-relaxed text-muted-foreground"
                    >
                      I agree to the <span className="text-primary font-bold">Terms of Service</span> and <span className="text-primary font-bold">Privacy Protocol</span>.
                    </label>
                  </div>
                </div>

                <Button 
                  className="w-full h-15 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/30 transition-all active:scale-95 disabled:opacity-30" 
                  disabled={loading || !termsAccepted}
                >
                  {loading ? "Initializing..." : "Join Marketplace"}
                </Button>
              </motion.form>
            </TabsContent>
          </Tabs>

          <div className="mt-auto text-center py-8">
            <p className="text-[7px] text-muted-foreground font-black flex items-center justify-center gap-2 uppercase tracking-[0.5em] opacity-30">
              <HelpCircle className="w-3 h-3 text-primary" />
              Verified Liquid Glass Protocol
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
