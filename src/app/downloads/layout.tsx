import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download GCSE Maths Past Papers — Free AQA PDF Downloads',
  description:
    'Download free AQA GCSE Maths past papers as printable PDFs. Foundation and Higher tier papers from 2015–2024 with timed exam conditions.',
  keywords: ['GCSE past papers download', 'AQA past papers PDF', 'GCSE Maths papers free', 'printable past papers'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/downloads' },
  openGraph: {
    title: 'Download GCSE Maths Past Papers — Free PDFs',
    description: 'Free AQA GCSE Maths past paper PDFs. Foundation and Higher tier, 2015–2024.',
    url: 'https://www.gcsemathsai.co.uk/downloads',
  },
}

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
