'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { clearProfileCache, loadProfile } from '@/lib/profile'
import { authError, callbackIntent, withAuthTimeout } from '@/lib/auth-journey'

export default function AuthCallback() {
  const [mode, setMode] = useState<'loading' | 'reset' | 'error'>('loading')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const submitting = useRef(false)
  useEffect(() => {
    let active = true
    let navigating = false
    let deferred: ReturnType<typeof setTimeout> | undefined
    const intent = callbackIntent(window.location.search, window.location.hash)
    let recovery = intent.recovery
    const fail = (text: string) => { if (active) { setMessage(text); setMode('error') } }
    if (intent.failed) { fail('This email link is invalid or has expired. Request a new password reset link, or return to login.'); return }
    const timeout = setTimeout(() => fail('We could not finish checking this link. It may have expired, or the account service may be unavailable.'), 15000)
    async function resolveSession() {
      try {
        const { data, error } = await withAuthTimeout(supabase.auth.getSession())
        if (!active) return
        if (error) throw error
        if (!data.session) { fail('This link has expired or could not be verified. Return to login to try again.'); return }
        if (recovery) { clearTimeout(timeout); setMode('reset'); return }
        if (navigating) return
        navigating = true
        clearProfileCache()
        const profile = await withAuthTimeout(loadProfile())
        if (active) window.location.replace(profile?.year && profile?.board ? '/dashboard' : '/onboarding')
      } catch (cause) { fail(authError(cause)) }
    }
    // Never await another Supabase call inside its auth event callback: the auth lock is still held.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') recovery = true
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        clearTimeout(deferred)
        deferred = setTimeout(() => { void resolveSession() }, 0)
      }
    })
    void resolveSession()
    return () => { active = false; clearTimeout(timeout); clearTimeout(deferred); subscription.unsubscribe() }
  }, [])
  async function reset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    if (password !== confirmation) { setMessage('Your passwords do not match.'); return }
    submitting.current = true; setBusy(true); setMessage('')
    try {
      const { error } = await withAuthTimeout(supabase.auth.updateUser({ password }))
      if (error) throw error
      clearProfileCache()
      const profile = await withAuthTimeout(loadProfile())
      window.location.replace(profile?.year && profile?.board ? '/dashboard' : '/onboarding')
    } catch (cause) { setMessage(authError(cause)) }
    finally { submitting.current = false; setBusy(false) }
  }
  return <main className="auth-shell"><section className="auth-card"><span className="studio-eyebrow">YOUR GCSE MATHS ACCOUNT</span><h1>{mode === 'reset' ? 'Choose a new password' : mode === 'error' ? 'Let’s get you back on track' : 'Checking your email link…'}</h1>
    {message && <div className="auth-notice" data-error="true" role="alert">{message}</div>}
    {mode === 'loading' && <p role="status">You will continue automatically when your account is ready.</p>}
    {mode === 'reset' && <form onSubmit={reset} aria-busy={busy}><label htmlFor="new-password">New password (at least 6 characters)</label><input id="new-password" type="password" autoComplete="new-password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)}/><label htmlFor="confirm-password">Confirm new password</label><input id="confirm-password" type="password" autoComplete="new-password" minLength={6} required value={confirmation} onChange={e => setConfirmation(e.target.value)}/><button className="btn btn-primary" disabled={busy}>{busy ? 'Updating…' : 'Save password and continue'}</button></form>}
    {mode === 'error' && <Link href="/auth?mode=forgot" className="btn btn-primary">Request a new reset link</Link>}
    <div className="auth-guest"><Link href="/auth">Return to login</Link><p><Link href="/diagnostic">Practise without an account →</Link></p></div>
  </section></main>
}
