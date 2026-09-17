export const PROGRESS_KEY = 'gcse-diagnostic-progress-v1'
export type QuizProgress = { slug: string; title: string; score: number; total: number; completedAt: string }
export function readProgress(raw: string | null): QuizProgress[] {
  try {
    const data: unknown = JSON.parse(raw || '[]')
    if (!Array.isArray(data)) return []
    return data.filter((x): x is QuizProgress => !!x && typeof x.slug === 'string' && /^[a-z0-9-]+$/.test(x.slug)
      && typeof x.title === 'string' && x.title.length <= 200 && Number.isInteger(x.score)
      && Number.isInteger(x.total) && x.total > 0 && x.score >= 0 && x.score <= x.total
      && typeof x.completedAt === 'string' && Number.isFinite(Date.parse(x.completedAt))).slice(0, 245)
  } catch { return [] }
}
export function updateProgress(previous: QuizProgress[], result: QuizProgress): QuizProgress[] {
  return [result, ...previous.filter(x => x.slug !== result.slug)].slice(0, 245)
}
export function saveProgress(result: QuizProgress): boolean {
  try {
    const previous = readProgress(localStorage.getItem(PROGRESS_KEY))
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updateProgress(previous, result)))
    window.dispatchEvent(new Event('gcse-progress-updated'))
    return true
  } catch { return false }
}
