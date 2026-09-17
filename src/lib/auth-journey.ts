export function authError(error: unknown): string {
  const message = error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'message' in error ? String(error.message) : String(error)
  if (/invalid login credentials/i.test(message)) return 'That email and password do not match. Try again or reset your password.'
  if (/email not confirmed/i.test(message)) return 'Open the confirmation link in your email before logging in. Check your spam folder too.'
  if (/already registered/i.test(message)) return 'You may already have an account. Try logging in or resetting your password.'
  if (/rate limit|too many/i.test(message)) return 'Too many attempts. Please wait a few minutes before trying again.'
  if (/password/i.test(message)) return 'Choose a stronger password with at least 6 characters.'
  if (/fetch|network|timeout|timed out|abort/i.test(message)) return 'We could not reach the account service. Please try again shortly. You can still use our free topic guides and quizzes without an account.'
  if (/signup.*disabled|signups.*not allowed/i.test(message)) return 'Account creation is temporarily unavailable. You can still practise without an account.'
  return 'We could not complete that request. Please try again. If you already have an account, try logging in or resetting your password.'
}

export async function withAuthTimeout<T>(operation: PromiseLike<T>, milliseconds = 15000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([Promise.resolve(operation), new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error('Account service timed out')), milliseconds) })])
  } finally { clearTimeout(timer) }
}

export function callbackIntent(search: string, hash: string): { recovery: boolean; failed: boolean } {
  const query = new URLSearchParams(search)
  const fragment = new URLSearchParams(hash.replace(/^#/, ''))
  return { recovery: query.get('flow') === 'recovery' || fragment.get('type') === 'recovery', failed: query.has('error') || fragment.has('error') || query.has('error_description') || fragment.has('error_description') }
}
