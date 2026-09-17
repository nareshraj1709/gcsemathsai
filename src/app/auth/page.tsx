'use client'
import { Suspense, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { clearProfileCache, loadProfile } from '@/lib/profile'
import { authError, withAuthTimeout } from '@/lib/auth-journey'

type Mode = 'login' | 'signup' | 'forgot'
function AuthForm() {
  const router = useRouter()
  const params = useSearchParams()
  const [mode, setMode] = useState<Mode>(params.get('mode') === 'signup' ? 'signup' : params.get('mode') === 'forgot' ? 'forgot' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const busy = useRef(false)
  const switchMode = (next: Mode) => { setMode(next); setMessage(''); setError(false); setPassword('') }
  async function enterAccount() {
    clearProfileCache()
    const profile = await withAuthTimeout(loadProfile())
    router.replace(profile?.year && profile?.board ? '/dashboard' : '/onboarding')
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busy.current) return
    busy.current = true; setLoading(true); setMessage(''); setError(false)
    try {
      if (mode === 'login') {
        const result = await withAuthTimeout(supabase.auth.signInWithPassword({ email: email.trim(), password }))
        if (result.error) throw result.error
        await enterAccount()
      } else if (mode === 'signup') {
        const result = await withAuthTimeout(supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } }))
        if (result.error) throw result.error
        if (result.data.session) await enterAccount()
        else if (result.data.user?.identities?.length === 0) {
          setMode('login'); setMessage('You may already have an account. Log in below or choose Reset password.')
        } else {
          setPassword(''); setMessage('Check your email for a confirmation link, then open it to finish setting up your account. Check your spam folder too.')
        }
      } else {
        const result = await withAuthTimeout(supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth/callback?flow=recovery` }))
        if (result.error) throw result.error
        setMessage('If there is an account for this email, you will receive a password reset link. Check your inbox and spam folder.')
      }
    } catch (cause) { setError(true); setMessage(authError(cause)) }
    finally { busy.current = false; setLoading(false) }
  }
  return <main className="auth-shell"><section className="auth-card" aria-labelledby="auth-title">
    <span className="studio-eyebrow">YOUR NEXT STEP IN MATHS</span>
    <h1 id="auth-title">{mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Make progress, your way.' : 'Reset your password'}</h1>
    <p>{mode === 'signup' ? 'Create your free account and set up your year group, exam board and learning goals.' : mode === 'forgot' ? 'We will email you a link to choose a new password.' : 'Log in to continue your learning.'}</p>
    {message && <div className="auth-notice" data-error={error} role={error ? 'alert' : 'status'}>{message}</div>}
    <form onSubmit={submit} aria-busy={loading}>
      <label htmlFor="auth-email">Email address</label><input id="auth-email" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} disabled={loading}/>
      {mode !== 'forgot' && <><label htmlFor="auth-password">Password</label><div className="auth-password"><input id="auth-password" name="password" type={visible ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required minLength={mode === 'signup' ? 6 : undefined} value={password} onChange={e => setPassword(e.target.value)} disabled={loading}/><button type="button" className="auth-text-button" onClick={() => setVisible(v => !v)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? 'Hide' : 'Show'}</button></div>{mode === 'signup' && <p>Use at least 6 characters. A longer, unique password is best.</p>}</>}
      <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Please wait…' : mode === 'login' ? 'Log in' : mode === 'signup' ? 'Create free account' : 'Send reset link'}</button>
    </form>
    {mode === 'login' && <button className="auth-text-button" disabled={loading} onClick={() => switchMode('forgot')}>Reset password</button>}
    <p>{mode === 'login' ? 'New here? ' : 'Already have an account? '}<button className="auth-text-button" disabled={loading} onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>{mode === 'login' ? 'Create a free account' : 'Log in'}</button></p>
    <div className="auth-guest"><p>You can start learning right now, without an account.</p><Link href="/diagnostic">Try a free quiz →</Link><p><Link href="/topics">Browse topic guides</Link></p></div>
  </section></main>
}
export default function Auth() { return <Suspense fallback={<main className="auth-shell"><p>Loading account options…</p></main>}><AuthForm/></Suspense> }
