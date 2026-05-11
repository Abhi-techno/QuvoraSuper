
'use client';

import React, { useState, useEffect, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ChevronRight, Shield, Sparkles, Globe, MessageCircle, ShoppingBag, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const slides = [
  { 
    id: 'intro', 
    title: '', 
    subtitle: '',
    isLogo: true,
    imageUrl: "https://picsum.photos/seed/qlogo/600/600",
    imageHint: "abstract logo"
  },
  { 
    id: 'marketplace', 
    title: 'Buy and sell locally without any hassle', 
    subtitle: 'Mobiles, cars, homes, and 100+ more categories at your fingertips.',
    imageUrl: "https://picsum.photos/seed/q1/600/600",
    imageHint: "marketplace app"
  },
  { 
    id: 'categories', 
    title: 'Everything you need: 100+ categories', 
    subtitle: 'Browse through a vast collection of items verified by Quvora AI.',
    imageUrl: "https://picsum.photos/seed/q2/600/600",
    imageHint: "app integrations"
  },
  { 
    id: 'safety', 
    title: 'Post your ad in just a few clicks', 
    subtitle: 'Safe, secure, and verified profiles for a worry-free trading experience.',
    imageUrl: "https://picsum.photos/seed/q3/600/600",
    imageHint: "security review"
  },
  { 
    id: 'insights', 
    title: 'Track your performance with AI insights', 
    subtitle: 'Get fair market value suggestions to sell faster and buy smarter.',
    imageUrl: "https://picsum.photos/seed/q4/600/600",
    imageHint: "performance chart"
  },
  { 
    id: 'plus', 
    title: 'Quvora Plus', 
    subtitle: 'Build with more visibility and our most powerful AI tools.',
    isPricing: true,
    imageUrl: "https://picsum.photos/seed/q5/600/600",
    imageHint: "premium sky"
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
      
      {/* TOP NAV */}
      <div className="relative z-30 px-6 pt-14 flex justify-between items-center">
        <div className="w-10 h-10" /> {/* Spacer */}
        <button 
          onClick={handleSkip}
          className="text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-1"
        >
          Skip <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 relative z-10 flex flex-col px-8 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            {/* ILLUSTRATION/IMAGE */}
            <div className="flex-1 relative flex items-center justify-center py-6">
              {currentSlide.isLogo ? (
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-24 h-24 rounded-[2rem] bg-primary flex items-center justify-center text-white font-black text-6xl shadow-2xl shadow-primary/30"
                >
                  Q
                </motion.div>
              ) : (
                <div className={cn(
                  "relative w-full aspect-square max-w-[320px] rounded-3xl overflow-hidden glass border-white/10",
                  currentSlide.isPricing && "bg-gradient-to-b from-primary/20 to-transparent p-6"
                )}>
                  {currentSlide.isPricing ? (
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">Q</div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Quvora PLUS</h4>
                          <p className="text-[10px] text-white/60">More reach, more power</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        {[
                          '10x More Ad Visibility',
                          'AI-Powered Negotiation Bot',
                          'Verified Business Badge',
                          'Priority Support',
                          'Detailed Analytics Dashboard'
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-primary" />
                            </div>
                            <span className="text-[11px] text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <p className="text-2xl font-black text-white">₹499<span className="text-sm font-medium text-white/60">/mo</span></p>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={currentSlide.imageUrl}
                      alt="Illustration"
                      fill
                      className="object-cover opacity-80"
                      data-ai-hint={currentSlide.imageHint}
                      priority
                    />
                  )}
                </div>
              )}
            </div>

            {/* TYPOGRAPHY */}
            <div className="pb-24 space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
                {currentSlide.title}
              </h1>
              <p className="text-sm text-white/50 font-medium leading-relaxed max-w-[280px]">
                {currentSlide.subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="px-6 pb-16 pt-4 relative z-20 flex flex-col gap-8">
        {/* DOTS */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/20"
              )} 
            />
          ))}
        </div>

        {currentIndex === slides.length - 1 ? (
          <AuthModal 
            defaultTab="register"
            trigger={
              <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 text-sm font-bold shadow-xl active:scale-[0.98] transition-all">
                Start 7-day free trial
              </Button>
            }
          />
        ) : (
          <Button 
            onClick={handleNext}
            className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 text-sm font-bold shadow-xl active:scale-[0.98] transition-all"
          >
            Continue
          </Button>
        )}
      </div>

    </div>
  );
}
