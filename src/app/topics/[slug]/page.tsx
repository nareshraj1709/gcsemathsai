import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTopics, getTopicPost, renderTopicMarkdown, extractTopicTOC } from '@/lib/topics-markdown'

type Props = { params: Promise<{ slug: string }> }

const COLOUR_MAP: Record<string, { badge: string; bar: string; bg: string }> = {
  purple: { badge: 'bg-purple-100 text-purple-700', bar: 'bg-purple-500', bg: 'bg-purple-50' },
  blue:   { badge: 'bg-blue-100 text-blue-700',     bar: 'bg-blue-500',   bg: 'bg-blue-50'   },
  green:  { badge: 'bg-green-100 text-green-700',   bar: 'bg-green-500',  bg: 'bg-green-50'  },
  amber:  { badge: 'bg-amber-100 text-amber-700',   bar: 'bg-amber-500',  bg: 'bg-amber-50'  },
  rose:   { badge: 'bg-rose-100 text-rose-700',     bar: 'bg-rose-500',   bg: 'bg-rose-50'   },
}

const TIER_BADGE: Record<string, string> = {
  'Foundation & Higher': 'bg-indigo-100 text-indigo-700',
  'Higher only': 'bg-amber-100 text-amber-800',
  'Foundation': 'bg-green-100 text-green-700',
}

export async function generateStaticParams() {
  return getAllTopics().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicPost(slug)
  if (!topic) return { title: 'Topic Not Found' }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: `https://www.gcsemathsai.co.uk/topics/${topic.slug}`,
      type: 'article',
      publishedTime: topic.dateISO,
      authors: [topic.author],
    },
    alternates: { canonical: `https://www.gcsemathsai.co.uk/topics/${topic.slug}` },
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicPost(slug)
  if (!topic) notFound()

  const html = renderTopicMarkdown(topic.content)
  const toc = extractTopicTOC(topic.content)
  const colours = COLOUR_MAP[topic.categoryColour] ?? COLOUR_MAP.purple
  const tierBadge = TIER_BADGE[topic.tier] ?? TIER_BADGE['Foundation & Higher']

  // Get adjacent topics for prev/next navigation
  const allTopics = getAllTopics()
  const currentIdx = allTopics.findIndex(t => t.slug === topic.slug)
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null
  const nextTopic = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className={`${colours.bg} border-b border-gray-100 px-6 py-10`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colours.badge}`}>
              {topic.category}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tierBadge}`}>
              {topic.tier}
            </span>
            <span className="text-xs text-gray-400">Topic {topic.topicNumber} of 73</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            {topic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{topic.author}</span>
            <span>·</span>
            <span>{topic.readMins} min read</span>
            <span>·</span>
            <span>{topic.date}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-10">

        {/* Article content */}
        <article className="flex-1 min-w-0 max-w-3xl">
          <div
            className="prose prose-gray prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-li:text-gray-700
              prose-strong:text-gray-900
              prose-a:text-purple-700 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Prev / Next navigation */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between gap-4">
            {prevTopic ? (
              <Link href={`/topics/${prevTopic.slug}`} className="group flex-1">
                <span className="text-xs text-gray-400">← Previous topic</span>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition mt-1">
                  {prevTopic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                </p>
              </Link>
            ) : <div />}
            {nextTopic ? (
              <Link href={`/topics/${nextTopic.slug}`} className="group flex-1 text-right">
                <span className="text-xs text-gray-400">Next topic →</span>
                <p className="text-sm font-semibold text-gray-700 group-hover:text-purple-700 transition mt-1">
                  {nextTopic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                </p>
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Sidebar — Table of Contents */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">On this page</p>
            <nav className="flex flex-col gap-1.5">
              {toc.map(h => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  className="text-sm text-gray-500 hover:text-purple-700 transition leading-snug"
                >
                  {h.text}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-4">
              <p className="text-sm font-semibold text-purple-700 mb-1">Practice this topic</p>
              <p className="text-xs text-gray-500 mb-3">Get AI-marked questions with instant feedback.</p>
              <Link
                href="/auth"
                className="block text-center bg-purple-700 text-white text-sm font-semibold py-2 rounded-lg hover:bg-purple-800 transition"
              >
                Start free →
              </Link>
            </div>

            {/* All topics link */}
            <Link href="/topics" className="block mt-4 text-sm text-purple-700 font-semibold hover:underline">
              ← All 73 topics
            </Link>
          </div>
        </aside>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: topic.title,
            description: topic.description,
            author: { '@type': 'Organization', name: 'GCSEMathsAI' },
            publisher: { '@type': 'Organization', name: 'GCSEMathsAI', url: 'https://www.gcsemathsai.co.uk' },
            datePublished: topic.dateISO,
            keywords: topic.keywords.join(', '),
            mainEntityOfPage: `https://www.gcsemathsai.co.uk/topics/${topic.slug}`,
          }),
        }}
      />
    </main>
  )
}
