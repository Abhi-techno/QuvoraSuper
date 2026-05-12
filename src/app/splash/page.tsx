'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

export default function SplashScreen() {
  const router = useRouter();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on client to avoid hydration mismatch
    const newParticles = [...Array(20)].map((_, i) => ({
      id: i,
      width: Math.random() * 300 + 100 + 'px',
      height: Math.random() * 300 + 100 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: i * 0.5 + 's',
      animationDuration: Math.random() * 5 + 5 + 's'
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1B2A] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {particles.map((p) => (
          <div 
            key={p.id}
            className="absolute rounded-full bg-primary blur-3xl animate-pulse"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <div className="w-28 h-28 rounded-3xl bg-white flex items-center justify-center shadow-2xl shadow-primary/20 animate-in zoom-in-50 duration-700 bounce-in overflow-hidden">
          <Image src="/icons/icon-192.png" alt="Quvora" width={80} height={80} priority />
        </div>
        <div className="flex flex-col items-center gap-1 animate-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <h1 className="text-4xl font-black tracking-tighter text-white">Quvora</h1>
          <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase">Your World. One Place.</p>
        </div>
      </div>

      <div className="absolute bottom-12 text-[8px] text-white/20 font-black tracking-[0.4em] uppercase animate-in fade-in duration-1000 delay-1000">
        Powered by Quvora AI
      </div>
    </div>
  );
}