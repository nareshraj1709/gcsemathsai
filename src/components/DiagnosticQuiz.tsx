'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { trackLearning } from '@/lib/learning-events'
import { saveProgress } from '@/lib/learning-progress'
import type { DiagnosticMCQ } from '@/lib/diagnostic-mcqs/types'

interface Props {
  topicSlug: string
  topicTitle: string
  questions: DiagnosticMCQ[]
  nextTopic?: { slug: string; title: string }
  embedded?: boolean
}

type Phase = 'intro' | 'quiz' | 'results'

interface AnswerRecord {
  questionId: string
  selected: number
  correct: boolean
}

export default function DiagnosticQuiz({ topicSlug, topicTitle, questions, nextTopic, embedded = false }: Props) {
  const startedAt = useRef(0)
  const answerLock = useRef(false)
  const completionLock = useRef(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [phase, setPhase] = useState<Phase>('intro')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])

  const q = questions[current]
  const total = questions.length
  const score = answers.filter(a => a.correct).length

  const handleSelect = (idx: number) => {
    if (revealed) return
    setSelected(idx)
  }

  const handleCheck = () => {
    if (selected === null || answerLock.current) return
    answerLock.current = true
    trackLearning('quiz_answer', topicSlug, { question_number: current + 1, correct: Number(selected === q.correctIndex) })
    setRevealed(true)
    setAnswers(prev => [...prev, {
      questionId: q.id,
      selected,
      correct: selected === q.correctIndex,
    }])
  }

  const handleNext = () => {
    if (!answerLock.current) return
    answerLock.current = false
    if (current + 1 >= total) {
      if (completionLock.current) return
      completionLock.current = true
      trackLearning('quiz_complete', topicSlug, { score, question_count: total, duration_seconds: Math.round((Date.now() - startedAt.current) / 1000) })
      setPhase('results')
    } else {
      answerLock.current = false
      setCurrent(prev => prev + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const restart = () => {
    trackLearning('quiz_retry', topicSlug)
    answerLock.current = false
    completionLock.current = false
    setSaveMessage('')
    setPhase('intro')
    setCurrent(0)
    setSelected(null)
    setRevealed(false)
    setAnswers([])
  }

  const pct = total > 0 ? Math.round((score / total) * 100) : 0

  if (phase === 'intro') {
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: '32px 28px', maxWidth: 640 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 12 }}>
          Diagnostic Quiz
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>
          {topicTitle}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20 }}>
          {total} multiple-choice questions designed to identify misconceptions. Use the explanations to understand any mistakes.
        </p>
        <p style={{ fontSize: 15, color: 'var(--ink)', marginBottom: 20 }}><strong>First question:</strong> {questions[0]?.question}</p>
        <button
          onClick={() => { startedAt.current = Date.now(); trackLearning('quiz_start', topicSlug, { question_count: total, placement: embedded ? 'topic' : 'diagnostic' }); setPhase('quiz') }}
          style={{
            background: 'var(--green)', color: 'var(--cream)', border: 'none', borderRadius: 10,
            padding: '12px 28px', fontSize: 15, fontWeight: 700, fontFamily: 'var(--sans)', cursor: 'pointer',
          }}
        >
          Start free quiz — no signup
        </button>
      </div>
    )
  }

  if (phase === 'results') {
    const message = pct === 100 ? 'All answers correct on this quiz. Try another topic next.'
      : pct >= 80 ? 'Strong understanding with minor gaps.'
      : pct >= 60 ? 'Some misconceptions to address — review the explanations below.'
      : 'Several gaps identified — targeted revision recommended.'
    const wrong = answers.filter(a => !a.correct)
    return (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: '32px 28px', maxWidth: 640 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 12 }}>
          Results
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px' }}>
          {score} / {total} correct ({pct}%)
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20 }}>{message}</p>

        {wrong.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--burgundy)', marginBottom: 10 }}>
              Misconceptions identified
            </p>
            {wrong.map(a => {
              const qData = questions.find(qq => qq.id === a.questionId)!
              return (
                <div key={a.questionId} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 10, padding: '14px 16px', marginBottom: 8 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px' }}>{qData.question}</p>
                  <p style={{ fontSize: 12, color: 'var(--burgundy)', margin: '0 0 4px' }}>
                    You chose: {qData.options[a.selected]} — Correct: {qData.options[qData.correctIndex]}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--ink-2)', margin: 0 }}>{qData.misconception}</p>
                </div>
              )
            })}
          </div>
        )}

        <p style={{ fontSize: 13, color: 'var(--ink-2)' }}>This short quiz checks these questions; it does not predict your exam grade.</p>
        <div className="learning-actions" style={{ marginBottom: 20 }}>
          <button type="button" className="btn btn-outline" onClick={() => setSaveMessage(saveProgress({ slug: topicSlug, title: topicTitle, score, total, completedAt: new Date().toISOString() }) ? 'Saved on this device. Return to the quiz hub to revisit it.' : 'Your browser could not save this result. You can still keep practising.')}>Save result on this device</button>
          <p role="status">{saveMessage}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
          <button onClick={restart} style={{
            background: 'var(--green)', color: 'var(--cream)', border: 'none', borderRadius: 10,
            padding: '10px 22px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--sans)', cursor: 'pointer',
          }}>
            Retry
          </button>
          <Link href={embedded ? '#worked-examples' : `/topics/${topicSlug}#worked-examples`} style={{
            display: 'inline-flex', alignItems: 'center', background: 'transparent', color: 'var(--green)',
            border: '1.5px solid var(--green)', borderRadius: 10, padding: '10px 22px', fontSize: 14,
            fontWeight: 600, fontFamily: 'var(--sans)', textDecoration: 'none',
          }}>
            {embedded ? 'Read the worked examples' : 'Revise this topic'}
          </Link>
          <Link className="btn btn-primary" href={nextTopic ? `/diagnostic/${nextTopic.slug}` : '/diagnostic'}>{nextTopic ? `Next: ${nextTopic.title}` : 'Choose another quiz'}</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: '32px 28px', maxWidth: 640 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>
          Question {current + 1} of {total} · {q.tier === 'Both' ? 'Foundation & Higher' : q.tier}
        </span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)' }}>
          {score} / {answers.length} so far
        </span>
      </div>

      <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.5, marginBottom: 16 }}>{q.question}</p>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8, marginBottom: 20 }}>
        {q.options.map((opt, idx) => {
          let bg = 'var(--cream)'
          let border = '1.5px solid var(--rule)'
          let color = 'var(--ink)'
          if (revealed && idx === q.correctIndex) {
            bg = '#e8f5e9'; border = '1.5px solid #4caf50'; color = '#2e7d32'
          } else if (revealed && idx === selected && idx !== q.correctIndex) {
            bg = '#ffebee'; border = '1.5px solid #ef5350'; color = '#c62828'
          } else if (!revealed && idx === selected) {
            bg = 'var(--navy-soft)'; border = '1.5px solid var(--navy)'
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={revealed}
              aria-pressed={selected === idx}
              style={{
                background: bg, border, borderRadius: 10, padding: '12px 16px', textAlign: 'left' as const,
                fontSize: 14, fontWeight: 500, color, cursor: revealed ? 'default' : 'pointer',
                fontFamily: 'var(--sans)', transition: 'all 0.15s',
              }}
            >
              <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div role="status" style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700 }}>{selected === q.correctIndex ? 'Correct.' : `Not quite. The correct answer is ${q.options[q.correctIndex]}.`}</p>
          <p style={{ fontSize: 13, color: 'var(--ink-2)', margin: 0, lineHeight: 1.55 }}>{q.explanation}</p>
        </div>
      )}

      {!revealed ? (
        <button onClick={handleCheck} disabled={selected === null} style={{
          background: selected === null ? 'var(--rule)' : 'var(--green)', color: 'var(--cream)',
          border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 700,
          fontFamily: 'var(--sans)', cursor: selected === null ? 'not-allowed' : 'pointer',
        }}>
          Check Answer
        </button>
      ) : (
        <button onClick={handleNext} style={{
          background: 'var(--navy)', color: 'var(--cream)', border: 'none', borderRadius: 10,
          padding: '10px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--sans)', cursor: 'pointer',
        }}>
          {current + 1 >= total ? 'See Results' : 'Next Question'}
        </button>
      )}
    </div>
  )
}
