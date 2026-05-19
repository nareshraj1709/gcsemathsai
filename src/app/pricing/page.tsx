'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'

/* ── plan data ── */
const SCHOLAR_FEATURES = [
  'Full GCSE syllabus coverage',
  '20 practice questions per day',
  'Instant examiner-style marking with feedback',
  'Study notes and worked examples',
  'Foundation and Higher tier',
  'AQA, Edexcel and OCR boards',
  'Progress dashboard',
  'Daily revision streaks',
]

const STUDENT_FEATURES = [
  'Everything in Scholar, plus:',
  'Unlimited practice questions',
  'Full past paper archive (2015-2024)',
  'Original practice papers',
  'Timed exam conditions mode',
  'Grade boundary estimates',
  'Personalised revision schedule',
  'Predicted grade tracking',
  'Topic-by-topic mark breakdown',
  'Priority marking queue',
  'No adverts',
]

const SCHOOL_FEATURES = [
  'Everything in Student Unlimited, plus:',
  'Teacher admin dashboard',
  'Class-wide progress reports',
  'Set homework and assignments',
  'Export data to school MIS',
  'Dedicated account manager',
  'Staff training session included',
  'Custom branding options',
  'Invoice billing (no cards)',
]

const COMPARISON = {
  'Learning content': [
    { feature: 'Full GCSE syllabus', scholar: true, student: true, school: true },
    { feature: 'Study notes and formulae', scholar: true, student: true, school: true },
    { feature: 'Curated video links', scholar: true, student: true, school: true },
    { feature: 'Worked examples', scholar: true, student: true, school: true },
  ],
  'Marking': [
    { feature: 'Instantly-marked questions', scholar: '20/day', student: 'Unlimited', school: 'Unlimited' },
    { feature: 'Step-by-step feedback', scholar: true, student: true, school: true },
    { feature: 'Priority marking queue', scholar: false, student: true, school: true },
    { feature: 'Mark scheme alignment', scholar: true, student: true, school: true },
  ],
  'Past papers': [
    { feature: 'Past paper archive', scholar: false, student: true, school: true },
    { feature: 'Timed exam mode', scholar: false, student: true, school: true },
    { feature: 'Original practice papers', scholar: false, student: true, school: true },
    { feature: 'Grade boundary estimates', scholar: false, student: true, school: true },
  ],
  'Personalisation': [
    { feature: 'Progress dashboard', scholar: true, student: true, school: true },
    { feature: 'Revision streaks', scholar: true, student: true, school: true },
    { feature: 'Personalised schedule', scholar: false, student: true, school: true },
    { feature: 'Predicted grade', scholar: false, student: true, school: true },
  ],
  'Schools': [
    { feature: 'Teacher dashboard', scholar: false, student: false, school: true },
    { feature: 'Class progress reports', scholar: false, student: false, school: true },
    { feature: 'Homework setting', scholar: false, student: false, school: true },
    { feature: 'MIS data export', scholar: false, student: false, school: true },
  ],
}

const TRUST_STATS = [
  { value: '+1.8', label: 'average grade lift', sub: 'after 8 weeks of use' },
  { value: '4.9', label: 'star rating', sub: 'from 2,400+ reviews' },
  { value: '12k+', label: 'questions per week', sub: 'answered by students' },
  { value: '93%', label: 'hit their target', sub: 'grade in summer exams' },
]

