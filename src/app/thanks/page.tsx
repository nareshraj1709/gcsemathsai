'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

type Purchase = {
  sku_id: 'paper2' | 'paper3' | 'bundle'
  title: string
  email: string | null
  amount_total: number | null
  currency: string
  files: Array<{ filename: string; label: string }>
}

function ThanksInner() {
  const params = useSearchParams()
  const sessionId = params.get('session_id') || ''

  const [state, setState] = useState<'loading' | 'ready' | 'pending' | 'error'>('loading')
  const [purchase, setPurchase] = useState<Purchase | null>(null)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState<string | null>(null)
  const [optionalEmail, setOptionalEmail] = useState('')
  const [optionalPassword, setOptionalPassword] = useState('')
  const [accountBusy, setAccountBusy] = useState(false)
  const [accountDone, setAccountDone] = useState(false)
  const [accountError, setAccountError] = useState('')

  // On first render, ask the server to verify the Stripe session and tell us
  // which SKU was bought. Retries briefly if Stripe is still propagating.
  useEffect(() => {
    if (!sessionId) {
      setState('pending')
      return
    }
    let cancelled = false
    let attempts = 0
    const run = async () => {
      while (!cancelled && attempts < 4) {
        attempts++
        try {
          const r = await fetch(`/api/purchase?session_id=${encodeURIComponent(sessionId)}`)
          if (r.ok) {
            const data = await r.json() as Purchase
            if (!cancelled) {
              setPurchase(data)
              setOptionalEmail(data.email || '')
              setState('ready')
            }
            return
          }
          if (r.status === 402) {
            await new Promise(res => setTimeout(res, 1500))
            continue
          }
          const j = await r.json().catch(() => ({}))
          throw new Error(j.error || `Status ${r.status}`)
        } catch (e) {
          if (attempts < 4) { await new Promise(res => setTimeout(res, 1500)); continue }
          if (!cancelled) {
            setError(e instanceof Error ? e.message : 'Unknown error')
            setState('error')
          }
        }
      }
    }
    run()
    return () => { cancelled = true }
  }, [sessionId])

  async function downloadFile(filename: string) {
    if (!purchase) return
    setDownloading(filename)
    try {
      const r = await fetch(`/api/downloads/${purchase.sku_id}/${encodeURIComponent(filename)}?session_id=${encodeURIComponent(sessionId)}`)
      if (!r.ok) {
        const j = await r.json().catch(() => ({}))
        alert(j.error || 'Download failed. Please email support@gcsemathsai.co.uk')
        return
      }
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = filename
      document.body.appendChild(a); a.click(); a.remove()
      URL.revokeObjectURL(url)
    } finally {
      setDownloading(null)
    }
  }

  async function createOptionalAccount(e: React.FormEvent) {
    e.preventDefault()
    setAccountBusy(true)
    setAccountError('')
    try {
      const { error } = await supabase.auth.signUp({
        email: optionalEmail,
        password: optionalPassword,
        options: { emailRedirectTo: `${window.location.origin}/my-papers` },
      })
      if (error) throw error
      setAccountDone(true)
    } catch (err) {
      setAccountError(err instanceof Error ? err.message : 'Could not create account')
    } finally {
      setAccountBusy(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Success banner */}
      <section style={{ background: 'var(--green)', color: 'var(--cream)', padding: 'clamp(36px, 5vw, 56px) 20px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: 'var(--cream)', color: 'var(--green)', fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700, fontStyle: 'italic', marginBottom: 16 }}>✓</span>
        <p style={{ ...monoLabel, color: 'var(--gold-soft)', marginBottom: 8 }}>Payment confirmed</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto', maxWidth: 760 }}>
          {purchase ? <>You&rsquo;re in. <em style={{ color: 'var(--gold-soft)' }}>{purchase.title}</em> is ready.</> : <>Thank you — <em style={{ color: 'var(--gold-soft)' }}>processing your order</em>.</>}
        </h1>
        {purchase?.email && (
          <p style={{ color: 'var(--green-soft)', fontSize: 14, marginTop: 12 }}>
            Receipt sent to <strong style={{ color: 'var(--cream)' }}>{purchase.email}</strong>
          </p>
        )}
      </section>

      {/* Body */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px, 5vw, 48px) 20px' }}>
        {state === 'loading' && (
          <p style={{ ...monoLabel, color: 'var(--ink-3)', textAlign: 'center' }}>Confirming your purchase…</p>
        )}

        {state === 'pending' && (
          <div style={{ background: 'var(--gold-soft)', border: '1px solid var(--gold)', borderRadius: 12, padding: 24 }}>
            <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Order pending</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 600, color: 'var(--ink)', margin: '0 0 10px' }}>
              We didn&rsquo;t receive your Stripe session id.
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Your payment may have gone through, but we need the session id to unlock the downloads. Email{' '}
              <a href="mailto:support@gcsemathsai.co.uk" style={{ color: 'var(--green)', textDecoration: 'underline' }}>support@gcsemathsai.co.uk</a>{' '}
              with the email you used at checkout and we&rsquo;ll send your PDFs within a few hours.
            </p>
          </div>
        )}

        {state === 'error' && (
          <div style={{ background: 'var(--burgundy-soft)', border: '1px solid var(--burgundy)', borderRadius: 12, padding: 24 }}>
            <p style={{ ...monoLabel, color: 'var(--burgundy)', marginBottom: 8 }}>Could not verify your purchase</p>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 12 }}>
              The server returned: <code style={{ background: 'var(--cream)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--mono)' }}>{error}</code>
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65 }}>
              Email <a href="mailto:support@gcsemathsai.co.uk" style={{ color: 'var(--green)', textDecoration: 'underline' }}>support@gcsemathsai.co.uk</a> with the email you used at Stripe and we&rsquo;ll send your PDFs manually.
            </p>
          </div>
        )}

        {state === 'ready' && purchase && (
          <>
            {/* Direct downloads */}
            <div style={{ background: 'var(--paper)', border: '2px solid var(--green)', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)' }}>
              <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 8 }}>Your downloads</p>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.01em' }}>
                Click each paper to download
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                {purchase.files.map(f => (
                  <button
                    key={f.filename}
                    type="button"
                    onClick={() => downloadFile(f.filename)}
                    disabled={downloading === f.filename}
                    style={{
                      cursor: 'pointer', background: 'var(--cream)', border: '1px solid var(--rule)',
                      borderRadius: 10, padding: '14px 16px', textAlign: 'left', fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ ...monoLabel, color: 'var(--green)', fontSize: 10 }}>{f.label}</div>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginTop: 4 }}>
                      {downloading === f.filename ? 'Downloading…' : 'Download PDF →'}
                    </div>
                  </button>
                ))}
              </div>
              <p style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 10, marginTop: 14 }}>
                Tip · save the PDFs to a folder you&rsquo;ll find later. The download links on this page work for 24 hours.
              </p>
            </div>

            {/* Optional account */}
            <div style={{ marginTop: 24, background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)' }}>
              <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 6 }}>Optional · access these papers any time</p>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                Create a free account?
              </h3>
              <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 14 }}>
                Lose the link? Want them on a different device? Save your purchase to an account and the papers stay in your <code style={{ background: 'var(--cream-2)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12 }}>My Papers</code> page forever.
              </p>
              {accountDone ? (
                <p style={{ background: 'var(--green-soft)', color: 'var(--green)', padding: '10px 14px', borderRadius: 8, fontSize: 13.5, lineHeight: 1.55 }}>
                  ✓ Check your inbox for a confirmation link. After that, your papers will appear at <Link href="/my-papers" style={{ color: 'var(--green)', textDecoration: 'underline' }}>/my-papers</Link>.
                </p>
              ) : (
                <form onSubmit={createOptionalAccount} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'end' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 9.5 }}>Email used at Stripe</span>
                    <input type="email" required value={optionalEmail} onChange={e => setOptionalEmail(e.target.value)}
                      style={{ padding: '10px 12px', border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)' }} />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ ...monoLabel, color: 'var(--ink-3)', fontSize: 9.5 }}>Password</span>
                    <input type="password" required minLength={6} value={optionalPassword} onChange={e => setOptionalPassword(e.target.value)} placeholder="6+ chars"
                      style={{ padding: '10px 12px', border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)' }} />
                  </label>
                  <button type="submit" disabled={accountBusy} className="btn btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>
                    {accountBusy ? '…' : 'Save →'}
                  </button>
                </form>
              )}
              {accountError && <p style={{ marginTop: 10, color: 'var(--burgundy)', fontSize: 13 }}>{accountError}</p>}
            </div>
          </>
        )}

        {/* Support */}
        <div style={{ marginTop: 32, padding: 18, background: 'var(--cream-2)', borderRadius: 10, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, textAlign: 'center' }}>
          Trouble downloading? Email{' '}
          <a href="mailto:support@gcsemathsai.co.uk" style={{ color: 'var(--green)', textDecoration: 'underline' }}>support@gcsemathsai.co.uk</a>{' '}
          with the email you used at Stripe and we&rsquo;ll fix it within a few hours.
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function ThanksPage() {
  return (
    <Suspense fallback={null}>
      <ThanksInner />
    </Suspense>
  )
}
