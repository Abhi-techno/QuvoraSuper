'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { useUser } from '@/firebase';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { 
  Store, 
  Bot, 
  MessageCircle, 
  Languages, 
  Briefcase, 
  Rocket,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Shield,
  Sun,
  Moon
} from 'lucide-react';

const SLIDES = [
  {
    id: 'marketplace',
    title: 'Buy & Sell Anything',
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories near you',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-500/10 to-blue-500/5',
    badges: [Zap, ShieldCheck]
  },
  {
    id: 'ai-engine',
    title: 'AI-Powered Insights',
    subtitle: 'Smart price suggestions, auto-fill & fraud detection',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-500/10 to-orange-500/5',
    badges: [Sparkles, Zap]
  },
  {
    id: 'secure-chat',
    title: 'Secure Peer Chat',
    subtitle: 'Direct peer-to-peer chat with AI safety scanning',
    icon: MessageCircle,
    color: '#10B981',
    bg: 'from-emerald-500/10 to-emerald-500/5',
    badges: [Shield, MessageCircle]
  },
  {
    id: 'languages',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your native tongue with AI voice support',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-500/10 to-purple-500/5',
    badges: [Languages, Sparkles]
  },
  {
    id: 'careers',
    title: 'Jobs & Rentals',
    subtitle: 'Find your next home or career move for free today',
    icon: Briefcase,
    color: '#F59E0B',
    bg: 'from-amber-500/10 to-amber-500/5',
    badges: [Briefcase, Star]
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing AI marketplace super-app",
    icon: Rocket,
    color: '#EC4899',
    bg: 'from-pink-500/10 to-pink-500/5',
    badges: [Rocket, ShieldCheck]
  }
];

const AUTO_PLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 50;
const VELOCITY_THRESHOLD = 500;

const springConfig = {
  type: "spring",
  stiffness: 150,
  damping: 20,
  mass: 0.8
};

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [bgIcons, setBgIcons] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));

    // Client-side icons to prevent hydration mismatch
    const icons = [Store, Bot, MessageCircle, Briefcase, Zap, Sparkles, ShieldCheck, Star, Rocket, Languages];
    setBgIcons(icons.map((Icon, i) => ({
      id: i,
      Icon,
      top: `${Math.floor(Math.random() * 80 + 10)}%`,
      left: `${Math.floor(Math.random() * 80 + 10)}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 8
    })));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

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
    const swipe = info.offset.x;
    const velocity = info.velocity.x;

    if (swipe < -SWIPE_THRESHOLD || velocity < -VELOCITY_THRESHOLD) {
      paginate(1);
    } else if (swipe > SWIPE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
      paginate(-1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.92,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.92,
      filter: 'blur(10px)',
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 32 },
        opacity: { duration: 0.4 }
      }
    })
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none touch-none transition-colors duration-700 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      {/* Dynamic Background Icon Field - GPU Accelerated */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.12]">
        {bgIcons.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.03, 0.12, 0.03],
              y: [0, -60, 0],
              x: [0, 20, 0]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className="absolute text-primary"
            style={{ top: item.top, left: item.left }}
          >
            <item.Icon size={48} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      {/* Premium iOS Brand Header */}
      <header className="shrink-0 pt-6 px-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={32} height={32} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest uppercase text-primary/60">Super App</span>
              <span className="text-base font-black tracking-tight text-foreground -mt-1">Quvora</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 24 : 8,
                    backgroundColor: i === index ? currentSlide.color : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                />
              ))}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-11 w-11 glass rounded-full border-none shadow-sm active:scale-90 transition-transform" 
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Visual Canvas */}
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
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex items-center justify-center px-8"
          >
            <div className={cn(
              "w-full max-w-[220px] aspect-square rounded-[4.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center transition-all duration-700",
              currentSlide.bg
            )}>
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springConfig}
                  className="p-10 glass rounded-[3.5rem] border-none shadow-2xl flex items-center justify-center relative"
                >
                  <MainIcon size={72} style={{ color: currentSlide.color }} className="drop-shadow-lg" />
                  
                  {currentSlide.badges.map((BadgeIcon, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: i === 0 ? [0, -18, 0] : [0, 18, 0],
                        x: i === 0 ? [0, 10, 0] : [0, -10, 0]
                      }}
                      transition={{ 
                        duration: i === 0 ? 5 : 4.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.8
                      }}
                      className={cn(
                        "absolute w-14 h-14 glass rounded-3xl border-none shadow-lg flex items-center justify-center",
                        i === 0 ? "-top-8 -left-8" : "-bottom-8 -right-8"
                      )}
                    >
                      <BadgeIcon size={28} style={{ color: currentSlide.color }} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Refined Compact Footer Conversion Card - iOS 144Hz Smooth */}
      <footer className="shrink-0 w-full glass-thick rounded-t-[4rem] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.1)] pt-10 pb-[env(safe-area-inset-bottom,2.5rem)] px-10 text-center flex flex-col items-center z-50 transition-colors duration-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col gap-2.5 mb-8 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-foreground leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] font-black text-muted-foreground/50 leading-relaxed uppercase tracking-[0.2em] max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[320px] flex flex-col gap-5">
          <AuthModal 
            defaultTab="register"
            trigger={
              <motion.div whileTap={{ scale: 0.96 }}>
                <Button className="w-full h-16 rounded-[1.5rem] font-black text-xs uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all border-none group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <motion.button whileTap={{ scale: 0.96 }} className="group flex flex-col items-center gap-1 py-1 transition-transform">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest transition-colors group-hover:text-muted-foreground/60">
                  Already a member?
                </p>
                <span className="text-xs font-black text-primary uppercase tracking-[0.15em] border-b-2 border-primary/20 group-hover:border-primary transition-all">
                  Sign in to Quvora
                </span>
              </motion.button>
            }
          />
          
          <div className="flex flex-col items-center gap-2 mt-1">
            <div className="flex items-center gap-2 text-[9px] font-black text-primary/60 uppercase tracking-[0.2em]">
              <div className="relative">
                <ShieldCheck className="w-4 h-4" />
                <motion.div 
                  animate={{ opacity: [0, 0.4, 0], scale: [1, 1.8, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 bg-primary/20 rounded-full blur-sm"
                />
              </div>
              Trusted by 10M+ Indians
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
