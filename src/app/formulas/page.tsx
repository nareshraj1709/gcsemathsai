import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllFormulaSheets, getSheetsByStrand } from '@/lib/formula-sheet-extractor'

export const metadata: Metadata = {
  title: 'GCSE Maths Formula Sheets — Every Topic, Free PDF & Print',
  description: 'Free formula sheets for every GCSE Maths topic — Number, Algebra, Ratio, Geometry, Statistics. Each sheet lists definitions, formulas, worked examples, common mistakes and exam tips. Printable and downloadable as PDF.',
  keywords: ['gcse maths formula sheet', 'gcse maths formulas pdf', 'gcse maths formula list', 'gcse maths topic formulas', 'aqa edexcel ocr formula sheet', 'gcse maths formula download'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/formulas' },
  openGraph: {
    title: 'GCSE Maths Formula Sheets — Every Topic | GCSEMathsAI',
    description: 'Free formula sheets for every GCSE Maths topic — definitions, formulas, worked examples and exam tips. Printable PDF.',
    url: 'https://www.gcsemathsai.co.uk/formulas',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const STRAND_ORDER = ['Number', 'Algebra', 'Ratio, Proportion & Rates of Change', 'Geometry & Measures', 'Statistics & Probability']

const STRAND_META: Record<string, { roman: string; colour: string; soft: string; desc: string }> = {
  'Number':                              { roman: 'I',   colour: 'var(--green)',    soft: 'var(--green-soft)',    desc: 'Integers, fractions, percentages, ratio, indices, standard form, surds, bounds.' },
  'Algebra':                             { roman: 'II',  colour: 'var(--navy)',     soft: 'var(--navy-soft)',     desc: 'Expressions, equations, graphs, quadratics, sequences, functions, iteration.' },
  'Ratio, Proportion & Rates of Change': { roman: 'III', colour: 'var(--gold)',     soft: 'var(--gold-soft)',     desc: 'Speed, density, compound measures, growth and decay, scale, conversions.' },
  'Geometry & Measures':                 { roman: 'IV',  colour: 'var(--burgundy)', soft: 'var(--burgundy-soft)', desc: 'Angles, polygons, circles, Pythagoras, trigonometry, vectors, transformations.' },
  'Statistics & Probability':            { roman: 'V',   colour: 'var(--green-mid)',soft: 'var(--green-soft)',    desc: 'Averages, cumulative frequency, histograms, tree diagrams, Venn diagrams.' },
}

export default function FormulasIndexPage() {
  const sheets = getAllFormulaSheets()
  const grouped = getSheetsByStrand()
  const totalSheets = sheets.length

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Formula Sheets · {totalSheets} topics
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Every formula, <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>every topic</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 22px' }}>
          Free formula sheets for every GCSE Maths topic — definitions, formulas, worked examples, common mistakes and exam tips. Each sheet is print-ready: click <strong>Print / Save as PDF</strong> on any sheet to download it.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/GCSE_Maths_Formula_Sheet.pdf" download className="btn btn-primary">Download master PDF →</a>
          <Link href="/topics" className="btn btn-outline">Browse topics</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px 16px' }}>
        <p style={{ ...monoLabel, color: 'var(--ink-3)', marginBottom: 12 }}>Jump to strand</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {STRAND_ORDER.map(strand => {
            const meta = STRAND_META[strand]
            const count = (grouped[strand] ?? []).length
            if (!meta || count === 0) return null
            return (
              <a key={strand} href={`#${strand.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                style={{ ...monoLabel, color: meta.colour, background: meta.soft, border: '1px solid var(--rule)', padding: '6px 14px', borderRadius: 999, textDecoration: 'none' }}>
                {strand} ({count})
              </a>
            )
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 64px' }}>
        {STRAND_ORDER.map(strand => {
          const list = grouped[strand]
          if (!list || list.length === 0) return null
          const meta = STRAND_META[strand]
          const anchor = strand.toLowerCase().replace(/[^a-z]+/g, '-')
          return (
            <div key={strand} id={anchor} style={{ marginTop: 40, scrollMarginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, paddingBottom: 14, borderBottom: '1px solid var(--rule)', marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 38, color: meta.colour, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1 }}>{meta.roman}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{strand}</h2>
                  <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.55 }}>{meta.desc}</p>
                </div>
                <span style={{ ...monoLabel, color: 'var(--ink-3)' }}>{list.length} sheets</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {list.map(s => (
                  <Link key={s.slug} href={`/formulas/${s.slug}`}
                    style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '20px 22px', textDecoration: 'none', position: 'relative', overflow: 'hidden', minHeight: 160 }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: meta.colour }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginTop: 6 }}>
                      <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28, color: meta.colour, fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 0.85 }}>
                        <b style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 700 }}>№ {String(s.topicNumber).padStart(2, '0')}</b>
                      </span>
                      <span style={{ ...monoLabel, color: s.tier === 'Higher only' ? 'var(--burgundy)' : 'var(--ink-3)', background: s.tier === 'Higher only' ? 'var(--burgundy-soft)' : 'var(--cream-2)', padding: '3px 8px', borderRadius: 4, fontSize: 9.5, whiteSpace: 'nowrap' }}>
                        {s.tier === 'Higher only' ? 'Higher' : 'F + H'}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{s.shortTitle}</h3>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5, flex: 1 }}>{s.description.slice(0, 130)}{s.description.length > 130 ? '…' : ''}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px dashed var(--rule)', marginTop: 4 }}>
                      <span style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 10 }}>{s.formulas.length} formulas</span>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: 14, color: meta.colour, fontWeight: 700 }}>Open →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(40px, 6vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Print one. Stick it on <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>your wall.</em>
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          Every sheet is print-optimised. Open one, click the Print / Save as PDF button, and you have a clean A4 reference.
        </p>
        <a href="/GCSE_Maths_Formula_Sheet.pdf" download className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>Master PDF (free) →</a>
      </section>
    </main>
  )
}
