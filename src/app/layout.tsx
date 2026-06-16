import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gehdoc.github.io/quick-tripper/'),
  title: 'Quick-tripper — Private Point-to-Point AI Trip Planner',
  description:
    'Plan your journeys one-by-one with privacy-first AI. Free, serverless, and zero-tracking.',
  keywords: ['Private AI Trip Planner', 'Point-to-Point Route Planner', 'Serverless Road Trip'],
  icons: { icon: 'icon.svg', apple: 'icon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

import { NavbarWrapper } from '@/components/NavbarWrapper';
import { AppProvider } from '@/hooks/useApp';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={inter.variable}>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="5dc1b700-3859-4cc3-9354-d98f461d39f8"
          ></script>
        )}
      </head>
      <body className="font-sans antialiased selection:bg-primary/20">
        <AppProvider>
          <div className="app-frame">
            <header className="z-50 w-full bg-base-100/90 backdrop-blur-md border-b border-base-200 flex-none">
              <NavbarWrapper />
            </header>
            <main className="app-workspace flex-col lg:flex-row">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
