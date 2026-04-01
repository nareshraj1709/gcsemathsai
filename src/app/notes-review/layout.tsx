import type { Metadata } from 'next'
import AuthGuard from '@/components/AuthGuard'

export const metadata: Metadata = {
  title: 'Notes Review — AI Feedback on Your Revision Notes',
  description:
    'Upload your handwritten or typed GCSE Maths revision notes and get instant AI feedback on completeness, accuracy and gaps.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/notes-review' },
  openGraph: {
    title: 'Notes Review — AI Feedback on Your Notes | GCSEMathsAI',
    description: 'Upload your GCSE Maths notes and get instant AI feedback on gaps and accuracy.',
    url: 'https://www.gcsemathsai.co.uk/notes-review',
  },
}

export default function NotesReviewLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>
}
