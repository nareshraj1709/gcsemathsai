'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// ── Design tokens ─────────────────────────────────────────────
const C = {
  ink: '#0D0B1A',
  purple: '#6D28D9',
  purpleLight: '#8B5CF6',
  purplePale: '#EDE9FE',
  mist: '#F8F7FF',
  mid: '#6B7280',
  border: '#E5E1FF',
  green: '#059669',
  greenLight: '#D1FAE5',
  red: '#DC2626',
  redLight: '#FEE2E2',
  amber: '#D97706',
  amberLight: '#FEF3C7',
}
const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

// ── Types ─────────────────────────────────────────────────────
type Question = { question: string; hint?: string; markScheme: string; marks: number }
type MarkResult = { score: number; outOf: number; feedback: string }
type Phase = 'loading' | 'practice' | 'complete'

export type SessionAttempt = {
  question: string
  topic: string
  subtopic: string
  studentAnswer: string
  score: number
  outOf: number
  feedback: string
}

type Attempt = {
  question: string
  topic: string
  subtopic: string
  studentAnswer: string
  score: number
  outOf: number
  feedback: string
  hint?: string
}

// ── Loading screen ───────────────────────────────────────────
const LOADING_TIPS = [
  'Always show your working — method marks are free marks.',
  'Check your units! cm, kg, seconds — forgetting them costs easy marks.',
  'If you get stuck, re-read the question for clues.',
  'Sketch a diagram for geometry and graph questions.',
  'Estimate first — it helps you spot silly mistakes.',
  'For "show that" questions, you must show every step.',
  'In algebra, collect like terms before solving.',
  'Read the question carefully — "give your answer as a fraction" means no decimals!',
]

const LOADING_STEPS = [
  'Matching your exam board style...',
  'Writing exam-standard questions...',
  'Creating mark schemes...',
  'Nearly there...',
]

const BOARD_CODES: Record<string, string> = { AQA: '8300', Edexcel: '1MA1', OCR: 'J560' }

