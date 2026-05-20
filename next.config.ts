import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  redirects: async () => [
    // ── /predicted-papers → /practice-papers (slug rename 2026-05) ─────────
    // The route folder is now src/app/practice-papers. These 308s consolidate
    // the previously indexed /predicted-papers URLs to the new slug without
    // chained redirects.
    {
      source: '/predicted-papers',
      destination: '/practice-papers',
      permanent: true,
    },
    {
      source: '/predicted-papers/:path*',
      destination: '/practice-papers/:path*',
      permanent: true,
    },

    // SEO redirects for keyword-rich practice-papers slugs.
    {
      source: '/gcse-maths-2026-predicted-papers',
      destination: '/practice-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },
    {
      source: '/edexcel-gcse-maths-2026-predicted-papers',
      destination: '/practice-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },
    {
      source: '/edexcel-predicted-papers',
      destination: '/practice-papers/edexcel-gcse-maths-higher-2026',
      permanent: true,
    },

    // ── Past-papers cleanup (2026-05) ───────────────────────────────────────
    // We no longer host past papers or the download-PDF page. Permanent
    // 308 redirects below consolidate link equity to /papers (which now
    // lists official board links + our original practice papers). Without
    // these, Googlebot would see ~180 hard 404s for previously crawled
    // historical paper URLs.
    {
      source: '/downloads',
      destination: '/papers',
      permanent: true,
    },
    // Historical paper IDs (aqa-foundation-2022-p1, edexcel-higher-2017-p3,
    // ocr-foundation-2019-p4, ...) all redirect to /papers.
    {
      source: '/papers/:id(aqa-foundation-.*)',
      destination: '/papers',
      permanent: true,
    },
    {
      source: '/papers/:id(aqa-higher-.*)',
      destination: '/papers',
      permanent: true,
    },
    {
      source: '/papers/:id(edexcel-foundation-.*)',
      destination: '/papers',
      permanent: true,
    },
    {
      source: '/papers/:id(edexcel-higher-.*)',
      destination: '/papers',
      permanent: true,
    },
    {
      source: '/papers/:id(ocr-foundation-.*)',
      destination: '/papers',
      permanent: true,
    },
    {
      source: '/papers/:id(ocr-higher-.*)',
      destination: '/papers',
      permanent: true,
    },
    // Old AI-prefixed paper IDs were renamed practice-* in the data.
    {
      source: '/papers/:id(ai-.*)',
      destination: '/papers',
      permanent: true,
    },
    // Direct AQA PDF asset URLs that used to live at /papers/aqa/*.pdf.
    {
      source: '/papers/aqa/:file*',
      destination: '/papers',
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
