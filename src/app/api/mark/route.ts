import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

const BOARD_GUIDANCE: Record<string, string> = {
  AQA: `AQA marking guidance: Follow the mark scheme strictly. Award M (method) marks for correct mathematical method even if the final answer is wrong. Award A (accuracy) marks only for correct answers. Do not allow follow-through unless the mark scheme states it.`,
  Edexcel: `Edexcel marking guidance: Follow-through (ft) marks may be awarded where the mark scheme indicates — award marks for a correct method applied to an incorrect previous answer. Be generous with equivalent forms of the correct answer.`,
  OCR: `OCR marking guidance: Credit any mathematically valid alternative method that leads to the correct answer. Award marks for correct reasoning and logical steps even if the approach differs from the model answer.`,
}

export async function POST(req: Request) {
  const { question, markScheme, studentAnswer, marks, examBoard } = await req.json()

  if (!question || !studentAnswer) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const boardNote = examBoard && BOARD_GUIDANCE[examBoard]
    ? BOARD_GUIDANCE[examBoard]
    : 'Award marks fairly based on the mark scheme.'

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are a GCSE Maths examiner. Mark the student's answer using the mark scheme.

${boardNote}

Question (${marks} marks): ${question}

Mark scheme: ${markScheme}

Student's answer: ${studentAnswer}

Reply in this exact JSON format (no markdown):
{
  "score": <number of marks awarded>,
  "outOf": ${marks},
  "feedback": "<2-3 sentences: what was correct, what was wrong, how to improve>"
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
