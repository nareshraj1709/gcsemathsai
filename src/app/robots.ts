import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard',
          '/practice',
          '/review',
          '/auth',
          '/onboarding',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.gcsemathsai.co.uk/sitemap.xml',
  }
}
