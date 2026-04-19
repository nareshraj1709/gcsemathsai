import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon512() {
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
          fontSize: 380,
          letterSpacing: '-0.02em',
        }}
      >
        Σ
      </div>
    ),
    { ...size },
  )
}
