'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 1,
    topic: 'Algebra',
    question: 'Solve 3x + 7 = 22',
    markScheme: 'x = 5. Award 1 mark for correct rearrangement (3x = 15) and 1 mark for correct answer (x = 5).',
    marks: 2,
  },
  {
    id: 2,
    topic: 'Number',
    question: 'Work out 15% of 340',
    markScheme: 'Answer: 51. Award 1 mark for a correct method (e.g. 0.15 × 340 or finding 10% + 5%) and 1 mark for the correct answer.',
    marks: 2,
  },
  {
    id: 3,
    topic: 'Geometry',
    question: 'A rectangle has length 12 cm and width 7 cm. Calculate the area.',
    markScheme: 'Area = 84 cm². Award 1 mark for correct method (length × width) and 1 mark for correct answer with units.',
    marks: 2,
  },
  {
    id: 4,
    topic: 'Algebra',
    question: 'Expand and simplify: 3(2x + 4) − 2(x − 1)',
    markScheme: '4x + 14. Award 1 mark for correct expansion of each bracket and 1 mark for correct simplification.',
    marks: 2,
  },
  {
    id: 5,
    topic: 'Ratio',
    question: 'Share £120 in the ratio 3:5',
    markScheme: '£45 and £75. Award 1 mark for identifying one part = £15 and 1 mark for both correct values.',
    marks: 2,
  },
]

type MarkResult = {
  score: number
  outOf: number
  feedback: string
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center"><p className="text-purple-700 font-semibold">Loading...</p></div>}>
      <Practice />
    </Suspense>
  )
}

function Practice() {
  const searchParams = useSearchParams()
  const [qIndex, setQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<MarkResult | null>(null)
  const [error, setError] = useState('')

  const q = QUESTIONS[qIndex]

  const saveAttempt = async (
    question: string,
    studentAnswer: string,
    score: number,
    outOf: number,
    feedback: string
  ) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('attempts').insert({
      user_id: user.id,
      topic: searchParams.get('topic') || q.topic,
      subtopic: searchParams.get('subtopic') || '',
      year_group: searchParams.get('year') || '',
      exam_board: searchParams.get('board') || '',
      tier: searchParams.get('tier') || '',
      question,
      student_answer: studentAnswer,
      score,
      out_of: outOf,
      feedback,
    })
  }

  const submitAnswer = async () => {
    if (!answer.trim()) return
    setLoading(true)
    setResult(null)
    setError('')

    try {
      const res = await fetch('/api/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          markScheme: q.markScheme,
          studentAnswer: answer,
          marks: q.marks,
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setResult(data)
      await saveAttempt(q.question, answer, data.score, data.outOf, data.feedback)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextQuestion = () => {
    setAnswer('')
    setResult(null)
    setError('')
    setQIndex((qIndex + 1) % QUESTIONS.length)
  }

  const scoreColor = result
    ? result.score === result.outOf
      ? 'text-green-600 bg-green-50 border-green-200'
      : result.score === 0
      ? 'text-red-600 bg-red-50 border-red-200'
      : 'text-yellow-600 bg-yellow-50 border-yellow-200'
    : ''

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-700">GCSEMathsAI</Link>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-sm text-purple-700 font-semibold">Dashboard</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-purple-600 font-semibold bg-purple-100 px-3 py-1 rounded-full">
            {q.topic}
          </span>
          <span className="text-sm text-gray-400">Question {qIndex + 1} of {QUESTIONS.length}</span>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex-1">{q.question}</h2>
            <span className="ml-4 text-sm text-gray-400 shrink-0">{q.marks} marks</span>
          </div>

          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Write your answer and working here..."
            rows={4}
            disabled={!!result}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500 resize-none disabled:bg-gray-50 disabled:text-gray-500"
          />

          {!result && (
            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              className="mt-4 w-full bg-purple-700 text-white rounded-xl py-3 font-bold text-sm hover:bg-purple-800 transition disabled:opacity-50"
            >
              {loading ? 'Marking...' : 'Submit answer'}
            </button>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className={`rounded-2xl border p-6 mb-6 ${scoreColor}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-lg">
                {result.score}/{result.outOf} marks
              </span>
              <span className="text-sm font-semibold">
                {result.score === result.outOf ? 'Full marks!' : result.score === 0 ? 'Needs work' : 'Partially correct'}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{result.feedback}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-sm mb-6">
            {error}
          </div>
        )}

        {result && (
          <button
            onClick={nextQuestion}
            className="w-full bg-purple-700 text-white rounded-xl py-3 font-bold text-sm hover:bg-purple-800 transition"
          >
            Next question →
          </button>
        )}
      </div>
    </main>
  )
}
