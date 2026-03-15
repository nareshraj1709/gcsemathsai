/**
 * IndexNow — notifies Bing, Yandex, and other IndexNow-compatible search
 * engines about new or updated pages.
 *
 * Spec: https://www.indexnow.org/documentation
 * Submitting to api.indexnow.org fans out to all participating engines.
 */

import { CONTENT, toSlug } from '@/lib/study-content'
import { BLOG_POSTS } from '@/lib/blog-posts'
import { getAllMarkdownPosts } from '@/lib/markdown'

const BASE          = 'https://www.gcsemathsai.co.uk'
const HOST          = 'www.gcsemathsai.co.uk'
const KEY           = '90d06b30544c4d6eb157460b3b066cff'
const KEY_LOCATION  = `${BASE}/${KEY}.txt`
const INDEXNOW_API  = 'https://api.indexnow.org/indexnow'

// ── URL list ─────────────────────────────────────────────────────────────────

export function getAllSiteUrls(): string[] {
  const staticUrls = [
    BASE,
    `${BASE}/study`,
    `${BASE}/papers`,
    `${BASE}/features`,
    `${BASE}/pricing`,
    `${BASE}/blog`,
    `${BASE}/contact`,
    `${BASE}/privacy`,
    `${BASE}/terms`,
  ]

  const studyUrls = CONTENT.map(
    c => `${BASE}/study/${toSlug(c.topic, c.subtopic)}`
  )

  const mdBlogUrls = getAllMarkdownPosts().map(
    p => `${BASE}/blog/${p.slug}`
  )

  const tsBlogUrls = BLOG_POSTS.map(
    p => `${BASE}/blog/${p.slug}`
  )

  return [...staticUrls, ...studyUrls, ...mdBlogUrls, ...tsBlogUrls]
}

// ── Submission ────────────────────────────────────────────────────────────────

export interface IndexNowResult {
  ok: boolean
  status?: number
  submitted: number
  error?: string
}

/**
 * Submit a list of URLs to IndexNow.
 * If no URLs provided, submits the entire site URL list.
 * IndexNow accepts up to 10,000 URLs per request.
 */
export async function submitToIndexNow(urls?: string[]): Promise<IndexNowResult> {
  const urlList = urls ?? getAllSiteUrls()

  if (urlList.length === 0) {
    return { ok: false, submitted: 0, error: 'No URLs to submit' }
  }

  // IndexNow max 10,000 per batch — slice to be safe
  const batch = urlList.slice(0, 10_000)

  try {
    const res = await fetch(INDEXNOW_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: KEY_LOCATION,
        urlList: batch,
      }),
    })

    return { ok: res.ok, status: res.status, submitted: batch.length }
  } catch (e) {
    return { ok: false, submitted: 0, error: String(e) }
  }
}
