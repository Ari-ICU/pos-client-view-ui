import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart.context';
import { LanguageProvider } from '@/context/language.context';
import { SettingsProvider } from '@/context/settings.context';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'POS System',
  description: 'Point-of-Sale app built with Next.js',
  themeColor: '#3b5998',        // Chrome address bar color
  manifest: '/manifest.json',    // Correct path
  icons: [
    { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          {/* Favicon links for address bar/tabs (fallback if metadata icons don't trigger) */}
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          {/* PWA shortcut icon (for Chrome address bar on Android) */}
          <link rel="manifest" href="/manifest.json" />
        </head>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: { fontSize: '14px' },
          }}
        />
        <LanguageProvider>
          <SettingsProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </SettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}