import Link from 'next/link'
import { getDiagnosticSet } from '@/lib/diagnostic-mcqs'

const MATCHES: Record<string, string> = {
  'trigonometry-gcse-maths': 'sohcahtoa-finding-missing-sides',
  'circle-theorems-gcse': 'circle-theorems',
  'pythagoras-theorem-gcse': 'pythagoras-theorem',
  'completing-the-square-gcse-maths': 'completing-the-square-method',
  'laws-of-indices-gcse-maths': 'indices-and-index-laws',
  'how-to-simplify-surds-gcse': 'surds',
  'composite-inverse-functions-gcse': 'composite-functions',
}
export default function ArticlePractice({ slug }: { slug?: string }) {
  const quiz = slug ? getDiagnosticSet(MATCHES[slug] || slug) : undefined
  return <div className="learning-panel">
    <h2>Put your revision into practice</h2>
    <p>{quiz ? `Try the ${quiz.topicTitle} quiz with an explanation after each answer.` : 'Choose a topic and try a short quiz with instant explanations.'} Free, with no signup.</p>
    <div className="learning-actions">
      <Link className="btn btn-primary" href={quiz ? `/diagnostic/${quiz.topicSlug}` : '/diagnostic'}>{quiz ? 'Try this topic quiz' : 'Choose a free quiz'}</Link>
      <Link className="btn btn-outline" href="/topics">Find a worked example</Link>
    </div>
  </div>
}
