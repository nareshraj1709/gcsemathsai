import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us — GCSEMathsAI',
  description:
    'Get in touch with GCSEMathsAI. Questions about GCSE Maths revision, AI marking, exam boards or school partnerships — we reply within one working day.',
  keywords: ['contact GCSEMathsAI', 'GCSE Maths help', 'GCSE Maths support'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/contact' },
  openGraph: {
    title: 'Contact Us — GCSEMathsAI',
    description: 'Questions about GCSE Maths revision or AI marking? We reply within one working day.',
    url: 'https://www.gcsemathsai.co.uk/contact',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
