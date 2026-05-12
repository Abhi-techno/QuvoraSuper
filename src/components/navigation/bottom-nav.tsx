'use client';

import { Home, Plus, MessageCircle, User, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Feed', icon: Home, href: '/explore' },
    { label: 'Explore', icon: Sparkles, href: '/browse' },
    { label: 'Post', icon: Plus, href: '/post', isFab: true },
    { label: 'Chat', icon: MessageCircle, href: '/chat', badge: 3 },
    { label: 'Me', icon: User, href: '/me' },
  ];

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 30,
    mass: 1
  };

  return (
    <nav className="ios-tab-bar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        if (tab.isFab) {
          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center -mt-8 group">
              <motion.div 
                whileTap={{ scale: 0.9, y: 2 }}
                transition={springConfig}
                className="post-ad-fab shadow-xl shadow-primary/40 border-2 border-white/20"
              >
                <Plus className="w-7 h-7" />
              </motion.div>
              <span className={cn(
                "text-[8px] font-black mt-1.5 uppercase tracking-widest transition-colors",
                isActive ? "text-primary" : "text-muted-foreground/50"
              )}>
                Post
              </span>
            </Link>
          );
        }

        return (
          <Link key={tab.href} href={tab.href} className="flex flex-col items-center gap-1 group">
            <motion.div 
              whileTap={{ scale: 0.8, y: 1 }}
              transition={springConfig}
              className="relative"
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
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
            </motion.div>
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