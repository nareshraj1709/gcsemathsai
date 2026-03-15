export type ExamBoard = 'AQA' | 'Edexcel' | 'OCR'
export type Tier = 'Foundation' | 'Higher'
export type PaperType = 'historical' | 'ai'

export type Paper = {
  id: string
  type: PaperType
  board: ExamBoard
  boardCode: string
  tier: Tier
  year?: number
  paperNumber: number
  name: string
  calculator: boolean
  questionCount: number
  totalMarks: number
  timeMinutes: number
  topics: string
  style: string
}

const AQA_STYLE = 'AQA (8300): structured multi-part (a)(b)(c) format. Method marks (M) for correct working even if final answer wrong. Accuracy marks (A) for correct answer.'
const EDX_STYLE = 'Edexcel (1MA1): real-world contexts, described diagrams. Follow-through (ft) marks where indicated in mark scheme.'
const OCR_STYLE = 'OCR (J560): problem-solving and reasoning. Alternative valid methods credited. Scaffolded questions increasing in difficulty.'

// ── Topic distributions ───────────────────────────────────────
const TOPIC_DIST: Record<ExamBoard, Record<Tier, string[]>> = {
  AQA: {
    Foundation: [
      'Number (35%), Algebra (25%), Geometry (20%), Statistics (15%), Probability (5%)',
      'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
      'Number (15%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (15%)',
    ],
    Higher: [
      'Number (25%), Algebra (35%), Geometry (25%), Statistics (10%), Probability (5%)',
      'Number (15%), Algebra (30%), Geometry (30%), Statistics (15%), Probability (10%)',
      'Number (10%), Algebra (30%), Geometry (30%), Statistics (15%), Probability (15%)',
    ],
  },
  Edexcel: {
    Foundation: [
      'Number (35%), Algebra (25%), Geometry (20%), Statistics (15%), Probability (5%)',
      'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
      'Number (15%), Algebra (25%), Geometry (30%), Statistics (20%), Probability (10%)',
    ],
    Higher: [
      'Number (20%), Algebra (35%), Geometry (25%), Statistics (10%), Probability (10%)',
      'Number (10%), Algebra (30%), Geometry (30%), Statistics (20%), Probability (10%)',
      'Number (10%), Algebra (25%), Geometry (35%), Statistics (15%), Probability (15%)',
    ],
  },
  OCR: {
    Foundation: [
      'Number (35%), Algebra (20%), Geometry (25%), Statistics (15%), Probability (5%)',
      'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
      'Number (15%), Algebra (25%), Geometry (30%), Statistics (20%), Probability (10%)',
    ],
    Higher: [
      'Number (20%), Algebra (30%), Geometry (25%), Statistics (15%), Probability (10%)',
      'Number (10%), Algebra (30%), Geometry (30%), Statistics (20%), Probability (10%)',
      'Number (10%), Algebra (25%), Geometry (35%), Statistics (15%), Probability (15%)',
    ],
  },
}

// ── Historical papers: AQA & Edexcel 2015–2024 × 3 papers = 30 each ──
// OCR 2018–2023 × 5 papers = 30
function buildHistorical(): Paper[] {
  const papers: Paper[] = []

  // AQA & Edexcel: 10 years × 3 papers
  for (const board of ['AQA', 'Edexcel'] as ExamBoard[]) {
    const code = board === 'AQA' ? '8300' : '1MA1'
    const style = board === 'AQA' ? AQA_STYLE : EDX_STYLE
    for (const tier of ['Foundation', 'Higher'] as Tier[]) {
      const dist = TOPIC_DIST[board][tier]
      let count = 0
      for (let y = 2015; y <= 2024 && count < 30; y++) {
        for (let p = 1; p <= 3 && count < 30; p++) {
          const calc = p !== 1
          papers.push({
            id: `${board.toLowerCase()}-${tier.toLowerCase()}-${y}-p${p}`,
            type: 'historical',
            board, boardCode: code, tier, year: y,
            paperNumber: p,
            name: `${y} Paper ${p} — ${calc ? 'Calculator' : 'Non-Calculator'}`,
            calculator: calc,
            questionCount: 20, totalMarks: 80, timeMinutes: 90,
            topics: dist[(p - 1) % 3],
            style: `${style} Generate questions in the style and difficulty level of the actual ${board} ${y} ${tier} Paper ${p}.`,
          })
          count++
        }
      }
    }
  }

  // OCR: 6 years × 5 papers = 30
  const ocrYears = [2018, 2019, 2020, 2021, 2022, 2023]
  const ocrCalc = [false, true, true, true, false, false]
  for (const tier of ['Foundation', 'Higher'] as Tier[]) {
    const dist = TOPIC_DIST.OCR[tier]
    for (const year of ocrYears) {
      for (let p = 1; p <= 5; p++) {
        papers.push({
          id: `ocr-${tier.toLowerCase()}-${year}-p${p}`,
          type: 'historical',
          board: 'OCR', boardCode: 'J560', tier, year,
          paperNumber: p,
          name: `${year} Paper ${p} — ${ocrCalc[p - 1] ? 'Calculator' : 'Non-Calculator'}`,
          calculator: ocrCalc[p - 1] ?? true,
          questionCount: 20, totalMarks: 100, timeMinutes: 90,
          topics: dist[(p - 1) % 3],
          style: `${OCR_STYLE} Generate questions in the style and difficulty level of the actual OCR ${year} ${tier} Paper ${p}.`,
        })
      }
    }
  }

  return papers
}

