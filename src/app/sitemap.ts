import type { MetadataRoute } from 'next'
import { getAllDiagnosticSets } from '@/lib/diagnostic-mcqs'
import { CONTENT, toSlug } from '@/lib/study-content'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { getAllTopics } from '@/lib/topics-markdown'
import { GLOSSARY } from '@/lib/glossary-data'
import { QUESTION_TYPES } from '@/lib/question-types-data'
import { getAllFormulaSheets } from '@/lib/formula-sheet-extractor'
import { PREDICTED_PAPER_FAMILIES } from '@/lib/predicted-papers'

const BASE = 'https://www.gcsemathsai.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {

  // Static public pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/study`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/papers`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/features`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/formula-sheet`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/formulas`, changeFrequency: 'weekly', priority: 0.9 },
    // The legacy /formulas/Number/*.html pages are intentionally excluded here —
    // they're a "deluxe sheet" companion linked from the current /formulas/[slug]
    // pages, not meant to rank independently. Submitting near-duplicate content
    // via the sitemap just dilutes crawl budget (GSC: "Crawled - not indexed").
    { url: `${BASE}/topics`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/community`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/practice`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/learn`, changeFrequency: 'weekly', priority: 0.85 },
    // /downloads now redirects to /papers (we no longer host past-paper PDFs).
    // Not listed in the sitemap.
    { url: `${BASE}/sections`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    // Hubs and structural pages
    { url: `${BASE}/glossary`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/question-types`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/aqa`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/edexcel`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/ocr`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/site-map`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/practice-papers`, changeFrequency: 'weekly', priority: 0.95 },
    ...PREDICTED_PAPER_FAMILIES.map(f => ({
      url: `${BASE}/practice-papers/${f.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    })),
    // Feature deep-dives
    { url: `${BASE}/features/revision-planner`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/features/writing-pad`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/features/parent-report`, changeFrequency: 'monthly', priority: 0.7 },
  ]

  // Glossary entries
  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY.map(g => ({
    url: `${BASE}/glossary/${g.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Question type guides
  const questionTypePages: MetadataRoute.Sitemap = QUESTION_TYPES.map(q => ({
    url: `${BASE}/question-types/${q.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // Per-topic formula sheets
  const formulaSheetPages: MetadataRoute.Sitemap = getAllFormulaSheets().map(s => ({
    url: `${BASE}/formulas/${s.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Dynamic study topic pages
  const studyPages: MetadataRoute.Sitemap = CONTENT.map(c => ({
    url: `${BASE}/study/${toSlug(c.topic, c.subtopic)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Markdown blog articles (new)
  const mdBlogPages: MetadataRoute.Sitemap = getAllMarkdownPosts().map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO ? new Date(p.dateISO) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // TypeScript-based blog posts (existing)
  const tsBlogPages: MetadataRoute.Sitemap = BLOG_POSTS.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Topic explainer pages
  const topicPages: MetadataRoute.Sitemap = getAllTopics().map(t => ({
    url: `${BASE}/topics/${t.slug}`,
    lastModified: t.dateISO ? new Date(t.dateISO) : undefined,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const quizPages: MetadataRoute.Sitemap = [{ url: `${BASE}/diagnostic` }, ...getAllDiagnosticSets().map(s => ({ url: `${BASE}/diagnostic/${s.topicSlug}` }))]
  const entries = [...quizPages, ...staticPages, ...studyPages, ...topicPages, ...formulaSheetPages, ...glossaryPages, ...questionTypePages, ...mdBlogPages, ...tsBlogPages]
  return entries.filter((entry, index) => entries.findIndex(other => other.url === entry.url) === index)
}
