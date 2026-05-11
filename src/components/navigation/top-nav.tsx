
"use client"

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Bell, Search, Share2, Heart, HelpCircle, X, Settings, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function TopNav({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

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
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/listing/')) return 'detail';
    if (pathname.startsWith('/browse')) return 'browse';
    if (pathname.startsWith('/chat/')) return 'chat-thread';
    if (pathname === '/chat') return 'chat-list';
    if (pathname === '/me') return 'profile';
    if (pathname.startsWith('/post')) return 'post';
    if (pathname === '/notifications') return 'notifications';
    if (pathname === '/saved') return 'saved';
    return 'default';
  };

  const context = getContext();

  return (
    <header className={cn(
      "ios-top-nav sticky top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 glass-thick" : "bg-transparent"
    )}>
      {context === 'home' && (
        <div className="flex items-center justify-between w-full">
          <Link href="/explore" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">Q</div>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="glass rounded-full h-8 w-8 border-none text-foreground active:scale-90 transition-transform"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" className="glass h-8 rounded-full px-3 flex items-center gap-1 border-none">
              <MapPin className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold">Mumbai</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/notifications">
              <Button size="icon" variant="ghost" className="relative glass rounded-full h-8 w-8 border-none">
                <Bell className="w-4 h-4 text-foreground" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-accent rounded-full border border-background" />
              </Button>
            </Link>
            <Link href="/me">
              <Avatar className="w-8 h-8 border border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/150/150" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      )}

      {context === 'detail' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full bg-black/20 text-white border-none h-8 w-8">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass rounded-full bg-black/20 text-white border-none h-8 w-8">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="glass rounded-full bg-black/20 text-white border-none h-8 w-8">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {(context === 'browse' || context === 'notifications' || context === 'saved') && (
        <div className="flex items-center justify-between w-full px-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full h-8 w-8 border-none text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-sm font-bold uppercase tracking-widest text-foreground">
            {context === 'browse' ? 'Browse' : 
             context === 'notifications' ? 'Alerts' : 'Saved'}
          </h1>
          <div className="w-8" />
        </div>
      )}

      {context === 'post' && (
        <div className="flex items-center justify-between w-full px-2">
          <Button variant="ghost" size="icon" onClick={() => router.push('/explore')} className="glass rounded-full h-8 w-8 border-none text-foreground">
            <X className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-[10px] font-bold uppercase tracking-widest text-foreground">Post Ad</h1>
          </div>
          <Button variant="ghost" size="icon" className="glass rounded-full h-8 w-8 border-none text-foreground">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      )}

      {(context === 'profile' || context === 'chat-list') && (
        <div className="flex items-center justify-between w-full px-2">
          <div className="w-8" />
          <h1 className="text-sm font-bold uppercase tracking-widest text-foreground">
            {context === 'profile' ? 'My Quvora' : 'Messages'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass rounded-full h-8 w-8 border-none text-foreground">
              {context === 'profile' ? <Settings className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
