// Apply a per-buyer watermark to every page of a PDF.
//
// Adds two layers:
//   1. A large, diagonal, semi-transparent "Licensed to <email>" across the
//      middle of every page — the visible deterrent.
//   2. A small footer with email, date and the licence terms — the audit trail
//      if the PDF is shared.
//
// Both layers are rendered on top of the existing PDF content, so the
// original questions / mark schemes / solutions remain untouched.

import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'

export interface WatermarkOptions {
  email: string
  /** Optional reference (e.g. Stripe session id) shown in the footer. */
  reference?: string
  /** ISO date string for the footer. Defaults to today. */
  dateISO?: string
}

const FOOTER_LINE = '© 2026 GCSEMathsAI · gcsemathsai.co.uk · licensed for personal revision use · redistribution prohibited'

export async function applyWatermark(input: Uint8Array | ArrayBuffer | Buffer, opts: WatermarkOptions): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(input)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const pages = pdfDoc.getPages()

  const date = opts.dateISO ?? new Date().toISOString().slice(0, 10)
  const diagonalText = `Licensed to ${opts.email} — do not share`
  const footerLeft = `Licensed to ${opts.email}`
  const footerRight = `Downloaded ${date}${opts.reference ? ` · ${opts.reference.slice(-12)}` : ''}`

  for (const page of pages) {
    const { width, height } = page.getSize()

    // ── Diagonal watermark across the middle ───────────────────────────────
    const fontSize = Math.max(28, Math.min(48, width / 22))
    const textWidth = helveticaBold.widthOfTextAtSize(diagonalText, fontSize)
    // Centre the text on the page, then rotate around that centre.
    page.drawText(diagonalText, {
      x: width / 2 - textWidth / 2.4,
      y: height / 2 - fontSize / 2 - textWidth / 8,
      size: fontSize,
      font: helveticaBold,
      color: rgb(0.85, 0.85, 0.85),
      rotate: degrees(35),
      opacity: 0.32,
    })

    // ── Bottom-of-page licence footer (always visible) ─────────────────────
    page.drawText(footerLeft, {
      x: 24,
      y: 18,
      size: 7.5,
      font: helveticaBold,
      color: rgb(0.42, 0.42, 0.42),
    })
    page.drawText(footerRight, {
      x: width - helvetica.widthOfTextAtSize(footerRight, 7.5) - 24,
      y: 18,
      size: 7.5,
      font: helvetica,
      color: rgb(0.42, 0.42, 0.42),
    })
    page.drawText(FOOTER_LINE, {
      x: 24,
      y: 6,
      size: 6,
      font: helvetica,
      color: rgb(0.55, 0.55, 0.55),
    })
  }

  return pdfDoc.save({ useObjectStreams: false })
}
