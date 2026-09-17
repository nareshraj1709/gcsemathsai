import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const origin=process.env.AUDIT_ORIGIN || 'http://127.0.0.1:3117';
const app=path.resolve('.next/server/app');
fs.mkdirSync('scripts/gcse-review-2026-09-17', { recursive: true });
const failures=[]; const counts={};
function check(label,fn){try{fn()}catch(e){failures.push({label,error:e.message})}}
for(const folder of ['topics','blog','diagnostic','study','formulas']) {
  const files=fs.readdirSync(path.join(app,folder)).filter(x=>x.endsWith('.html')); counts[folder]=files.length;
  for(const file of files){const html=fs.readFileSync(path.join(app,folder,file),'utf8');const slug=file.slice(0,-5);const label=folder+'/'+slug;
    check(label,()=>{assert.equal((html.match(/<h1[ >]/g)||[]).length,1,'H1 count');assert.ok(html.includes(`href="https://www.gcsemathsai.co.uk/${label}"`),'canonical');
      const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(m[1]),'Missing anchor '+m[1]);
      for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
      if(folder==='topics'){assert.ok(html.indexOf('id="topic-quiz"')<html.indexOf('class="topic-prose'),'quiz before lesson');assert.ok(html.includes('Start free quiz'));}
      if(folder==='diagnostic')assert.ok(html.includes('Start free quiz'));
    });
  }
}
console.log('Rendered page checks complete',counts,'findings',failures.length);
const sitemap=await(await fetch(origin+'/sitemap.xml')).text();const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
check('sitemap',()=>{assert.equal(new Set(urls).size,urls.length);assert.equal(urls.filter(x=>x.includes('/diagnostic/')).length,245);assert.ok(!urls.some(x=>x.endsWith('/review')||x.endsWith('/notes-review')||x.includes('/formulas/Number/')))});
for(const slug of ['review','notes-review']){const h=await(await fetch(origin+'/'+slug)).text();check(slug,()=>assert.ok(h.includes('noindex')))}
for(const url of ['/formulas/Number/04_fractions.html','/formulas-print/Number/04_fractions.html']) {const response=await fetch(origin+url);check(url,()=>{assert.equal(response.status,200);assert.equal(response.headers.get('x-robots-tag'),'noindex, follow')})}
const missing=await fetch(origin+'/study/does-not-exist-audit');check('missing study',()=>assert.equal(missing.status,404));
for(const [source,destination] of [['/practice/gcse-maths','/diagnostic'],['/practice/quadratic-equations','/diagnostic/solving-quadratic-equations-factorising']]) {
 const response=await fetch(origin+source,{redirect:'manual'});check(source,()=>{assert.equal(response.status,308);assert.equal(new URL(response.headers.get('location'),origin).pathname,destination)});
}
const home=await(await fetch(origin)).text();check('home',()=>{assert.ok(home.includes('href="/diagnostic"'));assert.ok(home.includes('href="/aqa"'));assert.ok(!home.includes('AVG. GRADE LIFT'));assert.ok(!home.includes('FROM 812 STUDENTS'));});
const robots=await(await fetch(origin+'/robots.txt')).text();check('robots',()=>assert.ok(!robots.includes('Disallow: /formulas/Number/')));
const report={origin,checkedAt:new Date().toISOString(),counts,sitemapUrls:urls.length,failures};
fs.writeFileSync('scripts/gcse-review-2026-09-17/production-checks.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));if(failures.length)process.exitCode=1;
