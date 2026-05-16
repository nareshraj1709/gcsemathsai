import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllMarkdownPosts, getMarkdownPost, renderMarkdown, extractTOC } from '@/lib/markdown'
import { BLOG_POSTS, getPost, type Block } from '@/lib/blog-posts'
import QuickQuizGenerator from '@/components/QuickQuizGenerator'
import { autoLinkTopics } from '@/lib/auto-linker'

// Maps blog slug → { topic sent to API, practiceSlug for /practice/ link, label }
const TOPIC_MAP: Record<string, { topic: string; practiceSlug: string; label: string }> = {
  'how-to-revise-gcse-maths':                  { topic: 'gcse maths revision strategies',          practiceSlug: 'gcse-maths',           label: 'GCSE Maths Revision'      },
  'gcse-maths-topics-complete-list':            { topic: 'gcse maths topics overview',              practiceSlug: 'gcse-maths',           label: 'GCSE Maths Topics'        },
  'how-to-solve-quadratic-equations-gcse':      { topic: 'quadratic equations',                     practiceSlug: 'quadratic-equations',  label: 'Quadratic Equations'      },
  'gcse-maths-grade-boundaries':                { topic: 'gcse exam technique and scoring',         practiceSlug: 'gcse-maths',           label: 'GCSE Maths'               },
  'how-to-pass-gcse-maths-resit':               { topic: 'gcse maths resit preparation',            practiceSlug: 'gcse-maths',           label: 'GCSE Maths Resit'         },
  'how-to-get-grade-9-gcse-maths':              { topic: 'gcse maths higher tier problem solving',  practiceSlug: 'gcse-maths',           label: 'Higher Tier GCSE Maths'   },
  'aqa-gcse-maths-complete-topic-checklist':    { topic: 'gcse maths topics',                       practiceSlug: 'gcse-maths',           label: 'AQA GCSE Maths Topics'    },
  'gcse-maths-grade-boundaries-explained':      { topic: 'gcse maths exam scoring',                 practiceSlug: 'gcse-maths',           label: 'GCSE Grade Boundaries'    },
  'gcse-maths-revision-tips-that-actually-work':{ topic: 'gcse maths revision',                     practiceSlug: 'gcse-maths',           label: 'GCSE Maths Revision'      },
  'gcse-maths-formulas-you-must-know':          { topic: 'gcse maths formulas and identities',      practiceSlug: 'gcse-maths',           label: 'GCSE Maths Formulas'      },
  'gcse-maths-foundation-vs-higher-which-tier': { topic: 'gcse maths foundation and higher tier',   practiceSlug: 'gcse-maths',           label: 'Foundation vs Higher'     },
  'how-ai-is-changing-gcse-maths-revision-2025':{ topic: 'gcse maths mixed practice',               practiceSlug: 'gcse-maths',           label: 'GCSE Maths'               },
  'edexcel-gcse-maths-past-papers-guide':       { topic: 'gcse maths past paper exam questions',    practiceSlug: 'gcse-maths',           label: 'Edexcel GCSE Maths'       },
  '7-day-gcse-maths-revision-plan':             { topic: 'gcse maths mixed revision',               practiceSlug: 'gcse-maths',           label: 'GCSE Maths Revision'      },
  'ocr-gcse-maths-complete-guide':              { topic: 'gcse maths topics',                       practiceSlug: 'gcse-maths',           label: 'OCR GCSE Maths'           },
  'pythagoras-theorem-gcse':                    { topic: "pythagoras theorem",                      practiceSlug: 'gcse-maths',           label: "Pythagoras' Theorem"       },
  'simultaneous-equations-gcse':                { topic: 'simultaneous equations',                  practiceSlug: 'gcse-maths',           label: 'Simultaneous Equations'    },
  'circle-theorems-gcse':                       { topic: 'circle theorems',                         practiceSlug: 'gcse-maths',           label: 'Circle Theorems'           },
  'trigonometry-gcse-maths':                    { topic: 'trigonometry soh cah toa sine cosine rule', practiceSlug: 'gcse-maths',         label: 'Trigonometry'              },
  'gcse-maths-exam-technique':                   { topic: 'gcse maths exam technique and strategy',   practiceSlug: 'gcse-maths',         label: 'GCSE Maths Exam Technique' },
}

function getQuizProps(slug: string) {
  return TOPIC_MAP[slug] ?? { topic: 'gcse maths', practiceSlug: 'gcse-maths', label: 'GCSE Maths' }
}

type Props = { params: Promise<{ slug: string }> }

const COLOUR_MAP: Record<string, { badge: string; bar: string }> = {
  purple: { badge: 'bg-purple-100 text-purple-700', bar: 'bg-purple-500' },
  blue:   { badge: 'bg-blue-100 text-blue-700',     bar: 'bg-blue-500'   },
  green:  { badge: 'bg-green-100 text-green-700',   bar: 'bg-green-500'  },
  amber:  { badge: 'bg-amber-100 text-amber-700',   bar: 'bg-amber-500'  },
  rose:   { badge: 'bg-rose-100 text-rose-700',     bar: 'bg-rose-500'   },
}

