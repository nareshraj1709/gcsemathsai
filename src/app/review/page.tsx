'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CONTENT, TOPIC_META, toSlug } from '@/lib/study-content'
import type { SessionAttempt } from '@/app/practice/page'

// ── helpers ──────────────────────────────────────────────────

function findStudySlug(topic: string, subtopic: string): string | null {
  // Try exact match first
  const exact = CONTENT.find(
    c => c.topic.toLowerCase() === topic.toLowerCase() &&
         c.subtopic.toLowerCase() === subtopic.toLowerCase()
  )
  if (exact) return toSlug(exact.topic, exact.subtopic)

  // Fuzzy: match by topic area (any subtopic in that area)
  const byTopic = CONTENT.find(
    c => c.topic.toLowerCase() === topic.toLowerCase()
  )
  if (byTopic) return toSlug(byTopic.topic, byTopic.subtopic)

  return null
}

function getTopicMeta(topic: string) {
  const key = Object.keys(TOPIC_META).find(
    k => k.toLowerCase().includes(topic.toLowerCase()) ||
         topic.toLowerCase().includes(k.toLowerCase())
  )
  return key ? TOPIC_META[key] : { icon: '📚', color: '#6D28D9', light: '#EDE9FE', border: '#DDD6FE' }
}

function scoreLabel(score: number, outOf: number) {
  const pct = outOf > 0 ? (score / outOf) * 100 : 0
  if (pct === 100) return { label: 'Full marks', color: '#059669', bg: '#F0FDF4', border: '#A7F3D0' }
  if (pct >= 50)   return { label: 'Partially correct', color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' }
  return             { label: 'Needs work', color: '#DC2626', bg: '#FFF5F5', border: '#FECACA' }
}

// ── per-topic summary ─────────────────────────────────────────
type TopicSummary = {
  topic: string
  score: number
  outOf: number
  count: number
  subtopics: string[]
}

function buildTopicSummaries(attempts: SessionAttempt[]): TopicSummary[] {
  const map: Record<string, TopicSummary> = {}
  for (const a of attempts) {
    const key = a.topic || 'Unknown'
    if (!map[key]) map[key] = { topic: key, score: 0, outOf: 0, count: 0, subtopics: [] }
    map[key].score += a.score
    map[key].outOf += a.outOf
    map[key].count += 1
    if (a.subtopic && !map[key].subtopics.includes(a.subtopic)) {
      map[key].subtopics.push(a.subtopic)
    }
  }
  return Object.values(map).sort((a, b) => (a.score / a.outOf) - (b.score / b.outOf))
}

// ── main page ─────────────────────────────────────────────────
export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-purple-700 font-semibold">Loading review...</p>
      </div>
    }>
      <Review />
    </Suspense>
  )
}

