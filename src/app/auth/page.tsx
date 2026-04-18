'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { loadProfile } from '@/lib/profile'

const C = {
  ink: "var(--ink)",
  green: "var(--green)",
  greenMid: "var(--green-mid)",
  greenSoft: "var(--green-soft)",
  mid: "var(--ink-3)",
  border: "var(--rule)",
  cream: "var(--cream)",
  paper: "var(--paper)",
  success: "#059669",
  red: "#DC2626",
}

const font = {
  display: "var(--serif)",
  body: "var(--sans)",
}

type Mode = 'login' | 'signup' | 'forgot'

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<Mode>('login')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'info' | 'error' | 'success'>('info')

  const showMessage = (text: string, type: 'info' | 'error' | 'success' = 'info') => {
    setMessage(text)
    setMessageType(type)
  }

  const friendlyError = (msg: string): string => {
    if (msg.includes('Invalid login credentials')) return 'Incorrect email or password. Please try again.'
    if (msg.includes('Email not confirmed')) return 'Please check your email and confirm your account first.'
    if (msg.includes('User already registered')) return 'An account with this email already exists. Try logging in instead.'
    if (msg.includes('Password should be at least')) return 'Password must be at least 6 characters long.'
    if (msg.includes('rate limit') || msg.includes('too many')) return 'Too many attempts. Please wait a moment and try again.'
    if (msg.includes('network') || msg.includes('fetch')) return 'Connection error. Please check your internet and try again.'
    return msg
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showMessage('Please enter your email and password.', 'error')
      return
    }
    setLoading(true)
    showMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (error) {
      showMessage(friendlyError(error.message), 'error')
    } else {
      const profile = await loadProfile()
      router.push(profile?.year && profile?.board ? '/dashboard' : '/onboarding')
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    if (!email.trim()) {
      showMessage('Please enter your email address.', 'error')
      return
    }
    if (password.length < 6) {
      showMessage('Password must be at least 6 characters long.', 'error')
      return
    }
    setLoading(true)
    showMessage('')
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      showMessage(friendlyError(error.message), 'error')
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      // Supabase returns a user with empty identities when the email is already registered
      showMessage('An account with this email already exists. Please log in instead.', 'error')
      setMode('login')
    } else {
      showMessage('Check your email to confirm your account! You may need to check your spam folder.', 'success')
    }
    setLoading(false)
  }

  const handleForgotPassword = async () => {
    if (!email.trim() || !email.includes('@')) {
      showMessage('Please enter a valid email address.', 'error')
      return
    }
    setLoading(true)
    showMessage('')
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/callback`,
    })
    if (error) {
      showMessage(friendlyError(error.message), 'error')
    } else {
      showMessage('Password reset link sent! Check your email (and spam folder).', 'success')
    }
    setLoading(false)
  }

  const handleSubmit = () => {
    if (mode === 'login') handleLogin()
    else if (mode === 'signup') handleSignup()
    else handleForgotPassword()
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    setMessage('')
    setPassword('')
  }

  const heading = mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password'
  const subtext = mode === 'login'
    ? 'Log in to your GCSEMathsAI account'
    : mode === 'signup'
    ? 'Free for every student — no card required'
    : 'Enter your email and we\'ll send a reset link'

  const buttonLabel = loading
    ? 'Please wait…'
    : mode === 'login'
    ? 'Log in'
    : mode === 'signup'
    ? 'Create account'
    : 'Send reset link'

  const msgBg = messageType === 'error' ? '#FFF5F5' : messageType === 'success' ? '#F0FDF4' : 'var(--green-soft)'
  const msgColor = messageType === 'error' ? C.red : messageType === 'success' ? C.success : C.green

  return (
    <div style={{
      minHeight: "100vh", background: C.cream,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: font.body,
    }}>
      <div style={{
        background: C.paper, borderRadius: 24, border: `1px solid ${C.border}`,
        padding: "40px 36px", width: "100%", maxWidth: 420,
        boxShadow: "0 4px 32px rgba(15,79,58,0.08)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px",
            background: `linear-gradient(135deg, var(--green), var(--green-mid))`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#fff", boxShadow: "0 4px 16px rgba(15,79,58,0.3)",
          }}>✦</div>
          <h1 style={{ fontFamily: font.display, fontSize: 24, color: C.ink, margin: "0 0 4px" }}>
            {heading}
          </h1>
          <p style={{ color: C.mid, fontSize: 14, margin: 0 }}>
            {subtext}
          </p>
        </div>

        {/* Email field — always shown */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            onKeyDown={e => e.key === 'Enter' && (mode === 'forgot' ? handleSubmit() : undefined)}
            autoComplete="email"
            style={{
              width: "100%", padding: "12px 14px", borderRadius: 10,
              border: `1.5px solid ${C.border}`, fontSize: 15,
              fontFamily: font.body, outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--green)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--rule)'}
          />
        </div>

        {/* Password field — hidden on forgot password */}
        {mode !== 'forgot' && (
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontSize: 15,
                fontFamily: font.body, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.green}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />
            {mode === 'signup' && (
              <p style={{ fontSize: 11, color: C.mid, marginTop: 4, marginBottom: 0 }}>
                Must be at least 6 characters
              </p>
            )}
          </div>
        )}

        {/* Forgot password link — only on login */}
        {mode === 'login' && (
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <span
              onClick={() => switchMode('forgot')}
              style={{ fontSize: 13, color: C.green, fontWeight: 600, cursor: "pointer" }}
            >
              Forgot password?
            </span>
          </div>
        )}

        {/* Message */}
        {message && (
          <p style={{
            fontSize: 13, textAlign: "center", color: msgColor,
            background: msgBg, borderRadius: 8, padding: "10px 14px",
            marginBottom: 16, marginTop: 8,
          }}>{message}</p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "13px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, var(--green), var(--green-mid))`,
            color: "#fff", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: font.body, marginTop: 8,
            boxShadow: "0 4px 16px rgba(15,79,58,0.3)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {buttonLabel}
        </button>

        {/* Mode switching */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          {mode === 'login' && (
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              No account?{' '}
              <span onClick={() => switchMode('signup')} style={{ color: C.green, fontWeight: 600, cursor: "pointer" }}>
                Sign up free
              </span>
            </p>
          )}
          {mode === 'signup' && (
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              Already have an account?{' '}
              <span onClick={() => switchMode('login')} style={{ color: C.green, fontWeight: 600, cursor: "pointer" }}>
                Log in
              </span>
            </p>
          )}
          {mode === 'forgot' && (
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              Remember your password?{' '}
              <span onClick={() => switchMode('login')} style={{ color: C.green, fontWeight: 600, cursor: "pointer" }}>
                Back to login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
