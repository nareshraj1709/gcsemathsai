import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AQA GCSE Maths (8300) — Complete Hub | GCSEMathsAI',
  description: 'AQA GCSE Maths 8300 — paper structure, grade boundaries, most-tested topics, formula sheet and exam date guidance for Foundation and Higher tier students.',
  keywords: ['aqa gcse maths', 'aqa 8300', 'aqa gcse maths past papers', 'aqa gcse maths topics', 'aqa gcse maths grade boundaries', 'aqa gcse maths foundation higher'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/aqa' },
  openGraph: {
    title: 'AQA GCSE Maths (8300) — Complete Revision Hub | GCSEMathsAI',
    description: 'Paper structure, grade boundaries, most-tested topics and revision guidance for AQA GCSE Maths 8300.',
    url: 'https://www.gcsemathsai.co.uk/aqa',
  },
}

const BASE = 'https://www.gcsemathsai.co.uk'

export default function AQAHubPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'AQA GCSE Maths', item: `${BASE}/aqa` },
    ],
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Exam Board · AQA
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-3 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            AQA GCSE Maths <em>(8300)</em>
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            The largest GCSE Maths exam board, with over 1.5 million candidates each year. Everything you need to revise to the AQA specification — paper structure, grade boundaries, style of questions and the topics that come up every year.
          </p>
        </div>
      </section>

      {/* Paper structure */}
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
              <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--green)' }}>{p.calc}</div>
              <div className="mt-3 text-sm" style={{ color: 'var(--ink-2)' }}>{p.marks} marks · {p.time}</div>
            </div>
          ))}
        </div>
        <p className="text-sm mt-5" style={{ color: 'var(--ink-3)' }}>
          All three papers are taken in May/June or in the November resit window. Foundation tier (grades 1–5) and Higher tier (grades 4–9) sit different question sets.
        </p>
      </section>

      {/* Grade boundaries */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Recent grade boundaries</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>What each grade has typically taken</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Higher tier — typical mark out of 240</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>9</td><td className="text-right">195–210</td></tr>
                  <tr><td>8</td><td className="text-right">170–185</td></tr>
                  <tr><td>7</td><td className="text-right">142–162</td></tr>
                  <tr><td>6</td><td className="text-right">115–138</td></tr>
                  <tr><td>5</td><td className="text-right">90–115</td></tr>
                  <tr><td>4</td><td className="text-right">60–90</td></tr>
                </tbody>
              </table>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
              <div className="text-sm font-bold mb-3" style={{ color: 'var(--ink)' }}>Foundation tier — typical mark out of 240</div>
              <table className="w-full text-sm">
                <thead><tr style={{ color: 'var(--ink-3)' }}><th className="text-left">Grade</th><th className="text-right">Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  <tr><td>5</td><td className="text-right">145–168</td></tr>
                  <tr><td>4</td><td className="text-right">105–130</td></tr>
                  <tr><td>3</td><td className="text-right">75–95</td></tr>
                  <tr><td>2</td><td className="text-right">50–70</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
            Ranges from recent published boundaries. Actual 2026 boundaries are released on results day (21 August 2026). See our <Link href="/blog/gcse-maths-2026-grade-boundaries-forecast" className="underline" style={{ color: 'var(--green)' }}>2026 boundaries forecast</Link>.
          </p>
        </div>
      </section>

      {/* AQA-specific question style */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>AQA style</div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>What makes AQA papers <em>distinctive</em></h2>
        <div className="grid gap-4">
          {[
            { title: 'Heavy real-world context', body: 'AQA frames many questions around everyday situations — pricing, measurements, surveys. The maths is the same as on other boards, but the phrasing is less abstract. Practising context-heavy questions pays off.' },
            { title: 'Progressive build per paper', body: 'Each AQA paper opens with 1–2 mark accessible questions and builds to 5–6 mark multi-step problems. The hardest questions are clustered at the back of each paper.' },
            { title: 'Generous method marks', body: 'AQA mark schemes credit correct method even when arithmetic slips. Always show your working — a correct method with a wrong final answer usually earns most of the available marks.' },
            { title: 'Non-calculator test of number sense', body: 'Paper 1 has no calculator. Mental arithmetic, fractions and standard form are foundational. Many students underperform on Paper 1 because they only revise with a calculator.' },
          ].map(s => (
            <div key={s.title} className="rounded-xl p-5" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
              <div className="text-base font-bold mb-1" style={{ color: 'var(--ink)' }}>{s.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Useful links */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>Useful guides for AQA students</div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Start here</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: 'AQA GCSE Maths Complete Topic Checklist', href: '/blog/aqa-gcse-maths-complete-topic-checklist' },
              { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
              { label: '7-Day GCSE Maths Revision Plan', href: '/blog/7-day-gcse-maths-revision-plan' },
              { label: 'Foundation vs Higher — Which Tier?', href: '/blog/gcse-maths-foundation-vs-higher-which-tier' },
              { label: 'GCSE Maths Formulas You Must Know', href: '/blog/gcse-maths-formulas-you-must-know' },
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
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--serif)' }}>Practise calibrated to AQA mark schemes.</h2>
        <p className="mb-6 max-w-md mx-auto text-sm" style={{ color: 'var(--green-soft)' }}>
          AI marking that awards method, accuracy and follow-through — the way AQA examiners do.
        </p>
        <Link href="/auth" className="inline-block font-semibold px-7 py-3 rounded-xl text-sm" style={{ background: 'var(--paper)', color: 'var(--green)' }}>
          Start free →
        </Link>
      </section>
    </main>
  )
}
