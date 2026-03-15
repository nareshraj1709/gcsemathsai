'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

// ── Types ────────────────────────────────────────────────────────────────────

type Difficulty = 'easy' | 'medium' | 'exam-level'
type Phase = 'idle' | 'config' | 'loading' | 'quiz' | 'complete'

interface Question {
  id: number
  question: string
  answer: string
  explanation: string
}

interface AnswerState {
  value: string
  checked: boolean
  correct: boolean | null
  showExplanation: boolean
}

interface Props {
  /** Internal topic identifier sent to the API, e.g. "simultaneous_equations" */
  topic: string
  /** URL-friendly slug for the /practice/ link, e.g. "simultaneous-equations" */
  topicSlug: string
  /** Human-readable label shown in the UI, e.g. "Simultaneous Equations" */
  topicLabel?: string
}

// ── Constants ────────────────────────────────────────────────────────────────

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; desc: string }[] = [
  { value: 'easy',       label: 'Easy',       desc: 'Single-step · Foundation tier' },
  { value: 'medium',     label: 'Medium',     desc: 'Multi-step · Mixed tier'       },
  { value: 'exam-level', label: 'Exam Level', desc: 'Higher tier · Exam style'      },
]

const COUNT_OPTIONS = [5, 10, 20]

// ── Helpers ──────────────────────────────────────────────────────────────────

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[×·]/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
}

function checkAnswer(student: string, correct: string): boolean {
  const s = normalize(student)
  const c = normalize(correct)
  if (s === c) return true
  // Handle comma-separated multi-part answers in any order: "x=2,y=5" == "y=5,x=2"
  const sParts = s.split(',').sort()
  const cParts = c.split(',').sort()
  return sParts.join(',') === cParts.join(',')
}

function scoreMessage(score: number, total: number): string {
  const pct = score / total
  if (pct === 1)   return 'Perfect score — outstanding work!'
  if (pct >= 0.8)  return 'Excellent — nearly there!'
  if (pct >= 0.6)  return 'Good work! Keep practising.'
  if (pct >= 0.4)  return 'Getting there — review the explanations below.'
  return 'Keep practising — every attempt builds understanding.'
}

// ── Component ────────────────────────────────────────────────────────────────

