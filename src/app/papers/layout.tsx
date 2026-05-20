import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GCSE Maths Practice Papers & Official Past Papers — AQA, Edexcel, OCR',
  description:
    'GCSE Maths papers for AQA, Edexcel and OCR. Original practice papers written from the published specifications — Foundation and Higher tier. Direct links to the official AQA, Pearson Edexcel and OCR past-paper archives.',
  keywords: [
    'GCSE Maths practice papers',
    'GCSE Maths past papers',
    'AQA GCSE Maths past papers',
    'Edexcel GCSE Maths past papers',
    'OCR GCSE Maths past papers',
    'Foundation tier practice papers',
    'Higher tier practice papers',
    'GCSE Maths exam preparation',
  ],
  openGraph: {
    title: 'GCSE Maths Practice Papers & Official Past Papers — AQA, Edexcel, OCR',
    description:
      'Original GCSE Maths practice papers plus direct links to the official AQA (8300), Pearson Edexcel (1MA1) and OCR (J560) past-paper archives. Foundation and Higher tier.',
    url: 'https://www.gcsemathsai.co.uk/papers',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/papers' },
}

export default function PapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
