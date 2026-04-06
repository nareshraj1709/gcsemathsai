'use client'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 })
  const [parentOpen, setParentOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setLoggedIn(true)
    })
  }, [])

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
              GCSEMathsAI is completely free right now. Create an account for your child and they can start practising real GCSE and A Level Maths questions with instant AI feedback today.
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
          GCSE (Year 9–11) &amp; A Level (Year 12–13) · AQA · Edexcel · OCR · Free
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-2xl mx-auto">
          Stop guessing.<br />
          <span className="text-purple-700">Start knowing your grade.</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8 leading-relaxed">
          GCSE and A Level Maths questions, instant AI feedback, and a streak to keep you going. 5 minutes a day is all it takes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap mb-4">
          {loggedIn ? (
            <>
              <a href="/learn" className="bg-purple-700 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-purple-800 transition shadow-md shadow-purple-200">
                Continue practising →
              </a>
              <a href="/dashboard" className="bg-white text-gray-700 border border-gray-200 px-6 py-3.5 rounded-xl font-semibold text-base hover:border-purple-400 hover:text-purple-700 transition">
                Go to dashboard
              </a>
            </>
          ) : (
            <>
              <a href="/auth" className="bg-purple-700 text-white px-7 py-3.5 rounded-xl font-bold text-base hover:bg-purple-800 transition shadow-md shadow-purple-200">
                Start practising free →
              </a>
              <a href="#how" className="bg-white text-gray-700 border border-gray-200 px-6 py-3.5 rounded-xl font-semibold text-base hover:border-purple-400 hover:text-purple-700 transition">
                See how it works
              </a>
            </>
          )}
        </div>
        {!loggedIn && <p className="text-xs text-gray-400">No card required · No catch · Free for every student</p>}

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
          { val: 'GCSE & A Level', label: 'Year 9–11 & Year 12–13' },
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
                desc: 'Choose any GCSE or A Level topic from the full AQA, Edexcel or OCR spec. Questions are generated fresh every session.',
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

      {/* GCSE Topics */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Full spec coverage</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Every topic. Every tier.</h2>
          <p className="text-gray-500 mb-8 text-base leading-relaxed">GCSE and A Level Maths — Foundation, Higher and beyond. All major exam boards fully covered.</p>

          {/* GCSE */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">GCSE Maths</span>
              <span className="text-xs text-gray-400">Year 9–11 · Foundation & Higher</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Number', count: 13, color: 'bg-purple-100 text-purple-800', topics: ['Fractions', 'Decimals', 'Percentages', 'Percentage change', 'Reverse percentages', 'Factors & primes', 'Powers & roots', 'Indices', 'Standard form', 'Surds', 'Bounds', 'Recurring decimals'] },
                { label: 'Algebra', count: 19, color: 'bg-blue-100 text-blue-800', topics: ['Simplifying', 'Expanding brackets', 'Factorising', 'Linear equations', 'Simultaneous equations', 'Quadratics', 'Completing the square', 'Inequalities', 'Sequences', 'Straight-line graphs', 'Functions', 'Graph transformations', 'Iteration', 'Algebraic proof'] },
                { label: 'Geometry', count: 20, color: 'bg-green-100 text-green-800', topics: ['Angle rules', 'Parallel lines', 'Polygons', 'Area & perimeter', 'Circles', 'Arcs & sectors', 'Volume', 'Surface area', 'Pythagoras', 'Trigonometry', 'Sine & cosine rules', 'Circle theorems', 'Vectors', 'Transformations', 'Bearings'] },
                { label: 'Statistics', count: 13, color: 'bg-amber-100 text-amber-800', topics: ['Mean, median, mode', 'Frequency tables', 'Cumulative frequency', 'Box plots', 'Histograms', 'Scatter graphs', 'Probability', 'Tree diagrams', 'Venn diagrams', 'Conditional probability', 'Sampling'] },
                { label: 'Ratio', count: 11, color: 'bg-rose-100 text-rose-800', topics: ['Simplifying ratios', 'Sharing in a ratio', 'Direct proportion', 'Inverse proportion', 'Speed, distance & time', 'Density', 'Compound interest', 'Growth & decay', 'Rates of change'] },
              ].map(t => (
                <div key={t.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.color}`}>{t.label}</span>
                    <span className="text-[10px] text-gray-400">{t.count}</span>
                  </div>
                  <div className="text-xs text-gray-500 leading-7">
                    {t.topics.map(tp => <div key={tp}>{tp}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A Level */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">A Level Maths</span>
              <span className="text-xs text-gray-400">Year 12–13 · AQA · Edexcel · OCR A · OCR B (MEI)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Pure Maths', count: 12, color: 'bg-purple-100 text-purple-800', topics: ['Proof', 'Algebra & Functions', 'Coordinate Geometry', 'Sequences & Series', 'Trigonometry', 'Exponentials & Logs', 'Differentiation', 'Integration', 'Numerical Methods', 'Vectors', 'Binomial Expansion', 'Parametric Equations'] },
                { label: 'Statistics', count: 6, color: 'bg-amber-100 text-amber-800', topics: ['Statistical Sampling', 'Data Presentation', 'Probability', 'Statistical Distributions', 'Hypothesis Testing', 'Correlation & Regression'] },
                { label: 'Mechanics', count: 7, color: 'bg-blue-100 text-blue-800', topics: ['Quantities & Units', 'Kinematics (constant)', 'Kinematics (variable)', 'Forces & Newton\'s Laws', 'Moments', 'Projectiles', 'Friction'] },
              ].map(t => (
                <div key={t.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.color}`}>{t.label}</span>
                    <span className="text-[10px] text-gray-400">{t.count}</span>
                  </div>
                  <div className="text-xs text-gray-500 leading-7">
                    {t.topics.map(tp => <div key={tp}>{tp}</div>)}
                  </div>
                </div>
              ))}
            </div>
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
              desc: 'Every GCSE and A Level question is mapped to the AQA, Edexcel or OCR specification. No off-spec content, no wasted revision time.',
            },
            {
              icon: '⚡',
              title: 'AI that marks like an examiner',
              desc: 'Not just right or wrong. The AI awards method marks, spots common mistakes, and explains each step — for both GCSE and A Level questions.',
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                quote: 'I finally understand where I go wrong. It explains each step so clearly — I went up two grades in my mock.',
                role: 'Year 11 · GCSE',
                initials: 'A',
                bg: 'bg-purple-100 text-purple-800',
              },
              {
                quote: 'The daily questions are short enough that I actually do them. 15 minutes every evening and my algebra has improved massively.',
                role: 'Year 11 · GCSE',
                initials: 'P',
                bg: 'bg-blue-100 text-blue-800',
              },
              {
                quote: 'I was resitting and really struggling with geometry. This app explained circle theorems better than any YouTube video I found.',
                role: 'Resit · GCSE',
                initials: 'R',
                bg: 'bg-green-100 text-green-800',
              },
              {
                quote: 'Using this for A Level Pure Maths. The integration and differentiation questions are properly exam-style and the feedback actually helps.',
                role: 'Year 13 · A Level',
                initials: 'J',
                bg: 'bg-amber-100 text-amber-800',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="text-amber-400 text-sm mb-3">★★★★★</div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${t.bg}`}>{t.initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Verified student</div>
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
          Every day of practice counts. {loggedIn ? 'Keep your streak going.' : 'Start today — completely free, no card needed, no catch.'}
        </p>
        <a href={loggedIn ? '/learn' : '/auth'} className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-base hover:bg-purple-50 transition">
          {loggedIn ? 'Continue practising →' : 'Start practising free →'}
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Study</p>
              <div className="flex flex-col gap-2">
                <a href="/topics" className="text-xs text-gray-500 hover:text-purple-700 transition">All 73 GCSE Topics</a>
                <a href="/study" className="text-xs text-gray-500 hover:text-purple-700 transition">Study Notes</a>
                <a href="/formula-sheet" className="text-xs text-gray-500 hover:text-purple-700 transition">Formula Sheet</a>
                <a href="/downloads" className="text-xs text-gray-500 hover:text-purple-700 transition">Past Paper PDFs</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Practice</p>
              <div className="flex flex-col gap-2">
                <a href="/learn" className="text-xs text-gray-500 hover:text-purple-700 transition">Topic Practice</a>
                <a href="/papers" className="text-xs text-gray-500 hover:text-purple-700 transition">Exam Papers</a>
                <a href="/sections" className="text-xs text-gray-500 hover:text-purple-700 transition">Topic Sections</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Resources</p>
              <div className="flex flex-col gap-2">
                <a href="/blog" className="text-xs text-gray-500 hover:text-purple-700 transition">Blog</a>
                <a href="/features" className="text-xs text-gray-500 hover:text-purple-700 transition">Features</a>
                <a href="/pricing" className="text-xs text-gray-500 hover:text-purple-700 transition">Pricing</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Company</p>
              <div className="flex flex-col gap-2">
                <a href="/contact" className="text-xs text-gray-500 hover:text-purple-700 transition">Contact Us</a>
                <a href="/privacy" className="text-xs text-gray-500 hover:text-purple-700 transition">Privacy Policy</a>
                <a href="/terms" className="text-xs text-gray-500 hover:text-purple-700 transition">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <span className="font-semibold text-gray-900">GCSEMathsAI</span>
            <span className="text-xs text-gray-400">© 2026 gcsemathsai.co.uk</span>
          </div>
        </div>
      </footer>

    </main>
  )
}