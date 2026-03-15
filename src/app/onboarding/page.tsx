'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const C = {
  ink: "#0D0B1A",
  purple: "#6D28D9",
  purpleLight: "#8B5CF6",
  purplePale: "#EDE9FE",
  mid: "#6B7280",
  border: "#E5E1FF",
  mist: "#F8F7FF",
}

const font = {
  display: "'Georgia', 'Times New Roman', serif",
  body: "'Trebuchet MS', 'Lucida Sans', sans-serif",
}

const YEAR_OPTIONS = [
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12 (Sixth Form)",
  "Year 13 (Sixth Form)",
  "Resit (Adult)",
]

const GCSE_BOARDS = ["AQA", "Edexcel", "OCR"]
const ALEVEL_BOARDS = ["AQA", "Edexcel", "OCR A", "OCR B (MEI)"]
const GCSE_GOALS = ["Grade 4 (Pass)", "Grade 5", "Grade 6", "Grade 7+"]
const ALEVEL_GOALS = ["A* (Outstanding)", "A (Excellent)", "B (Good)", "C (Satisfactory)"]

const STEP_COUNT = 4
type Data = { name: string; year: string; board: string; goal: string }

function isALevel(year: string) {
  return year.includes('Sixth Form')
}

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Data>({ name: "", year: "", board: "", goal: "" })

  const aLevel = isALevel(data.year)
  const boardOptions = aLevel ? ALEVEL_BOARDS : GCSE_BOARDS
  const goalOptions = aLevel ? ALEVEL_GOALS : GCSE_GOALS

  const steps = [
    {
      title: "What's your name?",
      sub: "We'll personalise your dashboard and revision plan.",
      field: "name" as const, type: "text" as const, placeholder: "e.g. Aarav",
    },
    {
      title: "Which year are you in?",
      sub: "This helps us set the right exam timeline and syllabus.",
      field: "year" as const, options: YEAR_OPTIONS,
    },
    {
      title: "Which exam board?",
      sub: "We'll align every question to your exact specification.",
      field: "board" as const, options: boardOptions,
    },
    {
      title: aLevel ? "What grade are you aiming for?" : "What grade are you aiming for?",
      sub: aLevel
        ? "We'll focus your revision on the topics that carry the most marks."
        : "We'll focus your practice on the topics that matter most.",
      field: "goal" as const, options: goalOptions,
    },
  ]

  const current = steps[step]
  const isLast = step === STEP_COUNT - 1
  const value = data[current.field]

  // Reset board/goal if year changes and they become incompatible
  const handleYearSelect = (opt: string) => {
    const wasALevel = isALevel(data.year)
    const nowALevel = isALevel(opt)
    if (wasALevel !== nowALevel) {
      setData({ ...data, year: opt, board: "", goal: "" })
    } else {
      setData({ ...data, year: opt })
    }
  }

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem('gcse_profile', JSON.stringify(data))
      router.push('/dashboard')
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: C.mist,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, fontFamily: font.body,
    }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Progress dots */}
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 40 }}>
          {Array.from({ length: STEP_COUNT }).map((_, i) => (
            <div key={i} style={{
              height: 4, borderRadius: 999, transition: "all 0.3s",
              width: i === step ? 24 : 8,
              background: i <= step ? C.purple : C.border,
            }} />
          ))}
        </div>

        <div style={{
          background: "#fff", borderRadius: 24,
          border: `1px solid ${C.border}`,
          padding: "40px 36px",
          boxShadow: "0 4px 32px rgba(109,40,217,0.08)",
        }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14, margin: "0 auto 12px",
              background: `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, boxShadow: `0 4px 16px ${C.purple}30`,
            }}>✦</div>
            <div style={{ fontFamily: font.display, fontWeight: 700, color: C.ink, fontSize: 18 }}>GCSEMathsAI</div>
          </div>

          {/* A-Level badge */}
          {aLevel && step >= 2 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "#FEF3C7", borderRadius: 999, padding: "4px 12px",
              fontSize: 11, fontWeight: 700, color: "#92400E",
              marginBottom: 16,
            }}>
              📘 A-Level / Sixth Form mode
            </div>
          )}

          <h2 style={{ fontFamily: font.display, fontSize: 24, color: C.ink, marginBottom: 8, textAlign: "center" }}>
            {current.title}
          </h2>
          <p style={{ color: C.mid, fontSize: 14, textAlign: "center", marginBottom: 28 }}>{current.sub}</p>

          {current.type === "text" ? (
            <input
              type="text"
              value={value}
              onChange={e => setData({ ...data, [current.field]: e.target.value })}
              placeholder={current.placeholder}
              autoFocus
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 12,
                border: `2px solid ${value ? C.purple : C.border}`,
                fontSize: 16, fontFamily: font.body, outline: "none",
                boxSizing: "border-box", color: C.ink, transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.purple}
              onBlur={e => e.currentTarget.style.borderColor = value ? C.purple : C.border}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {'options' in current && current.options!.map(opt => (
                <button
                  key={opt}
                  onClick={() => current.field === 'year' ? handleYearSelect(opt) : setData({ ...data, [current.field]: opt })}
                  style={{
                    padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                    border: `2px solid ${value === opt ? C.purple : C.border}`,
                    background: value === opt ? C.purplePale : "#fff",
                    color: value === opt ? C.purple : C.ink,
                    fontWeight: value === opt ? 700 : 500,
                    fontSize: 15, fontFamily: font.body, textAlign: "left",
                    transition: "all 0.15s",
                  }}
                >
                  {value === opt ? "✓ " : ""}{opt}
                </button>
              ))}
            </div>
          )}

          <button onClick={handleNext} disabled={!value} style={{
            marginTop: 24, width: "100%", padding: "14px",
            borderRadius: 12, border: "none",
            background: value
              ? `linear-gradient(135deg, ${C.purple}, ${C.purpleLight})`
              : C.border,
            color: value ? "#fff" : "#9CA3AF",
            fontWeight: 700, fontSize: 16,
            cursor: value ? "pointer" : "not-allowed",
            fontFamily: font.body,
            boxShadow: value ? `0 4px 16px ${C.purple}30` : "none",
            transition: "all 0.2s",
          }}>
            {isLast ? "Go to my dashboard →" : "Continue →"}
          </button>

          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{
              marginTop: 12, width: "100%", padding: "10px",
              background: "none", border: "none", color: C.mid,
              fontSize: 14, cursor: "pointer", fontFamily: font.body,
            }}>← Back</button>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 16 }}>
          Already have an account?{" "}
          <span onClick={() => router.push('/auth')} style={{ color: C.purple, cursor: "pointer", fontWeight: 600 }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}
