import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Session Review — See How You Did',
  description:
    'Review your GCSE Maths practice session results. See scores by question, AI evaluation, strengths, areas to improve and recommended revision topics.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/review' },
  openGraph: {
    title: 'Session Review | GCSEMathsAI',
    description: 'Review your GCSE Maths practice results with AI evaluation and revision recommendations.',
    url: 'https://www.gcsemathsai.co.uk/review',
  },
}

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
