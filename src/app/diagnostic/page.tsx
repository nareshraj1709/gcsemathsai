import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllDiagnosticSets } from '@/lib/diagnostic-mcqs'

export const metadata: Metadata = {
  title: 'Diagnostic Quizzes — GCSE Maths | GCSEMathsAI',
  description: 'Free diagnostic MCQ quizzes for every GCSE Maths topic. Identify misconceptions in minutes with targeted multiple-choice questions.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/diagnostic' },
  openGraph: {
    title: 'Diagnostic Quizzes — GCSE Maths | GCSEMathsAI',
    description: 'Free diagnostic MCQ quizzes for every GCSE Maths topic.',
    url: 'https://www.gcsemathsai.co.uk/diagnostic',
  },
}

const STRAND_ORDER = ['Number', 'Algebra', 'Ratio, Proportion & Rates of Change', 'Geometry & Measures', 'Statistics & Probability']
const STRAND_COLOURS: Record<string, { accent: string; bg: string }> = {
  'Number':                              { accent: 'var(--green)',    bg: 'var(--green-soft)' },
  'Algebra':                             { accent: 'var(--navy)',     bg: 'var(--navy-soft)' },
  'Ratio, Proportion & Rates of Change': { accent: 'var(--gold)',     bg: 'var(--gold-soft)' },
  'Geometry & Measures':                 { accent: 'var(--green)',    bg: 'var(--green-soft)' },
  'Statistics & Probability':            { accent: 'var(--burgundy)', bg: 'var(--burgundy-soft)' },
}

export default function DiagnosticIndexPage() {
  const allSets = getAllDiagnosticSets()
  const grouped = STRAND_ORDER.map(strand => ({
    strand,
    sets: allSets.filter(s => s.strand === strand),
  })).filter(g => g.sets.length > 0)

  const totalQuizzes = allSets.length
  const totalQuestions = allSets.reduce((sum, s) => sum + s.questions.length, 0)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: 'var(--gold)' }}>{'◆'}</span> Free
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 700 }}>
          Diagnostic <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>MCQ Quizzes</em>
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 560, margin: '0 auto' }}>
          {totalQuizzes} topic quizzes with {totalQuestions} questions. Each wrong answer identifies a specific misconception so you know exactly what to revise.
        </p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px 80px' }}>
        {grouped.map(({ strand, sets }) => {
          const colours = STRAND_COLOURS[strand] ?? { accent: 'var(--ink)', bg: 'var(--cream)' }
          return (
            <div key={strand} style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{strand}</h2>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, background: colours.bg, color: colours.accent, padding: '3px 10px', borderRadius: 999 }}>
                  {sets.length}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
                {sets.map(s => (
                  <Link
                    key={s.topicSlug}
                    href={`/diagnostic/${s.topicSlug}`}
                    style={{
                      display: 'block', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 10,
                      padding: '14px 18px', textDecoration: 'none', transition: 'all 0.15s',
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px' }}>{s.topicTitle}</p>
                    <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', margin: 0 }}>
                      {s.questions.length} questions
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
