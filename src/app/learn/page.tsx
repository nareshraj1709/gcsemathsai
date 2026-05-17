'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getProfileFromCache, saveProfile as saveProfileToDb } from '@/lib/profile'
import PredictedPapersPromo from '@/components/PredictedPapersPromo'

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
  Number:                    { icon: '🔢', color: 'var(--green)',     light: 'var(--green-soft)',    border: 'var(--rule)' },
  Algebra:                   { icon: '📐', color: 'var(--navy)',      light: 'var(--navy-soft)',     border: 'var(--rule)' },
  'Geometry & Measures':     { icon: '📏', color: 'var(--burgundy)',  light: 'var(--burgundy-soft)', border: 'var(--rule)' },
  'Statistics & Probability':{ icon: '📊', color: 'var(--gold)',      light: 'var(--gold-soft)',     border: 'var(--rule)' },
  'Ratio & Proportion':      { icon: '⚖️', color: 'var(--green-mid)', light: 'var(--green-soft)',    border: 'var(--rule)' },
}

const GCSE_BOARDS = [
  { name: 'AQA',     desc: 'Most common in England' },
  { name: 'Edexcel', desc: 'Pearson / BTEC group'   },
  { name: 'OCR',     desc: 'Oxford, Cambridge & RSA' },
]
const GCSE_YEARS  = ['Year 9', 'Year 10', 'Year 11', 'Resit (Adult)']

