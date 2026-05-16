'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const HASH_REDIRECTS: Record<string, string> = {
  'revision-planner': '/features/revision-planner',
  'writing-pad': '/features/writing-pad',
  'parent-report': '/features/parent-report',
}

export default function HashRedirector() {
  const router = useRouter()
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '')
    if (hash && HASH_REDIRECTS[hash]) {
      router.replace(HASH_REDIRECTS[hash])
    }
  }, [router])
  return null
}
