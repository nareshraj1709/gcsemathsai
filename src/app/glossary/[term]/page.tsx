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

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--ink-3)' }

export default async function GlossaryTermPage({ params }: Props) {
  const { term } = await params
  const entry = getGlossaryEntry(term)
  if (!entry) notFound()

  const related = (entry.related ?? []).map(slug => getGlossaryEntry(slug)).filter((e): e is NonNullable<typeof e> => Boolean(e))

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <article style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        <Link href="/glossary" style={{ ...monoLabel, textDecoration: 'none' }}>← Glossary</Link>

        <header style={{ marginTop: 24, marginBottom: 28 }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999 }}>
            {entry.category}
          </span>
          <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '14px 0 12px' }}>
            {entry.term}
          </h1>
          <p style={{ color: 'var(--ink-2)', fontSize: 'clamp(15px, 1.8vw, 17px)', lineHeight: 1.55, fontWeight: 500 }}>
            {entry.short}
          </p>
        </header>

        <section style={{ marginBottom: 24 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Definition</p>
          <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.65 }}>{entry.long}</p>
        </section>

        {entry.example && (
          <section style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 6 }}>Example</p>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.65 }}>{entry.example}</p>
          </section>
        )}

        {entry.confusion && (
          <section style={{ background: 'var(--gold-soft)', border: '1px solid var(--rule)', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 6 }}>Common confusion</p>
            <p style={{ color: 'var(--ink-2)', fontSize: 15, lineHeight: 1.65 }}>{entry.confusion}</p>
          </section>
        )}

        {entry.relatedTopics && entry.relatedTopics.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Used in these topics</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {entry.relatedTopics.map(t => (
                <Link key={t.href} href={t.href}
                  style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)', borderRadius: 999, padding: '8px 16px', textDecoration: 'none', fontSize: 13.5, fontWeight: 600 }}>
                  {t.label} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Related terms</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/glossary/${r.slug}`}
                  style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '14px 16px', textDecoration: 'none' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>{r.term}</p>
                  <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.55, marginTop: 4 }}>{r.short}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 14, lineHeight: 1.6 }}>
            Practise GCSE Maths topics with instant examiner-style marking — every term in context.
          </p>
          <Link href="/auth" className="btn btn-primary">Start free →</Link>
        </div>
      </article>
    </main>
  )
}
