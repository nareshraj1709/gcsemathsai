// Parametrized SVG diagram generators for topic pages.
// Each function returns an inline <svg> string (uses CSS custom properties from
// globals.css, so it inherits the site's Oxford-library colour theme automatically).
// Dispatched from renderTopicMarkdown() via a [DIAGRAM: type | k=v | k=v] token.

export type DiagramParams = Record<string, string>

const INK = 'var(--ink)'
const INK2 = 'var(--ink-2)'
const INK3 = 'var(--ink-3)'
const INK4 = 'var(--ink-4)'
const RULE = 'var(--rule)'
const GREEN = 'var(--green)'
const GREEN_SOFT = 'var(--green-soft)'
const GOLD = 'var(--gold)'
const GOLD_SOFT = 'var(--gold-soft)'

function n(p: DiagramParams, key: string, fallback: number): number {
  const raw = p[key]
  if (raw === undefined) return fallback
  const v = parseFloat(raw)
  return Number.isFinite(v) ? v : fallback
}

function s(p: DiagramParams, key: string, fallback: string): string {
  return p[key] !== undefined && p[key] !== '' ? p[key] : fallback
}

function esc(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// point on a circle in SVG (y-down) pixel space; theta in degrees, 0 = +x (right),
// increasing theta sweeps clockwise as drawn (0 right, 90 down, 180 left, 270 up)
function polar(cx: number, cy: number, r: number, thetaDeg: number) {
  const t = (thetaDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(t), y: cy + r * Math.sin(t) }
}

function arcPath(cx: number, cy: number, r: number, theta1: number, theta2: number) {
  let delta = theta2 - theta1
  while (delta < 0) delta += 360
  while (delta > 360) delta -= 360
  const large = delta > 180 ? 1 : 0
  const p1 = polar(cx, cy, r, theta1)
  const p2 = polar(cx, cy, r, theta2)
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
}

function label(x: number, y: number, text: string, opts: { color?: string; size?: number; anchor?: string; weight?: number; italic?: boolean } = {}) {
  const { color = INK, size = 13, anchor = 'middle', weight = 600, italic = false } = opts
  return `<text x="${x}" y="${y}" font-family="var(--sans)" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}"${italic ? ' font-style="italic"' : ''}>${esc(text)}</text>`
}

function wrap(id: string, inner: string, viewBox = '0 0 320 240', caption?: string) {
  const cap = caption
    ? `<figcaption style="font-size:12.5px;color:var(--ink-3);text-align:center;margin-top:6px;font-style:italic;">${esc(caption)}</figcaption>`
    : ''
  const parts = viewBox.trim().split(/\s+/).map(Number)
  const vbWidth = parts[2] && Number.isFinite(parts[2]) ? parts[2] : 320
  const vbHeight = parts[3] && Number.isFinite(parts[3]) ? parts[3] : 240
  return `<figure class="diagram-figure" style="max-width:420px;">
<svg viewBox="${viewBox}" width="${vbWidth}" height="${vbHeight}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(caption || 'diagram')}">
<defs>
<marker id="${id}-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M0,0 L10,5 L0,10 z" fill="${INK2}"/>
</marker>
</defs>
${inner}
</svg>
${cap}
</figure>`
}

// ---------------------------------------------------------------------------
// 1. RIGHT-ANGLED TRIANGLE — Pythagoras / SOHCAHTOA
// params: opposite, adjacent, hypotenuse (labels, '?' for unknown), angle (deg),
//         angleLabel, unknown ('opposite'|'adjacent'|'hypotenuse'|'angle'), caption
// ---------------------------------------------------------------------------
export function rightTriangle(id: string, p: DiagramParams): string {
  const B = { x: 60, y: 190 } // right-angle vertex
  const C = { x: 270, y: 190 } // angle vertex (base right)
  const A = { x: 60, y: 40 } // top vertex

  const opposite = s(p, 'opposite', '')
  const adjacent = s(p, 'adjacent', '')
  const hypotenuse = s(p, 'hypotenuse', '')
  const hideAngle = s(p, 'hideAngle', '') === 'true'
  const angleLabel = s(p, 'angleLabel', s(p, 'angle', 'θ') + '°')
  const unknown = s(p, 'unknown', '')

  const colFor = (part: string) => (unknown === part ? GOLD : INK)

  const inner = `
<line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${B.x}" y1="${B.y}" x2="${A.x}" y2="${A.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="${INK2}" stroke-width="2.5"/>
<rect x="${B.x}" y="${B.y - 14}" width="14" height="14" fill="none" stroke="${INK3}" stroke-width="1.5"/>
${hideAngle ? '' : `<path d="${arcPath(C.x, C.y, 28, 180, 234)}" fill="none" stroke="${unknown === 'angle' ? GOLD : GREEN}" stroke-width="1.5"/>
${label(C.x - 40, C.y - 14, angleLabel, { color: unknown === 'angle' ? GOLD : GREEN, size: 13, anchor: 'end', weight: unknown === 'angle' ? 700 : 600 })}`}
${label(B.x - 16, (A.y + B.y) / 2, opposite, { color: colFor('opposite'), size: 15, anchor: 'end', weight: 700 })}
${label((B.x + C.x) / 2, B.y + 24, adjacent, { color: colFor('adjacent'), size: 15, weight: 700 })}
${label((A.x + C.x) / 2 + 14, (A.y + C.y) / 2 - 6, hypotenuse, { color: colFor('hypotenuse'), size: 15, anchor: 'start', weight: 700 })}
${label(A.x - 10, A.y + 4, 'A', { color: INK3, size: 11, anchor: 'end' })}
${label(B.x - 10, B.y + 16, 'B', { color: INK3, size: 11, anchor: 'end' })}
${label(C.x + 14, C.y + 4, 'C', { color: INK3, size: 11, anchor: 'start' })}
`
  return wrap(id, inner, '0 0 320 220', p.caption)
}

// ---------------------------------------------------------------------------
// 2. GENERAL (SCALENE) TRIANGLE — sine rule / cosine rule / area = 1/2 ab sin C
// params: sideA, sideB, sideC (opposite A,B,C), angleA, angleB, angleC, unknown
// ---------------------------------------------------------------------------
export function generalTriangle(id: string, p: DiagramParams): string {
  const A = { x: 150, y: 30 }
  const B = { x: 30, y: 210 }
  const C = { x: 290, y: 210 }

  const sideA = s(p, 'sideA', '')
  const sideB = s(p, 'sideB', '')
  const sideC = s(p, 'sideC', '')
  const angleA = s(p, 'angleA', '')
  const angleB = s(p, 'angleB', '')
  const angleC = s(p, 'angleC', '')
  const unknown = s(p, 'unknown', '')
  const colFor = (part: string) => (unknown === part ? GOLD : INK)

  const inner = `
<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${B.x}" y1="${B.y}" x2="${C.x}" y2="${C.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${C.x}" y1="${C.y}" x2="${A.x}" y2="${A.y}" stroke="${INK2}" stroke-width="2.5"/>
${label(A.x, A.y - 10, 'A', { color: INK3, size: 12 })}
${label(B.x - 12, B.y + 14, 'B', { color: INK3, size: 12, anchor: 'end' })}
${label(C.x + 12, C.y + 14, 'C', { color: INK3, size: 12, anchor: 'start' })}
${sideA ? label((B.x + C.x) / 2, B.y + 24, `a = ${sideA}`, { color: colFor('a'), size: 14, weight: 700 }) : ''}
${sideB ? label((A.x + C.x) / 2 + 26, (A.y + C.y) / 2, `b = ${sideB}`, { color: colFor('b'), size: 14, weight: 700, anchor: 'start' }) : ''}
${sideC ? label((A.x + B.x) / 2 - 26, (A.y + B.y) / 2, `c = ${sideC}`, { color: colFor('c'), size: 14, weight: 700, anchor: 'end' }) : ''}
${angleA ? label(A.x, A.y + 26, `${angleA}°`, { color: colFor('A'), size: 13 }) : ''}
${angleB ? label(B.x + 26, B.y - 12, `${angleB}°`, { color: colFor('B'), size: 13, anchor: 'start' }) : ''}
${angleC ? label(C.x - 26, C.y - 12, `${angleC}°`, { color: colFor('C'), size: 13, anchor: 'end' }) : ''}
`
  return wrap(id, inner, '0 0 320 230', p.caption)
}

// ---------------------------------------------------------------------------
// 3. BEARINGS
// params: bearing (0-360), fromLabel, toLabel, caption
// ---------------------------------------------------------------------------
export function bearing(id: string, p: DiagramParams): string {
  const O = { x: 100, y: 190 }
  const brg = n(p, 'bearing', 60)
  const theta = -90 + brg
  const P = polar(O.x, O.y, 130, theta)
  const northTop = { x: O.x, y: O.y - 150 }
  const fromLabel = s(p, 'fromLabel', 'A')
  const toLabel = s(p, 'toLabel', 'B')

  const inner = `
<line x1="${O.x}" y1="${O.y}" x2="${northTop.x}" y2="${northTop.y}" stroke="${INK3}" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#${id}-arrow)"/>
${label(O.x, northTop.y - 12, 'N', { color: INK3, size: 14, weight: 700 })}
<path d="${arcPath(O.x, O.y, 40, -90, theta)}" fill="none" stroke="${GOLD}" stroke-width="2"/>
${label(O.x + (brg < 180 ? 34 : -34), O.y - 46, `${brg}°`, { color: GOLD, size: 13, weight: 700 })}
<line x1="${O.x}" y1="${O.y}" x2="${P.x.toFixed(1)}" y2="${P.y.toFixed(1)}" stroke="${INK2}" stroke-width="2.5" marker-end="url(#${id}-arrow)"/>
<circle cx="${O.x}" cy="${O.y}" r="3.5" fill="${INK}"/>
${label(O.x - 10, O.y + 16, fromLabel, { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label(P.x + (Math.cos((theta * Math.PI) / 180) >= 0 ? 12 : -12), P.y, toLabel, { color: INK, size: 13, weight: 700, anchor: Math.cos((theta * Math.PI) / 180) >= 0 ? 'start' : 'end' })}
`
  return wrap(id, inner, '0 0 300 220', p.caption)
}

// ---------------------------------------------------------------------------
// 4. CIRCLE — parts / arc & sector / segment
// params: variant ('basic'|'sector'|'segment'|'tangent'), angle (sector deg), radiusLabel, caption
// ---------------------------------------------------------------------------
export function circle(id: string, p: DiagramParams): string {
  const cx = 160
  const cy = 120
  const r = 88
  const variant = s(p, 'variant', 'basic')
  const angleDeg = n(p, 'angle', 120)
  const radiusLabel = s(p, 'radiusLabel', 'r')

  const base = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK2}" stroke-width="2.5"/>`
  const centreDot = `<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/>${label(cx, cy - 10, 'O', { color: INK3, size: 12 })}`

  if (variant === 'sector') {
    const start = -90
    const end = start + angleDeg
    const p1 = polar(cx, cy, r, start)
    const p2 = polar(cx, cy, r, end)
    const large = angleDeg > 180 ? 1 : 0
    const arcLabelPt = polar(cx, cy, r + 18, start + angleDeg / 2)
    const inner = `
${base}
<path d="M ${cx} ${cy} L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2"/>
${centreDot}
${label((cx + p1.x) / 2 - 8, (cy + p1.y) / 2, radiusLabel, { color: INK, size: 13, anchor: 'end' })}
<path d="${arcPath(cx, cy, 30, start, end)}" fill="none" stroke="${GOLD}" stroke-width="2"/>
${label(cx, cy - 42, `${angleDeg}°`, { color: GOLD, size: 13, weight: 700 })}
${label(arcLabelPt.x, arcLabelPt.y, 'arc', { color: GREEN, size: 12, italic: true })}
`
    return wrap(id, inner, '0 0 320 240', p.caption)
  }

  if (variant === 'segment') {
    const start = -90 - angleDeg / 2
    const end = -90 + angleDeg / 2
    const p1 = polar(cx, cy, r, start)
    const p2 = polar(cx, cy, r, end)
    const large = angleDeg > 180 ? 1 : 0
    const inner = `
${base}
<path d="M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z" fill="${GOLD_SOFT}" stroke="${GOLD}" stroke-width="2"/>
<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${GOLD}" stroke-width="2"/>
${centreDot}
${label((p1.x + p2.x) / 2, p1.y - 10, 'chord', { color: GOLD, size: 12, italic: true })}
`
    return wrap(id, inner, '0 0 320 240', p.caption)
  }

  if (variant === 'tangent') {
    const touch = polar(cx, cy, r, -90)
    const inner = `
${base}
<line x1="${cx}" y1="${cy}" x2="${touch.x}" y2="${touch.y}" stroke="${INK2}" stroke-width="2"/>
${label(cx - 10, (cy + touch.y) / 2, radiusLabel, { color: INK, size: 13, anchor: 'end' })}
<line x1="${touch.x - 110}" y1="${touch.y}" x2="${touch.x + 110}" y2="${touch.y}" stroke="${GOLD}" stroke-width="2.5"/>
<rect x="${touch.x - 12}" y="${touch.y}" width="12" height="12" fill="none" stroke="${INK3}" stroke-width="1.5"/>
${centreDot}
${label(touch.x + 118, touch.y + 4, 'tangent', { color: GOLD, size: 12, italic: true, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 240', p.caption)
  }

  // basic: centre, radius, diameter
  const rEnd = polar(cx, cy, r, -20)
  const inner = `
${base}
<line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${INK4}" stroke-width="1.5" stroke-dasharray="4,3"/>
${label(cx, cy + 30, 'diameter', { color: INK3, size: 11, italic: true })}
<line x1="${cx}" y1="${cy}" x2="${rEnd.x.toFixed(1)}" y2="${rEnd.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2.5"/>
${label((cx + rEnd.x) / 2 + 4, (cy + rEnd.y) / 2 - 8, radiusLabel, { color: GREEN, size: 14, weight: 700 })}
${centreDot}
`
  return wrap(id, inner, '0 0 320 240', p.caption)
}

// ---------------------------------------------------------------------------
// 5. ANGLES — straight line / point / parallel lines / exterior angle / polygon
// ---------------------------------------------------------------------------
export function angle(id: string, p: DiagramParams): string {
  const variant = s(p, 'variant', 'straight-line')

  if (variant === 'straight-line') {
    const O = { x: 160, y: 150 }
    const splitAngle = n(p, 'split', 118)
    const rayEnd = polar(O.x, O.y, 100, -splitAngle)
    const val1 = s(p, 'value1', `${splitAngle}°`)
    const val2 = s(p, 'value2', `${180 - splitAngle}°`)
    const inner = `
<line x1="20" y1="${O.y}" x2="300" y2="${O.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${O.x}" y1="${O.y}" x2="${rayEnd.x.toFixed(1)}" y2="${rayEnd.y.toFixed(1)}" stroke="${INK2}" stroke-width="2.5"/>
<path d="${arcPath(O.x, O.y, 34, 180, 180 + splitAngle)}" fill="none" stroke="${GOLD}" stroke-width="1.8"/>
<path d="${arcPath(O.x, O.y, 50, 180 + splitAngle, 360)}" fill="none" stroke="${GREEN}" stroke-width="1.8"/>
${label(O.x - 40, O.y - 20, val1, { color: GOLD, size: 14, weight: 700 })}
${label(O.x + 46, O.y - 14, val2, { color: GREEN, size: 14, weight: 700 })}
<circle cx="${O.x}" cy="${O.y}" r="2.5" fill="${INK}"/>
`
    return wrap(id, inner, '0 0 320 200', p.caption)
  }

  if (variant === 'point') {
    const O = { x: 160, y: 130 }
    const anglesRaw = s(p, 'angles', '90,90,90,90').split(',').map(v => parseFloat(v.trim()))
    let cursor = -90
    let rays: number[] = [cursor]
    for (const a of anglesRaw) { cursor += a; rays.push(cursor) }
    let paths = ''
    const colors = [GOLD, GREEN, 'var(--navy)', 'var(--burgundy)', GOLD]
    for (let i = 0; i < anglesRaw.length; i++) {
      const rEnd = polar(O.x, O.y, 90, rays[i])
      paths += `<line x1="${O.x}" y1="${O.y}" x2="${rEnd.x.toFixed(1)}" y2="${rEnd.y.toFixed(1)}" stroke="${INK2}" stroke-width="2.2"/>`
      const mid = rays[i] + anglesRaw[i] / 2
      const arcR = 26 + (i % 2) * 10
      paths += `<path d="${arcPath(O.x, O.y, arcR, rays[i], rays[i + 1])}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="1.8"/>`
      const lp = polar(O.x, O.y, arcR + 16, mid)
      paths += label(lp.x, lp.y, `${anglesRaw[i]}°`, { color: colors[i % colors.length], size: 12.5, weight: 700 })
    }
    return wrap(id, `${paths}<circle cx="${O.x}" cy="${O.y}" r="2.5" fill="${INK}"/>`, '0 0 320 220', p.caption)
  }

  if (variant === 'parallel') {
    const y1 = 80
    const y2 = 170
    const pairType = s(p, 'pairType', 'corresponding')
    const known = s(p, 'known', '65')
    const positions: Record<number, { x: number; y: number }> = {
      1: { x: 110, y: y1 - 14 }, 2: { x: 180, y: y1 - 14 },
      3: { x: 110, y: y1 + 22 }, 4: { x: 180, y: y1 + 22 },
      5: { x: 110, y: y2 - 14 }, 6: { x: 180, y: y2 - 14 },
      7: { x: 110, y: y2 + 22 }, 8: { x: 180, y: y2 + 22 },
    }
    const pairs: Record<string, [number, number]> = {
      corresponding: [2, 6], alternate: [4, 6], 'co-interior': [3, 6],
    }
    const [posA, posB] = pairs[pairType] || pairs.corresponding
    const inner = `
<line x1="20" y1="${y1}" x2="300" y2="${y1}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="20" y1="${y2}" x2="300" y2="${y2}" stroke="${INK2}" stroke-width="2.5"/>
${label(305, y1 + 4, '▷', { color: INK3, size: 12 })}${label(305, y2 + 4, '▷', { color: INK3, size: 12 })}
<line x1="70" y1="30" x2="250" y2="220" stroke="${INK2}" stroke-width="2.5"/>
${Object.entries(positions).map(([num, pos]) => {
  const isA = Number(num) === posA
  const isB = Number(num) === posB
  const color = isA || isB ? GOLD : INK4
  const text = isA ? `${known}°` : isB ? '?' : ''
  return text ? label(pos.x, pos.y, text, { color, size: 13, weight: 700 }) : ''
}).join('')}
`
    return wrap(id, inner, '0 0 320 240', p.caption || `${pairType} angles are equal`)
  }

  if (variant === 'exterior') {
    const A = { x: 150, y: 30 }
    const B = { x: 60, y: 190 }
    const C = { x: 260, y: 190 }
    const D = { x: 320, y: 190 } // extension of BC beyond C
    const angA = s(p, 'angleA', '50')
    const angB = s(p, 'angleB', '70')
    const inner = `
<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${A.x}" y1="${A.y}" x2="${C.x}" y2="${C.y}" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${B.x}" y1="${B.y}" x2="${D.x}" y2="${D.y}" stroke="${INK2}" stroke-width="2.5" stroke-dasharray="0"/>
${label(A.x, A.y - 10, 'A', { color: INK3, size: 12 })}
${label(B.x - 14, B.y + 4, 'B', { color: INK3, size: 12, anchor: 'end' })}
${label(C.x, C.y + 18, 'C', { color: INK3, size: 12 })}
<path d="${arcPath(B.x, B.y, 26, -50, 0)}" fill="none" stroke="${GREEN}" stroke-width="1.6"/>
${label(B.x + 30, B.y - 10, `${angB}°`, { color: GREEN, size: 12.5, weight: 700 })}
<path d="${arcPath(A.x, A.y, 26, 55, 119)}" fill="none" stroke="${GREEN}" stroke-width="1.6"/>
${label(A.x, A.y + 40, `${angA}°`, { color: GREEN, size: 12.5, weight: 700 })}
<path d="${arcPath(C.x, C.y, 40, -55, 0)}" fill="none" stroke="${GOLD}" stroke-width="1.8"/>
${label(C.x + 44, C.y - 16, `${angA}+${angB}°`, { color: GOLD, size: 12.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 340 220', p.caption || 'exterior angle = sum of the two opposite interior angles')
  }

  // polygon (default fallback)
  const sides = Math.max(3, Math.round(n(p, 'sides', 6)))
  const cx = 160, cy = 120, r = 80
  let pts: { x: number; y: number }[] = []
  for (let i = 0; i < sides; i++) pts.push(polar(cx, cy, r, -90 + (360 / sides) * i))
  const pathD = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ') + ' Z'
  const v0 = pts[0]
  const v1 = pts[1]
  const extEnd = { x: v0.x + (v0.x - v1.x) * 0.6, y: v0.y + (v0.y - v1.y) * 0.6 }
  const interior = ((sides - 2) * 180) / sides
  const exterior = 360 / sides
  const inner = `
<path d="${pathD}" fill="none" stroke="${INK2}" stroke-width="2.5"/>
<line x1="${v1.x.toFixed(1)}" y1="${v1.y.toFixed(1)}" x2="${extEnd.x.toFixed(1)}" y2="${extEnd.y.toFixed(1)}" stroke="${INK3}" stroke-width="2" stroke-dasharray="4,3"/>
${label(cx, cy, `${sides}-sided`, { color: INK3, size: 12, italic: true })}
${label(v0.x, v0.y - 14, `int. ${interior.toFixed(0)}°`, { color: GREEN, size: 11.5, weight: 700 })}
${label(extEnd.x + 8, extEnd.y, `ext. ${exterior.toFixed(0)}°`, { color: GOLD, size: 11.5, weight: 700 })}
`
  return wrap(id, inner, '0 0 320 240', p.caption)
}

// ---------------------------------------------------------------------------
// 6. COORDINATE TRANSFORMATIONS — reflect / rotate / translate / enlarge
// ---------------------------------------------------------------------------
type Pt = [number, number]

function parsePts(str: string, fallback: Pt[]): Pt[] {
  if (!str) return fallback
  try {
    return str.split(';').map(pair => {
      const [x, y] = pair.split(',').map(Number)
      return [x, y] as Pt
    })
  } catch { return fallback }
}

export function transform(id: string, p: DiagramParams): string {
  const variant = s(p, 'variant', 'reflect')
  const origin = { x: 160, y: 160 }
  const scale = 18
  const range = 8 // grid units shown in each direction from the origin

  const toPx = ([x, y]: Pt) => [origin.x + x * scale, origin.y - y * scale] as Pt

  const shape: Pt[] = parsePts(p.shape, [[1, 1], [3, 1], [1, 4]])

  const gmin = origin.x - range * scale, gmax = origin.x + range * scale
  const gminY = origin.y - range * scale, gmaxY = origin.y + range * scale
  let gridLines = ''
  for (let i = -range; i <= range; i++) {
    gridLines += `<line x1="${origin.x + i * scale}" y1="${gminY}" x2="${origin.x + i * scale}" y2="${gmaxY}" stroke="${RULE}" stroke-width="1"/>`
    gridLines += `<line x1="${gmin}" y1="${origin.y - i * scale}" x2="${gmax}" y2="${origin.y - i * scale}" stroke="${RULE}" stroke-width="1"/>`
  }
  const axes = `<line x1="${origin.x}" y1="${gminY}" x2="${origin.x}" y2="${gmaxY}" stroke="${INK3}" stroke-width="1.6"/><line x1="${gmin}" y1="${origin.y}" x2="${gmax}" y2="${origin.y}" stroke="${INK3}" stroke-width="1.6"/>`

  const shapePath = (pts: Pt[], color: string, fill: string, dash = false) => {
    const px = pts.map(toPx)
    if (px.length === 1) {
      return `<circle cx="${px[0][0].toFixed(1)}" cy="${px[0][1].toFixed(1)}" r="4.5" fill="${color}"/>`
    }
    const d = px.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`).join(' ') + ' Z'
    return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="2.5"${dash ? ' stroke-dasharray="5,3"' : ''}/>`
  }

  let transformed: Pt[] = shape
  let extra = ''

  if (variant === 'reflect') {
    const line = s(p, 'line', 'y-axis')
    if (line === 'x-axis') {
      transformed = shape.map(([x, y]) => [x, -y] as Pt)
      extra = `<line x1="${gmin}" y1="${origin.y}" x2="${gmax}" y2="${origin.y}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6,4"/>`
    } else if (line === 'y=x') {
      transformed = shape.map(([x, y]) => [y, x] as Pt)
      const p1 = toPx([-range, -range]); const p2 = toPx([range, range])
      extra = `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6,4"/>${label(p2[0] - 6, p2[1] + 14, 'y = x', { color: GOLD, size: 12, anchor: 'end' })}`
    } else if (line === 'y=-x') {
      transformed = shape.map(([x, y]) => [-y, -x] as Pt)
      const p1 = toPx([-range, range]); const p2 = toPx([range, -range])
      extra = `<line x1="${p1[0]}" y1="${p1[1]}" x2="${p2[0]}" y2="${p2[1]}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6,4"/>${label(p2[0] - 6, p2[1] - 8, 'y = -x', { color: GOLD, size: 12, anchor: 'end' })}`
    } else {
      transformed = shape.map(([x, y]) => [-x, y] as Pt)
      extra = `<line x1="${origin.x}" y1="${gminY}" x2="${origin.x}" y2="${gmaxY}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6,4"/>`
    }
  } else if (variant === 'rotate') {
    const cxU = n(p, 'cx', 0), cyU = n(p, 'cy', 0)
    const deg = n(p, 'angle', 90)
    const rad = (deg * Math.PI) / 180
    transformed = shape.map(([x, y]) => {
      const dx = x - cxU, dy = y - cyU
      return [cxU + dx * Math.cos(rad) - dy * Math.sin(rad), cyU + dx * Math.sin(rad) + dy * Math.cos(rad)] as Pt
    })
    const centrePx = toPx([cxU, cyU])
    extra = `<circle cx="${centrePx[0]}" cy="${centrePx[1]}" r="4" fill="${GOLD}"/>${label(centrePx[0] - 10, centrePx[1] - 8, 'centre', { color: GOLD, size: 11, anchor: 'end', italic: true })}`
  } else if (variant === 'translate') {
    const dx = n(p, 'dx', 4), dy = n(p, 'dy', 2)
    transformed = shape.map(([x, y]) => [x + dx, y + dy] as Pt)
    const from = toPx(shape[0]); const to = toPx(transformed[0])
    extra = `<line x1="${from[0]}" y1="${from[1]}" x2="${to[0]}" y2="${to[1]}" stroke="${GOLD}" stroke-width="2.2" marker-end="url(#${id}-arrow)"/>${label((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 - 10, `(${dx}, ${dy})`, { color: GOLD, size: 12, weight: 700 })}`
  } else if (variant === 'enlarge') {
    const cxU = n(p, 'cx', 0), cyU = n(p, 'cy', 0)
    const k = n(p, 'scaleFactor', 2)
    transformed = shape.map(([x, y]) => [cxU + (x - cxU) * k, cyU + (y - cyU) * k] as Pt)
    const centrePx = toPx([cxU, cyU])
    const rays = shape.map((pt, i) => {
      const to = toPx(transformed[i])
      return `<line x1="${centrePx[0]}" y1="${centrePx[1]}" x2="${to[0].toFixed(1)}" y2="${to[1].toFixed(1)}" stroke="${INK4}" stroke-width="1.2" stroke-dasharray="3,3"/>`
    }).join('')
    extra = `${rays}<circle cx="${centrePx[0]}" cy="${centrePx[1]}" r="4" fill="${GOLD}"/>${label(centrePx[0] - 10, centrePx[1] - 8, 'centre', { color: GOLD, size: 11, anchor: 'end', italic: true })}${label(origin.x, gmaxY + 16, `scale factor ${k}`, { color: GOLD, size: 12, weight: 700 })}`
  }

  const inner = `
${gridLines}${axes}
${extra}
${shapePath(shape, GREEN, 'var(--green-soft)')}
${shapePath(transformed, GOLD, 'none', true)}
`
  return wrap(id, inner, `0 0 320 ${gmaxY + 30}`, p.caption)
}

