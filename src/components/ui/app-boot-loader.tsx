'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  width: string;
  height: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
}

export function AppBootLoader({ children }: { children: React.ReactNode }) {
  const [isBooting, setIsBooting] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles only on the client to avoid hydration mismatch
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      width: Math.random() * 200 + 100 + 'px',
      height: Math.random() * 200 + 100 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      duration: 5 + i,
      delay: i * 0.2
    }));
    setParticles(newParticles);

    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              filter: 'blur(20px)',
              transition: { duration: 0.8, ease: [0.32, 0, 0.67, 0] }
            }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#0D1B2A] text-white"
          >
            {/* Animated Particle Field */}
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
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
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.2
              }}
              className="relative z-10 flex flex-col items-center gap-6"
            >
              <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center text-white font-black text-6xl shadow-[0_0_50px_rgba(26,106,255,0.4)]">
                Q
              </div>
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-4xl font-black tracking-tighter">Quvora</h1>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">AI Superapp</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-16 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]"
            >
              Establishing Secure Node
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isBooting && children}
    </>
  );
}