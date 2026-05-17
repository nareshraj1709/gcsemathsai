// Predicted papers product catalogue. When Stripe links are ready, replace
// `stripeUrl` for each product below. No other file needs changing.

export interface PredictedPaperProduct {
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

export const PREDICTED_PAPERS: PredictedPaperProduct[] = [
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
    stripeUrl: '#stripe-paper2', // Replace with Stripe Payment Link
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
    stripeUrl: '#stripe-paper3', // Replace with Stripe Payment Link
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
    stripeUrl: '#stripe-bundle', // Replace with Stripe Payment Link
    highlight: true,
  },
]
