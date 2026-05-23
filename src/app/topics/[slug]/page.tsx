import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTopics, getTopicPost, renderTopicMarkdown, extractTopicTOC } from '@/lib/topics-markdown'
import { autoLinkTopics } from '@/lib/auto-linker'
import { getAcademicReferences } from '@/lib/academic-references'
import PredictedPapersPromo from '@/components/PredictedPapersPromo'

type Props = { params: Promise<{ slug: string }> }

const COLOUR_MAP: Record<string, { text: string; bg: string; barBg: string }> = {
  purple: { text: 'var(--green)',     bg: 'var(--green-soft)',    barBg: 'var(--green)' },
  blue:   { text: 'var(--navy)',      bg: 'var(--navy-soft)',     barBg: 'var(--navy)' },
  green:  { text: 'var(--burgundy)',  bg: 'var(--burgundy-soft)', barBg: 'var(--burgundy)' },
  amber:  { text: 'var(--gold)',      bg: 'var(--gold-soft)',     barBg: 'var(--gold)' },
  rose:   { text: 'var(--green-mid)', bg: 'var(--green-soft)',    barBg: 'var(--green-mid)' },
}

const TIER_COLOURS: Record<string, { text: string; bg: string }> = {
  'Foundation & Higher': { text: 'var(--navy)',  bg: 'var(--navy-soft)' },
  'Higher only':         { text: 'var(--gold)',  bg: 'var(--gold-soft)' },
  'Foundation':          { text: 'var(--green)', bg: 'var(--green-soft)' },
}

