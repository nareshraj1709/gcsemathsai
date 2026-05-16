'use client'

export default function PrintButton({ label = 'Print / Save as PDF', className = 'btn btn-primary', style }: { label?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={className}
      style={style}
    >
      {label}
    </button>
  )
}
