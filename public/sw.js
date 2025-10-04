const CACHE_NAME = 'pos-pwa-v2';
const urlsToCache = [
    '/',
    '/favicon.ico',
    '/192.png',
    '/manifest.json',
    '/offline.html', // fallback page
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await Promise.all(
                urlsToCache.map(url =>
                    cache.add(url).catch(err => console.error(`Failed to cache ${url}:`, err))
                )
            );
        })()
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map(name => name !== CACHE_NAME ? caches.delete(name) : undefined)
            );
        })()
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await caches.match(event.request);

            if (cachedResponse) {
                event.waitUntil(
                    fetch(event.request)
                        .then(networkResponse => {
                            if (networkResponse.ok) cache.put(event.request, networkResponse.clone());
                        })
                        .catch(() => { })
                );
                return cachedResponse;
            }

            try {
                const response = await fetch(event.request);
                if (response.ok) cache.put(event.request, response.clone());
                return response;
            } catch {
                return caches.match('/offline.html') || new Response('Offline', { status: 503 });
            }
        })()
    );
});
