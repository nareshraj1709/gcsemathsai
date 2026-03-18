'use client'
import { useState } from 'react'
import { HISTORICAL_PAPERS, type ExamBoard, type Tier } from '@/lib/papers-data'

const C = {
  ink: '#0D0B1A',
  purple: '#6D28D9',
  purpleLight: '#8B5CF6',
  purplePale: '#EDE9FE',
  mist: '#F8F7FF',
  mid: '#6B7280',
  border: '#E5E1FF',
}
const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

type TierFilter = Tier | 'all'

export default function DownloadsPage() {
  const [tier, setTier] = useState<TierFilter>('all')
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all')

  // Only papers with real PDFs
  const allPdfPapers = HISTORICAL_PAPERS.filter(p => !!p.pdfUrl)

  const filtered = allPdfPapers.filter(p => {
    if (tier !== 'all' && p.tier !== tier) return false
    if (yearFilter !== 'all' && p.year !== yearFilter) return false
    return true
  })

  // Get unique years for filter
  const years = [...new Set(allPdfPapers.map(p => p.year!))].sort((a, b) => b - a)

  // Group by session/year for display
  const groups: Record<string, typeof filtered> = {}
  filtered.forEach(p => {
    const key = p.session === 'Specimen' ? 'Specimen' : `${p.session ?? 'June'} ${p.year}`
    if (!groups[key]) groups[key] = []
    groups[key].push(p)
  })

  // Sort group keys: most recent first, specimen last
  const sortedKeys = Object.keys(groups).sort((a, b) => {
    if (a === 'Specimen') return 1
    if (b === 'Specimen') return -1
    const yA = parseInt(a.split(' ')[1]) || 0
    const yB = parseInt(b.split(' ')[1]) || 0
    if (yA !== yB) return yB - yA
    // November before June within same year
    if (a.includes('November') && !b.includes('November')) return -1
    if (!a.includes('November') && b.includes('November')) return 1
    return 0
  })

  return (
    <main style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2563EB)',
        padding: '40px 24px 36px',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,0.15)', borderRadius: 999,
          padding: '4px 14px', fontSize: 12, fontWeight: 700,
          marginBottom: 14,
        }}>
          AQA Past Papers
        </div>
        <h1 style={{
          fontFamily: font.display, fontSize: 30, fontWeight: 800,
          margin: '0 0 10px',
        }}>
          Download Past Papers
        </h1>
        <p style={{ fontSize: 14, opacity: 0.85, maxWidth: 520, margin: '0 auto' }}>
          Free PDF downloads of real AQA GCSE Maths past papers. Print them out, practise under timed conditions, and check your answers.
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 24, justifyContent: 'center', marginTop: 24,
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'PDF Papers', value: allPdfPapers.length },
            { label: 'Foundation', value: allPdfPapers.filter(p => p.tier === 'Foundation').length },
            { label: 'Higher', value: allPdfPapers.filter(p => p.tier === 'Higher').length },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '10px 20px',
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: font.display }}>{s.value}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px 60px' }}>

        {/* Filters */}
        <div style={{
          background: '#fff', borderRadius: 14, border: `1px solid ${C.border}`,
          padding: '16px 20px', marginBottom: 24,
          display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center',
        }}>
          {/* Tier filter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, margin: '0 0 8px' }}>Tier</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {(['all', 'Foundation', 'Higher'] as TierFilter[]).map(t => (
                <button key={t} onClick={() => setTier(t)} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                  borderColor: tier === t ? '#DDD6FE' : '#E5E1FF',
                  background: tier === t ? '#EDE9FE' : '#fff',
                  color: tier === t ? '#6D28D9' : '#6B7280',
                  fontWeight: tier === t ? 700 : 500, fontSize: 13, cursor: 'pointer',
                  fontFamily: font.body,
                }}>{t === 'all' ? 'All Tiers' : t}</button>
              ))}
            </div>
          </div>

          <div style={{ width: 1, height: 36, background: '#E5E1FF' }} />

          {/* Year filter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8, margin: '0 0 8px' }}>Year</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <button onClick={() => setYearFilter('all')} style={{
                padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                borderColor: yearFilter === 'all' ? '#A7F3D0' : '#E5E1FF',
                background: yearFilter === 'all' ? '#ECFDF5' : '#fff',
                color: yearFilter === 'all' ? '#065F46' : '#6B7280',
                fontWeight: yearFilter === 'all' ? 700 : 500, fontSize: 12, cursor: 'pointer',
                fontFamily: font.body,
              }}>All</button>
              {years.map(y => (
                <button key={y} onClick={() => setYearFilter(y)} style={{
                  padding: '5px 12px', borderRadius: 8, border: '1.5px solid',
                  borderColor: yearFilter === y ? '#A7F3D0' : '#E5E1FF',
                  background: yearFilter === y ? '#ECFDF5' : '#fff',
                  color: yearFilter === y ? '#065F46' : '#6B7280',
                  fontWeight: yearFilter === y ? 700 : 500, fontSize: 12, cursor: 'pointer',
                  fontFamily: font.body,
                }}>{y}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{
            fontSize: 13, fontWeight: 700, color: '#3730A3',
            background: '#EEF2FF', padding: '4px 12px', borderRadius: 999,
            border: '1px solid #C7D2FE',
          }}>
            AQA 8300
          </span>
          <span style={{ fontSize: 13, color: '#9CA3AF' }}>{filtered.length} papers available</span>
        </div>

        {/* Paper groups */}
        {sortedKeys.map(groupKey => {
          const papers = groups[groupKey]
          // Sort within group: Foundation before Higher, then by paper number
          const sorted = [...papers].sort((a, b) => {
            if (a.tier !== b.tier) return a.tier === 'Foundation' ? -1 : 1
            return a.paperNumber - b.paperNumber
          })

          return (
            <div key={groupKey} style={{ marginBottom: 24 }}>
              <h2 style={{
                fontFamily: font.display, fontSize: 18, fontWeight: 800,
                color: C.ink, margin: '0 0 12px',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                {groupKey}
                <span style={{
                  fontSize: 11, fontWeight: 600, color: '#6B7280',
                  background: '#F3F4F6', padding: '2px 8px', borderRadius: 999,
                }}>
                  {sorted.length} papers
                </span>
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}>
                {sorted.map(paper => (
                  <div key={paper.id} style={{
                    background: '#fff',
                    border: `1.5px solid ${C.border}`,
                    borderRadius: 14,
                    padding: '16px 18px',
                    display: 'flex', flexDirection: 'column', gap: 10,
                  }}>
                    {/* Top badges */}
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                        background: paper.tier === 'Foundation' ? '#DBEAFE' : '#FEF3C7',
                        color: paper.tier === 'Foundation' ? '#1D4ED8' : '#92400E',
                      }}>
                        {paper.tier}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                        background: paper.calculator ? '#EFF6FF' : '#FEF3C7',
                        color: paper.calculator ? '#1D4ED8' : '#92400E',
                      }}>
                        {paper.calculator ? 'Calculator' : 'Non-Calculator'}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <div style={{
                        fontSize: 16, fontWeight: 800, color: C.ink,
                        fontFamily: font.display,
                      }}>
                        Paper {paper.paperNumber}
                      </div>
                      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
                        {paper.totalMarks} marks · {paper.timeMinutes} minutes
                      </div>
                    </div>

                    {/* Download button */}
                    <a
                      href={paper.pdfUrl}
                      download
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: '10px 16px', borderRadius: 10, border: 'none',
                        background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                        color: '#fff', fontWeight: 700, fontSize: 13,
                        cursor: 'pointer', fontFamily: font.body,
                        textDecoration: 'none',
                        boxShadow: `0 2px 12px ${C.purple}25`,
                        transition: 'all 0.15s',
                        marginTop: 'auto',
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1v10M8 11l-3-3M8 11l3-3M2 13h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div style={{
            background: '#fff', borderRadius: 16, border: `1px solid ${C.border}`,
            padding: '40px 24px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.ink, margin: '0 0 6px' }}>
              No papers match your filters
            </p>
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              Try changing the tier or year filter above.
            </p>
          </div>
        )}

        {/* Info box */}
        <div style={{
          marginTop: 32, background: '#EFF6FF', borderRadius: 16,
          padding: '20px 24px', border: '1px solid #BFDBFE',
        }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#1D4ED8', margin: '0 0 8px' }}>
            How to use these papers
          </p>
          <ul style={{ fontSize: 13, color: '#1E40AF', margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Download and print the paper, or view it on a tablet</li>
            <li>Set a timer for 90 minutes to simulate real exam conditions</li>
            <li>Paper 1 is always non-calculator — put your calculator away!</li>
            <li>Papers 2 and 3 allow a calculator</li>
            <li>After finishing, use our <a href="/papers" style={{ color: '#6D28D9', fontWeight: 600 }}>online exam mode</a> to get AI marking and feedback</li>
          </ul>
        </div>

        {/* Edexcel/OCR note */}
        <div style={{
          marginTop: 16, background: '#FEF3C7', borderRadius: 16,
          padding: '16px 24px', border: '1px solid #FCD34D',
        }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#92400E', margin: 0 }}>
            Edexcel and OCR PDFs coming soon — in the meantime, you can practise Edexcel and OCR style questions using our{' '}
            <a href="/papers" style={{ color: '#6D28D9', fontWeight: 700 }}>AI Practice Papers</a>{' '}
            which generate questions in the exact style of each exam board.
          </p>
        </div>
      </div>
    </main>
  )
}
