import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PREDICTED_PAPER_FAMILIES, getPredictedPaperFamily } from '@/lib/predicted-papers'

type Props = { params: Promise<{ family: string }> }

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const BASE = 'https://www.gcsemathsai.co.uk'

export async function generateStaticParams() {
  return PREDICTED_PAPER_FAMILIES.map(f => ({ family: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { family } = await params
  const f = getPredictedPaperFamily(family)
  if (!f) return { title: 'Predicted papers not found' }
  return {
    title: f.metaTitle,
    description: f.metaDescription,
    keywords: f.keywords,
    alternates: { canonical: `${BASE}/predicted-papers/${f.slug}` },
    openGraph: {
      title: `${f.metaTitle} | GCSEMathsAI`,
      description: f.metaDescription,
      url: `${BASE}/predicted-papers/${f.slug}`,
      type: 'website',
    },
  }
}

export default async function PredictedPaperFamilyPage({ params }: Props) {
  const { family } = await params
  const f = getPredictedPaperFamily(family)
  if (!f) notFound()

  const productSchemas = f.skus.map(p => ({
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
      url: `${BASE}/predicted-papers/${f.slug}`,
    },
  }))

  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Predicted Papers', item: `${BASE}/predicted-papers` },
      { '@type': 'ListItem', position: 3, name: `${f.board} ${f.tier} ${f.year}`, item: `${BASE}/predicted-papers/${f.slug}` },
    ],
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {productSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <Link href="/predicted-papers" style={{ ...monoLabel, color: 'var(--ink-3)', textDecoration: 'none' }}>← All predicted packs</Link>
        <div style={{ marginTop: 18 }}>
          <span style={{ ...monoLabel, color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 16 }}>
            {f.board} · {f.tier} · {f.year}
          </span>
          <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 800 }}>
            {f.title.split(' — ')[0]} — <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>Predicted Papers {f.year}</em>
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
            {f.heroBlurb}
          </p>
        </div>
      </section>

      {/* Product cards */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18 }}>
          {f.skus.map(p => (
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
                href={p.stripeUrl}
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
                Buy — {p.price} →
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
          <span>30-day refund if not satisfied</span>
        </div>
      </section>

      {/* What's inside */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>What you get</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Every pack is built the <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>way an exam team builds a real paper</em>.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { num: 'I.', title: `Calibrated to ${f.year}`, body: `Each paper is built around the topics most likely to appear in the ${f.year} series, using the last six years of ${f.board} question style as the base.` },
              { num: 'II.', title: 'Full mark schemes', body: `Every question has a full ${f.board}-style mark scheme. Method (M) marks, accuracy (A) marks and follow-through are all annotated.` },
              { num: 'III.', title: 'Worked solutions', body: 'Not just the answer. Every solution is written the way a top student would lay it out — clear method, every step earning its mark.' },
              { num: 'IV.', title: 'Topic coverage map', body: 'A one-page topic map per paper so you can spot your weak areas at a glance and know exactly what to revise next.' },
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
            { q: 'Are these the real exam papers?', a: `No. Every question is original, written in the ${f.board} ${f.tier} style and calibrated to the topics most likely to appear in ${f.year}. Selling the real papers would breach Pearson copyright.` },
            { q: 'How quickly do I get the PDFs?', a: 'Instantly. After Stripe confirms the payment you will receive an email with a download link for the PDFs — usually within 60 seconds.' },
            { q: 'Which paper should I buy first?', a: 'If you can only buy one, get Paper 2. It is typically the first calculator paper in the exam series and the bigger predictor of how Paper 3 will run.' },
            { q: 'Refund policy?', a: 'If the pack does not match the description, email support@gcsemathsai.co.uk within 30 days and we will refund in full.' },
            { q: 'Can I share these with my class?', a: 'A single purchase is for one student. For class / school licences, get in touch via /contact — we offer per-student rates from £4.' },
          ].map(item => (
            <div key={item.q}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{item.q}</p>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--green)', padding: 'clamp(32px, 5vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--cream)', fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Ten papers between you and your exam.
        </h2>
        <p style={{ color: 'var(--green-soft)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, margin: '0 auto 22px' }}>
          The bundle saves £4 and covers both calculator papers. Most students buy this one.
        </p>
        <a href={f.skus[2].stripeUrl} target="_blank" rel="noopener" className="btn" style={{ background: 'var(--cream)', color: 'var(--green)', padding: '11px 24px', fontWeight: 600 }}>
          Get the Paper 2 + 3 Bundle — {f.skus[2].price} →
        </a>
        <p style={{ ...monoLabel, color: 'var(--green-soft)', fontSize: 10, marginTop: 14 }}>Apple Pay · Google Pay · Card · Stripe-secured</p>
      </section>
    </main>
  )
}
