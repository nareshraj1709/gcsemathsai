import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

type Attempt = {
  question: string
  studentAnswer: string
  score: number
  outOf: number
  topic: string
  subtopic?: string
}

export async function POST(req: Request) {
  const { attempts, examBoard, tier }: { attempts: Attempt[]; examBoard?: string; tier?: string } = await req.json()

  if (!attempts || attempts.length === 0) {
    return NextResponse.json({ error: 'No attempts provided' }, { status: 400 })
  }

  const totalScore = attempts.reduce((s, a) => s + a.score, 0)
  const totalOut = attempts.reduce((s, a) => s + a.outOf, 0)
  const pct = totalOut > 0 ? Math.round((totalScore / totalOut) * 100) : 0

  const attemptsSummary = attempts.map((a, i) =>
    `Q${i + 1} (${a.topic}${a.subtopic ? ' - ' + a.subtopic : ''}, ${a.score}/${a.outOf}): "${a.question}" → Student: "${a.studentAnswer}"`
  ).join('\n')

  const prompt = `You are a GCSE Maths teacher reviewing a student's practice session.

Exam board: ${examBoard || 'GCSE'}
Tier: ${tier || 'Foundation'}
Overall score: ${totalScore}/${totalOut} (${pct}%)

Session attempts:
${attemptsSummary}

Provide a personalised evaluation in this exact JSON format (no markdown):
{
  "summary": "<2-3 sentences: honest, encouraging assessment of overall performance>",
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "improvements": ["<specific area to improve 1 with actionable advice>", "<specific area to improve 2>"],
  "studyFocus": "<one specific topic/subtopic to prioritise studying next>"
}`

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    return NextResponse.json(JSON.parse(cleaned))
  } catch {
    return NextResponse.json({ error: 'Failed to generate evaluation' }, { status: 500 })
  }
}
