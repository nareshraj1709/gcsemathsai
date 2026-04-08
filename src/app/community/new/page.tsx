'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { createPost, parseTags } from '@/lib/forum'
import { getProfileFromCache } from '@/lib/profile'
import ImageUploader from '@/components/forum/ImageUploader'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [authorName, setAuthorName] = useState('Student')
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth')
        return
      }
      const profile = getProfileFromCache()
      if (profile?.name) setAuthorName(profile.name)
      setAuthChecked(true)
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters.')
      return
    }
    if (body.trim().length < 10) {
      setError('Post body must be at least 10 characters.')
      return
    }

    setSubmitting(true)

    // Moderate via API
    try {
      const modRes = await fetch('/api/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `${title}\n\n${body}` }),
      })
      const mod = (await modRes.json()) as { safe: boolean; reason?: string }
      if (!mod.safe) {
        setError(mod.reason || 'Your post was flagged. Please rewrite and try again.')
        setSubmitting(false)
        return
      }
    } catch {
      // If moderation fails, allow but log
    }

    const result = await createPost({
      title,
      body,
      tags: parseTags(tagsInput),
      image_urls: imageUrls,
      author_name: authorName,
    })

    if ('error' in result) {
      setError(result.error)
      setSubmitting(false)
      return
    }

    router.push(`/community/post/${result.id}`)
  }

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-purple-700 font-semibold">Loading...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link href="/community" className="text-sm text-purple-700 font-semibold hover:underline">
          ← Back to community
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">Create a new post</h1>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. How do I solve quadratic inequalities?"
              maxLength={150}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 transition"
              required
            />
            <p className="text-xs text-gray-400 mt-1">{title.length}/150</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Your question or post <span className="text-red-500">*</span>
            </label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Explain what you're stuck on, share your working, or start a discussion..."
              rows={8}
              maxLength={5000}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 transition resize-none leading-relaxed"
              required
            />
            <p className="text-xs text-gray-400 mt-1">{body.length}/5000</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5">
              Tags <span className="text-gray-400 font-normal">(optional, up to 5)</span>
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={e => setTagsInput(e.target.value)}
              placeholder="algebra, quadratics, gcse"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 transition"
            />
            <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Images <span className="text-gray-400 font-normal">(optional, up to 3)</span>
            </label>
            <ImageUploader urls={imageUrls} onChange={setImageUrls} maxImages={3} />
            <p className="text-xs text-gray-400 mt-2">Useful for sharing your working or a question from a paper.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-purple-700 text-white py-3 rounded-xl font-semibold text-sm hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Posting...' : 'Post to community'}
            </button>
            <Link
              href="/community"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:border-purple-300 transition"
            >
              Cancel
            </Link>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Posts are moderated for safety. Posting as <strong className="text-gray-600">{authorName}</strong>.
          </p>
        </form>
      </div>
    </main>
  )
}
