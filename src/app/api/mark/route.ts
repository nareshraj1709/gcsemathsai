import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: Request) {
  const { question, markScheme, studentAnswer, marks } = await req.json()

  if (!question || !studentAnswer) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    messages: [
      {
        role: 'user',
        content: `You are a GCSE Maths examiner. Mark the student's answer strictly using the mark scheme.

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
    const result = JSON.parse(text)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to parse AI response', raw: text }, { status: 500 })
  }
}
