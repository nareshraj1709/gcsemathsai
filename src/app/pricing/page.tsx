import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'GCSEMathsAI is completely free for every student. No subscription, no card required — full access to AI marking, practice papers and study notes.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/pricing' },
}

const FREE_FEATURES = [
  'Unlimited AI-marked practice questions',
  'Full GCSE and A Level syllabus — Year 9 to 13',
  'AQA, Edexcel, OCR and OCR A / OCR B (MEI) support',
  'Foundation and Higher tier questions',
  'Past papers from 2015–2024 (timed exam conditions)',
  'AI-generated practice papers with grade boundary estimates',
  '20 topic-based practice sections',
  'Study notes with worked examples and formulae',
  'Curated video links for every topic',
  'Dashboard with progress tracking',
  'Daily revision streaks',
  'No adverts',
]

const FAQS = [
  {
    q: 'Is it really completely free?',
    a: 'Yes — every feature listed here is free right now. We built GCSEMathsAI because quality revision tools should not cost families money. There is no credit card required, no free trial countdown, and no hidden charges.',
  },
  {
    q: 'Will it stay free forever?',
    a: 'We plan to keep a generous free tier permanently. In the future we may introduce an optional premium plan with additional features (such as personalised revision schedules and parent progress reports). Core practice and marking will always remain free.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'Yes — a free account lets us save your progress, scores and streaks across sessions. Sign up takes less than a minute and only requires an email address.',
  },
  {
    q: 'Is this suitable for Year 9 students?',
    a: 'Yes. Year 9 students can use the GCSE Foundation tier questions to build early confidence before they begin their GCSE courses in Year 10.',
  },
  {
    q: 'Does it cover A Level Maths?',
    a: 'Yes. Year 12 and Year 13 students can practise Pure Maths, Statistics and Mechanics questions across AQA, Edexcel, OCR A and OCR B (MEI) specifications.',
  },
  {
    q: 'Can my school use this?',
    a: 'Absolutely. Teachers are welcome to recommend GCSEMathsAI to their pupils — there is no cost and no setup required. If you would like to discuss a whole-school arrangement, please get in touch via our contact page.',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-14 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Pricing</span>
        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-3">
          Free for every student.
        </h1>
        <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
          No subscription. No card. No catch. Every feature is available free of charge right now.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* Pricing card */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          {/* Free plan */}
          <div className="border-2 border-purple-600 rounded-2xl overflow-hidden shadow-lg shadow-purple-100">
            <div className="bg-purple-700 px-6 py-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-bold text-lg">Free</span>
                <span className="bg-white text-purple-700 text-xs font-bold px-2.5 py-1 rounded-full">Current plan</span>
              </div>
              <div className="text-5xl font-bold text-white mt-2">£0</div>
              <div className="text-purple-200 text-sm mt-1">Forever free · No card required</div>
            </div>
            <div className="p-6 bg-white">
              <ul className="space-y-3">
                {FREE_FEATURES.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth"
                className="block text-center bg-purple-700 text-white font-semibold py-3 rounded-xl mt-6 text-sm hover:bg-purple-800 transition"
              >
                Get started — it&apos;s free →
              </Link>
            </div>
          </div>

          {/* Premium (coming soon) */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="bg-gray-50 px-6 py-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700 font-bold text-lg">Premium</span>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">Coming soon</span>
              </div>
              <div className="text-5xl font-bold text-gray-400 mt-2">TBC</div>
              <div className="text-gray-400 text-sm mt-1">Optional upgrade — not needed to use the app</div>
            </div>
            <div className="p-6 bg-white">
              <p className="text-sm text-gray-500 mb-4">
                Everything in Free, plus optional extras we are working on:
              </p>
              <ul className="space-y-3">
                {[
                  'Personalised weekly revision schedule',
                  'Parent progress dashboard — track your child\'s improvement',
                  'Predicted grade based on practice performance',
                  'Detailed topic-by-topic mark breakdown reports',
                  'Priority support',
                ].map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold shrink-0">○</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl mt-6 text-sm hover:border-purple-400 hover:text-purple-700 transition"
              >
                Get notified when available →
              </Link>
            </div>
          </div>
        </div>

        {/* School / Tutor callout */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-7 py-7 mb-16 flex flex-col md:flex-row gap-5 items-center justify-between">
          <div>
            <p className="text-sm font-bold text-blue-800 mb-1">For schools and tutors</p>
            <p className="text-sm text-blue-700 leading-relaxed max-w-md">
              Want to recommend GCSEMathsAI to your pupils or discuss a whole-school arrangement? We&apos;d love to hear from you.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-blue-800 transition"
          >
            Contact us →
          </Link>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently asked questions</h2>
          <div className="grid gap-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-gray-100 rounded-xl p-6">
                <p className="font-semibold text-gray-900 mb-2 text-sm">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="bg-purple-700 px-6 py-14 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Start revising today — completely free</h2>
        <p className="text-purple-200 mb-8 max-w-md mx-auto text-sm">
          Create a free account and get instant access to AI-marked practice, past papers and study notes.
        </p>
        <Link href="/auth" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-sm hover:bg-purple-50 transition">
          Create your free account →
        </Link>
      </div>

      {/* Footer nav */}
      <div className="max-w-4xl mx-auto px-6 py-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
        <Link href="/features" className="hover:text-purple-700 transition">Features</Link>
        <Link href="/blog" className="hover:text-purple-700 transition">Blog</Link>
        <Link href="/contact" className="hover:text-purple-700 transition">Contact</Link>
        <Link href="/" className="hover:text-purple-700 transition">← Back to home</Link>
      </div>

    </main>
  )
}