// ---------------------------------------------------------------------------
// 7. 2D SHAPE — area/perimeter (triangle / parallelogram / trapezium)
// ---------------------------------------------------------------------------
export function shape2d(id: string, p: DiagramParams): string {
  const variant = s(p, 'variant', 'parallelogram')
  const base = s(p, 'base', '8 cm')
  const height = s(p, 'height', '5 cm')

  if (variant === 'triangle-base-height') {
    const B = { x: 40, y: 190 }, C = { x: 280, y: 190 }, A = { x: 150, y: 40 }
    const foot = { x: A.x, y: B.y }
    const inner = `
<path d="M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<line x1="${A.x}" y1="${A.y}" x2="${foot.x}" y2="${foot.y}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="${foot.x - 12}" y="${foot.y - 12}" width="12" height="12" fill="none" stroke="${INK3}" stroke-width="1.3"/>
${label((B.x + C.x) / 2, B.y + 24, `base = ${base}`, { color: INK, size: 13, weight: 700 })}
${label(A.x + 12, (A.y + foot.y) / 2, `height = ${height}`, { color: GOLD, size: 13, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (variant === 'trapezium') {
    const topLen = 120, botLen = 220, h = 120
    const topY = 60, botY = topY + h
    const A = { x: 100, y: topY }, D = { x: 100 + topLen, y: topY }
    const B = { x: 40, y: botY }, C = { x: 40 + botLen, y: botY }
    const a = s(p, 'a', 'a')
    const b = s(p, 'b', 'b')
    const inner = `
<path d="M ${A.x} ${A.y} L ${D.x} ${D.y} L ${C.x} ${C.y} L ${B.x} ${B.y} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<line x1="${A.x}" y1="${A.y}" x2="${A.x}" y2="${B.y}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="${A.x - 12}" y="${A.y}" width="12" height="12" fill="none" stroke="${INK3}" stroke-width="1.3"/>
${label((A.x + D.x) / 2, A.y - 12, `${a}`, { color: INK, size: 13, weight: 700 })}
${label((B.x + C.x) / 2, B.y + 24, `${b}`, { color: INK, size: 13, weight: 700 })}
${label(A.x - 16, (A.y + B.y) / 2, height, { color: GOLD, size: 13, weight: 700, anchor: 'end' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (variant === 'rectangle') {
    const w = 220, h = 130
    const x0 = 50, y0 = 50
    const inner = `
<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
${label(x0 + w / 2, y0 + h + 22, base, { color: INK, size: 14, weight: 700 })}
${label(x0 - 14, y0 + h / 2, height, { color: INK, size: 14, weight: 700, anchor: 'end' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (variant === 'lshape') {
    const w = n(p, 'width', 10), h = n(p, 'height', 8)
    const cw = n(p, 'cutWidth', 4), ch = n(p, 'cutHeight', 3)
    const scale = 18
    const x0 = 50, y0 = 40
    const W = w * scale, H = h * scale, CW = cw * scale, CH = ch * scale
    // full rectangle with top-right corner notch cut out
    const pts = [
      [x0, y0], [x0 + W, y0], [x0 + W, y0 + CH], [x0 + W - CW, y0 + CH],
      [x0 + W - CW, y0 + H], [x0, y0 + H],
    ]
    const pathD = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`).join(' ') + ' Z'
    const inner = `
<rect x="${x0 + W - CW}" y="${y0}" width="${CW}" height="${CH}" fill="none" stroke="${INK4}" stroke-width="1.5" stroke-dasharray="4,3"/>
<path d="${pathD}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
${label(x0 + W / 2, y0 + H + 22, s(p, 'widthLabel', `${w} m`), { color: INK, size: 13, weight: 700 })}
${label(x0 - 14, y0 + H / 2, s(p, 'heightLabel', `${h} m`), { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label(x0 + W - CW / 2, y0 - 10, s(p, 'cutWidthLabel', `${cw} m`), { color: GOLD, size: 12.5, weight: 700 })}
${label(x0 + W + 14, y0 + CH / 2, s(p, 'cutHeightLabel', `${ch} m`), { color: GOLD, size: 12.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 340 240', p.caption || 'Full rectangle minus the cut-out corner')
  }

  if (variant === 'rectangle-semicircle-cutout') {
    const w = n(p, 'width', 14), h = n(p, 'height', 6)
    const scale = 16
    const x0 = 60, y0 = 60
    const W = w * scale, H = h * scale
    const r = (n(p, 'diameter', 6) * scale) / 2
    const cx = x0 + W / 2, cy = y0
    const inner = `
<path d="M ${x0} ${y0} L ${x0 + W} ${y0} L ${x0 + W} ${y0 + H} L ${x0} ${y0 + H} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="var(--paper)" stroke="${GOLD}" stroke-width="2.2"/>
${label(x0 + W / 2, y0 + H + 24, s(p, 'widthLabel', `${w} cm`), { color: INK, size: 13, weight: 700 })}
${label(x0 - 14, y0 + H / 2, s(p, 'heightLabel', `${h} cm`), { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label(cx, cy + r + 16, s(p, 'diameterLabel', `d = ${n(p, 'diameter', 6)} cm`), { color: GOLD, size: 12.5, weight: 700 })}
`
    return wrap(id, inner, '0 0 340 240', p.caption || 'Rectangle with a semicircle removed')
  }

  if (variant === 'rectangle-semicircle-end') {
    const w = n(p, 'width', 10), h = n(p, 'height', 6)
    const scale = 18
    const x0 = 50, y0 = 50
    const W = w * scale, H = h * scale
    const r = H / 2
    const cx = x0 + W, cy = y0 + H / 2
    const inner = `
<path d="M ${x0} ${y0} L ${x0 + W} ${y0} A ${r} ${r} 0 0 1 ${x0 + W} ${y0 + H} L ${x0} ${y0 + H} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<line x1="${x0 + W}" y1="${y0}" x2="${x0 + W}" y2="${y0 + H}" stroke="${INK4}" stroke-width="1.3" stroke-dasharray="3,3"/>
${label(x0 + W / 2, y0 + H + 24, s(p, 'widthLabel', `${w} cm`), { color: INK, size: 13, weight: 700 })}
${label(x0 - 14, cy, s(p, 'heightLabel', `${h} cm`), { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label(cx + r + 12, cy, s(p, 'diameterLabel', `d = ${h} cm`), { color: GOLD, size: 12.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 340 220', p.caption || 'A rectangle with a semicircle added to one short end')
  }

  if (variant === 'rectangle-plus-trapezium') {
    const rw = n(p, 'width', 12), rh = n(p, 'height', 5)
    const topLen = n(p, 'top', 8)
    const trapH = n(p, 'trapHeight', 4)
    const scale = 16
    const x0 = 70, rectY = 100
    const RW = rw * scale, RH = rh * scale, TH = trapH * scale, TOP = topLen * scale
    const inner = `
<rect x="${x0}" y="${rectY}" width="${RW}" height="${RH}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<path d="M ${x0} ${rectY} L ${x0 + (RW - TOP) / 2} ${rectY - TH} L ${x0 + (RW + TOP) / 2} ${rectY - TH} L ${x0 + RW} ${rectY} Z" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
${label(x0 + RW / 2, rectY + RH + 22, s(p, 'widthLabel', `${rw} cm`), { color: INK, size: 13, weight: 700 })}
${label(x0 - 14, rectY + RH / 2, s(p, 'heightLabel', `${rh} cm`), { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label(x0 + RW / 2, rectY - TH - 10, s(p, 'topLabel', `${topLen} cm`), { color: GOLD, size: 12.5, weight: 700 })}
`
    return wrap(id, inner, '0 0 340 240', p.caption || 'A rectangle with a trapezium on top')
  }

  // parallelogram (default)
  const skew = 60
  const A = { x: 60 + skew, y: 50 }, D = { x: 260 + skew, y: 50 }
  const B = { x: 60, y: 190 }, C = { x: 260, y: 190 }
  const foot = { x: A.x, y: B.y }
  const inner = `
<path d="M ${A.x} ${A.y} L ${D.x} ${D.y} L ${C.x} ${C.y} L ${B.x} ${B.y} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.5"/>
<line x1="${A.x}" y1="${A.y}" x2="${foot.x}" y2="${foot.y}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5,3"/>
<rect x="${foot.x - 12}" y="${foot.y - 12}" width="12" height="12" fill="none" stroke="${INK3}" stroke-width="1.3"/>
${label((B.x + C.x) / 2, B.y + 24, `base = ${base}`, { color: INK, size: 13, weight: 700 })}
${label(A.x + 12, (A.y + foot.y) / 2, `height = ${height}`, { color: GOLD, size: 13, weight: 700, anchor: 'start' })}
`
  return wrap(id, inner, '0 0 340 220', p.caption)
}

// ---------------------------------------------------------------------------
// 8. CIRCLE THEOREMS — centre/circumference, semicircle, cyclic quadrilateral
// ---------------------------------------------------------------------------
export function circleTheorem(id: string, p: DiagramParams): string {
  const cx = 160, cy = 120, r = 85
  const theorem = s(p, 'theorem', 'centre-circumference')
  const base = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK3}" stroke-width="2"/>`

  if (theorem === 'centre-circumference') {
    const centreAngle = n(p, 'centreAngle', 130)
    const aTheta = -90 - centreAngle / 2
    const bTheta = -90 + centreAngle / 2
    const cTheta = 100 // point C on the major arc, roughly opposite
    const A = polar(cx, cy, r, aTheta)
    const B = polar(cx, cy, r, bTheta)
    const C = polar(cx, cy, r, cTheta)
    const inner = `
${base}
<line x1="${cx}" y1="${cy}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="${INK2}" stroke-width="2"/>
<line x1="${cx}" y1="${cy}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="${INK2}" stroke-width="2"/>
<line x1="${C.x.toFixed(1)}" y1="${C.y.toFixed(1)}" x2="${A.x.toFixed(1)}" y2="${A.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2"/>
<line x1="${C.x.toFixed(1)}" y1="${C.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2"/>
<path d="${arcPath(cx, cy, 24, aTheta, bTheta)}" fill="none" stroke="${GOLD}" stroke-width="2"/>
${label(cx, cy - 32, `${centreAngle}°`, { color: GOLD, size: 13, weight: 700 })}
<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/>${label(cx + 8, cy + 4, 'O', { color: INK3, size: 12 })}
${label(A.x - 10, A.y, 'A', { color: INK3, size: 12, anchor: 'end' })}
${label(B.x + 10, B.y, 'B', { color: INK3, size: 12, anchor: 'start' })}
${label(C.x, C.y - 10, 'C', { color: INK3, size: 12 })}
${label(C.x, C.y + 26, `${(centreAngle / 2).toFixed(0)}°`, { color: GREEN, size: 12.5, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 240', p.caption || 'Angle at the centre (gold) is twice the angle at the circumference (green)')
  }

  if (theorem === 'semicircle') {
    const A = polar(cx, cy, r, 180)
    const C = polar(cx, cy, r, 0)
    const B = polar(cx, cy, r, -35)
    const inner = `
${base}
<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${C.x.toFixed(1)}" y2="${C.y.toFixed(1)}" stroke="${INK4}" stroke-width="1.5" stroke-dasharray="4,3"/>
<line x1="${A.x.toFixed(1)}" y1="${A.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2"/>
<line x1="${C.x.toFixed(1)}" y1="${C.y.toFixed(1)}" x2="${B.x.toFixed(1)}" y2="${B.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2"/>
<rect x="${B.x - 11}" y="${B.y}" width="11" height="11" fill="none" stroke="${GOLD}" stroke-width="1.8" transform="rotate(70 ${B.x} ${B.y})"/>
${label(A.x - 10, A.y + 4, 'A', { color: INK3, size: 12, anchor: 'end' })}
${label(C.x + 10, C.y + 4, 'C', { color: INK3, size: 12, anchor: 'start' })}
${label(B.x, B.y - 12, 'B', { color: INK3, size: 12 })}
${label(B.x + 6, B.y + 22, '90°', { color: GOLD, size: 12.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 240', p.caption || 'AC is a diameter, so the angle at B on the circumference is always 90°')
  }

  // cyclic-quad
  const angA = n(p, 'angleA', 100)
  const angC = 180 - angA
  const A = polar(cx, cy, r, -140)
  const B = polar(cx, cy, r, -40)
  const C = polar(cx, cy, r, 60)
  const D = polar(cx, cy, r, 200)
  const inner = `
${base}
<path d="M ${A.x.toFixed(1)} ${A.y.toFixed(1)} L ${B.x.toFixed(1)} ${B.y.toFixed(1)} L ${C.x.toFixed(1)} ${C.y.toFixed(1)} L ${D.x.toFixed(1)} ${D.y.toFixed(1)} Z" fill="none" stroke="${INK2}" stroke-width="2.2"/>
${label(A.x - 8, A.y - 6, 'A', { color: GOLD, size: 12, weight: 700, anchor: 'end' })}
${label(B.x + 8, B.y - 6, 'B', { color: INK3, size: 12, anchor: 'start' })}
${label(C.x + 8, C.y + 10, 'C', { color: GREEN, size: 12, weight: 700, anchor: 'start' })}
${label(D.x - 8, D.y + 10, 'D', { color: INK3, size: 12, anchor: 'end' })}
${label(A.x + 18, A.y + 14, `${angA}°`, { color: GOLD, size: 12.5, weight: 700 })}
${label(C.x - 18, C.y - 14, `${angC}°`, { color: GREEN, size: 12.5, weight: 700 })}
`
  return wrap(id, inner, '0 0 320 240', p.caption || 'ABCD is a cyclic quadrilateral: opposite angles A and C sum to 180°')
}

// ---------------------------------------------------------------------------
// SYMMETRY — regular polygon with all lines of symmetry drawn
// params: sides (default 5), caption
// ---------------------------------------------------------------------------
export function symmetryDiagram(id: string, p: DiagramParams): string {
  const sides = Math.max(3, Math.round(n(p, 'sides', 5)))
  const cx = 160, cy = 120, r = 85
  let pts: { x: number; y: number }[] = []
  for (let i = 0; i < sides; i++) pts.push(polar(cx, cy, r, -90 + (360 / sides) * i))
  const pathD = pts.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join(' ') + ' Z'

  let lines = ''
  for (let i = 0; i < sides; i++) {
    const vAngle = -90 + (360 / sides) * i
    const far = polar(cx, cy, r + 14, vAngle)
    const near = polar(cx, cy, r + 14, vAngle + 180)
    lines += `<line x1="${near.x.toFixed(1)}" y1="${near.y.toFixed(1)}" x2="${far.x.toFixed(1)}" y2="${far.y.toFixed(1)}" stroke="${GOLD}" stroke-width="1.3" stroke-dasharray="4,3"/>`
  }

  const inner = `
${lines}
<path d="${pathD}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/>
${label(cx, cy + r + 30, `${sides} lines of symmetry, rotational order ${sides}`, { color: GOLD, size: 12, weight: 700 })}
`
  return wrap(id, inner, '0 0 320 260', p.caption)
}

// ---------------------------------------------------------------------------
// 10. VECTOR TRIANGLE — OAB vector geometry (routes, midpoints, collinearity)
// params: labelA, labelB (vector names, default a, b), showAB (draw A->B),
//         showMidpoint (draw M on AB and dashed OM), midLabel, extendRatio
//         (draws OB extended by a ratio, for collinearity proofs), caption
// ---------------------------------------------------------------------------
export function vectorTriangle(id: string, p: DiagramParams): string {
  const O = { x: 60, y: 195 }
  const A = { x: 150, y: 55 }
  const B = { x: 290, y: 130 }
  const labelA = s(p, 'labelA', 'a')
  const labelB = s(p, 'labelB', 'b')
  const showAB = s(p, 'showAB', 'true') !== 'false'
  const showMidpoint = s(p, 'showMidpoint', '') === 'true'
  const midLabel = s(p, 'midLabel', 'M')
  const extendRatio = n(p, 'extendRatio', 0)

  const M = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 }
  const ratioOA = n(p, 'pointOnOA', 0)
  const ratioOB = n(p, 'pointOnOB', 0)

  let extra = ''
  if (ratioOA > 0 && ratioOB > 0) {
    const P = { x: O.x + (A.x - O.x) * ratioOA, y: O.y + (A.y - O.y) * ratioOA }
    const Q = { x: O.x + (B.x - O.x) * ratioOB, y: O.y + (B.y - O.y) * ratioOB }
    extra += `<circle cx="${P.x.toFixed(1)}" cy="${P.y.toFixed(1)}" r="3" fill="${GOLD}"/>${label(P.x - 8, P.y - 4, 'P', { color: GOLD, size: 12, weight: 700, anchor: 'end' })}`
    extra += `<circle cx="${Q.x.toFixed(1)}" cy="${Q.y.toFixed(1)}" r="3" fill="${GOLD}"/>${label(Q.x + 8, Q.y - 4, 'Q', { color: GOLD, size: 12, weight: 700, anchor: 'start' })}`
    extra += `<line x1="${P.x.toFixed(1)}" y1="${P.y.toFixed(1)}" x2="${Q.x.toFixed(1)}" y2="${Q.y.toFixed(1)}" stroke="${GOLD}" stroke-width="2.2"/>`
  }
  if (showMidpoint) {
    extra += `<line x1="${O.x}" y1="${O.y}" x2="${M.x}" y2="${M.y}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#${id}-arrow)"/>`
    extra += `<circle cx="${M.x}" cy="${M.y}" r="3" fill="${GOLD}"/>${label(M.x, M.y - 10, midLabel, { color: GOLD, size: 12, weight: 700 })}`
  }
  if (extendRatio > 0) {
    const ext = { x: O.x + (B.x - O.x) * extendRatio, y: O.y + (B.y - O.y) * extendRatio }
    extra += `<line x1="${B.x}" y1="${B.y}" x2="${ext.x.toFixed(1)}" y2="${ext.y.toFixed(1)}" stroke="${INK4}" stroke-width="1.6" stroke-dasharray="4,3"/>`
    extra += `<circle cx="${ext.x.toFixed(1)}" cy="${ext.y.toFixed(1)}" r="3" fill="${INK3}"/>${label(ext.x + 10, ext.y, s(p, 'extendLabel', 'C'), { color: INK3, size: 12, anchor: 'start' })}`
  }

  const inner = `
<line x1="${O.x}" y1="${O.y}" x2="${A.x}" y2="${A.y}" stroke="${GREEN}" stroke-width="2.4" marker-end="url(#${id}-arrow)"/>
<line x1="${O.x}" y1="${O.y}" x2="${B.x}" y2="${B.y}" stroke="${'var(--navy)'}" stroke-width="2.4" marker-end="url(#${id}-arrow)"/>
${showAB ? `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${INK2}" stroke-width="2" stroke-dasharray="5,3" marker-end="url(#${id}-arrow)"/>` : ''}
${extra}
<circle cx="${O.x}" cy="${O.y}" r="3" fill="${INK}"/>${label(O.x - 10, O.y + 6, 'O', { color: INK3, size: 12, anchor: 'end' })}
<circle cx="${A.x}" cy="${A.y}" r="3" fill="${INK}"/>${label(A.x, A.y - 10, 'A', { color: INK3, size: 12 })}
<circle cx="${B.x}" cy="${B.y}" r="3" fill="${INK}"/>${label(B.x + 10, B.y, 'B', { color: INK3, size: 12, anchor: 'start' })}
${label((O.x + A.x) / 2 - 12, (O.y + A.y) / 2, labelA, { color: GREEN, size: 15, weight: 700, italic: true, anchor: 'end' })}
${label((O.x + B.x) / 2, (O.y + B.y) / 2 + 16, labelB, { color: 'var(--navy)', size: 15, weight: 700, italic: true })}
${showAB ? label((A.x + B.x) / 2, (A.y + B.y) / 2 - 10, `${labelB} − ${labelA}`, { color: INK2, size: 12.5, weight: 700, italic: true }) : ''}
`
  return wrap(id, inner, '0 0 340 220', p.caption)
}

// ---------------------------------------------------------------------------
// 10. TRIANGLE PAIR — congruence (SSS/SAS/ASA/RHS) and similarity
// params: labels1, labels2 (comma-separated vertex names, top/bottom-left/bottom-right),
//         tickA, tickB, tickC (0-3 tick marks per side, matched between both triangles),
//         scale2 (size multiplier for the second triangle, for similarity), caption
// ---------------------------------------------------------------------------
function miniTriangle(originX: number, scale: number, labels: string[]): { A: Pt2; B: Pt2; C: Pt2 } {
  const base = 100 * scale
  const height = 90 * scale
  const A = { x: originX, y: 170 - height }
  const B = { x: originX - base / 2, y: 170 }
  const C = { x: originX + base / 2, y: 170 }
  return { A, B, C }
}

function tickMarks(p1: Pt2, p2: Pt2, count: number, color: string): string {
  if (count <= 0) return ''
  const mx = (p1.x + p2.x) / 2
  const my = (p1.y + p2.y) / 2
  const dx = p2.x - p1.x, dy = p2.y - p1.y
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len, ny = dx / len // normal
  let out = ''
  const spacing = 5
  const start = -((count - 1) * spacing) / 2
  for (let i = 0; i < count; i++) {
    const off = start + i * spacing
    const cx = mx + (dx / len) * off, cy = my + (dy / len) * off
    out += `<line x1="${(cx - nx * 6).toFixed(1)}" y1="${(cy - ny * 6).toFixed(1)}" x2="${(cx + nx * 6).toFixed(1)}" y2="${(cy + ny * 6).toFixed(1)}" stroke="${color}" stroke-width="2"/>`
  }
  return out
}

function angleArcMarks(vertex: Pt2, p1: Pt2, p2: Pt2, count: number, color: string): string {
  if (count <= 0) return ''
  const a1 = (Math.atan2(p1.y - vertex.y, p1.x - vertex.x) * 180) / Math.PI
  const a2 = (Math.atan2(p2.y - vertex.y, p2.x - vertex.x) * 180) / Math.PI
  let out = ''
  for (let i = 0; i < count; i++) {
    out += `<path d="${arcPath(vertex.x, vertex.y, 16 + i * 5, a1, a2)}" fill="none" stroke="${color}" stroke-width="1.6"/>`
  }
  return out
}

export function trianglePair(id: string, p: DiagramParams): string {
  const labels1 = s(p, 'labels1', 'A,B,C').split(',')
  const labels2 = s(p, 'labels2', 'D,E,F').split(',')
  const scale2 = n(p, 'scale2', 1)
  const tickA = Math.round(n(p, 'tickA', 0))
  const tickB = Math.round(n(p, 'tickB', 0))
  const tickC = Math.round(n(p, 'tickC', 0))
  const angA = Math.round(n(p, 'angleMarkA', 0))
  const angB = Math.round(n(p, 'angleMarkB', 0))
  const angC = Math.round(n(p, 'angleMarkC', 0))
  const tickColors = [GOLD, GREEN, 'var(--navy)']

  const t1 = miniTriangle(90, 1, labels1)
  const t2 = miniTriangle(90 + 170, scale2, labels2)

  const drawTri = (t: { A: Pt2; B: Pt2; C: Pt2 }, labels: string[]) => `
<path d="M ${t.A.x} ${t.A.y} L ${t.B.x} ${t.B.y} L ${t.C.x} ${t.C.y} Z" fill="none" stroke="${INK2}" stroke-width="2.3"/>
${tickMarks(t.B, t.C, tickA, tickColors[0])}
${tickMarks(t.A, t.C, tickB, tickColors[1])}
${tickMarks(t.A, t.B, tickC, tickColors[2])}
${angleArcMarks(t.A, t.B, t.C, angA, tickColors[0])}
${angleArcMarks(t.B, t.A, t.C, angB, tickColors[1])}
${angleArcMarks(t.C, t.A, t.B, angC, tickColors[2])}
${label(t.A.x, t.A.y - 10, labels[0] || '', { color: INK3, size: 12 })}
${label(t.B.x - 10, t.B.y + 14, labels[1] || '', { color: INK3, size: 12, anchor: 'end' })}
${label(t.C.x + 10, t.C.y + 14, labels[2] || '', { color: INK3, size: 12, anchor: 'start' })}
`
  const inner = `${drawTri(t1, labels1)}${drawTri(t2, labels2)}`
  return wrap(id, inner, '0 0 340 200', p.caption)
}

// ---------------------------------------------------------------------------
// 9. CUBOID (pseudo-3D) — Pythagoras in 3D / volume / surface area
// params: length, width, height (labels), showDiagonal (true/false), caption
// ---------------------------------------------------------------------------
export function cuboid3d(id: string, p: DiagramParams): string {
  const length = s(p, 'length', 'l')
  const width = s(p, 'width', 'w')
  const height = s(p, 'height', 'h')
  const showDiagonal = s(p, 'showDiagonal', '') === 'true'
  const showFaceDiagonal = s(p, 'showFaceDiagonal', '') === 'true'

  // front-bottom-left origin; skew to suggest depth
  const skx = 55, sky = -32
  const w = 170, h = 120
  const FBL = { x: 60, y: 190 } // front-bottom-left
  const FBR = { x: FBL.x + w, y: FBL.y }
  const FTL = { x: FBL.x, y: FBL.y - h }
  const FTR = { x: FBR.x, y: FTL.y }
  const BBL = { x: FBL.x + skx, y: FBL.y + sky }
  const BBR = { x: FBR.x + skx, y: FBR.y + sky }
  const BTL = { x: FTL.x + skx, y: FTL.y + sky }
  const BTR = { x: FTR.x + skx, y: FTR.y + sky }

  const edge = (p1: Pt2, p2: Pt2, dash = false) =>
    `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${dash ? INK4 : INK2}" stroke-width="2"${dash ? ' stroke-dasharray="4,3"' : ''}/>`

  const inner = `
${edge(BTL, BTR, true)}${edge(BBL, BBR, true)}${edge(BBL, BTL, true)}
${edge(BTR, FTR)}${edge(BBR, FBR)}${edge(BTL, FTL, true)}
<path d="M ${FBL.x} ${FBL.y} L ${FBR.x} ${FBR.y} L ${FTR.x} ${FTR.y} L ${FTL.x} ${FTL.y} Z" fill="${GREEN_SOFT}" fill-opacity="0.5" stroke="${INK2}" stroke-width="2.2"/>
${edge(FBR, BBR)}${edge(FTR, BTR)}${edge(BBR, BTR)}
${showFaceDiagonal ? `<line x1="${FBL.x}" y1="${FBL.y}" x2="${BBR.x}" y2="${BBR.y}" stroke="${GREEN}" stroke-width="2" stroke-dasharray="5,3"/>` : ''}
${showDiagonal ? `<line x1="${FBL.x}" y1="${FBL.y}" x2="${BTR.x}" y2="${BTR.y}" stroke="${GOLD}" stroke-width="2.4"/>` : ''}
${label((FBL.x + FBR.x) / 2, FBL.y + 22, length, { color: INK, size: 14, weight: 700 })}
${label(FBL.x - 14, (FBL.y + FTL.y) / 2, height, { color: INK, size: 14, weight: 700, anchor: 'end' })}
${label((FBR.x + BBR.x) / 2 + 4, (FBR.y + BBR.y) / 2 + 16, width, { color: INK, size: 14, weight: 700, anchor: 'start' })}
`
  return wrap(id, inner, '0 0 320 240', p.caption)
}

type Pt2 = { x: number; y: number }

// ---------------------------------------------------------------------------
// SOLID 3D SHAPES — cylinder, cone, sphere, square pyramid, triangular prism
// params: shape, radius, height, slant, caption
// ---------------------------------------------------------------------------
export function solid3d(id: string, p: DiagramParams): string {
  const shape = s(p, 'shape', 'cylinder')
  const radiusLabel = s(p, 'radius', 'r')
  const heightLabel = s(p, 'height', 'h')
  const slantLabel = s(p, 'slant', 'l')

  if (shape === 'cylinder') {
    const cx = 160, rx = 75, ry = 20
    const topY = 55, botY = 165
    const inner = `
<ellipse cx="${cx}" cy="${botY}" rx="${rx}" ry="${ry}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${cx - rx}" y1="${topY}" x2="${cx - rx}" y2="${botY}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${cx + rx}" y1="${topY}" x2="${cx + rx}" y2="${botY}" stroke="${GREEN}" stroke-width="2.3"/>
<path d="M ${cx - rx} ${topY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${topY}" fill="none" stroke="${GREEN}" stroke-width="2.3" stroke-dasharray="4,3"/>
<path d="M ${cx - rx} ${topY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${topY}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${cx}" y1="${topY}" x2="${cx + rx}" y2="${topY}" stroke="${GOLD}" stroke-width="2"/>
${label(cx + rx / 2, topY - 8, radiusLabel, { color: GOLD, size: 13, weight: 700 })}
<line x1="${cx + rx + 22}" y1="${topY}" x2="${cx + rx + 22}" y2="${botY}" stroke="${INK3}" stroke-width="1.5"/>
${label(cx + rx + 32, (topY + botY) / 2, heightLabel, { color: INK, size: 13, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (shape === 'cone') {
    const cx = 160, rx = 75, ry = 18
    const apex = { x: cx, y: 30 }
    const botY = 170
    const inner = `
<path d="M ${cx - rx} ${botY} A ${rx} ${ry} 0 0 0 ${cx + rx} ${botY}" fill="none" stroke="${GREEN}" stroke-width="2.3" stroke-dasharray="4,3"/>
<path d="M ${cx - rx} ${botY} A ${rx} ${ry} 0 0 1 ${cx + rx} ${botY}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${cx - rx}" y2="${botY}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${cx + rx}" y2="${botY}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${cx}" y2="${botY}" stroke="${INK4}" stroke-width="1.5" stroke-dasharray="4,3"/>
<line x1="${cx}" y1="${botY}" x2="${cx + rx}" y2="${botY}" stroke="${GOLD}" stroke-width="2"/>
${label(cx + rx / 2, botY + 18, radiusLabel, { color: GOLD, size: 13, weight: 700 })}
${label(apex.x - 8, (apex.y + botY) / 2, heightLabel, { color: INK, size: 13, weight: 700, anchor: 'end' })}
${label((apex.x + cx + rx) / 2 + 10, (apex.y + botY) / 2 - 10, slantLabel, { color: GREEN, size: 13, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (shape === 'sphere') {
    const cx = 160, cy = 115, r = 85
    const inner = `
<circle cx="${cx}" cy="${cy}" r="${r}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.32}" fill="none" stroke="${GREEN}" stroke-width="1.4" stroke-dasharray="4,3"/>
<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${GOLD}" stroke-width="2.2"/>
<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/>
${label((cx + cx + r) / 2, cy - 10, radiusLabel, { color: GOLD, size: 14, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 230', p.caption)
  }

  if (shape === 'hemisphere') {
    const cx = 160, cy = 130, r = 85
    const inner = `
<path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.28}" fill="none" stroke="${GREEN}" stroke-width="2.2"/>
<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.28}" fill="${GREEN_SOFT}" fill-opacity="0.4" stroke="none"/>
<line x1="${cx}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${GOLD}" stroke-width="2.2"/>
<circle cx="${cx}" cy="${cy}" r="3" fill="${INK}"/>
${label((cx + cx + r) / 2, cy + 20, radiusLabel, { color: GOLD, size: 14, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  if (shape === 'pyramid') {
    const cx = 160
    const baseY = 175
    const BL = { x: cx - 90, y: baseY }, BR = { x: cx + 60, y: baseY }
    const BBack = { x: cx + 10, y: baseY - 45 }, BFront = { x: cx - 40, y: baseY + 30 }
    const apex = { x: cx - 15, y: 30 }
    const centreBase = { x: (BL.x + BR.x + BBack.x + BFront.x) / 4, y: (BL.y + BR.y + BBack.y + BFront.y) / 4 }
    const inner = `
<path d="M ${BFront.x} ${BFront.y} L ${BL.x} ${BL.y} L ${BBack.x} ${BBack.y} L ${BR.x} ${BR.y} Z" fill="${GREEN_SOFT}" fill-opacity="0.5" stroke="${INK4}" stroke-width="1.6" stroke-dasharray="4,3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${BFront.x}" y2="${BFront.y}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${BL.x}" y2="${BL.y}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${BR.x}" y2="${BR.y}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${BBack.x}" y2="${BBack.y}" stroke="${INK4}" stroke-width="1.6" stroke-dasharray="4,3"/>
<line x1="${apex.x}" y1="${apex.y}" x2="${centreBase.x.toFixed(1)}" y2="${centreBase.y.toFixed(1)}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5,3"/>
${label(apex.x - 10, (apex.y + centreBase.y) / 2, heightLabel, { color: GOLD, size: 13, weight: 700, anchor: 'end' })}
${label((apex.x + BFront.x) / 2 - 14, (apex.y + BFront.y) / 2, slantLabel, { color: GREEN, size: 13, weight: 700, anchor: 'end' })}
`
    return wrap(id, inner, '0 0 320 220', p.caption)
  }

  // triangular-prism
  const shift = 70
  const F = { A: { x: 60, y: 190 }, B: { x: 190, y: 190 }, C: { x: 125, y: 70 } }
  const Bk = { A: { x: F.A.x + shift, y: F.A.y - 40 }, B: { x: F.B.x + shift, y: F.B.y - 40 }, C: { x: F.C.x + shift, y: F.C.y - 40 } }
  const prismLength = s(p, 'length', 'length')
  const base = s(p, 'base', 'base')
  const inner = `
<path d="M ${Bk.A.x} ${Bk.A.y} L ${Bk.B.x} ${Bk.B.y} L ${Bk.C.x} ${Bk.C.y} Z" fill="none" stroke="${INK4}" stroke-width="1.6" stroke-dasharray="4,3"/>
<line x1="${F.A.x}" y1="${F.A.y}" x2="${Bk.A.x}" y2="${Bk.A.y}" stroke="${INK4}" stroke-width="1.6" stroke-dasharray="4,3"/>
<line x1="${F.B.x}" y1="${F.B.y}" x2="${Bk.B.x}" y2="${Bk.B.y}" stroke="${GREEN}" stroke-width="2.2"/>
<line x1="${F.C.x}" y1="${F.C.y}" x2="${Bk.C.x}" y2="${Bk.C.y}" stroke="${GREEN}" stroke-width="2.2"/>
<path d="M ${F.A.x} ${F.A.y} L ${F.B.x} ${F.B.y} L ${F.C.x} ${F.C.y} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<line x1="${Bk.B.x}" y1="${Bk.B.y}" x2="${Bk.C.x}" y2="${Bk.C.y}" stroke="${GREEN}" stroke-width="2.2"/>
${label((F.A.x + F.B.x) / 2, F.A.y + 22, base, { color: INK, size: 13, weight: 700 })}
${label((F.B.x + Bk.B.x) / 2 + 4, (F.B.y + Bk.B.y) / 2 + 16, prismLength, { color: GOLD, size: 13, weight: 700, anchor: 'start' })}
`
  return wrap(id, inner, '0 0 320 220', p.caption)
}

// ---------------------------------------------------------------------------
// NET — unfolded 2D layout of a 3D shape
// params: shape ('cuboid'|'cylinder'|'cone'|'triangular-prism'|'square-pyramid'), caption
// ---------------------------------------------------------------------------
export function net(id: string, p: DiagramParams): string {
  const shape = s(p, 'shape', 'cuboid')

  if (shape === 'cylinder') {
    const cx = 160, r = 40
    const rectX = 60, rectY = 110, rectW = 200, rectH = 60
    const inner = `
<rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<circle cx="${cx}" cy="${rectY - r - 6}" r="${r}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
<circle cx="${cx}" cy="${rectY + rectH + r + 6}" r="${r}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
${label(cx, rectY + rectH / 2, 'circumference = 2πr', { color: GREEN, size: 11.5, weight: 700 })}
${label(cx, rectY - r - 6, 'r', { color: GOLD, size: 13, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 320', p.caption || 'A cylinder unfolds into two circles and a rectangle')
  }

  if (shape === 'cone') {
    const cx = 160, cy = 160, r = 100
    const angle = n(p, 'sectorAngle', 216)
    const start = -90 - angle / 2
    const end = -90 + angle / 2
    const p1 = polar(cx, cy, r, start)
    const p2 = polar(cx, cy, r, end)
    const large = angle > 180 ? 1 : 0
    const baseCircleR = 32
    const baseCircleY = cy + r + baseCircleR + 14
    const inner = `
<path d="M ${cx} ${cy} L ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
<circle cx="${cx}" cy="${baseCircleY}" r="${baseCircleR}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
${label(cx, cy - r / 2, 'l', { color: GREEN, size: 13, weight: 700 })}
${label(cx, baseCircleY, 'r', { color: GOLD, size: 13, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 340', p.caption || 'A cone unfolds into a sector (radius = slant height) and a circle')
  }

  if (shape === 'square-pyramid') {
    const s0 = 90, cx = 160, cy = 170
    const half = s0 / 2
    const sq = { x0: cx - half, y0: cy - half, x1: cx + half, y1: cy + half }
    const apexOffset = 70
    const tri = (edge: 'top' | 'bottom' | 'left' | 'right') => {
      if (edge === 'top') return `M ${sq.x0} ${sq.y0} L ${sq.x1} ${sq.y0} L ${cx} ${sq.y0 - apexOffset} Z`
      if (edge === 'bottom') return `M ${sq.x0} ${sq.y1} L ${sq.x1} ${sq.y1} L ${cx} ${sq.y1 + apexOffset} Z`
      if (edge === 'left') return `M ${sq.x0} ${sq.y0} L ${sq.x0} ${sq.y1} L ${sq.x0 - apexOffset} ${cy} Z`
      return `M ${sq.x1} ${sq.y0} L ${sq.x1} ${sq.y1} L ${sq.x1 + apexOffset} ${cy} Z`
    }
    const inner = `
<path d="${tri('top')}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2"/>
<path d="${tri('bottom')}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2"/>
<path d="${tri('left')}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2"/>
<path d="${tri('right')}" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2"/>
<rect x="${sq.x0}" y="${sq.y0}" width="${s0}" height="${s0}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.3"/>
${label(cx, cy, 'base', { color: GREEN, size: 12, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 320', p.caption || 'A square-based pyramid unfolds into a square and four triangles')
  }

  if (shape === 'triangular-prism') {
    const rectY = 110, rectH = 55
    const w1 = 70, w2 = 90, w3 = 70
    const x0 = 40
    const inner = `
<rect x="${x0}" y="${rectY}" width="${w1}" height="${rectH}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.2"/>
<rect x="${x0 + w1}" y="${rectY}" width="${w2}" height="${rectH}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.2"/>
<rect x="${x0 + w1 + w2}" y="${rectY}" width="${w3}" height="${rectH}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="2.2"/>
<path d="M ${x0 + w1} ${rectY} L ${x0 + w1 + w2 / 2} ${rectY - 60} L ${x0 + w1 + w2} ${rectY} Z" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
<path d="M ${x0 + w1} ${rectY + rectH} L ${x0 + w1 + w2 / 2} ${rectY + rectH + 60} L ${x0 + w1 + w2} ${rectY + rectH} Z" fill="var(--gold-soft)" stroke="${GOLD}" stroke-width="2.2"/>
${label(x0 + w1 + w2 / 2, rectY + rectH / 2, 'length', { color: GREEN, size: 12, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 320', p.caption || 'A triangular prism unfolds into three rectangles and two triangles')
  }

  // cuboid (default) — cross-shaped net
  const w = 70, h = 50, d = 50
  const cx = 130, cy = 140
  const faces = [
    { x: cx, y: cy, w, h, fill: GREEN_SOFT, stroke: GREEN }, // front
    { x: cx - d, y: cy, w: d, h, fill: 'var(--gold-soft)', stroke: GOLD }, // left
    { x: cx + w, y: cy, w: d, h, fill: 'var(--gold-soft)', stroke: GOLD }, // right
    { x: cx, y: cy - d, w, h: d, fill: 'var(--navy-soft)', stroke: 'var(--navy)' }, // top
    { x: cx, y: cy + h, w, h: d, fill: 'var(--navy-soft)', stroke: 'var(--navy)' }, // bottom
    { x: cx + w + d, y: cy, w, h, fill: GREEN_SOFT, stroke: GREEN }, // back
  ]
  const rects = faces.map(f => `<rect x="${f.x}" y="${f.y}" width="${f.w}" height="${f.h}" fill="${f.fill}" stroke="${f.stroke}" stroke-width="2"/>`).join('')
  const inner = `
${rects}
${label(cx + w / 2, cy + h / 2, 'l×w', { color: GREEN, size: 11, weight: 700 })}
`
  return wrap(id, inner, '0 0 320 300', p.caption || 'A cuboid unfolds into six rectangles')
}

// ---------------------------------------------------------------------------
// ISOMETRIC DRAWING — a cuboid block on an isometric dot grid
// params: l, w, h (grid units), caption
// ---------------------------------------------------------------------------
export function isometricDrawing(id: string, p: DiagramParams): string {
  const l = Math.max(1, Math.round(n(p, 'l', 3)))
  const w = Math.max(1, Math.round(n(p, 'w', 2)))
  const h = Math.max(1, Math.round(n(p, 'h', 2)))
  const unit = 26
  const rad30 = Math.PI / 6
  const ux = { x: unit * Math.cos(rad30), y: -unit * Math.sin(rad30) }
  const uy = { x: -unit * Math.cos(rad30), y: -unit * Math.sin(rad30) }
  const uz = { x: 0, y: -unit }
  const O = { x: 110, y: 210 }
  const add = (a: Pt2, v: Pt2, k: number) => ({ x: a.x + v.x * k, y: a.y + v.y * k })
  const pt = (li: number, wi: number, hi: number) => add(add(add(O, ux, li), uy, wi), uz, hi)

  // dot grid background
  let dots = ''
  for (let i = 0; i <= l; i++) {
    for (let j = 0; j <= w; j++) {
      const d = pt(i, j, 0)
      dots += `<circle cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="1.4" fill="${RULE}"/>`
    }
  }

  const O_ = pt(0, 0, 0), R = pt(l, 0, 0), L = pt(0, w, 0)
  const OT = pt(0, 0, h), RT = pt(l, 0, h), LT = pt(0, w, h), BackT = pt(l, w, h)

  const face = (pts: Pt2[], fill: string) =>
    `<path d="${pts.map((pt2, i) => `${i === 0 ? 'M' : 'L'} ${pt2.x.toFixed(1)} ${pt2.y.toFixed(1)}`).join(' ')} Z" fill="${fill}" stroke="${GREEN}" stroke-width="2"/>`

  const inner = `
${dots}
${face([O_, R, RT, OT], GREEN_SOFT)}
${face([O_, L, LT, OT], 'var(--green-mid)')}
${face([OT, RT, BackT, LT], 'var(--green-soft)')}
${label((O_.x + R.x) / 2, (O_.y + R.y) / 2 + 14, `${l}`, { color: INK, size: 12, weight: 700 })}
${label((O_.x + L.x) / 2 - 12, (O_.y + L.y) / 2, `${w}`, { color: INK, size: 12, weight: 700 })}
${label(O_.x - 14, (O_.y + OT.y) / 2, `${h}`, { color: INK, size: 12, weight: 700, anchor: 'end' })}
`
  return wrap(id, inner, '0 0 320 260', p.caption || 'A cuboid block drawn on an isometric grid')
}

// ---------------------------------------------------------------------------
// PLANS AND ELEVATIONS — plan / front elevation / side elevation of a solid
// params: shape ('step'|'cuboid'), caption
// ---------------------------------------------------------------------------
export function plansElevations(id: string, p: DiagramParams): string {
  const cellSize = 22
  const grid = (cols: number, rows: number, filled: [number, number][], ox: number, oy: number) => {
    let out = `<rect x="${ox}" y="${oy}" width="${cols * cellSize}" height="${rows * cellSize}" fill="none" stroke="${INK4}" stroke-width="1"/>`
    for (const [c, r] of filled) {
      out += `<rect x="${ox + c * cellSize}" y="${oy + r * cellSize}" width="${cellSize}" height="${cellSize}" fill="${GREEN_SOFT}" stroke="${GREEN}" stroke-width="1.5"/>`
    }
    for (let c = 1; c < cols; c++) out += `<line x1="${ox + c * cellSize}" y1="${oy}" x2="${ox + c * cellSize}" y2="${oy + rows * cellSize}" stroke="${INK4}" stroke-width="0.7"/>`
    for (let r = 1; r < rows; r++) out += `<line x1="${ox}" y1="${oy + r * cellSize}" x2="${ox + cols * cellSize}" y2="${oy + r * cellSize}" stroke="${INK4}" stroke-width="0.7"/>`
    return out
  }

  const plan = grid(3, 2, [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1]], 20, 40)
  const front = grid(3, 2, [[0, 0], [1, 0], [2, 0], [0, 1]], 130, 40)
  const side = grid(2, 2, [[0, 0], [0, 1]], 240, 40)

  const inner = `
${plan}${label(20 + 33, 100, 'Plan', { color: INK, size: 12, weight: 700, anchor: 'middle' })}
${front}${label(130 + 33, 100, 'Front elevation', { color: INK, size: 11, weight: 700, anchor: 'middle' })}
${side}${label(240 + 22, 100, 'Side elevation', { color: INK, size: 11, weight: 700, anchor: 'middle' })}
`
  return wrap(id, inner, '0 0 320 140', p.caption || 'Plan (from above), front elevation, and side elevation of the same solid')
}

// ---------------------------------------------------------------------------
// CONSTRUCTION — perpendicular bisector / angle bisector / loci
// ---------------------------------------------------------------------------
export function construction(id: string, p: DiagramParams): string {
  const variant = s(p, 'variant', 'perpendicular-bisector')

  if (variant === 'perpendicular-bisector') {
    const A = { x: 70, y: 150 }, B = { x: 250, y: 150 }
    const r = 140
    const arc = (centre: Pt2, centreAngle: number) =>
      `<path d="${arcPath(centre.x, centre.y, r, centreAngle - 16, centreAngle + 16)}" fill="none" stroke="${GOLD}" stroke-width="1.6"/>`
    const inner = `
<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="${INK2}" stroke-width="2.3"/>
<circle cx="${A.x}" cy="${A.y}" r="3" fill="${INK}"/>${label(A.x - 10, A.y + 4, 'A', { color: INK3, size: 12, anchor: 'end' })}
<circle cx="${B.x}" cy="${B.y}" r="3" fill="${INK}"/>${label(B.x + 10, B.y + 4, 'B', { color: INK3, size: 12, anchor: 'start' })}
${arc(A, -50)}${arc(A, 50)}${arc(B, 130)}${arc(B, 230)}
<line x1="${(A.x + B.x) / 2}" y1="30" x2="${(A.x + B.x) / 2}" y2="270" stroke="${GREEN}" stroke-width="2.3"/>
${label((A.x + B.x) / 2 + 12, 45, 'perpendicular bisector', { color: GREEN, size: 11.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 300', p.caption || 'Equal-radius arcs from A and B cross at two points — the line through them is the perpendicular bisector')
  }

  if (variant === 'angle-bisector') {
    const O = { x: 60, y: 220 }
    const angle1 = -55, angle2 = 0
    const arm1 = polar(O.x, O.y, 220, angle1)
    const arm2 = polar(O.x, O.y, 220, angle2)
    const r1 = 90
    const p1 = polar(O.x, O.y, r1, angle1)
    const p2 = polar(O.x, O.y, r1, angle2)
    const r2 = 90
    const bisectAngle = (angle1 + angle2) / 2
    const bisectEnd = polar(O.x, O.y, 230, bisectAngle)
    const inner = `
<line x1="${O.x}" y1="${O.y}" x2="${arm1.x.toFixed(1)}" y2="${arm1.y.toFixed(1)}" stroke="${INK2}" stroke-width="2.3"/>
<line x1="${O.x}" y1="${O.y}" x2="${arm2.x.toFixed(1)}" y2="${arm2.y.toFixed(1)}" stroke="${INK2}" stroke-width="2.3"/>
<path d="${arcPath(O.x, O.y, 50, angle1, angle2)}" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
<path d="${arcPath(p1.x, p1.y, r2 * 0.5, bisectAngle - 30, bisectAngle + 30)}" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
<path d="${arcPath(p2.x, p2.y, r2 * 0.5, bisectAngle - 30, bisectAngle + 30)}" fill="none" stroke="${GOLD}" stroke-width="1.6"/>
<line x1="${O.x}" y1="${O.y}" x2="${bisectEnd.x.toFixed(1)}" y2="${bisectEnd.y.toFixed(1)}" stroke="${GREEN}" stroke-width="2.3"/>
<circle cx="${O.x}" cy="${O.y}" r="3" fill="${INK}"/>
${label(O.x - 10, O.y + 6, 'O', { color: INK3, size: 12, anchor: 'end' })}
${label(bisectEnd.x + 6, bisectEnd.y - 6, 'bisector', { color: GREEN, size: 11.5, weight: 700, anchor: 'start' })}
`
    return wrap(id, inner, '0 0 320 260', p.caption || 'An arc from O crosses both arms; equal arcs from those points cross at a third point — the bisector runs through it')
  }

  if (variant === 'locus-point') {
    const O = { x: 160, y: 120 }
    const r = n(p, 'radius', 70)
    const inner = `
<circle cx="${O.x}" cy="${O.y}" r="${r}" fill="none" stroke="${GREEN}" stroke-width="2.3" stroke-dasharray="6,4"/>
<circle cx="${O.x}" cy="${O.y}" r="3" fill="${INK}"/>${label(O.x, O.y + 18, 'O', { color: INK3, size: 12 })}
<line x1="${O.x}" y1="${O.y}" x2="${O.x + r}" y2="${O.y}" stroke="${GOLD}" stroke-width="2"/>
${label(O.x + r / 2, O.y - 8, s(p, 'radiusLabel', 'r'), { color: GOLD, size: 13, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 240', p.caption || 'The locus of points a fixed distance from O is a circle')
  }

  if (variant === 'locus-line') {
    const y1 = 90, y2 = 150
    const inner = `
<line x1="20" y1="${y1}" x2="300" y2="${y1}" stroke="${INK2}" stroke-width="2.3"/>
<line x1="20" y1="${y2 + 40}" x2="300" y2="${y2 + 40}" stroke="${INK2}" stroke-width="2.3"/>
<line x1="20" y1="${(y1 + y2 + 40) / 2}" x2="300" y2="${(y1 + y2 + 40) / 2}" stroke="${GREEN}" stroke-width="2.3" stroke-dasharray="6,4"/>
${label(160, y1 - 10, 'line A', { color: INK3, size: 11.5 })}
${label(160, y2 + 60, 'line B', { color: INK3, size: 11.5 })}
${label(280, (y1 + y2 + 40) / 2 - 8, 'locus', { color: GREEN, size: 11.5, weight: 700 })}
`
    return wrap(id, inner, '0 0 320 220', p.caption || 'The locus of points equidistant from two parallel lines is the line exactly halfway between them')
  }

  // region (shaded area satisfying multiple loci conditions)
  const O = { x: 130, y: 140 }
  const r = 65
  const inner = `
<circle cx="${O.x}" cy="${O.y}" r="${r}" fill="none" stroke="${GREEN}" stroke-width="2" stroke-dasharray="5,3"/>
<line x1="20" y1="60" x2="300" y2="60" stroke="${INK2}" stroke-width="2.2"/>
<path d="M ${O.x - r} ${O.y} A ${r} ${r} 0 0 1 ${O.x + r} ${O.y} L ${O.x + r} 60 L ${O.x - r} 60 Z" fill="var(--gold-soft)" fill-opacity="0.6" stroke="none"/>
<circle cx="${O.x}" cy="${O.y}" r="3" fill="${INK}"/>${label(O.x, O.y + 18, 'O', { color: INK3, size: 12 })}
${label(O.x, 45, 'boundary line', { color: INK3, size: 11.5 })}
${label(O.x + r + 20, O.y, `< ${s(p, 'radiusLabel', 'r')} from O`, { color: GREEN, size: 11, weight: 700, anchor: 'start' })}
`
  return wrap(id, inner, '0 0 320 220', p.caption || 'The shaded region satisfies both conditions: within the circle AND above the line')
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------
let counter = 0

export function renderDiagram(type: string, params: DiagramParams): string {
  counter += 1
  const id = `dg${counter}`
  switch (type) {
    case 'right-triangle': return rightTriangle(id, params)
    case 'triangle': return generalTriangle(id, params)
    case 'bearing': return bearing(id, params)
    case 'circle': return circle(id, params)
    case 'angle': return angle(id, params)
    case 'transform': return transform(id, params)
    case 'shape': return shape2d(id, params)
    case 'cuboid': return cuboid3d(id, params)
    case 'triangle-pair': return trianglePair(id, params)
    case 'circle-theorem': return circleTheorem(id, params)
    case 'vector-triangle': return vectorTriangle(id, params)
    case 'symmetry': return symmetryDiagram(id, params)
    case 'solid3d': return solid3d(id, params)
    case 'net': return net(id, params)
    case 'isometric': return isometricDrawing(id, params)
    case 'plans-elevations': return plansElevations(id, params)
    case 'construction': return construction(id, params)
    default: return ''
  }
}
