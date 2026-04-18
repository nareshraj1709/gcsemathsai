'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { HISTORICAL_PAPERS, AI_PAPERS, type ExamBoard, type Tier } from '@/lib/papers-data'
import Footer from '@/components/Footer'

const BOARDS: ExamBoard[] = ['AQA', 'Edexcel', 'OCR']
const TIERS: Tier[] = ['Foundation', 'Higher']

const BOARD_PILL: Record<ExamBoard, string> = {
  AQA: 'pill-green',
  Edexcel: 'pill-navy',
  OCR: 'pill-burgundy',
}

type Tab = 'previous' | 'ai'

export default function PapersPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('previous')
  const [board, setBoard] = useState<ExamBoard>('AQA')
  const [tier, setTier] = useState<Tier>('Higher')
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')

  const historical = HISTORICAL_PAPERS.filter(p => p.board === board && p.tier === tier)
  const years = [...new Set(historical.map(p => p.year!))].sort((a, b) => b - a)
  const filteredHistorical = yearFilter === 'all' ? historical : historical.filter(p => p.year === yearFilter)
  const aiPapers = AI_PAPERS.filter(p => p.board === board && p.tier === tier)

  return (
    <>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '32px 24px 96px', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'start', marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--rule)' }} className="pp-header">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
              &#9670; PAST PAPERS &middot; <span style={{ color: 'var(--gold)' }}>ARCHIVE 2017 &mdash; 2025</span>
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(40px,5vw,62px)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Every paper,<br />marked <em>like the real thing.</em>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 560, fontWeight: 500 }}>
              Nine years of past papers from AQA, Edexcel and OCR. Foundation and Higher. Take them timed in the <b style={{ color: 'var(--ink)', fontWeight: 700 }}>Exam Simulator</b> and get auto-marked.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, border: '1px solid var(--rule)', borderRadius: 14, background: 'var(--paper)', overflow: 'hidden' }}>
            {[
              { num: <><em style={{ fontStyle: 'italic', color: 'var(--green)' }}>{HISTORICAL_PAPERS.length + AI_PAPERS.length}</em></>, label: 'Papers' },
              { num: <>9<em style={{ fontStyle: 'italic', color: 'var(--green)' }}>yr</em></>, label: 'Coverage' },
              { num: <>3<em style={{ fontStyle: 'italic', color: 'var(--green)' }}>b</em></>, label: 'Boards' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '24px 20px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TAB TOGGLE */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button className={`chip${tab === 'previous' ? ' active' : ''}`} onClick={() => setTab('previous')}>Previous Papers</button>
          <button className={`chip${tab === 'ai' ? ' active' : ''}`} onClick={() => setTab('ai')}>AI Practice Papers</button>
        </div>

        {/* FILTER BAR */}
        <div style={{
          background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '18px 24px', marginBottom: 24,
          display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' as const, position: 'sticky', top: 88, zIndex: 20,
          boxShadow: '0 4px 12px -6px rgba(14,31,23,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Board</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {BOARDS.map(b => (
                <button key={b} className={`chip${board === b ? ' active' : ''}`} onClick={() => { setBoard(b); setYearFilter('all') }}>{b}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Tier</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {TIERS.map(t => (
                <button key={t} className={`chip${tier === t ? ' active' : ''}`} onClick={() => setTier(t)}>{t}</button>
              ))}
            </div>
          </div>
          {tab === 'previous' && years.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Year</span>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
                <button className={`chip${yearFilter === 'all' ? ' active' : ''}`} onClick={() => setYearFilter('all')}>All</button>
                {years.map(y => (
                  <button key={y} className={`chip${yearFilter === y ? ' active' : ''}`} onClick={() => setYearFilter(y)}>{y}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Downloads banner */}
        <div style={{
          background: 'var(--green-soft)', borderLeft: '3px solid var(--green)', borderRadius: '0 12px 12px 0',
          padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 10,
        }}>
          <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>Want to download and print past papers? Visit our dedicated downloads page.</span>
          <button className="btn btn-primary" onClick={() => router.push('/downloads')} style={{ padding: '8px 18px', fontSize: 13 }}>Download PDFs &rarr;</button>
        </div>

        {/* PREVIOUS PAPERS */}
        {tab === 'previous' && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>{board}</em>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
                <b style={{ color: 'var(--ink)' }}>{filteredHistorical.length}</b> papers &middot; {tier}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="papers-grid">
              {filteredHistorical.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => router.push(`/papers/${paper.id}`)}
                  style={{
                    background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 20,
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 12,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                    <span className={`pill ${BOARD_PILL[board]}`}>{board}</span>
                    <span className={`tier-mark ${tier === 'Higher' ? 'H' : 'F'}`}>{tier === 'Higher' ? 'H' : 'F'}</span>
                    {paper.pdfUrl && <span className="pill pill-gold" style={{ fontSize: 10 }}>PDF</span>}
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                    Paper {paper.paperNumber} &middot; <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>{paper.calculator ? 'Calculator' : 'Non-calculator'}</em>
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, display: 'flex', gap: 8 }}>
                    <span>{paper.year}{paper.session === 'November' ? ' Nov' : ''}</span>
                    <span>&middot;</span>
                    <span>{paper.totalMarks} marks</span>
                    <span>&middot;</span>
                    <span>{paper.timeMinutes}m</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, paddingTop: 12, borderTop: '1px dashed var(--rule)', marginTop: 'auto' }}>
                    {paper.pdfUrl && (
                      <span style={{ flex: 1, padding: 8, borderRadius: 6, background: 'var(--cream)', border: '1px solid var(--rule)', fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--ink-2)', letterSpacing: '0.04em', textTransform: 'uppercase' as const, textAlign: 'center' }}>PDF</span>
                    )}
                    <span style={{ flex: 1, padding: 8, borderRadius: 6, background: 'var(--green)', color: 'var(--cream)', fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' as const, textAlign: 'center' }}>Start &rarr;</span>
                  </div>
                </button>
              ))}
            </div>
            {filteredHistorical.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-3)', fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic' }}>
                No papers found for this combination.
              </div>
            )}
          </>
        )}

        {/* AI PAPERS */}
        {tab === 'ai' && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>AI Practice</em>
              </div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
                <b style={{ color: 'var(--ink)' }}>{aiPapers.length}</b> papers &middot; {board} {tier}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="papers-grid">
              {aiPapers.map(paper => (
                <button
                  key={paper.id}
                  onClick={() => router.push(`/papers/${paper.id}`)}
                  style={{
                    background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 20,
                    textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 12,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
                    <span className={`pill ${BOARD_PILL[board]}`}>{board}</span>
                    <span className="pill pill-gold">AI Generated</span>
                    <span className={`tier-mark ${tier === 'Higher' ? 'H' : 'F'}`}>{tier === 'Higher' ? 'H' : 'F'}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                    {paper.name}
                  </div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, display: 'flex', gap: 8 }}>
                    <span>{paper.totalMarks} marks</span>
                    <span>&middot;</span>
                    <span>{paper.calculator ? 'Calculator' : 'Non-calculator'}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, paddingTop: 12, borderTop: '1px dashed var(--rule)', marginTop: 'auto' }}>
                    <span style={{ flex: 1, padding: 8, borderRadius: 6, background: 'var(--green)', color: 'var(--cream)', fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' as const, textAlign: 'center' }}>Start &rarr;</span>
                  </div>
                </button>
              ))}
            </div>
            {aiPapers.length === 0 && (
              <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-3)', fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic' }}>
                No AI papers available for this combination.
              </div>
            )}
          </>
        )}
      </div>

      <Footer />

      <style jsx>{`
        @media (max-width: 1000px) {
          .pp-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .papers-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .papers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
