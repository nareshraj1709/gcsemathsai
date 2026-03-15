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
  nameColor = '#0D0B1A',
}: Props) {
  const radius = Math.round(size * 0.26)
  const gap    = Math.round(size * 0.28)
  const dotSz  = Math.round(size * 0.21)
  const dotOff = Math.round(size * 0.09)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>

      {/* ── Mark ── */}
      <div style={{
        width: size, height: size, borderRadius: radius, flexShrink: 0,
        background: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 55%, #8B5CF6 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(109,40,217,0.38)',
        position: 'relative',
      }}>

        {/* Σ — sum symbol representing maths */}
        <svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 24 24"
          fill="none"
        >
          {/* top bar */}
          <line x1="6" y1="4"  x2="18" y2="4"  stroke="white" strokeWidth="2.1" strokeLinecap="round" />
          {/* left diagonal down */}
          <line x1="6" y1="4"  x2="13" y2="12" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
          {/* left diagonal up */}
          <line x1="13" y1="12" x2="6" y2="20" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
          {/* bottom bar */}
          <line x1="6" y1="20" x2="18" y2="20" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
          {/* middle short bar */}
          <line x1="13" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        {/* AI sparkle dot — top-right corner */}
        <div style={{
          position: 'absolute',
          top: dotOff, right: dotOff,
          width: dotSz, height: dotSz,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #fff 20%, #C4B5FD 80%)',
          boxShadow: '0 0 5px 1px rgba(196,181,253,0.9)',
        }} />

      </div>

      {/* ── Wordmark ── */}
      {showName && (
        <span style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontWeight: 700,
          fontSize: nameSize,
          color: nameColor,
          letterSpacing: -0.5,
          userSelect: 'none',
          lineHeight: 1,
        }}>
          GCSE<span style={{ color: '#6D28D9' }}>Maths</span>AI
        </span>
      )}

    </div>
  )
}
