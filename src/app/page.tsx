'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sparkles, Globe, Car, Smartphone, Home, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';

const slides = [
  { 
    id: '1', 
    title: 'Your World. One Place.', 
    subtitle: "India's first AI-powered vernacular marketplace.",
    icon: Globe,
    gradient: 'from-blue-600/10 to-indigo-600/10'
  },
  { 
    id: '2', 
    title: 'Premium Cars & Bikes', 
    subtitle: 'Verified listings with real-time AI inspections.',
    icon: Car,
    gradient: 'from-orange-600/10 to-red-600/10'
  },
  { 
    id: '3', 
    title: 'Latest Gadgets', 
    subtitle: 'Find the best deals with AI price insights.',
    icon: Smartphone,
    gradient: 'from-emerald-600/10 to-teal-600/10'
  },
  { 
    id: '4', 
    title: 'Modern Living', 
    subtitle: 'Upgrade your home with handpicked furniture.',
    icon: Home,
    gradient: 'from-purple-600/10 to-pink-600/10'
  },
  { 
    id: '5', 
    title: 'Local Community', 
    subtitle: 'Buy and sell safely in your neighborhood.',
    icon: Sparkles,
    gradient: 'from-yellow-600/10 to-amber-600/10'
  },
  { 
    id: '6', 
    title: 'Secure Trading', 
    subtitle: 'Zero middlemen. 100% trust with Liquid Glass.',
    icon: Shield,
    gradient: 'from-cyan-600/10 to-blue-600/10'
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

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
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Immersive Adaptive Carousel */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
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
                <div className="w-20 h-20 mx-auto glass rounded-3xl flex items-center justify-center text-primary shadow-xl border-white/20">
                  <slide.icon className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black tracking-tighter leading-tight drop-shadow-sm">{slide.title}</h2>
                  <p className="text-sm text-muted-foreground font-medium leading-snug px-2 opacity-80">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adaptive Progress Indicators */}
      <div className="absolute top-14 left-8 right-8 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 bg-primary/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary/20 w-full animate-in fade-in duration-1000" />
          </div>
        ))}
      </div>

      {/* Compact iOS Liquid Glass Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="glass-thick pt-6 pb-10 px-6 rounded-t-[2.5rem] border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto flex flex-col gap-3">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-14 rounded-2xl w-full text-base font-bold shadow-lg shadow-primary/20 group transition-all active:scale-[0.98]">
                  Create Account / Continue
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              } 
            />
            
            <AuthModal 
              defaultTab="login"
              trigger={
                <Button variant="ghost" className="h-12 rounded-2xl w-full text-xs font-bold text-muted-foreground hover:text-foreground active:scale-[0.98] uppercase tracking-widest">
                  Login Options
                </Button>
              }
            />

            <div className="flex items-center justify-center gap-1.5 mt-1 opacity-30">
              <Shield className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Liquid Glass Secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Logo Badge */}
      <div className="absolute top-18 left-1/2 -translate-x-1/2 z-20">
        <div className="glass px-3 py-1.5 rounded-full border-none flex items-center gap-2 shadow-sm">
          <div className="w-4 h-4 rounded-md bg-primary flex items-center justify-center text-white font-black text-[10px]">Q</div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/40">Quvora Redefined</span>
        </div>
      </div>
    </div>
  );
}
