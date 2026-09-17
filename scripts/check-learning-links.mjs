import fs from 'node:fs';
import path from 'node:path';
const base='.next/server/app';
fs.mkdirSync('scripts/gcse-review-2026-09-17', { recursive: true });
const families=['topics','formulas','diagnostic','study','blog'];
const sets=Object.fromEntries(families.map(x=>[x,new Set(fs.readdirSync(path.join(base,x)).filter(f=>f.endsWith('.html')).map(f=>f.slice(0,-5)))]));
const bad=new Map();
for(const family of families)for(const slug of sets[family]){
 const html=fs.readFileSync(path.join(base,family,slug+'.html'),'utf8');
 for(const m of html.matchAll(/href="(\/(topics|formulas|diagnostic|study|blog)\/[^"?#]+)[^"]*"/g)){
  const parts=m[1].split('/');
  if(parts.length===3&&!sets[m[2]].has(parts[2])){const item=bad.get(m[1])||{url:m[1],count:0,example:family+'/'+slug};item.count++;bad.set(m[1],item);}
 }
}
console.log(JSON.stringify([...bad.values()],null,2));
fs.writeFileSync('scripts/gcse-review-2026-09-17/internal-link-issues.json',JSON.stringify([...bad.values()],null,2));
if(bad.size)process.exitCode=1;
