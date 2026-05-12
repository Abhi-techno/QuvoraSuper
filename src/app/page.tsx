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

// High-Tension Liquid iOS Spring
const iosSpring = {
  type: "spring",
  stiffness: 500,
  damping: 40,
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
      top: `${15 + (i * 10)}%`,
      left: `${(i % 2 === 0 ? 10 : 90)}%`,
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
      filter: 'blur(20px)',
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
        scale: { duration: 0.4, ease: "easeOut" },
        filter: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '50%' : '-50%',
      opacity: 0,
      scale: 0.9,
      filter: 'blur(20px)',
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
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden select-none touch-none gpu-accelerated transition-colors duration-1000 h-svh w-full">
      
      {/* Cinematic Liquid Mesh Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000">
        <motion.div 
          animate={{ 
            scale: [1, 1.25, 1],
            rotate: [0, 90, 0],
            x: [0, 60, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[25%] -left-[15%] w-[90%] h-[90%] rounded-full opacity-[0.2] dark:opacity-[0.3] blur-[140px] bg-primary transform-gpu"
        />
        <motion.div 
          animate={{ 
            scale: [1.3, 1, 1.3],
            rotate: [0, -120, 0],
            x: [0, -50, 0],
            y: [0, 70, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[25%] -right-[15%] w-[80%] h-[80%] rounded-full opacity-[0.15] dark:opacity-[0.25] blur-[140px] bg-accent transform-gpu"
        />
      </div>

      {/* Hardware-Accelerated Icon Constellation */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.1] dark:opacity-[0.2]">
        {bgIcons.map((item) => (
          <motion.div
            key={item.id}
            animate={{ 
              y: [0, -80, 0],
              x: [0, 40, 0],
              rotate: [0, 20, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            className="absolute text-primary/40 transform-gpu"
            style={{ top: item.top, left: item.left }}
          >
            <item.Icon size={48} strokeWidth={1} />
          </motion.div>
        ))}
      </div>

      <header className="shrink-0 pt-4 px-8 z-50">
        <div className="flex justify-between items-center w-full">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={iosSpring}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-2xl border-none overflow-hidden active:scale-90 transition-all duration-300">
              <Image src="/icons/icon-192.png" alt="Quvora" width={32} height={32} priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-[0.35em] uppercase text-primary">Quvora</span>
              <span className="text-[14px] font-black tracking-tighter text-foreground -mt-1 opacity-60">Super App</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2 items-center glass px-4 py-2 rounded-full border-none shadow-sm">
              {SLIDES.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    width: i === index ? 28 : 8,
                    backgroundColor: i === index ? currentSlide.color : (isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)')
                  }}
                  transition={iosSpring}
                  className="h-1.5 rounded-full"
                />
              ))}
            </div>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-11 w-11 glass rounded-full border-none shadow-lg active:scale-90 transition-all" 
              onClick={toggleTheme}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ y: 20, opacity: 0, scale: 0.5, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ y: -20, opacity: 0, scale: 0.5, rotate: 90 }}
                  transition={iosSpring}
                  className="flex items-center justify-center w-full h-full"
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
            className="w-full h-full flex items-center justify-center px-10 relative z-10 transform-gpu"
            draggable="false"
          >
            <div className="relative w-full max-w-[280px] aspect-square overflow-visible transform-gpu">
              {/* Hardware-Accelerated Alive Stage */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.05, 1],
                  y: [0, -12, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{
                  duration: 5, repeat: Infinity, ease: "easeInOut"
                }}
                className={cn(
                  "w-full h-full rounded-[4.5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-2 transition-all duration-1000 transform-gpu",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 bg-white/15 dark:bg-black/15 backdrop-blur-3xl" />
                <div className="w-full h-full glass rounded-[4.2rem] border-none shadow-2xl flex items-center justify-center relative z-10">
                   <motion.div
                      animate={{ 
                        filter: [
                          `drop-shadow(0 0 0px ${currentSlide.color}00)`,
                          `drop-shadow(0 0 50px ${currentSlide.color}90)`,
                          `drop-shadow(0 0 0px ${currentSlide.color}00)`
                        ],
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={100} style={{ color: currentSlide.color }} className="drop-shadow-3xl brightness-125" />
                   </motion.div>
                </div>
                
                {/* Surface Glow Layer */}
                <div 
                  className="absolute inset-0 opacity-50 blur-[120px] rounded-full" 
                  style={{ backgroundColor: currentSlide.color }} 
                />
              </motion.div>

              {/* Liquid-Snap Floating Badges */}
              <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
                {currentSlide.badges.map((BadgeIcon, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -50, 20, -40, 0],
                      x: [0, i % 2 === 0 ? -40 : 40, i % 2 === 0 ? 30 : -30, 0],
                      rotate: [0, i % 2 === 0 ? -30 : 30, i % 2 === 0 ? 25 : -25, 0],
                      scale: [1, 1.3, 0.8, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 7 + i, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                    className={cn(
                      "absolute w-18 h-18 glass-thick rounded-[2.2rem] border-none shadow-2xl flex items-center justify-center z-40 transform-gpu",
                      i === 0 ? "-top-12 -left-12" : "-bottom-12 -right-12"
                    )}
                  >
                    <BadgeIcon size={36} style={{ color: currentSlide.color }} className="brightness-125" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="shrink-0 w-full glass-thick rounded-t-[4rem] shadow-[0_-30px_80px_rgba(0,0,0,0.2)] pt-6 pb-[env(safe-area-inset-bottom,2rem)] px-10 text-center flex flex-col items-center z-50 transform-gpu transition-colors duration-500">
        <div className="w-14 h-1.5 bg-foreground/15 rounded-full mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, filter: 'blur(15px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(15px)' }}
            transition={iosSpring}
            className="flex flex-col gap-2 mb-8 w-full"
          >
            <h1 className="text-[34px] font-black tracking-tighter text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.35em] opacity-60">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[360px] flex flex-col gap-4">
          <AuthModal 
            defaultTab="register"
            trigger={
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button className="w-full h-16 rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] bg-primary text-white shadow-2xl shadow-primary/30 transition-all border-none transform-gpu">
                  Create Free Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            }
          />
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="flex flex-col items-center gap-1.5 group outline-none active:scale-95 transition-transform">
                <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest group-hover:text-muted-foreground/60 transition-colors">
                  Already a member?
                </p>
                <span className="text-[12px] font-black text-primary uppercase tracking-[0.2em] group-active:opacity-70 transition-opacity">
                  Sign in to Quvora
                </span>
              </button>
            }
          />
        </div>

        <div className="mt-6 flex items-center gap-2.5 opacity-30">
          <ShieldCheck size={16} className="text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
            Trusted by 10M+ Indians
          </span>
        </div>
      </footer>
    </div>
  );
}
