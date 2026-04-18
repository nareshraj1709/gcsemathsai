'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getProfileFromCache } from '@/lib/profile'
import Footer from '@/components/Footer'

type Attempt = {
  id: string
  topic: string
  subtopic: string
  question: string
  student_answer: string
  score: number
  out_of: number
  feedback: string
  created_at: string
}

function calcStreak(attempts: Attempt[]): number {
  if (attempts.length === 0) return 0
  const uniqueDates = [...new Set(
    attempts.map(a => a.created_at.slice(0, 10))
  )].sort((a, b) => b.localeCompare(a))

  const today = new Date().toISOString().slice(0, 10)
  const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < uniqueDates.length; i++) {
    const diffMs = new Date(uniqueDates[i - 1]).getTime() - new Date(uniqueDates[i]).getTime()
    if (Math.round(diffMs / 864e5) === 1) streak++
    else break
  }
  return streak
}

type Profile = { name: string; year: string; board: string; goal: string }

// ── Syllabus categories ──────────────────────────────────────
const SYLLABUS_CATEGORIES = [
  { key: 'Number', label: 'Number', keywords: ['number', 'fraction', 'decimal', 'percentage', 'ratio', 'integer', 'hcf', 'lcm', 'prime', 'factor', 'rounding', 'estimation', 'standard form', 'surds', 'indices'] },
  { key: 'Algebra', label: 'Algebra', keywords: ['algebra', 'equation', 'expression', 'formula', 'inequality', 'sequence', 'graph', 'function', 'simultaneous', 'quadratic', 'linear', 'expand', 'factorise', 'simplif'] },
  { key: 'Ratio', label: 'Ratio', keywords: ['ratio', 'proportion', 'compound measure', 'speed', 'density', 'pressure', 'unit', 'convert', 'scale', 'growth', 'decay'] },
  { key: 'Geometry', label: 'Geometry', keywords: ['geometry', 'shape', 'angle', 'area', 'volume', 'perimeter', 'circle', 'triangle', 'polygon', 'transform', 'vector', 'pythagoras', 'trigonometry', 'symmetry', 'congruent', 'similar'] },
  { key: 'Statistics', label: 'Statistics', keywords: ['statistics', 'probability', 'data', 'average', 'mean', 'median', 'mode', 'range', 'chart', 'histogram', 'frequency', 'pie chart', 'scatter', 'cumulative', 'box plot', 'tree diagram', 'venn'] },
]

function classifyTopic(topicName: string): string {
  const lower = topicName.toLowerCase()
  for (const cat of SYLLABUS_CATEGORIES) {
    if (cat.keywords.some(kw => lower.includes(kw))) return cat.key
  }
  return 'Number' // default
}

