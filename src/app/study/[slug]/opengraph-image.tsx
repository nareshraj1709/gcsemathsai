import { ImageResponse } from 'next/og'
import { CONTENT, TOPIC_META, toSlug } from '@/lib/study-content'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Props = { params: { slug: string } }

export default function OgImage({ params }: Props) {
  const entry = CONTENT.find(c => toSlug(c.topic, c.subtopic) === params.slug)
  const meta = entry ? TOPIC_META[entry.topic] : null

  const color = meta?.color ?? '#6D28D9'
  const topic = entry?.topic ?? 'GCSE Maths'
  const subtopic = entry?.subtopic ?? 'Study Notes'
  const overview = entry?.overview ?? 'AI-powered GCSE Maths revision'
  const icon = meta?.icon ?? '📐'

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        background: `linear-gradient(135deg, ${color}ee, ${color}99)`,
        fontFamily: 'Georgia, serif',
        padding: '60px 80px',
        position: 'relative',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 50px)',
          display: 'flex',
        }} />

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'auto' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            border: '1.5px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>✦</div>
          <span style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'sans-serif' }}>
            GCSEMathsAI
          </span>
        </div>

        {/* Topic icon */}
        <div style={{ fontSize: 80, marginBottom: 20, display: 'flex' }}>{icon}</div>

        {/* Topic pill */}
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 999, padding: '6px 18px',
          width: 'fit-content', marginBottom: 16,
        }}>
          <span style={{ fontSize: 18, color: '#fff', fontFamily: 'sans-serif', fontWeight: 600 }}>{topic}</span>
        </div>

        {/* Subtopic title */}
        <div style={{ fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 20, display: 'flex' }}>
          {subtopic}
        </div>

        {/* Overview */}
        <div style={{
          fontSize: 22, color: 'rgba(255,255,255,0.8)',
          fontFamily: 'sans-serif', fontWeight: 400, lineHeight: 1.4,
          maxWidth: 700, display: 'flex',
        }}>
          {overview.length > 100 ? overview.slice(0, 100) + '…' : overview}
        </div>

        {/* Bottom tag */}
        <div style={{
          marginTop: 'auto', display: 'flex', gap: 12,
        }}>
          {['Study Notes', 'AI Marking', 'Exam Tips'].map(tag => (
            <div key={tag} style={{
              padding: '8px 18px', borderRadius: 999,
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff', fontSize: 16, fontFamily: 'sans-serif',
              display: 'flex',
            }}>{tag}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
