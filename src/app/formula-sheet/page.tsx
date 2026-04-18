import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'GCSE Maths Formula Sheet — Free PDF Download',
  description: 'Download the complete GCSE Maths formula sheet as a free PDF. Every formula you need for AQA, Edexcel and OCR exams in one place.',
  keywords: ['GCSE maths formula sheet', 'GCSE maths formulas PDF', 'maths formula sheet GCSE', 'AQA maths formulas', 'Edexcel maths formulas'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/formula-sheet' },
  openGraph: {
    title: 'GCSE Maths Formula Sheet — Free PDF Download',
    description: 'Every GCSE Maths formula in one free PDF. Covers AQA, Edexcel and OCR.',
    url: 'https://www.gcsemathsai.co.uk/formula-sheet',
  },
}

const FORMULA_GROUPS = [
  {
    name: 'Area & Perimeter',
    accent: 'var(--green)',
    accentSoft: 'var(--green-soft)',
    roman: 'I.',
    formulas: [
      'Area of rectangle = length \u00D7 width',
      'Area of triangle = \u00BD \u00D7 base \u00D7 height',
      'Area of parallelogram = base \u00D7 height',
      'Area of trapezium = \u00BD(a + b) \u00D7 h',
      'Area of circle = \u03C0r\u00B2',
      'Circumference = 2\u03C0r = \u03C0d',
    ],
  },
  {
    name: 'Volume & Surface Area',
    accent: 'var(--navy)',
    accentSoft: 'var(--navy-soft)',
    roman: 'II.',
    formulas: [
      'Volume of cuboid = l \u00D7 w \u00D7 h',
      'Volume of prism = area of cross-section \u00D7 length',
      'Volume of cylinder = \u03C0r\u00B2h',
      'Volume of sphere = \u2074\u2044\u2083\u03C0r\u00B3',
      'Volume of cone = \u2153\u03C0r\u00B2h',
      'Surface area of sphere = 4\u03C0r\u00B2',
    ],
  },
  {
    name: 'Algebra',
    accent: 'var(--burgundy)',
    accentSoft: 'var(--burgundy-soft)',
    roman: 'III.',
    formulas: [
      'Quadratic formula: x = (\u2212b \u00B1 \u221A(b\u00B2\u22124ac)) / 2a',
      'Difference of two squares: a\u00B2 \u2212 b\u00B2 = (a+b)(a\u2212b)',
      'Gradient = (y\u2082 \u2212 y\u2081) / (x\u2082 \u2212 x\u2081)',
      'Equation of a line: y = mx + c',
      'nth term (arithmetic): a + (n\u22121)d',
    ],
  },
  {
    name: 'Trigonometry & Pythagoras',
    accent: 'var(--gold)',
    accentSoft: 'var(--gold-soft)',
    roman: 'IV.',
    formulas: [
      'Pythagoras: a\u00B2 + b\u00B2 = c\u00B2',
      'sin \u03B8 = opposite / hypotenuse',
      'cos \u03B8 = adjacent / hypotenuse',
      'tan \u03B8 = opposite / adjacent',
      'Sine rule: a/sin A = b/sin B = c/sin C',
      'Cosine rule: a\u00B2 = b\u00B2 + c\u00B2 \u2212 2bc cos A',
      'Area of triangle = \u00BDab sin C',
    ],
  },
  {
    name: 'Probability & Statistics',
    accent: 'var(--green-mid)',
    accentSoft: 'var(--green-soft)',
    roman: 'V.',
    formulas: [
      'Probability = favourable outcomes / total outcomes',
      'P(A or B) = P(A) + P(B) \u2212 P(A and B)',
      'P(not A) = 1 \u2212 P(A)',
      'Mean = sum of values / number of values',
      'Compound interest: A = P(1 + r/100)\u207F',
    ],
  },
  {
    name: 'Compound Measures',
    accent: 'var(--navy)',
    accentSoft: 'var(--navy-soft)',
    roman: 'VI.',
    formulas: [
      'Speed = distance / time',
      'Density = mass / volume',
      'Pressure = force / area',
    ],
  },
]

