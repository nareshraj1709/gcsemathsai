'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { PREDICTED_PAPER_FAMILIES, getSkuById, type PredictedPaperSku } from '@/lib/predicted-papers'
import Footer from '@/components/Footer'

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

type Purchase = { sku_id: string | null; paid_at: string; amount_total: number | null; currency: string | null }

export default function MyPapersPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [downloading, setDownloading] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user?.email) {
        router.push('/auth?next=/my-papers')
        return
      }
      const userEmail = session.user.email.toLowerCase().trim()
      setEmail(userEmail)
      setAccessToken(session.access_token)
      const { data, error } = await supabase
        .from('purchases')
        .select('sku_id, paid_at, amount_total, currency')
        .eq('customer_email', userEmail)
        .order('paid_at', { ascending: false })
      if (!error && data) setPurchases(data as Purchase[])
      setLoading(false)
    })
  }, [router])

  /** Returns the SKUs (as ids) whose files this user can download. */
  const entitled = new Set<string>()
  for (const p of purchases) {
    if (p.sku_id === 'paper2') entitled.add('paper2')
    if (p.sku_id === 'paper3') entitled.add('paper3')
    if (p.sku_id === 'bundle') { entitled.add('paper2'); entitled.add('paper3'); entitled.add('bundle') }
  }

  async function download(skuId: string, filename: string) {
    if (!accessToken) return
    setDownloading(filename)
    try {
      const res = await fetch(`/api/downloads/${skuId}/${encodeURIComponent(filename)}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        alert(j.error || 'Download failed. Please contact support@gcsemathsai.co.uk')
        return
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename
      document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(url)
    } catch {
      alert('Download failed. Please contact support@gcsemathsai.co.uk')
    } finally {
      setDownloading(null)
    }
  }

  const SKUS_TO_SHOW: PredictedPaperSku[] = []
  for (const f of PREDICTED_PAPER_FAMILIES) {
    for (const s of f.skus) {
      // Hide the bundle as a separate panel — its files are the union of paper2 + paper3.
      if (s.id === 'bundle') continue
      SKUS_TO_SHOW.push(s)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(28px, 4vw, 48px) 20px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginBottom: 14 }}>
            My Papers
          </span>
          <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, margin: '0 0 8px' }}>
            Your predicted papers
          </h1>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, lineHeight: 1.65, margin: 0 }}>
            Signed in as <strong style={{ color: 'var(--ink-2)' }}>{email || '…'}</strong>. Downloads here only work for the email you used to pay through Stripe.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 4vw, 48px) 20px' }}>
        {loading ? (
          <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Loading your purchases…</p>
        ) : purchases.length === 0 ? (
          <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: 28 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>No purchases yet</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px' }}>
              We can&rsquo;t find any purchases for <strong>{email}</strong>.
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 16 }}>
              If you bought a pack, check the email you used at Stripe checkout — your download access is tied to that address. Sign in here with the same email and your papers will appear.
            </p>
            <Link href="/predicted-papers/edexcel-gcse-maths-higher-2026" className="btn btn-primary">See predicted packs →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Receipt summary */}
            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: 22 }}>
              <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 12 }}>Receipts</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {purchases.map((p, i) => {
                  const sku = p.sku_id ? getSkuById(p.sku_id) : null
                  return (
                    <li key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, color: 'var(--ink-2)' }}>
                      <span style={{ fontWeight: 600 }}>{sku?.title ?? p.sku_id ?? 'Purchase'}</span>
                      <span style={{ color: 'var(--ink-3)' }}>
                        {p.amount_total != null && p.currency ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: p.currency.toUpperCase() }).format(p.amount_total / 100) : ''}
                        {' · '}
                        {new Date(p.paid_at).toLocaleDateString()}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Downloads grouped by SKU */}
            {SKUS_TO_SHOW.map(sku => {
              const hasAccess = entitled.has(sku.id)
              return (
                <div key={sku.id} style={{ background: 'var(--paper)', border: hasAccess ? '2px solid var(--green)' : '1px solid var(--rule)', borderRadius: 14, padding: 22, opacity: hasAccess ? 1 : 0.6 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                    <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>
                      {sku.title}
                    </h2>
                    <span style={{ ...monoLabel, color: hasAccess ? 'var(--green)' : 'var(--ink-3)', background: hasAccess ? 'var(--green-soft)' : 'var(--cream-2)', padding: '4px 10px', borderRadius: 999 }}>
                      {hasAccess ? 'Unlocked' : 'Not purchased'}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: 14 }}>{sku.subtitle}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                    {sku.files.map(f => (
                      <button
                        key={f.filename}
                        type="button"
                        onClick={() => hasAccess && download(sku.id, f.filename)}
                        disabled={!hasAccess || downloading === f.filename}
                        style={{
                          fontFamily: 'inherit', cursor: hasAccess ? 'pointer' : 'not-allowed',
                          background: hasAccess ? 'var(--cream)' : 'var(--cream-2)',
                          border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 14px',
                          textAlign: 'left', color: 'var(--ink-2)',
                        }}
                      >
                        <div style={{ ...monoLabel, color: hasAccess ? 'var(--green)' : 'var(--ink-3)', fontSize: 10 }}>{f.label}</div>
                        <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>
                          {downloading === f.filename ? 'Downloading…' : hasAccess ? 'Download PDF →' : 'Locked'}
                        </div>
                      </button>
                    ))}
                  </div>
                  {!hasAccess && (
                    <div style={{ marginTop: 14 }}>
                      <Link href="/predicted-papers/edexcel-gcse-maths-higher-2026" className="btn btn-outline" style={{ padding: '9px 18px', fontSize: 13 }}>
                        Buy this pack — {sku.price} →
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
