'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

/**
 * Intelligent App Boot Sequence for Quvora.
 * Resolves hydration mismatches by generating dynamic styles on client mount.
 */
export function AppBootLoader({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particle styles strictly on client to avoid SSR mismatch
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      width: Math.floor(Math.random() * 200 + 100) + 'px',
      height: Math.floor(Math.random() * 200 + 100) + 'px',
      left: Math.floor(Math.random() * 100) + '%',
      top: Math.floor(Math.random() * 100) + '%',
      duration: 5 + i * 0.5,
      delay: i * 0.1
    }));
    setParticles(newParticles);

    // Boot duration optimized for premium perceived performance
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="boot-sequence"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.05,
              filter: 'blur(15px)',
              transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] }
            }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0D1B2A] text-white"
          >
            {/* GPU-Accelerated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 15, 0],
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: p.delay
                  }}
                  className="absolute rounded-full bg-primary blur-3xl"
                  style={{
                    width: p.width,
                    height: p.height,
                    left: p.left,
                    top: p.top,
                  }}
                />
              ))}
            </div>

            <motion.div 
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.3
              }}
              className="relative z-10 flex flex-col items-center gap-7"
            >
              <div className="w-28 h-28 rounded-[2.5rem] bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] overflow-hidden">
                <Image 
                  src="/icons/icon-192.png" 
                  alt="Quvora" 
                  width={84} 
                  height={84} 
                  priority 
                  className="animate-in fade-in zoom-in-50 duration-700" 
                />
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <h1 className="text-4xl font-black tracking-tighter">Quvora</h1>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.35em]">Your World. One App.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              className="absolute bottom-16 text-[8px] font-black text-white/20 uppercase tracking-[0.45em]"
            >
              Initializing Secure AI Node
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isBooting && children}
    </>
  );
}
