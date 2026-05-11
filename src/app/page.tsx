
'use client';

import React, { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Shield, Sparkles, Globe, MessageCircle, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';

const slides = [
  { 
    id: '1', 
    title: 'BUY AND SELL ANYTHING FAST', 
    highlight: 'ANYTHING FAST',
    subtitle: "Mobiles, cars, homes, and 100+ more categories available at your fingertips.",
    icon: ShoppingBag,
    imageHint: "smartphone illustration",
    imageUrl: "https://picsum.photos/seed/q1/600/600"
  },
  { 
    id: '2', 
    title: 'SECURE LOCAL DEALS ONLY', 
    highlight: 'LOCAL DEALS',
    subtitle: "Smart AI fraud detection and verified profiles for a 100% worry-free trading experience.",
    icon: Shield,
    imageHint: "security shield illustration",
    imageUrl: "https://picsum.photos/seed/q2/600/600"
  },
  { 
    id: '3', 
    title: 'NEGOTIATE DIRECTLY NOW', 
    highlight: 'DIRECTLY NOW',
    subtitle: "Real-time in-app chat allows you to discuss, bargain, and close deals instantly.",
    icon: MessageCircle,
    imageHint: "chat bubble illustration",
    imageUrl: "https://picsum.photos/seed/q3/600/600"
  },
  { 
    id: '4', 
    title: 'SMART AI PRICE INSIGHTS', 
    highlight: 'PRICE INSIGHTS',
    subtitle: "Get fair market value suggestions powered by Quvora AI to sell faster and buy smarter.",
    icon: Sparkles,
    imageHint: "ai artificial intelligence",
    imageUrl: "https://picsum.photos/seed/q4/600/600"
  },
  { 
    id: '5', 
    title: 'ZERO COMMISSION TRADING', 
    highlight: 'ZERO COMMISSION',
    subtitle: "No middlemen. No hidden fees. 100% of the value stays in your pocket.",
    icon: Zap,
    imageHint: "lightning bolt illustration",
    imageUrl: "https://picsum.photos/seed/q5/600/600"
  },
  { 
    id: '6', 
    title: 'VERNACULAR FIRST REACH', 
    highlight: 'VERNACULAR FIRST',
    subtitle: "The first marketplace designed for your local language and community.",
    icon: Globe,
    imageHint: "world globe illustration",
    imageUrl: "https://picsum.photos/seed/q6/600/600"
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
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  const handleBack = () => {
    setSelectedIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleSkip = () => {
    router.push('/explore');
  };

  if (loading) return (
    <div className="h-screen w-full bg-background flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-12 h-12 rounded-2xl bg-primary shadow-2xl shadow-primary/40" 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-background overflow-hidden flex flex-col select-none touch-none font-body transition-colors duration-500">
      
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent" />
      </div>

      {/* TOP NAVIGATION */}
      <div className="relative z-20 px-6 pt-12 pb-4 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleBack}
            className="h-12 w-12 rounded-full border-border bg-background shadow-sm active:scale-90 transition-transform"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <button 
            onClick={handleSkip}
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip
          </button>
        </div>

        {/* SEGMENTED PROGRESS BAR */}
        <div className="flex gap-1.5 px-1">
          {slides.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                animate={{ 
                  width: i <= selectedIndex ? "100%" : "0%",
                  opacity: i === selectedIndex ? 1 : 0.4
                }}
                transition={{ duration: 0.5 }}
                className="h-full bg-foreground"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="flex-1 flex flex-col px-8 pt-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[selectedIndex].id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            {/* TYPOGRAPHY */}
            <div className="space-y-4 mb-12">
              <h1 className="text-4xl font-black tracking-tighter leading-tight text-foreground uppercase">
                {slides[selectedIndex].title.split(slides[selectedIndex].highlight)[0]}
                <span className="relative inline-block">
                  <span className="relative z-10">{slides[selectedIndex].highlight}</span>
                  <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "105%" }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="absolute -bottom-1 -left-1 h-4 bg-primary/30 z-0"
                  />
                </span>
                {slides[selectedIndex].title.split(slides[selectedIndex].highlight)[1]}
              </h1>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-[280px]">
                {slides[selectedIndex].subtitle}
              </p>
            </div>

            {/* ILLUSTRATION */}
            <div className="flex-1 relative flex items-center justify-center py-8">
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative w-full aspect-square max-w-[320px]"
              >
                <Image
                  src={slides[selectedIndex].imageUrl}
                  alt="Illustration"
                  fill
                  className="object-contain"
                  data-ai-hint={slides[selectedIndex].imageHint}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM ACTION */}
      <div className="px-6 pb-16 pt-6 relative z-10">
        <AuthModal 
          defaultTab="register"
          trigger={
            <Button className="w-full h-16 rounded-[2rem] bg-foreground text-background hover:bg-foreground/90 text-sm font-bold shadow-xl active:scale-[0.98] transition-all">
              Let's start now
            </Button>
          }
        />
        
        <div className="mt-6 flex justify-center">
          <AuthModal 
            defaultTab="login"
            trigger={
              <button className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-colors">
                Already have an account? <span className="text-primary ml-1">Login</span>
              </button>
            }
          />
        </div>
      </div>

    </div>
  );
}
