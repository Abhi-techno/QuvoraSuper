import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppNav } from '@/components/navigation/app-nav';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import React from 'react';

export const metadata: Metadata = {
  title: 'Quvora',
  description: "India's first AI-powered superapp.",
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Quvora',
  },
  // PWA manifest disabled temporarily to resolve cloud workstation CORS errors
  // manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#FDF8F3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<any>;
}>) {
  // Unwrap params for Next.js 15 compatibility
  React.use(params);

  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased selection:bg-primary selection:text-white overflow-hidden bg-[#FDF8F3]">
        <FirebaseClientProvider>
          <AppNav>
            <main className="relative h-svh w-full overflow-hidden">
              {children}
            </main>
          </AppNav>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
