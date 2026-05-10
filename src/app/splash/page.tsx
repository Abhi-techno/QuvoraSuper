
"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1B2A] overflow-hidden">
      {/* Background animated particle field (Simplified for MVP) */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary blur-3xl animate-pulse"
            style={{
              width: Math.random() * 300 + 100 + 'px',
              height: Math.random() * 300 + 100 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: i * 0.5 + 's',
              animationDuration: Math.random() * 5 + 5 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-white font-bold text-6xl shadow-2xl shadow-primary/40 animate-in zoom-in-50 duration-700 bounce-in">
          Q
        </div>
        <div className="flex flex-col items-center gap-1 animate-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <h1 className="text-4xl font-bold tracking-tighter text-white">Quvora</h1>
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase">Your World. One Place.</p>
        </div>
      </div>

      <div className="absolute bottom-12 text-[10px] text-white/40 font-medium tracking-widest uppercase animate-in fade-in duration-1000 delay-1000">
        Powered by Quvora AI
      </div>
    </div>
  );
}
