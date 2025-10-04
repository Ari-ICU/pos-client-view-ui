'use client'

import POSSystem from "@/components/pos/POSSystem";
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registered:', reg))
        .catch(err => console.log('SW registration failed:', err));
    }
  }, []);

  return (
    <div className="">
      <POSSystem />
    </div>
  );
}
