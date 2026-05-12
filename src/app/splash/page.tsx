'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiquidBlob {
  id: number;
  size: string;
  left: string;
  top: string;
  color: string;
  duration: number;
  delay: number;
}

export default function SplashScreen() {
  const router = useRouter();
  const [blobs, setBlobs] = useState<LiquidBlob[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newBlobs = [...Array(4)].map((_, i) => ({
      id: i,
      size: ['300px', '400px', '500px', '350px'][i],
      left: ['-10%', '60%', '20%', '40%'][i],
      top: ['-10%', '10%', '60%', '40%'][i],
      color: i % 2 === 0 ? 'bg-primary' : 'bg-accent',
      duration: 10 + i * 2,
      delay: i * 0.5
    }));
    setBlobs(newBlobs);

    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 3500);
    return () => clearTimeout(timer);
  }, [router]);

  const springConfig = { type: "spring", stiffness: 420, damping: 30 };

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0D1B2A] overflow-hidden select-none touch-none h-svh w-full">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: blob.delay
            }}
            className={cn(
              "absolute rounded-full blur-[100px] transform-gpu",
              blob.color
            )}
            style={{
              width: blob.size,
              height: blob.size,
              left: blob.left,
              top: blob.top,
            }}
          />
        ))}
      </div>

      {/* Center Stage */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ ...springConfig, delay: 0.2 }}
          className="relative"
        >
          {/* Glowing Aura */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary/30 blur-[40px] rounded-full"
          />
          
          <div className="relative w-32 h-32 rounded-[2.5rem] bg-white flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 transform-gpu">
            <Image 
              src="/icons/icon-192.png" 
              alt="Quvora" 
              width={96} 
              height={96} 
              priority 
              className="transform-gpu"
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <motion.h1 
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ ...springConfig, delay: 0.5 }}
            className="text-5xl font-black tracking-tighter text-white"
          >
            Quvora
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <p className="text-white/40 text-[10px] font-black tracking-[0.45em] uppercase">
              One Place. Endless Possibility.
            </p>
            
            {/* Minimal Liquid Loader */}
            <div className="mt-8 w-32 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating System Status */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-[calc(3rem+env(safe-area-inset-bottom))] text-[8px] text-white font-black tracking-[0.5em] uppercase flex items-center gap-3"
      >
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        AI Engine Initialized
      </motion.div>
    </div>
  );
}
