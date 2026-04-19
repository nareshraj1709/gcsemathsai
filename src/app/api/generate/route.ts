import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const client = new Anthropic()

// Admin Supabase client for paper cache (bypasses RLS). Falls back to null
// if env vars are missing — caching is best-effort only.
const supabaseAdmin = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key, { auth: { persistSession: false } })
})()

const PAPERS_TABLE = 'generated_papers'
const SEEN_TABLE = 'seen_papers'

/**
 * Recover from a truncated JSON array response by trimming back to the last
 * complete object and closing the bracket. Returns null if unrecoverable.
 */
function recoverTruncatedArray(text: string): unknown[] | null {
  const start = text.indexOf('[')
  if (start === -1) return null
  const body = text.slice(start)
  // Find the last closing brace of a complete object
  const lastObjEnd = body.lastIndexOf('}')
  if (lastObjEnd === -1) return null
  const candidate = body.slice(0, lastObjEnd + 1) + ']'
  try {
    const parsed = JSON.parse(candidate)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null
  } catch {
    return null
  }
}

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
    year,
    format = 'written',
    paperId, // stable paper identifier, e.g. "aqa-higher-2024-p1"
    userId, // optional — used to dedupe variants per student
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

    // Year pool covers every GCSE 9-1 session. Caller can pin a specific year.
    const examYears = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
    const pickedYear = (typeof year === 'number' && examYears.includes(year))
      ? year
      : examYears[Math.floor(Math.random() * examYears.length)]
    const modelYear = pickedYear
    const paperNum = calculator === false ? 1 : Math.floor(Math.random() * 3) + 1
    const isCalc = calculator === false ? false : paperNum !== 1

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

${format === 'mcq' ? `IMPORTANT — MCQ FORMAT:
Each question must have exactly 4 answer options (A, B, C, D) with only ONE correct answer.
- Make distractors plausible (common mistakes students actually make)
- Distractors should come from typical errors: sign errors, forgetting to square, off-by-one, wrong formula, etc.
- The correct answer position should vary randomly across questions (not always A)

Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text",
    "hint": "brief method hint",
    "options": ["option A text", "option B text", "option C text", "option D text"],
    "correctIndex": 0,
    "markScheme": "Correct answer: [answer]. Common mistakes: [explain why each distractor is wrong]",
    "marks": 1
  }
]` : `Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text exactly as it would appear on a ${examBoard} paper",
    "hint": "brief method hint, e.g. 'Start by finding a common denominator'",
    "markScheme": "M1: [method step]\\nA1: [correct answer]\\nB1: [independent mark if applicable]",
    "marks": 3
  }
]`}`
  }

  // ── Paper pool: read cached variants, pick one the user hasn't seen ──
  if (paperStyle && paperId && supabaseAdmin) {
    try {
      const { data: variants } = await supabaseAdmin
        .from(PAPERS_TABLE)
        .select('id, questions')
        .eq('paper_id', paperId)

      if (variants && variants.length > 0) {
        let pool = variants
        if (userId) {
          const { data: seen } = await supabaseAdmin
            .from(SEEN_TABLE)
            .select('variant_id')
            .eq('user_id', userId)
          const seenIds = new Set((seen ?? []).map((s: { variant_id: string }) => s.variant_id))
          pool = variants.filter(v => !seenIds.has(v.id))
          // If user has seen every variant, pool is empty → fall through to generate a fresh one
        }

        if (pool.length > 0) {
          const pick = pool[Math.floor(Math.random() * pool.length)]
          if (userId) {
            supabaseAdmin
              .from(SEEN_TABLE)
              .upsert({ user_id: userId, variant_id: pick.id }, { onConflict: 'user_id,variant_id' })
              .then(() => { /* noop */ }, () => { /* ignore */ })
          }
          return NextResponse.json({ questions: pick.questions, cached: true })
        }
      }
    } catch {
      // Table missing or transient error — fall through to generate
    }
  }

  const callClaude = async (attempt: number): Promise<unknown[] | null> => {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = (message.content[0] as { type: string; text: string }).text
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    try {
      const parsed = JSON.parse(cleaned)
      return Array.isArray(parsed) ? parsed : null
    } catch {
      if (attempt === 0) {
        const recovered = recoverTruncatedArray(cleaned)
        if (recovered && recovered.length >= Math.ceil(count * 0.7)) {
          return recovered
        }
      }
      return null
    }
  }

  try {
    let questions = await callClaude(0)
    if (!questions || questions.length === 0) {
      questions = await callClaude(1) // one retry
    }
    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { error: 'The model returned an incomplete response. Please try again.' },
        { status: 502 },
      )
    }

    // Persist as a new variant in the pool (paper-style only)
    if (paperStyle && paperId && supabaseAdmin) {
      try {
        const { data: inserted } = await supabaseAdmin
          .from(PAPERS_TABLE)
          .insert({
            paper_id: paperId,
            board: examBoard,
            tier,
            paper_name: paperName ?? null,
            questions,
          })
          .select('id')
          .single()
        if (inserted?.id && userId) {
          supabaseAdmin
            .from(SEEN_TABLE)
            .upsert({ user_id: userId, variant_id: inserted.id }, { onConflict: 'user_id,variant_id' })
            .then(() => { /* noop */ }, () => { /* ignore */ })
        }
      } catch {
        // Ignore — caching is best-effort
      }
    }

    return NextResponse.json({ questions })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
  }
}
