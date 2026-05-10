
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
import { Chrome, Apple, Sparkles } from 'lucide-react';
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
      <SheetContent side="bottom" className="h-[75vh] glass-thick rounded-t-[2.5rem] p-0 overflow-hidden outline-none border-none">
        <div className="max-w-md mx-auto h-full flex flex-col p-8">
          <SheetHeader className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto shadow-xl animate-float">Q</div>
            <SheetTitle className="text-center text-2xl font-black tracking-tighter leading-tight">Join Quvora</SheetTitle>
            <p className="text-center text-muted-foreground text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Your world. One place.</p>
          </SheetHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 glass rounded-2xl p-1 h-11">
              <TabsTrigger value="login" className="rounded-xl font-bold text-[10px] uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-xl font-bold text-[10px] uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-white">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleMockAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone or Email</Label>
                  <Input className="glass h-12 rounded-xl border-none text-sm px-4" placeholder="name@example.com" required />
                </div>
                <Button className="w-full h-12 rounded-xl font-bold text-sm bg-primary shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? "Connecting..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <form onSubmit={handleMockAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                  <Input className="glass h-12 rounded-xl border-none text-sm px-4" placeholder="Arjun Varma" required />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</Label>
                  <Input className="glass h-12 rounded-xl border-none text-sm px-4" placeholder="+91 98765 43210" required />
                </div>
                <Button className="w-full h-12 rounded-xl font-bold text-sm bg-primary shadow-lg shadow-primary/20" disabled={loading}>
                  {loading ? "Joining..." : "Join Quvora"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted" /></div>
            <div className="relative flex justify-center"><span className="bg-transparent px-4 text-[8px] text-muted-foreground uppercase font-bold tracking-widest">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button variant="outline" onClick={handleGoogleSignIn} className="h-12 rounded-xl glass border-none font-bold text-xs uppercase tracking-wider">
              <Chrome className="w-4 h-4 mr-2" /> Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl glass border-none font-bold text-xs uppercase tracking-wider">
              <Apple className="w-4 h-4 mr-2" /> Apple
            </Button>
          </div>

          <div className="mt-auto text-center">
            <p className="text-[8px] text-muted-foreground font-medium flex items-center justify-center gap-1.5 uppercase tracking-widest">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              Secured with Liquid Glass
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
