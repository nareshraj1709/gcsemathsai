import type { Metadata } from 'next'
import Link from 'next/link'
import { FOUNDATION_PAPERS, getCheckoutUrl } from '@/lib/predicted-papers'

export const metadata: Metadata = {
  title: 'Edexcel GCSE Maths Foundation Practice Papers — Paper 2 & Paper 3',
  description: 'Ten Foundation-tier calculator practice papers for Edexcel GCSE Maths (1MA1) — five Paper-2 style, five Paper-3 style. Full mark schemes and worked solutions. Instant PDF download.',
  keywords: [
    'edexcel gcse maths foundation practice papers',
    'gcse maths foundation paper 2 practice',
    'gcse maths foundation paper 3 practice',
    'edexcel 1ma1 foundation practice',
    'gcse maths grade 1 to 5 practice papers',
    'foundation tier maths papers 2026',
  ],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/foundation-papers' },
  openGraph: {
    title: 'Edexcel GCSE Maths Foundation Practice Papers | GCSEMathsAI',
    description: 'Ten Foundation-tier calculator practice papers with full mark schemes and worked solutions.',
    url: 'https://www.gcsemathsai.co.uk/foundation-papers',
    type: 'website',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const BASE = 'https://www.gcsemathsai.co.uk'

export default function FoundationPapersPage() {
  const productSchemas = FOUNDATION_PAPERS.map(p => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.description,
    brand: { '@type': 'Brand', name: 'GCSEMathsAI' },
    offers: {
      '@type': 'Offer',
      price: p.price.replace('£', ''),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/foundation-papers`,
    },
  }))

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {productSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ ...monoLabel, color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
          Foundation Practice Papers · Edexcel 2026
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          Foundation Paper 2 &amp; Paper 3 — <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>full-length practice, every grade-boundary topic</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
          Ten Foundation-tier calculator practice papers, carefully written by our team from the published Edexcel 1MA1 Foundation specification — five Paper-2 style, five Paper-3 style. Calibrated to the grade 1–5 difficulty curve, with full mark schemes, M1/A1/B1 codes and worked solutions for every question. Sitting Higher? <Link href="/practice-papers" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Our Higher practice papers are here</Link>.
        </p>
      </section>

      {/* Product cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {FOUNDATION_PAPERS.map(p => (
            <article
              key={p.id}
              style={{
                background: 'var(--paper)',
                border: p.highlight ? '2px solid var(--green)' : '1px solid var(--rule)',
                borderRadius: 14,
                padding: 'clamp(22px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {p.highlight && (
                <span style={{ position: 'absolute', top: 12, right: 12, ...monoLabel, color: 'var(--cream)', background: 'var(--green)', padding: '4px 10px', borderRadius: 999, fontSize: 10 }}>
                  Most popular
                </span>
              )}
              <span style={{ ...monoLabel, color: p.highlight ? 'var(--green)' : 'var(--gold)', background: p.highlight ? 'var(--green-soft)' : 'var(--gold-soft)', padding: '4px 10px', borderRadius: 999, alignSelf: 'flex-start' }}>
                {p.badge}
              </span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 2.8vw, 28px)', fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.15 }}>
                {p.title}
              </h2>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
                {p.subtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 38, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                  {p.price}
                </span>
                <span style={{ ...monoLabel, color: 'var(--ink-3)' }}>{p.priceNote}</span>
              </div>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, margin: '6px 0 0' }}>
                {p.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '4px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.includes.map((line, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55 }}>
                    <span style={{ color: 'var(--green)', fontWeight: 700, fontFamily: 'var(--mono)', flexShrink: 0 }}>✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href={getCheckoutUrl(p)}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
                style={{
                  marginTop: 14,
                  background: p.highlight ? 'var(--green)' : 'var(--ink)',
                  borderColor: p.highlight ? 'var(--green)' : 'var(--ink)',
                  justifyContent: 'center',
                  padding: '13px 22px',
                  fontSize: 15,
                }}
              >
                Buy {p.title.replace(/^.*— /, '')} — {p.price} →
              </a>
              <p style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 10, textAlign: 'center', margin: '4px 0 0' }}>
                Stripe checkout · Apple Pay · Google Pay · Card
              </p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <span>Instant PDF download</span>
          <span>Secure Stripe checkout</span>
        </div>
      </section>

      {/* What's inside */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>What you get</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Every pack is built for <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>grade 1 to 5 students who want to nail the Foundation paper</em>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { num: 'I.', title: 'Grade 1–5 difficulty ramp', body: 'Each paper starts with Q1 a struggling grade-1 student can solve in under 30 seconds and finishes with grade-4/5 multi-step problems — exactly the curve Edexcel Foundation papers use.' },
              { num: 'II.', title: 'Authentic Foundation topics only', body: 'Percentages, ratio, statistics, basic Pythagoras, volume of a prism, sequences, two-way tables. No quadratic formula, no SOHCAHTOA, no circle theorems — nothing outside the Foundation specification.' },
              { num: 'III.', title: 'Full mark schemes', body: 'Every question has a complete M1 / A1 / B1 / C1 mark scheme so students see exactly where method marks are awarded — the same way examiners grade.' },
              { num: 'IV.', title: 'Step-by-step worked solutions', body: 'Not just the answer. Every solution is written out in detail with the reasoning at each step, so students can see where they went wrong and learn from it.' },
            ].map(s => (
              <div key={s.num} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, fontWeight: 500, color: 'var(--green)', margin: '0 0 8px', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</p>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>FAQ</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          The questions everyone asks
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {[
            { q: 'Are these the real exam papers?', a: 'No. Every question is written from scratch by our team, in the style of Edexcel 1MA1 Foundation and pitched at grades 1–5. These are independent practice papers — full-length, exam-shaped, and based entirely on the publicly available specification. We are not affiliated with, endorsed by, or associated with Pearson Edexcel.' },
            { q: 'Are Sets 1–5 different from Sets 6–10?', a: 'Yes. Sets 1–5 mirror the Edexcel Paper 2F style (percentages, ratio, statistics, scatter graphs, pie charts, speed-distance-time). Sets 6–10 mirror Paper 3F style (compound interest, Pythagoras, volume / surface area, sequences, probability with trees and two-way tables, bearings, and at least one explicit "show that" per paper).' },
            { q: 'How quickly do I get the PDFs?', a: 'Instantly. After Stripe confirms the payment you are taken to a download page and can also receive the links by email. Each PDF is watermarked with your buyer reference.' },
            { q: 'Which pack should I buy first?', a: 'If you can only buy one, get the bundle — it is the cheapest per paper and covers the full Foundation specification. If you have a specific weakness in Paper 2 or Paper 3, pick the matching pack.' },
            { q: 'Can I share these with my class?', a: 'A single purchase is for one student. For class / school licences, get in touch via /contact — we offer per-student rates from £4.' },
          ].map(item => (
            <div key={item.q}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{item.q}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-sell to Higher */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>Sitting Higher tier?</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 14px', letterSpacing: '-0.01em' }}>
            Our Higher predicted papers are here too.
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 18 }}>
            Ten predicted Paper 2 and Paper 3 papers for Edexcel 1MA1 Higher — calibrated to the 2026 series.
          </p>
          <Link href="/practice-papers" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: 14 }}>
            See Higher predicted papers →
          </Link>
        </div>
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(32px, 5vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Ten Foundation papers between you and your exam.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          The bundle saves £1.99 and covers both calculator papers — five Paper-2 style and five Paper-3 style. Most students buy this one.
        </p>
        <a href={getCheckoutUrl(FOUNDATION_PAPERS[2])} target="_blank" rel="noopener" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>
          Get the Foundation Bundle — {FOUNDATION_PAPERS[2].price} →
        </a>
        <p style={{ ...monoLabel, color: 'var(--green-soft)', fontSize: 10, marginTop: 14 }}>Apple Pay · Google Pay · Card · Stripe-secured</p>
      </section>

      {/* Trademark / independence notice */}
      <section style={{ background: 'var(--cream-2)', borderTop: '1px solid var(--rule)', padding: '20px' }}>
        <p style={{ maxWidth: 760, margin: '0 auto', fontSize: 11.5, color: 'var(--ink-3)', lineHeight: 1.6, textAlign: 'center' }}>
          <strong style={{ color: 'var(--ink-2)' }}>Trademark &amp; independence notice.</strong>{' '}
          GCSEMathsAI is an independent revision resource. The names &ldquo;Edexcel&rdquo; and &ldquo;Pearson&rdquo;, and the 1MA1 specification reference, are trademarks of Pearson Education Ltd, used here only to identify the examination these practice papers are written for. We are not affiliated with, endorsed by, or associated with Pearson Education or Edexcel. All practice papers, mark schemes and worked solutions on this page were carefully written from scratch by the GCSEMathsAI team based on the publicly available specification.
        </p>
      </section>
    </main>
  )
}
