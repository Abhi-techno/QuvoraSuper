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
  ChevronRight,
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

const AUTO_PLAY_INTERVAL = 4800;
const SWIPE_THRESHOLD = 50;

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
  const [isDark, setIsDark] = useState(false);
  const [bgIcons, setBgIcons] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));

    // Generate background icons on client only to avoid hydration mismatch
    const icons = [Store, Bot, MessageCircle, Briefcase, Zap, Sparkles, ShieldCheck, Star, Rocket, Languages];
    setBgIcons(icons.map((Icon, i) => ({
      Icon,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: Math.random() * 5,
      duration: 7 + Math.random() * 5
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
      scale: 0.95
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
      scale: 0.95,
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
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none touch-none transition-colors duration-700 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      {/* Background Icon Constellation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        {bgIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.03, 0.1, 0.03],
              y: [0, -30, 0],
              x: [0, 10, 0]
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
            <item.Icon size={40} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      {/* Top Header */}
      <header className="shrink-0 pt-3 px-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={24} height={24} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest uppercase text-primary/60">Super App</span>
              <span className="text-sm font-black tracking-tight text-foreground -mt-1">Quvora</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 items-center">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 24 : 6,
                    backgroundColor: i === index ? currentSlide.color : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)')
                  }}
                  className="h-1.5 rounded-full transition-all duration-300"
                />
              ))}
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-10 w-10 glass rounded-full border-none shadow-sm" 
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Center Art Canvas (60%) */}
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
          >
            <div className={cn(
              "w-full max-w-[220px] aspect-square rounded-[4rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center transition-all duration-700",
              currentSlide.bg
            )}>
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={springConfig}
                  className="p-10 glass rounded-[3rem] border-none shadow-2xl flex items-center justify-center relative"
                >
                  <MainIcon size={64} style={{ color: currentSlide.color }} className="drop-shadow-lg" />
                  
                  {currentSlide.badges.map((BadgeIcon, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        y: i === 0 ? [0, -12, 0] : [0, 12, 0],
                        x: i === 0 ? [0, 6, 0] : [0, -6, 0]
                      }}
                      transition={{ 
                        duration: i === 0 ? 4 : 3.5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 0.5
                      }}
                      className={cn(
                        "absolute w-12 h-12 glass rounded-2xl border-none shadow-lg flex items-center justify-center",
                        i === 0 ? "-top-6 -left-6" : "-bottom-6 -right-6"
                      )}
                    >
                      <BadgeIcon size={24} style={{ color: currentSlide.color }} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Conversion Card (40%) */}
      <footer className="shrink-0 w-full bg-card rounded-t-[4rem] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.1)] pt-12 pb-[env(safe-area-inset-bottom,2rem)] px-10 text-center flex flex-col items-center z-50 transition-colors duration-700">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-3 mb-12 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-foreground leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[11px] font-black text-muted-foreground/50 leading-relaxed uppercase tracking-[0.2em] max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[320px] flex flex-col gap-4">
          <AuthModal 
            defaultTab="register"
            trigger={
              <Button className="w-full h-15 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all border-none group">
                Create Free Account
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="text-[10px] font-black text-muted-foreground/50 hover:text-primary transition-colors py-2 uppercase tracking-widest">
                Already member? <span className="text-primary underline underline-offset-8 decoration-2 ml-1">Sign in</span>
              </button>
            }
          />
          <p className="text-[9px] font-black text-primary/60 uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Trusted by 10M+ Indians
          </p>
        </div>
      </footer>
    </div>
  );
}