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

const iosSpring = {
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

    const icons = [Store, Bot, MessageCircle, Briefcase, Zap, Sparkles, Rocket, Languages, ShieldCheck];
    setBgIcons(icons.map((Icon, i) => ({
      id: i,
      Icon,
      top: `${10 + (i * 12)}%`,
      left: `${(i % 2 === 0 ? 15 : 85)}%`,
      delay: i * 0.4,
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
      scale: 0.9,
      filter: 'blur(12px)',
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        x: iosSpring,
        opacity: { duration: 0.35 },
        scale: { duration: 0.45, ease: "easeOut" },
        filter: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.8,
      filter: 'blur(15px)',
      transition: {
        x: iosSpring,
        opacity: { duration: 0.25 }
      }
    })
  };

  if (loading) return null;

  const currentSlide = SLIDES[index];
  const MainIcon = currentSlide.icon;

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none touch-none pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] gpu-accelerated">
      {/* Background Constellation - Living Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.2]">
        {bgIcons.map((item) => (
          <motion.div
            key={item.id}
            animate={{ 
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className="absolute text-primary/40"
            style={{ top: item.top, left: item.left }}
          >
            <item.Icon size={52} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <header className="shrink-0 pt-10 px-8 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-[1.25rem] bg-white dark:bg-zinc-900 flex items-center justify-center shadow-2xl border border-white/20 overflow-hidden">
              <Image src="/icons/icon-192.png" alt="Quvora" width={32} height={32} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-primary/70">Quvora</span>
              <span className="text-[15px] font-black tracking-tight text-foreground -mt-1">Super App</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex gap-1.5 items-center">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 24 : 6,
                    backgroundColor: i === index ? currentSlide.color : (isDark ? '#27272a' : '#e2e8f0')
                  }}
                  transition={iosSpring}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-11 w-11 glass-thick rounded-full border-none shadow-md relative overflow-hidden group" 
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: 25, opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ y: -25, opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={iosSpring}
                  className="flex items-center justify-center w-full h-full"
                >
                  {isDark ? (
                    <Sun className="w-4.5 h-4.5 text-primary fill-primary/20" />
                  ) : (
                    <Moon className="w-4.5 h-4.5 text-primary fill-primary/20" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
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
            <div className="relative w-full max-w-[280px] aspect-square">
              {/* Alive Central Stage */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.03, 1],
                  y: [0, -4, 0]
                }}
                transition={{
                  duration: 5, repeat: Infinity, ease: "easeInOut"
                }}
                className={cn(
                  "w-full h-full rounded-[4.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.3)] relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-1.5 transition-all duration-1000",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
                <div className="w-full h-full glass rounded-[4rem] border-none shadow-2xl flex items-center justify-center relative z-10">
                   <motion.div
                      animate={{ 
                        filter: [
                          `drop-shadow(0 0 0px ${currentSlide.color}00)`,
                          `drop-shadow(0 0 35px ${currentSlide.color}60)`,
                          `drop-shadow(0 0 0px ${currentSlide.color}00)`
                        ],
                        scale: [1, 1.08, 1],
                        rotate: [0, 2, 0, -2, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={96} style={{ color: currentSlide.color }} className="drop-shadow-2xl brightness-125" />
                   </motion.div>
                </div>
                
                {/* Volumetric Glow */}
                <div 
                  className="absolute inset-0 opacity-40 blur-[80px] rounded-full" 
                  style={{ backgroundColor: currentSlide.color }} 
                />
              </motion.div>

              {/* Staggered "Alive" Badges */}
              {currentSlide.badges.map((BadgeIcon, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -32, 12, -22, 0],
                    x: [0, i % 2 === 0 ? -22 : 22, i % 2 === 0 ? 15 : -15, 0],
                    rotate: [0, i % 2 === 0 ? -25 : 25, i % 2 === 0 ? 18 : -18, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 8 + i, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.7
                  }}
                  className={cn(
                    "absolute w-16 h-16 glass-thick rounded-[1.75rem] border-none shadow-2xl flex items-center justify-center z-30",
                    i === 0 ? "-top-12 -left-12" : "-bottom-12 -right-12"
                  )}
                >
                  <BadgeIcon size={34} style={{ color: currentSlide.color }} className="brightness-125 drop-shadow-2xl" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shrink-0 w-full glass-thick rounded-t-[3.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.15)] pt-8 pb-[env(safe-area-inset-bottom,2rem)] px-8 text-center flex flex-col items-center z-50">
        {/* iOS Handle Indicator */}
        <div className="w-12 h-1.5 bg-foreground/10 rounded-full mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-2 mb-8 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] font-black text-muted-foreground leading-relaxed uppercase tracking-[0.25em] opacity-60">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[320px] flex flex-col gap-4">
          <AuthModal 
            defaultTab="register"
            trigger={
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-14 rounded-[1.75rem] font-black text-sm uppercase tracking-[0.1em] bg-primary text-white shadow-lg shadow-primary/20 transition-all border-none hover:brightness-110">
                  Create Free Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex flex-col items-center gap-1 group outline-none">
                <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest group-hover:text-muted-foreground/60 transition-colors">
                  Already a member?
                </p>
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.15em] group-active:opacity-70 transition-opacity">
                  Sign in to Quvora
                </span>
              </button>
            }
          />
        </div>

        <div className="mt-8 flex items-center gap-2 opacity-30">
          <ShieldCheck size={14} className="text-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.35em] text-foreground">
            Trusted by 10M+ Indians
          </span>
        </div>
      </footer>
    </div>
  );
}
