import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart.context";
import { LanguageProvider } from "@/context/language.context";
import { SettingsProvider } from "@/context/settings.context";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "POS System",
  description: "Point-of-Sale app built with Next.js for efficient order management.",
  manifest: "/manifest.json",
  icons: [
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    { url: "/192.png", sizes: "192x192", type: "image/png" },
  ],
  formatDetection: { telephone: false },
  openGraph: {
    title: "POS System",
    description: "A modern Point-of-Sale app built with Next.js for efficient order management.",
    url: "https://your-pos-system.vercel.app", // Replace with your Vercel domain
    siteName: "POS System",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "POS System Preview" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "POS System",
    description: "Efficient Point-of-Sale app with Next.js.",
    images: ["https://your-pos-system.vercel.app/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3b5998",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (document.documentElement.requestFullscreen && "displayMode" in navigator) {
      if (navigator.displayMode === "fullscreen" || navigator.displayMode === "standalone") {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log(`Error entering fullscreen: ${err.message}`);
        });
      }
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: { fontSize: "14px" },
          }}
        />
        <LanguageProvider>
          <SettingsProvider>
            <CartProvider>{children}</CartProvider>
          </SettingsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}