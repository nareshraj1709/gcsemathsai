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

export default function ParentReportPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: 'var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <Link href="/features" className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--ink-3)' }}>
            ← Back to features
          </Link>
          <div className="text-5xl mt-6 mb-4">📬</div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: 'var(--green)', background: 'var(--green-soft)' }}>
            Feature · Parent Report
          </span>
          <h1 className="text-4xl font-bold mt-5 mb-4 max-w-2xl mx-auto leading-tight" style={{ color: 'var(--ink)', fontFamily: 'var(--serif)' }}>
            A Monday morning email parents will <em>actually read</em>.
          </h1>
          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--ink-3)' }}>
            Predicted grade, hours studied, topics mastered. No nagging, no jargon. Sent at 8am every Monday — completely opt-in.
          </p>
          <div className="flex gap-3 justify-center flex-wrap mt-8">
            <Link href="/auth" className="text-white px-7 py-3 rounded-xl font-semibold text-sm shadow-md" style={{ background: 'var(--green)' }}>
              Turn on the Monday email →
            </Link>
            <Link href="/features" className="px-6 py-3 rounded-xl font-semibold text-sm" style={{ background: 'var(--paper)', color: 'var(--ink-2)', border: '1px solid var(--rule)' }}>
              All features
            </Link>
          </div>
        </div>
      </section>

      {/* Sample email */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: 'var(--gold)' }}>
          Example · A real Monday email
        </div>
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
          What lands in <em>your inbox</em>.
        </h2>

        <article className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'var(--paper)', border: '1px solid var(--rule)' }}>
          {/* Email header */}
          <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--rule)', background: 'var(--cream)' }}>
            <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--ink-3)' }}>From · GCSEMathsAI</div>
            <div className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--ink-3)' }}>To · parent@example.com</div>
            <div className="text-sm font-bold" style={{ color: 'var(--ink)' }}>Sophie&rsquo;s Maths Monday · this week&rsquo;s update</div>
          </div>

          <div className="px-6 py-6">
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--ink-2)' }}>
              Good morning. Here is a quick update on Sophie&rsquo;s GCSE Maths progress.
            </p>

            {/* Predicted grade card */}
            <div className="rounded-lg p-5 mb-5" style={{ background: 'var(--green-soft)', border: '1px solid var(--green-mid, #c5e1c5)' }}>
              <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--green)' }}>Predicted grade</div>
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold font-serif" style={{ color: 'var(--ink)' }}>7</span>
                <span className="text-sm font-semibold" style={{ color: 'var(--green)' }}>↑ up from 6 last week</span>
              </div>
              <div className="text-xs mt-2" style={{ color: 'var(--ink-3)' }}>
                Based on 147 marked questions across the AQA Higher specification.
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: 'Time studied', value: '4 hr 20 min' },
                { label: 'Topics practised', value: '8' },
                { label: 'Day streak', value: '12 days' },
              ].map(s => (
                <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
                  <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: 'var(--ink-3)' }}>{s.label}</div>
                  <div className="text-base font-bold" style={{ color: 'var(--ink)' }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Where she's strong */}
            <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--ink)' }}>What went well this week</h3>
            <ul className="text-sm leading-relaxed mb-5 ml-4 list-disc" style={{ color: 'var(--ink-2)' }}>
              <li>Quadratic equations — full marks on 9 of 10 questions</li>
              <li>Cumulative frequency — comfortable with both medians and quartiles</li>
              <li>Stuck with the daily plan all seven days — longest streak yet</li>
            </ul>

            {/* Where to focus */}
            <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--ink)' }}>Two areas worth a gentle word of encouragement</h3>
            <ul className="text-sm leading-relaxed mb-5 ml-4 list-disc" style={{ color: 'var(--ink-2)' }}>
              <li>Circle theorems — currently scoring 4/10. Likely to gain a full mark with one focused 30-minute session.</li>
              <li>Vector proofs — the type of question worth 5 marks at the back of the paper. Sophie hasn&rsquo;t practised these yet.</li>
            </ul>

            <p className="text-xs mt-6 pt-4" style={{ color: 'var(--ink-3)', borderTop: '1px solid var(--rule)' }}>
              You&rsquo;re receiving this because Sophie turned on the Parent Report. She can switch it off any time from her dashboard. No teachers, schools or anyone else receives this email — only you.
            </p>
          </div>
        </article>
      </section>

      {/* What's in it */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--serif)', color: 'var(--ink)' }}>
            What every Monday email includes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Current predicted grade', desc: 'Updated every week based on every question they&rsquo;ve answered. You see the trend, not just the number.' },
              { title: 'Honest progress, no spin', desc: 'Time studied, topics covered and the longest streak. If they&rsquo;ve had a quiet week, you&rsquo;ll see it.' },
              { title: 'Two specific areas to encourage', desc: 'Picked by the AI — small enough to fix, big enough to move the grade. Written in plain English.' },
              { title: 'Student-controlled', desc: 'Your child decides whether the email goes out, what it includes and how detailed it is. They can pause it any time.' },
            ].map(s => (
              <div key={s.title} className="rounded-xl p-6" style={{ background: 'var(--cream)', border: '1px solid var(--rule)' }}>
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
          The kind of update <em>parents have been asking for</em>.
        </h2>
        <p className="mb-7 max-w-lg mx-auto text-sm" style={{ color: 'var(--ink-3)' }}>
          Free with every account. Opt-in from your dashboard.
        </p>
        <Link href="/auth" className="inline-block text-white font-semibold px-8 py-3 rounded-xl text-sm shadow-md" style={{ background: 'var(--green)' }}>
          Set up the email →
        </Link>
      </section>
    </main>
  )
}
