export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; icon: string; title: string; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'cta'; text: string; href: string; label: string }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColour: string
  author: string
  date: string
  readMins: number
  metaDescription: string
  keywords: string[]
  blocks: Block[]
}

export const BLOG_POSTS: BlogPost[] = [
  // ──────────────────────────────────────────────────────────────
  // 1
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'how-to-get-grade-9-gcse-maths',
    title: 'How to Get a Grade 9 in GCSE Maths: The Complete 2025 Guide',
    excerpt: 'Grade 9 is awarded to fewer than 5% of students. Here is the exact approach — covering mindset, topic mastery, past paper strategy and exam technique — that separates 9s from 7s.',
    category: 'Exam prep',
    categoryColour: 'blue',
    author: 'GCSEMathsAI Team',
    date: '12 March 2025',
    readMins: 9,
    metaDescription: 'Want a grade 9 in GCSE Maths? This complete 2025 guide covers the exact revision strategy, topic priorities and exam technique used by top students for AQA, Edexcel and OCR.',
    keywords: ['grade 9 GCSE maths', 'how to get grade 9 maths', 'GCSE maths grade 9 tips', 'GCSE maths 9 revision'],
    blocks: [
      { type: 'p', text: 'Grade 9 in GCSE Maths is the highest grade possible and is awarded to roughly 3–5% of students nationally each year. It signals that a student has not just understood the content but can apply it fluently under pressure — including on questions they have never seen before. Getting there requires a different strategy to simply aiming for a grade 7.' },
      { type: 'h2', text: 'What grade 9 actually means' },
      { type: 'p', text: 'The 9–1 grading system was designed so that grade 9 represents exceptional performance above the old A*. In practice, the raw mark needed for a grade 9 changes each year based on how difficult the papers were, but you typically need to score around 80–90% of marks to be in that band. The key word is consistently — across all three papers, not just one good day.' },
      { type: 'callout', icon: '📊', title: 'Grade 9 in numbers', text: 'In 2024, approximately 4.5% of GCSE Maths entries achieved grade 9 (AQA data). The raw mark boundary was typically 210–230 out of 240 marks across three papers.' },
      { type: 'h2', text: '1. Master every topic, including the ones you find boring' },
      { type: 'p', text: 'Students aiming for grade 7 can afford to skip their weakest topic and compensate elsewhere. Students aiming for grade 9 cannot. The higher tier paper is designed to probe every corner of the specification — circle theorems, vectors, algebraic fractions, cumulative frequency — and you need to be secure in all of them.' },
      { type: 'p', text: 'Work through the full specification systematically. For each topic, ask: can I do this question cold, with no notes, under timed conditions? If the answer is no, that topic needs more work before you move on.' },
      { type: 'ul', items: [
        'Use the official AQA, Edexcel or OCR specification as your checklist',
        'Tick off topics only when you can answer exam questions on them correctly',
        'Prioritise topics you find difficult — not topics you enjoy',
        'Higher-only topics (circle theorems, vectors, quadratics, surds) appear heavily at the top end of papers',
      ] },
      { type: 'h2', text: '2. Do past papers — but do them properly' },
      { type: 'p', text: 'Past papers are the single most effective revision tool for GCSE Maths, but most students use them badly. They sit at the kitchen table with their notes open, skip questions they find hard, and feel reassured by the ones they got right. That is not exam practice — it is comfort-seeking.' },
      { type: 'p', text: 'To use past papers properly: set a timer for the full 1h 30 minutes, sit in silence, attempt every question in order, and only look at the mark scheme after you have finished. Then go through every question you dropped marks on and understand exactly why — was it a knowledge gap, a careless error, or a misread question?' },
      { type: 'ol', items: [
        'Download the last 5 years of papers for your exam board',
        'Do each paper under full exam conditions (timed, no notes)',
        'Mark it strictly using the mark scheme',
        'Write down every mark dropped and categorise: knowledge gap / careless error / misread',
        'Revise the knowledge gaps before the next paper',
      ] },
      { type: 'h2', text: '3. Learn to read mark schemes' },
      { type: 'p', text: 'Mark schemes reveal something most students never appreciate: examiners are looking for specific mathematical steps, not just the right answer. Each question is broken into M marks (method) and A marks (accuracy). If you understand that structure, you can write answers that maximise your mark even when you are unsure of the final answer.' },
      { type: 'p', text: 'For a grade 9 student, this means: always show all working, even on questions you find trivial. A miscopied number can cost you an A mark but you keep the M mark if your method is correct.' },
      { type: 'h2', text: '4. Tackle the high-mark questions without fear' },
      { type: 'p', text: 'The questions at the end of each paper — the 5 and 6 mark problems — are where grade 9 students earn their grade. These questions often combine two or three topics (e.g. simultaneous equations + graph work, or Pythagoras + trigonometry). They reward students who can link ideas together rather than apply formulae mechanically.' },
      { type: 'p', text: 'Practice these explicitly. Look for "problem solving" questions in past papers and mark schemes. If you find them intimidating, work backwards: read the model answer and trace the mathematical thinking, then close it and try to reproduce the reasoning yourself.' },
      { type: 'h2', text: '5. The week before the exam' },
      { type: 'ul', items: [
        'Do a full paper from the most recent available year under strict conditions',
        'Review every formula you need to know by heart',
        'Sleep 8 hours the night before — cognitive performance drops sharply on less',
        'In the exam, read each question twice before writing anything',
        'If stuck, move on — return at the end with a fresh perspective',
      ] },
      { type: 'cta', text: 'Practice grade-9 style questions with instant AI feedback — timed papers available for AQA, Edexcel and OCR.', href: '/papers', label: 'Try a timed paper →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 2
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'aqa-gcse-maths-complete-topic-checklist',
    title: 'AQA GCSE Maths Topics: Complete Foundation & Higher Checklist (2025)',
    excerpt: 'Every topic on the AQA 8300 specification in one place — with Foundation and Higher breakdowns, plus the topics most frequently examined in recent papers.',
    category: 'Revision tips',
    categoryColour: 'purple',
    author: 'GCSEMathsAI Team',
    date: '8 March 2025',
    readMins: 7,
    metaDescription: 'Complete AQA GCSE Maths topic checklist for Foundation and Higher (2025). Every topic from the 8300 specification, with Higher-only topics clearly marked.',
    keywords: ['AQA GCSE maths topics', 'AQA maths checklist', 'AQA 8300 topics', 'AQA maths specification'],
    blocks: [
      { type: 'p', text: 'The AQA GCSE Mathematics specification (code 8300) covers five main topic areas: Number, Algebra, Ratio & Proportion, Geometry & Measures, and Statistics & Probability. Both Foundation and Higher tiers share much of the same content, but Higher includes additional material that goes up to grade 9.' },
      { type: 'p', text: 'This checklist covers every topic you need to know. Use it to track your revision — tick off a topic only when you can answer exam questions on it correctly, not just when you have read your notes.' },
      { type: 'h2', text: 'Number' },
      { type: 'ul', items: [
        'Place value, ordering and rounding (F+H)',
        'Fractions — simplifying, adding, subtracting, multiplying, dividing (F+H)',
        'Percentages — of amounts, increase/decrease, reverse percentages (F+H)',
        'Compound interest and depreciation (F+H)',
        'Ratio and proportion — simplifying, sharing, direct and inverse (F+H)',
        'Powers, roots and indices (F+H)',
        'Standard form — converting and calculating (F+H)',
        'Bounds and error intervals (F+H)',
        'Surds — simplifying and rationalising the denominator (H only)',
        'Prime factorisation, HCF and LCM (F+H)',
      ] },
      { type: 'h2', text: 'Algebra' },
      { type: 'ul', items: [
        'Simplifying expressions and collecting like terms (F+H)',
        'Expanding single and double brackets (F+H)',
        'Factorising — common factors and quadratics (F+H)',
        'Solving linear equations (F+H)',
        'Forming and solving equations from word problems (F+H)',
        'Inequalities — solving and representing on a number line (F+H)',
        'Sequences — nth term of linear and quadratic sequences (F+H)',
        'Straight-line graphs — y = mx + c, gradient, intercept (F+H)',
        'Simultaneous equations — elimination and substitution (H)',
        'Quadratic equations — factorising, formula, completing the square (H)',
        'Algebraic fractions (H)',
        'Functions — composite and inverse (H)',
        'Iteration (H)',
      ] },
      { type: 'h2', text: 'Geometry & Measures' },
      { type: 'ul', items: [
        'Angle facts — on a line, at a point, in triangles and polygons (F+H)',
        'Parallel lines — alternate, corresponding and co-interior angles (F+H)',
        'Pythagoras\' theorem (F+H)',
        'Trigonometry — SOH CAH TOA, finding sides and angles (F+H)',
        'Area and perimeter of 2D shapes including circles (F+H)',
        'Volume and surface area of 3D shapes (F+H)',
        'Transformations — reflection, rotation, translation, enlargement (F+H)',
        'Bearings (F+H)',
        'Loci and constructions (F+H)',
        'Circle theorems (H)',
        'Vectors (H)',
        'Sine rule and cosine rule (H)',
        '3D trigonometry and Pythagoras (H)',
        'Congruence and similarity (F+H)',
      ] },
      { type: 'h2', text: 'Statistics & Probability' },
      { type: 'ul', items: [
        'Mean, median, mode and range from lists and tables (F+H)',
        'Bar charts, pie charts and pictograms (F+H)',
        'Scatter graphs and correlation (F+H)',
        'Frequency tables and grouped data (F+H)',
        'Cumulative frequency and box plots (F+H)',
        'Histograms with unequal class widths (H)',
        'Basic probability — calculating, listing outcomes (F+H)',
        'Tree diagrams — independent and dependent events (F+H)',
        'Conditional probability and Venn diagrams (H)',
      ] },
      { type: 'callout', icon: '🎯', title: 'Most examined topics (2019–2024)', text: 'Based on recent AQA papers, the most frequently tested areas are: Algebra (solving equations, sequences, graphs), Pythagoras & Trigonometry, Percentages, and Probability (tree diagrams). Spend extra time here.' },
      { type: 'h2', text: 'How to use this checklist' },
      { type: 'ol', items: [
        'Print or copy the checklist',
        'Rate each topic: Red (can\'t do), Amber (sometimes), Green (confident)',
        'Revise Red topics first — they offer the highest mark gains',
        'Practise Amber topics until they turn Green',
        'Return to Green topics weekly to maintain them',
      ] },
      { type: 'cta', text: 'Practise any AQA topic with instant AI marking — Foundation and Higher questions available.', href: '/learn', label: 'Start topic practice →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 3
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'gcse-maths-grade-boundaries-explained',
    title: 'GCSE Maths Grade Boundaries 2024 & 2025 Explained',
    excerpt: 'Grade boundaries change every year, confusing students and parents alike. We explain exactly how they work, what affects them, and what raw score you realistically need to hit your target.',
    category: 'Exam prep',
    categoryColour: 'blue',
    author: 'GCSEMathsAI Team',
    date: '5 March 2025',
    readMins: 6,
    metaDescription: 'GCSE Maths grade boundaries explained for 2024 and 2025. Find out what raw marks you need for grades 4, 5, 7 and 9 in AQA, Edexcel and OCR — and why boundaries change each year.',
    keywords: ['GCSE maths grade boundaries', 'GCSE maths grade boundaries 2024', 'grade 4 GCSE maths score', 'GCSE maths pass mark'],
    blocks: [
      { type: 'p', text: 'Grade boundaries are one of the most misunderstood aspects of GCSE Maths. Many students and parents assume the same score is needed every year to get a grade 5. In reality, boundaries shift each year — sometimes significantly — depending on how hard the papers were. Here is everything you need to know.' },
      { type: 'h2', text: 'How grade boundaries are set' },
      { type: 'p', text: 'Grade boundaries are not decided before the exam. They are set after marking, by each exam board\'s senior examiners. The process involves comparing this year\'s cohort performance against previous years and adjusting boundaries so that equivalent performance earns the same grade — even if the papers were harder or easier.' },
      { type: 'p', text: 'This means two things: first, you cannot fail GCSE Maths because the paper was unusually hard (boundaries will be lower). Second, you cannot coast through on an easy paper (boundaries will be higher). The system is designed to be fair across years.' },
      { type: 'h2', text: 'AQA Grade Boundaries — typical ranges' },
      { type: 'table', headers: ['Grade', 'Foundation (out of 240)', 'Higher (out of 240)'], rows: [
        ['9', 'N/A', '195–215'],
        ['8', 'N/A', '170–190'],
        ['7', 'N/A', '145–165'],
        ['6', 'N/A', '115–135'],
        ['5', '150–180', '90–115'],
        ['4', '110–140', '65–90'],
        ['3', '75–95', '40–60'],
        ['1', '20–35', '10–25'],
      ] },
      { type: 'callout', icon: '⚠️', title: 'Important', text: 'The ranges above are approximate based on historical AQA data (2019–2024). Official boundaries for 2025 will be published by AQA on results day. Always check the AQA website for the definitive figures.' },
      { type: 'h2', text: 'Edexcel and OCR — how they compare' },
      { type: 'p', text: 'Edexcel (1MA1) and OCR (J560) follow the same regulatory framework and tend to produce similar percentage thresholds for each grade, though the raw mark totals differ (Edexcel and AQA both use 240 marks total across three papers; OCR Foundation uses 300 marks total across six papers). The percentage of marks needed for each grade is broadly similar across all three boards.' },
      { type: 'h2', text: 'Why boundaries move between years' },
      { type: 'ul', items: [
        'Paper difficulty — if questions were harder, boundaries drop so fewer students are penalised',
        'Cohort performance — if a year group performs unusually well or poorly, adjustments are made',
        'Statistical models — Ofqual requires boards to maintain grade distributions consistent with prior attainment data',
        'COVID catch-up years (2022–2023) saw adjusted boundaries as students returned to exams',
      ] },
      { type: 'h2', text: 'What score should you be aiming for in practice?' },
      { type: 'p', text: 'Rather than fixating on an exact boundary, set a safe target above the grade you want. If you are aiming for a grade 5, target the grade 6 boundary. This gives you a buffer for a bad exam day, nerves, or a tough paper.' },
      { type: 'ul', items: [
        'Targeting grade 4 (standard pass): aim for 55–60% of total marks',
        'Targeting grade 5 (strong pass): aim for 65–70% of total marks',
        'Targeting grade 7: aim for 70–75% of total marks',
        'Targeting grade 9: aim for 85%+ of total marks',
      ] },
      { type: 'h2', text: 'How AI practice can help you hit your target' },
      { type: 'p', text: 'The most effective way to understand where you currently are is to sit timed practice papers and have them marked properly. GCSEMathsAI\'s timed exam papers give you an estimated grade boundary after each paper based on your score, so you can track your progress and see exactly how far you are from your target.' },
      { type: 'cta', text: 'Sit a timed practice paper and see your estimated grade — available for AQA, Edexcel and OCR.', href: '/papers', label: 'Try a practice paper →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 4
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'gcse-maths-revision-tips-that-actually-work',
    title: '10 GCSE Maths Revision Tips That Actually Work (2025)',
    excerpt: 'Most revision advice is vague. These 10 specific techniques are backed by cognitive science and consistently used by students who make the biggest grade improvements.',
    category: 'Revision tips',
    categoryColour: 'purple',
    author: 'GCSEMathsAI Team',
    date: '1 March 2025',
    readMins: 7,
    metaDescription: '10 GCSE Maths revision tips that actually work in 2025. Evidence-based strategies to boost your grade — from active recall to past paper technique and mark scheme analysis.',
    keywords: ['GCSE maths revision tips', 'how to revise GCSE maths', 'GCSE maths study tips', 'best way to revise maths'],
    blocks: [
      { type: 'p', text: 'Reading your textbook and watching YouTube videos feel productive, but cognitive science shows they are among the least effective revision strategies. Here are ten techniques that actually move the needle — used by students who make the biggest improvements in the final months before their exams.' },
      { type: 'h2', text: '1. Use active recall, not passive reading' },
      { type: 'p', text: 'Instead of reading through notes, close them and try to write down everything you know about a topic from memory. Then check. The act of trying to retrieve information — even when you fail — strengthens memory far more than re-reading. This is called the testing effect and it is one of the most robust findings in cognitive psychology.' },
      { type: 'h2', text: '2. Do past papers under timed conditions' },
      { type: 'p', text: 'Sitting with notes open and unlimited time feels like revision. It is not. Set your phone to 1h 30m, sit in silence, and attempt every question. The experience of time pressure and uncertainty is exactly what you are preparing for — and you cannot prepare for it by avoiding it.' },
      { type: 'h2', text: '3. Read the mark scheme after every paper' },
      { type: 'p', text: 'The mark scheme is the most valuable document in your revision toolkit. It tells you exactly what examiners are looking for, how method marks are awarded, and which common mistakes cost students marks. Spend as long reading the mark scheme as you did on the paper itself.' },
      { type: 'h2', text: '4. Always show your working' },
      { type: 'p', text: 'In GCSE Maths, marks are split between method marks (for correct mathematical process) and accuracy marks (for the right answer). If you get the wrong answer but your working is correct, you can still collect method marks. If you just write down an answer with no working, a wrong answer scores zero — even if you were one step away.' },
      { type: 'h2', text: '5. Identify your weakest topics and start there' },
      { type: 'p', text: 'Most students naturally revise what they already know well because it feels good. This is the opposite of what helps your grade. The topics you find hardest offer the most marks to gain. Make a list of your three weakest topics and spend the first hour of every revision session on one of them.' },
      { type: 'h2', text: '6. Use spaced repetition' },
      { type: 'p', text: 'Instead of spending three hours on Algebra in one sitting, spread it across multiple sessions with gaps in between. Revisit a topic after one day, then after three days, then after a week. Each time you return, the memory strengthens. This technique dramatically reduces the time needed to achieve long-term retention.' },
      { type: 'h2', text: '7. Learn the formulas you are not given' },
      { type: 'p', text: 'GCSE Maths exams provide some formulas (quadratic formula, sphere and cone volumes are given in the formula sheet on some boards) but not others. Many students are shocked to discover they need to memorise the area of a trapezium, the sine and cosine rules, and circle area formulas from memory. Know your board\'s formula sheet so you know exactly what you must memorise.' },
      { type: 'h2', text: '8. Check your units and significant figures' },
      { type: 'p', text: 'A surprising number of marks are dropped not through mathematical errors but through forgetting to include units (cm², m³), rounding to the wrong number of decimal places, or truncating instead of rounding. These are free marks — train yourself to always re-read the question after solving it.' },
      { type: 'h2', text: '9. Master your calculator' },
      { type: 'p', text: 'Most students use their calculator like a basic arithmetic tool. In reality, the Casio fx-83/85 series can: store and recall values, compute standard form, work with fractions, calculate statistical values, and even solve equations in some models. Ten minutes learning calculator shortcuts can save you crucial minutes in the exam.' },
      { type: 'h2', text: '10. Get instant feedback on your answers' },
      { type: 'p', text: 'The gap between practising a question and understanding why you got it wrong is where most students stall. Traditional marking requires a teacher or a trip through the mark scheme. AI-powered marking gives you instant, specific feedback on exactly what you did wrong and how to fix it — which is the fastest route to improvement.' },
      { type: 'cta', text: 'Practice any GCSE Maths topic and get instant AI feedback — specific, actionable, and available 24/7.', href: '/learn', label: 'Start practising →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 5
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'gcse-maths-formulas-you-must-know',
    title: 'GCSE Maths Formulas You Must Know: Foundation & Higher (2025)',
    excerpt: 'Not all GCSE Maths formulas are given in the exam. This complete list tells you exactly which formulas you must memorise and which are provided — for AQA, Edexcel and OCR.',
    category: 'Revision tips',
    categoryColour: 'purple',
    author: 'GCSEMathsAI Team',
    date: '25 February 2025',
    readMins: 8,
    metaDescription: 'Complete list of GCSE Maths formulas to know in 2025 — which are given in the exam and which you must memorise. Covers AQA, Edexcel and OCR, Foundation and Higher.',
    keywords: ['GCSE maths formulas', 'GCSE maths formula sheet', 'GCSE maths formulas list', 'maths formulas GCSE higher'],
    blocks: [
      { type: 'p', text: 'One of the most common revision mistakes is assuming you will be given all the formulas you need in the exam. You will not. Each board provides a small formula sheet with a handful of higher-level formulas, but the vast majority of what you need must come from memory. This guide tells you exactly what to learn.' },
      { type: 'h2', text: 'What the formula sheet gives you (Higher tier)' },
      { type: 'p', text: 'AQA, Edexcel and OCR all provide a formula sheet for the Higher tier exam. The formulas typically included are:' },
      { type: 'ul', items: [
        'Quadratic formula: x = (-b ± √(b²-4ac)) / 2a',
        'Volume of a sphere: V = (4/3)πr³',
        'Surface area of a sphere: A = 4πr²',
        'Volume of a cone: V = (1/3)πr²h',
        'Sine rule: a/sinA = b/sinB = c/sinC',
        'Cosine rule: a² = b² + c² - 2bc cosA',
        'Area of a triangle: A = (1/2)ab sinC',
      ] },
      { type: 'callout', icon: '⚠️', title: 'Check your board', text: 'Formula sheets vary slightly between AQA, Edexcel and OCR. Download your board\'s official formula sheet and check exactly what is provided — do not assume anything.' },
      { type: 'h2', text: 'Formulas you MUST memorise (Foundation & Higher)' },
      { type: 'h3', text: 'Area & Perimeter' },
      { type: 'ul', items: [
        'Area of a rectangle: A = l × w',
        'Area of a triangle: A = ½ × b × h',
        'Area of a parallelogram: A = b × h',
        'Area of a trapezium: A = ½(a + b)h',
        'Area of a circle: A = πr²',
        'Circumference of a circle: C = 2πr = πd',
      ] },
      { type: 'h3', text: 'Volume & Surface Area' },
      { type: 'ul', items: [
        'Volume of a cuboid: V = l × w × h',
        'Volume of a prism: V = cross-sectional area × length',
        'Volume of a cylinder: V = πr²h',
        'Surface area of a cylinder: A = 2πrh + 2πr²',
        'Volume of a pyramid: V = ⅓ × base area × height',
      ] },
      { type: 'h3', text: 'Algebra & Number' },
      { type: 'ul', items: [
        'Difference of two squares: a² - b² = (a+b)(a-b)',
        'Compound interest: A = P(1 + r/100)ⁿ',
        'Percentage change: (new - old) / old × 100',
        'Reverse percentage: original = amount ÷ (1 ± r/100)',
        'Speed = Distance ÷ Time',
        'Density = Mass ÷ Volume',
        'Pressure = Force ÷ Area',
      ] },
      { type: 'h3', text: 'Pythagoras & Trigonometry (Foundation & Higher)' },
      { type: 'ul', items: [
        'Pythagoras: a² + b² = c² (c is the hypotenuse)',
        'sin θ = opposite/hypotenuse',
        'cos θ = adjacent/hypotenuse',
        'tan θ = opposite/adjacent',
      ] },
      { type: 'h3', text: 'Higher-only formulas (not on formula sheet)' },
      { type: 'ul', items: [
        'Arc length: l = (θ/360) × 2πr',
        'Area of a sector: A = (θ/360) × πr²',
        'nth term of a geometric sequence: arⁿ⁻¹',
        'Sum of interior angles of a polygon: (n-2) × 180°',
        'Frequency density (histograms): FD = frequency ÷ class width',
      ] },
      { type: 'h2', text: 'How to memorise formulas effectively' },
      { type: 'p', text: 'The best method is retrieval practice — not re-reading. Write out the formula from memory, check it, correct it, and repeat. Do this daily for formulas you struggle with. Making formula cards (one formula per card, written by hand) and testing yourself until you can write every one without looking takes about two weeks of daily practice.' },
      { type: 'cta', text: 'Test yourself on GCSE Maths formulas with AI-marked practice questions — see exactly where your gaps are.', href: '/learn', label: 'Practice now →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 6
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'gcse-maths-foundation-vs-higher-which-tier',
    title: 'GCSE Maths Foundation vs Higher: Which Tier Should You Take?',
    excerpt: 'The tier decision is one of the most important choices in Year 10 — and many students get it wrong. Here is a clear guide to help you and your school make the right call.',
    category: 'Advice',
    categoryColour: 'green',
    author: 'GCSEMathsAI Team',
    date: '20 February 2025',
    readMins: 5,
    metaDescription: 'Foundation vs Higher GCSE Maths: which tier should you take? Understand grade ceilings, crossover content, and how to decide — with advice for borderline students.',
    keywords: ['GCSE maths foundation vs higher', 'should I take higher GCSE maths', 'GCSE tier decision', 'foundation or higher maths'],
    blocks: [
      { type: 'p', text: 'The choice between Foundation and Higher tier is made by your school — usually in consultation with your maths teacher — typically at the start of Year 11 or during Year 10. It is one of the most consequential decisions in your GCSE journey, and it is often misunderstood.' },
      { type: 'h2', text: 'The key difference: grade ceiling' },
      { type: 'p', text: 'Foundation tier awards grades 1–5. Higher tier awards grades 4–9. This means if you sit Foundation, the highest grade you can achieve is a 5 — even with a perfect paper. If you want a grade 6, 7, 8 or 9, you must sit Higher.' },
      { type: 'callout', icon: '🎯', title: 'The overlapping grades', text: 'Both tiers can award grades 4 and 5. A student who achieves grade 5 on Foundation and a student who achieves grade 5 on Higher have the same grade on paper — but the Higher student answered harder questions to get there.' },
      { type: 'h2', text: 'What content is different?' },
      { type: 'p', text: 'Foundation and Higher share a large body of content — roughly 80% of topics appear on both tiers. The Higher tier adds topics including:' },
      { type: 'ul', items: [
        'Surds and rationalising the denominator',
        'Quadratic equations (formula and completing the square)',
        'Simultaneous equations (including with quadratics)',
        'Circle theorems',
        'Vectors',
        'Algebraic fractions',
        'Histograms with unequal class widths',
        'Conditional probability and Venn diagrams',
        'Sine and cosine rules',
        '3D trigonometry and Pythagoras',
      ] },
      { type: 'h2', text: 'Who should take Foundation?' },
      { type: 'ul', items: [
        'Students whose current attainment suggests they are working at grades 1–3',
        'Students for whom a grade 4 or 5 is the target — Foundation papers are designed for this',
        'Students who find Higher content significantly overwhelming and where confidence is low',
        'Students who need the grade to meet a sixth form or apprenticeship minimum (usually grade 4 or 5)',
      ] },
      { type: 'h2', text: 'Who should take Higher?' },
      { type: 'ul', items: [
        'Students targeting grade 6 or above — Higher is the only route to these grades',
        'Students who are consistently achieving grade 5+ in assessments',
        'Students who want to continue with A-level Maths or sciences (typically requires grade 7+)',
        'Students who are ambitious and willing to put in extra work to access the full grade range',
      ] },
      { type: 'h2', text: 'The borderline student: grades 4–5' },
      { type: 'p', text: 'The hardest decision is for students hovering around grades 4–5. Taking Higher gives them access to higher grades but risks a lower grade if the paper is too difficult. Taking Foundation gives a safer route to a grade 4 or 5 but caps ambition.' },
      { type: 'p', text: 'The general rule: if your teacher believes you can reliably achieve a grade 5 in Higher tier assessments under exam conditions, Higher is usually the better long-term choice. The grade 4 on Higher is achievable with solid Foundation-level content, and getting there also unlocks the possibility of a 5 or 6 if your revision goes well.' },
      { type: 'h2', text: 'When is the decision made?' },
      { type: 'p', text: 'Schools typically make the final tier entry decision in early Year 11 (October–November), though some decide as early as the end of Year 10. You have the right to discuss this with your teacher and parents. If you feel strongly about which tier you want to sit, make that case early — schools generally accommodate reasonable requests.' },
      { type: 'cta', text: 'Practise Foundation and Higher tier questions for AQA, Edexcel and OCR — see which level feels right.', href: '/learn', label: 'Try both tiers →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 7
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'how-ai-is-changing-gcse-maths-revision-2025',
    title: 'How AI is Changing GCSE Maths Revision in 2025',
    excerpt: 'From personalised question generation to instant marking, AI tutoring tools are transforming how students prepare for GCSE Maths. Here is what is actually changing and what still matters.',
    category: 'How it works',
    categoryColour: 'amber',
    author: 'GCSEMathsAI Team',
    date: '15 February 2025',
    readMins: 6,
    metaDescription: 'How AI is transforming GCSE Maths revision in 2025 — personalised practice, instant marking and adaptive learning. What the research says and how to use it effectively.',
    keywords: ['AI GCSE maths revision', 'AI maths tutor GCSE', 'artificial intelligence GCSE revision', 'AI learning GCSE'],
    blocks: [
      { type: 'p', text: 'The way students revise for GCSE Maths has not fundamentally changed in decades: read notes, watch videos, do past papers, get feedback from a teacher or parent. The last step — getting feedback — has always been the bottleneck. Teachers are stretched, parents often cannot help, and mark schemes require interpretation. AI is changing this.' },
      { type: 'h2', text: 'The problem with traditional revision' },
      { type: 'p', text: 'The most effective revision involves doing a question, getting meaningful feedback, understanding what you did wrong, and trying again. This feedback loop is scientifically the fastest route to improvement. But until recently, the only way to close this loop was to hand work to a teacher — which might mean waiting days for a response, if at all.' },
      { type: 'p', text: 'YouTube tutorials are helpful for learning new concepts but cannot tell you where you personally went wrong. Textbook answers confirm whether you are right or wrong but not why. Past paper mark schemes require you to decode examiner language without anyone explaining it.' },
      { type: 'h2', text: 'What AI marking actually does' },
      { type: 'p', text: 'Modern AI models trained on educational content can read a student\'s written answer, compare it to a mark scheme, identify specific errors, award the correct marks (including partial credit), and explain in plain English what needs to change. This is not auto-grading — it is genuine mathematical reasoning applied to student work.' },
      { type: 'p', text: 'At GCSEMathsAI, we use Claude by Anthropic to mark student answers. The marking is calibrated to each exam board: AQA marking applies strict method marks; Edexcel marking allows follow-through marks; OCR marking credits alternative valid methods. The feedback is specific, immediate, and based on the same criteria a real examiner would use.' },
      { type: 'h2', text: 'Personalised question generation' },
      { type: 'p', text: 'Beyond marking, AI can generate new practice questions on demand — tailored to a specific topic, difficulty level, and exam board style. This means a student who has worked through every available Pythagoras question on past papers can get ten more, calibrated to their level, without waiting for a new paper to be published.' },
      { type: 'h2', text: 'What AI cannot replace' },
      { type: 'ul', items: [
        'A teacher who knows you personally and can spot anxiety, misunderstanding, or a gap in foundational knowledge',
        'The experience of writing in an actual exam hall under pressure with an invigilator',
        'The motivation and structure that comes from a good classroom or revision session',
        'Deep conceptual teaching for genuinely new topics you have never encountered',
      ] },
      { type: 'h2', text: 'How to use AI tools most effectively' },
      { type: 'p', text: 'Think of AI revision tools as a patient, always-available practice partner. Use them for the practice-feedback loop: do a question, get instant feedback, understand the correction, try again. Use your teacher for conceptual explanations of topics you genuinely do not understand. Use past papers for simulated exam conditions.' },
      { type: 'ul', items: [
        'Use AI practice for topics where you need volume of practice (equations, sequences, percentage problems)',
        'Use AI marking to understand exactly where marks are being dropped',
        'Use timed AI papers to simulate exam conditions and get a grade estimate',
        'Continue to revise with teachers and textbooks for understanding new concepts',
      ] },
      { type: 'cta', text: 'Try AI-marked GCSE Maths practice — instant feedback on every answer, for AQA, Edexcel and OCR.', href: '/learn', label: 'Start practising →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 8
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'edexcel-gcse-maths-past-papers-guide',
    title: 'Edexcel GCSE Maths Past Papers: How to Use Them to Boost Your Grade',
    excerpt: 'Edexcel (1MA1) past papers are the most powerful revision tool available — but only if you use them correctly. Here is the method used by students who make the biggest improvements.',
    category: 'Exam prep',
    categoryColour: 'blue',
    author: 'GCSEMathsAI Team',
    date: '10 February 2025',
    readMins: 6,
    metaDescription: 'How to use Edexcel GCSE Maths past papers (1MA1) effectively in 2025. Download links, revision strategy, mark scheme tips and how AI practice papers can fill the gaps.',
    keywords: ['Edexcel GCSE maths past papers', '1MA1 past papers', 'Edexcel maths revision', 'Edexcel GCSE maths 2024'],
    blocks: [
      { type: 'p', text: 'Edexcel GCSE Mathematics (specification code 1MA1) is sat by more students in England than any other GCSE Maths qualification. The three-paper structure — Paper 1 Non-Calculator, Paper 2 Calculator, Paper 3 Calculator — has been in place since 2017, meaning there is now a substantial bank of real past papers available.' },
      { type: 'h2', text: 'The Edexcel paper structure' },
      { type: 'table', headers: ['Paper', 'Calculator?', 'Duration', 'Marks'], rows: [
        ['Paper 1', 'No', '1h 30m', '80'],
        ['Paper 2', 'Yes', '1h 30m', '80'],
        ['Paper 3', 'Yes', '1h 30m', '80'],
        ['Total', '—', '4h 30m', '240'],
      ] },
      { type: 'p', text: 'Edexcel questions often feature real-world contexts — a business calculating profit, a builder measuring angles, a scientist using standard form — which some students find easier and others find distracting. Getting used to this style is an important part of preparation.' },
      { type: 'h2', text: 'Where to find Edexcel past papers' },
      { type: 'p', text: 'Official Edexcel past papers (2017 onwards) are available on the Pearson qualifications website under the 1MA1 specification. Papers from 2017–2024 are available, giving you access to 24 individual paper sets for each tier.' },
      { type: 'h2', text: 'The right way to use past papers' },
      { type: 'ol', items: [
        'Start with papers from 2019 or 2020 — these represent the standard specification fully embedded',
        'Do the entire paper in one sitting under timed conditions (1h 30m per paper)',
        'Mark using the official mark scheme — be honest and strict',
        'Analyse every mark dropped: was it a knowledge gap, a method error, or a careless mistake?',
        'Revisit knowledge gaps before the next paper session',
        'Work chronologically towards the most recent papers — save 2023 and 2024 for closest to exam',
      ] },
      { type: 'h2', text: 'Edexcel-specific things to know' },
      { type: 'ul', items: [
        'Follow-through marks: Edexcel awards "ft" marks — if you carry a wrong value correctly through subsequent working, you still get method marks',
        'Formulae sheet: provided for both tiers, includes quadratic formula, trig area, sine/cosine rule',
        'Context questions: read carefully and extract the maths from the scenario before solving',
        'Show all working: method marks are frequently available even when the final answer is wrong',
        'Diagrams: Edexcel often includes "not drawn to scale" — never rely on measuring from the diagram',
      ] },
      { type: 'h2', text: 'What to do when you run out of past papers' },
      { type: 'p', text: 'With only around 8 years of papers available (post-2017 specification), students who start past paper practice early can run out of material. This is where AI-generated practice papers become valuable — they produce fresh questions in Edexcel style, calibrated to the right difficulty, with proper mark schemes.' },
      { type: 'cta', text: 'Practise with Edexcel-style AI papers when you run out of real ones — timed, marked and graded.', href: '/papers', label: 'Try an Edexcel paper →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 9
  // ──────────────────────────────────────────────────────────────
  {
    slug: '7-day-gcse-maths-revision-plan',
    title: 'The 7-Day GCSE Maths Revision Plan: Last-Minute Rescue Guide',
    excerpt: 'Got a week before your GCSE Maths exam? This day-by-day plan covers every major topic, builds in past paper practice, and prioritises the questions most likely to come up.',
    category: 'Revision tips',
    categoryColour: 'purple',
    author: 'GCSEMathsAI Team',
    date: '5 February 2025',
    readMins: 7,
    metaDescription: '7-day GCSE Maths revision plan for last-minute exam preparation. Day-by-day guide covering Number, Algebra, Geometry, Statistics, Probability and past papers.',
    keywords: ['GCSE maths last minute revision', '7 day GCSE maths revision plan', 'GCSE maths revision week before exam', 'quick GCSE maths revision'],
    blocks: [
      { type: 'p', text: 'If your GCSE Maths exam is a week away, do not panic. A focused seven days of structured revision — prioritising the right topics in the right order — can make a meaningful difference to your grade. This plan assumes you have some foundation knowledge and need to consolidate and practise under exam conditions.' },
      { type: 'callout', icon: '📋', title: 'Before you start', text: 'Gather: your specification checklist, calculator, formula sheet, past paper booklets (or access to GCSEMathsAI), and a timer. Turn off your phone notifications for each revision block.' },
      { type: 'h2', text: 'Day 1: Number' },
      { type: 'ul', items: [
        'Morning (1h): Fractions, percentages (of amounts, increase/decrease, reverse), compound interest',
        'Afternoon (1h): Standard form, bounds, ratio and proportion',
        'Evening (30 mins): 20 quick practice questions on Number — use GCSEMathsAI or past paper extracts',
      ] },
      { type: 'h2', text: 'Day 2: Algebra' },
      { type: 'ul', items: [
        'Morning (1h): Solving linear equations, expanding and factorising brackets, forming equations',
        'Afternoon (1h): Sequences (nth term linear and quadratic), simultaneous equations (Higher)',
        'Evening (30 mins): Algebra practice questions with AI marking — focus on questions you got wrong',
      ] },
      { type: 'h2', text: 'Day 3: Graphs & Functions' },
      { type: 'ul', items: [
        'Morning (1h): Straight line graphs (y=mx+c, gradient, intercept), plotting and reading graphs',
        'Afternoon (1h): Quadratic graphs, sketching curves, real-life graphs (distance-time, velocity-time)',
        'Evening (30 mins): Practice graph questions — draw at least three graphs by hand',
      ] },
      { type: 'h2', text: 'Day 4: Geometry' },
      { type: 'ul', items: [
        'Morning (1h): Angle rules (triangles, polygons, parallel lines), Pythagoras, basic trigonometry',
        'Afternoon (1h): Area and volume of all shapes, circle theorems (Higher)',
        'Evening (30 mins): Geometry and measure questions — draw diagrams for every question',
      ] },
      { type: 'h2', text: 'Day 5: Statistics & Probability' },
      { type: 'ul', items: [
        'Morning (45 mins): Averages (mean, median, mode, range) from lists and tables, cumulative frequency',
        'Afternoon (45 mins): Probability — basic, tree diagrams, Venn diagrams (Higher)',
        'Evening (30 mins): Mixed Stats and Probability questions',
      ] },
      { type: 'h2', text: 'Day 6: Full Past Paper' },
      { type: 'ul', items: [
        'Morning: Sit a complete past paper (1h 30m) under exam conditions — no notes, timer running',
        'Afternoon: Mark it strictly, identify every dropped mark, categorise as knowledge/method/careless',
        'Evening (1h): Revise the knowledge gaps identified. Check formulas you could not remember.',
      ] },
      { type: 'h2', text: 'Day 7: Weak Topics + Final Review' },
      { type: 'ul', items: [
        'Morning (1h): Focus entirely on your two or three weakest topics from the week',
        'Afternoon (30 mins): Formula review — write every formula you need to know from memory',
        'Evening (30 mins): Light reading of notes. No new topics. Early night — sleep is critical.',
      ] },
      { type: 'h2', text: 'On exam day' },
      { type: 'ul', items: [
        'Eat breakfast — blood glucose affects cognitive performance',
        'Check your equipment the night before: calculator, ruler, protractor, compass, pens',
        'Read each question twice before starting your answer',
        'Show all working — method marks are always available',
        'If stuck on a question, move on and return at the end',
      ] },
      { type: 'cta', text: 'Follow this plan with AI-powered practice — get instant feedback on every question, 24/7.', href: '/learn', label: 'Start Day 1 practice →' },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // 10
  // ──────────────────────────────────────────────────────────────
  {
    slug: 'ocr-gcse-maths-complete-guide',
    title: 'OCR GCSE Maths (J560): Complete Guide to Topics, Papers & Exam Strategy',
    excerpt: 'OCR GCSE Mathematics is sat by hundreds of thousands of students. This complete guide covers the J560 specification, paper structure, grade boundaries and how OCR questions differ from AQA and Edexcel.',
    category: 'Exam prep',
    categoryColour: 'blue',
    author: 'GCSEMathsAI Team',
    date: '1 February 2025',
    readMins: 7,
    metaDescription: 'Complete guide to OCR GCSE Maths (J560) — paper structure, topics, grade boundaries and revision strategy. Understand how OCR differs from AQA and Edexcel.',
    keywords: ['OCR GCSE maths', 'J560 maths', 'OCR maths topics', 'OCR GCSE maths revision'],
    blocks: [
      { type: 'p', text: 'OCR GCSE Mathematics (J560) is the third major GCSE Maths qualification in England alongside AQA and Edexcel. While all three boards must follow the same national curriculum, they differ in how they structure their papers, the style of questions they ask, and their assessment objectives. Understanding these differences matters for your revision.' },
      { type: 'h2', text: 'OCR J560 paper structure' },
      { type: 'table', headers: ['Paper', 'Calculator?', 'Duration', 'Marks (Foundation)', 'Marks (Higher)'], rows: [
        ['Paper 1', 'No', '1h 30m', '100', '100'],
        ['Paper 2', 'Yes', '1h 30m', '100', '100'],
        ['Paper 3', 'Yes', '1h 30m', '100', '100'],
        ['Paper 4', 'Yes', '1h 30m', '100', '100'],
        ['Paper 5', 'No', '1h 30m', '100', '100'],
        ['Total', '—', '7h 30m', '500', '500'],
      ] },
      { type: 'callout', icon: '📋', title: 'Important difference from AQA and Edexcel', text: 'OCR has FIVE papers totalling 500 marks, compared to AQA and Edexcel\'s three papers totalling 240 marks. The exam time commitment is significantly higher. Plan your revision accordingly.' },
      { type: 'h2', text: 'How OCR questions differ from AQA and Edexcel' },
      { type: 'p', text: 'OCR is known for its emphasis on mathematical reasoning and problem-solving. Questions often require students to explain their working, justify conclusions, or apply mathematics in unfamiliar contexts. This distinguishes OCR from AQA (which favours structured multi-part questions) and Edexcel (which often uses real-world scenarios).' },
      { type: 'ul', items: [
        'OCR questions frequently ask you to "show that" or "prove that" — requiring written reasoning',
        'Alternative valid methods are explicitly credited in OCR mark schemes',
        'OCR questions can feel more open-ended, requiring you to decide on a method rather than follow a prescribed approach',
        'Scaffolding (part a), b), c) sub-questions) is less common in OCR than AQA',
      ] },
      { type: 'h2', text: 'OCR-specific topics to know' },
      { type: 'p', text: 'OCR covers the same national curriculum content as AQA and Edexcel. However, the weighting of topics across papers can differ. OCR tends to distribute topics more evenly across papers, meaning you cannot rely on Paper 1 being "the algebra paper" — every topic can appear anywhere.' },
      { type: 'h2', text: 'OCR grade boundaries' },
      { type: 'p', text: 'Because OCR uses 500 total marks (vs 240 for AQA/Edexcel), the raw mark boundaries are proportionally higher. However, the percentage thresholds for each grade are broadly similar. In recent years, OCR Foundation grade 4 boundaries have been around 38–45% of total marks, and Higher grade 7 boundaries around 60–68%.' },
      { type: 'h2', text: 'Revision strategy for OCR' },
      { type: 'ul', items: [
        'Practise writing explanations alongside calculations — OCR rewards mathematical communication',
        'Work through OCR-specific past papers (available from the OCR website from 2017 onwards)',
        'Focus on "show that" and proof questions — these appear regularly on OCR Higher',
        'Do not rely on following a method you have memorised — practise thinking through unfamiliar problems',
        'Use OCR mark schemes carefully: look for where "any valid method" is credited',
      ] },
      { type: 'h2', text: 'Preparing for five papers' },
      { type: 'p', text: 'With five papers to prepare for, OCR students need to pace their revision differently from AQA/Edexcel students. The additional papers also mean two non-calculator sittings — significant for students who rely heavily on a calculator. Dedicated non-calculator practice is essential.' },
      { type: 'cta', text: 'Practise with OCR-style questions and timed papers — Foundation and Higher, all five paper styles.', href: '/papers', label: 'Try an OCR paper →' },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug)
}
