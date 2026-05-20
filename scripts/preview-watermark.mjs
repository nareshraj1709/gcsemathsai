// Generate watermarked preview PDFs for visual inspection.
// Runs the same applyWatermark logic the download endpoint uses.
// Usage:  node scripts/preview-watermark.mjs

import fs from 'fs/promises'
import path from 'path'
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'

const ROOT = process.cwd()
const SUPPORT_EMAIL = 'enquiriesgcsemath@yahoo.com'
const SAMPLE_REF = 'cs_test_a1b2c3d4e5f6g7h8i9j0'
const OUT_DIR = path.join(ROOT, 'preview-watermarked')

const FILES = [
  ['paper2', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetA.pdf'],
  ['paper2', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetB.pdf'],
  ['paper2', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetC.pdf'],
  ['paper2', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetD.pdf'],
  ['paper2', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper2_SetE.pdf'],
  ['paper3', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetA.pdf'],
  ['paper3', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetB.pdf'],
  ['paper3', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetC.pdf'],
  ['paper3', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetD.pdf'],
  ['paper3', 'GCSE_Maths_Edexcel_Higher_Predicted_Paper3_SetE.pdf'],
]

const FOOTER_LINE = '© 2026 GCSEMathsAI · gcsemathsai.co.uk · licensed for personal revision use · redistribution prohibited'

async function applyWatermark(buf, reference) {
  const pdfDoc = await PDFDocument.load(buf)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const date = new Date().toISOString().slice(0, 10)
  const diagonalText = `GCSEMathsAI · ${SUPPORT_EMAIL} · do not share`
  const footerLeft = `Licensed via ${SUPPORT_EMAIL}`
  const footerRight = `Downloaded ${date}${reference ? ` · ref ${reference.slice(-12)}` : ''}`

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize()
    const fontSize = Math.max(28, Math.min(48, width / 22))
    const textWidth = helveticaBold.widthOfTextAtSize(diagonalText, fontSize)
    page.drawText(diagonalText, {
      x: width / 2 - textWidth / 2.4,
      y: height / 2 - fontSize / 2 - textWidth / 8,
      size: fontSize,
      font: helveticaBold,
      color: rgb(0.85, 0.85, 0.85),
      rotate: degrees(35),
      opacity: 0.32,
    })
    page.drawText(footerLeft, {
      x: 24, y: 18, size: 7.5,
      font: helveticaBold, color: rgb(0.42, 0.42, 0.42),
    })
    page.drawText(footerRight, {
      x: width - helvetica.widthOfTextAtSize(footerRight, 7.5) - 24,
      y: 18, size: 7.5,
      font: helvetica, color: rgb(0.42, 0.42, 0.42),
    })
    page.drawText(FOOTER_LINE, {
      x: 24, y: 6, size: 6,
      font: helvetica, color: rgb(0.55, 0.55, 0.55),
    })
  }

  return pdfDoc.save({ useObjectStreams: false })
}

await fs.mkdir(OUT_DIR, { recursive: true })
for (const [folder, filename] of FILES) {
  const src = path.join(ROOT, 'content', 'predicted-papers', folder, filename)
  const buf = await fs.readFile(src)
  const out = await applyWatermark(buf, SAMPLE_REF)
  const dst = path.join(OUT_DIR, filename.replace('.pdf', '_watermarked.pdf'))
  await fs.writeFile(dst, out)
  console.log(`✓  ${path.relative(ROOT, dst)}`)
}
console.log(`\nDone. Open the files in ${OUT_DIR}/ to inspect.`)
