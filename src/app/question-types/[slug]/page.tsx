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
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/question-types" className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
          ← Question types
        </Link>
        <header className="mt-6 mb-8">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--gold)', background: 'var(--gold-soft)' }}>
            Command word
          </span>
          <h1 className="text-4xl font-bold mt-4 leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            {q.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--ink-2)' }}>{q.shortDescription}</p>
        </header>

        <section className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>What it means</div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>{q.whatItMeans}</p>
        </section>

        <section className="rounded-xl p-5 mb-8" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--green)' }}>What examiners want</div>
          <ul className="space-y-2">
            {q.whatExaminersWant.map((p, i) => (
              <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl p-5 mb-8" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--green)' }}>Worked example</div>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--ink)' }}>{q.worked.question}</p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>{q.worked.answer}</p>
        </section>

        <section className="rounded-xl p-5 mb-8" style={{ background: 'var(--gold-soft)', border: '1px solid var(--rule)' }}>
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Common mistakes</div>
          <ul className="space-y-2">
            {q.commonMistakes.map((m, i) => (
              <li key={i} className="flex gap-3 items-start text-sm leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--gold)' }} />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl p-5 mb-8" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Marks tip</div>
          <p className="text-base leading-relaxed font-semibold" style={{ color: 'var(--ink-2)' }}>{q.scoringTip}</p>
        </section>

        {related.length > 0 && (
          <section className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Related command words</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/question-types/${r.slug}`}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                  <div className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>{r.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-3)' }}>{r.shortDescription}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="rounded-xl p-6 text-center" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--ink-2)' }}>
            Practise GCSE Maths with AI that marks your working the way real examiners do.
          </p>
          <Link href="/auth" className="inline-block text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md" style={{ background: 'var(--green)' }}>
            Start free →
          </Link>
        </div>
      </article>
    </main>
  )
}
