// Predicted papers product catalogue. When Stripe links are ready, replace
// `stripeUrl` for each product below. No other file needs changing.

export interface PredictedPaperSku {
  id: 'paper2' | 'paper3' | 'bundle'
  badge: string
  title: string
  subtitle: string
  price: string
  priceNote: string
  paperCount: number
  description: string
  includes: string[]
  stripeUrl: string
  highlight?: boolean
}

export interface PredictedPaperFamily {
  slug: string
  board: 'Edexcel' | 'AQA' | 'OCR'
  tier: 'Higher' | 'Foundation'
  year: number
  title: string
  shortTitle: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  heroBlurb: string
  skus: PredictedPaperSku[]
  /** Alternative legacy slugs that 301 to this family's URL. */
  legacyRedirects?: string[]
}

const EDEXCEL_HIGHER_2026_SKUS: PredictedPaperSku[] = [
  {
    id: 'paper2',
    badge: 'Paper 2 · Calculator',
    title: 'Paper 2 Predicted Pack',
    subtitle: 'Edexcel 1MA1 Higher · five full predicted papers',
    price: '£9.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five complete predicted Paper 2 (calculator) papers for Edexcel Higher, calibrated to recent paper styles and the topics most likely to appear in 2026.',
    includes: [
      '5 × full 80-mark predicted papers',
      'Detailed mark schemes for every question',
      'Worked solutions with examiner-style reasoning',
      'Topic coverage map for each paper',
      'Grade-boundary estimate cheatsheet',
    ],
    stripeUrl: '#stripe-paper2',
  },
  {
    id: 'paper3',
    badge: 'Paper 3 · Calculator',
    title: 'Paper 3 Predicted Pack',
    subtitle: 'Edexcel 1MA1 Higher · five full predicted papers',
    price: '£9.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five complete predicted Paper 3 (calculator) papers for Edexcel Higher, weighted toward the topics least covered on the 2026 Paper 1 and Paper 2.',
    includes: [
      '5 × full 80-mark predicted papers',
      'Detailed mark schemes for every question',
      'Worked solutions with examiner-style reasoning',
      'Topic coverage map for each paper',
      'Grade-boundary estimate cheatsheet',
    ],
    stripeUrl: '#stripe-paper3',
  },
  {
    id: 'bundle',
    badge: 'Bundle · Save 20%',
    title: 'Paper 2 + Paper 3 Bundle',
    subtitle: 'Edexcel 1MA1 Higher · ten predicted papers in one pack',
    price: '£15.99',
    priceNote: 'one-off · instant download · save £4',
    paperCount: 10,
    description: 'Both calculator-paper packs together at a discount. Ten full predicted papers, mark schemes and worked solutions — the complete predicted-paper bundle for Edexcel Higher 2026.',
    includes: [
      '10 × full 80-mark predicted papers (5 of Paper 2, 5 of Paper 3)',
      'Mark schemes for every question',
      'Worked solutions with examiner-style reasoning',
      'Topic coverage map across both calculator papers',
      'Grade-boundary estimate cheatsheet',
      'Save 20% versus buying each pack separately',
    ],
    stripeUrl: '#stripe-bundle',
    highlight: true,
  },
]

export const PREDICTED_PAPER_FAMILIES: PredictedPaperFamily[] = [
  {
    slug: 'edexcel-gcse-maths-higher-2026',
    board: 'Edexcel',
    tier: 'Higher',
    year: 2026,
    title: 'Edexcel GCSE Maths Higher — Predicted Papers 2026',
    shortTitle: 'Edexcel Higher · 2026',
    metaTitle: 'Edexcel GCSE Maths 2026 Predicted Papers — Higher Paper 2 & Paper 3',
    metaDescription: 'Five predicted Paper 2 and five predicted Paper 3 papers for Edexcel GCSE Maths Higher (1MA1) 2026. Full mark schemes, worked solutions, instant PDF download.',
    keywords: [
      'edexcel gcse maths 2026 predicted papers',
      'gcse maths 2026 predicted papers',
      'edexcel higher predicted papers',
      'gcse maths paper 2 predicted',
      'gcse maths paper 3 predicted',
      'edexcel 1ma1 predicted',
    ],
    heroBlurb: 'Ten predicted papers for Edexcel 1MA1 Higher in 2026 — five for Paper 2, five for Paper 3. Calibrated to the topics most likely to appear, with full mark schemes and worked solutions.',
    skus: EDEXCEL_HIGHER_2026_SKUS,
    legacyRedirects: ['gcse-maths-2026-predicted-papers'],
  },
]

export function getPredictedPaperFamily(slug: string): PredictedPaperFamily | undefined {
  return PREDICTED_PAPER_FAMILIES.find(f => f.slug === slug)
}

// Backwards-compatible export: the SKUs of the headline family, used by the
// homepage section.
export const PREDICTED_PAPERS = EDEXCEL_HIGHER_2026_SKUS
export const FEATURED_FAMILY = PREDICTED_PAPER_FAMILIES[0]
