import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

const DIFFICULTY_DESC: Record<string, string> = {
  easy: 'straightforward single-step problems, Foundation tier, no trick questions',
  medium: 'multi-step problems requiring clear working, suitable for Foundation/Higher boundary students',
  'exam-level': 'challenging Higher-tier exam-style problems requiring multiple steps, algebra, and reasoning',
}

export async function POST(req: Request) {
  const { topic, difficulty, questionCount } = await req.json()

  if (!topic || !difficulty || !questionCount) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const diffDesc = DIFFICULTY_DESC[difficulty] ?? DIFFICULTY_DESC.medium
  const topicLabel = String(topic).replace(/_/g, ' ')

  const prompt = `You are a GCSE Maths teacher creating a quiz. Generate exactly ${questionCount} GCSE Maths questions on the topic: "${topicLabel}".

Difficulty: ${diffDesc}

Requirements:
- Each question must be solvable with a single clear answer
- Questions must match AQA/Edexcel/OCR GCSE curriculum
- No ambiguous wording
- Answers must be concise (e.g. "x=3", "4.5", "(2,5)", "y=2x+1")
- Explanation must show clear numbered steps

Return ONLY valid JSON — no markdown, no commentary, no code fences:
{
  "questions": [
    {
      "id": 1,
      "question": "full question text here",
      "answer": "concise answer here",
      "explanation": "Step 1: ... Step 2: ... Final answer: ..."
    }
  ]
}`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const result = JSON.parse(cleaned)

    if (!Array.isArray(result.questions)) {
      return NextResponse.json({ error: 'Invalid response structure' }, { status: 500 })
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 })
  }
}
