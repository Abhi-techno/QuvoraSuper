'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, Bell, Sun, Moon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function TopNav({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  const getContext = () => {
    if (pathname === '/explore') return 'home';
    if (pathname.startsWith('/listing/')) return 'detail';
    if (pathname.startsWith('/browse')) return 'browse';
    if (pathname === '/chat') return 'chat-list';
    if (pathname === '/me') return 'profile';
    if (pathname.startsWith('/post')) return 'post';
    if (pathname === '/notifications') return 'notifications';
    if (pathname === '/saved') return 'saved';
    return 'default';
  };

  const context = getContext();
  const iosSpring = { type: "spring", stiffness: 420, damping: 30 };

  return (
    <header className={cn(
      "ios-top-nav fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 glass-thick shadow-sm" : "bg-transparent border-none"
    )}>
      <div className="flex items-center justify-between w-full px-4">
        {context === 'home' ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-black/5 overflow-hidden border border-white/20">
                <Image src="/icons/icon-192.png" alt="Quvora" width={28} height={28} />
              </div>
              <h1 className="text-sm font-black tracking-tighter uppercase text-primary">Quvora</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-9 w-9 glass rounded-full border-none shadow-sm active:scale-90 transition-all hover:bg-transparent" 
                onClick={toggleTheme}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -120, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 120, scale: 0, opacity: 0 }}
                    transition={iosSpring}
                    className="flex items-center justify-center"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
              <Link href="/notifications">
                <Button size="icon" variant="ghost" className="h-9 w-9 glass rounded-full border-none shadow-sm relative">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full h-9 w-9 border-none shadow-sm active:scale-90 transition-transform">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/70">
              {context === 'browse' ? 'Browse' : 
               context === 'chat-list' ? 'Messages' : 
               context === 'profile' ? 'Profile' : 
               context === 'post' ? 'Create Ad' : 
               context === 'notifications' ? 'Alerts' :
               context === 'saved' ? 'Saved' : 'Quvora'}
            </h2>
            <div className="flex gap-2">
               {context === 'browse' && (
                 <Button variant="ghost" size="icon" className="glass rounded-full h-9 w-9 border-none shadow-sm active:scale-90 transition-transform">
                   <Search className="w-4 h-4" />
                 </Button>
               )}
               <div className="w-9" />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
