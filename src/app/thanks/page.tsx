'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getSkuById } from '@/lib/predicted-papers'
import Footer from '@/components/Footer'

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

function ThanksInner() {
  const params = useSearchParams()
  const router = useRouter()
  const skuId = params.get('sku') || ''
  const sku = skuId ? getSkuById(skuId) : undefined

  const [step, setStep] = useState<'checking' | 'signed-in' | 'signed-out'>('checking')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [mode, setMode] = useState<'signup' | 'signin'>('signup')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        // Already signed in — bounce to /my-papers after a second.
        setStep('signed-in')
        setTimeout(() => router.push('/my-papers'), 1200)
      } else {
        setStep('signed-out')
      }
    })
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/my-papers` },
        })
        if (error) throw error
        setSignupSuccess(true)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push('/my-papers')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      {/* Success banner */}
      <section style={{ background: 'var(--green)', color: 'var(--cream)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: 'var(--cream)', color: 'var(--green)', fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700, fontStyle: 'italic', marginBottom: 18 }}>✓</span>
        <p style={{ ...monoLabel, color: 'var(--gold-soft)', marginBottom: 10 }}>Payment received · Thank you</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto', maxWidth: 760 }}>
          {sku ? <>You&rsquo;re in. <em style={{ color: 'var(--gold-soft)' }}>{sku.title}</em> is yours.</> : <>You&rsquo;re in. <em style={{ color: 'var(--gold-soft)' }}>One more step</em> to get your papers.</>}
        </h1>
        <p style={{ color: 'var(--green-soft)', fontSize: 'clamp(14px, 1.7vw, 16px)', lineHeight: 1.6, maxWidth: 580, margin: '14px auto 0' }}>
          Your purchase is confirmed. To download your PDFs, create your free account using the same email you used at Stripe checkout.
        </p>
      </section>

      {/* Step section */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        {step === 'checking' && (
          <p style={{ ...monoLabel, color: 'var(--ink-3)', textAlign: 'center' }}>Checking your session…</p>
        )}

        {step === 'signed-in' && (
          <div style={{ background: 'var(--paper)', border: '2px solid var(--green)', borderRadius: 14, padding: 28, textAlign: 'center' }}>
            <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 8 }}>Signed in</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
              Taking you to your downloads…
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, marginBottom: 18 }}>
              We&rsquo;re sending you to your <code style={{ background: 'var(--cream-2)', padding: '1px 6px', borderRadius: 4, fontFamily: 'var(--mono)', fontSize: 12 }}>My Papers</code> page now.
            </p>
            <Link href="/my-papers" className="btn btn-primary">Go to My Papers →</Link>
          </div>
        )}

        {step === 'signed-out' && !signupSuccess && (
          <>
            {/* Three steps timeline */}
            <ol style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { num: '1', title: 'Use the same email', body: 'Sign up below with the exact email you used at Stripe checkout. The download access is tied to that address.' },
                { num: '2', title: 'Verify your email', body: 'We send a quick confirmation link. Click it to activate your account.' },
                { num: '3', title: 'Download your papers', body: 'You\u2019ll land on My Papers — every PDF in your pack is unlocked and ready.' },
              ].map(s => (
                <li key={s.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: 16 }}>
                  <span style={{ display: 'inline-grid', placeItems: 'center', width: 30, height: 30, borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 600, fontSize: 15, flexShrink: 0 }}>{s.num}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Sign up / Sign in form */}
            <div style={{ background: 'var(--paper)', border: '2px solid var(--green)', borderRadius: 14, padding: 'clamp(20px, 3vw, 28px)' }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 18, background: 'var(--cream-2)', borderRadius: 999, padding: 4 }}>
                <button type="button" onClick={() => setMode('signup')}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 999, border: 'none', background: mode === 'signup' ? 'var(--ink)' : 'transparent', color: mode === 'signup' ? 'var(--cream)' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Create account
                </button>
                <button type="button" onClick={() => setMode('signin')}
                  style={{ flex: 1, padding: '8px 12px', borderRadius: 999, border: 'none', background: mode === 'signin' ? 'var(--ink)' : 'transparent', color: mode === 'signin' ? 'var(--cream)' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Already have one?
                </button>
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ ...monoLabel, color: 'var(--ink-3)' }}>Email used at Stripe</span>
                  <input
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={{ padding: '12px 14px', border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span style={{ ...monoLabel, color: 'var(--ink-3)' }}>{mode === 'signup' ? 'Choose a password' : 'Password'}</span>
                  <input
                    type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                    style={{ padding: '12px 14px', border: '1px solid var(--rule)', borderRadius: 8, background: 'var(--cream)', fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--ink)' }}
                  />
                </label>
                {error && (
                  <p style={{ background: 'var(--burgundy-soft)', color: 'var(--burgundy)', padding: '10px 14px', borderRadius: 8, fontSize: 13, lineHeight: 1.5 }}>{error}</p>
                )}
                <button type="submit" disabled={busy} className="btn btn-primary" style={{ justifyContent: 'center', padding: '12px 22px', fontSize: 14 }}>
                  {busy ? 'Please wait…' : mode === 'signup' ? 'Create account & unlock papers →' : 'Sign in & get my papers →'}
                </button>
              </form>
              <p style={{ ...monoLabel, color: 'var(--ink-3)', textAlign: 'center', marginTop: 14 }}>
                Use the email you used at Stripe — that&rsquo;s what unlocks the downloads
              </p>
            </div>
          </>
        )}

        {step === 'signed-out' && signupSuccess && (
          <div style={{ background: 'var(--paper)', border: '2px solid var(--green)', borderRadius: 14, padding: 28, textAlign: 'center' }}>
            <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 8 }}>Check your inbox</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
              We&rsquo;ve sent a confirmation link to <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>{email}</em>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 18 }}>
              Click the link in that email and you&rsquo;ll land straight on your My Papers page. Don&rsquo;t see it? Check spam, or wait a minute — Stripe and email both take a moment.
            </p>
            <Link href="/auth" style={{ ...monoLabel, color: 'var(--green)', textDecoration: 'underline' }}>Resend confirmation →</Link>
          </div>
        )}

        {/* Support note */}
        <div style={{ marginTop: 32, padding: 20, background: 'var(--cream-2)', borderRadius: 10, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, textAlign: 'center' }}>
          Stuck? Email{' '}
          <a href="mailto:support@gcsemathsai.co.uk" style={{ color: 'var(--green)', textDecoration: 'underline' }}>support@gcsemathsai.co.uk</a>{' '}
          with the email you used at Stripe and we&rsquo;ll sort it within a few hours.
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