// ── Static params: markdown slugs + TypeScript slugs ─────────
export async function generateStaticParams() {
  const mdSlugs = getAllMarkdownPosts().map(p => ({ slug: p.slug }))
  const tsSlugs = BLOG_POSTS.map(p => ({ slug: p.slug }))
  return [...mdSlugs, ...tsSlugs]
}

// ── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const md = getMarkdownPost(slug)
  if (md) {
    return {
      title: md.title,
      description: md.description,
      keywords: md.keywords,
      openGraph: {
        title: md.title,
        description: md.description,
        url: `https://www.gcsemathsai.co.uk/blog/${md.slug}`,
        type: 'article',
        publishedTime: md.dateISO,
        authors: [md.author],
      },
      alternates: { canonical: `https://www.gcsemathsai.co.uk/blog/${md.slug}` },
    }
  }
  const ts = getPost(slug)
  if (ts) {
    return {
      title: ts.title,
      description: ts.metaDescription,
      keywords: ts.keywords,
      openGraph: {
        title: ts.title,
        description: ts.metaDescription,
        url: `https://www.gcsemathsai.co.uk/blog/${ts.slug}`,
        type: 'article',
        publishedTime: ts.date,
        authors: [ts.author],
      },
      alternates: { canonical: `https://www.gcsemathsai.co.uk/blog/${ts.slug}` },
    }
  }
  return { title: 'Article not found' }
}

