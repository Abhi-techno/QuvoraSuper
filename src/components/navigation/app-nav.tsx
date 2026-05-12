"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TopNav } from './top-nav';
import { BottomNav } from './bottom-nav';
import { useUser } from '@/firebase';

export function AppNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useUser();

  // Navigation logic
  const isLandingPage = pathname === '/';
  const hideNavOnRoutes = ['/splash', '/onboarding', '/login', '/verify', '/register'];
  const shouldHideNav = hideNavOnRoutes.includes(pathname) || isLandingPage;

  useEffect(() => {
    const handleScroll = (e: any) => {
      setIsScrolled(e.target.scrollTop > 10);
    };
    
    const scrollContainer = document.getElementById('main-scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [shouldHideNav]);

  useEffect(() => {
    if (loading) return;
    const protectedRoutes = ['/me', '/chat', '/post', '/my-ads', '/notifications', '/saved', '/explore', '/browse'];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
    if (isProtected && !user) router.push('/');
  }, [pathname, user, loading, router]);

  if (shouldHideNav) return <>{children}</>;

  return (
    <div className="flex flex-col h-svh w-full overflow-hidden fixed inset-0 bg-background">
      <TopNav isScrolled={isScrolled} />
      <div 
        id="main-scroll-container"
        className="flex-1 overflow-y-auto overscroll-behavior-none gpu-accelerated"
      >
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
