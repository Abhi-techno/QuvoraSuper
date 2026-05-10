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
import { Chrome, Apple, Smartphone, Mail, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ trigger, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/explore');
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMockAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/explore');
    }, 1000);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[80vh] glass-thick rounded-t-[3rem] border-t-white/20 p-0 overflow-hidden outline-none">
        <div className="max-w-md mx-auto h-full flex flex-col p-8">
          <SheetHeader className="mb-8">
            <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center text-white font-bold text-4xl mb-6 mx-auto shadow-2xl animate-float">Q</div>
            <SheetTitle className="text-center text-3xl font-extrabold tracking-tight">Quvora Marketplace</SheetTitle>
            <p className="text-center text-muted-foreground text-sm font-medium">Your world, beautifully connected.</p>
          </SheetHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10 glass rounded-[1.25rem] p-1.5 h-14">
              <TabsTrigger value="login" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-bold data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <form onSubmit={handleMockAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone or Email</Label>
                  <div className="relative group">
                    <Input className="glass h-14 rounded-2xl border-none text-lg px-5 focus-visible:ring-primary/50 transition-all" placeholder="name@example.com" required />
                  </div>
                </div>
                <Button className="w-full h-14 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 active:scale-95 transition-all" disabled={loading}>
                  {loading ? "Connecting..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <form onSubmit={handleMockAuth} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <Input className="glass h-14 rounded-2xl border-none text-lg px-5" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                  <Input className="glass h-14 rounded-2xl border-none text-lg px-5" placeholder="+91 98765 43210" required />
                </div>
                <Button className="w-full h-14 rounded-2xl font-bold text-xl shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 active:scale-95 transition-all" disabled={loading}>
                  {loading ? "Joining..." : "Join Quvora"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="bg-background/0 px-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <Button variant="outline" onClick={handleGoogleSignIn} className="h-14 rounded-2xl glass border-none font-bold text-md active:scale-95 transition-all">
              <Chrome className="w-5 h-5 mr-2" /> Google
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl glass border-none font-bold text-md active:scale-95 transition-all">
              <Apple className="w-5 h-5 mr-2" /> Apple
            </Button>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 text-center">
            <p className="text-[10px] text-muted-foreground font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              Secured with Liquid Glass Encryption
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}