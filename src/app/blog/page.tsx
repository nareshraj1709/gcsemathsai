import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog â€” Revision Guides & GCSE Maths Tips | GCSEMathsAI',
  description: 'Revision guides, GCSE Maths tips and exam technique advice from the GCSEMathsAI team. Practical strategies that move grades, from Foundation to Higher.',
  openGraph: {
    title: 'GCSE Maths Blog | GCSEMathsAI',
    description: 'Revision guides, GCSE Maths tips and exam technique advice.',
    url: 'https://www.gcsemathsai.co.uk/blog',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/blog' },
}

const COLOUR_MAP: Record<string, { badge: string; bar: string }> = {
  purple: { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500' },
  blue:   { badge: 'bg-blue-100 text-blue-700',   bar: 'bg-blue-500' },
  green:  { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500' },
  amber:  { badge: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500' },
  rose:   { badge: 'bg-rose-100 text-rose-700',   bar: 'bg-rose-500' },
}

type CardPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColour: string
  author: string
  date: string
  readMins: number
}

function PostCard({ post }: { post: CardPost }) {
  const colours = COLOUR_MAP[post.categoryColour] ?? COLOUR_MAP.purple
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition h-full hover:-translate-y-0.5 hover:shadow-lg"
      style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}
    >
      <div className={`h-1 w-full ${colours.bar}`} />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider ${colours.badge}`} style={{ fontFamily: 'var(--mono)' }}>
            {post.category}
          </span>
          <span className="text-[11px]" style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)' }}>{post.readMins} min read</span>
        </div>
        <h2
          className="font-semibold leading-snug mb-3"
          style={{
            color: 'var(--ink)',
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.title}
        </h2>
        <p
          className="leading-relaxed mb-4"
          style={{
            color: 'var(--ink-3)',
            fontSize: 14,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] flex-wrap" style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', borderTop: '1px dashed var(--rule)' }}>
          <span>{post.author}</span>
          <span style={{ opacity: 0.5 }}>Â·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const mdPosts: CardPost[] = getAllMarkdownPosts().map(p => ({
    slug: p.slug, title: p.title, excerpt: p.description, category: p.category,
    categoryColour: p.categoryColour, author: p.author, date: p.date, readMins: p.readMins,
  }))
  const tsPosts: CardPost[] = BLOG_POSTS.map(p => ({
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category,
    categoryColour: p.categoryColour, author: p.author, date: p.date, readMins: p.readMins,
  }))
  const allPosts = [...mdPosts, ...tsPosts]

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero â€” matches /topics, /glossary, /question-types style */}
      <section
        className="text-center"
        style={{
          background: 'var(--paper)',
          borderBottom: '1px solid var(--rule)',
          padding: 'clamp(40px, 6vw, 64px) 20px',
        }}
      >
        <span
          className="inline-block uppercase font-semibold"
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--green)',
            background: 'var(--green-soft)',
            padding: '4px 14px',
            borderRadius: 999,
            letterSpacing: '0.06em',
            marginBottom: 16,
          }}
        >
          Blog Â· {allPosts.length} articles
        </span>
        <h1
          className="leading-tight max-w-3xl mx-auto"
          style={{
            color: 'var(--ink)',
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            margin: '0 0 12px',
          }}
        >
          Revision guides &amp; <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>updates</em>
        </h1>
        <p
          className="max-w-xl mx-auto leading-relaxed"
          style={{
            color: 'var(--ink-3)',
            fontSize: 'clamp(14px, 1.6vw, 16px)',
            fontWeight: 500,
          }}
        >
          Practical tips, exam strategy and honest advice to help you get the grade you deserve.
        </p>
      </section>

      {/* Post grid */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'clamp(16px, 2vw, 24px)',
          }}
        >
          {allPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Keep going */}
      <section className="mx-auto" style={{ maxWidth: 1200, padding: '0 20px 56px' }}>
        <p
          className="uppercase font-semibold mb-4"
          style={{ color: 'var(--ink-3)', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em' }}
        >
          Keep going
        </p>
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16,
          }}
        >
          {[
            { href: '/topics',         title: 'All 245 GCSE Maths topics', body: 'Step-by-step guides with worked examples for every topic on the spec.',  bg: 'var(--green-soft)',   accent: 'var(--green)' },
            { href: '/glossary',       title: 'GCSE Maths glossary',      body: '60+ key terms in plain English â€” command words to vocab.',              bg: 'var(--gold-soft)',    accent: 'var(--gold)' },
            { href: '/question-types', title: 'Command-word guides',      body: '"Show that", "Hence", "Estimate" â€” how to answer every type.',         bg: 'var(--navy-soft)',    accent: 'var(--navy)' },
            { href: '/formula-sheet',  title: 'Formula sheet (PDF)',      body: 'Every formula you need as a free printable download.',                  bg: 'var(--burgundy-soft)',accent: 'var(--burgundy)' },
          ].map(c => (
            <Link
              key={c.href}
              href={c.href}
              className="block rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md"
              style={{ background: c.bg, border: '1px solid var(--rule)', padding: '20px 22px' }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: c.accent, marginBottom: 6, fontFamily: 'var(--serif)' }}>{c.title}</p>
              <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{c.body}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="mx-auto" style={{ maxWidth: 720, padding: '0 20px 64px' }}>
        <div
          className="rounded-2xl text-center"
          style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '28px 24px' }}
        >
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)', marginBottom: 4, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>More coming soon</p>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>
            New guides published every week. Got a topic you&apos;d like us to cover?{' '}
            <Link href="/contact" className="font-semibold hover:underline" style={{ color: 'var(--green)' }}>
              Let us know â†’
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
