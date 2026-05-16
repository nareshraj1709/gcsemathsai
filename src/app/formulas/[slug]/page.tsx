import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllFormulaSheets, getFormulaSheet } from '@/lib/formula-sheet-extractor'
import PrintButton from '../PrintButton'

type Props = { params: Promise<{ slug: string }> }

const STRAND_META: Record<string, { roman: string; colour: string; soft: string }> = {
  'Number':                              { roman: 'I',   colour: 'var(--green)',    soft: 'var(--green-soft)' },
  'Algebra':                             { roman: 'II',  colour: 'var(--navy)',     soft: 'var(--navy-soft)' },
  'Ratio, Proportion & Rates of Change': { roman: 'III', colour: 'var(--gold)',     soft: 'var(--gold-soft)' },
  'Geometry & Measures':                 { roman: 'IV',  colour: 'var(--burgundy)', soft: 'var(--burgundy-soft)' },
  'Statistics & Probability':            { roman: 'V',   colour: 'var(--green-mid)',soft: 'var(--green-soft)' },
}

export async function generateStaticParams() {
  return getAllFormulaSheets().map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const s = getFormulaSheet(slug)
  if (!s) return { title: 'Formula sheet not found' }
  const t = s.shortTitle
  return {
    title: `${t} — GCSE Maths Formula Sheet`,
    description: `Formula sheet for ${t}: every formula, definition, worked example, common mistake and exam tip — printable as PDF. Free for AQA, Edexcel and OCR.`,
    keywords: [
      `${t.toLowerCase()} formula sheet`,
      `${t.toLowerCase()} gcse formulas`,
      `${t.toLowerCase()} gcse maths`,
      `${s.strand.toLowerCase()} gcse formulas`,
      'gcse maths formula sheet pdf',
    ],
    alternates: { canonical: `https://www.gcsemathsai.co.uk/formulas/${s.slug}` },
    openGraph: {
      title: `${t} — Formula Sheet | GCSEMathsAI`,
      description: `Definitions, formulas, worked example and tips for ${t}. Free, printable.`,
      url: `https://www.gcsemathsai.co.uk/formulas/${s.slug}`,
      type: 'article',
    },
  }
}

const BASE = 'https://www.gcsemathsai.co.uk'
const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

