'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AI_PAPERS, type ExamBoard, type Tier } from '@/lib/papers-data'
import Footer from '@/components/Footer'
import PredictedPapersPromo from '@/components/PredictedPapersPromo'

const BOARDS: ExamBoard[] = ['AQA', 'Edexcel', 'OCR']
const TIERS: Tier[] = ['Foundation', 'Higher']

const BOARD_PILL: Record<ExamBoard, string> = {
  AQA: 'pill-green',
  Edexcel: 'pill-navy',
  OCR: 'pill-burgundy',
}

// Links to the boards' own past-paper hubs. Opens in new tab, nofollow noopener.
const OFFICIAL_PAPERS: Record<ExamBoard, { url: string; label: string; blurb: string }> = {
  AQA: {
    url: 'https://www.aqa.org.uk/find-past-papers-and-mark-schemes',
    label: 'AQA · find past papers and mark schemes',
    blurb: 'Filter by specification 8300, year and series on the official AQA site. Question papers and mark schemes are released free.',
  },
  Edexcel: {
    url: 'https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html#tab-pastpapers',
    label: 'Pearson Edexcel · past papers (1MA1)',
    blurb: 'Past papers and mark schemes for the Edexcel 1MA1 specification on the Pearson Qualifications site.',
  },
  OCR: {
    url: 'https://www.ocr.org.uk/qualifications/gcse/mathematics-j560-from-2015/assessment/',
    label: 'OCR · J560 assessment materials',
    blurb: 'Past papers and mark schemes for the OCR J560 specification on the official OCR site.',
  },
}

export default function PapersPage() {
  const router = useRouter()
  const [board, setBoard] = useState<ExamBoard>('AQA')
  const [tier, setTier] = useState<Tier>('Higher')

  const practicePapers = AI_PAPERS.filter(p => p.board === board && p.tier === tier)

  return (
    <>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '32px 24px 96px', position: 'relative', zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 40, alignItems: 'start', marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--rule)' }} className="pp-header">
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
              &#9670; PAPERS &middot; <span style={{ color: 'var(--gold)' }}>PRACTICE &amp; OFFICIAL LINKS</span>
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(40px,5vw,62px)', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 20 }}>
              Original practice papers,<br />and where to find <em>the official past papers.</em>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 620, fontWeight: 500 }}>
              We do not host past papers. For real exam papers and mark schemes, go directly to the official board sites linked below. Below those, you&rsquo;ll find original practice papers we&rsquo;ve written from scratch — these are NOT past papers, just practice in the relevant style.
            </p>
          </div>
        </div>

        {/* OFFICIAL PAST PAPERS — external links */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Official past papers <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>(go to the board)</em>
            </div>
          </div>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 24, maxWidth: 720 }}>
            AQA, Pearson Edexcel and OCR each publish their own past papers and mark schemes free on their official sites. Use the links below to get them at the source — that&rsquo;s where the latest series, full mark schemes and examiner reports live.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="boards-grid">
            {BOARDS.map(b => {
              const link = OFFICIAL_PAPERS[b]
              return (
                <a
                  key={b}
                  href={link.url}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  style={{
                    background: 'var(--paper)',
                    border: '1px solid var(--rule)',
                    borderRadius: 14,
                    padding: 22,
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rule)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span className={`pill ${BOARD_PILL[b]}`} style={{ alignSelf: 'flex-start' }}>{b}</span>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em', lineHeight: 1.25, margin: 0 }}>
                    {link.label}
                  </h3>
                  <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                    {link.blurb}
                  </p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>
                    Open official site &rarr;
                  </span>
                </a>
              )
            })}
          </div>
        </section>

        {/* PRACTICE PAPERS — ours */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--rule)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Original <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>practice papers</em>
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
              {practicePapers.length} for {board} {tier}
            </div>
          </div>

          <div style={{
            background: 'var(--gold-soft)', border: '1px solid var(--gold)', borderRadius: 12,
            padding: '14px 20px', marginBottom: 20, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6,
          }}>
            <strong style={{ color: 'var(--gold)' }}>Independent practice material.</strong>{' '}
            These papers are written by the GCSEMaths team from the published exam-board specifications. They are <strong>not past papers</strong>, are <strong>not affiliated with or endorsed by</strong> AQA, Pearson Edexcel or OCR, and are intended solely for topic practice. For real past papers, use the official board links above.
          </div>

          {/* FILTER BAR */}
          <div style={{
            background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '14px 20px', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' as const,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Style of</span>
              <div style={{ display: 'flex', gap: 4 }}>
                {BOARDS.map(b => (
                  <button key={b} className={`chip${board === b ? ' active' : ''}`} onClick={() => setBoard(b)}>{b}</button>
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="papers-grid">
            {practicePapers.map(paper => (
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
                  <span className="pill pill-gold">Practice</span>
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
          {practicePapers.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--ink-3)', fontFamily: 'var(--serif)', fontSize: 18, fontStyle: 'italic' }}>
              No practice papers available for this combination.
            </div>
          )}
        </section>
      </div>

      <PredictedPapersPromo source="papers-hub" />

      <Footer />

      <style jsx>{`
        @media (max-width: 1000px) {
          .pp-header { grid-template-columns: 1fr !important; gap: 32px !important; }
          .papers-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .boards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .papers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
