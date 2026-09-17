import matter from "gray-matter";
import { Marked } from "marked";
import { TOPICS_MD_CONTENT } from "./topics-manifest";
import { renderDiagram, type DiagramParams } from "./diagram-svgs";

// Configure marked for topics (same renderer as blog)
const topicMarked = new Marked({
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

export type TopicPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  category: string;
  categoryColour: "purple" | "blue" | "green" | "amber" | "rose";
  author: string;
  readMins: number;
  keywords: string[];
  tier: string;
  strand: string;
  topicNumber: number;
  content: string;
};

function parse(slug: string, raw: string): TopicPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? ""),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    dateISO: String(data.dateISO ?? ""),
    category: String(data.category ?? ""),
    categoryColour: (data.categoryColour ?? "purple") as TopicPost["categoryColour"],
    author: String(data.author ?? "GCSEMathsAI Team"),
    readMins: Number(data.readMins ?? 8),
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    tier: String(data.tier ?? "Foundation & Higher"),
    strand: String(data.strand ?? ""),
    topicNumber: Number(data.topicNumber ?? 0),
    content,
  };
}

export function getAllTopics(): Omit<TopicPost, "content">[] {
  return Object.entries(TOPICS_MD_CONTENT)
    .map(([slug, raw]) => {
      const { content: _content, ...rest } = parse(slug, raw);
      return rest;
    })
    .sort((a, b) => a.topicNumber - b.topicNumber);
}

export function getTopicPost(slug: string): TopicPost | null {
  const raw = TOPICS_MD_CONTENT[slug];
  if (!raw) return null;
  return parse(slug, raw);
}

function parseDiagramParams(raw: string): DiagramParams {
  const params: DiagramParams = {};
  for (const segment of raw.split("|").slice(1)) {
    const eq = segment.indexOf("=");
    if (eq === -1) continue;
    const key = segment.slice(0, eq).trim();
    const value = segment.slice(eq + 1).trim();
    if (key) params[key] = value;
  }
  return params;
}

export function renderTopicMarkdown(content: string): string {
  // Transform [FORMULA: ...] blocks into styled HTML
  let processed = content.replace(/^\s*# [^\n]+\n/, "").replace(
    /\[FORMULA:\s*(.+?)\]/g,
    '<div class="formula-block">$1</div>'
  );
  // Transform [ANSWER: ...] blocks into styled HTML
  processed = processed.replace(
    /\[ANSWER:\s*(.+?)\]/g,
    '<div class="answer-block"><strong>Answer:</strong> $1</div>'
  );
  // Transform [DIAGRAM: type | k=v | k=v] tokens into inline SVG figures
  processed = processed.replace(
    /\[DIAGRAM:\s*([^\]]+?)\]/g,
    (_match, body: string) => {
      const type = body.split("|")[0].trim();
      const params = parseDiagramParams(body);
      return renderDiagram(type, params);
    }
  );
  const result = topicMarked.parse(processed);
  return typeof result === "string" ? result : "";
}

export function extractTopicTOC(content: string): { id: string; text: string }[] {
  return [...content.matchAll(/^## (.+)$/gm)].map((m) => {
    const text = m[1].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return { text, id };
  });
}
