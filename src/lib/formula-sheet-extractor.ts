// Extracts formula-sheet content from each topic markdown.
import { getAllTopics, getTopicPost } from './topics-markdown'

export interface FormulaSheet {
  slug: string
  topicNumber: number
  title: string
  shortTitle: string
  description: string
  strand: string
  tier: string
  intro: string
  definitions: Array<{ term: string; body: string }>
  formulas: Array<{ label?: string; expression: string }>
  worked?: { question: string; answer: string }
  mistakes: string[]
  tips: string[]
  detailedHtmlHref?: string | null
}

const FOUNDATION_NUMBER_HTML: Record<string, string> = {
  'place-value':                       '/formulas/Number/01_integers-place-value-ordering.html',
  'integers-place-value':              '/formulas/Number/01_integers-place-value-ordering.html',
  'prime-factorisation-hcf-and-lcm':   '/formulas/Number/02_factors-multiples-primes.html',
  'indices-and-index-laws':            '/formulas/Number/03_powers-roots-indices.html',
  'powers-and-roots':                  '/formulas/Number/03_powers-roots-indices.html',
  'fractions':                         '/formulas/Number/04_fractions.html',
  'decimals':                          '/formulas/Number/05_decimals.html',
  'percentages':                       '/formulas/Number/06_percentages.html',
  'percentages-increase-and-decrease': '/formulas/Number/06_percentages.html',
  'reverse-percentages':               '/formulas/Number/06_percentages.html',
  'ratio-basics-and-sharing':          '/formulas/Number/07_ratio.html',
  'ratio-problem-solving-in-context':  '/formulas/Number/07_ratio.html',
  'direct-and-inverse-proportion':     '/formulas/Number/08_proportion.html',
  'standard-form':                     '/formulas/Number/09_standard-form.html',
  'surds':                             '/formulas/Number/10_surds.html',
  'bounds-and-error-intervals':        '/formulas/Number/11_bounds-error-intervals.html',
}

function stripMd(s: string): string {
  return s
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFormulas(md: string): Array<{ label?: string; expression: string }> {
  const out: Array<{ label?: string; expression: string }> = []
  const seen = new Set<string>()

  function push(expr: string, label?: string) {
    const e = stripMd(expr)
    if (e.length < 4 || e.length > 240) return
    const key = e.toLowerCase()
    if (seen.has(key)) return
    seen.add(key)
    out.push({ label, expression: e })
  }

  // [FORMULA: ...] tagged blocks
  const formulaRe = /\[FORMULA:\s*([^\]]+?)\]/g
  let m: RegExpExecArray | null
  while ((m = formulaRe.exec(md))) push(m[1])

  // $$ ... $$ blocks (display math)
  const dollarRe = /\$\$\s*([^$]+?)\s*\$\$/g
  while ((m = dollarRe.exec(md))) push(m[1])

  // Fallback for theorem/rule-heavy topics. Walk every section whose heading
  // mentions a formula/rule/conversion/property concept and pull entries.
  if (out.length < 6) {
    const sectionRe = /^##\s+(?:[^\n]*?(?:Theorem|Theorems|Rule|Rules|Formula|Formulas|Law|Laws|Identity|Identities|Conversion|Conversions|Vocabulary|Key Facts|Key Definitions|Definitions|Properties|Property|Key Concepts|Notation|What (?:Is|Are)|How To|How (?:Do|to)|Steps|Method|Step\u2011by\u2011Step|Step by step|Important|Crucial|Essential)[^\n]*)\n/gim
    let sm: RegExpExecArray | null
    while ((sm = sectionRe.exec(md))) {
      const start = sm.index + sm[0].length
      const rest = md.slice(start)
      const cutoff = rest.search(/\n##\s/)
      const block = cutoff === -1 ? rest : rest.slice(0, cutoff)

      // (a) "- **Title.** body."  /  "1. **Title.** body."
      const itemRe = /^[\s]*(?:[-*]|\d+\.)\s+\*\*([^*\n]+?)\*\*\s*[—–:.\-]?\s*(.+)$/gm
      let im: RegExpExecArray | null
      while ((im = itemRe.exec(block))) {
        const label = stripMd(im[1])
        const body = stripMd(im[2])
        if (label && body && label.length <= 60) push(`${label} — ${body}`)
        if (out.length >= 10) break
      }

      // (b) plain bullet items that contain an equals sign, arrow or "=" idea (e.g. "1 km = 1000 m")
      const equationLineRe = /^[\s]*(?:[-*]|\d+\.)\s+([^\n*][^\n]{2,120})$/gm
      let em: RegExpExecArray | null
      while ((em = equationLineRe.exec(block))) {
        const text = stripMd(em[1])
        if (/[=→↦]|approximately|equal/i.test(text) && text.length > 4 && text.length < 130) {
          push(text)
        }
        if (out.length >= 12) break
      }

      // (c) lines like "**Length:** ..." or "**Formula:** ..."
      const inlineRe = /^\s*\*\*([^*\n]+?)\*\*[:.\s]+([^\n]+)$/gm
      let inm: RegExpExecArray | null
      while ((inm = inlineRe.exec(block))) {
        const label = stripMd(inm[1])
        const body = stripMd(inm[2])
        if (label && body && label.length < 40 && body.length > 4 && body.length < 200) {
          push(`${label}: ${body}`)
          if (out.length >= 12) break
        }
      }
      if (out.length >= 10) break
    }
  }

  // Inline display-style equations on their own line, e.g. "y = mx + c" or
  // "Mean = sum ÷ n"
  if (out.length < 4) {
    const lineRe = /^([A-Za-z][A-Za-z0-9_ ()²³^\-+×·\/]{1,40}\s*=\s*[^\n]{2,100})$/gm
    let lm: RegExpExecArray | null
    while ((lm = lineRe.exec(md))) {
      const expr = stripMd(lm[1])
      if (expr.includes('=') && expr.length < 130) push(expr)
      if (out.length >= 10) break
    }
  }

  return out.slice(0, 12)
}

function extractDefinitions(md: string): Array<{ term: string; body: string }> {
  const defs: Array<{ term: string; body: string }> = []
  const lines = md.split('\n')

  // "**Term** — definition" or "**Term:** definition"
  for (const raw of lines) {
    const line = raw.trim()
    if (!line.startsWith('**')) continue
    const match = line.match(/^\*\*(.+?)\*\*[\s:—–-]+(.+)$/)
    if (match) {
      const term = stripMd(match[1])
      const body = stripMd(match[2])
      if (term.length < 60 && body.length > 8 && body.length < 240) {
        if (!defs.find(d => d.term === term)) defs.push({ term, body })
      }
    }
    if (defs.length >= 5) break
  }
  return defs
}

function extractListSection(md: string, headerRegex: RegExp, limit = 5): string[] {
  const idx = md.search(headerRegex)
  if (idx === -1) return []
  const rest = md.slice(idx).replace(headerRegex, '').trim()
  // Cut at next ## heading
  const cutoff = rest.search(/\n##\s/)
  const block = cutoff === -1 ? rest : rest.slice(0, cutoff)
  const items: string[] = []
  // Match bullet items "- text" or "1. text"
  const re = /^[\s]*(?:[-*]|\d+\.)\s+(.+)$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(block))) {
    const text = stripMd(m[1])
    if (text.length > 6 && text.length < 280) items.push(text)
    if (items.length >= limit) break
  }
  return items
}

