'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

/**
 * Standard Splash Screen for Initial Entry.
 * Resolves hydration mismatch by generating random particles on client.
 */
export default function SplashScreen() {
  const router = useRouter();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Defer random generation to client mount
    const newParticles = [...Array(15)].map((_, i) => ({
      id: i,
      width: Math.floor(Math.random() * 250 + 100) + 'px',
      height: Math.floor(Math.random() * 250 + 100) + 'px',
      left: Math.floor(Math.random() * 100) + '%',
      top: Math.floor(Math.random() * 100) + '%',
      delay: (i * 0.4) + 's',
      duration: (Math.random() * 4 + 6) + 's'
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0D1B2A] overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 opacity-15">
        {particles.map((p) => (
          <div 
            key={p.id}
            className="absolute rounded-full bg-primary blur-[100px] animate-pulse"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="w-28 h-28 rounded-[2.5rem] bg-white flex items-center justify-center shadow-2xl shadow-primary/10 overflow-hidden">
          <Image src="/icons/icon-192.png" alt="Quvora" width={84} height={84} priority />
        </div>
        <div className="flex flex-col items-center gap-1.5 animate-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both">
          <h1 className="text-4xl font-black tracking-tighter text-white">Quvora</h1>
          <p className="text-white/60 text-[10px] font-black tracking-[0.35em] uppercase">One Place. Endless Possibility.</p>
        </div>
      </motion.div>

      <div className="absolute bottom-12 text-[8px] text-white/20 font-black tracking-[0.45em] uppercase animate-in fade-in duration-1000 delay-1200">
        AI Powering Your Experience
      </div>
    </div>
  );
}
