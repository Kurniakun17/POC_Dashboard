import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Output standalone for Docker production builds
  output: 'standalone',

  // Strict mode for better development experience
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Enable Server Actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
