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
}

export function AppBootLoader({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Light-weight particle generation
    const newParticles = [...Array(6)].map((_, i) => ({
      id: i,
      width: (150 + i * 20) + 'px',
      height: (150 + i * 20) + 'px',
      left: (10 + i * 15) + '%',
      top: (20 + (i % 3) * 20) + '%',
      duration: 6 + i
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2000); // Snappier boot
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.02,
              filter: 'blur(8px)',
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0D1B2A] text-white"
          >
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: p.duration,
                    repeat: Infinity,
                    ease: "easeInOut"
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center shadow-2xl overflow-hidden">
                <Image 
                  src="/icons/icon-192.png" 
                  alt="Quvora" 
                  width={72} 
                  height={72} 
                  priority 
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-3xl font-black tracking-tighter">Quvora</h1>
                <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em]">Initializing AI Node</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isBooting && children}
    </>
  );
}
