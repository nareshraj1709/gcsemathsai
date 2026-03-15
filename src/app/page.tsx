'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 })
  const [parentOpen, setParentOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      const examDate = new Date('2026-05-19T09:00:00')
      const now = new Date()
      const diff = examDate.getTime() - now.getTime()
      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        })
      }
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-700 flex items-center justify-center text-white text-sm font-semibold">M</div>
          <span className="font-semibold text-gray-900 text-base">GCSEMathsAI</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <a href="#features" className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition">Features</a>
          <a href="/pricing" className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition">Pricing</a>
          <a href="/blog" className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition">Blog</a>
          <button onClick={() => setParentOpen(true)} className="text-sm text-gray-500 px-3 py-1.5 rounded-lg hover:text-purple-700 hover:bg-purple-50 transition">For parents</button>
        </div>
        <div className="flex items-center gap-2">
          <a href="/auth" className="text-sm border border-gray-200 px-4 py-1.5 rounded-lg text-gray-700 hover:border-purple-500 hover:text-purple-700 transition">Log in</a>
          <a href="/auth" className="text-sm bg-purple-700 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-purple-800 transition">Start free</a>
        </div>
      </nav>

      {/* Parent modal */}
      {parentOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setParentOpen(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full inline-block mb-3">For parents</span>
                <h2 className="text-2xl font-bold text-gray-900">Support your child's revision</h2>
              </div>
              <button onClick={() => setParentOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl ml-4">✕</button>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              GCSEMathsAI is completely free right now. Create an account for your child and they can start practising real GCSE Maths questions with instant AI feedback today.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {[
                'Completely free — no card needed',
                'Covers Year 9–11 GCSE and Year 12–13 A Level',
                'AQA, Edexcel and OCR exam board support',
                'AI marks every answer with full worked solution',
                'Your child builds confidence at their own pace',
              ].map(f => (
                <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs flex-shrink-0">✓</div>
                  {f}
                </div>
              ))}
            </div>
            <a href="/auth" className="block text-center bg-purple-700 text-white py-3 rounded-xl font-semibold hover:bg-purple-800 transition">
              Create a free account →
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="bg-purple-50 px-6 pt-16 pb-12 text-center">
        <span className="inline-block text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full mb-6">
          Year 9–13 · GCSE &amp; A Level · AQA · Edexcel · OCR · Free
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-2xl mx-auto">
          Practise. Get marked.<br />
          <span className="text-purple-700">Improve every day.</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">
          Real GCSE and A Level Maths questions, instant AI feedback on every answer, and a clear picture of where you stand before your mock exams and summer sitting. Free for every student.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-4">
          <a href="/auth" className="bg-purple-700 text-white px-7 py-3 rounded-xl font-semibold text-base hover:bg-purple-800 transition shadow-md shadow-purple-200">
            Start practising free →
          </a>
          <a href="#how" className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-semibold text-base hover:border-purple-400 hover:text-purple-700 transition">
            See how it works
          </a>
        </div>
        <p className="text-xs text-gray-400">No card required · No catch · Free for every student</p>

        {/* Exam countdown */}
        <div className="mt-10 inline-block">
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 flex items-center gap-6 shadow-sm">
            <span className="text-sm text-gray-500">Summer 2026 GCSE Maths exam</span>
            <div className="flex gap-4">
              {[
                { val: countdown.days, label: 'days' },
                { val: countdown.hours, label: 'hours' },
                { val: countdown.mins, label: 'mins' },
              ].map((c, i) => (
                <div key={i} className="text-center">
                  <div className={`text-2xl font-bold ${i === 0 ? 'text-purple-700' : 'text-gray-900'}`}>{c.val}</div>
                  <div className="text-xs text-gray-400">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="grid grid-cols-4 border-b border-gray-100">
        {[
          { val: 'Year 9–13', label: 'GCSE & A Level covered' },
          { val: '100%', label: 'Free right now' },
          { val: 'Instant', label: 'AI marking & feedback' },
          { val: 'AQA · OCR · Edexcel', label: 'All major exam boards' },
        ].map((s, i) => (
          <div key={i} className={`py-5 text-center ${i < 3 ? 'border-r border-gray-100' : ''}`}>
            <div className="text-xl font-bold text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <section id="how" className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">How it works</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Three steps to better marks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Pick a topic',
                desc: 'Choose from the full AQA, Edexcel or OCR spec. Questions are generated fresh every session — never the same question twice.',
                icon: '🎯'
              },
              {
                step: '02',
                title: 'Show your working',
                desc: 'Type your answer and working out. Just like a real exam — method marks matter and the AI knows it.',
                icon: '✏️'
              },
              {
                step: '03',
                title: 'Get instant feedback',
                desc: 'See exactly where marks were gained or lost with a step-by-step explanation. Know what to fix before the real thing.',
                icon: '⚡'
              },
            ].map(s => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="text-3xl">{s.icon}</div>
                <div className="text-xs font-semibold text-purple-600">{s.step}</div>
                <div className="font-bold text-gray-900 text-lg">{s.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AQA Topics */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Full spec coverage</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Every topic. Every tier.</h2>
          <p className="text-gray-500 mb-8 text-base leading-relaxed">Foundation and Higher. All five areas of the GCSE Maths specification, fully covered.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Number', color: 'bg-purple-100 text-purple-800', topics: ['Fractions', 'Decimals', 'Percentages', 'Powers', 'Standard form', 'Surds', 'Bounds', 'Indices'] },
              { label: 'Algebra', color: 'bg-blue-100 text-blue-800', topics: ['Equations', 'Inequalities', 'Quadratics', 'Functions', 'Sequences', 'Graphs', 'Simultaneous'] },
              { label: 'Geometry', color: 'bg-green-100 text-green-800', topics: ['Pythagoras', 'Trigonometry', 'Circles', 'Vectors', 'Transformations', 'Area & volume'] },
              { label: 'Statistics', color: 'bg-amber-100 text-amber-800', topics: ['Averages', 'Probability', 'Histograms', 'Box plots', 'Scatter graphs', 'Tree diagrams'] },
              { label: 'Ratio', color: 'bg-rose-100 text-rose-800', topics: ['Ratio', 'Proportion', 'Speed & distance', 'Direct & inverse', 'Compound measures'] },
            ].map(t => (
              <div key={t.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.color} mb-3 inline-block`}>{t.label}</span>
                <div className="text-xs text-gray-500 leading-7">
                  {t.topics.map(tp => <div key={tp}>{tp}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section id="features" className="px-6 py-16 max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Why it works</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-10">Built differently from other revision tools</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Spec-aligned questions',
              desc: 'Every question is mapped exactly to the AQA, Edexcel or OCR specification. No off-spec content, no wasted revision time.',
            },
            {
              icon: '⚡',
              title: 'AI that marks like an examiner',
              desc: 'Not just right or wrong. The AI awards method marks, spots common mistakes, and explains each step the same way a GCSE examiner would.',
            },
            {
              icon: '📈',
              title: 'Progress that makes sense',
              desc: 'See your score by topic, track your improvement week by week, and know exactly which areas to focus on before the exam.',
            },
            {
              icon: '🔥',
              title: 'Daily streaks keep you going',
              desc: 'Short daily sessions beat long infrequent ones. Streaks and badges make it easier to build the habit of daily practice.',
            },
          ].map(v => (
            <div key={v.title} className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:border-purple-200 transition">
              <div className="text-2xl flex-shrink-0">{v.icon}</div>
              <div>
                <div className="font-bold text-gray-900 mb-1">{v.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 text-center">What students are saying</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Real students. Real improvement.</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                quote: 'I finally understand where I go wrong. It explains each step so clearly — I went up two grades in my mock.',
                name: 'Aarav Singh',
                role: 'Year 11 · Leeds',
                initials: 'AS',
                bg: 'bg-purple-100 text-purple-800',
              },
              {
                quote: 'The daily questions are short enough that I actually do them. 15 minutes every evening and my algebra has improved massively.',
                name: 'Priya Sharma',
                role: 'Year 11 · Birmingham',
                initials: 'PS',
                bg: 'bg-blue-100 text-blue-800',
              },
              {
                quote: 'I was resitting and really struggling with geometry. This app explained circle theorems better than any YouTube video I found.',
                name: 'Rahul Desai',
                role: 'Resit student · Leicester',
                initials: 'RD',
                bg: 'bg-green-100 text-green-800',
              },
            ].map(t => (
              <div key={t.name} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${t.bg}`}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-purple-700 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Your exam is in {countdown.days} days
        </h2>
        <p className="text-purple-200 mb-8 text-base max-w-md mx-auto">
          Every day of practice counts. Start today — completely free, no card needed, no catch.
        </p>
        <a href="/auth" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-base hover:bg-purple-50 transition">
          Start practising free →
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-gray-100 flex justify-between items-center flex-wrap gap-4">
        <span className="font-semibold text-gray-900">GCSEMathsAI</span>
        <div className="flex gap-5">
          {[
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Contact', href: '/contact' },
            { label: 'Blog', href: '/blog' },
          ].map(l => (
            <a key={l.label} href={l.href} className="text-xs text-gray-400 hover:text-gray-600 transition">{l.label}</a>
          ))}
        </div>
        <span className="text-xs text-gray-400">© 2026 gcsemathsai.co.uk</span>
      </footer>

    </main>
  )
}