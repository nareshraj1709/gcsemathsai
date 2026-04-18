'use client'
import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallBanner() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [dismissed, setDismissed] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem('install-banner-dismissed')
    if (dismissedAt) {
      const hoursAgo = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60)
      if (hoursAgo < 72) { setDismissed(true); return }
    }
    setDismissed(false)

    // Detect iOS
    const ua = navigator.userAgent
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream)

    // Listen for install prompt (Chrome/Edge/Android)
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const dismiss = useCallback(() => {
    localStorage.setItem('install-banner-dismissed', Date.now().toString())
    setDismissed(true)
  }, [])

  const install = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') {
        setDismissed(true)
      }
      setDeferredPrompt(null)
    }
  }, [deferredPrompt])

  // Don't show if installed, dismissed, or no install capability
  if (isStandalone || dismissed) return null
  if (!deferredPrompt && !isIOS) return null

  // HOME PAGE: centered popup modal style
  if (isHome) {
    return (
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        zIndex: 100, width: '90%', maxWidth: 480,
        background: 'var(--ink)', color: 'var(--cream)', borderRadius: 16,
        padding: '20px 24px', boxShadow: '0 20px 60px -15px rgba(14,31,23,0.5)',
        display: 'flex', alignItems: 'center', gap: 16,
        animation: 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <style>{`@keyframes slideUp { from { opacity:0; transform: translateX(-50%) translateY(20px); } to { opacity:1; transform: translateX(-50%) translateY(0); } }`}</style>

        <div style={{
          width: 48, height: 48, borderRadius: 12, background: 'var(--green)', color: 'var(--cream)',
          display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontWeight: 700,
          fontSize: 24, fontStyle: 'italic', flexShrink: 0,
        }}>&Sigma;</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
            Install GCSEMaths<em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>AI</em>
          </div>
          <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.4 }}>
            {isIOS
              ? <>Tap <b>Share</b> then <b>&ldquo;Add to Home Screen&rdquo;</b></>
              : 'Add to your home screen for instant access — works offline too.'
            }
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          {!isIOS && (
            <button onClick={install} style={{
              background: 'var(--gold)', color: 'var(--cream)', border: 'none', borderRadius: 8,
              padding: '9px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              fontFamily: 'var(--sans)', whiteSpace: 'nowrap',
            }}>Install</button>
          )}
          <button onClick={dismiss} style={{
            background: 'none', border: 'none', color: 'var(--cream)',
            fontSize: 11, opacity: 0.6, cursor: 'pointer', fontFamily: 'var(--mono)',
            padding: '4px 0', letterSpacing: '0.04em',
          }}>Not now</button>
        </div>
      </div>
    )
  }

  // OTHER PAGES: subtle side banner (bottom-right on desktop, bottom full-width on mobile)
  return (
    <div style={{
      position: 'fixed', bottom: 16, right: 16, zIndex: 100,
      background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
      padding: '14px 18px', boxShadow: '0 12px 40px -10px rgba(14,31,23,0.18)',
      display: 'flex', alignItems: 'center', gap: 12, maxWidth: 360,
      animation: 'slideIn 0.4s cubic-bezier(0.22,1,0.36,1)',
    }}>
      <style>{`@keyframes slideIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        @media (max-width: 500px) { .install-side-banner { left: 16px !important; right: 16px !important; max-width: none !important; } }
      `}</style>

      <div style={{
        width: 36, height: 36, borderRadius: 8, background: 'var(--green)', color: 'var(--cream)',
        display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: 18, fontStyle: 'italic', flexShrink: 0,
      }}>&Sigma;</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
          {isIOS ? 'Add to Home Screen' : 'Install the app'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.3 }}>
          {isIOS ? 'Tap Share \u2192 Add to Home Screen' : 'Quick access from your home screen'}
        </div>
      </div>

      {!isIOS && (
        <button onClick={install} style={{
          background: 'var(--green)', color: 'var(--cream)', border: 'none', borderRadius: 8,
          padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          fontFamily: 'var(--sans)', whiteSpace: 'nowrap', flexShrink: 0,
        }}>Install</button>
      )}

      <button onClick={dismiss} style={{
        background: 'none', border: 'none', color: 'var(--ink-4)', fontSize: 16,
        cursor: 'pointer', padding: '2px 4px', lineHeight: 1, flexShrink: 0,
      }}>&times;</button>
    </div>
  )
}
