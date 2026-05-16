import type { Metadata } from 'next'
import Link from 'next/link'
import { GLOSSARY, getGlossaryByCategory } from '@/lib/glossary-data'

export const metadata: Metadata = {
  title: 'GCSE Maths Glossary — Every Key Term Defined',
  description: 'A complete A–Z glossary of GCSE Maths terms — command words, algebra, geometry, statistics and probability vocabulary explained in plain English for AQA, Edexcel and OCR.',
  keywords: ['gcse maths glossary', 'gcse maths terms', 'gcse maths command words', 'gcse maths vocabulary', 'show that gcse meaning', 'hence gcse meaning'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/glossary' },
  openGraph: {
    title: 'GCSE Maths Glossary — Every Key Term Defined | GCSEMathsAI',
    description: 'A–Z glossary of GCSE Maths terms in plain English. Command words, algebra, geometry, statistics.',
    url: 'https://www.gcsemathsai.co.uk/glossary',
  },
}

const CATEGORY_ORDER = ['Command Words', 'Number', 'Algebra', 'Geometry', 'Statistics & Probability'] as const

const CATEGORY_META: Record<string, { colour: string; bg: string; note: string }> = {
  'Command Words':            { colour: 'var(--gold)',     bg: 'var(--gold-soft)',     note: 'The words examiners use to tell you exactly what they want.' },
  'Number':                   { colour: 'var(--green)',    bg: 'var(--green-soft)',    note: 'Integers, primes, rationals, surds and bounds.' },
  'Algebra':                  { colour: 'var(--navy)',     bg: 'var(--navy-soft)',     note: 'Expressions, equations, functions and the language of letters.' },
  'Geometry':                 { colour: 'var(--burgundy)', bg: 'var(--burgundy-soft)', note: 'Lines, angles, circles, vectors and the parts of a shape.' },
  'Statistics & Probability': { colour: 'var(--green-mid)',bg: 'var(--green-soft)',    note: 'Averages, spread, correlation, sets and events.' },
}

const MONO_BADGE = 'inline-block uppercase font-semibold'
const monoBadgeStyle = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', padding: '4px 14px', borderRadius: 999 } as const

export default function GlossaryIndexPage() {
  const grouped = getGlossaryByCategory()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Hero */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span className={MONO_BADGE} style={{ ...monoBadgeStyle, color: 'var(--green)', background: 'var(--green-soft)', marginBottom: 16 }}>
          Glossary · {GLOSSARY.length} terms
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Every GCSE Maths term, <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>explained in plain English</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
          Key terms across command words, number, algebra, geometry, statistics and probability — the vocabulary your exam will use, and exactly what each word means in the mark scheme.
        </p>
      </section>

      {/* Quick nav */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px 16px' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', marginBottom: 12 }}>Jump to</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORY_ORDER.map(cat => (
            <a key={cat} href={`#${cat.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: CATEGORY_META[cat].colour, background: CATEGORY_META[cat].bg, border: '1px solid var(--rule)', padding: '6px 14px', borderRadius: 999, textDecoration: 'none' }}>
              {cat} ({(grouped[cat] ?? []).length})
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 64px' }}>
        {CATEGORY_ORDER.map(cat => {
          const entries = grouped[cat] ?? []
          if (entries.length === 0) return null
          const meta = CATEGORY_META[cat]
          const anchor = cat.toLowerCase().replace(/[^a-z]+/g, '-')
          return (
            <div key={cat} id={anchor} style={{ marginTop: 40, scrollMarginTop: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: meta.colour, margin: 0, letterSpacing: '-0.01em' }}>{cat}</h2>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{entries.length} terms</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 20 }}>{meta.note}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                {entries.map(e => (
                  <Link key={e.slug} href={`/glossary/${e.slug}`}
                    style={{ display: 'block', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '16px 18px', textDecoration: 'none', transition: 'all 0.2s' }}>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em' }}>{e.term}</p>
                    <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.55, marginTop: 6 }}>{e.short}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--green)', padding: 'clamp(40px, 6vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Know the words. <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>Win the marks.</em>
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          Practise GCSE Maths topics with AI marking — built around the exact language your exam will use.
        </p>
        <Link href="/auth" className="btn btn-outline" style={{ background: 'var(--cream)', color: 'var(--green)', boxShadow: 'none', padding: '11px 24px' }}>
          Start free — no card →
        </Link>
      </section>
    </main>
  )
}
