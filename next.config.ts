import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  redirects: async () => [
    // SEO redirects for keyword-rich predicted-papers slugs.
    {
      source: '/gcse-maths-2026-predicted-papers',
      destination: '/predicted-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },
    {
      source: '/edexcel-gcse-maths-2026-predicted-papers',
      destination: '/predicted-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },
    {
      source: '/edexcel-predicted-papers',
      destination: '/predicted-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },
  ],
  rewrites: async () => [
    // Legacy static formula sheets (Number strand HTML pack) kept at
    // /formulas-print/* so the Next.js /formulas pages can take precedence.
    { source: '/formulas-print', destination: '/formulas/index.html' },
    { source: '/formulas-print/:path*', destination: '/formulas/:path*' },
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
