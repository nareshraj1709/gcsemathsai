import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using GCSEMathsAI.',
  robots: { index: false },
}

const LAST_UPDATED = '14 March 2026'
const EFFECTIVE_DATE = '14 March 2026'

const sections = [
  {
    id: 'agreement',
    title: '1. Agreement to these terms',
    content: `By creating an account or using GCSEMathsAI (accessible at gcsemathsai.co.uk), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the service.

These terms form a legally binding agreement between you and GCSEMathsAI ("we", "us", "our"), operated from England, United Kingdom.

If you are under 18, you confirm that a parent or guardian has reviewed and agreed to these terms on your behalf.`,
  },
  {
    id: 'service',
    title: '2. What GCSEMathsAI is',
    content: `GCSEMathsAI is an online educational revision tool that:

— Presents GCSE Maths practice questions aligned to AQA, Edexcel and OCR specifications
— Uses artificial intelligence (Anthropic's Claude) to mark your answers and provide written feedback
— Tracks your practice history and shows progress by topic
— Helps students prepare for GCSE Maths examinations

**Important disclaimer**: GCSEMathsAI is a revision aid only. We do not guarantee any specific exam result, grade improvement, or educational outcome. Your results depend on many factors outside our control. AI marking feedback is for guidance and learning purposes — it is not an official assessment and should not be treated as such.`,
  },
  {
    id: 'eligibility',
    title: '3. Eligibility',
    content: `To use GCSEMathsAI you must:

— Be at least 13 years old, or have verifiable parental or guardian consent if under 13
— Provide accurate information when creating your account
— Not be prohibited from using the service under applicable law

If we discover that a user is under 13 without parental consent, we will immediately close the account and delete all associated data.

GCSEMathsAI is intended primarily for students in England, Wales, Scotland and Northern Ireland preparing for GCSE or equivalent qualifications, though anyone may use the service.`,
  },
  {
    id: 'accounts',
    title: '4. Your account',
    content: `**Creating an account**: You must provide a valid email address and create a password. You are responsible for keeping your login credentials confidential.

**Account security**: You are responsible for all activity that occurs under your account. Notify us immediately at hello@gcsemathsai.co.uk if you suspect unauthorised access.

**One account per person**: You may not create multiple accounts or share your account with others. If you are a teacher or parent setting up accounts for students, please contact us at hello@gcsemathsai.co.uk.

**Accuracy**: You agree to provide accurate and up-to-date information. We may suspend or delete accounts where we reasonably believe information is false or misleading.`,
  },
  {
    id: 'acceptable-use',
    title: '5. Acceptable use',
    content: `You agree to use GCSEMathsAI only for lawful, personal educational purposes. You must not:

— Attempt to reverse-engineer, scrape, or systematically extract content from the service
— Use automated tools, bots, or scripts to interact with the service
— Submit content that is harmful, offensive, abusive, or illegal
— Attempt to gain unauthorised access to any part of the service or its infrastructure
— Use the service to generate content for commercial purposes without our written permission
— Impersonate another person or entity
— Interfere with or disrupt the service or its servers

We reserve the right to suspend or terminate any account that violates these rules without notice.`,
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual property',
    content: `**Our content**: All questions, mark schemes, interface design, text, graphics, and code on GCSEMathsAI are owned by or licensed to us. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.

**Your content**: When you submit practice answers, you grant us a limited, non-exclusive licence to process that content for the purpose of providing the service (i.e. sending it to the AI marking system and storing your results). You retain ownership of your answers.

**Exam board specifications**: Questions are written by us and inspired by publicly available GCSE specifications. GCSEMathsAI is not affiliated with, endorsed by, or officially associated with AQA, Edexcel, OCR, or any other examination board.`,
  },
  {
    id: 'ai-content',
    title: '7. AI-generated feedback',
    content: `GCSEMathsAI uses Anthropic's Claude AI model to generate marking feedback. You acknowledge that:

— AI-generated feedback may occasionally contain errors, inaccuracies, or incomplete explanations
— Feedback is for educational guidance only and is not a substitute for qualified teaching
— You should verify important information with your teacher or a textbook
— We do not guarantee that AI feedback reflects official mark scheme outcomes
— The AI system may be updated, changed, or temporarily unavailable

We make reasonable efforts to ensure feedback quality but accept no liability for losses arising from reliance on AI-generated content.`,
  },
  {
    id: 'free-service',
    title: '8. Free service and future pricing',
    content: `GCSEMathsAI is currently provided free of charge. We reserve the right to introduce paid plans or premium features in the future. If we do:

— We will give existing users at least 30 days' notice before any previously free feature becomes paid
— Free tier users will always have access to a meaningful subset of the service
— Any paid plans will be clearly described before you are charged

We will never charge you without your explicit consent.`,
  },
  {
    id: 'availability',
    title: '9. Service availability',
    content: `We aim to keep GCSEMathsAI available 24/7 but cannot guarantee uninterrupted access. The service may be temporarily unavailable due to:

— Scheduled maintenance (we will try to give advance notice)
— Unexpected technical issues
— Third-party service outages (e.g. Supabase, Anthropic, Vercel)
— Circumstances outside our reasonable control

We will not be liable for any losses arising from service downtime.`,
  },
  {
    id: 'limitation-liability',
    title: '10. Limitation of liability',
    content: `To the fullest extent permitted by English law:

— We provide the service "as is" without warranties of any kind, express or implied
— We are not liable for indirect, incidental, consequential, or punitive damages arising from your use of the service
— Our total liability to you for any claim arising from these terms shall not exceed £100 or the amount you paid us in the 12 months preceding the claim, whichever is greater
— Nothing in these terms excludes liability for death or personal injury caused by our negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded by English law

These terms do not affect your statutory rights as a consumer under the Consumer Rights Act 2015.`,
  },
  {
    id: 'termination',
    title: '11. Termination',
    content: `**By you**: You may close your account at any time by emailing hello@gcsemathsai.co.uk. On closure, your data will be deleted within 30 days in accordance with our Privacy Policy.

**By us**: We may suspend or terminate your account immediately if you breach these terms, engage in fraudulent activity, or if we are required to do so by law. We may also terminate the service entirely with 30 days' notice.

On termination, your right to use the service ceases immediately. Sections 6, 7, 10, and 12 of these terms survive termination.`,
  },
  {
    id: 'governing-law',
    title: '12. Governing law and disputes',
    content: `These terms are governed by and construed in accordance with the laws of England and Wales.

Any disputes arising under or in connection with these terms shall first be subject to good-faith negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.

If you are a consumer resident in another UK jurisdiction, you may also have the right to bring proceedings in your local courts.`,
  },
  {
    id: 'changes',
    title: '13. Changes to these terms',
    content: `We may update these Terms of Service from time to time. We will notify you of material changes by email at least 14 days before they take effect.

If you continue to use GCSEMathsAI after updated terms take effect, you are deemed to have accepted them. If you do not accept the changes, you should close your account before the effective date.`,
  },
  {
    id: 'contact-legal',
    title: '14. Contact',
    content: `For questions about these terms:

**Email**: hello@gcsemathsai.co.uk
**Post**: GCSEMathsAI, England, United Kingdom

We aim to respond within 5 working days.`,
  },
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-100 px-6 py-12 text-center">
        <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">Legal</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Terms of Service</h1>
        <p className="text-gray-500 text-sm">Effective: {EFFECTIVE_DATE} · Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-10">
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Plain-English summary:</strong> Use GCSEMathsAI for your own revision. Don&apos;t misuse it. AI feedback is helpful but can be wrong — always check with your teacher. We&apos;re free now and will give plenty of notice if that changes. Governed by English law.
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
          <Link href="/privacy" className="hover:text-purple-700 transition">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-purple-700 transition">Contact us</Link>
          <Link href="/" className="hover:text-purple-700 transition">← Back to home</Link>
        </div>
      </div>
    </main>
  )
}
