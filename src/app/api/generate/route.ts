import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

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
  } = await req.json()

  if (!examBoard || !tier) {
    return NextResponse.json({ error: 'Missing examBoard or tier' }, { status: 400 })
  }

  const boardStyle: Record<string, string> = {
    AQA: 'AQA (8300) style: use structured multi-part format (a)(b)(c) where appropriate. Method marks (M) awarded for correct working even if final answer is wrong. Accuracy marks (A) for correct answer. Show M and A marks in mark scheme.',
    Edexcel: 'Edexcel (1MA1) style: include real-world contexts and describe any diagrams in text. Follow-through (ft) marks allowed where stated. Mark scheme should indicate where ft applies.',
    OCR: 'OCR (J560) style: focus on problem-solving and mathematical reasoning. Credit alternative valid methods. Mark scheme should note "or equivalent method" where appropriate.',
  }

  const calcNote = calculator === false
    ? 'This is a NON-CALCULATOR paper. All questions must be solvable without a calculator.'
    : 'This is a CALCULATOR paper.'

  let prompt: string
  if (paperStyle && topics) {
    // Full paper question set
    prompt = `You are a GCSE Maths examiner. Generate ${count} exam-style questions for ${examBoard} ${tier} ${paperName || 'exam paper'}.

${boardStyle[examBoard] || ''}
${calcNote}

Topic distribution to cover across all questions: ${topics}

${style || ''}

Requirements:
- Questions should increase in difficulty (early questions 1-3 marks, later questions 4-6 marks)
- Use UK English and UK curriculum terminology
- Total marks across all questions should sum to approximately ${count * 4}
- Each question must have a clear, unambiguous answer

Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text",
    "markScheme": "detailed mark scheme with M and A marks labelled",
    "marks": 3
  }
]`
  } else {
    // Section practice questions
    prompt = `You are a GCSE Maths examiner. Generate ${count} practice questions for the following:

Exam board: ${examBoard} ${boardStyle[examBoard] ? '— ' + boardStyle[examBoard] : ''}
Tier: ${tier}
Topic: ${topic || 'Mixed'}
Subtopic: ${subtopic || 'Mixed'}

Requirements:
- All questions on the topic of "${subtopic || topic}"
- Suitable for ${tier} tier students
- Vary difficulty: 3 easier (1-2 marks), 4 medium (2-3 marks), 3 harder (3-5 marks)
- Use UK English and UK curriculum terminology
- Each question must be clearly worded with a definitive answer

Return a JSON array of exactly ${count} questions (no markdown, no explanation):
[
  {
    "question": "full question text",
    "markScheme": "detailed mark scheme with M and A marks labelled",
    "marks": 2
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
