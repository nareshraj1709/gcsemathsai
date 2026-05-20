import type { Metadata } from 'next'

export const metadata: Metadata = {
  // /downloads now 308-redirects to /papers (next.config.ts). Metadata
  // is only seen if Googlebot reaches this layout before following the
  // redirect — point the canonical at /papers so any residual indexing
  // consolidates to the new hub.
  title: 'GCSE Maths Papers — Practice Papers and Official Past-Paper Links',
  description:
    'For real past papers, visit the official AQA, Edexcel and OCR sites. For original practice papers written from the published specifications, see /papers.',
  keywords: ['GCSE maths practice papers', 'GCSE past papers official links'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/papers' },
}

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
