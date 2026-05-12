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
    subtitle: "India's fastest growing AI marketplace super-app",
    icon: Rocket,
    color: '#EC4899',
    bg: 'from-pink-500/25 to-pink-500/10',
    badges: [Rocket, ShieldCheck]
  }
];

const AUTO_PLAY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 30;
const VELOCITY_THRESHOLD = 400;

const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 35,
  mass: 1
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

    const icons = [Store, Bot, MessageCircle, Briefcase, Zap, Sparkles];
    setBgIcons(icons.map((Icon, i) => ({
      id: i,
      Icon,
      top: `${10 + (i * 15)}%`,
      left: `${(i % 2 === 0 ? 15 : 75)}%`,
      delay: i * 0.5,
      duration: 12 + i
    })));
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
      scale: 0.85,
      filter: 'blur(10px)'
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 400, damping: 35 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        filter: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.85,
      filter: 'blur(10px)',
      transition: {
        x: { type: 'spring', stiffness: 400, damping: 35 },
        opacity: { duration: 0.2 }
      }
    })
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none touch-none pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
      {/* Background Constellation - Increased Opacity for Visibility */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.15]">
        {bgIcons.map((item) => (
          <motion.div
            key={item.id}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.4, 0.7, 0.4]
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
            <item.Icon size={44} strokeWidth={1.5} />
          </motion.div>
        ))}
      </div>

      <header className="shrink-0 pt-6 px-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white dark:bg-zinc-900 flex items-center justify-center shadow-xl border border-white/20 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={28} height={28} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-widest uppercase text-primary/80">Quvora</span>
              <span className="text-sm font-black tracking-tight text-foreground -mt-1">Super App</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1.5 items-center">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 20 : 6,
                    backgroundColor: i === index ? currentSlide.color : (isDark ? '#3f3f46' : '#e2e8f0')
                  }}
                  transition={springConfig}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
            
            <motion.div whileTap={{ scale: 0.9, rotate: isDark ? 15 : -15 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-10 w-10 glass-thick rounded-full border-none shadow-md relative overflow-hidden group" 
                onClick={toggleTheme}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ y: 25, opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ y: -25, opacity: 0, scale: 0.5, rotate: 90 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      opacity: { duration: 0.15 }
                    }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 text-primary fill-primary/20" />
                    ) : (
                      <Moon className="w-4 h-4 text-primary fill-primary/20" />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-active:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center overflow-hidden">
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
            className="w-full h-full flex items-center justify-center px-10 relative z-10"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ ...springConfig, delay: 0.1 }}
              className={cn(
                "w-full max-w-[240px] aspect-square rounded-[4.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-1",
                currentSlide.bg
              )}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={springConfig}
                className="w-full h-full glass rounded-[4rem] border-none shadow-2xl flex items-center justify-center relative z-10"
              >
                <MainIcon size={80} style={{ color: currentSlide.color }} className="drop-shadow-2xl brightness-110" />
                
                {/* Floating Badges - Organic Floating Logic */}
                {currentSlide.badges.map((BadgeIcon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -12, 0],
                      x: [0, i % 2 === 0 ? -5 : 5, 0],
                      rotate: [0, i % 2 === 0 ? -10 : 10, 0]
                    }}
                    transition={{ 
                      duration: 4 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className={cn(
                      "absolute w-14 h-14 glass rounded-2xl border-none shadow-xl flex items-center justify-center z-20",
                      i === 0 ? "-top-6 -left-6" : "-bottom-6 -right-6"
                    )}
                  >
                    <BadgeIcon size={28} style={{ color: currentSlide.color }} className="brightness-125" />
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Radial Glow - Higher Opacity for Visibility */}
              <div 
                className="absolute inset-0 opacity-40 blur-[60px] rounded-full" 
                style={{ backgroundColor: currentSlide.color }} 
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shrink-0 w-full glass-thick rounded-t-[3.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-10 pb-[env(safe-area-inset-bottom,2rem)] px-10 text-center flex flex-col items-center z-50 transition-colors duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1.5 mb-8 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-foreground leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-[0.2em] opacity-60">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[300px] flex flex-col gap-5">
          <AuthModal 
            defaultTab="register"
            trigger={
              <motion.div whileTap={{ scale: 0.96 }}>
                <Button className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/30 transition-transform border-none">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex flex-col items-center gap-0.5 py-1 group">
                <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-widest group-hover:text-muted-foreground/70 transition-colors">
                  Already a member?
                </p>
                <span className="text-[11px] font-black text-primary uppercase tracking-widest group-active:opacity-70">
                  Sign in to Quvora
                </span>
              </button>
            }
          />
        </div>

        <div className="mt-8 flex items-center gap-2 opacity-40">
          <ShieldCheck size={12} className="text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground">
            Trusted by 10M+ Indians
          </span>
        </div>
      </footer>
    </div>
  );
}
