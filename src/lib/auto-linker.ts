import { getAllTopics } from './topics-markdown'

/**
 * Auto-links the first occurrence of topic names in rendered HTML content.
 *
 * Rules:
 * - Links only the FIRST occurrence of each topic keyword per page
 * - Maximum 8 auto-links per page to avoid over-optimisation
 * - Never self-links (skips the current page's slug)
 * - Never links inside existing <a> tags, headings, or code blocks
 * - Case-insensitive matching
 * - Matches whole words only (won't match "fractions" inside "algebraic fractions"
 *   when searching for "fractions" if "algebraic fractions" was already matched)
 */

type TopicLink = {
  /** Display name to match in text (e.g. "Pythagoras' Theorem") */
  keyword: string
  /** URL path (e.g. "/topics/pythagoras-theorem") */
  href: string
  /** Slug used to skip self-links */
  slug: string
}

let cachedLinks: TopicLink[] | null = null

function getTopicLinks(): TopicLink[] {
  if (cachedLinks) return cachedLinks

  const topics = getAllTopics()

  cachedLinks = topics.map(t => {
    // Extract a clean keyword from the title
    // Titles look like: "Pythagoras' Theorem – GCSE Maths Revision"
    // We want just: "Pythagoras' Theorem"
    const keyword = t.title
      .replace(/ [-–—] .*$/, '')  // Remove everything after dash
      .replace(/ GCSE.*$/, '')     // Remove "GCSE..." suffix
      .replace(/:\s.*$/, '')       // Remove subtitle after colon
      .trim()

    return {
      keyword,
      href: `/topics/${t.slug}`,
      slug: t.slug,
    }
  })

  // Sort by keyword length descending so longer phrases match first
  // e.g. "Algebraic Fractions" matches before "Fractions"
  cachedLinks.sort((a, b) => b.keyword.length - a.keyword.length)

  return cachedLinks
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Insert internal links into rendered HTML content.
 *
 * @param html - The rendered HTML string
 * @param currentSlug - The slug of the current page (to avoid self-linking)
 * @param maxLinks - Maximum number of auto-links to insert (default 8)
 * @returns HTML with internal links injected
 */
export function autoLinkTopics(
  html: string,
  currentSlug: string,
  maxLinks = 8
): string {
  const topicLinks = getTopicLinks()
  let linksInserted = 0

  // Track which slugs we've already linked to avoid duplicates
  const linkedSlugs = new Set<string>()

  for (const topic of topicLinks) {
    if (linksInserted >= maxLinks) break
    if (topic.slug === currentSlug) continue
    if (linkedSlugs.has(topic.slug)) continue

    // Build a regex that matches the keyword as a whole word,
    // but NOT inside HTML tags or existing anchor elements.
    // We use a word-boundary approach with special handling for apostrophes.
    const keywordPattern = escapeRegex(topic.keyword)
    // Allow flexible apostrophe matching (' or ' or ')
    const flexPattern = keywordPattern.replace(/[''ʼ']/g, "[''ʼ']?")

    const regex = new RegExp(
      `(?<![\\w/])${flexPattern}(?![\\w])`,
      'i'
    )

    // Split HTML into segments: inside tags vs text content
    // We only match within text content (outside of HTML tags)
    const segments = html.split(/(<[^>]+>)/g)
    let matched = false
    let insideAnchor = 0
    let insideHeading = 0
    let insideCode = 0

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i]

      // Track whether we're inside tags we should skip
      if (segment.startsWith('<')) {
        const lower = segment.toLowerCase()
        if (lower.startsWith('<a ') || lower === '<a>') insideAnchor++
        else if (lower.startsWith('</a')) insideAnchor = Math.max(0, insideAnchor - 1)
        else if (/^<h[1-6][\s>]/i.test(lower)) insideHeading++
        else if (/^<\/h[1-6]>/i.test(lower)) insideHeading = Math.max(0, insideHeading - 1)
        else if (lower.startsWith('<code') || lower.startsWith('<pre')) insideCode++
        else if (lower.startsWith('</code') || lower.startsWith('</pre')) insideCode = Math.max(0, insideCode - 1)
        continue
      }

      // Skip if inside an anchor, heading, or code block
      if (insideAnchor > 0 || insideHeading > 0 || insideCode > 0) continue

      // Try to match in this text segment
      const match = segment.match(regex)
      if (match && match.index !== undefined) {
        const before = segment.slice(0, match.index)
        const matchedText = match[0]
        const after = segment.slice(match.index + matchedText.length)

        segments[i] = `${before}<a href="${topic.href}" class="auto-link">${matchedText}</a>${after}`
        matched = true
        break
      }
    }

    if (matched) {
      html = segments.join('')
      linksInserted++
      linkedSlugs.add(topic.slug)
    }
  }

  return html
}
