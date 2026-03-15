import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GCSEMathsAI — AI-Powered GCSE Maths Tutor'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #8B5CF6 100%)',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Background grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.08,
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          display: 'flex',
        }} />

        {/* Logo mark */}
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, marginBottom: 24,
        }}>
          ✦
        </div>

        {/* Title */}
        <div style={{
          fontSize: 64, fontWeight: 800, color: '#fff',
          letterSpacing: -2, marginBottom: 16, textAlign: 'center',
          display: 'flex',
        }}>
          GCSEMathsAI
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: 28, color: 'rgba(255,255,255,0.85)',
          marginBottom: 40, textAlign: 'center',
          fontFamily: 'sans-serif', fontWeight: 400,
          display: 'flex',
        }}>
          AI-Powered GCSE Maths Tutor
        </div>

        {/* Feature pills */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['AQA', 'Edexcel', 'OCR'].map(b => (
            <div key={b} style={{
              padding: '10px 24px', borderRadius: 999,
              background: 'rgba(255,255,255,0.2)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              color: '#fff', fontSize: 20, fontWeight: 700,
              fontFamily: 'sans-serif',
              display: 'flex',
            }}>
              {b}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div style={{
          position: 'absolute', bottom: 40,
          fontSize: 18, color: 'rgba(255,255,255,0.6)',
          fontFamily: 'sans-serif',
          display: 'flex',
        }}>
          Study Notes · Timed Papers · Instant AI Marking
        </div>
      </div>
    ),
    { ...size }
  )
}
