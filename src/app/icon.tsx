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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Hexagon shape approximated with a rounded dark box */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 6,
          background: '#1D1D2E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Center dot representing the network hub */}
          <div style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#7F77DD',
          }} />
        </div>
      </div>
    ),
    { ...size },
  )
}
