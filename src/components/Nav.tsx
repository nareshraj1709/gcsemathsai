'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getProfileFromCache, clearProfileCache } from '@/lib/profile'

type Profile = { name?: string; year?: string; board?: string }

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const cached = getProfileFromCache()
    if (cached) setProfile(cached as Profile)
  }, [pathname])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => { setMenuOpen(false); setUserMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!userMenuOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-user-menu]')) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [userMenuOpen])

  const signOut = async () => {
    setMenuOpen(false)
    setUserMenuOpen(false)
    await supabase.auth.signOut()
    clearProfileCache()
    setProfile(null)
    router.push('/')
  }

  const navigate = (path: string) => {
    setMenuOpen(false)
    router.push(path)
  }

  const initial = (user?.email?.[0] ?? 'U').toUpperCase()

  const loggedInLinks: Array<{ label: string; path: string; isDropdown?: boolean }> = [
    { label: "Home", path: "/" },
    { label: "Syllabus", path: "/topics" },
    { label: "Practice", path: "/learn" },
    { label: "My Study", path: "/dashboard" },
    { label: "Past Papers", path: "/papers" },
    { label: "Formulas", path: "/formulas" },
    { label: "Resources", path: "/blog", isDropdown: true },
    { label: "Community", path: "/community" },
  ]

  const loggedOutLinks: Array<{ label: string; path: string; isDropdown?: boolean }> = [
    { label: "Home", path: "/" },
    { label: "Syllabus", path: "/topics" },
    { label: "Practice", path: "/learn" },
    { label: "Past Papers", path: "/papers" },
    { label: "Formulas", path: "/formulas" },
    { label: "Resources", path: "/blog", isDropdown: true },
    { label: "Pricing", path: "/pricing" },
  ]

  const resourceLinks = [
    { label: 'Predicted Papers · NEW', path: '/predicted-papers', desc: 'Edexcel Higher Paper 2 & 3 — predicted 2026' },
    { label: 'Foundation Practice Papers · NEW', path: '/foundation-papers', desc: 'Edexcel Foundation Paper 2 & 3 — 10 practice papers' },
    { label: 'Blog', path: '/blog', desc: 'Revision guides and exam tips' },
    { label: 'Glossary', path: '/glossary', desc: '60+ GCSE Maths terms defined' },
    { label: 'Question Types', path: '/question-types', desc: 'How to answer every command word' },
    { label: 'AQA Hub', path: '/aqa', desc: 'AQA 8300 — paper structure & boundaries' },
    { label: 'Edexcel Hub', path: '/edexcel', desc: 'Edexcel 1MA1 — paper structure & boundaries' },
    { label: 'OCR Hub', path: '/ocr', desc: 'OCR J560 — paper structure & boundaries' },
    { label: 'Formula Sheet', path: '/formula-sheet', desc: 'Every formula as a free PDF' },
    { label: 'Site Map', path: '/site-map', desc: 'Every page on the site' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const links = user ? loggedInLinks : loggedOutLinks
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="wrap">
          <div className="left">
            <span>EST. 2024 &middot; LONDON</span>
            <span>&middot;</span>
            <span>MMXXVI SPECIFICATION</span>
          </div>
          <div className="right">
            <a onClick={() => navigate('/topics')}>AQA</a>
            <span>&middot;</span>
            <a onClick={() => navigate('/topics')}>Edexcel</a>
            <span>&middot;</span>
            <a onClick={() => navigate('/topics')}>OCR</a>
            <span style={{ opacity: 0.5 }}>|</span>
            <span className="est">Foundation + Higher</span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="main-nav">
        <div className="wrap">
          <a className="logo" onClick={() => navigate('/')}>
            <span className="logo-mark">&Sigma;</span>
            GCSEMaths<em>AI</em>
          </a>

          {/* Desktop menu */}
          {!isMobile && (
            <div className="menu">
              {links.map(l => {
                if (l.isDropdown) {
                  const active = resourceLinks.some(r => pathname.startsWith(r.path))
                  return (
                    <div key={l.label} data-resources-menu style={{ position: 'relative' }}
                      onMouseEnter={() => setResourcesOpen(true)}
                      onMouseLeave={() => setResourcesOpen(false)}
                    >
                      <button
                        className={`menu-link${active ? ' active' : ''}`}
                        onClick={() => setResourcesOpen(v => !v)}
                      >
                        {l.label} <span style={{ fontSize: 10, marginLeft: 4 }}>▾</span>
                      </button>
                      {resourcesOpen && (
                        <div style={{
                          position: 'absolute', top: '100%', left: 0,
                          background: 'var(--paper)', border: '1px solid var(--rule)',
                          borderRadius: 12, minWidth: 280, padding: 8, marginTop: 4,
                          boxShadow: '0 8px 32px rgba(14,31,23,0.12)', zIndex: 300,
                        }}>
                          {resourceLinks.map(r => (
                            <button
                              key={r.path}
                              onClick={() => { setResourcesOpen(false); navigate(r.path) }}
                              style={{
                                width: '100%', textAlign: 'left', background: 'none', border: 'none',
                                padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                              }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'var(--green-soft)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                            >
                              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{r.label}</div>
                              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{r.desc}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <button
                    key={l.label}
                    className={`menu-link${isActive(l.path) ? ' active' : ''}`}
                    onClick={() => navigate(l.path)}
                  >
                    {l.label}
                  </button>
                )
              })}
            </div>
          )}

          <div className="nav-cta">
            {!isMobile && !user && (
              <>
                <button className="btn btn-ghost" onClick={() => navigate('/auth')}>Log in</button>
                <button className="btn btn-primary" onClick={() => navigate('/auth')}>Start for free</button>
              </>
            )}
            {!isMobile && user && (
              <>
                {profile?.year && profile?.board && (
                  <button
                    onClick={() => navigate('/onboarding')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'var(--green-soft)', border: '1px solid var(--rule)',
                      borderRadius: 999, padding: '5px 12px',
                      fontSize: 12, fontWeight: 600, color: 'var(--green)',
                      cursor: 'pointer', fontFamily: 'var(--mono)',
                    }}
                  >
                    {profile.year} &middot; {profile.board}
                  </button>
                )}
                <div data-user-menu style={{ position: 'relative' }}>
                  <div
                    onClick={() => setUserMenuOpen(o => !o)}
                    title="Account menu"
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--green)', display: 'grid', placeItems: 'center',
                      color: 'var(--cream)', fontSize: 14, fontWeight: 700,
                      fontFamily: 'var(--serif)', cursor: 'pointer',
                    }}
                  >{initial}</div>
                  {userMenuOpen && (
                    <div style={{
                      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                      background: 'var(--paper)', border: '1px solid var(--rule)',
                      borderRadius: 12, minWidth: 220, padding: 8,
                      boxShadow: '0 8px 32px rgba(14,31,23,0.12)', zIndex: 300,
                    }}>
                      {user?.email && (
                        <div style={{
                          padding: '10px 12px', fontSize: 12, color: 'var(--ink-3)',
                          borderBottom: '1px solid var(--rule)', marginBottom: 4,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          fontFamily: 'var(--mono)',
                        }}>{user.email}</div>
                      )}
                      <button onClick={() => { setUserMenuOpen(false); navigate('/dashboard') }} style={{
                        width: '100%', textAlign: 'left', background: 'none', border: 'none',
                        padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                        fontSize: 14, fontWeight: 600, color: 'var(--ink)',
                      }}>Dashboard</button>
                      <button onClick={() => { setUserMenuOpen(false); navigate('/onboarding') }} style={{
                        width: '100%', textAlign: 'left', background: 'none', border: 'none',
                        padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                        fontSize: 14, fontWeight: 600, color: 'var(--ink)',
                      }}>Year / Exam board</button>
                      <div style={{ height: 1, background: 'var(--rule)', margin: '4px 0' }} />
                      <button onClick={signOut} style={{
                        width: '100%', textAlign: 'left', background: 'none', border: 'none',
                        padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                        fontSize: 14, fontWeight: 600, color: 'var(--burgundy)',
                      }}>Sign out</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button
                className="hamburger-btn"
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                style={{ display: 'flex' }}
              >
                {menuOpen ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <line x1="2" y1="2" x2="16" y2="16" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="16" y1="2" x2="2" y2="16" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <line x1="0" y1="1" x2="18" y2="1" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="0" y1="7" x2="18" y2="7" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="0" y1="13" x2="18" y2="13" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={e => e.stopPropagation()}>
            {links.filter(l => !l.isDropdown).map(l => (
              <button
                key={l.label}
                className={`menu-item${isActive(l.path) ? ' active' : ''}`}
                onClick={() => navigate(l.path)}
              >
                {l.label}
              </button>
            ))}
            <div style={{ height: 1, background: 'var(--rule)', margin: '8px 0' }} />
            <div style={{ padding: '8px 14px 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)', textTransform: 'uppercase', fontFamily: 'var(--mono)' }}>Resources</div>
            {resourceLinks.map(r => (
              <button
                key={r.path}
                className={`menu-item${pathname.startsWith(r.path) ? ' active' : ''}`}
                onClick={() => navigate(r.path)}
              >
                {r.label}
              </button>
            ))}
            <div style={{ height: 1, background: 'var(--rule)', margin: '8px 0' }} />

            {user && (
              <>
                <button className="menu-item" onClick={() => navigate('/sections')}>Topic Tests</button>
                <button className="menu-item" onClick={() => navigate('/notes-review')}>Notes Review</button>
                <button className="menu-item" onClick={() => navigate('/downloads')}>Downloads</button>
              </>
            )}

            <div style={{ height: 1, background: 'var(--rule)', margin: '12px 0' }} />

            {!user ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate('/auth')}>Log in</button>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => navigate('/auth')}>Start free</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {profile?.year && profile?.board && (
                  <button
                    className="menu-item"
                    onClick={() => navigate('/onboarding')}
                    style={{ background: 'var(--green-soft)', color: 'var(--green)', fontFamily: 'var(--mono)', fontSize: 13 }}
                  >
                    {profile.year} &middot; {profile.board} &middot; Change
                  </button>
                )}
                <button
                  className="menu-item"
                  onClick={signOut}
                  style={{ color: 'var(--burgundy)' }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
