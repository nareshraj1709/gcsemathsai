import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Revision Planner — 15 Minutes a Day | GCSEMathsAI',
  description: 'Set your GCSE Maths exam date. We schedule personalised 15-minute revision sessions around your weak spots, every day until your exam.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/features/revision-planner' },
  openGraph: {
    title: 'Revision Planner — 15 Minutes a Day | GCSEMathsAI',
    description: 'Personalised 15-minute GCSE Maths sessions, scheduled daily to your exam date.',
    url: 'https://www.gcsemathsai.co.uk/features/revision-planner',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const SAMPLE_WEEK = [
  { day: 'Mon', date: '13 May', topic: 'Quadratics — factorising', minutes: 15, grade: '7' },
  { day: 'Tue', date: '14 May', topic: 'Circle theorems (alternate segment)', minutes: 15, grade: '7' },
  { day: 'Wed', date: '15 May', topic: 'Histograms — frequency density', minutes: 15, grade: '7' },
  { day: 'Thu', date: '16 May', topic: 'Vectors — proof questions', minutes: 15, grade: '7+' },
  { day: 'Fri', date: '17 May', topic: 'Mixed past-paper section', minutes: 25, grade: 'paper' },
  { day: 'Sat', date: '18 May', topic: 'Trigonometry — sine rule', minutes: 15, grade: '7' },
  { day: 'Sun', date: '19 May', topic: 'Review of the week', minutes: 20, grade: 'mix' },
]

const HOW = [
  { num: 'I.', title: 'Tell us your exam date', desc: 'AQA, Edexcel or OCR — we adjust the plan to your spec, your tier and the number of days you have left.' },
  { num: 'II.', title: 'We find your weak spots', desc: 'Three diagnostic questions per topic strand pinpoint where you are losing marks. Your worst areas get more time.' },
  { num: 'III.', title: 'One session a day', desc: '15 minutes by default — adjustable up to 45. Calendar friendly. The plan rebuilds itself after every answer you give.' },
]

export default function RevisionPlannerPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <Link href="/features" style={{ ...monoLabel, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to features</Link>
        <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginTop: 20, marginBottom: 16 }}>
          Feature · Revision Planner
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>15 minutes a day</em>, every day, all the way to your exam.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 22px' }}>
          Set your exam date. We build a personalised plan around the topics costing you the most marks, broken into bite-size sessions that actually fit into a school day.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" className="btn btn-primary">Build my plan — it&rsquo;s free →</Link>
          <Link href="/features" className="btn btn-outline">All features</Link>
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Example · A week of sessions</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
          A real week for a Year 11 targeting <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>grade 7</em>.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: 24 }}>
          The plan rebuilds itself every day. If you ace a topic, it leaves you alone. If you miss it, it will come back.
        </p>
        <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
          {SAMPLE_WEEK.map((s, i) => (
            <div key={s.day} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '14px 18px', borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}>
              <div style={{ width: 56, textAlign: 'center', flexShrink: 0 }}>
                <p style={{ ...monoLabel, color: 'var(--ink-3)', margin: 0, fontSize: 10 }}>{s.day}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: '2px 0 0' }}>{s.date}</p>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0, fontFamily: 'var(--serif)', letterSpacing: '-0.01em' }}>{s.topic}</p>
                <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{s.minutes} minutes · target grade {s.grade}</p>
              </div>
              <span style={{ ...monoLabel, color: 'var(--green)', background: 'var(--green-soft)', padding: '4px 10px', borderRadius: 999, fontSize: 10, flexShrink: 0 }}>
                Practice
              </span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 12 }}>
          Sample shown. Your real plan adapts to your weak spots and your school timetable.
        </p>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>How it works</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            How it <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>builds your plan</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {HOW.map(s => (
              <div key={s.num}>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32, fontWeight: 500, color: 'var(--green)', margin: '0 0 8px', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</p>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          Start tonight. <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>Thank yourself in May.</em>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 22px' }}>
          The planner is included on the free tier — no card, no trial. The earlier you start, the more days the plan has to work with.
        </p>
        <Link href="/auth" className="btn btn-primary">Create my plan →</Link>
      </section>
    </main>
  )
}
