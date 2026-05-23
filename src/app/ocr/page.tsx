import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'OCR GCSE Maths (J560) â€” Complete Hub | GCSEMathsAI',
  description: 'OCR GCSE Maths J560 â€” paper structure, grade boundaries, problem-solving style, exam guidance for Foundation and Higher tier students.',
  keywords: ['ocr gcse maths', 'ocr j560', 'ocr gcse maths past papers', 'ocr gcse maths topics', 'ocr gcse maths grade boundaries', 'ocr gcse maths higher foundation'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/ocr' },
  openGraph: {
    title: 'OCR GCSE Maths (J560) â€” Complete Revision Hub | GCSEMathsAI',
    description: 'Paper structure, grade boundaries, problem-solving style and revision guidance for OCR GCSE Maths J560.',
    url: 'https://www.gcsemathsai.co.uk/ocr',
  },
}

const BASE = 'https://www.gcsemathsai.co.uk'
const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const PAPERS = [
  { paper: 'Paper 1', calc: 'Non-calculator', marks: 100, time: '1 hr 30 min' },
  { paper: 'Paper 2', calc: 'Calculator', marks: 100, time: '1 hr 30 min' },
  { paper: 'Paper 3', calc: 'Calculator', marks: 100, time: '1 hr 30 min' },
]
const HIGHER_GB = [['9','240â€“262'],['8','210â€“235'],['7','180â€“205'],['6','145â€“170'],['5','110â€“135'],['4','75â€“100']]
const FOUNDATION_GB = [['5','175â€“205'],['4','130â€“158'],['3','90â€“115']]
const STYLE_NOTES = [
  { title: 'Problem-solving emphasis', body: 'OCR papers contain a higher density of multi-step problem-solving questions. Questions often start in a real context and require you to identify the maths needed â€” closer to the way mathematics is used outside the classroom.' },
  { title: 'Alternative methods credited', body: 'OCR mark schemes explicitly mention alternative methods. If you reach the right answer with a valid different approach, you usually get full credit. This rewards confident, creative problem solving.' },
  { title: 'Strong communication focus', body: 'OCR awards communication marks for clearly laid-out working, including the use of correct notation. Sloppy presentation can lose marks even when the maths is right.' },
  { title: 'Smaller candidate base', body: 'About 10% of GCSE Maths candidates sit OCR. Resources are slightly less abundant than for AQA or Edexcel â€” past papers and worked solutions are more valuable as a result.' },
]
const USEFUL_LINKS = [
  { label: 'OCR GCSE Maths Complete Guide', href: '/blog/ocr-gcse-maths-complete-guide' },
  { label: 'GCSE Maths 2026 Grade Boundaries Forecast', href: '/blog/gcse-maths-2026-grade-boundaries-forecast' },
  { label: 'GCSE Maths Exam Technique', href: '/blog/gcse-maths-exam-technique' },
  { label: 'Iteration at GCSE Maths â€” Higher', href: '/blog/iteration-gcse-maths-higher-guide' },
  { label: 'Trigonometry at GCSE', href: '/blog/trigonometry-gcse-maths' },
  { label: 'All 245 GCSE Maths Topics', href: '/topics' },
]

export default function OCRHubPage() {
  const breadcrumb = {
    '@context': 'https://schema.org','@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'OCR GCSE Maths', item: `${BASE}/ocr` },
    ],
  }
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--burgundy)', background: 'var(--burgundy-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Exam Board Â· OCR
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          OCR GCSE Maths <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>(J560)</em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
          OCR&apos;s J560 specification is sat by a smaller number of schools but is widely respected for its problem-solving approach. OCR papers are out of 300 marks across three papers of 100. Different structure, same maths.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Paper structure</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Three papers, 300 marks total</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          {PAPERS.map(p => (
            <div key={p.paper} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{p.paper}</p>
              <p style={{ ...monoLabel, color: 'var(--burgundy)', margin: 0 }}>{p.calc}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 12 }}>{p.marks} marks Â· {p.time}</p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginTop: 16 }}>
          OCR uses 100-mark papers (vs AQA and Edexcel&apos;s 80) so percentages can be compared cleanly. Foundation tier targets grades 1â€“5; Higher tier targets grades 4â€“9.
        </p>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', marginTop: 56 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Recent grade boundaries</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Comparable <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>percentage thresholds</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Higher tier Â· out of 300</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>{HIGHER_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}</tbody>
              </table>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 14px' }}>Foundation tier Â· out of 300</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr style={{ color: 'var(--ink-3)' }}><th style={{ textAlign: 'left', paddingBottom: 8 }}>Grade</th><th style={{ textAlign: 'right', paddingBottom: 8 }}>Marks</th></tr></thead>
                <tbody style={{ color: 'var(--ink-2)' }}>{FOUNDATION_GB.map(([g, m]) => <tr key={g}><td style={{ padding: '4px 0' }}>{g}</td><td style={{ textAlign: 'right' }}>{m}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
          <p style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.6, marginTop: 16 }}>
            As a percentage, OCR boundaries are similar to AQA and Edexcel. A grade 7 sits around 60â€“68% across all three boards.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>OCR style</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          What makes OCR <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>different</em>
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
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Useful guides for OCR students</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>Start here</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
            {USEFUL_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                style={{ background: 'var(--cream)', color: 'var(--ink-2)', border: '1px solid var(--rule)', borderRadius: 12, padding: '16px 18px', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: 'var(--serif)', letterSpacing: '-0.01em' }}>
                {l.label} â†’
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(40px, 6vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Practise calibrated to <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>OCR mark schemes</em>.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          Instant marking that awards alternative methods and communication marks â€” the OCR way.
        </p>
        <Link href="/auth" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>Start free â†’</Link>
      </section>
    </main>
  )
}
