'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

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
    return 'default';
  };

  const context = getContext();

  return (
    <header className={cn(
      "ios-top-nav sticky top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 glass-thick shadow-sm" : "bg-transparent"
    )}>
      <div className="flex items-center justify-between w-full px-2">
        {context === 'home' ? (
          <>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-black/5 overflow-hidden">
                <Image src="/icons/icon-192.png" alt="Quvora" width={32} height={32} />
              </div>
              <h1 className="text-sm font-black tracking-tighter uppercase">Quvora</h1>
            </div>
            <div className="flex items-center gap-1.5">
              <Button size="icon" variant="ghost" className="h-9 w-9 glass rounded-full" onClick={toggleTheme}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Link href="/notifications">
                <Button size="icon" variant="ghost" className="h-9 w-9 glass rounded-full relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full h-9 w-9">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-[10px] font-black uppercase tracking-widest">
              {context === 'browse' ? 'Browse' : 
               context === 'chat-list' ? 'Messages' : 
               context === 'profile' ? 'Profile' : 
               context === 'post' ? 'Create Ad' : 'Quvora'}
            </h2>
            <div className="w-9" />
          </>
        )}
      </div>
    </header>
  );
}
