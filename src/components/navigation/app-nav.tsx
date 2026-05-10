
"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { TopNav } from './top-nav';
import { BottomNav } from './bottom-nav';

export function AppNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide nav on onboarding and splash
  const hideNav = pathname === '/onboarding' || pathname === '/splash' || pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (hideNav) return <>{children}</>;

  return (
    <>
      <TopNav isScrolled={isScrolled} />
      {children}
      <BottomNav />
    </>
  );
}