const FAQS = [
  {
    q: 'Is the Scholar plan really free?',
    a: 'Yes -- the Scholar plan is completely free with no credit card required. You get 20 AI-marked questions per day, full syllabus coverage, study notes and a progress dashboard. It is genuinely free, not a time-limited trial.',
  },
  {
    q: 'Can I cancel Student Unlimited at any time?',
    a: 'Absolutely. There is no contract and no cancellation fee. You can cancel from your account settings and your access continues until the end of your billing period. If you pay yearly and cancel, we will pro-rata refund the remaining months.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) as well as Apple Pay and Google Pay. School licences can be paid by invoice or BACS transfer.',
  },
  {
    q: 'Is this suitable for Year 9 students?',
    a: 'Yes. Year 9 students can use the Foundation tier questions to build early confidence before they begin their GCSE courses in Year 10. The personalised schedule adapts to their current level.',
  },
  {
    q: 'How does the yearly billing work?',
    a: 'When you choose yearly billing, you pay for 12 months upfront and receive a 40% discount compared to monthly billing. Your subscription auto-renews annually unless you cancel.',
  },
  {
    q: 'Can my school get a free trial?',
    a: 'Yes. We offer a 30-day free trial for schools with no obligation. Contact us and we will set up your school account with full access for all staff and students.',
  },
  {
    q: 'Do you offer family discounts?',
    a: 'If you have multiple children using GCSEMathsAI, contact us for a family plan. We typically offer 25% off the second subscription and 50% off any additional children.',
  },
  {
    q: 'What happens to my progress if I downgrade?',
    a: 'Your progress, scores and streaks are never deleted. If you downgrade from Student Unlimited to Scholar, you keep your history but lose access to unlimited questions and past papers. You can upgrade again at any time and everything will be right where you left it.',
  },
]

