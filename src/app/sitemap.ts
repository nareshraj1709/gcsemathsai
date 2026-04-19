import type { MetadataRoute } from 'next'
import { CONTENT, toSlug } from '@/lib/study-content'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { getAllTopics } from '@/lib/topics-markdown'

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
    { url: `${BASE}/formula-sheet`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/formulas`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/formulas/Number/01_integers-place-value-ordering.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/02_factors-multiples-primes.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/03_powers-roots-indices.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/04_fractions.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/05_decimals.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/06_percentages.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/07_ratio.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/08_proportion.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/09_standard-form.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/10_surds.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/11_bounds-error-intervals.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/12_estimation.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/formulas/Number/13_product-rule-counting.html`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/topics`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/community`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/practice`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/review`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/downloads`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/notes-review`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/sections`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
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

  // Markdown blog articles (new)
  const mdBlogPages: MetadataRoute.Sitemap = getAllMarkdownPosts().map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO ? new Date(p.dateISO) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // TypeScript-based blog posts (existing)
  const tsBlogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Topic explainer pages (73 SEO pages)
  const topicPages: MetadataRoute.Sitemap = getAllTopics().map(t => ({
    url: `${BASE}/topics/${t.slug}`,
    lastModified: t.dateISO ? new Date(t.dateISO) : now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...staticPages, ...studyPages, ...topicPages, ...mdBlogPages, ...tsBlogPages]
}
