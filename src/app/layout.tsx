import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Optimize typography loading directly from Google Fonts via Next.js
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Production SEO metadata architecture
export const metadata: Metadata = {
  metadataBase: new URL('https://gehdoc.github.io/quick-tripper/'),
  title: 'Quick-tripper — Private Point-to-Point AI Trip Planner',
  description:
    'Plan your journeys one-by-one with privacy-first AI. Free, serverless, and zero-tracking. Bring your own Hugging Face key.',
  keywords: [
    'Private AI Trip Planner',
    'Point-to-Point Route Planner',
    'Zero-Backend Travel App',
    'Hugging Face Travel AI',
    'MIT Licensed Trip Planner',
    'Serverless Road Trip',
  ],
  authors: [{ name: 'Quick-tripper Contributors' }],
  openGraph: {
    title: 'Quick-tripper — Private AI Trip Planner',
    description: 'Privacy-first, zero-backend point-to-point trip planning.',
    url: 'https://gehdoc.github.io/quick-tripper/',
    siteName: 'Quick-tripper',
    images: [
      {
        url: 'icon.svg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick-tripper — Private AI Trip Planner',
    description: 'Privacy-first, zero-backend point-to-point trip planning.',
    images: ['icon.svg'],
  },
  robots: 'index, follow',
  icons: {
    icon: 'icon.svg',
    apple: 'icon.svg',
  },
};

// Explicit viewport rules to prevent layout scaling breaking on mobile devices
export const viewport: Viewport = {
  themeColor: '#4f46e5', // Matches your primary branding color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import { Footer } from '@/components/Footer';
import { NavbarWrapper } from '@/components/NavbarWrapper';
import { AppProvider } from '@/hooks/useApp';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'data-theme' tells DaisyUI which default theme colors to map to your classes
    <html lang="en" data-theme="light" className={`${inter.variable}`}>
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="5dc1b700-3859-4cc3-9354-d98f461d39f8"
        ></script>
      </head>
      <body className="font-sans antialiased selection:bg-primary/20 bg-base-200 min-h-screen flex flex-col">
        <AppProvider>
          <NavbarWrapper />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
