'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  mid: "#6B7280",
  border: "#E5E1FF",
  mist: "#F8F7FF",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

export default function Auth() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async () => {
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/dashboard')
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) setMessage(error.message)
      else setMessage('Check your email to confirm your account!')
    }
    setLoading(false)
  }

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
          }}>✦</div>
          <h1 style={{ fontFamily: font.display, fontSize: 24, color: C.ink, margin: "0 0 4px" }}>
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p style={{ color: C.mid, fontSize: 14, margin: 0 }}>
            {isLogin ? "Log in to your GCSEMathsAI account" : "Start your free 7-day trial"}
          </p>
        </div>

        {[
          { label: "Email", value: email, set: setEmail, type: "email", placeholder: "your@email.com" },
          { label: "Password", value: password, set: setPassword, type: "password", placeholder: "••••••••" },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.ink, display: "block", marginBottom: 6 }}>
              {f.label}
            </label>
            <input
              type={f.type}
              value={f.value}
              onChange={e => f.set(e.target.value)}
              placeholder={f.placeholder}
              onKeyDown={e => e.key === 'Enter' && handleAuth()}
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
        ))}

        {message && (
          <p style={{
            fontSize: 13, textAlign: "center", color: C.purple,
            background: "#F5F3FF", borderRadius: 8, padding: "10px 14px",
            marginBottom: 16,
          }}>{message}</p>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            width: "100%", padding: "13px", borderRadius: 10, border: "none",
            background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
            color: "#fff", fontWeight: 700, fontSize: 16, cursor: loading ? "not-allowed" : "pointer",
            fontFamily: font.body, marginTop: 8,
            boxShadow: `0 4px 16px ${C.purple}30`,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Please wait…" : isLogin ? "Log in" : "Create account"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: C.mid, marginTop: 16 }}>
          {isLogin ? "No account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setMessage('') }}
            style={{ color: C.purple, fontWeight: 600, cursor: "pointer" }}
          >
            {isLogin ? "Sign up free" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  )
}
