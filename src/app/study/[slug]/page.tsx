import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTENT, TOPIC_META, toSlug, type SubtopicContent } from '@/lib/study-content'

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = CONTENT.find(c => toSlug(c.topic, c.subtopic) === params.slug)
  if (!entry) return { title: 'Study — GCSEMathsAI' }
  return {
    title: `${entry.subtopic} — GCSEMathsAI`,
    description: entry.overview,
  }
}

export async function generateStaticParams() {
  return CONTENT.map(c => ({ slug: toSlug(c.topic, c.subtopic) }))
}

// ── Colour helpers ────────────────────────────────────────────
const sectionBg: Record<string, string> = {
  '#7C3AED': '#F5F3FF',
  '#2563EB': '#EFF6FF',
  '#059669': '#F0FDF4',
  '#D97706': '#FFFBEB',
  '#DC2626': '#FFF5F5',
}

export default function StudyTopicPage({ params }: Props) {
  const entry: SubtopicContent | undefined = CONTENT.find(
    c => toSlug(c.topic, c.subtopic) === params.slug
  )
  const meta = entry ? TOPIC_META[entry.topic] : null

  // Not found
  if (!entry || !meta) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">🔜</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Notes coming soon</h1>
          <p className="text-gray-500 text-sm mb-6">
            We&apos;re writing the study guide for this subtopic. Check back shortly.
          </p>
          <Link href="/study"
            className="inline-block bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-purple-800 transition">
            ← Back to topics
          </Link>
        </div>
      </main>
    )
  }

  const bg = sectionBg[meta.color] ?? '#F8F7FF'
  const practiceHref = `/learn`

  return (
    <main style={{ minHeight: '100vh', background: '#F8F7FF', fontFamily: "'Trebuchet MS', sans-serif" }}>

      {/* Top nav */}
      <nav style={{
        background: '#fff', borderBottom: '1px solid #E5E1FF',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      }}>
        <Link href="/study" style={{
          fontSize: 13, color: '#6B7280', textDecoration: 'none',
          border: '1.5px solid #E5E1FF', borderRadius: 8, padding: '4px 12px',
        }}>
          ← Study
        </Link>
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>/</span>
        <span style={{
          fontSize: 12, fontWeight: 700, color: meta.color,
          background: bg, padding: '3px 10px', borderRadius: 999,
        }}>{entry.topic}</span>
        <span style={{ fontSize: 13, color: '#9CA3AF' }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0D0B1A' }}>{entry.subtopic}</span>
      </nav>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${meta.color}ee, ${meta.color}bb)`,
        padding: '40px 24px',
        textAlign: 'center',
        color: '#fff',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{meta.icon}</div>
        <div style={{
          display: 'inline-block', fontSize: 12, fontWeight: 700,
          background: 'rgba(255,255,255,0.2)', borderRadius: 999,
          padding: '3px 14px', marginBottom: 12,
        }}>
          {entry.topic} · {entry.tier === 'Both' ? 'Foundation & Higher' : entry.tier}
        </div>
        <h1 style={{
          fontFamily: "'Georgia', serif", fontSize: 28, fontWeight: 800,
          margin: '0 0 12px', lineHeight: 1.2,
        }}>
          {entry.subtopic}
        </h1>
        <p style={{ fontSize: 15, opacity: 0.9, maxWidth: 520, margin: '0 auto' }}>
          {entry.overview}
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 60px' }}>

        {/* Key Facts */}
        <Section title="Key facts to remember" emoji="🔑" color={meta.color} bg={bg}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {entry.keyFacts.map((fact, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: meta.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, marginTop: 1,
                }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: '#1F2937', lineHeight: 1.55 }}>{fact}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Formulas */}
        {entry.formulas && entry.formulas.length > 0 && (
          <Section title="Formulas" emoji="📐" color={meta.color} bg={bg}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {entry.formulas.map((f, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 12,
                  border: `1.5px solid ${meta.color}33`,
                  padding: '14px 18px',
                  display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap',
                }}>
                  <div style={{ flex: '0 0 auto', minWidth: 100 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: meta.color, marginBottom: 2 }}>
                      {f.name}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <code style={{
                      fontSize: 15, fontWeight: 700, color: '#0D0B1A',
                      fontFamily: "'Courier New', monospace",
                      background: bg, padding: '3px 10px', borderRadius: 6,
                    }}>
                      {f.formula}
                    </code>
                    {f.notes && (
                      <p style={{ fontSize: 12, color: '#6B7280', margin: '6px 0 0' }}>{f.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Worked Examples */}
        <Section title="Worked examples" emoji="✍️" color={meta.color} bg={bg}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {entry.workedExamples.map((ex, i) => (
              <div key={i} style={{
                background: '#fff', border: `1.5px solid ${meta.color}33`,
                borderRadius: 14, overflow: 'hidden',
              }}>
                {/* Question */}
                <div style={{
                  background: bg, borderBottom: `1px solid ${meta.color}22`,
                  padding: '14px 18px',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: meta.color }}>
                    Example {i + 1}
                  </span>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0D0B1A', margin: '4px 0 0', lineHeight: 1.45 }}>
                    {ex.question}
                  </p>
                </div>

                {/* Steps */}
                <div style={{ padding: '14px 18px', borderBottom: `1px solid #F3F4F6` }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Working
                  </p>
                  <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {ex.steps.map((step, j) => (
                      <li key={j} style={{ fontSize: 14, color: '#374151', lineHeight: 1.5 }}>{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Answer */}
                <div style={{
                  padding: '12px 18px', background: `${meta.color}08`,
                  display: 'flex', gap: 8, alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: '#fff',
                    background: meta.color, padding: '2px 8px', borderRadius: 999,
                  }}>Answer</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: meta.color }}>{ex.answer}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Watch on YouTube */}
        <Section title="Watch on YouTube" emoji="▶️" color="#DC2626" bg="#FFF5F5">
          <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 14px', lineHeight: 1.55 }}>
            Search YouTube for free GCSE Maths video explanations on this topic. Look for clear, step-by-step walkthroughs that match your exam board.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href={`https://www.youtube.com/results?search_query=GCSE+maths+${encodeURIComponent(entry.subtopic)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#DC2626', color: '#fff',
                padding: '10px 20px', borderRadius: 10,
                fontWeight: 700, fontSize: 13, textDecoration: 'none',
              }}
            >
              ▶ Search: GCSE {entry.subtopic}
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=GCSE+maths+${encodeURIComponent(entry.subtopic)}+${encodeURIComponent(entry.topic)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#fff', color: '#DC2626',
                border: '1.5px solid #FECACA',
                padding: '10px 20px', borderRadius: 10,
                fontWeight: 700, fontSize: 13, textDecoration: 'none',
              }}
            >
              ▶ Search: {entry.topic} — {entry.subtopic}
            </a>
          </div>
          <p style={{ fontSize: 11, color: '#9CA3AF', margin: '10px 0 0' }}>
            Opens YouTube in a new tab. Pick a video that suits your learning style.
          </p>
        </Section>

        {/* Common Mistakes */}
        <Section title="Common mistakes" emoji="⚠️" color="#D97706" bg="#FFFBEB">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {entry.commonMistakes.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                background: '#fff', borderRadius: 10,
                border: '1px solid #FDE68A', padding: '12px 14px',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>✗</span>
                <span style={{ fontSize: 14, color: '#92400E', lineHeight: 1.5 }}>{m}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Exam Tips */}
        <Section title="Exam tips" emoji="🎯" color="#059669" bg="#F0FDF4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {entry.examTips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                background: '#fff', borderRadius: 10,
                border: '1px solid #A7F3D0', padding: '12px 14px',
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: '#065F46', lineHeight: 1.5 }}>{tip}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Practice CTA */}
        <div style={{
          background: `linear-gradient(135deg, #4C1D95, #6D28D9)`,
          borderRadius: 20, padding: '28px 32px', textAlign: 'center', color: '#fff',
          marginTop: 8,
        }}>
          <p style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Georgia', serif", margin: '0 0 6px' }}>
            Ready to test yourself on {entry.subtopic}?
          </p>
          <p style={{ fontSize: 13, opacity: 0.8, margin: '0 0 18px' }}>
            Get AI-marked practice questions on exactly this subtopic.
          </p>
          <Link href={practiceHref} style={{
            display: 'inline-block',
            background: '#fff', color: '#6D28D9',
            padding: '11px 28px', borderRadius: 12,
            fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>
            Practice this topic →
          </Link>
        </div>

        {/* Breadcrumb footer */}
        <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/study" style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>
            ← All topics
          </Link>
          <Link href="/dashboard" style={{ fontSize: 13, color: '#6B7280', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}

// ── Section wrapper ───────────────────────────────────────────
function Section({
  title, emoji, color, bg, children,
}: {
  title: string; emoji: string; color: string; bg: string; children: React.ReactNode
}) {
  return (
    <div style={{
      background: '#fff', border: `1px solid ${color}22`,
      borderRadius: 16, overflow: 'hidden', marginBottom: 20,
    }}>
      <div style={{
        background: bg, borderBottom: `1px solid ${color}22`,
        padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <h2 style={{
          fontFamily: "'Georgia', serif", fontSize: 16, fontWeight: 800,
          color, margin: 0,
        }}>{title}</h2>
      </div>
      <div style={{ padding: '18px 20px' }}>
        {children}
      </div>
    </div>
  )
}
