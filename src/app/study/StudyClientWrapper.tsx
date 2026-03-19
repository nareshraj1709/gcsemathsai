'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { TOPIC_DATA, TOPIC_META, CONTENT, toSlug } from '@/lib/study-content'

const C = {
  ink: '#0D0B1A',
  purple: '#6D28D9',
  purpleLight: '#8B5CF6',
  purplePale: '#EDE9FE',
  mist: '#F8F7FF',
  mid: '#6B7280',
  border: '#E5E1FF',
}
const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

const BOARDS = [
  { name: 'AQA',     desc: 'Most common in England' },
  { name: 'Edexcel', desc: 'Pearson / BTEC group'   },
  { name: 'OCR',     desc: 'Oxford, Cambridge & RSA' },
]
const YEARS = ['Year 10', 'Year 11', 'Resit (Adult)']

export default function StudyClientWrapper() {
  const router = useRouter()
  const [year, setYear] = useState('')
  const [board, setBoard] = useState('')
  const [tier, setTier] = useState<'Foundation' | 'Higher'>('Foundation')
  const [phase, setPhase] = useState<0 | 1 | 2>(0) // 0 = loading

  useEffect(() => {
    try {
      const raw = localStorage.getItem('gcse_profile')
      if (!raw) { setPhase(1); return }
      const profile = JSON.parse(raw)
      if (profile.year && profile.board) {
        setYear(profile.year)
        setBoard(profile.board)
        if (profile.tier === 'Higher') setTier('Higher')
        setPhase(2)
      } else {
        setPhase(1)
      }
    } catch { setPhase(1) }
  }, [])

  const canProceed = !!year && !!board

  const hasContent = (topic: string, subtopic: string) =>
    CONTENT.some(c => c.topic === topic && c.subtopic === subtopic)

  const handleSubtopic = (topic: string, subtopic: string) => {
    router.push(`/study/${toSlug(topic, subtopic)}`)
  }

  // Loading state — show nothing (SSR content visible underneath)
  if (phase === 0) return null

  // ── Phase 1: setup ───────────────────────────────────────
  if (phase === 1) {
    return (
      <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body, padding: '40px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#DBEAFE', borderRadius: 999, padding: '4px 14px',
              fontSize: 12, fontWeight: 700, color: '#1D4ED8', marginBottom: 12,
            }}>
              Study content
            </div>
            <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 800, color: C.ink, margin: '0 0 8px' }}>
              Study by topic
            </h1>
            <p style={{ fontSize: 14, color: C.mid, margin: 0 }}>
              Notes, formulas, worked examples and exam tips — aligned to the latest specification.
            </p>
          </div>

          <div style={{
            background: '#fff', borderRadius: 24, border: `1px solid ${C.border}`,
            padding: '32px 28px', boxShadow: '0 4px 32px rgba(109,40,217,0.08)',
          }}>
            {/* Year */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.ink, display: 'block', marginBottom: 10 }}>
                Which year are you in?
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {YEARS.map(y => (
                  <button key={y} onClick={() => setYear(y)} style={{
                    padding: '12px 16px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${year === y ? C.purple : C.border}`,
                    background: year === y ? C.purplePale : '#fff',
                    color: year === y ? C.purple : C.ink,
                    fontWeight: year === y ? 700 : 500,
                    fontSize: 14, fontFamily: font.body, transition: 'all 0.15s',
                  }}>
                    {year === y ? '✓ ' : ''}{y}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: C.border, marginBottom: 28 }} />

            {/* Board */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: C.ink, display: 'block', marginBottom: 10 }}>
                Which exam board?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {BOARDS.map(b => (
                  <button key={b.name} onClick={() => setBoard(b.name)} style={{
                    padding: '16px 10px', borderRadius: 14, cursor: 'pointer', textAlign: 'center',
                    border: `2px solid ${board === b.name ? C.purple : C.border}`,
                    background: board === b.name ? C.purplePale : '#fff',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{
                      fontSize: 17, fontWeight: 800, fontFamily: font.display,
                      color: board === b.name ? C.purple : C.ink, marginBottom: 4,
                    }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.3 }}>{b.desc}</div>
                    {board === b.name && (
                      <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginTop: 6 }}>✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => {
              if (!canProceed) return
              try {
                const raw = localStorage.getItem('gcse_profile')
                const existing = raw ? JSON.parse(raw) : {}
                localStorage.setItem('gcse_profile', JSON.stringify({ ...existing, year, board, tier }))
              } catch { /* ignore */ }
              setPhase(2)
            }} disabled={!canProceed} style={{
              width: '100%', padding: '14px', borderRadius: 12, border: 'none',
              background: canProceed ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})` : C.border,
              color: canProceed ? '#fff' : '#9CA3AF',
              fontWeight: 700, fontSize: 15, cursor: canProceed ? 'pointer' : 'not-allowed',
              fontFamily: font.body,
              boxShadow: canProceed ? `0 4px 16px ${C.purple}30` : 'none',
              transition: 'all 0.2s',
            }}>
              Browse topics →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase 2: topic browser ───────────────────────────────
  const topicNames = Object.keys(TOPIC_DATA)
  const totalSubtopics = topicNames.reduce((acc, t) => acc + TOPIC_DATA[t][tier].length, 0)
  const contentCount = topicNames.reduce((acc, t) =>
    acc + TOPIC_DATA[t][tier].filter(st => hasContent(t, st)).length, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: '#fff', borderBottom: `1px solid ${C.border}`,
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase(1)} style={{
            border: `1.5px solid ${C.border}`, background: '#fff', borderRadius: 8,
            padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: C.mid, fontFamily: font.body,
          }}>Change setup</button>
          <div style={{ display: 'flex', gap: 6 }}>
            {[year, board].map(tag => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 700, color: C.purple,
                background: C.purplePale, padding: '3px 10px', borderRadius: 999,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Tier toggle */}
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 3 }}>
          {(['Foundation', 'Higher'] as const).map(t => (
            <button key={t} onClick={() => setTier(t)} style={{
              padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tier === t ? C.purple : 'transparent',
              color: tier === t ? '#fff' : C.mid,
              fontWeight: tier === t ? 700 : 500,
              fontSize: 13, fontFamily: font.body, transition: 'all 0.15s',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 6px' }}>
            Study notes &amp; guides
          </h1>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              {tier} tier · {board} · {totalSubtopics} subtopics
            </p>
            <span style={{
              fontSize: 12, fontWeight: 700,
              color: '#059669', background: '#D1FAE5',
              padding: '2px 10px', borderRadius: 999,
            }}>
              {contentCount} with full notes
            </span>
          </div>
        </div>

        {/* Topic sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {topicNames.map(topicName => {
            const meta = TOPIC_META[topicName]
            const subtopics = TOPIC_DATA[topicName][tier]
            return (
              <div key={topicName} style={{
                background: '#fff',
                border: `1px solid ${meta.border}`,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
                {/* Topic header */}
                <div style={{
                  background: meta.light,
                  borderBottom: `1px solid ${meta.border}`,
                  padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, boxShadow: `0 2px 8px ${meta.color}20`,
                  }}>{meta.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: font.display, color: meta.color }}>
                      {topicName}
                    </div>
                    <div style={{ fontSize: 12, color: C.mid, marginTop: 1 }}>
                      {subtopics.length} subtopics · {subtopics.filter(st => hasContent(topicName, st)).length} with full notes
                    </div>
                  </div>
                </div>

                {/* Subtopic list */}
                <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {subtopics.map(st => {
                    const ready = hasContent(topicName, st)
                    return ready ? (
                      <Link
                        key={st}
                        href={`/study/${toSlug(topicName, st)}`}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 12,
                          cursor: 'pointer',
                          border: `1.5px solid ${meta.border}`,
                          background: '#fff',
                          textAlign: 'left', transition: 'all 0.15s',
                          width: '100%', textDecoration: 'none', color: 'inherit',
                        }}
                      >
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: meta.light, fontSize: 14,
                        }}>
                          📖
                        </div>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: C.ink }}>
                          {st}
                        </span>
                        <span style={{
                          fontSize: 11, fontWeight: 700,
                          color: meta.color, background: meta.light,
                          padding: '2px 8px', borderRadius: 999,
                        }}>
                          Notes ready →
                        </span>
                      </Link>
                    ) : (
                      <div
                        key={st}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px', borderRadius: 12,
                          cursor: 'default',
                          border: '1.5px solid #F3F4F6',
                          background: '#FAFAFA',
                          textAlign: 'left',
                          width: '100%',
                        }}
                      >
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: '#F3F4F6', fontSize: 14,
                        }}>
                          🔜
                        </div>
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 400, color: C.mid }}>
                          {st}
                        </span>
                        <span style={{
                          fontSize: 11, color: '#9CA3AF',
                          background: '#F3F4F6', padding: '2px 8px', borderRadius: 999,
                        }}>
                          Coming soon
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 32, background: C.purplePale, borderRadius: 16,
          padding: '20px 24px', textAlign: 'center',
          border: `1px solid ${C.border}`,
        }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: C.purple, margin: '0 0 4px' }}>
            Ready to test yourself?
          </p>
          <p style={{ fontSize: 13, color: C.mid, margin: '0 0 14px' }}>
            Once you&apos;ve studied a topic, practice it with AI-marked questions.
          </p>
          <Link
            href="/learn"
            style={{
              display: 'inline-block',
              padding: '10px 24px', borderRadius: 10,
              background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              color: '#fff', fontWeight: 700, fontSize: 14,
              textDecoration: 'none',
              boxShadow: `0 4px 16px ${C.purple}30`,
            }}
          >
            Go to Practice →
          </Link>
        </div>
      </div>
    </div>
  )
}
