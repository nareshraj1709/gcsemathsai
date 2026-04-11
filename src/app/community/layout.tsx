import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community Forum — Ask & Discuss GCSE Maths',
  description:
    'Ask questions, share working, and help fellow students with GCSE Maths. Free community forum on GCSEMathsAI — moderated and safe for students.',
  keywords: ['GCSE Maths forum', 'GCSE Maths help', 'maths community', 'student maths help', 'maths discussion'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/community' },
  openGraph: {
    title: 'Community Forum — Ask & Discuss GCSE Maths | GCSEMathsAI',
    description: 'Ask questions, share working, and help fellow students with GCSE Maths.',
    url: 'https://www.gcsemathsai.co.uk/community',
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
