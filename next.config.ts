/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"], 
    deviceSizes: [320, 420, 768, 1024, 1200, 1600], 
    imageSizes: [16, 32, 48, 64, 128, 256, 384], 
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  // Add modern output for better performance
  output: 'standalone',
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
};

module.exports = nextConfig;
