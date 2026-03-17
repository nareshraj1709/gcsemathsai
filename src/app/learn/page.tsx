'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// ── Colours & fonts ──────────────────────────────────────────
const C = {
  ink: '#0D0B1A',
  purple: '#6D28D9',
  purpleLight: '#8B5CF6',
  purplePale: '#EDE9FE',
  mist: '#F8F7FF',
  mid: '#6B7280',
  border: '#E5E1FF',
  green: '#10B981',
}
const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

// ── Topic data ───────────────────────────────────────────────
const TOPIC_DATA: Record<string, { Foundation: string[]; Higher: string[] }> = {
  Number: {
    Foundation: [
      'Ordering & comparing numbers',
      'Fractions',
      'Decimals',
      'Percentages',
      'Percentage change',
      'Reverse percentages',
      'Factors, multiples & primes',
      'Powers & roots',
      'Standard form',
      'Bounds & accuracy',
    ],
    Higher: [
      'Ordering & comparing numbers',
      'Fractions',
      'Decimals',
      'Percentages',
      'Percentage change',
      'Reverse percentages',
      'Factors, multiples & primes',
      'Powers & roots',
      'Indices (fractional & negative)',
      'Standard form',
      'Surds',
      'Bounds & accuracy',
      'Recurring decimals to fractions',
    ],
  },
  Algebra: {
    Foundation: [
      'Simplifying expressions',
      'Expanding single brackets',
      'Expanding double brackets',
      'Factorising',
      'Solving linear equations',
      'Forming equations from context',
      'Simultaneous equations',
      'Inequalities',
      'Sequences & nth term',
      'Straight-line graphs (y = mx + c)',
      'Quadratic graphs',
      'Real-life graphs',
    ],
    Higher: [
      'Simplifying expressions',
      'Expanding & factorising',
      'Difference of two squares',
      'Solving linear equations',
      'Forming equations from context',
      'Simultaneous equations',
      'Quadratic equations (factorising)',
      'Quadratic equations (formula)',
      'Completing the square',
      'Inequalities',
      'Sequences & nth term',
      'Geometric sequences',
      'Straight-line graphs',
      'Quadratic & cubic graphs',
      'Functions & function notation',
      'Composite & inverse functions',
      'Transformation of graphs',
      'Iteration',
      'Algebraic proof',
    ],
  },
  'Geometry & Measures': {
    Foundation: [
      'Angle rules',
      'Angles in parallel lines',
      'Properties of polygons',
      'Perimeter & area',
      'Area of triangles & quadrilaterals',
      'Circle area & circumference',
      'Volume of prisms',
      'Surface area',
      "Pythagoras' theorem",
      'Trigonometry (SOH-CAH-TOA)',
      'Transformations (RREST)',
      'Constructions & loci',
      'Similarity',
      'Bearings',
      '3D shapes & nets',
    ],
    Higher: [
      'Angle rules',
      'Angles in parallel lines',
      'Properties of polygons',
      'Perimeter & area',
      'Circle area & circumference',
      'Arc length & sector area',
      'Volume of prisms & cylinders',
      'Volume of pyramids, cones & spheres',
      'Surface area',
      "Pythagoras' theorem",
      'Trigonometry (SOH-CAH-TOA)',
      'Sine rule',
      'Cosine rule',
      '3D trigonometry & Pythagoras',
      'Circle theorems',
      'Transformations',
      'Constructions & loci',
      'Similarity & congruence',
      'Vectors',
      'Bearings',
    ],
  },
  'Statistics & Probability': {
    Foundation: [
      'Mean, median, mode & range',
      'Frequency tables',
      'Bar charts & pictograms',
      'Pie charts',
      'Scatter graphs & correlation',
      'Line of best fit',
      'Basic probability',
      'Combined events & sample space',
      'Relative frequency',
      'Tree diagrams',
      'Sampling & bias',
    ],
    Higher: [
      'Mean, median, mode & range',
      'Mean from grouped frequency tables',
      'Cumulative frequency diagrams',
      'Box plots',
      'Histograms',
      'Scatter graphs & correlation',
      'Basic probability',
      'Combined events',
      'Tree diagrams',
      'Conditional probability',
      'Venn diagrams',
      'Set notation',
      'Sampling & bias',
    ],
  },
  'Ratio & Proportion': {
    Foundation: [
      'Simplifying ratios',
      'Sharing in a ratio',
      'Direct proportion',
      'Speed, distance & time',
      'Density, mass & volume',
      'Best buys & exchange rates',
      'Percentage increase & decrease',
      'Simple interest',
    ],
    Higher: [
      'Simplifying & using ratios',
      'Sharing in a ratio',
      'Direct proportion',
      'Inverse proportion',
      'Speed, distance & time',
      'Density, mass & volume',
      'Best buys & exchange rates',
      'Compound interest & depreciation',
      'Growth & decay',
      'Algebraic direct & inverse proportion',
      'Rates of change',
    ],
  },
}

