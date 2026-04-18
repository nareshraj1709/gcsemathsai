'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth')
      } else {
        setReady(true)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (event === 'SIGNED_OUT') {
          setReady(false)
          router.replace('/auth')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

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
