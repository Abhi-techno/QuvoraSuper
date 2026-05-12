
'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Moon,
  Smartphone,
  MapPin,
  Heart,
  Globe
} from 'lucide-react';

const SLIDES = [
  {
    id: 'marketplace',
    title: 'Buy & Sell Anything',
    subtitle: 'Mobiles, cars, homes & 100+ categories',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-500/20 to-transparent',
    badges: [Zap, ShieldCheck]
  },
  {
    id: 'ai-engine',
    title: 'AI-Powered Insights',
    subtitle: 'Smart price suggestions & fraud detection',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-500/20 to-transparent',
    badges: [Sparkles, Zap]
  },
  {
    id: 'secure-chat',
    title: 'Secure Peer Chat',
    subtitle: 'Direct chat with AI safety scanning',
    icon: MessageCircle,
    color: '#10B981',
    bg: 'from-emerald-500/20 to-transparent',
    badges: [Shield, MessageCircle]
  },
  {
    id: 'languages',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your native tongue',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-500/20 to-transparent',
    badges: [Languages, Sparkles]
  },
  {
    id: 'careers',
    title: 'Jobs & Rentals',
    subtitle: 'Find your next home or career move',
    icon: Briefcase,
    color: '#F59E0B',
    bg: 'from-amber-500/20 to-transparent',
    badges: [Briefcase, Star]
  }
];

const AMBIENT_ICONS = [
  Smartphone, MapPin, Heart, Globe, Star, Zap, Shield, Sparkles, Store, Bot
];

const AUTO_PLAY_INTERVAL = 5000;
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

  const ambientIcons = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      Icon: AMBIENT_ICONS[i % AMBIENT_ICONS.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 20,
      scale: 0.6 + Math.random() * 1.2,
      rotate: Math.random() * 360
    }));
  }, []);

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

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => paginate(1), AUTO_PLAY_INTERVAL);
    return () => clearInterval(timerRef.current!);
  }, []);

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  if (loading) return null;

  return (
    <div className="h-svh w-full bg-background flex flex-col overflow-hidden select-none touch-none gpu-accelerated relative">
      
      {/* Background Mesh Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-20 dark:opacity-40 blur-[120px] bg-primary transform-gpu"
        />
        <motion.div 
          animate={{ scale: [1.1, 1, 1.1], x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[70%] h-[70%] rounded-full opacity-20 dark:opacity-40 blur-[120px] bg-accent transform-gpu"
        />

        {/* Drifting Ambient Icons */}
        <div className="absolute inset-0">
          {ambientIcons.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.15, 0],
                y: [0, -80, 0],
                rotate: item.rotate + 15
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="absolute text-foreground/10"
              style={{ left: item.left, top: item.top }}
            >
              <item.Icon size={20 * item.scale} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="shrink-0 z-50 px-8 pt-4" style={{ paddingTop: 'calc(1rem + env(safe-area-inset-top))' }}>
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full glass flex items-center justify-center border-none overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={28} height={28} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase text-primary leading-none">Quvora</span>
              <span className="text-[11px] font-black tracking-tighter text-foreground/40 leading-none">Superapp</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center glass px-2 py-1.5 rounded-full border-none shadow-sm">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 16 : 4,
                    backgroundColor: i === index ? currentSlide.color : 'rgba(128,128,128,0.15)'
                  }}
                  transition={iosSpring}
                  className="h-1 rounded-full"
                />
              ))}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-9 w-9 glass rounded-full border-none shadow-sm active:scale-90 transition-all hover:bg-transparent" 
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -120, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 120, scale: 0, opacity: 0 }}
                  transition={iosSpring}
                  className="flex items-center justify-center"
                >
                  {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Adaptive Stage */}
      <main className="flex-1 min-h-0 relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={iosSpring}
            className="w-full h-full flex items-center justify-center px-8"
          >
            <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
              <motion.div 
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-[85%] h-[85%] rounded-[3.5rem] shadow-xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-0.5 transition-all duration-1000",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 glass rounded-[3.4rem] border-none flex items-center justify-center">
                   <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={80} style={{ color: currentSlide.color }} className="drop-shadow-xl" />
                   </motion.div>
                </div>
              </motion.div>

              {/* Badges */}
              {currentSlide.badges.map((BadgeIcon, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, i === 0 ? -25 : 25, 0],
                    x: [0, i === 0 ? -20 : 20, 0],
                    rotate: [0, i === 0 ? -10 : 10, 0]
                  }}
                  transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                  className={cn(
                    "absolute w-12 h-12 glass-thick rounded-2xl flex items-center justify-center shadow-lg z-20 border-none",
                    i === 0 ? "top-2 left-2" : "bottom-2 right-2"
                  )}
                >
                  <BadgeIcon size={24} style={{ color: currentSlide.color }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Compact Footer Sheet */}
      <footer 
        className="shrink-0 w-full glass-thick rounded-t-[2.5rem] shadow-2xl pt-5 px-8 text-center flex flex-col items-center z-50 border-t border-white/10"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <div className="w-10 h-1 bg-foreground/10 rounded-full mb-3 opacity-30" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={iosSpring}
            className="flex flex-col gap-1 mb-4 w-full"
          >
            <h1 className="text-2xl font-black tracking-tight text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm flex flex-col gap-2.5">
          <AuthModal 
            defaultTab="register"
            trigger={
              <Button className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-lg shadow-primary/20 border-none active:scale-[0.97] transition-all">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex items-center justify-center gap-2 opacity-50 hover:opacity-100 transition-opacity active:scale-95 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Existing User?</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Login</span>
              </button>
            }
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5 opacity-20 pointer-events-none">
          <ShieldCheck size={12} className="text-primary" />
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-foreground">Trusted by 10M+ Indians</span>
        </div>
      </footer>
    </div>
  );
}
