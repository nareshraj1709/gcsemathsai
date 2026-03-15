'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SECTIONS, type SectionTier } from '@/lib/sections-data'
import { supabase } from '@/lib/supabase'

type ExamBoard = 'AQA' | 'Edexcel' | 'OCR'
type Tier = 'Foundation' | 'Higher'

const BOARDS: ExamBoard[] = ['AQA', 'Edexcel', 'OCR']
const TIERS: Tier[] = ['Foundation', 'Higher']

const TOPIC_GROUPS = ['All', 'Number', 'Algebra', 'Geometry', 'Statistics', 'Probability']

export default function SectionsPage() {
  const router = useRouter()
  const [board, setBoard] = useState<ExamBoard>('AQA')
  const [tier, setTier] = useState<Tier>('Foundation')
  const [topicFilter, setTopicFilter] = useState('All')
  const [progress, setProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('attempts')
        .select('subtopic')
        .eq('user_id', user.id)
      if (!data) return
      // Count attempts per section subtopic
      const counts: Record<string, number> = {}
      for (const row of data) {
        const key = row.subtopic
        counts[key] = (counts[key] ?? 0) + 1
      }
      setProgress(counts)
    }
    load()
  }, [])

  const filtered = SECTIONS.filter(s => {
    if (tier === 'Foundation' && s.tier === 'Higher') return false
    if (topicFilter !== 'All' && s.topic !== topicFilter) return false
    return true
  })

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2563EB)',
        padding: '40px 24px', color: '#fff', textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Structured Practice</p>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 800, margin: '0 0 10px' }}>
          Practice Sections
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 480, margin: '0 auto' }}>
          10 AI-generated questions per section, marked instantly. Track your progress across every topic.
        </p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

        {/* Filters */}
        <div style={{
          background: '#fff', borderRadius: 16, border: '1px solid #E5E1FF',
          padding: '20px 24px', marginBottom: 24,
          display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
        }}>
          {/* Board */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Exam Board</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {BOARDS.map(b => (
                <button key={b} onClick={() => setBoard(b)} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: board === b ? '#C7D2FE' : '#E5E1FF',
                  background: board === b ? '#EEF2FF' : '#fff',
                  color: board === b ? '#3730A3' : '#6B7280',
                  fontWeight: board === b ? 700 : 500, fontSize: 13, cursor: 'pointer',
                }}>{b}</button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 36, background: '#E5E1FF' }} />

          {/* Tier */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Tier</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {TIERS.map(t => (
                <button key={t} onClick={() => setTier(t)} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: tier === t ? '#DDD6FE' : '#E5E1FF',
                  background: tier === t ? '#EDE9FE' : '#fff',
                  color: tier === t ? '#6D28D9' : '#6B7280',
                  fontWeight: tier === t ? 700 : 500, fontSize: 13, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 36, background: '#E5E1FF' }} />

          {/* Topic filter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Topic</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TOPIC_GROUPS.map(t => (
                <button key={t} onClick={() => setTopicFilter(t)} style={{
                  padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                  borderColor: topicFilter === t ? '#A7F3D0' : '#E5E1FF',
                  background: topicFilter === t ? '#ECFDF5' : '#fff',
                  color: topicFilter === t ? '#065F46' : '#6B7280',
                  fontWeight: topicFilter === t ? 700 : 500, fontSize: 12, cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Higher-only notice */}
        {tier === 'Foundation' && (
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>
            Higher-only sections (Surds, Quadratics, Simultaneous Eqs, Circle Theorems, Vectors, Venn Diagrams) are hidden on Foundation.
          </p>
        )}

        {/* Section grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {filtered.map(section => {
            const done = progress[section.subtopic] ?? 0
            const pct = Math.min(100, Math.round((done / 10) * 100))

            return (
              <button
                key={section.id}
                onClick={() => router.push(`/sections/${section.id}?board=${board}&tier=${tier}`)}
                style={{
                  background: '#fff', border: `1.5px solid ${section.borderColor}`,
                  borderRadius: 16, padding: '18px', textAlign: 'left', cursor: 'pointer',
                  transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 20px ${section.color}22` }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                {/* Icon + number */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: section.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 800, color: section.color,
                  }}>
                    {section.icon}
                  </div>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: section.color, display: 'block' }}>
                      {section.topic} · #{section.number}
                    </span>
                    {section.tier === 'Higher' && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#6D28D9', background: '#EDE9FE', padding: '1px 6px', borderRadius: 999 }}>Higher</span>
                    )}
                  </div>
                </div>

                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0D0B1A', margin: '0 0 4px', lineHeight: 1.3 }}>
                  {section.name}
                </h3>
                <p style={{ fontSize: 12, color: '#9CA3AF', margin: '0 0 12px', lineHeight: 1.4 }}>
                  {section.description}
                </p>

                {/* Progress bar */}
                <div style={{ marginBottom: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#9CA3AF' }}>Progress</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: section.color }}>{Math.min(done, 10)}/10</span>
                  </div>
                  <div style={{ height: 5, background: '#F3F4F6', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: 5, background: section.color, borderRadius: 999, width: `${pct}%`, transition: 'width 0.4s' }} />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}
