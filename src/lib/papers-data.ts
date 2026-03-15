export type ExamBoard = 'AQA' | 'Edexcel' | 'OCR'
export type Tier = 'Foundation' | 'Higher'

export type Paper = {
  id: string
  board: ExamBoard
  boardCode: string
  tier: Tier
  paperNumber: number
  name: string
  calculator: boolean
  questionCount: number
  totalMarks: number
  timeMinutes: number
  topics: string      // topic distribution hint for question generation
  style: string       // board-specific question style
}

const AQA_STYLE = 'AQA style: structured multi-part (a)(b)(c) format, strict mark scheme adherence, method marks awarded for correct working even if final answer wrong.'
const EDX_STYLE = 'Edexcel style: real-world contexts and described diagrams, follow-through marks allowed, formulae sheet provided.'
const OCR_STYLE = 'OCR style: problem-solving and reasoning focus, alternative valid methods credited, scaffolded questions with increasing difficulty.'

export const PAPERS: Paper[] = [
  // ─── AQA Foundation ───────────────────────────────────────────
  {
    id: 'aqa-foundation-p1', board: 'AQA', boardCode: '8300', tier: 'Foundation',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (35%), Algebra (25%), Geometry (20%), Statistics (15%), Probability (5%)',
    style: AQA_STYLE,
  },
  {
    id: 'aqa-foundation-p2', board: 'AQA', boardCode: '8300', tier: 'Foundation',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
    style: AQA_STYLE,
  },
  {
    id: 'aqa-foundation-p3', board: 'AQA', boardCode: '8300', tier: 'Foundation',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (15%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (15%)',
    style: AQA_STYLE,
  },
  // ─── AQA Higher ──────────────────────────────────────────────
  {
    id: 'aqa-higher-p1', board: 'AQA', boardCode: '8300', tier: 'Higher',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (25%), Algebra (35%), Geometry (25%), Statistics (10%), Probability (5%)',
    style: AQA_STYLE,
  },
  {
    id: 'aqa-higher-p2', board: 'AQA', boardCode: '8300', tier: 'Higher',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (15%), Algebra (30%), Geometry (30%), Statistics (15%), Probability (10%)',
    style: AQA_STYLE,
  },
  {
    id: 'aqa-higher-p3', board: 'AQA', boardCode: '8300', tier: 'Higher',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (10%), Algebra (30%), Geometry (30%), Statistics (15%), Probability (15%)',
    style: AQA_STYLE,
  },
  // ─── Edexcel Foundation ───────────────────────────────────────
  {
    id: 'edexcel-foundation-p1', board: 'Edexcel', boardCode: '1MA1', tier: 'Foundation',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (35%), Algebra (25%), Geometry (20%), Statistics (15%), Probability (5%)',
    style: EDX_STYLE,
  },
  {
    id: 'edexcel-foundation-p2', board: 'Edexcel', boardCode: '1MA1', tier: 'Foundation',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
    style: EDX_STYLE,
  },
  {
    id: 'edexcel-foundation-p3', board: 'Edexcel', boardCode: '1MA1', tier: 'Foundation',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (15%), Algebra (25%), Geometry (30%), Statistics (20%), Probability (10%)',
    style: EDX_STYLE,
  },
  // ─── Edexcel Higher ──────────────────────────────────────────
  {
    id: 'edexcel-higher-p1', board: 'Edexcel', boardCode: '1MA1', tier: 'Higher',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (20%), Algebra (35%), Geometry (25%), Statistics (10%), Probability (10%)',
    style: EDX_STYLE,
  },
  {
    id: 'edexcel-higher-p2', board: 'Edexcel', boardCode: '1MA1', tier: 'Higher',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (10%), Algebra (30%), Geometry (30%), Statistics (20%), Probability (10%)',
    style: EDX_STYLE,
  },
  {
    id: 'edexcel-higher-p3', board: 'Edexcel', boardCode: '1MA1', tier: 'Higher',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 80, timeMinutes: 90,
    topics: 'Number (10%), Algebra (25%), Geometry (35%), Statistics (15%), Probability (15%)',
    style: EDX_STYLE,
  },
  // ─── OCR Foundation ───────────────────────────────────────────
  {
    id: 'ocr-foundation-p1', board: 'OCR', boardCode: 'J560', tier: 'Foundation',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (35%), Algebra (20%), Geometry (25%), Statistics (15%), Probability (5%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-foundation-p2', board: 'OCR', boardCode: 'J560', tier: 'Foundation',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (20%), Algebra (25%), Geometry (30%), Statistics (15%), Probability (10%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-foundation-p3', board: 'OCR', boardCode: 'J560', tier: 'Foundation',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (15%), Algebra (25%), Geometry (30%), Statistics (20%), Probability (10%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-foundation-p4', board: 'OCR', boardCode: 'J560', tier: 'Foundation',
    paperNumber: 4, name: 'Paper 4 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (15%), Algebra (20%), Geometry (35%), Statistics (20%), Probability (10%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-foundation-p5', board: 'OCR', boardCode: 'J560', tier: 'Foundation',
    paperNumber: 5, name: 'Paper 5 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (25%), Algebra (25%), Geometry (25%), Statistics (15%), Probability (10%)',
    style: OCR_STYLE,
  },
  // ─── OCR Higher ──────────────────────────────────────────────
  {
    id: 'ocr-higher-p1', board: 'OCR', boardCode: 'J560', tier: 'Higher',
    paperNumber: 1, name: 'Paper 1 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (20%), Algebra (30%), Geometry (25%), Statistics (15%), Probability (10%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-higher-p2', board: 'OCR', boardCode: 'J560', tier: 'Higher',
    paperNumber: 2, name: 'Paper 2 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (10%), Algebra (30%), Geometry (30%), Statistics (20%), Probability (10%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-higher-p3', board: 'OCR', boardCode: 'J560', tier: 'Higher',
    paperNumber: 3, name: 'Paper 3 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (10%), Algebra (25%), Geometry (35%), Statistics (15%), Probability (15%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-higher-p4', board: 'OCR', boardCode: 'J560', tier: 'Higher',
    paperNumber: 4, name: 'Paper 4 — Calculator', calculator: true,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (10%), Algebra (25%), Geometry (35%), Statistics (15%), Probability (15%)',
    style: OCR_STYLE,
  },
  {
    id: 'ocr-higher-p5', board: 'OCR', boardCode: 'J560', tier: 'Higher',
    paperNumber: 5, name: 'Paper 5 — Non-Calculator', calculator: false,
    questionCount: 20, totalMarks: 100, timeMinutes: 90,
    topics: 'Number (15%), Algebra (35%), Geometry (25%), Statistics (15%), Probability (10%)',
    style: OCR_STYLE,
  },
]

export function getPaper(id: string): Paper | undefined {
  return PAPERS.find(p => p.id === id)
}

export function estimateGrade(score: number, total: number, tier: Tier): string {
  const pct = (score / total) * 100
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
