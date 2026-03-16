'use client'

import { useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { TOPIC_DATA, CONTENT, toSlug } from '@/lib/study-content'

// ── Types ─────────────────────────────────────────────────────────────────────

type Phase = 'upload' | 'reviewing' | 'results'

interface ReviewResult {
  score: number
  outOf: number
  summary: string
  strengths: string[]
  gaps: string[]
  errors: string[]
  recommendation: 'revise' | 'practice'
  revisionFocus: string
}

// ── Constants ─────────────────────────────────────────────────────────────────

const C = {
  ink: '#0D0B1A',
  purple: '#6D28D9',
  purpleLight: '#8B5CF6',
  purplePale: '#EDE9FE',
  mid: '#6B7280',
  border: '#E5E1FF',
  mist: '#F8F7FF',
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

const TOPICS = Object.keys(TOPIC_DATA)
const TIERS: ('Foundation' | 'Higher')[] = ['Foundation', 'Higher']

// ── Helpers ───────────────────────────────────────────────────────────────────

function scoreColour(score: number, outOf: number) {
  const pct = score / outOf
  if (pct >= 0.8) return '#059669'
  if (pct >= 0.6) return '#D97706'
  return '#DC2626'
}

function scoreLabel(score: number, outOf: number) {
  const pct = score / outOf
  if (pct >= 0.9) return 'Outstanding notes!'
  if (pct >= 0.8) return 'Excellent work!'
  if (pct >= 0.7) return 'Good effort!'
  if (pct >= 0.6) return 'Getting there.'
  if (pct >= 0.4) return 'Needs some work.'
  return 'Time to revise.'
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function NotesReviewPage() {
  const router = useRouter()

  // Form state
  const [topic, setTopic]       = useState(TOPICS[0])
  const [tier, setTier]         = useState<'Foundation' | 'Higher'>('Foundation')
  const [subtopic, setSubtopic] = useState(TOPIC_DATA[TOPICS[0]].Foundation[0])
  const [image, setImage]       = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)

  // Review state
  const [phase, setPhase]   = useState<Phase>('upload')
  const [result, setResult] = useState<ReviewResult | null>(null)
  const [error, setError]   = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleTopicChange = (t: string) => {
    setTopic(t)
    setSubtopic(TOPIC_DATA[t][tier][0])
  }

  const handleTierChange = (t: 'Foundation' | 'Higher') => {
    setTier(t)
    setSubtopic(TOPIC_DATA[topic][t][0])
  }

  const applyFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setError('Please upload a JPEG, PNG, WEBP or GIF image.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Image must be under 4 MB. Try compressing it or taking a clearer photo.')
      return
    }
    setError('')
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) applyFile(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) applyFile(file)
  }, [])

  const handleSubmit = async () => {
    if (!image) return
    setPhase('reviewing')
    setError('')

    const form = new FormData()
    form.append('image', image)
    form.append('topic', topic)
    form.append('subtopic', subtopic)

    try {
      const res = await fetch('/api/review-notes', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error ?? 'Review failed')
      setResult(data)
      setPhase('results')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
      setPhase('upload')
    }
  }

  const reset = () => {
    setPhase('upload')
    setResult(null)
    setImage(null)
    setPreview(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ── Study link helper ────────────────────────────────────────────────────────

  const studySlug = (() => {
    const entry = CONTENT.find(c => c.topic === topic && c.subtopic === subtopic)
    return entry ? toSlug(entry.topic, entry.subtopic) : null
  })()

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body, padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: C.purplePale, borderRadius: 999, padding: '5px 14px',
            fontSize: 12, fontWeight: 700, color: C.purple, marginBottom: 14,
          }}>
            📸 AI Notes Review
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 28, fontWeight: 800, color: C.ink, margin: '0 0 8px' }}>
            Review My Notes
          </h1>
          <p style={{ color: C.mid, fontSize: 15, margin: 0 }}>
            Upload a photo of your handwritten or typed notes. Our AI will mark them,
            highlight gaps, and tell you exactly what to revise.
          </p>
        </div>

        {/* ── UPLOAD PHASE ── */}
        {phase === 'upload' && (
          <div style={{ background: '#fff', borderRadius: 24, border: `1px solid ${C.border}`, padding: '32px 28px', boxShadow: '0 4px 24px rgba(109,40,217,0.07)' }}>

            {/* Topic selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.mid, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 6 }}>
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={e => handleTopicChange(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.ink, fontFamily: font.body, outline: 'none', background: '#fff' }}
                >
                  {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: C.mid, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 6 }}>
                  Tier
                </label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {TIERS.map(t => (
                    <button
                      key={t}
                      onClick={() => handleTierChange(t)}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 10, border: `1.5px solid ${tier === t ? C.purple : C.border}`,
                        background: tier === t ? C.purplePale : '#fff', color: tier === t ? C.purple : C.mid,
                        fontSize: 13, fontWeight: tier === t ? 700 : 500, cursor: 'pointer', fontFamily: font.body,
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: C.mid, textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', marginBottom: 6 }}>
                Subtopic
              </label>
              <select
                value={subtopic}
                onChange={e => setSubtopic(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${C.border}`, fontSize: 14, color: C.ink, fontFamily: font.body, outline: 'none', background: '#fff' }}
              >
                {TOPIC_DATA[topic][tier].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? C.purple : preview ? C.purple : C.border}`,
                borderRadius: 16, padding: preview ? 0 : '40px 24px',
                textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                background: dragOver ? C.purplePale : '#fff', overflow: 'hidden',
                marginBottom: 20,
              }}
            >
              {preview ? (
                <div style={{ position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Your notes" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 10, right: 10,
                    background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 12, fontWeight: 600,
                    padding: '4px 10px', borderRadius: 8,
                  }}>
                    Click to change
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>
                    Drop your notes here or click to upload
                  </p>
                  <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
                    Photo, scan or screenshot · JPEG, PNG, WEBP · Max 4 MB
                  </p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />

            {error && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!image}
              style={{
                width: '100%', padding: '14px', borderRadius: 12, border: 'none',
                background: image ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})` : C.border,
                color: image ? '#fff' : '#9CA3AF',
                fontWeight: 700, fontSize: 16, cursor: image ? 'pointer' : 'not-allowed',
                fontFamily: font.body, transition: 'all 0.2s',
                boxShadow: image ? `0 4px 16px ${C.purple}30` : 'none',
              }}
            >
              Review My Notes →
            </button>
          </div>
        )}

        {/* ── REVIEWING PHASE ── */}
        {phase === 'reviewing' && (
          <div style={{ background: '#fff', borderRadius: 24, border: `1px solid ${C.border}`, padding: '60px 28px', textAlign: 'center', boxShadow: '0 4px 24px rgba(109,40,217,0.07)' }}>
            <div style={{ width: 48, height: 48, border: `4px solid ${C.border}`, borderTopColor: C.purple, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 20px' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.ink, margin: '0 0 6px' }}>Reviewing your notes…</p>
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>Our AI is analysing accuracy, completeness and clarity</p>
          </div>
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === 'results' && result && (() => {
          const colour = scoreColour(result.score, result.outOf)
          const pct = Math.round((result.score / result.outOf) * 100)
          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Score card */}
              <div style={{
                background: `linear-gradient(135deg, ${colour}ee, ${colour}cc)`,
                borderRadius: 24, padding: '36px 28px', textAlign: 'center', color: '#fff',
              }}>
                <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 8px' }}>{topic} — {subtopic}</p>
                <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, fontFamily: font.display }}>{result.score}</div>
                <div style={{ fontSize: 18, opacity: 0.85, margin: '4px 0' }}>out of {result.outOf}</div>
                <div style={{ fontSize: 15, fontWeight: 700, margin: '8px 0 16px' }}>{scoreLabel(result.score, result.outOf)}</div>

                {/* Score bar */}
                <div style={{ height: 8, background: 'rgba(255,255,255,0.3)', borderRadius: 999, maxWidth: 280, margin: '0 auto' }}>
                  <div style={{ height: 8, background: '#fff', borderRadius: 999, width: `${pct}%`, transition: 'width 0.8s ease' }} />
                </div>
                <p style={{ fontSize: 13, opacity: 0.75, margin: '10px 0 0' }}>{pct}% — {result.summary}</p>
              </div>

              {/* Strengths */}
              {result.strengths.length > 0 && (
                <div style={{ background: '#fff', border: '1.5px solid #A7F3D0', borderRadius: 18, padding: '20px 22px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px' }}>✓ What you did well</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.strengths.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ width: 20, height: 20, background: '#059669', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700, marginTop: 1 }}>✓</span>
                        <span style={{ fontSize: 14, color: '#065F46', lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaps */}
              {result.gaps.length > 0 && (
                <div style={{ background: '#fff', border: '1.5px solid #FDE68A', borderRadius: 18, padding: '20px 22px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#D97706', textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px' }}>⚠ Missing from your notes</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.gaps.map((g, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
                        <span style={{ fontSize: 14, color: '#92400E', lineHeight: 1.5 }}>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Errors */}
              {result.errors.length > 0 && (
                <div style={{ background: '#fff', border: '1.5px solid #FECACA', borderRadius: 18, padding: '20px 22px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 12px' }}>✗ Errors found</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.errors.map((e, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 14, flexShrink: 0, color: '#DC2626', marginTop: 2 }}>✗</span>
                        <span style={{ fontSize: 14, color: '#7F1D1D', lineHeight: 1.5 }}>{e}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Revision focus */}
              <div style={{ background: C.purplePale, border: `1.5px solid ${C.border}`, borderRadius: 18, padding: '16px 22px' }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 6px' }}>📌 Focus on next</p>
                <p style={{ fontSize: 14, color: C.ink, margin: 0, lineHeight: 1.5 }}>{result.revisionFocus}</p>
              </div>

              {/* CTA */}
              <div style={{ background: '#fff', borderRadius: 18, border: `1px solid ${C.border}`, padding: '24px 22px', textAlign: 'center' }}>
                {result.recommendation === 'revise' ? (
                  <>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px', fontFamily: font.display }}>
                      Your notes need a bit more work — want to revise this topic?
                    </p>
                    <p style={{ fontSize: 13, color: C.mid, margin: '0 0 18px' }}>
                      Our study notes cover everything you need to know for {subtopic}.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {studySlug && (
                        <button
                          onClick={() => router.push(`/study/${studySlug}`)}
                          style={{
                            width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                            background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                            color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: font.body,
                            boxShadow: `0 4px 16px ${C.purple}30`,
                          }}
                        >
                          📖 Study {subtopic} →
                        </button>
                      )}
                      <button
                        onClick={reset}
                        style={{ width: '100%', padding: '11px', borderRadius: 12, border: `1.5px solid ${C.border}`, background: '#fff', color: C.mid, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font.body }}
                      >
                        Review different notes
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 6px', fontFamily: font.display }}>
                      Great notes! Ready to put them to the test?
                    </p>
                    <p style={{ fontSize: 13, color: C.mid, margin: '0 0 18px' }}>
                      Practice AI-marked questions on {subtopic} and lock in your understanding.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <button
                        onClick={() => router.push('/learn')}
                        style={{
                          width: '100%', padding: '13px', borderRadius: 12, border: 'none',
                          background: 'linear-gradient(135deg, #059669, #10B981)',
                          color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: font.body,
                          boxShadow: '0 4px 16px rgba(5,150,105,0.3)',
                        }}
                      >
                        🎯 Practice {subtopic} →
                      </button>
                      <button
                        onClick={reset}
                        style={{ width: '100%', padding: '11px', borderRadius: 12, border: `1.5px solid ${C.border}`, background: '#fff', color: C.mid, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font.body }}
                      >
                        Review different notes
                      </button>
                    </div>
                  </>
                )}
              </div>

            </div>
          )
        })()}

      </div>
    </main>
  )
}
