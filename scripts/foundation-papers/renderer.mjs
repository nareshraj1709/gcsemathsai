// Foundation paper PDF renderer. Takes a "set" object and writes the PDF.
// All math notation is plain ASCII (x^2, sqrt, pi, <=) — Helvetica is WinAnsi.

import fs from 'fs/promises'
import path from 'path'
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib'

// Standard GCSEMathsAI watermark - same logic as src/lib/watermark-pdf.ts so
// Foundation papers carry the identical stamping as predicted papers.

const SUPPORT_EMAIL = 'suppoprtgcsemaths@gmail.com'
const FOOTER_LINE = '© 2026 GCSEMathsAI · gcsemathsai.co.uk · licensed for personal revision use · redistribution prohibited'

async function applyWatermark(input, opts = {}) {
  const pdfDoc = await PDFDocument.load(input)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const date = opts.dateISO ?? new Date().toISOString().slice(0, 10)
  const diagonalText = `GCSEMathsAI · ${SUPPORT_EMAIL} · do not share`
  const footerLeft = `Licensed via ${SUPPORT_EMAIL}`
  const footerRight = `Downloaded ${date}${opts.reference ? ` · ref ${opts.reference.slice(-12)}` : ''}`
  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize()
    const fontSize = Math.max(28, Math.min(48, width / 22))
    const textWidth = helveticaBold.widthOfTextAtSize(diagonalText, fontSize)
    page.drawText(diagonalText, {
      x: width / 2 - textWidth / 2.4,
      y: height / 2 - fontSize / 2 - textWidth / 8,
      size: fontSize, font: helveticaBold,
      color: rgb(0.85, 0.85, 0.85), rotate: degrees(35), opacity: 0.32,
    })
    page.drawText(footerLeft, { x: 24, y: 6, size: 7.5, font: helveticaBold, color: rgb(0.42, 0.42, 0.42) })
    page.drawText(footerRight, {
      x: width - helvetica.widthOfTextAtSize(footerRight, 7.5) - 24,
      y: 6, size: 7.5, font: helvetica, color: rgb(0.42, 0.42, 0.42),
    })
  }
  return pdfDoc.save({ useObjectStreams: false })
}

const W = 595.28, H = 841.89, M = 50
const CONTENT_W = W - 2 * M

function sanitize(s) {
  return String(s)
    .replace(/Σ/g, 'Sum')
    .replace(/√/g, 'sqrt')
    .replace(/π/g, 'pi')
    .replace(/−/g, '-')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/≠/g, '!=')
    .replace(/✓/g, '')
}

