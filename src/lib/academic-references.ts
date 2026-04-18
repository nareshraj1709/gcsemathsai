/**
 * Academic reference links for GCSE Maths topics.
 * Maps topic categories/keywords to relevant pages from:
 * - NRICH (University of Cambridge)
 * - MIT OpenCourseWare
 * - Corbett Maths
 *
 * All links are to free, publicly accessible pages. We link, not copy.
 */

type Reference = {
  source: 'NRICH' | 'MIT OpenCourseWare' | 'Corbett Maths'
  org: string
  title: string
  url: string
  description: string
}

// Keyword-based matching — we check if the topic slug or title contains these terms
const REFERENCE_MAP: { keywords: string[]; refs: Reference[] }[] = [
  // ─── NUMBER ─────────────────────────────────────────────
  {
    keywords: ['fractions', 'fraction'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Fractions — Interactive Problems', url: 'https://nrich.maths.org/fractions', description: 'Problem-solving activities exploring fractions in depth.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Fractions Practice & Videos', url: 'https://corbettmaths.com/contents/?enable=fractions', description: 'Video tutorials and practice questions on all fraction operations.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Arithmetic & Pre-Algebra', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', description: 'MIT foundations — rational numbers and fraction arithmetic.' },
    ],
  },
  {
    keywords: ['decimals', 'decimal'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Decimals — Activities', url: 'https://nrich.maths.org/decimals', description: 'Cambridge problems exploring place value and decimal operations.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Decimals', url: 'https://corbettmaths.com/contents/?enable=decimals', description: 'Full coverage of decimal operations with worked examples.' },
    ],
  },
  {
    keywords: ['percentages', 'percentage', 'percent'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Percentages — Problems', url: 'https://nrich.maths.org/percentages', description: 'Real-world percentage problems from Cambridge NRICH.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Percentages', url: 'https://corbettmaths.com/contents/?enable=percentages', description: 'Percentage increase, decrease, reverse — videos and practice.' },
    ],
  },
  {
    keywords: ['factors', 'primes', 'multiples', 'hcf', 'lcm', 'prime'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Factors & Multiples', url: 'https://nrich.maths.org/factors-and-multiples', description: 'Cambridge investigation tasks on HCF, LCM and prime factorisation.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Factors, Multiples & Primes', url: 'https://corbettmaths.com/contents/?enable=factors', description: 'Prime factor trees, HCF and LCM methods with worked examples.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Number Theory — Primes', url: 'https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/', description: 'MIT introduction to number theory and prime numbers.' },
    ],
  },
  {
    keywords: ['powers', 'roots', 'indices', 'index', 'surd'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Powers & Roots', url: 'https://nrich.maths.org/powers-and-roots', description: 'Exploration of index laws and surds from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Indices & Surds', url: 'https://corbettmaths.com/contents/?enable=indices', description: 'Rules of indices, fractional and negative powers explained.' },
    ],
  },
  {
    keywords: ['standard-form', 'standard form'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Standard Form', url: 'https://corbettmaths.com/contents/?enable=standard+form', description: 'Converting to and from standard form with practice questions.' },
      { source: 'NRICH', org: 'University of Cambridge', title: 'Big and Small Numbers', url: 'https://nrich.maths.org/standard-form', description: 'Real-world contexts for very large and very small numbers.' },
    ],
  },
  {
    keywords: ['bounds', 'accuracy', 'rounding', 'truncation'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Bounds & Accuracy', url: 'https://corbettmaths.com/contents/?enable=bounds', description: 'Upper and lower bounds, error intervals, truncation.' },
    ],
  },
  {
    keywords: ['recurring', 'recurring-decimal'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Recurring Decimals', url: 'https://corbettmaths.com/contents/?enable=recurring+decimals', description: 'Converting recurring decimals to fractions and back.' },
      { source: 'NRICH', org: 'University of Cambridge', title: 'Recurring Decimals', url: 'https://nrich.maths.org/recurring-decimals', description: 'Why do some fractions recur? Cambridge investigation.' },
    ],
  },

  // ─── ALGEBRA ────────────────────────────────────────────
  {
    keywords: ['simplif', 'expression', 'expanding', 'brackets', 'factoris'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Algebra — Expressions', url: 'https://nrich.maths.org/algebra', description: 'Algebraic thinking and problem-solving from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Algebra', url: 'https://corbettmaths.com/contents/?enable=algebra', description: 'Expanding brackets, factorising, collecting like terms.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Algebra I', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', description: 'MIT foundational algebra — expressions and equations.' },
    ],
  },
  {
    keywords: ['linear', 'equation', 'solving'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Equations & Identities', url: 'https://nrich.maths.org/equations', description: 'Cambridge challenges on forming and solving equations.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Solving Equations', url: 'https://corbettmaths.com/contents/?enable=equations', description: 'Step-by-step methods for linear and more complex equations.' },
    ],
  },
  {
    keywords: ['simultaneous'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Simultaneous Equations', url: 'https://nrich.maths.org/simultaneous-equations', description: 'Cambridge problems using elimination and substitution methods.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Simultaneous Equations', url: 'https://corbettmaths.com/contents/?enable=simultaneous', description: 'Algebraic and graphical methods for simultaneous equations.' },
    ],
  },
  {
    keywords: ['quadratic', 'completing-the-square', 'quadratic-formula'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Quadratics', url: 'https://nrich.maths.org/quadratics', description: 'Quadratic equations and graphs — Cambridge problem sets.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Quadratics', url: 'https://corbettmaths.com/contents/?enable=quadratics', description: 'Factorising, formula, completing the square — all methods.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Quadratic Functions', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', description: 'MIT treatment of quadratic functions and their properties.' },
    ],
  },
  {
    keywords: ['inequalit'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Inequalities', url: 'https://corbettmaths.com/contents/?enable=inequalities', description: 'Solving and graphing linear and quadratic inequalities.' },
      { source: 'NRICH', org: 'University of Cambridge', title: 'Inequalities', url: 'https://nrich.maths.org/inequalities', description: 'Cambridge problems exploring inequality reasoning.' },
    ],
  },
  {
    keywords: ['sequence', 'nth-term', 'nth term', 'geometric'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Sequences', url: 'https://nrich.maths.org/sequences', description: 'Pattern spotting and general terms — Cambridge activities.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Sequences', url: 'https://corbettmaths.com/contents/?enable=sequences', description: 'Arithmetic and geometric sequences with nth term formulas.' },
    ],
  },
  {
    keywords: ['graph', 'straight-line', 'y-mx-c', 'gradient', 'intercept'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Graphs & Coordinates', url: 'https://nrich.maths.org/graphs', description: 'Graphing activities and coordinate geometry from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Straight Line Graphs', url: 'https://corbettmaths.com/contents/?enable=straight+line+graphs', description: 'Plotting, gradient, y-intercept, and equation of a line.' },
    ],
  },
  {
    keywords: ['function', 'composite', 'inverse-function'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Functions', url: 'https://nrich.maths.org/functions', description: 'Function notation, composition and inverses — Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Functions', url: 'https://corbettmaths.com/contents/?enable=functions', description: 'Function notation, composite and inverse functions.' },
    ],
  },
  {
    keywords: ['iteration', 'trial'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Iteration', url: 'https://corbettmaths.com/contents/?enable=iteration', description: 'Iterative methods for solving equations.' },
    ],
  },
  {
    keywords: ['proof', 'algebraic-proof'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Mathematical Proof', url: 'https://nrich.maths.org/proof', description: 'Introduction to proof and logical reasoning — Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Algebraic Proof', url: 'https://corbettmaths.com/contents/?enable=proof', description: 'Proving algebraic identities and results.' },
    ],
  },

  // ─── GEOMETRY ───────────────────────────────────────────
  {
    keywords: ['angle', 'parallel', 'polygon'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Angles & Polygons', url: 'https://nrich.maths.org/angles', description: 'Angle properties and polygon investigations from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Angles', url: 'https://corbettmaths.com/contents/?enable=angles', description: 'Angle rules, parallel lines, interior and exterior angles.' },
    ],
  },
  {
    keywords: ['area', 'perimeter', 'circle', 'sector', 'arc'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Area & Perimeter', url: 'https://nrich.maths.org/area-and-perimeter', description: 'Cambridge problems on area, circumference, arcs and sectors.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Area & Circles', url: 'https://corbettmaths.com/contents/?enable=area', description: 'Area formulas, circle calculations, sectors and segments.' },
    ],
  },
  {
    keywords: ['volume', 'surface-area', 'prism', 'cylinder', 'cone', 'sphere'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: '3D Shapes & Volume', url: 'https://nrich.maths.org/3d-shapes', description: 'Volume and surface area explorations from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Volume', url: 'https://corbettmaths.com/contents/?enable=volume', description: 'Volume of prisms, cylinders, cones, spheres and compound shapes.' },
    ],
  },
  {
    keywords: ['pythagoras', 'pythagorean'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: "Pythagoras' Theorem", url: 'https://nrich.maths.org/pythagoras', description: "Cambridge investigations using Pythagoras' theorem." },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: "Pythagoras' Theorem", url: 'https://corbettmaths.com/contents/?enable=pythagoras', description: 'Finding missing sides in right-angled triangles.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Geometry — Euclidean', url: 'https://ocw.mit.edu/courses/18-901-introduction-to-topology-fall-2004/', description: 'MIT geometric foundations including the Pythagorean theorem.' },
    ],
  },
  {
    keywords: ['trigonometry', 'trig', 'sohcahtoa', 'sine', 'cosine', 'tangent', 'sin', 'cos', 'tan'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Trigonometry', url: 'https://nrich.maths.org/trigonometry', description: 'Cambridge problems on trigonometric ratios and applications.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Trigonometry', url: 'https://corbettmaths.com/contents/?enable=trigonometry', description: 'SOHCAHTOA, sine rule, cosine rule — full GCSE coverage.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Trigonometry', url: 'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/', description: 'MIT trigonometric functions and their applications.' },
    ],
  },
  {
    keywords: ['circle-theorem', 'circle theorem'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Circle Theorems', url: 'https://nrich.maths.org/circle-theorems', description: 'All seven circle theorems with Cambridge investigations.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Circle Theorems', url: 'https://corbettmaths.com/contents/?enable=circle+theorems', description: 'Each circle theorem explained with diagrams and examples.' },
    ],
  },
  {
    keywords: ['vector'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Vectors', url: 'https://nrich.maths.org/vectors', description: 'Vector addition, subtraction, and proof problems — Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Vectors', url: 'https://corbettmaths.com/contents/?enable=vectors', description: 'Column vectors, magnitude, and vector geometry.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Vectors & Matrices', url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/', description: 'MIT introduction to vectors in two and three dimensions.' },
    ],
  },
  {
    keywords: ['transform', 'rotation', 'reflection', 'translation', 'enlargement'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Transformations', url: 'https://nrich.maths.org/transformations', description: 'Transformation geometry from Cambridge NRICH.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Transformations', url: 'https://corbettmaths.com/contents/?enable=transformations', description: 'Reflections, rotations, translations, and enlargements.' },
    ],
  },
  {
    keywords: ['bearing', 'construct', 'loci', 'locus'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Bearings & Constructions', url: 'https://corbettmaths.com/contents/?enable=bearings', description: 'Three-figure bearings, constructions, and loci.' },
    ],
  },
  {
    keywords: ['similar', 'congruent', 'congruence'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Similarity & Congruence', url: 'https://nrich.maths.org/similarity', description: 'Cambridge problems on similar and congruent shapes.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Similar Shapes', url: 'https://corbettmaths.com/contents/?enable=similar', description: 'Similarity ratios, area and volume scale factors.' },
    ],
  },

  // ─── RATIO & PROPORTION ─────────────────────────────────
  {
    keywords: ['ratio', 'proportion', 'direct', 'inverse'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Ratio & Proportion', url: 'https://nrich.maths.org/ratio-and-proportion', description: 'Cambridge problem-solving with ratio and proportion.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Ratio', url: 'https://corbettmaths.com/contents/?enable=ratio', description: 'Simplifying, sharing in a ratio, and proportion problems.' },
    ],
  },
  {
    keywords: ['speed', 'distance', 'time', 'density', 'pressure', 'compound-measure'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Compound Measures', url: 'https://corbettmaths.com/contents/?enable=compound+measures', description: 'Speed, density, pressure — formula triangle methods.' },
    ],
  },
  {
    keywords: ['interest', 'growth', 'decay', 'depreciation'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Compound Interest', url: 'https://corbettmaths.com/contents/?enable=compound+interest', description: 'Simple and compound interest, growth and decay.' },
    ],
  },

  // ─── STATISTICS & PROBABILITY ───────────────────────────
  {
    keywords: ['mean', 'median', 'mode', 'average', 'frequency'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Averages & Spread', url: 'https://nrich.maths.org/averages', description: 'Cambridge problems exploring averages in context.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Averages', url: 'https://corbettmaths.com/contents/?enable=averages', description: 'Mean, median, mode, range — from tables and lists.' },
    ],
  },
  {
    keywords: ['probability', 'tree-diagram', 'venn', 'conditional'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Probability', url: 'https://nrich.maths.org/probability', description: 'Probability investigations and games from Cambridge.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Probability', url: 'https://corbettmaths.com/contents/?enable=probability', description: 'Tree diagrams, Venn diagrams, and conditional probability.' },
      { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Probability & Statistics', url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/', description: 'MIT introduction to probability theory.' },
    ],
  },
  {
    keywords: ['cumulative', 'box-plot', 'histogram', 'scatter', 'chart', 'graph-data'],
    refs: [
      { source: 'NRICH', org: 'University of Cambridge', title: 'Data Handling', url: 'https://nrich.maths.org/data', description: 'Cambridge data interpretation and representation tasks.' },
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Statistics', url: 'https://corbettmaths.com/contents/?enable=statistics', description: 'Histograms, cumulative frequency, box plots, scatter graphs.' },
    ],
  },
  {
    keywords: ['sampling'],
    refs: [
      { source: 'Corbett Maths', org: 'Corbett Maths', title: 'Sampling', url: 'https://corbettmaths.com/contents/?enable=sampling', description: 'Random, systematic, and stratified sampling methods.' },
    ],
  },
]

