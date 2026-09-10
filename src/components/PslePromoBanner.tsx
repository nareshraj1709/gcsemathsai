'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PSLE_PRODUCT } from '@/lib/psle-papers'
import { OLEVEL_PRODUCT } from '@/lib/olevel-papers'

const EXAM_DATE = new Date('2026-09-25T00:00:00+08:00') // Singapore time, PSLE only — no confirmed O-Level date to count down to

function daysLeft(): number {
  const ms = EXAM_DATE.getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

export default function PslePromoBanner() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isBlog = pathname === '/blog' || pathname?.startsWith('/blog/')
  const isProductLanding = pathname === '/psle-practice-papers' || pathname === '/olevel-practice-papers'

  const [days, setDays] = useState<number | null>(null)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    setDays(daysLeft())
    const id = setInterval(() => setDays(daysLeft()), 1000 * 60 * 60)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem('exam-papers-banner-dismissed') === '1')
    } catch {
      setDismissed(false)
    }
  }, [pathname])

  const dismiss = () => {
    try { sessionStorage.setItem('exam-papers-banner-dismissed', '1') } catch {}
    setDismissed(true)
  }

  // Don't show on either product's own landing page, once dismissed this session,
  // or once PSLE's countdown has passed (O-Level has no date to gate on).
  if (isProductLanding || dismissed || days === null || days <= 0) return null
  if (!isHome && !isBlog) return null

  const dayLabel = `${days} day${days === 1 ? '' : 's'} to PSLE`

  if (isHome) {
    // Red/urgent, sticky at the very top of the viewport.
    // All colours below are solid (no translucent overlays) so text never blends with the background.
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
            textTransform: 'uppercase' as const, background: '#fff', color: 'var(--burgundy)',
            padding: '3px 10px', borderRadius: 999, flexShrink: 0,
          }}>
            {dayLabel}
          </span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#fff' }}>
            Singapore exam practice papers — full solutions, instant download
          </span>
          <Link href="/psle-practice-papers" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--gold)', color: '#fff',
            padding: '6px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
            fontFamily: 'var(--sans)', textDecoration: 'none', flexShrink: 0,
          }}>
            PSLE — {PSLE_PRODUCT.priceDisplay}
          </Link>
          <Link href="/olevel-practice-papers" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--navy)', color: '#fff',
            padding: '6px 16px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
            fontFamily: 'var(--sans)', textDecoration: 'none', flexShrink: 0,
          }}>
            O-Level — {OLEVEL_PRODUCT.priceDisplay}
          </Link>
          <button onClick={dismiss} aria-label="Dismiss" style={{
            background: 'none', border: 'none', color: '#fff', fontSize: 18, fontWeight: 700,
            cursor: 'pointer', padding: '2px 4px', lineHeight: 1, flexShrink: 0,
          }}>&times;</button>
        </div>
      </div>
    )
  }

  // Blog: navy, floating card on the right-hand side of the viewport at desktop
  // widths. Independent of each post's own layout/TOC, so it shows on every
  // post regardless of that post's content. Collapses to a full-width bottom
  // bar on narrow screens so it never overlaps article text on mobile.
  return (
    <>
      <style>{`
        .psle-blog-banner {
          position: fixed; right: 20px; top: 140px; z-index: 150;
          width: 260px; background: var(--navy); color: #fff; border-radius: 14px;
          padding: 18px 18px; box-shadow: 0 16px 48px -12px rgba(14,31,23,0.35);
        }
        @media (max-width: 1180px) {
          .psle-blog-banner { top: auto; bottom: 16px; right: 16px; }
        }
        @media (max-width: 640px) {
          .psle-blog-banner {
            left: 12px; right: 12px; bottom: 12px; top: auto; width: auto;
            padding: 14px 16px;
          }
        }
      `}</style>
      <div className="psle-blog-banner">
        <button onClick={dismiss} aria-label="Dismiss" style={{
          position: 'absolute', top: 8, right: 10, background: 'none', border: 'none',
          color: '#fff', fontSize: 18, fontWeight: 700, cursor: 'pointer', lineHeight: 1,
        }}>&times;</button>
        <span style={{
          display: 'inline-block', fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase' as const,
          background: 'var(--navy-soft)', color: 'var(--navy)',
          padding: '3px 10px', borderRadius: 999, marginBottom: 10,
        }}>
          {dayLabel}
        </span>
        <p style={{ fontSize: 13.5, color: '#fff', lineHeight: 1.5, margin: '0 0 12px', fontWeight: 500 }}>
          Singapore exam practice papers, fully worked — pick your level:
        </p>
        <div style={{ display: 'grid', gap: 8 }}>
          <Link href="/psle-practice-papers" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', color: 'var(--navy)',
            padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            fontFamily: 'var(--sans)', textDecoration: 'none',
          }}>
            <span>PSLE Papers</span><span>{PSLE_PRODUCT.priceDisplay}</span>
          </Link>
          <Link href="/olevel-practice-papers" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--gold)', color: '#fff',
            padding: '8px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700,
            fontFamily: 'var(--sans)', textDecoration: 'none',
          }}>
            <span>O-Level Papers</span><span>{OLEVEL_PRODUCT.priceDisplay}</span>
          </Link>
        </div>
      </div>
    </>
  )
}
