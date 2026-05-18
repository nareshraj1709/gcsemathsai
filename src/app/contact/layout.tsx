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

const BASE = 'https://www.gcsemathsai.co.uk'

const CONTACT_FAQS = [
  { q: 'Is GCSEMathsAI really free?', a: 'Yes — completely free right now. No card, no trial expiry.' },
  { q: 'Which exam boards do you cover?', a: 'AQA, Edexcel and OCR. Foundation and Higher tier.' },
  { q: 'How accurate is the AI marking?', a: 'Very good for most standard GCSE questions. Always treat it as a guide and check with your teacher if unsure.' },
  { q: 'Can my teacher set up accounts for a whole class?', a: 'Not yet — but this is on our roadmap. Email us at suppoprtgcsemaths@gmail.com.' },
  { q: "I've forgotten my password. What do I do?", a: 'Go to the login page and click "Forgot password". You\'ll receive a reset link by email.' },
  { q: 'How do I delete my account?', a: 'Email suppoprtgcsemaths@gmail.com with the subject "Delete my account".' },
]

function ContactJsonLd() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: CONTACT_FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE}/contact` },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  )
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContactJsonLd />
      {children}
    </>
  )
}
