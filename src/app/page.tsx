
'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { 
  ShoppingBag, 
  Handshake, 
  ShieldCheck, 
  Sparkles, 
  Home, 
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 'slide-1',
    title: 'Buy & Sell Smarter',
    subtitle: 'Discover nearby products, vehicles, rentals, and verified deals instantly.',
    icon: ShoppingBag,
    bgColor: 'bg-[#F5B77A]',
    iconColor: '#E67E22'
  },
  {
    id: 'slide-2',
    title: 'Trusted Connections',
    subtitle: 'Chat securely with verified buyers, sellers, employers, and mentors.',
    icon: Handshake,
    bgColor: 'bg-[#F3CD76]',
    iconColor: '#D35400'
  },
  {
    id: 'slide-3',
    title: 'Privacy Comes First',
    subtitle: 'Your chats, listings, payments, and data stay protected with advanced security.',
    icon: ShieldCheck,
    bgColor: 'bg-[#8EC5FF]',
    iconColor: '#2980B9'
  },
  {
    id: 'slide-4',
    title: 'AI Career Guidance',
    subtitle: 'Get personalized jobs, resume reviews, interview prep, and career insights.',
    icon: Sparkles,
    bgColor: 'bg-[#C9B6FF]',
    iconColor: '#8E44AD'
  },
  {
    id: 'slide-5',
    title: 'Find Homes Easily',
    subtitle: 'Explore flats, PGs, hostels, rentals, and verified properties near you.',
    icon: Home,
    bgColor: 'bg-[#FFD6B0]',
    iconColor: '#D35400'
  },
  {
    id: 'slide-6',
    title: 'Move Smarter with Quvora',
    subtitle: 'India’s all-in-one AI superapp for buying, selling, learning, and growing.',
    icon: Layers,
    bgColor: 'bg-gradient-to-br from-[#C9B6FF] via-[#8EC5FF] to-[#F5B77A]',
    iconColor: '#7C3AED',
    isFinal: true
  }
];

const springConfig = { type: "spring", stiffness: 260, damping: 20 };

export default function LandingPage({
  params,
  searchParams
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  // Unwrap dynamic APIs for Next.js 15
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
    <div className="fixed inset-0 bg-[#FDF8F3] flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 rounded-2xl bg-primary shadow-xl shadow-primary/20" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <div className="fixed inset-0 h-svh w-full bg-[#FDF8F3] overflow-hidden flex flex-col">
      
      {/* 1. TOP PART: Navigation Controls (Adaptive) */}
      <header className="shrink-0 w-full px-8 pt-[env(safe-area-inset-top,2rem)] h-20 flex items-center justify-between z-50">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <motion.div 
              key={i} 
              animate={{ 
                width: i === currentIndex ? 24 : 6,
                backgroundColor: i === currentIndex ? '#121212' : '#E5E5E5',
                opacity: i <= currentIndex ? 1 : 0.3
              }}
              className="h-1.5 rounded-full transition-all duration-300" 
            />
          ))}
        </div>
        {!currentSlide.isFinal && (
          <button 
            onClick={handleSkip} 
            className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-[#121212] transition-colors"
          >
            Skip
          </button>
        )}
      </header>

      {/* 2. CENTER PART: Illustration Canvas (Ultra-Adaptive & Animated) */}
      <main className="flex-1 min-h-0 relative w-full px-6 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -50 }}
            transition={springConfig}
            className={cn(
              "w-full aspect-square max-h-[400px] rounded-[3.5rem] shadow-2xl flex items-center justify-center relative overflow-hidden transition-colors duration-700",
              currentSlide.bgColor
            )}
          >
            {/* Ambient Internal Animations (Blobs) */}
            <motion.div 
              animate={{ 
                y: [-20, 20, -20], 
                x: [-15, 15, -15],
                rotate: [0, 90, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-48 h-48 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div 
              animate={{ 
                y: [20, -20, 20], 
                x: [15, -15, 15],
                rotate: [0, -90, 0]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-black/5 blur-3xl"
            />
            
            {/* Primary Artwork */}
            <motion.div
              initial={{ scale: 0, rotate: -15, y: 20 }}
              animate={{ scale: 1, rotate: 0, y: 0 }}
              transition={{ delay: 0.2, ...springConfig }}
              className="relative z-10 p-10 bg-white/30 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/40"
            >
              <IconComponent size={80} color={currentSlide.iconColor} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM PART: Action Card (Anchored to Thumb-Zone) */}
      <footer className="shrink-0 w-full bg-white rounded-t-[3.5rem] shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.08)] pt-10 pb-[env(safe-area-inset-bottom,2.5rem)] px-10 text-center flex flex-col items-center z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col gap-3 mb-10 w-full"
          >
            <h1 className="text-3xl font-black tracking-tighter text-[#121212] leading-[1.1]">
              {currentSlide.title}
            </h1>
            <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="w-full max-w-[300px]">
          {currentSlide.isFinal ? (
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="w-full h-14 rounded-full font-black text-sm bg-[#121212] text-white hover:bg-[#121212]/90 shadow-2xl shadow-black/20 transition-transform active:scale-95">
                  GET STARTED
                </Button>
              }
            />
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full h-14 rounded-full font-black text-sm bg-[#121212] text-white hover:bg-[#121212]/90 transition-all active:scale-95 shadow-2xl shadow-black/10"
            >
              CONTINUE
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
