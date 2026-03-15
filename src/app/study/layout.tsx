import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Study Notes',
  description:
    'Free GCSE Maths study notes covering all AQA, Edexcel and OCR topics — Number, Algebra, Geometry, Statistics and Probability. Foundation and Higher.',
  openGraph: {
    title: 'GCSE Maths Study Notes | GCSEMathsAI',
    description:
      'Syllabus-aligned study notes for every GCSE Maths topic. Key facts, formulas, worked examples, common mistakes and exam tips.',
    url: 'https://www.gcsemathsai.co.uk/study',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/study' },
}

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
