
"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.every(v => v)) router.push('/');
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground px-6 pt-12 animate-in slide-in-from-right-8 duration-500">
      <Button variant="ghost" size="icon" onClick={() => router.back()} className="mb-8 glass rounded-full">
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Enter OTP</h1>
        <p className="text-muted-foreground">We've sent a 6-digit code to your phone.</p>
      </div>

      <div className="flex justify-between gap-2 mb-8">
        {otp.map((digit, i) => (
          <Input
            key={i}
            id={`otp-${i}`}
            className="w-12 h-16 glass rounded-2xl border-none text-center text-2xl font-bold"
            maxLength={1}
            type="number"
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
          />
        ))}
      </div>

      <Button 
        className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 mb-6" 
        onClick={handleVerify}
      >
        Verify & Login
      </Button>

      <div className="text-center">
        {timer > 0 ? (
          <p className="text-sm text-muted-foreground">Resend code in <span className="font-bold text-primary">{timer}s</span></p>
        ) : (
          <Button variant="link" className="font-bold text-primary" onClick={() => setTimer(30)}>Resend OTP</Button>
        )}
      </div>
    </div>
  );
}
