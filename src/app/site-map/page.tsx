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

export default function SiteMapPage() {
  const topics = getAllTopics()
  const posts = getAllMarkdownPosts()

  // Group topics by strand
  const topicsByStrand: Record<string, typeof topics> = {}
  for (const t of topics) {
    const strand = t.strand || 'Other'
    if (!topicsByStrand[strand]) topicsByStrand[strand] = []
    topicsByStrand[strand].push(t)
  }
  for (const k of Object.keys(topicsByStrand)) {
    topicsByStrand[k].sort((a, b) => a.title.localeCompare(b.title))
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Site Map
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            Every page on <em>GCSEMathsAI</em>.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            A browsable index of every revision resource on the site — topics, blog guides, glossary terms, command-word explainers and exam-board hubs.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 grid gap-10">
        {/* Hubs */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Hubs &amp; tools</h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/features', label: 'Features' },
              { href: '/features/revision-planner', label: 'Revision Planner' },
              { href: '/features/writing-pad', label: 'Writing Pad' },
              { href: '/features/parent-report', label: 'Parent Report' },
              { href: '/topics', label: 'All 73 topics' },
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
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  → {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Topics by strand */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Topics</h2>
          {Object.keys(topicsByStrand).sort().map(strand => (
            <div key={strand} className="mb-6">
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--ink-2)' }}>{strand}</h3>
              <ul className="grid sm:grid-cols-2 gap-1">
                {topicsByStrand[strand].map(t => (
                  <li key={t.slug}>
                    <Link href={`/topics/${t.slug}`} className="text-sm" style={{ color: 'var(--ink-2)' }}>
                      → {t.title.replace(/ – GCSE Maths Revision$/, '')}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Blog */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Blog articles</h2>
          <ul className="grid sm:grid-cols-2 gap-1">
            {posts.map(p => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  → {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Glossary */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Glossary ({GLOSSARY.length} terms)</h2>
          <ul className="grid sm:grid-cols-3 gap-1">
            {[...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term)).map(g => (
              <li key={g.slug}>
                <Link href={`/glossary/${g.slug}`} className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  → {g.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Question types */}
        <section>
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Question type guides</h2>
          <ul className="grid sm:grid-cols-2 gap-1">
            {QUESTION_TYPES.map(q => (
              <li key={q.slug}>
                <Link href={`/question-types/${q.slug}`} className="text-sm" style={{ color: 'var(--ink-2)' }}>
                  → {q.title.replace(/^How to answer /, '').replace(/ in GCSE Maths$/, '')}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
