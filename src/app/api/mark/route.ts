import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

// Generic style guidance — describes the common method-mark conventions used
// across UK GCSE Maths boards. Deliberately phrased in our own words, not
// copied or paraphrased from any board's published marking policy.
const BOARD_GUIDANCE: Record<string, string> = {
  AQA: `Marking conventions typical of an AQA-style paper: award M (method) marks for a correct mathematical method even when the final answer is wrong; award A (accuracy) marks only when the final answer is correct; do not allow follow-through marks unless the supplied mark scheme explicitly indicates it.`,
  Edexcel: `Marking conventions typical of an Edexcel-style paper: follow-through (ft) marks may be awarded where the supplied mark scheme indicates — give credit for a correct method applied to an incorrect previous answer. Accept any equivalent algebraic form of the correct answer.`,
  OCR: `Marking conventions typical of an OCR-style paper: credit any mathematically valid alternative method that arrives at the correct answer. Award marks for correct reasoning and logical steps even if the approach differs from the model answer.`,
}

export async function POST(req: Request) {
  const { question, markScheme, studentAnswer, marks, examBoard } = await req.json()

  if (!question || !studentAnswer) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const boardNote = examBoard && BOARD_GUIDANCE[examBoard]
    ? BOARD_GUIDANCE[examBoard]
    : 'Award marks fairly based on the supplied mark scheme.'

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are an experienced GCSE Maths teacher giving feedback to a student. Mark the student's answer against the supplied mark scheme.

${boardNote}

Question (${marks} marks): ${question}

Mark scheme (for your reference — do NOT quote it back to the student verbatim): ${markScheme}

Student's answer: ${studentAnswer}

Write your feedback in your OWN words. Do not reproduce text from any published exam-board mark scheme or examiner report; describe what the student got right or wrong in plain English. Use the M / A / B / C mark codes only as descriptors of the method/accuracy/result breakdown — do not claim to be an exam board.

Reply in this exact JSON format (no markdown):
{
  "score": <number of marks awarded>,
  "outOf": ${marks},
  "feedback": "<2-3 sentences in your own words: what was correct, what was wrong, how to improve>"
}`,
      },
    ],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  try {
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const result = JSON.parse(cleaned)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
  }
}
