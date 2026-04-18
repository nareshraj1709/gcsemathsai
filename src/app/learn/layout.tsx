import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn — Choose a GCSE Maths Topic to Practise',
  description:
    'Pick a GCSE Maths topic and get AI-marked practice questions. AQA, Edexcel and OCR — Foundation and Higher tier.',
  keywords: ['GCSE Maths practice', 'GCSE Maths questions', 'GCSE revision', 'AI maths tutor'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/learn' },
  openGraph: {
    title: 'Learn — Choose a Topic to Practise | GCSEMathsAI',
    description: 'Pick any GCSE Maths topic and practise with AI-marked questions.',
    url: 'https://www.gcsemathsai.co.uk/learn',
  },
}

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
