import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GLOSSARY, getGlossaryEntry } from '@/lib/glossary-data'

type Props = { params: Promise<{ term: string }> }

export async function generateStaticParams() {
  return GLOSSARY.map(g => ({ term: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { term } = await params
  const entry = getGlossaryEntry(term)
  if (!entry) return { title: 'Term not found' }
  return {
    title: `${entry.term} — GCSE Maths Glossary`,
    description: `${entry.term} explained for GCSE Maths students. ${entry.short}`,
    keywords: [entry.term.toLowerCase(), `${entry.term.toLowerCase()} gcse`, `what does ${entry.term.toLowerCase()} mean`, `${entry.category.toLowerCase()} gcse`],
    alternates: { canonical: `https://www.gcsemathsai.co.uk/glossary/${entry.slug}` },
    openGraph: {
      title: `${entry.term} — GCSE Maths Glossary | GCSEMathsAI`,
      description: entry.short,
      url: `https://www.gcsemathsai.co.uk/glossary/${entry.slug}`,
    },
  }
}

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params
  const entry = getGlossaryEntry(term)
  if (!entry) notFound()

  const related = (entry.related ?? [])
    .map(slug => getGlossaryEntry(slug))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link href="/glossary" className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
          ← Glossary
        </Link>

        <header className="mt-6 mb-8">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            {entry.category}
          </span>
          <h1 className="text-4xl font-bold mt-4 leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            {entry.term}
          </h1>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {entry.short}
          </p>
        </header>

        {/* Long definition */}
        <section className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Definition</div>
          <p className="text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>{entry.long}</p>
        </section>

        {/* Example */}
        {entry.example && (
          <section className="rounded-xl p-5 mb-6" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--green)' }}>Example</div>
            <p className="text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>{entry.example}</p>
          </section>
        )}

        {/* Common confusion */}
        {entry.confusion && (
          <section className="rounded-xl p-5 mb-6" style={{ background: 'var(--gold-soft)', border: '1px solid var(--rule)' }}>
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--gold)' }}>Common confusion</div>
            <p className="text-base leading-relaxed" style={{ color: 'var(--ink-2)' }}>{entry.confusion}</p>
          </section>
        )}

        {/* Topic links */}
        {entry.relatedTopics && entry.relatedTopics.length > 0 && (
          <section className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Used in these topics</div>
            <div className="flex flex-wrap gap-2">
              {entry.relatedTopics.map(t => (
                <Link key={t.href} href={t.href}
                  className="text-sm font-semibold px-4 py-2 rounded-xl"
                  style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
                  {t.label} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related terms */}
        {related.length > 0 && (
          <section className="mb-8">
            <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Related terms</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map(r => (
                <Link key={r.slug} href={`/glossary/${r.slug}`}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                  <div className="font-bold text-sm mb-1" style={{ color: 'var(--ink)' }}>{r.term}</div>
                  <div className="text-xs leading-relaxed" style={{ color: 'var(--ink-3)' }}>{r.short}</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-xl p-6 text-center" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
          <p className="text-sm mb-4" style={{ color: 'var(--ink-2)' }}>
            Practise GCSE Maths topics with AI marking — every term in context.
          </p>
          <Link href="/auth" className="inline-block text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-md" style={{ background: 'var(--green)' }}>
            Start free →
          </Link>
        </div>
      </article>
    </main>
  )
}