// ── Main component ───────────────────────────────────────────
export default function Learn() {
  const router = useRouter()

  const [year, setYear] = useState('')
  const [board, setBoard] = useState('')
  const [tier, setTier] = useState<'Foundation' | 'Higher'>('Foundation')
  const [phase, setPhase] = useState<1 | 2>(1)
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Exam Level'>('Medium')
  const [format, setFormat] = useState<'mcq' | 'written'>('mcq')

  // Auto-fill from saved profile and skip to phase 2
  useEffect(() => {
    // Try cache first for instant load
    const cached = getProfileFromCache()
    if (cached?.year && cached?.board) {
      setYear(cached.year)
      setBoard(cached.board)
      if (cached.tier === 'Higher') setTier('Higher')
      setPhase(2)
      return
    }

    // Fall back to Supabase for returning users on new devices
    import('@/lib/profile').then(({ loadProfile }) => {
      loadProfile().then(profile => {
        if (profile?.year && profile?.board) {
          setYear(profile.year)
          setBoard(profile.board)
          if (profile.tier === 'Higher') setTier('Higher')
          setPhase(2)
        } else {
          router.push('/onboarding')
        }
      })
    })
  }, [router])

  const boards = GCSE_BOARDS
  const canProceed = !!year && !!board

  const handleYearSelect = (y: string) => setYear(y)

  const handleProceed = () => {
    if (!canProceed) return
    const existing = getProfileFromCache() ?? {}
    saveProfileToDb({ ...existing, year, board, tier })
    setPhase(2)
  }

  const handleSubtopic = (topic: string, subtopic: string) => {
    const params = new URLSearchParams({ year, board, tier, topic, subtopic, difficulty, format })
    router.push(`/practice?${params.toString()}`)
  }

  // ── Phase 1: selection screen ────────────────────────────
  if (phase === 1) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--cream)',
        fontFamily: 'var(--sans)',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--green-soft)', borderRadius: 999, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
              color: 'var(--green)', marginBottom: 12,
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              Setup
            </div>
            <h1 style={{
              fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 800,
              color: 'var(--ink)', margin: '0 0 8px',
            }}>Your learning setup</h1>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', margin: 0 }}>
              Confirm your year group and exam board — you can change this any time.
            </p>
          </div>

          {/* Card */}
          <div style={{
            background: 'var(--paper)', borderRadius: 16,
            border: '1px solid var(--rule)',
            padding: '32px 28px',
          }}>

            {/* Year group */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
                color: 'var(--ink-3)', display: 'block', marginBottom: 8,
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>
                GCSE (Years 9-11)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {GCSE_YEARS.map(y => (
                  <button key={y} onClick={() => handleYearSelect(y)} style={{
                    padding: '11px 14px', borderRadius: 10, cursor: 'pointer', textAlign: 'left',
                    border: `2px solid ${year === y ? 'var(--green)' : 'var(--rule)'}`,
                    background: year === y ? 'var(--green-soft)' : 'var(--paper)',
                    color: year === y ? 'var(--green)' : 'var(--ink)',
                    fontWeight: year === y ? 700 : 500,
                    fontSize: 14, fontFamily: 'var(--sans)', transition: 'all 0.15s',
                  }}>
                    {year === y ? '✓ ' : ''}{y}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--rule)', marginBottom: 28 }} />

            {/* Exam board */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                fontSize: 13, fontWeight: 700, fontFamily: 'var(--serif)',
                color: 'var(--ink)', display: 'block', marginBottom: 10,
              }}>
                Which exam board?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {boards.map(b => (
                  <button key={b.name} onClick={() => setBoard(b.name)} style={{
                    padding: '14px 10px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                    border: `2px solid ${board === b.name ? 'var(--green)' : 'var(--rule)'}`,
                    background: board === b.name ? 'var(--green-soft)' : 'var(--paper)',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{
                      fontSize: 15, fontWeight: 800, fontFamily: 'var(--serif)',
                      color: board === b.name ? 'var(--green)' : 'var(--ink)', marginBottom: 4,
                    }}>{b.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-3)', lineHeight: 1.3 }}>{b.desc}</div>
                    {board === b.name && (
                      <div style={{ fontSize: 10, color: 'var(--green)', fontWeight: 700, marginTop: 4 }}>✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button onClick={handleProceed} disabled={!canProceed} style={{
              width: '100%', padding: '14px',
              borderRadius: 10, border: 'none',
              background: canProceed ? 'var(--green)' : 'var(--rule)',
              color: canProceed ? '#fff' : 'var(--ink-3)',
              fontWeight: 700, fontSize: 15,
              cursor: canProceed ? 'pointer' : 'not-allowed',
              fontFamily: 'var(--sans)',
              transition: 'all 0.2s',
            }}>
              Show me the topics &rarr;
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Phase 2: GCSE topic menu ─────────────────────────────
  const topicNames = Object.keys(TOPIC_DATA)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', fontFamily: 'var(--sans)' }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'var(--paper)', borderBottom: '1px solid var(--rule)',
        padding: '12px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setPhase(1)} style={{
            border: '1px solid var(--rule)', background: 'var(--paper)', borderRadius: 8,
            padding: '5px 12px', fontSize: 13, cursor: 'pointer', color: 'var(--ink-3)',
            fontFamily: 'var(--sans)',
          }}>&larr; Back</button>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[year, board].map(tag => (
              <span key={tag} style={{
                fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)',
                color: 'var(--green)', background: 'var(--green-soft)',
                padding: '3px 10px', borderRadius: 999,
                letterSpacing: '0.03em',
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Tier toggle */}
          <div style={{ display: 'flex', background: 'var(--cream-2)', borderRadius: 8, padding: 3, gap: 3 }}>
            {(['Foundation', 'Higher'] as const).map(t => (
              <button key={t} onClick={() => setTier(t)} style={{
                padding: '6px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: tier === t ? 'var(--green)' : 'transparent',
                color: tier === t ? '#fff' : 'var(--ink-3)',
                fontWeight: tier === t ? 700 : 500,
                fontSize: 13, fontFamily: 'var(--sans)', transition: 'all 0.15s',
              }}>{t}</button>
            ))}
          </div>
          {/* Difficulty toggle */}
          <div style={{ display: 'flex', background: 'var(--cream-2)', borderRadius: 8, padding: 3, gap: 3 }}>
            {(['Easy', 'Medium', 'Exam Level'] as const).map(d => (
              <button key={d} onClick={() => setDifficulty(d)} style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: difficulty === d
                  ? (d === 'Easy' ? 'var(--green-mid)' : d === 'Medium' ? 'var(--gold)' : 'var(--burgundy)')
                  : 'transparent',
                color: difficulty === d ? '#fff' : 'var(--ink-3)',
                fontWeight: difficulty === d ? 700 : 500,
                fontSize: 12, fontFamily: 'var(--sans)', transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}>{d}</button>
            ))}
          </div>
          {/* Format toggle */}
          <div style={{ display: 'flex', background: 'var(--cream-2)', borderRadius: 8, padding: 3, gap: 3 }}>
            {([{ key: 'mcq', label: 'Multiple Choice' }, { key: 'written', label: 'Written Answer' }] as const).map(f => (
              <button key={f.key} onClick={() => setFormat(f.key as 'mcq' | 'written')} style={{
                padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer',
                background: format === f.key ? 'var(--green)' : 'transparent',
                color: format === f.key ? '#fff' : 'var(--ink-3)',
                fontWeight: format === f.key ? 700 : 500,
                fontSize: 12, fontFamily: 'var(--sans)', transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}>{f.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Page body */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 60px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 800,
            color: 'var(--ink)', margin: '0 0 6px',
          }}>
            Choose a topic to practise
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: 0 }}>
            {tier} tier &middot; {board} &middot; {topicNames.reduce((acc, t) => acc + TOPIC_DATA[t][tier].length, 0)} subtopics available
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {topicNames.map(topicName => {
            const meta = TOPIC_META[topicName]
            const subtopics = TOPIC_DATA[topicName][tier]
            return (
              <div key={topicName} style={{
                background: 'var(--paper)', border: `1px solid ${meta.border}`,
                borderRadius: 16, overflow: 'hidden',
              }}>
                <div style={{
                  background: meta.light, borderBottom: `1px solid ${meta.border}`,
                  padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: 'var(--paper)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, border: '1px solid var(--rule)',
                  }}>{meta.icon}</div>
                  <div>
                    <div style={{
                      fontSize: 16, fontWeight: 800, fontFamily: 'var(--serif)',
                      color: meta.color,
                    }}>
                      {topicName}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{subtopics.length} subtopics</div>
                  </div>
                </div>
                <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {subtopics.map(st => (
                    <button
                      key={st}
                      onClick={() => handleSubtopic(topicName, st)}
                      style={{
                        padding: '8px 16px', borderRadius: 999, cursor: 'pointer',
                        border: '1px solid var(--rule)', background: 'var(--paper)',
                        color: meta.color, fontWeight: 600, fontSize: 13, fontFamily: 'var(--sans)',
                        transition: 'all 0.15s', whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget
                        el.style.background = meta.light
                        el.style.borderColor = meta.color
                        el.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget
                        el.style.background = 'var(--paper)'
                        el.style.borderColor = 'var(--rule)'
                        el.style.transform = 'none'
                      }}
                    >{st}</button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <PredictedPapersPromo variant="footer" source="learn" />
    </div>
  )
}
