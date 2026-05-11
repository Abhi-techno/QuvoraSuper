
'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import { 
  Smartphone, 
  Handshake, 
  Sparkles, 
  Home, 
  GraduationCap, 
  Layers, 
  ChevronRight 
} from 'lucide-react';

const slides = [
  {
    id: 'slide-1',
    title: 'Welcome to Quvora',
    subtitle: 'India’s AI-powered marketplace and career ecosystem.',
    icon: Smartphone,
    artworkBg: 'bg-[#FF8A65]/10',
    accentColor: '#FF8A65'
  },
  {
    id: 'slide-2',
    title: 'Buy & Sell Instantly',
    subtitle: 'Mobiles, cars, electronics, rentals, and more nearby.',
    icon: Handshake,
    artworkBg: 'bg-[#FFB84C]/10',
    accentColor: '#FFB84C'
  },
  {
    id: 'slide-3',
    title: 'Your AI Career Copilot',
    subtitle: 'Smart jobs, resume help, interview prep, and growth tools.',
    icon: Sparkles,
    artworkBg: 'bg-[#8B5CF6]/10',
    accentColor: '#8B5CF6'
  },
  {
    id: 'slide-4',
    title: 'Find Homes & Rentals',
    subtitle: 'Discover flats, PGs, hostels, and verified properties.',
    icon: Home,
    artworkBg: 'bg-[#7AB6F9]/10',
    accentColor: '#7AB6F9'
  },
  {
    id: 'slide-5',
    title: 'Learn Skills & Earn More',
    subtitle: 'Courses, freelancing, mentorship, and internships together.',
    icon: GraduationCap,
    artworkBg: 'bg-[#FF6B6B]/10',
    accentColor: '#FF6B6B'
  },
  {
    id: 'slide-6',
    title: 'Move Smarter with Quvora',
    subtitle: 'The all-in-one AI superapp for India’s next generation.',
    icon: Layers,
    artworkBg: 'bg-gradient-to-br from-[#8B5CF6]/20 to-[#FF8A65]/20',
    accentColor: '#8B5CF6',
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
      
      {/* Upper Artwork Section (Adaptive) */}
      <div className={`flex-[1.5] min-h-0 relative w-full ${currentSlide.artworkBg} transition-colors duration-700 flex items-center justify-center`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-center justify-center"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="p-12 rounded-[2.5rem] bg-white/40 backdrop-blur-xl shadow-2xl shadow-black/5"
            >
              <IconComponent size={80} color={currentSlide.accentColor} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Content Section (Adaptive White Card) */}
      <div className="shrink-0 w-full bg-white rounded-t-[3.5rem] relative z-20 flex flex-col items-center px-10 pt-8 pb-[env(safe-area-inset-bottom,2rem)] text-center shadow-[0_-20px_80px_-15px_rgba(0,0,0,0.05)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-2 mb-8"
          >
            <h1 className="text-2xl font-black tracking-tight text-[#121212]">
              {currentSlide.title}
            </h1>
            <p className="text-xs font-medium text-muted-foreground/80 leading-relaxed max-w-[280px] mx-auto">
              {currentSlide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <div className="w-full flex flex-col gap-4 items-center">
          {currentSlide.isFinal ? (
            <div className="flex flex-col gap-3 w-full">
              <AuthModal 
                defaultTab="register"
                trigger={
                  <Button className="w-full h-14 rounded-2xl font-bold bg-[#121212] text-white hover:bg-[#121212]/90 shadow-xl shadow-black/10">
                    Get Started
                  </Button>
                }
              />
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="w-full h-10 font-bold text-muted-foreground">
                    Already have an account? Login
                  </Button>
                }
              />
            </div>
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full h-14 rounded-2xl font-bold bg-[#121212] text-white hover:bg-[#121212]/90 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl shadow-black/10"
            >
              Continue
            </Button>
          )}

          {/* Bottom Navigation Row */}
          <div className="w-full flex items-center justify-between mt-4">
            {/* Dot Indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <motion.div 
                  key={i} 
                  animate={{ 
                    width: i === currentIndex ? 16 : 6,
                    backgroundColor: i === currentIndex ? '#121212' : '#E5E5E5'
                  }}
                  className="h-1.5 rounded-full" 
                />
              ))}
            </div>
            
            {!currentSlide.isFinal && (
              <button 
                onClick={handleSkip} 
                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-[#121212] transition-colors"
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
