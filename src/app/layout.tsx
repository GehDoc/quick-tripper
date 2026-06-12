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
  title: 'Quick-tripper — Serverless AI Itinerary Planner',
  description:
    'Generate, compress, and instantly share markdown travel itineraries completely client-side via Hugging Face.',
  robots: 'index, follow',
};

// Explicit viewport rules to prevent layout scaling breaking on mobile devices
export const viewport: Viewport = {
  themeColor: '#4f46e5', // Matches your primary branding color
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 'data-theme' tells DaisyUI which default theme colors to map to your classes
    <html lang="en" data-theme="light" className={`${inter.variable}`}>
      <body className="font-sans antialiased selection:bg-primary/20">{children}</body>
    </html>
  );
}
