// public/sw.js
const CACHE_NAME = 'pos-pwa-v1';
const urlsToCache = ['/', '/favicon.ico'];  // Add more as needed

self.addEventListener('install', (event) => {
    console.log('SW installing...');  
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW caching files');
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    console.log('SW activated');
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    self.clients.claim();  // Takes control immediately
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});