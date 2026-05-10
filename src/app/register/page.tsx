
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Mail, Smartphone, MapPin, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground px-6 pt-12 animate-in slide-in-from-right-8 duration-500 overflow-y-auto">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-8 glass rounded-full flex-shrink-0">
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <div className="flex flex-col gap-2 mb-8 flex-shrink-0">
        <h1 className="text-3xl font-bold">Create account</h1>
        <p className="text-muted-foreground">Join Quvora and start trading today.</p>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
            </Avatar>
            <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-primary shadow-lg">
              <Camera className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="glass h-14 rounded-2xl border-none pl-12" placeholder="Arjun Varma" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mobile Number</Label>
            <div className="relative">
              <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <span className="absolute left-12 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">+91</span>
              <Input className="glass h-14 rounded-2xl border-none pl-20" placeholder="9876543210" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address (Optional)</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="glass h-14 rounded-2xl border-none pl-12" placeholder="name@example.com" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input className="glass h-14 rounded-2xl border-none pl-12" placeholder="Mumbai, MH" />
            </div>
          </div>
        </div>

        <Button 
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20" 
          onClick={() => router.push('/verify')}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
