'use client'
import { useState, useEffect, useCallback, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  type ForumPost, type ForumComment, getPost, listComments, getUserVotes,
  togglePostVote, createComment, formatTimeAgo, reportPost, deletePost,
} from '@/lib/forum'
import { supabase } from '@/lib/supabase'
import { getProfileFromCache } from '@/lib/profile'
import VoteButton from '@/components/forum/VoteButton'
import ImageUploader from '@/components/forum/ImageUploader'
import CommentThread from '@/components/forum/CommentThread'

type Props = { params: Promise<{ id: string }> }

export default function PostPage({ params }: Props) {
  const { id } = use(params)
  const router = useRouter()
  const [post, setPost] = useState<ForumPost | null>(null)
  const [comments, setComments] = useState<ForumComment[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [authorName, setAuthorName] = useState('Student')
  const [votedPostIds, setVotedPostIds] = useState<Set<string>>(new Set())
  const [votedCommentIds, setVotedCommentIds] = useState<Set<string>>(new Set())

  const [commentBody, setCommentBody] = useState('')
  const [commentImages, setCommentImages] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')

  const load = useCallback(async () => {
    const p = await getPost(id)
    if (!p) {
      setLoading(false)
      return
    }
    setPost(p)

    const c = await listComments(id)
    setComments(c)

    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      setCurrentUserId(session.user.id)
      const profile = getProfileFromCache()
      if (profile?.name) setAuthorName(profile.name)
      const votes = await getUserVotes(session.user.id, [p.id], c.map(x => x.id))
      setVotedPostIds(votes.posts)
      setVotedCommentIds(votes.comments)
    }

    setLoading(false)
  }, [id])

  useEffect(() => { load() }, [load])

  const submitComment = async () => {
    if (!commentBody.trim() || commentBody.trim().length < 3) {
      setError('Comment must be at least 3 characters.')
      return
    }
    setSubmitting(true)
    setError('')

    try {
      const modRes = await fetch('/api/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentBody }),
      })
      const mod = (await modRes.json()) as { safe: boolean; reason?: string }
      if (!mod.safe) {
        setError(mod.reason || 'Your comment was flagged.')
        setSubmitting(false)
        return
      }
    } catch { /* allow on moderation failure */ }

    const result = await createComment({
      post_id: id,
      body: commentBody,
      image_urls: commentImages,
      author_name: authorName,
    })

    if ('error' in result) {
      setError(result.error)
      setSubmitting(false)
      return
    }

    setCommentBody('')
    setCommentImages([])
    setSubmitting(false)
    load()
  }

  const submitReport = async () => {
    if (!reportReason.trim() || !post) return
    await reportPost(post.id, reportReason)
    setReportOpen(false)
    setReportReason('')
    alert('Report submitted. Our moderators will review it.')
  }

  const handleDelete = async () => {
    if (!post) return
    if (!confirm('Delete this post? This cannot be undone.')) return
    const ok = await deletePost(post.id)
    if (ok) router.push('/community')
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-purple-700 font-semibold">Loading...</p>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h1>
          <p className="text-gray-500 text-sm mb-6">It may have been deleted or hidden by moderators.</p>
          <Link href="/community" className="inline-block bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition">
            ← Back to community
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link href="/community" className="text-sm text-purple-700 font-semibold hover:underline">
          ← Back to community
        </Link>

        {/* Post */}
        <article className="mt-4 bg-white border border-gray-100 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">
              {(post.author_name || 'S').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-700">{post.author_name}</p>
              <p className="text-xs text-gray-400">{formatTimeAgo(post.created_at)}</p>
            </div>
            {currentUserId === post.user_id && (
              <button
                onClick={handleDelete}
                className="text-xs text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">{post.title}</h1>

          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
            {post.body}
          </div>

          {post.image_urls.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {post.image_urls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt={`Post image ${i + 1}`} className="w-full rounded-lg border border-gray-200 object-cover" />
                </a>
              ))}
            </div>
          )}

          {post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <VoteButton
              count={post.upvote_count}
              voted={votedPostIds.has(post.id)}
              onToggle={async () => {
                if (!currentUserId) {
                  alert('Please log in to vote.')
                  return false
                }
                const newState = await togglePostVote(post.id)
                if (newState) {
                  setVotedPostIds(new Set([...votedPostIds, post.id]))
                } else {
                  const updated = new Set(votedPostIds)
                  updated.delete(post.id)
                  setVotedPostIds(updated)
                }
                return newState
              }}
            />
            <span className="text-sm text-gray-500">
              💬 {post.comment_count} {post.comment_count === 1 ? 'comment' : 'comments'}
            </span>
            {currentUserId && currentUserId !== post.user_id && (
              <button
                onClick={() => setReportOpen(o => !o)}
                className="text-xs text-gray-400 hover:text-red-600 ml-auto"
              >
                Report
              </button>
            )}
          </div>

          {reportOpen && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
              <textarea
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
                placeholder="Why are you reporting this post?"
                rows={2}
                className="w-full text-xs border border-gray-200 rounded p-2 mb-2"
              />
              <div className="flex gap-2">
                <button onClick={submitReport} className="text-xs bg-red-600 text-white px-3 py-1 rounded font-semibold">Submit report</button>
                <button onClick={() => setReportOpen(false)} className="text-xs text-gray-500">Cancel</button>
              </div>
            </div>
          )}
        </article>

        {/* New comment box */}
        {currentUserId ? (
          <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-sm font-semibold text-gray-700 mb-3">Add a comment</p>
            <textarea
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              placeholder="Share your thoughts, answer the question, or ask for clarification..."
              rows={4}
              maxLength={3000}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-500 transition resize-none leading-relaxed"
            />
            <div className="mt-3">
              <ImageUploader urls={commentImages} onChange={setCommentImages} maxImages={2} />
            </div>
            {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            <button
              onClick={submitComment}
              disabled={submitting}
              className="mt-3 bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-purple-800 transition disabled:opacity-50"
            >
              {submitting ? 'Posting...' : 'Post comment'}
            </button>
          </div>
        ) : (
          <div className="mt-6 bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
            <p className="text-sm text-gray-700 mb-3">Log in to comment and vote on this post.</p>
            <Link href="/auth" className="inline-block bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-purple-800 transition">
              Log in
            </Link>
          </div>
        )}

        {/* Comments */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </p>
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">No comments yet. Be the first!</p>
          ) : (
            <CommentThread
              comments={comments}
              postId={id}
              currentUserId={currentUserId}
              currentUserName={authorName}
              votedCommentIds={votedCommentIds}
              onNewComment={load}
            />
          )}
        </div>
      </div>
    </main>
  )
}
