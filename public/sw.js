const CACHE_NAME = 'pos-pwa-v2';
const urlsToCache = ['/', '/favicon.ico', '/192.png'];

self.addEventListener('install', (event) => {
    console.log('SW installing...');
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            for (const url of urlsToCache) {
                try {
                    await cache.add(url);
                    console.log('Cached:', url);
                } catch (err) {
                    console.warn('Failed to cache:', url, err);
                }
            }
        })()
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
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
