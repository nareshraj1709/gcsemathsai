#!/usr/bin/env node
/**
 * Pre-generates 10 cached question sets per section and saves them to Supabase.
 *
 * Usage:
 *   1. Start the dev server: npm run dev
 *   2. In another terminal: node scripts/preload-sections.mjs
 *
 * Options (env vars):
 *   PRELOAD_BASE_URL  — default http://localhost:3000
 *   PRELOAD_SETS      — sets per section, default 10
 *   PRELOAD_DELAY_MS  — delay between API calls in ms, default 3000
 *   PRELOAD_SECTION   — only preload a single section ID (optional)
 */

const BASE_URL = process.env.PRELOAD_BASE_URL || 'http://localhost:3000'
const SETS_PER_SECTION = parseInt(process.env.PRELOAD_SETS || '10', 10)
const DELAY_MS = parseInt(process.env.PRELOAD_DELAY_MS || '3000', 10)
const ONLY_SECTION = process.env.PRELOAD_SECTION || null

// Cycles through board/tier/difficulty combinations to give variety in the cache
const CONFIGS = [
  { examBoard: 'AQA',     tier: 'Higher',     difficulty: 'Medium' },
  { examBoard: 'AQA',     tier: 'Foundation', difficulty: 'Medium' },
  { examBoard: 'AQA',     tier: 'Higher',     difficulty: 'Exam Level' },
  { examBoard: 'AQA',     tier: 'Foundation', difficulty: 'Easy' },
  { examBoard: 'Edexcel', tier: 'Higher',     difficulty: 'Medium' },
  { examBoard: 'Edexcel', tier: 'Foundation', difficulty: 'Medium' },
  { examBoard: 'OCR',     tier: 'Higher',     difficulty: 'Medium' },
  { examBoard: 'OCR',     tier: 'Foundation', difficulty: 'Medium' },
  { examBoard: 'AQA',     tier: 'Higher',     difficulty: 'Easy' },
  { examBoard: 'AQA',     tier: 'Foundation', difficulty: 'Exam Level' },
]

