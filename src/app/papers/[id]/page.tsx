'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getPaper, estimateGrade } from '@/lib/papers-data'
import { supabase } from '@/lib/supabase'

type Question = { question: string; markScheme: string; marks: number }
type MarkResult = { score: number; outOf: number; feedback: string }
type Phase = 'info' | 'loading' | 'exam' | 'marking' | 'results'

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

const BOARD_THEME: Record<string, { bg: string; text: string; accent: string; light: string; border: string; code: string }> = {
  AQA:     { bg: '#1E3A5F', text: '#fff', accent: '#3B82F6', light: '#EEF2FF', border: '#C7D2FE', code: '8300' },
  Edexcel: { bg: '#7C2D12', text: '#fff', accent: '#EA580C', light: '#FFF7ED', border: '#FED7AA', code: '1MA1' },
  OCR:     { bg: '#14532D', text: '#fff', accent: '#16A34A', light: '#F0FDF4', border: '#A7F3D0', code: 'J560' },
}

function fmt(secs: number) {
  const h = Math.floor(secs / 3600)
  const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
}

// ── Loading screen ───────────────────────────────────────────
const EXAM_TIPS = [
  'Read every question carefully before writing anything.',
  'Show all working — method marks are awarded even if the final answer is wrong.',
  'If you finish early, go back and check your answers.',
  'For "show that" questions, write down every single step.',
  'Keep an eye on the clock — pace yourself across all questions.',
  'If stuck, move on and come back later. Don\'t waste time on one question.',
  'Check your calculator is in the right mode (degrees, not radians).',
  'Underline key information in each question.',
]

function ExamLoadingScreen({ board, tier, name, questionCount, error, onBack }: {
  board: string; tier: string; name: string; questionCount: number; error: string; onBack: () => void
}) {
  const theme = BOARD_THEME[board] || BOARD_THEME.AQA
  const [tipIdx, setTipIdx] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (error) return
    const t1 = setInterval(() => setTipIdx(i => (i + 1) % EXAM_TIPS.length), 3500)
    const t2 = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [error])

  const progress = Math.min(95, 15 + (elapsed / (elapsed + 6)) * 80)

  if (error) {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.body }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ color: '#DC2626', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{error}</p>
          <button onClick={onBack} style={{ background: theme.bg, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>← Back to paper info</button>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.body }}>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: 440, padding: '0 24px' }}>
        {/* Board badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.15)', borderRadius: 999,
          padding: '6px 16px', marginBottom: 20,
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{board} ({theme.code})</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{tier}</span>
        </div>

        <div style={{ fontSize: 40, marginBottom: 16, animation: 'pulse 1.5s ease-in-out infinite' }}>📝</div>

        <p style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: '0 0 6px', fontFamily: font.display }}>
          Preparing your exam paper
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '0 0 24px' }}>
          {name} · {questionCount} questions
        </p>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 999, height: 8, overflow: 'hidden', maxWidth: 320, margin: '0 auto 10px' }}>
          <div style={{
            height: '100%', borderRadius: 999,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))',
            width: `${progress}%`, transition: 'width 1s ease-out',
          }} />
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: '0 0 28px' }}>
          {elapsed < 8 ? 'This takes 10-15 seconds for a full paper...' : `${elapsed}s — almost ready...`}
        </p>

        {/* Tip card */}
        <div style={{
          background: 'rgba(255,255,255,0.1)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)',
          padding: '14px 18px', animation: 'fadeIn 0.5s ease', minHeight: 56,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }} key={tipIdx}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, margin: '0 0 5px' }}>Exam tip</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, margin: 0 }}>{EXAM_TIPS[tipIdx]}</p>
        </div>
      </div>
    </main>
  )
}

