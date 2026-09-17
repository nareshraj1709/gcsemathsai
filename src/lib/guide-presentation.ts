export type GuideKind = 'study' | 'algebra' | 'geometry' | 'data' | 'exam' | 'formula'
export type GuideCard = { slug: string; title: string; excerpt: string; category: string; author: string; date: string; readMins: number }
export const GUIDE_GROUPS = ['All guides', 'Revision & exams', 'Algebra', 'Geometry', 'Number & data'] as const
export function guideKind(slug: string, category = ''): GuideKind {
  const value = `${slug} ${category}`.toLowerCase()
  if (/formula/.test(value)) return 'formula'
  if (/algebra|equation|quadratic|indices|surds|function|sequence|iteration|completing/.test(value)) return 'algebra'
  if (/geometry|trig|pythagoras|circle|vector|shape|loci|construction|angle|bearings/.test(value)) return 'geometry'
  if (/statistic|probability|histogram|frequency|venn|proportion|number|calculator|standard-form/.test(value)) return 'data'
  if (/board|aqa|edexcel|ocr|paper|boundary|boundaries|exam-technique/.test(value)) return 'exam'
  return 'study'
}
export function guideGroup(guide: GuideCard): string {
  const kind = guideKind(guide.slug, guide.category)
  return kind === 'algebra' ? 'Algebra' : kind === 'geometry' ? 'Geometry' : kind === 'data' ? 'Number & data' : 'Revision & exams'
}
export function filterGuides(guides: GuideCard[], group: string, query: string): GuideCard[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  return guides.filter(guide => (group === 'All guides' || guideGroup(guide) === group)
    && words.every(word => `${guide.title} ${guide.excerpt} ${guide.category}`.toLowerCase().includes(word)))
}
