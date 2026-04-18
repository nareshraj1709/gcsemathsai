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
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="border-b px-6 py-12 text-center" style={{ background: 'var(--green-soft)', borderColor: 'var(--rule)' }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>Community</span>
        <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>GCSE Maths Forum</h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--ink-3)' }}>
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
              className="w-full px-4 py-2.5 rounded-xl text-sm focus:outline-none transition"
              style={{ border: '1px solid var(--rule)', background: 'var(--paper)' }}
            />
          </form>
          <div className="flex gap-2">
            <div className="flex rounded-xl p-1" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              {(['new', 'top'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setSort(s)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold transition"
                  style={sort === s ? { background: 'var(--green-soft)', color: 'var(--green)' } : { color: 'var(--ink-3)' }}
                >
                  {s === 'new' ? 'New' : 'Top'}
                </button>
              ))}
            </div>
            {loggedIn ? (
              <Link
                href="/community/new"
                className="text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                style={{ background: 'var(--green)' }}
              >
                + New post
              </Link>
            ) : (
              <Link
                href="/auth"
                className="text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                style={{ background: 'var(--green)' }}
              >
                Log in to post
              </Link>
            )}
          </div>
        </div>

        {/* Posts list */}
        {loading ? (
          <div className="text-center py-12">
            <p className="font-semibold" style={{ color: 'var(--green)' }}>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
            <div className="text-5xl mb-3">💬</div>
            <p className="text-base font-bold mb-1" style={{ color: 'var(--ink)' }}>No posts yet</p>
            <p className="text-sm mb-6" style={{ color: 'var(--ink-3)' }}>
              {search ? 'Try a different search term.' : 'Be the first to start a discussion!'}
            </p>
            {loggedIn && !search && (
              <Link
                href="/community/new"
                className="inline-block text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition"
                style={{ background: 'var(--green)' }}
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
        <div className="mt-12 rounded-xl p-5" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--green-dark)' }}>📚 Community guidelines</p>
          <ul className="text-xs space-y-1 leading-relaxed" style={{ color: 'var(--green)' }}>
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
