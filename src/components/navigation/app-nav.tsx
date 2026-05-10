
"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TopNav } from './top-nav';
import { BottomNav } from './bottom-nav';

export function AppNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // Auth Guard Logic (Mocked for Demo)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hide nav on entry flow routes and Landing Page
  const isLandingPage = pathname === '/';
  const hideNavOnRoutes = ['/splash', '/onboarding', '/login', '/verify', '/register'];
  const shouldHideNav = hideNavOnRoutes.includes(pathname) || isLandingPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simplified Dashboard Access Check
  // In a real app, this would use the useUser hook from Firebase
  useEffect(() => {
    const protectedRoutes = ['/me', '/chat', '/post', '/my-ads', '/notifications', '/saved'];
    if (protectedRoutes.includes(pathname) && !isLoggedIn) {
      // For demo, we don't strictly redirect yet to allow UI review
      // router.push('/');
    }
  }, [pathname, isLoggedIn, router]);

  if (shouldHideNav) return <>{children}</>;

  return (
    <>
      <TopNav isScrolled={isScrolled} />
      {children}
      <BottomNav />
    </>
  );
}
