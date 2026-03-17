// ── GCSE Maths Study Content ─────────────────────────────────
// Aligned to AQA, Edexcel and OCR specifications (Foundation & Higher)

export type Formula = {
  name: string
  formula: string
  notes?: string
}

export type WorkedExample = {
  question: string
  steps: string[]
  answer: string
}

export type SubtopicContent = {
  topic: string
  subtopic: string
  tier: 'Foundation' | 'Higher' | 'Both'
  overview: string
  keyFacts: string[]
  formulas?: Formula[]
  workedExamples: WorkedExample[]
  commonMistakes: string[]
  examTips: string[]
  videoSearchTerms?: string[]
}

// Helper: generate a URL slug from topic + subtopic
export function toSlug(topic: string, subtopic: string) {
  return `${topic}__${subtopic}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function fromSlug(slug: string): { topic: string; subtopic: string } | null {
  // Match against all known content
  const entry = CONTENT.find(c => toSlug(c.topic, c.subtopic) === slug)
  if (!entry) return null
  return { topic: entry.topic, subtopic: entry.subtopic }
}

export const CONTENT: SubtopicContent[] = [

  // ══════════════════════════════════════════════════
  // NUMBER
  // ══════════════════════════════════════════════════

  {
    topic: 'Number',
    subtopic: 'Fractions',
    videoSearchTerms: ['GCSE maths fractions', 'adding fractions GCSE', 'multiplying and dividing fractions GCSE', 'mixed numbers improper fractions GCSE'],
    tier: 'Both',
    overview: 'Fractions represent parts of a whole. You need to add, subtract, multiply and divide fractions, and convert between fractions, decimals and percentages.',
    keyFacts: [
      'To add or subtract fractions, find a common denominator first.',
      'To multiply fractions: multiply numerators together and denominators together.',
      'To divide by a fraction: flip it (find the reciprocal) and multiply.',
      'A mixed number like 2½ = 5/2 as an improper fraction.',
      'Always simplify your answer by dividing by the highest common factor (HCF).',
    ],
    formulas: [
      { name: 'Add/Subtract', formula: 'a/b ± c/d = (ad ± bc) / bd', notes: 'Find common denominator first' },
      { name: 'Multiply', formula: 'a/b × c/d = ac / bd' },
      { name: 'Divide', formula: 'a/b ÷ c/d = a/b × d/c = ad / bc', notes: 'Flip the second fraction' },
    ],
    workedExamples: [
      {
        question: 'Work out 2/3 + 3/4',
        steps: [
          'Find the LCM of 3 and 4 → LCM = 12',
          '2/3 = 8/12 and 3/4 = 9/12',
          '8/12 + 9/12 = 17/12',
          'Convert to mixed number: 1 5/12',
        ],
        answer: '1 5/12',
      },
      {
        question: 'Work out 3½ ÷ 7/8',
        steps: [
          'Convert 3½ to an improper fraction: 7/2',
          'Flip 7/8 to get 8/7',
          '7/2 × 8/7 = 56/14',
          'Simplify: 56 ÷ 14 = 4',
        ],
        answer: '4',
      },
    ],
    commonMistakes: [
      'Adding denominators instead of finding a common denominator (e.g. writing 1/2 + 1/3 = 2/5).',
      'Forgetting to flip when dividing — you flip the second fraction, not the first.',
      'Not simplifying the final answer.',
    ],
    examTips: [
      'Show your common denominator working — examiners award method marks even if your final answer is wrong.',
      'Convert mixed numbers to improper fractions before multiplying or dividing.',
    ],
  },

  {
    topic: 'Number',
    subtopic: 'Percentages',
    videoSearchTerms: ['GCSE percentages of amounts', 'percentage multiplier GCSE', 'percentage increase decrease GCSE', 'converting fractions decimals percentages GCSE'],
    tier: 'Both',
    overview: 'Percentages mean "out of 100". You need to find percentages of amounts, convert between fractions/decimals/percentages, and use percentage multipliers.',
    keyFacts: [
      'To find x% of an amount: multiply by x/100 (or the decimal equivalent).',
      'Percentage → Decimal: divide by 100 (e.g. 35% = 0.35).',
      'Decimal → Percentage: multiply by 100.',
      'Fraction → Percentage: divide numerator by denominator, then × 100.',
      'A multiplier for an increase of 15% is 1.15; a decrease of 15% is 0.85.',
    ],
    formulas: [
      { name: 'Percentage of an amount', formula: '(Percentage ÷ 100) × Amount' },
      { name: 'Percentage multiplier (increase)', formula: '1 + (percentage ÷ 100)' },
      { name: 'Percentage multiplier (decrease)', formula: '1 − (percentage ÷ 100)' },
    ],
    workedExamples: [
      {
        question: 'Find 35% of £240',
        steps: [
          '35% = 0.35',
          '0.35 × 240 = 84',
        ],
        answer: '£84',
      },
      {
        question: 'Increase £360 by 22%',
        steps: [
          'Multiplier = 1 + 0.22 = 1.22',
          '1.22 × 360 = £439.20',
        ],
        answer: '£439.20',
      },
    ],
    commonMistakes: [
      'Finding 10% and then trying to build up incorrectly (e.g. 35% ≠ 30% + 5% done wrong).',
      'Using the wrong multiplier for a decrease (using 1.15 instead of 0.85 for a 15% decrease).',
    ],
    examTips: [
      'Use the multiplier method — it\'s faster and less error-prone than building up from 10%.',
      'Always re-read whether the question says "of the original" or "of the new value".',
    ],
  },

  {
    topic: 'Number',
    subtopic: 'Percentage change',
    videoSearchTerms: ['GCSE percentage change', 'compound interest GCSE maths', 'percentage increase decrease GCSE', 'reverse percentage GCSE'],
    tier: 'Both',
    overview: 'Percentage change measures how much a quantity has increased or decreased relative to its original value.',
    keyFacts: [
      'Percentage change = (change ÷ original) × 100.',
      'A positive result is a percentage increase; negative is a percentage decrease.',
      'The original value is always the starting value — not the new one.',
      'Compound interest applies a percentage change repeatedly over multiple periods.',
    ],
    formulas: [
      { name: 'Percentage change', formula: '((New − Original) ÷ Original) × 100' },
      { name: 'Compound interest', formula: 'Final = Principal × (1 + r/100)ⁿ', notes: 'r = rate, n = number of periods' },
    ],
    workedExamples: [
      {
        question: 'A jacket costs £80 and is reduced to £60. Find the percentage decrease.',
        steps: [
          'Change = 80 − 60 = 20',
          'Percentage decrease = (20 ÷ 80) × 100',
          '= 0.25 × 100 = 25%',
        ],
        answer: '25% decrease',
      },
      {
        question: '£500 is invested for 3 years at 4% compound interest per year. Find the final amount.',
        steps: [
          'Multiplier = 1.04',
          'After 3 years: 500 × 1.04³',
          '1.04³ = 1.124864',
          '500 × 1.124864 = £562.43',
        ],
        answer: '£562.43',
      },
    ],
    commonMistakes: [
      'Dividing by the new value instead of the original value.',
      'Using simple interest instead of compound interest when the question says "compound".',
    ],
    examTips: [
      'Highlight the word "original" in the question — it\'s always the denominator.',
      'For compound interest, use the multiplier raised to a power rather than calculating year by year.',
    ],
  },

  {
    topic: 'Number',
    subtopic: 'Standard form',
    videoSearchTerms: ['GCSE standard form', 'standard index form GCSE', 'multiplying standard form GCSE', 'standard form calculations GCSE'],
    tier: 'Both',
    overview: 'Standard form (scientific notation) is a way of writing very large or very small numbers using powers of 10.',
    keyFacts: [
      'Standard form: A × 10ⁿ where 1 ≤ A < 10 and n is an integer.',
      'Positive powers of 10 → large numbers (move decimal right).',
      'Negative powers of 10 → small numbers (move decimal left).',
      'To multiply in standard form: multiply the A values and add the powers.',
      'To divide in standard form: divide the A values and subtract the powers.',
    ],
    formulas: [
      { name: 'Multiply', formula: '(A × 10ᵐ) × (B × 10ⁿ) = AB × 10^(m+n)' },
      { name: 'Divide', formula: '(A × 10ᵐ) ÷ (B × 10ⁿ) = (A/B) × 10^(m−n)' },
    ],
    workedExamples: [
      {
        question: 'Write 0.000034 in standard form.',
        steps: [
          'Move the decimal point to get a number between 1 and 10: 3.4',
          'Count how many places the decimal moved: 5 places to the right',
          'So the power is −5',
        ],
        answer: '3.4 × 10⁻⁵',
      },
      {
        question: 'Work out (3 × 10⁴) × (2 × 10³)',
        steps: [
          'Multiply the numbers: 3 × 2 = 6',
          'Add the powers: 4 + 3 = 7',
          '= 6 × 10⁷',
        ],
        answer: '6 × 10⁷',
      },
    ],
    commonMistakes: [
      'Writing A as a number ≥ 10 or < 1 (e.g. 34 × 10⁻⁶ is not standard form).',
      'Subtracting instead of adding powers when multiplying.',
      'Forgetting to adjust A back to the range 1–10 after calculating.',
    ],
    examTips: [
      'After any calculation, always check that A is between 1 and 10.',
      'On a calculator, use the EXP or ×10ˣ button — don\'t type × 10 separately.',
    ],
  },

  {
    topic: 'Number',
    subtopic: 'Powers & roots',
    videoSearchTerms: ['GCSE powers and indices', 'laws of indices GCSE', 'index laws GCSE maths', 'negative fractional indices GCSE'],
    tier: 'Both',
    overview: 'Powers (indices) tell you how many times to multiply a number by itself. Roots are the inverse operation.',
    keyFacts: [
      'a² means a × a; a³ means a × a × a.',
      '√a is the square root of a (the positive root unless stated otherwise).',
      '∛a is the cube root of a.',
      'Any number to the power 0 = 1 (e.g. 5⁰ = 1).',
      'Any number to the power 1 = itself.',
      'Negative power: a⁻ⁿ = 1/aⁿ',
    ],
    formulas: [
      { name: 'Multiply same base', formula: 'aᵐ × aⁿ = a^(m+n)' },
      { name: 'Divide same base', formula: 'aᵐ ÷ aⁿ = a^(m−n)' },
      { name: 'Power of a power', formula: '(aᵐ)ⁿ = a^(mn)' },
      { name: 'Negative index', formula: 'a⁻ⁿ = 1/aⁿ' },
    ],
    workedExamples: [
      {
        question: 'Simplify 2⁵ × 2³',
        steps: ['Same base (2), so add the powers: 5 + 3 = 8'],
        answer: '2⁸ = 256',
      },
      {
        question: 'Evaluate 4⁻²',
        steps: ['4⁻² = 1/4² = 1/16'],
        answer: '1/16',
      },
    ],
    commonMistakes: [
      'Multiplying the bases instead of adding the powers (e.g. 2³ × 2⁴ ≠ 4⁷).',
      'Thinking a negative power gives a negative answer — it gives a fraction.',
    ],
    examTips: [
      'Only add/subtract powers when the bases are the same.',
      'Learn the squares to 15² and cubes to 5³ — saves time in non-calculator papers.',
    ],
  },

  {
    topic: 'Number',
    subtopic: 'Bounds & accuracy',
    videoSearchTerms: ['GCSE upper lower bounds', 'error intervals GCSE maths', 'bounds calculations GCSE', 'truncation rounding bounds GCSE'],
    tier: 'Both',
    overview: 'When a measurement is given to a certain degree of accuracy, the true value lies within an upper and lower bound.',
    keyFacts: [
      'If a value is rounded to the nearest unit, the bounds are ± half a unit.',
      'Lower bound = stated value − half the unit of rounding.',
      'Upper bound = stated value + half the unit of rounding (but the upper bound itself is never reached).',
      'For maximum of a sum: add upper bounds. For minimum of a sum: add lower bounds.',
      'For maximum of a quotient A÷B: use max A and min B.',
    ],
    formulas: [
      { name: 'Lower bound', formula: 'Rounded value − (rounding unit ÷ 2)' },
      { name: 'Upper bound', formula: 'Rounded value + (rounding unit ÷ 2)' },
    ],
    workedExamples: [
      {
        question: 'A length is measured as 8.4 cm to 1 d.p. Write down the upper and lower bounds.',
        steps: [
          'Rounding unit = 0.1 cm, so half = 0.05 cm',
          'Lower bound = 8.4 − 0.05 = 8.35 cm',
          'Upper bound = 8.4 + 0.05 = 8.45 cm',
        ],
        answer: 'LB = 8.35 cm, UB = 8.45 cm',
      },
    ],
    commonMistakes: [
      'Halving the last significant figure incorrectly.',
      'Mixing up which operation needs upper/lower bounds (e.g. for division, max = max ÷ min).',
    ],
    examTips: [
      'Write "LB =" and "UB =" clearly — examiners must see both.',
      'For multi-step calculations with bounds, think about what combination gives the max or min result.',
    ],
  },

  // ══════════════════════════════════════════════════
  // ALGEBRA
  // ══════════════════════════════════════════════════

  {
    topic: 'Algebra',
    subtopic: 'Solving linear equations',
    videoSearchTerms: ['GCSE solving equations', 'linear equations GCSE maths', 'solving equations with brackets GCSE', 'equations both sides GCSE'],
    tier: 'Both',
    overview: 'A linear equation contains an unknown (usually x) to the power 1. You solve it by doing the same operation to both sides until x is isolated.',
    keyFacts: [
      'Whatever you do to one side, you must do to the other.',
      'Aim to get all x terms on one side and all numbers on the other.',
      'If there are brackets, expand them first.',
      'If there are fractions, multiply every term by the denominator to clear them.',
      'Check your answer by substituting back into the original equation.',
    ],
    workedExamples: [
      {
        question: 'Solve 3x + 7 = 22',
        steps: [
          'Subtract 7 from both sides: 3x = 15',
          'Divide both sides by 3: x = 5',
          'Check: 3(5) + 7 = 22 ✓',
        ],
        answer: 'x = 5',
      },
      {
        question: 'Solve 5(2x − 3) = 4x + 9',
        steps: [
          'Expand the bracket: 10x − 15 = 4x + 9',
          'Subtract 4x from both sides: 6x − 15 = 9',
          'Add 15 to both sides: 6x = 24',
          'Divide by 6: x = 4',
        ],
        answer: 'x = 4',
      },
    ],
    commonMistakes: [
      'Forgetting to expand brackets fully before rearranging.',
      'Making sign errors when moving terms across the equals sign.',
      'Dividing by the coefficient of x before moving all x terms to one side.',
    ],
    examTips: [
      'Always check your answer — it takes 10 seconds and earns no marks but prevents costly mistakes.',
      'If x appears on both sides, collect x terms first.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Sequences & nth term',
    videoSearchTerms: ['GCSE nth term linear sequences', 'arithmetic sequences GCSE', 'finding nth term GCSE maths', 'quadratic sequences GCSE'],
    tier: 'Both',
    overview: 'A sequence is a list of numbers following a pattern. The nth term formula lets you find any term without listing them all.',
    keyFacts: [
      'An arithmetic (linear) sequence has a constant difference between consecutive terms.',
      'The nth term of an arithmetic sequence = dn + (a − d), where d = common difference and a = first term.',
      'A geometric sequence has a constant ratio (multiply by the same number each time).',
      'Quadratic sequences have a constant second difference.',
    ],
    formulas: [
      { name: 'nth term (arithmetic)', formula: 'nth term = dn + (a − d)', notes: 'd = common difference, a = first term' },
      { name: 'Alternatively', formula: 'nth term = a + (n−1)d' },
    ],
    workedExamples: [
      {
        question: 'Find the nth term of: 3, 7, 11, 15, ...',
        steps: [
          'Common difference d = 7 − 3 = 4',
          'First term a = 3',
          'nth term = 4n + (3 − 4) = 4n − 1',
          'Check: n=1 → 4(1)−1 = 3 ✓, n=2 → 4(2)−1 = 7 ✓',
        ],
        answer: 'nth term = 4n − 1',
      },
      {
        question: 'Is 95 a term in the sequence 4n − 1?',
        steps: [
          'Set 4n − 1 = 95',
          '4n = 96',
          'n = 24',
          '24 is a positive integer, so yes — it is the 24th term.',
        ],
        answer: 'Yes, 95 is the 24th term.',
      },
    ],
    commonMistakes: [
      'Using the wrong difference (e.g. using the first term instead of the common difference as the coefficient).',
      'Getting the constant term wrong — always double-check with n = 1.',
    ],
    examTips: [
      'Always verify your nth term formula by substituting n = 1 and n = 2.',
      'To check if a value is in a sequence, set the formula equal to the value and check if n is a positive integer.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Straight-line graphs (y = mx + c)',
    videoSearchTerms: ['GCSE y=mx+c gradient intercept', 'straight line graphs GCSE', 'equation of a line GCSE maths', 'parallel perpendicular lines GCSE'],
    tier: 'Both',
    overview: 'The equation y = mx + c describes a straight line. m is the gradient and c is the y-intercept.',
    keyFacts: [
      'Gradient (m) = rise ÷ run = (change in y) ÷ (change in x).',
      'The y-intercept (c) is where the line crosses the y-axis (x = 0).',
      'Parallel lines have the same gradient.',
      'Perpendicular lines have gradients that multiply to −1 (negative reciprocals).',
      'To find the equation of a line: find m first, then substitute a point to find c.',
    ],
    formulas: [
      { name: 'Equation of a line', formula: 'y = mx + c' },
      { name: 'Gradient', formula: 'm = (y₂ − y₁) ÷ (x₂ − x₁)' },
      { name: 'Perpendicular gradient', formula: 'm₂ = −1/m₁' },
    ],
    workedExamples: [
      {
        question: 'Find the equation of the line through (2, 5) and (6, 13).',
        steps: [
          'Gradient m = (13 − 5) ÷ (6 − 2) = 8 ÷ 4 = 2',
          'Use y = 2x + c with point (2, 5): 5 = 2(2) + c → c = 1',
          'Equation: y = 2x + 1',
        ],
        answer: 'y = 2x + 1',
      },
    ],
    commonMistakes: [
      'Swapping the x and y coordinates when calculating gradient.',
      'Reading the y-intercept as the x-intercept (where the line crosses the x-axis).',
      'Confusing parallel (same m) with perpendicular (negative reciprocal m).',
    ],
    examTips: [
      'When drawing a straight-line graph, plot at least 3 points to catch errors.',
      'Rearrange equations like 2y = 4x + 6 → y = 2x + 3 before identifying m and c.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Simultaneous equations',
    videoSearchTerms: ['GCSE simultaneous equations elimination', 'simultaneous equations substitution GCSE', 'solving simultaneous equations GCSE', 'simultaneous equations exam questions GCSE'],
    tier: 'Both',
    overview: 'Simultaneous equations are two equations with two unknowns. You solve them to find values that satisfy both equations at the same time.',
    keyFacts: [
      'Two methods: elimination and substitution.',
      'Elimination: make the coefficient of one variable the same in both equations, then add or subtract.',
      'Substitution: rearrange one equation and substitute into the other.',
      'The solution is the point where the two lines (graphs) intersect.',
    ],
    workedExamples: [
      {
        question: 'Solve: 3x + 2y = 16 and x + 2y = 8',
        steps: [
          'Subtract equation 2 from equation 1: (3x − x) + (2y − 2y) = 16 − 8',
          '2x = 8, so x = 4',
          'Substitute into equation 2: 4 + 2y = 8 → 2y = 4 → y = 2',
          'Check in eq 1: 3(4) + 2(2) = 12 + 4 = 16 ✓',
        ],
        answer: 'x = 4, y = 2',
      },
    ],
    commonMistakes: [
      'Subtracting when you should add (when signs of the matching terms are opposite).',
      'Substituting back into the equation you derived from, rather than an original equation.',
      'Making arithmetic errors — write every step clearly.',
    ],
    examTips: [
      'Always check your solution in both original equations.',
      'If coefficients don\'t match, multiply one or both equations to make them match before eliminating.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Inequalities',
    videoSearchTerms: ['GCSE inequalities number line', 'solving inequalities GCSE maths', 'linear inequalities GCSE', 'integer values inequalities GCSE'],
    tier: 'Both',
    overview: 'Inequalities show that one expression is greater than, less than, or equal to another. They are solved like equations, with one important exception.',
    keyFacts: [
      '< means "less than", > means "greater than", ≤ means "less than or equal to", ≥ means "greater than or equal to".',
      'Solve inequalities like equations — but if you multiply or divide by a negative number, flip the inequality sign.',
      'The solution to a linear inequality is a range of values.',
      'On a number line: open circle ○ for strict inequalities (< or >); closed circle ● for ≤ or ≥.',
    ],
    workedExamples: [
      {
        question: 'Solve 3x − 4 > 11 and represent on a number line.',
        steps: [
          'Add 4 to both sides: 3x > 15',
          'Divide by 3: x > 5',
          'Number line: open circle at 5, arrow pointing right',
        ],
        answer: 'x > 5',
      },
      {
        question: 'List the integers that satisfy −2 ≤ x < 4',
        steps: ['x can be −2, −1, 0, 1, 2, 3 (not 4, since x < 4)'],
        answer: '−2, −1, 0, 1, 2, 3',
      },
    ],
    commonMistakes: [
      'Not flipping the sign when multiplying or dividing by a negative number.',
      'Including the endpoint for a strict inequality (< or >) when listing integers.',
    ],
    examTips: [
      'If a question says "integer values", list them — don\'t just write the inequality.',
      'Check by substituting a value from your solution range back in.',
    ],
  },

  // ══════════════════════════════════════════════════
  // GEOMETRY & MEASURES
  // ══════════════════════════════════════════════════

  {
    topic: 'Geometry & Measures',
    subtopic: "Pythagoras' theorem",
    videoSearchTerms: ['GCSE Pythagoras theorem', 'finding hypotenuse GCSE', 'Pythagoras missing side GCSE', 'Pythagoras 3D GCSE maths'],
    tier: 'Both',
    overview: "Pythagoras' theorem relates the three sides of a right-angled triangle. It only works in right-angled triangles.",
    keyFacts: [
      'In a right-angled triangle: a² + b² = c², where c is the hypotenuse (longest side, opposite the right angle).',
      'To find the hypotenuse: c = √(a² + b²).',
      'To find a shorter side: a = √(c² − b²).',
      'Check: the hypotenuse is always opposite the right angle and always the longest side.',
      'Pythagorean triples: 3-4-5, 5-12-13, 8-15-17 (scale these up too: 6-8-10, etc.).',
    ],
    formulas: [
      { name: "Pythagoras' theorem", formula: 'a² + b² = c²', notes: 'c is the hypotenuse' },
    ],
    workedExamples: [
      {
        question: 'Find the hypotenuse of a right-angled triangle with legs 6 cm and 8 cm.',
        steps: [
          'c² = 6² + 8² = 36 + 64 = 100',
          'c = √100 = 10',
        ],
        answer: '10 cm',
      },
      {
        question: 'A right-angled triangle has hypotenuse 13 cm and one leg 5 cm. Find the other leg.',
        steps: [
          'a² = 13² − 5² = 169 − 25 = 144',
          'a = √144 = 12',
        ],
        answer: '12 cm',
      },
    ],
    commonMistakes: [
      'Squaring and adding all three sides instead of squaring the two legs.',
      'Not identifying which side is the hypotenuse before applying the formula.',
      'Forgetting to take the square root at the end.',
    ],
    examTips: [
      'Label the hypotenuse as c first — then identify which sides you know and which you need.',
      'Pythagorean triples save time on non-calculator papers — memorise 3-4-5 and 5-12-13.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Trigonometry (SOH-CAH-TOA)',
    videoSearchTerms: ['GCSE trigonometry SOH CAH TOA', 'trig missing sides GCSE', 'finding angles trigonometry GCSE', 'sin cos tan GCSE maths'],
    tier: 'Both',
    overview: 'Trigonometry (trig) is used to find missing sides and angles in right-angled triangles using the sine, cosine and tangent ratios.',
    keyFacts: [
      'SOH: sin θ = Opposite ÷ Hypotenuse',
      'CAH: cos θ = Adjacent ÷ Hypotenuse',
      'TOA: tan θ = Opposite ÷ Adjacent',
      'Opposite = side opposite the angle; Adjacent = side next to the angle (not hyp); Hypotenuse = longest side.',
      'To find an angle: use the inverse function (sin⁻¹, cos⁻¹, tan⁻¹).',
    ],
    formulas: [
      { name: 'Sine', formula: 'sin θ = O/H' },
      { name: 'Cosine', formula: 'cos θ = A/H' },
      { name: 'Tangent', formula: 'tan θ = O/A' },
    ],
    workedExamples: [
      {
        question: 'Find the side x opposite a 35° angle in a right-angled triangle with hypotenuse 12 cm.',
        steps: [
          'We have angle (35°), hypotenuse (12), and want opposite → use SIN',
          'sin 35° = x/12',
          'x = 12 × sin 35°',
          'x = 12 × 0.5736 = 6.88 cm (3 s.f.)',
        ],
        answer: 'x ≈ 6.88 cm',
      },
      {
        question: 'Find angle θ in a right-angled triangle where opposite = 7 cm and adjacent = 9 cm.',
        steps: [
          'We have opposite and adjacent → use TAN',
          'tan θ = 7/9',
          'θ = tan⁻¹(7/9)',
          'θ = 37.9° (3 s.f.)',
        ],
        answer: 'θ ≈ 37.9°',
      },
    ],
    commonMistakes: [
      'Confusing opposite and adjacent — always label the triangle relative to the given angle.',
      'Using sin when you should use cos (mixing up which sides are involved).',
      'Forgetting to use the inverse function when finding an angle.',
    ],
    examTips: [
      'Always label O, A and H on your diagram before choosing sin, cos or tan.',
      'Make sure your calculator is in DEGREE mode, not RADIAN mode.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Circle area & circumference',
    videoSearchTerms: ['GCSE area circumference circle', 'circle formulas GCSE maths', 'arc length sector area GCSE', 'pi circle calculations GCSE'],
    tier: 'Both',
    overview: 'The two key circle formulas relate to its boundary (circumference) and enclosed area. Both use π (pi ≈ 3.14159...).',
    keyFacts: [
      'Radius (r) = distance from centre to edge. Diameter (d) = 2r.',
      'Circumference = distance around the outside of the circle.',
      'Area = space inside the circle.',
      'π ≈ 3.14159 (use the π button on your calculator).',
    ],
    formulas: [
      { name: 'Circumference', formula: 'C = πd = 2πr' },
      { name: 'Area', formula: 'A = πr²' },
    ],
    workedExamples: [
      {
        question: 'Find the circumference and area of a circle with radius 5 cm. Give your answers to 1 d.p.',
        steps: [
          'Circumference = 2 × π × 5 = 10π = 31.4 cm',
          'Area = π × 5² = 25π = 78.5 cm²',
        ],
        answer: 'C = 31.4 cm, A = 78.5 cm²',
      },
      {
        question: 'A circle has circumference 40 cm. Find its radius.',
        steps: [
          '2πr = 40',
          'r = 40 ÷ (2π) = 20/π ≈ 6.37 cm',
        ],
        answer: 'r ≈ 6.37 cm',
      },
    ],
    commonMistakes: [
      'Squaring the diameter instead of the radius in the area formula.',
      'Confusing circumference and area formulas.',
      'Forgetting to halve the diameter to get the radius.',
    ],
    examTips: [
      'If the question gives the diameter, halve it before using the area formula.',
      'Leave answers in terms of π (e.g. 25π cm²) if the question asks for an exact answer.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Volume of prisms',
    videoSearchTerms: ['GCSE volume of prisms', 'volume cylinder GCSE maths', 'cross section area prism GCSE', 'volume 3D shapes GCSE'],
    tier: 'Both',
    overview: 'A prism is a 3D shape with a constant cross-section. Volume = area of cross-section × length.',
    keyFacts: [
      'A prism has the same cross-sectional shape all the way through.',
      'Volume of any prism = Area of cross-section × Length (or height).',
      'Common prisms: cuboid (rectangular cross-section), cylinder (circular cross-section), triangular prism.',
      'Volume units: cm³, m³. Capacity: 1 litre = 1000 cm³.',
    ],
    formulas: [
      { name: 'Volume of prism', formula: 'V = A × l', notes: 'A = area of cross-section, l = length' },
      { name: 'Volume of cylinder', formula: 'V = πr²h' },
      { name: 'Volume of cuboid', formula: 'V = l × w × h' },
    ],
    workedExamples: [
      {
        question: 'A triangular prism has a right-angled triangular cross-section with legs 4 cm and 6 cm, and length 10 cm. Find the volume.',
        steps: [
          'Area of triangle = ½ × 4 × 6 = 12 cm²',
          'Volume = 12 × 10 = 120 cm³',
        ],
        answer: '120 cm³',
      },
    ],
    commonMistakes: [
      'Using the wrong face as the cross-section — it must be the face that stays the same along the length.',
      'Forgetting to halve when the cross-section is a triangle.',
    ],
    examTips: [
      'Identify and calculate the cross-section area first, then multiply by the length.',
      'Draw and label the cross-section separately if the diagram is confusing.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Angle rules',
    videoSearchTerms: ['GCSE angle rules triangles polygons', 'angles on straight line GCSE', 'interior exterior angles polygon GCSE', 'angle facts reasons GCSE maths'],
    tier: 'Both',
    overview: 'Angles follow a set of rules based on their position. You must know these rules and be able to give reasons in geometry questions.',
    keyFacts: [
      'Angles on a straight line add up to 180°.',
      'Angles around a point add up to 360°.',
      'Vertically opposite angles are equal.',
      'Angles in a triangle add up to 180°.',
      'Angles in a quadrilateral add up to 360°.',
      'Interior angles of a regular polygon: (n − 2) × 180° ÷ n.',
    ],
    formulas: [
      { name: 'Interior angle sum of polygon', formula: '(n − 2) × 180°', notes: 'n = number of sides' },
      { name: 'Each interior angle (regular polygon)', formula: '(n − 2) × 180° ÷ n' },
      { name: 'Exterior angle (regular polygon)', formula: '360° ÷ n' },
    ],
    workedExamples: [
      {
        question: 'Find the interior angle of a regular hexagon.',
        steps: [
          'n = 6 sides',
          'Sum of interior angles = (6 − 2) × 180° = 720°',
          'Each angle = 720° ÷ 6 = 120°',
        ],
        answer: '120°',
      },
    ],
    commonMistakes: [
      'Forgetting to give a reason when asked ("vertically opposite angles are equal", not just "they\'re equal").',
      'Using the interior angle sum of a triangle (180°) for other polygons.',
    ],
    examTips: [
      'Always write the geometric reason, not just the calculation — it\'s worth a mark.',
      'Mark angles on the diagram as you find them to keep track.',
    ],
  },

  // ══════════════════════════════════════════════════
  // STATISTICS & PROBABILITY
  // ══════════════════════════════════════════════════

  {
    topic: 'Statistics & Probability',
    subtopic: 'Mean, median, mode & range',
    videoSearchTerms: ['GCSE mean median mode range', 'averages GCSE maths', 'calculating mean from table GCSE', 'median even set of data GCSE'],
    tier: 'Both',
    overview: 'Averages summarise a data set with a single representative value. The range measures spread.',
    keyFacts: [
      'Mean = sum of all values ÷ number of values.',
      'Median = middle value when data is ordered (or mean of middle two for even-sized data).',
      'Mode = most frequently occurring value (there can be more than one).',
      'Range = largest value − smallest value.',
      'The mean is affected by outliers; the median is not.',
    ],
    formulas: [
      { name: 'Mean', formula: 'x̄ = Σx / n', notes: 'Σx = sum of all values, n = count' },
      { name: 'Range', formula: 'Range = Max − Min' },
    ],
    workedExamples: [
      {
        question: 'Find the mean, median, mode and range of: 3, 7, 7, 2, 9, 4, 7',
        steps: [
          'Order: 2, 3, 4, 7, 7, 7, 9',
          'Mean = (2+3+4+7+7+7+9) ÷ 7 = 39 ÷ 7 = 5.57 (2 d.p.)',
          'Median = 4th value = 7',
          'Mode = 7 (appears 3 times)',
          'Range = 9 − 2 = 7',
        ],
        answer: 'Mean ≈ 5.57, Median = 7, Mode = 7, Range = 7',
      },
    ],
    commonMistakes: [
      'Forgetting to sort the data before finding the median.',
      'Finding the median position incorrectly for even-sized data (should average the two middle values).',
      'Confusing mode (most common) with mean (average).',
    ],
    examTips: [
      'Always sort the data first — write the ordered list out clearly.',
      'For n data points, the median is at position (n+1)/2.',
    ],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Basic probability',
    videoSearchTerms: ['GCSE basic probability', 'probability scale GCSE maths', 'calculating probability GCSE', 'complementary probability GCSE'],
    tier: 'Both',
    overview: 'Probability measures how likely an event is to occur, on a scale from 0 (impossible) to 1 (certain).',
    keyFacts: [
      'P(event) = number of favourable outcomes ÷ total number of equally likely outcomes.',
      'Probabilities range from 0 to 1.',
      'P(event does not happen) = 1 − P(event happens). This is the complementary rule.',
      'If events are mutually exclusive: P(A or B) = P(A) + P(B).',
      'If events are independent: P(A and B) = P(A) × P(B).',
    ],
    formulas: [
      { name: 'Basic probability', formula: 'P(A) = favourable outcomes ÷ total outcomes' },
      { name: 'Complement', formula: "P(A') = 1 − P(A)" },
      { name: 'Independent events', formula: 'P(A and B) = P(A) × P(B)' },
    ],
    workedExamples: [
      {
        question: 'A bag has 3 red, 5 blue and 2 green balls. Find P(red) and P(not green).',
        steps: [
          'Total = 3 + 5 + 2 = 10',
          'P(red) = 3/10',
          'P(green) = 2/10 = 1/5',
          'P(not green) = 1 − 1/5 = 4/5',
        ],
        answer: 'P(red) = 3/10, P(not green) = 4/5',
      },
    ],
    commonMistakes: [
      'Forgetting to count the total number of outcomes.',
      'Adding probabilities when you should multiply (for "and" use ×, for mutually exclusive "or" use +).',
      'Not simplifying fractions.',
    ],
    examTips: [
      'Always check probabilities add up to 1 for a complete set of outcomes.',
      'Use fractions or decimals — never write "3 in 10" as a final answer without a proper fraction/decimal.',
    ],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Tree diagrams',
    videoSearchTerms: ['GCSE tree diagrams probability', 'independent events tree diagram GCSE', 'without replacement tree diagram GCSE', 'combined probability GCSE'],
    tier: 'Both',
    overview: 'Tree diagrams show all possible outcomes of two or more events and their probabilities. You multiply along branches and add between branches.',
    keyFacts: [
      'Multiply along branches to get the probability of combined outcomes.',
      'Add probabilities for mutually exclusive outcomes.',
      'All probabilities on branches from one point must add up to 1.',
      'For "without replacement", the probabilities on the second set of branches change.',
    ],
    workedExamples: [
      {
        question: 'A bag has 4 red and 6 blue balls. A ball is drawn, replaced, then another is drawn. Find P(both red).',
        steps: [
          'P(red) = 4/10 = 2/5 on both occasions (with replacement)',
          'P(both red) = 2/5 × 2/5 = 4/25',
        ],
        answer: 'P(both red) = 4/25',
      },
    ],
    commonMistakes: [
      'Adding instead of multiplying along branches.',
      'Forgetting to update probabilities for "without replacement" questions.',
      'Not checking that branches at each node sum to 1.',
    ],
    examTips: [
      'Draw the tree clearly with all outcomes and probabilities labelled on each branch.',
      'Circle or highlight the branches you need before multiplying.',
    ],
  },

  // ══════════════════════════════════════════════════
  // RATIO & PROPORTION
  // ══════════════════════════════════════════════════

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Simplifying ratios',
    videoSearchTerms: ['GCSE simplifying ratios', 'ratio simplest form GCSE maths', 'equivalent ratios GCSE', 'ratio 1:n form GCSE'],
    tier: 'Both',
    overview: 'A ratio compares two or more quantities. Simplifying a ratio means dividing all parts by their highest common factor.',
    keyFacts: [
      'Divide all parts of the ratio by their HCF to simplify.',
      'Ratios must be in the same units before simplifying.',
      'A ratio of 2:3 means for every 2 of the first quantity, there are 3 of the second.',
      'To write a ratio in the form 1:n, divide both parts by the first number.',
    ],
    workedExamples: [
      {
        question: 'Simplify the ratio 24:36',
        steps: [
          'HCF of 24 and 36 = 12',
          '24 ÷ 12 = 2, 36 ÷ 12 = 3',
        ],
        answer: '2:3',
      },
      {
        question: 'Write 45 cm : 1.2 m as a ratio in its simplest form.',
        steps: [
          'Convert to same units: 45 cm : 120 cm',
          'HCF of 45 and 120 = 15',
          '45 ÷ 15 = 3, 120 ÷ 15 = 8',
        ],
        answer: '3:8',
      },
    ],
    commonMistakes: [
      'Not converting to the same units before simplifying.',
      'Only dividing one part of the ratio by the HCF.',
    ],
    examTips: [
      'Always convert to the same unit first — look out for mixed units (cm and m, g and kg).',
      'Check by multiplying back up to confirm the simplified ratio is equivalent.',
    ],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Sharing in a ratio',
    videoSearchTerms: ['GCSE sharing ratio', 'divide amount ratio GCSE', 'ratio sharing total GCSE maths', 'ratio word problems GCSE'],
    tier: 'Both',
    overview: 'Sharing a quantity in a given ratio means dividing it into parts proportional to the ratio.',
    keyFacts: [
      'Find the total number of parts by adding all the ratio numbers.',
      'Find the value of one part: total amount ÷ total parts.',
      'Multiply each ratio number by the value of one part.',
      'Check: the parts should add back up to the original amount.',
    ],
    workedExamples: [
      {
        question: 'Share £240 in the ratio 3:5.',
        steps: [
          'Total parts = 3 + 5 = 8',
          'Value of 1 part = £240 ÷ 8 = £30',
          'First share = 3 × £30 = £90',
          'Second share = 5 × £30 = £150',
          'Check: £90 + £150 = £240 ✓',
        ],
        answer: '£90 and £150',
      },
    ],
    commonMistakes: [
      'Dividing by the number of ratio parts without adding them first (e.g. dividing 240 by 3 and 5 separately).',
      'Not checking the parts add up to the original total.',
    ],
    examTips: [
      'Always add the ratio parts first to find the total number of parts.',
      'Do a check at the end — it takes seconds and catches errors.',
    ],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Direct proportion',
    videoSearchTerms: ['GCSE direct proportion', 'proportionality constant GCSE maths', 'y proportional x GCSE', 'direct proportion graph GCSE'],
    tier: 'Both',
    overview: 'Two quantities are in direct proportion if they increase and decrease at the same rate. When one doubles, the other doubles.',
    keyFacts: [
      'If y is directly proportional to x: y = kx, where k is the constant of proportionality.',
      'The graph of direct proportion is a straight line through the origin.',
      'You can use the unitary method: find the value for 1, then multiply.',
      'If y ∝ x², then y = kx² (direct proportion to the square).',
    ],
    formulas: [
      { name: 'Direct proportion', formula: 'y = kx', notes: 'k is constant' },
      { name: 'Find k', formula: 'k = y/x (use a known pair)' },
    ],
    workedExamples: [
      {
        question: 'y is directly proportional to x. When x = 4, y = 20. Find y when x = 7.',
        steps: [
          'y = kx → 20 = k × 4 → k = 5',
          'y = 5x',
          'When x = 7: y = 5 × 7 = 35',
        ],
        answer: 'y = 35',
      },
    ],
    commonMistakes: [
      'Not finding k first — always establish the formula before finding new values.',
      'Confusing direct proportion (y = kx) with inverse proportion (y = k/x).',
    ],
    examTips: [
      'Look for the words "proportional to" — they tell you the relationship type.',
      'Find k using the given values, then use the formula for the unknown.',
    ],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Speed, distance & time',
    videoSearchTerms: ['GCSE speed distance time', 'SDT formula triangle GCSE', 'average speed GCSE maths', 'speed distance time word problems GCSE'],
    tier: 'Both',
    overview: 'Speed, distance and time are connected by a formula triangle. Given any two, you can find the third.',
    keyFacts: [
      'Speed = Distance ÷ Time',
      'Distance = Speed × Time',
      'Time = Distance ÷ Speed',
      'Units must be consistent (e.g. km/h and hours, or m/s and seconds).',
      'Average speed = total distance ÷ total time (not the mean of two speeds).',
    ],
    formulas: [
      { name: 'Speed', formula: 'S = D/T' },
      { name: 'Distance', formula: 'D = S × T' },
      { name: 'Time', formula: 'T = D/S' },
    ],
    workedExamples: [
      {
        question: 'A car travels 180 km at an average speed of 60 km/h. How long does the journey take?',
        steps: [
          'Time = Distance ÷ Speed',
          'T = 180 ÷ 60 = 3 hours',
        ],
        answer: '3 hours',
      },
      {
        question: 'A runner completes 400 m in 50 seconds. Find their speed in m/s.',
        steps: [
          'Speed = Distance ÷ Time',
          'S = 400 ÷ 50 = 8 m/s',
        ],
        answer: '8 m/s',
      },
    ],
    commonMistakes: [
      'Using inconsistent units (e.g. distance in km but time in minutes).',
      'Dividing speed by distance instead of distance by speed for time.',
      'Calculating average speed as the mean of two speeds rather than total distance ÷ total time.',
    ],
    examTips: [
      'Use the formula triangle — cover the quantity you want to find.',
      'Convert units before calculating: minutes → hours (÷ 60), metres → km (÷ 1000).',
    ],
  },

  // ══════════════════════════════════════════════════
  // NUMBER (new entries)
  // ══════════════════════════════════════════════════

  {
    topic: 'Number',
    subtopic: 'Ordering & comparing numbers',
    tier: 'Both',
    overview: 'Ordering numbers means arranging them from smallest to largest (or vice versa), including integers, decimals, fractions and negative numbers. Comparing numbers requires understanding place value and number lines.',
    keyFacts: [
      'Negative numbers: the further from zero, the smaller the value (e.g. −7 < −2).',
      'To compare decimals, line up the decimal points and compare digit by digit.',
      'To compare fractions, convert to a common denominator or to decimals.',
      'Place value: each digit\'s value depends on its position (ones, tens, hundreds, tenths, hundredths…).',
      'On a number line, numbers increase from left to right.',
      'Inequality symbols: < means "less than", > means "greater than", ≤ means "less than or equal to".',
    ],
    workedExamples: [
      {
        question: 'Write these numbers in order from smallest to largest: 0.35, 3/8, 0.3, 2/5',
        steps: [
          'Convert all to decimals: 0.35 = 0.35, 3/8 = 0.375, 0.3 = 0.3, 2/5 = 0.4',
          'Order the decimals: 0.3, 0.35, 0.375, 0.4',
          'Convert back to original form: 0.3, 0.35, 3/8, 2/5',
        ],
        answer: '0.3, 0.35, 3/8, 2/5',
      },
      {
        question: 'Write these numbers in order from largest to smallest: −1.5, −3, 0.5, −0.2',
        steps: [
          'Plot on a number line mentally: −3, −1.5, −0.2, 0.5',
          'Largest to smallest means right to left on the number line',
          'Order: 0.5, −0.2, −1.5, −3',
        ],
        answer: '0.5, −0.2, −1.5, −3',
      },
    ],
    commonMistakes: [
      'Thinking −7 > −2 because 7 > 2 — with negatives, the larger the digit, the smaller the value.',
      'Comparing decimals by length rather than place value (e.g. thinking 0.35 > 0.4 because it has more digits).',
      'Not converting fractions to the same form before ordering.',
    ],
    examTips: [
      'Convert everything to decimals before ordering — it\'s the easiest common format to compare.',
      'Draw a quick number line if you\'re unsure about negative numbers.',
    ],
    videoSearchTerms: ['ordering negative numbers GCSE', 'comparing fractions and decimals GCSE', 'place value GCSE maths', 'ordering numbers number line GCSE'],
  },

  {
    topic: 'Number',
    subtopic: 'Decimals',
    tier: 'Both',
    overview: 'Decimals are numbers with a fractional part shown after a decimal point. You need to add, subtract, multiply and divide decimals, and round to a given number of decimal places or significant figures.',
    keyFacts: [
      'To add or subtract decimals: line up the decimal points.',
      'To multiply decimals: ignore the decimal point, multiply as integers, then place the decimal point back.',
      'To divide by a decimal: multiply both numbers by 10 (or 100 etc.) to make the divisor an integer.',
      'Rounding to d.p.: look at the (d+1)th digit — if 5 or more, round up; if less than 5, round down.',
      'Rounding to significant figures: the first significant figure is the first non-zero digit.',
      '1 decimal place = nearest tenth; 2 d.p. = nearest hundredth.',
    ],
    workedExamples: [
      {
        question: 'Work out 3.6 × 0.04',
        steps: [
          'Ignore decimal points: 36 × 4 = 144',
          '3.6 has 1 decimal place, 0.04 has 2 decimal places → 3 decimal places total',
          'Place decimal point 3 places from the right: 0.144',
        ],
        answer: '0.144',
      },
      {
        question: 'Work out 5.76 ÷ 0.8',
        steps: [
          'Multiply both by 10 to eliminate the decimal in the divisor: 57.6 ÷ 8',
          '57.6 ÷ 8 = 7.2',
        ],
        answer: '7.2',
      },
    ],
    commonMistakes: [
      'Not lining up decimal points when adding or subtracting, leading to place value errors.',
      'Forgetting to count the total decimal places when multiplying.',
      'Rounding 6.45 to 1 d.p. as 6.4 instead of 6.5 — the digit after is 5, so round up.',
    ],
    examTips: [
      'When multiplying decimals, count total decimal places in both numbers — your answer must have that many.',
      'For division by a decimal, write it as a fraction and multiply top and bottom to clear the decimal.',
    ],
    videoSearchTerms: ['multiplying decimals GCSE maths', 'dividing decimals GCSE', 'rounding decimal places significant figures GCSE', 'decimal arithmetic GCSE maths'],
  },

  {
    topic: 'Number',
    subtopic: 'Reverse percentages',
    tier: 'Both',
    overview: 'Reverse percentages find the original value before a percentage change was applied. You divide by the multiplier rather than multiplying by it.',
    keyFacts: [
      'If a price is increased by 20%, the new price = original × 1.2, so original = new price ÷ 1.2.',
      'If a price is decreased by 30%, the new price = original × 0.7, so original = new price ÷ 0.7.',
      'The multiplier for an x% increase is (1 + x/100); for an x% decrease it is (1 − x/100).',
      'Never find x% of the new value — always divide by the multiplier.',
      'These questions often use phrases like "after VAT", "after a discount", or "following a rise".',
    ],
    formulas: [
      { name: 'Original value (after increase)', formula: 'Original = New value ÷ (1 + r/100)', notes: 'r is the percentage increase' },
      { name: 'Original value (after decrease)', formula: 'Original = New value ÷ (1 − r/100)', notes: 'r is the percentage decrease' },
    ],
    workedExamples: [
      {
        question: 'A jacket costs £78 after a 35% reduction. Find the original price.',
        steps: [
          'A 35% reduction means the sale price is 65% of the original.',
          'Multiplier = 1 − 0.35 = 0.65',
          'Original = 78 ÷ 0.65',
          'Original = £120',
        ],
        answer: '£120',
      },
      {
        question: 'A TV costs £564 including 20% VAT. Find the price before VAT.',
        steps: [
          '20% VAT means the price with VAT is 120% of the original.',
          'Multiplier = 1.20',
          'Original = 564 ÷ 1.20',
          'Original = £470',
        ],
        answer: '£470',
      },
    ],
    commonMistakes: [
      'Finding x% of the new value instead of dividing by the multiplier (e.g. finding 35% of £78 and subtracting).',
      'Using the wrong multiplier — a 35% decrease uses 0.65, not 0.35.',
      'Confusing reverse percentages with percentage change.',
    ],
    examTips: [
      'Always identify the multiplier first, then divide — never work backwards by finding a percentage of the given amount.',
      'Check your answer: apply the percentage change to your original value and see if you get the price given.',
    ],
    videoSearchTerms: ['reverse percentages GCSE maths', 'finding original value percentage GCSE', 'reverse percentage multiplier GCSE', 'percentage reverse problem GCSE'],
  },

  {
    topic: 'Number',
    subtopic: 'Factors, multiples & primes',
    tier: 'Both',
    overview: 'Factors divide exactly into a number; multiples are in a number\'s times table. Prime numbers have exactly two factors: 1 and themselves. HCF and LCM are key skills for GCSE.',
    keyFacts: [
      'A factor of n divides into n with no remainder.',
      'A multiple of n is in n\'s times table (n, 2n, 3n, …).',
      'A prime number has exactly two factors: 1 and itself. 1 is NOT prime.',
      'Prime factorisation: write a number as a product of its prime factors using a factor tree.',
      'HCF (Highest Common Factor): the largest factor shared by two numbers.',
      'LCM (Lowest Common Multiple): the smallest multiple shared by two numbers.',
    ],
    formulas: [
      { name: 'HCF from prime factors', formula: 'Multiply shared prime factors (lowest powers)', notes: 'e.g. HCF(12, 18) = 2 × 3 = 6' },
      { name: 'LCM from prime factors', formula: 'Multiply all prime factors (highest powers)', notes: 'e.g. LCM(12, 18) = 2² × 3² = 36' },
    ],
    workedExamples: [
      {
        question: 'Find the HCF and LCM of 36 and 60.',
        steps: [
          '36 = 2² × 3²',
          '60 = 2² × 3 × 5',
          'HCF: shared factors with lowest powers = 2² × 3 = 12',
          'LCM: all factors with highest powers = 2² × 3² × 5 = 180',
        ],
        answer: 'HCF = 12, LCM = 180',
      },
      {
        question: 'Express 420 as a product of its prime factors.',
        steps: [
          '420 ÷ 2 = 210',
          '210 ÷ 2 = 105',
          '105 ÷ 3 = 35',
          '35 ÷ 5 = 7',
          '420 = 2² × 3 × 5 × 7',
        ],
        answer: '2² × 3 × 5 × 7',
      },
    ],
    commonMistakes: [
      'Including 1 as a prime number — 1 is not prime because it only has one factor.',
      'Confusing HCF and LCM: HCF is always ≤ the smaller number; LCM is always ≥ the larger number.',
      'Incomplete factor trees — not breaking numbers down fully to prime factors.',
    ],
    examTips: [
      'Use a Venn diagram to find HCF and LCM: shared primes go in the middle (multiply for HCF), all primes multiplied give LCM.',
      'Check prime factorisation by multiplying back: your product should equal the original number.',
    ],
    videoSearchTerms: ['HCF LCM prime factors GCSE', 'prime factorisation factor tree GCSE', 'highest common factor GCSE maths', 'lowest common multiple GCSE maths'],
  },

  {
    topic: 'Number',
    subtopic: 'Indices (fractional & negative)',
    tier: 'Higher',
    overview: 'Index laws extend to negative and fractional powers. A negative index means a reciprocal; a fractional index means a root. These appear frequently in Higher tier GCSE.',
    keyFacts: [
      'a⁻ⁿ = 1/aⁿ (negative index = reciprocal)',
      'a^(1/n) = ⁿ√a (unit fraction index = nth root)',
      'a^(m/n) = (ⁿ√a)ᵐ — take the root first, then raise to the power.',
      'a⁰ = 1 for any non-zero value of a.',
      'Index laws: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, (aᵐ)ⁿ = aᵐⁿ.',
    ],
    formulas: [
      { name: 'Negative index', formula: 'a⁻ⁿ = 1 / aⁿ' },
      { name: 'Fractional index (unit)', formula: 'a^(1/n) = ⁿ√a' },
      { name: 'Fractional index (general)', formula: 'a^(m/n) = (ⁿ√a)ᵐ' },
    ],
    workedExamples: [
      {
        question: 'Evaluate 8^(2/3)',
        steps: [
          'The denominator 3 means cube root; the numerator 2 means square.',
          '∛8 = 2',
          '2² = 4',
        ],
        answer: '4',
      },
      {
        question: 'Evaluate 25^(−1/2)',
        steps: [
          'Negative index: 25^(−1/2) = 1 / 25^(1/2)',
          '25^(1/2) = √25 = 5',
          '1 / 5 = 0.2',
        ],
        answer: '1/5 (or 0.2)',
      },
    ],
    commonMistakes: [
      'Evaluating a^(m/n) as aᵐ ÷ n instead of (ⁿ√a)ᵐ.',
      'Forgetting that a⁻ⁿ is a reciprocal — writing −aⁿ instead of 1/aⁿ.',
      'Computing the power before the root when using a^(m/n) — always root first.',
    ],
    examTips: [
      'For a^(m/n): the denominator is the root, the numerator is the power. Root first, then power — it keeps numbers small.',
      'Write out each step: rewrite the negative or fractional index, evaluate the root, then apply the power.',
    ],
    videoSearchTerms: ['fractional indices GCSE Higher', 'negative indices GCSE maths', 'index laws Higher GCSE', 'powers and roots GCSE Higher'],
  },

  {
    topic: 'Number',
    subtopic: 'Surds',
    tier: 'Higher',
    overview: 'Surds are irrational numbers written as square roots that cannot be simplified to exact integers. You need to simplify surds, expand brackets containing surds, and rationalise denominators.',
    keyFacts: [
      '√a × √a = a',
      '√(ab) = √a × √b — use this to simplify surds.',
      'To simplify √n, find the largest perfect square factor of n.',
      'Rationalise the denominator: multiply numerator and denominator by the surd in the denominator.',
      'For (a + √b)(a − √b) = a² − b — called the difference of two squares.',
      'Surds are exact values; leaving an answer in surd form is more accurate than a decimal.',
    ],
    formulas: [
      { name: 'Simplify', formula: '√(a²b) = a√b' },
      { name: 'Rationalise', formula: 'a/√b = a√b / b', notes: 'Multiply top and bottom by √b' },
      { name: 'Conjugate pair', formula: '(p + √q)(p − √q) = p² − q' },
    ],
    workedExamples: [
      {
        question: 'Simplify √72',
        steps: [
          'Find the largest perfect square factor of 72: 36 × 2 = 72',
          '√72 = √(36 × 2) = √36 × √2',
          '= 6√2',
        ],
        answer: '6√2',
      },
      {
        question: 'Rationalise the denominator of 5/√3',
        steps: [
          'Multiply numerator and denominator by √3',
          '5/√3 × √3/√3 = 5√3 / (√3 × √3)',
          '= 5√3 / 3',
        ],
        answer: '5√3 / 3',
      },
    ],
    commonMistakes: [
      '√(a + b) ≠ √a + √b — you cannot split a sum under a square root.',
      'Not finding the largest perfect square factor (e.g. simplifying √72 as 2√18 instead of 6√2).',
      'Forgetting to rationalise when the question asks for an exact answer with a rational denominator.',
    ],
    examTips: [
      'Always check if your simplified surd can be simplified further — look for perfect square factors.',
      'When rationalising a binomial denominator (a + √b), multiply by its conjugate (a − √b).',
    ],
    videoSearchTerms: ['surds GCSE maths explained', 'simplifying surds GCSE', 'rationalising the denominator GCSE', 'expanding surds brackets GCSE Higher'],
  },

  {
    topic: 'Number',
    subtopic: 'Recurring decimals to fractions',
    tier: 'Higher',
    overview: 'Recurring decimals are decimals where one or more digits repeat infinitely. Every recurring decimal can be written as an exact fraction using an algebraic method.',
    keyFacts: [
      'A recurring decimal is shown with a dot above the repeating digit(s): 0.3̄ = 0.333…',
      'Two dots show the start and end of a repeating block: 0.1̄2̄ = 0.121212…',
      'Method: let x = the decimal, multiply by 10ⁿ (where n = length of recurring block) to shift it, then subtract.',
      'The difference eliminates the recurring part, leaving a simple equation to solve.',
      'All recurring decimals are rational numbers (can be written as fractions).',
    ],
    workedExamples: [
      {
        question: 'Convert 0.363636… to a fraction.',
        steps: [
          'Let x = 0.363636…',
          'The recurring block is "36" (length 2), so multiply by 100: 100x = 36.363636…',
          'Subtract: 100x − x = 36.363636… − 0.363636…',
          '99x = 36',
          'x = 36/99',
          'Simplify by dividing by HCF of 9: x = 4/11',
        ],
        answer: '4/11',
      },
      {
        question: 'Convert 0.41̄ (= 0.4111…) to a fraction.',
        steps: [
          'Let x = 0.4111…',
          'Multiply by 10: 10x = 4.111…',
          'Multiply by 100: 100x = 41.111…',
          '100x − 10x = 41.111… − 4.111…',
          '90x = 37',
          'x = 37/90',
        ],
        answer: '37/90',
      },
    ],
    commonMistakes: [
      'Multiplying by the wrong power of 10 — count the digits in the repeating block carefully.',
      'Subtracting incorrectly and losing the non-recurring part of the decimal.',
      'Forgetting to simplify the resulting fraction.',
    ],
    examTips: [
      'Write out the decimal carefully before multiplying — identify exactly which digits recur.',
      'After subtracting, check that the recurring part cancels completely before solving.',
    ],
    videoSearchTerms: ['recurring decimals to fractions GCSE', 'converting recurring decimals GCSE Higher', '0.333 as a fraction GCSE', 'recurring decimal algebraic method GCSE'],
  },

  // ══════════════════════════════════════════════════
  // ALGEBRA (new entries)
  // ══════════════════════════════════════════════════

  {
    topic: 'Algebra',
    subtopic: 'Simplifying expressions',
    tier: 'Both',
    overview: 'Simplifying algebraic expressions means collecting like terms and applying index laws. Like terms have exactly the same letters and powers and can be added or subtracted.',
    keyFacts: [
      'Like terms have the same letter(s) and power(s): 3x and 5x are like terms; 3x and 3x² are not.',
      'Collect like terms by adding or subtracting their coefficients.',
      'When multiplying terms: multiply coefficients and add indices (e.g. 3x² × 2x³ = 6x⁵).',
      'When dividing terms: divide coefficients and subtract indices (e.g. 6x⁵ ÷ 2x² = 3x³).',
      'An expression cannot be simplified further if all remaining terms are unlike.',
    ],
    workedExamples: [
      {
        question: 'Simplify 5x² + 3x − 2x² + 4x − 1',
        steps: [
          'Group like terms: (5x² − 2x²) + (3x + 4x) − 1',
          '= 3x² + 7x − 1',
        ],
        answer: '3x² + 7x − 1',
      },
      {
        question: 'Simplify 4a²b × 3ab³',
        steps: [
          'Multiply coefficients: 4 × 3 = 12',
          'Multiply a terms: a² × a = a³',
          'Multiply b terms: b × b³ = b⁴',
          '= 12a³b⁴',
        ],
        answer: '12a³b⁴',
      },
    ],
    commonMistakes: [
      'Adding unlike terms (e.g. writing 3x + 2x² = 5x³).',
      'Forgetting to carry the negative sign when collecting terms.',
      'Adding indices when multiplying coefficients (e.g. 3x² × 2x = 6x² instead of 6x³).',
    ],
    examTips: [
      'Underline or highlight like terms in different colours before collecting them.',
      'With index laws: × means add indices, ÷ means subtract indices, power of a power means multiply indices.',
    ],
    videoSearchTerms: ['simplifying algebraic expressions GCSE', 'collecting like terms GCSE maths', 'index laws simplifying GCSE', 'algebraic expressions GCSE Foundation'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Expanding single brackets',
    tier: 'Both',
    overview: 'Expanding a single bracket means multiplying the term outside the bracket by every term inside. This removes the bracket and gives an equivalent expression.',
    keyFacts: [
      'Multiply the term outside by each term inside the bracket.',
      'Take care with negative signs: −3(2x − 5) = −6x + 15.',
      'Expanding and simplifying may require collecting like terms afterwards.',
      'The reverse of expanding is factorising.',
    ],
    workedExamples: [
      {
        question: 'Expand and simplify 4(3x + 2) − 2(x − 5)',
        steps: [
          'Expand 4(3x + 2) = 12x + 8',
          'Expand −2(x − 5) = −2x + 10',
          'Collect like terms: 12x − 2x + 8 + 10',
          '= 10x + 18',
        ],
        answer: '10x + 18',
      },
      {
        question: 'Expand 3x(2x² − 5x + 1)',
        steps: [
          '3x × 2x² = 6x³',
          '3x × (−5x) = −15x²',
          '3x × 1 = 3x',
          '= 6x³ − 15x² + 3x',
        ],
        answer: '6x³ − 15x² + 3x',
      },
    ],
    commonMistakes: [
      'Only multiplying the first term inside the bracket and forgetting subsequent terms.',
      'Sign errors: −2(x − 5) becomes −2x − 10 instead of −2x + 10.',
      'Forgetting to collect like terms after expanding multiple brackets.',
    ],
    examTips: [
      'Draw arrows from the outside term to each inside term to ensure you multiply everything.',
      'Be especially careful when the term outside is negative — a negative × negative = positive.',
    ],
    videoSearchTerms: ['expanding single brackets GCSE maths', 'expanding brackets with negatives GCSE', 'removing brackets GCSE algebra', 'expanding brackets GCSE Foundation'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Expanding double brackets',
    tier: 'Both',
    overview: 'Expanding double brackets involves multiplying every term in the first bracket by every term in the second bracket. The FOIL method (First, Outer, Inner, Last) is a helpful strategy.',
    keyFacts: [
      'FOIL: First × First, Outer × Outer, Inner × Inner, Last × Last — then collect like terms.',
      '(a + b)² = a² + 2ab + b² — a common pattern to recognise.',
      '(a + b)(a − b) = a² − b² — the difference of two squares.',
      'Always collect the middle terms after expanding.',
      'The result of expanding two linear brackets is always a quadratic expression.',
    ],
    formulas: [
      { name: 'Perfect square', formula: '(a + b)² = a² + 2ab + b²' },
      { name: 'Difference of two squares', formula: '(a + b)(a − b) = a² − b²' },
    ],
    workedExamples: [
      {
        question: 'Expand and simplify (2x + 3)(x − 4)',
        steps: [
          'First: 2x × x = 2x²',
          'Outer: 2x × (−4) = −8x',
          'Inner: 3 × x = 3x',
          'Last: 3 × (−4) = −12',
          'Collect: 2x² − 8x + 3x − 12 = 2x² − 5x − 12',
        ],
        answer: '2x² − 5x − 12',
      },
      {
        question: 'Expand and simplify (x + 5)²',
        steps: [
          'Use (a + b)² = a² + 2ab + b² with a = x, b = 5',
          '= x² + 2(x)(5) + 5²',
          '= x² + 10x + 25',
        ],
        answer: 'x² + 10x + 25',
      },
    ],
    commonMistakes: [
      '(x + 5)² ≠ x² + 25 — students forget the middle term 2 × x × 5.',
      'Sign errors when one or both terms are negative.',
      'Not collecting the two middle terms — leaving four terms instead of three.',
    ],
    examTips: [
      'Use the grid method if you find FOIL confusing: draw a 2×2 grid and fill each cell.',
      'Always write out all four products before collecting — never try to do it in one step.',
    ],
    videoSearchTerms: ['expanding double brackets GCSE maths', 'FOIL method GCSE algebra', 'expanding two brackets GCSE', 'double brackets quadratic GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Factorising',
    tier: 'Both',
    overview: 'Factorising is the reverse of expanding — you write an expression as a product of factors. At Foundation level this includes taking out a common factor and factorising simple quadratics.',
    keyFacts: [
      'To factorise, find the highest common factor (HCF) of all terms and place it outside brackets.',
      'Check by expanding: you should get back to the original expression.',
      'Factorising quadratics: x² + bx + c = (x + p)(x + q) where p + q = b and p × q = c.',
      'Always look for a common factor before factorising a quadratic.',
      'A fully factorised expression cannot be factorised further.',
    ],
    workedExamples: [
      {
        question: 'Factorise 6x² − 9x',
        steps: [
          'HCF of 6x² and 9x is 3x',
          '= 3x(2x − 3)',
          'Check: 3x × 2x = 6x², 3x × (−3) = −9x ✓',
        ],
        answer: '3x(2x − 3)',
      },
      {
        question: 'Factorise x² + 7x + 12',
        steps: [
          'Find two numbers that multiply to 12 and add to 7',
          '3 × 4 = 12 and 3 + 4 = 7 ✓',
          '= (x + 3)(x + 4)',
        ],
        answer: '(x + 3)(x + 4)',
      },
    ],
    commonMistakes: [
      'Not taking out the full HCF — leaving a further common factor inside the bracket.',
      'Getting signs wrong in quadratic factorisation (e.g. (x + 3)(x − 4) when both should be positive).',
      'Forgetting to check by expanding back.',
    ],
    examTips: [
      'For quadratics: list factor pairs of c and check which pair sums to b.',
      'Always check your factorisation by expanding — it only takes a few seconds.',
    ],
    videoSearchTerms: ['factorising expressions GCSE maths', 'factorising quadratics GCSE', 'common factor GCSE algebra', 'factorising into double brackets GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Forming equations from context',
    tier: 'Both',
    overview: 'Forming equations involves translating a real-life situation into algebra, then solving the equation to find an unknown value. You must clearly define your variable.',
    keyFacts: [
      'Choose a letter to represent the unknown and state what it stands for.',
      'Translate words into algebra: "more than" = +, "times" = ×, "is" = =.',
      'Use the context to set up an equation, then solve it.',
      'Check your answer makes sense in the original context.',
      'Angles on a line, perimeters and ages are common contexts in GCSE questions.',
    ],
    workedExamples: [
      {
        question: 'The angles of a triangle are x°, (2x + 10)° and (x − 20)°. Find x.',
        steps: [
          'Angles in a triangle sum to 180°',
          'x + (2x + 10) + (x − 20) = 180',
          '4x − 10 = 180',
          '4x = 190',
          'x = 47.5',
        ],
        answer: 'x = 47.5°',
      },
      {
        question: 'Sam is 3 times as old as Tom. In 5 years, their ages will sum to 46. Find their current ages.',
        steps: [
          'Let Tom\'s age = t, so Sam\'s age = 3t',
          'In 5 years: (t + 5) + (3t + 5) = 46',
          '4t + 10 = 46',
          '4t = 36',
          't = 9, so Tom is 9 and Sam is 27',
        ],
        answer: 'Tom is 9, Sam is 27',
      },
    ],
    commonMistakes: [
      'Setting up the equation incorrectly by misreading the context.',
      'Not defining the variable — writing equations without stating what x represents.',
      'Forgetting to check the answer fits the original problem (e.g. negative age).',
    ],
    examTips: [
      'Always write "Let x = …" before forming your equation.',
      'After solving, substitute back into the original context to verify your answer.',
    ],
    videoSearchTerms: ['forming and solving equations GCSE maths', 'setting up equations from words GCSE', 'algebraic problems GCSE', 'forming equations geometry GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Quadratic graphs',
    tier: 'Both',
    overview: 'A quadratic graph has the equation y = ax² + bx + c and produces a parabola (U-shape if a > 0, ∩-shape if a < 0). You need to draw them by completing a table of values and identify key features.',
    keyFacts: [
      'Quadratic graphs are parabolas — symmetrical U or ∩ shapes.',
      'The graph crosses the y-axis where x = 0 (substitute x = 0 to find the y-intercept).',
      'It crosses the x-axis where y = 0 (the roots of the quadratic).',
      'The turning point (vertex) lies on the line of symmetry x = −b/(2a).',
      'If a > 0, the parabola opens upward (minimum point); if a < 0, it opens downward (maximum point).',
    ],
    formulas: [
      { name: 'Line of symmetry', formula: 'x = −b / (2a)', notes: 'For y = ax² + bx + c' },
    ],
    workedExamples: [
      {
        question: 'Complete a table of values for y = x² − 3x + 2 for x = 0 to 4, and state the roots.',
        steps: [
          'x = 0: y = 0 − 0 + 2 = 2',
          'x = 1: y = 1 − 3 + 2 = 0',
          'x = 2: y = 4 − 6 + 2 = 0',
          'x = 3: y = 9 − 9 + 2 = 2',
          'x = 4: y = 16 − 12 + 2 = 6',
          'Roots (where y = 0): x = 1 and x = 2',
        ],
        answer: 'Roots at x = 1 and x = 2',
      },
      {
        question: 'Find the coordinates of the turning point of y = x² − 4x + 1.',
        steps: [
          'Line of symmetry: x = −(−4) / (2 × 1) = 4/2 = 2',
          'y at x = 2: y = 4 − 8 + 1 = −3',
          'Turning point is (2, −3)',
        ],
        answer: '(2, −3)',
      },
    ],
    commonMistakes: [
      'Arithmetic errors when substituting negative x values (remember (−2)² = 4, not −4).',
      'Drawing a V-shape instead of a smooth curve — quadratics are smooth parabolas.',
      'Not plotting enough points to identify the turning point accurately.',
    ],
    examTips: [
      'Always substitute carefully, especially with negative values — show each substitution step.',
      'Plot at least 5–7 points and join with a smooth curve, not straight lines.',
    ],
    videoSearchTerms: ['quadratic graphs GCSE maths', 'drawing parabolas GCSE', 'quadratic graph table of values GCSE', 'y = x squared GCSE graphs'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Real-life graphs',
    tier: 'Both',
    overview: 'Real-life graphs represent practical situations such as distance-time, conversion graphs and water-filling graphs. You need to read, interpret and sometimes draw these graphs.',
    keyFacts: [
      'On a distance-time graph, the gradient = speed. A flat line means stationary.',
      'On a speed-time graph, the gradient = acceleration, and the area under the graph = distance.',
      'Conversion graphs are straight lines through (or near) the origin.',
      'The y-intercept and gradient of a real-life graph both have practical meanings.',
      'A steeper gradient means a greater rate of change.',
    ],
    workedExamples: [
      {
        question: 'A distance-time graph shows a journey: 0 to 30 min covers 15 km, then stationary for 10 min, then returns 15 km in 20 min. Find the speed for the first section.',
        steps: [
          'Speed = distance ÷ time',
          'Distance = 15 km, Time = 30 min = 0.5 hours',
          'Speed = 15 ÷ 0.5 = 30 km/h',
        ],
        answer: '30 km/h',
      },
      {
        question: 'A graph converts pounds (£) to euros (€). It passes through (0, 0) and (50, 58). Use it to convert £120 to euros.',
        steps: [
          'Gradient (exchange rate) = 58 ÷ 50 = 1.16 euros per pound',
          '£120 × 1.16 = €139.20',
        ],
        answer: '€139.20',
      },
    ],
    commonMistakes: [
      'On a distance-time graph, misreading a horizontal section as movement rather than rest.',
      'Confusing distance-time and speed-time graphs — on speed-time, area = distance.',
      'Ignoring units — check whether time is in minutes or hours before calculating speed.',
    ],
    examTips: [
      'Always read axis labels and scales carefully before interpreting a graph.',
      'For distance-time graphs, the gradient (rise ÷ run) gives speed — include units in your answer.',
    ],
    videoSearchTerms: ['real life graphs GCSE maths', 'distance time graphs GCSE', 'interpreting graphs GCSE maths', 'conversion graphs GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Quadratic equations (factorising)',
    tier: 'Higher',
    overview: 'Quadratic equations have the form ax² + bx + c = 0. When the quadratic can be factorised, you set each bracket to zero to find the solutions (roots).',
    keyFacts: [
      'Rearrange to ax² + bx + c = 0 before factorising.',
      'Factorise into two brackets, then set each bracket = 0.',
      'A quadratic can have 0, 1 or 2 solutions.',
      'If the equation is x² = k, then x = ±√k.',
      'For ax² + bx + c where a ≠ 1, find factors of ac that sum to b.',
    ],
    workedExamples: [
      {
        question: 'Solve x² + x − 6 = 0',
        steps: [
          'Find factors of −6 that sum to +1: +3 and −2',
          '(x + 3)(x − 2) = 0',
          'x + 3 = 0 → x = −3',
          'x − 2 = 0 → x = 2',
        ],
        answer: 'x = −3 or x = 2',
      },
      {
        question: 'Solve 2x² + 5x − 3 = 0',
        steps: [
          'a × c = 2 × (−3) = −6',
          'Find factors of −6 that sum to 5: +6 and −1',
          '2x² + 6x − x − 3 = 0',
          '2x(x + 3) − 1(x + 3) = 0',
          '(2x − 1)(x + 3) = 0',
          'x = 1/2 or x = −3',
        ],
        answer: 'x = 1/2 or x = −3',
      },
    ],
    commonMistakes: [
      'Not rearranging to = 0 first (e.g. trying to factorise x² + x = 6).',
      'Only giving one solution — quadratics almost always have two.',
      'Setting ax² = 0 to get x = 0 instead of factorising properly.',
    ],
    examTips: [
      'Always rearrange so one side is zero before factorising.',
      'Check your solutions by substituting both back into the original equation.',
    ],
    videoSearchTerms: ['solving quadratics by factorising GCSE', 'quadratic equations factorising Higher GCSE', 'solving x squared GCSE maths', 'quadratic factorisation GCSE Higher'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Quadratic equations (formula)',
    tier: 'Higher',
    overview: 'The quadratic formula solves any quadratic equation ax² + bx + c = 0, including those that cannot be factorised. It is given on the formula sheet in some exams.',
    keyFacts: [
      'The formula is x = (−b ± √(b² − 4ac)) / (2a).',
      'The discriminant b² − 4ac determines the number of solutions: > 0 → two solutions, = 0 → one solution, < 0 → no real solutions.',
      'Substitute a, b and c carefully — include signs.',
      'Give answers to the required degree of accuracy (usually 3 significant figures or 2 decimal places).',
    ],
    formulas: [
      { name: 'Quadratic formula', formula: 'x = (−b ± √(b² − 4ac)) / (2a)', notes: 'For ax² + bx + c = 0' },
      { name: 'Discriminant', formula: 'Δ = b² − 4ac', notes: '> 0: two roots, = 0: one root, < 0: no real roots' },
    ],
    workedExamples: [
      {
        question: 'Solve 2x² − 5x − 3 = 0 using the quadratic formula. Give answers to 2 d.p.',
        steps: [
          'a = 2, b = −5, c = −3',
          'Discriminant: (−5)² − 4(2)(−3) = 25 + 24 = 49',
          'x = (5 ± √49) / 4 = (5 ± 7) / 4',
          'x = (5 + 7)/4 = 3 or x = (5 − 7)/4 = −0.5',
        ],
        answer: 'x = 3 or x = −0.5',
      },
      {
        question: 'Solve x² + 3x − 1 = 0. Give answers to 2 d.p.',
        steps: [
          'a = 1, b = 3, c = −1',
          'Discriminant: 9 + 4 = 13',
          'x = (−3 ± √13) / 2',
          'x = (−3 + 3.606) / 2 ≈ 0.30 or x = (−3 − 3.606) / 2 ≈ −3.30',
        ],
        answer: 'x ≈ 0.30 or x ≈ −3.30',
      },
    ],
    commonMistakes: [
      'Using b instead of −b (forgetting to negate b in the numerator).',
      'Calculating b² − 4ac as (b² − 4a)c or similar — apply BIDMAS carefully.',
      'Forgetting the ± and giving only one solution.',
    ],
    examTips: [
      'Write a, b and c clearly before substituting — include their signs.',
      'Compute the discriminant first, then take the square root, to reduce errors.',
    ],
    videoSearchTerms: ['quadratic formula GCSE Higher maths', 'using quadratic formula GCSE', 'discriminant GCSE maths', 'quadratic equation formula method GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Completing the square',
    tier: 'Higher',
    overview: 'Completing the square rewrites a quadratic in the form (x + p)² + q. This reveals the minimum (or maximum) point and can be used to solve quadratic equations.',
    keyFacts: [
      'x² + bx = (x + b/2)² − (b/2)²',
      'For y = x² + bx + c: completing the square gives y = (x + b/2)² + (c − (b/2)²).',
      'The minimum point (vertex) is at (−b/2, c − (b/2)²).',
      'To solve, rearrange so (x + p)² = k, then x = −p ± √k.',
      'For ax² + bx + c, first factor out a before completing the square.',
    ],
    formulas: [
      { name: 'Completing the square', formula: 'x² + bx + c = (x + b/2)² − (b/2)² + c' },
    ],
    workedExamples: [
      {
        question: 'Write x² − 6x + 11 in completed square form and find the minimum point.',
        steps: [
          'Half of −6 is −3',
          '(x − 3)² = x² − 6x + 9',
          'x² − 6x + 11 = (x − 3)² − 9 + 11 = (x − 3)² + 2',
          'Minimum point: (3, 2)',
        ],
        answer: '(x − 3)² + 2; minimum at (3, 2)',
      },
      {
        question: 'Solve x² + 4x − 3 = 0 by completing the square, giving answers in surd form.',
        steps: [
          '(x + 2)² − 4 − 3 = 0',
          '(x + 2)² = 7',
          'x + 2 = ±√7',
          'x = −2 + √7 or x = −2 − √7',
        ],
        answer: 'x = −2 ± √7',
      },
    ],
    commonMistakes: [
      'Halving the coefficient of x² instead of the coefficient of x.',
      'Forgetting to subtract (b/2)² after writing the squared bracket.',
      'Sign errors: for (x − 3)², the vertex is at x = +3, not x = −3.',
    ],
    examTips: [
      'Always halve the x-coefficient to find p, then subtract p² to compensate.',
      'Check by expanding your completed square form — it should give the original quadratic.',
    ],
    videoSearchTerms: ['completing the square GCSE Higher', 'completing the square method GCSE maths', 'vertex quadratic completing square GCSE', 'completing square solve equation GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Difference of two squares',
    tier: 'Higher',
    overview: 'The difference of two squares is a factorisation pattern: a² − b² = (a + b)(a − b). Recognising this pattern allows quick factorisation without trial and error.',
    keyFacts: [
      'a² − b² = (a + b)(a − b) — this only works for subtraction, not addition.',
      'Both terms must be perfect squares.',
      'Can be used to factorise expressions like 9x² − 16 or x² − 25.',
      'Useful for mental arithmetic: e.g. 99 × 101 = (100 − 1)(100 + 1) = 10000 − 1 = 9999.',
      'Always look for a common factor before applying the difference of two squares.',
    ],
    formulas: [
      { name: 'Difference of two squares', formula: 'a² − b² = (a + b)(a − b)' },
    ],
    workedExamples: [
      {
        question: 'Factorise 25x² − 49',
        steps: [
          'Recognise 25x² = (5x)² and 49 = 7²',
          'Apply a² − b² = (a + b)(a − b) with a = 5x, b = 7',
          '= (5x + 7)(5x − 7)',
        ],
        answer: '(5x + 7)(5x − 7)',
      },
      {
        question: 'Factorise 2x² − 18',
        steps: [
          'First take out common factor of 2: 2(x² − 9)',
          'Recognise x² − 9 = x² − 3²',
          '= 2(x + 3)(x − 3)',
        ],
        answer: '2(x + 3)(x − 3)',
      },
    ],
    commonMistakes: [
      'Trying to use this on a sum of squares: a² + b² cannot be factorised over the reals.',
      'Forgetting to take out a common factor before applying the pattern.',
      'Writing (a − b)(a − b) instead of (a + b)(a − b).',
    ],
    examTips: [
      'Always check if both terms are perfect squares — if not, this technique does not apply.',
      'Look for a common factor to remove first; then check for the difference of two squares.',
    ],
    videoSearchTerms: ['difference of two squares GCSE maths', 'factorising difference of two squares GCSE Higher', 'a squared minus b squared GCSE', 'difference of squares factorising GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Geometric sequences',
    tier: 'Higher',
    overview: 'In a geometric sequence, each term is found by multiplying the previous term by a fixed number called the common ratio (r). These are distinct from arithmetic sequences where a fixed amount is added.',
    keyFacts: [
      'Common ratio r = (any term) ÷ (previous term).',
      'nth term formula: aₙ = a × rⁿ⁻¹ where a is the first term.',
      'If |r| > 1 the sequence is growing (divergent); if |r| < 1 it is shrinking (convergent).',
      'If r is negative, terms alternate in sign.',
      'Geometric sequences appear in compound interest and exponential growth problems.',
    ],
    formulas: [
      { name: 'nth term', formula: 'aₙ = a × rⁿ⁻¹', notes: 'a = first term, r = common ratio' },
    ],
    workedExamples: [
      {
        question: 'Find the 6th term of the geometric sequence 3, 6, 12, 24, …',
        steps: [
          'Common ratio r = 6 ÷ 3 = 2',
          'nth term formula: aₙ = 3 × 2ⁿ⁻¹',
          'a₆ = 3 × 2⁵ = 3 × 32 = 96',
        ],
        answer: '96',
      },
      {
        question: 'The 2nd term of a geometric sequence is 12 and the 4th term is 108. Find the common ratio and the 1st term.',
        steps: [
          'a × r = 12 and a × r³ = 108',
          'Divide: r² = 108 ÷ 12 = 9, so r = 3',
          'a = 12 ÷ 3 = 4',
          '1st term = 4',
        ],
        answer: 'r = 3, first term = 4',
      },
    ],
    commonMistakes: [
      'Confusing geometric (multiply) with arithmetic (add) sequences.',
      'Using the wrong formula: using the arithmetic nth term a + (n−1)d for a geometric sequence.',
      'Not checking whether r is negative when alternating signs are present.',
    ],
    examTips: [
      'Calculate r by dividing consecutive terms — check it is constant for two or more pairs.',
      'Be careful with the index: the nth term uses rⁿ⁻¹, not rⁿ.',
    ],
    videoSearchTerms: ['geometric sequences GCSE Higher maths', 'common ratio geometric sequence GCSE', 'nth term geometric sequence GCSE', 'geometric progression GCSE maths'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Quadratic & cubic graphs',
    tier: 'Higher',
    overview: 'At Higher tier you need to sketch and interpret quadratic, cubic and other polynomial graphs, identifying key features such as roots, turning points and intercepts.',
    keyFacts: [
      'Quadratic (y = ax² + bx + c): parabola; 0, 1 or 2 roots; one turning point.',
      'Cubic (y = ax³ + bx² + cx + d): S-shaped curve; up to 3 roots; up to 2 turning points.',
      'Positive cubic (a > 0): goes from bottom-left to top-right.',
      'Negative cubic (a < 0): goes from top-left to bottom-right.',
      'The y-intercept is always found by setting x = 0.',
      'Roots (x-intercepts) are found by setting y = 0.',
    ],
    workedExamples: [
      {
        question: 'Sketch y = x³ − 4x, labelling all intercepts.',
        steps: [
          'y-intercept: x = 0 → y = 0',
          'x-intercepts: x³ − 4x = 0 → x(x² − 4) = 0 → x(x+2)(x−2) = 0',
          'Roots at x = −2, 0, 2',
          'Positive cubic: rises from bottom-left to top-right, crossing x-axis at −2, 0 and 2',
        ],
        answer: 'Cubic crossing x-axis at x = −2, 0 and 2, y-intercept at origin',
      },
      {
        question: 'For y = x² − 5x + 4, find the roots and turning point.',
        steps: [
          'Factorise: (x − 1)(x − 4) = 0 → roots x = 1 and x = 4',
          'Line of symmetry: x = (1 + 4)/2 = 2.5',
          'y at x = 2.5: 6.25 − 12.5 + 4 = −2.25',
          'Turning point: (2.5, −2.25)',
        ],
        answer: 'Roots x = 1 and x = 4; turning point (2.5, −2.25)',
      },
    ],
    commonMistakes: [
      'Drawing a cubic as a simple curve without the S-shape characteristic.',
      'Missing the y-intercept when sketching.',
      'Confusing negative quadratic (∩ shape) with positive quadratic (U shape).',
    ],
    examTips: [
      'For sketches: label all intercepts with coordinates, mark the turning point, and show the correct general shape.',
      'Use factorisation to find roots rather than plotting individual points for sketch questions.',
    ],
    videoSearchTerms: ['quadratic cubic graphs GCSE Higher', 'sketching cubic graphs GCSE maths', 'polynomial graphs GCSE Higher', 'cubic graph shape GCSE maths'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Functions & function notation',
    tier: 'Higher',
    overview: 'Function notation f(x) describes a rule that maps inputs to outputs. You need to evaluate functions, find inputs from outputs, and understand domain and range.',
    keyFacts: [
      'f(x) = 2x + 3 means "double x then add 3".',
      'f(4) means substitute x = 4 into the function.',
      'f(x) = k means find the value of x that gives output k.',
      'The domain is the set of allowed inputs; the range is the set of possible outputs.',
      'A function maps each input to exactly one output.',
    ],
    workedExamples: [
      {
        question: 'Given f(x) = 3x² − 1, find f(−2) and solve f(x) = 11.',
        steps: [
          'f(−2) = 3(−2)² − 1 = 3(4) − 1 = 12 − 1 = 11',
          'For f(x) = 11: 3x² − 1 = 11 → 3x² = 12 → x² = 4 → x = ±2',
        ],
        answer: 'f(−2) = 11; x = 2 or x = −2',
      },
      {
        question: 'Given g(x) = (x + 1) / (x − 2), find g(5) and state any value excluded from the domain.',
        steps: [
          'g(5) = (5 + 1) / (5 − 2) = 6/3 = 2',
          'Domain exclusion: denominator = 0 when x = 2',
          'x = 2 is excluded from the domain',
        ],
        answer: 'g(5) = 2; x ≠ 2',
      },
    ],
    commonMistakes: [
      'Interpreting f(x) as f × x (multiplication) rather than function notation.',
      'Forgetting to include both ± when solving f(x) = k for a quadratic function.',
      'Confusing f(a) (evaluate at a) with f(x) = a (solve for x).',
    ],
    examTips: [
      'Treat f(x) as a substitution instruction — replace every x with the given value.',
      'When solving f(x) = k, rearrange the equation and solve just as you would any algebraic equation.',
    ],
    videoSearchTerms: ['function notation GCSE Higher maths', 'f(x) GCSE maths explained', 'evaluating functions GCSE Higher', 'functions GCSE maths domain range'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Composite & inverse functions',
    tier: 'Higher',
    overview: 'A composite function applies two functions in sequence: fg(x) means apply g first, then f. An inverse function f⁻¹(x) reverses the effect of f, mapping outputs back to inputs.',
    keyFacts: [
      'fg(x) means f(g(x)) — apply g first, then apply f to the result.',
      'gf(x) means g(f(x)) — order matters; fg(x) ≠ gf(x) in general.',
      'f⁻¹(x) is the inverse function: if f(a) = b then f⁻¹(b) = a.',
      'To find f⁻¹(x): replace f(x) with y, swap x and y, then rearrange for y.',
      'ff⁻¹(x) = x for all valid inputs.',
    ],
    workedExamples: [
      {
        question: 'Given f(x) = 2x + 1 and g(x) = x², find fg(3) and gf(3).',
        steps: [
          'fg(3): first g(3) = 3² = 9, then f(9) = 2(9) + 1 = 19',
          'gf(3): first f(3) = 2(3) + 1 = 7, then g(7) = 7² = 49',
        ],
        answer: 'fg(3) = 19; gf(3) = 49',
      },
      {
        question: 'Find f⁻¹(x) given f(x) = (3x − 2) / 5.',
        steps: [
          'Let y = (3x − 2) / 5',
          'Swap x and y: x = (3y − 2) / 5',
          'Multiply both sides by 5: 5x = 3y − 2',
          'Add 2: 3y = 5x + 2',
          'Divide by 3: y = (5x + 2) / 3',
          'f⁻¹(x) = (5x + 2) / 3',
        ],
        answer: 'f⁻¹(x) = (5x + 2) / 3',
      },
    ],
    commonMistakes: [
      'Reversing the order in fg(x) — always apply the function nearest to x first.',
      'Finding f⁻¹(x) as 1/f(x) (the reciprocal) instead of the inverse function.',
      'Forgetting to swap x and y when finding the inverse.',
    ],
    examTips: [
      'For composite functions: work from inside out — the function closest to x acts first.',
      'To find inverse: write y =, swap x and y, rearrange for y — then write f⁻¹(x) =.',
    ],
    videoSearchTerms: ['composite functions GCSE Higher maths', 'inverse functions GCSE maths', 'fg(x) GCSE Higher algebra', 'composite inverse functions GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Transformation of graphs',
    tier: 'Higher',
    overview: 'Graphs can be transformed by translations, reflections and stretches. Understanding how changes to the equation affect the graph is a key Higher topic.',
    keyFacts: [
      'f(x) + a: translation by (0, a) — shifts the graph up by a (or down if a < 0).',
      'f(x + a): translation by (−a, 0) — shifts the graph left by a (note the sign change).',
      '−f(x): reflection in the x-axis.',
      'f(−x): reflection in the y-axis.',
      'af(x): vertical stretch by scale factor a.',
      'f(ax): horizontal stretch by scale factor 1/a.',
    ],
    workedExamples: [
      {
        question: 'The graph of y = f(x) passes through (2, 5). Write down the coordinates of this point after the transformation y = f(x + 3).',
        steps: [
          'f(x + 3) is a translation of (−3, 0)',
          'x-coordinate: 2 − 3 = −1',
          'y-coordinate: unchanged at 5',
          'New point: (−1, 5)',
        ],
        answer: '(−1, 5)',
      },
      {
        question: 'Describe the transformation from y = x² to y = (x − 2)² + 3.',
        steps: [
          'f(x − 2): translation of (+2, 0) — shifts right by 2',
          '+ 3: translation of (0, +3) — shifts up by 3',
          'Overall: translation by vector (2, 3)',
        ],
        answer: 'Translation by vector (2, 3)',
      },
    ],
    commonMistakes: [
      'f(x + a) shifts left (not right) — the sign inside the bracket is opposite to the direction of movement.',
      'Confusing vertical and horizontal stretches.',
      'Applying transformations in the wrong order when combining them.',
    ],
    examTips: [
      'For translations inside the bracket f(x ± a), remember the shift is in the opposite direction to the sign.',
      'Learn all six transformation rules thoroughly — they are regularly tested at Higher.',
    ],
    videoSearchTerms: ['transformation of graphs GCSE Higher', 'graph transformations GCSE maths', 'translations reflections stretches graphs GCSE', 'f(x+a) graph shift GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Iteration',
    tier: 'Higher',
    overview: 'Iteration is a numerical method for finding approximate solutions to equations by repeatedly applying a rearrangement formula, starting with an initial estimate.',
    keyFacts: [
      'An iterative formula has the form xₙ₊₁ = f(xₙ) — each new value is calculated from the previous one.',
      'Start with an initial value x₀ (usually given in the question).',
      'Repeat the process until the answer converges (successive values agree to the required d.p.).',
      'Iteration finds approximate roots, not exact ones.',
      'The formula must be rearranged from the original equation.',
    ],
    workedExamples: [
      {
        question: 'Use the iterative formula xₙ₊₁ = √(5 + xₙ) with x₀ = 3 to find x₃ to 3 d.p.',
        steps: [
          'x₁ = √(5 + 3) = √8 = 2.8284…',
          'x₂ = √(5 + 2.8284) = √7.8284 = 2.7979…',
          'x₃ = √(5 + 2.7979) = √7.7979 = 2.7925…',
          'x₃ ≈ 2.793',
        ],
        answer: 'x₃ ≈ 2.793',
      },
      {
        question: 'Show that x³ − x − 7 = 0 has a root between x = 2 and x = 3.',
        steps: [
          'Let f(x) = x³ − x − 7',
          'f(2) = 8 − 2 − 7 = −1 (negative)',
          'f(3) = 27 − 3 − 7 = 17 (positive)',
          'Sign change → root lies between x = 2 and x = 3',
        ],
        answer: 'Sign change between f(2) = −1 and f(3) = 17 confirms a root exists in the interval.',
      },
    ],
    commonMistakes: [
      'Using xₙ in the formula before computing xₙ₊₁ — always compute step by step.',
      'Rounding intermediate values, which compounds errors — keep full calculator accuracy.',
      'Not identifying a sign change correctly when showing a root exists.',
    ],
    examTips: [
      'Store each iteration in your calculator memory to avoid rounding errors.',
      'Show all iterations clearly and state the final answer to the required accuracy.',
    ],
    videoSearchTerms: ['iteration GCSE Higher maths', 'iterative formula GCSE maths', 'numerical methods GCSE Higher', 'iteration roots equations GCSE'],
  },

  {
    topic: 'Algebra',
    subtopic: 'Algebraic proof',
    tier: 'Higher',
    overview: 'Algebraic proof uses algebra to prove that a statement is always true (or always false). You show that an expression is equivalent to the required form for all values of the variable.',
    keyFacts: [
      'An even number can be written as 2n; an odd number as 2n + 1 (where n is an integer).',
      'Consecutive integers: n, n+1, n+2; consecutive even: 2n, 2n+2; consecutive odd: 2n+1, 2n+3.',
      'To prove an expression is always even, show it equals 2 × (integer).',
      'To prove an expression is always odd, show it equals 2 × (integer) + 1.',
      'Expand and simplify fully, then factorise to show the required property.',
      'A counterexample (one value that fails) is enough to disprove a statement.',
    ],
    workedExamples: [
      {
        question: 'Prove that the sum of three consecutive integers is always a multiple of 3.',
        steps: [
          'Let the integers be n, n + 1, n + 2',
          'Sum = n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)',
          '3(n + 1) is always a multiple of 3',
        ],
        answer: 'Proven: the sum = 3(n + 1) which is always divisible by 3.',
      },
      {
        question: 'Prove that (n + 3)² − (n + 1)² is always a multiple of 4.',
        steps: [
          'Expand (n + 3)² = n² + 6n + 9',
          'Expand (n + 1)² = n² + 2n + 1',
          'Difference = (n² + 6n + 9) − (n² + 2n + 1) = 4n + 8 = 4(n + 2)',
          '4(n + 2) is always divisible by 4',
        ],
        answer: 'Proven: the expression = 4(n + 2), always a multiple of 4.',
      },
    ],
    commonMistakes: [
      'Using specific numbers (e.g. n = 3) — this shows an example, not a proof.',
      'Not fully expanding brackets before simplifying.',
      'Failing to factorise the result to show divisibility.',
    ],
    examTips: [
      'Always use algebraic expressions (2n, 2n+1 etc.) — never use specific numbers in a proof.',
      'End by clearly stating what you have shown, e.g. "This is divisible by 4 for all integer values of n."',
    ],
    videoSearchTerms: ['algebraic proof GCSE Higher maths', 'proof consecutive integers GCSE', 'algebraic proof even odd GCSE', 'GCSE Higher maths proof questions'],
  },

  // ══════════════════════════════════════════════════
  // GEOMETRY & MEASURES (new entries)
  // ══════════════════════════════════════════════════

  {
    topic: 'Geometry & Measures',
    subtopic: 'Angles in parallel lines',
    tier: 'Both',
    overview: 'When a line (transversal) crosses two parallel lines, it creates special pairs of angles. These angle relationships — alternate, corresponding and co-interior — are used to find missing angles.',
    keyFacts: [
      'Alternate angles are equal (Z-angles): they appear on opposite sides of the transversal.',
      'Corresponding angles are equal (F-angles): they appear in matching positions at each intersection.',
      'Co-interior angles (same-side interior or C-angles) sum to 180°.',
      'Vertically opposite angles are equal wherever two lines cross.',
      'Angles on a straight line sum to 180°; angles around a point sum to 360°.',
    ],
    workedExamples: [
      {
        question: 'Two parallel lines are cut by a transversal. One angle is 65°. Find the alternate angle and the co-interior angle.',
        steps: [
          'Alternate angle = 65° (equal, Z-angle)',
          'Co-interior angle = 180° − 65° = 115°',
        ],
        answer: 'Alternate angle = 65°; co-interior angle = 115°',
      },
      {
        question: 'Find angle x: a transversal crosses two parallel lines. The corresponding angle to x is (3x − 20)°.',
        steps: [
          'Corresponding angles are equal: x = 3x − 20',
          '20 = 2x',
          'x = 10°',
        ],
        answer: 'x = 10°',
      },
    ],
    commonMistakes: [
      'Confusing alternate (Z) and co-interior (C) angles — alternate are equal, co-interior sum to 180°.',
      'Assuming angles are alternate or corresponding without confirming the lines are parallel.',
      'Forgetting to state the angle fact used — examiners require reasoning.',
    ],
    examTips: [
      'Always state the reason: "alternate angles are equal" or "co-interior angles sum to 180°".',
      'Mark parallel lines with arrows and label all known angles before working through the problem.',
    ],
    videoSearchTerms: ['angles in parallel lines GCSE maths', 'alternate corresponding co-interior angles GCSE', 'parallel lines transversal GCSE', 'Z angles F angles GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Properties of polygons',
    tier: 'Both',
    overview: 'A polygon is a closed 2D shape with straight sides. You need to know the properties of regular and irregular polygons, including angle sums and names.',
    keyFacts: [
      'Interior angle sum of a polygon with n sides = (n − 2) × 180°.',
      'Each interior angle of a regular polygon = (n − 2) × 180° ÷ n.',
      'Each exterior angle of a regular polygon = 360° ÷ n.',
      'Interior + exterior angle = 180° (angles on a straight line).',
      'The sum of all exterior angles of any polygon = 360°.',
      'Regular polygons have all sides equal and all angles equal.',
    ],
    formulas: [
      { name: 'Interior angle sum', formula: '(n − 2) × 180°', notes: 'n = number of sides' },
      { name: 'Each interior angle (regular)', formula: '(n − 2) × 180° ÷ n' },
      { name: 'Each exterior angle (regular)', formula: '360° ÷ n' },
    ],
    workedExamples: [
      {
        question: 'Find the interior angle of a regular hexagon.',
        steps: [
          'n = 6',
          'Interior angle sum = (6 − 2) × 180° = 4 × 180° = 720°',
          'Each interior angle = 720° ÷ 6 = 120°',
        ],
        answer: '120°',
      },
      {
        question: 'A regular polygon has exterior angles of 24°. How many sides does it have?',
        steps: [
          'Number of sides = 360° ÷ exterior angle',
          'n = 360° ÷ 24° = 15',
        ],
        answer: '15 sides',
      },
    ],
    commonMistakes: [
      'Using the interior angle sum formula for just one interior angle without dividing by n.',
      'Confusing interior and exterior angles.',
      'Forgetting that the exterior angle formula (360 ÷ n) only works for regular polygons.',
    ],
    examTips: [
      'Learn the formula (n − 2) × 180° — it works for all polygons, regular or irregular.',
      'For exterior angles: they always sum to 360° regardless of the number of sides.',
    ],
    videoSearchTerms: ['interior exterior angles polygons GCSE', 'regular polygon angles GCSE maths', 'angle sum polygon GCSE', 'properties of polygons GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Perimeter & area',
    tier: 'Both',
    overview: 'Perimeter is the total distance around the outside of a shape. Area is the amount of space enclosed within a shape. Different formulas apply to different shapes.',
    keyFacts: [
      'Perimeter = sum of all side lengths.',
      'Area of a rectangle = length × width.',
      'Area of a parallelogram = base × perpendicular height.',
      'Area of a trapezium = ½ × (a + b) × h, where a and b are parallel sides.',
      'Units of area are squared (cm², m²); units of perimeter are linear (cm, m).',
    ],
    formulas: [
      { name: 'Rectangle area', formula: 'A = l × w' },
      { name: 'Parallelogram area', formula: 'A = b × h', notes: 'h is perpendicular height' },
      { name: 'Trapezium area', formula: 'A = ½(a + b)h', notes: 'a and b are parallel sides' },
    ],
    workedExamples: [
      {
        question: 'Find the area and perimeter of a rectangle with length 9 cm and width 5 cm.',
        steps: [
          'Area = 9 × 5 = 45 cm²',
          'Perimeter = 2(9 + 5) = 2 × 14 = 28 cm',
        ],
        answer: 'Area = 45 cm², Perimeter = 28 cm',
      },
      {
        question: 'Find the area of a trapezium with parallel sides 8 cm and 5 cm, and height 4 cm.',
        steps: [
          'A = ½ × (a + b) × h',
          'A = ½ × (8 + 5) × 4',
          'A = ½ × 13 × 4 = 26 cm²',
        ],
        answer: '26 cm²',
      },
    ],
    commonMistakes: [
      'Confusing perimeter (length) with area (length²) and using the wrong units.',
      'Using the slant height instead of the perpendicular height in area formulas.',
      'Forgetting to halve in the trapezium formula.',
    ],
    examTips: [
      'Always include units in your answer — area needs squared units, perimeter needs linear units.',
      'Identify the perpendicular height — it must be at right angles to the base.',
    ],
    videoSearchTerms: ['perimeter and area GCSE maths', 'area of trapezium GCSE', 'area parallelogram GCSE maths', 'perimeter area shapes GCSE Foundation'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Area of triangles & quadrilaterals',
    tier: 'Both',
    overview: 'You need to find areas of triangles, rectangles, parallelograms, rhombuses and kites using appropriate formulas. Compound shapes can be split into simpler components.',
    keyFacts: [
      'Area of a triangle = ½ × base × perpendicular height.',
      'Area of a rhombus or kite = ½ × d₁ × d₂ (product of diagonals ÷ 2).',
      'For compound shapes: split into rectangles and triangles, find each area, then add (or subtract).',
      'Always use the perpendicular height, not the slant side.',
      'Area is always measured in square units.',
    ],
    formulas: [
      { name: 'Triangle area', formula: 'A = ½ × b × h', notes: 'h is perpendicular height' },
      { name: 'Kite/Rhombus area', formula: 'A = ½ × d₁ × d₂', notes: 'd₁, d₂ are diagonals' },
    ],
    workedExamples: [
      {
        question: 'Find the area of a triangle with base 10 cm and perpendicular height 7 cm.',
        steps: [
          'A = ½ × 10 × 7 = ½ × 70 = 35 cm²',
        ],
        answer: '35 cm²',
      },
      {
        question: 'Find the area of an L-shaped compound shape: outer rectangle 8 × 6 cm, with a 3 × 2 cm rectangle cut from one corner.',
        steps: [
          'Area of outer rectangle = 8 × 6 = 48 cm²',
          'Area of cut section = 3 × 2 = 6 cm²',
          'Area of compound shape = 48 − 6 = 42 cm²',
        ],
        answer: '42 cm²',
      },
    ],
    commonMistakes: [
      'Using the slant height of a triangle instead of the perpendicular height.',
      'Adding areas instead of subtracting when finding the area of a shape with a piece removed.',
      'Forgetting the ½ in the triangle area formula.',
    ],
    examTips: [
      'Draw a diagram and mark the perpendicular height clearly before calculating.',
      'For compound shapes, draw lines to split them into rectangles and triangles and work out each part.',
    ],
    videoSearchTerms: ['area of triangle GCSE maths', 'area compound shapes GCSE', 'area quadrilaterals GCSE maths', 'area kite rhombus GCSE'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Surface area',
    tier: 'Both',
    overview: 'Surface area is the total area of all faces of a 3D shape. You calculate the area of each face separately and add them together.',
    keyFacts: [
      'Surface area of a cuboid = 2(lw + lh + wh).',
      'Surface area of a cylinder = 2πr² + 2πrh (two circular ends + curved surface).',
      'Surface area of a triangular prism = sum of the two triangular faces + three rectangular faces.',
      'Nets help visualise surface area — unfold the shape and find the total area.',
      'Units are always square units (cm², m²).',
    ],
    formulas: [
      { name: 'Cuboid', formula: 'SA = 2(lw + lh + wh)' },
      { name: 'Cylinder', formula: 'SA = 2πr² + 2πrh', notes: 'Curved surface = 2πrh; each end = πr²' },
    ],
    workedExamples: [
      {
        question: 'Find the surface area of a cuboid with length 5 cm, width 3 cm and height 4 cm.',
        steps: [
          'Top and bottom: 2 × (5 × 3) = 30',
          'Front and back: 2 × (5 × 4) = 40',
          'Left and right sides: 2 × (3 × 4) = 24',
          'Total = 30 + 40 + 24 = 94 cm²',
        ],
        answer: '94 cm²',
      },
      {
        question: 'Find the surface area of a cylinder with radius 4 cm and height 10 cm. Give your answer in terms of π.',
        steps: [
          'Two circular ends: 2 × π × 4² = 32π',
          'Curved surface: 2 × π × 4 × 10 = 80π',
          'Total = 32π + 80π = 112π cm²',
        ],
        answer: '112π cm²',
      },
    ],
    commonMistakes: [
      'Forgetting pairs of faces — each face of a cuboid appears twice (top/bottom, front/back, sides).',
      'Confusing surface area with volume.',
      'Only finding the curved surface of a cylinder and forgetting the two circular ends.',
    ],
    examTips: [
      'Sketch the net of the shape to identify all faces before calculating.',
      'Check you have the right number of faces — a cuboid has 6, a triangular prism has 5.',
    ],
    videoSearchTerms: ['surface area GCSE maths', 'surface area cuboid cylinder GCSE', 'surface area 3D shapes GCSE', 'surface area prism GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Transformations (RREST)',
    tier: 'Both',
    overview: 'The four transformations are Rotation, Reflection, Enlargement and Translation (RREST). Each moves or resizes a shape in a specific way, and you must describe them fully.',
    keyFacts: [
      'Translation: described by a column vector (x, y) — x is right/left, y is up/down.',
      'Reflection: described by the mirror line (e.g. y = x, x = 2).',
      'Rotation: described by the centre, angle, and direction (clockwise/anticlockwise).',
      'Enlargement: described by the centre of enlargement and scale factor. Scale factor > 1 enlarges, 0 < SF < 1 reduces.',
      'After a translation, reflection or rotation, the shape is congruent to the original (same size and shape).',
      'Enlargement changes size but preserves angles.',
    ],
    workedExamples: [
      {
        question: 'Describe fully the transformation that maps shape A to shape B, where B is the mirror image of A in the line y = −1.',
        steps: [
          'The shapes are congruent and mirror images → reflection',
          'Identify the mirror line between corresponding points → y = −1',
          'Transformation: Reflection in the line y = −1',
        ],
        answer: 'Reflection in the line y = −1',
      },
      {
        question: 'Enlarge triangle with vertices (1,1), (3,1), (1,3) by scale factor 2, centre (0,0).',
        steps: [
          'Multiply each coordinate by the scale factor 2',
          '(1,1) → (2,2)',
          '(3,1) → (6,2)',
          '(1,3) → (2,6)',
        ],
        answer: 'New vertices: (2,2), (6,2), (2,6)',
      },
    ],
    commonMistakes: [
      'Not fully describing a transformation — missing the mirror line, centre of rotation, or scale factor.',
      'Using scale factor incorrectly in enlargement: multiplying coordinates by SF from the wrong origin.',
      'Confusing rotation direction (clockwise vs anticlockwise).',
    ],
    examTips: [
      'Always give a full description: rotation needs centre + angle + direction; enlargement needs centre + scale factor.',
      'Tracing paper is very helpful for rotations — ask for it in exams if not provided.',
    ],
    videoSearchTerms: ['transformations GCSE maths RREST', 'reflection rotation translation enlargement GCSE', 'describing transformations GCSE', 'enlargement scale factor GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Constructions & loci',
    tier: 'Both',
    overview: 'Constructions use a ruler and compasses to draw accurate geometric figures. Loci are sets of points satisfying a given condition — they are often arcs or straight lines.',
    keyFacts: [
      'Perpendicular bisector of AB: the locus of points equidistant from A and B — drawn with compasses.',
      'Angle bisector: the locus of points equidistant from two lines — drawn with compasses.',
      'Locus of points a fixed distance r from a point = circle of radius r.',
      'Locus of points equidistant from two parallel lines = parallel line halfway between them.',
      'Always leave construction arcs visible — do not rub them out.',
    ],
    workedExamples: [
      {
        question: 'Describe the locus of points that are exactly 3 cm from a fixed point P.',
        steps: [
          'The locus is all points at distance 3 cm from P',
          'This forms a circle with centre P and radius 3 cm',
        ],
        answer: 'A circle with centre P and radius 3 cm',
      },
      {
        question: 'Construct the perpendicular bisector of line segment AB of length 8 cm.',
        steps: [
          'Open compasses to more than half of AB (e.g. 5 cm)',
          'Draw arcs above and below AB from point A',
          'Without changing compass width, draw arcs from B — they cross the previous arcs',
          'Join the two crossing points — this is the perpendicular bisector',
        ],
        answer: 'A line through the midpoint of AB at 90° to AB',
      },
    ],
    commonMistakes: [
      'Rubbing out construction arcs — they must be left to show the method.',
      'Changing compass width between the two sets of arcs when constructing bisectors.',
      'Drawing loci as a single point rather than the full set of points.',
    ],
    examTips: [
      'Use a sharp pencil and keep compass arcs light but visible — never use a ruler for curved loci.',
      'Read loci questions carefully: "at least 3 cm" means shade the region outside a circle; "no more than 3 cm" means shade inside.',
    ],
    videoSearchTerms: ['constructions loci GCSE maths', 'perpendicular bisector construction GCSE', 'angle bisector GCSE compasses', 'locus of points GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Similarity',
    tier: 'Both',
    overview: 'Similar shapes have the same angles and corresponding sides in the same ratio (scale factor). You can use similarity to find missing lengths in 2D shapes and real-life problems.',
    keyFacts: [
      'Two shapes are similar if one is an enlargement of the other.',
      'Corresponding angles in similar shapes are equal.',
      'Scale factor = (length in image) ÷ (corresponding length in original).',
      'To find a missing length: identify the scale factor, then multiply or divide.',
      'Similar triangles often arise when parallel lines cut across a triangle.',
    ],
    formulas: [
      { name: 'Scale factor', formula: 'SF = new length ÷ original length' },
      { name: 'Missing length', formula: 'New length = original length × SF' },
    ],
    workedExamples: [
      {
        question: 'Two similar triangles have corresponding sides of 6 cm and 9 cm. The shorter triangle has a side of 8 cm. Find the corresponding side in the larger triangle.',
        steps: [
          'Scale factor = 9 ÷ 6 = 1.5',
          'Missing side = 8 × 1.5 = 12 cm',
        ],
        answer: '12 cm',
      },
      {
        question: 'A 1.8 m tall person casts a shadow of 2.4 m. A tree casts a shadow of 10 m at the same time. Find the height of the tree.',
        steps: [
          'The triangles formed are similar (same sun angle)',
          'Scale factor = 10 ÷ 2.4 = 25/6',
          'Tree height = 1.8 × (25/6) = 7.5 m',
        ],
        answer: '7.5 m',
      },
    ],
    commonMistakes: [
      'Comparing non-corresponding sides to find the scale factor.',
      'Adding the scale factor instead of multiplying.',
      'Confusing similarity (same shape, different size) with congruence (identical shape and size).',
    ],
    examTips: [
      'Mark corresponding vertices with the same letters to identify matching sides correctly.',
      'Check: the scale factor should be the same for all pairs of corresponding sides.',
    ],
    videoSearchTerms: ['similarity GCSE maths', 'similar triangles GCSE', 'scale factor similar shapes GCSE', 'similar shapes missing sides GCSE'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Bearings',
    tier: 'Both',
    overview: 'Bearings are a way of expressing direction using angles measured clockwise from North. They are always written as three digits (e.g. 045°, 270°).',
    keyFacts: [
      'Bearings are measured clockwise from North.',
      'Always written as three digits: e.g. 050°, not 50°.',
      'North = 000°, East = 090°, South = 180°, West = 270°.',
      'Back bearing (return journey) = bearing + 180° (if < 360°) or bearing − 180° (if ≥ 180°).',
      'Use sine/cosine rules or scale drawings to find distances and angles.',
    ],
    workedExamples: [
      {
        question: 'A ship sails on a bearing of 065° for 40 km. Find the bearing for the return journey.',
        steps: [
          'Return bearing = 065° + 180° = 245°',
        ],
        answer: '245°',
      },
      {
        question: 'Point B is on a bearing of 130° from A. Find the bearing of A from B.',
        steps: [
          'The bearing of A from B is the back bearing',
          '130° + 180° = 310°',
        ],
        answer: '310°',
      },
    ],
    commonMistakes: [
      'Writing bearings with fewer than three digits (e.g. 45° instead of 045°).',
      'Measuring angles anticlockwise instead of clockwise from North.',
      'Forgetting that the bearing of A from B is different from the bearing of B from A.',
    ],
    examTips: [
      'Always draw a North line at the point you are measuring from before marking the angle.',
      'Remember: three digits, clockwise from North — double-check every bearing you write.',
    ],
    videoSearchTerms: ['bearings GCSE maths', 'bearings three figure GCSE', 'north bearings clockwise GCSE', 'back bearings GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: '3D shapes & nets',
    tier: 'Both',
    overview: 'You need to recognise and name 3D shapes, identify their faces, edges and vertices, and draw and interpret their nets. Euler\'s formula connects these properties.',
    keyFacts: [
      'A net is a 2D shape that folds to make a 3D solid.',
      'Cuboid: 6 faces, 12 edges, 8 vertices.',
      'Triangular prism: 5 faces (2 triangles, 3 rectangles), 9 edges, 6 vertices.',
      'Square-based pyramid: 5 faces, 8 edges, 5 vertices.',
      'Euler\'s formula: Faces + Vertices − Edges = 2.',
      'A cylinder has 2 circular faces, 1 curved surface, and no vertices.',
    ],
    workedExamples: [
      {
        question: 'A solid has 6 faces and 8 vertices. How many edges does it have? Use Euler\'s formula.',
        steps: [
          'F + V − E = 2',
          '6 + 8 − E = 2',
          '14 − E = 2',
          'E = 12',
        ],
        answer: '12 edges',
      },
      {
        question: 'Draw a net for a triangular prism with an equilateral triangle of side 4 cm and length 6 cm.',
        steps: [
          'The net consists of 2 equilateral triangles and 3 rectangles (each 4 × 6 cm)',
          'Draw a row of 3 rectangles side by side, then attach the two triangles to the top and bottom of the middle rectangle',
        ],
        answer: '2 equilateral triangles + 3 rectangles (4 cm × 6 cm)',
      },
    ],
    commonMistakes: [
      'Drawing an invalid net — one that doesn\'t fold into the correct solid.',
      'Miscounting faces by including curved surfaces as faces.',
      'Misapplying Euler\'s formula by using the wrong values.',
    ],
    examTips: [
      'To check a net, mentally fold it — all faces must join without overlap or gaps.',
      'Learn faces, edges and vertices for common shapes: cube, cuboid, prism, pyramid.',
    ],
    videoSearchTerms: ['3D shapes nets GCSE maths', 'nets 3D shapes GCSE Foundation', 'Euler formula faces edges vertices GCSE', '3D shapes properties GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Arc length & sector area',
    tier: 'Higher',
    overview: 'An arc is part of the circumference of a circle; a sector is a "pie slice" region. Arc length and sector area are calculated using the angle at the centre as a fraction of 360°.',
    keyFacts: [
      'Arc length = (θ/360°) × 2πr',
      'Sector area = (θ/360°) × πr²',
      'θ is the angle at the centre of the sector in degrees.',
      'A minor sector has θ < 180°; a major sector has θ > 180°.',
      'Perimeter of a sector = arc length + 2 radii.',
    ],
    formulas: [
      { name: 'Arc length', formula: 'l = (θ/360) × 2πr' },
      { name: 'Sector area', formula: 'A = (θ/360) × πr²' },
    ],
    workedExamples: [
      {
        question: 'Find the arc length and area of a sector with radius 8 cm and angle 135°.',
        steps: [
          'Arc length = (135/360) × 2π × 8 = (3/8) × 16π = 6π ≈ 18.85 cm',
          'Sector area = (135/360) × π × 8² = (3/8) × 64π = 24π ≈ 75.40 cm²',
        ],
        answer: 'Arc length = 6π cm ≈ 18.85 cm; Sector area = 24π cm² ≈ 75.40 cm²',
      },
      {
        question: 'A sector has an arc length of 10π cm and radius 12 cm. Find the angle θ.',
        steps: [
          '10π = (θ/360) × 2π × 12',
          '10π = (θ/360) × 24π',
          '10 = (θ/360) × 24',
          'θ = (10/24) × 360 = 150°',
        ],
        answer: 'θ = 150°',
      },
    ],
    commonMistakes: [
      'Using diameter instead of radius in the formulas.',
      'Forgetting to add the two radii when finding the perimeter of a sector.',
      'Not converting the angle to a fraction of 360° before multiplying.',
    ],
    examTips: [
      'Remember: arc length uses 2πr (circumference); sector area uses πr² (circle area) — just multiply by θ/360.',
      'Leave your answer in terms of π for exact values unless asked to round.',
    ],
    videoSearchTerms: ['arc length sector area GCSE Higher', 'arc length formula GCSE maths', 'sector area GCSE Higher circle', 'arc sector GCSE Higher maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Volume of pyramids, cones & spheres',
    tier: 'Higher',
    overview: 'Pyramids, cones and spheres have specific volume formulas. These are given on the formula sheet in some exams, but you need to know how to apply them correctly.',
    keyFacts: [
      'Volume of a pyramid = ⅓ × base area × height.',
      'Volume of a cone = ⅓ × π × r² × h.',
      'Volume of a sphere = (4/3) × π × r³.',
      'Curved surface area of a cone = πrl (where l = slant height).',
      'Surface area of a sphere = 4πr².',
      'The height used in the cone formula is the perpendicular height, not the slant height.',
    ],
    formulas: [
      { name: 'Pyramid volume', formula: 'V = ⅓ × base area × h' },
      { name: 'Cone volume', formula: 'V = ⅓πr²h' },
      { name: 'Sphere volume', formula: 'V = (4/3)πr³' },
      { name: 'Cone curved surface area', formula: 'CSA = πrl', notes: 'l = slant height' },
      { name: 'Sphere surface area', formula: 'SA = 4πr²' },
    ],
    workedExamples: [
      {
        question: 'Find the volume of a cone with radius 5 cm and perpendicular height 9 cm. Give your answer in terms of π.',
        steps: [
          'V = ⅓ × π × r² × h',
          'V = ⅓ × π × 25 × 9',
          'V = ⅓ × 225π = 75π cm³',
        ],
        answer: '75π cm³',
      },
      {
        question: 'A sphere has a volume of 288π cm³. Find its radius.',
        steps: [
          '(4/3)πr³ = 288π',
          '(4/3)r³ = 288',
          'r³ = 288 × (3/4) = 216',
          'r = ∛216 = 6 cm',
        ],
        answer: 'r = 6 cm',
      },
    ],
    commonMistakes: [
      'Using the slant height instead of the perpendicular height for cone volume.',
      'Forgetting the ⅓ in the pyramid and cone formulas.',
      'Squaring instead of cubing r in the sphere volume formula.',
    ],
    examTips: [
      'These formulas may be given — but know what each letter represents so you can substitute correctly.',
      'For spheres and cones: identify r first; for cones also identify h (perpendicular) and l (slant) separately.',
    ],
    videoSearchTerms: ['volume cone sphere pyramid GCSE Higher', 'sphere volume formula GCSE maths', 'cone volume GCSE Higher', 'pyramid volume GCSE maths'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Sine rule',
    tier: 'Higher',
    overview: 'The sine rule relates the sides and angles of any triangle. It is used when you know two angles and one side, or two sides and a non-included angle.',
    keyFacts: [
      'Sine rule: a/sin A = b/sin B = c/sin C (or its reciprocal form).',
      'Use to find a side: a = b × sin A / sin B.',
      'Use to find an angle: sin A = a × sin B / b.',
      'The ambiguous case occurs when finding an angle — there may be two possible solutions.',
      'Label sides a, b, c opposite to angles A, B, C respectively.',
    ],
    formulas: [
      { name: 'Sine rule (finding a side)', formula: 'a / sin A = b / sin B' },
      { name: 'Sine rule (finding an angle)', formula: 'sin A / a = sin B / b' },
    ],
    workedExamples: [
      {
        question: 'In triangle ABC, angle A = 42°, angle B = 68°, and side a = 9 cm. Find side b.',
        steps: [
          'b / sin B = a / sin A',
          'b / sin 68° = 9 / sin 42°',
          'b = 9 × sin 68° / sin 42° = 9 × 0.9272 / 0.6691',
          'b ≈ 12.47 cm',
        ],
        answer: 'b ≈ 12.47 cm',
      },
      {
        question: 'In triangle PQR, PQ = 11 cm, QR = 8 cm, and angle P = 35°. Find angle R.',
        steps: [
          'sin R / PQ = sin P / QR',
          'sin R = 11 × sin 35° / 8 = 11 × 0.5736 / 8 = 0.7887',
          'R = sin⁻¹(0.7887) ≈ 52.0°',
        ],
        answer: 'Angle R ≈ 52.0°',
      },
    ],
    commonMistakes: [
      'Using the sine rule when the cosine rule is needed (e.g. when two sides and the included angle are given).',
      'Pairing the wrong side with the wrong angle — side a must be opposite angle A.',
      'Not considering the obtuse angle solution in the ambiguous case.',
    ],
    examTips: [
      'When finding an angle, always check if the obtuse angle is also a valid solution.',
      'Label the triangle with sides a, b, c and angles A, B, C before starting.',
    ],
    videoSearchTerms: ['sine rule GCSE Higher maths', 'using sine rule to find sides angles GCSE', 'non-right triangle sine rule GCSE', 'sine rule ambiguous case GCSE Higher'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Cosine rule',
    tier: 'Higher',
    overview: 'The cosine rule is used in non-right-angled triangles when you have two sides and the included angle, or all three sides. It allows you to find the third side or a missing angle.',
    keyFacts: [
      'Cosine rule (finding a side): a² = b² + c² − 2bc cos A.',
      'Cosine rule (finding an angle): cos A = (b² + c² − a²) / (2bc).',
      'Use when given SAS (two sides and the included angle) or SSS (all three sides).',
      'The formula reduces to Pythagoras when A = 90° (cos 90° = 0).',
      'Always substitute carefully and use BIDMAS when evaluating.',
    ],
    formulas: [
      { name: 'Cosine rule (side)', formula: 'a² = b² + c² − 2bc cos A' },
      { name: 'Cosine rule (angle)', formula: 'cos A = (b² + c² − a²) / (2bc)' },
    ],
    workedExamples: [
      {
        question: 'In triangle ABC, b = 7 cm, c = 10 cm, angle A = 50°. Find side a.',
        steps: [
          'a² = b² + c² − 2bc cos A',
          'a² = 49 + 100 − 2(7)(10) cos 50°',
          'a² = 149 − 140 × 0.6428 = 149 − 89.99 = 59.01',
          'a = √59.01 ≈ 7.68 cm',
        ],
        answer: 'a ≈ 7.68 cm',
      },
      {
        question: 'In a triangle, sides are 5, 8 and 10 cm. Find the largest angle.',
        steps: [
          'Largest angle is opposite the longest side (10 cm)',
          'cos A = (5² + 8² − 10²) / (2 × 5 × 8) = (25 + 64 − 100) / 80 = −11/80',
          'A = cos⁻¹(−11/80) ≈ 97.9°',
        ],
        answer: 'Largest angle ≈ 97.9°',
      },
    ],
    commonMistakes: [
      'Subtracting b² + c² from 2bc cos A instead of the other way around.',
      'Forgetting to take the square root at the end when finding a side.',
      'Mixing up which angle is A — A must be opposite the side you are finding.',
    ],
    examTips: [
      'Decide between sine rule and cosine rule: cosine rule when you have SAS or SSS; sine rule otherwise.',
      'If cos A is negative, angle A is obtuse — this is valid, so don\'t be alarmed.',
    ],
    videoSearchTerms: ['cosine rule GCSE Higher maths', 'using cosine rule to find sides GCSE', 'cosine rule finding angle GCSE', 'sine or cosine rule GCSE Higher'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: '3D trigonometry & Pythagoras',
    tier: 'Higher',
    overview: 'Problems in 3D require you to identify right-angled triangles within 3D shapes and apply Pythagoras\' theorem or trigonometry to find lengths and angles.',
    keyFacts: [
      'Always identify a right-angled triangle within the 3D shape before applying formulas.',
      'To find the length of a space diagonal in a cuboid: apply Pythagoras twice (or use √(l² + w² + h²)).',
      'To find angles in 3D: identify a 2D right-angled triangle, then use SOH-CAH-TOA.',
      'The angle of elevation or depression in 3D problems uses the same trigonometric ratios.',
      'Draw and label the relevant 2D triangle extracted from the 3D shape.',
    ],
    formulas: [
      { name: 'Space diagonal of cuboid', formula: 'd = √(l² + w² + h²)' },
    ],
    workedExamples: [
      {
        question: 'A cuboid is 6 cm × 4 cm × 3 cm. Find the length of the space diagonal.',
        steps: [
          'd = √(6² + 4² + 3²)',
          'd = √(36 + 16 + 9) = √61',
          'd ≈ 7.81 cm',
        ],
        answer: '√61 ≈ 7.81 cm',
      },
      {
        question: 'A pyramid has a square base of side 8 cm and height 6 cm. Find the angle between the slant edge and the base.',
        steps: [
          'The diagonal of the base = √(8² + 8²) = √128 = 8√2 cm',
          'Half the base diagonal = 4√2 cm',
          'tan θ = 6 / (4√2) = 6 / 5.657 = 1.0607',
          'θ = tan⁻¹(1.0607) ≈ 46.7°',
        ],
        answer: '≈ 46.7°',
      },
    ],
    commonMistakes: [
      'Not identifying the correct right-angled triangle within the 3D shape.',
      'Using the wrong dimensions — confusing height with slant height.',
      'Not extracting and drawing the 2D triangle before applying trigonometry.',
    ],
    examTips: [
      'Always draw the 2D triangle you are working with, labelled with known measurements.',
      'Apply Pythagoras step by step: find a 2D diagonal first, then use it in a second triangle.',
    ],
    videoSearchTerms: ['3D Pythagoras GCSE Higher maths', '3D trigonometry GCSE Higher', 'space diagonal cuboid GCSE', '3D trig problems GCSE Higher'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Circle theorems',
    tier: 'Higher',
    overview: 'Circle theorems are rules about angles and lines within circles. There are seven key theorems you must know for GCSE Higher, and you must state the theorem used in your working.',
    keyFacts: [
      'Angle at centre = 2 × angle at circumference (same arc).',
      'Angles in the same segment are equal.',
      'Angle in a semicircle = 90° (angle subtended by a diameter).',
      'Opposite angles in a cyclic quadrilateral sum to 180°.',
      'Tangent to a circle is perpendicular to the radius at the point of contact.',
      'Tangents from an external point are equal in length.',
      'Alternate segment theorem: angle between tangent and chord = angle in alternate segment.',
    ],
    workedExamples: [
      {
        question: 'O is the centre of a circle. Angle AOB = 112°. Find angle ACB, where C is a point on the major arc.',
        steps: [
          'Angle at centre = 2 × angle at circumference',
          'Angle ACB = 112° ÷ 2 = 56°',
        ],
        answer: '56°',
      },
      {
        question: 'ABCD is a cyclic quadrilateral. Angle A = 78° and angle B = 105°. Find angles C and D.',
        steps: [
          'Opposite angles in a cyclic quadrilateral sum to 180°',
          'Angle C = 180° − 78° = 102°',
          'Angle D = 180° − 105° = 75°',
        ],
        answer: 'C = 102°, D = 75°',
      },
    ],
    commonMistakes: [
      'Confusing angle at the centre with angle at the circumference — the centre angle is always double.',
      'Not stating the circle theorem used — examiners require the reason.',
      'Assuming all angles in the same circle are equal (they must be subtended by the same arc).',
    ],
    examTips: [
      'Learn all seven theorems by name and always write the full theorem as your reason.',
      'Mark the centre O clearly and identify which arc the angles are subtended by before applying theorems.',
    ],
    videoSearchTerms: ['circle theorems GCSE Higher maths', 'all circle theorems GCSE', 'angle at centre twice GCSE', 'cyclic quadrilateral GCSE Higher'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Similarity & congruence',
    tier: 'Higher',
    overview: 'At Higher tier, similarity is extended to area and volume scale factors. Congruence requires proving triangles identical using the four conditions: SSS, SAS, ASA and RHS.',
    keyFacts: [
      'If linear scale factor is k, then area scale factor is k², and volume scale factor is k³.',
      'Two triangles are congruent if they satisfy: SSS, SAS, ASA (or AAS) or RHS.',
      'Similar triangles have equal corresponding angles and sides in the same ratio.',
      'To find the area of a similar shape: Area₂ = Area₁ × k².',
      'To find the volume of a similar solid: Volume₂ = Volume₁ × k³.',
    ],
    formulas: [
      { name: 'Area scale factor', formula: 'ASF = k²', notes: 'k is the linear scale factor' },
      { name: 'Volume scale factor', formula: 'VSF = k³' },
    ],
    workedExamples: [
      {
        question: 'Two similar cylinders have heights 4 cm and 10 cm. If the smaller has volume 48 cm³, find the volume of the larger.',
        steps: [
          'Linear scale factor k = 10 ÷ 4 = 2.5',
          'Volume scale factor = k³ = 2.5³ = 15.625',
          'Larger volume = 48 × 15.625 = 750 cm³',
        ],
        answer: '750 cm³',
      },
      {
        question: 'Two similar triangles have areas 9 cm² and 25 cm². A side in the smaller triangle is 6 cm. Find the corresponding side in the larger triangle.',
        steps: [
          'Area scale factor = 25/9',
          'Linear scale factor = √(25/9) = 5/3',
          'Corresponding side = 6 × (5/3) = 10 cm',
        ],
        answer: '10 cm',
      },
    ],
    commonMistakes: [
      'Using the linear scale factor for area (should be k²) or volume (should be k³).',
      'Forgetting to square root the area ratio to find the linear scale factor.',
      'Confusing congruence conditions: RHS (right angle, hypotenuse, side) is not the same as SSS.',
    ],
    examTips: [
      'Always identify k (linear scale factor) first, then square for area or cube for volume.',
      'For congruence proofs, state the condition used (SSS, SAS, ASA or RHS) explicitly.',
    ],
    videoSearchTerms: ['similarity area volume scale factor GCSE Higher', 'congruent triangles GCSE Higher', 'similar shapes volume GCSE maths', 'SSS SAS ASA RHS congruence GCSE'],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Vectors',
    tier: 'Higher',
    overview: 'Vectors represent quantities with both magnitude and direction. In GCSE, vectors are written as column vectors or using bold/underlined letters, and are used to prove geometric results.',
    keyFacts: [
      'A vector has magnitude (size) and direction.',
      'Column vector: (x, y) means x units right and y units up (negative = left/down).',
      'Adding vectors: add corresponding components: (a, b) + (c, d) = (a+c, b+d).',
      'Multiplying by a scalar: k(a, b) = (ka, kb).',
      'The negative of a vector reverses its direction: −a goes the opposite way to a.',
      'Parallel vectors are scalar multiples of each other.',
      'To prove three points are collinear: show one vector is a scalar multiple of another, sharing a common point.',
    ],
    formulas: [
      { name: 'Magnitude of vector', formula: '|v| = √(x² + y²)', notes: 'For column vector (x, y)' },
    ],
    workedExamples: [
      {
        question: 'OA = a and OB = b. M is the midpoint of AB. Find the vector OM.',
        steps: [
          'OM = OA + AM',
          'AM = ½ AB = ½(b − a)',
          'OM = a + ½(b − a) = a + ½b − ½a = ½a + ½b',
          'OM = ½(a + b)',
        ],
        answer: 'OM = ½(a + b)',
      },
      {
        question: 'Given a = (3, −1) and b = (−2, 4), find 2a − b.',
        steps: [
          '2a = (6, −2)',
          '2a − b = (6 − (−2), −2 − 4) = (8, −6)',
        ],
        answer: '(8, −6)',
      },
    ],
    commonMistakes: [
      'Confusing the direction of a vector: AB = B − A, not A − B.',
      'Forgetting to use the midpoint formula correctly when finding vectors through midpoints.',
      'Not simplifying vector expressions fully.',
    ],
    examTips: [
      'Always write vector paths clearly: e.g. to go from A to C via B: AC = AB + BC.',
      'To prove collinearity: show that two vectors sharing a point are parallel (one is a multiple of the other).',
    ],
    videoSearchTerms: ['vectors GCSE Higher maths', 'vector addition subtraction GCSE', 'vectors proof GCSE Higher', 'column vectors GCSE maths Higher'],
  },

  // ══════════════════════════════════════════════════
  // STATISTICS & PROBABILITY (new entries)
  // ══════════════════════════════════════════════════

  {
    topic: 'Statistics & Probability',
    subtopic: 'Frequency tables',
    tier: 'Both',
    overview: 'Frequency tables organise data by listing values (or groups) and how often each occurs. You use them to find averages and draw charts.',
    keyFacts: [
      'Frequency = how many times a value occurs.',
      'A tally chart groups frequencies as data is collected.',
      'To find the mean from a frequency table: sum of (value × frequency) ÷ total frequency.',
      'The mode is the value with the highest frequency.',
      'The median is found by locating the middle value using cumulative frequency.',
      'Grouped frequency tables use class intervals (e.g. 10 ≤ x < 20).',
    ],
    formulas: [
      { name: 'Mean from frequency table', formula: 'Mean = Σ(x × f) / Σf', notes: 'x = value, f = frequency' },
    ],
    workedExamples: [
      {
        question: 'The table shows scores: Score 1(f=3), 2(f=5), 3(f=4), 4(f=2), 5(f=1). Find the mean.',
        steps: [
          'Σ(x × f) = 1×3 + 2×5 + 3×4 + 4×2 + 5×1 = 3 + 10 + 12 + 8 + 5 = 38',
          'Σf = 3 + 5 + 4 + 2 + 1 = 15',
          'Mean = 38 ÷ 15 = 2.53 (2 d.p.)',
        ],
        answer: 'Mean ≈ 2.53',
      },
      {
        question: 'From the same table, find the median.',
        steps: [
          'Total frequency = 15, so median is the 8th value',
          'Cumulative frequencies: 3, 8, 12, 14, 15',
          'The 8th value falls in the score 2 group (cumulative reaches 8)',
          'Median = 2',
        ],
        answer: 'Median = 2',
      },
    ],
    commonMistakes: [
      'Finding the mean by averaging the values without weighting by frequency.',
      'Reading the modal class instead of the modal value in a frequency table.',
      'Miscounting cumulative frequency when finding the median position.',
    ],
    examTips: [
      'Add a "x × f" column to the table — it makes the mean calculation much less error-prone.',
      'For the median, find the position (n+1)/2 first, then locate which group that falls in.',
    ],
    videoSearchTerms: ['frequency tables GCSE maths', 'mean from frequency table GCSE', 'median frequency table GCSE', 'frequency table averages GCSE'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Bar charts & pictograms',
    tier: 'Both',
    overview: 'Bar charts and pictograms are ways to display categorical or discrete data. You need to draw them accurately and use them to read off and compare data values.',
    keyFacts: [
      'In a bar chart, the height (or length) of each bar represents the frequency.',
      'Bars in a bar chart should be equal width with gaps between them (for discrete data).',
      'A dual bar chart compares two data sets side by side.',
      'In a pictogram, each symbol represents a fixed number of items — use the key.',
      'Half a symbol in a pictogram represents half the key value.',
      'Frequency density is not used for bar charts — only for histograms.',
    ],
    workedExamples: [
      {
        question: 'A pictogram uses ★ = 4 students. A subject has 3½ stars. How many students chose it?',
        steps: [
          'Each star = 4 students',
          '3½ stars = 3.5 × 4 = 14 students',
        ],
        answer: '14 students',
      },
      {
        question: 'A bar chart shows 40 students chose maths, 25 chose English, 35 chose science. What fraction chose science?',
        steps: [
          'Total = 40 + 25 + 35 = 100',
          'Fraction for science = 35/100 = 7/20',
        ],
        answer: '7/20',
      },
    ],
    commonMistakes: [
      'Drawing bars of unequal width in a bar chart.',
      'Misreading the pictogram key — always check how many each symbol represents.',
      'Joining the tops of bars with lines (this turns it into a line graph, which is for continuous data).',
    ],
    examTips: [
      'Always label both axes clearly with a title and units.',
      'For pictograms, use a ruler to draw symbols of consistent size and check the key carefully.',
    ],
    videoSearchTerms: ['bar charts GCSE maths', 'pictograms GCSE maths Foundation', 'reading bar charts GCSE', 'drawing bar charts GCSE Foundation'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Pie charts',
    tier: 'Both',
    overview: 'Pie charts show data as sectors of a circle. Each sector\'s angle is proportional to the frequency. You need to draw and interpret pie charts.',
    keyFacts: [
      'The total of all frequencies corresponds to 360°.',
      'Angle for each category = (frequency ÷ total) × 360°.',
      'To find a frequency from a pie chart: (angle ÷ 360°) × total frequency.',
      'Use a protractor to draw and measure angles accurately.',
      'Label each sector with the category name (not just the angle).',
    ],
    formulas: [
      { name: 'Sector angle', formula: 'Angle = (frequency / total) × 360°' },
      { name: 'Frequency from angle', formula: 'Frequency = (angle / 360°) × total' },
    ],
    workedExamples: [
      {
        question: '60 students were asked their favourite sport. 15 chose swimming. Find the angle for swimming in a pie chart.',
        steps: [
          'Angle = (15 ÷ 60) × 360°',
          'Angle = ¼ × 360° = 90°',
        ],
        answer: '90°',
      },
      {
        question: 'A pie chart sector for "cycling" has an angle of 72°. The total is 150 people. How many chose cycling?',
        steps: [
          'Frequency = (72 ÷ 360) × 150',
          '= 0.2 × 150 = 30',
        ],
        answer: '30 people',
      },
    ],
    commonMistakes: [
      'Using the percentage directly as the angle (e.g. 25% → 25° instead of 90°).',
      'Angles not summing to 360° due to rounding — check and adjust the last sector.',
      'Not using a protractor and drawing sectors by estimation.',
    ],
    examTips: [
      'Always check your angles sum to exactly 360° before drawing.',
      'Show the calculation for each angle in your working — examiners award method marks.',
    ],
    videoSearchTerms: ['pie charts GCSE maths', 'drawing pie charts GCSE', 'pie chart angles GCSE maths', 'interpreting pie charts GCSE Foundation'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Scatter graphs & correlation',
    tier: 'Both',
    overview: 'Scatter graphs plot two variables to see if there is a relationship (correlation) between them. You need to describe the type and strength of correlation and draw lines of best fit.',
    keyFacts: [
      'Positive correlation: as one variable increases, the other increases.',
      'Negative correlation: as one variable increases, the other decreases.',
      'No correlation: no clear pattern between the variables.',
      'Correlation can be strong (points close to a line) or weak (points scattered widely).',
      'Correlation does not imply causation — two things may be related without one causing the other.',
      'An outlier is a point that does not fit the general pattern.',
    ],
    workedExamples: [
      {
        question: 'A scatter graph of temperature vs ice cream sales shows points rising from bottom-left to top-right. Describe the correlation.',
        steps: [
          'As temperature increases, ice cream sales increase',
          'Points rise from bottom-left to top-right → positive correlation',
          'Points are close together → strong positive correlation',
        ],
        answer: 'Strong positive correlation',
      },
      {
        question: 'A scatter graph shows hours of revision vs exam errors. Describe the expected correlation.',
        steps: [
          'More revision → fewer errors',
          'One increases while the other decreases → negative correlation',
        ],
        answer: 'Negative correlation',
      },
    ],
    commonMistakes: [
      'Confusing positive and negative correlation — positive means both go up together.',
      'Stating that a correlation proves one variable causes the other.',
      'Joining plotted points with a line instead of drawing a line of best fit.',
    ],
    examTips: [
      'Use precise language: "strong positive correlation" not just "positive".',
      'Correlation describes the relationship, not causation — avoid saying one variable "causes" the other.',
    ],
    videoSearchTerms: ['scatter graphs GCSE maths', 'correlation GCSE statistics', 'positive negative correlation GCSE', 'scatter graphs and correlation GCSE Foundation'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Line of best fit',
    tier: 'Both',
    overview: 'A line of best fit is drawn on a scatter graph to model the trend in the data. It is used to make predictions. It should pass through the mean point and have roughly equal numbers of points on each side.',
    keyFacts: [
      'The line of best fit should pass through (or near) the mean of x and the mean of y.',
      'Roughly equal numbers of points should be above and below the line.',
      'Interpolation: using the line to predict within the range of the data — this is reliable.',
      'Extrapolation: predicting beyond the range of the data — this is unreliable.',
      'The line of best fit does not need to pass through the origin.',
    ],
    workedExamples: [
      {
        question: 'Use a line of best fit to predict the sales when the temperature is 22°C (within the data range).',
        steps: [
          'Draw the line of best fit on the scatter graph',
          'Find where temperature = 22°C on the x-axis',
          'Read up to the line of best fit, then across to the y-axis',
          'This gives an estimated sales figure (e.g. 85 units)',
        ],
        answer: 'Read the y-value from the line at x = 22 (value depends on graph)',
      },
      {
        question: 'The data shows revision hours from 1 to 10. A student asks you to predict for 20 hours. Why is this unreliable?',
        steps: [
          '20 hours is outside the range of the data (1 to 10 hours)',
          'Predicting beyond the data range is extrapolation',
          'The trend may not continue — so the prediction is unreliable',
        ],
        answer: 'This is extrapolation — the prediction is unreliable as it is beyond the data range.',
      },
    ],
    commonMistakes: [
      'Forcing the line through the origin when it should not pass through (0, 0).',
      'Drawing the line through only the first and last data points.',
      'Not recognising that predictions far outside the data range are unreliable (extrapolation).',
    ],
    examTips: [
      'Your line of best fit should pass through the mean point (x̄, ȳ) if you can calculate it.',
      'When making a prediction, always draw a dotted line from the axis to the line and across — show your method.',
    ],
    videoSearchTerms: ['line of best fit GCSE maths', 'drawing line of best fit GCSE', 'interpolation extrapolation GCSE statistics', 'scatter graph line of best fit GCSE'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Combined events & sample space',
    tier: 'Both',
    overview: 'When two events happen together, you list all possible outcomes in a sample space diagram. You use this to find probabilities of combined events.',
    keyFacts: [
      'A sample space lists all possible outcomes of an experiment.',
      'For two dice or two spinners, use a grid (sample space diagram) to list all outcomes.',
      'P(event) = number of favourable outcomes ÷ total number of outcomes.',
      'Outcomes in a sample space are all equally likely (assuming fair dice, coins etc.).',
      'P(A and B) = P(A) × P(B) only if A and B are independent events.',
    ],
    workedExamples: [
      {
        question: 'Two fair dice are rolled. Find the probability that the sum equals 7.',
        steps: [
          'Sample space: 6 × 6 = 36 equally likely outcomes',
          'Outcomes summing to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 outcomes',
          'P(sum = 7) = 6/36 = 1/6',
        ],
        answer: '1/6',
      },
      {
        question: 'A coin is flipped and a fair 4-sided die is rolled. List the sample space and find P(H and even number).',
        steps: [
          'Sample space: H1, H2, H3, H4, T1, T2, T3, T4 — 8 outcomes',
          'Favourable: H2, H4 — 2 outcomes',
          'P(H and even) = 2/8 = 1/4',
        ],
        answer: '1/4',
      },
    ],
    commonMistakes: [
      'Listing some outcomes twice or missing some — use a systematic grid.',
      'Not recognising that all outcomes in a fair sample space are equally likely.',
      'Confusing "and" (both events occur) with "or" (at least one occurs).',
    ],
    examTips: [
      'Draw a sample space grid for two-event problems — it prevents missing outcomes.',
      'Count outcomes carefully: mark the favourable ones before dividing.',
    ],
    videoSearchTerms: ['sample space diagram GCSE maths', 'combined events probability GCSE', 'two dice probability GCSE', 'sample space GCSE Foundation statistics'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Relative frequency',
    tier: 'Both',
    overview: 'Relative frequency (experimental probability) is calculated from the results of an experiment. As the number of trials increases, relative frequency gets closer to the true theoretical probability.',
    keyFacts: [
      'Relative frequency = number of times event occurs ÷ total number of trials.',
      'Relative frequency is an estimate of probability based on experiment.',
      'Theoretical probability is based on equally likely outcomes (e.g. fair coin).',
      'The more trials carried out, the more reliable the relative frequency estimate.',
      'Relative frequency can be used when theoretical probability cannot be calculated.',
    ],
    formulas: [
      { name: 'Relative frequency', formula: 'Relative frequency = frequency ÷ total trials' },
    ],
    workedExamples: [
      {
        question: 'A biased coin is flipped 200 times. It lands on heads 130 times. Estimate the probability of heads.',
        steps: [
          'Relative frequency = 130 ÷ 200 = 0.65',
        ],
        answer: '0.65',
      },
      {
        question: 'A die is rolled 300 times. The number 6 appears 42 times. Is the die likely to be fair?',
        steps: [
          'Relative frequency of 6 = 42 ÷ 300 = 0.14',
          'Theoretical probability of 6 on a fair die = 1/6 ≈ 0.167',
          '0.14 is below 0.167 but with 300 trials some variation is expected',
          'Cannot conclude the die is definitely biased without more evidence',
        ],
        answer: '0.14; the die may or may not be biased — more trials are needed to be certain.',
      },
    ],
    commonMistakes: [
      'Treating relative frequency as exact probability — it is only an estimate.',
      'Using too few trials to draw conclusions about bias.',
      'Confusing relative frequency (experimental) with theoretical probability.',
    ],
    examTips: [
      'Always state that relative frequency is an estimate of probability, not the exact probability.',
      'More trials → more reliable estimate — mention this when asked about improving accuracy.',
    ],
    videoSearchTerms: ['relative frequency GCSE maths', 'experimental probability GCSE', 'relative frequency vs theoretical GCSE', 'probability experiments GCSE Foundation'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Sampling & bias',
    tier: 'Both',
    overview: 'Sampling is choosing a group to represent a population. A biased sample does not fairly represent the population, which makes conclusions unreliable.',
    keyFacts: [
      'A random sample gives every member of the population an equal chance of being selected.',
      'A biased sample over- or under-represents certain groups.',
      'Larger samples give more reliable results.',
      'Stratified sampling selects from each subgroup in proportion to its size.',
      'Common sources of bias: asking leading questions, sampling only convenient groups, timing of survey.',
    ],
    formulas: [
      { name: 'Stratified sample', formula: 'Sample size from group = (group size / population) × total sample size' },
    ],
    workedExamples: [
      {
        question: 'A school has 400 Year 10 and 600 Year 11 students. A stratified sample of 50 is taken. How many should be from Year 10?',
        steps: [
          'Year 10 proportion = 400/1000 = 2/5',
          'Year 10 in sample = (2/5) × 50 = 20',
        ],
        answer: '20 students from Year 10',
      },
      {
        question: 'A survey asks "Don\'t you agree our school canteen food is terrible?" Identify the bias.',
        steps: [
          'The question is leading — it suggests a negative view',
          'Respondents are more likely to agree due to the phrasing',
          'This introduces response bias',
        ],
        answer: 'The question is biased as it leads respondents towards a negative answer.',
      },
    ],
    commonMistakes: [
      'Confusing a large sample with an unbiased sample — a large biased sample is still biased.',
      'Not rounding stratified sample sizes to whole numbers.',
      'Failing to identify how a question or method introduces bias.',
    ],
    examTips: [
      'For bias questions, explain specifically how the method excludes certain groups or influences responses.',
      'For stratified sampling, always calculate the proportion first, then multiply by the total sample size.',
    ],
    videoSearchTerms: ['sampling bias GCSE maths statistics', 'stratified sampling GCSE', 'random sampling GCSE statistics', 'bias in statistics GCSE maths'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Mean from grouped frequency tables',
    tier: 'Higher',
    overview: 'When data is in grouped classes, you cannot find the exact mean. Instead, you use the midpoint of each class as an estimate. This gives an estimated mean.',
    keyFacts: [
      'Use the midpoint of each class interval as the representative value.',
      'Midpoint = (lower class boundary + upper class boundary) ÷ 2.',
      'Estimated mean = Σ(midpoint × frequency) ÷ Σfrequency.',
      'The modal class is the class with the highest frequency.',
      'The median class is found using the cumulative frequency — locate the n/2 th value.',
      'Answers are estimates because the exact data values are unknown.',
    ],
    formulas: [
      { name: 'Estimated mean', formula: 'Mean ≈ Σ(m × f) / Σf', notes: 'm = midpoint of class, f = frequency' },
    ],
    workedExamples: [
      {
        question: 'Heights (cm): 150-160 (f=5), 160-170 (f=12), 170-180 (f=8), 180-190 (f=5). Estimate the mean.',
        steps: [
          'Midpoints: 155, 165, 175, 185',
          'Σ(m × f) = 155×5 + 165×12 + 175×8 + 185×5',
          '= 775 + 1980 + 1400 + 925 = 5080',
          'Σf = 5 + 12 + 8 + 5 = 30',
          'Estimated mean = 5080 ÷ 30 ≈ 169.3 cm',
        ],
        answer: '≈ 169.3 cm',
      },
      {
        question: 'State the modal class from the table above.',
        steps: [
          'The class with the highest frequency is 160-170 (f = 12)',
        ],
        answer: 'Modal class: 160-170 cm',
      },
    ],
    commonMistakes: [
      'Using the class boundaries instead of the midpoints.',
      'Dividing by the number of classes instead of the total frequency.',
      'Giving an exact mean rather than an estimate (use "≈" and the word "estimate").',
    ],
    examTips: [
      'Always add a midpoint column to your table before calculating — it makes the working much clearer.',
      'State clearly that your answer is an estimate, not an exact value.',
    ],
    videoSearchTerms: ['mean from grouped frequency table GCSE Higher', 'estimated mean GCSE maths', 'modal class GCSE statistics', 'grouped data mean GCSE Higher'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Cumulative frequency diagrams',
    tier: 'Higher',
    overview: 'Cumulative frequency diagrams show the running total of frequencies. They are used to estimate the median, quartiles and interquartile range (IQR) of grouped data.',
    keyFacts: [
      'Cumulative frequency = running total of frequencies.',
      'Plot cumulative frequency against the upper class boundary.',
      'Join points with a smooth S-shaped curve.',
      'Median: read across from n/2 on the CF axis.',
      'Lower quartile (Q1): read from n/4; upper quartile (Q3): read from 3n/4.',
      'IQR = Q3 − Q1.',
    ],
    formulas: [
      { name: 'Median position', formula: 'n/2 th value' },
      { name: 'IQR', formula: 'IQR = Q3 − Q1' },
    ],
    workedExamples: [
      {
        question: 'From a cumulative frequency graph with n = 80, read off the median, Q1 and Q3.',
        steps: [
          'Median: read across from CF = 40 → read corresponding x-value',
          'Q1: read across from CF = 20 → read corresponding x-value',
          'Q3: read across from CF = 60 → read corresponding x-value',
          'IQR = Q3 − Q1',
        ],
        answer: 'Read from graph: Median at CF = 40, Q1 at CF = 20, Q3 at CF = 60',
      },
      {
        question: 'Masses (kg): 0-20(f=5), 20-40(f=15), 40-60(f=25), 60-80(f=10), 80-100(f=5). Draw the cumulative frequency table.',
        steps: [
          'CF: 0→0, 20→5, 40→20, 60→45, 80→55, 100→60',
          'Plot points at upper boundaries: (20,5), (40,20), (60,45), (80,55), (100,60)',
          'Join with smooth curve',
        ],
        answer: 'CF points: (20,5), (40,20), (60,45), (80,55), (100,60)',
      },
    ],
    commonMistakes: [
      'Plotting against the midpoint instead of the upper class boundary.',
      'Reading the median at n instead of n/2.',
      'Drawing straight lines between points rather than a smooth curve.',
    ],
    examTips: [
      'Always plot against the upper boundary, not the midpoint.',
      'Draw a horizontal line from the CF axis to the curve, then a vertical line down to read the x-value.',
    ],
    videoSearchTerms: ['cumulative frequency GCSE Higher maths', 'cumulative frequency diagram GCSE', 'median quartiles cumulative frequency GCSE', 'IQR cumulative frequency GCSE Higher'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Box plots',
    tier: 'Higher',
    overview: 'Box plots (box-and-whisker diagrams) display the five-number summary of a data set: minimum, lower quartile (Q1), median, upper quartile (Q3), and maximum.',
    keyFacts: [
      'Box plots show: minimum, Q1, median, Q3, maximum.',
      'The box spans from Q1 to Q3 (the middle 50% of the data).',
      'The whiskers extend to the minimum and maximum.',
      'IQR = Q3 − Q1 — measures the spread of the middle 50%.',
      'Use box plots to compare two data sets — compare medians and IQRs.',
      'Outliers may be shown as crosses beyond the whiskers.',
    ],
    workedExamples: [
      {
        question: 'Draw a box plot for: min = 12, Q1 = 18, median = 24, Q3 = 30, max = 40.',
        steps: [
          'Draw a number line covering 12 to 40',
          'Mark Q1 = 18 and Q3 = 30, draw a box between them',
          'Mark the median = 24 inside the box',
          'Draw whiskers from the box to min = 12 and max = 40',
        ],
        answer: 'Box from 18 to 30, median line at 24, whiskers to 12 and 40',
      },
      {
        question: 'Class A: median 65, IQR 20. Class B: median 72, IQR 8. Compare the two classes.',
        steps: [
          'Class B has a higher median (72 > 65) so generally scored higher',
          'Class A has a larger IQR (20 > 8) so results are more spread out / less consistent',
          'Class B was more consistent',
        ],
        answer: 'Class B scored higher on average (median 72 vs 65); Class A had more variation (IQR 20 vs 8).',
      },
    ],
    commonMistakes: [
      'Confusing the whisker ends with the mean — whiskers show min and max, not mean.',
      'Comparing only medians without comparing spread (IQR) when asked to "compare".',
      'Drawing the box to the mean rather than the quartiles.',
    ],
    examTips: [
      'When asked to "compare" box plots, always comment on both average (median) and spread (IQR).',
      'Use comparative language: "Class A had a higher median than Class B" — don\'t just list the values.',
    ],
    videoSearchTerms: ['box plots GCSE Higher maths', 'box and whisker diagram GCSE', 'comparing box plots GCSE statistics', 'box plot quartiles GCSE Higher'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Histograms',
    tier: 'Higher',
    overview: 'Histograms display continuous data in classes. Unlike bar charts, the area of each bar represents frequency, not the height. The y-axis shows frequency density.',
    keyFacts: [
      'Frequency density = frequency ÷ class width.',
      'Frequency = frequency density × class width (area of bar).',
      'There are no gaps between bars in a histogram.',
      'Classes do not need to be equal width.',
      'The y-axis is always labelled "frequency density", not "frequency".',
    ],
    formulas: [
      { name: 'Frequency density', formula: 'FD = Frequency ÷ Class width' },
      { name: 'Frequency', formula: 'Frequency = FD × Class width' },
    ],
    workedExamples: [
      {
        question: 'A class 20 ≤ t < 30 has frequency 40. Calculate the frequency density.',
        steps: [
          'Class width = 30 − 20 = 10',
          'Frequency density = 40 ÷ 10 = 4',
        ],
        answer: 'Frequency density = 4',
      },
      {
        question: 'A bar on a histogram has frequency density 3 and class width 5. Find the frequency.',
        steps: [
          'Frequency = FD × class width = 3 × 5 = 15',
        ],
        answer: 'Frequency = 15',
      },
    ],
    commonMistakes: [
      'Reading the height of the bar as the frequency instead of using frequency density × class width.',
      'Leaving gaps between bars (histograms show continuous data — no gaps).',
      'Forgetting to label the y-axis as frequency density.',
    ],
    examTips: [
      'Always add a "class width" and "FD" column to your table before drawing a histogram.',
      'To find frequency from a histogram: frequency = height × width (area of bar).',
    ],
    videoSearchTerms: ['histograms GCSE Higher maths', 'frequency density GCSE statistics', 'drawing histograms GCSE Higher', 'histogram frequency density GCSE'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Conditional probability',
    tier: 'Higher',
    overview: 'Conditional probability is the probability of an event given that another event has already occurred. It is found by restricting the sample space or using the formula P(A|B) = P(A∩B) / P(B).',
    keyFacts: [
      'P(A|B) means "the probability of A given B has occurred".',
      'P(A|B) = P(A ∩ B) / P(B).',
      'In practice: reduce the sample space to only the outcomes where B has occurred.',
      'Conditional probability changes the denominator.',
      'Without replacement changes probabilities — the second draw depends on the first.',
    ],
    formulas: [
      { name: 'Conditional probability', formula: 'P(A|B) = P(A ∩ B) / P(B)' },
    ],
    workedExamples: [
      {
        question: 'A bag contains 3 red and 5 blue balls. Two balls are drawn without replacement. Find P(second is red | first is red).',
        steps: [
          'After removing a red ball: 2 red remain, 5 blue remain, total = 7',
          'P(second is red | first is red) = 2/7',
        ],
        answer: '2/7',
      },
      {
        question: 'In a class of 30: 12 study French, 10 study German, 4 study both. Find P(studies German | studies French).',
        steps: [
          'P(French) = 12/30 = 2/5',
          'P(French and German) = 4/30 = 2/15',
          'P(German | French) = (4/30) ÷ (12/30) = 4/12 = 1/3',
        ],
        answer: '1/3',
      },
    ],
    commonMistakes: [
      'Forgetting to adjust the denominator after the first event (using 8 instead of 7 in the without-replacement case).',
      'Confusing P(A|B) with P(B|A) — these are different.',
      'Not recognising when events are not independent (without replacement).',
    ],
    examTips: [
      'For "without replacement" problems, always reduce the total by 1 after each draw.',
      'Tree diagrams help enormously with conditional probability — draw one whenever possible.',
    ],
    videoSearchTerms: ['conditional probability GCSE Higher maths', 'without replacement probability GCSE', 'P(A given B) GCSE Higher statistics', 'conditional probability tree diagrams GCSE'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Venn diagrams',
    tier: 'Higher',
    overview: 'Venn diagrams show the relationships between sets using overlapping circles. They are used to organise data and calculate probabilities, including conditional probabilities.',
    keyFacts: [
      'The universal set ξ contains all elements under consideration.',
      'A ∩ B (intersection) = elements in both A and B (overlap region).',
      'A ∪ B (union) = elements in A or B or both.',
      'A\' (complement of A) = elements not in A.',
      'The sum of all frequencies in a Venn diagram = total frequency.',
      'P(A) = frequency in A ÷ total.',
    ],
    workedExamples: [
      {
        question: '40 students: 18 like maths (M), 22 like English (E), 7 like both. Fill in a Venn diagram and find P(M only).',
        steps: [
          'M only = 18 − 7 = 11',
          'E only = 22 − 7 = 15',
          'Neither = 40 − 11 − 7 − 15 = 7',
          'P(M only) = 11/40',
        ],
        answer: 'P(M only) = 11/40',
      },
      {
        question: 'From the same diagram, find P(M | E): probability of liking maths given they like English.',
        steps: [
          'Given E: restrict to students who like English = 22',
          'Of those, likes maths too = 7',
          'P(M | E) = 7/22',
        ],
        answer: '7/22',
      },
    ],
    commonMistakes: [
      'Placing the total frequency of each set in the overlap, rather than calculating the "only" regions.',
      'Adding the two set totals to get the union without subtracting the intersection.',
      'Forgetting the "neither" region when filling in the Venn diagram.',
    ],
    examTips: [
      'Always fill in the intersection first, then calculate the "only" regions and finally the "neither" region.',
      'Check your diagram adds up to the total before answering probability questions.',
    ],
    videoSearchTerms: ['Venn diagrams GCSE Higher maths', 'Venn diagram probability GCSE', 'intersection union Venn diagram GCSE', 'Venn diagram conditional probability GCSE Higher'],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Set notation',
    tier: 'Higher',
    overview: 'Set notation provides a formal language for describing collections of elements and their relationships. It is used alongside Venn diagrams in probability and logic questions.',
    keyFacts: [
      'ξ = universal set (all elements being considered).',
      'A ∩ B = intersection (in both A and B).',
      'A ∪ B = union (in A or B or both).',
      'A\' = complement of A (not in A).',
      'n(A) = number of elements in set A.',
      'x ∈ A means "x is an element of A"; x ∉ A means "x is not in A".',
    ],
    workedExamples: [
      {
        question: 'ξ = {1,2,3,4,5,6,7,8,9,10}, A = {2,4,6,8,10}, B = {3,6,9}. Find A ∩ B, A ∪ B and A\'.',
        steps: [
          'A ∩ B = {6} (only element in both A and B)',
          'A ∪ B = {2,3,4,6,8,9,10} (all elements in A or B)',
          'A\' = {1,3,5,7,9} (elements in ξ but not in A)',
        ],
        answer: 'A ∩ B = {6}; A ∪ B = {2,3,4,6,8,9,10}; A\' = {1,3,5,7,9}',
      },
      {
        question: 'Shade the region representing (A ∪ B)\' on a Venn diagram.',
        steps: [
          'A ∪ B covers all of circle A and all of circle B (including overlap)',
          '(A ∪ B)\' is everything outside both circles',
          'Shade the region of ξ that is outside both A and B',
        ],
        answer: 'The region outside both circles (neither A nor B)',
      },
    ],
    commonMistakes: [
      'Confusing ∩ (intersection) and ∪ (union) — intersection means "and both", union means "either or both".',
      'Finding A\' as elements not in ξ instead of elements in ξ but not in A.',
      'Including elements outside ξ in a set.',
    ],
    examTips: [
      'Learn the symbols thoroughly: ∩ (and/both), ∪ (or/either), \' (not/complement), ξ (everything).',
      'Use a Venn diagram to visualise set notation questions before writing the answer.',
    ],
    videoSearchTerms: ['set notation GCSE Higher maths', 'union intersection complement sets GCSE', 'Venn diagram set notation GCSE Higher', 'set theory GCSE maths Higher'],
  },

  // ══════════════════════════════════════════════════
  // RATIO & PROPORTION (new entries)
  // ══════════════════════════════════════════════════

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Density, mass & volume',
    tier: 'Both',
    overview: 'Density, mass and volume are connected by a formula triangle. Density is a measure of how much mass is packed into a given volume.',
    keyFacts: [
      'Density = Mass ÷ Volume',
      'Mass = Density × Volume',
      'Volume = Mass ÷ Density',
      'SI units: density in g/cm³ or kg/m³; mass in g or kg; volume in cm³ or m³.',
      'A denser material has more mass per unit volume.',
      'Water has a density of 1 g/cm³ — objects less dense than water float.',
    ],
    formulas: [
      { name: 'Density', formula: 'D = M / V' },
      { name: 'Mass', formula: 'M = D × V' },
      { name: 'Volume', formula: 'V = M / D' },
    ],
    workedExamples: [
      {
        question: 'A metal block has mass 540 g and volume 60 cm³. Find its density.',
        steps: [
          'Density = Mass ÷ Volume',
          'D = 540 ÷ 60 = 9 g/cm³',
        ],
        answer: '9 g/cm³',
      },
      {
        question: 'A liquid has density 1.2 g/cm³ and mass 300 g. Find its volume.',
        steps: [
          'Volume = Mass ÷ Density',
          'V = 300 ÷ 1.2 = 250 cm³',
        ],
        answer: '250 cm³',
      },
    ],
    commonMistakes: [
      'Dividing mass by density to get density, or confusing which quantity to divide.',
      'Using inconsistent units — ensure mass and volume units match the density units.',
      'Forgetting to state the units in the answer.',
    ],
    examTips: [
      'Use the formula triangle: cover the quantity you want, and the remaining two show whether to multiply or divide.',
      'Always check your units — if density is in g/cm³, mass must be in g and volume in cm³.',
    ],
    videoSearchTerms: ['density mass volume GCSE maths', 'DMV formula triangle GCSE', 'density GCSE maths Foundation', 'mass density volume problems GCSE'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Best buys & exchange rates',
    tier: 'Both',
    overview: 'Best buy problems compare value for money by finding cost per unit or units per pound. Exchange rate problems convert between currencies using a given rate.',
    keyFacts: [
      'To find the best buy: calculate the cost per gram (or unit) for each option.',
      'Alternatively, find the amount per penny/pound — the higher amount is better value.',
      'Exchange rate: Pounds → Euros: multiply by the rate. Euros → Pounds: divide by the rate.',
      'Always compare quantities using the same unit.',
      'Check the question — sometimes "best buy" means lowest cost per unit, sometimes most for money.',
    ],
    workedExamples: [
      {
        question: 'Pack A: 500 g for £2.20. Pack B: 750 g for £3.15. Which is better value?',
        steps: [
          'Pack A: £2.20 ÷ 500 = 0.44p per gram',
          'Pack B: £3.15 ÷ 750 = 0.42p per gram',
          'Pack B is cheaper per gram → better value',
        ],
        answer: 'Pack B is better value (0.42p/g vs 0.44p/g)',
      },
      {
        question: 'The exchange rate is £1 = €1.15. Convert £250 to euros and €460 to pounds.',
        steps: [
          '£250 to euros: 250 × 1.15 = €287.50',
          '€460 to pounds: 460 ÷ 1.15 = £400',
        ],
        answer: '£250 = €287.50; €460 = £400',
      },
    ],
    commonMistakes: [
      'Choosing the larger pack as better value without actually calculating the unit price.',
      'Multiplying when converting foreign currency back to pounds (should divide).',
      'Not comparing the same unit — one in pence per gram, another in pounds per kg.',
    ],
    examTips: [
      'Always calculate the price per unit (per gram, per ml, etc.) for each option before comparing.',
      'State which is better value and why — give numerical evidence.',
    ],
    videoSearchTerms: ['best buys GCSE maths', 'value for money GCSE', 'exchange rates GCSE maths', 'best buy problems GCSE Foundation'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Percentage increase & decrease',
    tier: 'Both',
    overview: 'Percentage increase and decrease are used to find a new amount after a percentage change. The multiplier method is the most efficient approach.',
    keyFacts: [
      'Multiplier for x% increase = 1 + x/100 (e.g. 15% increase → × 1.15).',
      'Multiplier for x% decrease = 1 − x/100 (e.g. 20% decrease → × 0.80).',
      'Percentage change = (change ÷ original) × 100.',
      'Multiple percentage changes: apply each multiplier in sequence.',
      'Two successive 10% increases ≠ a 20% increase (you need 1.1 × 1.1 = 1.21, i.e. 21%).',
    ],
    formulas: [
      { name: 'Percentage change', formula: '% change = (new − original) / original × 100' },
      { name: 'New value', formula: 'New value = original × multiplier' },
    ],
    workedExamples: [
      {
        question: 'A TV costs £480. It is reduced by 15%. Find the sale price.',
        steps: [
          'Multiplier = 1 − 0.15 = 0.85',
          'Sale price = 480 × 0.85 = £408',
        ],
        answer: '£408',
      },
      {
        question: 'A house bought for £200,000 is now worth £230,000. Find the percentage change.',
        steps: [
          'Change = 230,000 − 200,000 = 30,000',
          '% change = (30,000 ÷ 200,000) × 100 = 15%',
        ],
        answer: '15% increase',
      },
    ],
    commonMistakes: [
      'Adding the percentage of the new value rather than the original value.',
      'Using the wrong multiplier — a 20% decrease uses 0.80, not 0.20.',
      'Forgetting to state whether a percentage change is an increase or decrease.',
    ],
    examTips: [
      'Use the multiplier method — it\'s quicker and less error-prone than finding the percentage and adding/subtracting.',
      'For percentage change: always divide by the original, not the new value.',
    ],
    videoSearchTerms: ['percentage increase decrease GCSE maths', 'percentage change GCSE', 'multiplier method GCSE maths', 'percentage problems GCSE Foundation'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Simple interest',
    tier: 'Both',
    overview: 'Simple interest is calculated on the original principal only. The interest is the same each year and does not compound. It is typically used in savings and loans questions.',
    keyFacts: [
      'Simple interest formula: I = PRT/100, where P = principal, R = rate per year, T = time in years.',
      'Total amount = P + I.',
      'Interest is the same each year — it does not grow over time.',
      'Simple interest is different from compound interest — it does not reinvest interest.',
    ],
    formulas: [
      { name: 'Simple interest', formula: 'I = PRT / 100', notes: 'P = principal, R = annual rate (%), T = time (years)' },
      { name: 'Total amount', formula: 'A = P + I' },
    ],
    workedExamples: [
      {
        question: 'Find the simple interest on £2000 at 3% per year for 4 years.',
        steps: [
          'I = PRT / 100',
          'I = 2000 × 3 × 4 / 100 = 24000 / 100 = £240',
        ],
        answer: '£240',
      },
      {
        question: 'How many years does it take for £500 to earn £75 simple interest at 5% per year?',
        steps: [
          '75 = 500 × 5 × T / 100',
          '75 = 25T',
          'T = 75 ÷ 25 = 3 years',
        ],
        answer: '3 years',
      },
    ],
    commonMistakes: [
      'Forgetting to divide by 100 in the formula (treating R as a decimal when using I = PRT).',
      'Confusing simple interest (same each year) with compound interest (grows each year).',
      'Giving the interest as the total amount instead of just the interest earned.',
    ],
    examTips: [
      'Remember: simple interest = same amount added each year. Total = original + all interest.',
      'Rearrange the formula to find P, R or T if required — it\'s just straightforward algebra.',
    ],
    videoSearchTerms: ['simple interest GCSE maths', 'simple interest formula GCSE', 'interest calculations GCSE Foundation', 'simple vs compound interest GCSE'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Inverse proportion',
    tier: 'Higher',
    overview: 'In inverse proportion, as one quantity increases, the other decreases at the same rate. Their product is constant. The graph of inverse proportion is a reciprocal curve.',
    keyFacts: [
      'If y is inversely proportional to x: y = k/x (where k is the constant of proportionality).',
      'The product xy = k is constant.',
      'As x doubles, y halves; as x triples, y is divided by 3.',
      'The graph of y against x is a reciprocal curve (hyperbola).',
      'To find k: substitute a known pair of values.',
    ],
    formulas: [
      { name: 'Inverse proportion', formula: 'y = k/x or xy = k' },
    ],
    workedExamples: [
      {
        question: 'y is inversely proportional to x. When x = 4, y = 15. Find y when x = 12.',
        steps: [
          'y = k/x → k = xy = 4 × 15 = 60',
          'When x = 12: y = 60 ÷ 12 = 5',
        ],
        answer: 'y = 5',
      },
      {
        question: '6 workers take 10 days to complete a job. How long would 4 workers take?',
        steps: [
          'Inverse proportion: workers × days = constant',
          'k = 6 × 10 = 60',
          'Days for 4 workers = 60 ÷ 4 = 15 days',
        ],
        answer: '15 days',
      },
    ],
    commonMistakes: [
      'Treating inverse proportion as direct proportion — in inverse proportion, the product is constant, not the ratio.',
      'Increasing y when x increases — in inverse proportion, y decreases as x increases.',
      'Forgetting to find k before answering the question.',
    ],
    examTips: [
      'Find the constant k = xy first using the given pair, then use it to answer the question.',
      'Check: in inverse proportion, as one doubles, the other halves — use this to verify your answer.',
    ],
    videoSearchTerms: ['inverse proportion GCSE Higher maths', 'y = k/x GCSE maths', 'inverse proportion problems GCSE Higher', 'indirect proportion GCSE maths'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Compound interest & depreciation',
    tier: 'Higher',
    overview: 'Compound interest calculates interest on both the principal and previously earned interest. Depreciation is the decrease in value over time, calculated the same way but using a multiplier less than 1.',
    keyFacts: [
      'Compound interest formula: A = P(1 + r/100)ⁿ, where P = principal, r = rate %, n = years.',
      'For depreciation: A = P(1 − r/100)ⁿ.',
      'The multiplier for r% compound interest is (1 + r/100); for r% depreciation is (1 − r/100).',
      'Compound interest grows faster than simple interest over time.',
      'After n years, apply the multiplier n times (or use the power n).',
    ],
    formulas: [
      { name: 'Compound interest', formula: 'A = P(1 + r/100)ⁿ', notes: 'A = final amount, P = principal, r = rate %, n = years' },
      { name: 'Depreciation', formula: 'A = P(1 − r/100)ⁿ' },
    ],
    workedExamples: [
      {
        question: '£3000 is invested at 4% compound interest per year. Find the value after 5 years.',
        steps: [
          'Multiplier = 1 + 4/100 = 1.04',
          'A = 3000 × 1.04⁵',
          '1.04⁵ = 1.2166…',
          'A = 3000 × 1.2166 = £3649.96',
        ],
        answer: '£3649.96 (to nearest penny)',
      },
      {
        question: 'A car bought for £18,000 depreciates at 12% per year. Find its value after 3 years.',
        steps: [
          'Multiplier = 1 − 0.12 = 0.88',
          'A = 18000 × 0.88³',
          '0.88³ = 0.681472',
          'A = 18000 × 0.681472 = £12,266.50',
        ],
        answer: '£12,266.50',
      },
    ],
    commonMistakes: [
      'Using simple interest (P × r × n / 100) instead of compound interest.',
      'Using the wrong multiplier — an increase of 4% is × 1.04, not × 0.04.',
      'Not applying the power n — applying the multiplier only once instead of n times.',
    ],
    examTips: [
      'Write out A = P × (multiplier)ⁿ, identify each value, and use your calculator\'s power function.',
      'Always check: compound interest should be slightly more than simple interest for the same rate and years.',
    ],
    videoSearchTerms: ['compound interest GCSE Higher maths', 'depreciation GCSE maths', 'compound interest formula GCSE', 'compound vs simple interest GCSE Higher'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Growth & decay',
    tier: 'Higher',
    overview: 'Exponential growth and decay describe situations where a quantity increases or decreases by a fixed percentage repeatedly. The same multiplier formula applies as in compound interest.',
    keyFacts: [
      'Exponential growth: y = a × bⁿ where b > 1.',
      'Exponential decay: y = a × bⁿ where 0 < b < 1.',
      'Population growth, bacterial growth and radioactive decay all follow exponential patterns.',
      'The multiplier b = 1 + r/100 (growth) or 1 − r/100 (decay).',
      'Growth and decay are the same mathematically as compound interest and depreciation.',
    ],
    formulas: [
      { name: 'Growth/decay', formula: 'y = a × bⁿ', notes: 'a = initial amount, b = multiplier, n = time periods' },
    ],
    workedExamples: [
      {
        question: 'A population of bacteria doubles every 3 hours. Starting at 500, how many are there after 12 hours?',
        steps: [
          'Number of 3-hour periods = 12 ÷ 3 = 4',
          'Multiplier = 2 (doubling)',
          'Population = 500 × 2⁴ = 500 × 16 = 8000',
        ],
        answer: '8000',
      },
      {
        question: 'A radioactive substance decays at 20% per year. Starting mass is 400 g. Find the mass after 4 years.',
        steps: [
          'Multiplier = 1 − 0.20 = 0.80',
          'Mass = 400 × 0.8⁴ = 400 × 0.4096 = 163.84 g',
        ],
        answer: '163.84 g',
      },
    ],
    commonMistakes: [
      'Subtracting 20% four times separately instead of using the multiplier to the power of 4.',
      'Using an additive model (adding a fixed amount) instead of a multiplicative one.',
      'Not identifying the number of time periods n correctly.',
    ],
    examTips: [
      'Identify: initial value (a), multiplier (b), and number of time periods (n) before substituting.',
      'Growth and decay questions follow the exact same pattern as compound interest — use the same approach.',
    ],
    videoSearchTerms: ['exponential growth decay GCSE Higher maths', 'growth decay GCSE Higher', 'population growth GCSE maths', 'exponential decay GCSE Higher'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Algebraic direct & inverse proportion',
    tier: 'Higher',
    overview: 'Algebraic proportion expresses relationships using equations with constants. y can be proportional to x, x², x³, √x, or their reciprocals. You find the constant k from given values and use it to answer further questions.',
    keyFacts: [
      'Direct proportion: y ∝ x means y = kx.',
      'y ∝ x² means y = kx²; y ∝ √x means y = k√x.',
      'Inverse proportion: y ∝ 1/x means y = k/x; y ∝ 1/x² means y = k/x².',
      'To find k: substitute the given pair of values into the equation.',
      'Once k is found, use the equation to find any unknown value.',
    ],
    formulas: [
      { name: 'Direct proportion', formula: 'y = kxⁿ', notes: 'n depends on the type of proportion' },
      { name: 'Inverse proportion', formula: 'y = k/xⁿ' },
    ],
    workedExamples: [
      {
        question: 'y is directly proportional to x². When x = 3, y = 36. Find y when x = 5.',
        steps: [
          'y = kx²',
          '36 = k × 9 → k = 4',
          'y = 4x²',
          'When x = 5: y = 4 × 25 = 100',
        ],
        answer: 'y = 100',
      },
      {
        question: 'y is inversely proportional to √x. When x = 16, y = 3. Find y when x = 4.',
        steps: [
          'y = k/√x',
          '3 = k/√16 = k/4 → k = 12',
          'y = 12/√x',
          'When x = 4: y = 12/√4 = 12/2 = 6',
        ],
        answer: 'y = 6',
      },
    ],
    commonMistakes: [
      'Writing y = kx when the question says y ∝ x² — read the type of proportion carefully.',
      'Forgetting to find k before attempting to calculate the unknown.',
      'Substituting into the wrong equation (e.g. using y = kx instead of y = k/x for inverse proportion).',
    ],
    examTips: [
      'Read the proportion statement carefully to identify the correct equation form before finding k.',
      'Always state your equation with k substituted in (e.g. y = 4x²) before finding the unknown value.',
    ],
    videoSearchTerms: ['algebraic proportion GCSE Higher maths', 'direct inverse proportion equations GCSE', 'y proportional x squared GCSE Higher', 'proportion constant k GCSE maths'],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Rates of change',
    tier: 'Higher',
    overview: 'Rate of change describes how one quantity changes with respect to another. On a graph, the rate of change is found from the gradient. At Higher tier this includes average and instantaneous rates of change.',
    keyFacts: [
      'Rate of change = gradient of a graph = change in y ÷ change in x.',
      'On a distance-time graph, gradient = speed.',
      'On a velocity-time graph, gradient = acceleration.',
      'Average rate of change: gradient of the chord between two points.',
      'Instantaneous rate of change: gradient of the tangent at a point (drawn by hand at GCSE).',
      'A steeper gradient means a faster rate of change.',
    ],
    formulas: [
      { name: 'Gradient (rate of change)', formula: 'gradient = (y₂ − y₁) / (x₂ − x₁)' },
    ],
    workedExamples: [
      {
        question: 'A graph shows distance (km) against time (hours). Between t = 1 and t = 4, the distance goes from 20 km to 80 km. Find the average speed.',
        steps: [
          'Average rate of change = gradient of chord',
          'Gradient = (80 − 20) / (4 − 1) = 60 / 3 = 20 km/h',
        ],
        answer: '20 km/h',
      },
      {
        question: 'On a curved graph, a tangent is drawn at t = 3. The tangent passes through (1, 10) and (5, 30). Find the instantaneous rate of change at t = 3.',
        steps: [
          'Gradient of tangent = (30 − 10) / (5 − 1) = 20 / 4 = 5',
        ],
        answer: 'Instantaneous rate of change = 5 units per unit time',
      },
    ],
    commonMistakes: [
      'Calculating the gradient using horizontal ÷ vertical instead of vertical ÷ horizontal.',
      'Confusing average rate of change (chord) with instantaneous rate of change (tangent).',
      'Not including units in the rate of change (e.g. km/h, m/s).',
    ],
    examTips: [
      'For average rate of change, calculate the gradient between the two given points.',
      'For instantaneous rate of change, draw a tangent at the point and calculate its gradient using two points on the tangent (not the curve).',
    ],
    videoSearchTerms: ['rates of change GCSE Higher maths', 'gradient rate of change GCSE', 'tangent gradient curved graph GCSE Higher', 'average instantaneous rate of change GCSE'],
  },

  // ══════════════════════════════════════════════════
  // HIGHER-ONLY ENTRIES (previously missing)
  // ══════════════════════════════════════════════════

  {
    topic: 'Algebra',
    subtopic: 'Expanding & factorising',
    tier: 'Higher',
    videoSearchTerms: ['expanding and factorising GCSE Higher', 'expanding double brackets GCSE', 'factorising quadratics GCSE Higher', 'factorising expressions GCSE maths'],
    overview: 'Expanding removes brackets by multiplying every term inside by the term outside. Factorising is the reverse — writing an expression as a product of factors. At Higher tier you need to expand double brackets and factorise quadratics.',
    keyFacts: [
      'Expanding double brackets: (a + b)(c + d) = ac + ad + bc + bd (FOIL method).',
      '(a + b)² = a² + 2ab + b² — a perfect square.',
      '(a + b)(a − b) = a² − b² — difference of two squares.',
      'To factorise x² + bx + c, find two numbers that multiply to c and add to b.',
      'Always check your factorisation by expanding back out.',
      'Take out common factors first before attempting to factorise quadratics.',
    ],
    formulas: [
      { name: 'FOIL expansion', formula: '(a + b)(c + d) = ac + ad + bc + bd' },
      { name: 'Perfect square', formula: '(a + b)² = a² + 2ab + b²' },
      { name: 'Difference of two squares', formula: '(a + b)(a − b) = a² − b²' },
    ],
    workedExamples: [
      {
        question: 'Expand and simplify (2x + 3)(x − 4).',
        steps: [
          'Multiply First terms: 2x × x = 2x²',
          'Multiply Outer terms: 2x × (−4) = −8x',
          'Multiply Inner terms: 3 × x = 3x',
          'Multiply Last terms: 3 × (−4) = −12',
          'Collect like terms: 2x² − 8x + 3x − 12 = 2x² − 5x − 12',
        ],
        answer: '2x² − 5x − 12',
      },
      {
        question: 'Factorise x² + 7x + 12.',
        steps: [
          'Find two numbers that multiply to 12 and add to 7.',
          '3 × 4 = 12, and 3 + 4 = 7 ✓',
          'Write as (x + 3)(x + 4).',
          'Check by expanding: x² + 4x + 3x + 12 = x² + 7x + 12 ✓',
        ],
        answer: '(x + 3)(x + 4)',
      },
    ],
    commonMistakes: [
      'Forgetting the middle terms when expanding (only writing a² + b² instead of a² + 2ab + b²).',
      'Getting signs wrong when one bracket contains a negative.',
      'Not checking the factorisation by re-expanding.',
      'Forgetting to take out a common factor first.',
    ],
    examTips: [
      'Always show the four products from FOIL before collecting like terms.',
      'For "factorise fully", check for a common factor first, then factorise the quadratic.',
      'If asked to "expand and simplify", collect like terms in your final answer.',
      'Practise the difference of two squares pattern — it comes up a lot.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Straight-line graphs',
    tier: 'Higher',
    videoSearchTerms: ['straight line graphs GCSE Higher y=mx+c', 'equation of a line GCSE maths', 'gradient intercept form GCSE Higher', 'parallel perpendicular lines GCSE Higher'],
    overview: 'A straight-line graph has equation y = mx + c, where m is the gradient and c is the y-intercept. At Higher tier you must find equations of lines, work with parallel and perpendicular lines, and use the form ax + by = c.',
    keyFacts: [
      'Gradient m = (y₂ − y₁) / (x₂ − x₁) — rise over run between any two points.',
      'y-intercept c is where the line crosses the y-axis (x = 0).',
      'Parallel lines have the same gradient.',
      'Perpendicular lines have gradients that multiply to −1 (negative reciprocal).',
      'To find the equation of a line through (x₁, y₁) with gradient m: y − y₁ = m(x − x₁).',
      'The x-intercept is where y = 0; the y-intercept is where x = 0.',
    ],
    formulas: [
      { name: 'Equation of a line', formula: 'y = mx + c' },
      { name: 'Gradient formula', formula: 'm = (y₂ − y₁) / (x₂ − x₁)' },
      { name: 'Line through a point', formula: 'y − y₁ = m(x − x₁)' },
      { name: 'Perpendicular gradient', formula: 'm_perp = −1/m' },
    ],
    workedExamples: [
      {
        question: 'Find the equation of the line through (2, 5) and (4, 11).',
        steps: [
          'Calculate gradient: m = (11 − 5) / (4 − 2) = 6/2 = 3',
          'Use y − y₁ = m(x − x₁) with point (2, 5): y − 5 = 3(x − 2)',
          'Expand: y − 5 = 3x − 6',
          'Rearrange: y = 3x − 1',
        ],
        answer: 'y = 3x − 1',
      },
      {
        question: 'Find the equation of a line perpendicular to y = 2x + 3 that passes through (4, 1).',
        steps: [
          'Gradient of given line is 2.',
          'Perpendicular gradient = −1/2.',
          'Use y − 1 = −½(x − 4).',
          'Expand: y − 1 = −½x + 2.',
          'Rearrange: y = −½x + 3.',
        ],
        answer: 'y = −½x + 3',
      },
    ],
    commonMistakes: [
      'Swapping x and y when calculating gradient (doing run/rise instead of rise/run).',
      'Thinking parallel lines are perpendicular — parallel lines have equal gradients.',
      'Forgetting to use the negative reciprocal for perpendicular gradient.',
      'Not rearranging to y = mx + c to read off the gradient and intercept.',
    ],
    examTips: [
      'Always label your gradient calculation clearly: m = (y₂−y₁)/(x₂−x₁).',
      'If the equation is given as ax + by = c, rearrange to y = mx + c first.',
      'Perpendicular: flip the fraction and change the sign.',
      'Check your answer by substituting a known point into your equation.',
    ],
  },

  {
    topic: 'Algebra',
    subtopic: 'Quadratic & cubic graphs',
    tier: 'Higher',
    videoSearchTerms: ['quadratic graphs GCSE Higher', 'cubic graphs GCSE maths', 'sketching quadratic cubic GCSE Higher', 'roots turning point quadratic GCSE'],
    overview: 'Quadratic graphs (y = ax² + bx + c) are U-shaped (or ∩-shaped) parabolas. Cubic graphs (y = ax³ + bx² + cx + d) have a characteristic S-shape. You need to sketch, interpret and read values from these graphs.',
    keyFacts: [
      'Quadratic y = ax² + bx + c: positive a → U-shape, negative a → ∩-shape.',
      'The roots (x-intercepts) are found by solving the equation = 0.',
      'The turning point (vertex) lies on the line of symmetry x = −b/(2a).',
      'The y-intercept of a quadratic is always c (set x = 0).',
      'Cubic y = ax³: positive a → bottom-left to top-right, negative a → top-left to bottom-right.',
      'Cubic graphs can cross the x-axis up to 3 times.',
    ],
    formulas: [
      { name: 'Line of symmetry (quadratic)', formula: 'x = −b / (2a)' },
      { name: 'y-intercept', formula: 'Set x = 0: y = c' },
    ],
    workedExamples: [
      {
        question: 'Sketch the graph of y = x² − 4x + 3, marking the roots and turning point.',
        steps: [
          'Find roots: x² − 4x + 3 = 0 → (x − 1)(x − 3) = 0 → x = 1 or x = 3.',
          'Find line of symmetry: x = −(−4)/(2×1) = 2.',
          'Find turning point: y = (2)² − 4(2) + 3 = 4 − 8 + 3 = −1. Vertex: (2, −1).',
          'y-intercept: x = 0 → y = 3. Point (0, 3).',
          'Sketch U-shape crossing x-axis at x = 1 and x = 3, vertex at (2, −1).',
        ],
        answer: 'U-shaped parabola with roots at (1, 0) and (3, 0), vertex at (2, −1), y-intercept at (0, 3).',
      },
      {
        question: 'Sketch y = x³ − 3x, stating the coordinates where it crosses the axes.',
        steps: [
          'Find x-intercepts: x³ − 3x = 0 → x(x² − 3) = 0 → x = 0, x = √3, x = −√3.',
          'y-intercept: x = 0 → y = 0. Passes through origin.',
          'Positive cubic: bottom-left to top-right with S-shape.',
          'Mark (0,0), (√3, 0) ≈ (1.73, 0), (−√3, 0) ≈ (−1.73, 0).',
        ],
        answer: 'S-shaped cubic crossing at x = −√3, x = 0, x = √3.',
      },
    ],
    commonMistakes: [
      'Drawing a quadratic as a V-shape instead of a smooth curve.',
      'Forgetting that a negative leading coefficient flips the shape.',
      'Confusing the line of symmetry formula — it is −b/2a not b/2a.',
      'Drawing a cubic that doesn\'t extend in both directions indefinitely.',
    ],
    examTips: [
      'Always find and label the roots, y-intercept and turning point when sketching.',
      'Check whether a is positive or negative to determine the shape.',
      'Use a table of values if you\'re unsure of the shape.',
      'For cubics, plug in a few x-values to check your sketch is correct.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Volume of prisms & cylinders',
    tier: 'Higher',
    videoSearchTerms: ['volume of prisms GCSE Higher', 'volume of cylinder GCSE maths', 'volume prism cylinder Higher maths', 'cross-sectional area prism GCSE'],
    overview: 'Volume measures the 3D space inside a shape. For any prism (including cylinders), Volume = Area of cross-section × length (or height). You must be able to find volumes of various prisms and cylinders, and work backwards to find missing dimensions.',
    keyFacts: [
      'Volume of any prism = cross-sectional area × length.',
      'Volume of a cylinder = πr²h, where r is radius and h is height.',
      'The cross-section is the shape you see when you slice the prism perpendicular to its length.',
      'For compound prisms, split into simpler shapes, find each area, then multiply by length.',
      'Units: if dimensions are in cm, volume is in cm³; if in m, volume is in m³.',
      '1 litre = 1000 cm³; 1 m³ = 1,000,000 cm³.',
    ],
    formulas: [
      { name: 'Volume of any prism', formula: 'V = A × l', notes: 'A = area of cross-section, l = length' },
      { name: 'Volume of a cylinder', formula: 'V = πr²h' },
      { name: 'Volume of a triangular prism', formula: 'V = ½ × b × h × l' },
    ],
    workedExamples: [
      {
        question: 'A cylinder has radius 4 cm and height 10 cm. Find its volume. Give your answer in terms of π.',
        steps: [
          'Identify the formula: V = πr²h',
          'Substitute values: V = π × 4² × 10',
          'Calculate: V = π × 16 × 10 = 160π',
        ],
        answer: '160π cm³',
      },
      {
        question: 'A prism has a cross-sectional area of 15 cm² and a length of 8 cm. Find its volume.',
        steps: [
          'Use V = A × l',
          'V = 15 × 8 = 120 cm³',
        ],
        answer: '120 cm³',
      },
    ],
    commonMistakes: [
      'Using diameter instead of radius in the cylinder formula.',
      'Forgetting to square the radius (writing πrh instead of πr²h).',
      'Mixing up the cross-section area with the total surface area.',
      'Not converting units consistently (mixing cm and m).',
    ],
    examTips: [
      'Always identify the cross-section first — it\'s the shape repeated along the length.',
      'If given a diameter, halve it to get the radius before using V = πr²h.',
      'Show all working — write the formula, substitute values, then calculate.',
      '"Give your answer in terms of π" means leave π in your answer, don\'t multiply by 3.14.',
    ],
  },

  {
    topic: 'Geometry & Measures',
    subtopic: 'Transformations',
    tier: 'Higher',
    videoSearchTerms: ['transformations GCSE Higher maths', 'rotation reflection translation enlargement GCSE', 'describing transformations GCSE Higher', 'negative scale factor enlargement GCSE'],
    overview: 'The four transformations are: reflection, rotation, translation and enlargement. At Higher tier you must describe them fully, apply them, and work with negative scale factors for enlargements. Combined transformations may also be examined.',
    keyFacts: [
      'Reflection: needs the mirror line equation (e.g. y = x, x = 2).',
      'Rotation: needs the centre of rotation, angle, and direction (clockwise or anticlockwise).',
      'Translation: described by a column vector (x/y) — positive x moves right, positive y moves up.',
      'Enlargement: needs the centre of enlargement and scale factor. Scale factor = image length ÷ original length.',
      'Negative scale factor: the image is on the opposite side of the centre and inverted.',
      'Transformations that preserve shape and size (isometries): reflection, rotation, translation.',
    ],
    workedExamples: [
      {
        question: 'Describe fully the single transformation that maps triangle A onto triangle B, where A has vertices (1,1),(3,1),(3,4) and B has vertices (−1,1),(−3,1),(−3,4).',
        steps: [
          'Compare the x-coordinates: each x has been negated (1→−1, 3→−3). y-values unchanged.',
          'This is a reflection in the y-axis (the line x = 0).',
          'Check: reflecting (1,1) in x = 0 gives (−1,1) ✓',
        ],
        answer: 'Reflection in the y-axis (x = 0).',
      },
      {
        question: 'Enlarge triangle T with vertices (2,1),(4,1),(4,3) by scale factor −2 about centre (1,1).',
        steps: [
          'Find vector from centre to each vertex, multiply by −2.',
          '(2,1)→(1,0) vector, ×(−2) = (−2,0), image point: (1−2, 1+0) = (−1,1)',
          '(4,1)→(3,0) vector, ×(−2) = (−6,0), image point: (1−6, 1+0) = (−5,1)',
          '(4,3)→(3,2) vector, ×(−2) = (−6,−4), image point: (1−6, 1−4) = (−5,−3)',
          'Image is on opposite side of centre, inverted.',
        ],
        answer: 'Image vertices: (−1,1), (−5,1), (−5,−3).',
      },
    ],
    commonMistakes: [
      'Giving an incomplete description — always state all required information.',
      'Confusing clockwise and anticlockwise for rotations.',
      'For enlargements, measuring from the wrong centre.',
      'Not inverting the image when using a negative scale factor.',
    ],
    examTips: [
      'For "describe fully": reflection needs line, rotation needs centre + angle + direction, enlargement needs centre + scale factor.',
      'Use tracing paper in exams for rotations and reflections.',
      'For negative scale factors, draw lines through the centre of enlargement and go to the other side.',
      'A scale factor between −1 and 0 gives a smaller inverted image.',
    ],
  },

  {
    topic: 'Statistics & Probability',
    subtopic: 'Combined events',
    tier: 'Higher',
    videoSearchTerms: ['combined events probability GCSE Higher', 'independent events probability GCSE', 'AND OR probability rules GCSE', 'sample space diagram GCSE Higher'],
    overview: 'Combined events involve finding the probability of two or more events occurring. At Higher tier you use the AND rule (multiply) and OR rule (add) and must be able to work with independent and mutually exclusive events.',
    keyFacts: [
      'AND rule (independent events): P(A and B) = P(A) × P(B).',
      'OR rule (mutually exclusive events): P(A or B) = P(A) + P(B).',
      'General OR rule: P(A or B) = P(A) + P(B) − P(A and B).',
      'Two events are independent if one does not affect the other.',
      'Two events are mutually exclusive if they cannot both happen at the same time.',
      'All probabilities in a sample space must sum to 1.',
    ],
    formulas: [
      { name: 'AND rule (independent)', formula: 'P(A ∩ B) = P(A) × P(B)' },
      { name: 'OR rule (mutually exclusive)', formula: 'P(A ∪ B) = P(A) + P(B)' },
      { name: 'General OR rule', formula: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)' },
    ],
    workedExamples: [
      {
        question: 'A bag contains 3 red and 7 blue balls. A ball is chosen, replaced, then another is chosen. Find P(both red).',
        steps: [
          'P(red) = 3/10',
          'Since replaced, the events are independent.',
          'P(both red) = P(red) × P(red) = 3/10 × 3/10',
          '= 9/100',
        ],
        answer: '9/100 or 0.09',
      },
      {
        question: 'P(A) = 0.4, P(B) = 0.3. A and B are mutually exclusive. Find P(A or B).',
        steps: [
          'Mutually exclusive means P(A and B) = 0.',
          'P(A or B) = P(A) + P(B) = 0.4 + 0.3 = 0.7',
        ],
        answer: '0.7',
      },
    ],
    commonMistakes: [
      'Adding probabilities when you should multiply (AND means multiply).',
      'Using the simple OR rule when events are NOT mutually exclusive.',
      'Not replacing when the question says "without replacement" — events become dependent.',
      'Leaving answers greater than 1 — always check your final probability is between 0 and 1.',
    ],
    examTips: [
      '"And" → multiply. "Or" (mutually exclusive) → add.',
      'Always check if events are independent (with replacement) or dependent (without replacement).',
      'Draw a sample space diagram or tree diagram to organise your working.',
      'Check probabilities sum to 1 as a sense-check.',
    ],
  },

  {
    topic: 'Ratio & Proportion',
    subtopic: 'Simplifying & using ratios',
    tier: 'Higher',
    videoSearchTerms: ['simplifying ratios GCSE Higher', 'ratio problems GCSE Higher maths', 'using ratios GCSE Higher', 'ratio and proportion Higher tier GCSE'],
    overview: 'At Higher tier, ratio problems involve more complex contexts: algebraic ratios, ratios involving fractions and decimals, combining ratios, and solving problems where the difference between shares is given.',
    keyFacts: [
      'To simplify a ratio, divide all parts by their highest common factor (HCF).',
      'To simplify ratios with fractions: multiply every part by the LCM of all denominators.',
      'To combine ratios: make the shared quantity the same in both ratios.',
      'If a:b = m and b:c = n, express a:b:c by making b the same in both.',
      'The unitary method: find the value of one part, then multiply for other parts.',
      'Algebraic ratio: if a:b = 3:5 and a + b = 40, form an equation.',
    ],
    workedExamples: [
      {
        question: 'A:B = 3:5 and A:C = 2:7. Find A:B:C.',
        steps: [
          'A:B = 3:5 and A:C = 2:7.',
          'Make A the same in both: LCM of 3 and 2 is 6.',
          'A:B = 6:10 (multiply by 2) and A:C = 6:21 (multiply by 3).',
          'So A:B:C = 6:10:21.',
        ],
        answer: 'A:B:C = 6:10:21',
      },
      {
        question: 'Jamie and Kira share money in the ratio 4:7. Kira gets £18 more than Jamie. How much does each person receive?',
        steps: [
          'Difference in ratio parts: 7 − 4 = 3 parts.',
          '3 parts = £18, so 1 part = £6.',
          'Jamie: 4 × £6 = £24.',
          'Kira: 7 × £6 = £42.',
          'Check: £42 − £24 = £18 ✓',
        ],
        answer: 'Jamie receives £24, Kira receives £42.',
      },
    ],
    commonMistakes: [
      'Only simplifying some parts of the ratio, not all.',
      'When combining ratios, not making the shared quantity equal first.',
      'Dividing the total by the wrong number of parts.',
      'Forgetting to check the answer satisfies the original conditions.',
    ],
    examTips: [
      'Always check your final ratio cannot be simplified further.',
      'If the question gives a difference between shares, find the value of one part first.',
      'For combining three-part ratios, make the shared value equal by finding the LCM.',
      'Write out each step clearly — ratio questions are easy to lose marks through arithmetic slips.',
    ],
  },
]

// Topic area metadata (same as learn page, centralised here)
export const TOPIC_META: Record<string, { icon: string; color: string; light: string; border: string }> = {
  Number:                    { icon: '🔢', color: '#7C3AED', light: '#F5F3FF', border: '#DDD6FE' },
  Algebra:                   { icon: '📐', color: '#2563EB', light: '#EFF6FF', border: '#BFDBFE' },
  'Geometry & Measures':     { icon: '📏', color: '#059669', light: '#F0FDF4', border: '#A7F3D0' },
  'Statistics & Probability':{ icon: '📊', color: '#D97706', light: '#FFFBEB', border: '#FDE68A' },
  'Ratio & Proportion':      { icon: '⚖️', color: '#DC2626', light: '#FFF5F5', border: '#FECACA' },
}

// All subtopic names per topic per tier (matches learn page)
export const TOPIC_DATA: Record<string, { Foundation: string[]; Higher: string[] }> = {
  Number: {
    Foundation: ['Ordering & comparing numbers','Fractions','Decimals','Percentages','Percentage change','Reverse percentages','Factors, multiples & primes','Powers & roots','Standard form','Bounds & accuracy'],
    Higher:     ['Ordering & comparing numbers','Fractions','Decimals','Percentages','Percentage change','Reverse percentages','Factors, multiples & primes','Powers & roots','Indices (fractional & negative)','Standard form','Surds','Bounds & accuracy','Recurring decimals to fractions'],
  },
  Algebra: {
    Foundation: ['Simplifying expressions','Expanding single brackets','Expanding double brackets','Factorising','Solving linear equations','Forming equations from context','Simultaneous equations','Inequalities','Sequences & nth term','Straight-line graphs (y = mx + c)','Quadratic graphs','Real-life graphs'],
    Higher:     ['Simplifying expressions','Expanding & factorising','Difference of two squares','Solving linear equations','Forming equations from context','Simultaneous equations','Quadratic equations (factorising)','Quadratic equations (formula)','Completing the square','Inequalities','Sequences & nth term','Geometric sequences','Straight-line graphs','Quadratic & cubic graphs','Functions & function notation','Composite & inverse functions','Transformation of graphs','Iteration','Algebraic proof'],
  },
  'Geometry & Measures': {
    Foundation: ['Angle rules','Angles in parallel lines','Properties of polygons','Perimeter & area','Area of triangles & quadrilaterals','Circle area & circumference','Volume of prisms','Surface area',"Pythagoras' theorem",'Trigonometry (SOH-CAH-TOA)','Transformations (RREST)','Constructions & loci','Similarity','Bearings','3D shapes & nets'],
    Higher:     ['Angle rules','Angles in parallel lines','Properties of polygons','Perimeter & area','Circle area & circumference','Arc length & sector area','Volume of prisms & cylinders','Volume of pyramids, cones & spheres','Surface area',"Pythagoras' theorem",'Trigonometry (SOH-CAH-TOA)','Sine rule','Cosine rule','3D trigonometry & Pythagoras','Circle theorems','Transformations','Constructions & loci','Similarity & congruence','Vectors','Bearings'],
  },
  'Statistics & Probability': {
    Foundation: ['Mean, median, mode & range','Frequency tables','Bar charts & pictograms','Pie charts','Scatter graphs & correlation','Line of best fit','Basic probability','Combined events & sample space','Relative frequency','Tree diagrams','Sampling & bias'],
    Higher:     ['Mean, median, mode & range','Mean from grouped frequency tables','Cumulative frequency diagrams','Box plots','Histograms','Scatter graphs & correlation','Basic probability','Combined events','Tree diagrams','Conditional probability','Venn diagrams','Set notation','Sampling & bias'],
  },
  'Ratio & Proportion': {
    Foundation: ['Simplifying ratios','Sharing in a ratio','Direct proportion','Speed, distance & time','Density, mass & volume','Best buys & exchange rates','Percentage increase & decrease','Simple interest'],
    Higher:     ['Simplifying & using ratios','Sharing in a ratio','Direct proportion','Inverse proportion','Speed, distance & time','Density, mass & volume','Best buys & exchange rates','Compound interest & depreciation','Growth & decay','Algebraic direct & inverse proportion','Rates of change'],
  },
}
