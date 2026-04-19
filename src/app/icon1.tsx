import { ImageResponse } from 'next/og'

export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon192() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F4F3A',
          color: '#F7F3EA',
          fontFamily: 'serif',
          fontStyle: 'italic',
          fontWeight: 700,
          fontSize: 140,
          letterSpacing: '-0.02em',
        }}
      >
        Σ
      </div>
    ),
    { ...size },
  )
}
