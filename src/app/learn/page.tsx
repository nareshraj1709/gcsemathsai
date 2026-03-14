'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  purplePale: "#EDE9FE",
  purpleDim: "#4C1D95",
  mist: "#F8F7FF",
  mid: "#6B7280",
  border: "#E5E1FF",
  green: "#10B981",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

// ── Full AQA topic data ───────────────────────────────────────
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
      'Pythagoras\' theorem',
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
      'Pythagoras\' theorem',
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

const TOPIC_META: Record<string, { icon: string; color: string; light: string; desc: string }> = {
  Number: { icon: '🔢', color: '#7C3AED', light: '#EDE9FE', desc: 'Fractions, decimals, powers, standard form' },
  Algebra: { icon: '📐', color: '#2563EB', light: '#DBEAFE', desc: 'Equations, sequences, graphs, functions' },
  'Geometry & Measures': { icon: '📏', color: '#059669', light: '#D1FAE5', desc: 'Shapes, trigonometry, area, volume' },
  'Statistics & Probability': { icon: '📊', color: '#D97706', light: '#FEF3C7', desc: 'Data, averages, probability, diagrams' },
  'Ratio & Proportion': { icon: '⚖️', color: '#DC2626', light: '#FEE2E2', desc: 'Ratio, proportion, rates of change' },
}

type Selections = {
  year: string
  board: string
  tier: string
  topic: string
  subtopic: string
}

const STEP_LABELS = ['Year group', 'Exam board', 'Tier', 'Topic area', 'Subtopic']

