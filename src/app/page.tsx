
'use client';

import React, { useEffect, useState, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Smartphone, Car, Home, Shield, Sparkles, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth/auth-modal';
import Image from 'next/image';

const slides = [
  { 
    id: '1', 
    title: 'Vernacular-First Marketplace', 
    subtitle: "India's first AI-powered marketplace designed for your language.",
    icon: Globe,
    imageHint: "indian city landscape 3d",
    imageUrl: "https://picsum.photos/seed/q1/800/1200"
  },
  { 
    id: '2', 
    title: 'Zero Commission Trading', 
    subtitle: 'No middlemen. No hidden fees. 100% of the value stays with you.',
    icon: Shield,
    imageHint: "gold coins 3d",
    imageUrl: "https://picsum.photos/seed/q2/800/1200"
  },
  { 
    id: '3', 
    title: 'AI-Powered Safety', 
    subtitle: 'Real-time fraud detection and smart price insights in every deal.',
    icon: Sparkles,
    imageHint: "security shield 3d",
    imageUrl: "https://picsum.photos/seed/q3/800/1200"
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
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push('/explore');
    }
  }, [user, loading, router]);

  if (loading) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-12 h-12 rounded-2xl bg-primary shadow-2xl shadow-primary/40" 
      />
    </div>
  );

  return (
    <div className="fixed inset-0 h-screen w-full bg-black overflow-hidden flex flex-col select-none touch-none font-body">
      
      {/* IMMERSIVE BACKGROUND VISUAL */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[selectedIndex].id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full"
          >
            <Image
              src={slides[selectedIndex].imageUrl}
              alt="Narrative"
              fill
              className="object-cover"
              data-ai-hint={slides[selectedIndex].imageHint}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP BRAND BADGE */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="absolute top-12 left-0 right-0 z-20 flex justify-center"
      >
        <div className="glass px-4 py-2 rounded-full border-white/5 flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-primary flex items-center justify-center text-white font-black text-[10px]">Q</div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Quvora</span>
        </div>
      </motion.div>

      {/* FLOATING ACTION CARD */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 25 }}
        className="mt-auto relative z-10 px-6 pb-16 pt-10"
      >
        <div className="glass-thick rounded-[3rem] p-8 flex flex-col items-center gap-8 border-white/10 shadow-2xl">
          
          {/* CONTENT ANIMATION */}
          <div className="text-center min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[selectedIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4"
              >
                <h2 className="text-3xl font-black tracking-tighter leading-none text-white">
                  {slides[selectedIndex].title}
                </h2>
                <p className="text-sm text-white/50 font-medium leading-relaxed px-4">
                  {slides[selectedIndex].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* INDICATORS */}
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  width: selectedIndex === i ? 24 : 6,
                  backgroundColor: selectedIndex === i ? "rgba(14, 165, 233, 1)" : "rgba(255, 255, 255, 0.2)"
                }}
                className="h-1.5 rounded-full transition-all duration-500"
              />
            ))}
          </div>

          {/* ACTIONS */}
          <div className="w-full space-y-4">
            <AuthModal 
              defaultTab="register"
              trigger={
                <Button className="w-full h-16 rounded-2xl bg-white text-black hover:bg-white/90 text-sm font-black uppercase tracking-widest shadow-xl shadow-white/5 active:scale-[0.98] transition-all">
                  Create Account
                </Button>
              }
            />
            
            <AuthModal 
              defaultTab="login"
              trigger={
                <button className="w-full text-center py-2">
                  <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
                    Already have an account? <span className="text-primary ml-1">Login</span>
                  </span>
                </button>
              }
            />
          </div>

          {/* SECURITY FOOTER */}
          <div className="flex items-center gap-2 opacity-20">
            <Shield className="w-3 h-3 text-white" />
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white">Liquid Glass Encrypted</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
