import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { BLOG_POSTS } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Revision guides, GCSE Maths tips, exam technique advice and A Level resources from the GCSEMathsAI team.',
  openGraph: {
    title: 'GCSE Maths Blog | GCSEMathsAI',
    description: 'Revision guides, GCSE Maths tips, exam technique advice and A Level resources from the GCSEMathsAI team.',
    url: 'https://www.gcsemathsai.co.uk/blog',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/blog' },
}

const COLOUR_MAP: Record<string, { badge: string; bar: string }> = {
  purple: { badge: 'bg-purple-100 text-purple-700', bar: 'bg-purple-500' },
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
      className={`group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:border-purple-200 transition ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className={`h-1 w-full ${colours.bar}`} />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>
            {post.category}
          </span>
          <span className="text-xs text-gray-400">{post.readMins} min read</span>
        </div>
        <h2 className={`font-bold text-gray-900 group-hover:text-purple-700 transition leading-snug mb-2 ${featured ? 'text-xl' : 'text-base'}`}>
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
    <main className="min-h-screen bg-white">

      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Blog</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Revision guides &amp; updates</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
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
            <div className="border-t border-gray-100 my-10" />
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
            <div className="border-t border-gray-100 my-10" />
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">More articles</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tsPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}

        {/* Coming soon */}
        <div className="mt-12 bg-purple-50 border border-purple-100 rounded-2xl px-6 py-8 text-center">
          <p className="text-sm font-semibold text-purple-700 mb-1">More coming soon</p>
          <p className="text-sm text-gray-500">
            New guides published every week. Have a topic you&apos;d like us to cover?{' '}
            <Link href="/contact" className="text-purple-700 font-semibold hover:underline">
              Let us know →
            </Link>
          </p>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/privacy" className="hover:text-purple-700 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-purple-700 transition">Terms of Service</Link>
          <Link href="/contact" className="hover:text-purple-700 transition">Contact us</Link>
          <Link href="/" className="hover:text-purple-700 transition">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