function Review() {
  const router = useRouter()
  const [attempts, setAttempts] = useState<SessionAttempt[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('gcse_session_review')
    if (raw) {
      try { setAttempts(JSON.parse(raw)) } catch { /* ignore */ }
    }
    setLoaded(true)
  }, [])

  if (!loaded) return null

  // No session data
  if (attempts.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">📋</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No session to review</h1>
          <p className="text-gray-500 text-sm mb-6">Complete a practice session first, then come back here.</p>
          <Link href="/learn"
            className="inline-block bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition">
            Start practising →
          </Link>
        </div>
      </main>
    )
  }

  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalOut   = attempts.reduce((s, a) => s + a.outOf, 0)
  const pct        = totalOut > 0 ? Math.round((totalScore / totalOut) * 100) : 0
  const topicSummaries = buildTopicSummaries(attempts)
  const weakTopics = topicSummaries.filter(t => t.outOf > 0 && (t.score / t.outOf) < 0.6)

  const overallColor = pct >= 80 ? '#059669' : pct >= 50 ? '#D97706' : '#DC2626'
  const overallBg    = pct >= 80 ? '#F0FDF4'  : pct >= 50 ? '#FFFBEB'  : '#FFF5F5'
  const overallMsg   = pct === 100
    ? 'Perfect session — outstanding work!'
    : pct >= 80 ? 'Great session — you\'re in strong shape.'
    : pct >= 50 ? 'Good effort — a few areas to tighten up.'
    : 'Keep going — review the notes below and try again.'

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>

      {/* Nav */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #E5E1FF',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: '#6D28D9' }}>GCSEMathsAI</span>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => router.push('/learn')} style={{
            fontSize: 13, border: '1.5px solid #E5E1FF', borderRadius: 8,
            padding: '5px 14px', cursor: 'pointer', background: '#fff', color: '#6B7280',
            fontFamily: 'inherit',
          }}>
            New session
          </button>
          <Link href="/dashboard" style={{
            fontSize: 13, fontWeight: 700, color: '#6D28D9',
            textDecoration: 'none', padding: '5px 14px',
          }}>Dashboard</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-block', fontSize: 11, fontWeight: 700,
            color: '#6D28D9', background: '#EDE9FE',
            padding: '3px 14px', borderRadius: 999, marginBottom: 12,
          }}>
            Session Review
          </div>
          <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 800, color: '#0D0B1A', margin: '0 0 8px' }}>
            How did you do?
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>
            {attempts.length} question{attempts.length !== 1 ? 's' : ''} attempted
          </p>
        </div>

        {/* Overall score card */}
        <div style={{
          background: overallBg, border: `2px solid ${overallColor}44`,
          borderRadius: 20, padding: '28px 32px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          {/* Big score */}
          <div style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <div style={{ fontSize: 52, fontWeight: 900, fontFamily: "'Georgia', serif", color: overallColor, lineHeight: 1 }}>
              {pct}%
            </div>
            <div style={{ fontSize: 13, color: overallColor, fontWeight: 600, marginTop: 4 }}>
              {totalScore}/{totalOut} marks
            </div>
          </div>

          {/* Progress bar + message */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ background: '#fff', borderRadius: 999, height: 12, marginBottom: 12, overflow: 'hidden' }}>
              <div style={{
                width: `${pct}%`, height: 12, borderRadius: 999,
                background: overallColor, transition: 'width 1s ease',
              }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: overallColor, margin: '0 0 4px', fontFamily: "'Georgia', serif" }}>
              {overallMsg}
            </p>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              {weakTopics.length > 0
                ? `Focus on: ${weakTopics.map(t => t.topic).join(', ')}`
                : 'All topics looking solid this session.'}
            </p>
          </div>
        </div>

        {/* Topics needing revision */}
        {weakTopics.length > 0 && (
          <div style={{
            background: '#fff', border: '1px solid #E5E1FF', borderRadius: 16,
            padding: '20px 24px', marginBottom: 24,
          }}>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 800, color: '#0D0B1A', margin: '0 0 14px' }}>
              📚 Recommended revision
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {weakTopics.map(t => {
                const meta = getTopicMeta(t.topic)
                const slug = findStudySlug(t.topic, t.subtopics[0] || '')
                const topicPct = t.outOf > 0 ? Math.round((t.score / t.outOf) * 100) : 0
                return (
                  <div key={t.topic} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: meta.light, border: `1px solid ${meta.border}`,
                    borderRadius: 12, padding: '14px 16px',
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{meta.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: meta.color }}>{t.topic}</div>
                      <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                        {topicPct}% this session · {t.count} question{t.count !== 1 ? 's' : ''}
                      </div>
                    </div>
                    {slug ? (
                      <Link href={`/study/${slug}`} style={{
                        fontSize: 12, fontWeight: 700, color: '#fff',
                        background: meta.color, padding: '6px 14px',
                        borderRadius: 8, textDecoration: 'none', flexShrink: 0,
                      }}>
                        Study notes →
                      </Link>
                    ) : (
                      <Link href="/study" style={{
                        fontSize: 12, fontWeight: 700, color: meta.color,
                        background: '#fff', padding: '6px 14px', border: `1px solid ${meta.border}`,
                        borderRadius: 8, textDecoration: 'none', flexShrink: 0,
                      }}>
                        Browse notes →
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Per-question breakdown */}
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 17, fontWeight: 800, color: '#0D0B1A', margin: '0 0 14px' }}>
          Question by question
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {attempts.map((attempt, i) => {
            const sl = scoreLabel(attempt.score, attempt.outOf)
            const studySlug = findStudySlug(attempt.topic, attempt.subtopic)
            const meta = getTopicMeta(attempt.topic)
            const qPct = attempt.outOf > 0 ? Math.round((attempt.score / attempt.outOf) * 100) : 0

            return (
              <div key={i} style={{
                background: '#fff', border: `1px solid #E5E1FF`,
                borderRadius: 18, overflow: 'hidden',
              }}>
                {/* Question header */}
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #F3F4F6',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}>
                  {/* Number */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: sl.bg, border: `2px solid ${sl.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, color: sl.color,
                  }}>{i + 1}</div>

                  <div style={{ flex: 1 }}>
                    {/* Topic tag */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: meta.color, background: meta.light,
                        padding: '2px 8px', borderRadius: 999,
                      }}>{attempt.topic}</span>
                      {attempt.subtopic && (
                        <span style={{
                          fontSize: 11, color: '#6B7280',
                          background: '#F3F4F6', padding: '2px 8px', borderRadius: 999,
                        }}>{attempt.subtopic}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#0D0B1A', margin: 0, lineHeight: 1.4 }}>
                      {attempt.question}
                    </p>
                  </div>

                  {/* Score badge */}
                  <div style={{
                    flexShrink: 0, textAlign: 'center',
                    background: sl.bg, border: `1.5px solid ${sl.border}`,
                    borderRadius: 10, padding: '6px 12px',
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: sl.color }}>{attempt.score}/{attempt.outOf}</div>
                    <div style={{ fontSize: 10, color: sl.color, fontWeight: 600 }}>{sl.label}</div>
                  </div>
                </div>

                {/* Your answer */}
                <div style={{ padding: '14px 20px', borderBottom: '1px solid #F9FAFB', background: '#FAFAFA' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 6px' }}>
                    Your answer
                  </p>
                  <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {attempt.studentAnswer}
                  </p>
                </div>

                {/* AI feedback */}
                <div style={{ padding: '14px 20px', borderBottom: studySlug ? '1px solid #F3F4F6' : undefined }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 6px' }}>
                    AI feedback
                  </p>
                  <p style={{ fontSize: 13, color: '#374151', margin: '0 0 10px', lineHeight: 1.6 }}>
                    {attempt.feedback}
                  </p>

                  {/* Improvement suggestion for wrong/partial answers */}
                  {qPct < 100 && (
                    <div style={{
                      background: '#FFFBEB', border: '1px solid #FDE68A',
                      borderRadius: 10, padding: '10px 14px',
                      display: 'flex', gap: 8, alignItems: 'flex-start',
                    }}>
                      <span style={{ fontSize: 15, flexShrink: 0 }}>💡</span>
                      <p style={{ fontSize: 12, color: '#92400E', margin: 0, lineHeight: 1.5 }}>
                        <strong>How to improve:</strong>{' '}
                        {qPct === 0
                          ? `Review the core concepts for ${attempt.subtopic || attempt.topic} in the study notes, then re-attempt similar questions until you can solve them without hints.`
                          : `You had the right idea but lost marks on detail. Re-read the mark scheme guidance for ${attempt.subtopic || attempt.topic} — focus on showing full working and using correct notation.`
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Study notes link */}
                {qPct < 100 && (
                  <div style={{
                    padding: '12px 20px',
                    background: meta.light,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
                  }}>
                    <span style={{ fontSize: 12, color: meta.color, fontWeight: 600 }}>
                      {meta.icon} Revise {attempt.subtopic || attempt.topic}
                    </span>
                    {studySlug ? (
                      <Link href={`/study/${studySlug}`} style={{
                        fontSize: 12, fontWeight: 700, color: '#fff',
                        background: meta.color, padding: '6px 14px',
                        borderRadius: 8, textDecoration: 'none',
                      }}>
                        Open study notes →
                      </Link>
                    ) : (
                      <Link href="/study" style={{
                        fontSize: 12, fontWeight: 700, color: meta.color,
                        background: '#fff', border: `1px solid ${meta.border}`,
                        padding: '6px 14px', borderRadius: 8, textDecoration: 'none',
                      }}>
                        Browse all notes →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom actions */}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/learn')} style={{
            flex: 2, padding: '14px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #4C1D95, #6D28D9)',
            color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
            fontFamily: 'inherit', boxShadow: '0 4px 16px #6D28D930',
          }}>
            🚀 Start new practice session
          </button>
          <Link href="/study" style={{
            flex: 1, padding: '14px', borderRadius: 14,
            border: '2px solid #6D28D9', color: '#6D28D9',
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
            textAlign: 'center', background: '#fff',
          }}>
            📖 Study notes
          </Link>
          <Link href="/dashboard" style={{
            flex: 1, padding: '14px', borderRadius: 14,
            border: '1.5px solid #E5E1FF', color: '#6B7280',
            fontWeight: 600, fontSize: 14, textDecoration: 'none',
            textAlign: 'center', background: '#fff',
          }}>
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
