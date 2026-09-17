import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DiagnosticQuiz from '@/components/DiagnosticQuiz'
import { getAllDiagnosticSets, getDiagnosticSet } from '@/lib/diagnostic-mcqs'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllDiagnosticSets().map(s => ({ slug: s.topicSlug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const set = getDiagnosticSet(slug)
  if (!set) return {}
  return {
    title: `${set.topicTitle} — Diagnostic Quiz | GCSEMathsAI`,
    description: `Test your understanding of ${set.topicTitle} with ${set.questions.length} diagnostic MCQs. Identify misconceptions and target your revision.`,
    alternates: { canonical: `https://www.gcsemathsai.co.uk/diagnostic/${slug}` },
  }
}

export default async function DiagnosticPage({ params }: Props) {
  const { slug } = await params
  const set = getDiagnosticSet(slug)
  if (!set) notFound()

  const sameStrand = getAllDiagnosticSets().filter(s => s.strand === set.strand)
  const index = sameStrand.findIndex(s => s.topicSlug === slug)
  const next = sameStrand[(index + 1) % sameStrand.length]

  return (
    <main style={{ minHeight: '100vh', background: 'var(--cream)' }}>
      <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)', padding: '32px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Link href="/diagnostic" style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>
            &larr; All diagnostic quizzes
          </Link>
        </div>
      </section>

      <section style={{ maxWidth: 640, margin: '0 auto', padding: '40px 20px 80px' }}>
        <h1 style={{ fontSize: 28, marginBottom: 20 }}>{set.topicTitle}: free practice quiz</h1>
        <DiagnosticQuiz key={slug}
          topicSlug={set.topicSlug}
          topicTitle={set.topicTitle}
          questions={set.questions}
          nextTopic={next && next.topicSlug !== slug ? { slug: next.topicSlug, title: next.topicTitle } : undefined}
        />
      </section>
    </main>
  )
}
