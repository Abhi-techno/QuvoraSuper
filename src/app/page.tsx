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
    title: 'Welcome to Quvora',
    subtitle: 'India’s AI-powered marketplace and career ecosystem.\nMove smarter.',
    icon: ShoppingBag,
    bgColor: 'bg-[#F5B77A]', // Soft Orange
    accentColor: '#FFFFFF',
    iconColor: '#E67E22'
  },
  {
    id: 'slide-2',
    title: 'Trusted Connections',
    subtitle: 'Chat securely with verified buyers, sellers, employers, and mentors.',
    icon: Handshake,
    bgColor: 'bg-[#F3CD76]', // Warm Yellow
    accentColor: '#FFFFFF',
    iconColor: '#D35400'
  },
  {
    id: 'slide-3',
    title: 'Privacy is always our priority',
    subtitle: 'Your chats, listings, payments, and data stay protected with advanced security.',
    icon: ShieldCheck,
    bgColor: 'bg-[#8EC5FF]', // Soft Blue
    accentColor: '#FFFFFF',
    iconColor: '#2980B9'
  },
  {
    id: 'slide-4',
    title: 'AI Career Guidance',
    subtitle: 'Get personalized jobs, resume reviews, interview prep, and career insights.',
    icon: Sparkles,
    bgColor: 'bg-[#C9B6FF]', // Soft Lavender
    accentColor: '#FFFFFF',
    iconColor: '#8E44AD'
  },
  {
    id: 'slide-5',
    title: 'Find Homes Easily',
    subtitle: 'Explore flats, PGs, hostels, rentals, and verified properties near you.',
    icon: Home,
    bgColor: 'bg-[#FFD6B0]', // Soft Peach
    accentColor: '#FFFFFF',
    iconColor: '#D35400'
  },
  {
    id: 'slide-6',
    title: 'Welcome to the SuperApp',
    subtitle: 'The all-in-one AI superapp for India’s next generation.\nGet started now.',
    icon: Layers,
    bgColor: 'bg-gradient-to-br from-[#C9B6FF] via-[#8EC5FF] to-[#F5B77A]',
    accentColor: '#FFFFFF',
    iconColor: '#7C3AED',
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
        className="w-12 h-12 rounded-2xl bg-primary" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <div className="fixed inset-0 h-svh w-full bg-[#FDF8F3] flex flex-col overflow-hidden items-center justify-center">
      
      {/* Device Frame Mimic (Full Screen) */}
      <div className="relative w-full h-full flex flex-col max-w-[500px] mx-auto overflow-hidden">
        
        {/* Upper Canvas - Rounded Colored Background */}
        <div className="flex-[1.6] min-h-0 relative w-full p-6 pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className={cn(
                "w-full h-full rounded-[3rem] shadow-2xl flex items-center justify-center relative overflow-hidden",
                currentSlide.bgColor
              )}
            >
              {/* Dynamic Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="relative z-10 p-10 bg-white/20 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/30"
              >
                <IconComponent size={80} color={currentSlide.iconColor} strokeWidth={1.5} />
              </motion.div>
              
              {/* Decorative Floating Blobs */}
              <motion.div 
                animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-12 h-12 rounded-full bg-white/10"
              />
              <motion.div 
                animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-black/5"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Area - White Section */}
        <div className="shrink-0 w-full flex flex-col items-center px-10 pt-4 pb-[env(safe-area-inset-bottom,2rem)] text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="w-full flex flex-col gap-4 mb-10"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="text-[2.2rem] font-black tracking-tight text-[#121212] leading-tight"
              >
                {currentSlide.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-sm font-medium text-muted-foreground/70 leading-relaxed max-w-[280px] mx-auto whitespace-pre-line"
              >
                {currentSlide.subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Primary Action Button (Continue) */}
          <div className="w-full max-w-[280px]">
            {currentSlide.isFinal ? (
              <AuthModal 
                defaultTab="register"
                trigger={
                  <Button className="w-full h-14 rounded-full font-black text-sm bg-[#121212] text-white hover:bg-[#121212]/90 shadow-xl shadow-black/10 transition-transform active:scale-95">
                    LET'S GET STARTED
                  </Button>
                }
              />
            ) : (
              <Button 
                onClick={handleNext}
                className="w-full h-14 rounded-full font-black text-sm bg-[#121212] text-white hover:bg-[#121212]/90 transition-all active:scale-95 shadow-xl shadow-black/10"
              >
                CONTINUE
              </Button>
            )}
          </div>

          {/* Navigation Controls (Dots & Skip) */}
          <div className="w-full flex items-center justify-between mt-12 px-2 h-6">
            <div className="w-12" /> {/* Spacer */}
            
            {/* Dots */}
            <div className="flex gap-2.5">
              {slides.map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ 
                    scale: i === currentIndex ? 1.2 : 1,
                    opacity: i === currentIndex ? 1 : 0.2,
                    backgroundColor: i === currentIndex ? '#121212' : '#E5E5E5'
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300" 
                />
              ))}
            </div>
            
            {/* Skip */}
            <div className="w-12 text-right">
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
    </div>
  );
}
