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
const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const PAPERS = [
  { paper: 'Paper 1', calc: 'Non-calculator', marks: 80, time: '1 hr 30 min' },
  { paper: 'Paper 2', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
  { paper: 'Paper 3', calc: 'Calculator', marks: 80, time: '1 hr 30 min' },
]
const HIGHER_GB = [['9','200–220'],['8','178–202'],['7','155–180'],['6','122–148'],['5','90–115'],['4','58–84']]
const FOUNDATION_GB = [['5','150–172'],['4','110–135'],['3','75–98']]
const STYLE_NOTES = [
  { title: 'Structured, methodical questions', body: 'Edexcel questions tend to scaffold a clear method. Show-that and prove questions are common, with each step contributing one mark. This rewards careful, well-laid-out working.' },
  { title: 'Detailed mark schemes', body: "Pearson's mark schemes spell out exactly what counts as a method mark and what counts as an accuracy mark. Following the standard layout (write the formula, substitute, calculate) maximises mark recovery on tough questions." },
  { title: 'Strong on functional maths', body: 'Edexcel includes more "real-world maths" style questions — bills, percentages of money, time and distance scenarios — particularly at Foundation tier.' },
  { title: 'Higher tier puts proofs at the back', body: 'Algebraic proof, vector proof and circle theorem proof typically appear in the last few questions of each paper. Practise these specifically — they are predictable and high-value.' },
]
const USEFUL_LINKS = [
  { label: 'Edexcel GCSE Maths Past Papers Guide', href: '/blog/edexcel-gcse-maths-past-papers-guide' },
  { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
  { label: 'Vectors at GCSE Maths — Higher Guide', href: '/blog/vectors-gcse-maths-higher-guide' },
  { label: 'Circle Theorems at GCSE', href: '/blog/circle-theorems-gcse' },
  { label: 'How to Solve Quadratic Equations', href: '/blog/how-to-solve-quadratic-equations-gcse' },
  { label: 'All 73 GCSE Maths Topics', href: '/topics' },
]

export default function EdexcelHubPage() {
  const breadcrumb = {
    '@context': 'https://schema.org','@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Edexcel GCSE Maths', item: `${BASE}/edexcel` },
    ],
  }
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--navy)', background: 'var(--navy-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Exam Board · Edexcel
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Edexcel GCSE Maths <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>(1MA1)</em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
          Pearson&apos;s flagship maths qualification, the second most-sat GCSE Maths spec in England. Edexcel papers are known for structured, methodical questions and detailed mark schemes — this page covers every aspect you need to revise.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Paper structure</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Three papers, 240 marks total</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {PAPERS.map(p => (
            <div key={p.paper} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{p.paper}</p>
              <p style={{ ...monoLabel, color: 'var(--navy)', margin: 0 }}>{p.calc}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12 }}>{p.marks} marks · {p.time}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginTop: 16 }}>
          Edexcel matches AQA&apos;s structure: three 80-mark papers. Foundation (grades 1–5) and Higher (grades 4–9) sit different question sets. The non-calculator paper is sat first.
        </p>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', marginTop: 56 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Recent grade boundaries</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Edexcel typically asks for <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>slightly more</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Higher tier · out of 240</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>{HIGHER_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}</tbody>
              </table>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Foundation tier · out of 240</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>{FOUNDATION_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.6, marginTop: 16 }}>
            Edexcel boundaries sit slightly higher than AQA&apos;s for the same grade, reflecting subtle differences in paper difficulty year on year.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Edexcel style</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          What sets <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>Edexcel papers apart</em>
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

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', marginTop: 56 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Useful guides for Edexcel students</p>
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
          Practise calibrated to <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>Edexcel mark schemes</em>.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          Instant marking that follows the M-A-C structure — method, accuracy, communication.
        </p>
        <Link href="/auth" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>Start free →</Link>
      </section>
    </main>
  )
}
