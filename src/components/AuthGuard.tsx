'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/auth')
      } else {
        setReady(true)
      }
    })

    // Listen for real-time auth changes (e.g. sign-out from another tab,
    // session expiry, token refresh failure)
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
        justifyContent: 'center', background: '#F8F7FF',
        fontFamily: "'Trebuchet MS', sans-serif",
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, #6D28D9, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: '#fff',
          }}>✦</div>
          <p style={{ color: '#6B7280', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
