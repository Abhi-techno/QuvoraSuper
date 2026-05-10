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
    gradient: 'from-primary/5 to-transparent'
  },
  { 
    id: '2', 
    title: 'Premium Cars & Bikes', 
    subtitle: 'Verified listings with real-time AI inspections.',
    icon: Car,
    gradient: 'from-primary/10 to-transparent'
  },
  { 
    id: '3', 
    title: 'Latest Gadgets', 
    subtitle: 'Find the best deals with AI price insights.',
    icon: Smartphone,
    gradient: 'from-primary/5 to-transparent'
  },
  { 
    id: '4', 
    title: 'Modern Living', 
    subtitle: 'Upgrade your home with handpicked furniture.',
    icon: Home,
    gradient: 'from-primary/10 to-transparent'
  },
  { 
    id: '5', 
    title: 'Local Community', 
    subtitle: 'Buy and sell safely in your neighborhood.',
    icon: Sparkles,
    gradient: 'from-primary/5 to-transparent'
  },
  { 
    id: '6', 
    title: 'Secure Trading', 
    subtitle: 'Zero middlemen. 100% trust with Liquid Glass.',
    icon: Shield,
    gradient: 'from-primary/10 to-transparent'
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 45 }, [
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
      <div className="w-8 h-8 rounded-lg bg-primary animate-pulse shadow-2xl shadow-primary/20" />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col select-none touch-none">
      
      {/* TOP NAVIGATION */}
      <header className="absolute top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] px-6">
        <div className="flex items-center justify-between h-12">
          <div className="glass px-3 py-1.5 rounded-full border-none flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center text-white font-black text-[10px]">Q</div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Quvora</span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass h-8 w-8 rounded-full border-none"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-primary" />
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

      {/* CENTER NARRATIVE */}
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
              <div className="max-w-[280px] text-center space-y-6 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-20 h-20 mx-auto glass rounded-[2rem] flex items-center justify-center text-primary shadow-2xl border-white/10 animate-float">
                  <slide.icon className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black tracking-tighter leading-none">
                    {slide.title}
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed px-4 opacity-70">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="absolute top-[18%] left-12 right-12 flex gap-1.5 z-20">
          {slides.map((_, i) => (
            <div key={i} className="h-0.5 flex-1 bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <footer className="absolute bottom-0 left-0 right-0 z-30 pb-[env(safe-area-inset-bottom)]">
        <div className="glass-thick pt-5 pb-8 px-8 rounded-t-[2.5rem] border-t border-white/5">
          <div className="max-w-md mx-auto flex flex-col gap-2.5">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-13 rounded-2xl w-full text-sm font-black shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                  Create Account / Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              } 
            />
            
            <AuthModal 
              defaultTab="login"
              trigger={
                <Button variant="ghost" className="h-10 rounded-2xl w-full text-[9px] font-black text-muted-foreground uppercase tracking-[0.25em]">
                  Login Options
                </Button>
              }
            />

            <div className="flex items-center justify-center gap-2 mt-1 opacity-20">
              <Shield className="w-3 h-3 text-primary" />
              <span className="text-[6px] font-black uppercase tracking-[0.3em]">Liquid Glass Secured</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}