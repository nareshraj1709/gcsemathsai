// PSLE Maths practice papers product — a standalone product line, deliberately
// kept separate from PREDICTED_PAPER_FAMILIES (predicted-papers.ts) rather than
// forced into that GCSE-specific board/tier type system. Kept isolated so this
// product can never collide with or break the existing GCSE Stripe flow.

export const PSLE_SKU_ID = 'psle_bundle' as const
export type PsleSkuId = typeof PSLE_SKU_ID

export interface PslePaperFile {
  filename: string
  label: string
  topic: string
}

export const PSLE_FILES: PslePaperFile[] = [
  { filename: 'PSLE_Practice_Paper_1.pdf', label: 'Paper 1', topic: 'Fractions, Decimals, Percentages & Ratios' },
  { filename: 'PSLE_Practice_Paper_2.pdf', label: 'Paper 2', topic: 'Geometry, Angles & Lines' },
  { filename: 'PSLE_Practice_Paper_3.pdf', label: 'Paper 3', topic: 'Area, Perimeter & Circumference' },
  { filename: 'PSLE_Practice_Paper_4.pdf', label: 'Paper 4', topic: 'Speed, Distance & Time' },
  { filename: 'PSLE_Practice_Paper_5.pdf', label: 'Paper 5', topic: 'Algebra & Equations' },
  { filename: 'PSLE_Practice_Paper_6.pdf', label: 'Paper 6', topic: 'Data Handling & Probability' },
  { filename: 'PSLE_Practice_Paper_7.pdf', label: 'Paper 7', topic: 'Volume & 3D Shapes' },
  { filename: 'PSLE_Practice_Paper_8.pdf', label: 'Paper 8', topic: 'Coordinates & Graphs' },
  { filename: 'PSLE_Practice_Paper_9.pdf', label: 'Paper 9', topic: 'Mixed Problems & Applications' },
  { filename: 'PSLE_Practice_Paper_10.pdf', label: 'Paper 10', topic: 'Comprehensive Review' },
]

export const PSLE_STRIPE_URL = 'https://buy.stripe.com/cNi6oI5C05osfQj07dgIo04'

/** Appends client_reference_id so the purchase/download routes can identify this SKU. */
export function getPsleCheckoutUrl(): string {
  const sep = PSLE_STRIPE_URL.includes('?') ? '&' : '?'
  return `${PSLE_STRIPE_URL}${sep}client_reference_id=${PSLE_SKU_ID}`
}

export const PSLE_PRODUCT = {
  id: PSLE_SKU_ID,
  title: 'PSLE Maths Practice Papers — Complete 10-Paper Bundle',
  priceDisplay: '$20 SGD',
  files: PSLE_FILES,
}

export function isPsleSkuId(s: unknown): s is PsleSkuId {
  return s === PSLE_SKU_ID
}