// ── TypeScript block renderer (existing posts) ────────────────
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-xl font-bold text-gray-900 mt-10 mb-4" style={{ fontFamily: "'Georgia', serif" }}>{block.text}</h2>
    case 'h3':
      return <h3 className="text-base font-bold text-gray-800 mt-6 mb-3">{block.text}</h3>
    case 'p':
      return <p className="text-gray-700 leading-relaxed mb-4 text-[15px]">{block.text}</p>
    case 'ul':
      return (
        <ul className="mb-5 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-[15px] text-gray-700">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="mb-5 space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start text-[15px] text-gray-700">
              <span className="shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'callout':
      return (
        <div className="my-6 bg-purple-50 border border-purple-100 rounded-2xl p-5">
          <div className="flex gap-3 items-start">
            <span className="text-2xl">{block.icon}</span>
            <div>
              <p className="font-bold text-purple-800 text-sm mb-1">{block.title}</p>
              <p className="text-purple-700 text-sm leading-relaxed">{block.text}</p>
            </div>
          </div>
        </div>
      )
    case 'table':
      return (
        <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {block.headers.map((h, i) => <th key={i} className="text-left px-4 py-3 font-bold text-gray-700">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, j) => <td key={j} className="px-4 py-3 text-gray-700 border-b border-gray-100">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'cta':
      return (
        <div className="my-8 bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-6 text-center">
          <p className="text-white font-semibold mb-4 text-sm leading-relaxed">{block.text}</p>
          <Link href={block.href} className="inline-block bg-white text-purple-700 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-purple-50 transition">
            {block.label}
          </Link>
        </div>
      )
    default:
      return null
  }
}

// ── Page ─────────────────────────────────────────────────────
const BASE = 'https://www.gcsemathsai.co.uk'

function BlogJsonLd({ title, description, slug, date, author }: {
  title: string; description: string; slug: string; date: string; author: string
}) {
  const url = `${BASE}/blog/${slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    datePublished: date,
    dateModified: date,
    author: { '@type': 'Person', name: author },
    publisher: { '@type': 'Organization', name: 'GCSEMathsAI', url: BASE, logo: { '@type': 'ImageObject', url: `${BASE}/og.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-GB',
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  // Try markdown first
  const md = getMarkdownPost(slug)

  if (md) {
    const rawHtmlContent = renderMarkdown(md.content)
    const htmlContent = autoLinkTopics(rawHtmlContent, slug)
    const toc = extractTOC(md.content)
    const colours = COLOUR_MAP[md.categoryColour] ?? COLOUR_MAP.purple
    const otherMd = getAllMarkdownPosts().filter(p => p.slug !== md.slug).slice(0, 2)
    const otherTs = BLOG_POSTS.slice(0, 3 - otherMd.length)
    const quiz = getQuizProps(slug)

    return (
      <main className="blog-article-page" style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        <BlogJsonLd title={md.title} description={md.description} slug={slug} date={md.dateISO} author={md.author} />

        {/* Hero */}
        <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(28px, 4vw, 56px) clamp(20px, 4vw, 40px)' }}>
            <Link href="/blog" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to blog</Link>
            <div style={{ maxWidth: 760, marginTop: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <span className={colours.badge} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {md.category}
                </span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>{md.readMins} min read</span>
              </div>
              <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.08, color: 'var(--ink)', margin: '0 0 16px' }}>
                {md.title}
              </h1>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.7vw, 18px)', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20, fontWeight: 500 }}>{md.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-3)' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 13, fontStyle: 'italic' }}>G</div>
                <span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{md.author}</span>
                <span>·</span>
                <span>{md.date}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Body + TOC */}
        <div className="blog-article-body" style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 40px)', display: 'grid', gridTemplateColumns: '1fr', gap: 40 }}>
          <article className="blog-prose" style={{ minWidth: 0 }} dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* Sticky TOC at lg+ */}
          {toc.length > 0 && (
            <aside className="blog-toc">
              <div style={{ position: 'sticky', top: 96 }}>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>On this page</p>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {toc.map(item => (
                    <a key={item.id} href={`#${item.id}`} style={{ fontSize: 13, color: 'var(--ink-3)', textDecoration: 'none', lineHeight: 1.5 }}>
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Layout responsive CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1024px) {
            .blog-article-body { grid-template-columns: minmax(0, 1fr) 220px !important; gap: 48px !important; }
          }
          .blog-toc { order: 1; }
          @media (min-width: 1024px) { .blog-toc { order: 0; } }
        ` }} />

        {/* CTA + Quick Quiz inside same column */}
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px)' }}>
          <div className="blog-cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0 }}>
            <div style={{ maxWidth: 760, background: 'var(--green)', borderRadius: 16, padding: 'clamp(20px, 3vw, 32px)', textAlign: 'center', margin: '0 0 24px' }}>
              <p style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2.2vw, 22px)', fontWeight: 600, marginBottom: 14, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                Put this into practice — try AI-marked questions on this topic, <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>completely free</em>.
              </p>
              <Link href="/learn" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>Start practising free →</Link>
            </div>
            <div style={{ maxWidth: 760 }}>
              <QuickQuizGenerator topic={quiz.topic} topicSlug={quiz.practiceSlug} topicLabel={quiz.label} />
            </div>
          </div>
        </div>

        {/* More articles */}
        <section style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>More articles</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {[
              ...otherMd.map(p => ({ slug: p.slug, title: p.title, category: p.category, colour: COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple, readMins: p.readMins })),
              ...otherTs.map(p => ({ slug: p.slug, title: p.title, category: p.category, colour: COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple, readMins: p.readMins })),
            ].map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '18px 20px', textDecoration: 'none', overflow: 'hidden', position: 'relative' }}>
                <div className={p.colour.bar} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }} />
                <span className={p.colour.badge} style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{p.category}</span>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.01em', margin: '4px 0 0' }}>{p.title}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'auto', paddingTop: 12 }}>{p.readMins} min read · Read →</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    )
  }

  // Fall back to TypeScript-based post
  const ts = getPost(slug)
  if (!ts) notFound()
  const quiz = getQuizProps(slug)

  const colours = COLOUR_MAP[ts.categoryColour] ?? COLOUR_MAP.purple
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== ts.slug).slice(0, 3)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <BlogJsonLd title={ts.title} description={ts.metaDescription} slug={slug} date={ts.date} author={ts.author} />

      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: 'clamp(28px, 4vw, 56px) clamp(20px, 4vw, 40px)' }}>
          <Link href="/blog" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to blog</Link>
          <div style={{ maxWidth: 760, marginTop: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <span className={colours.badge} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 999, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {ts.category}
              </span>
              <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>{ts.readMins} min read</span>
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.08, color: 'var(--ink)', margin: '0 0 16px' }}>{ts.title}</h1>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.7vw, 18px)', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 20, fontWeight: 500 }}>{ts.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--ink-3)' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green)', color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 13, fontStyle: 'italic' }}>G</div>
              <span style={{ fontWeight: 600, color: 'var(--ink-2)' }}>{ts.author}</span>
              <span>·</span>
              <span>{ts.date}</span>
            </div>
          </div>
        </div>
      </section>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 40px)' }}>
        {ts.blocks.map((block, i) => <RenderBlock key={i} block={block} />)}
        <div style={{ marginTop: 32 }}>
          <QuickQuizGenerator topic={quiz.topic} topicSlug={quiz.practiceSlug} topicLabel={quiz.label} />
        </div>
      </article>

      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '0 clamp(20px, 4vw, 40px) clamp(40px, 6vw, 64px)' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>More articles</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
          {otherPosts.map(p => {
            const c = COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple
            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '18px 20px', textDecoration: 'none', overflow: 'hidden', position: 'relative' }}>
                <div className={c.bar} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3 }} />
                <span className={c.badge} style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 999, fontFamily: 'var(--mono)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 4 }}>{p.category}</span>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.25, letterSpacing: '-0.01em', margin: '4px 0 0' }}>{p.title}</p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 'auto', paddingTop: 12 }}>{p.readMins} min read · Read →</p>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
