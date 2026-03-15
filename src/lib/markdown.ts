import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked, Renderer } from 'marked'

// Custom renderer: add id to h2/h3 for TOC anchor links
const renderer = new Renderer()
renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
  if (depth === 2 || depth === 3) {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h${depth} id="${id}">${text}</h${depth}>\n`
  }
  return `<h${depth}>${text}</h${depth}>\n`
}
marked.use({ renderer })

export type MarkdownPost = {
  slug: string
  title: string
  description: string
  date: string          // e.g. "15 March 2026"
  dateISO: string       // e.g. "2026-03-15"
  category: string
  categoryColour: 'purple' | 'blue' | 'green' | 'amber' | 'rose'
  author: string
  readMins: number
  keywords: string[]
  content: string       // raw markdown
}

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content', 'blog')

export function getAllMarkdownPosts(): Omit<MarkdownPost, 'content'>[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))

  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        date: data.date ?? '',
        dateISO: data.dateISO ?? '',
        category: data.category ?? 'Guide',
        categoryColour: (data.categoryColour ?? 'purple') as MarkdownPost['categoryColour'],
        author: data.author ?? 'GCSEMathsAI Team',
        readMins: data.readMins ?? 5,
        keywords: data.keywords ?? [],
      }
    })
    .sort((a, b) => (b.dateISO > a.dateISO ? 1 : -1))
}

export function getMarkdownPost(slug: string): MarkdownPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    dateISO: data.dateISO ?? '',
    category: data.category ?? 'Guide',
    categoryColour: (data.categoryColour ?? 'purple') as MarkdownPost['categoryColour'],
    author: data.author ?? 'GCSEMathsAI Team',
    readMins: data.readMins ?? 5,
    keywords: data.keywords ?? [],
    content,
  }
}

/** Render markdown to HTML string */
export function renderMarkdown(content: string): string {
  return marked(content) as string
}

/** Extract H2 headings for table of contents */
export function extractTOC(content: string): { id: string; text: string }[] {
  const matches = [...content.matchAll(/^## (.+)$/gm)]
  return matches.map(m => ({
    text: m[1].trim(),
    id: m[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }))
}
