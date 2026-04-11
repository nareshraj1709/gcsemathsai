import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

const MODERATION_PROMPT = `You are a content moderator for a UK student community forum on a GCSE Maths revision website. Users are typically aged 14-16.

Your job is to decide whether a piece of content is safe to publish.

REJECT content that contains:
- Profanity, slurs, or offensive language
- Personal contact details (phone numbers, addresses, email addresses, social media handles, school names)
- Bullying, harassment, threats, or discrimination
- Sexual content or inappropriate flirting
- Self-harm, suicide, or content promoting harmful behaviour
- Spam, advertising, or links to external commercial services
- Cheating offers (e.g. "I'll do your homework for £10")
- Sharing of exam papers from current/upcoming exam sessions (copyright)
- Off-topic political content unrelated to maths

APPROVE content that is:
- A genuine maths question, struggle, or doubt
- Helpful explanations or working
- Encouragement, study tips, exam advice
- General chat about revision or studying
- Memes/jokes that are clean and on-topic
- Constructive criticism

Respond ONLY with valid JSON in this exact format:
{"safe": true} or {"safe": false, "reason": "brief reason in one sentence"}

Do not include any other text, markdown, or explanation.`

type ModerateBody = {
  text: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ModerateBody
    const text = (body.text ?? '').trim()

    if (!text) {
      return NextResponse.json({ safe: false, reason: 'Empty content.' }, { status: 400 })
    }

    if (text.length > 10000) {
      return NextResponse.json({ safe: false, reason: 'Content is too long.' }, { status: 400 })
    }

    // Quick local checks before calling AI (saves tokens for obvious cases)
    const quickRejects: { pattern: RegExp; reason: string }[] = [
      { pattern: /\b\d{10,}\b/, reason: 'Personal contact details (phone number) are not allowed.' },
      { pattern: /\b[\w.-]+@[\w.-]+\.\w+\b/, reason: 'Email addresses are not allowed.' },
    ]

    for (const check of quickRejects) {
      if (check.pattern.test(text)) {
        return NextResponse.json({ safe: false, reason: check.reason })
      }
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      system: MODERATION_PROMPT,
      messages: [{ role: 'user', content: text }],
    })

    const aiText = response.content
      .map(block => (block.type === 'text' ? block.text : ''))
      .join('')
      .trim()

    // Parse JSON response
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return NextResponse.json({ safe: true })
      }
      const parsed = JSON.parse(jsonMatch[0]) as { safe: boolean; reason?: string }
      return NextResponse.json(parsed)
    } catch {
      // If parsing fails, default to allowing (don't block legitimate users)
      return NextResponse.json({ safe: true })
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Moderation failed'
    return NextResponse.json({ safe: false, reason: message }, { status: 500 })
  }
}
