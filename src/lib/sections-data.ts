export type SectionTier = 'Both' | 'Higher'

export type Section = {
  id: string
  number: number
  name: string
  topic: string
  subtopic: string
  color: string       // tailwind text colour
  bgColor: string     // tailwind bg colour
  borderColor: string // tailwind border colour
  icon: string
  tier: SectionTier
  description: string
}

export const SECTIONS: Section[] = [
  {
    id: 'fractions-decimals', number: 1, name: 'Fractions & Decimals',
    topic: 'Number', subtopic: 'Fractions and Decimals',
    color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE',
    icon: '½', tier: 'Both',
    description: 'Simplify, convert and calculate with fractions and decimals',
  },
  {
    id: 'percentages', number: 2, name: 'Percentages',
    topic: 'Number', subtopic: 'Percentages',
    color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE',
    icon: '%', tier: 'Both',
    description: 'Percentage increases, decreases, reverse percentages and interest',
  },
  {
    id: 'powers-standard-form', number: 3, name: 'Powers & Standard Form',
    topic: 'Number', subtopic: 'Powers and Standard Form',
    color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE',
    icon: 'xⁿ', tier: 'Both',
    description: 'Laws of indices, standard form calculations and conversions',
  },
  {
    id: 'surds-bounds', number: 4, name: 'Surds & Bounds',
    topic: 'Number', subtopic: 'Surds and Bounds',
    color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE',
    icon: '√', tier: 'Higher',
    description: 'Simplify surds, rationalise denominators, upper and lower bounds',
  },
  {
    id: 'solving-equations', number: 5, name: 'Solving Equations',
    topic: 'Algebra', subtopic: 'Solving Equations',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: 'x=', tier: 'Both',
    description: 'Linear equations, equations with fractions and unknowns on both sides',
  },
  {
    id: 'expanding-factorising', number: 6, name: 'Expanding & Factorising',
    topic: 'Algebra', subtopic: 'Expanding and Factorising',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: '()', tier: 'Both',
    description: 'Single and double brackets, factorising expressions and quadratics',
  },
  {
    id: 'quadratic-equations', number: 7, name: 'Quadratic Equations',
    topic: 'Algebra', subtopic: 'Quadratic Equations',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: 'x²', tier: 'Higher',
    description: 'Quadratic formula, completing the square, factorising quadratics',
  },
  {
    id: 'sequences', number: 8, name: 'Sequences',
    topic: 'Algebra', subtopic: 'Sequences',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: '…', tier: 'Both',
    description: 'Arithmetic and geometric sequences, nth term rules',
  },
  {
    id: 'graphs-functions', number: 9, name: 'Graphs & Functions',
    topic: 'Algebra', subtopic: 'Graphs and Functions',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: 'f(x)', tier: 'Both',
    description: 'Straight line graphs, y=mx+c, quadratic and other curves',
  },
  {
    id: 'simultaneous-equations', number: 10, name: 'Simultaneous Equations',
    topic: 'Algebra', subtopic: 'Simultaneous Equations',
    color: '#2563EB', bgColor: '#EFF6FF', borderColor: '#BFDBFE',
    icon: '{ }', tier: 'Higher',
    description: 'Elimination, substitution and graphical methods',
  },
  {
    id: 'angles-shapes', number: 11, name: 'Angles & Properties of Shapes',
    topic: 'Geometry', subtopic: 'Angles and Properties of Shapes',
    color: '#059669', bgColor: '#F0FDF4', borderColor: '#A7F3D0',
    icon: '∠', tier: 'Both',
    description: 'Angle rules, triangles, polygons, parallel lines and bearings',
  },
  {
    id: 'pythagoras-trigonometry', number: 12, name: 'Pythagoras & Trigonometry',
    topic: 'Geometry', subtopic: 'Pythagoras and Trigonometry',
    color: '#059669', bgColor: '#F0FDF4', borderColor: '#A7F3D0',
    icon: '△', tier: 'Both',
    description: 'Pythagoras theorem, SOH CAH TOA, sine rule and cosine rule',
  },
  {
    id: 'circle-theorems', number: 13, name: 'Circle Theorems',
    topic: 'Geometry', subtopic: 'Circle Theorems',
    color: '#059669', bgColor: '#F0FDF4', borderColor: '#A7F3D0',
    icon: '○', tier: 'Higher',
    description: 'All 8 circle theorems with proofs and applications',
  },
  {
    id: 'area-volume', number: 14, name: 'Area, Volume & Surface Area',
    topic: 'Geometry', subtopic: 'Area Volume and Surface Area',
    color: '#059669', bgColor: '#F0FDF4', borderColor: '#A7F3D0',
    icon: '□', tier: 'Both',
    description: 'Areas, perimeters, volumes and surface areas of 2D and 3D shapes',
  },
  {
    id: 'vectors-transformations', number: 15, name: 'Vectors & Transformations',
    topic: 'Geometry', subtopic: 'Vectors and Transformations',
    color: '#059669', bgColor: '#F0FDF4', borderColor: '#A7F3D0',
    icon: '→', tier: 'Higher',
    description: 'Vector notation, column vectors, translations, rotations and enlargements',
  },
  {
    id: 'averages-spread', number: 16, name: 'Averages & Spread',
    topic: 'Statistics', subtopic: 'Averages and Spread',
    color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A',
    icon: 'x̄', tier: 'Both',
    description: 'Mean, median, mode, range, IQR and standard deviation',
  },
  {
    id: 'charts-diagrams', number: 17, name: 'Charts & Diagrams',
    topic: 'Statistics', subtopic: 'Charts and Diagrams',
    color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A',
    icon: '📊', tier: 'Both',
    description: 'Bar charts, histograms, cumulative frequency, box plots and scatter graphs',
  },
  {
    id: 'probability-tree', number: 18, name: 'Probability & Tree Diagrams',
    topic: 'Probability', subtopic: 'Probability and Tree Diagrams',
    color: '#DB2777', bgColor: '#FDF2F8', borderColor: '#FBCFE8',
    icon: '🎲', tier: 'Both',
    description: 'Basic probability, combined events, tree diagrams and conditional probability',
  },
  {
    id: 'venn-diagrams', number: 19, name: 'Venn Diagrams',
    topic: 'Statistics', subtopic: 'Venn Diagrams',
    color: '#D97706', bgColor: '#FFFBEB', borderColor: '#FDE68A',
    icon: '⊂', tier: 'Higher',
    description: 'Set notation, Venn diagrams, union and intersection',
  },
  {
    id: 'ratio-proportion', number: 20, name: 'Ratio & Proportion',
    topic: 'Number', subtopic: 'Ratio and Proportion',
    color: '#7C3AED', bgColor: '#F5F3FF', borderColor: '#DDD6FE',
    icon: '∶', tier: 'Both',
    description: 'Simplify ratios, share amounts, direct and inverse proportion',
  },
]

export function getSection(id: string): Section | undefined {
  return SECTIONS.find(s => s.id === id)
}
