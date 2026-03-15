/**
 * POST /api/indexnow
 *
 * Protected endpoint that submits all site URLs (or a custom list) to IndexNow.
 * Designed to be called by:
 *   - Vercel Deploy Hooks (automatic after each deployment)
 *   - GitHub Actions (see .github/workflows/indexnow.yml)
 *   - Manual curl for testing
 *
 * Authentication: Bearer token via INDEXNOW_SECRET env var.
 *
 * Example request (full-site submission):
 *   curl -X POST https://www.gcsemathsai.co.uk/api/indexnow \
 *        -H "Authorization: Bearer <INDEXNOW_SECRET>"
 *
 * Example request (specific URLs):
 *   curl -X POST https://www.gcsemathsai.co.uk/api/indexnow \
 *        -H "Authorization: Bearer <INDEXNOW_SECRET>" \
 *        -H "Content-Type: application/json" \
 *        -d '{"urls": ["https://www.gcsemathsai.co.uk/blog/my-new-post"]}'
 */

import { NextResponse } from 'next/server'
import { submitToIndexNow, getAllSiteUrls } from '@/lib/indexnow'

export async function POST(req: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────
  const secret = process.env.INDEXNOW_SECRET
  if (secret) {
    const auth = req.headers.get('authorization') ?? ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
    if (token !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // ── Parse optional URL list ──────────────────────────────────────────────
  let urls: string[] | undefined
  try {
    const body = await req.json().catch(() => ({}))
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls
    }
  } catch {
    // no body — submit all URLs
  }

  const urlsToSubmit = urls ?? getAllSiteUrls()

  // ── Submit ───────────────────────────────────────────────────────────────
  const result = await submitToIndexNow(urlsToSubmit)

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'IndexNow API returned an error', status: result.status },
      { status: 502 }
    )
  }

  return NextResponse.json({
    ok: true,
    submitted: result.submitted,
    indexnowStatus: result.status,
    urls: urlsToSubmit.slice(0, 5).concat(urlsToSubmit.length > 5 ? [`…and ${urlsToSubmit.length - 5} more`] : []),
  })
}

// Reject all other methods cleanly
export async function GET() {
  return NextResponse.json({ error: 'Use POST' }, { status: 405 })
}
