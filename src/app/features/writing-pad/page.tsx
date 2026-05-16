import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Writing Pad — Write Your Working, Get It Marked | GCSEMathsAI',
  description: 'Write your GCSE Maths working with a stylus or finger on iPad or phone. AI recognises your handwriting and marks line by line — method marks, accuracy marks and follow-through.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/features/writing-pad' },
  openGraph: {
    title: 'Writing Pad — Write Your Working, Get It Marked | GCSEMathsAI',
    description: 'iPad or phone. Stylus or finger. AI marks your handwritten GCSE Maths working line by line.',
    url: 'https://www.gcsemathsai.co.uk/features/writing-pad',
  },
}

const MARKS = [
  { line: '2(x + 3) = 14', verdict: 'M1', note: 'Method correct — about to expand' },
  { line: '2x + 6 = 14', verdict: 'A1', note: 'Accurate expansion' },
  { line: '2x = 8', verdict: 'M1', note: 'Correctly subtracts 6 both sides' },
  { line: 'x = 4', verdict: 'A1', note: 'Final answer correct' },
]

export default function WritingPadPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Link href="/features" className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
            ← Back to features
          </Link>
          <div className="text-5xl mt-6 mb-4">✍️</div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Feature · Writing Pad
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-4 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            Write the way you&rsquo;ll <em>write the exam</em>.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            Most online maths tools force you to type. GCSEMathsAI lets you write your working with a stylus or finger — and the AI marks it line by line, like a real examiner.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <Link href="/practice" className="text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md" style={{ background: 'var(--green)' }}>
              Open a question and write →
            </Link>
            <Link href="/features" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
              All features
            </Link>
          </div>
        </div>
      </section>

      {/* Mock pad + marks */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
          Example · A solved equation
        </div>
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
          Your working on the left, <em>the examiner&rsquo;s marks on the right</em>.
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Mock writing pad */}
          <div
            className="rounded-xl p-6 relative"
            style={{
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, var(--rule) 40px)',
              minHeight: 320,
            }}
          >
            <div className="text-xs font-mono uppercase tracking-wider absolute top-3 right-4" style={{ color: 'var(--ink-3)' }}>
              Q · solve 2(x+3) = 14
            </div>
            <div className="font-serif italic text-lg leading-[40px] pt-10" style={{ color: 'var(--ink)' }}>
              <div>2(x + 3) = 14</div>
              <div>2x + 6 = 14</div>
              <div>2x = 8</div>
              <div>x = 4</div>
            </div>
          </div>

          {/* Examiner marks */}
          <div className="rounded-xl p-6" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
            <div className="text-xs font-mono uppercase tracking-wider mb-4" style={{ color: 'var(--green)' }}>
              AI examiner · live marking
            </div>
            <ul className="space-y-3">
              {MARKS.map((m, i) => (
                <li key={i} className="flex items-start gap-3 pb-3" style={{ borderBottom: i === MARKS.length - 1 ? 'none' : '1px solid var(--rule)' }}>
                  <span
                    className="shrink-0 text-xs font-mono font-bold px-2 py-1 rounded"
                    style={{ background: 'var(--green-soft)', color: 'var(--green)' }}
                  >
                    {m.verdict}
                  </span>
                  <div>
                    <div className="font-serif text-sm" style={{ color: 'var(--ink)' }}>{m.line}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{m.note}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 flex items-center justify-between text-xs font-mono uppercase tracking-wider" style={{ borderTop: '1px solid var(--rule)', color: 'var(--ink-3)' }}>
              <span>Total · 4 / 4 marks</span>
              <span style={{ color: 'var(--green)' }}>Full marks ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
            Why hand-writing matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: 'I.', title: 'You sit the real exam with a pen', desc: 'Practising with a keyboard trains the wrong muscle memory. The Writing Pad rehearses the real motion.' },
              { num: 'II.', title: 'Diagrams and equations together', desc: 'Geometry, vectors, probability trees — write the equation and sketch the diagram in the same place.' },
              { num: 'III.', title: 'Method marks are visible', desc: 'Examiners need to see your working to award method marks. Typed answers hide the reasoning. The pad shows it line by line.' },
            ].map(s => (
              <div key={s.num}>
                <div className="text-3xl font-serif italic mb-2" style={{ color: 'var(--green)' }}>{s.num}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--ink)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="rounded-2xl p-8 text-center" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
            Works on
          </div>
          <div className="flex justify-center gap-8 text-sm font-semibold flex-wrap" style={{ color: 'var(--ink-2)' }}>
            <span>📱 iPhone</span>
            <span>📱 Android phone</span>
            <span>📱 iPad + Apple Pencil</span>
            <span>📱 Android tablet + stylus</span>
            <span>💻 Chromebook</span>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
            On-device handwriting recognition — works offline on iPad and modern iPhones.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
          Pick up your stylus.
        </h2>
        <p className="mb-7 max-w-lg mx-auto text-sm" style={{ color: 'var(--ink-3)' }}>
          The Writing Pad is included on every account, free. Open any topic and choose &ldquo;Write&rdquo; mode.
        </p>
        <Link href="/practice" className="inline-block text-white font-semibold px-8 py-3 rounded-xl text-sm shadow-md" style={{ background: 'var(--green)' }}>
          Try the Writing Pad →
        </Link>
      </section>
    </main>
  )
}