// ── AI Practice papers: 30 per board per tier ─────────────────
function buildAIPapers(): Paper[] {
  const papers: Paper[] = []
  const DIFFICULTY_LABELS = [
    'Warm-Up', 'Warm-Up', 'Warm-Up', 'Warm-Up', 'Warm-Up',       // 1-5 easy
    'Standard', 'Standard', 'Standard', 'Standard', 'Standard',   // 6-10
    'Standard', 'Standard', 'Standard', 'Standard', 'Standard',   // 11-15
    'Challenge', 'Challenge', 'Challenge', 'Challenge', 'Challenge', // 16-20
    'Mixed', 'Mixed', 'Mixed', 'Mixed', 'Mixed',                   // 21-25
    'Exam Style', 'Exam Style', 'Exam Style', 'Exam Style', 'Exam Style', // 26-30
  ]
  const PAPER_FOCUS = [
    'Number and Algebra', 'Geometry and Measures', 'Statistics and Probability',
    'Number and Geometry', 'Algebra and Probability',
  ]

  for (const board of ['AQA', 'Edexcel', 'OCR'] as ExamBoard[]) {
    const code = board === 'AQA' ? '8300' : board === 'Edexcel' ? '1MA1' : 'J560'
    const style = board === 'AQA' ? AQA_STYLE : board === 'Edexcel' ? EDX_STYLE : OCR_STYLE
    for (const tier of ['Foundation', 'Higher'] as Tier[]) {
      const dist = TOPIC_DIST[board][tier]
      for (let i = 1; i <= 30; i++) {
        const diffLabel = DIFFICULTY_LABELS[i - 1]
        const focus = PAPER_FOCUS[(i - 1) % 5]
        const calc = i % 3 !== 1  // every 3rd paper is non-calc
        papers.push({
          id: `ai-${board.toLowerCase()}-${tier.toLowerCase()}-${i}`,
          type: 'ai',
          board, boardCode: code, tier,
          paperNumber: i,
          name: `Practice ${i} — ${diffLabel}`,
          calculator: calc,
          questionCount: 20, totalMarks: 80, timeMinutes: 90,
          topics: dist[(i - 1) % 3],
          style: `${style} Focus on: ${focus}. Difficulty: ${diffLabel}. ${!calc ? 'Non-calculator paper.' : ''}`,
        })
      }
    }
  }
  return papers
}

export const HISTORICAL_PAPERS = buildHistorical()
export const AI_PAPERS = buildAIPapers()
export const ALL_PAPERS = [...HISTORICAL_PAPERS, ...AI_PAPERS]

export function getPaper(id: string): Paper | undefined {
  return ALL_PAPERS.find(p => p.id === id)
}

export function estimateGrade(score: number, total: number, tier: Tier): string {
  const pct = total > 0 ? (score / total) * 100 : 0
  if (tier === 'Foundation') {
    if (pct >= 85) return '5'
    if (pct >= 70) return '4'
    if (pct >= 55) return '3'
    if (pct >= 40) return '2'
    if (pct >= 20) return '1'
    return 'U'
  } else {
    if (pct >= 80) return '9'
    if (pct >= 70) return '8'
    if (pct >= 60) return '7'
    if (pct >= 50) return '6'
    if (pct >= 40) return '5'
    if (pct >= 30) return '4'
    if (pct >= 20) return '3'
    if (pct >= 10) return '2'
    return 'U'
  }
}
