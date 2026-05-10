
"use client"

import { Home, Grid, Plus, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', icon: Home, href: '/explore' },
    { label: 'Browse', icon: Grid, href: '/browse' },
    { label: 'Post', icon: Plus, href: '/post', isFab: true },
    { label: 'Chat', icon: MessageCircle, href: '/chat', badge: 3 },
    { label: 'Me', icon: User, href: '/me' },
  ];

  return (
    <nav className="ios-tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        if (tab.isFab) {
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-6 group">
              <div className="post-ad-fab shadow-[0_10px_30px_-5px_rgba(255,107,43,0.3)] border-2 border-white/20">
                <Icon className="w-6 h-6" />
              </div>
              <span className={cn(
                "text-[8px] font-bold mt-1 transition-colors uppercase tracking-widest",
                isActive ? "text-primary" : "text-muted-foreground/60"
              )}>
                Post
              </span>
            </Link>
          );
        }

        return (
          <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-0.5 group">
            <div className="relative">
              <Icon className={cn(
                "w-5 h-5 transition-all group-active:scale-90",
                isActive ? "text-primary fill-primary/10" : "text-muted-foreground/60"
              )} />
              {tab.badge && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[8px] text-white font-bold">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[8px] font-bold transition-colors uppercase tracking-widest",
              isActive ? "text-primary" : "text-muted-foreground/60"
            )}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
