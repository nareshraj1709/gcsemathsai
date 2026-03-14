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