export async function renderPaper(set, outDir) {
  const { setNumber, style, questions, marks, solutions } = set
  const styleLabel = style === 'paper3' ? 'Paper 3 (Calculator)' : 'Paper 2 (Calculator)'
  const titleLine1 = 'GCSE Mathematics - Foundation Tier'
  const titleLine2 = `${styleLabel} Practice - Set ${setNumber}`
  const subLine = 'Time: 1 hour 30 minutes   |   Total marks: 80   |   Calculator allowed'

  // Sanity check: marks must sum to 80 and per-question totals must agree.
  const qSum = questions.reduce((s, q) => s + q.total, 0)
  const mSum = marks.reduce((s, m) => s + m.total, 0)
  if (qSum !== 80) throw new Error(`Set ${setNumber}: question marks total ${qSum} (expected 80)`)
  if (mSum !== 80) throw new Error(`Set ${setNumber}: mark scheme totals ${mSum} (expected 80)`)
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].total !== marks[i].total) {
      throw new Error(`Set ${setNumber}: Q${questions[i].n} paper=${questions[i].total}, mark scheme=${marks[i].total}`)
    }
  }

  const doc = await PDFDocument.create()
  const reg = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const ital = await doc.embedFont(StandardFonts.HelveticaOblique)
  const mono = await doc.embedFont(StandardFonts.Courier)

  let page, y
  function newPage() {
    page = doc.addPage([W, H])
    y = H - M
  }
  newPage()

  function fontFor(opts) {
    if (opts.bold) return bold
    if (opts.italic) return ital
    if (opts.mono) return mono
    return reg
  }

  function wrap(text, font, size, maxWidth) {
    const words = String(text).split(' ')
    const lines = []
    let cur = ''
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w
      if (font.widthOfTextAtSize(t, size) > maxWidth) {
        if (cur) lines.push(cur)
        cur = w
      } else cur = t
    }
    if (cur) lines.push(cur)
    return lines
  }

  function write(text, opts = {}) {
    const f = fontFor(opts)
    const s = opts.size ?? 11
    const indent = opts.indent ?? 0
    const align = opts.align ?? 'left'
    const lineGap = s * 1.45
    const maxW = CONTENT_W - indent
    const clean = sanitize(text)
    const lines = opts.mono ? clean.split('\n') : wrap(clean, f, s, maxW)
    for (const line of lines) {
      if (y - lineGap < M + 20) newPage()
      let x = M + indent
      if (align === 'right') x = W - M - f.widthOfTextAtSize(line, s)
      else if (align === 'center') x = (W - f.widthOfTextAtSize(line, s)) / 2
      page.drawText(line, { x, y: y - s, size: s, font: f, color: rgb(0, 0, 0) })
      y -= lineGap
    }
  }

  function pad(amount = 8) { y -= amount; if (y < M + 20) newPage() }

  function rule(opts = {}) {
    if (y - 6 < M + 20) newPage()
    page.drawLine({
      start: { x: M, y: y - 3 },
      end: { x: W - M, y: y - 3 },
      thickness: opts.thickness ?? 0.5,
      color: opts.color ?? rgb(0.75, 0.75, 0.75),
    })
    y -= 8
  }

  function partLine(letter, text, marksN) {
    const s = 11
    const lineGap = s * 1.45
    const indent = 12
    const markText = `(${marksN})`
    const markWidth = reg.widthOfTextAtSize(markText, s)
    const labelText = `(${letter})  `
    const labelWidth = reg.widthOfTextAtSize(labelText, s)
    const maxW = CONTENT_W - indent - labelWidth - markWidth - 12
    const lines = wrap(sanitize(text), reg, s, maxW)
    for (let i = 0; i < lines.length; i++) {
      if (y - lineGap < M + 20) newPage()
      const xLeft = M + indent
      if (i === 0) {
        page.drawText(labelText, { x: xLeft, y: y - s, size: s, font: reg, color: rgb(0, 0, 0) })
      }
      page.drawText(lines[i], { x: xLeft + labelWidth, y: y - s, size: s, font: reg, color: rgb(0, 0, 0) })
      if (i === lines.length - 1) {
        page.drawText(markText, { x: W - M - markWidth, y: y - s, size: s, font: reg, color: rgb(0, 0, 0) })
      }
      y -= lineGap
    }
  }

  // ── COVER + INSTRUCTIONS ──
  write(titleLine1, { bold: true, size: 18, align: 'center' })
  pad(4)
  write(titleLine2, { bold: true, size: 14, align: 'center' })
  pad(10)
  write(subLine, { size: 10, align: 'center' })
  pad(14)
  rule()
  write('Instructions', { bold: true, size: 11 })
  pad(4)
  write('-  Use black ink or ball-point pen.')
  write('-  Answer ALL questions in the spaces provided.')
  write('-  You must show all your working - answers given without working may not score full marks.')
  write('-  Diagrams are NOT accurately drawn unless otherwise stated.')
  write('-  If your calculator does not have a pi button, use pi = 3.142.')
  pad(8)
  rule()
  pad(8)

  // ── QUESTIONS ──
  for (const q of questions) {
    write(`${q.n}.`, { bold: true, size: 12 })
    pad(2)
    for (const block of q.body) {
      if (typeof block === 'string') {
        write(block)
        pad(2)
      } else if (block.type === 'part') {
        partLine(block.letter, block.text, block.marks)
        pad(2)
      } else if (block.type === 'mono') {
        write(block.text, { mono: true, size: 10, indent: 8 })
      } else if (block.type === 'diagram') {
        write(`[Diagram: ${block.text}]`, { italic: true, size: 10, indent: 8 })
        pad(3)
      }
    }
    pad(4)
    write(`(Total for Question ${q.n} is ${q.total} marks)`, { italic: true, size: 10, align: 'right' })
    pad(10)
    rule({ color: rgb(0.85, 0.85, 0.85) })
    pad(6)
  }
  pad(6)
  write('TOTAL FOR PAPER: 80 MARKS', { bold: true, size: 12, align: 'center' })

  // ── MARK SCHEME ──
  newPage()
  write('Mark Scheme', { bold: true, size: 18, align: 'center' })
  pad(6)
  write(`Foundation Tier - ${styleLabel} - Set ${setNumber}   |   80 marks`, { size: 10, align: 'center' })
  pad(14)
  rule()
  pad(6)
  for (const m of marks) {
    write(`Question ${m.n}`, { bold: true })
    pad(2)
    for (const line of m.lines) {
      write(`-  ${line}`, { indent: 10 })
    }
    pad(2)
    write(`Total: ${m.total} marks`, { italic: true, size: 10, indent: 10 })
    pad(10)
  }

  // ── WORKED SOLUTIONS ──
  newPage()
  write('Worked Solutions', { bold: true, size: 18, align: 'center' })
  pad(6)
  write(`Foundation Tier - ${styleLabel} - Set ${setNumber}   |   Detailed explanations`, { size: 10, align: 'center' })
  pad(14)
  rule()
  pad(6)
  for (const s of solutions) {
    write(`Question ${s.n}`, { bold: true })
    pad(3)
    for (const p of s.body) {
      write(p, { indent: 4 })
      pad(1)
    }
    pad(8)
    rule({ color: rgb(0.9, 0.9, 0.9) })
    pad(6)
  }

  // ── Footer per page ──
  const pages = doc.getPages()
  for (let i = 0; i < pages.length; i++) {
    pages[i].drawText(`Page ${i + 1} of ${pages.length}`, {
      x: W - M - 70, y: 24, size: 8, font: reg, color: rgb(0.5, 0.5, 0.5),
    })
    pages[i].drawText(`Foundation - ${styleLabel} - Set ${setNumber}`, {
      x: M, y: 24, size: 8, font: reg, color: rgb(0.5, 0.5, 0.5),
    })
  }

  let bytes = await doc.save()
  // Apply the standard GCSEMathsAI watermark (support email + ref) on every page.
  try {
    const stamped = await applyWatermark(bytes, { reference: `set-${setNumber}` })
    bytes = stamped
  } catch (err) {
    console.error(`Watermark failed for Set ${setNumber}:`, err)
    // Continue with unwatermarked bytes rather than failing the build.
  }
  await fs.mkdir(outDir, { recursive: true })
  const styleTag = style === 'paper3' ? 'Paper3' : 'Paper2'
  const outPath = path.join(outDir, `Foundation_${styleTag}_Set${setNumber}.pdf`)
  await fs.writeFile(outPath, bytes)
  return { outPath, bytes: bytes.length, pages: pages.length }
}