export default function Learn() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState<Selections>({ year: '', board: '', tier: '', topic: '', subtopic: '' })

  const set = (field: keyof Selections, value: string) => setSel(s => ({ ...s, [field]: value }))

  const handleNext = () => {
    if (step < 4) {
      setStep(s => s + 1)
    } else {
      const params = new URLSearchParams({
        year: sel.year,
        board: sel.board,
        tier: sel.tier,
        topic: sel.topic,
        subtopic: sel.subtopic,
      })
      router.push(`/practice?${params.toString()}`)
    }
  }

  const handleBack = () => {
    // Reset downstream selections when going back
    if (step === 4) set('subtopic', '')
    if (step === 3) { set('topic', ''); set('subtopic', '') }
    if (step === 2) { set('tier', ''); set('topic', ''); set('subtopic', '') }
    setStep(s => s - 1)
  }

  const currentValue = (['year', 'board', 'tier', 'topic', 'subtopic'] as (keyof Selections)[])[step]
  const canContinue = !!sel[currentValue]

  const subtopics = sel.topic && sel.tier
    ? TOPIC_DATA[sel.topic]?.[sel.tier as 'Foundation' | 'Higher'] ?? []
    : []

  return (
    <div style={{
      minHeight: "100vh", background: C.mist,
      fontFamily: font.body, padding: "32px 24px",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 32 }}>
          {STEP_LABELS.map((label, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: i < 4 ? "none" : 1 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                opacity: i > step ? 0.4 : 1,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i < step ? C.green : i === step ? C.purple : C.border,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  color: i <= step ? "#fff" : C.mid,
                  transition: "all 0.3s", flexShrink: 0,
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{
                  fontSize: 12, fontWeight: i === step ? 700 : 500,
                  color: i === step ? C.purple : i < step ? C.ink : C.mid,
                  whiteSpace: "nowrap",
                }}>{label}</span>
              </div>
              {i < 4 && (
                <div style={{
                  width: 20, height: 1,
                  background: i < step ? C.green : C.border,
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div style={{
          background: "#fff", borderRadius: 24,
          border: `1px solid ${C.border}`,
          padding: "36px 32px",
          boxShadow: "0 4px 32px rgba(109,40,217,0.08)",
        }}>

          {/* Step 0 — Year group */}
          {step === 0 && (
            <StepShell
              title="Which year are you in?"
              sub="We'll set the right exam timeline and content for you."
            >
              <ChipGrid
                options={["Year 10", "Year 11", "Resit (Adult)"]}
                selected={sel.year}
                onSelect={v => set('year', v)}
              />
            </StepShell>
          )}

          {/* Step 1 — Exam board */}
          {step === 1 && (
            <StepShell
              title="Which exam board?"
              sub="Questions are aligned to your exact specification."
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { name: "AQA", desc: "Most common board in England" },
                  { name: "Edexcel", desc: "Pearson / BTEC group" },
                  { name: "OCR", desc: "Oxford, Cambridge & RSA" },
                ].map(b => (
                  <button key={b.name} onClick={() => set('board', b.name)} style={{
                    padding: "20px 12px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                    border: `2px solid ${sel.board === b.name ? C.purple : C.border}`,
                    background: sel.board === b.name ? C.purplePale : "#fff",
                    transition: "all 0.15s",
                  }}>
                    <div style={{
                      fontSize: 18, fontWeight: 800, fontFamily: font.display,
                      color: sel.board === b.name ? C.purple : C.ink, marginBottom: 4,
                    }}>{b.name}</div>
                    <div style={{ fontSize: 11, color: C.mid, lineHeight: 1.4 }}>{b.desc}</div>
                    {sel.board === b.name && (
                      <div style={{ fontSize: 10, color: C.purple, fontWeight: 700, marginTop: 6 }}>✓ Selected</div>
                    )}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {/* Step 2 — Tier */}
          {step === 2 && (
            <StepShell
              title="Foundation or Higher?"
              sub="Choose the tier you're entered for, or aiming at."
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  {
                    name: "Foundation",
                    grade: "Grades 1–5",
                    bullets: ["Core topics", "Accessible questions", "Grade 4/5 boundary focus"],
                    color: "#2563EB",
                    light: "#DBEAFE",
                  },
                  {
                    name: "Higher",
                    grade: "Grades 4–9",
                    bullets: ["Full spec including hard topics", "Grade 7–9 content", "A-level preparation"],
                    color: C.purple,
                    light: C.purplePale,
                  },
                ].map(t => (
                  <button key={t.name} onClick={() => set('tier', t.name)} style={{
                    padding: "24px 20px", borderRadius: 16, cursor: "pointer", textAlign: "left",
                    border: `2px solid ${sel.tier === t.name ? t.color : C.border}`,
                    background: sel.tier === t.name ? t.light : "#fff",
                    transition: "all 0.15s",
                  }}>
                    <div style={{
                      fontSize: 16, fontWeight: 800, fontFamily: font.display,
                      color: sel.tier === t.name ? t.color : C.ink, marginBottom: 2,
                    }}>{t.name}</div>
                    <div style={{
                      fontSize: 11, fontWeight: 700, color: t.color,
                      background: t.light, padding: "2px 8px", borderRadius: 999,
                      display: "inline-block", marginBottom: 12,
                    }}>{t.grade}</div>
                    {t.bullets.map(b => (
                      <div key={b} style={{ fontSize: 12, color: C.mid, marginBottom: 4, display: "flex", gap: 6 }}>
                        <span style={{ color: t.color }}>·</span> {b}
                      </div>
                    ))}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {/* Step 3 — Topic area */}
          {step === 3 && (
            <StepShell
              title="Pick a topic area"
              sub={`${sel.tier} tier · ${sel.board}`}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {Object.entries(TOPIC_META).map(([name, meta]) => (
                  <button key={name} onClick={() => set('topic', name)} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 14, cursor: "pointer", textAlign: "left",
                    border: `2px solid ${sel.topic === name ? meta.color : C.border}`,
                    background: sel.topic === name ? meta.light : "#fff",
                    transition: "all 0.15s",
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                      background: meta.light,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20,
                    }}>{meta.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 15, fontWeight: 700, fontFamily: font.display,
                        color: sel.topic === name ? meta.color : C.ink,
                      }}>{name}</div>
                      <div style={{ fontSize: 12, color: C.mid, marginTop: 2 }}>{meta.desc}</div>
                    </div>
                    <div style={{
                      fontSize: 12, color: C.mid,
                      background: "#F3F4F6", padding: "3px 10px", borderRadius: 999,
                    }}>
                      {TOPIC_DATA[name]?.[sel.tier as 'Foundation' | 'Higher']?.length ?? 0} topics
                    </div>
                    {sel.topic === name && (
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: meta.color,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontSize: 11, flexShrink: 0,
                      }}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {/* Step 4 — Subtopic */}
          {step === 4 && (
            <StepShell
              title={`Choose a subtopic`}
              sub={`${TOPIC_META[sel.topic]?.icon} ${sel.topic} · ${sel.tier} · ${sel.board}`}
            >
              <div style={{
                display: "flex", flexWrap: "wrap", gap: 8,
                maxHeight: 340, overflowY: "auto",
                padding: "2px 0",
              }}>
                {subtopics.map(st => (
                  <button key={st} onClick={() => set('subtopic', st)} style={{
                    padding: "9px 16px", borderRadius: 999, cursor: "pointer",
                    border: `2px solid ${sel.subtopic === st ? C.purple : C.border}`,
                    background: sel.subtopic === st ? C.purplePale : "#fff",
                    color: sel.subtopic === st ? C.purple : C.ink,
                    fontWeight: sel.subtopic === st ? 700 : 500,
                    fontSize: 13, fontFamily: font.body, transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}>
                    {sel.subtopic === st && "✓ "}{st}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {/* Navigation */}
          <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
            {step > 0 && (
              <button onClick={handleBack} style={{
                flex: "0 0 auto", padding: "13px 20px",
                borderRadius: 12, border: `1.5px solid ${C.border}`,
                background: "#fff", color: C.mid,
                fontSize: 14, cursor: "pointer", fontFamily: font.body,
              }}>← Back</button>
            )}
            <button onClick={handleNext} disabled={!canContinue} style={{
              flex: 1, padding: "13px",
              borderRadius: 12, border: "none",
              background: canContinue
                ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`
                : C.border,
              color: canContinue ? "#fff" : "#9CA3AF",
              fontWeight: 700, fontSize: 15,
              cursor: canContinue ? "pointer" : "not-allowed",
              fontFamily: font.body,
              boxShadow: canContinue ? `0 4px 16px ${C.purple}30` : "none",
              transition: "all 0.2s",
            }}>
              {step === 4 ? "Start practising →" : "Continue →"}
            </button>
          </div>
        </div>

        {/* Summary of selections */}
        {(sel.year || sel.board || sel.tier || sel.topic) && (
          <div style={{
            marginTop: 16, padding: "12px 16px", borderRadius: 12,
            background: "#fff", border: `1px solid ${C.border}`,
            display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center",
          }}>
            <span style={{ fontSize: 11, color: C.mid, fontWeight: 600, marginRight: 4 }}>Selected:</span>
            {[sel.year, sel.board, sel.tier, sel.topic, sel.subtopic].filter(Boolean).map((v, i) => (
              <span key={i} style={{
                fontSize: 12, fontWeight: 600, color: C.purple,
                background: C.purplePale, padding: "3px 10px", borderRadius: 999,
              }}>{v}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────

function StepShell({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{
          fontFamily: font.display, fontSize: 22, fontWeight: 800,
          color: C.ink, margin: "0 0 6px",
        }}>{title}</h2>
        <p style={{ fontSize: 13, color: C.mid, margin: 0 }}>{sub}</p>
      </div>
      {children}
    </>
  )
}

function ChipGrid({ options, selected, onSelect }: {
  options: string[]
  selected: string
  onSelect: (v: string) => void
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)} style={{
          padding: "13px 16px", borderRadius: 12, cursor: "pointer", textAlign: "left",
          border: `2px solid ${selected === opt ? C.purple : C.border}`,
          background: selected === opt ? C.purplePale : "#fff",
          color: selected === opt ? C.purple : C.ink,
          fontWeight: selected === opt ? 700 : 500,
          fontSize: 15, fontFamily: font.body, transition: "all 0.15s",
        }}>
          {selected === opt ? "✓ " : ""}{opt}
        </button>
      ))}
    </div>
  )
}
