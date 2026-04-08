import { supabase } from './supabase'

export type ForumPost = {
  id: string
  user_id: string
  author_name: string
  title: string
  body: string
  tags: string[]
  image_urls: string[]
  upvote_count: number
  comment_count: number
  flagged: boolean
  hidden: boolean
  pinned: boolean
  created_at: string
}

export type ForumComment = {
  id: string
  post_id: string
  user_id: string
  author_name: string
  parent_comment_id: string | null
  body: string
  image_urls: string[]
  upvote_count: number
  flagged: boolean
  hidden: boolean
  created_at: string
}

export type SortMode = 'new' | 'top'

// ── Posts ──────────────────────────────────────────────────────────

export async function listPosts(opts: {
  sort?: SortMode
  search?: string
  tag?: string
  limit?: number
  offset?: number
} = {}): Promise<ForumPost[]> {
  const { sort = 'new', search, tag, limit = 30, offset = 0 } = opts

  let query = supabase
    .from('forum_posts')
    .select('*')
    .eq('hidden', false)

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (sort === 'top') {
    query = query.order('upvote_count', { ascending: false }).order('created_at', { ascending: false })
  } else {
    query = query.order('pinned', { ascending: false }).order('created_at', { ascending: false })
  }

  query = query.range(offset, offset + limit - 1)

  const { data, error } = await query
  if (error || !data) return []
  return data as ForumPost[]
}

export async function getPost(id: string): Promise<ForumPost | null> {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .eq('id', id)
    .eq('hidden', false)
    .maybeSingle()
  if (error || !data) return null
  return data as ForumPost
}

export async function createPost(input: {
  title: string
  body: string
  tags: string[]
  image_urls: string[]
  author_name: string
}): Promise<{ id: string } | { error: string }> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'You must be logged in to post.' }

  const { data, error } = await supabase
    .from('forum_posts')
    .insert({
      user_id: session.user.id,
      author_name: input.author_name || 'Student',
      title: input.title.trim(),
      body: input.body.trim(),
      tags: input.tags.slice(0, 5),
      image_urls: input.image_urls.slice(0, 3),
    })
    .select('id')
    .single()

  if (error || !data) return { error: error?.message ?? 'Failed to create post.' }
  return { id: data.id }
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from('forum_posts').delete().eq('id', id)
  return !error
}

// ── Comments ───────────────────────────────────────────────────────

export async function listComments(postId: string): Promise<ForumComment[]> {
  const { data, error } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('post_id', postId)
    .eq('hidden', false)
    .order('created_at', { ascending: true })
  if (error || !data) return []
  return data as ForumComment[]
}

export async function createComment(input: {
  post_id: string
  body: string
  image_urls: string[]
  parent_comment_id?: string | null
  author_name: string
}): Promise<{ id: string } | { error: string }> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'You must be logged in to comment.' }

  const { data, error } = await supabase
    .from('forum_comments')
    .insert({
      post_id: input.post_id,
      user_id: session.user.id,
      author_name: input.author_name || 'Student',
      parent_comment_id: input.parent_comment_id ?? null,
      body: input.body.trim(),
      image_urls: input.image_urls.slice(0, 3),
    })
    .select('id')
    .single()

  if (error || !data) return { error: error?.message ?? 'Failed to comment.' }
  return { id: data.id }
}

export async function deleteComment(id: string): Promise<boolean> {
  const { error } = await supabase.from('forum_comments').delete().eq('id', id)
  return !error
}

// ── Votes ──────────────────────────────────────────────────────────

export async function getUserVotes(
  userId: string,
  postIds: string[],
  commentIds: string[] = [],
): Promise<{ posts: Set<string>; comments: Set<string> }> {
  const result = { posts: new Set<string>(), comments: new Set<string>() }
  if (!userId) return result

  if (postIds.length > 0) {
    const { data } = await supabase
      .from('forum_votes')
      .select('post_id')
      .eq('user_id', userId)
      .in('post_id', postIds)
    ;(data ?? []).forEach((v) => {
      const row = v as { post_id: string | null }
      if (row.post_id) result.posts.add(row.post_id)
    })
  }
  if (commentIds.length > 0) {
    const { data } = await supabase
      .from('forum_votes')
      .select('comment_id')
      .eq('user_id', userId)
      .in('comment_id', commentIds)
    ;(data ?? []).forEach((v) => {
      const row = v as { comment_id: string | null }
      if (row.comment_id) result.comments.add(row.comment_id)
    })
  }
  return result
}

export async function togglePostVote(postId: string): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false

  // Check existing
  const { data: existing } = await supabase
    .from('forum_votes')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('post_id', postId)
    .maybeSingle()

  if (existing) {
    await supabase.from('forum_votes').delete().eq('id', existing.id)
    return false // now unvoted
  } else {
    await supabase.from('forum_votes').insert({ user_id: session.user.id, post_id: postId })
    return true // now voted
  }
}

export async function toggleCommentVote(commentId: string): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false

  const { data: existing } = await supabase
    .from('forum_votes')
    .select('id')
    .eq('user_id', session.user.id)
    .eq('comment_id', commentId)
    .maybeSingle()

  if (existing) {
    await supabase.from('forum_votes').delete().eq('id', existing.id)
    return false
  } else {
    await supabase.from('forum_votes').insert({ user_id: session.user.id, comment_id: commentId })
    return true
  }
}

// ── Reports ────────────────────────────────────────────────────────

export async function reportPost(postId: string, reason: string): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false
  const { error } = await supabase.from('forum_reports').insert({
    reporter_id: session.user.id,
    post_id: postId,
    reason: reason.trim().slice(0, 500),
  })
  return !error
}

export async function reportComment(commentId: string, reason: string): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return false
  const { error } = await supabase.from('forum_reports').insert({
    reporter_id: session.user.id,
    comment_id: commentId,
    reason: reason.trim().slice(0, 500),
  })
  return !error
}

// ── Helpers ────────────────────────────────────────────────────────

export function formatTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

export function parseTags(input: string): string[] {
  return input
    .split(/[,#]/)
    .map(t => t.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
    .filter(Boolean)
    .slice(0, 5)
}
