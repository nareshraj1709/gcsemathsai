import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OCR GCSE Maths (J560) — Complete Hub | GCSEMathsAI',
  description: 'OCR GCSE Maths J560 — paper structure, grade boundaries, problem-solving style, exam guidance for Foundation and Higher tier students.',
  keywords: ['ocr gcse maths', 'ocr j560', 'ocr gcse maths past papers', 'ocr gcse maths topics', 'ocr gcse maths grade boundaries', 'ocr gcse maths higher foundation'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/ocr' },
  openGraph: {
    title: 'OCR GCSE Maths (J560) — Complete Revision Hub | GCSEMathsAI',
    description: 'Paper structure, grade boundaries, problem-solving style and revision guidance for OCR GCSE Maths J560.',
    url: 'https://www.gcsemathsai.co.uk/ocr',
  },
}

const BASE = 'https://www.gcsemathsai.co.uk'

export default function OCRHubPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'OCR GCSE Maths', item: `${BASE}/ocr` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--burgundy)', background: 'var(--burgundy-soft)' }}>
            Exam Board · OCR
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            OCR GCSE Maths <em>(J560)</em>
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            OCR's J560 specification is sat by a smaller number of schools but is widely respected for its problem-solving approach. OCR papers are out of 300 marks across three papers of 100. Different structure, same maths.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Paper structure</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Three papers, 300 marks total</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { paper: 'Paper 1', calc: 'Non-calculator', marks: 100, time: '1 hr 30 min' },
            { paper: 'Paper 2', calc: 'Calculator', marks: 100, time: '1 hr 30 min' },
            { paper: 'Paper 3', calc: 'Calculator', marks: 100, time: '1 hr 30 min' },
          ].map(p => (
            <div key={p.paper} className="rounded-xl p-5" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              <div className="text-base font-bold mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{p.paper}</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--burgundy)' }}>{p.calc}</div>
              <div className="mt-3 text-sm" style={{ color: 'var(--ink-2)' }}>{p.marks} marks · {p.time}</div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-5" style={{ color: 'var(--ink-3)' }}>
          OCR uses 100-mark papers (vs AQA and Edexcel's 80) so percentages can be compared cleanly. Foundation tier targets grades 1–5; Higher tier targets grades 4–9.
        </p>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Recent grade boundaries</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Comparable percentage thresholds</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Higher tier — typical mark out of 300</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>9</td><td className="text-right">240–262</td></tr>
                  <tr><td>8</td><td className="text-right">210–235</td></tr>
                  <tr><td>7</td><td className="text-right">180–205</td></tr>
                  <tr><td>6</td><td className="text-right">145–170</td></tr>
                  <tr><td>5</td><td className="text-right">110–135</td></tr>
                  <tr><td>4</td><td className="text-right">75–100</td></tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Foundation tier — typical mark out of 300</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>5</td><td className="text-right">175–205</td></tr>
                  <tr><td>4</td><td className="text-right">130–158</td></tr>
                  <tr><td>3</td><td className="text-right">90–115</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
            As a percentage, OCR boundaries are similar to AQA and Edexcel. A grade 7 sits around 60–68% across all three boards.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>OCR style</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>What makes OCR <em>different</em></h2>
        <div className="grid gap-4">
          {[
            { title: 'Problem-solving emphasis', body: 'OCR papers contain a higher density of multi-step problem-solving questions. Questions often start in a real context and require you to identify the maths needed — closer to the way mathematics is used outside the classroom.' },
            { title: 'Alternative methods credited', body: 'OCR mark schemes explicitly mention alternative methods. If you reach the right answer with a valid different approach, you usually get full credit. This rewards confident, creative problem solving.' },
            { title: 'Strong communication focus', body: 'OCR awards communication marks for clearly laid-out working, including the use of correct notation. Sloppy presentation can lose marks even when the maths is right.' },
            { title: 'Smaller candidate base', body: 'About 10% of GCSE Maths candidates sit OCR. Resources are slightly less abundant than for AQA or Edexcel — past papers and worked solutions are more valuable as a result.' },
          ].map(s => (
            <div key={s.title} className="rounded-xl p-5" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              <div className="text-base font-bold mb-1" style={{ color: 'var(--ink)' }}>{s.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Useful guides for OCR students</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Start here</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'OCR GCSE Maths Complete Guide', href: '/blog/ocr-gcse-maths-complete-guide' },
              { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
              { label: 'GCSE Maths Exam Technique', href: '/blog/gcse-maths-exam-technique' },
              { label: 'Iteration at GCSE Maths — Higher', href: '/blog/iteration-gcse-maths-higher-guide' },
              { label: 'Trigonometry at GCSE', href: '/blog/trigonometry-gcse-maths' },
              { label: 'All 73 GCSE Maths Topics', href: '/topics' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="rounded-xl p-4 text-sm font-semibold"
                style={{ background: 'var(--cream)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 text-center" style={{ background: 'var(--green)' }}>
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Practise calibrated to OCR mark schemes.</h2>
        <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'var(--green-soft)' }}>
          AI marking that awards alternative methods and communication marks — the OCR way.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-7 py-3 rounded-xl text-sm" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Start free →
        </Link>
      </section>
    </main>
  )
}
