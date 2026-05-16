import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog — Revision Guides & GCSE Maths Tips | GCSEMathsAI',
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
      className="group flex flex-col rounded-2xl overflow-hidden hover:shadow-md transition h-full"
      style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}
    >
      <div className={`h-1 w-full ${colours.bar}`} />
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>
            {post.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--ink-3)' }}>{post.readMins} min read</span>
        </div>
        <h2 className="font-bold leading-snug mb-2 text-base sm:text-lg" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed line-clamp-3 mb-4" style={{ color: 'var(--ink-3)' }}>{post.excerpt}</p>
        <div className="mt-auto flex items-center gap-2 text-xs flex-wrap" style={{ color: 'var(--ink-3)' }}>
          <span>{post.author}</span>
          <span>·</span>
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
      <section className="border-b text-center px-4 sm:px-6 py-10 sm:py-14" style={{ background: 'var(--green-soft)', borderColor: 'var(--rule)' }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--paper)' }}>Blog</span>
        <h1 className="mt-4 mb-3 text-3xl sm:text-4xl font-bold leading-tight max-w-2xl mx-auto" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
          Revision guides &amp; <em>updates</em>
        </h1>
        <p className="text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          Practical tips, exam strategy and honest advice to help you get the grade you deserve.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--ink-3)' }}>
          {allPosts.length} articles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {allPosts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-14">
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--ink-3)' }}>Keep going</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            { href: '/topics', title: 'All 73 GCSE Maths topics', body: 'Step-by-step guides with worked examples for every topic on the spec.', bg: 'var(--green-soft)', accent: 'var(--green)' },
            { href: '/glossary', title: 'GCSE Maths glossary', body: '60+ key terms in plain English — command words, algebra, geometry, statistics.', bg: 'var(--gold-soft)', accent: 'var(--gold)' },
            { href: '/question-types', title: 'Command-word guides', body: '"Show that", "Hence", "Estimate" — how to answer every type of question.', bg: 'var(--navy-soft)', accent: 'var(--navy)' },
            { href: '/formula-sheet', title: 'GCSE Maths formula sheet', body: 'Every formula as a free printable PDF.', bg: 'var(--burgundy-soft)', accent: 'var(--burgundy)' },
          ].map(c => (
            <Link key={c.href} href={c.href}
              className="block rounded-2xl px-5 py-5 hover:shadow-md transition"
              style={{ background: c.bg, border: '1px solid var(--rule)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: c.accent }}>{c.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-3)' }}>{c.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-14">
        <div className="rounded-2xl px-6 py-8 text-center" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--green)' }}>More coming soon</p>
          <p className="text-sm" style={{ color: 'var(--ink-3)' }}>
            New guides published every week. Have a topic you&apos;d like us to cover?{' '}
            <Link href="/contact" className="font-semibold hover:underline" style={{ color: 'var(--green)' }}>
              Let us know →
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
