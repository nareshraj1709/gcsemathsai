'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Attempt = {
  id: string
  topic: string
  score: number
  out_of: number
  feedback: string
  created_at: string
}

export default function Dashboard() {
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/auth'; return }
      setEmail(user.email ?? '')

      const { data } = await supabase
        .from('practice_attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      setAttempts(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const totalAttempts = attempts.length
  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalPossible = attempts.reduce((s, a) => s + a.out_of, 0)
  const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const topicStats = attempts.reduce<Record<string, { score: number; outOf: number; count: number }>>((acc, a) => {
    if (!acc[a.topic]) acc[a.topic] = { score: 0, outOf: 0, count: 0 }
    acc[a.topic].score += a.score
    acc[a.topic].outOf += a.out_of
    acc[a.topic].count += 1
    return acc
  }, {})

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
        <p className="text-purple-600 font-semibold">Loading...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-purple-700">GCSEMathsAI</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{email}</span>
          <button onClick={signOut} className="text-sm text-gray-400 hover:text-gray-600">Sign out</button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-purple-900">Your progress</h1>
          <Link
            href="/practice"
            className="px-5 py-2 bg-purple-700 text-white rounded-xl text-sm font-bold hover:bg-purple-800 transition"
          >
            Practice now →
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-extrabold text-purple-700">{totalAttempts}</p>
            <p className="text-sm text-gray-500 mt-1">Questions done</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-extrabold text-purple-700">{percentage}%</p>
            <p className="text-sm text-gray-500 mt-1">Overall score</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <p className="text-3xl font-extrabold text-purple-700">{totalScore}/{totalPossible}</p>
            <p className="text-sm text-gray-500 mt-1">Marks earned</p>
          </div>
        </div>

        {/* Topic breakdown */}
        {Object.keys(topicStats).length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="font-bold text-gray-700 mb-4">By topic</h2>
            <div className="space-y-3">
              {Object.entries(topicStats).map(([topic, stats]) => {
                const pct = Math.round((stats.score / stats.outOf) * 100)
                return (
                  <div key={topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700">{topic}</span>
                      <span className="text-gray-400">{pct}% · {stats.count} attempts</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-purple-500 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recent attempts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-700">Recent attempts</h2>
          </div>
          {attempts.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-400 mb-4">No attempts yet</p>
              <Link href="/practice" className="text-purple-700 font-semibold text-sm">Start practising →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {attempts.map(a => (
                <div key={a.id} className="px-6 py-4 flex items-start gap-4">
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-1 rounded-full ${
                      a.score === a.out_of
                        ? 'bg-green-100 text-green-700'
                        : a.score === 0
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {a.score}/{a.out_of}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700">{a.topic}</p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{a.feedback}</p>
                  </div>
                  <span className="shrink-0 text-xs text-gray-300">
                    {new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
