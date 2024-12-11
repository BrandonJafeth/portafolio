import type { NextConfig } from 'next';
import siteConfig from './config/site.config';

const nextConfig: NextConfig = {
  ...siteConfig,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;