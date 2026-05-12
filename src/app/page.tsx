'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';
import { 
  Store, 
  Bot, 
  MessageCircle, 
  Languages, 
  Briefcase, 
  Rocket,
  ArrowRight,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Shield
} from 'lucide-react';
import Image from 'next/image';

const SLIDES = [
  {
    id: 'marketplace',
    title: 'Buy & Sell Anything',
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories near you',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-50 to-blue-100/50',
    badges: [Zap, ShieldCheck]
  },
  {
    id: 'ai-engine',
    title: 'AI-Powered Insights',
    subtitle: 'Smart price suggestions, auto-fill & fraud detection',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-50 to-orange-100/50',
    badges: [Sparkles, Zap]
  },
  {
    id: 'secure-chat',
    title: 'Secure Peer Chat',
    subtitle: 'Direct peer-to-peer chat with AI safety scanning',
    icon: MessageCircle,
    color: '#10B981',
    bg: 'from-emerald-50 to-emerald-100/50',
    badges: [Shield, MessageCircle]
  },
  {
    id: 'languages',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your native tongue with AI voice support',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-50 to-purple-100/50',
    badges: [Languages, Sparkles]
  },
  {
    id: 'careers',
    title: 'Jobs & Rentals',
    subtitle: 'Find your next home or career move for free today',
    icon: Briefcase,
    color: '#F59E0B',
    bg: 'from-amber-50 to-amber-100/50',
    badges: [Briefcase, Star]
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing AI marketplace super-app",
    icon: Rocket,
    color: '#EC4899',
    bg: 'from-pink-50 to-pink-100/50',
    badges: [Rocket, ShieldCheck]
  }
];

const AUTO_PLAY_INTERVAL = 4800;
const SWIPE_THRESHOLD = 50;

// Premium iOS Spring Physics
const springConfig = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 0.8
};

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      paginate(1);
    }, AUTO_PLAY_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) {
      paginate(1);
    } else if (info.offset.x > SWIPE_THRESHOLD) {
      paginate(-1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-[#FDF8F3] flex flex-col overflow-hidden select-none touch-none">
      {/* 1. TOP: Navigation & Progress */}
      <header className="shrink-0 pt-6 px-6 z-50">
        <div className="flex justify-between items-center px-2 mb-4">
          <div className="flex gap-1.5 flex-1 max-w-[180px]">
            {SLIDES.map((_, i) => (
              <div key={i} className="h-1 flex-1 bg-black/5 rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ 
                    width: i === index ? '100%' : i < index ? '100%' : '0%',
                    backgroundColor: i === index ? currentSlide.color : '#E5E7EB'
                  }}
                  className="h-full rounded-full"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={() => { setIndex(SLIDES.length - 1); startTimer(); }}
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 active:scale-95 transition-transform"
          >
            Skip
          </button>
        </div>
      </header>

      {/* 2. CENTER: Art Canvas (60%) */}
      <main className="flex-[3] relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex items-center justify-center px-8"
            style={{ transform: 'translateZ(0)' }} // GPU Acceleration
          >
            <div className={cn(
              "w-full max-w-[220px] aspect-square rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center transition-colors duration-700",
              currentSlide.bg
            )}>
              {/* Internal Liquid Motion */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-white blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 blur-3xl rounded-full" />
              </motion.div>

              {/* Central Illustration System */}
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springConfig}
                  className="p-8 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center justify-center relative"
                >
                  <MainIcon size={64} style={{ color: currentSlide.color }} className="drop-shadow-lg" />
                  
                  {/* Floating Badges */}
                  {currentSlide.badges.map((BadgeIcon, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: i === 0 ? [0, -8, 0] : [0, 8, 0],
                        x: i === 0 ? [0, 4, 0] : [0, -4, 0]
                      }}
                      transition={{ 
                        duration: i === 0 ? 4 : 3.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                      className={cn(
                        "absolute w-10 h-10 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center border border-white/50",
                        i === 0 ? "-top-3 -left-3" : "-bottom-3 -right-3"
                      )}
                    >
                      <BadgeIcon size={20} style={{ color: currentSlide.color }} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Peek Indicators */}
        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none opacity-20">
          <ChevronRight className="w-8 h-8 rotate-180" />
          <ChevronRight className="w-8 h-8" />
        </div>
      </main>

      {/* 3. BOTTOM: Action Card (40%) */}
      <footer className="shrink-0 w-full bg-white rounded-t-[3.5rem] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.1)] pt-8 pb-[env(safe-area-inset-bottom,2rem)] px-10 text-center flex flex-col items-center z-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3 mb-10 w-full"
          >
            <h1 className="text-[28px] font-black tracking-tight text-[#0D1B2A] leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[14px] font-medium text-muted-foreground/60 leading-relaxed max-w-[280px] mx-auto">
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
                className="flex flex-col gap-4 w-full"
              >
                <AuthModal 
                  defaultTab="register"
                  trigger={
                    <Button className="w-full h-14 rounded-2xl font-black text-sm bg-gradient-to-r from-[#1A6AFF] to-[#3B82F6] text-white shadow-xl shadow-primary/20 active:scale-[0.98] group">
                      CREATE FREE ACCOUNT
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  }
                />
                <div className="flex flex-col gap-1 items-center">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    Trusted by 10M+ Indians
                  </p>
                </div>
              </motion.div>
            ) : (
              <Button 
                onClick={() => paginate(1)}
                className="w-full h-14 rounded-2xl font-black text-sm bg-[#1A6AFF] text-white shadow-xl shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>GET STARTED</span>
                <div className="flex -space-x-1.5 opacity-40">
                  <ChevronRight size={14} />
                  <ChevronRight size={14} />
                </div>
              </Button>
            )}
          </AnimatePresence>

          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="text-[11px] font-bold text-muted-foreground/60 hover:text-primary transition-colors py-2">
                Already have an account? <span className="text-[#1A6AFF] font-black underline underline-offset-4 decoration-2">Sign in</span>
              </button>
            }
          />
        </div>
      </footer>
    </div>
  );
}
