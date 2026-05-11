'use client';

import { Home, Plus, MessageCircle, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Feed', icon: Home, href: '/explore' },
    { label: 'Explore', icon: Sparkles, href: '/browse' },
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
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-8 group">
              <div className="post-ad-fab shadow-xl shadow-primary/30 border-2 border-white/20 hover:scale-105 transition-transform active:scale-95">
                <Plus className="w-7 h-7" />
              </div>
              <span className={cn(
                "text-[8px] font-black mt-1.5 uppercase tracking-widest",
                isActive ? "text-primary" : "text-muted-foreground/50"
              )}>
                Post
              </span>
            </Link>
          );
        }

        return (
          <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 group">
            <div className="relative">
              <Icon className={cn(
                "w-5 h-5 transition-all group-active:scale-90",
                isActive ? "text-primary fill-primary/10" : "text-muted-foreground/40"
              )} />
              {tab.badge && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] text-white font-black shadow-lg shadow-primary/20"
                >
                  {tab.badge}
                </motion.span>
              )}
            </div>
            <span className={cn(
              "text-[8px] font-black transition-colors uppercase tracking-widest",
              isActive ? "text-primary" : "text-muted-foreground/50"
            )}>
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
import { motion } from 'framer-motion';