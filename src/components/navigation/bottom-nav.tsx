
"use client"

import { Home, Grid, Plus, MessageCircle, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Browse', icon: Grid, href: '/browse' },
    { label: 'Post Ad', icon: Plus, href: '/post', isFab: true },
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
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
              <div className="post-ad-fab">
                <Plus className="w-8 h-8" />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {tab.label}
              </span>
            </Link>
          );
        }

        return (
          <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 group">
            <div className="relative">
              <Icon className={cn(
                "w-6 h-6 transition-all group-active:scale-90",
                isActive ? "text-primary fill-primary/20" : "text-muted-foreground"
              )} />
              {tab.badge && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-white">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className={cn(
              "text-[10px] font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
