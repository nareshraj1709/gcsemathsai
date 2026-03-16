import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'

const client = new Anthropic()

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const image = formData.get('image') as File | null

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 })
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowed.includes(image.type)) {
      return NextResponse.json({ error: 'Only JPEG, PNG, WEBP or GIF images are accepted' }, { status: 400 })
    }

    if (image.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 4 MB' }, { status: 400 })
    }

    const bytes = await image.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mediaType = image.type as 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'

    const prompt = `You are an experienced GCSE Maths teacher reviewing a student's handwritten or typed notes.

First, identify what topic and subtopic these notes are about based on the content you can see.
Then assess the notes against the GCSE specification (AQA/Edexcel/OCR).

Score the notes out of 10:
- Accuracy of mathematical content (4 marks): Are formulas, rules and facts correct?
- Completeness of key concepts (3 marks): Are the important ideas for this topic present?
- Clarity and organisation (2 marks): Are the notes easy to follow and well-structured?
- Use of examples or diagrams (1 mark): Has the student included worked examples or visual aids?

Return ONLY valid JSON — no markdown, no commentary:
{
  "detectedTopic": "<the main GCSE maths topic area, e.g. Algebra>",
  "detectedSubtopic": "<the specific subtopic, e.g. Quadratic equations>",
  "detectedTier": "<Foundation or Higher based on the difficulty of content>",
  "score": <number 0-10>,
  "outOf": 10,
  "summary": "<2-3 sentences: honest but encouraging overall assessment>",
  "strengths": ["<specific thing done well 1>", "<specific thing done well 2>"],
  "gaps": ["<key concept missing 1>", "<key concept missing 2>"],
  "errors": ["<specific factual or mathematical error if any — empty array if none>"],
  "recommendation": "<either 'revise' if score <= 6 or 'practice' if score >= 7>",
  "revisionFocus": "<one specific concept to focus on next>"
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
