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
  'Command Words':            { colour: 'var(--gold)',     bg: 'var(--gold-soft)',     note: "The words examiners use to tell you exactly what they want." },
  'Number':                   { colour: 'var(--green)',    bg: 'var(--green-soft)',    note: 'Integers, primes, rationals, surds and bounds.' },
  'Algebra':                  { colour: 'var(--navy)',     bg: 'var(--navy-soft)',     note: 'Expressions, equations, functions and the language of letters.' },
  'Geometry':                 { colour: 'var(--burgundy)', bg: 'var(--burgundy-soft)', note: 'Lines, angles, circles, vectors and the parts of a shape.' },
  'Statistics & Probability': { colour: 'var(--green-mid)',bg: 'var(--green-soft)',    note: 'Averages, spread, correlation, sets and events.' },
}

export default function GlossaryIndexPage() {
  const grouped = getGlossaryByCategory()

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Glossary
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            Every GCSE Maths term, <em>explained in plain English</em>.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            {GLOSSARY.length} key terms across command words, number, algebra, geometry, statistics and probability. The vocabulary your exam will use — and exactly what each word means in the mark scheme.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Jump to</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_ORDER.map(cat => (
            <a key={cat} href={`#${cat.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ color: CATEGORY_META[cat].colour, background: CATEGORY_META[cat].bg, border: '1px solid var(--rule)' }}>
              {cat} ({(grouped[cat] ?? []).length})
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-4xl mx-auto px-6 pb-20 grid gap-12">
        {CATEGORY_ORDER.map(cat => {
          const entries = grouped[cat] ?? []
          if (entries.length === 0) return null
          const meta = CATEGORY_META[cat]
          const anchor = cat.toLowerCase().replace(/[^a-z]+/g, '-')
          return (
            <div key={cat} id={anchor} className="scroll-mt-20">
              <div className="flex items-baseline justify-between mb-2 flex-wrap gap-2">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{cat}</h2>
                <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>{entries.length} terms</span>
              </div>
              <p className="text-sm mb-5" style={{ color: 'var(--ink-3)' }}>{meta.note}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {entries.map(e => (
                  <Link key={e.slug} href={`/glossary/${e.slug}`}
                    className="rounded-xl p-4 transition hover:shadow-sm"
                    style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                    <div className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>{e.term}</div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-3)' }}>{e.short}</div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA */}
      <section className="px-6 py-12 text-center" style={{ background: 'var(--green)' }}>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Know the words. Win the marks.</h2>
        <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'var(--green-soft)' }}>
          Practise GCSE Maths topics with AI marking — built around the exact language your exam will use.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-7 py-3 rounded-xl text-sm" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Start free — no card →
        </Link>
      </section>
    </main>
  )
}
