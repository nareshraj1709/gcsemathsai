import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notes Review — Instant Feedback on Your Revision Notes',
  description:
    'Upload your handwritten or typed GCSE Maths revision notes and get instant feedback on completeness, accuracy and gaps.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/notes-review' },
  openGraph: {
    title: 'Notes Review — Instant Feedback on Your Notes | GCSEMathsAI',
    description: 'Upload your GCSE Maths notes and get instant feedback on gaps and accuracy.',
    url: 'https://www.gcsemathsai.co.uk/notes-review',
  },
}

export default function NotesReviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
