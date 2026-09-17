'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { withAuthTimeout } from '@/lib/auth-journey'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let active = true
    withAuthTimeout(supabase.auth.getSession()).then(({ data: { session } }) => {
      if (!active) return
      if (!session) {
        router.replace('/auth')
      } else {
        setReady(true)
      }
    }).catch(() => { if (active) setFailed(true) })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (event === 'SIGNED_OUT') {
          setReady(false)
          router.replace('/auth')
        }
      }
    })

    return () => { active = false; subscription.unsubscribe() }
  }, [router])

  if (failed) return <main className="auth-shell"><section className="auth-card"><h1>We could not check your session</h1><p>Please try logging in again, or continue practising without an account.</p><Link className="btn btn-primary" href="/auth">Return to login</Link><p><Link href="/diagnostic">Try a free quiz</Link></p></section></main>

  if (!ready) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--cream)',
        fontFamily: 'var(--sans)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: 10, margin: '0 auto 16px',
            background: 'var(--green)', color: 'var(--cream)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 24, fontStyle: 'italic',
            boxShadow: '0 2px 8px -2px rgba(15,79,58,0.3)',
            animation: 'softpulse 1.8s ease-in-out infinite',
          }}>&Sigma;</div>
          <p style={{ color: 'var(--ink-3)', fontSize: 14, fontWeight: 500 }}>Preparing your session&hellip;</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
