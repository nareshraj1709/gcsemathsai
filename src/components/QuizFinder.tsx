'use client'
import { useState } from 'react'
import Link from 'next/link'
type Quiz = { slug: string; title: string; strand: string }
export default function QuizFinder({ quizzes }: { quizzes: Quiz[] }) {
  const [query, setQuery] = useState('')
  const matches = query.trim() ? quizzes.filter(q => `${q.title} ${q.strand}`.toLowerCase().includes(query.trim().toLowerCase())) : []
  return <div className="learning-panel">
    <label htmlFor="quiz-search" style={{ display: 'block', fontWeight: 700, marginBottom: 8 }}>Find a topic quiz</label>
    <input id="quiz-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try fractions, algebra or angles" style={{ width: '100%', padding: 12, border: '1px solid var(--rule)', borderRadius: 8, fontSize: 16 }} />
    {query.trim() && <><p role="status">{matches.length ? `${matches.length} matching topics` : 'No matching topics. Try a broader word, or browse the topic groups below.'}</p><ul>{matches.map(q => <li key={q.slug} style={{ margin: '10px 0' }}><Link href={`/diagnostic/${q.slug}`}>{q.title}</Link></li>)}</ul></>}
    {!query.trim() && <p>Or browse the topic groups below. Each quiz includes instant explanations.</p>}
  </div>
}
