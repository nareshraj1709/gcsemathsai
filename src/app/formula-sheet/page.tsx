import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'GCSE Maths Formula Sheet — Free PDF Download',
  description: 'Download the complete GCSE Maths formula sheet as a free PDF. Every formula you need for AQA, Edexcel and OCR exams in one place.',
  keywords: ['GCSE maths formula sheet', 'GCSE maths formulas PDF', 'maths formula sheet GCSE', 'AQA maths formulas', 'Edexcel maths formulas'],
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/formula-sheet' },
  openGraph: {
    title: 'GCSE Maths Formula Sheet — Free PDF Download',
    description: 'Every GCSE Maths formula in one free PDF. Covers AQA, Edexcel and OCR.',
    url: 'https://www.gcsemathsai.co.uk/formula-sheet',
  },
}

const FORMULA_GROUPS = [
  {
    name: 'Area & Perimeter',
    colour: 'bg-green-50 border-green-200 text-green-800',
    icon: '📏',
    formulas: [
      'Area of rectangle = length × width',
      'Area of triangle = ½ × base × height',
      'Area of parallelogram = base × height',
      'Area of trapezium = ½(a + b) × h',
      'Area of circle = πr²',
      'Circumference = 2πr = πd',
    ],
  },
  {
    name: 'Volume & Surface Area',
    colour: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: '🧊',
    formulas: [
      'Volume of cuboid = l × w × h',
      'Volume of prism = area of cross-section × length',
      'Volume of cylinder = πr²h',
      'Volume of sphere = ⁴⁄₃πr³',
      'Volume of cone = ⅓πr²h',
      'Surface area of sphere = 4πr²',
    ],
  },
  {
    name: 'Algebra',
    colour: 'bg-purple-50 border-purple-200 text-purple-800',
    icon: '📐',
    formulas: [
      'Quadratic formula: x = (−b ± √(b²−4ac)) / 2a',
      'Difference of two squares: a² − b² = (a+b)(a−b)',
      'Gradient = (y₂ − y₁) / (x₂ − x₁)',
      'Equation of a line: y = mx + c',
      'nth term (arithmetic): a + (n−1)d',
    ],
  },
  {
    name: 'Trigonometry & Pythagoras',
    colour: 'bg-amber-50 border-amber-200 text-amber-800',
    icon: '△',
    formulas: [
      'Pythagoras: a² + b² = c²',
      'sin θ = opposite / hypotenuse',
      'cos θ = adjacent / hypotenuse',
      'tan θ = opposite / adjacent',
      'Sine rule: a/sin A = b/sin B = c/sin C',
      'Cosine rule: a² = b² + c² − 2bc cos A',
      'Area of triangle = ½ab sin C',
    ],
  },
  {
    name: 'Probability & Statistics',
    colour: 'bg-rose-50 border-rose-200 text-rose-800',
    icon: '📊',
    formulas: [
      'Probability = favourable outcomes / total outcomes',
      'P(A or B) = P(A) + P(B) − P(A and B)',
      'P(not A) = 1 − P(A)',
      'Mean = sum of values / number of values',
      'Compound interest: A = P(1 + r/100)ⁿ',
    ],
  },
  {
    name: 'Compound Measures',
    colour: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    icon: '⚡',
    formulas: [
      'Speed = distance / time',
      'Density = mass / volume',
      'Pressure = force / area',
    ],
  },
]

