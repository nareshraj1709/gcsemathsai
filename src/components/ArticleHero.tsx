import Link from 'next/link'
import GuideArtwork from '@/components/GuideArtwork'
import { guideKind } from '@/lib/guide-presentation'
export default function ArticleHero({ slug, title, description, category, author, date, readMins }: { slug: string; title: string; description: string; category: string; author: string; date: string; readMins: number }) {
  return <header className="article-hero"><div className="studio-wrap">
    <nav className="article-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Revision guides</Link><span aria-hidden="true">/</span><span>{category}</span></nav>
    <div className="article-hero-grid"><div><div className="article-meta"><span className={`guide-category guide-category--${guideKind(slug,category)}`}>{category}</span><span>{readMins} min read</span></div><h1>{title}</h1><p className="article-deck">{description}</p><div className="article-byline"><span className="author-mark" aria-hidden="true">G</span><div><strong>{author}</strong><span>{date}</span></div></div></div><GuideArtwork kind={guideKind(slug,category)}/></div>
  </div></header>
}