function LoadingScreen({ genError, difficulty, subtopic, topic, board, tier, onRetry, onBack }: {
  genError: string; difficulty: string; subtopic: string; topic: string
  board: string; tier: string; onRetry: () => void; onBack: () => void
}) {
  const [tipIndex, setTipIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (genError) return
    const t1 = setInterval(() => setTipIndex(i => (i + 1) % LOADING_TIPS.length), 3500)
    const t2 = setInterval(() => setStepIndex(i => Math.min(i + 1, LOADING_STEPS.length - 1)), 2200)
    const t3 = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3) }
  }, [genError])

  const progress = Math.min(95, 20 + (elapsed / (elapsed + 4)) * 75)

  if (genError) {
    return (
      <div style={{ minHeight: '100vh', background: C.mist, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.body }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📐</div>
          <p style={{ color: C.red, fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{genError}</p>
          <button onClick={onRetry} style={{ background: C.purple, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', marginRight: 10 }}>Try again</button>
          <button onClick={onBack} style={{ background: 'none', color: C.mid, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back to topics</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.mist, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.body }}>
      <div style={{ textAlign: 'center', maxWidth: 420, padding: '0 24px' }}>
        <style>{`
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
        <div style={{ fontSize: 48, marginBottom: 20, animation: 'bounce 1.2s ease-in-out infinite' }}>✏️</div>
        <p style={{ color: C.purple, fontWeight: 800, fontSize: 18, margin: '0 0 4px', fontFamily: font.display }}>
          Building your {board} practice paper
        </p>
        <p style={{ color: C.mid, fontSize: 13, margin: '0 0 20px' }}>
          {subtopic || topic || 'Mixed'} · {tier} · {difficulty}
        </p>

        <div style={{ background: C.border, borderRadius: 999, height: 8, overflow: 'hidden', maxWidth: 300, margin: '0 auto 12px' }}>
          <div style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${C.purple}, ${C.purpleLight})`, width: `${progress}%`, transition: 'width 1s ease-out' }} />
        </div>

        <p style={{ color: C.purple, fontSize: 13, fontWeight: 600, margin: '0 0 24px', minHeight: 20, animation: 'fadeIn 0.4s ease' }} key={stepIndex}>
          {LOADING_STEPS[stepIndex]}
        </p>

        <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${C.border}`, padding: '16px 20px', boxShadow: '0 2px 16px rgba(109,40,217,0.06)', animation: 'fadeIn 0.5s ease', minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }} key={tipIndex}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.purple, textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 6px' }}>Exam tip</p>
          <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.5, margin: 0 }}>{LOADING_TIPS[tipIndex]}</p>
        </div>

        <p style={{ color: '#D1D5DB', fontSize: 11, marginTop: 16 }}>
          {elapsed < 5 ? 'This usually takes 5-10 seconds' : `${elapsed}s — almost ready...`}
        </p>
      </div>
    </div>
  )
}

// ── Score ring ────────────────────────────────────────────────
function ScoreRing({ pct, size = 110 }: { pct: number; size?: number }) {
  const r = size * 0.42
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  const color = pct >= 80 ? C.green : pct >= 50 ? C.amber : C.red
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={size * 0.08} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={size * 0.08}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
        style={{ fontSize: size * 0.22, fontWeight: 800, fill: color, fontFamily: font.display }}>
        {Math.round(pct)}%
      </text>
    </svg>
  )
}

// ── Page wrapper ──────────────────────────────────────────────
export default function PracticePage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: C.mist, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: C.purple, fontWeight: 700, fontFamily: font.body }}>Loading...</p>
      </div>
    }>
      <Practice />
    </Suspense>
  )
}

// ── Main practice ─────────────────────────────────────────────
function Practice() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const topic     = searchParams.get('topic')      || ''
  const subtopic  = searchParams.get('subtopic')   || ''
  const board     = searchParams.get('board')      || 'AQA'
  const tier      = searchParams.get('tier')       || 'Foundation'
  const difficulty = searchParams.get('difficulty') || 'Medium'
  const year      = searchParams.get('year')       || ''

  const [phase, setPhase]         = useState<Phase>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [genError, setGenError]   = useState('')
  const [qIndex, setQIndex]       = useState(0)
  const [answer, setAnswer]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult]       = useState<MarkResult | null>(null)
  const [error, setError]         = useState('')
  const [showHint, setShowHint]   = useState(false)
  const [attempts, setAttempts]   = useState<Attempt[]>([])
  const [round, setRound]         = useState(0)

  const generate = async () => {
    setPhase('loading'); setGenError(''); setQIndex(0); setAnswer('')
    setResult(null); setError(''); setShowHint(false); setAttempts([])
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examBoard: board, tier, topic: topic || 'Mixed', subtopic: subtopic || 'Mixed', count: 7, paperStyle: false, difficulty }),
      })
      const data = await res.json()
      if (data.error || !data.questions) { setGenError('Failed to load questions. Please try again.'); return }
      setQuestions(data.questions)
      setPhase('practice')
    } catch {
      setGenError('Network error. Please refresh.')
    }
  }

  useEffect(() => { generate() }, [round]) // eslint-disable-line react-hooks/exhaustive-deps

  const q = questions[qIndex]
  const isLast = qIndex === questions.length - 1
  const boardCode = BOARD_CODES[board] || '8300'

  const saveAttempt = async (question: string, studentAnswer: string, score: number, outOf: number, feedback: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    await supabase.from('attempts').insert({
      user_id: session.user.id, topic, subtopic, year_group: year,
      exam_board: board, tier, question, student_answer: studentAnswer,
      score, out_of: outOf, feedback,
    })
  }

  const submit = async () => {
    if (!answer.trim() || !q) return
    setSubmitting(true); setResult(null); setError('')
    try {
      const res = await fetch('/api/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q.question, markScheme: q.markScheme, studentAnswer: answer, marks: q.marks, examBoard: board }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setResult(data)
      await saveAttempt(q.question, answer, data.score, data.outOf, data.feedback)
      setAttempts(prev => [...prev, { question: q.question, topic, subtopic, studentAnswer: answer, score: data.score, outOf: data.outOf, feedback: data.feedback, hint: q.hint }])
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const next = () => {
    if (isLast) { setPhase('complete') } else {
      setAnswer(''); setResult(null); setError(''); setShowHint(false); setQIndex(i => i + 1)
    }
  }

  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalOut   = attempts.reduce((s, a) => s + a.outOf, 0)
  const pct        = totalOut > 0 ? Math.round((totalScore / totalOut) * 100) : 0

  // ── LOADING ─────────────────────────────────────────────────
  if (phase === 'loading') {
    return <LoadingScreen genError={genError} difficulty={difficulty} subtopic={subtopic} topic={topic} board={board} tier={tier} onRetry={() => setRound(r => r + 1)} onBack={() => router.push('/learn')} />
  }

  // ── COMPLETE ────────────────────────────────────────────────
  if (phase === 'complete') {
    const col = pct >= 80 ? C.green : pct >= 50 ? C.amber : C.red
    const bg  = pct >= 80 ? '#F0FDF4' : pct >= 50 ? '#FFFBEB' : '#FFF5F5'
    const msg = pct >= 80 ? 'Great work!' : pct >= 50 ? 'Good effort!' : 'Keep practising!'

    return (
      <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {/* Summary */}
          <div style={{ background: '#fff', borderRadius: 20, border: `1px solid ${C.border}`, overflow: 'hidden', marginBottom: 20, boxShadow: '0 4px 24px rgba(109,40,217,0.06)' }}>
            <div style={{ background: bg, padding: '28px 24px', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <ScoreRing pct={pct} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: font.display, color: col, marginBottom: 4 }}>{msg}</div>
                <div style={{ fontSize: 15, color: C.ink, fontWeight: 600, marginBottom: 6 }}>{totalScore} / {totalOut} marks</div>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {[`${board} (${boardCode})`, tier, subtopic || topic || 'Mixed'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: C.purple, background: C.purplePale, padding: '2px 8px', borderRadius: 999 }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Question breakdown */}
            <div style={{ padding: '18px 24px' }}>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 16 }}>
                {attempts.map((a, i) => {
                  const qp = a.outOf > 0 ? a.score / a.outOf : 0
                  return (
                    <div key={i} title={`Q${i + 1}: ${a.score}/${a.outOf}`} style={{
                      width: 34, height: 34, borderRadius: 8,
                      background: qp === 1 ? C.green : qp === 0 ? C.red : C.amber,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 11, fontWeight: 700,
                    }}>{a.score}/{a.outOf}</div>
                  )
                })}
              </div>

              {attempts.map((a, i) => {
                const qp = a.outOf > 0 ? a.score / a.outOf : 0
                const bc = qp === 1 ? C.green : qp === 0 ? C.red : C.amber
                return (
                  <div key={i} style={{ borderRadius: 10, border: `1.5px solid ${bc}22`, overflow: 'hidden', marginBottom: 8 }}>
                    <div style={{ background: qp === 1 ? '#F0FDF4' : qp === 0 ? '#FFF5F5' : '#FFFBEB', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, flex: 1, whiteSpace: 'pre-wrap' }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: bc, marginRight: 6 }}>Q{i + 1}</span>
                        {a.question}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: bc, whiteSpace: 'nowrap' }}>{a.score}/{a.outOf}</span>
                    </div>
                    <div style={{ padding: '8px 12px', background: '#fff' }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: C.mid, margin: '0 0 2px' }}>Your answer:</p>
                      <p style={{ fontSize: 13, color: C.ink, margin: '0 0 6px' }}>{a.studentAnswer}</p>
                      <p style={{ fontSize: 12, color: C.mid, lineHeight: 1.5, margin: 0 }}>{a.feedback}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setRound(r => r + 1)} style={{
              flex: 1, minWidth: 160, background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              color: '#fff', border: 'none', borderRadius: 12, padding: '13px 20px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: font.body,
            }}>More questions</button>
            <button onClick={() => router.push('/learn')} style={{
              flex: 1, minWidth: 140, background: '#fff', color: C.purple,
              border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '13px 20px',
              fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: font.body,
            }}>Change topic</button>
            {pct < 70 && (
              <button onClick={() => router.push('/study')} style={{
                background: '#fff', color: C.amber, border: `1.5px solid ${C.amberLight}`,
                borderRadius: 12, padding: '13px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: font.body,
              }}>Study notes</button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── PRACTICE ────────────────────────────────────────────────
  const sessionScore = attempts.reduce((s, a) => s + a.score, 0)
  const sessionOut   = attempts.reduce((s, a) => s + a.outOf, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body }}>

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`, padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => router.push('/learn')} style={{
            background: 'none', border: `1.5px solid ${C.border}`, borderRadius: 8,
            padding: '5px 10px', fontSize: 12, cursor: 'pointer', color: C.mid, fontFamily: font.body,
          }}>← Back</button>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.purple, background: C.purplePale, padding: '2px 8px', borderRadius: 999 }}>
            {board} ({boardCode})
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.mid }}>
            {subtopic || topic || 'Mixed'} · {tier}
          </span>
        </div>

        {attempts.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>{sessionScore}/{sessionOut}</span>
            <div style={{ width: 60, height: 5, background: C.border, borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: 5, background: C.purple, borderRadius: 999, width: `${sessionOut > 0 ? (sessionScore / sessionOut) * 100 : 0}%`, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: 11, color: C.mid }}>{attempts.length}/{questions.length}</span>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
          {questions.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i < attempts.length ? C.purple : i === qIndex ? C.purpleLight : C.border,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Question card */}
        {q && (
          <div style={{
            background: '#fff', borderRadius: 18, border: `1px solid ${C.border}`,
            boxShadow: '0 2px 16px rgba(109,40,217,0.05)', padding: '24px', marginBottom: 14,
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: C.purple,
                  color: '#fff', fontSize: 12, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{qIndex + 1}</span>
                <span style={{ fontSize: 12, color: C.mid }}>of {questions.length}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.purple, background: C.purplePale, padding: '3px 10px', borderRadius: 999 }}>
                {q.marks} mark{q.marks !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Question text — preserve newlines for multi-part questions */}
            <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, lineHeight: 1.65, marginBottom: 18, fontFamily: font.display, whiteSpace: 'pre-wrap' }}>
              {q.question}
            </div>

            {/* Hint */}
            {!result && q.hint && (
              <div style={{ marginBottom: 14 }}>
                {!showHint ? (
                  <button onClick={() => setShowHint(true)} style={{
                    background: 'none', border: `1.5px dashed ${C.border}`, borderRadius: 8,
                    padding: '6px 12px', fontSize: 12, fontWeight: 600, color: C.mid,
                    cursor: 'pointer', fontFamily: font.body,
                  }}>Show a hint</button>
                ) : (
                  <div style={{ background: '#FFFBEB', border: '1.5px solid #FDE68A', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>Hint: </span>{q.hint}
                  </div>
                )}
              </div>
            )}

            {/* Answer box */}
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Write your answer and working here..."
              rows={4}
              disabled={!!result}
              style={{
                width: '100%', boxSizing: 'border-box',
                border: `1.5px solid ${result ? C.border : '#D1D5DB'}`,
                borderRadius: 12, padding: '12px 14px',
                fontSize: 14, fontFamily: font.body, color: C.ink,
                background: result ? '#F9FAFB' : '#fff',
                resize: 'none', outline: 'none', lineHeight: 1.6, minHeight: 90,
              } as React.CSSProperties}
              onFocus={e => { if (!result) e.currentTarget.style.borderColor = C.purple }}
              onBlur={e => { if (!result) e.currentTarget.style.borderColor = '#D1D5DB' }}
            />

            {!result && (
              <button onClick={submit} disabled={submitting || !answer.trim()} style={{
                marginTop: 10, width: '100%',
                background: submitting || !answer.trim() ? C.border : `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                color: submitting || !answer.trim() ? '#9CA3AF' : '#fff',
                border: 'none', borderRadius: 12, padding: '14px',
                fontSize: 15, fontWeight: 700, cursor: submitting || !answer.trim() ? 'not-allowed' : 'pointer',
                fontFamily: font.body,
              }}>
                {submitting ? 'Marking...' : answer.trim() ? 'Submit answer' : 'Write your answer above'}
              </button>
            )}
          </div>
        )}

        {/* Result */}
        {result && (() => {
          const rc = result.score === result.outOf ? C.green : result.score === 0 ? C.red : C.amber
          const rb = result.score === result.outOf ? '#F0FDF4' : result.score === 0 ? '#FFF5F5' : '#FFFBEB'
          return (
            <div style={{ background: rb, border: `1.5px solid ${rc}33`, borderRadius: 14, padding: '16px 20px', marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: rc, fontFamily: font.display }}>{result.score}/{result.outOf} marks</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', background: rc, padding: '3px 10px', borderRadius: 999 }}>
                  {result.score === result.outOf ? 'Full marks!' : result.score === 0 ? 'Keep going' : 'Almost!'}
                </span>
              </div>
              <p style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, margin: 0 }}>{result.feedback}</p>
            </div>
          )
        })()}

        {error && (
          <div style={{ background: C.redLight, border: `1px solid ${C.red}33`, borderRadius: 10, padding: '10px 14px', fontSize: 13, color: C.red, marginBottom: 14 }}>{error}</div>
        )}

        {/* Next / End */}
        {result && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={next} style={{
              flex: 1, background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              color: '#fff', border: 'none', borderRadius: 12, padding: '13px',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: font.body,
            }}>
              {isLast ? 'See results' : 'Next question'} →
            </button>
            {!isLast && (
              <button onClick={() => setPhase('complete')} style={{
                border: `1.5px solid ${C.border}`, background: '#fff', color: C.mid,
                borderRadius: 12, padding: '13px 16px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: font.body,
              }}>End</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
