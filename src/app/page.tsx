
'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const slides = [
  { 
    id: 'marketplace', 
    title: 'Buy and sell locally without any hassle', 
    subtitle: 'Mobiles, cars, homes, and 100+ more categories at your fingertips.',
    imageUrl: "https://picsum.photos/seed/q1/600/600",
    imageHint: "marketplace app",
    buttonLabel: "Continue Now"
  },
  { 
    id: 'safety', 
    title: 'Safe, secure, and verified profiles', 
    subtitle: 'Worry-free trading experience with Quvora AI security review.',
    imageUrl: "https://picsum.photos/seed/q3/600/600",
    imageHint: "security review",
    buttonLabel: "Continue Now"
  },
  { 
    id: 'insights', 
    title: 'Track your performance with AI insights', 
    subtitle: 'Get fair market value suggestions to sell faster and buy smarter.',
    imageUrl: "https://picsum.photos/seed/q4/600/600",
    imageHint: "performance chart",
    buttonLabel: "Let's started"
  }
];

export default function LandingPage({
  params,
  searchParams
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  // Unwrap promises for Next.js 15 compatibility
  use(params);
  use(searchParams);

  const router = useRouter();
  const { user, loading } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    router.push('/explore');
  };

  if (loading) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-12 h-12 rounded-2xl bg-primary shadow-2xl shadow-primary/40" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 h-screen w-full bg-black overflow-hidden flex flex-col select-none touch-none font-body">
      
      {/* TOP NAV: iOS Dash Progress & Skip */}
      <div className="absolute top-0 left-0 right-0 z-50 px-8 pt-16 flex justify-between items-center">
        <div className="flex gap-1.5 items-center">
          {slides.map((_, i) => (
            <motion.div 
              key={i}
              className="h-1 rounded-full bg-white/20"
              initial={false}
              animate={{ 
                width: i === currentIndex ? 32 : 12,
                backgroundColor: i === currentIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)"
              }}
              transition={{ duration: 0.4, ease: "circOut" }}
            />
          ))}
        </div>
        <button 
          onClick={handleSkip}
          className="text-sm font-bold text-white/60 hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* ILLUSTRATION AREA (Top 55%) */}
      <div className="h-[55%] relative w-full flex items-center justify-center pt-20 px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-square max-w-[340px]"
          >
            <Image
              src={currentSlide.imageUrl}
              alt="Illustration"
              fill
              className="object-contain"
              data-ai-hint={currentSlide.imageHint}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ACTION CARD AREA (Bottom 45%) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-[45%] w-full bg-white rounded-t-[3.5rem] relative z-10 flex flex-col items-center px-10 pt-12 pb-16 text-center shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.3)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + "-text"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col flex-1"
          >
            <h1 className="text-3xl font-black tracking-tight text-black leading-[1.15] mb-4">
              {currentSlide.title}
            </h1>
            <p className="text-sm text-black/50 font-semibold leading-relaxed max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* PRIMARY ACTION BUTTON */}
        <div className="w-full mt-auto">
          {currentIndex === slides.length - 1 ? (
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="w-full h-15 rounded-3xl bg-black text-white hover:bg-black/90 text-sm font-black shadow-2xl active:scale-[0.98] transition-all uppercase tracking-wider">
                  {currentSlide.buttonLabel}
                </Button>
              }
            />
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full h-15 rounded-3xl bg-black text-white hover:bg-black/90 text-sm font-black shadow-2xl active:scale-[0.98] transition-all uppercase tracking-wider"
            >
              {currentSlide.buttonLabel}
            </Button>
          )}
        </div>
      </motion.div>

    </div>
  );
}
