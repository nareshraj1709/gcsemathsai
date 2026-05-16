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

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const MARKS = [
  { line: '2(x + 3) = 14', verdict: 'M1', note: 'Method correct — about to expand' },
  { line: '2x + 6 = 14', verdict: 'A1', note: 'Accurate expansion' },
  { line: '2x = 8', verdict: 'M1', note: 'Correctly subtracts 6 both sides' },
  { line: 'x = 4', verdict: 'A1', note: 'Final answer correct' },
]

const WHY = [
  { num: 'I.', title: "You sit the real exam with a pen", desc: 'Practising with a keyboard trains the wrong muscle memory. The Writing Pad rehearses the real motion.' },
  { num: 'II.', title: 'Diagrams and equations together', desc: 'Geometry, vectors, probability trees — write the equation and sketch the diagram in the same place.' },
  { num: 'III.', title: 'Method marks are visible', desc: 'Examiners need to see your working to award method marks. Typed answers hide the reasoning. The pad shows it line by line.' },
]

export default function WritingPadPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <Link href="/features" style={{ ...monoLabel, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to features</Link>
        <span style={{ ...monoLabel, color: 'var(--navy)', background: 'var(--navy-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginTop: 20, marginBottom: 16 }}>
          Feature · Writing Pad
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Write the way you&rsquo;ll <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>write the exam</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 22px' }}>
          Most online maths tools force you to type. GCSEMathsAI lets you write your working with a stylus or finger — and the AI marks it line by line, like a real examiner.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/practice" className="btn btn-primary">Open a question and write →</Link>
          <Link href="/features" className="btn btn-outline">All features</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Example · A solved equation</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          Your working on the left, <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>the examiner&rsquo;s marks on the right</em>.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, position: 'relative', backgroundImage: 'repeating-linear-gradient(transparent, transparent 36px, var(--rule) 37px)', minHeight: 280 }}>
            <p style={{ ...monoLabel, color: 'var(--ink-3)', position: 'absolute', top: 14, right: 16, fontSize: 10 }}>Q · solve 2(x+3) = 14</p>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, lineHeight: '37px', paddingTop: 38, color: 'var(--ink)' }}>
              <div>2(x + 3) = 14</div>
              <div>2x + 6 = 14</div>
              <div>2x = 8</div>
              <div>x = 4</div>
            </div>
          </div>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24 }}>
            <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 16 }}>AI examiner · live marking</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {MARKS.map((m, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i === MARKS.length - 1 ? 0 : 12, borderBottom: i === MARKS.length - 1 ? 'none' : '1px solid var(--rule)' }}>
                  <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 8px', borderRadius: 6, fontSize: 11, flexShrink: 0 }}>
                    {m.verdict}
                  </span>
                  <div>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>{m.line}</p>
                    <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{m.note}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--rule)' }}>
              <span style={{ ...monoLabel, color: 'var(--ink-3)' }}>Total · 4 / 4 marks</span>
              <span style={{ ...monoLabel, color: 'var(--green)' }}>Full marks ✓</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Why hand-writing matters</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Three reasons this <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>changes the practice</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {WHY.map(s => (
              <div key={s.num}>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, fontWeight: 500, color: 'var(--green)', margin: '0 0 8px', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</p>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Works on</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, fontSize: 14, fontWeight: 600, flexWrap: 'wrap', color: 'var(--ink-2)' }}>
            <span>iPhone</span>
            <span>Android phone</span>
            <span>iPad + Apple Pencil</span>
            <span>Android tablet + stylus</span>
            <span>Chromebook</span>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 16 }}>
            On-device handwriting recognition — works offline on iPad and modern iPhones.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(20px, 4vw, 40px) 20px clamp(40px, 6vw, 64px)', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Pick up your <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>stylus</em>.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 22px' }}>
          The Writing Pad is included on every account, free. Open any topic and choose &ldquo;Write&rdquo; mode.
        </p>
        <Link href="/practice" className="btn btn-primary">Try the Writing Pad →</Link>
      </section>
    </main>
  )
}
