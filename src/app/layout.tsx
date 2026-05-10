
import type {Metadata} from 'next';
import './globals.css';
import { AppNav } from '@/components/navigation/app-nav';
import { Toaster } from '@/components/ui/toaster';
import { initializeFirebase, FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Quvora Marketplace | Your World. One Place.',
  description: "India's first vernacular-first, AI-powered marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { firebaseApp, firestore, auth } = initializeFirebase();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary selection:text-white">
        <FirebaseClientProvider firebaseApp={firebaseApp} firestore={firestore} auth={auth}>
          <AppNav>
            <main className="min-h-screen pb-24">
              {children}
            </main>
          </AppNav>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
