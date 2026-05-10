
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

  // Dashboard Protection Logic
  useEffect(() => {
    if (loading) return;

    const protectedRoutes = ['/me', '/chat', '/post', '/my-ads', '/notifications', '/saved', '/explore', '/browse'];
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !user) {
      router.push('/');
    }
  }, [pathname, user, loading, router]);

  if (shouldHideNav) return <>{children}</>;

  return (
    <>
      <TopNav isScrolled={isScrolled} />
      {children}
      <BottomNav />
    </>
  );
}
