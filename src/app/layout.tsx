
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppNav } from '@/components/navigation/app-nav';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import React from 'react';

export const metadata: Metadata = {
  title: 'Quvora',
  description: "India's first vernacular-first, AI-powered marketplace.",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Quvora',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white overflow-x-hidden touch-none">
        <FirebaseClientProvider>
          <AppNav>
            <main className="h-screen overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
              {children}
            </main>
          </AppNav>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
