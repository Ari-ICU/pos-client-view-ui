// next.config.mjs
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: { domains: ['via.placeholder.com'] },  // Add your POS image domains, e.g., 'your-cdn.com'
    outputFileTracingRoot: process.cwd(),  // ESM equivalent of __dirname
    // Your existing headers (from earlier PWA security)
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'DENY' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
                    { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
                    { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self'" },
                ],
            },
        ];
    },
    // Optional: For static export (full offline POS)
    // output: 'export',
};

export default withPWA({
    ...nextConfig,  // Merge your config
    dest: 'public',
    register: true,
    skipWaiting: true,
    // Advanced: Runtime caching for POS APIs (e.g., cache /api/inventory)
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/.*\.your-api\.com\/.*$/i,  // Replace with your backend
            handler: 'NetworkFirst',  // Tries network, falls back to cache
            options: {
                cacheName: 'pos-api-cache',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 5,  // 5 min
                },
            },
        },
    ],
    // Disable SW in dev (avoids issues with --experimental-https)
    disable: process.env.NODE_ENV === 'development',
})(nextConfig);