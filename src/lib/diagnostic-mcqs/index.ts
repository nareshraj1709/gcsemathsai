import type { TopicMCQSet } from './types'
import { NUMBER_MCQS } from './number'
import { ALGEBRA_MCQS } from './algebra'
import { GEOMETRY_MCQS } from './geometry'
import { RATIO_MCQS } from './ratio'
import { STATISTICS_MCQS } from './statistics'

const ALL_SETS: TopicMCQSet[] = [
  ...NUMBER_MCQS,
  ...ALGEBRA_MCQS,
  ...GEOMETRY_MCQS,
  ...RATIO_MCQS,
  ...STATISTICS_MCQS,
]

const BY_SLUG = new Map(ALL_SETS.map(s => [s.topicSlug, s]))

export function getAllDiagnosticSets(): TopicMCQSet[] {
  return ALL_SETS
}

export function getDiagnosticSet(slug: string): TopicMCQSet | undefined {
  return BY_SLUG.get(slug)
}
