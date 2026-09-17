type LearningEvent = 'quiz_start' | 'quiz_answer' | 'quiz_complete' | 'quiz_retry'

/** Only curriculum identifiers and aggregate results; never answers or student details. */
export function trackLearning(event: LearningEvent, topic: string, values: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return
  const client = window as Window & { gtag?: (...args: unknown[]) => void }
  try { client.gtag?.('event', event, { topic_slug: topic, activity_type: 'diagnostic', ...values }) } catch { /* Analytics must never interrupt a quiz. */ }
}
