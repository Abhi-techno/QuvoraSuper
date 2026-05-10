
"use client";

import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { getPlaceholderById } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

const slides = [
  {
    id: 'slide-1',
    title: 'Your World. One Place.',
    subtitle: "India's fastest growing AI-powered local marketplace.",
    badge: 'VERNACULAR FIRST'
  },
  {
    id: 'slide-2',
    title: 'Premium Cars & Bikes',
    subtitle: 'Verified listings from trusted sellers in your city.',
    badge: '100% VERIFIED'
  },
  {
    id: 'slide-3',
    title: 'Latest Gadgets',
    subtitle: 'Upgrade your tech with smart price suggestions.',
    badge: 'AI PRICING'
  },
  {
    id: 'slide-4',
    title: 'Modern Living',
    subtitle: 'Furniture and decor that fits your lifestyle.',
    badge: 'HOME & DECOR'
  },
  {
    id: 'slide-5',
    title: 'Local Community',
    subtitle: 'Buy and sell within your neighborhood safely.',
    badge: 'LOCAL FIRST'
  },
  {
    id: 'slide-6',
    title: 'Secure Trading',
    subtitle: 'Direct chat with sellers. No hidden middlemen.',
    badge: 'SECURE CHAT'
  }
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="relative h-screen w-full bg-[#0D1B2A] overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => {
            const imageData = getPlaceholderById(slide.id);
            return (
              <div key={slide.id} className="relative flex-[0_0_100%] h-full">
                <Image
                  src={imageData.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-60"
                  priority
                  data-ai-hint={imageData.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0D1B2A]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12">
        <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Powered by Quvora AI
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white leading-[1.1]">
              Quvora <br />
              Marketplace
            </h1>
            <p className="text-lg text-white/70 leading-relaxed font-medium">
              India's first vernacular-first, AI-powered marketplace for everything.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-16 rounded-2xl w-full text-lg font-bold shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
            
            <div className="flex items-center gap-4">
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="flex-1 h-14 rounded-2xl glass text-white font-bold border-white/10">
                    Login
                  </Button>
                }
              />
              <Button 
                variant="ghost" 
                className="flex-1 h-14 rounded-2xl glass text-white/60 font-bold border-white/10 hover:text-white"
                onClick={() => router.push('/explore')}
              >
                Guest View
              </Button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-white/30 tracking-widest uppercase font-bold">
              Trusted by 1M+ Users across India
            </p>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-12 left-6 right-6 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary/40 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
