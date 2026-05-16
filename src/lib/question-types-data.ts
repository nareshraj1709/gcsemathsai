// Question-type guides — distinct, unique content per page.

export interface QuestionTypeGuide {
  slug: string
  title: string
  shortDescription: string
  metaDescription: string
  keywords: string[]
  whatItMeans: string
  whatExaminersWant: string[]
  worked: { question: string; answer: string }
  commonMistakes: string[]
  scoringTip: string
  relatedSlugs?: string[]
}

export const QUESTION_TYPES: QuestionTypeGuide[] = [
  {
    slug: 'show-that',
    title: 'How to answer "Show that" questions in GCSE Maths',
    shortDescription: 'Demonstrate the given result from given values. The answer is provided — the marks are in the working.',
    metaDescription: '"Show that" questions in GCSE Maths require you to demonstrate a stated result step by step. Learn how to lay out your working to win every mark for AQA, Edexcel and OCR.',
    keywords: ['show that gcse maths', 'how to answer show that', 'show that questions gcse', 'method marks gcse maths'],
    whatItMeans: 'You are given the final result. Your job is to produce every working step that connects the start (given values or expression) to the end (the stated result). Starting from the answer and working backwards earns zero — the mark scheme awards method, not the final number.',
    whatExaminersWant: [
      'Start from the given expression or values — never from the stated result',
      'Every line of working clearly written, with the operation visible',
      'Reach the stated result exactly as printed (right form, right precision)',
      'A final line that matches the requested form, even if your intermediate working used a different form',
    ],
    worked: {
      question: 'Show that (2x + 3)(x − 4) = 2x² − 5x − 12.',
      answer: 'Start with the left-hand side. Expand using FOIL: (2x)(x) + (2x)(−4) + (3)(x) + (3)(−4) = 2x² − 8x + 3x − 12. Collect like terms: 2x² − 5x − 12. This matches the right-hand side, so the result is shown.',
    },
    commonMistakes: [
      'Starting from the answer (e.g. 2x² − 5x − 12) and factorising backwards — this earns zero',
      'Skipping the like-terms step — examiners want to see −8x + 3x = −5x explicitly',
      'Writing "= 2x² − 5x − 12" only at the end, with no working before it',
      'Using approximations or rounded values when the result is exact',
    ],
    scoringTip: 'Treat every "show that" as a method-marks question. The final line being correct earns at most one mark out of three or four. The rest live in the working.',
    relatedSlugs: ['prove', 'verify', 'hence'],
  },
  {
    slug: 'prove',
    title: 'How to answer "Prove" questions in GCSE Maths',
    shortDescription: 'Demonstrate that a statement is always true, using general algebraic reasoning, not specific examples.',
    metaDescription: 'GCSE Maths "Prove" questions need a general algebraic argument — not numerical examples. See the standard layout for algebraic proof on AQA, Edexcel and OCR Higher.',
    keywords: ['prove gcse maths', 'algebraic proof gcse', 'how to prove gcse', 'gcse maths higher proof'],
    whatItMeans: 'A "prove" question demands a watertight argument that holds for every case. Substituting numbers and showing the statement works for one or two values is NOT a proof — it is an example. The argument must use letters, not numbers.',
    whatExaminersWant: [
      'Define the general form using letters (e.g. let n be any integer; let 2n be any even number)',
      'Manipulate the algebraic expression symbolically until you reach the required form',
      'End with a clear concluding sentence connecting the algebra back to the claim',
      'Use definitions correctly: "2n + 1" is odd; "2n" is even; "3n" is a multiple of 3, etc.',
    ],
    worked: {
      question: 'Prove that the sum of three consecutive integers is always a multiple of 3.',
      answer: 'Let the three consecutive integers be n, n + 1 and n + 2. Their sum is n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1). Since 3(n + 1) is 3 multiplied by an integer, the sum is always a multiple of 3.',
    },
    commonMistakes: [
      'Trying numerical examples (e.g. "1 + 2 + 3 = 6 = 3 × 2") — this is verification, not proof',
      'Not stating what your letters represent at the start',
      'Forgetting the concluding sentence — even with the algebra right, you lose the final mark',
      'Confusing "show that" with "prove" — they are different question types',
    ],
    scoringTip: 'Always finish with a sentence that links your algebra back to the original claim. "Therefore the sum is a multiple of 3" is worth a mark on its own.',
    relatedSlugs: ['show-that', 'hence', 'verify'],
  },
  {
    slug: 'hence',
    title: 'How to answer "Hence" questions in GCSE Maths',
    shortDescription: 'Use the result of the previous part. Starting from scratch usually scores zero — even with the right answer.',
    metaDescription: '"Hence" in GCSE Maths means use the previous part of the question. Find out how to spot the connection and use it for full marks on AQA, Edexcel and OCR.',
    keywords: ['hence gcse maths', 'hence questions gcse', 'how to use hence', 'gcse maths hence command'],
    whatItMeans: 'When a question says "Hence", it is a direct instruction: use a result from earlier in the same question to answer this part. The connection is usually visible — a factorisation you found in part (a), a formula you derived in part (b). Recognising and using that result is the whole point.',
    whatExaminersWant: [
      'Reference your earlier answer explicitly (e.g. "Using my factorisation from part (a)...")',
      'Use the previous result as the entry point, not as a check at the end',
      'Show one or two new lines that build on the previous answer',
      'Reach the final answer in a small number of additional steps',
    ],
    worked: {
      question: 'Part (a): Factorise x² − 5x + 6. Part (b): Hence solve x² − 5x + 6 = 0.',
      answer: 'From part (a), x² − 5x + 6 = (x − 2)(x − 3). Hence (x − 2)(x − 3) = 0. So x − 2 = 0 or x − 3 = 0, giving x = 2 or x = 3.',
    },
    commonMistakes: [
      'Ignoring the previous part and using the quadratic formula from scratch (loses all marks even with correct answer)',
      'Not writing the link sentence — "Hence" implies you should reference part (a) explicitly',
      'Re-doing the previous work instead of just using the answer',
    ],
    scoringTip: 'If the previous part produced a factorised form, a derivative, or a substitution, those are almost always the intended starting points. Look for the connection before you compute.',
    relatedSlugs: ['hence-or-otherwise', 'show-that'],
  },
  {
    slug: 'hence-or-otherwise',
    title: 'How to answer "Hence or otherwise" questions in GCSE Maths',
    shortDescription: '"Hence" is the easiest method. "Otherwise" permits any valid alternative — but hence is usually fastest.',
    metaDescription: '"Hence or otherwise" in GCSE Maths means use the previous part if you can, but any valid method earns the same marks. Learn when to use hence and when to switch.',
    keywords: ['hence or otherwise gcse', 'gcse maths hence otherwise', 'hence or otherwise meaning'],
    whatItMeans: 'You have a choice. "Hence" usually offers the shortest path to the answer using the previous part. "Otherwise" allows any valid method. Both routes earn the same marks if the answer is correct, but "hence" is normally faster.',
    whatExaminersWant: [
      'A clearly chosen method — do not start with "hence" then switch midway',
      'If using "hence", reference the previous answer as the entry point',
      'If using "otherwise", a coherent alternative method that still earns method marks',
      'Show all working either way — mark schemes credit both paths equally',
    ],
    worked: {
      question: 'Part (a): Show that x² + 4x − 5 = (x + 5)(x − 1). Part (b): Hence or otherwise solve x² + 4x − 5 < 0.',
      answer: 'Hence: (x + 5)(x − 1) < 0. The roots of the quadratic are x = −5 and x = 1. The quadratic opens upwards, so it is negative between the roots. Solution: −5 < x < 1.',
    },
    commonMistakes: [
      'Believing "otherwise" forbids using the previous answer — it does not, it just permits a different method',
      'Switching halfway through a method',
      'Not noticing the easier path that "hence" gives you',
    ],
    scoringTip: 'Read part (a) carefully before starting part (b). The "hence" path is usually deliberately set up.',
    relatedSlugs: ['hence', 'show-that'],
  },
  {
    slug: 'estimate',
    title: 'How to answer "Estimate" questions in GCSE Maths',
    shortDescription: 'Round every value to 1 significant figure first, then calculate. Exact arithmetic loses every mark.',
    metaDescription: 'GCSE Maths "Estimate" questions almost always require rounding to 1 significant figure before calculating. Master the method for AQA, Edexcel and OCR.',
    keywords: ['estimate gcse maths', 'how to estimate gcse', 'estimate question gcse', 'rounding to 1 significant figure'],
    whatItMeans: 'In GCSE Maths, "estimate" means round every number in the calculation to 1 significant figure, then calculate the simpler expression. The point is to get an approximate answer using mental arithmetic — not to use a calculator on exact values.',
    whatExaminersWant: [
      'Show every value rounded to 1 s.f. on a separate line first',
      'Then perform the calculation with the rounded values',
      'Give the final estimate without rounding it further',
      'For "estimate the mean", use class midpoints — same idea, different topic',
    ],
    worked: {
      question: 'Estimate the value of (596 × 21) ÷ 8.2.',
      answer: 'Round to 1 s.f.: 596 ≈ 600, 21 ≈ 20, 8.2 ≈ 8. Calculate: (600 × 20) ÷ 8 = 12,000 ÷ 8 = 1,500. Estimate: 1,500.',
    },
    commonMistakes: [
      'Calculating with exact values instead of rounding first',
      'Rounding to 2 or 3 s.f. — the mark scheme demands 1 s.f.',
      'Failing to show the rounded values explicitly before the calculation',
      'Rounding the final answer further (e.g. to 2 s.f.) when 1 s.f. is what was used',
    ],
    scoringTip: 'Most "estimate" questions are 2 or 3 marks. One mark is for the rounding line; one for the calculation; one for the answer.',
  },
  {
    slug: 'describe',
    title: 'How to answer "Describe" questions in GCSE Maths',
    shortDescription: 'A complete description — every component required by the mark scheme, especially for transformations.',
    metaDescription: '"Describe fully" questions in GCSE Maths demand every required component. See exactly what to include for translations, reflections, rotations and enlargements.',
    keywords: ['describe gcse maths', 'describe fully gcse', 'transformation describe gcse', 'gcse describe questions'],
    whatItMeans: 'When you "describe" a transformation, you must give every component the mark scheme expects. Each transformation type has a specific list — miss one element and you lose a mark.',
    whatExaminersWant: [
      'Translation: name AND column vector (x over y)',
      'Reflection: name AND equation of the mirror line (e.g. y = x, x = 2, x-axis)',
      'Rotation: name, angle, direction (clockwise/anticlockwise) AND centre point',
      'Enlargement: name, scale factor (with sign) AND centre point',
    ],
    worked: {
      question: 'Describe fully the single transformation that maps triangle A onto triangle B.',
      answer: '"A rotation of 90° clockwise about the origin (0, 0)." Name + angle + direction + centre. Every component named, every component correct.',
    },
    commonMistakes: [
      'Saying "rotation" without the angle, direction or centre',
      'Saying "reflection" without the mirror line equation',
      'Giving the centre of enlargement as a label (e.g. "P") without coordinates when coordinates were available',
      'Trying to combine multiple transformations — the question asks for a single transformation',
    ],
    scoringTip: 'Use a checklist: type → parameter 1 → parameter 2 → parameter 3 (if applicable). Tick each box as you write.',
  },
  {
    slug: 'give-reasons',
    title: 'How to answer "Give reasons" questions in GCSE Maths',
    shortDescription: 'Name the angle rule, theorem or property explicitly. "From the diagram" earns nothing.',
    metaDescription: 'In GCSE Maths "give reasons" questions, you must name the specific angle rule or theorem. Learn the exact phrasing examiners want.',
    keywords: ['give reasons gcse', 'angle reasons gcse maths', 'circle theorem reasons gcse', 'how to give reasons gcse'],
    whatItMeans: 'When a question asks you to give a reason, you must name the specific mathematical rule that justifies your statement. Vague language ("because of geometry", "from the diagram") scores zero. Use the exact terminology from the curriculum.',
    whatExaminersWant: [
      'For parallel lines: "alternate angles are equal", "corresponding angles are equal", "co-interior angles sum to 180°"',
      'For straight lines and points: "angles on a straight line sum to 180°", "angles at a point sum to 360°"',
      'For triangles: "angles in a triangle sum to 180°", "base angles of an isosceles triangle are equal"',
      'For circles: name the specific theorem ("angle at the centre is twice the angle at the circumference", "angle in a semicircle is 90°", "alternate segment theorem", etc.)',
    ],
    worked: {
      question: 'AB is parallel to CD. Find angle x and give your reason.',
      answer: 'x = 65°. Reason: alternate angles are equal (AB is parallel to CD).',
    },
    commonMistakes: [
      'Writing "because they are the same" or "from the diagram"',
      'Mixing up alternate and corresponding angles',
      'Saying "Z-angle" or "F-angle" — examiners want the formal term ("alternate" / "corresponding")',
      'Forgetting to mention that the lines are parallel when using parallel-line reasons',
    ],
    scoringTip: 'Each angle reason is usually worth 1 mark on top of the angle value. Write a separate line per reason — do not jam them all together.',
  },
  {
    slug: 'sketch-vs-draw-vs-plot',
    title: '"Sketch" vs "Draw" vs "Plot" — what each command means in GCSE Maths',
    shortDescription: 'Three different commands. "Plot" needs exact points; "Draw" needs a ruler; "Sketch" needs only shape + key features.',
    metaDescription: 'Sketch, draw and plot are three different commands in GCSE Maths. Understand exactly what each one demands so you score every mark on graph questions.',
    keywords: ['sketch vs plot gcse', 'sketch graph gcse maths', 'draw vs plot gcse', 'gcse graph commands'],
    whatItMeans: 'These three commands are NOT interchangeable. Use the wrong approach and you lose marks even with the right shape. Plot = accurate. Draw = ruler-straight. Sketch = freehand with labels.',
    whatExaminersWant: [
      'Plot: graph paper, accurate axes, every required point marked from a table — accuracy required to within ±1 mm',
      'Draw: ruler used for straight lines; care taken with curves; accuracy expected but slightly looser than plot',
      'Sketch: rough freehand outline; axes labelled; key features marked (intercepts, turning points, asymptotes); precision NOT required',
    ],
    worked: {
      question: 'Sketch the graph of y = (x − 1)(x + 3).',
      answer: 'A parabola opening upwards. Mark x-intercepts at x = 1 and x = −3. Mark y-intercept at y = −3 (substitute x = 0). Mark the minimum point between x = −3 and x = 1 (at x = −1, y = −4). Label the axes. No ruler, no graph paper needed.',
    },
    commonMistakes: [
      'Spending exam time plotting points for a sketch question — wasted minutes',
      'Sketching when the question said plot — losing accuracy marks',
      'Sketching without marking the key features — examiners look for intercepts and turning points',
    ],
    scoringTip: 'For a sketch question, the marks usually break down as: 1 mark for the correct shape, 1 mark for each labelled key feature. Identify the features before you draw.',
  },
  {
    slug: 'not-drawn-accurately',
    title: 'How to handle "Not drawn accurately" warnings in GCSE Maths',
    shortDescription: 'A label that says the diagram is misleading. Never measure — use only the printed values.',
    metaDescription: 'When a GCSE Maths diagram says "Not drawn accurately", you must ignore visual measurements. Learn what to do (and not do) for AQA, Edexcel and OCR.',
    keywords: ['not drawn accurately gcse', 'gcse maths diagram not accurate', 'not to scale gcse maths'],
    whatItMeans: 'The diagram is a schematic, not a precise drawing. Angles, lengths and proportions on the diagram are deliberately distorted. You must base every calculation purely on the values written on the diagram, never on what you measure with a ruler or protractor.',
    whatExaminersWant: [
      'Calculations using only the labelled values',
      'No measurements taken from the diagram with a ruler or protractor',
      'Working that derives every length and angle from the given values, by formula or theorem',
    ],
    worked: {
      question: 'A right-angled triangle has a hypotenuse of 13 cm and one shorter side of 5 cm. Find the third side. (Diagram not drawn accurately.)',
      answer: 'Use Pythagoras: 5² + b² = 13². So b² = 169 − 25 = 144. b = 12 cm. We did not measure the diagram — we used the labelled values 13 and 5.',
    },
    commonMistakes: [
      'Measuring the diagram with a ruler when given values exist',
      'Estimating an angle visually instead of calculating it',
      'Assuming a shape is regular or symmetric because it "looks" so',
    ],
    scoringTip: 'Treat "not drawn accurately" as a deliberate trap. The diagram is misleading on purpose to test whether you rely on values or visuals.',
  },
  {
    slug: 'state',
    title: 'How to answer "State" questions in GCSE Maths',
    shortDescription: 'A one-line or one-word answer with no working required. Do not over-explain.',
    metaDescription: '"State" questions in GCSE Maths usually want a single short answer with no working. Learn when to stop writing and bank the mark.',
    keywords: ['state gcse maths', 'state questions gcse', 'gcse maths one mark answer'],
    whatItMeans: 'A "state" command asks for a fact, value or short phrase. It almost always carries one mark. There is no method to show — the answer is the mark.',
    whatExaminersWant: [
      'A single short answer — a number, a word, a short phrase',
      'No working unless explicitly requested',
      'The exact form the question asks for (e.g. coordinates, not just one value)',
    ],
    worked: {
      question: 'State the y-intercept of the line y = 3x − 7.',
      answer: '−7.',
    },
    commonMistakes: [
      'Writing two lines of working when one number is the answer',
      'Over-explaining and wasting exam time',
      'Confusing "state" with "find" — "find" may want working',
    ],
    scoringTip: 'When you see "state", look at the mark allocation. One mark = one answer. Move on to the next question.',
  },
]

const SLUG_MAP = new Map(QUESTION_TYPES.map(q => [q.slug, q]))

export function getQuestionType(slug: string): QuestionTypeGuide | undefined {
  return SLUG_MAP.get(slug)
}
