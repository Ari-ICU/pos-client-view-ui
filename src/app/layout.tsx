import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart.context";
import { LanguageProvider } from "@/context/language.context";
import { SettingsProvider } from "@/context/settings.context";
import { Toaster } from "react-hot-toast";

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
  description: "Point-of-Sale app built with Next.js",
  manifest: "/manifest.json",
  icons: [
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    { url: "/192.png", sizes: "192x192", type: "image/png" },
  ],
  formatDetection: { telephone: false },
};

// ✅ Move themeColor + viewport here
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#3b5998",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
