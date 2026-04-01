'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { loadProfile } from '@/lib/profile'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  mid: "#6B7280",
  border: "#E5E1FF",
  mist: "#F8F7FF",
  green: "#059669",
  red: "#DC2626",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

export default function AuthCallback() {
  const [mode, setMode] = useState<'loading' | 'reset'>('loading')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'error' | 'success'>('error')

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User clicked a password reset link — show reset form
        setMode('reset')
      } else if (event === 'SIGNED_IN') {
        // Normal sign-in or email confirmation
        const profile = await loadProfile()
        window.location.href = profile?.year && profile?.board ? '/dashboard' : '/onboarding'
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters.')
      setMessageType('error')
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.')
      setMessageType('error')
      return
    }

    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage(error.message)
      setMessageType('error')
    } else {
      setMessage('Password updated! Redirecting to your dashboard...')
      setMessageType('success')
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    }
    setLoading(false)
  }

  // Password reset form
  if (mode === 'reset') {
    return (
      <div style={{
        minHeight: "100vh", background: C.mist,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, fontFamily: font.body,
      }}>
        <div style={{
          background: "#fff", borderRadius: 24, border: `1px solid ${C.border}`,
          padding: "40px 36px", width: "100%", maxWidth: 420,
          boxShadow: "0 4px 32px rgba(109,40,217,0.08)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px",
              background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: `0 4px 16px ${C.purple}30`,
            }}>🔒</div>
            <h1 style={{ fontFamily: font.display, fontSize: 24, color: C.ink, margin: "0 0 4px" }}>
              Set a new password
            </h1>
            <p style={{ color: C.mid, fontSize: 14, margin: 0 }}>
              Enter your new password below.
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontSize: 15,
                fontFamily: font.body, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.purple}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />
            <p style={{ fontSize: 11, color: C.mid, marginTop: 4, marginBottom: 0 }}>
              Must be at least 6 characters
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              onKeyDown={e => e.key === 'Enter' && handleResetPassword()}
              style={{
                width: "100%", padding: "12px 14px", borderRadius: 10,
                border: `1.5px solid ${C.border}`, fontSize: 15,
                fontFamily: font.body, outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.purple}
              onBlur={e => e.currentTarget.style.borderColor = C.border}
            />
          </div>

          {message && (
            <p style={{
              fontSize: 13, textAlign: "center",
              color: messageType === 'error' ? C.red : C.green,
              background: messageType === 'error' ? '#FFF5F5' : '#F0FDF4',
              borderRadius: 8, padding: "10px 14px", marginBottom: 16,
            }}>{message}</p>
          )}

          <button
            onClick={handleResetPassword}
            disabled={loading}
            style={{
              width: "100%", padding: "13px", borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              color: "#fff", fontWeight: 700, fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: font.body, marginTop: 8,
              boxShadow: `0 4px 16px ${C.purple}30`,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Updating...' : 'Update password'}
          </button>
        </div>
      </div>
    )
  }

  // Loading state (confirming account or processing)
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-purple-700 font-semibold text-lg">Confirming your account...</p>
        <p className="text-gray-400 text-sm mt-2">You&apos;ll be redirected automatically.</p>
      </div>
    </main>
  )
}
