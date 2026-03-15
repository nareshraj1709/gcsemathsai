import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllMarkdownPosts, getMarkdownPost, renderMarkdown, extractTOC } from '@/lib/markdown'
import { BLOG_POSTS, getPost, type Block } from '@/lib/blog-posts'

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
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  // Try markdown first
  const md = getMarkdownPost(slug)

  if (md) {
    const htmlContent = renderMarkdown(md.content)
    const toc = extractTOC(md.content)
    const colours = COLOUR_MAP[md.categoryColour] ?? COLOUR_MAP.purple
    const otherMd = getAllMarkdownPosts().filter(p => p.slug !== md.slug).slice(0, 2)
    const otherTs = BLOG_POSTS.slice(0, 3 - otherMd.length)

    return (
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="bg-purple-50 border-b border-purple-100 px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="text-xs text-purple-600 font-semibold hover:underline">← Back to blog</Link>
            <div className="flex items-center gap-2 mt-4 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>{md.category}</span>
              <span className="text-xs text-gray-400">{md.readMins} min read</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: "'Georgia', serif" }}>
              {md.title}
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-6">{md.description}</p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs">G</div>
              <span className="font-medium text-gray-600">{md.author}</span>
              <span>·</span>
              <span>{md.date}</span>
            </div>
          </div>
        </div>

        {/* Body + TOC */}
        <div className="max-w-3xl mx-auto px-6 py-10 flex gap-10">

          {/* Article */}
          <article className="flex-1 min-w-0">
            <div
              className="prose prose-gray prose-headings:font-bold prose-h2:text-xl prose-h3:text-base prose-a:text-purple-700 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-700 max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* CTA */}
            <div className="mt-10 bg-gradient-to-r from-purple-700 to-purple-500 rounded-2xl p-7 text-center">
              <p className="text-white font-semibold mb-4 leading-relaxed">
                Put this into practice — try AI-marked questions on this topic, completely free.
              </p>
              <Link href="/learn" className="inline-block bg-white text-purple-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-purple-50 transition">
                Start practising free →
              </Link>
            </div>
          </article>

          {/* Table of contents — sticky sidebar */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-52 shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">On this page</p>
                <nav className="flex flex-col gap-2">
                  {toc.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-sm text-gray-500 hover:text-purple-700 transition leading-snug"
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-6">
          <div className="border-t border-gray-100 my-4" />
        </div>

        {/* More articles */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">More articles</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ...otherMd.map(p => ({ slug: p.slug, title: p.title, category: p.category, colour: COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple, readMins: p.readMins })),
              ...otherTs.map(p => ({ slug: p.slug, title: p.title, category: p.category, colour: COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple, readMins: p.readMins })),
            ].map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-purple-200 transition">
                <div className={`h-0.5 w-full ${p.colour.bar}`} />
                <div className="p-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.colour.badge}`}>{p.category}</span>
                  <p className="mt-2 text-sm font-bold text-gray-800 group-hover:text-purple-700 transition leading-snug line-clamp-2">{p.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{p.readMins} min read</p>
                </div>
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

  const colours = COLOUR_MAP[ts.categoryColour] ?? COLOUR_MAP.purple
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== ts.slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-xs text-purple-600 font-semibold hover:underline">← Back to blog</Link>
          <div className="flex items-center gap-2 mt-4 mb-4">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>{ts.category}</span>
            <span className="text-xs text-gray-400">{ts.readMins} min read</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: "'Georgia', serif" }}>{ts.title}</h1>
          <p className="text-gray-500 text-base leading-relaxed mb-6">{ts.excerpt}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-7 h-7 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-bold text-xs">G</div>
            <span className="font-medium text-gray-600">{ts.author}</span>
            <span>·</span>
            <span>{ts.date}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-10">
        {ts.blocks.map((block, i) => <RenderBlock key={i} block={block} />)}
      </article>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t border-gray-100 my-8" />
      </div>

      {/* More articles */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">More articles</p>
        <div className="grid md:grid-cols-3 gap-4">
          {otherPosts.map(p => {
            const c = COLOUR_MAP[p.categoryColour] ?? COLOUR_MAP.purple
            return (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:border-purple-200 transition">
                <div className={`h-0.5 w-full ${c.bar}`} />
                <div className="p-4">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{p.category}</span>
                  <p className="mt-2 text-sm font-bold text-gray-800 group-hover:text-purple-700 transition leading-snug line-clamp-2">{p.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{p.readMins} min read</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
