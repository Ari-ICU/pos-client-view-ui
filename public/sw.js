const CACHE_NAME = 'pos-pwa-v2';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/192.png',
    '/manifest.json',  // Added: For PWA manifest
];

self.addEventListener('install', (event) => {
    console.log('SW installing...');
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.addAll(urlsToCache);  // Batch add with error handling below
                console.log('All assets cached successfully');
            } catch (err) {
                console.error('Caching failed:', err);
                // Optionally, re-throw to fail install if critical assets miss
            }
        })()
    );
    self.skipWaiting();  // Activate immediately
});

self.addEventListener('activate', (event) => {
    console.log('SW activated');
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })()
    );
    self.clients.claim();  // Take control immediately
});

// Removed invalid 'reinstall' listener

self.addEventListener('fetch', (event) => {
    // Skip non-GET or non-HTTP(S) requests (e.g., data: URIs)
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
        return;
    }

    event.respondWith(
        (async () => {
            // Try cache first
            let response = await caches.match(event.request);
            if (response) {
                return response;
            }

            // If not in cache, try network
            try {
                response = await fetch(event.request);
                // Optionally cache successful responses for future offline use
                if (response.ok) {
                    const cache = await caches.open(CACHE_NAME);
                    event.waitUntil(cache.put(event.request, response.clone()));
                }
                return response;
            } catch (err) {
                console.warn('Fetch failed; serving offline fallback:', err);
                // Fall back to a cached offline page
                return caches.match('/offline.html') || new Response('Offline - Please check your connection.', {
                    status: 503,
                    statusText: 'Service Unavailable'
                });
            }
        })()
    );
});