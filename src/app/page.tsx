'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Signal,
  Wifi,
  Battery,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';

const SLIDES = [
  {
    id: 'buy-sell',
    title: 'Buy & Sell Anything',
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories near you',
    icon: Store,
    badge1: <Zap className="w-5 h-5 text-yellow-500" />,
    badge2: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    bgGradient: 'from-[#EBF3FF] to-[#DBEEFF]',
    accentColor: '#1A6AFF'
  },
  {
    id: 'ai-smart',
    title: 'AI That Works For You',
    subtitle: 'Smart price suggestions, auto-fill & fraud detection',
    icon: Bot,
    badge1: <Sparkles className="w-5 h-5 text-purple-500" />,
    badge2: <Zap className="w-5 h-5 text-orange-500" />,
    bgGradient: 'from-[#FFF3EE] to-[#FFE8DC]',
    accentColor: '#FF6B2B'
  },
  {
    id: 'chat-safe',
    title: 'Negotiate Safely',
    subtitle: 'Direct peer-to-peer chat with zero middlemen',
    icon: MessageCircle,
    badge1: <ShieldCheck className="w-5 h-5 text-green-500" />,
    badge2: <Zap className="w-5 h-5 text-blue-500" />,
    bgGradient: 'from-[#E8FFF4] to-[#D1F5E8]',
    accentColor: '#10B981'
  },
  {
    id: 'language',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your own language with AI support',
    icon: Languages,
    badge1: <Sparkles className="w-5 h-5 text-orange-500" />,
    badge2: <Zap className="w-5 h-5 text-purple-500" />,
    bgGradient: 'from-[#F0EEFF] to-[#E2D9FF]',
    accentColor: '#7C3AED'
  },
  {
    id: 'homes-jobs',
    title: 'Homes & Careers',
    subtitle: 'Find rentals and post jobs for free today',
    icon: Briefcase,
    badge1: <Zap className="w-5 h-5 text-amber-500" />,
    badge2: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    bgGradient: 'from-[#FFFBEB] to-[#FFF3C4]',
    accentColor: '#F59E0B'
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing marketplace super-app",
    icon: Rocket,
    badge1: <Sparkles className="w-5 h-5 text-pink-500" />,
    badge2: <Zap className="w-5 h-5 text-blue-500" />,
    bgGradient: 'from-[#FFF0F3] to-[#FFE0E8]',
    accentColor: '#EC4899'
  }
];

const springTransition = { type: 'spring', stiffness: 300, damping: 30 };
const AUTO_PLAY_INTERVAL = 4800;
const SWIPE_THRESHOLD = 50;

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
      setDirection(1);
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

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

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const Icon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-[#FDF8F3] flex flex-col overflow-hidden select-none touch-none">
      {/* 1. TOP PART: Status & Progress */}
      <header className="shrink-0 pt-2 px-6 z-50">
        {/* Mock iOS Status Bar */}
        <div className="flex justify-between items-center h-10 px-4 mb-2">
          <span className="text-xs font-bold tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 opacity-60">
            <Signal size={14} strokeWidth={2.5} />
            <Wifi size={14} strokeWidth={2.5} />
            <Battery size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* DASH Progress Indicators */}
        <div className="flex justify-between items-center px-4">
          <div className="flex gap-1.5 flex-1 max-w-[160px]">
            {SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  flex: i === index ? 3 : 1,
                  backgroundColor: i === index ? '#1A6AFF' : '#E5E7EB',
                  opacity: i === index ? 1 : 0.4
                }}
                className="h-1 rounded-full"
              />
            ))}
          </div>
          <button 
            onClick={() => { setDirection(1); setIndex(SLIDES.length - 1); startTimer(); }}
            className="text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground/60 active:scale-90 transition-transform"
          >
            Skip
          </button>
        </div>
      </header>

      {/* 2. CENTER PART: Interactive Canvas */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full flex flex-col items-center px-6"
          >
            <div className={cn(
              "w-full max-w-[240px] aspect-square rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center transition-colors duration-700",
              currentSlide.bgGradient
            )}>
              {/* Internal Ambient Motion */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20 pointer-events-none"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-white blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-black/10 blur-3xl rounded-full" />
              </motion.div>

              {/* Central Premium Icon Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springTransition}
                className="relative z-10 p-7 bg-white/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 flex items-center justify-center"
              >
                <Icon size={64} strokeWidth={1.5} style={{ color: currentSlide.accentColor }} className="drop-shadow-xl" />
                
                {/* Floating Micro-Badges */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -left-3 w-10 h-10 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center text-lg border border-white/50 overflow-hidden"
                >
                  {currentSlide.badge1}
                </motion.div>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-3 -right-3 w-10 h-10 bg-white/95 rounded-2xl shadow-lg flex items-center justify-center text-lg border border-white/50 overflow-hidden"
                >
                  {currentSlide.badge2}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM PART: Action Card */}
      <footer className="shrink-0 w-full bg-white rounded-t-[3.5rem] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.1)] pt-8 pb-[env(safe-area-inset-bottom,2.5rem)] px-8 text-center flex flex-col items-center z-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-2 mb-8 w-full"
          >
            <h1 className="text-[26px] font-black tracking-tighter text-[#0D1B2A] leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[14px] font-medium text-muted-foreground/60 leading-relaxed max-w-[260px] mx-auto">
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
                    <Button className="w-full h-14 rounded-2xl font-black text-sm bg-gradient-to-r from-[#1A6AFF] to-[#3B82F6] text-white shadow-xl shadow-primary/20 active:scale-[0.98]">
                      CREATE FREE ACCOUNT
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
                <div className="flex flex-col gap-1 items-center mt-1">
                  <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest">
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
                <div className="flex -space-x-1 opacity-50">
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
