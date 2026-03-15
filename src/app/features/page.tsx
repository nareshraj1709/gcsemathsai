import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Features',
  description: 'Everything GCSEMathsAI offers — AI marking, full spec coverage, past papers, study notes and more. Free for every student in Year 9 to 13.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/features' },
}

const FEATURES = [
  {
    icon: '🤖',
    title: 'AI marking — like a real examiner',
    colour: 'purple',
    badge: 'bg-purple-100 text-purple-700',
    bar: 'bg-purple-500',
    points: [
      'Awards method marks (M), accuracy marks (A) and communication marks (C) — not just right or wrong',
      'Identifies where you lost marks and why, with a full worked solution',
      'Calibrated to AQA, Edexcel and OCR mark scheme conventions',
      'Understands alternative correct methods — no mark lost for a different valid approach',
    ],
  },
  {
    icon: '📚',
    title: 'Full syllabus coverage — Year 9 to 13',
    colour: 'blue',
    badge: 'bg-blue-100 text-blue-700',
    bar: 'bg-blue-500',
    points: [
      'GCSE Maths: Foundation and Higher tier, all five topic areas — Number, Algebra, Geometry, Statistics and Ratio',
      'A Level Maths: Pure Maths, Statistics and Mechanics — aligned to Year 12 and Year 13',
      'Year 9 preparation content to build confidence before GCSE',
      'Resit support with exam-focused practice for adult learners',
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
      'A Level: AQA, Edexcel, OCR A and OCR B (MEI) boards supported',
    ],
  },
  {
    icon: '📝',
    title: 'Past papers and AI practice papers',
    colour: 'amber',
    badge: 'bg-amber-100 text-amber-700',
    bar: 'bg-amber-500',
    points: [
      'Historical exam papers from 2015–2024 with timed exam conditions',
      '30 AI-generated practice papers per board per tier — never the same paper twice',
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
      'Concise revision notes for every GCSE and A Level topic',
      'Key vocabulary, formulae and worked examples for each subtopic',
      'Curated Khan Academy video links directly relevant to each topic',
      'Keyword-based YouTube search shortcuts so you can go deeper on anything',
    ],
  },
  {
    icon: '📊',
    title: 'Dashboard and progress tracking',
    colour: 'purple',
    badge: 'bg-purple-100 text-purple-700',
    bar: 'bg-purple-500',
    points: [
      'See your score history and improvement trend for every topic',
      'Know exactly which areas need more revision before your mocks',
      'Daily practice streaks to build the revision habit',
      'Progress saved automatically — pick up where you left off on any device',
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-14 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Features</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-3 max-w-2xl mx-auto leading-tight">
          Everything you need to improve your Maths grade
        </h1>
        <p className="text-gray-500 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          From Year 9 GCSE preparation to A Level revision — GCSEMathsAI gives every student the tools to practise effectively and get better marks.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/auth" className="bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-purple-800 transition shadow-md shadow-purple-200">
            Start free — no card needed →
          </Link>
          <Link href="/pricing" className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold text-sm hover:border-purple-400 hover:text-purple-700 transition">
            See pricing
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100">
        {[
          { val: 'Year 9–13', label: 'GCSE & A Level' },
          { val: '3 boards', label: 'AQA · Edexcel · OCR' },
          { val: '100+', label: 'Topics covered' },
          { val: 'Free', label: 'No card required' },
        ].map((s, i) => (
          <div key={i} className={`py-5 text-center ${i < 3 ? 'border-r border-gray-100' : ''}`}>
            <div className="text-xl font-bold text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-6 py-14 grid gap-8">
        {FEATURES.map(f => (
          <div key={f.title} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-purple-100 transition">
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
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-purple-700 px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to start?</h2>
        <p className="text-purple-200 mb-8 max-w-md mx-auto">
          All features are completely free right now. Create an account and start improving your Maths today.
        </p>
        <Link href="/auth" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-sm hover:bg-purple-50 transition">
          Create your free account →
        </Link>
      </div>

      {/* Footer nav */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
        <Link href="/pricing" className="hover:text-purple-700 transition">Pricing</Link>
        <Link href="/blog" className="hover:text-purple-700 transition">Blog</Link>
        <Link href="/contact" className="hover:text-purple-700 transition">Contact</Link>
        <Link href="/" className="hover:text-purple-700 transition">← Back to home</Link>
      </div>

    </main>
  )
}
