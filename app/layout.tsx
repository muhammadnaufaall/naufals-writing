import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Footer from '@/components/footer';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NaufalIsWriting',
  description:
    'I write about life, sometimes self improvement and barely software engineering,',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
          <Toaster
            position="top-center"
            pauseWhenPageIsHidden
            duration={5000}
            theme="light"
            richColors={true}
          />
          <Navbar />
          <main className="min-h-[calc(100vh-113px)] lg:min-h-[calc(100vh-140px)]">
            {children}
            <Analytics />
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
