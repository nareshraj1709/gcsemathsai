import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: async (input, init) => {
      const controller = new AbortController()
      const abort = () => controller.abort()
      const source = init?.signal
      if (source?.aborted) abort()
      else source?.addEventListener('abort', abort, { once: true })
      const timer = setTimeout(abort, 12000)
      try {
        return await fetch(input, { ...init, signal: controller.signal })
      } finally {
        clearTimeout(timer)
        source?.removeEventListener('abort', abort)
      }
    },
  },
})