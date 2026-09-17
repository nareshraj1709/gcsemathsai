import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (input, init) => {
      const timeout = AbortSignal.timeout(12000)
      const signal = init?.signal ? AbortSignal.any([init.signal, timeout]) : timeout
      return fetch(input, { ...init, signal })
    },
  },
})