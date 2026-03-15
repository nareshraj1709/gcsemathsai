import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Configure marked: add id attrs to h2/h3 headings for TOC anchor links.
// Uses marked.use() API which is stable across marked v4-v17.
marked.use({
  renderer: {
    heading({ text, depth }: { text: string; depth: number }): string {
      const id = text
        .replace(/<[^>]+>/g, '')   // strip any inline HTML
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      if (depth === 2 || depth === 3) {
        return `<h${depth} id="${id}">${text}</h${depth}>\n`
      }
      return `<h${depth}>${text}</h${depth}>\n`
    },
  },
})

export type MarkdownPost = {
  slug: string
  title: string
  description: string
  date: string       // e.g. "15 March 2026"
  dateISO: string    // e.g. "2026-03-15"
  category: string
  categoryColour: 'purple' | 'blue' | 'green' | 'amber' | 'rose'
  author: string
  readMins: number
  keywords: string[]
  content: string    // raw markdown
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

function parsePost(filename: string, includeContent: false): Omit<MarkdownPost, 'content'>
function parsePost(filename: string, includeContent: true): MarkdownPost
function parsePost(filename: string, includeContent: boolean): MarkdownPost | Omit<MarkdownPost, 'content'> {
  const slug = filename.replace(/\.md$/, '')
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
  const { data, content } = matter(raw)
  const base = {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    dateISO: String(data.dateISO ?? ''),
    category: String(data.category ?? 'Guide'),
    categoryColour: (data.categoryColour ?? 'purple') as MarkdownPost['categoryColour'],
    author: String(data.author ?? 'GCSEMathsAI Team'),
    readMins: Number(data.readMins ?? 5),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
  }
  return includeContent ? { ...base, content } : base
}

export function getAllMarkdownPosts(): Omit<MarkdownPost, 'content'>[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) return []
    return fs
      .readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.md'))
      .map(f => parsePost(f, false))
      .sort((a, b) => (b.dateISO > a.dateISO ? 1 : -1))
  } catch {
    return []
  }
}

export function getMarkdownPost(slug: string): MarkdownPost | null {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) return null
    return parsePost(`${slug}.md`, true)
  } catch {
    return null
  }
}

/** Render markdown to HTML string (synchronous). */
export function renderMarkdown(content: string): string {
  // marked() in v17 returns string synchronously when no async extensions are used.
  const result = marked.parse(content)
  // marked.parse always returns string | Promise<string>; we use synchronous extensions only.
  return typeof result === 'string' ? result : ''
}

/** Extract H2 headings for table of contents. */
export function extractTOC(content: string): { id: string; text: string }[] {
  return [...content.matchAll(/^## (.+)$/gm)].map(m => {
    const text = m[1].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return { text, id }
  })
}
