import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Parent Report — Weekly GCSE Maths Email | GCSEMathsAI',
  description: 'A Monday morning email parents will actually read. Current predicted GCSE Maths grade, weekly progress, and topics to encourage practice on — opt-in, no nagging.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/features/parent-report' },
  openGraph: {
    title: 'Parent Report — Weekly GCSE Maths Email | GCSEMathsAI',
    description: 'Predicted grade, hours studied, topics mastered — every Monday morning. Opt-in.',
    url: 'https://www.gcsemathsai.co.uk/features/parent-report',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const WHAT = [
  { title: 'Current predicted grade', desc: 'Updated every week based on every question they have answered. You see the trend, not just the number.' },
  { title: 'Honest progress, no spin', desc: 'Time studied, topics covered and the longest streak. If they have had a quiet week, you will see it.' },
  { title: 'Two specific areas to encourage', desc: 'Picked automatically from your child\'s practice history — small enough to fix, big enough to move the grade. Written in plain English.' },
  { title: 'Student-controlled', desc: 'Your child decides whether the email goes out, what it includes and how detailed it is. They can pause it any time.' },
]

export default function ParentReportPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: 'clamp(40px, 6vw, 64px) 20px', textAlign: 'center' }}>
        <Link href="/features" style={{ ...monoLabel, color: 'var(--ink-3)', textDecoration: 'none' }}>← Back to features</Link>
        <span style={{ ...monoLabel, color: 'var(--gold)', background: 'var(--gold-soft)', padding: '4px 14px', borderRadius: 999, display: 'inline-block', marginTop: 20, marginBottom: 16 }}>
          Feature · Parent Report
        </span>
        <h1 style={{ color: 'var(--ink)', fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0 auto 12px', maxWidth: 760 }}>
          A Monday morning email parents will <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>actually read</em>.
        </h1>
        <p style={{ color: 'var(--ink-3)', fontSize: 'clamp(14px, 1.6vw, 16px)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto 22px' }}>
          Predicted grade, hours studied, topics mastered. No nagging, no jargon. Sent at 8am every Monday — completely opt-in.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/auth" className="btn btn-primary">Turn on the Monday email →</Link>
          <Link href="/features" className="btn btn-outline">All features</Link>
        </div>
      </section>

      {/* Sample email */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
        <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>Example · A real Monday email</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
          What lands in <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>your inbox</em>.
        </h2>

        <article style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--rule)', background: 'var(--cream)' }}>
            <p style={{ ...monoLabel, color: 'var(--ink-3)', margin: '0 0 2px' }}>From · GCSEMathsAI</p>
            <p style={{ ...monoLabel, color: 'var(--ink-3)', margin: '0 0 8px' }}>To · parent@example.com</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: 0, fontFamily: 'var(--serif)', letterSpacing: '-0.01em' }}>Sophie&rsquo;s Maths Monday · this week&rsquo;s update</p>
          </div>

          <div style={{ padding: 24 }}>
            <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 18 }}>
              Good morning. Here is a quick update on Sophie&rsquo;s GCSE Maths progress.
            </p>

            <div style={{ background: 'var(--green-soft)', border: '1px solid var(--rule)', borderRadius: 10, padding: 18, marginBottom: 18 }}>
              <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 4 }}>Predicted grade</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--serif)', lineHeight: 1 }}>7</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>↑ up from 6 last week</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 8 }}>
                Based on 147 marked questions across the AQA Higher specification.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
              {[
                { label: 'Time studied', value: '4 hr 20 min' },
                { label: 'Topics practised', value: '8' },
                { label: 'Day streak', value: '12 days' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 10, padding: 12, textAlign: 'center' }}>
                  <p style={{ ...monoLabel, color: 'var(--ink-3)', margin: 0, fontSize: 10 }}>{s.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', margin: '4px 0 0', fontFamily: 'var(--serif)' }}>{s.value}</p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, fontFamily: 'var(--serif)' }}>What went well this week</p>
            <ul style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 18, paddingLeft: 18 }}>
              <li>Quadratic equations — full marks on 9 of 10 questions</li>
              <li>Cumulative frequency — comfortable with both medians and quartiles</li>
              <li>Stuck with the daily plan all seven days — longest streak yet</li>
            </ul>

            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginBottom: 6, fontFamily: 'var(--serif)' }}>Two areas worth a gentle word of encouragement</p>
            <ul style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: 18, paddingLeft: 18 }}>
              <li>Circle theorems — currently scoring 4/10. Likely to gain a full mark with one focused 30-minute session.</li>
              <li>Vector proofs — the type of question worth 5 marks at the back of the paper. Sophie hasn&rsquo;t practised these yet.</li>
            </ul>

            <p style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.6, paddingTop: 14, borderTop: '1px solid var(--rule)' }}>
              You&rsquo;re receiving this because Sophie turned on the Parent Report. She can switch it off any time from her dashboard. No teachers, schools or anyone else receives this email — only you.
            </p>
          </div>
        </article>
      </section>

      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px' }}>
          <p style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 8 }}>What every Monday email includes</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Four things in <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>every report</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {WHAT.map(s => (
              <div key={s.title} style={{ background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 22 }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</p>
                <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.01em' }}>
          The kind of update <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>parents have been asking for</em>.
        </h2>
        <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 22px' }}>
          Free with every account. Opt-in from your dashboard.
        </p>
        <Link href="/auth" className="btn btn-primary">Set up the email →</Link>
      </section>
    </main>
  )
}
