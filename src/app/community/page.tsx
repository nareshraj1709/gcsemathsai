'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { listPosts, type ForumPost, type SortMode } from '@/lib/forum'
import { supabase } from '@/lib/supabase'
import PostCard from '@/components/forum/PostCard'

export default function CommunityHome() {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState<SortMode>('new')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setLoggedIn(true)
    })
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    const data = await listPosts({ sort, search: search.trim() || undefined })
    setPosts(data)
    setLoading(false)
  }, [sort, search])

  useEffect(() => { load() }, [load])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Community</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">GCSE Maths Forum</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Ask a question, share your working, and help others. Moderated and safe for students.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-stretch sm:items-center">
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <input
              type="search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 transition"
            />
          </form>
          <div className="flex gap-2">
            <div className="flex bg-white border border-gray-200 rounded-xl p-1">
              {(['new', 'top'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    sort === s ? 'bg-purple-100 text-purple-700' : 'text-gray-500'
                  }`}
                >
                  {s === 'new' ? 'New' : 'Top'}
                </button>
              ))}
            </div>
            {loggedIn ? (
              <Link
                href="/community/new"
                className="bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition whitespace-nowrap"
              >
                + New post
              </Link>
            ) : (
              <Link
                href="/auth"
                className="bg-purple-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition whitespace-nowrap"
              >
                Log in to post
              </Link>
            )}
          </div>
        </div>

        {/* Posts list */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-purple-700 font-semibold">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-3">💬</div>
            <p className="text-base font-bold text-gray-900 mb-1">No posts yet</p>
            <p className="text-sm text-gray-500 mb-6">
              {search ? 'Try a different search term.' : 'Be the first to start a discussion!'}
            </p>
            {loggedIn && !search && (
              <Link
                href="/community/new"
                className="inline-block bg-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition"
              >
                Create the first post →
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Community guidelines */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-5">
          <p className="text-sm font-bold text-blue-800 mb-2">📚 Community guidelines</p>
          <ul className="text-xs text-blue-700 space-y-1 leading-relaxed">
            <li>• Be kind and respectful — we're all here to learn</li>
            <li>• Ask clear questions and share your working when possible</li>
            <li>• No personal contact details, no advertising, no cheating offers</li>
            <li>• Report anything that breaks the rules — moderators will review</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
