'use client'
import { useState } from 'react'
import Link from 'next/link'

type FormState = {
  name: string
  email: string
  category: string
  message: string
}

const CATEGORIES = [
  { value: 'student', label: 'I\'m a student' },
  { value: 'parent', label: 'I\'m a parent / guardian' },
  { value: 'teacher', label: 'I\'m a teacher' },
  { value: 'school', label: 'School or MAT partnership' },
  { value: 'press', label: 'Press enquiry' },
  { value: 'bug', label: 'Bug report or technical issue' },
  { value: 'other', label: 'Something else' },
]

const FAQS = [
  {
    q: 'Is GCSEMathsAI really free?',
    a: 'Yes — completely free right now. No card, no trial expiry. If we ever introduce paid features we\'ll give you at least 30 days\' notice.',
  },
  {
    q: 'Which exam boards do you cover?',
    a: 'AQA, Edexcel and OCR. Foundation and Higher tier. You can select your board and tier in the Learn section before each session.',
  },
  {
    q: 'How accurate is the marking?',
    a: 'Very good for most standard GCSE questions, but not perfect. Always treat it as a guide and check with your teacher if you\'re unsure about a piece of feedback.',
  },
  {
    q: 'Can my teacher set up accounts for a whole class?',
    a: 'Not yet — but this is on our roadmap. Email us at enquiriesgcsemath@yahoo.com and we\'ll keep you posted.',
  },
  {
    q: 'I\'ve forgotten my password. What do I do?',
    a: 'Go to the login page and click "Forgot password". You\'ll receive a reset link by email within a few minutes.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Email enquiriesgcsemath@yahoo.com with the subject "Delete my account". We\'ll delete everything within 5 working days.',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', category: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorDetail, setErrorDetail] = useState<string>('')

  const set = (field: keyof FormState, value: string) =>
    setForm(f => ({ ...f, [field]: value }))

  const valid = form.name.trim() && form.email.includes('@') && form.category && form.message.trim().length >= 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setStatus('sending')
    setErrorDetail('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
      } else {
        const j = await res.json().catch(() => ({}))
        setErrorDetail(j.detail || j.error || `Server returned ${res.status}`)
        setStatus('error')
      }
    } catch (err) {
      setErrorDetail(err instanceof Error ? err.message : 'Network error')
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Header */}
      <div className="border-b px-6 py-12 text-center" style={{ background: 'var(--green-soft)', borderColor: 'var(--rule)' }}>
        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>Get in touch</span>
        <h1 className="text-3xl font-bold mt-4 mb-2" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>Contact us</h1>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--ink-3)' }}>
          We read every message and aim to reply within one working day.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-12">

          {/* Left — form */}
          <div className="md:col-span-3">
            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Thanks, {form.name.split(' ')[0]}. We&apos;ll get back to you at {form.email} within one working day.
                </p>
                <button
                  onClick={() => { setStatus('idle'); setForm({ name: '', email: '', category: '', message: '' }) }}
                  className="text-sm text-green-800 font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Your name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full border border-[var(--rule)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700 transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full border border-[var(--rule)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">What best describes you?</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    required
                    className="w-full border border-[var(--rule)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700 transition bg-[var(--paper)]"
                  >
                    <option value="">Select a category…</option>
                    {CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Message</label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    placeholder="Tell us how we can help…"
                    rows={5}
                    required
                    minLength={10}
                    className="w-full border border-[var(--rule)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-700 transition resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{form.message.length} characters</p>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    <p className="font-semibold mb-1">Could not send your message.</p>
                    {errorDetail && (
                      <p className="text-xs text-red-600 mb-2 font-mono break-all">{errorDetail}</p>
                    )}
                    <p>
                      Please email us directly at{' '}
                      <a href="mailto:enquiriesgcsemath@yahoo.com" className="font-semibold underline">
                        enquiriesgcsemath@yahoo.com
                      </a>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!valid || status === 'sending'}
                  className="w-full text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: 'var(--green)' }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send message →'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Or email us directly:{' '}
                  <a href="mailto:enquiriesgcsemath@yahoo.com" className="text-green-800 font-medium">
                    enquiriesgcsemath@yahoo.com
                  </a>
                </p>
              </form>
            )}
          </div>

          {/* Right — info */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact cards */}
            {[
              {
                icon: '✉️',
                title: 'General',
                lines: ['enquiriesgcsemath@yahoo.com', 'Questions, feedback, anything'],
              },
              {
                icon: '🔒',
                title: 'Privacy & data',
                lines: ['enquiriesgcsemath@yahoo.com', 'Data requests, GDPR, account deletion'],
              },
              {
                icon: '🏫',
                title: 'Schools',
                lines: ['enquiriesgcsemath@yahoo.com', 'Class licences, bulk accounts, MATs'],
              },
            ].map(c => (
              <div key={c.title} className="flex gap-3 p-4 rounded-xl" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                <span className="text-xl mt-0.5">{c.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{c.title}</p>
                  <p className="text-sm text-green-800">{c.lines[0]}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{c.lines[1]}</p>
                </div>
              </div>
            ))}

            {/* Response time */}
            <div className="rounded-xl p-4" style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--green)' }}>Response time</p>
              <p className="text-sm text-gray-700">We typically reply within <strong>1 working day</strong> Monday–Friday. For urgent issues, include &quot;URGENT&quot; in the subject line.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently asked questions</h2>
          <p className="text-gray-500 text-sm mb-8">Can&apos;t find your answer here? Just send us a message above.</p>
          <div className="grid md:grid-cols-2 gap-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="rounded-xl p-5" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
                <p className="font-semibold text-gray-900 text-sm mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 flex flex-wrap gap-6 text-sm text-gray-500" style={{ borderTop: '1px solid var(--rule)' }}>
          <Link href="/privacy" className="hover:text-green-800 transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-green-800 transition">Terms of Service</Link>
          <Link href="/" className="hover:text-green-800 transition">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
