import type { Metadata } from 'next'
import AuthGuard from '@/components/AuthGuard'

export const metadata: Metadata = {
  title: 'Practice Questions — AI-Marked GCSE Maths',
  description:
    'Answer GCSE Maths practice questions and get instant AI marking with method marks, worked solutions and feedback. AQA, Edexcel and OCR.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/practice' },
  openGraph: {
    title: 'Practice Questions — AI-Marked GCSE Maths | GCSEMathsAI',
    description: 'Instant AI marking for GCSE Maths questions with method marks and worked solutions.',
    url: 'https://www.gcsemathsai.co.uk/practice',
  },
}

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