export default function FormulaSheetPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #1A2D22 50%, var(--green-dark) 100%)',
        padding: '64px 24px', textAlign: 'center', color: 'var(--cream)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,137,61,0.15), transparent 60%)' }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--gold-soft)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'var(--gold)' }}>{'\u25C6'}</span> Free Download
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 20 }}>
            The complete GCSE Maths <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>formula sheet.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.85, maxWidth: 480, margin: '0 auto 32px', fontWeight: 500 }}>
            Every formula you need for AQA, Edexcel and OCR — in one printable PDF. Download it, pin it to your wall, and never forget a formula again.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="/GCSE_Maths_Formula_Sheet.pdf" download style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: 'var(--cream)',
              padding: '14px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700, fontFamily: 'var(--sans)',
              textDecoration: 'none', boxShadow: '0 2px 6px -1px rgba(184,137,61,0.35)',
            }}>
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 1v10M8 11l-3-3M8 11l3-3M2 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download PDF
            </a>
            <a href="/GCSE_Maths_Formula_Sheet.pdf" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--cream)',
              padding: '14px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'var(--sans)',
              textDecoration: 'none', border: '1.5px solid rgba(247,243,234,0.3)',
            }}>
              View in browser
            </a>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px 96px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 40 }}>
          <div className="sec-label">Quick Reference</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 12 }}>
            Every formula, <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>at a glance.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 560, fontWeight: 500 }}>
            The key formulas from the sheet. Download the full PDF above for the complete list with diagrams.
          </p>
        </div>

        {/* Formula grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 56 }} className="formula-grid">
          {FORMULA_GROUPS.map(group => (
            <div key={group.name} style={{
              background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
              overflow: 'hidden', transition: 'all 0.2s',
            }}>
              <div style={{
                padding: '18px 22px', borderBottom: '1px solid var(--rule)',
                display: 'flex', alignItems: 'center', gap: 14, background: 'var(--cream)',
              }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 24, fontWeight: 500,
                  color: group.accent, lineHeight: 1, opacity: 0.8,
                }}>{group.roman}</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                  {group.name}
                </h3>
              </div>
              <div style={{ padding: '18px 22px' }}>
                {group.formulas.map((f, i) => (
                  <div key={i} style={{
                    padding: '8px 0', borderTop: i > 0 ? '1px dashed var(--rule)' : 'none',
                    display: 'flex', alignItems: 'baseline', gap: 10,
                  }}>
                    <span style={{ color: group.accent, fontSize: 10, fontWeight: 700, fontFamily: 'var(--serif)', flexShrink: 0, marginTop: 2 }}>{'\u2726'}</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--ink)', fontWeight: 600, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tips section */}
        <div style={{
          background: 'var(--gold-soft)', borderLeft: '3px solid var(--gold)', borderRadius: '0 14px 14px 0',
          padding: '28px 28px', marginBottom: 40,
        }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 16, letterSpacing: '-0.01em' }}>
            How to use this formula sheet
          </h3>
          {[
            'Print it out and stick it on your bedroom wall or inside your revision folder.',
            'Test yourself \u2014 cover the right side and try to recall each formula from memory.',
            'In the exam, some formulas are given on the front page (area of trapezium, volume of prism, etc.) but many are not. Learn the ones that are NOT given.',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)', fontWeight: 500, flexShrink: 0, lineHeight: 1.4 }}>{i + 1}.</span>
              <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500 }}>{tip}</p>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 12, marginBottom: 0 }}>
            <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--gold)', fontWeight: 500, flexShrink: 0, lineHeight: 1.4 }}>4.</span>
            <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500 }}>
              Use our <Link href="/learn" style={{ color: 'var(--green)', fontWeight: 700, textDecoration: 'underline', textDecorationColor: 'var(--green-soft)', textUnderlineOffset: 2 }}>practice questions</Link> to apply each formula in exam-style contexts.
            </p>
          </div>
        </div>

        {/* Given vs Not Given */}
        <div style={{
          background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
          padding: '32px', marginBottom: 40, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, var(--green), var(--burgundy))' }} />
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.01em' }}>
            Which formulas are given in the exam?
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 24, lineHeight: 1.55, fontWeight: 500 }}>
            AQA, Edexcel and OCR all provide a formula sheet on the front page of the exam paper.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="given-grid">
            <div style={{ background: 'var(--green-soft)', border: '1px solid var(--green)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                {'\u2713'} Given in the exam
              </div>
              {['Area of trapezium', 'Volume of prism', 'Quadratic formula (Higher)', 'Sine rule, Cosine rule (Higher)', 'Area = \u00BDab sin C (Higher)', 'Volume of cone and sphere (Higher)'].map(f => (
                <div key={f} style={{ padding: '6px 0', fontSize: 14, color: 'var(--green-dark)', fontWeight: 500, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ color: 'var(--green)', fontSize: 10 }}>{'\u2726'}</span> {f}
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--burgundy-soft)', border: '1px solid var(--burgundy)', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--burgundy)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 14 }}>
                {'\u2715'} Must memorise
              </div>
              {['Area of circle, triangle, parallelogram', 'Circumference of a circle', "Pythagoras' theorem", 'SOH CAH TOA', 'Speed = distance / time', 'Density = mass / volume', 'Compound interest formula', 'y = mx + c'].map(f => (
                <div key={f} style={{ padding: '5px 0', fontSize: 14, color: 'var(--burgundy)', fontWeight: 500, display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 10 }}>{'\u2014'}</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 16, padding: '56px 40px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(14,31,23,0.08)',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--green), var(--gold) 50%, var(--burgundy))' }} />
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 12 }}>
            Know the formulas? <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>Now apply them.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 28, maxWidth: 460, margin: '0 auto 28px', fontWeight: 500 }}>
            Practise exam-style questions with AI marking — get instant feedback on your working and method marks.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/learn" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
              Start practising free {'\u2192'}
            </Link>
            <a href="/GCSE_Maths_Formula_Sheet.pdf" download className="btn btn-outline" style={{ padding: '14px 24px', fontSize: 15 }}>
              Download PDF again
            </a>
          </div>
        </div>

        {/* Related */}
        <div style={{ marginTop: 48 }}>
          <div className="sec-label">Related resources</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }} className="related-grid">
            {[
              { href: '/topics', title: 'All 73 GCSE Maths Topics', desc: 'Step-by-step explanations and worked examples for every topic' },
              { href: '/downloads', title: 'Download Past Papers', desc: 'Free AQA past paper PDFs to print and practise' },
              { href: '/learn', title: 'Practice Questions', desc: 'AI-marked exam-style questions with instant feedback' },
              { href: '/blog', title: 'Blog & Revision Guides', desc: 'Exam tips, revision strategies and topic deep-dives' },
            ].map(r => (
              <Link key={r.href} href={r.href} style={{
                background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12,
                padding: '20px 22px', textDecoration: 'none', transition: 'all 0.15s', display: 'block',
              }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--serif)', letterSpacing: '-0.01em', marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 500, lineHeight: 1.4 }}>{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .formula-grid { grid-template-columns: 1fr !important; }
          .given-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'LearningResource',
        name: 'GCSE Maths Formula Sheet — Free PDF Download',
        description: 'Complete GCSE Maths formula sheet covering all topics for AQA, Edexcel and OCR exams.',
        url: 'https://www.gcsemathsai.co.uk/formula-sheet',
        publisher: { '@type': 'Organization', name: 'GCSEMathsAI', url: 'https://www.gcsemathsai.co.uk' },
        learningResourceType: 'Reference Sheet', educationalLevel: 'GCSE', inLanguage: 'en-GB',
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gcsemathsai.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Formula Sheet', item: 'https://www.gcsemathsai.co.uk/formula-sheet' },
        ],
      }) }} />
    </main>
  )
}
