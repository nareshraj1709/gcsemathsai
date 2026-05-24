import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Papers 2 & 3 Final Push Bundle — Edexcel Higher 2026 | GCSEMathsAI',
  description: 'Free revision bundle for Edexcel GCSE Maths Higher Papers 2 & 3 — key topics, worked examples, calculator skills, 17-day revision plan and formula quick sheet.',
  keywords: ['GCSE maths paper 2 revision', 'GCSE maths paper 3 revision', 'edexcel higher revision bundle', 'GCSE maths calculator paper revision', 'GCSE maths 2026 revision pack'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/higher-bundle' },
  openGraph: {
    title: 'Papers 2 & 3 Final Push Bundle — Edexcel Higher 2026',
    description: 'Free revision bundle: key topics, worked examples, calculator skills, 17-day plan and formula sheet.',
    url: 'https://www.gcsemathsai.co.uk/higher-bundle',
  },
}

const monoLabel = { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const }

const BUNDLE_ITEMS = [
  {
    title: 'Key Topics, Formulae & Worked Examples',
    desc: 'The essential Higher-tier topics most likely to appear on Papers 2 and 3, with every formula you need and fully worked exam-style examples showing exactly how marks are awarded.',
    file: '/higher-bundle/Papers-2-and-3---Key-Topics-Formulae-and-Worked-Examples-Higher.pdf',
    icon: '1',
    highlights: ['High-frequency topic breakdown', 'Every Higher formula listed', 'Step-by-step worked solutions', 'Mark scheme annotations'],
  },
  {
    title: 'Calculator Skills for Papers 2 & 3',
    desc: 'A focused guide to the calculator techniques that save time and prevent errors — fractions, trigonometry, standard form, ANS key chains, and checking answers efficiently.',
    file: '/higher-bundle/2---Calculator-Skills-for-Papers-2-and-3.pdf',
    icon: '2',
    highlights: ['Fraction and mixed number entry', 'Trig functions and degree mode', 'Standard form on calculator', 'ANS key for chain calculations'],
  },
  {
    title: '17-Day Countdown Revision Plan',
    desc: 'A day-by-day revision schedule from now until your final paper. Each day targets specific topics with clear action items — no guesswork, just focused revision.',
    file: '/higher-bundle/3---17-Day-Countdown-Revision-Plan.pdf',
    icon: '3',
    highlights: ['Day-by-day topic schedule', 'Balanced across all 5 strands', 'Built around Paper 2 and Paper 3 dates', 'Rest days included'],
  },
  {
    title: 'Calculator Papers Formula Quick Sheet',
    desc: 'A single-page printable cheat sheet with every formula you need for the calculator papers — pin it to your wall or keep it in your revision folder.',
    file: '/higher-bundle/FREE-BONUS---Calculator-Papers-Formula-Quick-Sheet.pdf',
    icon: '★',
    highlights: ['One-page printable format', 'Grouped by topic strand', 'Covers Higher and Foundation', 'Includes given and must-memorise formulas'],
  },
]

