'use client'
import { useState } from 'react'

type Props = {
  count: number
  voted: boolean
  onToggle: () => Promise<boolean>
  size?: 'sm' | 'md'
}

export default function VoteButton({ count, voted, onToggle, size = 'md' }: Props) {
  const [optimistic, setOptimistic] = useState({ count, voted })
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    // Optimistic update
    const newVoted = !optimistic.voted
    setOptimistic({
      count: optimistic.count + (newVoted ? 1 : -1),
      voted: newVoted,
    })

    try {
      const actualVoted = await onToggle()
      // Sync with server response
      setOptimistic(prev => ({
        count: optimistic.count + (actualVoted ? 1 : 0),
        voted: actualVoted,
      }))
    } catch {
      // Revert on error
      setOptimistic({ count, voted })
    } finally {
      setLoading(false)
    }
  }

  const padding = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5'
  const fontSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 rounded-lg border ${padding} ${fontSize} font-semibold transition ${
        optimistic.voted
          ? 'bg-purple-100 border-purple-300 text-purple-700'
          : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-700'
      } ${loading ? 'opacity-50' : ''}`}
      aria-label={optimistic.voted ? 'Remove upvote' : 'Upvote'}
    >
      <span>{optimistic.voted ? '▲' : '△'}</span>
      <span>{optimistic.count}</span>
    </button>
  )
}