// Fallback references for any topic that doesn't match specific keywords
const FALLBACK_REFS: Reference[] = [
  { source: 'NRICH', org: 'University of Cambridge', title: 'GCSE Mathematics Resources', url: 'https://nrich.maths.org/secondary', description: 'Free problem-solving resources for secondary mathematics from Cambridge.' },
  { source: 'Corbett Maths', org: 'Corbett Maths', title: 'GCSE Maths — Full Coverage', url: 'https://corbettmaths.com/contents/', description: 'Videos, worksheets, and practice for every GCSE Maths topic.' },
  { source: 'MIT OpenCourseWare', org: 'Massachusetts Institute of Technology', title: 'Mathematics', url: 'https://ocw.mit.edu/courses/mathematics/', description: 'Free university-level mathematics courses from MIT.' },
]

/**
 * Get academic references for a given topic.
 * Matches based on slug and title keywords.
 */
export function getAcademicReferences(slug: string, title: string): Reference[] {
  const searchText = `${slug} ${title}`.toLowerCase()
  const matched: Reference[] = []
  const seenUrls = new Set<string>()

  for (const entry of REFERENCE_MAP) {
    if (entry.keywords.some(kw => searchText.includes(kw.toLowerCase()))) {
      for (const ref of entry.refs) {
        if (!seenUrls.has(ref.url)) {
          seenUrls.add(ref.url)
          matched.push(ref)
        }
      }
    }
  }

  // If we found matches, return them (up to 4)
  if (matched.length > 0) return matched.slice(0, 4)

  // Otherwise return fallbacks
  return FALLBACK_REFS
}
