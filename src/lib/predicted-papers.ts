// November GCSE resit practice papers product catalogue. When Stripe links are ready, replace
// `stripeUrl` for each product below. Also set `stripeProductId` to the
// Stripe Price ID (or Product ID) so the webhook can match purchases to
// SKUs and `files` to the PDF filenames under content/predicted-papers/<sku>/.

export type SkuId =
  | 'paper2' | 'paper3' | 'bundle'
  | 'foundation_paper2' | 'foundation_paper3' | 'foundation_bundle'

export interface PredictedPaperSku {
  id: SkuId
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
  /** PDF files, relative paths under the SKU's content root. */
  files: Array<{ folder: 'paper2' | 'paper3'; filename: string; label: string }>
  /** Which content root holds this SKU's PDFs. Default: predicted-papers. */
  contentRoot?: 'predicted-papers' | 'foundation-papers'
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

/** SKU ids that grant access to a given purchased SKU. */
export function entitlingSkus(skuId: string): string[] {
  if (skuId === 'paper2') return ['paper2', 'bundle']
  if (skuId === 'paper3') return ['paper3', 'bundle']
  if (skuId === 'bundle') return ['bundle']
  if (skuId === 'foundation_paper2') return ['foundation_paper2', 'foundation_bundle']
  if (skuId === 'foundation_paper3') return ['foundation_paper3', 'foundation_bundle']
  if (skuId === 'foundation_bundle') return ['foundation_bundle']
  return []
}

/** Whether a SKU id is one of the recognised client_reference_id values. */
export function isKnownSkuId(s: unknown): s is SkuId {
  return (
    s === 'paper2' || s === 'paper3' || s === 'bundle' ||
    s === 'foundation_paper2' || s === 'foundation_paper3' || s === 'foundation_bundle'
  )
}

const PAPER2_FILES = [
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper2_SetA.pdf', label: 'Set A' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper2_SetB.pdf', label: 'Set B' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper2_SetC.pdf', label: 'Set C' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper2_SetD.pdf', label: 'Set D' },
  { folder: 'paper2' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper2_SetE.pdf', label: 'Set E' },
]
const PAPER3_FILES = [
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper3_SetA.pdf', label: 'Set A' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper3_SetB.pdf', label: 'Set B' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper3_SetC.pdf', label: 'Set C' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper3_SetD.pdf', label: 'Set D' },
  { folder: 'paper3' as const, filename: 'GCSE_Maths_Edexcel_Higher_Practice_Paper3_SetE.pdf', label: 'Set E' },
]

// Foundation Calculator Practice papers — Sets 1-5 are Paper-2 style,
// Sets 6-10 are Paper-3 style. Files live under content/foundation-papers/.
const FOUNDATION_PAPER2_FILES = [
  { folder: 'paper2' as const, filename: 'Foundation_Paper2_Set1.pdf', label: 'Set 1' },
  { folder: 'paper2' as const, filename: 'Foundation_Paper2_Set2.pdf', label: 'Set 2' },
  { folder: 'paper2' as const, filename: 'Foundation_Paper2_Set3.pdf', label: 'Set 3' },
  { folder: 'paper2' as const, filename: 'Foundation_Paper2_Set4.pdf', label: 'Set 4' },
  { folder: 'paper2' as const, filename: 'Foundation_Paper2_Set5.pdf', label: 'Set 5' },
]
const FOUNDATION_PAPER3_FILES = [
  { folder: 'paper3' as const, filename: 'Foundation_Paper3_Set6.pdf', label: 'Set 6' },
  { folder: 'paper3' as const, filename: 'Foundation_Paper3_Set7.pdf', label: 'Set 7' },
  { folder: 'paper3' as const, filename: 'Foundation_Paper3_Set8.pdf', label: 'Set 8' },
  { folder: 'paper3' as const, filename: 'Foundation_Paper3_Set9.pdf', label: 'Set 9' },
  { folder: 'paper3' as const, filename: 'Foundation_Paper3_Set10.pdf', label: 'Set 10' },
]

