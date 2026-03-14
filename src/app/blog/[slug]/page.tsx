import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — GCSEMathsAI',
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Blog</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Article coming soon</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          We&apos;re still writing this one. Check back shortly.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="bg-amber-50 border border-amber-100 rounded-2xl px-6 py-10 mb-8">
          <p className="text-4xl mb-4">✍️</p>
          <p className="text-gray-700 font-semibold mb-1">This post is being written</p>
          <p className="text-sm text-gray-500">
            Slug: <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{params.slug}</code>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/blog"
            className="bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition"
          >
            ← Back to blog
          </Link>
          <Link
            href="/contact"
            className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-purple-400 hover:text-purple-700 transition"
          >
            Suggest a topic
          </Link>
        </div>
      </div>
    </main>
  )
}
