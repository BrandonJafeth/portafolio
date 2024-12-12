import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portfolio-gold-two-44.vercel.app',
        pathname: '/**',
      },
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
  },
};

export default nextConfig;