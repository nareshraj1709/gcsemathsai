import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { QUESTION_TYPES, getQuestionType } from '@/lib/question-types-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return QUESTION_TYPES.map(q => ({ slug: q.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const q = getQuestionType(slug)
  if (!q) return { title: 'Question type not found' }
  return {
    title: q.title,
    description: q.metaDescription,
    keywords: q.keywords,
    alternates: { canonical: `https://www.gcsemathsai.co.uk/question-types/${q.slug}` },
    openGraph: {
      title: `${q.title} | GCSEMathsAI`,
      description: q.metaDescription,
      url: `https://www.gcsemathsai.co.uk/question-types/${q.slug}`,
      type: 'article',
    },
  }
}

const BASE = 'https://www.gcsemathsai.co.uk'
const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--ink-3)' }

export default async function QuestionTypePage({ params }: Props) {
  const { slug } = await params
  const q = getQuestionType(slug)
  if (!q) notFound()

  const related = (q.relatedSlugs ?? []).map(s => getQuestionType(s)).filter((x): x is NonNullable<typeof x> => Boolean(x))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Question Types', item: `${BASE}/question-types` },
      { '@type': 'ListItem', position: 3, name: q.title, item: `${BASE}/question-types/${q.slug}` },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: q.title,
    description: q.metaDescription,
    author: { '@type': 'Organization', name: 'GCSEMathsAI' },
    publisher: { '@type': 'Organization', name: 'GCSEMathsAI' },
    mainEntityOfPage: `${BASE}/question-types/${q.slug}`,
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        <Link href="/question-types" style={{ ...monoLabel, textDecoration: 'none' }}>← Question types</Link>

        <header style={{ marginTop: 24, marginBottom: 28 }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 14px', borderRadius: 999, textTransform: 'uppercase' }}>
            Command word
          </span>
          <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '14px 0 12px' }}>
            {q.title}
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.55, fontWeight: 500 }}>
            {q.shortDescription}
          </p>
        </header>

        <section style={{ marginBottom: 24 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>What it means</p>
          <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.65 }}>{q.whatItMeans}</p>
        </section>

        <section style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22, marginBottom: 20 }}>
          <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 12 }}>What examiners want</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.whatExaminersWant.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <span style={{ marginTop: 8, width: 6, height: 6, borderRadius: 999, background: 'var(--green)', flexShrink: 0 }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22, marginBottom: 20 }}>
          <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 10 }}>Worked example</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8, fontFamily: 'var(--serif)' }}>{q.worked.question}</p>
          <p style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.65 }}>{q.worked.answer}</p>
        </section>

        <section style={{ background: 'var(--gold-soft)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22, marginBottom: 20 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Common mistakes</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.commonMistakes.map((m, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14.5, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                <span style={{ marginTop: 8, width: 6, height: 6, borderRadius: 999, background: 'var(--gold)', flexShrink: 0 }} />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Marks tip</p>
          <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.65, fontWeight: 600 }}>{q.scoringTip}</p>
        </section>

        {related.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Related command words</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/question-types/${r.slug}`}
                  style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                    {r.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}
                  </p>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.55, marginTop: 4 }}>{r.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 14, lineHeight: 1.6 }}>
            Practise GCSE Maths with instant marking that grades your working the way real examiners do.
          </p>
          <Link href="/auth" className="btn btn-primary">Start free →</Link>
        </div>
      </article>
    </main>
  )
}
