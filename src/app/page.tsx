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
    subtitle: "India's first AI-powered vernacular marketplace. Faster, safer, smarter.",
    icon: Globe,
    gradient: 'from-blue-600/20 to-indigo-600/20'
  },
  { 
    id: '2', 
    title: 'Premium Cars & Bikes', 
    subtitle: 'Verified listings with real-time AI inspections and direct seller contact.',
    icon: Car,
    gradient: 'from-orange-600/20 to-red-600/20'
  },
  { 
    id: '3', 
    title: 'Latest Gadgets', 
    subtitle: 'Find the best deals on mobiles and electronics with AI price insights.',
    icon: Smartphone,
    gradient: 'from-emerald-600/20 to-teal-600/20'
  },
  { 
    id: '4', 
    title: 'Modern Living', 
    subtitle: 'Upgrade your home with handpicked furniture and home appliances.',
    icon: Home,
    gradient: 'from-purple-600/20 to-pink-600/20'
  },
  { 
    id: '5', 
    title: 'Local Community', 
    subtitle: 'Buy and sell safely in your neighborhood. Verified profiles only.',
    icon: Sparkles,
    gradient: 'from-yellow-600/20 to-amber-600/20'
  },
  { 
    id: '6', 
    title: 'Secure Trading', 
    subtitle: 'Zero middlemen, zero commission. 100% trust with Liquid Glass security.',
    icon: Shield,
    gradient: 'from-cyan-600/20 to-blue-600/20'
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
      <div className="w-12 h-12 rounded-2xl bg-primary animate-pulse shadow-2xl shadow-primary/20" />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Narrative Carousel Background */}
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
              <div className="max-w-xs text-center space-y-8 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-24 h-24 mx-auto glass rounded-[2rem] flex items-center justify-center text-primary shadow-2xl border-white/20">
                  <slide.icon className="w-12 h-12" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tighter leading-tight drop-shadow-sm">{slide.title}</h2>
                  <p className="text-base text-muted-foreground font-medium leading-relaxed px-4 opacity-80">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-16 left-8 right-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary/40 w-full animate-in fade-in duration-1000" />
          </div>
        ))}
      </div>

      {/* iOS Liquid Glass Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="glass-thick pt-8 pb-12 px-8 rounded-t-[3rem] border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="max-w-md mx-auto flex flex-col gap-4">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-16 rounded-2xl w-full text-lg font-bold shadow-xl shadow-primary/20 group transition-all active:scale-95">
                  Create Account / Continue
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              } 
            />
            
            <AuthModal 
              defaultTab="login"
              trigger={
                <Button variant="ghost" className="h-14 rounded-2xl w-full text-base font-bold text-muted-foreground hover:text-foreground active:scale-95">
                  Login Options
                </Button>
              }
            />

            <div className="flex items-center justify-center gap-2 mt-2 opacity-40">
              <Shield className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Liquid Glass Security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Logo Badge */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
        <div className="glass px-4 py-2 rounded-full border-none flex items-center gap-2 shadow-lg">
          <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center text-white font-black text-xs">Q</div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60">Quvora Redefined</span>
        </div>
      </div>
    </div>
  );
}
