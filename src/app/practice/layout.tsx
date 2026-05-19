import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice Questions — Instantly Marked GCSE Maths',
  description:
    'Answer GCSE Maths practice questions and get instant examiner-style marking with method marks, worked solutions and feedback. AQA, Edexcel and OCR.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/practice' },
  openGraph: {
    title: 'Practice Questions — Instantly Marked GCSE Maths | GCSEMathsAI',
    description: 'Instant examiner-style marking for GCSE Maths questions with method marks and worked solutions.',
    url: 'https://www.gcsemathsai.co.uk/practice',
  },
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
