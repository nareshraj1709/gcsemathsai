'use client'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  useEffect(() => {
    // Supabase automatically handles the token from the URL hash
    // Just wait for the session to be established then redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        window.location.href = '/dashboard'
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-purple-700 font-semibold text-lg">Confirming your account...</p>
        <p className="text-gray-400 text-sm mt-2">You'll be redirected automatically.</p>
      </div>
    </main>
  )
}
