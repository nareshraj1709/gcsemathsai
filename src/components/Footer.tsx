'use client'
import { useRouter } from 'next/navigation'

export default function Footer() {
  const router = useRouter()
  const go = (p: string) => router.push(p)

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft-col ft-brand">
          <a className="logo" onClick={() => go('/')} style={{ cursor: 'pointer' }}>
            <span className="logo-mark">&Sigma;</span>
            GCSEMaths<em>AI</em>
          </a>
          <p>A modern preparation for the GCSE Mathematics examination. Built in London for students serious about their grade.</p>
        </div>
        <div className="ft-col">
          <h4>Syllabus</h4>
          <ul>
            <li><a onClick={() => go('/topics')}>All topics</a></li>
            <li><a onClick={() => go('/topics')}>Foundation</a></li>
            <li><a onClick={() => go('/topics')}>Higher</a></li>
            <li><a onClick={() => go('/papers')}>Past papers</a></li>
            <li><a onClick={() => go('/formula-sheet')}>Formula sheet</a></li>
            <li><a onClick={() => go('/formulas')}>Topic formula sheets</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Resources</h4>
          <ul>
            <li><a onClick={() => go('/blog')}>Blog</a></li>
            <li><a onClick={() => go('/glossary')}>Glossary</a></li>
            <li><a onClick={() => go('/question-types')}>Question Types</a></li>
            <li><a onClick={() => go('/site-map')}>Site map</a></li>
            <li><a onClick={() => go('/community')}>Community</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Exam boards</h4>
          <ul>
            <li><a onClick={() => go('/aqa')}>AQA hub</a></li>
            <li><a onClick={() => go('/edexcel')}>Edexcel hub</a></li>
            <li><a onClick={() => go('/ocr')}>OCR hub</a></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Product</h4>
          <ul>
            <li><a onClick={() => go('/learn')}>Practice</a></li>
            <li><a onClick={() => go('/dashboard')}>Dashboard</a></li>
            <li><a onClick={() => go('/pricing')}>Pricing</a></li>
            <li><a onClick={() => go('/features')}>Features</a></li>
          </ul>
        </div>
      </div>
      <div className="ft-bottom">
        <span>&copy; MMXXVI &middot; GCSEMATHSAI &middot; LONDON, GB</span>
        <span>
          <a onClick={() => go('/privacy')} style={{ cursor: 'pointer' }}>Privacy</a>
          {' '}&middot;{' '}
          <a onClick={() => go('/terms')} style={{ cursor: 'pointer' }}>Terms</a>
          {' '}&middot;{' '}
          <a onClick={() => go('/contact')} style={{ cursor: 'pointer' }}>Contact</a>
        </span>
      </div>
    </footer>
  )
}