function extractIntro(md: string): string {
  // First non-empty paragraph after frontmatter
  const lines = md.split('\n')
  let collected = ''
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      if (collected) break
      continue
    }
    if (line.startsWith('#')) {
      if (collected) break
      continue
    }
    collected += (collected ? ' ' : '') + line
    if (collected.length > 320) break
  }
  return stripMd(collected).slice(0, 340)
}

function extractWorked(md: string): { question: string; answer: string } | undefined {
  // Find "Worked Example 1" or "Worked example"
  const re = /## Worked Example(?: 1)?[^\n]*\n([\s\S]*?)(?=\n##\s|$)/i
  const m = md.match(re)
  if (!m) return undefined
  const block = m[1].trim()
  // Find "Question:" and split
  const qMatch = block.match(/\*\*Question:?\*\*\s*([\s\S]+?)(?=\n\*\*|$)/)
  if (qMatch) {
    const question = stripMd(qMatch[1])
    // Take the rest as answer (first 300 chars)
    const rest = block.replace(qMatch[0], '').trim()
    const firstChunk = rest.split('\n\n')[0] || rest
    const answer = stripMd(firstChunk).slice(0, 320)
    if (question && answer) return { question: question.slice(0, 240), answer }
  }
  // Fallback: first paragraph
  const para = block.split('\n\n')[0]
  if (para) {
    return { question: 'See example below.', answer: stripMd(para).slice(0, 320) }
  }
  return undefined
}

let _cached: FormulaSheet[] | null = null

export function getAllFormulaSheets(): FormulaSheet[] {
  if (_cached) return _cached
  const topics = getAllTopics()
  _cached = topics.map(t => {
    const post = getTopicPost(t.slug)
    if (!post) return null
    return {
      slug: t.slug,
      topicNumber: t.topicNumber,
      title: t.title,
      shortTitle: t.title.replace(/ – GCSE Maths Revision$/, '').replace(/ GCSE.*$/, ''),
      description: t.description,
      strand: t.strand || t.category,
      tier: t.tier,
      intro: extractIntro(post.content),
      definitions: extractDefinitions(post.content),
      formulas: extractFormulas(post.content),
      worked: extractWorked(post.content),
      mistakes: extractListSection(post.content, /## Common Mistakes[^\n]*\n/i, 5),
      tips: extractListSection(post.content, /## Exam Tips?[^\n]*\n/i, 5),
      detailedHtmlHref: FOUNDATION_NUMBER_HTML[t.slug] ?? null,
    } as FormulaSheet
  }).filter((s): s is FormulaSheet => s !== null)
  return _cached
}

export function getFormulaSheet(slug: string): FormulaSheet | undefined {
  return getAllFormulaSheets().find(s => s.slug === slug)
}

export function getSheetsByStrand(): Record<string, FormulaSheet[]> {
  const all = getAllFormulaSheets()
  const grouped: Record<string, FormulaSheet[]> = {}
  for (const s of all) {
    const key = s.strand || 'Other'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(s)
  }
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((a, b) => a.topicNumber - b.topicNumber)
  }
  return grouped
}
