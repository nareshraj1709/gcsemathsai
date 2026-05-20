export type ExamBoard = 'AQA' | 'Edexcel' | 'OCR'
export type Tier = 'Foundation' | 'Higher'
export type PaperType = 'practice'

export type Paper = {
  id: string
  type: PaperType
  board: ExamBoard
  boardCode: string
  tier: Tier
  paperNumber: number
  name: string
  calculator: boolean
  questionCount: number
  totalMarks: number
  timeMinutes: number
  topics: string
  style: string
}

// Independent style descriptors used to prompt question generation.
// Deliberately generic — we describe how the boards' published papers tend
// to be structured, not the content of any specific paper.
const AQA_STYLE = 'Multi-part questions in the (a)(b)(c) format common at AQA. Award method marks (M) for valid working and accuracy marks (A) for the final answer.'
const EDX_STYLE = 'Worded problems with real-world contexts. Follow-through (ft) marks where indicated in the mark scheme.'
const OCR_STYLE = 'Problem-solving and reasoning, with alternative valid methods credited. Questions scaffold up in difficulty.'

// Independent topic-weighting profiles for each paper position. Generic
// distributions — not lifted from any specific past paper.
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

// ── Practice papers we wrote: 30 per board per tier ──
// All questions are written by our generator from the published specification.
// We do not host or reproduce past-paper content from any board.
function buildPracticePapers(): Paper[] {
  const papers: Paper[] = []
  const DIFFICULTY_LABELS = [
    'Warm-Up', 'Warm-Up', 'Warm-Up', 'Warm-Up', 'Warm-Up',
    'Standard', 'Standard', 'Standard', 'Standard', 'Standard',
    'Standard', 'Standard', 'Standard', 'Standard', 'Standard',
    'Challenge', 'Challenge', 'Challenge', 'Challenge', 'Challenge',
    'Mixed', 'Mixed', 'Mixed', 'Mixed', 'Mixed',
    'Exam Style', 'Exam Style', 'Exam Style', 'Exam Style', 'Exam Style',
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
          id: `practice-${board.toLowerCase()}-${tier.toLowerCase()}-${i}`,
          type: 'practice',
          board, boardCode: code, tier,
          paperNumber: i,
          name: `Practice ${i} — ${diffLabel}`,
          calculator: calc,
          questionCount: 20, totalMarks: 80, timeMinutes: 90,
          topics: dist[(i - 1) % 3],
          style: `${style} Focus on: ${focus}. Difficulty: ${diffLabel}. ${!calc ? 'Non-calculator paper.' : ''} All questions must be written from scratch in the style of GCSE Maths, not copied or derived from any specific past paper.`,
        })
      }
    }
  }
  return papers
}

// Backwards-compat alias — some pages still import AI_PAPERS by name.
export const PRACTICE_PAPERS = buildPracticePapers()
export const AI_PAPERS = PRACTICE_PAPERS

// ALL_PAPERS used to include both historical + AI; now we only ship our own.
export const ALL_PAPERS = PRACTICE_PAPERS

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
