'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ArrowRight, 
  Store, 
  Bot, 
  MessageCircle, 
  Languages, 
  Home, 
  Rocket
} from 'lucide-react';

const SLIDES = [
  {
    id: 'buy-sell',
    title: 'Buy & Sell Instantly',
    subtitle: 'Mobiles, cars, homes & 100+ categories near you',
    icon: Store,
    badge1: '💼',
    badge2: '🏷️',
    bgGradient: 'from-[#EBF3FF] to-[#DBEEFF]',
    accentColor: '#1A6AFF'
  },
  {
    id: 'ai-smart',
    title: 'AI-Powered Search',
    subtitle: 'Smart price suggestions & fraud detection built-in',
    icon: Bot,
    badge1: '✨',
    badge2: '🔍',
    bgGradient: 'from-[#FFF3EE] to-[#FFE8DC]',
    accentColor: '#FF6B2B'
  },
  {
    id: 'chat-safe',
    title: 'Negotiate Safely',
    subtitle: 'Direct peer-to-peer chat with zero middlemen',
    icon: MessageCircle,
    badge1: '🔒',
    badge2: '🤝',
    bgGradient: 'from-[#E8FFF4] to-[#D1F5E8]',
    accentColor: '#10B981'
  },
  {
    id: 'language',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your own language with AI support',
    icon: Languages,
    badge1: '🇮🇳',
    badge2: '🗣️',
    bgGradient: 'from-[#F0EEFF] to-[#E2D9FF]',
    accentColor: '#7C3AED'
  },
  {
    id: 'homes-jobs',
    title: 'Homes & Careers',
    subtitle: 'Find rentals and post jobs for free today',
    icon: Home,
    badge1: '💼',
    badge2: '💎',
    bgGradient: 'from-[#FFFBEB] to-[#FFF3C4]',
    accentColor: '#F59E0B'
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing career & marketplace ecosystem",
    icon: Rocket,
    badge1: '⭐',
    badge2: '🎯',
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
    }, 4800);
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
  const Icon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-[#FDF8F3] flex flex-col overflow-hidden select-none">
      {/* 1. TOP PART: Navigation & Progress */}
      <header className="shrink-0 h-20 w-full flex flex-col justify-end px-8 gap-4 pt-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-1.5 flex-1 max-w-[140px]">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  flex: i === index ? 2 : 1,
                  backgroundColor: i === index ? '#1A6AFF' : '#E5E7EB',
                  opacity: i === index ? 1 : 0.4
                }}
                className="h-1 rounded-full"
              />
            ))}
          </div>
          <button 
            onClick={handleSkip}
            className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 hover:text-primary transition-all active:scale-90"
          >
            Skip
          </button>
        </div>
      </header>

      {/* 2. CENTER PART: Illustration Canvas */}
      <main className="flex-1 relative flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-1 z-0">
          <div className="w-12 h-32 rounded-r-3xl glass opacity-20 -ml-4" />
          <div className="w-12 h-32 rounded-l-3xl glass opacity-20 -mr-4" />
        </div>

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
            <div className={cn(
              "w-full max-w-[280px] aspect-square rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center",
              currentSlide.bgGradient
            )}>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-white blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-black/10 blur-3xl rounded-full" />
              </motion.div>

              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                style={{ borderColor: currentSlide.accentColor }}
                className="absolute inset-8 border-2 rounded-[3rem]"
              />

              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, ...springTransition }}
                className="relative z-10 p-8 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center justify-center"
              >
                <Icon size={72} strokeWidth={1.5} style={{ color: currentSlide.accentColor }} className="drop-shadow-xl" />
                
                <motion.div
                  animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 w-11 h-11 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center text-lg border border-white/50"
                >
                  {currentSlide.badge1}
                </motion.div>
                <motion.div
                  animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 w-11 h-11 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center text-lg border border-white/50"
                >
                  {currentSlide.badge2}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM PART: High-Conversion Card */}
      <footer className="shrink-0 w-full bg-white rounded-t-[3.5rem] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.08)] pt-10 pb-[env(safe-area-inset-bottom,2rem)] px-8 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-2 mb-8 w-full"
          >
            <h1 className="text-[28px] font-black tracking-tighter text-[#0D1B2A] leading-[1.15]">
              {currentSlide.title}
            </h1>
            <p className="text-[14px] font-medium text-muted-foreground/70 leading-relaxed max-w-[260px] mx-auto px-2">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[320px] flex flex-col gap-4">
          <AnimatePresence mode="wait">
            {index === SLIDES.length - 1 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-3 w-full"
              >
                <AuthModal 
                  defaultTab="register"
                  trigger={
                    <Button className="w-full h-14 rounded-2xl font-black text-sm bg-gradient-to-r from-[#1A6AFF] to-[#3B82F6] text-white shadow-[0_10px_28px_rgba(26,106,255,0.28)] transition-all active:scale-[0.98]">
                      CREATE FREE ACCOUNT
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
                <p className="text-[10px] font-bold text-muted-foreground/60 mt-1 uppercase tracking-widest">
                  Trusted by 10M+ Indians
                </p>
              </motion.div>
            ) : (
              <Button 
                onClick={handleNext}
                className="w-full h-14 rounded-2xl font-black text-sm bg-[#1A6AFF] text-white shadow-2xl shadow-[#1A6AFF]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>GET STARTED</span>
                <div className="flex -space-x-1.5 opacity-60">
                  <ChevronRight size={16} />
                  <ChevronRight size={16} />
                </div>
              </Button>
            )}
          </AnimatePresence>

          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="text-[11px] font-bold text-muted-foreground/60 hover:text-primary transition-colors py-2">
                Already have an account? <span className="text-[#1A6AFF] font-black underline underline-offset-4">Sign in</span>
              </button>
            }
          />
        </div>
      </footer>
    </div>
  );
}
