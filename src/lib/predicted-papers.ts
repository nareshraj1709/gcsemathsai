// Predicted papers product catalogue. When Stripe links are ready, replace
// `stripeUrl` for each product below. Also set `stripeProductId` to the
// Stripe Price ID (or Product ID) so the webhook can match purchases to
// SKUs and `files` to the PDF filenames under content/predicted-papers/<sku>/.

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
  /** Stripe Payment Link URL (https://buy.stripe.com/...) */
  stripeUrl: string
  /** Stripe Price ID (price_xxx) — used to identify the SKU in webhooks. */
  stripePriceId?: string
  /** PDF files, relative paths under content/predicted-papers/. */
  files: Array<{ folder: 'paper2' | 'paper3'; filename: string; label: string }>
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
  legacyRedirects?: string[]
}

const PAPER2_FILES = [
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetA.pdf', label: 'Set A' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetB.pdf', label: 'Set B' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetC.pdf', label: 'Set C' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetD.pdf', label: 'Set D' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetE.pdf', label: 'Set E' },
]
const PAPER3_FILES = [
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetA.pdf', label: 'Set A' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetB.pdf', label: 'Set B' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetC.pdf', label: 'Set C' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetD.pdf', label: 'Set D' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetE.pdf', label: 'Set E' },
]

// Same Stripe Payment Link supplied for all three SKUs initially — replace
// the individual / bundle URLs once separate links are issued.
const STRIPE_LINK_PAPER2 = 'https://buy.stripe.com/14A5kE6G43gkeMf4ntgIo01'
const STRIPE_LINK_PAPER3 = 'https://buy.stripe.com/14A5kE6G43gkeMf4ntgIo01'
const STRIPE_LINK_BUNDLE = 'https://buy.stripe.com/14A5kE6G43gkeMf4ntgIo01'

const EDEXCEL_HIGHER_2026_SKUS: PredictedPaperSku[] = [
  {
    id: 'paper2',
    badge: 'Paper 2 · Calculator',
    title: 'Paper 2 Predicted Pack',
    subtitle: 'Edexcel 1MA1 Higher · five full predicted papers',
    price: '£5.99',
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
    stripeUrl: STRIPE_LINK_PAPER2,
    files: PAPER2_FILES,
  },
  {
    id: 'paper3',
    badge: 'Paper 3 · Calculator',
    title: 'Paper 3 Predicted Pack',
    subtitle: 'Edexcel 1MA1 Higher · five full predicted papers',
    price: '£5.99',
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
    stripeUrl: STRIPE_LINK_PAPER3,
    files: PAPER3_FILES,
  },
  {
    id: 'bundle',
    badge: 'Bundle · Save 17%',
    title: 'Paper 2 + Paper 3 Bundle',
    subtitle: 'Edexcel 1MA1 Higher · ten predicted papers in one pack',
    price: '£9.99',
    priceNote: 'one-off · instant download · save £1.99',
    paperCount: 10,
    description: 'Both calculator-paper packs together at a discount. Ten full predicted papers, mark schemes and worked solutions — the complete predicted-paper bundle for Edexcel Higher 2026.',
    includes: [
      '10 × full 80-mark predicted papers (5 of Paper 2, 5 of Paper 3)',
      'Mark schemes for every question',
      'Worked solutions with examiner-style reasoning',
      'Topic coverage map across both calculator papers',
      'Grade-boundary estimate cheatsheet',
      'Save £1.99 versus buying each pack separately',
    ],
    stripeUrl: STRIPE_LINK_BUNDLE,
    files: [...PAPER2_FILES, ...PAPER3_FILES],
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

/** Look up an SKU by its id ('paper2' | 'paper3' | 'bundle') across all families. */
export function getSkuById(skuId: string): PredictedPaperSku | undefined {
  for (const f of PREDICTED_PAPER_FAMILIES) {
    const s = f.skus.find(s => s.id === skuId)
    if (s) return s
  }
  return undefined
}

/** Look up an SKU by its Stripe Price ID. Used by the webhook handler. */
export function getSkuByStripePriceId(priceId: string): PredictedPaperSku | undefined {
  for (const f of PREDICTED_PAPER_FAMILIES) {
    const s = f.skus.find(s => s.stripePriceId === priceId)
    if (s) return s
  }
  return undefined
}

export const PREDICTED_PAPERS = EDEXCEL_HIGHER_2026_SKUS
export const FEATURED_FAMILY = PREDICTED_PAPER_FAMILIES[0]
