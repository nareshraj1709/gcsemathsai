import Link from 'next/link'
import { TOPIC_DATA, TOPIC_META, CONTENT, toSlug } from '@/lib/study-content'
import StudyClientWrapper from './StudyClientWrapper'

const BASE = 'https://www.gcsemathsai.co.uk'

// Helper: check if a subtopic has content
function hasContent(topic: string, subtopic: string) {
  return CONTENT.some(c => c.topic === topic && c.subtopic === subtopic)
}

export default function StudyPage() {
  const topicNames = Object.keys(TOPIC_DATA)

  // Build SSR topic links for crawlers
  const seoTopicLinks: { topic: string; subtopic: string; slug: string }[] = []
  for (const topic of topicNames) {
    // Foundation has fewer topics, show Both/Foundation for SEO
    const subtopics = TOPIC_DATA[topic].Foundation
    for (const st of subtopics) {
      if (hasContent(topic, st)) {
        seoTopicLinks.push({ topic, subtopic: st, slug: toSlug(topic, st) })
      }
    }
    // Also add Higher-only subtopics
    for (const st of TOPIC_DATA[topic].Higher) {
      if (!subtopics.includes(st) && hasContent(topic, st)) {
        seoTopicLinks.push({ topic, subtopic: st, slug: toSlug(topic, st) })
      }
    }
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'GCSE Maths Study Notes',
    description: 'Free study notes for every GCSE Maths topic — AQA, Edexcel, OCR. Foundation and Higher tier.',
    url: `${BASE}/study`,
    publisher: { '@type': 'Organization', name: 'GCSEMathsAI', url: BASE },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: seoTopicLinks.length,
      itemListElement: seoTopicLinks.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.subtopic,
        url: `${BASE}/study/${t.slug}`,
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Study Notes', item: `${BASE}/study` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Client wrapper handles auth check + interactive UI */}
      <StudyClientWrapper />

      {/* SSR content visible to crawlers — hidden when JS loads */}
      <noscript>
        <div style={{ minHeight: '100vh', background: '#F8F7FF', padding: '40px 24px', fontFamily: "'Trebuchet MS', sans-serif" }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0D0B1A', marginBottom: 8 }}>
              GCSE Maths Study Notes
            </h1>
            <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 32 }}>
              Free study notes covering every GCSE Maths topic for AQA, Edexcel and OCR — Foundation and Higher tier. Key facts, formulas, worked examples, common mistakes and exam tips.
            </p>
            {topicNames.map(topicName => {
              const meta = TOPIC_META[topicName]
              const subtopics = [...new Set([...TOPIC_DATA[topicName].Foundation, ...TOPIC_DATA[topicName].Higher])]
              return (
                <div key={topicName} style={{ marginBottom: 24 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: meta.color, marginBottom: 12 }}>
                    {meta.icon} {topicName}
                  </h2>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {subtopics.map(st => {
                      const ready = hasContent(topicName, st)
                      return (
                        <li key={st} style={{ marginBottom: 6 }}>
                          {ready ? (
                            <Link href={`/study/${toSlug(topicName, st)}`} style={{ color: '#6D28D9', textDecoration: 'underline', fontSize: 14 }}>
                              {st}
                            </Link>
                          ) : (
                            <span style={{ color: '#9CA3AF', fontSize: 14 }}>{st} (coming soon)</span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </noscript>

      {/* Hidden SEO links — always in DOM for crawlers, visually hidden */}
      <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
        <h2>GCSE Maths Study Notes — All Topics</h2>
        <p>Free GCSE Maths revision notes for AQA, Edexcel and OCR. Foundation and Higher tier study guides with key facts, formulas, worked examples and exam tips.</p>
        <nav aria-label="Study topics">
          {topicNames.map(topicName => (
            <div key={topicName}>
              <h3>{topicName}</h3>
              <ul>
                {[...new Set([...TOPIC_DATA[topicName].Foundation, ...TOPIC_DATA[topicName].Higher])].map(st => {
                  const ready = hasContent(topicName, st)
                  return ready ? (
                    <li key={st}>
                      <Link href={`/study/${toSlug(topicName, st)}`}>{st} — GCSE Maths Study Notes</Link>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
