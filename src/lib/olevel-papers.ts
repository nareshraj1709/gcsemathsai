// O-Level Maths practice papers product — a standalone product line, kept
// separate from both PREDICTED_PAPER_FAMILIES (GCSE) and psle-papers.ts so it
// can never collide with or break either of those existing purchase flows.
//
// Deliberately reuses the same Stripe Payment Link as the PSLE product (by
// explicit choice — the Stripe-hosted checkout page will still display the
// PSLE product name/branding for an O-Level buyer). Products are told apart
// purely via the client_reference_id query param, not the link itself.

export const OLEVEL_SKU_ID = 'olevel_bundle' as const
export type OlevelSkuId = typeof OLEVEL_SKU_ID

export interface OlevelPaperFile {
  filename: string
  label: string
}

// No per-paper topic breakdown was supplied for this product (unlike PSLE) —
// using plain paper numbers rather than inventing topic claims that can't be
// verified against the actual PDF content.
export const OLEVEL_FILES: OlevelPaperFile[] = Array.from({ length: 10 }, (_, i) => ({
  filename: `O_LEVEL_Practice_Paper_${i + 1}.pdf`,
  label: `Paper ${i + 1}`,
}))

const SHARED_STRIPE_URL = 'https://buy.stripe.com/cNi6oI5C05osfQj07dgIo04'

/** Appends client_reference_id so the purchase/download routes can identify this SKU. */
export function getOlevelCheckoutUrl(): string {
  const sep = SHARED_STRIPE_URL.includes('?') ? '&' : '?'
  return `${SHARED_STRIPE_URL}${sep}client_reference_id=${OLEVEL_SKU_ID}`
}

export const OLEVEL_PRODUCT = {
  id: OLEVEL_SKU_ID,
  title: 'O-Level Maths Practice Papers — Complete 10-Paper Bundle',
  priceDisplay: '$20 SGD',
  files: OLEVEL_FILES,
}

export function isOlevelSkuId(s: unknown): s is OlevelSkuId {
  return s === OLEVEL_SKU_ID
}
