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

const SAMPLE_WEEK = [
  { day: 'Mon', date: '13 May', topic: 'Quadratics — factorising', minutes: 15, grade: '7' },
  { day: 'Tue', date: '14 May', topic: 'Circle theorems (alternate segment)', minutes: 15, grade: '7' },
  { day: 'Wed', date: '15 May', topic: 'Histograms — frequency density', minutes: 15, grade: '7' },
  { day: 'Thu', date: '16 May', topic: 'Vectors — proof questions', minutes: 15, grade: '7+' },
  { day: 'Fri', date: '17 May', topic: 'Mixed past-paper section', minutes: 25, grade: 'paper' },
  { day: 'Sat', date: '18 May', topic: 'Trigonometry — sine rule', minutes: 15, grade: '7' },
  { day: 'Sun', date: '19 May', topic: 'Review of the week', minutes: 20, grade: 'mix' },
]

export default function RevisionPlannerPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Link href="/features" className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
            ← Back to features
          </Link>
          <div className="text-5xl mt-6 mb-4">🗓️</div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Feature · Revision Planner
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-4 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            <em>15 minutes a day</em>, every day, all the way to your exam.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            Set your exam date. We build a personalised plan around the topics costing you the most marks, broken into bite-size sessions that actually fit into a school day.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <Link href="/auth" className="text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md" style={{ background: 'var(--green)' }}>
              Build my plan — it&rsquo;s free →
            </Link>
            <Link href="/features" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
              All features
            </Link>
          </div>
        </div>
      </section>

      {/* Sample week */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
          Example · A week of sessions
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
          A real week for a Year 11 targeting <em>grade 7</em>.
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--ink-3)' }}>
          The plan rebuilds itself every day. If you ace a topic, it leaves you alone. If you miss it, it&rsquo;ll come back.
        </p>

        <div className="rounded-xl overflow-hidden" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          {SAMPLE_WEEK.map((s, i) => (
            <div
              key={s.day}
              className="flex items-center gap-5 px-5 py-4"
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--rule)' }}
            >
              <div className="shrink-0 text-center" style={{ width: 60 }}>
                <div className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>{s.day}</div>
                <div className="text-sm font-bold" style={{ color: 'var(--ink)' }}>{s.date}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{s.topic}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>{s.minutes} minutes · target grade {s.grade}</div>
              </div>
              <div
                className="shrink-0 text-xs font-mono uppercase px-3 py-1 rounded-full"
                style={{ background: 'var(--green-soft)', color: 'var(--green)' }}
              >
                Practice
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs mt-4" style={{ color: 'var(--ink-3)' }}>
          Sample shown. Your real plan adapts to your weak spots and your school timetable.
        </p>
      </section>

      {/* How it works */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
            How it builds your plan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: 'I.', title: 'Tell us your exam date', desc: 'AQA, Edexcel or OCR — we adjust the plan to your spec, your tier and the number of days you have left.' },
              { num: 'II.', title: 'We find your weak spots', desc: 'Three diagnostic questions per topic strand pinpoint where you&apos;re losing marks. Your worst areas get more time.' },
              { num: 'III.', title: 'You get one session a day', desc: '15 minutes by default — adjustable up to 45. Calendar friendly. The plan rebuilds itself after every answer you give.' },
            ].map(s => (
              <div key={s.num}>
                <div className="text-3xl font-serif italic mb-2" style={{ color: 'var(--green)' }}>{s.num}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--ink)' }} dangerouslySetInnerHTML={{ __html: s.title }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-3)' }} dangerouslySetInnerHTML={{ __html: s.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 py-14 text-center">
        <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
          Start tonight. <em>Thank yourself in May.</em>
        </h2>
        <p className="mb-7 max-w-lg mx-auto text-sm" style={{ color: 'var(--ink-3)' }}>
          The planner is included on the free tier — no card, no trial. The earlier you start, the more days the plan has to work with.
        </p>
        <Link href="/auth" className="inline-block text-white font-semibold px-8 py-3 rounded-xl text-sm shadow-md" style={{ background: 'var(--green)' }}>
          Create my plan →
        </Link>
      </section>
    </main>
  )
}
