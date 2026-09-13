import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/auth',
          '/onboarding',
          '/api/',
          // Legacy "deluxe sheet" companion pages linked from /formulas/[slug] —
          // near-duplicate of the current page, not meant to rank on their own.
          '/formulas/Number/',
        ],
      },
    ],
    sitemap: 'https://www.gcsemathsai.co.uk/sitemap.xml',
  }
}
