type Props = {
  size?: number        // logo mark size in px
  showName?: boolean
  nameSize?: number
  nameColor?: string
}

export default function Logo({
  size = 36,
  showName = true,
  nameSize = 20,
  nameColor = '#1D1D2E',
}: Props) {
  const gap = Math.round(size * 0.25)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>

      {/* ── Hexagon mark with circuit network ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 72 72"
        fill="none"
        style={{ flexShrink: 0 }}
      >
        {/* Hexagon background */}
        <polygon
          points="36,4 64,20 64,52 36,68 8,52 8,20"
          fill="#1D1D2E"
        />
        {/* Circuit lines */}
        <line x1="36" y1="18" x2="36" y2="54" stroke="#7F77DD" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="18" y1="28" x2="54" y2="48" stroke="#7F77DD" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="54" y1="28" x2="18" y2="48" stroke="#7F77DD" strokeWidth="1.8" strokeLinecap="round" />
        {/* Outer node dots — purple */}
        <circle cx="36" cy="18" r="4" fill="#AFA9EC" />
        <circle cx="18" cy="28" r="4" fill="#AFA9EC" />
        <circle cx="54" cy="28" r="4" fill="#AFA9EC" />
        {/* Outer node dots — teal */}
        <circle cx="36" cy="54" r="4" fill="#5DCAA5" />
        <circle cx="18" cy="48" r="4" fill="#5DCAA5" />
        <circle cx="54" cy="48" r="4" fill="#5DCAA5" />
        {/* Center dot */}
        <circle cx="36" cy="36" r="6" fill="#7F77DD" />
      </svg>

      {/* ── Wordmark ── */}
      {showName && (
        <span style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 700,
          fontSize: nameSize,
          color: nameColor,
          letterSpacing: -0.5,
          userSelect: 'none',
          lineHeight: 1,
        }}>
          GCSE<span style={{ fontWeight: 700, color: nameColor }}>Maths</span><span style={{ color: '#7F77DD' }}>AI</span>
        </span>
      )}

    </div>
  )
}
