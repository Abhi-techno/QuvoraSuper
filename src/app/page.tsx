'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LoginSheet } from '@/components/auth/login-sheet';
import { RegisterSheet } from '@/components/auth/register-sheet';
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
  Target,
  Smartphone,
  MapPin,
  Globe,
  Car,
  Home,
  UserCheck,
  Lock,
  ShieldAlert,
  Phone,
  Mic,
  BookOpen,
  GraduationCap,
  Users,
  LineChart,
  ShoppingBag,
  Brain,
  TrendingUp,
  LogIn,
  Sun,
  Moon
} from 'lucide-react';

const SLIDES = [
  {
    id: 'marketplace',
    title: 'Buy & Sell Smarter',
    subtitle: 'Discover nearby products, vehicles, rentals, and verified deals instantly.',
    icon: Store,
    color: '#1A6AFF',
    bg: 'from-blue-500/10 to-transparent',
    chips: [
      { label: 'Mobiles', icon: Smartphone },
      { label: 'Cars', icon: Car },
      { label: 'Property', icon: Home },
      { label: 'Live Chat', icon: MessageCircle },
      { label: 'Verified Sellers', icon: ShieldCheck }
    ]
  },
  {
    id: 'ai-assistant',
    title: 'Your AI Growth Partner',
    subtitle: 'Get intelligent recommendations, guidance, and personalized opportunities.',
    icon: Bot,
    color: '#FF6B2B',
    bg: 'from-orange-500/10 to-transparent',
    chips: [
      { label: 'Smart Recommendations', icon: Target },
      { label: 'Career Guidance', icon: Briefcase },
      { label: 'AI Insights', icon: TrendingUp },
      { label: 'Fast Search', icon: Zap },
      { label: 'Personalized Feed', icon: Brain }
    ]
  },
  {
    id: 'secure-chat',
    title: 'Safe & Trusted Connections',
    subtitle: 'Chat securely with buyers, sellers, employers, and mentors in real time.',
    icon: ShieldCheck,
    color: '#10B981',
    bg: 'from-emerald-500/10 to-transparent',
    chips: [
      { label: 'Secure Messaging', icon: Lock },
      { label: 'Verified Profiles', icon: UserCheck },
      { label: 'Location Sharing', icon: MapPin },
      { label: 'Voice Support', icon: Phone },
      { label: 'Scam Protection', icon: ShieldAlert }
    ]
  },
  {
    id: 'languages',
    title: 'Built for Every Language',
    subtitle: 'Experience Quvora in your preferred language with AI-powered assistance.',
    icon: Languages,
    color: '#7C3AED',
    bg: 'from-purple-500/10 to-transparent',
    chips: [
      { label: 'Regional Languages', icon: Languages },
      { label: 'Voice Support', icon: Mic },
      { label: 'AI Translation', icon: Sparkles },
      { label: 'Learning Tools', icon: BookOpen },
      { label: 'Inclusive Access', icon: Globe }
    ]
  },
  {
    id: 'growth',
    title: 'Learn, Work & Grow',
    subtitle: 'Explore jobs, freelancing, mentorship, and skill-building opportunities.',
    icon: GraduationCap,
    color: '#F59E0B',
    bg: 'from-amber-500/10 to-transparent',
    chips: [
      { label: 'Jobs', icon: Briefcase },
      { label: 'Freelancing', icon: Rocket },
      { label: 'Courses', icon: GraduationCap },
      { label: 'Mentorship', icon: Users },
      { label: 'Career Growth', icon: LineChart }
    ]
  },
  {
    id: 'ecosystem',
    title: 'Move Smarter with Quvora',
    subtitle: 'India’s AI-powered superapp for opportunities, growth, and connections.',
    icon: Globe,
    color: '#EC4899',
    bg: 'from-pink-500/10 to-transparent',
    chips: [
      { label: 'Marketplace', icon: ShoppingBag },
      { label: 'AI Powered', icon: Bot },
      { label: 'Community', icon: Users },
      { label: 'Careers', icon: Briefcase },
      { label: 'Rentals', icon: Home }
    ]
  }
];

const AUTO_PLAY_INTERVAL = 5000;
const iosSpring = {
  type: "spring",
  stiffness: 420,
  damping: 40,
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
    if (!loading && user && user.emailVerified) {
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
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-40 transform-gpu">
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[80%] h-[80%] rounded-full blur-[80px] bg-primary/20 transform-gpu"
        />
        <motion.div 
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[80%] rounded-full blur-[80px] bg-accent/20 transform-gpu"
        />
      </div>

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

          <div className="flex items-center gap-2">
            <div className="flex gap-1 items-center glass px-2 py-1.5 rounded-full border-none shadow-sm mr-2">
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
            <div className="flex items-center gap-1.5">
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
              <LoginSheet 
                trigger={
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-9 w-9 glass rounded-full border-none shadow-sm active:scale-90 transition-all hover:bg-transparent"
                  >
                    <LogIn className="w-4 h-4 text-primary" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={iosSpring}
            className="w-full h-full flex items-center justify-center px-8 relative"
          >
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              <motion.div 
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-[70%] h-[70%] rounded-[4.5rem] shadow-2xl relative overflow-hidden bg-gradient-to-br flex items-center justify-center p-0.5 transform-gpu",
                  currentSlide.bg
                )}
              >
                <div className="absolute inset-0 glass-thick rounded-[4.4rem] border-none flex items-center justify-center">
                   <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <MainIcon size={80} style={{ color: currentSlide.color }} className="drop-shadow-2xl" />
                   </motion.div>
                </div>
              </motion.div>

              {currentSlide.chips.map((chip, i) => {
                const angle = (i / currentSlide.chips.length) * Math.PI * 2;
                const radius = 135;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={chip.label}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      x, 
                      y: y + (Math.sin(Date.now() / 1500 + i) * 10)
                    }}
                    transition={{
                      ...iosSpring,
                      delay: i * 0.05
                    }}
                    className="absolute glass-thick rounded-2xl px-3 py-1.5 flex items-center gap-2 border-none shadow-lg z-20 pointer-events-none"
                  >
                    <chip.icon size={13} style={{ color: currentSlide.color }} />
                    <span className="text-[9px] font-black uppercase tracking-tight text-foreground/85">{chip.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer 
        className="shrink-0 w-full glass-thick rounded-t-[3rem] shadow-2xl pt-6 px-8 text-center flex flex-col items-center z-50 border-t border-white/10 transform-gpu"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <div className="w-12 h-1 bg-foreground/10 rounded-full mb-4 opacity-30" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={iosSpring}
            className="flex flex-col gap-2 mb-6 w-full"
          >
            <h1 className="text-2xl font-black tracking-tight text-foreground leading-none">
              {currentSlide.title}
            </h1>
            <p className="text-[11px] font-bold text-muted-foreground leading-snug px-6">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <RegisterSheet 
            trigger={
              <Button className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-widest bg-primary text-white shadow-xl shadow-primary/20 border-none active:scale-[0.97] transition-all">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            }
          />
          <LoginSheet 
            trigger={
              <button className="flex items-center justify-center gap-2 opacity-60 hover:opacity-100 transition-opacity active:scale-95 py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Already a member?</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Login</span>
              </button>
            }
          />
        </div>

        <div className="mt-4 flex items-center gap-2 opacity-30 pointer-events-none">
          <ShieldCheck size={14} className="text-primary" />
          <span className="text-[8px] font-black uppercase tracking-[0.35em] text-foreground">Fast • Secure • AI Powered</span>
        </div>
      </footer>
    </div>
  );
}
