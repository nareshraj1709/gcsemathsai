import matter from "gray-matter";
import { marked } from "marked";
import { BLOG_MD_CONTENT } from "./blog-manifest";

// Configure marked: stable marked.use() API (v4–v17 compatible).
marked.use({
  renderer: {
    heading({ text, depth }: { text: string; depth: number }): string {
      const id = text
        .replace(/<[^>]+>/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      if (depth === 2 || depth === 3) {
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      }
      return `<h${depth}>${text}</h${depth}>\n`;
    },
  },
});

export type MarkdownPost = {
  slug: string;
  title: string;
  description: string;
  date: string;      // e.g. "15 March 2026"
  dateISO: string;   // e.g. "2026-03-15"
  category: string;
  categoryColour: "purple" | "blue" | "green" | "amber" | "rose";
  author: string;
  readMins: number;
  keywords: string[];
  content: string;   // raw markdown body (no frontmatter)
};

function parse(slug: string, raw: string): MarkdownPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    dateISO: String(data.dateISO ?? ""),
    category: String(data.category ?? "Guide"),
    categoryColour: (data.categoryColour ?? "purple") as MarkdownPost["categoryColour"],
    author: String(data.author ?? "GCSEMathsAI Team"),
    readMins: Number(data.readMins ?? 5),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    content,
  };
}

export function getAllMarkdownPosts(): Omit<MarkdownPost, "content">[] {
  return Object.entries(BLOG_MD_CONTENT)
    .map(([slug, raw]) => {
      const { content: _content, ...rest } = parse(slug, raw);
      return rest;
    })
    .sort((a, b) => (b.dateISO > a.dateISO ? 1 : -1));
}

export function getMarkdownPost(slug: string): MarkdownPost | null {
  const raw = BLOG_MD_CONTENT[slug];
  if (!raw) return null;
  return parse(slug, raw);
}

/** Render markdown body to HTML. */
export function renderMarkdown(content: string): string {
  const result = marked.parse(content);
  return typeof result === "string" ? result : "";
}

/** Extract H2 headings for the table of contents sidebar. */
export function extractTOC(content: string): { id: string; text: string }[] {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = m[1].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { text, id };
  });
}
