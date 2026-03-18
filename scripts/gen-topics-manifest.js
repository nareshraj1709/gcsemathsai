#!/usr/bin/env node
/**
 * Reads all .md files from src/content/topics/ and generates
 * src/lib/topics-manifest.ts with their contents embedded.
 *
 * Usage: node scripts/gen-topics-manifest.js
 */

const fs = require('fs');
const path = require('path');

const TOPICS_DIR = path.join(__dirname, '..', 'src', 'content', 'topics');
const OUTPUT = path.join(__dirname, '..', 'src', 'lib', 'topics-manifest.ts');

const files = fs.readdirSync(TOPICS_DIR).filter(f => f.endsWith('.md')).sort();

let ts = '// Generated from src/content/topics/ — re-run scripts/gen-topics-manifest.js to update\n\n';
ts += 'export const TOPICS_MD_CONTENT: Record<string, string> = {\n';

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(TOPICS_DIR, file), 'utf8');
  // Escape backticks and ${} in the content for template literal safety
  const escaped = raw.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  ts += `  "${slug}": \`${escaped}\`,\n`;
}

ts += '};\n';

fs.writeFileSync(OUTPUT, ts, 'utf8');
console.log(`Generated topics manifest with ${files.length} topics → ${OUTPUT}`);
