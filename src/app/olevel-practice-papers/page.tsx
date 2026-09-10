import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import { OLEVEL_FILES, OLEVEL_PRODUCT, getOlevelCheckoutUrl } from '@/lib/olevel-papers'

export const metadata: Metadata = {
  title: 'O-Level Maths Practice Papers — 10 Papers with Full Solutions',
  description: 'Ten O-Level Additional/Elementary Mathematics practice papers with complete worked solutions. Instant PDF download, $20 SGD.',
  keywords: [
    'o level maths practice papers',
    'o level maths papers with answers',
    'o level mathematics practice singapore',
    'o level maths revision',
    'secondary school maths practice papers',
  ],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/olevel-practice-papers' },
  openGraph: {
    title: 'O-Level Maths Practice Papers — 10 Papers with Full Solutions',
    description: 'Ten O-Level Maths practice papers with complete worked solutions. Instant PDF download, $20 SGD.',
    url: 'https://www.gcsemathsai.co.uk/olevel-practice-papers',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }
const checkoutUrl = getOlevelCheckoutUrl()

const BENEFITS = [
  { icon: '✓', title: 'Exam-format questions', desc: 'Structured like the real O-Level Maths paper, not generic worksheet questions.' },
  { icon: '✓', title: 'Complete worked solutions', desc: 'Every question has a full step-by-step solution, not just a final answer — so you understand the method, not just the result.' },
  { icon: '✓', title: '10 full practice papers', desc: 'A complete set spanning the breadth of the O-Level Maths syllabus, not a single-topic drill sheet.' },
  { icon: '✓', title: 'Instant download', desc: 'No waiting for shipping. Pay once, download all 10 PDFs immediately.' },
  { icon: '✓', title: 'Print or practice on-screen', desc: 'Clean, printable PDF layout — use at home, at a tuition centre, or on a tablet.' },
  { icon: '✓', title: 'One-off payment', desc: 'No subscription, no recurring charge. $20 SGD once, yours to keep and reuse right up to exam day.' },
  { icon: '✓', title: 'Watermarked, licensed copy', desc: 'Your own personal-use copy — clear, distraction-free formatting for independent practice.' },
]

const FAQS = [
  {
    q: 'What exactly do I get when I buy?',
    a: 'All 10 O-Level Mathematics practice papers as PDF files, each with a complete worked-solution section, delivered as an instant download after payment.',
  },
  {
    q: 'Are these real past O-Level papers?',
    a: 'No — these are original practice papers written in the style and format of the O-Level Mathematics paper. Official past papers are not publicly resold; this set is designed to give equivalent practice.',
  },
  {
    q: 'Do the papers come with answers and explanations, or just answers?',
    a: 'Full worked solutions — each answer shows the method and steps, not just the final number.',
  },
  {
    q: 'Is this Elementary Maths or Additional Maths?',
    a: 'These papers are written at O-Level Mathematics (Elementary Maths) level. If you need Additional Mathematics practice specifically, contact us before buying to confirm fit.',
  },
  {
    q: 'How quickly can I start after paying?',
    a: 'Immediately. After checkout you’re taken straight to a download page for all 10 PDFs, and we also email you the links as a backup.',
  },
  {
    q: 'Is it a one-off payment or a subscription?',
    a: 'One-off. $20 SGD once — no recurring billing.',
  },
  {
    q: 'Can I print the papers?',
    a: 'Yes — they’re formatted as clean, printable PDFs.',
  },
  {
    q: 'What if something goes wrong with my download?',
    a: 'Email enquiriesgcsemath@yahoo.com with the address you used at checkout and we’ll sort it out directly.',
  },
]

export default function OlevelPracticePapersPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #1A2D22 50%, var(--green-dark) 100%)',
        padding: 'clamp(48px, 8vw, 80px) 24px', textAlign: 'center', color: 'var(--cream)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,137,61,0.15), transparent 60%)' }} />
        <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
          <span style={{
            ...monoLabel, color: '#fff', background: 'var(--navy)',
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            padding: '6px 14px', borderRadius: 999,
          }}>
            10 full papers · fully worked solutions
          </span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 16 }}>
            10 O-Level Maths Practice Papers, <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>Fully Worked</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.85, maxWidth: 560, margin: '0 auto 28px', fontWeight: 500 }}>
            A complete set of exam-style questions with full step-by-step solutions — so you practise like it&rsquo;s the real thing, and understand every mark. Instant PDF download.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <a href={checkoutUrl} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: 'var(--cream)',
              padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans)',
              textDecoration: 'none', boxShadow: '0 2px 8px -1px rgba(184,137,61,0.4)',
            }}>
              Get All 10 Papers — {OLEVEL_PRODUCT.priceDisplay}
            </a>
            <a href="#whats-inside" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--cream)',
              padding: '14px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'var(--sans)',
              textDecoration: 'none', border: '1.5px solid rgba(247,243,234,0.3)',
            }}>
              See what&rsquo;s included
            </a>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(247,243,234,0.5)', marginTop: 14 }}>
            One-off payment &middot; Instant download &middot; 10 full papers with worked solutions
          </p>
        </div>
      </section>

      {/* Problem / solution */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div style={{ background: 'var(--burgundy-soft)', border: '1px solid var(--burgundy)', borderRadius: 14, padding: 24 }}>
            <p style={{ ...monoLabel, color: 'var(--burgundy)', marginBottom: 10 }}>The problem</p>
            <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
              Free worksheets online are scattered and single-topic, and rarely show full working — leaving you unsure what&rsquo;s actually covered, and unsure why an answer is right.
            </p>
          </div>
          <div style={{ background: 'var(--green-soft)', border: '1px solid var(--green)', borderRadius: 14, padding: 24 }}>
            <p style={{ ...monoLabel, color: 'var(--green)', marginBottom: 10 }}>The fix</p>
            <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.65, margin: 0 }}>
              One structured set: ten exam-length papers, every question fully solved step by step, downloadable in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside — 10 papers */}
      <section id="whats-inside" style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px' }}>
          <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>What&rsquo;s Inside</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            10 full <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>practice papers</em>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 560, marginBottom: 32 }}>
            Each paper is a complete set of exam-style questions, plus a full worked-solutions section.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
            {OLEVEL_FILES.map((f, i) => (
              <div key={f.filename} style={{
                background: 'var(--cream)', border: '1px solid var(--rule)', borderRadius: 12,
                padding: '18px 18px', display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9, background: 'var(--green)', color: 'var(--cream)',
                  display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px' }}>
        <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10, textAlign: 'center' }}>Why This Bundle</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 32px', letterSpacing: '-0.01em', textAlign: 'center' }}>
          Built for <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>focused exam prep</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12, padding: '20px 20px' }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, background: 'var(--green-soft)', color: 'var(--green)',
                display: 'grid', placeItems: 'center', fontWeight: 700, marginBottom: 12,
              }}>{b.icon}</div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 16, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{b.title}</p>
              <p style={{ fontSize: 13.5, color: 'var(--ink-3)', lineHeight: 1.55, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px', textAlign: 'center' }}>
          <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>Pricing</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 28px' }}>
            One bundle. Everything included.
          </h2>
          <div style={{
            background: 'var(--green)', borderRadius: 16, padding: 'clamp(28px, 4vw, 36px) 28px',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--gold)', color: '#fff', fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase' as const, padding: '5px 14px', borderRadius: 999,
            }}>Best seller</span>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 600, color: '#fff', margin: '8px 0 4px' }}>
              Full 10-Paper Set
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 700, color: '#fff', margin: '4px 0 4px' }}>
              {OLEVEL_PRODUCT.priceDisplay}
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: '0 0 20px' }}>
              one-off payment &middot; instant download
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', textAlign: 'left', display: 'grid', gap: 8 }}>
              {[
                '10 full practice papers',
                'Complete worked solutions for every question',
                'Instant PDF download after payment',
                'Print-ready, watermarked personal-use copy',
                'One-off payment — no subscription',
              ].map(item => (
                <li key={item} style={{ display: 'flex', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
                  <span style={{ color: 'var(--gold-soft)', flexShrink: 0 }}>✓</span>{item}
                </li>
              ))}
            </ul>
            <a href={checkoutUrl} style={{
              display: 'block', background: '#fff', color: 'var(--green)', padding: '14px 0',
              borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans)', textDecoration: 'none',
            }}>
              Buy Now — {OLEVEL_PRODUCT.priceDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px' }}>
        <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10, textAlign: 'center' }}>FAQ</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 28px', textAlign: 'center' }}>
          Common questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
          {FAQS.map((f, i) => (
            <details key={i} style={{ background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 10, padding: '14px 18px' }}>
              <summary style={{ cursor: 'pointer', fontFamily: 'var(--serif)', fontSize: 15.5, fontWeight: 600, color: 'var(--ink)', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, margin: '10px 0 0' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px' }}>
            Start practising today
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 24 }}>
            Instant download &middot; one-off payment &middot; {OLEVEL_PRODUCT.priceDisplay}
          </p>
          <a href={checkoutUrl} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--burgundy)', color: '#fff',
            padding: '16px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans)',
            textDecoration: 'none',
          }}>
            Get All 10 Papers — {OLEVEL_PRODUCT.priceDisplay}
          </a>
          <p style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 24, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.5 }}>
            Independent revision resource, written to reflect the format of O-Level Mathematics exam papers. Not affiliated with or endorsed by SEAB, Cambridge Assessment, or Singapore&rsquo;s Ministry of Education (MOE).
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