export async function generateStaticParams() {
  return getAllTopics().map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const topic = getTopicPost(slug)
  if (!topic) return { title: 'Topic Not Found' }

  return {
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    openGraph: {
      title: topic.title,
      description: topic.description,
      url: `https://www.gcsemathsai.co.uk/topics/${topic.slug}`,
      type: 'article',
      publishedTime: topic.dateISO,
      authors: [topic.author],
    },
    alternates: { canonical: `https://www.gcsemathsai.co.uk/topics/${topic.slug}` },
  }
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params
  const topic = getTopicPost(slug)
  if (!topic) notFound()

  const rawHtml = renderTopicMarkdown(topic.content)
  const html = autoLinkTopics(rawHtml, topic.slug)
  const toc = extractTopicTOC(topic.content)
  const academicRefs = getAcademicReferences(topic.slug, topic.title)
  const colours = COLOUR_MAP[topic.categoryColour] ?? COLOUR_MAP.purple
  const tierColour = TIER_COLOURS[topic.tier] ?? TIER_COLOURS['Foundation & Higher']

  // Get adjacent topics for prev/next navigation
  const allTopics = getAllTopics()
  const currentIdx = allTopics.findIndex(t => t.slug === topic.slug)
  const prevTopic = currentIdx > 0 ? allTopics[currentIdx - 1] : null
  const nextTopic = currentIdx < allTopics.length - 1 ? allTopics[currentIdx + 1] : null

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .topic-prose a { color: var(--green) !important; }
        .topic-prose a:hover { text-decoration: underline; }
        .topic-prose h2, .topic-prose h3, .topic-prose h4 { color: var(--ink) !important; font-family: var(--serif); }
        .topic-prose strong { color: var(--ink) !important; }
      `}} />

      {/* Hero */}
      <div style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--rule)',
        padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--mono)',
              padding: '3px 10px',
              borderRadius: 999,
              color: colours.text,
              background: colours.bg,
              letterSpacing: '0.03em',
            }}>
              {topic.category}
            </span>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--mono)',
              padding: '3px 10px',
              borderRadius: 999,
              color: tierColour.text,
              background: tierColour.bg,
              letterSpacing: '0.03em',
            }}>
              {topic.tier}
            </span>
            <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Topic {topic.topicNumber} of 73</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(24px, 5vw, 34px)',
            fontWeight: 800,
            color: 'var(--ink)',
            lineHeight: 1.2,
            margin: '0 0 10px',
          }}>
            {topic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--ink-3)' }}>
            <span>{topic.author}</span>
            <span style={{ opacity: 0.4 }}>&middot;</span>
            <span>{topic.readMins} min read</span>
            <span style={{ opacity: 0.4 }}>&middot;</span>
            <span>{topic.date}</span>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: 1140,
        margin: '0 auto',
        padding: '40px 24px',
        display: 'flex',
        gap: 40,
      }}>

        {/* Article content */}
        <article style={{ flex: 1, minWidth: 0, maxWidth: 760 }}>
          <div
            className="topic-prose prose prose-gray prose-lg max-w-none
              prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed
              prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
            style={{
              fontFamily: 'var(--sans)',
              color: 'var(--ink-2)',
            } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Academic References */}
          <div style={{
            marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--rule)',
          }}>
            <div style={{
              fontFamily: 'var(--mono)', fontSize: 10.5, fontWeight: 700, color: 'var(--green)',
              letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic', color: 'var(--gold)' }}>{'\u00A7'}</span>
              Academic References
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 20, lineHeight: 1.5, fontWeight: 500 }}>
              Further reading from leading academic institutions — free and open-access.
            </p>
            <div style={{ display: 'grid', gap: 12 }}>
              {academicRefs.map((ref, i) => (
                <a
                  key={i}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: 12,
                    padding: '16px 20px', textDecoration: 'none', transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                    background: ref.source === 'NRICH' ? 'var(--navy)' : ref.source === 'MIT OpenCourseWare' ? 'var(--burgundy)' : 'var(--green)',
                    color: 'var(--cream)', display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--serif)', fontWeight: 700, fontSize: 14, fontStyle: 'italic',
                  }}>
                    {ref.source === 'NRICH' ? 'N' : ref.source === 'MIT OpenCourseWare' ? 'M' : 'C'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' as const }}>
                      <span style={{ fontFamily: 'var(--serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                        {ref.title}
                      </span>
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em',
                        padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase' as const,
                        background: ref.source === 'NRICH' ? 'var(--navy-soft)' : ref.source === 'MIT OpenCourseWare' ? 'var(--burgundy-soft)' : 'var(--green-soft)',
                        color: ref.source === 'NRICH' ? 'var(--navy)' : ref.source === 'MIT OpenCourseWare' ? 'var(--burgundy)' : 'var(--green)',
                      }}>
                        {ref.source}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45, fontWeight: 500, margin: 0 }}>
                      {ref.description}
                    </p>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-4)', marginTop: 4, display: 'block' }}>
                      {ref.org} &middot; Free &middot; Open Access
                    </span>
                  </div>
                  <span style={{ color: 'var(--ink-4)', fontSize: 14, flexShrink: 0, marginTop: 2 }}>{'\u2197'}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: '1px solid var(--rule)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
          }}>
            {prevTopic ? (
              <Link href={`/topics/${prevTopic.slug}`} style={{ flex: 1, textDecoration: 'none' }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>&larr; Previous topic</span>
                <p style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'var(--serif)',
                  color: 'var(--ink-2)',
                  marginTop: 4,
                }}>
                  {prevTopic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                </p>
              </Link>
            ) : <div />}
            {nextTopic ? (
              <Link href={`/topics/${nextTopic.slug}`} style={{ flex: 1, textAlign: 'right', textDecoration: 'none' }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Next topic &rarr;</span>
                <p style={{
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'var(--serif)',
                  color: 'var(--ink-2)',
                  marginTop: 4,
                }}>
                  {nextTopic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                </p>
              </Link>
            ) : <div />}
          </div>
        </article>

        {/* Sidebar — Table of Contents (desktop only via CSS) */}
        <aside style={{ width: 256, flexShrink: 0 }} className="hidden lg:block">
          <div style={{ position: 'sticky', top: 96 }}>
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              fontFamily: 'var(--mono)',
              color: 'var(--ink-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 12,
            }}>On this page</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {toc.map(h => (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  style={{
                    fontSize: 13,
                    color: 'var(--ink-3)',
                    textDecoration: 'none',
                    lineHeight: 1.4,
                    transition: 'color 0.15s',
                  }}
                >
                  {h.text}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div style={{
              marginTop: 32,
              background: 'var(--green-soft)',
              border: '1px solid var(--rule)',
              borderRadius: 12,
              padding: 16,
            }}>
              <p style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--serif)',
                color: 'var(--green)',
                margin: '0 0 4px',
              }}>Practice this topic</p>
              <p style={{ fontSize: 12, color: 'var(--ink-3)', margin: '0 0 12px' }}>
                Get AI-marked questions with instant feedback.
              </p>
              <Link
                href="/auth"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--green)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  fontFamily: 'var(--sans)',
                  padding: '10px 0',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
              >
                Start free &rarr;
              </Link>
            </div>

            {/* Related topics in same strand */}
            {(() => {
              const sameCategoryTopics = allTopics
                .filter(t => t.category === topic.category && t.slug !== topic.slug)
                .slice(0, 5)
              if (sameCategoryTopics.length === 0) return null
              return (
                <div style={{ marginTop: 24 }}>
                  <p style={{
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: 'var(--mono)',
                    color: 'var(--ink-3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 12,
                  }}>Related topics</p>
                  <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sameCategoryTopics.map(rt => (
                      <Link
                        key={rt.slug}
                        href={`/topics/${rt.slug}`}
                        style={{
                          fontSize: 13,
                          color: 'var(--ink-3)',
                          textDecoration: 'none',
                          lineHeight: 1.4,
                          transition: 'color 0.15s',
                        }}
                      >
                        {rt.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, '')}
                      </Link>
                    ))}
                  </nav>
                </div>
              )
            })()}

            {/* All topics link */}
            <Link href="/topics" style={{
              display: 'block',
              marginTop: 16,
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--green)',
              textDecoration: 'none',
            }}>
              &larr; All 245 topics
            </Link>
          </div>
        </aside>
      </div>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LearningResource',
            headline: topic.title,
            name: topic.title,
            description: topic.description,
            author: { '@type': 'Organization', name: 'GCSEMathsAI' },
            publisher: { '@type': 'Organization', name: 'GCSEMathsAI', url: 'https://www.gcsemathsai.co.uk' },
            datePublished: topic.dateISO,
            keywords: topic.keywords.join(', '),
            mainEntityOfPage: `https://www.gcsemathsai.co.uk/topics/${topic.slug}`,
            educationalLevel: topic.tier === 'Higher only' ? 'GCSE Higher' : 'GCSE Foundation & Higher',
            learningResourceType: 'Study Guide',
            inLanguage: 'en-GB',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.gcsemathsai.co.uk' },
              { '@type': 'ListItem', position: 2, name: 'All Topics', item: 'https://www.gcsemathsai.co.uk/topics' },
              { '@type': 'ListItem', position: 3, name: topic.title.replace(/ — .*$/, '').replace(/ GCSE.*$/, ''), item: `https://www.gcsemathsai.co.uk/topics/${topic.slug}` },
            ],
          }),
        }}
      />
      <PredictedPapersPromo variant="footer" source={`topic-${slug}`} />
    </main>
  )
}