const TOPIC_META: Record<string, { icon: string; color: string; light: string; border: string }> = {
  Number:                   { icon: '🔢', color: '#7C3AED', light: '#F5F3FF', border: '#DDD6FE' },
  Algebra:                  { icon: '📐', color: '#2563EB', light: '#EFF6FF', border: '#BFDBFE' },
  'Geometry & Measures':    { icon: '📏', color: '#059669', light: '#F0FDF4', border: '#A7F3D0' },
  'Statistics & Probability':{ icon: '📊', color: '#D97706', light: '#FFFBEB', border: '#FDE68A' },
  'Ratio & Proportion':     { icon: '⚖️', color: '#DC2626', light: '#FFF5F5', border: '#FECACA' },
}

const GCSE_BOARDS = [
  { name: 'AQA',     desc: 'Most common in England' },
  { name: 'Edexcel', desc: 'Pearson / BTEC group'   },
  { name: 'OCR',     desc: 'Oxford, Cambridge & RSA' },
]
const ALEVEL_BOARDS = [
  { name: 'AQA',         desc: 'Most common sixth form' },
  { name: 'Edexcel',     desc: 'Pearson A Level'        },
  { name: 'OCR A',       desc: 'Traditional A Level'    },
  { name: 'OCR B (MEI)', desc: 'Mathematics in Education & Industry' },
]
const GCSE_YEARS  = ['Year 9', 'Year 10', 'Year 11', 'Resit (Adult)']
const ALEVEL_YEARS = ['Year 12 (Sixth Form)', 'Year 13 (Sixth Form)']
const ALL_YEARS   = [...GCSE_YEARS, ...ALEVEL_YEARS]

function isALevel(year: string) { return year.includes('Sixth Form') }

// ── A-Level topic data ────────────────────────────────────────
const ALEVEL_TOPIC_DATA: Record<string, string[]> = {
  'Pure Maths': [
    'Proof',
    'Algebra & Functions',
    'Coordinate Geometry',
    'Sequences & Series',
    'Trigonometry',
    'Exponentials & Logarithms',
    'Differentiation',
    'Integration',
    'Numerical Methods',
    'Vectors',
    'Binomial Expansion',
    'Parametric Equations',
  ],
  'Statistics': [
    'Statistical Sampling',
    'Data Presentation & Interpretation',
    'Probability',
    'Statistical Distributions',
    'Statistical Hypothesis Testing',
    'Correlation & Regression',
  ],
  'Mechanics': [
    'Quantities & Units in Mechanics',
    'Kinematics (constant acceleration)',
    'Kinematics (variable acceleration)',
    'Forces & Newton\'s Laws',
    'Moments',
    'Projectiles',
    'Friction',
  ],
}

const ALEVEL_TOPIC_META: Record<string, { icon: string; color: string; light: string; border: string }> = {
  'Pure Maths':  { icon: '∫', color: '#7C3AED', light: '#F5F3FF', border: '#DDD6FE' },
  'Statistics':  { icon: '📊', color: '#D97706', light: '#FFFBEB', border: '#FDE68A' },
  'Mechanics':   { icon: '⚙️', color: '#2563EB', light: '#EFF6FF', border: '#BFDBFE' },
}

