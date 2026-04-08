'use client'
import { useState } from 'react'
import { type ForumComment, formatTimeAgo, toggleCommentVote, createComment, reportComment } from '@/lib/forum'
import VoteButton from './VoteButton'
import ImageUploader from './ImageUploader'

type Props = {
  comments: ForumComment[]
  postId: string
  currentUserId: string | null
  currentUserName: string
  votedCommentIds: Set<string>
  onNewComment: () => void
}

type CommentNode = ForumComment & { children: CommentNode[] }

function buildTree(comments: ForumComment[]): CommentNode[] {
  const map = new Map<string, CommentNode>()
  const roots: CommentNode[] = []

  comments.forEach(c => map.set(c.id, { ...c, children: [] }))

  comments.forEach(c => {
    const node = map.get(c.id)!
    if (c.parent_comment_id && map.has(c.parent_comment_id)) {
      map.get(c.parent_comment_id)!.children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}

export default function CommentThread({ comments, postId, currentUserId, currentUserName, votedCommentIds, onNewComment }: Props) {
  const tree = buildTree(comments)

  return (
    <div className="space-y-4">
      {tree.map(node => (
        <Comment
          key={node.id}
          node={node}
          postId={postId}
          currentUserId={currentUserId}
          currentUserName={currentUserName}
          votedCommentIds={votedCommentIds}
          onNewComment={onNewComment}
          depth={0}
        />
      ))}
    </div>
  )
}

function Comment({
  node, postId, currentUserId, currentUserName, votedCommentIds, onNewComment, depth,
}: {
  node: CommentNode
  postId: string
  currentUserId: string | null
  currentUserName: string
  votedCommentIds: Set<string>
  onNewComment: () => void
  depth: number
}) {
  const [replyOpen, setReplyOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [replyBody, setReplyBody] = useState('')
  const [replyImages, setReplyImages] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const submitReply = async () => {
    if (!replyBody.trim() || replyBody.trim().length < 3) {
      setError('Reply must be at least 3 characters.')
      return
    }
    setSubmitting(true)
    setError('')

    // Moderate
    try {
      const modRes = await fetch('/api/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: replyBody }),
      })
      const mod = (await modRes.json()) as { safe: boolean; reason?: string }
      if (!mod.safe) {
        setError(mod.reason || 'Content not allowed.')
        setSubmitting(false)
        return
      }
    } catch {
      // If moderation fails, allow but log
    }

    const result = await createComment({
      post_id: postId,
      body: replyBody,
      image_urls: replyImages,
      parent_comment_id: node.id,
      author_name: currentUserName,
    })

    if ('error' in result) {
      setError(result.error)
      setSubmitting(false)
      return
    }

    setReplyBody('')
    setReplyImages([])
    setReplyOpen(false)
    setSubmitting(false)
    onNewComment()
  }

  const submitReport = async () => {
    if (!reportReason.trim()) return
    await reportComment(node.id, reportReason)
    setReportOpen(false)
    setReportReason('')
    alert('Report submitted. Our moderators will review it.')
  }

  const indentClass = depth === 0 ? '' : depth === 1 ? 'ml-6' : 'ml-12'
  const borderClass = depth > 0 ? 'border-l-2 border-purple-100 pl-4' : ''

  return (
    <div className={`${indentClass}`}>
      <div className={`${borderClass}`}>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">
              {(node.author_name || 'S').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-700">{node.author_name}</span>
                <span> · {formatTimeAgo(node.created_at)}</span>
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">{node.body}</p>

          {node.image_urls.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-3">
              {node.image_urls.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                  <img src={url} alt={`Comment image ${i + 1}`} className="max-w-[160px] max-h-[160px] rounded-lg border border-gray-200 object-cover" />
                </a>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <VoteButton
              count={node.upvote_count}
              voted={votedCommentIds.has(node.id)}
              onToggle={async () => {
                if (!currentUserId) {
                  alert('Please log in to vote.')
                  return false
                }
                await toggleCommentVote(node.id)
                return !votedCommentIds.has(node.id)
              }}
              size="sm"
            />
            {currentUserId && depth < 3 && (
              <button
                onClick={() => setReplyOpen(o => !o)}
                className="text-xs text-gray-500 hover:text-purple-700 font-semibold"
              >
                Reply
              </button>
            )}
            {currentUserId && currentUserId !== node.user_id && (
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
                placeholder="Why are you reporting this?"
                rows={2}
                className="w-full text-xs border border-gray-200 rounded p-2 mb-2"
              />
              <div className="flex gap-2">
                <button onClick={submitReport} className="text-xs bg-red-600 text-white px-3 py-1 rounded font-semibold">Submit report</button>
                <button onClick={() => setReportOpen(false)} className="text-xs text-gray-500">Cancel</button>
              </div>
            </div>
          )}

          {replyOpen && (
            <div className="mt-3 p-3 bg-purple-50 border border-purple-100 rounded-lg">
              <textarea
                value={replyBody}
                onChange={e => setReplyBody(e.target.value)}
                placeholder="Write your reply..."
                rows={3}
                className="w-full text-sm border border-gray-200 rounded-lg p-2 mb-2"
              />
              <ImageUploader urls={replyImages} onChange={setReplyImages} maxImages={2} />
              {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={submitReply}
                  disabled={submitting}
                  className="text-xs bg-purple-700 text-white px-3 py-1.5 rounded-lg font-semibold disabled:opacity-50"
                >
                  {submitting ? 'Posting...' : 'Post reply'}
                </button>
                <button onClick={() => { setReplyOpen(false); setError('') }} className="text-xs text-gray-500">Cancel</button>
              </div>
            </div>
          )}
        </div>

        {node.children.length > 0 && (
          <div className="mt-3 space-y-3">
            {node.children.map(child => (
              <Comment
                key={child.id}
                node={child}
                postId={postId}
                currentUserId={currentUserId}
                currentUserName={currentUserName}
                votedCommentIds={votedCommentIds}
                onNewComment={onNewComment}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
