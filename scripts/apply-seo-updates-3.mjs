// Same pattern as apply-seo-updates.mjs, third batch — reads seo-updates-3.json.
import fs from 'node:fs'
import path from 'node:path'

const updates = JSON.parse(fs.readFileSync(new URL('./seo-updates-3.json', import.meta.url)))
const topicsDir = path.join(process.cwd(), 'src', 'content', 'topics')

function replaceFrontmatterField(raw, field, newValue) {
  const escaped = newValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  const pattern = new RegExp(`^${field}:\\s*".*"$`, 'm')
  if (!pattern.test(raw)) throw new Error(`Field "${field}" not found`)
  return raw.replace(pattern, `${field}: "${escaped}"`)
}

let applied = 0
for (const [slug, { title, description }] of Object.entries(updates)) {
  const filePath = path.join(topicsDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) {
    console.error(`! No file for slug: ${slug}`)
    continue
  }
  let raw = fs.readFileSync(filePath, 'utf-8')
  const beforeTitleMatch = raw.match(/^title:\s*"(.*)"$/m)
  const beforeDescMatch = raw.match(/^description:\s*"(.*)"$/m)

  raw = replaceFrontmatterField(raw, 'title', title)
  raw = replaceFrontmatterField(raw, 'description', description)
  fs.writeFileSync(filePath, raw)

  console.log(`✓ ${slug}`)
  console.log(`  title:       "${beforeTitleMatch?.[1]}" -> "${title}"`)
  console.log(`  description: "${beforeDescMatch?.[1]}" -> "${description}"`)
  applied++
}
console.log(`\nApplied ${applied}/${Object.keys(updates).length} updates.`)
