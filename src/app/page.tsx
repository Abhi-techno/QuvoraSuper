'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 'slide-1',
    title: 'Welcome to Quvora',
    subtitle: 'India’s AI-powered marketplace and career ecosystem.',
    imageUrl: 'https://picsum.photos/seed/q1/800/800',
    imageHint: 'floating smartphone',
    bgColor: 'bg-[#FF8A65]/10', // Soft Orange
    artworkBg: 'bg-[#FF8A65]'
  },
  {
    id: 'slide-2',
    title: 'Buy & Sell Instantly',
    subtitle: 'Mobiles, cars, electronics, rentals, and more nearby.',
    imageUrl: 'https://picsum.photos/seed/q2/800/800',
    imageHint: 'handshake marketplace',
    bgColor: 'bg-[#FFB84C]/10', // Warm Yellow
    artworkBg: 'bg-[#FFB84C]'
  },
  {
    id: 'slide-3',
    title: 'Your AI Career Copilot',
    subtitle: 'Smart jobs, resume help, interview prep, and growth tools.',
    imageUrl: 'https://picsum.photos/seed/q3/800/800',
    imageHint: 'hologram assistant',
    bgColor: 'bg-[#8B5CF6]/10', // Soft Purple
    artworkBg: 'bg-[#8B5CF6]'
  },
  {
    id: 'slide-4',
    title: 'Find Homes & Rentals',
    subtitle: 'Discover flats, PGs, hostels, and verified properties.',
    imageUrl: 'https://picsum.photos/seed/q4/800/800',
    imageHint: '3d home',
    bgColor: 'bg-[#7AB6F9]/10', // Soft Blue
    artworkBg: 'bg-[#7AB6F9]'
  },
  {
    id: 'slide-5',
    title: 'Learn Skills & Earn More',
    subtitle: 'Courses, freelancing, mentorship, and internships together.',
    imageUrl: 'https://picsum.photos/seed/q5/800/800',
    imageHint: 'online learning',
    bgColor: 'bg-[#FF6B6B]/10', // Light Peach
    artworkBg: 'bg-[#FF6B6B]'
  },
  {
    id: 'slide-6',
    title: 'Move Smarter with Quvora',
    subtitle: 'The all-in-one AI superapp for India’s next generation.',
    imageUrl: 'https://picsum.photos/seed/q6/800/800',
    imageHint: 'digital globe',
    bgColor: 'bg-background',
    artworkBg: 'bg-primary',
    isFinal: true
  }
];

export default function LandingPage({
  params,
  searchParams
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  // Unwrap params for Next.js 15
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
    setCurrentIndex(slides.length - 1);
  };

  if (loading) return (
    <div className="h-svh w-full bg-background flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 rounded-2xl bg-primary" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];

  return (
    <div className="fixed inset-0 h-svh w-full bg-[#F7EFE5] flex flex-col overflow-hidden">
      
      {/* Upper Artwork Section (65%) */}
      <div className={`flex-[1.8] relative w-full ${currentSlide.artworkBg} transition-colors duration-1000 flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-square max-w-[280px]"
          >
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full relative"
            >
              <Image
                src={currentSlide.imageUrl}
                alt={currentSlide.title}
                fill
                className="object-contain drop-shadow-2xl"
                data-ai-hint={currentSlide.imageHint}
                sizes="80vw"
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Content Section (35%) */}
      <div className="shrink-0 w-full bg-white flex flex-col items-center px-10 pt-12 pb-[env(safe-area-inset-bottom,3rem)] text-center relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 mb-12"
          >
            <h1 className="text-[2.2rem] font-black tracking-tight text-[#121212] leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-[300px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation & Controls */}
        <div className="w-full flex items-center justify-between mt-auto">
          {/* Dot Indicators */}
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#121212] w-4' : 'bg-black/10'}`} 
              />
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {!currentSlide.isFinal && (
              <button 
                onClick={handleSkip} 
                className="text-xs font-bold text-muted-foreground hover:text-[#121212] transition-colors"
              >
                Skip
              </button>
            )}
            
            {currentSlide.isFinal ? (
              <div className="flex gap-2">
                <AuthModal 
                  defaultTab="login"
                  trigger={<Button variant="ghost" className="h-12 px-6 rounded-2xl font-bold">Login</Button>}
                />
                <AuthModal 
                  defaultTab="register"
                  trigger={<Button className="h-12 px-8 rounded-2xl font-bold bg-[#121212] text-white hover:bg-[#121212]/90 shadow-xl">Get Started</Button>}
                />
              </div>
            ) : (
              <Button 
                onClick={handleNext}
                className="h-12 px-10 rounded-2xl font-bold bg-[#121212] text-white hover:bg-[#121212]/90 flex items-center gap-2 transition-all active:scale-95"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
