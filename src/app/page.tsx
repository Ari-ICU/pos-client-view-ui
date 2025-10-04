'use client';

import dynamic from 'next/dynamic';
import { Suspense, useEffect } from 'react';

const POSSystemPage = dynamic(() => import('@/components/pos/POSSystem'));

export default function Home() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => {
            console.log('Service Worker registered:', reg);
          })
          .catch(err => console.error('Service Worker registration failed:', err));
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      <Suspense fallback={<div>Loading POS System...</div>}>
        <POSSystemPage />
      </Suspense>
    </div>
  );
}
