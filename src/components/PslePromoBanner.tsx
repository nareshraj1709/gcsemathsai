'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PSLE_PRODUCT, getPsleCheckoutUrl } from '@/lib/psle-papers'

const EXAM_DATE = new Date('2026-09-25T00:00:00+08:00') // Singapore time

function daysLeft(): number {
  const ms = EXAM_DATE.getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

const checkoutUrl = getPsleCheckoutUrl()

export default function PslePromoBanner() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isBlog = pathname === '/blog' || pathname?.startsWith('/blog/')
  const isPsleLanding = pathname === '/psle-practice-papers'

  const [days, setDays] = useState<number | null>(null)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDays(daysLeft())
    const id = setInterval(() => setDays(daysLeft()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem('psle-banner-dismissed') === '1')
    } catch {
      setDismissed(false)
    }
  }, [pathname])

  const dismiss = () => {
    try { sessionStorage.setItem('psle-banner-dismissed', '1') } catch {}
    setDismissed(true)
  }

  // Don't show on the PSLE landing page itself, once past exam day, or once dismissed this session.
  if (isPsleLanding || dismissed || days === null || days <= 0) return null
  if (!isHome && !isBlog) return null

  const dayLabel = `${days} day${days === 1 ? '' : 's'} to PSLE`

  if (isHome) {
    // Red/urgent, sticky at the very top of the viewport.
    return (
      <div style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--burgundy)', color: '#fff',
        padding: '10px 16px',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 14, flexWrap: 'wrap' as const, textAlign: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em',
            textTransform: 'uppercase' as const, background: 'rgba(255,255,255,0.18)',
            padding: '3px 10px', borderRadius: 999, flexShrink: 0,
          }}>
            {dayLabel}
          </span>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>
            PSLE Maths Practice Papers — 10 papers, full solutions, instant download
          </span>
          <Link href="/psle-practice-papers" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--gold)', color: '#fff',
            padding: '6px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
            fontFamily: 'var(--sans)', textDecoration: 'none', flexShrink: 0,
          }}>
            Get Papers — {PSLE_PRODUCT.priceDisplay}
          </Link>
          <button onClick={dismiss} aria-label="Dismiss" style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 16,
            cursor: 'pointer', padding: '2px 4px', lineHeight: 1, flexShrink: 0,
          }}>&times;</button>
        </div>
      </div>
    )
  }

  // Blog: blue/professional, not sticky — sits at the top of the post content.
  return (
    <div style={{
      background: 'var(--navy)', color: '#fff', padding: '12px 16px',
    }}>
      <div style={{
        maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 12, flexWrap: 'wrap' as const, textAlign: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase' as const, background: 'var(--navy-soft)', color: 'var(--navy)',
          padding: '3px 10px', borderRadius: 999, flexShrink: 0,
        }}>
          {dayLabel}
        </span>
        <span style={{ fontSize: 13.5 }}>
          Prepping a P6 student? <Link href="/psle-practice-papers" style={{ color: '#fff', textDecoration: 'underline', fontWeight: 700 }}>10 PSLE Maths practice papers with full solutions</Link>
        </span>
        <a href={checkoutUrl} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', color: 'var(--navy)',
          padding: '6px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
          fontFamily: 'var(--sans)', textDecoration: 'none', flexShrink: 0,
        }}>
          {PSLE_PRODUCT.priceDisplay}
        </a>
        <button onClick={dismiss} aria-label="Dismiss" style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: 16,
          cursor: 'pointer', padding: '2px 4px', lineHeight: 1, flexShrink: 0,
        }}>&times;</button>
      </div>
    </div>
  )
}
