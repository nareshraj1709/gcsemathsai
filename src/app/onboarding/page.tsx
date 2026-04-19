'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { getProfileFromCache, saveProfile, loadProfile } from '@/lib/profile'
import { supabase } from '@/lib/supabase'

const C = {
  ink: "var(--ink)",
  green: "var(--green)",
  greenMid: "var(--green-mid)",
  greenSoft: "var(--green-soft)",
  mid: "var(--ink-3)",
  border: "var(--rule)",
  cream: "var(--cream)",
  paper: "var(--paper)",
}

const font = {
  display: "var(--serif)",
  body: "var(--sans)",
}

const YEAR_OPTIONS = [
  "Year 9",
  "Year 10",
  "Year 11",
  "Resit (Adult)",
]

const GCSE_BOARDS = ["AQA", "Edexcel", "OCR"]
const GCSE_GOALS = ["Grade 4 (Pass)", "Grade 5", "Grade 6", "Grade 7+", "Grade 8/9 (Top)"]

const STEP_COUNT = 4
type Data = { name: string; year: string; board: string; goal: string }

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<Data>({ name: "", year: "", board: "", goal: "" })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Try cache first (instant), then Supabase for returning users on new devices
    const cached = getProfileFromCache()
    if (cached && cached.name) {
      setData({
        name: cached.name ?? '',
        year: cached.year ?? '',
        board: cached.board ?? '',
        goal: cached.goal ?? '',
      })
      setIsEditing(true)
    }

    // Also check Supabase in case localStorage was cleared
    loadProfile().then(profile => {
      if (profile && profile.year && profile.board) {
        setData({
          name: profile.name ?? '',
          year: profile.year ?? '',
          board: profile.board ?? '',
          goal: profile.goal ?? '',
        })
        setIsEditing(true)
      }
    })
  }, [])

  const steps = [
    {
      title: "What's your name?",
      sub: "We'll personalise your dashboard and revision plan.",
      field: "name" as const, type: "text" as const, placeholder: "e.g. Alex",
    },
    {
      title: "Which year are you in?",
      sub: "This helps us set the right exam timeline and syllabus.",
      field: "year" as const, options: YEAR_OPTIONS,
    },
    {
      title: "Which exam board?",
      sub: "We'll align every question to your exact GCSE specification.",
      field: "board" as const, options: GCSE_BOARDS,
    },
    {
      title: "What grade are you aiming for?",
      sub: "We'll focus your practice on the topics that matter most.",
      field: "goal" as const, options: GCSE_GOALS,
    },
  ]

  const current = steps[step]
  const isLast = step === STEP_COUNT - 1
  const value = data[current.field]

  const handleYearSelect = (opt: string) => setData({ ...data, year: opt })

  const handleNext = async () => {
    if (isLast) {
      saveProfile(data)
      const { data: { session } } = await supabase.auth.getSession()
      router.push(session ? '/dashboard' : '/learn')
    } else {
      setStep(s => s + 1)
    }
  }

  return (
    <div style={{
      minHeight: "100vh", background: C.cream,
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
              background: i <= step ? C.green : C.border,
            }} />
          ))}
        </div>

        <div style={{
          background: C.paper, borderRadius: 24,
          border: `1px solid ${C.border}`,
          padding: "40px 36px",
          boxShadow: "0 4px 32px rgba(15,79,58,0.08)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <Logo size={44} nameSize={18} />
          </div>

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
                border: `2px solid ${value ? C.green : C.border}`,
                fontSize: 16, fontFamily: font.body, outline: "none",
                boxSizing: "border-box", color: C.ink, transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = C.green}
              onBlur={e => e.currentTarget.style.borderColor = value ? C.green : C.border}
            />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {'options' in current && current.options!.map(opt => (
                <button
                  key={opt}
                  onClick={() => current.field === 'year' ? handleYearSelect(opt) : setData({ ...data, [current.field]: opt })}
                  style={{
                    padding: "14px 16px", borderRadius: 12, cursor: "pointer",
                    border: `2px solid ${value === opt ? C.green : C.border}`,
                    background: value === opt ? C.greenSoft : C.paper,
                    color: value === opt ? C.green : C.ink,
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
              ? `linear-gradient(135deg, var(--green), var(--green-mid))`
              : C.border,
            color: value ? "#fff" : "#9CA3AF",
            fontWeight: 700, fontSize: 16,
            cursor: value ? "pointer" : "not-allowed",
            fontFamily: font.body,
            boxShadow: value ? "0 4px 16px rgba(15,79,58,0.3)" : "none",
            transition: "all 0.2s",
          }}>
            {isLast ? (isEditing ? "Save changes →" : "Go to my dashboard →") : "Continue →"}
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
          <span onClick={() => router.push('/auth')} style={{ color: C.green, cursor: "pointer", fontWeight: 600 }}>
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}
