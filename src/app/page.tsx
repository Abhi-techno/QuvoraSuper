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
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-500/25 to-blue-500/10',
    badges: [Zap, ShieldCheck]
  },
  {
    id: 'ai-engine',
    title: 'AI-Powered Insights',
    subtitle: 'Smart price suggestions, auto-fill & fraud detection',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-500/25 to-orange-500/10',
    badges: [Sparkles, Zap]
  },
  {
    id: 'secure-chat',
    title: 'Secure Peer Chat',
    subtitle: 'Direct peer-to-peer chat with AI safety scanning',
    icon: MessageCircle,
    color: '#10B981',
    bg: 'from-emerald-500/25 to-emerald-500/10',
    badges: [Shield, MessageCircle]
  },
  {
    id: 'languages',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your native tongue with AI voice support',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-500/25 to-purple-500/10',
    badges: [Languages, Sparkles]
  },
  {
    id: 'careers',
    title: 'Jobs & Rentals',
    subtitle: 'Find your next home or career move for free today',
    icon: Briefcase,
    color: '#F59E0B',
    bg: 'from-amber-500/25 to-amber-500/10',
    badges: [Briefcase, Star]
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing AI marketplace app",
    icon: Rocket,
    color: '#EC4899',
    bg: 'from-pink-500/25 to-pink-500/10',
    badges: [Rocket, ShieldCheck]
  }
];

const AUTO_PLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 400;

const iosSpring = {
  type: "spring",
  stiffness: 420,
  damping: 30,
  mass: 1
};

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const isNowDark = !isDark;
    if (isNowDark) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
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
      scale: 0.95,
      filter: 'blur(10px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: iosSpring,
        opacity: { duration: 0.2 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '30%' : '-30%',
      opacity: 0,
      scale: 0.95,
      filter: 'blur(10px)',
      transition: {
        x: iosSpring,
        opacity: { duration: 0.2 }
      }
    })
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  return (
    <div className="h-svh w-full bg-background flex flex-col overflow-hidden select-none touch-none gpu-accelerated relative">
      
      {/* Background Mesh Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000">
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-full h-full rounded-full opacity-10 dark:opacity-20 blur-[120px] bg-primary transform-gpu"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-full h-full rounded-full opacity-10 dark:opacity-20 blur-[120px] bg-accent transform-gpu"
        />
      </div>

      {/* Header Section */}
      <header className="shrink-0 z-50 px-6 pt-2" style={{ paddingTop: 'calc(0.5rem + env(safe-area-inset-top))' }}>
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-lg border-none overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={28} height={28} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary leading-none">Quvora</span>
              <span className="text-[12px] font-black tracking-tighter text-foreground/40 leading-none">Superapp</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1.5 items-center glass px-3 py-2 rounded-full border-none shadow-sm">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 20 : 6,
                    backgroundColor: i === index ? currentSlide.color : 'rgba(128,128,128,0.2)'
                  }}
                  transition={iosSpring}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-10 w-10 glass rounded-full border-none shadow-sm active:scale-90 transition-all hover:bg-transparent active:bg-transparent group" 
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={iosSpring}
                  className="flex items-center justify-center"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-primary" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Adaptive Stage */}
      <main className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden py-4">
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
            dragElastic={0.5}
            onDragEnd={handleDragEnd}
            className="w-full h-full flex items-center justify-center px-8 transform-gpu"
          >
            <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              {/* Alive UI Container */}
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-[85%] h-[85%] rounded-[3.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-1 transition-all duration-1000",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-2xl" />
                <div className="w-full h-full glass rounded-[3.2rem] border-none flex items-center justify-center relative z-10">
                   <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        filter: [`drop-shadow(0 0 0px ${currentSlide.color}00)`, `drop-shadow(0 0 30px ${currentSlide.color}60)`, `drop-shadow(0 0 0px ${currentSlide.color}00)`]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={80} style={{ color: currentSlide.color }} className="drop-shadow-2xl" />
                   </motion.div>
                </div>
              </motion.div>

              {/* Floating Adaptive Badges */}
              <div className="absolute inset-0 pointer-events-none z-30">
                {currentSlide.badges.map((BadgeIcon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, i === 0 ? -30 : 30, 0],
                      x: [0, i === 0 ? -20 : 20, 0],
                      scale: [1, 1.1, 1],
                      rotate: [0, i === 0 ? -10 : 10, 0]
                    }}
                    transition={{ 
                      duration: 8 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.4
                    }}
                    className={cn(
                      "absolute w-14 h-14 glass-thick rounded-2xl flex items-center justify-center shadow-xl z-40 border-none",
                      i === 0 ? "top-4 left-4" : "bottom-4 right-4"
                    )}
                  >
                    <BadgeIcon size={28} style={{ color: currentSlide.color }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Adaptive Footer Sheet */}
      <footer 
        className="shrink-0 w-full glass-thick rounded-t-[3.5rem] shadow-xl pt-6 pb-4 px-8 text-center flex flex-col items-center z-50"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="w-12 h-1 bg-foreground/10 rounded-full mb-6" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={iosSpring}
            className="flex flex-col gap-1.5 mb-6 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em]">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <AuthModal 
            defaultTab="register"
            trigger={
              <Button className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 transition-all border-none active:scale-[0.98]">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex items-center justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pb-2 active:scale-95">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Already a member?</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-primary">Login</span>
              </button>
            }
          />
        </div>

        <div className="mt-4 flex items-center gap-2 opacity-20 pointer-events-none">
          <ShieldCheck size={14} className="text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-foreground">Trusted by 10M+ Users</span>
        </div>
      </footer>
    </div>
  );
}
