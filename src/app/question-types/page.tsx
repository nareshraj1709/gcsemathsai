import type { Metadata } from 'next'
import Link from 'next/link'
import { QUESTION_TYPES } from '@/lib/question-types-data'

export const metadata: Metadata = {
  title: 'GCSE Maths Command Words — How to Answer Every Question Type',
  description: 'Decode every GCSE Maths command word: "show that", "prove", "hence", "estimate", "describe", "give reasons" and more. Each one explained with worked examples for AQA, Edexcel and OCR.',
  keywords: ['gcse maths command words', 'gcse maths question types', 'how to answer gcse maths questions', 'gcse maths show that', 'gcse maths hence', 'gcse maths estimate'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/question-types' },
  openGraph: {
    title: 'GCSE Maths Command Words — How to Answer Every Question Type | GCSEMathsAI',
    description: 'Every GCSE Maths command word explained, with worked examples and the mark scheme expectations behind each one.',
    url: 'https://www.gcsemathsai.co.uk/question-types',
  },
}

const BASE = 'https://www.gcsemathsai.co.uk'

export default function QuestionTypesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Question Types', item: `${BASE}/question-types` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--gold)', background: 'var(--gold-soft)' }}>
            Question Types
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            Decode every GCSE Maths <em>command word</em>.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            "Show that", "prove", "hence", "estimate" — each command word has a specific meaning in the mark scheme. Use the wrong approach and you can lose every mark even with the right answer.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 grid gap-4">
        {QUESTION_TYPES.map(q => (
          <Link key={q.slug} href={`/question-types/${q.slug}`}
            className="rounded-2xl p-6 transition hover:shadow-sm"
            style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
            <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{q.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-3)' }}>{q.shortDescription}</p>
            <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--gold)' }}>Read the guide →</div>
          </Link>
        ))}
      </section>

      <section className="px-6 py-12 text-center" style={{ background: 'var(--green)' }}>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Practise with examiner-style marking.</h2>
        <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'var(--green-soft)' }}>
          GCSEMathsAI marks your working line by line — the same way the boards do.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-7 py-3 rounded-xl text-sm" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Start free →
        </Link>
      </section>
    </main>
  )
}
