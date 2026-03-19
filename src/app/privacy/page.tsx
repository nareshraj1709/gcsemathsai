import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — GCSEMathsAI',
  description: 'How GCSEMathsAI collects, uses and protects your personal data under UK GDPR. Read our full privacy policy.',
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/privacy' },
}

const LAST_UPDATED = '14 March 2026'

const sections = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    content: `GCSEMathsAI ("we", "us", "our") is an educational technology service operated from England, United Kingdom. Our website is gcsemathsai.co.uk.

We are the data controller for personal information collected through this service. If you have any questions about this policy or how we handle your data, please contact us at enquiries@gcsemathsai.co.uk.`,
  },
  {
    id: 'data-we-collect',
    title: '2. Data we collect',
    content: `We collect the following categories of personal data:

**Account data**
— Email address and encrypted password (stored securely via Supabase Auth)
— Onboarding preferences: year group, exam board, tier, and target grade (stored in your browser's local storage)

**Usage data**
— Practice questions you attempt
— The answers you submit
— AI-generated marking feedback and scores
— Topics and subtopics practised
— Timestamps of activity (used to calculate streaks and progress)

**Technical data**
— IP address and approximate location (country/region)
— Browser type and version
— Pages visited and time on site
— Cookies and similar tracking technologies (see Section 8)

We do not collect your full name, date of birth, school name, or any payment details unless you explicitly provide them.`,
  },
  {
    id: 'how-we-use',
    title: '3. How we use your data',
    content: `We use your personal data to:

— Provide, operate and improve the GCSEMathsAI service
— Mark your practice answers using AI and return personalised feedback
— Show you your progress, topic scores and practice streaks on your dashboard
— Send you service-related emails (e.g. password reset, account confirmation)
— Detect and prevent fraudulent or abusive use of the service
— Comply with legal obligations

We do not use your data for advertising. We do not sell your data to third parties. We do not use your answers to train AI models without explicit consent.`,
  },
  {
    id: 'legal-basis',
    title: '4. Legal basis for processing (UK GDPR)',
    content: `We process your personal data on the following legal bases:

**Contract performance (Article 6(1)(b))** — Processing your account details and practice data is necessary to provide the service you signed up for.

**Legitimate interests (Article 6(1)(f))** — We have a legitimate interest in understanding how the service is used in order to improve it, provided this does not override your rights and freedoms.

**Legal obligation (Article 6(1)(c))** — We may process data where required to comply with applicable law.

If you are under 13, we require parental or guardian consent before creating an account. See Section 7 for more detail.`,
  },
  {
    id: 'third-parties',
    title: '5. Third-party services',
    content: `We share data with the following carefully selected third parties in order to operate the service:

**Supabase** (supabase.com) — Our database and authentication provider. Your email, encrypted password, and practice attempt data are stored on Supabase infrastructure hosted in the EU. Supabase is GDPR-compliant and processes data under a Data Processing Agreement with us.

**Anthropic** (anthropic.com) — The AI provider that marks your practice answers. When you submit an answer, the question, mark scheme, and your answer text are sent to Anthropic's Claude API to generate feedback. Anthropic does not use this data to train its models by default. See Anthropic's privacy policy at anthropic.com/privacy.

**Vercel** (vercel.com) — Our hosting provider. Vercel processes server request logs including IP addresses. Vercel is GDPR-compliant.

We do not share your data with any other third parties without your explicit consent.`,
  },
  {
    id: 'data-retention',
    title: '6. How long we keep your data',
    content: `— **Account data**: kept for as long as your account is active, plus 30 days after deletion to allow for recovery.
— **Practice attempts**: kept for the lifetime of your account. You can delete individual attempts or all your data at any time from your account settings.
— **Technical/server logs**: retained for a maximum of 90 days for security and debugging purposes.

When you delete your account, all personal data associated with it is permanently erased within 30 days, except where we are required by law to retain it.`,
  },
  {
    id: 'childrens-privacy',
    title: '7. Children\'s privacy',
    content: `GCSEMathsAI is designed for students aged 14 and over. We do not knowingly collect personal data from children under 13 without verifiable parental consent.

If you are under 13, please ask a parent or guardian to create an account and supervise your use.

If you are a parent or guardian and believe your child under 13 has created an account without your consent, please contact us immediately at enquiries@gcsemathsai.co.uk and we will delete the account and all associated data within 5 working days.

We take children's privacy seriously and follow the ICO's Age Appropriate Design Code (Children's Code).`,
  },
  {
    id: 'cookies',
    title: '8. Cookies',
    content: `We use the following cookies and similar technologies:

**Strictly necessary cookies** — Session cookies used by Supabase Auth to keep you logged in. These cannot be disabled as they are essential for the service to function.

**Analytics cookies** — We may use privacy-friendly, anonymised analytics (without advertising tracking) to understand aggregate usage patterns. No personally identifiable information is included.

We do not use advertising cookies, tracking pixels, or third-party remarketing technologies.

You can control cookies through your browser settings. Disabling strictly necessary cookies will prevent you from logging in.`,
  },
  {
    id: 'your-rights',
    title: '9. Your rights',
    content: `Under UK GDPR and the Data Protection Act 2018, you have the following rights:

— **Right of access** — Request a copy of the personal data we hold about you
— **Right to rectification** — Ask us to correct inaccurate or incomplete data
— **Right to erasure** ("right to be forgotten") — Ask us to delete your personal data
— **Right to restriction** — Ask us to restrict how we process your data
— **Right to data portability** — Receive your data in a structured, machine-readable format
— **Right to object** — Object to processing based on legitimate interests
— **Right not to be subject to automated decision-making** — We do not make legally significant decisions about you solely by automated means

To exercise any of these rights, email enquiries@gcsemathsai.co.uk. We will respond within 30 days. There is no charge for exercising your rights.

If you are unhappy with how we handle your data, you have the right to lodge a complaint with the **Information Commissioner's Office (ICO)** at ico.org.uk or by calling 0303 123 1113.`,
  },
  {
    id: 'security',
    title: '10. Data security',
    content: `We take appropriate technical and organisational measures to protect your personal data, including:

— All data in transit is encrypted using TLS/HTTPS
— Passwords are hashed and never stored in plain text
— Access to production databases is restricted to authorised personnel only
— We conduct regular security reviews of our infrastructure

Despite these measures, no internet transmission is completely secure. If you suspect your account has been compromised, change your password immediately and contact us.`,
  },
  {
    id: 'changes',
    title: '11. Changes to this policy',
    content: `We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email (to the address on your account) and update the "Last updated" date at the top of this page.

Continued use of the service after changes take effect constitutes your acceptance of the revised policy.`,
  },
  {
    id: 'contact-dpo',
    title: '12. Contact',
    content: `For privacy-related questions, data subject requests, or to report a concern:

**Email**: enquiries@gcsemathsai.co.uk
**Post**: GCSEMathsAI, c/o Data Controller, England, United Kingdom

We aim to respond to all enquiries within 5 working days.`,
  },
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Legal</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10">
          <p className="text-sm text-blue-800 leading-relaxed">
            <strong>Plain-English summary:</strong> We collect your email and practice data to run the service. We use Supabase (EU-hosted) to store it and Anthropic&apos;s Claude to mark your answers. We never sell your data or use it for ads. You can delete everything at any time.
          </p>
        </div>

        {/* Table of contents */}
        <div className="bg-gray-50 rounded-xl p-5 mb-10">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Contents</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm text-purple-700 hover:text-purple-900 hover:underline py-0.5"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map(s => (
            <section key={s.id} id={s.id}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{s.title}</h2>
              <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                {s.content.split('\n\n').map((para, i) => {
                  // Bold the **text** markers
                  const parts = para.split(/(\*\*[^*]+\*\*)/g)
                  return (
                    <p key={i}>
                      {parts.map((part, j) =>
                        part.startsWith('**') && part.endsWith('**')
                          ? <strong key={j} className="text-gray-800">{part.slice(2, -2)}</strong>
                          : part
                      )}
                    </p>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/terms" className="hover:text-purple-700 transition">Terms of Service</Link>
          <Link href="/contact" className="hover:text-purple-700 transition">Contact us</Link>
          <Link href="/" className="hover:text-purple-700 transition">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