// ── Main component ───────────────────────────────────────────
export default function Learn() {
  const router = useRouter()

  const [year, setYear] = useState('')
  const [board, setBoard] = useState('')
  const [tier, setTier] = useState<'Foundation' | 'Higher'>('Foundation')
  const [aLevelTab, setALevelTab] = useState<'Pure Maths' | 'Statistics' | 'Mechanics'>('Pure Maths')
  const [phase, setPhase] = useState<1 | 2>(1)
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Exam Level'>('Medium')

  // Auto-fill from saved profile and skip to phase 2
  useEffect(() => {
    try {
      const raw = localStorage.getItem('gcse_profile')
      if (!raw) return
      const profile = JSON.parse(raw)
      if (profile.year && profile.board) {
        setYear(profile.year)
        setBoard(profile.board)
        if (profile.tier === 'Higher') setTier('Higher')
        setPhase(2)
      }
    } catch { /* ignore */ }
  }, [])

  const aLevel = isALevel(year)
  const boards = aLevel ? ALEVEL_BOARDS : GCSE_BOARDS
  const canProceed = !!year && !!board

  const handleYearSelect = (y: string) => {
    // Reset board when switching between GCSE and A-Level
    if (isALevel(y) !== isALevel(year)) setBoard('')
    setYear(y)
  }

  const handleProceed = () => { if (canProceed) setPhase(2) }

  const handleSubtopic = (topic: string, subtopic: string) => {
    const params = new URLSearchParams({ year, board, tier: aLevel ? 'A-Level' : tier, topic, subtopic, difficulty })
    router.push(`/practice?${params.toString()}`)
  }

  // ── Phase 1: selection screen ────────────────────────────
  if (phase === 1) {
    return (
      <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body, padding: '40px 24px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: C.purplePale, borderRadius: 999, padding: '4px 14px',
              fontSize: 12, fontWeight: 700, color: C.purple, marginBottom: 12,
            }}>
              ⚙️ Update your setup
            </div>
            <h1 style={{
              fontFamily: font.display, fontSize: 26, fontWeight: 800,
              color: C.ink, margin: '0 0 8px',
            }}>Your learning setup</h1>
            <p style={{ fontSize: 14, color: C.mid, margin: 0 }}>
              Confirm your year group and exam board — you can change this any time.
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: '#fff', borderRadius: 24,
            border: `1px solid ${C.border}`,
            padding: '32px 28px',
            boxShadow: '0 4px 32px rgba(109,40,217,0.08)',
          }}>

            {/* Year group — GCSE */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.mid, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                GCSE (Years 9–11)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {GCSE_YEARS.map(y => (
                  <button key={y} onClick={() => handleYearSelect(y)} style={{
                    padding: '11px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${year === y ? C.purple : C.border}`,
                    background: year === y ? C.purplePale : '#fff',
                    color: year === y ? C.purple : C.ink,
                    fontWeight: year === y ? 700 : 500,
                    fontSize: 14, fontFamily: font.body, transition: 'all 0.15s',
                  }}>
                    {year === y ? '✓ ' : ''}{y}
                  </button>
                ))}
              </div>
            </div>

            {/* Year group — A-Level */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#92400E', display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                A Level / Sixth Form
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {ALEVEL_YEARS.map(y => (
                  <button key={y} onClick={() => handleYearSelect(y)} style={{
                    padding: '11px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${year === y ? '#D97706' : '#FDE68A'}`,
                    background: year === y ? '#FEF3C7' : '#FFFBEB',
                    color: year === y ? '#92400E' : '#78350F',
                    fontWeight: year === y ? 700 : 500,
                    fontSize: 14, fontFamily: font.body, transition: 'all 0.15s',
                  }}>
                    {year === y ? '✓ ' : ''}{y}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.border, marginBottom: 28 }} />

            {/* Exam board */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                fontSize: 13, fontWeight: 700, color: C.ink,
                display: 'block', marginBottom: 10,
              }}>
                Which exam board?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: aLevel ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
                {boards.map(b => (
                  <button key={b.name} onClick={() => setBoard(b.name)} style={{
                    padding: '14px 10px', borderRadius: 14, cursor: 'pointer', textAlign: 'center',
                    border: `2px solid ${board === b.name ? C.purple : C.border}`,
                    background: board === b.name ? C.purplePale : '#fff',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{
                      fontSize: 15, fontWeight: 800, fontFamily: font.display,
                      color: board === b.name ? C.purple : C.ink, marginBottom: 4,
                    }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: C.mid, lineHeight: 1.3 }}>{b.desc}</div>
                    {board === b.name && (
                      <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginTop: 4 }}>✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={handleProceed} disabled={!canProceed} style={{
              width: '100%', padding: '14px',
              borderRadius: 12, border: 'none',
              background: canProceed
                ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`
                : C.border,
              color: canProceed ? '#fff' : '#9CA3AF',
              fontWeight: 700, fontSize: 15,
              cursor: canProceed ? 'pointer' : 'not-allowed',
              fontFamily: font.body,
              boxShadow: canProceed ? `0 4px 16px ${C.purple}30` : 'none',
              transition: 'all 0.2s',
            }}>
              Show me the topics →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase 2: A-Level topic menu ──────────────────────────
  if (aLevel) {
    const aLevelTopics = Object.keys(ALEVEL_TOPIC_DATA)
    const subtopics = ALEVEL_TOPIC_DATA[aLevelTab]
    const meta = ALEVEL_TOPIC_META[aLevelTab]
    const totalSubtopics = aLevelTopics.reduce((acc, t) => acc + ALEVEL_TOPIC_DATA[t].length, 0)

    return (
      <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body }}>

        {/* Sticky header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 40,
          background: '#fff', borderBottom: `1px solid ${C.border}`,
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setPhase(1)} style={{
              border: `1.5px solid ${C.border}`, background: '#fff', borderRadius: 8,
              padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: C.mid,
              fontFamily: font.body,
            }}>⚙️ Change setup</button>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[year, board, 'A Level'].map(tag => (
                <span key={tag} style={{
                  fontSize: 12, fontWeight: 700, color: C.purple,
                  background: C.purplePale, padding: '3px 10px', borderRadius: 999,
                }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {/* A-Level section tabs */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 3 }}>
              {(aLevelTopics as Array<'Pure Maths' | 'Statistics' | 'Mechanics'>).map(t => (
                <button key={t} onClick={() => setALevelTab(t)} style={{
                  padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: aLevelTab === t ? C.purple : 'transparent',
                  color: aLevelTab === t ? '#fff' : C.mid,
                  fontWeight: aLevelTab === t ? 700 : 500,
                  fontSize: 12, fontFamily: font.body, transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}>{t}</button>
              ))}
            </div>
            {/* Difficulty toggle */}
            <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 3 }}>
              {(['Easy', 'Medium', 'Exam Level'] as const).map(d => (
                <button key={d} onClick={() => setDifficulty(d)} style={{
                  padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: difficulty === d ? (d === 'Easy' ? '#059669' : d === 'Medium' ? '#D97706' : '#DC2626') : 'transparent',
                  color: difficulty === d ? '#fff' : C.mid,
                  fontWeight: difficulty === d ? 700 : 500,
                  fontSize: 12, fontFamily: font.body, transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px' }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 6px' }}>
              Choose a topic to practise
            </h1>
            <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
              A Level · {board} · {totalSubtopics} topics across Pure, Statistics & Mechanics
            </p>
          </div>

          <div style={{
            background: '#fff', border: `1px solid ${meta.border}`,
            borderRadius: 20, overflow: 'hidden',
          }}>
            <div style={{
              background: meta.light, borderBottom: `1px solid ${meta.border}`,
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, boxShadow: `0 2px 8px ${meta.color}20`,
              }}>{meta.icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, fontFamily: font.display, color: meta.color }}>
                  {aLevelTab}
                </div>
                <div style={{ fontSize: 12, color: C.mid, marginTop: 1 }}>{subtopics.length} topics</div>
              </div>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {subtopics.map(st => (
                <button
                  key={st}
                  onClick={() => handleSubtopic(aLevelTab, st)}
                  style={{
                    padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                    border: `1.5px solid ${meta.border}`, background: '#fff',
                    color: meta.color, fontWeight: 600, fontSize: 13, fontFamily: font.body,
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = meta.light; el.style.borderColor = meta.color
                    el.style.transform = 'translateY(-1px)'; el.style.boxShadow = `0 4px 12px ${meta.color}20`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = '#fff'; el.style.borderColor = meta.border
                    el.style.transform = 'none'; el.style.boxShadow = 'none'
                  }}
                >{st}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase 2: GCSE topic menu ─────────────────────────────
  const topicNames = Object.keys(TOPIC_DATA)

  return (
    <div style={{ minHeight: '100vh', background: C.mist, fontFamily: font.body }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: '#fff', borderBottom: `1px solid ${C.border}`,
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase(1)} style={{
            border: `1.5px solid ${C.border}`, background: '#fff', borderRadius: 8,
            padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: C.mid,
            fontFamily: font.body,
          }}>← Back</button>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[year, board].map(tag => (
              <span key={tag} style={{
                fontSize: 12, fontWeight: 700, color: C.purple,
                background: C.purplePale, padding: '3px 10px', borderRadius: 999,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Tier toggle */}
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 3 }}>
            {(['Foundation', 'Higher'] as const).map(t => (
              <button key={t} onClick={() => setTier(t)} style={{
                padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: tier === t ? C.purple : 'transparent',
                color: tier === t ? '#fff' : C.mid,
                fontWeight: tier === t ? 700 : 500,
                fontSize: 13, fontFamily: font.body, transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>
          {/* Difficulty toggle */}
          <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 3 }}>
            {(['Easy', 'Medium', 'Exam Level'] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{
                padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: difficulty === d ? (d === 'Easy' ? '#059669' : d === 'Medium' ? '#D97706' : '#DC2626') : 'transparent',
                color: difficulty === d ? '#fff' : C.mid,
                fontWeight: difficulty === d ? 700 : 500,
                fontSize: 12, fontFamily: font.body, transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Page body */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: font.display, fontSize: 22, fontWeight: 800, color: C.ink, margin: '0 0 6px' }}>
            Choose a topic to practise
          </h1>
          <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>
            {tier} tier · {board} · {topicNames.reduce((acc, t) => acc + TOPIC_DATA[t][tier].length, 0)} subtopics available
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {topicNames.map(topicName => {
            const meta = TOPIC_META[topicName]
            const subtopics = TOPIC_DATA[topicName][tier]
            return (
              <div key={topicName} style={{
                background: '#fff', border: `1px solid ${meta.border}`,
                borderRadius: 20, overflow: 'hidden',
              }}>
                <div style={{
                  background: meta.light, borderBottom: `1px solid ${meta.border}`,
                  padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, boxShadow: `0 2px 8px ${meta.color}20`,
                  }}>{meta.icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, fontFamily: font.display, color: meta.color }}>
                      {topicName}
                    </div>
                    <div style={{ fontSize: 12, color: C.mid, marginTop: 1 }}>{subtopics.length} subtopics</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {subtopics.map(st => (
                    <button
                      key={st}
                      onClick={() => handleSubtopic(topicName, st)}
                      style={{
                        padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                        border: `1.5px solid ${meta.border}`, background: '#fff',
                        color: meta.color, fontWeight: 600, fontSize: 13, fontFamily: font.body,
                        transition: 'all 0.15s', whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.background = meta.light; el.style.borderColor = meta.color
                        el.style.transform = 'translateY(-1px)'; el.style.boxShadow = `0 4px 12px ${meta.color}20`
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.background = '#fff'; el.style.borderColor = meta.border
                        el.style.transform = 'none'; el.style.boxShadow = 'none'
                      }}
                    >{st}</button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
