
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
  Layers,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 'slide-1',
    title: 'Buy & Sell Smarter',
    subtitle: 'Discover nearby products, vehicles, rentals, and verified deals instantly.',
    icon: ShoppingBag,
    bgColor: 'bg-[#F5B77A]', // Soft Orange
    accentColor: '#D97706'
  },
  {
    id: 'slide-2',
    title: 'Trusted Connections',
    subtitle: 'Chat securely with verified buyers, sellers, employers, and mentors.',
    icon: Handshake,
    bgColor: 'bg-[#F3CD76]', // Warm Yellow
    accentColor: '#B45309'
  },
  {
    id: 'slide-3',
    title: 'Privacy Comes First',
    subtitle: 'Your chats, listings, payments, and data stay protected with advanced security.',
    icon: ShieldCheck,
    bgColor: 'bg-[#8EC5FF]', // Soft Blue
    accentColor: '#1D4ED8'
  },
  {
    id: 'slide-4',
    title: 'AI Career Guidance',
    subtitle: 'Get personalized jobs, resume reviews, interview prep, and career insights.',
    icon: Sparkles,
    bgColor: 'bg-[#C9B6FF]', // Soft Lavender
    accentColor: '#6D28D9'
  },
  {
    id: 'slide-5',
    title: 'Find Homes Easily',
    subtitle: 'Explore flats, PGs, hostels, rentals, and verified properties near you.',
    icon: Home,
    bgColor: 'bg-[#FFD6B0]', // Soft Peach
    accentColor: '#C2410C'
  },
  {
    id: 'slide-6',
    title: 'Move Smarter with Quvora',
    subtitle: 'India’s all-in-one AI superapp for buying, selling, learning, and growing.',
    icon: Layers,
    bgColor: 'bg-gradient-to-br from-[#C9B6FF] via-[#8EC5FF] to-[#F5B77A]',
    accentColor: '#7C3AED',
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
    <div className="h-svh w-full bg-[#F7EFE5] flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 rounded-2xl bg-primary" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <div className="fixed inset-0 h-svh w-full bg-[#F7EFE5] flex flex-col overflow-hidden">
      
      {/* 65% Height - Artwork Section */}
      <div className={cn(
        "flex-[1.8] min-h-0 relative w-full transition-colors duration-1000 flex items-center justify-center",
        currentSlide.bgColor
      )}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            {/* Soft 3D Glow Background */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
              style={{ backgroundColor: currentSlide.accentColor }}
            />
            
            {/* Primary Artwork */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-10 rounded-[2.5rem] glass-thick shadow-2xl shadow-black/5"
            >
              <IconComponent size={96} color={currentSlide.accentColor} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 35% Height - White Content Card */}
      <div className="shrink-0 w-full bg-white rounded-t-[2.5rem] md:rounded-t-[3.5rem] relative z-20 flex flex-col items-center px-10 pt-10 pb-[env(safe-area-inset-bottom,2rem)] text-center shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.08)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-3 mb-8"
          >
            <h1 className="text-3xl font-black tracking-tight text-[#121212] leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Area */}
        <div className="w-full flex flex-col gap-4 items-center">
          {currentSlide.isFinal ? (
            <div className="flex flex-col gap-3 w-full">
              <AuthModal 
                defaultTab="register"
                trigger={
                  <Button className="w-full h-14 rounded-full font-bold bg-[#121212] text-white hover:bg-[#121212]/90 shadow-xl shadow-black/10 transition-transform active:scale-95">
                    Get Started
                  </Button>
                }
              />
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="w-full h-10 font-bold text-muted-foreground hover:text-[#121212]">
                    Already have an account? Login
                  </Button>
                }
              />
            </div>
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full h-14 rounded-full font-bold bg-[#121212] text-white hover:bg-[#121212]/90 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              Continue
            </Button>
          )}

          {/* Navigation Row */}
          <div className="w-full flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ 
                    width: i === currentIndex ? 24 : 8,
                    backgroundColor: i === currentIndex ? '#121212' : '#E5E5E5'
                  }}
                  className="h-2 rounded-full transition-all duration-300" 
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
          </div>
        </div>
      </div>
    </div>
  );
}