// Stripe Payment Links. Paper 2 and Paper 3 share the same £5.99 link — the
// webhook tells them apart via the ?client_reference_id=<sku> query string
// that getCheckoutUrl() appends to each button.
const STRIPE_LINK_PAPER2 = 'https://buy.stripe.com/14A5kE6G43gkeMf4ntgIo01'
const STRIPE_LINK_PAPER3 = 'https://buy.stripe.com/14A5kE6G43gkeMf4ntgIo01'
const STRIPE_LINK_BUNDLE = 'https://buy.stripe.com/5kQ7sM1lKaIM0Vp3jpgIo02'

const EDEXCEL_HIGHER_2026_SKUS: PredictedPaperSku[] = [
  {
    id: 'paper2',
    badge: 'Paper 2 · Calculator',
    title: 'Paper 2 Practice Pack',
    subtitle: 'Edexcel 1MA1 Higher style · five full practice papers',
    price: '£5.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five Paper-2 style calculator practice papers, carefully written by our team from the published Edexcel 1MA1 Higher specification. Weighted toward the topics most commonly examined in recent series.',
    includes: [
      '5 × full 80-mark practice papers (Paper-2 style)',
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
    title: 'Paper 3 Practice Pack',
    subtitle: 'Edexcel 1MA1 Higher style · five full practice papers',
    price: '£5.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five Paper-3 style calculator practice papers, carefully written from the published Edexcel 1MA1 Higher specification. Designed to be sat after Paper 2 and to cover topics that tend to appear later in the series.',
    includes: [
      '5 × full 80-mark practice papers (Paper-3 style)',
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
    subtitle: 'Edexcel 1MA1 Higher style · ten practice papers in one pack',
    price: '£9.99',
    priceNote: 'one-off · instant download · save £1.99',
    paperCount: 10,
    description: 'Both calculator-paper packs together at a discount. Ten Higher-tier practice papers, mark schemes and worked solutions — carefully written by our team from the published Edexcel 1MA1 specification.',
    includes: [
      '10 × full 80-mark practice papers (5 Paper-2 style, 5 Paper-3 style)',
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

const EDEXCEL_FOUNDATION_2026_SKUS: PredictedPaperSku[] = [
  {
    id: 'foundation_paper2',
    badge: 'Paper 2 · Calculator',
    title: 'Foundation Paper 2 Practice Pack',
    subtitle: 'Edexcel 1MA1 Foundation · five full calculator practice papers',
    price: '£5.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five complete Foundation-tier calculator practice papers in the style of Edexcel Paper 2F. Topics weighted toward percentages, ratio, statistics, scatter graphs and speed-distance-time.',
    includes: [
      '5 × full 80-mark practice papers (Foundation tier)',
      'Detailed mark schemes for every question (M1 / A1 / B1 / C1 codes)',
      'Worked solutions with step-by-step reasoning',
      'Calibrated to the grade 1–5 difficulty curve',
      'Instant PDF download · watermarked per buyer',
    ],
    stripeUrl: STRIPE_LINK_PAPER2,
    files: FOUNDATION_PAPER2_FILES,
    contentRoot: 'foundation-papers',
  },
  {
    id: 'foundation_paper3',
    badge: 'Paper 3 · Calculator',
    title: 'Foundation Paper 3 Practice Pack',
    subtitle: 'Edexcel 1MA1 Foundation · five full calculator practice papers',
    price: '£5.99',
    priceNote: 'one-off · instant download',
    paperCount: 5,
    description: 'Five complete Foundation-tier calculator practice papers in the style of Edexcel Paper 3F. Topics weighted toward compound interest, Pythagoras, volume and surface area, sequences, probability and bearings — with explicit "show that" steps.',
    includes: [
      '5 × full 80-mark practice papers (Foundation tier)',
      'Mark schemes with M1 / A1 / B1 / C1 codes',
      'Worked solutions explaining every step',
      'At least one "show that" question per paper',
      'Instant PDF download · watermarked per buyer',
    ],
    stripeUrl: STRIPE_LINK_PAPER3,
    files: FOUNDATION_PAPER3_FILES,
    contentRoot: 'foundation-papers',
  },
  {
    id: 'foundation_bundle',
    badge: 'Bundle · Save 17%',
    title: 'Foundation Paper 2 + Paper 3 Bundle',
    subtitle: 'Edexcel 1MA1 Foundation · ten practice papers in one pack',
    price: '£9.99',
    priceNote: 'one-off · instant download · save £1.99',
    paperCount: 10,
    description: 'Both Foundation calculator-paper packs together at a discount. Ten full practice papers, mark schemes and worked solutions — the complete Foundation-tier practice bundle.',
    includes: [
      '10 × full 80-mark practice papers (5 Paper-2 style, 5 Paper-3 style)',
      'Mark schemes for every question',
      'Worked solutions with full reasoning',
      'Covers the full Foundation-tier specification',
      'Save £1.99 versus buying each pack separately',
    ],
    stripeUrl: STRIPE_LINK_BUNDLE,
    files: [...FOUNDATION_PAPER2_FILES, ...FOUNDATION_PAPER3_FILES],
    contentRoot: 'foundation-papers',
    highlight: true,
  },
]

export const PREDICTED_PAPER_FAMILIES: PredictedPaperFamily[] = [
  {
    slug: 'edexcel-gcse-maths-higher-2026',
    board: 'Edexcel',
    tier: 'Higher',
    year: 2026,
    title: 'Edexcel GCSE Maths Higher — November Resit Practice Papers',
    shortTitle: 'Edexcel Higher · Nov Resit',
    metaTitle: 'GCSE Maths November Resit Practice Papers — Edexcel Higher Paper 2 & Paper 3',
    metaDescription: 'Ten practice papers for the Edexcel 1MA1 Higher November GCSE resit — five Paper-2 style, five Paper-3 style. Full mark schemes, worked solutions, instant PDF download. Independent revision resource, not affiliated with Pearson Edexcel.',
    keywords: [
      'gcse maths november resit',
      'gcse maths resit practice papers',
      'edexcel november resit maths',
      'gcse maths resit november',
      'edexcel higher practice papers',
      'gcse maths paper 2 practice',
      'gcse maths paper 3 practice',
      'edexcel 1ma1 practice',
    ],
    heroBlurb: 'Ten practice papers for the Edexcel 1MA1 Higher November GCSE resit — five Paper-2 style, five Paper-3 style. Carefully written by our team from the published specification, with full mark schemes and worked solutions.',
    skus: EDEXCEL_HIGHER_2026_SKUS,
    legacyRedirects: ['gcse-maths-2026-predicted-papers'],
  },
  {
    slug: 'edexcel-gcse-maths-foundation-2026',
    board: 'Edexcel',
    tier: 'Foundation',
    year: 2026,
    title: 'Edexcel GCSE Maths Foundation — November Resit Practice Papers',
    shortTitle: 'Edexcel Foundation · Nov Resit',
    metaTitle: 'GCSE Maths November Resit Practice Papers — Edexcel Foundation Paper 2 & Paper 3',
    metaDescription: 'Ten Foundation-tier calculator practice papers for the Edexcel 1MA1 November GCSE resit. Five Paper-2 style, five Paper-3 style. Full mark schemes, worked solutions, instant PDF download.',
    keywords: [
      'gcse maths november resit foundation',
      'gcse maths resit practice papers',
      'edexcel november resit maths',
      'edexcel gcse maths foundation practice papers',
      'gcse maths foundation paper 2',
      'gcse maths foundation paper 3',
      'edexcel 1ma1 foundation practice',
    ],
    heroBlurb: 'Ten Foundation-tier calculator practice papers for the Edexcel 1MA1 November GCSE resit — five Paper-2 style, five Paper-3 style. Calibrated to the grade 1–5 difficulty curve with full mark schemes and worked solutions.',
    skus: EDEXCEL_FOUNDATION_2026_SKUS,
  },
]

export function getPredictedPaperFamily(slug: string): PredictedPaperFamily | undefined {
  return PREDICTED_PAPER_FAMILIES.find(f => f.slug === slug)
}

/**
 * Append the SKU id as client_reference_id to the Stripe Payment Link so the
 * webhook can tell which SKU was bought even when two SKUs share a link.
 */
export function getCheckoutUrl(sku: PredictedPaperSku): string {
  const url = sku.stripeUrl
  if (!url || url.startsWith('#')) return url
  const sep = url.includes('?') ? '&' : '?'
  return `${url}${sep}client_reference_id=${encodeURIComponent(sku.id)}`
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
export const FOUNDATION_PAPERS = EDEXCEL_FOUNDATION_2026_SKUS
export const FEATURED_FAMILY = PREDICTED_PAPER_FAMILIES[0]
export const FOUNDATION_FAMILY = PREDICTED_PAPER_FAMILIES.find(f => f.tier === 'Foundation')!
