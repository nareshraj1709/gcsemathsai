import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTopics } from '@/lib/topics-markdown'

export const metadata: Metadata = {
  title: 'All GCSE Maths Topics — Complete Revision Guide',
  description: 'Browse all 73 GCSE Maths topics with step-by-step explanations, worked examples and practice questions. Covers AQA, Edexcel and OCR specifications.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/topics' },
  openGraph: {
    title: 'All GCSE Maths Topics — Complete Revision Guide',
    description: 'Browse all 73 GCSE Maths topics with explanations, worked examples and practice questions.',
    url: 'https://www.gcsemathsai.co.uk/topics',
  },
}

const STRAND_META: Record<string, { icon: string; colour: string; bg: string; border: string }> = {
  'Number':                              { icon: '🔢', colour: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  'Algebra':                             { icon: '📐', colour: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200'   },
  'Ratio, Proportion & Rates of Change': { icon: '⚖️', colour: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200'  },
  'Geometry & Measures':                 { icon: '📏', colour: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200'  },
  'Statistics & Probability':            { icon: '📊', colour: 'text-rose-700',   bg: 'bg-rose-50',   border: 'border-rose-200'   },
}

export default function TopicsIndexPage() {
  const topics = getAllTopics()

  // Group by strand
  const strands: Record<string, typeof topics> = {}
  for (const t of topics) {
    const strand = t.strand || t.category
    if (!strands[strand]) strands[strand] = []
    strands[strand].push(t)
  }

  const strandOrder = [
    'Number',
    'Algebra',
    'Ratio, Proportion & Rates of Change',
    'Geometry & Measures',
    'Statistics & Probability',
  ]

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
          73 Topics
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          Every GCSE Maths Topic — Explained
        </h1>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Step-by-step guides, worked examples and practice questions for every topic on the AQA, Edexcel and OCR GCSE Maths specification.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {strandOrder.map(strand => {
          const strandTopics = strands[strand]
          if (!strandTopics?.length) return null
          const meta = STRAND_META[strand] ?? STRAND_META['Number']

          return (
            <div key={strand} className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{meta.icon}</span>
                <h2 className={`text-xl font-bold ${meta.colour}`}>{strand}</h2>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {strandTopics.length} topics
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {strandTopics.map(topic => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className={`group block ${meta.bg} border ${meta.border} rounded-xl px-4 py-3 hover:shadow-md transition`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold ${meta.colour} group-hover:underline leading-snug`}>
                          {topic.topicNumber}. {topic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {topic.description}
                        </p>
                      </div>
                      {topic.tier === 'Higher only' && (
                        <span className="shrink-0 text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                          H
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div className="bg-purple-700 rounded-2xl px-8 py-10 text-center mt-8">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to practise?</h2>
          <p className="text-purple-200 text-sm mb-6 max-w-md mx-auto">
            Get AI-marked practice questions on any topic — with instant feedback and step-by-step solutions.
          </p>
          <Link
            href="/auth"
            className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-sm hover:bg-purple-50 transition"
          >
            Start free →
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/blog" className="hover:text-purple-700 transition">Blog</Link>
          <Link href="/study" className="hover:text-purple-700 transition">Study Notes</Link>
          <Link href="/papers" className="hover:text-purple-700 transition">Past Papers</Link>
          <Link href="/" className="hover:text-purple-700 transition">← Home</Link>
        </div>
      </div>
    </main>
  )
}