export default function HigherBundlePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #1A2D22 50%, var(--green-dark) 100%)',
        padding: 'clamp(48px, 8vw, 80px) 24px', textAlign: 'center', color: 'var(--cream)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,137,61,0.15), transparent 60%)' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <span style={{ ...monoLabel, color: 'var(--gold-soft)', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ color: 'var(--gold)' }}>{'◆'}</span> Edexcel Higher 2026 · £9.99
          </span>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: 16 }}>
            Papers 2 &amp; 3 <em style={{ fontStyle: 'italic', color: 'var(--gold-soft)' }}>Final Push</em> Bundle
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.85, maxWidth: 540, margin: '0 auto 28px', fontWeight: 500 }}>
            Everything you need between now and your last exam — key topics, worked examples, calculator skills, a 17-day revision plan and a printable formula sheet. Instant download.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const, alignItems: 'center' }}>
            <a href="https://buy.stripe.com/5kQ7sM1lKaIM0Vp3jpgIo02" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: 'var(--cream)',
              padding: '16px 32px', borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans)',
              textDecoration: 'none', boxShadow: '0 2px 8px -1px rgba(184,137,61,0.4)',
            }}>
              Buy Bundle — £9.99
            </a>
            <Link href="/practice-papers" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: 'var(--cream)',
              padding: '14px 24px', borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: 'var(--sans)',
              textDecoration: 'none', border: '1.5px solid rgba(247,243,234,0.3)',
            }}>
              See what{"'"}s included
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(247,243,234,0.5)', marginTop: 14 }}>
            One-off payment &middot; Instant download &middot; 4 PDFs + 10 practice papers
          </p>
        </div>
      </section>

      {/* What's in the bundle */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px' }}>
        <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>What{'’'}s Inside</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 34px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
          4 resources, one goal: <em style={{ color: 'var(--green)', fontStyle: 'italic' }}>maximise your marks</em>
        </h2>
        <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 560, marginBottom: 36 }}>
          Each resource targets a different aspect of your final revision — topics, technique, planning and reference. All four included in the bundle.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 18 }}>
          {BUNDLE_ITEMS.map((item, i) => (
            <div key={i} style={{
              background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 14,
              padding: '28px 24px', display: 'flex', gap: 20, alignItems: 'flex-start',
              flexWrap: 'wrap' as const,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: 'var(--green)',
                display: 'grid', placeItems: 'center', color: 'var(--cream)',
                fontSize: 18, fontWeight: 700, fontFamily: 'var(--serif)', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 240 }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.55, margin: '0 0 14px' }}>
                  {item.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, marginBottom: 16 }}>
                  {item.highlights.map(h => (
                    <span key={h} style={{
                      fontSize: 11, fontFamily: 'var(--mono)', fontWeight: 600,
                      color: 'var(--green)', background: 'var(--green-soft)',
                      padding: '3px 10px', borderRadius: 999,
                    }}>
                      {h}
                    </span>
                  ))}
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontFamily: 'var(--mono)', fontWeight: 700,
                  color: 'var(--green)', background: 'var(--green-soft)',
                  padding: '4px 12px', borderRadius: 999,
                }}>
                  Included in bundle
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Buy CTA */}
        <div style={{
          marginTop: 32, background: 'var(--green)', borderRadius: 14, padding: '32px 28px',
          textAlign: 'center',
        }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>
            Get all 4 resources — instant download
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: '0 0 20px', lineHeight: 1.5 }}>
            Key topics &middot; Calculator skills &middot; 17-day plan &middot; Formula sheet &middot; Plus 10 full practice papers
          </p>
          <a href="https://buy.stripe.com/5kQ7sM1lKaIM0Vp3jpgIo02" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: 'var(--green)', padding: '14px 32px',
            borderRadius: 10, fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans)',
            textDecoration: 'none',
          }}>
            Buy Bundle — £9.99
          </a>
        </div>
      </section>

      {/* Practice papers upsell */}
      <section style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(40px, 6vw, 56px) 24px', textAlign: 'center' }}>
          <div style={{ ...monoLabel, color: 'var(--gold)', marginBottom: 10 }}>Go Further</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: 'var(--ink)', margin: '0 0 12px' }}>
            Want full practice papers too?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--ink-3)', lineHeight: 1.6, maxWidth: 520, margin: '0 auto 24px' }}>
            Ten complete 80-mark practice papers for Edexcel Higher — five Paper 2 style, five Paper 3 style — with full mark schemes and worked solutions.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <Link href="/practice-papers" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--green)', color: 'var(--cream)', padding: '12px 24px',
              borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: 'var(--sans)',
              textDecoration: 'none',
            }}>
              View Practice Papers
            </Link>
            <Link href="/diagnostic" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: 'var(--green)', padding: '12px 24px',
              borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: 'var(--sans)',
              textDecoration: 'none', border: '1.5px solid var(--green)',
            }}>
              Try Diagnostic Quizzes
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {[
            { href: '/topics', title: 'All 245 Topics', desc: 'Step-by-step revision guides' },
            { href: '/formula-sheet', title: 'Formula Sheet', desc: 'Every GCSE formula as PDF' },
            { href: '/blog', title: 'Blog', desc: 'Revision guides and exam tips' },
            { href: '/learn', title: 'Practice Questions', desc: 'Instant expert feedback' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              display: 'block', background: 'var(--paper)', border: '1px solid var(--rule)',
              borderRadius: 10, padding: '16px', textDecoration: 'none',
            }}>
              <p style={{ fontSize: 14, fontWeight: 700, fontFamily: 'var(--serif)', color: 'var(--green)', margin: '0 0 2px' }}>{link.title}</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: 0 }}>{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
