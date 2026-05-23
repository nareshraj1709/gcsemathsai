import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTopics } from '@/lib/topics-markdown'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { GLOSSARY } from '@/lib/glossary-data'
import { QUESTION_TYPES } from '@/lib/question-types-data'

export const metadata: Metadata = {
  title: 'Site Map — Every Page on GCSEMathsAI',
  description: 'A complete index of every GCSE Maths revision page on GCSEMathsAI — topics, blog articles, glossary, command-word guides and exam-board hubs.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/site-map' },
  openGraph: {
    title: 'Site Map — Every Page on GCSEMathsAI',
    description: 'Browse every revision resource on the site in one place.',
    url: 'https://www.gcsemathsai.co.uk/site-map',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const linkStyle: React.CSSProperties = { fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none', display: 'block', padding: '4px 0' }

export default function SiteMapPage() {
  const topics = getAllTopics()
  const posts = getAllMarkdownPosts()

  const topicsByStrand: Record<string, typeof topics> = {}
  for (const t of topics) {
    const strand = t.strand || 'Other'
    if (!topicsByStrand[strand]) topicsByStrand[strand] = []
    topicsByStrand[strand].push(t)
  }
  for (const k of Object.keys(topicsByStrand)) {
    topicsByStrand[k].sort((a, b) => a.title.localeCompare(b.title))
  }

  const hubLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/features/revision-planner', label: 'Revision Planner' },
    { href: '/features/writing-pad', label: 'Writing Pad' },
    { href: '/features/parent-report', label: 'Parent Report' },
    { href: '/topics', label: 'All 187 topics' },
    { href: '/blog', label: 'Blog' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/question-types', label: 'Question type guides' },
    { href: '/formula-sheet', label: 'Formula sheet' },
    { href: '/aqa', label: 'AQA hub' },
    { href: '/edexcel', label: 'Edexcel hub' },
    { href: '/ocr', label: 'OCR hub' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
  ]

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Site Map
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Every page on <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>GCSEMathsAI</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
          A browsable index of every revision resource on the site — topics, blog guides, glossary terms, command-word explainers and exam-board hubs.
        </p>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        <section style={{ marginBottom: 48 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Hubs &amp; tools</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>Browse the site</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0 16px' }}>
            {hubLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} style={linkStyle}>→ {l.label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 48 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Topics</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>{topics.length} topic pages</h2>
          {Object.keys(topicsByStrand).sort().map(strand => (
            <div key={strand} style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink-2)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{strand}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0 16px' }}>
                {topicsByStrand[strand].map(t => (
                  <li key={t.slug}>
                    <Link href={`/topics/${t.slug}`} style={linkStyle}>→ {t.title.replace(/ – GCSE Maths Revision$/, '')}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: 48 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Blog</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>{posts.length} articles</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0 16px' }}>
            {posts.map(p => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} style={linkStyle}>→ {p.title}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 48 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Glossary</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>{GLOSSARY.length} terms</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0 16px' }}>
            {[...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)).map(g => (
              <li key={g.slug}>
                <Link href={`/glossary/${g.slug}`} style={linkStyle}>→ {g.term}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 48 }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Question type guides</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 20px', letterSpacing: '-0.01em' }}>{QUESTION_TYPES.length} command words</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0 16px' }}>
            {QUESTION_TYPES.map(q => (
              <li key={q.slug}>
                <Link href={`/question-types/${q.slug}`} style={linkStyle}>→ {q.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
