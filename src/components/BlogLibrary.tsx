'use client'
import { useState } from 'react'
import Link from 'next/link'
import GuideArtwork from '@/components/GuideArtwork'
import { filterGuides, guideKind, GUIDE_GROUPS, type GuideCard } from '@/lib/guide-presentation'

export default function BlogLibrary({ guides }: { guides: GuideCard[] }) {
  const [group, setGroup] = useState<string>('All guides')
  const [query, setQuery] = useState('')
  const visible = filterGuides(guides, group, query)
  return <section className="guide-library" id="all-guides" aria-labelledby="library-title">
    <div className="library-heading"><div><span className="studio-eyebrow">YOUR REVISION LIBRARY</span><h2 id="library-title">What would you like to work on?</h2></div><p>{guides.length} guides. Find your next step.</p></div>
    <div className="library-controls">
      <div className="guide-filters" role="group" aria-label="Filter guides by subject">{GUIDE_GROUPS.map(item=><button key={item} type="button" aria-pressed={group===item} onClick={()=>setGroup(item)}>{item}</button>)}</div>
      <label className="guide-search"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="2"/><path d="m15 15 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><span className="sr-only">Search revision guides</span><input type="search" placeholder="Search guides…" value={query} onChange={e=>setQuery(e.target.value)} /></label>
    </div>
    <p className="library-count" role="status">{visible.length} {visible.length===1?'guide':'guides'}{group==='All guides'?'':` in ${group}`}{query.trim()?` matching “${query.trim()}”`:''}</p>
    {visible.length ? <div className="guide-grid">{visible.map(guide=><Link className="guide-card" key={guide.slug} href={`/blog/${guide.slug}`}>
      <div className="guide-card-art"><GuideArtwork kind={guideKind(guide.slug,guide.category)} /><span className="guide-time">{guide.readMins} min read</span></div>
      <div className="guide-card-copy"><span className={`guide-category guide-category--${guideKind(guide.slug,guide.category)}`}>{guide.category}</span><h3>{guide.title}</h3><p>{guide.excerpt}</p><div className="guide-card-bottom"><span>Read guide</span><span aria-hidden="true">↗</span></div></div>
    </Link>)}</div> : <div className="guide-empty"><h3>No guides found just yet</h3><p>Try a shorter search, such as “fractions”, or browse all guides.</p><button className="btn btn-primary" type="button" onClick={()=>{setGroup('All guides');setQuery('')}}>Show all guides</button></div>}
  </section>
}
