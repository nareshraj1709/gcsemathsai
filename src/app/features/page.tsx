import type { Metadata } from 'next'
import Link from 'next/link'
import HashRedirector from './HashRedirector'

export const metadata: Metadata = {
  title: 'Features — Instant Marking, Past Papers, Study Notes & More',
  description: 'Everything GCSEMathsAI offers — instant examiner-style marking, full GCSE spec coverage, past papers, study notes and more. Free for every Year 9–11 student.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/features' },
  openGraph: {
    title: 'Features — Instant Marking, Past Papers & Study Notes | GCSEMathsAI',
    description: 'Instant examiner-style marking, full GCSE spec coverage, past papers, study notes — all free for every student.',
    url: 'https://www.gcsemathsai.co.uk/features',
  },
}

const FEATURES = [
  {
    icon: '🤖',
    title: 'Instant marking — like a real examiner',
    colour: 'green',
    badge: 'bg-green-100 text-green-700',
    bar: 'bg-green-500',
    points: [
      'Awards method marks (M), accuracy marks (A) and communication marks (C) — not just right or wrong',
      'Identifies where you lost marks and why, with a full worked solution',
      'Calibrated to AQA, Edexcel and OCR mark scheme conventions',
      'Understands alternative correct methods — no mark lost for a different valid approach',
    ],
  },
  {
    icon: '📚',
    title: 'Full GCSE syllabus coverage — Year 9 to 11',
    colour: 'blue',
    badge: 'bg-blue-100 text-blue-700',
    bar: 'bg-blue-500',
    points: [
      'GCSE Maths: Foundation and Higher tier, all five topic areas — Number, Algebra, Geometry, Statistics and Ratio',
      'Year 9 preparation content to build confidence before GCSE',
      'Year 10 consolidation across every subtopic with exam-style practice',
      'Year 11 and resit support with exam-focused revision and past papers',
    ],
  },
  {
    icon: '📋',
    title: 'Three exam boards, one platform',
    colour: 'green',
    badge: 'bg-green-100 text-green-700',
    bar: 'bg-green-500',
    points: [
      'AQA (8300) — full specification including Higher and Foundation question styles',
      'Edexcel (1MA1) — Pearson-style questions with follow-through marking guidance',
      'OCR (J560) — alternative methods credited, structured problem-solving approach',
      'Switch board any time — the same questions, marked to the conventions of your chosen spec',
    ],
  },
  {
    icon: '📝',
    title: 'Past papers and original practice papers',
    colour: 'amber',
    badge: 'bg-amber-100 text-amber-700',
    bar: 'bg-amber-500',
    points: [
      '30 original practice papers per board per tier — fresh question sets for every session',
      'Direct links to official AQA, Edexcel and OCR past papers — we do not host past-paper content',
      'Difficulty levels from Warm-Up to Exam Style, so you can build up gradually',
      'Grade boundary estimates based on your score after every paper',
    ],
  },
  {
    icon: '📖',
    title: 'Study notes with video links',
    colour: 'rose',
    badge: 'bg-rose-100 text-rose-700',
    bar: 'bg-rose-500',
    points: [
      'Concise revision notes for every GCSE Maths topic and subtopic',
      'Key vocabulary, formulae and worked examples for each subtopic',
      'Curated Khan Academy video links directly relevant to each topic',
      'Keyword-based YouTube search shortcuts so you can go deeper on anything',
    ],
  },
  {
    icon: '📊',
    title: 'Dashboard and progress tracking',
    colour: 'teal',
    badge: 'bg-teal-100 text-teal-700',
    bar: 'bg-teal-500',
    points: [
      'See your score history and improvement trend for every topic',
      'Know exactly which areas need more revision before your mocks',
      'Daily practice streaks to build the revision habit',
      'Progress saved automatically — pick up where you left off on any device',
    ],
  },
]

const BASE = 'https://www.gcsemathsai.co.uk'

export default function FeaturesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Features', item: `${BASE}/features` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <HashRedirector />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="border-b px-6 py-14 text-center" style={{ background: 'var(--green-soft)', borderColor: 'var(--rule)' }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>Features</span>
        <h1 className="text-4xl font-bold mt-4 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
          Everything you need to improve your Maths grade
        </h1>
        <p className="text-base max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: 'var(--ink-3)' }}>
          From Year 9 GCSE preparation to Year 11 exam revision — GCSEMathsAI gives every student the tools to practise effectively and get better marks.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/auth" className="text-white px-7 py-3 rounded-xl font-semibold text-sm transition shadow-md" style={{ background: 'var(--green)' }}>
            Start free — no card needed →
          </Link>
          <Link href="/pricing" className="px-6 py-3 rounded-xl font-semibold text-sm transition" style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
            See pricing
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: '1px solid var(--rule)' }}>
        {[
          { val: 'Year 9–11', label: 'Full GCSE coverage' },
          { val: '3 boards', label: 'AQA · Edexcel · OCR' },
          { val: '100+', label: 'Topics covered' },
          { val: 'Free', label: 'No card required' },
        ].map((s, i) => (
          <div key={i} className="py-5 text-center" style={i < 3 ? { borderRight: '1px solid var(--rule)' } : {}}>
            <div className="text-xl font-bold" style={{ color: 'var(--ink)' }}>{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-6 py-14 grid gap-8">
        {FEATURES.map(f => (
          <div
            key={f.title}
            className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
            style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}
          >
            <div className={`h-1 w-full ${f.bar}`} />
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${f.badge}`}>Feature</span>
                  <h2 className="text-lg font-bold text-gray-900 mt-1">{f.title}</h2>
                </div>
              </div>
              <ul className="space-y-2.5">
                {f.points.map((p, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-gray-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--green)' }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 py-14 text-center" style={{ background: 'var(--green)' }}>
        <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Ready to start?</h2>
        <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--green-soft)' }}>
          All features are completely free right now. Create an account and start improving your Maths today.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-8 py-3 rounded-xl text-sm transition" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Create your free account →
        </Link>
      </div>

      {/* Footer nav */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap gap-6 text-sm text-gray-500" style={{ borderTop: '1px solid var(--rule)' }}>
        <Link href="/pricing" className="hover:text-green-700 transition">Pricing</Link>
        <Link href="/blog" className="hover:text-green-700 transition">Blog</Link>
        <Link href="/contact" className="hover:text-green-700 transition">Contact</Link>
        <Link href="/" className="hover:text-green-700 transition">← Back to home</Link>
      </div>

    </main>
  )
}
