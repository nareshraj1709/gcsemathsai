import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTopics } from '@/lib/topics-markdown'
import PredictedPapersPromo from '@/components/PredictedPapersPromo'
import StrandAccordion from '@/components/StrandAccordion'

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
  'Number':                              { icon: '#',  colour: 'var(--green)',     bg: 'var(--green-soft)',   border: 'var(--rule)' },
  'Algebra':                             { icon: 'x',  colour: 'var(--navy)',      bg: 'var(--navy-soft)',    border: 'var(--rule)' },
  'Ratio, Proportion & Rates of Change': { icon: '%',  colour: 'var(--gold)',      bg: 'var(--gold-soft)',    border: 'var(--rule)' },
  'Geometry & Measures':                 { icon: '△', colour: 'var(--burgundy)',  bg: 'var(--burgundy-soft)',border: 'var(--rule)' },
  'Statistics & Probability':            { icon: 'σ', colour: 'var(--green-mid)', bg: 'var(--green-soft)',   border: 'var(--rule)' },
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

        {strandOrder.map((strand, i) => {
          const strandTopics = strands[strand]
          if (!strandTopics?.length) return null
          const meta = STRAND_META[strand] ?? STRAND_META['Number']

          return (
            <StrandAccordion
              key={strand}
              strand={strand}
              icon={meta.icon}
              colour={meta.colour}
              bg={meta.bg}
              topics={strandTopics}
              defaultOpen={i === 0}
            />
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
