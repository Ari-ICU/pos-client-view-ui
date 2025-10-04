'use client'

import POSSystem from "@/components/pos/POSSystem";
import { useEffect, useState } from 'react';

export default function Home() {
  const [isSWActive, setIsSWActive] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register SW immediately (async, non-blocking)
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);

          // Set active state once ready
          navigator.serviceWorker.ready.then(() => {
            setIsSWActive(true);
          });

          // Listen for updates
          registration.onupdatefound = () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.onstatechange = () => {
                if (newWorker.state === 'installed') {
                  if (navigator.serviceWorker.controller) {
                    // Prompt user to refresh for new content
                    if (window.confirm('New version available! Refresh to update?')) {
                      window.location.reload();
                    }
                  } else {
                    console.log('Content cached for offline use.');
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error('SW registration failed:', error);
          setIsSWActive(false); // Fallback to online-only mode
        });
    } else {
      console.warn('Service Workers not supported.');
      setIsSWActive(false);
    }

    // No need for cleanup here since registration is one-time and doesn't attach ongoing listeners
  }, []); // Empty deps: Runs once on mount

  if (!isSWActive && 'serviceWorker' in navigator) {
    return <div>Loading POS System (initializing offline support)... </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50"> {/* Added basic styling example */}
      <POSSystem />
    </div>
  );
}