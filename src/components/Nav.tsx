'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  purplePale: "#EDE9FE",
  mid: "#6B7280",
  border: "#E5E1FF",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const initial = (user?.email?.[0] ?? 'U').toUpperCase()

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
      transition: "all 0.3s",
      padding: "0 24px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        {/* Logo */}
        <button onClick={() => router.push('/')} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, boxShadow: `0 2px 8px ${C.purple}40`,
          }}>✦</div>
          <span style={{
            fontFamily: font.display, fontWeight: 700, fontSize: 20,
            color: C.ink, letterSpacing: -0.5,
          }}>GCSEMathsAI</span>
        </button>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!user ? (
            <>
              {["Features", "Pricing", "Blog"].map(l => (
                <button key={l} style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: 500, color: C.mid,
                  fontFamily: font.body, transition: "color 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = C.purple}
                  onMouseLeave={e => e.currentTarget.style.color = C.mid}
                >{l}</button>
              ))}
              <div style={{ width: 1, height: 20, background: C.border, margin: "0 8px" }} />
              <button onClick={() => router.push('/auth')} style={{
                background: "none", border: `1.5px solid ${C.border}`,
                padding: "8px 18px", borderRadius: 8,
                fontSize: 14, fontWeight: 600, color: C.ink,
                cursor: "pointer", fontFamily: font.body, transition: "all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink }}
              >Log in</button>
              <button onClick={() => router.push('/onboarding')} style={{
                background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                border: "none", padding: "8px 20px", borderRadius: 8,
                fontSize: 14, fontWeight: 700, color: "#fff",
                cursor: "pointer", fontFamily: font.body,
                boxShadow: `0 2px 12px ${C.purple}35`, transition: "all 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >Start free →</button>
            </>
          ) : (
            <>
              {[
                { label: "Dashboard", path: "/dashboard" },
                { label: "Study", path: "/study" },
                { label: "Practice", path: "/learn" },
                { label: "Papers", path: "/papers" },
                { label: "Blog", path: "/blog" },
              ].map(l => (
                <button key={l.label} onClick={() => router.push(l.path)} style={{
                  background: pathname.startsWith(l.path) ? C.purplePale : "none",
                  border: "none", cursor: "pointer",
                  padding: "8px 14px", borderRadius: 8,
                  fontSize: 14, fontWeight: pathname.startsWith(l.path) ? 700 : 500,
                  color: pathname.startsWith(l.path) ? C.purple : C.mid,
                  fontFamily: font.body, transition: "all 0.15s",
                }}>{l.label}</button>
              ))}
              <div
                onClick={signOut}
                title="Sign out"
                style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                  marginLeft: 8,
                }}
              >{initial}</div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
