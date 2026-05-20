'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// /downloads used to host AQA past-paper PDFs for direct download. We no longer
// host past-paper content (it lives at the official board sites). Redirect any
// historical links to /papers, which now contains both the official-board
// links and our original practice papers.
export default function DownloadsPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/papers')
  }, [router])

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink-3)' }}>
        Redirecting to <a href="/papers" style={{ color: 'var(--green)' }}>/papers</a>…
      </p>
    </main>
  )
}
