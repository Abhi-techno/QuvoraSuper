'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
    subtitle: 'Mobiles, cars, homes, jobs & 100+ categories',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-500/20 to-transparent',
    badges: [Zap, ShieldCheck]
  },
  {
    id: 'ai-engine',
    title: 'AI-Powered Insights',
    subtitle: 'Smart price suggestions, auto-fill & fraud detection',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-500/20 to-transparent',
    badges: [Sparkles, Zap]
  },
  {
    id: 'secure-chat',
    title: 'Secure Peer Chat',
    subtitle: 'Direct peer-to-peer chat with AI safety scanning',
    icon: MessageCircle,
    color: '#10B981',
    bg: 'from-emerald-500/20 to-transparent',
    badges: [Shield, MessageCircle]
  },
  {
    id: 'languages',
    title: '12 Indian Languages',
    subtitle: 'Use Quvora in your native tongue with AI voice support',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-500/20 to-transparent',
    badges: [Languages, Sparkles]
  },
  {
    id: 'careers',
    title: 'Jobs & Rentals',
    subtitle: 'Find your next home or career move for free today',
    icon: Briefcase,
    color: '#F59E0B',
    bg: 'from-amber-500/20 to-transparent',
    badges: [Briefcase, Star]
  },
  {
    id: 'community',
    title: 'Join 10M+ Indians',
    subtitle: "India's fastest growing AI marketplace app",
    icon: Rocket,
    color: '#EC4899',
    bg: 'from-pink-500/20 to-transparent',
    badges: [Rocket, ShieldCheck]
  }
];

const AMBIENT_ICONS = [
  Smartphone, MapPin, Heart, Globe, Star, Zap, Shield, Sparkles, Store, Bot
];

const AUTO_PLAY_INTERVAL = 6000;
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

  // Generate ambient icon positions once
  const ambientIcons = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      Icon: AMBIENT_ICONS[i % AMBIENT_ICONS.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20,
      scale: 0.5 + Math.random() * 1.5,
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
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full opacity-20 dark:opacity-30 blur-[140px] bg-primary transform-gpu"
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[20%] w-[80%] h-[80%] rounded-full opacity-20 dark:opacity-30 blur-[140px] bg-accent transform-gpu"
        />

        {/* Ambient Constellation */}
        <div className="absolute inset-0 z-0">
          {ambientIcons.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0],
                y: [0, -100, 0],
                rotate: item.rotate + 20
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: "easeInOut"
              }}
              className="absolute text-foreground/20"
              style={{ left: item.left, top: item.top }}
            >
              <item.Icon size={24 * item.scale} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="shrink-0 z-50 px-8 pt-4" style={{ paddingTop: 'calc(1.5rem + env(safe-area-inset-top))' }}>
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center shadow-2xl border-none overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={32} height={32} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary leading-none">Quvora</span>
              <span className="text-[12px] font-black tracking-tighter text-foreground/40 leading-none">Superapp</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 items-center glass px-3 py-2 rounded-full border-none shadow-sm">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 24 : 6,
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
              className="h-10 w-10 glass rounded-full border-none shadow-sm active:scale-90 transition-all hover:bg-transparent" 
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
      <main className="flex-1 min-h-0 relative flex items-center justify-center py-4">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={iosSpring}
            className="w-full h-full flex items-center justify-center px-8 transform-gpu"
          >
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              {/* Alive UI Container */}
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-[90%] h-[90%] rounded-[4rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-1 transition-all duration-1000",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-3xl" />
                <div className="w-full h-full glass rounded-[3.8rem] border-none flex items-center justify-center relative z-10">
                   <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        filter: [`drop-shadow(0 0 0px ${currentSlide.color}00)`, `drop-shadow(0 0 40px ${currentSlide.color}50)`, `drop-shadow(0 0 0px ${currentSlide.color}00)`]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={96} style={{ color: currentSlide.color }} className="drop-shadow-2xl" />
                   </motion.div>
                </div>
              </motion.div>

              {/* Floating Adaptive Badges */}
              <div className="absolute inset-0 pointer-events-none z-30">
                {currentSlide.badges.map((BadgeIcon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, i === 0 ? -40 : 40, 0],
                      x: [0, i === 0 ? -30 : 30, 0],
                      scale: [1, 1.15, 1],
                      rotate: [0, i === 0 ? -15 : 15, 0]
                    }}
                    transition={{ 
                      duration: 10 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className={cn(
                      "absolute w-16 h-16 glass-thick rounded-3xl flex items-center justify-center shadow-2xl z-40 border-none",
                      i === 0 ? "top-2 left-2" : "bottom-2 right-2"
                    )}
                  >
                    <BadgeIcon size={32} style={{ color: currentSlide.color }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Adaptive Footer Sheet */}
      <footer 
        className="shrink-0 w-full glass-thick rounded-t-[4rem] shadow-2xl pt-8 px-8 text-center flex flex-col items-center z-50 border-t border-white/20"
        style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}
      >
        <div className="w-16 h-1.5 bg-foreground/10 rounded-full mb-8 opacity-40" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={iosSpring}
            className="flex flex-col gap-2 mb-8 w-full"
          >
            <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm flex flex-col gap-4">
          <AuthModal 
            defaultTab="register"
            trigger={
              <Button className="w-full h-16 rounded-[2rem] font-black text-sm uppercase tracking-widest bg-primary text-white shadow-2xl shadow-primary/30 transition-all border-none active:scale-[0.97] hover:scale-[1.01]">
                Get Started
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity pb-2 active:scale-95 group">
                <span className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">Already a member?</span>
                <span className="text-[12px] font-black uppercase tracking-widest text-primary">Login</span>
              </button>
            }
          />
        </div>

        <div className="mt-6 flex items-center gap-2 opacity-30 pointer-events-none">
          <ShieldCheck size={16} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">Trusted by 10M+ Indians</span>
        </div>
      </footer>
    </div>
  );
}