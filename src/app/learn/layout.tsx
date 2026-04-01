import type { Metadata } from 'next'
import AuthGuard from '@/components/AuthGuard'

export const metadata: Metadata = {
  title: 'Learn — Choose a GCSE Maths Topic to Practise',
  description:
    'Pick a GCSE or A Level Maths topic and get AI-marked practice questions. AQA, Edexcel and OCR — Foundation and Higher tier.',
  keywords: ['GCSE Maths practice', 'GCSE Maths questions', 'A Level Maths practice', 'AI maths tutor'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/learn' },
  openGraph: {
    title: 'Learn — Choose a Topic to Practise | GCSEMathsAI',
    description: 'Pick any GCSE or A Level Maths topic and practise with AI-marked questions.',
    url: 'https://www.gcsemathsai.co.uk/learn',
  },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
