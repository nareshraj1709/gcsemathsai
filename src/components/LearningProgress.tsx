'use client'
import { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { PROGRESS_KEY, readProgress } from '@/lib/learning-progress'

function subscribe(notify: () => void) {
  window.addEventListener('storage', notify)
  window.addEventListener('gcse-progress-updated', notify)
  return () => { window.removeEventListener('storage', notify); window.removeEventListener('gcse-progress-updated', notify) }
}
function snapshot() { try { return localStorage.getItem(PROGRESS_KEY) || '[]' } catch { return '[]' } }
export default function LearningProgress() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => '[]')
  const results = readProgress(raw)
  if (!results.length) return null
  const revisit = results.find(x => x.score < x.total) || results[0]
  return <div className="learning-panel" aria-label="Your saved practice">
    <h2>Your saved practice</h2>
    <p>{results.length} topic quizzes saved on this device. Latest: {results[0].title} ({results[0].score}/{results[0].total}).</p>
    <div className="learning-actions">
      <Link className="btn btn-primary" href={`/diagnostic/${revisit.slug}`}>Revisit {revisit.title}</Link>
      <Link className="btn btn-outline" href="/diagnostic">Choose another topic</Link>
      <button type="button" className="btn btn-outline" onClick={() => { try { localStorage.removeItem(PROGRESS_KEY); window.dispatchEvent(new Event('gcse-progress-updated')) } catch {} }}>Clear saved practice</button>
    </div>
  </div>
}
