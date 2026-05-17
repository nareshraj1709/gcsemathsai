// Gated PDF download. Verifies the request comes from a logged-in Supabase user
// whose email appears in the `purchases` table for an SKU that grants this file.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import { getSkuById, PREDICTED_PAPER_FAMILIES } from '@/lib/predicted-papers'

export const runtime = 'nodejs'

/**
 * Map an SKU id to the SKUs whose entitlement also unlocks it.
 * The bundle includes every paper2 and paper3 file; paper2 only includes paper2
 * files; paper3 only includes paper3 files.
 */
function entitlingSkus(skuId: string): string[] {
  if (skuId === 'paper2') return ['paper2', 'bundle']
  if (skuId === 'paper3') return ['paper3', 'bundle']
  if (skuId === 'bundle') return ['bundle']
  return []
}

function fileBelongsToSku(skuId: string, filename: string): boolean {
  const sku = getSkuById(skuId)
  if (!sku) return false
  return sku.files.some(f => f.filename === filename)
}

type Props = { params: Promise<{ sku: string; file: string }> }

export async function GET(req: NextRequest, { params }: Props) {
  const { sku, file } = await params
  const decodedFile = decodeURIComponent(file)

  // Path safety
  if (decodedFile.includes('/') || decodedFile.includes('\\') || decodedFile.includes('..')) {
    return NextResponse.json({ error: 'invalid filename' }, { status: 400 })
  }
  if (!fileBelongsToSku(sku, decodedFile)) {
    return NextResponse.json({ error: 'unknown file for this sku' }, { status: 404 })
  }

  // Resolve which folder the file lives in
  let folder: 'paper2' | 'paper3' | null = null
  for (const f of PREDICTED_PAPER_FAMILIES) {
    for (const s of f.skus) {
      const hit = s.files.find(x => x.filename === decodedFile)
      if (hit) { folder = hit.folder; break }
    }
    if (folder) break
  }
  if (!folder) return NextResponse.json({ error: 'file not found' }, { status: 404 })

  // Verify the user is logged in and entitled.
  const authHeader = req.headers.get('authorization')
  const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!accessToken) return NextResponse.json({ error: 'sign in required' }, { status: 401 })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !anonKey) return NextResponse.json({ error: 'auth not configured' }, { status: 500 })

  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  })

  const { data: userData, error: userErr } = await supabase.auth.getUser(accessToken)
  if (userErr || !userData.user?.email) {
    return NextResponse.json({ error: 'sign in required' }, { status: 401 })
  }
  const email = userData.user.email.toLowerCase().trim()

  // Use the anon-key client (RLS should allow the user to read their own row).
  const { data: rows, error } = await supabase
    .from('purchases')
    .select('sku_id')
    .eq('customer_email', email)
    .in('sku_id', entitlingSkus(sku))
  if (error) return NextResponse.json({ error: 'lookup failed' }, { status: 500 })
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: 'no purchase found for this email' }, { status: 403 })
  }

  // Stream the PDF
  const filePath = path.join(process.cwd(), 'content', 'predicted-papers', folder, decodedFile)
  try {
    const buf = await fs.readFile(filePath)
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${decodedFile}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ error: 'file missing on server' }, { status: 404 })
  }
}
