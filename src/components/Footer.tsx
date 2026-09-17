'use client'
import Link from 'next/link'

export default function Footer() {

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="ft-col ft-brand">
          <Link className="logo" href="/" style={{ cursor: 'pointer' }}>
            <span className="logo-mark">&Sigma;</span>
            GCSEMaths
          </Link>
          <p>A modern preparation for the GCSE Mathematics examination. Built in London for students serious about their grade.</p>
        </div>
        <div className="ft-col">
          <h4>Syllabus</h4>
          <ul>
            <li><Link href="/topics">All topics</Link></li>
            <li><Link href="/topics">Foundation</Link></li>
            <li><Link href="/topics">Higher</Link></li>
            <li><Link href="/papers">Practice papers &amp; official links</Link></li>
            <li><Link href="/formula-sheet">Formula sheet</Link></li>
            <li><Link href="/formulas">Topic formula sheets</Link></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="/practice-papers">Higher Practice Papers</Link></li>
            <li><Link href="/foundation-papers">Foundation Practice Papers</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/glossary">Glossary</Link></li>
            <li><Link href="/question-types">Question Types</Link></li>
            <li><Link href="/site-map">Site map</Link></li>
            <li><Link href="/community">Community</Link></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Exam boards</h4>
          <ul>
            <li><Link href="/aqa">AQA hub</Link></li>
            <li><Link href="/edexcel">Edexcel hub</Link></li>
            <li><Link href="/ocr">OCR hub</Link></li>
          </ul>
        </div>
        <div className="ft-col">
          <h4>Product</h4>
          <ul>
            <li><Link href="/learn">Practice</Link></li>
            <li><Link href="/diagnostic">Free topic quizzes</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/features">Features</Link></li>
          </ul>
        </div>
      </div>
      <div className="ft-bottom">
        <span>&copy; MMXXVI &middot; GCSEMATHSAI &middot; LONDON, GB</span>
        <span>
          <Link href="/privacy" style={{ cursor: 'pointer' }}>Privacy</Link>
          {' '}&middot;{' '}
          <Link href="/terms" style={{ cursor: 'pointer' }}>Terms</Link>
          {' '}&middot;{' '}
          <Link href="/contact" style={{ cursor: 'pointer' }}>Contact</Link>
        </span>
      </div>
    </footer>
  )
}
