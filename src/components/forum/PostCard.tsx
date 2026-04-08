import Link from 'next/link'
import type { ForumPost } from '@/lib/forum'
import { formatTimeAgo } from '@/lib/forum'

export default function PostCard({ post }: { post: ForumPost }) {
  return (
    <Link
      href={`/community/post/${post.id}`}
      className="block bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-purple-200 transition"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm flex-shrink-0">
          {(post.author_name || 'S').charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">{post.author_name}</span>
            <span> · {formatTimeAgo(post.created_at)}</span>
            {post.pinned && <span className="ml-2 text-purple-600 font-semibold">📌 Pinned</span>}
          </p>
        </div>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{post.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">{post.body}</p>

      {post.image_urls.length > 0 && (
        <div className="mb-3 text-xs text-gray-400">
          📷 {post.image_urls.length} {post.image_urls.length === 1 ? 'image' : 'images'}
        </div>
      )}

      {post.tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-3">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <span>▲</span>
          <span>{post.upvote_count}</span>
        </span>
        <span className="flex items-center gap-1">
          <span>💬</span>
          <span>{post.comment_count}</span>
        </span>
      </div>
    </Link>
  )
}
