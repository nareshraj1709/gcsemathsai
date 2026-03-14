import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-purple-700">GCSEMathsAI</span>
        <div className="flex gap-3">
          <Link href="/auth" className="px-4 py-2 text-purple-700 font-semibold">Log in</Link>
          <Link href="/auth" className="px-4 py-2 bg-purple-700 text-white rounded-lg font-semibold">Start free</Link>
        </div>
      </nav>
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 px-8 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-purple-900 mb-6">
          The AI Maths tutor built for<br />
          <span className="text-purple-600">GCSE success</span>
        </h1>
        <p className="text-xl text-purple-700 mb-8 max-w-xl mx-auto">
          Practice questions, instant AI marking, and a weekly parent report. AQA · Edexcel · OCR aligned.
        </p>
        <Link href="/auth" className="inline-block px-8 py-4 bg-purple-700 text-white rounded-xl text-lg font-bold shadow-lg">
          Start free — 7 day trial →
        </Link>
        <p className="mt-4 text-sm text-gray-400">No card required</p>
      </section>
    </main>
  )
}
