import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Revision guides, GCSE Maths tips and exam technique advice from the GCSEMathsAI team.',
  openGraph: {
    title: 'GCSE Maths Blog | GCSEMathsAI',
    description: 'Revision guides, GCSE Maths tips and exam technique advice from the GCSEMathsAI team.',
    url: 'https://www.gcsemathsai.co.uk/blog',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/blog' },
}

const COLOUR_MAP: Record<string, { badge: string; bar: string }> = {
  purple: { badge: 'bg-green-100 text-green-700', bar: 'bg-green-500' },
  blue:   { badge: 'bg-blue-100 text-blue-700',     bar: 'bg-blue-500'   },
  green:  { badge: 'bg-green-100 text-green-700',   bar: 'bg-green-500'  },
  amber:  { badge: 'bg-amber-100 text-amber-700',   bar: 'bg-amber-500'  },
  rose:   { badge: 'bg-rose-100 text-rose-700',     bar: 'bg-rose-500'   },
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

function PostCard({ post, featured = false }: { post: CardPost; featured?: boolean }) {
  const colours = COLOUR_MAP[post.categoryColour] ?? COLOUR_MAP.purple
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block rounded-2xl overflow-hidden hover:shadow-md transition ${featured ? 'md:col-span-2' : ''}`}
      style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}
    >
      <div className={`h-1 w-full ${colours.bar}`} />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readMins} min read</span>
        </div>
        <h2 className={`font-bold transition leading-snug mb-2 ${featured ? 'text-xl' : 'text-base'}`} style={{ color: 'var(--ink)' }}>
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  // Markdown posts (new articles)
  const mdPosts = getAllMarkdownPosts().map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    category: p.category,
    categoryColour: p.categoryColour,
    author: p.author,
    date: p.date,
    readMins: p.readMins,
  }))

  // Existing TypeScript-based posts
  const tsPosts = BLOG_POSTS.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    categoryColour: p.categoryColour,
    author: p.author,
    date: p.date,
    readMins: p.readMins,
  }))

  const [featured, ...mdRest] = mdPosts

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>

      {/* Header */}
      <div className="border-b px-6 py-12 text-center" style={{ background: 'var(--green-soft)', borderColor: 'var(--rule)' }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>Blog</span>
        <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Revision guides &amp; updates</h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--ink-3)' }}>
          Practical tips, exam strategy, and honest advice to help you get the grade you deserve.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Featured markdown post */}
        {featured && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Latest guide</p>
            <div className="grid md:grid-cols-2">
              <PostCard post={featured} featured />
            </div>
          </div>
        )}

        {/* Rest of markdown posts */}
        {mdRest.length > 0 && (
          <>
            <div className="border-t border-[var(--rule)] my-10" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Revision guides</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mdRest.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {/* TypeScript-based existing posts */}
        {tsPosts.length > 0 && (
          <>
            <div className="border-t border-[var(--rule)] my-10" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">More articles</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tsPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {/* Related resources */}
        <div className="mt-12 grid md:grid-cols-2 gap-4">
          <Link href="/topics" className="block rounded-2xl px-6 py-6 hover:shadow-md transition" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--green)' }}>All 73 GCSE Maths Topics</p>
            <p className="text-xs" style={{ color: 'var(--ink-3)' }}>Step-by-step guides with worked examples for every topic on the spec.</p>
          </Link>
          <Link href="/formula-sheet" className="block rounded-2xl px-6 py-6 hover:shadow-md transition" style={{ background: 'var(--navy-soft)', border: '1px solid var(--rule)' }}>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--navy)' }}>GCSE Maths Formula Sheet</p>
            <p className="text-xs" style={{ color: 'var(--ink-3)' }}>Download every formula as a free printable PDF.</p>
          </Link>
        </div>

        {/* Coming soon */}
        <div className="mt-6 rounded-2xl px-6 py-8 text-center" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--green)' }}>More coming soon</p>
          <p className="text-sm" style={{ color: 'var(--ink-3)' }}>
            New guides published every week. Have a topic you&apos;d like us to cover?{' '}
            <Link href="/contact" className="font-semibold hover:underline" style={{ color: 'var(--green)' }}>
              Let us know →
            </Link>
          </p>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-[var(--rule)] flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/topics" className="hover:text-green-700 transition">Topics</Link>
          <Link href="/study" className="hover:text-green-700 transition">Study Notes</Link>
          <Link href="/features" className="hover:text-green-700 transition">Features</Link>
          <Link href="/privacy" className="hover:text-green-700 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-green-700 transition">Terms of Service</Link>
          <Link href="/contact" className="hover:text-green-700 transition">Contact us</Link>
          <Link href="/" className="hover:text-green-700 transition">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
