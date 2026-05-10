'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sparkles, Globe, Car, Smartphone, Home, Shield, ChevronRight, MapPin, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';

const slides = [
  { 
    id: '1', 
    title: 'Your World. One Place.', 
    subtitle: "India's first AI-powered vernacular marketplace.",
    icon: Globe,
    gradient: 'from-sky-500/10 to-sky-900/30'
  },
  { 
    id: '2', 
    title: 'Premium Cars & Bikes', 
    subtitle: 'Verified listings with real-time AI inspections.',
    icon: Car,
    gradient: 'from-sky-400/10 to-sky-800/20'
  },
  { 
    id: '3', 
    title: 'Latest Gadgets', 
    subtitle: 'Find the best deals with AI price insights.',
    icon: Smartphone,
    gradient: 'from-sky-300/10 to-sky-700/20'
  },
  { 
    id: '4', 
    title: 'Modern Living', 
    subtitle: 'Upgrade your home with handpicked furniture.',
    icon: Home,
    gradient: 'from-sky-200/10 to-sky-600/20'
  },
  { 
    id: '5', 
    title: 'Local Community', 
    subtitle: 'Buy and sell safely in your neighborhood.',
    icon: Sparkles,
    gradient: 'from-sky-400/10 to-sky-600/30'
  },
  { 
    id: '6', 
    title: 'Secure Trading', 
    subtitle: 'Zero middlemen. 100% trust with Liquid Glass.',
    icon: Shield,
    gradient: 'from-sky-500/20 to-sky-900/40'
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen w-full bg-background flex items-center justify-center">
      <div className="w-10 h-10 rounded-xl bg-primary animate-pulse shadow-2xl shadow-primary/20" />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col select-none touch-none">
      
      {/* 1. TOP NAVIGATION: Contextual Header */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] px-6">
        <div className="flex items-center justify-between h-14">
          <div className="glass px-3 py-1.5 rounded-full border-none flex items-center gap-2 shadow-sm">
            <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center text-white font-black text-[10px]">Q</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60">Quvora</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass h-8 w-8 rounded-full border-none transition-transform active:scale-90"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-primary" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="glass h-8 w-8 rounded-full border-none">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" className="glass h-8 w-8 rounded-full border-none">
              <Bell className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </header>

      {/* 2. CENTER PART: Auto-running Narrative Slides */}
      <div className="flex-1 relative z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className={cn(
                "relative flex-[0_0_100%] h-full flex flex-col items-center justify-center transition-all duration-1000 bg-gradient-to-br",
                slide.gradient
              )}
            >
              <div className="max-w-[300px] text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-24 h-24 mx-auto glass rounded-[2.5rem] flex items-center justify-center text-primary shadow-2xl border-white/20 animate-float">
                  <slide.icon className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter leading-[0.9] drop-shadow-sm">
                    {slide.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed px-4 opacity-70">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adaptive Progress Indicators */}
        <div className="absolute top-[15%] left-10 right-10 flex gap-2 z-20">
          {slides.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* 3. BOTTOM NAVIGATION: Compact Action Bar */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="glass-thick pt-6 pb-8 px-8 rounded-t-[3rem] border-t border-white/10 shadow-[0_-15px_50px_rgba(0,0,0,0.2)]">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-14 rounded-2xl w-full text-base font-bold shadow-lg shadow-primary/20 group transition-all active:scale-[0.96] bg-primary">
                  Create Account / Continue
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              } 
            />
            
            <AuthModal 
              defaultTab="login"
              trigger={
                <Button variant="ghost" className="h-12 rounded-2xl w-full text-[10px] font-bold text-muted-foreground hover:text-foreground active:scale-[0.98] uppercase tracking-[0.25em]">
                  Login Options
                </Button>
              }
            />

            <div className="flex items-center justify-center gap-2 mt-2 opacity-20">
              <Shield className="w-3 h-3" />
              <span className="text-[7px] font-black uppercase tracking-[0.3em]">Liquid Glass Secured</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}