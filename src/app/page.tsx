
'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Zap, Globe, Car, Smartphone, Home, Shield } from 'lucide-react';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
    icon: Zap,
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
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen w-full bg-background flex items-center justify-center">
      <div className="w-10 h-10 rounded-2xl bg-primary animate-pulse shadow-2xl shadow-primary/20" />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className={cn(
                "relative flex-[0_0_100%] h-full flex flex-col items-center justify-center transition-all duration-1000 bg-gradient-to-br",
                slide.gradient
              )}
            >
              <div className="max-w-xs text-center space-y-6 animate-in fade-in zoom-in-95 duration-1000">
                <div className="w-20 h-20 mx-auto glass rounded-3xl flex items-center justify-center text-primary shadow-xl">
                  <slide.icon className="w-10 h-10" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black tracking-tight">{slide.title}</h2>
                  <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-16 left-8 right-8 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 bg-muted-foreground/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary/40 w-full animate-in fade-in duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
