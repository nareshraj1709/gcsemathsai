// One-off: fixes 11 internal markdown links across src/content/{topics,blog}
// that point to slugs with no matching file — verified by hand against real
// content, not guessed. Each points to the closest existing real topic that
// matches the original anchor text's concept.
// Usage: node scripts/fix-broken-topic-links.mjs
import fs from 'node:fs'
import path from 'node:path'

const REPLACEMENTS = [
  { old: '/topics/solving-quadratic-equations)', new: '/topics/solving-quadratic-equations-factorising)' },
  { old: '/topics/expanding-and-factorising)', new: '/topics/factorising-expressions)' },
  { old: '/topics/simultaneous-equations)', new: '/topics/simultaneous-equations-graphically)' },
  { old: '/topics/coordinates-and-midpoints)', new: '/topics/coordinates-and-plotting)' },
  { old: '/topics/fractions-decimals-and-percentages)', new: '/topics/converting-fractions-decimals-percentages)' },
]

const dirs = ['topics', 'blog'].map(d => path.join(process.cwd(), 'src', 'content', d))
let totalFixed = 0

for (const dir of dirs) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file)
    let raw = fs.readFileSync(filePath, 'utf-8')
    let fixedInFile = 0
    for (const { old, new: replacement } of REPLACEMENTS) {
      const count = raw.split(old).length - 1
      if (count > 0) {
        raw = raw.split(old).join(replacement)
        fixedInFile += count
      }
    }
    if (fixedInFile > 0) {
      fs.writeFileSync(filePath, raw)
      console.log(`fixed ${fixedInFile} link(s) in ${dir}/${file}`)
      totalFixed += fixedInFile
    }
  }
}
console.log(`\nFixed ${totalFixed} broken links.`)
