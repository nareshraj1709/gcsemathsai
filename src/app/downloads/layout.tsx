import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GCSE Maths Papers — Practice Papers and Official Past-Paper Links',
  description:
    'For real past papers, visit the official AQA, Edexcel and OCR sites. For original practice papers written from the published specifications, see /papers.',
  keywords: ['GCSE maths practice papers', 'GCSE past papers official links'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/papers' },
  robots: { index: false, follow: true },
}

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
