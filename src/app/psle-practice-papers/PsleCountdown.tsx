'use client'

import { useEffect, useState } from 'react'

const EXAM_DATE = new Date('2026-09-25T00:00:00+08:00') // Singapore time

function daysLeft(): number {
  const ms = EXAM_DATE.getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export default function PsleCountdown({ style }: { style?: React.CSSProperties }) {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    setDays(daysLeft())
    const id = setInterval(() => setDays(daysLeft()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  if (days === null) return null

  return (
    <span style={style}>
      {days} day{days === 1 ? '' : 's'} until PSLE (25 Sept 2026)
    </span>
  )
}
