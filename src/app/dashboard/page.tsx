'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  purplePale: "#EDE9FE",
  purpleDim: "#4C1D95",
  gold: "#F59E0B",
  green: "#10B981",
  red: "#EF4444",
  mist: "#F8F7FF",
  mid: "#6B7280",
  border: "#E5E1FF",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

type Attempt = {
  id: string
  topic: string
  score: number
  out_of: number
  feedback: string
  created_at: string
}

type Profile = { name: string; year: string; board: string; goal: string }

export default function Dashboard() {
  const router = useRouter()
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening"

  useEffect(() => {
    const saved = localStorage.getItem('gcse_profile')
    if (saved) setProfile(JSON.parse(saved))

    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

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
  }, [router])

  // Derived stats
  const totalAttempts = attempts.length
  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalPossible = attempts.reduce((s, a) => s + a.out_of, 0)
  const avgPct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const weeklyCount = attempts.filter(a => new Date(a.created_at) > weekAgo).length

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

  const weakestTopic = topicList.length > 0
    ? [...topicList].sort((a, b) => a.score - b.score)[0]
    : null

  const recentThree = attempts.slice(0, 3)

  const name = profile?.name || "Student"
  const board = profile?.board || "AQA"
  const year = profile?.year || "Year 11"

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: C.mist,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <p style={{ color: C.purple, fontWeight: 600, fontFamily: font.body }}>Loading your dashboard…</p>
      </div>
    )
  }

  return (
    <div style={{ background: C.mist, minHeight: "100vh", fontFamily: font.body }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px" }}>

        {/* Welcome header */}
        <div style={{
          background: `linear-gradient(135deg, ${C.purpleDim} 0%, ${C.purple} 60%, ${C.purpleLight} 100%)`,
          borderRadius: 20, padding: "28px 32px", marginBottom: 24, color: "#fff",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          boxShadow: `0 8px 32px ${C.purple}30`, flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{greeting} 👋</p>
            <h1 style={{ fontFamily: font.display, fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>
              {name}
            </h1>
            <p style={{ opacity: 0.8, fontSize: 14, margin: 0 }}>{year} · {board} Higher</p>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { val: `${totalAttempts}`, sub: "questions done" },
              { val: `${avgPct}%`, sub: "avg score" },
              { val: `${topicsMastered}`, sub: "topics mastered" },
            ].map(s => (
              <div key={s.sub} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{s.val}</div>
                <div style={{ fontSize: 11, opacity: 0.75 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 24 }}>
          {[
            { icon: "📝", val: String(weeklyCount), label: "This week" },
            { icon: "📈", val: `${avgPct}%`, label: "Avg score" },
            { icon: "📚", val: String(totalAttempts), label: "Total questions" },
            { icon: "🏆", val: String(topicsMastered), label: "Topics mastered" },
          ].map(s => (
            <div key={s.label} style={{
              background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14,
              padding: "20px 16px", textAlign: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, fontFamily: font.display }}>{s.val}</div>
              <div style={{ fontSize: 12, color: C.mid }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: topicList.length > 0 ? "1fr 340px" : "1fr", gap: 20, alignItems: "start" }}>
          {/* Topic progress */}
          {topicList.length > 0 ? (
            <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 24 }}>
              <h2 style={{ fontFamily: font.display, fontSize: 18, color: C.ink, marginBottom: 20 }}>Topic Progress</h2>
              {topicList.map(t => {
                const color = t.score >= 80 ? C.green : t.score >= 60 ? C.gold : C.red
                return (
                  <div key={t.name} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t.name}</span>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: C.mid }}>{t.count} attempts</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color }}>{t.score}%</span>
                      </div>
                    </div>
                    <div style={{ background: "#F3F4F6", borderRadius: 999, height: 8 }}>
                      <div style={{ width: `${t.score}%`, height: 8, borderRadius: 999, background: color, transition: "width 0.5s" }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{
              background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 40,
              textAlign: "center",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <h2 style={{ fontFamily: font.display, fontSize: 20, color: C.ink, marginBottom: 8 }}>No data yet</h2>
              <p style={{ color: C.mid, fontSize: 14, marginBottom: 24 }}>Complete your first practice session to see your topic progress here.</p>
              <button onClick={() => router.push('/practice')} style={{
                padding: "12px 24px", borderRadius: 10, border: "none",
                background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer",
                fontFamily: font.body,
              }}>Start practising →</button>
            </div>
          )}

          {/* Right sidebar */}
          {topicList.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Focus today */}
              {weakestTopic && (
                <div style={{
                  background: "#FEF3C7", border: "1px solid #FCD34D",
                  borderRadius: 16, padding: 20,
                }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#92400E", margin: "0 0 8px" }}>⚠️ Focus today</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#78350F", margin: "0 0 8px", fontFamily: font.display }}>{weakestTopic.name}</p>
                  <p style={{ fontSize: 13, color: "#92400E", margin: "0 0 16px" }}>
                    {weakestTopic.score}% score · {weakestTopic.count} attempt{weakestTopic.count !== 1 ? "s" : ""}
                  </p>
                  <button onClick={() => router.push('/practice')} style={{
                    width: "100%", padding: "10px", borderRadius: 10,
                    background: "#92400E", color: "#fff", border: "none",
                    fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: font.body,
                  }}>Practice now →</button>
                </div>
              )}

              {/* Recent activity */}
              {recentThree.length > 0 && (
                <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 16, padding: 20 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: "0 0 16px", fontFamily: font.display }}>Recent activity</p>
                  {recentThree.map(a => {
                    const pct = Math.round((a.score / a.out_of) * 100)
                    const good = pct >= 60
                    const dateStr = new Date(a.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
                    return (
                      <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{a.topic}</div>
                          <div style={{ fontSize: 12, color: C.mid }}>{dateStr}</div>
                        </div>
                        <span style={{
                          fontSize: 13, fontWeight: 700,
                          color: good ? C.green : C.red,
                          background: good ? "#ECFDF5" : "#FEF2F2",
                          padding: "3px 10px", borderRadius: 999,
                        }}>{a.score}/{a.out_of}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <button onClick={() => router.push('/practice')} style={{
          marginTop: 20, width: "100%", padding: "16px",
          background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
          color: "#fff", border: "none", borderRadius: 14,
          fontSize: 16, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 16px ${C.purple}30`, fontFamily: font.body,
        }}>
          🚀 Start today&apos;s practice session →
        </button>
      </div>
    </div>
  )
}