// ── Main page ────────────────────────────────────────────────
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

  const theme = BOARD_THEME[paper?.board ?? 'AQA'] || BOARD_THEME.AQA

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
          examBoard: paper.board, tier: paper.tier, count: paper.questionCount,
          paperStyle: true, paperName: paper.name, topics: paper.topics,
          style: paper.style, calculator: paper.calculator,
        }),
      })
      const data = await res.json()
      if (data.error || !data.questions) { setLoadError(data.error || 'Failed to generate questions'); return }
      setQuestions(data.questions)
      setAnswers(new Array(data.questions.length).fill(''))
      setTimeLeft(paper.timeMinutes * 60)
      setCurrent(0)
      setPhase('exam')
    } catch {
      setLoadError('Network error — please try again.')
    }
  }

  const handleSubmitExam = useCallback(async () => {
    setPhase('marking')
    setResults([])
    setMarkingIdx(0)
  }, [])

  // Mark sequentially
  useEffect(() => {
    if (phase !== 'marking') return
    if (markingIdx >= questions.length) { setPhase('results'); return }
    const markNext = async () => {
      const q = questions[markingIdx]
      const ans = answers[markingIdx] || '(no answer)'
      try {
        const res = await fetch('/api/mark', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q.question, markScheme: q.markScheme, studentAnswer: ans, marks: q.marks, examBoard: paper?.board }),
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

  // Save to Supabase
  useEffect(() => {
    if (phase !== 'results' || results.length === 0 || !paper) return
    const save = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      await Promise.all(questions.map((q, i) =>
        supabase.from('attempts').insert({
          user_id: user.id, topic: 'Exam Paper',
          subtopic: `${paper.board} ${paper.tier} ${paper.name}`,
          year_group: '', exam_board: paper.board, tier: paper.tier,
          question: q.question, student_answer: answers[i] || '',
          score: results[i]?.score ?? 0, out_of: results[i]?.outOf ?? q.marks,
          feedback: results[i]?.feedback ?? '',
        })
      ))
    }
    save()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  if (!paper) {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#374151', marginBottom: 12 }}>Paper not found</p>
          <button onClick={() => router.push('/papers')} style={{ color: '#6D28D9', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>← Back to papers</button>
        </div>
      </main>
    )
  }

  const totalScore = results.reduce((s, r) => s + (r?.score ?? 0), 0)
  const totalMarks = results.reduce((s, r) => s + (r?.outOf ?? 0), 0)
  const pct = totalMarks > 0 ? Math.round((totalScore / totalMarks) * 100) : 0
  const grade = estimateGrade(totalScore, paper.totalMarks, paper.tier)
  const gradeColor = ['8', '9'].includes(grade) ? '#059669' : ['6', '7'].includes(grade) ? '#2563EB' : ['4', '5'].includes(grade) ? '#D97706' : '#DC2626'

  // ── INFO ────────────────────────────────────────────────────
  if (phase === 'info') {
    return (
      <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: font.body }}>
        {/* Board header */}
        <div style={{ background: theme.bg, padding: '32px 24px', textAlign: 'center', color: theme.text }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.15)', borderRadius: 999,
            padding: '4px 14px', fontSize: 12, fontWeight: 700, marginBottom: 12,
          }}>
            {paper.board} ({theme.code}) · {paper.tier}
          </div>
          <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 800, margin: '0 0 6px' }}>{paper.name}</h1>
          <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
            {paper.calculator ? 'Calculator allowed' : 'Non-calculator'} · {paper.timeMinutes} minutes
          </p>
        </div>

        <div style={{ maxWidth: 520, margin: '0 auto', padding: '28px 24px' }}>
          {/* Exam info card */}
          <div style={{ background: '#fff', borderRadius: 16, border: `1.5px solid ${theme.border}`, padding: '24px', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {[
                { icon: '📝', label: 'Questions', val: `${paper.questionCount}` },
                { icon: '🎯', label: 'Total marks', val: `${paper.totalMarks}` },
                { icon: '⏱', label: 'Time', val: `${paper.timeMinutes} min` },
                { icon: paper.calculator ? '🖩' : '✏️', label: 'Calculator', val: paper.calculator ? 'Yes' : 'No' },
              ].map(item => (
                <div key={item.label} style={{
                  background: theme.light, border: `1px solid ${theme.border}`,
                  borderRadius: 12, padding: '14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: theme.bg, fontFamily: font.display }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{item.label}</div>
                </div>
              ))}
            </div>

            {!paper.calculator && (
              <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: '#92400E', margin: 0, fontWeight: 600 }}>
                  Put your calculator away before starting this paper.
                </p>
              </div>
            )}

            {/* Exam rules */}
            <div style={{ background: '#F9FAFB', borderRadius: 10, padding: '12px 14px' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#374151', margin: '0 0 6px' }}>Exam conditions</p>
              <ul style={{ fontSize: 12, color: '#6B7280', margin: 0, paddingLeft: 16, lineHeight: 1.7 }}>
                <li>Timer starts when you begin — pace yourself</li>
                <li>You can navigate between questions freely</li>
                <li>Unanswered questions score 0 marks</li>
                <li>Show all working for method marks</li>
              </ul>
            </div>
          </div>

          {/* PDF option */}
          {paper.pdfUrl && (
            <div style={{ background: '#fff', border: `1.5px solid ${theme.border}`, borderRadius: 14, padding: '16px', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: theme.bg, margin: '0 0 8px' }}>Real past paper available</p>
              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 10px' }}>View the actual {paper.board} paper alongside AI-generated questions.</p>
              <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', padding: '9px', borderRadius: 8, textAlign: 'center',
                background: theme.accent, color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none',
              }}>Open PDF in new tab</a>
            </div>
          )}

          {loadError && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#DC2626', margin: 0 }}>{loadError}</p>
            </div>
          )}

          <button onClick={startExam} style={{
            width: '100%', padding: '16px', borderRadius: 12, border: 'none',
            background: `linear-gradient(135deg, ${theme.bg}, ${theme.accent})`,
            color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', fontFamily: font.body,
            boxShadow: `0 4px 20px ${theme.bg}40`,
          }}>
            Begin exam
          </button>
          <button onClick={() => router.push('/papers')} style={{ display: 'block', width: '100%', marginTop: 12, background: 'none', border: 'none', fontSize: 13, color: '#9CA3AF', cursor: 'pointer', textAlign: 'center' }}>
            ← Back to papers
          </button>
        </div>
      </main>
    )
  }

  // ── LOADING ─────────────────────────────────────────────────
  if (phase === 'loading') {
    return <ExamLoadingScreen board={paper.board} tier={paper.tier} name={paper.name} questionCount={paper.questionCount} error={loadError} onBack={() => { setLoadError(''); setPhase('info') }} />
  }

  // ── EXAM ────────────────────────────────────────────────────
  if (phase === 'exam') {
    const q = questions[current]
    const urgent = timeLeft < 300
    const critical = timeLeft < 60
    const answeredCount = answers.filter(a => a.trim()).length
    const timeProgress = paper.timeMinutes * 60 > 0 ? ((paper.timeMinutes * 60 - timeLeft) / (paper.timeMinutes * 60)) * 100 : 0

    return (
      <main style={{ minHeight: '100vh', background: '#F3F4F6', fontFamily: font.body }}>
        {/* ── Exam header bar ── */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 100,
          background: theme.bg, color: theme.text,
          padding: '0', borderBottom: '2px solid rgba(255,255,255,0.1)',
        }}>
          {/* Top row: board info + timer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{paper.board} {paper.tier}</span>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{paper.name}</span>
              {paper.pdfUrl && (
                <button onClick={() => setPdfOpen(o => !o)} style={{
                  padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.3)',
                  background: pdfOpen ? 'rgba(255,255,255,0.2)' : 'transparent',
                  color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                }}>
                  {pdfOpen ? 'Hide PDF' : 'View PDF'}
                </button>
              )}
            </div>

            {/* Timer - prominent */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: critical ? '#DC2626' : urgent ? 'rgba(220,38,38,0.2)' : 'rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '6px 14px',
              animation: critical ? 'pulse 1s ease-in-out infinite' : 'none',
            }}>
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }`}</style>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="8" y1="9" x2="8" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="9" x2="10" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="6" y1="2" x2="10" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span style={{
                fontSize: 18, fontWeight: 800, fontFamily: 'monospace',
                fontVariantNumeric: 'tabular-nums', letterSpacing: 1,
              }}>
                {fmt(timeLeft)}
              </span>
            </div>
          </div>

          {/* Second row: question nav + submit */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '6px 20px 10px', gap: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, opacity: 0.6, marginRight: 4 }}>Q:</span>
              {questions.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: 26, height: 26, borderRadius: 5, border: 'none', cursor: 'pointer',
                  background: i === current ? '#fff' : answers[i]?.trim() ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)',
                  color: i === current ? theme.bg : answers[i]?.trim() ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontSize: 10, fontWeight: 700,
                }}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, opacity: 0.6 }}>{answeredCount}/{questions.length} answered</span>
              <button onClick={handleSubmitExam} style={{
                padding: '6px 14px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.3)',
                background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>
                Submit exam
              </button>
            </div>
          </div>

          {/* Time progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.1)' }}>
            <div style={{
              height: 3, transition: 'width 1s linear',
              background: critical ? '#EF4444' : urgent ? '#F59E0B' : 'rgba(255,255,255,0.4)',
              width: `${timeProgress}%`,
            }} />
          </div>
        </div>

        {/* PDF viewer */}
        {paper.pdfUrl && pdfOpen && (
          <div style={{ background: theme.light, borderBottom: `2px solid ${theme.border}`, padding: '12px 24px' }}>
            <iframe src={paper.pdfUrl} title="Past paper PDF" style={{ width: '100%', height: 550, border: 'none', borderRadius: 8, background: '#fff' }} />
          </div>
        )}

        {/* Question area */}
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '28px 24px 60px' }}>

          {/* Question card — exam paper style */}
          <div style={{
            background: '#fff', borderRadius: 4, border: '1px solid #D1D5DB',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)', padding: '32px 28px', marginBottom: 16,
          }}>
            {/* Question number + marks — like a real exam */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <span style={{
                fontSize: 15, fontWeight: 800, color: theme.bg, fontFamily: font.display,
              }}>
                {current + 1}
              </span>
              <span style={{ fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>
                ({q.marks} mark{q.marks !== 1 ? 's' : ''})
              </span>
            </div>

            {/* Question text */}
            <div style={{
              fontSize: 15, color: '#111827', lineHeight: 1.7,
              whiteSpace: 'pre-wrap', marginBottom: 24,
              fontFamily: font.body,
            }}>
              {q.question}
            </div>

            {/* Answer lines — mimicking exam paper */}
            <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 16 }}>
              <textarea
                value={answers[current]}
                onChange={e => {
                  const updated = [...answers]
                  updated[current] = e.target.value
                  setAnswers(updated)
                }}
                placeholder="Write your working and answer here..."
                rows={6}
                style={{
                  width: '100%', border: '1px solid #D1D5DB', borderRadius: 4,
                  padding: '12px 14px', fontSize: 14, resize: 'vertical',
                  fontFamily: font.body, outline: 'none', boxSizing: 'border-box',
                  lineHeight: 1.8,
                  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E5E7EB 27px, #E5E7EB 28px)',
                  backgroundPositionY: 12,
                }}
              />
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10 }}>
            {current > 0 && (
              <button onClick={() => setCurrent(i => i - 1)} style={{
                padding: '12px 20px', borderRadius: 8, border: '1.5px solid #D1D5DB',
                background: '#fff', color: '#374151', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>← Previous</button>
            )}
            {current < questions.length - 1 ? (
              <button onClick={() => setCurrent(i => i + 1)} style={{
                flex: 1, padding: '12px', borderRadius: 8, border: 'none',
                background: theme.bg, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>Next question →</button>
            ) : (
              <button onClick={handleSubmitExam} style={{
                flex: 1, padding: '12px', borderRadius: 8, border: 'none',
                background: '#059669', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}>Submit exam</button>
            )}
          </div>
        </div>
      </main>
    )
  }

  // ── MARKING ─────────────────────────────────────────────────
  if (phase === 'marking') {
    const markPct = questions.length > 0 ? (markingIdx / questions.length) * 100 : 0
    return (
      <main style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: font.body }}>
        <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ color: '#fff', fontWeight: 800, fontSize: 20, margin: '0 0 6px', fontFamily: font.display }}>Marking your exam</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '0 0 24px' }}>
            Question {Math.min(markingIdx + 1, questions.length)} of {questions.length}
          </p>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 999, height: 8, overflow: 'hidden', maxWidth: 300, margin: '0 auto' }}>
            <div style={{ height: '100%', borderRadius: 999, background: 'rgba(255,255,255,0.8)', width: `${markPct}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      </main>
    )
  }

  // ── RESULTS ─────────────────────────────────────────────────
  return (
    <main style={{ minHeight: '100vh', background: '#F3F4F6', fontFamily: font.body }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>

        {/* Score hero */}
        <div style={{
          background: `linear-gradient(135deg, ${gradeColor}ee, ${gradeColor}cc)`,
          borderRadius: 20, padding: '36px', textAlign: 'center', color: '#fff', marginBottom: 24,
        }}>
          <p style={{ fontSize: 13, opacity: 0.85, margin: '0 0 6px' }}>{paper.board} ({theme.code}) · {paper.tier} · {paper.name}</p>
          <div style={{ fontSize: 56, fontWeight: 900, fontFamily: font.display, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 16, opacity: 0.9, margin: '8px 0 4px' }}>{totalScore} / {paper.totalMarks} marks</div>
          <div style={{
            display: 'inline-block', background: 'rgba(255,255,255,0.25)',
            borderRadius: 999, padding: '4px 20px', fontSize: 18, fontWeight: 800, marginTop: 8,
          }}>
            Grade {grade}
          </div>
        </div>

        {/* Grade boundaries */}
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '18px', marginBottom: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', margin: '0 0 10px' }}>Grade boundaries (approximate)</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(paper.tier === 'Foundation'
              ? [['5', '85%'], ['4', '70%'], ['3', '55%'], ['2', '40%']]
              : [['9', '80%'], ['8', '70%'], ['7', '60%'], ['6', '50%'], ['5', '40%'], ['4', '30%']]
            ).map(([g, p]) => (
              <div key={g} style={{
                padding: '5px 12px', borderRadius: 8, border: '1px solid #E5E7EB',
                background: grade === g ? gradeColor : '#F9FAFB',
                color: grade === g ? '#fff' : '#374151', fontSize: 13,
              }}>
                <span style={{ fontWeight: 700 }}>{g}</span>
                <span style={{ marginLeft: 4, opacity: 0.7, fontSize: 11 }}>{p}+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Question breakdown */}
        <h2 style={{ fontFamily: font.display, fontSize: 18, fontWeight: 800, color: '#111827', marginBottom: 14 }}>Question breakdown</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {questions.map((q, i) => {
            const r = results[i]
            if (!r) return null
            const full = r.score === r.outOf
            const zero = r.score === 0
            const bc = full ? '#059669' : zero ? '#DC2626' : '#D97706'
            return (
              <div key={i} style={{ background: '#fff', border: `1.5px solid ${bc}33`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ background: full ? '#F0FDF4' : zero ? '#FEF2F2' : '#FFFBEB', padding: '10px 14px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>Q{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: bc }}>{r.score}/{r.outOf}</span>
                </div>
                <div style={{ padding: '10px 14px' }}>
                  <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 4px', fontStyle: 'italic' }}>{q.question.slice(0, 120)}{q.question.length > 120 ? '...' : ''}</p>
                  <p style={{ fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5 }}>{r.feedback}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button onClick={() => router.push('/papers')} style={{
            flex: 1, padding: '13px', borderRadius: 10, border: '1.5px solid #E5E7EB',
            background: '#fff', color: theme.bg, fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>← All papers</button>
          <button onClick={() => { setPhase('info'); setQuestions([]); setAnswers([]); setResults([]) }} style={{
            flex: 1, padding: '13px', borderRadius: 10, border: 'none',
            background: `linear-gradient(135deg, ${theme.bg}, ${theme.accent})`,
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}>Retake paper</button>
        </div>
      </div>
    </main>
  )
}
