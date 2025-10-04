'use client'

import POSSystem from "@/components/pos/POSSystem";
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {  // Ensure SW registers after page load
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered:', registration);

            // Listen for updates to the SW
            registration.onupdatefound = () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.onstatechange = () => {
                  if (newWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                      console.log('New content available, please refresh.');
                    } else {
                      console.log('Content cached for offline use.');
                    }
                  }
                };
              }
            };
          })
          .catch(error => console.error('SW registration failed:', error));
      });
    }
  }, []);

  return (
    <div className="">
      <POSSystem />
    </div>
  );
}