export default function PricingPage() {
  const [yearly, setYearly] = useState(false)

  const studentPrice = yearly ? '5.40' : '9'
  const studentPer = yearly ? '/mo, billed yearly' : '/month'
  const schoolPrice = yearly ? '2.40' : '4'
  const schoolPer = yearly ? '/student/mo, billed yearly' : '/student/month'

  return (
    <main style={{ minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ padding: '80px 0 48px', textAlign: 'center' }}>
        <div className="wrap">
          <p className="sec-label an">Pricing</p>
          <h1 className="an d1" style={{ marginBottom: 16 }}>
            Simple, <em>honest</em> pricing
          </h1>
          <p className="sec-sub an d2" style={{ maxWidth: 520, margin: '0 auto 40px', textAlign: 'center' }}>
            Start free. Upgrade when you are ready. No hidden fees, no surprises.
          </p>

          {/* Billing toggle */}
          <div className="an d3" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: 'var(--paper)', border: '1px solid var(--rule)',
            borderRadius: 999, padding: '6px 8px',
          }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: '8px 20px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none',
                background: !yearly ? 'var(--ink)' : 'transparent',
                color: !yearly ? 'var(--cream)' : 'var(--ink-3)',
                transition: 'all 0.2s',
              }}
            >Monthly</button>
            <button
              onClick={() => setYearly(true)}
              style={{
                padding: '8px 20px', borderRadius: 999, fontSize: 14, fontWeight: 600,
                fontFamily: 'var(--sans)', cursor: 'pointer', border: 'none',
                background: yearly ? 'var(--ink)' : 'transparent',
                color: yearly ? 'var(--cream)' : 'var(--ink-3)',
                transition: 'all 0.2s',
              }}
            >Yearly</button>
            <span className="pill pill-green" style={{ fontSize: 10, padding: '4px 10px' }}>
              Save 40%
            </span>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div className="wrap" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          alignItems: 'start',
        }}>

          {/* Scholar (Free) */}
          <div className="card an d1" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '32px 28px 24px' }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
                marginBottom: 8,
              }}>I</p>
              <h3 style={{ marginBottom: 6 }}>Scholar</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 24 }}>
                Everything you need to start revising. No card required.
              </p>
              <div style={{ marginBottom: 24 }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 600,
                  letterSpacing: '-0.03em', color: 'var(--ink)',
                }}>&#163;0</span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)', marginLeft: 4 }}>forever free</span>
              </div>
              <a href="/dashboard" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                Get started free
              </a>
            </div>
            <div style={{
              borderTop: '1px solid var(--rule)', padding: '24px 28px 32px',
            }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {SCHOLAR_FEATURES.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--ink-2)' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--green-soft)', color: 'var(--green)',
                      display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700,
                      flexShrink: 0, marginTop: 1,
                    }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Student Unlimited (Featured) */}
          <div className="an d2" style={{
            background: 'var(--paper)',
            border: '2px solid var(--green)',
            borderRadius: 14,
            padding: 0,
            overflow: 'hidden',
            boxShadow: '0 24px 60px -15px rgba(15,79,58,0.2), 0 4px 12px -2px rgba(15,79,58,0.1)',
            position: 'relative',
          }}>
            {/* Most popular badge */}
            <div style={{
              position: 'absolute', top: 16, right: 16, zIndex: 2,
              background: 'var(--green)', color: 'var(--cream)',
              fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 999,
            }}>Most popular</div>

            <div style={{ padding: '32px 28px 24px' }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--green)',
                marginBottom: 8,
              }}>II</p>
              <h3 style={{ marginBottom: 6 }}>Student Unlimited</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 24 }}>
                Unlimited practice, past papers and a personalised revision plan.
              </p>
              <div style={{ marginBottom: 24 }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 600,
                  letterSpacing: '-0.03em', color: 'var(--ink)',
                }}>&#163;{studentPrice}</span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)', marginLeft: 4 }}>{studentPer}</span>
              </div>
              <a href="/dashboard" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Start 7-day free trial
              </a>
            </div>
            <div style={{
              borderTop: '1px solid var(--rule)', padding: '24px 28px 32px',
            }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {STUDENT_FEATURES.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14,
                    color: f.startsWith('Everything') ? 'var(--green)' : 'var(--ink-2)',
                    fontWeight: f.startsWith('Everything') ? 600 : 500,
                  }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--green-soft)', color: 'var(--green)',
                      display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700,
                      flexShrink: 0, marginTop: 1,
                    }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* School Licence */}
          <div className="card an d3" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '32px 28px 24px' }}>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)',
                marginBottom: 8,
              }}>III</p>
              <h3 style={{ marginBottom: 6 }}>School Licence</h3>
              <p style={{ fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5, marginBottom: 24 }}>
                Whole-school access with teacher dashboards and reporting.
              </p>
              <div style={{ marginBottom: 24 }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: 48, fontWeight: 600,
                  letterSpacing: '-0.03em', color: 'var(--ink)',
                }}>&#163;{schoolPrice}</span>
                <span style={{ fontSize: 14, color: 'var(--ink-3)', marginLeft: 4 }}>{schoolPer}</span>
              </div>
              <a href="/contact" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                Contact sales
              </a>
            </div>
            <div style={{
              borderTop: '1px solid var(--rule)', padding: '24px 28px 32px',
            }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {SCHOOL_FEATURES.map(f => (
                  <li key={f} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14,
                    color: f.startsWith('Everything') ? 'var(--gold)' : 'var(--ink-2)',
                    fontWeight: f.startsWith('Everything') ? 600 : 500,
                  }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--gold-soft)', color: 'var(--gold)',
                      display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700,
                      flexShrink: 0, marginTop: 1,
                    }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Responsive override for cards grid */}
        <style>{`
          @media (max-width: 900px) {
            .wrap > [style*="grid-template-columns: repeat(3"] {
              grid-template-columns: 1fr !important;
              max-width: 480px !important;
              margin: 0 auto !important;
            }
          }
        `}</style>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--rule)' }}>
        <div className="wrap">
          <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 56px', maxWidth: 760 }}>
            <p className="sec-label">Compare plans</p>
            <h2>Feature-by-feature <em>comparison</em></h2>
            <p className="sec-sub" style={{ margin: '0 auto' }}>
              See exactly what each plan includes so you can choose with confidence.
            </p>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse', minWidth: 640,
              fontFamily: 'var(--sans)', fontSize: 14,
            }}>
              <thead>
                <tr>
                  <th style={{
                    textAlign: 'left', padding: '12px 16px', borderBottom: '2px solid var(--rule)',
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
                  }}>Feature</th>
                  <th style={{
                    textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid var(--rule)',
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
                  }}>Scholar</th>
                  <th style={{
                    textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid var(--rule)',
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--green)',
                  }}>Student</th>
                  <th style={{
                    textAlign: 'center', padding: '12px 16px', borderBottom: '2px solid var(--rule)',
                    fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)',
                  }}>School</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(COMPARISON).map(([category, rows]) => (
                  <>
                    <tr key={`cat-${category}`}>
                      <td colSpan={4} style={{
                        padding: '20px 16px 8px',
                        fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 600,
                        color: 'var(--ink)', letterSpacing: '-0.01em',
                      }}>{category}</td>
                    </tr>
                    {rows.map(row => (
                      <tr key={row.feature} style={{ borderBottom: '1px solid var(--rule)' }}>
                        <td style={{ padding: '12px 16px', color: 'var(--ink-2)' }}>{row.feature}</td>
                        {(['scholar', 'student', 'school'] as const).map(plan => {
                          const val = row[plan]
                          return (
                            <td key={plan} style={{ textAlign: 'center', padding: '12px 16px' }}>
                              {val === true ? (
                                <span style={{ color: 'var(--green)', fontSize: 16, fontWeight: 700 }}>&#10003;</span>
                              ) : val === false ? (
                                <span style={{ color: 'var(--ink-4)', fontSize: 16 }}>&mdash;</span>
                              ) : (
                                <span style={{
                                  fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600,
                                  color: 'var(--ink-2)',
                                }}>{val}</span>
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section style={{
        padding: '64px 0',
        background: 'var(--green-soft)',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
      }}>
        <div className="wrap">
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }}>
            {TRUST_STATS.map(s => (
              <div key={s.label} className="card" style={{
                textAlign: 'center', padding: '28px 20px',
                background: 'var(--paper)',
              }}>
                <p style={{
                  fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 600,
                  color: 'var(--green)', letterSpacing: '-0.02em', marginBottom: 4,
                }}>{s.value}</p>
                <p style={{
                  fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4,
                }}>{s.label}</p>
                <p style={{
                  fontSize: 12, color: 'var(--ink-3)',
                }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .wrap > [style*="grid-template-columns: repeat(4"] {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .wrap > [style*="grid-template-columns: repeat(4"],
            .wrap > [style*="grid-template-columns: repeat(2"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 48px' }}>
            <p className="sec-label">FAQ</p>
            <h2>Common <em>questions</em></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map(faq => (
              <details key={faq.q} style={{
                background: 'var(--paper)', border: '1px solid var(--rule)',
                borderRadius: 12, overflow: 'hidden',
              }}>
                <summary style={{
                  padding: '18px 24px', fontSize: 15, fontWeight: 600,
                  color: 'var(--ink)', cursor: 'pointer', listStyle: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 16,
                }}>
                  {faq.q}
                  <span style={{
                    fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--gold)',
                    fontStyle: 'italic', flexShrink: 0, transition: 'transform 0.2s',
                  }}>+</span>
                </summary>
                <div style={{
                  padding: '0 24px 20px', fontSize: 14, color: 'var(--ink-2)',
                  lineHeight: 1.65,
                }}>
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{
        padding: '80px 0', background: 'var(--ink)',
        textAlign: 'center', color: 'var(--cream)',
      }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <p className="sec-label" style={{ color: 'var(--gold)' }}>Get started</p>
          <h2 style={{ color: 'var(--cream)', marginBottom: 16 }}>
            Start revising <em>today</em>
          </h2>
          <p style={{
            fontSize: 16, color: 'var(--cream)', opacity: 0.7,
            lineHeight: 1.55, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px',
          }}>
            Join thousands of students already improving their GCSE Maths grade. Start free, upgrade anytime.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/dashboard" className="btn btn-primary" style={{
              background: 'var(--cream)', color: 'var(--ink)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              Create your free account
            </a>
            <a href="/" className="btn btn-ghost" style={{ color: 'var(--cream)', opacity: 0.8 }}>
              See the product
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Global responsive styles for this page ── */}
      <style>{`
        @media (max-width: 900px) {
          section > .wrap > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
            max-width: 480px !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
        @media (max-width: 768px) {
          section > .wrap > div[style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          section > .wrap > div[style*="grid-template-columns: repeat(4"],
          section > .wrap > div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
        details summary::-webkit-details-marker { display: none; }
        details[open] summary span:last-child {
          transform: rotate(45deg);
        }
      `}</style>
    </main>
  )
}
