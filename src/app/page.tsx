'use client'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ padding: '80px 0 48px', position: 'relative' }}>
        <div className="wrap">
          <div className="an d1" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>
            <span style={{ flex: '0 0 48px', height: 1, background: 'var(--ink-3)' }} />
            <span style={{ color: 'var(--gold)' }}>No. 1</span>
            <span>An Oxford-style preparation for the GCSE Mathematics examination</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'start' }} className="hero-grid">
            <div>
              <h1 className="an d2">Preparation <em>worthy</em> of the <span className="underline">grade you want.</span></h1>
              <p className="an d3" style={{ fontSize: 19, color: 'var(--ink-2)', maxWidth: 540, lineHeight: 1.55, marginBottom: 36, fontWeight: 500 }}>
                Every topic on the AQA, Edexcel and OCR specifications — taught properly, marked like a real examiner, and organised into the kind of structured revision that actually moves your grade.
              </p>
              <div className="an d4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginBottom: 40 }}>
                <a className="btn btn-primary" href="/learn" style={{ padding: '13px 22px', fontSize: 15 }}>Begin your first topic &rarr;</a>
                <a className="btn btn-outline" href="/topics" style={{ padding: '13px 22px', fontSize: 15 }}>View the syllabus</a>
              </div>
              <div className="an d5" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' as const, padding: '20px 0', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
                {[
                  { num: <><em>73</em></>, label: 'TOPICS · FULL SPEC' },
                  { num: '+1.8', label: 'AVG. GRADE LIFT' },
                  { num: <>4.9<span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>&#9733;</span></>, label: 'FROM 812 STUDENTS' },
                  { num: '12,847', label: 'QUESTIONS MARKED / WK' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 700, color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.02em' }}>{c.num}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.02em' }}>{c.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Card */}
            <div className="an d3" style={{
              background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
              boxShadow: '0 1px 0 rgba(255,255,255,0.8) inset, 0 20px 50px -15px rgba(14,31,23,0.15), 0 2px 6px -1px rgba(14,31,23,0.08)',
              overflow: 'hidden', position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, var(--green) 0%, var(--green) 40%, var(--gold) 40%, var(--gold) 55%, var(--burgundy) 55%, var(--burgundy) 100%)' }} />
              <div style={{ padding: '16px 22px 14px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' as const, gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--green)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: 4, background: 'var(--green-soft)' }}>Topic 53 &middot; Higher</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 500 }}>Arc length & sector area</span>
                </div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', animation: 'softpulse 1.8s ease-in-out infinite', display: 'inline-block' }} />
                  Marking
                </span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  Exam-style question &middot; 4 marks
                  <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.45, color: 'var(--ink)', fontWeight: 500, marginBottom: 20, letterSpacing: '-0.005em' }}>
                  A sector has an area of <b style={{ color: 'var(--green)', fontWeight: 700, fontStyle: 'italic' }}>40 cm&sup2;</b> and a radius of <b style={{ color: 'var(--green)', fontWeight: 700, fontStyle: 'italic' }}>6 cm</b>. Find the angle of the sector, to the nearest degree.
                </div>

                {/* Workings */}
                <div style={{ background: 'var(--cream)', borderRadius: 10, padding: '18px 20px', border: '1px solid var(--rule)', fontFamily: 'var(--mono)', fontSize: 14, lineHeight: 1.9, fontWeight: 500 }}>
                  {[
                    { mark: 'ok', text: '40 = (\u03B8 / 360) \u00D7 \u03C0 \u00D7 6\u00B2', note: 'M1 \u00B7 formula' },
                    { mark: 'ok', text: '40 = (\u03B8 / 360) \u00D7 36\u03C0', note: 'M1 \u00B7 sub' },
                    { mark: 'err', text: '\u03B8 = 40 \u00D7 360 / 36', note: 'missing \u03C0' },
                    { mark: 'pending', text: '\u03B8 = \u2026', note: '' },
                  ].map((w, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0',
                      ...(i > 0 ? { borderTop: '1px dashed var(--rule)' } : {}),
                    }}>
                      <span style={{
                        width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center',
                        fontSize: 12, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--serif)',
                        ...(w.mark === 'ok' ? { background: 'var(--green)', color: 'var(--cream)' } :
                           w.mark === 'err' ? { background: 'var(--burgundy)', color: 'var(--cream)' } :
                           { background: 'var(--cream)', color: 'var(--ink-3)', border: '1.5px dashed var(--rule-2)' }),
                      }}>{w.mark === 'ok' ? '\u2713' : w.mark === 'err' ? '\u2715' : '\u00B7'}</span>
                      <span style={{ flex: 1, color: w.mark === 'err' ? 'var(--burgundy)' : w.mark === 'pending' ? 'var(--ink-4)' : 'var(--ink)', fontWeight: 600 }}>{w.text}</span>
                      {w.note && (
                        <span style={{
                          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.04em', padding: '3px 8px', borderRadius: 4,
                          ...(w.mark === 'err' ? { background: 'var(--burgundy-soft)', color: 'var(--burgundy)' } : { background: 'var(--green-soft)', color: 'var(--green)' }),
                        }}>{w.note}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Examiner note */}
                <div style={{ marginTop: 18, padding: '16px 18px', borderRadius: 10, background: 'var(--gold-soft)', borderLeft: '3px solid var(--gold)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 4 }}>Examiner&apos;s comment</span>
                    <p style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.55, fontWeight: 500 }}>
                      Your method is correct — <b style={{ color: 'var(--burgundy)', fontWeight: 700 }}>you&apos;ve dropped the &pi;</b> when rearranging. Both method marks awarded.
                    </p>
                  </div>
                </div>

                {/* Marks summary */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, marginTop: 16, borderTop: '1px solid var(--rule)', paddingTop: 16 }}>
                  {[
                    { label: 'Method', val: '2 / 2', cls: 'ok' },
                    { label: 'Accuracy', val: '0 / 2', cls: 'partial' },
                    { label: 'Total', val: '2 / 4', cls: '' },
                  ].map((m, i) => (
                    <div key={i} style={{ textAlign: 'center', padding: '6px 8px', borderRight: i < 2 ? '1px solid var(--rule)' : 'none' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, lineHeight: 1, color: m.cls === 'ok' ? 'var(--green)' : m.cls === 'partial' ? 'var(--gold)' : 'var(--ink)' }}>{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVERYTHING YOU NEED */}
      <section style={{ padding: '96px 0', background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div className="wrap-wide">
          <div style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: 760 }}>
            <div className="sec-label" style={{ margin: '0 auto 20px', justifyContent: 'center' }}>Everything for your GCSE</div>
            <h2>One destination. <em>Nothing left to find elsewhere.</em></h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>From the first topic in Year 10 to the final exam — lessons, practice, past papers, predicted grades, and a real AI examiner. All in one place.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 20 }} className="everything-grid">
            {/* Feature Hero — Predicted Grade */}
            <div className="e-card-hero" style={{
              gridColumn: 'span 6', background: 'var(--green)', color: 'var(--cream)', borderRadius: 12, padding: 24,
              position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(600px 300px at 100% 0%, rgba(247,243,234,0.1), transparent 60%)' }} />
              <div style={{ position: 'relative', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold-soft)', fontWeight: 700, letterSpacing: '0.08em' }}>&#9670; SIGNATURE FEATURE</div>
              <h3 style={{ position: 'relative', fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>Your predicted grade, <em style={{ color: 'var(--gold-soft)' }}>recalculated every single question.</em></h3>
              <p style={{ position: 'relative', fontSize: 14, color: 'var(--cream)', opacity: 0.85, lineHeight: 1.55 }}>Every answer you submit updates a rolling prediction of your final exam grade. No more guessing.</p>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 16 }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 80, fontWeight: 500, lineHeight: 0.9, letterSpacing: '-0.04em' }}>7</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: 'var(--gold-soft)' }}>&uarr; FROM GRADE 5</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, opacity: 0.7 }}>updated 2 min ago &middot; 147 questions</span>
                </div>
              </div>
            </div>

            {/* AI Examiner */}
            <div style={{ gridColumn: 'span 6', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>01 &middot; AI EXAMINER</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>The only AI that <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>marks your working</em>, not just your answer.</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>Trained on real mark schemes from AQA, Edexcel and OCR. Awards method marks exactly like a real examiner.</p>
              <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                <span>SEEN IN &middot; PRACTICE, TOPIC, EXAM SIMULATOR</span>
                <span style={{ color: 'var(--gold)' }}>All tiers</span>
              </div>
            </div>

            {/* Weak-spot Radar */}
            <div style={{ gridColumn: 'span 6', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>02 &middot; WEAK-SPOT RADAR</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>Find the <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>three topics</em> holding your grade back.</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>Every answer is logged. Our diagnostic pinpoints the topics where you&apos;re losing the most marks — and builds a daily revision plan.</p>
              <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                <span>UPDATES &middot; DAILY</span>
                <span style={{ color: 'var(--gold)' }}>Signature</span>
              </div>
            </div>

            {/* Exam Simulator */}
            <div style={{ gridColumn: 'span 4', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>03 &middot; EXAM SIMULATOR</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>Every past paper, marked <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>like the real thing.</em></h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>Full 2017-2025 archive. Take them timed — auto-marked with grade boundary comparison.</p>
              <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                <span>800+ PAPERS</span>
                <span style={{ color: 'var(--gold)' }}>All boards</span>
              </div>
            </div>

            {/* Ask the Margin */}
            <div style={{ gridColumn: 'span 4', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>04 &middot; ASK THE MARGIN</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>Highlight anything. <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>Get a tutor&apos;s explanation.</em></h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>See a formula you don&apos;t understand? Highlight it. A personalised explanation appears instantly.</p>
              <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                <span>ON EVERY TOPIC</span>
                <span style={{ color: 'var(--gold)' }}>Unlimited</span>
              </div>
            </div>

            {/* Study Hall */}
            <div style={{ gridColumn: 'span 4', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>05 &middot; STUDY HALL</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>You&apos;re never revising <em style={{ fontStyle: 'italic', color: 'var(--green)' }}>alone.</em></h3>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>See anonymised live activity from students on the same topic. Revision should feel like a library, not a bedroom.</p>
              <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                <span>ANONYMISED &middot; LIVE</span>
                <span style={{ color: 'var(--gold)' }}>First of its kind</span>
              </div>
            </div>

            {/* Small cards */}
            {[
              { num: '06', title: 'Formula Sheet', desc: 'Every formula you need. PDF or printed. Same format as the real exam.', cta: 'Download PDF', href: '/GCSE_Maths_Formula_Sheet.pdf', external: true, meta: ['FREE \u00B7 NO CARD', 'All boards'] },
              { num: '07', title: 'Revision Planner', desc: 'Set your exam date. We schedule 15-minute sessions around your weak spots.', cta: 'See an example', href: '/features/revision-planner', external: false, meta: ['UPDATED \u00B7 DAILY', 'Personalised'] },
              { num: '08', title: 'Writing Pad', desc: 'Tablet or phone. Write with a stylus or finger. AI recognises and marks it.', cta: 'Try it now', href: '/features/writing-pad', external: false, meta: ['IPAD \u00B7 PHONE', 'OCR-powered'] },
              { num: '09', title: 'Parent Report', desc: 'Monday morning email to parents. Current predicted grade, hours studied, topics mastered.', cta: 'See a sample', href: '/features/parent-report', external: false, meta: ['OPT-IN \u00B7 WEEKLY', 'Optional'] },
            ].map(c => (
              <div key={c.num} style={{ gridColumn: 'span 3', background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.08em' }}>{c.num}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, fontWeight: 500 }}>{c.desc}</p>
                <a
                  className="btn btn-outline"
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener' } : {})}
                  style={{ marginTop: 'auto', justifyContent: 'center' }}
                >
                  {c.cta}
                </a>
                <div style={{ padding: '12px 0 0', borderTop: '1px dashed var(--rule)', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
                  <span>{c.meta[0]}</span>
                  <span style={{ color: 'var(--gold)' }}>{c.meta[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE METHOD */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-label">The Method</div>
            <h2>Three principles that <em>actually move grades.</em></h2>
            <p className="sec-sub">Most revision sites give you more content. We give you the one thing a textbook can&apos;t: <b>feedback on the way you&apos;re thinking.</b></p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="method-grid">
            {[
              { num: 'I.', title: <>Marked like <em>a real examiner</em> marks.</>, desc: 'Method marks. Accuracy marks. Follow-through. When you slip up on line three, we still award what you earned on lines one and two — exactly the way AQA, Edexcel and OCR do.' },
              { num: 'II.', title: <>Built around <em>consistent</em> revision.</>, desc: "Fifteen minutes a day beats three hours on a Sunday. Your dashboard tracks where you've been, where you're weak, and what to do next." },
              { num: 'III.', title: <>A predicted grade that <em>responds</em>.</>, desc: 'Every question you answer refines a rolling prediction of your exam grade. Know exactly which topics are holding you back.' },
            ].map((m, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '32px 28px', transition: 'all 0.2s' }}>
                <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 56, fontWeight: 500, color: 'var(--green)', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 12, opacity: 0.9 }}>{m.num}</div>
                <h3 style={{ marginBottom: 12 }}>{m.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.6, fontWeight: 500 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDENT JOURNEYS */}
      <section>
        <div className="wrap">
          <div className="sec-head">
            <div className="sec-label">Student Journeys</div>
            <h2>The grades speak <em>for themselves.</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="journeys-grid">
            {[
              { quote: <>Went from a 5 to a 7 in eight weeks. The <em>method marking</em> is the thing that finally told me where I was actually losing marks.</>, name: 'Aaliyah Khan', detail: 'Year 11 \u00B7 Edexcel \u00B7 Higher', result: '5\u21927', initials: 'AK', bg: 'var(--green)' },
              { quote: <>Fifteen minutes before dinner, every day. Didn&apos;t feel like revision — and then I <em>actually knew everything</em> on the paper.</>, name: 'Jack Martin', detail: 'Year 10 \u00B7 AQA \u00B7 Foundation', result: '4\u21925', initials: 'JM', bg: 'var(--burgundy)' },
              { quote: <>Better than the &pound;40-an-hour tutor we were paying — and I could revise at <em>two in the morning</em> the night before the exam.</>, name: 'Priya Shah', detail: 'Year 11 \u00B7 OCR \u00B7 Higher', result: '6\u21929', initials: 'PS', bg: 'var(--navy)' },
            ].map((j, i) => (
              <div key={i} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '32px 28px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ position: 'absolute', top: 8, right: 28, fontFamily: 'var(--serif)', fontSize: 96, fontStyle: 'italic', fontWeight: 500, color: 'var(--green)', opacity: 0.12, lineHeight: 1 }}>&ldquo;</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 500, lineHeight: 1.4, color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: 20, position: 'relative' }}>{j.quote}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 18, borderTop: '1px solid var(--rule)', marginTop: 'auto' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: j.bg, color: 'var(--cream)', display: 'grid', placeItems: 'center', fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 16 }}>{j.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.005em' }}>{j.name}</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--ink-3)', fontWeight: 500, marginTop: 2 }}>{j.detail}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'baseline', gap: 4, letterSpacing: '-0.01em' }}>
                    {j.result}<small style={{ fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontStyle: 'normal' }}>grade</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="wrap">
          <div style={{
            background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 16, padding: '72px 64px',
            position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(14,31,23,0.08)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--green), var(--gold) 50%, var(--burgundy))' }} />
            <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: 24 }}>APRIL &middot; MMXXVI</div>
              <h2>Start tonight. <em>Thank yourself in May.</em></h2>
              <p style={{ fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: 32, fontWeight: 500 }}>
                Free to begin, no card required. Every student who finishes the first topic earns a free copy of our GCSE Maths Formula Sheet.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                <a className="btn btn-primary" href="/learn" style={{ padding: '14px 26px', fontSize: 15 }}>Begin your first topic &rarr;</a>
                <a className="btn btn-outline" href="/formula-sheet" style={{ padding: '14px 26px', fontSize: 15 }}>Download the formula sheet</a>
              </div>
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--ink-3)', fontWeight: 500 }}>
                &mdash; <span>the GCSEMathsAI team, London</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        @media (max-width: 900px) {
          .everything-grid > * { grid-column: span 12 !important; }
          .method-grid { grid-template-columns: 1fr !important; }
          .journeys-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
