import type { MetadataRoute } from 'next'
import { CONTENT, toSlug } from '@/lib/study-content'
import { BLOG_POSTS } from '@/lib/blog-posts'

const BASE = 'https://www.gcsemathsai.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static public pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/study`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/papers`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Dynamic study topic pages
  const studyPages: MetadataRoute.Sitemap = CONTENT.map(c => ({
    url: `${BASE}/study/${toSlug(c.topic, c.subtopic)}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Blog post pages
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...studyPages, ...blogPages]
}
