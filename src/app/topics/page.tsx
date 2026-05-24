import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTopics } from '@/lib/topics-markdown'
import PredictedPapersPromo from '@/components/PredictedPapersPromo'

export const metadata: Metadata = {
  title: 'All GCSE Maths Topics â€” Complete Revision Guide',
  description: 'Browse all 245 GCSE Maths topics with step-by-step explanations, worked examples and practice questions. Covers AQA, Edexcel and OCR specifications.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/topics' },
  openGraph: {
    title: 'All GCSE Maths Topics â€” Complete Revision Guide',
    description: 'Browse all 245 GCSE Maths topics with explanations, worked examples and practice questions.',
    url: 'https://www.gcsemathsai.co.uk/topics',
  },
}

const STRAND_META: Record<string, { icon: string; colour: string; bg: string; border: string }> = {
  'Number':                              { icon: 'ðŸ”¢', colour: 'var(--green)',     bg: 'var(--green-soft)',   border: 'var(--rule)' },
  'Algebra':                             { icon: 'ðŸ“', colour: 'var(--navy)',      bg: 'var(--navy-soft)',    border: 'var(--rule)' },
  'Ratio, Proportion & Rates of Change': { icon: 'âš–ï¸', colour: 'var(--gold)',      bg: 'var(--gold-soft)',    border: 'var(--rule)' },
  'Geometry & Measures':                 { icon: 'ðŸ“', colour: 'var(--burgundy)',  bg: 'var(--burgundy-soft)',border: 'var(--rule)' },
  'Statistics & Probability':            { icon: 'ðŸ“Š', colour: 'var(--green-mid)', bg: 'var(--green-soft)',   border: 'var(--rule)' },
}

const BASE = 'https://www.gcsemathsai.co.uk'

export default function TopicsIndexPage() {
  const topics = getAllTopics()

  // Group by strand
  const strands: Record<string, typeof topics> = {}
  for (const t of topics) {
    const strand = t.strand || t.category
    if (!strands[strand]) strands[strand] = []
    strands[strand].push(t)
  }

  const strandOrder = [
    'Number',
    'Algebra',
    'Ratio, Proportion & Rates of Change',
    'Geometry & Measures',
    'Statistics & Probability',
  ]

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'GCSE Maths â€” Complete Topic Guide',
    description: 'Step-by-step guides, worked examples and practice questions for all 245 GCSE Maths topics across AQA, Edexcel and OCR specifications.',
    provider: { '@type': 'Organization', name: 'GCSEMathsAI', url: BASE },
    url: `${BASE}/topics`,
    educationalLevel: 'GCSE',
    inLanguage: 'en-GB',
    numberOfCredits: 245,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT73H',
    },
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'All Topics', item: `${BASE}/topics` },
    ],
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
        padding: '48px 24px',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: 11,
          fontWeight: 700,
          fontFamily: 'var(--mono)',
          color: 'var(--green)',
          background: 'var(--green-soft)',
          padding: '4px 14px',
          borderRadius: 999,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          {topics.length} Topics
        </span>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(24px, 5vw, 36px)',
          fontWeight: 800,
          color: 'var(--ink)',
          margin: '0 0 8px',
        }}>
          Every GCSE Maths Topic â€” Explained
        </h1>
        <p style={{
          fontSize: 14,
          color: 'var(--ink-3)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Step-by-step guides, worked examples and practice questions for every topic on the AQA, Edexcel and OCR GCSE Maths specification.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 24px' }}>

        {strandOrder.map(strand => {
          const strandTopics = strands[strand]
          if (!strandTopics?.length) return null
          const meta = STRAND_META[strand] ?? STRAND_META['Number']

          return (
            <div key={strand} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 24 }}>{meta.icon}</span>
                <h2 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: meta.colour,
                  margin: 0,
                }}>{strand}</h2>
                <span style={{
                  fontSize: 11,
                  fontFamily: 'var(--mono)',
                  color: 'var(--ink-3)',
                  background: 'var(--cream-2)',
                  padding: '2px 10px',
                  borderRadius: 999,
                }}>
                  {strandTopics.length} topics
                </span>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 12,
              }}>
                {strandTopics.map((topic, idx) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    style={{
                      display: 'block',
                      background: 'var(--paper)',
                      border: '1px solid var(--rule)',
                      borderRadius: 12,
                      padding: '14px 16px',
                      transition: 'all 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{
                          fontFamily: 'var(--serif)',
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'var(--ink)',
                          lineHeight: 1.4,
                          margin: 0,
                        }}>
                          {idx + 1}. {topic.title.replace(/\s*[–—–—-]\s*(GCSE|Revision|Step).*$/, '').replace(/ GCSE.*$/, '')}
                        </p>
                        <p style={{
                          fontSize: 12,
                          color: 'var(--ink-3)',
                          marginTop: 4,
                          lineHeight: 1.4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {topic.description}
                        </p>
                      </div>
                      {topic.tier === 'Higher only' && (
                        <span style={{
                          flexShrink: 0,
                          fontSize: 10,
                          fontWeight: 700,
                          fontFamily: 'var(--mono)',
                          color: 'var(--gold)',
                          background: 'var(--gold-soft)',
                          padding: '2px 6px',
                          borderRadius: 4,
                        }}>
                          H
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div style={{
          background: 'var(--green)',
          borderRadius: 16,
          padding: '40px 32px',
          textAlign: 'center',
          marginTop: 32,
        }}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 8px',
          }}>Ready to practise?</h2>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.75)',
            maxWidth: 440,
            margin: '0 auto 24px',
            lineHeight: 1.5,
          }}>
            Get AI-marked practice questions on any topic â€” with instant feedback and step-by-step solutions.
          </p>
          <Link
            href="/auth"
            style={{
              display: 'inline-block',
              background: '#fff',
              color: 'var(--green)',
              fontWeight: 700,
              fontFamily: 'var(--sans)',
              padding: '12px 32px',
              borderRadius: 10,
              fontSize: 14,
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
          >
            Start free &rarr;
          </Link>
        </div>

        {/* Related resources */}
        <div style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}>
          <Link href="/formula-sheet" style={{
            display: 'block',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 12,
            padding: '20px',
            transition: 'all 0.2s',
            textDecoration: 'none',
          }}>
            <p style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--serif)', color: 'var(--green)', margin: 0 }}>Formula Sheet</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Every GCSE Maths formula in one free PDF</p>
          </Link>
          <Link href="/blog" style={{
            display: 'block',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 12,
            padding: '20px',
            transition: 'all 0.2s',
            textDecoration: 'none',
          }}>
            <p style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--serif)', color: 'var(--navy)', margin: 0 }}>Blog</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Revision guides, exam tips and strategy articles</p>
          </Link>
          <Link href="/study" style={{
            display: 'block',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: 12,
            padding: '20px',
            transition: 'all 0.2s',
            textDecoration: 'none',
          }}>
            <p style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--serif)', color: 'var(--gold)', margin: 0 }}>Study Notes</p>
            <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 4 }}>Key facts, formulas and worked examples by topic</p>
          </Link>
        </div>
      </div>
      <PredictedPapersPromo source="topics-index" />
    </main>
  )
}
