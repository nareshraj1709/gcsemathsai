import type { Metadata } from 'next'
import AuthGuard from '@/components/AuthGuard'

export const metadata: Metadata = {
  title: 'GCSE Maths Study Notes — Free Revision Guides for Every Topic | GCSEMathsAI',
  description:
    'Free GCSE Maths study notes covering all AQA, Edexcel and OCR topics — Number, Algebra, Geometry, Statistics and Probability. Key facts, formulas, worked examples and exam tips for Foundation and Higher.',
  keywords: [
    'GCSE Maths study notes', 'GCSE Maths revision', 'GCSE Maths topics',
    'AQA Maths notes', 'Edexcel Maths notes', 'OCR Maths notes',
    'GCSE revision guide', 'maths worked examples', 'GCSE exam tips',
    'Foundation maths', 'Higher maths',
  ],
  openGraph: {
    title: 'GCSE Maths Study Notes — Free Revision Guides | GCSEMathsAI',
    description:
      'Syllabus-aligned study notes for every GCSE Maths topic. Key facts, formulas, worked examples, common mistakes and exam tips.',
    url: 'https://www.gcsemathsai.co.uk/study',
    type: 'website',
    siteName: 'GCSEMathsAI',
  },
  twitter: {
    card: 'summary',
    title: 'GCSE Maths Study Notes | GCSEMathsAI',
    description: 'Free study notes for every GCSE Maths topic — AQA, Edexcel, OCR.',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/study' },
}

export default function StudyLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
