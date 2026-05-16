// Generates src/lib/blog-manifest.ts from src/content/blog/*.md.
// Run with: node scripts/gen-blog-manifest.js

const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog')
const OUT_PATH = path.join(__dirname, '..', 'src', 'lib', 'blog-manifest.ts')

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md')).sort()

const entries = files.map(file => {
  const slug = file.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  // Escape for inclusion as a JSON string in TS source.
  const escaped = JSON.stringify(raw)
  return `  ${JSON.stringify(slug)}: ${escaped},`
}).join('\n')

const out = `// Generated from src/content/blog/ — re-run scripts/gen-blog-manifest.js to update

export const BLOG_MD_CONTENT: Record<string, string> = {
${entries}
}
`

fs.writeFileSync(OUT_PATH, out, 'utf8')
console.log(`Wrote ${files.length} blog entries to ${OUT_PATH}`)