export default function QuickQuizGenerator({ topic, topicSlug, topicLabel }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')
  const [count, setCount] = useState(5)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<number, AnswerState>>({})
  const [error, setError] = useState('')
  const quizRef = useRef<HTMLDivElement>(null)

  const label = topicLabel ?? topic.replace(/_/g, ' ')

  // ── Actions ──────────────────────────────────────────────────────────────

  const startQuiz = async () => {
    setPhase('loading')
    setError('')
    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, questionCount: count }),
      })
      if (!res.ok) throw new Error('Failed to generate quiz. Please try again.')
      const data = await res.json()
      if (!data.questions?.length) throw new Error('No questions returned. Please try again.')

      setQuestions(data.questions)
      setAnswers(
        Object.fromEntries(
          data.questions.map((q: Question) => [
            q.id,
            { value: '', checked: false, correct: null, showExplanation: false },
          ])
        )
      )
      setPhase('quiz')
      setTimeout(() => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setPhase('config')
    }
  }

  const submitAnswer = (id: number) => {
    const q = questions.find(q => q.id === id)
    if (!q || !answers[id]?.value.trim()) return
    const correct = checkAnswer(answers[id].value, q.answer)
    setAnswers(prev => ({
      ...prev,
      [id]: { ...prev[id], checked: true, correct, showExplanation: !correct },
    }))
  }

  const toggleExplanation = (id: number) => {
    setAnswers(prev => ({
      ...prev,
      [id]: { ...prev[id], showExplanation: !prev[id].showExplanation },
    }))
  }

  const allChecked = questions.length > 0 && questions.every(q => answers[q.id]?.checked)
  const score = questions.filter(q => answers[q.id]?.correct === true).length

  const reset = () => {
    setPhase('idle')
    setQuestions([])
    setAnswers({})
    setError('')
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div ref={quizRef} className="mt-12 scroll-mt-24">

      {/* ── IDLE ── */}
      {phase === 'idle' && (
        <div className="rounded-2xl border border-purple-100 bg-purple-50 p-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            ✦ Quick Quiz
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
            Test Yourself
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Want to try a quick quiz on <span className="font-semibold text-gray-700">{label}</span>?
          </p>
          <button
            onClick={() => setPhase('config')}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Generate Quiz →
          </button>
        </div>
      )}

      {/* ── CONFIG ── */}
      {phase === 'config' && (
        <div className="rounded-2xl border border-purple-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
              Set up your quiz
            </h3>
            <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600">✕ Cancel</button>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Difficulty</p>
            <div className="grid grid-cols-3 gap-3">
              {DIFFICULTY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setDifficulty(opt.value)}
                  className={`rounded-xl border-2 p-3 text-left transition ${
                    difficulty === opt.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <p className={`text-sm font-bold ${difficulty === opt.value ? 'text-purple-700' : 'text-gray-800'}`}>
                    {difficulty === opt.value ? '✓ ' : ''}{opt.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Question count */}
          <div className="mb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">Number of Questions</p>
            <div className="flex gap-3">
              {COUNT_OPTIONS.map(n => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-bold transition ${
                    count === n
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}

          <button
            onClick={startQuiz}
            className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 py-3.5 text-sm font-bold text-white shadow transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Start Quiz →
          </button>
        </div>
      )}

      {/* ── LOADING ── */}
      {phase === 'loading' && (
        <div className="rounded-2xl border border-purple-100 bg-white p-12 text-center shadow-sm">
          <div className="mb-4 inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
          <p className="text-sm font-semibold text-gray-600">Generating your quiz…</p>
          <p className="mt-1 text-xs text-gray-400">This takes a few seconds</p>
        </div>
      )}

      {/* ── QUIZ ── */}
      {phase === 'quiz' && (
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50 px-6 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400">Quick Quiz</p>
              <p className="font-bold text-gray-900">{label}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">{count} questions · <span className="capitalize">{difficulty.replace('-', ' ')}</span></p>
              <p className="mt-0.5 text-xs text-purple-600 font-semibold">
                {questions.filter(q => answers[q.id]?.checked).length}/{count} answered
              </p>
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, idx) => {
            const ans = answers[q.id]
            return (
              <div
                key={q.id}
                className={`rounded-2xl border-2 bg-white p-6 transition ${
                  ans?.checked
                    ? ans.correct
                      ? 'border-green-200 bg-green-50/30'
                      : 'border-red-200 bg-red-50/30'
                    : 'border-gray-200'
                }`}
              >
                {/* Question header */}
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {q.question}
                  </p>
                </div>

                {/* Answer input + result */}
                {!ans?.checked ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={ans?.value ?? ''}
                      onChange={e =>
                        setAnswers(prev => ({
                          ...prev,
                          [q.id]: { ...prev[q.id], value: e.target.value },
                        }))
                      }
                      onKeyDown={e => e.key === 'Enter' && submitAnswer(q.id)}
                      placeholder="Your answer…"
                      className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-purple-500"
                    />
                    <button
                      onClick={() => submitAnswer(q.id)}
                      disabled={!ans?.value.trim()}
                      className="rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Check
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Verdict */}
                    <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                      ans.correct ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div>
                        <span className={`text-sm font-bold ${ans.correct ? 'text-green-700' : 'text-red-700'}`}>
                          {ans.correct ? '✅ Correct!' : '❌ Incorrect'}
                        </span>
                        {!ans.correct && (
                          <span className="ml-2 text-sm text-gray-600">
                            Answer: <span className="font-semibold text-gray-800">{q.answer}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">Your answer: {ans.value}</span>
                    </div>

                    {/* Step-by-step toggle */}
                    <button
                      onClick={() => toggleExplanation(q.id)}
                      className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition"
                    >
                      {ans.showExplanation ? '▲ Hide' : '▼ View'} step-by-step solution
                    </button>

                    {ans.showExplanation && (
                      <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-purple-400">Solution</p>
                        <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* See results button */}
          {allChecked && (
            <button
              onClick={() => setPhase('complete')}
              className="w-full rounded-2xl bg-gradient-to-r from-purple-700 to-purple-500 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              See My Results →
            </button>
          )}
        </div>
      )}

      {/* ── COMPLETE ── */}
      {phase === 'complete' && (
        <div className="rounded-2xl border border-purple-100 bg-white p-8 text-center shadow-sm">
          {/* Score ring */}
          <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-700 to-purple-400 shadow-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-white leading-none">{score}</p>
              <p className="text-xs text-purple-200">of {count}</p>
            </div>
          </div>

          <h3 className="mb-1 text-xl font-bold text-gray-900" style={{ fontFamily: "'Georgia', serif" }}>
            You scored {score} out of {count}
          </h3>
          <p className="mb-2 text-sm text-gray-500">{scoreMessage(score, count)}</p>

          {/* Mini score bar */}
          <div className="mx-auto mb-8 h-2 w-48 rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-700 to-purple-400 transition-all"
              style={{ width: `${(score / count) * 100}%` }}
            />
          </div>

          {/* Per-question summary */}
          <div className="mb-8 grid grid-cols-5 gap-1.5">
            {questions.map((q, i) => (
              <div
                key={q.id}
                title={`Q${i + 1}: ${answers[q.id]?.correct ? 'Correct' : 'Incorrect'}`}
                className={`rounded-lg py-2 text-xs font-bold ${
                  answers[q.id]?.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}
              >
                Q{i + 1}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="space-y-3">
            <Link
              href={`/practice/${topicSlug}`}
              className="block w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-500 py-3.5 text-sm font-bold text-white shadow transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Practice More Questions →
            </Link>
            <button
              onClick={reset}
              className="w-full rounded-xl border-2 border-gray-200 py-3 text-sm font-semibold text-gray-600 transition hover:border-purple-300 hover:text-purple-700"
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
