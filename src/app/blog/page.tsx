import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllMarkdownPosts } from '@/lib/markdown'
import { BLOG_POSTS } from '@/lib/blog-posts'
import BlogLibrary from '@/components/BlogLibrary'
import GuideArtwork from '@/components/GuideArtwork'
import Footer from '@/components/Footer'
import type { GuideCard } from '@/lib/guide-presentation'

export const metadata: Metadata = {
  title: 'Blog — Revision Guides & GCSE Maths Tips',
  description: 'Revision guides, GCSE Maths tips and exam technique advice from the GCSEMathsAI team. Practical strategies that move grades, from Foundation to Higher.',
  openGraph: {
    title: 'GCSE Maths Blog | GCSEMathsAI',
    description: 'Revision guides, GCSE Maths tips and exam technique advice.',
    url: 'https://www.gcsemathsai.co.uk/blog',
  },
  alternates: { canonical: 'https://www.gcsemathsai.co.uk/blog' },
}


export default function BlogPage() {
  const markdown = getAllMarkdownPosts().map(p => ({ slug: p.slug, title: p.title, excerpt: p.description, category: p.category, author: p.author, date: p.date, readMins: p.readMins }))
  // Markdown takes precedence on article routes too; show each indexed URL once.
  const seen = new Set(markdown.map(p => p.slug))
  const guides: GuideCard[] = [...markdown, ...BLOG_POSTS.filter(p => !seen.has(p.slug)).map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, author: p.author, date: p.date, readMins: p.readMins }))]
  const featured = guides.find(p=>p.slug==='how-to-revise-gcse-maths') || guides[0]
  return <main className="blog-studio">
    <section className="studio-hero"><div className="studio-wrap studio-hero-grid">
      <div><div className="studio-eyebrow"><span className="studio-dot" /> THE GCSE MATHS BLOG</div><h1>Make maths<br/><span>make sense.</span></h1><p>Stuck on a topic? Planning your revision? Find clear explanations, practical tips and a little more confidence for your next maths lesson.</p><div className="learning-actions"><a href="#all-guides" className="btn btn-primary">Find your next guide <span aria-hidden="true">↓</span></a><Link href="/diagnostic" className="studio-text-link">Try a free quiz ↗</Link></div><div className="studio-hero-meta"><span>Foundation & Higher</span><span>AQA · Edexcel · OCR</span></div></div>
      <div className="studio-hero-art"><GuideArtwork kind="study"/><div className="art-note"><span aria-hidden="true">✓</span><div><strong>One topic at a time.</strong><span>You don’t have to learn it all today.</span></div></div><div className="art-label" aria-hidden="true">small steps, big possibilities</div></div>
    </div></section>
    <div className="studio-wrap">
      {featured&&<section className="featured-section" aria-labelledby="featured-title"><div className="studio-section-label"><span className="studio-eyebrow">A GOOD PLACE TO START</span><span>Plan it. Practise it. Understand it.</span></div><Link className="featured-guide" href={`/blog/${featured.slug}`}><div className="featured-art"><GuideArtwork kind="study"/></div><div className="featured-copy"><div className="featured-kicker">THE REVISION RESET <span>· {featured.readMins} min read</span></div><h2 id="featured-title">{featured.title}</h2><p>{featured.excerpt}</p><span className="featured-link">Build your revision plan <span aria-hidden="true">↗</span></span></div></Link></section>}
      <BlogLibrary guides={guides}/>
      <section className="studio-practice"><div><span className="studio-eyebrow">READY TO GIVE IT A GO?</span><h2>A little practice goes a long way.</h2><p>Try five questions, learn from the explanations and choose what to work on next.</p></div><Link href="/diagnostic" className="btn btn-primary">Find a free quiz ↗</Link></section>
      <nav className="studio-resources" aria-label="More revision resources">{[{href:'/topics',icon:'01',title:'Topic guides',text:'Work through the maths, step by step.'},{href:'/formula-sheet',icon:'02',title:'Formula sheet',text:'Keep the essentials close to hand.'},{href:'/papers',icon:'03',title:'Practice papers',text:'Put your revision to the test.'}].map(item=><Link href={item.href} key={item.href}><span>{item.icon}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span aria-hidden="true">↗</span></Link>)}</nav>
    </div><Footer/>
  </main>
}
