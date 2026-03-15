'use client'
import { useState, useEffect, Suspense } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { getSection } from '@/lib/sections-data'
import { supabase } from '@/lib/supabase'

type Question = { question: string; markScheme: string; marks: number }
type MarkResult = { score: number; outOf: number; feedback: string }
type Phase = 'loading' | 'practice' | 'summary'
type Evaluation = { summary: string; strengths: string[]; improvements: string[]; studyFocus: string }

export default function SectionPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7FF' }}>
        <p style={{ color: '#6D28D9', fontWeight: 600 }}>Loading…</p>
      </div>
    }>
      <SectionPractice />
    </Suspense>
  )
}

function SectionPractice() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const id = params.id as string
  const section = getSection(id)
  const board = searchParams.get('board') || 'AQA'
  const tier = searchParams.get('tier') || 'Foundation'

  const [phase, setPhase] = useState<Phase>('loading')
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<MarkResult | null>(null)
  const [allResults, setAllResults] = useState<Array<{ question: string; answer: string; result: MarkResult }>>([])
  const [error, setError] = useState('')
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [evalLoading, setEvalLoading] = useState(false)

  // Generate questions on mount
  useEffect(() => {
    if (!section) return
    const generate = async () => {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            examBoard: board,
            tier,
            topic: section.topic,
            subtopic: section.subtopic,
            count: 10,
            paperStyle: false,
          }),
        })
        const data = await res.json()
        if (data.error || !data.questions) { setError('Failed to load questions.'); return }
        setQuestions(data.questions)
        setPhase('practice')
      } catch {
        setError('Network error. Please refresh.')
      }
    }
    generate()
  }, [section, board, tier])

  if (!section) {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#374151' }}>Section not found</p>
          <button onClick={() => router.push('/sections')} style={{ marginTop: 16, color: '#6D28D9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>← Back to sections</button>
        </div>
      </main>
    )
  }

  const submitAnswer = async () => {
    if (!answer.trim() || submitting) return
    setSubmitting(true)
    setError('')
    const q = questions[current]
    try {
      const res = await fetch('/api/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          markScheme: q.markScheme,
          studentAnswer: answer,
          marks: q.marks,
          examBoard: board,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setSubmitting(false); return }
      setResult(data)

      // Save to Supabase
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('attempts').insert({
          user_id: user.id,
          topic: section.topic,
          subtopic: section.subtopic,
          year_group: '',
          exam_board: board,
          tier,
          question: q.question,
          student_answer: answer,
          score: data.score,
          out_of: data.outOf,
          feedback: data.feedback,
        })
      }

      setAllResults(prev => [...prev, { question: q.question, answer, result: data }])
    } catch {
      setError('Something went wrong. Try again.')
    }
    setSubmitting(false)
  }

  const fetchEvaluation = async (results: Array<{ question: string; answer: string; result: MarkResult }>) => {
    setEvalLoading(true)
    try {
      const attempts = results.map(r => ({
        question: r.question,
        studentAnswer: r.answer,
        score: r.result.score,
        outOf: r.result.outOf,
        topic: section!.topic,
        subtopic: section!.subtopic,
      }))
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attempts, examBoard: board, tier }),
      })
      const data = await res.json()
      if (!data.error) setEvaluation(data)
    } catch { /* ignore */ }
    setEvalLoading(false)
  }

  const nextQuestion = () => {
    if (current >= questions.length - 1) {
      setPhase('summary')
      fetchEvaluation(allResults)
    } else {
      setCurrent(i => i + 1)
      setAnswer('')
      setResult(null)
      setError('')
    }
  }

  const totalScore = allResults.reduce((s, r) => s + r.result.score, 0)
  const totalOut = allResults.reduce((s, r) => s + r.result.outOf, 0)
  const pct = totalOut > 0 ? Math.round((totalScore / totalOut) * 100) : 0

  // ── LOADING ──────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Trebuchet MS', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>{section.icon}</div>
          <p style={{ fontSize: 16, fontWeight: 700, color: section.color }}>{error || 'Generating questions…'}</p>
          {error && (
            <button onClick={() => router.push('/sections')} style={{ marginTop: 12, fontSize: 14, color: '#6B7280', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Back to sections
            </button>
          )}
        </div>
      </main>
    )
  }

  // ── SUMMARY ──────────────────────────────────────────────────
  if (phase === 'summary') {
    const correct = allResults.filter(r => r.result.score === r.result.outOf).length
    const scoreColor = pct >= 70 ? '#059669' : pct >= 50 ? '#D97706' : '#DC2626'
    const message = pct >= 80 ? 'Excellent work!' : pct >= 60 ? 'Good effort — keep practising!' : 'Keep going — review the topics you missed.'

    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px' }}>

          {/* Score */}
          <div style={{
            background: `linear-gradient(135deg, ${scoreColor}ee, ${scoreColor}cc)`,
            borderRadius: 20, padding: '36px', textAlign: 'center', color: '#fff', marginBottom: 24,
          }}>
            <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 8px' }}>{section.name} · {board} {tier}</p>
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, fontFamily: "'Georgia', serif" }}>{pct}%</div>
            <div style={{ fontSize: 15, opacity: 0.9, margin: '8px 0 4px' }}>{totalScore}/{totalOut} marks</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>{message}</div>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{correct}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>full marks</div>
              </div>
              <div style={{ width: 1, background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{allResults.length - correct}</div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>to improve</div>
              </div>
            </div>
          </div>

          {/* AI Evaluation */}
          {evalLoading && (
            <div style={{
              background: '#fff', border: '1.5px solid #E5E1FF', borderRadius: 16,
              padding: '20px 24px', marginBottom: 24, textAlign: 'center',
            }}>
              <p style={{ fontSize: 13, color: '#6D28D9', fontWeight: 600, margin: 0 }}>
                Generating your AI evaluation…
              </p>
            </div>
          )}
          {evaluation && (
            <div style={{
              background: '#fff', border: '1.5px solid #E5E1FF', borderRadius: 16,
              padding: '20px 24px', marginBottom: 24,
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 10px' }}>
                AI Evaluation
              </p>
              <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: '0 0 16px' }}>
                {evaluation.summary}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: 12, padding: '12px 14px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#059669', margin: '0 0 8px' }}>STRENGTHS</p>
                  {evaluation.strengths.map((s, i) => (
                    <p key={i} style={{ fontSize: 12, color: '#065F46', margin: '0 0 4px', lineHeight: 1.4 }}>✓ {s}</p>
                  ))}
                </div>
                <div style={{ background: '#FFF5F5', border: '1px solid #FECACA', borderRadius: 12, padding: '12px 14px' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#DC2626', margin: '0 0 8px' }}>TO IMPROVE</p>
                  {evaluation.improvements.map((imp, i) => (
                    <p key={i} style={{ fontSize: 12, color: '#7F1D1D', margin: '0 0 4px', lineHeight: 1.4 }}>→ {imp}</p>
                  ))}
                </div>
              </div>
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '10px 14px' }}>
                <p style={{ fontSize: 12, color: '#92400E', margin: 0 }}>
                  <strong>Study focus:</strong> {evaluation.studyFocus}
                </p>
              </div>
            </div>
          )}

          {/* Per question */}
          <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 800, color: '#0D0B1A', marginBottom: 16 }}>
            Question by question
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {allResults.map((item, i) => {
              const full = item.result.score === item.result.outOf
              const zero = item.result.score === 0
              return (
                <div key={i} style={{
                  background: '#fff', border: `1.5px solid ${full ? '#A7F3D0' : zero ? '#FECACA' : '#FDE68A'}`,
                  borderRadius: 14, overflow: 'hidden',
                }}>
                  <div style={{
                    background: full ? '#ECFDF5' : zero ? '#FEF2F2' : '#FFFBEB',
                    padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#374151' }}>Question {i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: full ? '#059669' : zero ? '#DC2626' : '#D97706' }}>
                      {item.result.score}/{item.result.outOf} {full ? '✓' : zero ? '✗' : '~'}
                    </span>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    <p style={{ fontSize: 13, color: '#374151', margin: '0 0 6px', lineHeight: 1.5 }}>{item.result.feedback}</p>
                    {zero && (
                      <a
                        href={`https://www.youtube.com/results?search_query=GCSE+maths+${encodeURIComponent(section.subtopic)}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, textDecoration: 'none' }}
                      >
                        ▶ Watch: {section.name} on YouTube →
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button onClick={() => router.push('/sections')} style={{ flex: 1, padding: '13px', borderRadius: 12, border: '1.5px solid #E5E1FF', background: '#fff', color: '#6D28D9', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              ← All sections
            </button>
            <button onClick={() => router.push(`/study`)} style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${section.color}, ${section.color}bb)`, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
              📖 Study notes
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── PRACTICE ─────────────────────────────────────────────────
  const q = questions[current]
  const scoreColor = result
    ? result.score === result.outOf ? '#059669' : result.score === 0 ? '#DC2626' : '#D97706'
    : section.color

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
      {/* Nav */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #E5E1FF',
        padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: section.color }}>{section.icon}</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0D0B1A', margin: 0 }}>{section.name}</p>
            <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0 }}>{board} · {tier}</p>
          </div>
        </div>
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>Q {current + 1}/10</span>
      </nav>

      {/* Progress */}
      <div style={{ height: 4, background: '#E5E1FF' }}>
        <div style={{ height: 4, background: section.color, width: `${(allResults.length / 10) * 100}%`, transition: 'width 0.3s' }} />
      </div>

      {/* Session score */}
      {allResults.length > 0 && (
        <div style={{
          background: '#fff', borderBottom: '1px solid #F3F4F6',
          padding: '8px 24px', display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>Score so far:</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: section.color }}>
            {allResults.reduce((s, r) => s + r.result.score, 0)}/{allResults.reduce((s, r) => s + r.result.outOf, 0)}
          </span>
          <div style={{ flex: 1, height: 5, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: 5, background: section.color, borderRadius: 999, width: `${allResults.length > 0 ? (allResults.reduce((s, r) => s + r.result.score, 0) / allResults.reduce((s, r) => s + r.result.outOf, 0)) * 100 : 0}%` }} />
          </div>
        </div>
      )}

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '28px 24px' }}>

        {/* Question card */}
        <div style={{ background: '#fff', borderRadius: 20, border: `1.5px solid ${section.borderColor}`, padding: '24px', marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: section.color, background: section.bgColor, padding: '3px 10px', borderRadius: 999 }}>
              {section.topic}
            </span>
            <span style={{ fontSize: 12, color: '#9CA3AF' }}>[{q.marks} mark{q.marks !== 1 ? 's' : ''}]</span>
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#0D0B1A', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: '0 0 18px' }}>
            {q.question}
          </p>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            disabled={!!result}
            placeholder="Write your working and answer here…"
            rows={4}
            style={{
              width: '100%', border: `1.5px solid ${result ? '#E5E1FF' : section.borderColor}`,
              borderRadius: 10, padding: '11px 14px', fontSize: 14, resize: 'vertical',
              fontFamily: "'Trebuchet MS', sans-serif", outline: 'none',
              background: result ? '#F9FAFB' : '#fff', boxSizing: 'border-box',
            }}
          />
          {!result && (
            <button
              onClick={submitAnswer}
              disabled={submitting || !answer.trim()}
              style={{
                marginTop: 14, width: '100%', padding: '12px', borderRadius: 10, border: 'none',
                background: `linear-gradient(135deg, ${section.color}, ${section.color}bb)`,
                color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                opacity: submitting || !answer.trim() ? 0.6 : 1,
              }}
            >
              {submitting ? 'Marking…' : 'Submit answer'}
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div style={{
            borderRadius: 16, border: `1.5px solid ${result.score === result.outOf ? '#A7F3D0' : result.score === 0 ? '#FECACA' : '#FDE68A'}`,
            background: result.score === result.outOf ? '#ECFDF5' : result.score === 0 ? '#FEF2F2' : '#FFFBEB',
            padding: '16px 20px', marginBottom: 14,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: scoreColor }}>{result.score}/{result.outOf} marks</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: scoreColor }}>
                {result.score === result.outOf ? 'Full marks!' : result.score === 0 ? 'Needs work' : 'Partial credit'}
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.55 }}>{result.feedback}</p>
          </div>
        )}

        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
            <p style={{ fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p>
          </div>
        )}

        {result && (
          <button
            onClick={nextQuestion}
            style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: current >= questions.length - 1
                ? 'linear-gradient(135deg, #059669, #10B981)'
                : `linear-gradient(135deg, ${section.color}, ${section.color}bb)`,
              color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}
          >
            {current >= questions.length - 1 ? 'See results →' : 'Next question →'}
          </button>
        )}
      </div>
    </main>
  )
}