export default function FormulaSheetPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-700 to-indigo-800 px-6 py-14 text-center text-white">
        <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
          Free Download
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-3">
          GCSE Maths Formula Sheet
        </h1>
        <p className="text-purple-200 text-base max-w-lg mx-auto mb-8">
          Every formula you need for AQA, Edexcel and OCR — in one printable PDF. Download it, pin it to your wall, and never forget a formula again.
        </p>

        {/* Download + View buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="/GCSE_Maths_Formula_Sheet.pdf"
            download
            className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-purple-50 transition shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v10M8 11l-3-3M8 11l3-3M2 13h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download PDF
          </a>
          <a
            href="/GCSE_Maths_Formula_Sheet.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl text-sm hover:bg-white/20 transition"
          >
            View in browser
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Quick reference grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Reference</h2>
        <p className="text-gray-500 text-sm mb-8">
          Here are the key formulas from the sheet. Download the full PDF above for the complete list with diagrams.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {FORMULA_GROUPS.map(group => (
            <div key={group.name} className={`border rounded-xl overflow-hidden ${group.colour.split(' ')[1]}`}>
              <div className={`${group.colour.split(' ')[0]} px-5 py-3 flex items-center gap-2 border-b ${group.colour.split(' ')[1]}`}>
                <span className="text-lg">{group.icon}</span>
                <h3 className={`font-bold text-sm ${group.colour.split(' ')[2]}`}>{group.name}</h3>
              </div>
              <div className="bg-white px-5 py-4">
                <ul className="space-y-2">
                  {group.formulas.map(f => (
                    <li key={f} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-gray-300 mt-0.5">•</span>
                      <span className="font-mono text-xs leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Tips section */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-6 mb-10">
          <h2 className="text-lg font-bold text-amber-800 mb-3">How to use this formula sheet</h2>
          <ul className="space-y-2 text-sm text-amber-900">
            <li className="flex gap-2"><span className="font-bold">1.</span> Print it out and stick it on your bedroom wall or inside your revision folder.</li>
            <li className="flex gap-2"><span className="font-bold">2.</span> Test yourself — cover the right side and try to recall each formula from memory.</li>
            <li className="flex gap-2"><span className="font-bold">3.</span> In the exam, some formulas are given on the front page (area of trapezium, volume of prism, etc.) but many are not. Learn the ones that are NOT given.</li>
            <li className="flex gap-2"><span className="font-bold">4.</span> Use our <Link href="/learn" className="text-purple-700 font-semibold hover:underline">practice questions</Link> to apply each formula in exam-style contexts.</li>
          </ul>
        </div>

        {/* Which formulas are given */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-6 mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Which formulas are given in the exam?</h2>
          <p className="text-sm text-gray-600 mb-4">
            AQA, Edexcel and OCR all provide a formula sheet on the front page of the exam paper. The formulas they give you are:
          </p>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <p className="font-semibold text-green-700 text-xs mb-2">GIVEN IN THE EXAM</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Area of trapezium</li>
                <li>• Volume of prism</li>
                <li>• Quadratic formula (Higher)</li>
                <li>• Sine rule, Cosine rule (Higher)</li>
                <li>• Area = ½ab sin C (Higher)</li>
                <li>• Volume of cone and sphere (Higher)</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-100 rounded-lg p-3">
              <p className="font-semibold text-red-700 text-xs mb-2">NOT GIVEN — MUST MEMORISE</p>
              <ul className="space-y-1 text-gray-600">
                <li>• Area of circle, triangle, parallelogram</li>
                <li>• Circumference of a circle</li>
                <li>• Pythagoras&apos; theorem</li>
                <li>• SOH CAH TOA</li>
                <li>• Speed = distance / time</li>
                <li>• Density = mass / volume</li>
                <li>• Compound interest formula</li>
                <li>• y = mx + c</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Second CTA */}
        <div className="bg-purple-700 rounded-2xl px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Know the formulas? Now apply them.</h2>
          <p className="text-purple-200 text-sm mb-6 max-w-md mx-auto">
            Practise exam-style questions with AI marking — get instant feedback on your working and method marks.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/auth"
              className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-xl text-sm hover:bg-purple-50 transition"
            >
              Start practising free →
            </Link>
            <a
              href="/GCSE_Maths_Formula_Sheet.pdf"
              download
              className="inline-block bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-white/20 transition"
            >
              Download PDF again
            </a>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-10 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Related resources</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <Link href="/blog/gcse-maths-formulas-you-must-know" className="block bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:shadow-md transition">
              <p className="text-sm font-semibold text-gray-900">GCSE Maths Formulas You Must Know</p>
              <p className="text-xs text-gray-500 mt-1">In-depth guide explaining when and how to use each formula</p>
            </Link>
            <Link href="/topics" className="block bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:shadow-md transition">
              <p className="text-sm font-semibold text-gray-900">All 73 GCSE Maths Topics</p>
              <p className="text-xs text-gray-500 mt-1">Step-by-step explanations and worked examples for every topic</p>
            </Link>
            <Link href="/blog/7-day-gcse-maths-revision-plan" className="block bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:shadow-md transition">
              <p className="text-sm font-semibold text-gray-900">7-Day Revision Plan</p>
              <p className="text-xs text-gray-500 mt-1">Structured revision timetable to cover everything before the exam</p>
            </Link>
            <Link href="/downloads" className="block bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 hover:shadow-md transition">
              <p className="text-sm font-semibold text-gray-900">Download Past Papers</p>
              <p className="text-xs text-gray-500 mt-1">Free AQA past paper PDFs to print and practise</p>
            </Link>
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap gap-6 text-sm text-gray-500">
          <Link href="/topics" className="hover:text-purple-700 transition">Topics</Link>
          <Link href="/blog" className="hover:text-purple-700 transition">Blog</Link>
          <Link href="/features" className="hover:text-purple-700 transition">Features</Link>
          <Link href="/" className="hover:text-purple-700 transition">← Home</Link>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'GCSE Maths Formula Sheet',
            description: 'Complete GCSE Maths formula sheet covering all topics for AQA, Edexcel and OCR exams.',
            url: 'https://www.gcsemathsai.co.uk/formula-sheet',
            publisher: { '@type': 'Organization', name: 'GCSEMathsAI' },
          }),
        }}
      />
    </main>
  )
}
