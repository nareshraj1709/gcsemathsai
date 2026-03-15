import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #8B5CF6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Σ symbol via text — SVG not supported in ImageResponse */}
        <span style={{ color: 'white', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>Σ</span>
      </div>
    ),
    { ...size },
  )
}
