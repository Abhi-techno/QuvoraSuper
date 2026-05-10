'use client';

import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthModal } from '@/components/auth/auth-modal';
import { getPlaceholderById } from '@/lib/placeholder-images';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

const slides = [
  { id: 'slide-1', title: 'Your World. One Place.', subtitle: 'India\'s first AI-powered vernacular marketplace.' },
  { id: 'slide-2', title: 'Premium Cars & Bikes', subtitle: 'Verified listings with real-time AI inspections.' },
  { id: 'slide-3', title: 'Latest Gadgets', subtitle: 'Find the best deals on mobiles and electronics.' },
  { id: 'slide-4', title: 'Modern Living', subtitle: 'Upgrade your home with handpicked furniture.' },
  { id: 'slide-5', title: 'Local Community', subtitle: 'Buy and sell safely in your neighborhood.' },
  { id: 'slide-6', title: 'Secure Trading', subtitle: 'Zero middlemen, zero commission, 100% trust.' }
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen w-full bg-[#0D1B2A] flex items-center justify-center">
      <div className="w-10 h-10 rounded-xl bg-primary animate-bounce shadow-2xl shadow-primary/50" />
    </div>
  );

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
                  className="object-cover opacity-60 scale-105"
                  priority
                  data-ai-hint={imageData.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#0D1B2A]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12">
        <div className="max-w-md mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.1em] text-[9px] uppercase glass w-fit px-3 py-1 rounded-full border-none">
              <Sparkles className="w-3 h-3" />
              Liquid Glass Experience
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter text-white leading-[0.95] drop-shadow-xl">
              Marketplace <br />
              <span className="text-primary">Redefined.</span>
            </h1>
            <p className="text-base text-white/80 leading-relaxed font-medium max-w-[80%]">
              Discover a faster, safer, and smarter way to trade in your community.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-16 rounded-2xl w-full text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 active:scale-95 transition-all">
                  Create new account / continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
            
            <div className="flex items-center gap-3">
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="flex-1 h-12 rounded-xl glass text-white font-bold border-none active:scale-95 transition-all text-sm">
                    Login options
                  </Button>
                }
              />
              <Button 
                variant="ghost" 
                className="flex-1 h-12 rounded-xl glass text-white/40 font-bold border-none hover:text-white active:scale-95 transition-all text-sm"
                onClick={() => router.push('/explore')}
              >
                Guest View
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/30 text-[8px] uppercase tracking-[0.2em] font-bold">
            <ShieldCheck className="w-3 h-3" />
            End-to-End Encrypted Deals
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-12 left-6 right-6 flex gap-1.5 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 glass rounded-full overflow-hidden border-none">
            <div className="h-full bg-primary/30 w-full animate-in fade-in duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}