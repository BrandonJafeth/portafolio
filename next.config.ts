/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], 
    deviceSizes: [320, 420, 768, 1024, 1200, 1600], 
    imageSizes: [16, 32, 48, 64, 128, 256, 384], 
    minimumCacheTTL: 60,
    quality: 80, // Lower from default (75-80 is a good balance)
    priority: true, // Add priority for LCP images
  },
  reactStrictMode: true,
  // Add modern output for better performance
  output: 'standalone',
  // Optimize JS bundle
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
