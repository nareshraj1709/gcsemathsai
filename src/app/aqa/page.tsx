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
const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const PAPERS = [
  { paper: 'Paper 1', calc: 'Non-calculator', marks: 80, time: '1 hr 30 min' },
  { paper: 'Paper 2', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
  { paper: 'Paper 3', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
]

const HIGHER_GB = [
  ['9', '195–210'], ['8', '170–185'], ['7', '142–162'],
  ['6', '115–138'], ['5', '90–115'], ['4', '60–90'],
]
const FOUNDATION_GB = [
  ['5', '145–168'], ['4', '105–130'], ['3', '75–95'], ['2', '50–70'],
]

const STYLE_NOTES = [
  { title: 'Heavy real-world context', body: 'AQA frames many questions around everyday situations — pricing, measurements, surveys. The maths is the same as on other boards, but the phrasing is less abstract. Practising context-heavy questions pays off.' },
  { title: 'Progressive build per paper', body: 'Each AQA paper opens with 1–2 mark accessible questions and builds to 5–6 mark multi-step problems. The hardest questions are clustered at the back of each paper.' },
  { title: 'Generous method marks', body: 'AQA mark schemes credit correct method even when arithmetic slips. Always show your working — a correct method with a wrong final answer usually earns most of the available marks.' },
  { title: 'Non-calculator test of number sense', body: 'Paper 1 has no calculator. Mental arithmetic, fractions and standard form are foundational. Many students underperform on Paper 1 because they only revise with a calculator.' },
]

const USEFUL_LINKS = [
  { label: 'AQA GCSE Maths Complete Topic Checklist', href: '/blog/aqa-gcse-maths-complete-topic-checklist' },
  { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
  { label: '7-Day GCSE Maths Revision Plan', href: '/blog/7-day-gcse-maths-revision-plan' },
  { label: 'Foundation vs Higher — Which Tier?', href: '/blog/gcse-maths-foundation-vs-higher-which-tier' },
  { label: 'GCSE Maths Formulas You Must Know', href: '/blog/gcse-maths-formulas-you-must-know' },
  { label: 'All 187 GCSE Maths Topics', href: '/topics' },
]

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
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Exam Board · AQA
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          AQA GCSE Maths <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>(8300)</em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
          The largest GCSE Maths exam board, with over 1.5 million candidates each year. Everything you need to revise to the AQA specification — paper structure, grade boundaries, style of questions and the topics that come up every year.
        </p>
      </section>

      {/* Paper structure */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Paper structure</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          Three papers, 240 marks total
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {PAPERS.map(p => (
            <div key={p.paper} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{p.paper}</p>
              <p style={{ ...monoLabel, color: 'var(--green)', margin: 0 }}>{p.calc}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12 }}>{p.marks} marks · {p.time}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginTop: 16 }}>
          All three papers are taken in May/June or in the November resit window. Foundation tier (grades 1–5) and Higher tier (grades 4–9) sit different question sets.
        </p>
      </section>

      {/* Grade boundaries */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', marginTop: 56 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Recent grade boundaries</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            What each grade has <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>typically taken</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Higher tier · out of 240</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  {HIGHER_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Foundation tier · out of 240</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>
                  {FOUNDATION_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.6, marginTop: 16 }}>
            Ranges from recent published boundaries. Actual 2026 boundaries are released on results day (21 August 2026). See our{' '}
            <Link href="/blog/gcse-maths-2026-grade-boundaries-forecast" style={{ color: 'var(--green)', textDecoration: 'underline' }}>2026 boundaries forecast</Link>.
          </p>
        </div>
      </section>

      {/* Style notes */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>AQA style</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          What makes AQA papers <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>distinctive</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          {STYLE_NOTES.map(s => (
            <div key={s.title} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Useful links */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', marginTop: 56 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Useful guides for AQA students</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Start here</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {USEFUL_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{ background: 'var(--cream)', color: 'var(--ink-2)', border: '1px solid var(--rule)', borderRadius: 12, padding: '16px 18px', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: 'var(--serif)', letterSpacing: '-0.01em' }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(40px, 6vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Practise calibrated to <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>AQA mark schemes</em>.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          Instant marking that awards method, accuracy and follow-through — the way AQA examiners do.
        </p>
        <Link href="/auth" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>Start free →</Link>
      </section>
    </main>
  )
}
