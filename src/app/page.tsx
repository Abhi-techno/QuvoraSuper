'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';
import { ChevronRight, Sparkles, ShoppingBag, Briefcase, Home, GraduationCap, Globe } from 'lucide-react';

const slides = [
  {
    id: 'slide-1',
    title: 'Move Smarter with Quvora',
    description: 'India’s AI-powered platform for buying, selling, jobs, rentals, learning, and growth.',
    imageUrl: 'https://picsum.photos/seed/q1/800/800',
    imageHint: 'futuristic sphere',
    icon: Globe,
    buttonText: 'Continue',
    accentColor: 'text-[#7C4DFF]'
  },
  {
    id: 'slide-2',
    title: 'Buy & Sell Instantly',
    description: 'Post listings, chat with buyers, discover deals nearby, and trade securely.',
    imageUrl: 'https://picsum.photos/seed/q2/800/800',
    imageHint: 'floating electronics',
    icon: ShoppingBag,
    buttonText: 'Next',
    accentColor: 'text-[#0ea5e9]'
  },
  {
    id: 'slide-3',
    title: 'Your AI Career Co-Pilot',
    description: 'Get personalized jobs, resume analysis, interview prep, and career guidance.',
    imageUrl: 'https://picsum.photos/seed/q3/800/800',
    imageHint: 'hologram assistant',
    icon: Briefcase,
    buttonText: 'Continue',
    accentColor: 'text-[#A855F7]'
  },
  {
    id: 'slide-4',
    title: 'Find Homes & Rentals',
    description: 'Search PGs, flats, hostels, rentals, and verified property listings near you.',
    imageUrl: 'https://picsum.photos/seed/q4/800/800',
    imageHint: 'modern house',
    icon: Home,
    buttonText: 'Next',
    accentColor: 'text-[#FFB800]'
  },
  {
    id: 'slide-5',
    title: 'Learn Skills. Earn More.',
    description: 'Courses, mentorship, freelancing, internships, and certifications — all in one app.',
    imageUrl: 'https://picsum.photos/seed/q5/800/800',
    imageHint: 'online learning',
    icon: GraduationCap,
    buttonText: 'Continue',
    accentColor: 'text-[#FF6B6B]'
  },
  {
    id: 'slide-6',
    title: 'Welcome to Quvora',
    description: 'The AI-powered superapp built for India’s next generation. Start your journey today.',
    imageUrl: 'https://picsum.photos/seed/q6/800/800',
    imageHint: 'digital globe',
    icon: Sparkles,
    buttonText: 'Get Started',
    isFinal: true,
    accentColor: 'text-primary'
  }
];

export default function LandingPage({
  params,
  searchParams
}: {
  params: Promise<any>;
  searchParams: Promise<any>;
}) {
  // Unwrap promises for Next.js 15
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
    <div className="h-svh w-full bg-[#0B0B14] flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-16 h-16 rounded-[2rem] bg-primary shadow-2xl shadow-primary/40" 
      />
    </div>
  );

  const currentSlide = slides[currentIndex];
  const Icon = currentSlide.icon;

  return (
    <div className="fixed inset-0 h-svh w-full bg-[#0B0B14] overflow-hidden flex flex-col select-none touch-none">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/15 blur-[150px]"
        />
      </div>

      {/* TOP NAV: iOS Dash Progress & Skip */}
      <div className="absolute top-0 left-0 right-0 z-50 px-8 pt-[env(safe-area-inset-top,3rem)] flex justify-between items-center">
        <div className="flex gap-1.5 items-center">
          {slides.map((_, i) => (
            <motion.div 
              key={i}
              className="h-1 rounded-full bg-white/20"
              initial={false}
              animate={{ 
                width: i === currentIndex ? 40 : 12,
                backgroundColor: i <= currentIndex ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.2)"
              }}
              transition={{ duration: 0.6, ease: "circOut" }}
            />
          ))}
        </div>
        {!currentSlide.isFinal && (
          <button 
            onClick={handleSkip}
            className="text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Skip
          </button>
        )}
      </div>

      {/* ILLUSTRATION AREA (Flexible) */}
      <div className="flex-[1.5] min-h-0 relative w-full flex items-center justify-center pt-20 pb-4 px-10 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full max-w-[280px] max-h-[280px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent blur-[60px] rounded-full scale-75" />
            <Image
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              fill
              className="object-contain drop-shadow-2xl"
              data-ai-hint={currentSlide.imageHint}
              sizes="(max-width: 768px) 80vw, 400px"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ACTION CARD AREA (Compact & Visible) */}
      <motion.div 
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 w-full bg-white rounded-t-[3rem] relative z-20 flex flex-col items-center px-8 pt-8 pb-[env(safe-area-inset-bottom,2.5rem)] text-center shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id + "-text"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="flex flex-col mb-6"
          >
            <div className="flex justify-center mb-3">
              <div className="p-2.5 rounded-xl bg-black/5 border border-black/5">
                <Icon className={`w-5 h-5 ${currentSlide.accentColor}`} />
              </div>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-black leading-none mb-2.5">
              {currentSlide.title}
            </h1>
            <p className="text-[0.85rem] text-black/50 font-semibold leading-relaxed max-w-[260px] mx-auto">
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* SLIDE INDICATOR DOTS */}
        <div className="flex gap-1.5 mb-5">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-primary scale-125' : 'bg-black/10'}`} 
            />
          ))}
        </div>

        {/* PRIMARY ACTION BUTTON */}
        <div className="w-full flex flex-col gap-2">
          {currentSlide.isFinal ? (
            <div className="flex flex-col gap-2 w-full">
              <AuthModal 
                defaultTab="register"
                trigger={
                  <Button className="w-full h-12 rounded-2xl bg-black text-white hover:bg-black/90 text-[0.8rem] font-black shadow-lg active:scale-[0.98] transition-all uppercase tracking-[0.1em]">
                    {currentSlide.buttonText}
                  </Button>
                }
              />
              <AuthModal 
                defaultTab="login"
                trigger={
                  <Button variant="ghost" className="w-full h-8 text-black/40 font-black text-[0.65rem] uppercase tracking-widest hover:text-black">
                    Already have an account? Login
                  </Button>
                }
              />
            </div>
          ) : (
            <Button 
              onClick={handleNext}
              className="w-full h-12 rounded-2xl bg-black text-white hover:bg-black/90 text-[0.8rem] font-black shadow-lg active:scale-[0.98] transition-all uppercase tracking-[0.1em] group"
            >
              {currentSlide.buttonText}
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </motion.div>

    </div>
  );
}
