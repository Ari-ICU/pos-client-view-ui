/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["via.placeholder.com"], // ✅ whitelist this domain
  },
};

module.exports = nextConfig;
