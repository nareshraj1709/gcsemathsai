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
    description: 'Every GCSE Maths command word explained, with worked examples and mark scheme expectations.',
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
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16, textTransform: 'uppercase' }}>
          Question Types · {QUESTION_TYPES.length} guides
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Decode every GCSE Maths <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>command word</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
          &ldquo;Show that&rdquo;, &ldquo;prove&rdquo;, &ldquo;hence&rdquo;, &ldquo;estimate&rdquo; — each command has a specific meaning in the mark scheme. Use the wrong approach and you can lose every mark even with the right answer.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {QUESTION_TYPES.map(q => (
            <Link key={q.slug} href={`/question-types/${q.slug}`}
              style={{ display: 'block', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '22px 24px', textDecoration: 'none', transition: 'all 0.2s' }}>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                {q.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 12 }}>{q.shortDescription}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
                Read the guide →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(40px, 6vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Practise with <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>examiner-style marking</em>.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          GCSEMathsAI marks your working line by line — the same way the boards do.
        </p>
        <Link href="/auth" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>
          Start free →
        </Link>
      </section>
    </main>
  )
}
