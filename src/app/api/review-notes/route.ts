import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image   = formData.get('image')   as File | null
    const topic   = formData.get('topic')   as string | null
    const subtopic = formData.get('subtopic') as string | null

    if (!image || !topic) {
      return NextResponse.json({ error: 'Image and topic are required' }, { status: 400 })
    }

    // Validate file type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(image.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WEBP or GIF images are accepted' }, { status: 400 })
    }

    // Validate file size (max 4 MB before base64 encoding)
    if (image.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 4 MB' }, { status: 400 })
    }

    const bytes  = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mediaType = image.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

    const topicLabel = subtopic ? `${topic} — ${subtopic}` : topic

    const prompt = `You are an experienced GCSE Maths teacher reviewing a student's handwritten or typed notes.

Topic being reviewed: "${topicLabel}"

Please assess these notes carefully against the GCSE specification (AQA/Edexcel/OCR) and return a structured evaluation.

Score the notes out of 10:
- Accuracy of mathematical content (4 marks): Are formulas, rules and facts correct?
- Completeness of key concepts (3 marks): Are the important ideas for this topic present?
- Clarity and organisation (2 marks): Are the notes easy to follow and well-structured?
- Use of examples or diagrams (1 mark): Has the student included worked examples or visual aids?

Return ONLY valid JSON — no markdown, no commentary:
{
  "score": <number 0-10>,
  "outOf": 10,
  "summary": "<2-3 sentences: honest but encouraging overall assessment>",
  "strengths": ["<specific thing done well 1>", "<specific thing done well 2>"],
  "gaps": ["<key concept missing 1>", "<key concept missing 2>"],
  "errors": ["<specific factual or mathematical error if any>"],
  "recommendation": "<either 'revise' if score <= 6 or 'practice' if score >= 7>",
  "revisionFocus": "<one specific subtopic or concept to focus on next>"
}`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            { type: 'text', text: prompt },
          ],
        },
      ],
    })

    const text = (message.content[0] as { type: string; text: string }).text
    const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()
    const result = JSON.parse(cleaned)

    return NextResponse.json(result)
  } catch (e) {
    console.error('review-notes error:', e)
    return NextResponse.json({ error: 'Failed to review notes. Please try again.' }, { status: 500 })
  }
}
