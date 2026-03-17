'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HISTORICAL_PAPERS, AI_PAPERS, type ExamBoard, type Tier } from '@/lib/papers-data'

const BOARDS: ExamBoard[] = ['AQA', 'Edexcel', 'OCR']
const TIERS: Tier[] = ['Foundation', 'Higher']

const BOARD_COLORS: Record<ExamBoard, { bg: string; text: string; border: string }> = {
  AQA:     { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE' },
  Edexcel: { bg: '#FFF7ED', text: '#92400E', border: '#FED7AA' },
  OCR:     { bg: '#F0FDF4', text: '#065F46', border: '#A7F3D0' },
}

type Tab = 'previous' | 'ai'

const DIFF_COLORS: Record<string, { bg: string; text: string }> = {
  'Warm-Up':    { bg: '#F0FDF4', text: '#065F46' },
  'Standard':   { bg: '#EFF6FF', text: '#1D4ED8' },
  'Challenge':  { bg: '#FEF3C7', text: '#92400E' },
  'Mixed':      { bg: '#F5F3FF', text: '#5B21B6' },
  'Exam Style': { bg: '#FFF1F2', text: '#9F1239' },
}

function getDiffLabel(name: string) {
  for (const key of Object.keys(DIFF_COLORS)) {
    if (name.includes(key)) return key
  }
  return ''
}

export default function PapersPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('previous')
  const [board, setBoard] = useState<ExamBoard>('AQA')
  const [tier, setTier] = useState<Tier>('Foundation')
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')

  const bc = BOARD_COLORS[board]

  const historical = HISTORICAL_PAPERS.filter(p => p.board === board && p.tier === tier)
  const years = [...new Set(historical.map(p => p.year!))].sort((a, b) => b - a)
  const filteredHistorical = yearFilter === 'all' ? historical : historical.filter(p => p.year === yearFilter)

  const aiPapers = AI_PAPERS.filter(p => p.board === board && p.tier === tier)

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1E3A5F, #2563EB)', padding: '36px 24px', color: '#fff', textAlign: 'center' }}>
        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>GCSE Maths</p>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 800, margin: '0 0 10px' }}>
          Exam Papers
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 460, margin: '0 auto' }}>
          Practise with previous-paper style questions or AI-generated practice papers — timed, marked, and graded.
        </p>

        {/* Tabs inside hero */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
          <button
            onClick={() => setTab('previous')}
            style={{
              padding: '10px 24px', borderRadius: 10, border: '2px solid',
              borderColor: tab === 'previous' ? '#fff' : 'rgba(255,255,255,0.3)',
              background: tab === 'previous' ? '#fff' : 'transparent',
              color: tab === 'previous' ? '#1E3A5F' : '#fff',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            📄 Previous Papers
          </button>
          <button
            onClick={() => setTab('ai')}
            style={{
              padding: '10px 24px', borderRadius: 10, border: '2px solid',
              borderColor: tab === 'ai' ? '#fff' : 'rgba(255,255,255,0.3)',
              background: tab === 'ai' ? '#fff' : 'transparent',
              color: tab === 'ai' ? '#1E3A5F' : '#fff',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            🤖 AI Practice Papers
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px' }}>

        {/* Board + Tier filter — shared */}
        <div style={{
          background: '#fff', borderRadius: 14, border: '1px solid #E5E1FF',
          padding: '16px 20px', marginBottom: 24,
          display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Exam Board</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {BOARDS.map(b => (
                <button key={b} onClick={() => { setBoard(b); setYearFilter('all') }} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: board === b ? bc.border : '#E5E1FF',
                  background: board === b ? bc.bg : '#fff',
                  color: board === b ? bc.text : '#6B7280',
                  fontWeight: board === b ? 700 : 500, fontSize: 13, cursor: 'pointer',
                }}>{b}</button>
              ))}
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: '#E5E1FF' }} />
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

          {/* Year filter — only for previous tab */}
          {tab === 'previous' && (
            <>
              <div style={{ width: 1, height: 36, background: '#E5E1FF' }} />
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Year</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button onClick={() => setYearFilter('all')} style={{
                    padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                    borderColor: yearFilter === 'all' ? '#A7F3D0' : '#E5E1FF',
                    background: yearFilter === 'all' ? '#ECFDF5' : '#fff',
                    color: yearFilter === 'all' ? '#065F46' : '#6B7280',
                    fontWeight: yearFilter === 'all' ? 700 : 500, fontSize: 12, cursor: 'pointer',
                  }}>All years</button>
                  {years.map(y => (
                    <button key={y} onClick={() => setYearFilter(y)} style={{
                      padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                      borderColor: yearFilter === y ? '#A7F3D0' : '#E5E1FF',
                      background: yearFilter === y ? '#ECFDF5' : '#fff',
                      color: yearFilter === y ? '#065F46' : '#6B7280',
                      fontWeight: yearFilter === y ? 700 : 500, fontSize: 12, cursor: 'pointer',
                    }}>{y}</button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── PREVIOUS PAPERS TAB ─────────────────────────────── */}
        {tab === 'previous' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: bc.text, background: bc.bg, padding: '4px 12px', borderRadius: 999, border: `1px solid ${bc.border}` }}>
                {board} · {board === 'AQA' ? '8300' : board === 'Edexcel' ? '1MA1' : 'J560'}
              </span>
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>{filteredHistorical.length} papers</span>
              {board === 'AQA' && (
                <span style={{ fontSize: 12, fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '2px 10px', borderRadius: 999, marginLeft: 4 }}>
                  📄 Real PDFs available for some papers
                </span>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {filteredHistorical.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => router.push(`/papers/${paper.id}`)}
                  style={{
                    background: '#fff', border: '1.5px solid #E5E1FF', borderRadius: 14,
                    padding: '16px', textAlign: 'left', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#A78BFA'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(109,40,217,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E1FF'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  {/* Badges */}
                  <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: bc.bg, color: bc.text }}>{board}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: paper.calculator ? '#EFF6FF' : '#FEF3C7', color: paper.calculator ? '#1D4ED8' : '#92400E' }}>
                      {paper.calculator ? '🖩 Calc' : '✏️ Non-Calc'}
                    </span>
                    {paper.pdfUrl && (
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: '#D1FAE5', color: '#065F46' }}>
                        📄 PDF
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0D0B1A', fontFamily: "'Georgia', serif", marginBottom: 2 }}>
                    {paper.session === 'November' ? 'Nov ' : paper.session === 'Specimen' ? 'Specimen' : ''}{paper.year}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', margin: '0 0 4px' }}>Paper {paper.paperNumber}</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 12px' }}>{paper.calculator ? 'Calculator' : 'Non-Calculator'}</p>

                  <div style={{ display: 'flex', gap: 10, borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>⏱ {paper.timeMinutes}m</span>
                    <span style={{ fontSize: 11, color: '#6B7280' }}>🎯 {paper.totalMarks} marks</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── AI PRACTICE PAPERS TAB ──────────────────────────── */}
        {tab === 'ai' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#6D28D9', background: '#EDE9FE', padding: '4px 12px', borderRadius: 999 }}>
                AI Generated · {board} {tier}
              </span>
              <span style={{ fontSize: 13, color: '#9CA3AF' }}>{aiPapers.length} practice papers</span>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
              {Object.entries(DIFF_COLORS).map(([label, c]) => (
                <span key={label} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: c.bg, color: c.text }}>
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {aiPapers.map(paper => {
                const diffLabel = getDiffLabel(paper.name)
                const dc = DIFF_COLORS[diffLabel] || { bg: '#F5F3FF', text: '#6D28D9' }
                return (
                  <button
                    key={paper.id}
                    onClick={() => router.push(`/papers/${paper.id}`)}
                    style={{
                      background: '#fff', border: `1.5px solid ${dc.bg === '#F5F3FF' ? '#DDD6FE' : 'transparent'}`,
                      borderRadius: 14, padding: '16px', textAlign: 'left', cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 4px 16px ${dc.text}22` }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: dc.bg, color: dc.text }}>{diffLabel}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: paper.calculator ? '#EFF6FF' : '#FEF3C7', color: paper.calculator ? '#1D4ED8' : '#92400E' }}>
                        {paper.calculator ? '🖩 Calc' : '✏️ Non-Calc'}
                      </span>
                    </div>

                    <p style={{ fontSize: 14, fontWeight: 800, color: '#0D0B1A', margin: '0 0 4px', fontFamily: "'Georgia', serif" }}>
                      Practice {paper.paperNumber}
                    </p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', margin: '0 0 12px', lineHeight: 1.4 }}>
                      {paper.topics.split(',').slice(0, 2).join(', ').replace(/\s*\(\d+%\)/g, '')}
                    </p>

                    <div style={{ display: 'flex', gap: 10, borderTop: '1px solid #F3F4F6', paddingTop: 10 }}>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>⏱ 90m</span>
                      <span style={{ fontSize: 11, color: '#6B7280' }}>🎯 {paper.totalMarks} marks</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