export default function Dashboard() {
  const router = useRouter()
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  // ── XP + Level ────────────────────────────────────────────────
  function calcLevel(xp: number): { label: string; color: string; next: number; icon: string } {
    if (xp >= 3000) return { label: "Platinum", color: "#6366F1", next: 3000, icon: "💎" }
    if (xp >= 1500) return { label: "Gold", color: "#F59E0B", next: 3000, icon: "🥇" }
    if (xp >= 500)  return { label: "Silver", color: "#9CA3AF", next: 1500, icon: "🥈" }
    return { label: "Bronze", color: "#B45309", next: 500, icon: "🥉" }
  }

  // ── Grade predictor ──────────────────────────────────────────
  function predictGrade(avgPct: number, totalAttempts: number): string {
    if (totalAttempts < 3) return '--'
    if (avgPct >= 90) return '9'
    if (avgPct >= 80) return '8'
    if (avgPct >= 70) return '7'
    if (avgPct >= 60) return '6'
    if (avgPct >= 50) return '5'
    if (avgPct >= 40) return '4'
    if (avgPct >= 30) return '3'
    if (avgPct >= 20) return '2'
    return '1'
  }

  // ── Badges ────────────────────────────────────────────────────
  function calcBadges(
    totalAttempts: number, streak: number, topicsMastered: number,
    attempts: Attempt[]
  ) {
    const hasPerfect = attempts.some(a => a.score > 0 && a.score === a.out_of)
    return [
      { id: "first",   icon: "🚀", label: "First Steps",    earned: totalAttempts >= 1 },
      { id: "roll",    icon: "🔥", label: "On a Roll",      earned: streak >= 3 },
      { id: "warrior", icon: "⚔️", label: "Week Warrior",   earned: streak >= 7 },
      { id: "perfect", icon: "💯", label: "Perfect Score",  earned: hasPerfect },
      { id: "master",  icon: "🏆", label: "Topic Master",   earned: topicsMastered >= 1 },
      { id: "century", icon: "💪", label: "Century Club",   earned: totalAttempts >= 100 },
    ]
  }

  useEffect(() => {
    const cached = getProfileFromCache()
    if (cached) setProfile(cached as Profile)

    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }
      const user = session.user

      const { data } = await supabase
        .from('attempts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(100)

      setAttempts(data ?? [])
      setLoading(false)
    }
    load()
  }, [router])

  // Derived stats
  const totalAttempts = attempts.length
  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalPossible = attempts.reduce((s, a) => s + a.out_of, 0)
  const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const streak = calcStreak(attempts)

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weeklyCount = attempts.filter(a => new Date(a.created_at) > weekAgo).length

  // Estimate hours: ~2 min per attempt
  const hoursThisWeek = Math.round((weeklyCount * 2) / 60 * 10) / 10

  const topicStats = attempts.reduce<Record<string, { score: number; outOf: number; count: number }>>((acc, a) => {
    if (!acc[a.topic]) acc[a.topic] = { score: 0, outOf: 0, count: 0 }
    acc[a.topic].score += a.score
    acc[a.topic].outOf += a.out_of
    acc[a.topic].count += 1
    return acc
  }, {})

  const topicList = Object.entries(topicStats).map(([name, s]) => ({
    name,
    score: Math.round((s.score / s.outOf) * 100),
    count: s.count,
  })).sort((a, b) => b.score - a.score)

  const topicsMastered = topicList.filter(t => t.score >= 80).length

  const weakTopics = [...topicList].sort((a, b) => a.score - b.score).slice(0, 5)

  const recentFive = attempts.slice(0, 5)

  const name = profile?.name || "Student"
  const board = profile?.board || "AQA"
  const year = profile?.year || "Year 11"

  // XP + level
  const xp = totalScore * 10
  const level = calcLevel(xp)
  const xpMin = level.label === "Bronze" ? 0 : level.label === "Silver" ? 500 : level.label === "Gold" ? 1500 : 3000
  const xpPct = level.label === "Platinum" ? 100 : Math.min(100, Math.round(((xp - xpMin) / (level.next - xpMin)) * 100))

  // Badges
  const badges = calcBadges(totalAttempts, streak, topicsMastered, attempts)

  // Predicted grade
  const predictedGrade = predictGrade(avgPct, totalAttempts)

  // Days to exam (GCSE maths typically late May/early June)
  const examDate = new Date(now.getFullYear(), 4, 20) // May 20
  const daysToExam = Math.max(0, Math.ceil((examDate.getTime() - now.getTime()) / 864e5))
  const examPassed = daysToExam === 0

  // Date formatting
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  // 7-day calendar for revision log
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now.getTime() - (6 - i) * 864e5)
    const dateKey = d.toISOString().slice(0, 10)
    const dayAttempts = attempts.filter(a => a.created_at.slice(0, 10) === dateKey)
    return {
      day: d.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 2),
      date: d.getDate(),
      count: dayAttempts.length,
      isToday: dateKey === now.toISOString().slice(0, 10),
    }
  })

  // Weekly stats
  const weekAttempts = attempts.filter(a => new Date(a.created_at) > weekAgo)
  const weekScore = weekAttempts.reduce((s, a) => s + a.score, 0)
  const weekPossible = weekAttempts.reduce((s, a) => s + a.out_of, 0)
  const weekAccuracy = weekPossible > 0 ? Math.round((weekScore / weekPossible) * 100) : 0

  // Syllabus progress per category
  const syllabusProgress = SYLLABUS_CATEGORIES.map(cat => {
    const catTopics = topicList.filter(t => classifyTopic(t.name) === cat.key)
    const totalQuestions = catTopics.reduce((s, t) => s + t.count, 0)
    const avgScore = catTopics.length > 0
      ? Math.round(catTopics.reduce((s, t) => s + t.score, 0) / catTopics.length)
      : 0
    return { ...cat, progress: avgScore, questions: totalQuestions }
  })

  // ── Ring progress SVG ──────────────────────────────────────
  function Ring({ pct, size = 64, stroke = 5, color }: { pct: number; size?: number; stroke?: number; color: string }) {
    const r = (size - stroke) / 2
    const circ = 2 * Math.PI * r
    const offset = circ - (pct / 100) * circ
    return (
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--rule)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
    )
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: 'var(--cream)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ color: 'var(--green)', fontWeight: 600, fontFamily: 'var(--sans)', fontSize: 15 }}>Loading your dashboard...</p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', fontFamily: 'var(--sans)' }}>
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 40 }}>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1 — GREETING HEADER
            ═══════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 32 }}>
          <p className="sec-label">Dashboard</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 6, lineHeight: 1.1 }}>
                Welcome back, <em>{name}.</em>
              </h1>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
                {dateStr}
                {!examPassed && (
                  <span style={{ marginLeft: 16, color: 'var(--burgundy)', fontWeight: 700 }}>
                    {daysToExam} days to exam
                  </span>
                )}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.05em' }}>
                {level.icon} {level.label}
              </span>
              <div style={{ width: 120, background: 'var(--rule)', borderRadius: 999, height: 6 }}>
                <div style={{ width: `${xpPct}%`, height: 6, borderRadius: 999, background: 'var(--green)', transition: 'width 0.8s ease' }} />
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)' }}>{xp} XP</span>
            </div>
          </div>

          {/* Today's session card */}
          <div style={{
            background: 'var(--green)', borderRadius: 14, padding: '22px 28px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: 'var(--cream)', marginBottom: 4 }}>
                Today&apos;s session
              </p>
              <p style={{ fontSize: 13, color: 'rgba(247,243,234,0.75)', fontWeight: 500 }}>
                {weeklyCount} questions this week &middot; {streak > 0 ? `${streak}-day streak going` : 'Start a new streak today'}
              </p>
            </div>
            <button className="btn btn-gold" onClick={() => router.push('/learn')} style={{ fontSize: 14 }}>
              Start practising
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2 — STATS GRID (4 cards)
            ═══════════════════════════════════════════════════════════ */}
        <div className="dash-stats-grid" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16, marginBottom: 32,
        }}>
          {/* Predicted Grade — spans wider */}
          <div style={{
            background: 'var(--ink)', borderRadius: 14, padding: '24px 28px',
            display: 'flex', alignItems: 'center', gap: 24, color: 'var(--cream)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: 12, background: 'var(--gold)',
              display: 'grid', placeItems: 'center',
              fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, color: 'var(--ink)',
            }}>
              {predictedGrade}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--gold-soft)', textTransform: 'uppercase', marginBottom: 4, fontWeight: 700 }}>
                Predicted Grade
              </p>
              <p style={{ fontSize: 14, color: 'rgba(247,243,234,0.65)', fontWeight: 500 }}>
                Based on {totalAttempts} question{totalAttempts !== 1 ? 's' : ''} &middot; {avgPct}% avg
              </p>
            </div>
          </div>

          {/* Streak */}
          <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 16px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
              {streak}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em', marginTop: 6, textTransform: 'uppercase', fontWeight: 700 }}>
              Day streak
            </p>
          </div>

          {/* Hours this week */}
          <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px 16px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
              {hoursThisWeek}
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.06em', marginTop: 6, textTransform: 'uppercase', fontWeight: 700 }}>
              Hours this week
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3 — MIDDLE (Weak-spot Radar + Revision Log)
            ═══════════════════════════════════════════════════════════ */}
        <div className="dash-middle-grid" style={{
          display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20, marginBottom: 32, alignItems: 'start',
        }}>
          {/* Weak-spot Radar */}
          <div className="card" style={{ padding: 28 }}>
            <p className="sec-label" style={{ marginBottom: 16 }}>Weak-spot Radar</p>
            {weakTopics.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {weakTopics.map(t => {
                  const barColor = t.score < 40 ? 'var(--burgundy)' : t.score < 65 ? 'var(--gold)' : 'var(--green)'
                  const bgColor = t.score < 40 ? 'var(--burgundy-soft)' : t.score < 65 ? 'var(--gold-soft)' : 'var(--green-soft)'
                  const status = t.score < 40 ? 'Critical' : t.score < 65 ? 'Needs work' : 'Good'
                  return (
                    <div key={t.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{t.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{
                            fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em',
                            padding: '3px 8px', borderRadius: 999,
                            background: bgColor, color: barColor, textTransform: 'uppercase',
                          }}>
                            {status}
                          </span>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: barColor }}>
                            {t.score}%
                          </span>
                        </div>
                      </div>
                      <div style={{ background: 'var(--cream-2)', borderRadius: 999, height: 7 }}>
                        <div style={{
                          width: `${t.score}%`, height: 7, borderRadius: 999,
                          background: barColor, transition: 'width 0.6s ease',
                        }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p style={{ fontSize: 14, color: 'var(--ink-3)', fontStyle: 'italic' }}>
                Complete some practice to see your weak spots here.
              </p>
            )}
          </div>

          {/* Revision Log */}
          <div className="card" style={{ padding: 28 }}>
            <p className="sec-label" style={{ marginBottom: 16 }}>Revision Log</p>

            {/* Streak number */}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
                {streak}
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>
                day streak
              </p>
            </div>

            {/* 7-day calendar grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 20 }}>
              {last7.map((d, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '8px 0',
                  borderRadius: 8,
                  background: d.isToday ? 'var(--green-soft)' : 'transparent',
                  border: d.isToday ? '1.5px solid var(--green)' : '1.5px solid var(--rule)',
                }}>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
                    {d.day}
                  </p>
                  <div style={{
                    width: 8, height: 8, borderRadius: 999, margin: '0 auto',
                    background: d.count > 0 ? 'var(--green)' : 'var(--rule)',
                  }} />
                  {d.count > 0 && (
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--green)', marginTop: 3, fontWeight: 700 }}>
                      {d.count}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{weeklyCount}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Questions</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{weekAccuracy}%</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Accuracy</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{hoursThisWeek}h</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Total time</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4 — SYLLABUS PROGRESS (5 category cards)
            ═══════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 32 }}>
          <p className="sec-label">Syllabus Progress</p>
          <div className="dash-syllabus-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14,
          }}>
            {syllabusProgress.map(cat => {
              const ringColor = cat.progress >= 70 ? 'var(--green)' : cat.progress >= 40 ? 'var(--gold)' : cat.progress > 0 ? 'var(--burgundy)' : 'var(--rule-2)'
              return (
                <div key={cat.key} className="card" style={{
                  textAlign: 'center', padding: '24px 16px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                }}>
                  <div style={{ position: 'relative', width: 64, height: 64 }}>
                    <Ring pct={cat.progress} color={ringColor} />
                    <span style={{
                      position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                      fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)',
                      transform: 'rotate(0deg)', // counter the parent rotation
                    }}>
                      {cat.progress}%
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
                    {cat.label}
                  </p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.04em' }}>
                    {cat.questions} questions
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5 — RECENT ACTIVITY
            ═══════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 32 }}>
          <p className="sec-label">Recent Activity</p>
          {recentFive.length > 0 ? (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {recentFive.map((a, i) => {
                const pct = Math.round((a.score / a.out_of) * 100)
                const good = pct >= 60
                const dateLabel = new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                return (
                  <div key={a.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 24px',
                    borderBottom: i < recentFive.length - 1 ? '1px solid var(--rule)' : 'none',
                  }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                        {a.subtopic || a.topic}
                      </p>
                      <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-4)' }}>
                        {a.subtopic ? a.topic + ' \u00b7 ' : ''}{dateLabel}
                      </p>
                    </div>
                    <span className="pill" style={{
                      background: good ? 'var(--green-soft)' : 'var(--burgundy-soft)',
                      color: good ? 'var(--green)' : 'var(--burgundy)',
                    }}>
                      {a.score}/{a.out_of} &middot; {pct}%
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                No activity yet
              </p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24 }}>
                Complete your first practice session to see your progress here.
              </p>
              <button className="btn btn-primary" onClick={() => router.push('/learn')}>
                Start practising
              </button>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6 — BADGES / MARKS OF DISTINCTION
            ═══════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 32 }}>
          <p className="sec-label">Marks of Distinction</p>
          <div className="dash-badges-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12,
          }}>
            {badges.map(b => (
              <div key={b.id} className="card" style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px',
                opacity: b.earned ? 1 : 0.4,
                borderColor: b.earned ? 'var(--green)' : 'var(--rule)',
                background: b.earned ? 'var(--green-soft)' : 'var(--paper)',
              }}>
                <span style={{ fontSize: 24 }}>{b.icon}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: b.earned ? 'var(--green)' : 'var(--ink-3)' }}>
                    {b.label}
                  </p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', letterSpacing: '0.04em', marginTop: 2 }}>
                    {b.earned ? 'Earned' : 'Locked'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            QUICK ACTIONS
            ═══════════════════════════════════════════════════════════ */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          <button className="btn btn-primary" onClick={() => router.push('/learn')} style={{ flex: 1, minWidth: 180, justifyContent: 'center' }}>
            Practice questions
          </button>
          <button className="btn btn-outline" onClick={() => router.push('/study')} style={{ flex: 1, minWidth: 140, justifyContent: 'center' }}>
            Study notes
          </button>
          <button className="btn btn-outline" onClick={() => router.push('/papers')} style={{ flex: 1, minWidth: 140, justifyContent: 'center' }}>
            Exam papers
          </button>
        </div>

      </div>

      <Footer />

      {/* ═══════════════════════════════════════════════════════════
          RESPONSIVE STYLES
          ═══════════════════════════════════════════════════════════ */}
      <style jsx>{`
        @media (max-width: 900px) {
          .dash-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .dash-stats-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .dash-middle-grid {
            grid-template-columns: 1fr !important;
          }
          .dash-syllabus-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .dash-stats-grid {
            grid-template-columns: 1fr !important;
          }
          .dash-syllabus-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .dash-badges-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
