import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exam Papers',
  description:
    'Practise with past-paper style questions and AI-generated GCSE Maths papers for AQA, Edexcel and OCR — timed, marked and graded.',
  openGraph: {
    title: 'GCSE Maths Exam Papers | GCSEMathsAI',
    description:
      'Timed GCSE Maths papers for AQA (8300), Edexcel (1MA1) and OCR (J560). Previous-paper style and AI-generated practice papers, Foundation and Higher.',
    url: 'https://www.gcsemathsai.co.uk/papers',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/papers' },
}

export default function PapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