const SECTIONS = [
  { id: 'fractions-decimals',    topic: 'Number',                      subtopic: 'Fractions and Decimals' },
  { id: 'percentages',           topic: 'Number',                      subtopic: 'Percentages' },
  { id: 'powers-standard-form',  topic: 'Number',                      subtopic: 'Powers and Standard Form' },
  { id: 'surds-bounds',          topic: 'Number',                      subtopic: 'Surds and Bounds' },
  { id: 'solving-equations',     topic: 'Algebra',                     subtopic: 'Solving Equations' },
  { id: 'expanding-factorising', topic: 'Algebra',                     subtopic: 'Expanding and Factorising' },
  { id: 'quadratic-equations',   topic: 'Algebra',                     subtopic: 'Quadratic Equations' },
  { id: 'sequences',             topic: 'Algebra',                     subtopic: 'Sequences' },
  { id: 'graphs-functions',      topic: 'Algebra',                     subtopic: 'Graphs and Functions' },
  { id: 'simultaneous-equations',topic: 'Algebra',                     subtopic: 'Simultaneous Equations' },
  { id: 'angles-shapes',         topic: 'Geometry',                    subtopic: 'Angles and Properties of Shapes' },
  { id: 'pythagoras-trigonometry',topic: 'Geometry',                   subtopic: 'Pythagoras and Trigonometry' },
  { id: 'circle-theorems',       topic: 'Geometry',                    subtopic: 'Circle Theorems' },
  { id: 'area-volume',           topic: 'Geometry',                    subtopic: 'Area Volume and Surface Area' },
  { id: 'vectors-transformations',topic: 'Geometry',                   subtopic: 'Vectors and Transformations' },
  { id: 'averages-spread',       topic: 'Statistics',                  subtopic: 'Averages and Spread' },
  { id: 'charts-diagrams',       topic: 'Statistics',                  subtopic: 'Charts and Diagrams' },
  { id: 'probability-tree',      topic: 'Probability',                 subtopic: 'Probability and Tree Diagrams' },
  { id: 'venn-diagrams',         topic: 'Statistics',                  subtopic: 'Venn Diagrams' },
  { id: 'ratio-proportion',      topic: 'Number',                      subtopic: 'Ratio and Proportion' },
  { id: 'factors-multiples-primes', topic: 'Number',                   subtopic: 'Factors, multiples & primes' },
  { id: 'inequalities',          topic: 'Algebra',                     subtopic: 'Inequalities' },
  { id: 'forming-equations',     topic: 'Algebra',                     subtopic: 'Forming equations from context' },
  { id: 'real-life-graphs',      topic: 'Algebra',                     subtopic: 'Real-life graphs' },
  { id: 'speed-distance-time',   topic: 'Ratio & Proportion',          subtopic: 'Speed, distance & time' },
  { id: 'density-mass-volume',   topic: 'Ratio & Proportion',          subtopic: 'Density, mass & volume' },
  { id: 'interest-growth',       topic: 'Ratio & Proportion',          subtopic: 'Compound interest & depreciation' },
  { id: 'exchange-rates',        topic: 'Ratio & Proportion',          subtopic: 'Best buys & exchange rates' },
  { id: 'constructions-loci',    topic: 'Geometry & Measures',         subtopic: 'Constructions & loci' },
  { id: 'similarity-congruence', topic: 'Geometry & Measures',         subtopic: 'Similarity & congruence' },
  { id: 'arc-sector',            topic: 'Geometry & Measures',         subtopic: 'Arc length & sector area' },
  { id: 'bearings',              topic: 'Geometry & Measures',         subtopic: 'Bearings' },
  { id: '3d-shapes',             topic: 'Geometry & Measures',         subtopic: '3D shapes & nets' },
  { id: 'functions-notation',    topic: 'Algebra',                     subtopic: 'Functions & function notation' },
  { id: 'graph-transformations', topic: 'Algebra',                     subtopic: 'Transformation of graphs' },
  { id: 'algebraic-proof',       topic: 'Algebra',                     subtopic: 'Algebraic proof' },
  { id: 'iteration',             topic: 'Algebra',                     subtopic: 'Iteration' },
  { id: 'sampling-bias',         topic: 'Statistics & Probability',    subtopic: 'Sampling & bias' },
  { id: 'relative-frequency',    topic: 'Statistics & Probability',    subtopic: 'Relative frequency' },
  { id: 'algebraic-proportion',  topic: 'Ratio & Proportion',          subtopic: 'Algebraic direct & inverse proportion' },
]

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateSet(section, config) {
  const res = await fetch(`${BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...config,
      topic: section.topic,
      subtopic: section.subtopic,
      count: 10,
      paperStyle: false,
      sectionId: section.id,
    }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

async function main() {
  const sections = ONLY_SECTION
    ? SECTIONS.filter(s => s.id === ONLY_SECTION)
    : SECTIONS

  if (sections.length === 0) {
    console.error(`Section "${ONLY_SECTION}" not found.`)
    process.exit(1)
  }

  const total = sections.length * SETS_PER_SECTION
  const estimatedMinutes = Math.ceil((total * DELAY_MS) / 60000)
  console.log(`Preloading ${SETS_PER_SECTION} sets × ${sections.length} sections = ${total} API calls`)
  console.log(`Estimated time: ~${estimatedMinutes} minutes at ${DELAY_MS}ms delay`)
  console.log(`Target: ${BASE_URL}\n`)

  let success = 0
  let failed = 0
  let cached = 0
  let done = 0

  for (const section of sections) {
    for (let i = 0; i < SETS_PER_SECTION; i++) {
      const config = CONFIGS[i % CONFIGS.length]
      done++
      const label = `[${done}/${total}] ${section.id} (${config.examBoard} ${config.tier} ${config.difficulty})`
      try {
        const data = await generateSet(section, config)
        if (data.questions && data.questions.length > 0) {
          if (data.cached) {
            cached++
            console.log(`~ ${label} — served from cache (${data.questions.length} q)`)
          } else {
            success++
            console.log(`✓ ${label} — generated & saved (${data.questions.length} q)`)
          }
        } else {
          failed++
          console.log(`✗ ${label} — no questions: ${data.error || 'unknown error'}`)
        }
      } catch (err) {
        failed++
        console.log(`✗ ${label} — ${err.message}`)
      }

      if (done < total) await sleep(DELAY_MS)
    }
    console.log() // blank line between sections
  }

  console.log('─────────────────────────────────')
  console.log(`Done: ${success} generated, ${cached} from cache, ${failed} failed`)
  if (failed > 0) {
    console.log(`\nTip: Re-run with PRELOAD_SECTION=<id> to retry a specific section.`)
  }
}

main().catch(err => {
  console.error('Fatal:', err.message)
  process.exit(1)
})
