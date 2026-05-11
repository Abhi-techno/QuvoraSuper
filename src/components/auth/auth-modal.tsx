"use client";

import React, { useState } from 'react';
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
import { Sparkles, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (defaultTab === 'register' || (e.currentTarget as any).id === 'register-form') {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome to Quvora!", description: "Your account has been created." });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: "Welcome back!", description: "Signed in successfully." });
      }
      router.push('/explore');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Please check your credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[75vh] glass-thick rounded-t-[3rem] p-0 overflow-hidden outline-none border-none">
        <div className="max-w-md mx-auto h-full flex flex-col p-8 pt-10">
          <SheetHeader className="mb-10">
            <div className="w-14 h-14 rounded-[1.5rem] bg-primary flex items-center justify-center text-white font-black text-3xl mb-4 mx-auto shadow-2xl animate-float">Q</div>
            <SheetTitle className="text-center text-3xl font-black tracking-tighter leading-none">Quvora ID</SheetTitle>
            <p className="text-center text-muted-foreground text-[8px] font-black uppercase tracking-[0.4em] mt-3 opacity-60">Pure Glass Identification</p>
          </SheetHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass rounded-2xl p-1 h-12">
              <TabsTrigger value="login" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <form onSubmit={handleEmailAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-14 rounded-2xl border-none text-sm pl-12 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="name@example.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Password</Label>
                    <Button variant="link" className="text-[9px] h-auto p-0 font-black uppercase tracking-widest text-primary/70">Forgot?</Button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-14 rounded-2xl border-none text-sm pl-12 pr-12 focus:ring-1 focus:ring-primary/50" 
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
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/20 transition-all active:scale-95" disabled={loading}>
                  {loading ? "Authenticating..." : "Sign In to Quvora"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <form id="register-form" onSubmit={handleEmailAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-14 rounded-2xl border-none text-sm pl-12 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="Arjun Varma" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-14 rounded-2xl border-none text-sm pl-12 pr-5 focus:ring-1 focus:ring-primary/50" 
                      placeholder="name@example.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      className="glass h-14 rounded-2xl border-none text-sm pl-12 pr-12 focus:ring-1 focus:ring-primary/50" 
                      placeholder="Create Password" 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-black text-sm bg-primary shadow-xl shadow-primary/20 transition-all active:scale-95" disabled={loading}>
                  {loading ? "Creating Account..." : "Join Quvora"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-auto text-center pb-6">
            <p className="text-[7px] text-muted-foreground font-black flex items-center justify-center gap-2 uppercase tracking-[0.4em] opacity-40">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              Liquid Glass Authentication
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}