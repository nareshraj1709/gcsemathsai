import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

// Board-specific exam patterns with year-by-year detail
const BOARD_PATTERNS: Record<string, string> = {
  AQA: `AQA GCSE Mathematics (8300) exam pattern:
- 3 papers: Paper 1 (non-calculator), Paper 2 (calculator), Paper 3 (calculator)
- Each paper: 80 marks, 1 hour 30 minutes
- Question format: structured multi-part (a)(b)(c)(d), marks increase through the paper
- Early questions: 1-2 marks, direct recall. Later questions: 4-6 marks, multi-step reasoning
- Mark types: M (method), A (accuracy), B (independent marks for intermediate results)
- AQA loves: ratio/proportion contexts, "show that" proofs, frequency polygon questions, "explain why" reasoning marks
- Common AQA phrasing: "Work out", "Show that", "Give your answer in the form...", "You must show your working"
- Quality of written communication (QWC) marks on at least one question per paper`,

  Edexcel: `Edexcel GCSE Mathematics (1MA1) exam pattern:
- 3 papers: Paper 1 (non-calculator), Paper 2 (calculator), Paper 3 (calculator)
- Each paper: 80 marks, 1 hour 30 minutes
- Question format: contextual problems with real-world scenarios, described diagrams
- Early questions: 1-2 marks. Mid: 3-4 marks. Final questions: 5-6 marks
- Mark types: M (method), A (accuracy), B (independent), C (communication)
- Follow-through (ft) marks: where the mark scheme says "ft", credit a correct method using a wrong earlier answer
- Edexcel loves: real-life problem-solving contexts, "Here is a..." followed by data, conversion graphs, compound measures
- Common Edexcel phrasing: "You must show all your working", "Give your answer correct to...", "Is [name] correct? Give a reason"
- Always includes at least one "here is some information" contextual problem`,

  OCR: `OCR GCSE Mathematics (J560) exam pattern:
- 3 papers: Paper 1 (non-calculator), Paper 2 (calculator), Paper 3 (calculator)
- Each paper: 100 marks, 1 hour 30 minutes
- Question format: problem-solving and reasoning focus, scaffolded questions
- Questions increase in difficulty within each paper
- Mark types: M (method), A (accuracy), B (independent)
- OCR loves: "Explain your reasoning", mathematical proof, questions with multiple valid approaches
- OCR uses scaffolding: part (a) guides you into part (b) which builds to part (c)
- Common OCR phrasing: "Show clearly your method", "Explain your answer", "You may use the grid/diagram"
- Credits alternative valid methods — mark schemes say "or equivalent method"`,
}

export async function POST(req: Request) {
  const {
    examBoard,
    tier,
    topic,
    subtopic,
    count = 10,
    paperStyle = false,
    paperName,
    topics,
    style,
    calculator,
    difficulty = 'Medium',
  } = await req.json()

  if (!examBoard || !tier) {
    return NextResponse.json({ error: 'Missing examBoard or tier' }, { status: 400 })
  }

  const boardPattern = BOARD_PATTERNS[examBoard] || BOARD_PATTERNS.AQA

  const calcNote = calculator === false
    ? 'This is a NON-CALCULATOR paper. All questions must be solvable without a calculator. Do not set questions requiring decimal division, square roots of non-perfect squares, or trigonometric calculations.'
    : 'This is a CALCULATOR paper. You may include questions that require a calculator.'

  let prompt: string
  if (paperStyle && topics) {
    // Full paper question set
    prompt = `You are a senior GCSE Maths examiner writing questions for a real ${examBoard} ${tier} exam paper.

${boardPattern}

${calcNote}

Topic distribution: ${topics}

${style || ''}

Generate exactly ${count} questions that could appear on a real ${examBoard} paper. They must be INDISTINGUISHABLE from actual past paper questions in format, language, and difficulty.

Requirements:
- Questions MUST increase in difficulty (Q1-3: 1-2 marks each, Q4-10: 2-4 marks, Q11+: 4-6 marks)
- Use multi-part format (a)(b)(c) where appropriate — this is how real ${examBoard} papers work
- Total marks should sum to approximately ${count * 4}
- Use UK English, metric units, British currency (£), UK contexts
- Include at least one "Show that..." or "Explain why..." question
- Each question must have a single correct answer (or clearly defined acceptable answers)

Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text including any (a)(b)(c) parts",
    "markScheme": "detailed mark scheme with M/A/B marks labelled for each part",
    "marks": 3
  }
]`
  } else {
    // Practice questions — exam-authentic
    const difficultyGuide: Record<string, string> = {
      'Easy': `- All questions 1-2 marks each, testing basic recall and single-step methods
- Like the first 5 questions on a real ${examBoard} paper
- Straightforward "Work out" or "Calculate" questions`,
      'Medium': `- Mix of difficulties like a real exam: 2 easy (1-2 marks), 3 medium (2-3 marks), 2 harder (3-4 marks)
- Include at least one multi-part (a)(b) question
- Like questions 5-15 on a real ${examBoard} paper`,
      'Exam Level': `- All questions 3-6 marks, exam-standard difficulty
- Multi-step reasoning, worded problems, "show that" questions
- Like the final questions (Q15-25) on a real ${examBoard} paper
- Include at least one question requiring explanation or proof`,
    }

    // Pick a random recent year to model the style after
    const examYears = [2019, 2022, 2023, 2024]
    const modelYear = examYears[Math.floor(Math.random() * examYears.length)]
    const paperNum = Math.floor(Math.random() * 3) + 1
    const isCalc = paperNum !== 1

    prompt = `You are a senior GCSE Maths examiner. Generate ${count} practice questions modelled on real ${examBoard} ${tier} ${modelYear} Paper ${paperNum} (${isCalc ? 'Calculator' : 'Non-Calculator'}).

${boardPattern}

${isCalc ? 'This is a CALCULATOR paper.' : 'This is a NON-CALCULATOR paper. All questions must be solvable without a calculator.'}

Topic: ${topic || 'Mixed'}
Subtopic: ${subtopic || 'Mixed'}

${difficultyGuide[difficulty] || difficultyGuide['Medium']}

CRITICAL REQUIREMENTS:
- Questions must look and feel EXACTLY like real ${examBoard} ${modelYear} exam questions
- Use ${examBoard}'s specific phrasing style and question structures
- All questions must be on "${subtopic || topic}" but vary the contexts and methods tested
- Use multi-part (a)(b)(c) format where the question naturally builds — this is essential for ${examBoard}
- Use UK English, metric units, UK contexts (British names, £ currency, UK places)
- Each question needs a hint that suggests the method WITHOUT revealing the answer
- Mark schemes must use proper M/A/B notation

Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text exactly as it would appear on a ${examBoard} paper",
    "hint": "brief method hint, e.g. 'Start by finding a common denominator'",
    "markScheme": "M1: [method step]\\nA1: [correct answer]\\nB1: [independent mark if applicable]",
    "marks": 3
  }
]`
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const questions = JSON.parse(cleaned)

    return NextResponse.json({ questions })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
  }
}
