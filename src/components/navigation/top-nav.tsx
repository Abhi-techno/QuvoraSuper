
"use client"

import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Bell, User, Search, Share2, Heart, HelpCircle, X } from 'lucide-react';
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
    return 'default';
  };

  const context = getContext();

  return (
    <header className={cn(
      "ios-top-nav sticky top-0 w-full z-50",
      isScrolled && "bg-background/80"
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
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-background" />
              </Button>
            </Link>
            <Link href="/me">
              <Avatar className="w-8 h-8 border border-white/20">
                <AvatarImage src="https://picsum.photos/seed/user/150/150" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      )}

      {context === 'detail' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="glass rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass rounded-full">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="glass rounded-full">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {context === 'browse' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Browse Categories</h1>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      )}

      {context === 'post' && (
        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <X className="w-6 h-6" />
          </Button>
          <div className="text-center">
            <h1 className="text-sm font-semibold">Post Ad</h1>
            <p className="text-[10px] text-muted-foreground">Step 1 of 5</p>
          </div>
          <Button variant="ghost" size="icon">
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
            <Button variant="ghost" size="icon">
              {context === 'profile' ? <Bell className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
