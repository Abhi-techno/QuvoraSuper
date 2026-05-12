'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ChevronRight, ArrowRight } from 'lucide-react';

const SLIDES = [
  {
    id: 'buy-sell',
    title: 'Buy & Sell Anything, Instantly',
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories — all in one place, near you',
    mainIcon: '🛒',
    badges: ['💼', '📦'],
    bgGradient: 'from-[#EBF3FF] to-[#DBEEFF]',
    accentColor: '#1A6AFF'
  },
  {
    id: 'ai-smart',
    title: 'AI That Works For You',
    subtitle: 'Smart price suggestions, auto-fill listings, fraud detection & personalised search',
    mainIcon: '🤖',
    badges: ['✨', '🔍'],
    bgGradient: 'from-[#FFF3EE] to-[#FFE8DC]',
    accentColor: '#FF6B2B'
  },
  {
    id: 'chat-safe',
    title: 'Chat & Negotiate Safely',
    subtitle: 'Message sellers directly, make offers, share location — no middlemen, no hassle',
    mainIcon: '💬',
    badges: ['🔒', '🤝'],
    bgGradient: 'from-[#E8FFF4] to-[#D1F5E8]',
    accentColor: '#10B981'
  },
  {
    id: 'language',
    title: 'Your Language, Your Way',
    subtitle: 'Use Quvora in Hindi, Tamil, Bengali & 9 more Indian languages with AI voice support',
    mainIcon: '🌐',
    badges: ['🇮🇳', '🗣️'],
    bgGradient: 'from-[#F0EEFF] to-[#E2D9FF]',
    accentColor: '#7C3AED'
  },
  {
    id: 'homes-jobs',
    title: 'Homes, Jobs & Much More',
    subtitle: 'Find rentals, post jobs, list services & access government schemes — all free to start',
    mainIcon: '🏠',
    badges: ['🚗', '💎'],
    bgGradient: 'from-[#FFFBEB] to-[#FFF3C4]',
    accentColor: '#F59E0B'
  },
  {
    id: 'community',
    title: 'Join 10 Million Indians on Quvora',
    subtitle: "Trusted. Verified. Loved. India's fastest growing career & marketplace super-app",
    mainIcon: '🚀',
    badges: ['⭐', '🎯'],
    bgGradient: 'from-[#FFF0F3] to-[#FFE0E8]',
    accentColor: '#EC4899'
  }
];

const springTransition = { type: 'spring', stiffness: 260, damping: 20 };

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    })
  };

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handleSkip = () => {
    setDirection(1);
    setIndex(SLIDES.length - 1);
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];

  return (
    <div className="fixed inset-0 bg-[#FDF8F3] flex flex-col overflow-hidden select-none">
      {/* 1. TOP PART: Navigation & Progress */}
      <header className="shrink-0 h-24 w-full flex flex-col justify-end px-8 gap-4 pt-4">
        <div className="flex justify-between items-center w-full px-1">
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === index ? 24 : 8,
                  backgroundColor: i === index ? '#1A6AFF' : '#E5E7EB',
                  opacity: i === index ? 1 : 0.5
                }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>
          <button 
            onClick={handleSkip}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-all active:scale-90"
          >
            Skip
          </button>
        </div>
      </header>

      {/* 2. CENTER PART: Illustration Canvas */}
      <main className="flex-1 relative flex items-center justify-center px-6 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="w-full flex flex-col items-center"
          >
            {/* The Compact Artwork Box */}
            <div className={cn(
              "w-full aspect-square max-h-[340px] rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center",
              currentSlide.bgGradient
            )}>
              {/* Internal Fluid Background Blobs */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-48 h-48 bg-white blur-3xl rounded-full translate-x-[-20%] translate-y-[-20%]" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/5 blur-3xl rounded-full translate-x-[20%] translate-y-[20%]" />
              </motion.div>

              {/* Pulsing Ring Interaction */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                style={{ borderColor: currentSlide.accentColor }}
                className="absolute inset-12 border-2 rounded-[3rem]"
              />

              {/* Main Floating Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, ...springTransition }}
                className="relative z-10 p-10 bg-white/40 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 flex items-center justify-center"
              >
                <span className="text-8xl leading-none drop-shadow-xl">{currentSlide.mainIcon}</span>
                
                {/* Badges */}
                {currentSlide.badges.map((emoji, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    className={cn(
                      "absolute w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg flex items-center justify-center text-xl",
                      i === 0 ? "-bottom-4 -right-4" : "-top-4 -left-4"
                    )}
                  >
                    {emoji}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM PART: Action Card */}
      <footer className="shrink-0 w-full bg-white rounded-t-[3.5rem] shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.06)] pt-12 pb-[env(safe-area-inset-bottom,2.5rem)] px-8 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3 mb-10 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-[#0D1B2A] leading-[1.1]">
              {currentSlide.title}
            </h1>
            <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[320px] flex flex-col gap-4">
          <Button 
            onClick={index === SLIDES.length - 1 ? undefined : handleNext}
            asChild={index === SLIDES.length - 1}
            className="w-full h-15 rounded-2xl font-black text-sm bg-[#1A6AFF] text-white hover:bg-[#1A6AFF]/90 shadow-2xl shadow-[#1A6AFF]/30 transition-all active:scale-95"
          >
            {index === SLIDES.length - 1 ? (
              <AuthModal 
                defaultTab="register"
                trigger={
                  <div className="flex items-center gap-2">
                    <span>CREATE FREE ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                }
              />
            ) : (
              <div className="flex items-center gap-2">
                <span>GET STARTED</span>
                <div className="flex gap-0.5 opacity-60">
                  <ChevronRight className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4 -ml-2" />
                </div>
              </div>
            )}
          </Button>

          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="text-[11px] font-bold text-muted-foreground/60 hover:text-[#1A6AFF] transition-colors">
                Already have an account? <span className="text-[#1A6AFF] font-black">Sign in</span>
              </button>
            }
          />
        </div>
      </footer>
    </div>
  );
}
