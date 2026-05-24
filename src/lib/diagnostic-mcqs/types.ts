export interface DiagnosticMCQ {
  id: string
  topicSlug: string
  question: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
  misconception: string
  tier: 'Foundation' | 'Higher' | 'Both'
}

export interface TopicMCQSet {
  topicSlug: string
  topicTitle: string
  strand: string
  questions: DiagnosticMCQ[]
}
