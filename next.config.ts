import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  rewrites: async () => [
    { source: '/formulas', destination: '/formulas/index.html' },
    { source: '/formulas/', destination: '/formulas/index.html' },
    { source: '/formulas/:strand', destination: '/formulas/:strand/index.html' },
  ],
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/(.*)\\.(js|css|woff2|woff|ttf|otf)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/GCSE_Maths_Formula_Sheet.pdf',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=2592000' },
      ],
    },
  ],
};

export default nextConfig;