export default async function FormulaSheetPage({ params }: Props) {
  const { slug } = await params
  const s = getFormulaSheet(slug)
  if (!s) notFound()

  const meta = STRAND_META[s.strand] ?? STRAND_META['Number']
  const tierLabel = s.tier === 'Higher only' ? 'Higher only' : 'Foundation + Higher'

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Formula sheets', item: `${BASE}/formulas` },
      { '@type': 'ListItem', position: 3, name: s.shortTitle, item: `${BASE}/formulas/${s.slug}` },
    ],
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Print-friendly CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          html, body { background: white !important; }
          nav, footer.site-footer, .topbar, .no-print { display: none !important; }
          .sheet-page { padding: 0 !important; max-width: none !important; }
          .sheet-paper { box-shadow: none !important; border: none !important; padding: 24px !important; page-break-after: always; }
          a { color: inherit !important; text-decoration: none !important; }
        }
      ` }} />

      <article className="sheet-page" style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        {/* Top nav */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <Link href="/formulas" style={{ ...monoLabel, color: 'var(--ink-3)', textDecoration: 'none' }}>← All formula sheets</Link>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <PrintButton className="btn btn-primary" style={{ padding: '9px 18px', fontSize: 13 }} />
            <Link href={`/topics/${s.slug}`} className="btn btn-outline" style={{ padding: '9px 18px', fontSize: 13 }}>Full topic guide →</Link>
          </div>
        </div>

        {/* Sheet */}
        <div className="sheet-paper" style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 10px 30px -15px rgba(14,31,23,0.15)' }}>
          {/* Sheet header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--rule)' }}>
            <div>
              <span style={{ ...monoLabel, color: meta.colour, background: meta.soft, padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 10 }}>
                {s.strand}
              </span>
              <p style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 10, margin: 0 }}>
                Sheet № {String(s.topicNumber).padStart(2, '0')} · {tierLabel} · AQA · Edexcel · OCR
              </p>
            </div>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(26px, 4vw, 36px)', color: meta.colour, fontWeight: 500, letterSpacing: '-0.02em' }}>
              <b style={{ fontStyle: 'normal', color: 'var(--ink)', fontWeight: 700 }}>№ {String(s.topicNumber).padStart(2, '0')}</b>
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.05, margin: '20px 0 12px' }}>
            {s.shortTitle}
          </h1>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 24, maxWidth: 720 }}>
            {s.intro}
          </p>

          {/* Definitions */}
          {s.definitions.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <p style={{ ...monoLabel, color: meta.colour, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--gold)', fontSize: 14 }}>§</span>
                Key definitions
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                {s.definitions.map((d, i) => (
                  <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderLeft: `3px solid ${meta.colour}`, borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{d.term}</p>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>{d.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Formulas */}
          {s.formulas.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <p style={{ ...monoLabel, color: meta.colour, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--gold)', fontSize: 14 }}>§</span>
                Formulas to memorise
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {s.formulas.map((f, i) => (
                  <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderLeft: `3px solid ${meta.colour}`, borderRadius: 8, padding: '12px 14px' }}>
                    {f.label && <p style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 9.5, marginBottom: 6 }}>{f.label}</p>}
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700, color: 'var(--ink)', lineHeight: 1.55, letterSpacing: '-0.005em' }}>{f.expression}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Worked example */}
          {s.worked && (
            <section style={{ marginBottom: 24, background: 'var(--gold-soft)', border: '1.5px solid var(--gold)', borderRadius: 12, padding: 18 }}>
              <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>Worked example</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 14.5, color: 'var(--ink)', fontWeight: 600, padding: '10px 12px', background: 'var(--cream)', borderRadius: 6, borderLeft: '2px solid var(--gold)', marginBottom: 12 }}>
                {s.worked.question}
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
                {s.worked.answer}
              </p>
            </section>
          )}

          {/* Mistakes + Tips */}
          {(s.mistakes.length > 0 || s.tips.length > 0) && (
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginBottom: 24 }}>
              {s.mistakes.length > 0 && (
                <div style={{ background: 'var(--burgundy-soft)', borderLeft: '3px solid var(--burgundy)', borderRadius: '0 10px 10px 0', padding: 16 }}>
                  <p style={{ ...monoLabel, color: 'var(--burgundy)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>⚠</span> Common mistakes
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {s.mistakes.map((m, i) => (
                      <li key={i} style={{ fontFamily: 'var(--serif)', fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--burgundy)', fontWeight: 700 }}>✗</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {s.tips.length > 0 && (
                <div style={{ background: meta.soft, borderLeft: `3px solid ${meta.colour}`, borderRadius: '0 10px 10px 0', padding: 16 }}>
                  <p style={{ ...monoLabel, color: meta.colour, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--gold)' }}>✦</span> Exam tips
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {s.tips.map((t, i) => (
                      <li key={i} style={{ fontFamily: 'var(--serif)', fontSize: 12.5, color: 'var(--ink)', lineHeight: 1.5, paddingLeft: 16, position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, top: 0, color: meta.colour, fontWeight: 700, fontFamily: 'var(--mono)' }}>→</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Footer */}
          <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <span style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 9.5 }}>
              MMXXVI specification · <span style={{ color: 'var(--gold)' }}>AQA · Edexcel · OCR</span>
            </span>
            <span style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 9.5 }}>
              gcsemathsai.co.uk/formulas/{s.slug}
            </span>
          </div>
        </div>

        {/* Bonus: detailed HTML link */}
        {s.detailedHtmlHref && (
          <div className="no-print" style={{ marginTop: 24, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 4 }}>Bonus</p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>Want the deluxe museum-poster version?</p>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 4 }}>A4 and square formats designed for printing and pinning. Same content, more visual polish.</p>
            </div>
            <a href={s.detailedHtmlHref} className="btn btn-outline" style={{ padding: '9px 18px', fontSize: 13 }}>Open deluxe sheet →</a>
          </div>
        )}

        {/* Bottom nav */}
        <div className="no-print" style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/formulas" style={{ ...monoLabel, color: 'var(--green)', textDecoration: 'none' }}>← All formula sheets</Link>
          <Link href={`/topics/${s.slug}`} style={{ ...monoLabel, color: 'var(--green)', textDecoration: 'none' }}>Read the full topic guide →</Link>
        </div>
      </article>
    </main>
  )
}
