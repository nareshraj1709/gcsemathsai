'use client'
import Link from 'next/link'
import { PREDICTED_PAPERS, getCheckoutUrl } from '@/lib/predicted-papers'

/**
 * Compact predicted-papers promo. Used on high-traffic landing pages to drive
 * sales without overwhelming the page content. Three variants:
 *   - default: full 3-card panel (use on hubs like /papers, /topics)
 *   - inline: a single horizontal banner (use inside blog/topic articles)
 *   - footer: a tighter pre-footer CTA
 */
export default function PredictedPapersPromo({
  variant = 'default',
  source,
}: {
  variant?: 'default' | 'inline' | 'footer'
  /** Optional UTM-style source label appended to the buy link as a fragment. Useful for tracking which page drove the sale. */
  source?: string
}) {
  const bundle = PREDICTED_PAPERS.find(p => p.id === 'bundle')!
  const paper2 = PREDICTED_PAPERS.find(p => p.id === 'paper2')!
  const paper3 = PREDICTED_PAPERS.find(p => p.id === 'paper3')!

  const link = (sku: typeof bundle) => {
    const url = getCheckoutUrl(sku)
    return source ? `${url}${url.includes('?') ? '&' : '?'}utm_source=${encodeURIComponent(source)}` : url
  }

  if (variant === 'inline') {
    return (
      <aside
        style={{
          margin: '32px 0',
          background: 'var(--green)',
          color: 'var(--cream)',
          borderRadius: 14,
          padding: 'clamp(20px, 3vw, 28px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold-soft)' }}>
          ◆ New · Edexcel Higher 2026
        </span>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 600, color: 'var(--cream)', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.18 }}>
          Practising for the real thing? <em style={{ color: 'var(--gold-soft)' }}>Practice Papers</em> are here.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--cream)', opacity: 0.92, lineHeight: 1.55, margin: 0 }}>
          Ten practice papers for Edexcel 1MA1 Higher 2026 — five Paper-2 style, five Paper-3 style, written by our team from the published specification. Full mark schemes and worked solutions. Instant PDF download.
        </p>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 6 }}>
          <a href={link(bundle)} target="_blank" rel="noopener"
            className="btn"
            style={{ background: 'var(--cream)', color: 'var(--green)', padding: '10px 18px', fontSize: 13.5, fontWeight: 700 }}>
            Bundle — £9.99 →
          </a>
          <a href={link(paper2)} target="_blank" rel="noopener"
            style={{ fontFamily: 'var(--mono)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-soft)', textDecoration: 'underline' }}>
            Paper 2 — £5.99
          </a>
          <a href={link(paper3)} target="_blank" rel="noopener"
            style={{ fontFamily: 'var(--mono)', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-soft)', textDecoration: 'underline' }}>
            Paper 3 — £5.99
          </a>
          <Link href="/practice-papers/edexcel-gcse-maths-higher-2026"
            style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(247,243,234,0.7)', textDecoration: 'underline' }}>
            See details →
          </Link>
        </div>
      </aside>
    )
  }

  if (variant === 'footer') {
    return (
      <section style={{ margin: '40px 0', background: 'var(--paper)', border: '2px solid var(--green)', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
          New · Edexcel Higher 2026
        </p>
        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
          Ten practice papers between you and your exam.
        </h3>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 18, maxWidth: 520, margin: '0 auto 18px' }}>
          Five Paper 2, five Paper 3 — full mark schemes and worked solutions. Instant PDF download after checkout.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={link(bundle)} target="_blank" rel="noopener" className="btn btn-primary" style={{ padding: '11px 22px', fontSize: 14 }}>Bundle — £9.99 →</a>
          <a href={link(paper2)} target="_blank" rel="noopener" className="btn btn-outline" style={{ padding: '11px 22px', fontSize: 14 }}>Paper 2 — £5.99</a>
          <a href={link(paper3)} target="_blank" rel="noopener" className="btn btn-outline" style={{ padding: '11px 22px', fontSize: 14 }}>Paper 3 — £5.99</a>
        </div>
      </section>
    )
  }

  // default: 3-card panel
  return (
    <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', padding: 'clamp(36px, 5vw, 56px) 20px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 12px', borderRadius: 999, display: 'inline-block', marginBottom: 12 }}>
            New · Edexcel Higher 2026
          </span>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Practice Papers — calibrated for the 2026 exam.
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 540, margin: '0 auto' }}>
            Ten Paper-2 and Paper-3 style practice papers, written by our team from the published Edexcel 1MA1 specification. Full mark schemes and worked solutions. Instant PDF download.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {[paper2, paper3, bundle].map(p => (
            <article key={p.id} style={{ background: 'var(--cream)', border: p.highlight ? '2px solid var(--green)' : '1px solid var(--rule)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
              {p.highlight && (
                <span style={{ position: 'absolute', top: 8, right: 8, fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream)', background: 'var(--green)', padding: '3px 8px', borderRadius: 999 }}>
                  Most popular
                </span>
              )}
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: p.highlight ? 'var(--green)' : 'var(--gold)' }}>
                {p.badge}
              </span>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{p.title}</h4>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1 }}>{p.price}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>one-off</span>
              </div>
              <a href={link(p)} target="_blank" rel="noopener" className="btn" style={{ marginTop: 6, background: p.highlight ? 'var(--green)' : 'var(--ink)', color: 'var(--cream)', justifyContent: 'center', padding: '9px 14px', fontSize: 13 }}>
                Buy — {p.price} →
              </a>
            </article>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 18, fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>
          <Link href="/practice-papers/edexcel-gcse-maths-higher-2026" style={{ color: 'var(--green)' }}>See full details &amp; FAQ →</Link>
        </p>
      </div>
    </section>
  )
}
