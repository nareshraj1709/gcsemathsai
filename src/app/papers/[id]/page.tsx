'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPaper, estimateGrade } from '@/lib/papers-data'
import { supabase } from '@/lib/supabase'

type Question = { question: string; markScheme: string; marks: number }
type MarkResult = { score: number; outOf: number; feedback: string }

type Phase = 'info' | 'loading' | 'exam' | 'marking' | 'results'

function fmt(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function PaperExamPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const paper = getPaper(id)

  const [phase, setPhase] = useState<Phase>('info')
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [current, setCurrent] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [results, setResults] = useState<MarkResult[]>([])
  const [markingIdx, setMarkingIdx] = useState(0)
  const [loadError, setLoadError] = useState('')
  const [pdfOpen, setPdfOpen] = useState(false)

  // Timer
  useEffect(() => {
    if (phase !== 'exam') return
    if (timeLeft <= 0) { handleSubmitExam(); return }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft])

  const startExam = async () => {
    if (!paper) return
    setPhase('loading')
    setLoadError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          examBoard: paper.board,
          tier: paper.tier,
          count: paper.questionCount,
          paperStyle: true,
          paperName: paper.name,
          topics: paper.topics,
          style: paper.style,
          calculator: paper.calculator,
        }),
      })
      const data = await res.json()
      if (data.error || !data.questions) { setLoadError(data.error || 'Failed to generate questions'); setPhase('info'); return }
      setQuestions(data.questions)
      setAnswers(new Array(data.questions.length).fill(''))
      setTimeLeft(paper.timeMinutes * 60)
      setCurrent(0)
      setPhase('exam')
    } catch {
      setLoadError('Network error — please try again.')
      setPhase('info')
    }
  }

  const handleSubmitExam = useCallback(async () => {
    setPhase('marking')
    setResults([])
    setMarkingIdx(0)
  }, [])

  // Mark questions sequentially when in marking phase
  useEffect(() => {
    if (phase !== 'marking') return
    if (markingIdx >= questions.length) {
      setPhase('results')
      return
    }
    const markNext = async () => {
      const q = questions[markingIdx]
      const ans = answers[markingIdx] || '(no answer)'
      try {
        const res = await fetch('/api/mark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q.question,
            markScheme: q.markScheme,
            studentAnswer: ans,
            marks: q.marks,
            examBoard: paper?.board,
          }),
        })
        const data = await res.json()
        setResults(prev => [...prev, data.error ? { score: 0, outOf: q.marks, feedback: 'Could not mark this answer.' } : data])
      } catch {
        setResults(prev => [...prev, { score: 0, outOf: q.marks, feedback: 'Marking failed.' }])
      }
      setMarkingIdx(i => i + 1)
    }
    markNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, markingIdx])

  // Save results to Supabase after marking
  useEffect(() => {
    if (phase !== 'results' || results.length === 0 || !paper) return
    const save = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await Promise.all(questions.map((q, i) =>
        supabase.from('attempts').insert({
          user_id: user.id,
          topic: 'Exam Paper',
          subtopic: `${paper.board} ${paper.tier} ${paper.name}`,
          year_group: '',
          exam_board: paper.board,
          tier: paper.tier,
          question: q.question,
          student_answer: answers[i] || '',
          score: results[i]?.score ?? 0,
          out_of: results[i]?.outOf ?? q.marks,
          feedback: results[i]?.feedback ?? '',
        })
      ))
    }
    save()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (!paper) {
    return (
      <main className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Paper not found</p>
          <button onClick={() => router.push('/papers')} className="text-purple-700 font-semibold underline">← Back to papers</button>
        </div>
      </main>
    )
  }

  const totalScore = results.reduce((s, r) => s + (r?.score ?? 0), 0)
  const totalMarks = results.reduce((s, r) => s + (r?.outOf ?? 0), 0)
  const pct = totalMarks > 0 ? Math.round((totalScore / totalMarks) * 100) : 0
  const grade = estimateGrade(totalScore, paper.totalMarks, paper.tier)

  const gradeColor = ['8', '9'].includes(grade) ? '#059669'
    : ['6', '7'].includes(grade) ? '#2563EB'
    : ['4', '5'].includes(grade) ? '#D97706'
    : '#DC2626'

  // ── INFO screen ─────────────────────────────────────────────
  if (phase === 'info') {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{
            background: '#fff', borderRadius: 20, border: '1.5px solid #E5E1FF',
            padding: '40px 32px', boxShadow: '0 4px 24px rgba(109,40,217,0.08)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 800, color: '#0D0B1A', margin: '0 0 8px' }}>
              {paper.board} {paper.tier}
            </h1>
            <p style={{ fontSize: 16, color: '#6B7280', margin: '0 0 24px' }}>{paper.name}</p>

            {[
              { label: 'Questions', val: `${paper.questionCount}` },
              { label: 'Total marks', val: `${paper.totalMarks}` },
              { label: 'Time allowed', val: `${paper.timeMinutes} minutes` },
              { label: 'Calculator', val: paper.calculator ? 'Allowed' : 'NOT allowed' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                <span style={{ fontSize: 14, color: '#6B7280' }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0D0B1A' }}>{row.val}</span>
              </div>
            ))}

            {!paper.calculator && (
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 16px', margin: '20px 0 0', textAlign: 'left' }}>
                <p style={{ fontSize: 13, color: '#92400E', margin: 0, fontWeight: 600 }}>
                  ⚠️ Non-calculator paper — put your calculator away before starting.
                </p>
              </div>
            )}

            {loadError && (
              <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px', marginTop: 16 }}>
                <p style={{ fontSize: 13, color: '#DC2626', margin: 0 }}>{loadError}</p>
              </div>
            )}

            {paper.pdfUrl && (
              <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: 12, padding: '14px 16px', marginTop: 20 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#065F46', margin: '0 0 10px' }}>📄 Real paper available</p>
                <p style={{ fontSize: 12, color: '#047857', margin: '0 0 12px', lineHeight: 1.5 }}>
                  This is the actual AQA past paper. View it alongside the AI practice to work through the real questions.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1, padding: '9px', borderRadius: 8, textAlign: 'center',
                      background: '#059669', color: '#fff', fontWeight: 700, fontSize: 13,
                      textDecoration: 'none', display: 'block',
                    }}
                  >
                    Open PDF in new tab ↗
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={startExam}
              style={{
                marginTop: 20, width: '100%', padding: '14px',
                background: 'linear-gradient(135deg, #4C1D95, #6D28D9)',
                color: '#fff', border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
            >
              {paper.pdfUrl ? 'Start AI practice alongside paper →' : 'Start timed exam →'}
            </button>
            <button onClick={() => router.push('/papers')} style={{ marginTop: 12, background: 'none', border: 'none', fontSize: 13, color: '#9CA3AF', cursor: 'pointer' }}>
              ← Back to papers
            </button>
          </div>
        </div>
      </main>
    )
  }

  // ── LOADING screen ──────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Trebuchet MS', sans-serif" }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#6D28D9' }}>Preparing your exam…</p>
          <p style={{ fontSize: 14, color: '#9CA3AF', marginTop: 8 }}>
            Generating {paper.questionCount} questions for {paper.board} {paper.tier}
          </p>
        </div>
      </main>
    )
  }

  // ── EXAM screen ──────────────────────────────────────────────
  if (phase === 'exam') {
    const q = questions[current]
    const urgent = timeLeft < 300

    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
        {/* Exam bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: '#fff', borderBottom: '1.5px solid #E5E1FF',
          padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#6D28D9' }}>{paper.board} {paper.tier} — {paper.name}</span>
            <span style={{ fontSize: 12, color: '#9CA3AF', marginLeft: 12 }}>Q {current + 1}/{questions.length}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {paper.pdfUrl && (
              <button
                onClick={() => setPdfOpen(o => !o)}
                style={{
                  padding: '7px 14px', borderRadius: 8,
                  border: '1.5px solid #A7F3D0', background: pdfOpen ? '#059669' : '#F0FDF4',
                  color: pdfOpen ? '#fff' : '#065F46', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                📄 {pdfOpen ? 'Hide paper' : 'View paper'}
              </button>
            )}
            <div style={{ fontSize: 14, fontWeight: 700, color: urgent ? '#DC2626' : '#374151', fontVariantNumeric: 'tabular-nums' }}>
              ⏱ {fmt(timeLeft)}
            </div>
            <button
              onClick={handleSubmitExam}
              style={{ padding: '7px 16px', borderRadius: 8, border: '1.5px solid #FECACA', background: '#FEF2F2', color: '#DC2626', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
            >
              Submit exam
            </button>
          </div>
        </div>

        {/* PDF viewer panel */}
        {paper.pdfUrl && pdfOpen && (
          <div style={{ background: '#F0FDF4', borderBottom: '2px solid #A7F3D0', padding: '12px 24px' }}>
            <iframe
              src={paper.pdfUrl}
              title="Past paper PDF"
              style={{ width: '100%', height: 600, border: 'none', borderRadius: 8, background: '#fff' }}
            />
            <p style={{ fontSize: 11, color: '#047857', margin: '8px 0 0', textAlign: 'center' }}>
              📄 {paper.board} {paper.tier} {paper.name} — use this alongside your AI practice
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div style={{ height: 3, background: '#E5E1FF' }}>
          <div style={{ height: 3, background: '#6D28D9', width: `${((current) / questions.length) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E5E1FF', padding: '28px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6D28D9', background: '#EDE9FE', padding: '3px 10px', borderRadius: 999 }}>
                Question {current + 1}
              </span>
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>[{q.marks} mark{q.marks !== 1 ? 's' : ''}]</span>
            </div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#0D0B1A', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: '0 0 20px' }}>
              {q.question}
            </p>
            <textarea
              value={answers[current]}
              onChange={e => {
                const updated = [...answers]
                updated[current] = e.target.value
                setAnswers(updated)
              }}
              placeholder="Write your working and answer here…"
              rows={5}
              style={{
                width: '100%', border: '1.5px solid #E5E1FF', borderRadius: 12,
                padding: '12px 14px', fontSize: 14, resize: 'vertical',
                fontFamily: "'Trebuchet MS', sans-serif",
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {current > 0 && (
              <button
                onClick={() => setCurrent(i => i - 1)}
                style={{ padding: '12px 20px', borderRadius: 12, border: '1.5px solid #E5E1FF', background: '#fff', color: '#6B7280', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                ← Previous
              </button>
            )}
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent(i => i + 1)}
                style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                Next question →
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #059669, #10B981)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
              >
                Submit exam ✓
              </button>
            )}
          </div>

          {/* Question nav dots */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20, justifyContent: 'center' }}>
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: 28, height: 28, borderRadius: 6, border: '1.5px solid',
                  borderColor: i === current ? '#6D28D9' : answers[i] ? '#A7F3D0' : '#E5E1FF',
                  background: i === current ? '#6D28D9' : answers[i] ? '#ECFDF5' : '#fff',
                  color: i === current ? '#fff' : '#374151',
                  fontSize: 11, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // ── MARKING screen ──────────────────────────────────────────
  if (phase === 'marking') {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Trebuchet MS', sans-serif" }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#6D28D9', marginBottom: 8 }}>Marking your exam…</p>
          <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 20 }}>
            Marking question {markingIdx + 1} of {questions.length}
          </p>
          <div style={{ height: 6, background: '#E5E1FF', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: 6, background: '#6D28D9', borderRadius: 999, width: `${(markingIdx / questions.length) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </main>
    )
  }

  // ── RESULTS screen ──────────────────────────────────────────
  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>

        {/* Score hero */}
        <div style={{
          background: `linear-gradient(135deg, ${gradeColor}ee, ${gradeColor}cc)`,
          borderRadius: 20, padding: '36px', textAlign: 'center', color: '#fff', marginBottom: 24,
        }}>
          <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 6px' }}>{paper.board} {paper.tier} · {paper.name}</p>
          <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "'Georgia', serif", lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 16, opacity: 0.9, margin: '8px 0 4px' }}>{totalScore} / {paper.totalMarks} marks</div>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', borderRadius: 999, padding: '4px 20px', fontSize: 18, fontWeight: 800, marginTop: 8 }}>
            Grade {grade}
          </div>
        </div>

        {/* Grade boundary info */}
        <div style={{ background: '#fff', border: '1px solid #E5E1FF', borderRadius: 16, padding: '20px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0D0B1A', marginBottom: 12 }}>Grade boundaries (approximate)</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(paper.tier === 'Foundation'
              ? [['5', '85%'], ['4', '70%'], ['3', '55%'], ['2', '40%']]
              : [['9', '80%'], ['8', '70%'], ['7', '60%'], ['6', '50%'], ['5', '40%'], ['4', '30%']]
            ).map(([g, p]) => (
              <div key={g} style={{
                padding: '6px 14px', borderRadius: 8, border: '1px solid #E5E1FF',
                background: grade === g ? gradeColor : '#F9F9F9',
                color: grade === g ? '#fff' : '#374151',
              }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Grade {g}</span>
                <span style={{ fontSize: 12, marginLeft: 6, opacity: 0.8 }}>{p}+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per-question breakdown */}
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 18, fontWeight: 800, color: '#0D0B1A', marginBottom: 16 }}>
          Question breakdown
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {questions.map((q, i) => {
            const r = results[i]
            if (!r) return null
            const full = r.score === r.outOf
            const zero = r.score === 0
            return (
              <div key={i} style={{
                background: '#fff', border: `1.5px solid ${full ? '#A7F3D0' : zero ? '#FECACA' : '#FDE68A'}`,
                borderRadius: 14, overflow: 'hidden',
              }}>
                <div style={{
                  background: full ? '#ECFDF5' : zero ? '#FEF2F2' : '#FFFBEB',
                  padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Q{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: full ? '#059669' : zero ? '#DC2626' : '#D97706' }}>
                    {r.score}/{r.outOf} {full ? '✓' : zero ? '✗' : '~'}
                  </span>
                </div>
                <div style={{ padding: '12px 16px' }}>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 6px', fontStyle: 'italic' }}>{q.question.slice(0, 100)}{q.question.length > 100 ? '…' : ''}</p>
                  <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5 }}>{r.feedback}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button onClick={() => router.push('/papers')} style={{ flex: 1, padding: '13px', borderRadius: 12, border: '1.5px solid #E5E1FF', background: '#fff', color: '#6D28D9', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            ← All papers
          </button>
          <button onClick={() => { setPhase('info'); setQuestions([]); setAnswers([]); setResults([]) }} style={{ flex: 1, padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            Retake paper
          </button>
        </div>
      </div>
    </main>
  )
}
