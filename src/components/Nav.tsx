'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo'

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

type Profile = { name?: string; year?: string; board?: string }

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gcse_profile')
      if (saved) setProfile(JSON.parse(saved))
    } catch { /* ignore */ }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const signOut = async () => {
    setMenuOpen(false)
    await supabase.auth.signOut()
    try { localStorage.removeItem('gcse_profile') } catch { /* ignore */ }
    setProfile(null)
    router.push('/')
  }

  const navigate = (path: string) => {
    setMenuOpen(false)
    router.push(path)
  }

  const initial = (user?.email?.[0] ?? 'U').toUpperCase()

  const loggedInLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Study",     path: "/study"     },
    { label: "Practice",  path: "/learn"     },
    { label: "Topic Tests", path: "/sections" },
    { label: "Papers",    path: "/papers"    },
    { label: "Notes Review", path: "/notes-review" },
    { label: "Downloads", path: "/downloads" },
  ]

  const loggedOutLinks = [
    { label: "Topics",        path: "/topics"        },
    { label: "Formula Sheet", path: "/formula-sheet"  },
    { label: "Features",      path: "/features"      },
    { label: "Pricing",       path: "/pricing"       },
    { label: "Blog",          path: "/blog"          },
  ]

  return (
    <>
      <nav style={{
        position: "sticky", top: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled || menuOpen ? C.border : "transparent"}`,
        transition: "all 0.3s",
        padding: "0 20px",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 64,
        }}>
          {/* Logo */}
          <button onClick={() => navigate('/')} style={{
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}>
            <Logo size={34} nameSize={19} />
          </button>

          {/* Desktop links */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              {!user ? (
                <>
                  {loggedOutLinks.map(l => (
                    <button key={l.label} onClick={() => navigate(l.path)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      padding: "8px 14px", borderRadius: 8,
                      fontSize: 14, fontWeight: 500, color: C.mid,
                      fontFamily: font.body, transition: "color 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = C.purple}
                      onMouseLeave={e => e.currentTarget.style.color = C.mid}
                    >{l.label}</button>
                  ))}
                  <div style={{ width: 1, height: 20, background: C.border, margin: "0 8px" }} />
                  <button onClick={() => navigate('/auth')} style={{
                    background: "none", border: `1.5px solid ${C.border}`,
                    padding: "8px 18px", borderRadius: 8,
                    fontSize: 14, fontWeight: 600, color: C.ink,
                    cursor: "pointer", fontFamily: font.body, transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.purple; e.currentTarget.style.color = C.purple }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.ink }}
                  >Log in</button>
                  <button onClick={() => navigate('/auth')} style={{
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
                  {loggedInLinks.map(l => (
                    <button key={l.label} onClick={() => navigate(l.path)} style={{
                      background: pathname.startsWith(l.path) ? C.purplePale : "none",
                      border: "none", cursor: "pointer",
                      padding: "8px 14px", borderRadius: 8,
                      fontSize: 14, fontWeight: pathname.startsWith(l.path) ? 700 : 500,
                      color: pathname.startsWith(l.path) ? C.purple : C.mid,
                      fontFamily: font.body, transition: "all 0.15s",
                    }}>{l.label}</button>
                  ))}
                  {profile?.year && profile?.board && (
                    <button
                      onClick={() => navigate('/onboarding')}
                      title="Change year / exam board"
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        background: C.purplePale, border: `1px solid ${C.border}`,
                        borderRadius: 999, padding: "5px 12px",
                        fontSize: 12, fontWeight: 600, color: C.purple,
                        cursor: "pointer", fontFamily: font.body,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {profile.year} · {profile.board}
                      <span style={{ fontSize: 11, opacity: 0.7 }}>✏️</span>
                    </button>
                  )}
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
          )}

          {/* Mobile: right side — avatar (if logged in) + hamburger */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {user && (
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 13, fontWeight: 700,
                }}>{initial}</div>
              )}
              {/* Hamburger button */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                style={{
                  background: "none", border: `1.5px solid ${C.border}`,
                  borderRadius: 8, width: 40, height: 40, cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", gap: 4, padding: 0,
                }}
              >
                {menuOpen ? (
                  // X icon
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line x1="2" y1="2" x2="16" y2="16" stroke={C.ink} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="2" x2="2" y2="16" stroke={C.ink} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <line x1="0" y1="1" x2="18" y2="1" stroke={C.ink} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="0" y1="7" x2="18" y2="7" stroke={C.ink} strokeWidth="2" strokeLinecap="round"/>
                    <line x1="0" y1="13" x2="18" y2="13" stroke={C.ink} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
          zIndex: 190, background: "rgba(0,0,0,0.4)",
        }} onClick={() => setMenuOpen(false)}>
          <div
            style={{
              background: "#fff", borderBottom: `1px solid ${C.border}`,
              padding: "16px 20px 24px",
            }}
            onClick={e => e.stopPropagation()}
          >
            {!user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {loggedOutLinks.map(l => (
                  <button key={l.label} onClick={() => navigate(l.path)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    padding: "13px 8px", borderRadius: 10, textAlign: "left",
                    fontSize: 16, fontWeight: 500, color: C.ink,
                    fontFamily: font.body, borderBottom: `1px solid ${C.border}`,
                  }}>{l.label}</button>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                  <button onClick={() => navigate('/auth')} style={{
                    flex: 1, padding: "12px", borderRadius: 10,
                    border: `1.5px solid ${C.border}`, background: "#fff",
                    fontSize: 15, fontWeight: 600, color: C.ink,
                    cursor: "pointer", fontFamily: font.body,
                  }}>Log in</button>
                  <button onClick={() => navigate('/auth')} style={{
                    flex: 1, padding: "12px", borderRadius: 10, border: "none",
                    background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
                    fontSize: 15, fontWeight: 700, color: "#fff",
                    cursor: "pointer", fontFamily: font.body,
                  }}>Start free →</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {profile?.year && profile?.board && (
                  <button
                    onClick={() => navigate('/onboarding')}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      background: C.purplePale, border: `1px solid ${C.border}`,
                      borderRadius: 10, padding: "10px 14px", marginBottom: 8,
                      fontSize: 14, fontWeight: 600, color: C.purple,
                      cursor: "pointer", fontFamily: font.body, width: "100%",
                    }}
                  >
                    <span style={{ flex: 1, textAlign: "left" }}>{profile.year} · {profile.board}</span>
                    <span style={{ fontSize: 12, opacity: 0.7 }}>✏️ Change</span>
                  </button>
                )}
                {loggedInLinks.map(l => (
                  <button key={l.label} onClick={() => navigate(l.path)} style={{
                    background: pathname.startsWith(l.path) ? C.purplePale : "none",
                    border: "none", cursor: "pointer",
                    padding: "13px 12px", borderRadius: 10, textAlign: "left",
                    fontSize: 16, fontWeight: pathname.startsWith(l.path) ? 700 : 500,
                    color: pathname.startsWith(l.path) ? C.purple : C.ink,
                    fontFamily: font.body,
                  }}>
                    {pathname.startsWith(l.path) ? '› ' : ''}{l.label}
                  </button>
                ))}
                <button onClick={signOut} style={{
                  marginTop: 12, padding: "12px", borderRadius: 10,
                  border: `1.5px solid ${C.border}`, background: "#fff",
                  fontSize: 14, fontWeight: 600, color: C.mid,
                  cursor: "pointer", fontFamily: font.body,
                }}>Sign out</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
