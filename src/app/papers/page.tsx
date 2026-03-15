'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PAPERS, type ExamBoard, type Tier } from '@/lib/papers-data'

const BOARDS: ExamBoard[] = ['AQA', 'Edexcel', 'OCR']
const TIERS: Tier[] = ['Foundation', 'Higher']

const BOARD_COLORS: Record<ExamBoard, { bg: string; text: string; border: string }> = {
  AQA:     { bg: '#EEF2FF', text: '#3730A3', border: '#C7D2FE' },
  Edexcel: { bg: '#FFF7ED', text: '#92400E', border: '#FED7AA' },
  OCR:     { bg: '#F0FDF4', text: '#065F46', border: '#A7F3D0' },
}

export default function PapersPage() {
  const router = useRouter()
  const [board, setBoard] = useState<ExamBoard>('AQA')
  const [tier, setTier] = useState<Tier>('Foundation')

  const filtered = PAPERS.filter(p => p.board === board && p.tier === tier)

  const bc = BOARD_COLORS[board]

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4C1D95, #6D28D9)',
        padding: '40px 24px', color: '#fff', textAlign: 'center',
      }}>
        <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Exam Simulation</p>
        <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 30, fontWeight: 800, margin: '0 0 10px' }}>
          Past-Style Papers
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 480, margin: '0 auto' }}>
          Timed, AI-marked exam papers for AQA, Edexcel and OCR — Foundation and Higher.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Filters */}
        <div style={{
          background: '#fff', borderRadius: 16, border: '1px solid #E5E1FF',
          padding: '20px 24px', marginBottom: 28,
          display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
        }}>
          {/* Board filter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
              Exam Board
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {BOARDS.map(b => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  style={{
                    padding: '7px 16px', borderRadius: 10, border: '1.5px solid',
                    borderColor: board === b ? BOARD_COLORS[b].border : '#E5E1FF',
                    background: board === b ? BOARD_COLORS[b].bg : '#fff',
                    color: board === b ? BOARD_COLORS[b].text : '#6B7280',
                    fontWeight: board === b ? 700 : 500, fontSize: 13, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 40, background: '#E5E1FF' }} />

          {/* Tier filter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
              Tier
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {TIERS.map(t => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  style={{
                    padding: '7px 16px', borderRadius: 10, border: '1.5px solid',
                    borderColor: tier === t ? '#DDD6FE' : '#E5E1FF',
                    background: tier === t ? '#EDE9FE' : '#fff',
                    color: tier === t ? '#6D28D9' : '#6B7280',
                    fontWeight: tier === t ? 700 : 500, fontSize: 13, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Board badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 13, fontWeight: 700, padding: '4px 14px', borderRadius: 999,
            background: bc.bg, color: bc.text, border: `1.5px solid ${bc.border}`,
          }}>
            {board} · {board === 'AQA' ? '8300' : board === 'Edexcel' ? '1MA1' : 'J560'}
          </span>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>{filtered.length} papers</span>
        </div>

        {/* Paper cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {filtered.map(paper => (
            <button
              key={paper.id}
              onClick={() => router.push(`/papers/${paper.id}`)}
              style={{
                background: '#fff', border: '1.5px solid #E5E1FF', borderRadius: 16,
                padding: '20px', textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.15s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#A78BFA'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(109,40,217,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E1FF'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              {/* Badges */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: bc.bg, color: bc.text }}>
                  {board}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                  background: paper.tier === 'Higher' ? '#EDE9FE' : '#F0FDF4',
                  color: paper.tier === 'Higher' ? '#6D28D9' : '#065F46',
                }}>
                  {paper.tier}
                </span>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                  background: paper.calculator ? '#EFF6FF' : '#FEF3C7',
                  color: paper.calculator ? '#1D4ED8' : '#92400E',
                }}>
                  {paper.calculator ? '🖩 Calculator' : '🚫 Non-Calc'}
                </span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0D0B1A', margin: '0 0 6px', lineHeight: 1.3, fontFamily: "'Georgia', serif" }}>
                Paper {paper.paperNumber} — {paper.tier}
              </h3>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 16px' }}>{paper.name}</p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 12, borderTop: '1px solid #F3F4F6', paddingTop: 14 }}>
                {[
                  { icon: '❓', val: `${paper.questionCount} Qs` },
                  { icon: '🎯', val: `${paper.totalMarks} marks` },
                  { icon: '⏱', val: `${paper.timeMinutes} min` },
                ].map(s => (
                  <div key={s.val} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12 }}>{s.icon}</span>
                    <span style={{ fontSize: 12, color: '#374151', fontWeight: 600 }}>{s.val}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 14, background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)',
                color: '#fff', borderRadius: 10, padding: '9px',
                fontSize: 13, fontWeight: 700, textAlign: 'center',
              }}>
                Start exam →
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
