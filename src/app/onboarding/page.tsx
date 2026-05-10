
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles, MessageCircle, ShoppingBag, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const slides = [
  {
    title: 'Namaste! Choose your language',
    subtitle: 'Select your preferred language to continue',
    icon: Globe,
    isLanguage: true
  },
  {
    title: 'Buy and sell anything — fast, safe, local',
    subtitle: 'Mobiles, cars, homes, jobs, and 100+ more categories available at your fingertips.',
    icon: ShoppingBag,
    hint: 'modern marketplace'
  },
  {
    title: 'Smart AI that works for you',
    subtitle: 'Auto-price suggestions, smart search, and fraud detection powered by Quvora AI.',
    icon: Sparkles,
    hint: 'artificial intelligence'
  },
  {
    title: 'Chat directly. No middlemen.',
    subtitle: 'Message sellers, negotiate price, and close deals securely in-app.',
    icon: MessageCircle,
    hint: 'secure communication'
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedLang, setSelectedLang] = useState('English');

  const languages = [
    'English', 'हिन्दी', 'বাংলা', 'తెలుగు', 'मराठी', 'தமிழ்', 'ગુજરાતી', 'ಕನ್ನಡ', 'Malayalam', 'ਪੰਜਾਬੀ'
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/login');
    }
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0D1B2A] text-white">
      <div className="flex justify-between items-center p-6">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === currentSlide ? "w-8 bg-primary" : "w-1.5 bg-white/20"
              )} 
            />
          ))}
        </div>
        <Button variant="ghost" onClick={handleSkip} className="text-white/60 font-bold hover:text-white">
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-in fade-in slide-in-from-right-8 duration-500" key={currentSlide}>
        <div className="w-24 h-24 rounded-3xl glass flex items-center justify-center mb-8 border-primary/20">
          <Icon className="w-12 h-12 text-primary" />
        </div>
        
        <h2 className="text-3xl font-bold leading-tight mb-4">{slides[currentSlide].title}</h2>
        <p className="text-white/60 leading-relaxed mb-8">{slides[currentSlide].subtitle}</p>

        {slides[currentSlide].isLanguage && (
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={selectedLang === lang ? 'default' : 'outline'}
                className={cn(
                  "glass border-none h-12 font-bold",
                  selectedLang === lang ? "bg-primary text-white" : "text-white/80"
                )}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col gap-4">
        <Button 
          className="h-14 rounded-2xl w-full text-lg font-bold shadow-lg shadow-primary/20" 
          onClick={handleNext}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
        </Button>
        {currentSlide === slides.length - 1 && (
          <Button variant="ghost" onClick={() => router.push('/')} className="text-white/40 font-bold">
            Continue as Guest
          </Button>
        )}
      </div>
    </div>
  );
}
