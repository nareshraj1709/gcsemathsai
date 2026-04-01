import type { Metadata } from 'next'
import AuthGuard from '@/components/AuthGuard'

export const metadata: Metadata = {
  title: 'Topic Sections — GCSE Maths Practice by Topic',
  description:
    'Browse 20 GCSE Maths topic sections and practise questions by subject area. Track your progress across Number, Algebra, Geometry, Statistics and more.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/sections' },
  openGraph: {
    title: 'Topic Sections — Practice by Topic | GCSEMathsAI',
    description: 'Browse GCSE Maths topic sections and track your progress across all subject areas.',
    url: 'https://www.gcsemathsai.co.uk/sections',
  },
}

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
