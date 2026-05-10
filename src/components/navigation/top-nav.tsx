
"use client"

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Bell, Search, Share2, Heart, HelpCircle, X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function TopNav({ isScrolled }: { isScrolled: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

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
      isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
    )}>
      {context === 'home' && (
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">Q</div>
          </Link>
          <Button variant="ghost" className="glass h-9 rounded-full px-4 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium">Mumbai, MH</span>
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/notifications">
              <Button size="icon" variant="ghost" className="relative glass rounded-full h-9 w-9">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
              </Button>
            </Link>
            <Link href="/me">
              <Avatar className="w-9 h-9 border-2 border-primary/20">
                <AvatarImage src="https://picsum.photos/seed/user/150/150" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      )}

      {context === 'detail' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full bg-black/20 text-white border-none">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass rounded-full bg-black/20 text-white border-none">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="glass rounded-full bg-black/20 text-white border-none">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {(context === 'browse' || context === 'notifications' || context === 'saved') && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-bold">
            {context === 'browse' ? 'Browse' : 
             context === 'notifications' ? 'Notifications' : 'Saved Items'}
          </h1>
          <div className="w-10" />
        </div>
      )}

      {context === 'post' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')} className="glass rounded-full">
            <X className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-sm font-bold">Post Ad</h1>
            <p className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase">Step 1 of 5</p>
          </div>
          <Button variant="ghost" size="icon" className="glass rounded-full">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      )}

      {(context === 'profile' || context === 'chat-list') && (
        <div className="flex items-center justify-between w-full">
          <div className="w-10" />
          <h1 className="text-lg font-bold">
            {context === 'profile' ? 'My Quvora' : 'Messages'}
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass rounded-full">
              {context === 'profile' ? <Settings className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
