
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Smartphone, Mail, Chrome, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');

  const handleContinue = () => {
    if (value) router.push('/verify');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground px-6 pt-12 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex flex-col items-center mb-12">
        <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-3xl mb-4">Q</div>
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground mt-1">Sign in to continue</p>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              className={cn("flex-1 rounded-xl h-12 font-bold", method === 'phone' ? "bg-primary/10 text-primary" : "text-muted-foreground")}
              onClick={() => setMethod('phone')}
            >
              <Smartphone className="w-4 h-4 mr-2" /> Phone
            </Button>
            <Button 
              variant="ghost" 
              className={cn("flex-1 rounded-xl h-12 font-bold", method === 'email' ? "bg-primary/10 text-primary" : "text-muted-foreground")}
              onClick={() => setMethod('email')}
            >
              <Mail className="w-4 h-4 mr-2" /> Email
            </Button>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {method === 'phone' ? 'Mobile Number' : 'Email Address'}
            </Label>
            <div className="relative">
              {method === 'phone' && (
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">+91</span>
              )}
              <Input 
                className={cn("glass h-14 rounded-2xl border-none text-lg font-medium", method === 'phone' ? "pl-14" : "pl-4")}
                placeholder={method === 'phone' ? '9876543210' : 'name@example.com'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>

          <Button 
            className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20" 
            disabled={!value}
            onClick={handleContinue}
          >
            Send OTP
          </Button>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center"><span className="bg-background px-4 text-xs text-muted-foreground uppercase font-bold">or continue with</span></div>
        </div>

        <div className="flex flex-col gap-3">
          <Button variant="outline" className="h-14 rounded-2xl font-bold border-border bg-white text-black hover:bg-gray-50">
            <Chrome className="w-5 h-5 mr-3" /> Google
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl font-bold border-border bg-black text-white hover:bg-black/90">
            <Apple className="w-5 h-5 mr-3" /> Apple
          </Button>
        </div>
      </div>

      <div className="py-8 text-center flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          New to Quvora? <Button variant="link" className="p-0 font-bold h-auto" onClick={() => router.push('/register')}>Create account</Button>
        </p>
        <p className="text-[10px] text-muted-foreground/60 px-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
