// Generates all Foundation Calculator Practice papers to PDF.
// Usage:  node scripts/foundation-papers/generate-all.mjs [from] [to]
//   (defaults: from=1, to=10)

import path from 'path'
import { renderPaper } from './renderer.mjs'

const FROM = Number(process.argv[2] || 1)
const TO   = Number(process.argv[3] || 10)
const OUT  = path.join('Foundation practice Papers')

for (let n = FROM; n <= TO; n++) {
  let set
  try {
    set = (await import(`./data/set${n}.mjs`)).default
  } catch (e) {
    console.log(`(skipping Set ${n} - data file not found)`)
    continue
  }
  const r = await renderPaper(set, OUT)
  console.log(`OK  Set ${n}  -  ${r.outPath}  (${r.bytes} bytes, ${r.pages} pages)`)
}
