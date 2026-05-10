
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chrome, Apple, Smartphone, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  trigger: React.ReactNode;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ trigger, defaultTab = 'login' }: AuthModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In a real app, this would call Firebase Auth
    // Mocking success for demo purposes
    setTimeout(() => {
      setLoading(false);
      router.push('/explore');
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] glass-thick border-white/10 rounded-[2rem] p-0 overflow-hidden">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">Q</div>
            <DialogTitle className="text-center text-2xl font-bold">Quvora Marketplace</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 glass rounded-xl">
              <TabsTrigger value="login" className="rounded-lg">Login</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Phone or Email</Label>
                  <Input className="glass h-12 rounded-xl border-none" placeholder="name@example.com" required />
                </div>
                <Button className="w-full h-12 rounded-xl font-bold text-lg" disabled={loading}>
                  {loading ? "Connecting..." : "Continue"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Full Name</Label>
                  <Input className="glass h-12 rounded-xl border-none" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-muted-foreground ml-1">Phone Number</Label>
                  <Input className="glass h-12 rounded-xl border-none" placeholder="+91 98765 43210" required />
                </div>
                <Button className="w-full h-12 rounded-xl font-bold text-lg" disabled={loading}>
                  {loading ? "Creating Account..." : "Join Quvora"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-4 text-[10px] text-muted-foreground uppercase font-bold">or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl glass border-none font-bold">
              <Chrome className="w-4 h-4 mr-2" /> Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl glass border-none font-bold">
              <Apple className="w-4 h-4 mr-2" /> Apple
            </Button>
          </div>
        </div>

        <div className="bg-primary/5 p-4 text-center">
          <p className="text-[10px] text-muted-foreground">
            By continuing, you agree to our <span className="text-primary cursor-pointer">Terms</span> & <span className="text-primary cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
