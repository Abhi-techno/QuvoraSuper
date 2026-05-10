
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
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen w-full bg-[#0D1B2A] flex items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-primary animate-pulse shadow-2xl shadow-primary/40" />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-[#050A10] overflow-hidden">
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
                  className="object-cover opacity-50 scale-105"
                  priority
                  data-ai-hint={imageData.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050A10]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-16">
        <div className="max-w-md mx-auto w-full space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.2em] text-[10px] uppercase glass w-fit px-4 py-1.5 rounded-full border-none mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5" />
              Liquid Glass Experience
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl">
              Quvora <br />
              <span className="text-primary">Redefined.</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed font-medium max-w-[90%] mx-auto sm:mx-0">
              India's first vernacular-first, AI-powered marketplace. Faster, safer, smarter.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="h-16 rounded-[1.5rem] w-full text-xl font-bold shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 active:scale-95 transition-all">
                  Create new account / continue <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              }
            />
            
            <div className="flex items-center gap-3">
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="flex-1 h-14 rounded-[1.25rem] glass text-white font-bold border-none active:scale-95 transition-all text-sm">
                    Login options
                  </Button>
                }
              />
              <Button 
                variant="ghost" 
                className="flex-1 h-14 rounded-[1.25rem] glass text-white/40 font-bold border-none hover:text-white active:scale-95 transition-all text-sm"
                onClick={() => router.push('/explore')}
              >
                Guest View
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/20 text-[9px] uppercase tracking-[0.3em] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            End-to-End Encrypted Deals
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute top-16 left-8 right-8 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div key={i} className="h-1 flex-1 glass rounded-full overflow-hidden border-none opacity-40">
            <div className="h-full bg-primary/50 w-full animate-in fade-in duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
