'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Auth() {
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
      else window.location.href = '/dashboard'
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
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-purple-700 mb-1">GCSEMathsAI</h1>
          <p className="text-gray-500 text-sm">{isLogin ? 'Welcome back' : 'Create your free account'}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          {message && (
            <p className="text-sm text-center text-purple-600 bg-purple-50 rounded-lg p-3">{message}</p>
          )}

          <button
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-purple-700 text-white rounded-xl py-3 font-bold text-sm hover:bg-purple-800 transition"
          >
            {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Create account'}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-700 font-semibold">
              {isLogin ? 'Sign up free' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </main>
  )
}