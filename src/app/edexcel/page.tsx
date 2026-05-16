import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Edexcel GCSE Maths (1MA1) — Complete Hub | GCSEMathsAI',
  description: 'Edexcel GCSE Maths 1MA1 — paper structure, grade boundaries, most-examined topics, formula sheet and revision guidance for Foundation and Higher tier students.',
  keywords: ['edexcel gcse maths', 'edexcel 1ma1', 'edexcel gcse maths past papers', 'edexcel gcse maths topics', 'edexcel gcse maths grade boundaries', 'edexcel gcse maths higher foundation'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/edexcel' },
  openGraph: {
    title: 'Edexcel GCSE Maths (1MA1) — Complete Revision Hub | GCSEMathsAI',
    description: 'Paper structure, grade boundaries, question style and revision guidance for Edexcel GCSE Maths 1MA1.',
    url: 'https://www.gcsemathsai.co.uk/edexcel',
  },
}

const BASE = 'https://www.gcsemathsai.co.uk'

export default function EdexcelHubPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Edexcel GCSE Maths', item: `${BASE}/edexcel` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--navy)', background: 'var(--navy-soft)' }}>
            Exam Board · Edexcel
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            Edexcel GCSE Maths <em>(1MA1)</em>
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            Pearson's flagship maths qualification, the second most-sat GCSE Maths spec in England. Edexcel papers are known for structured, methodical questions and detailed mark schemes — this page covers every aspect you need to revise.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Paper structure</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Three papers, 240 marks total</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { paper: 'Paper 1', calc: 'Non-calculator', marks: 80, time: '1 hr 30 min' },
            { paper: 'Paper 2', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
            { paper: 'Paper 3', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
          ].map(p => (
            <div key={p.paper} className="rounded-xl p-5" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              <div className="text-base font-bold mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>{p.paper}</div>
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--navy)' }}>{p.calc}</div>
              <div className="mt-3 text-sm" style={{ color: 'var(--ink-2)' }}>{p.marks} marks · {p.time}</div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-5" style={{ color: 'var(--ink-3)' }}>
          Edexcel matches AQA's structure: three 80-mark papers. Foundation (grades 1–5) and Higher (grades 4–9) sit different question sets. The non-calculator paper is sat first.
        </p>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Recent grade boundaries</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Edexcel typically asks for slightly more</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Higher tier — typical mark out of 240</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>9</td><td className="text-right">200–220</td></tr>
                  <tr><td>8</td><td className="text-right">178–202</td></tr>
                  <tr><td>7</td><td className="text-right">155–180</td></tr>
                  <tr><td>6</td><td className="text-right">122–148</td></tr>
                  <tr><td>5</td><td className="text-right">90–115</td></tr>
                  <tr><td>4</td><td className="text-right">58–84</td></tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Foundation tier — typical mark out of 240</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>5</td><td className="text-right">150–172</td></tr>
                  <tr><td>4</td><td className="text-right">110–135</td></tr>
                  <tr><td>3</td><td className="text-right">75–98</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
            Edexcel boundaries sit slightly higher than AQA's for the same grade, reflecting subtle differences in paper difficulty year on year.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Edexcel style</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>What sets <em>Edexcel papers apart</em></h2>
        <div className="grid gap-4">
          {[
            { title: 'Structured, methodical questions', body: 'Edexcel questions tend to scaffold a clear method. Show-that and prove questions are common, with each step contributing one mark. This rewards careful, well-laid-out working.' },
            { title: 'Detailed mark schemes', body: "Pearson's mark schemes spell out exactly what counts as a method mark and what counts as an accuracy mark. Following the standard layout (write the formula, substitute, calculate) maximises mark recovery on tough questions." },
            { title: 'Strong on functional maths', body: 'Edexcel includes more "real-world maths" style questions — bills, percentages of money, time and distance scenarios — particularly at Foundation tier.' },
            { title: 'Higher tier puts proofs at the back', body: 'Algebraic proof, vector proof and circle theorem proof typically appear in the last few questions of each paper. Practise these specifically — they are predictable and high-value.' },
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
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Useful guides for Edexcel students</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Start here</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'Edexcel GCSE Maths Past Papers Guide', href: '/blog/edexcel-gcse-maths-past-papers-guide' },
              { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
              { label: 'Vectors at GCSE Maths — Higher Guide', href: '/blog/vectors-gcse-maths-higher-guide' },
              { label: 'Circle Theorems at GCSE', href: '/blog/circle-theorems-gcse' },
              { label: 'How to Solve Quadratic Equations', href: '/blog/how-to-solve-quadratic-equations-gcse' },
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
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Practise calibrated to Edexcel mark schemes.</h2>
        <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'var(--green-soft)' }}>
          AI marking that follows Pearson's M-A-C structure — method, accuracy, communication.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-7 py-3 rounded-xl text-sm" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Start free →
        </Link>
      </section>
    </main>
  )
}
