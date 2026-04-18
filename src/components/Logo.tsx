type Props = {
  size?: number
  showName?: boolean
  nameSize?: number
  nameColor?: string
}

export default function Logo({
  size = 40,
  showName = true,
  nameSize = 22,
  nameColor = 'var(--ink)',
}: Props) {
  const gap = Math.round(size * 0.3)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.2,
        background: 'var(--green)', color: 'var(--cream)',
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--serif)', fontWeight: 700,
        fontSize: size * 0.55, fontStyle: 'italic',
        boxShadow: '0 2px 8px -2px rgba(15,79,58,0.3)',
        flexShrink: 0,
      }}>
        &Sigma;
      </div>

      {showName && (
        <span style={{
          fontFamily: 'var(--serif)',
          fontWeight: 700,
          fontSize: nameSize,
          color: nameColor,
          letterSpacing: '-0.01em',
          userSelect: 'none',
          lineHeight: 1,
        }}>
          GCSEMaths<em style={{ fontStyle: 'italic', color: 'var(--green)', fontWeight: 600 }}>AI</em>
        </span>
      )}
    </div>
  )
}
