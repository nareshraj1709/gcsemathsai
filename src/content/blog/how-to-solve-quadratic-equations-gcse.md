---
title: "How to Solve Quadratic Equations — GCSE Guide with Examples"
description: "A clear GCSE guide to solving quadratic equations by factorising, using the quadratic formula and completing the square. Includes step-by-step worked examples."
date: "13 March 2026"
dateISO: "2026-03-13"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 10
keywords: ["solve quadratic equations GCSE", "factorising quadratics", "quadratic formula GCSE", "completing the square GCSE", "quadratic equations examples"]
---

Quadratic equations are one of the most important topics in GCSE Maths — they appear in almost every Higher tier paper and are worth a significant number of marks. This guide covers all three methods you need to know: factorising, the quadratic formula, and completing the square.

## What Is a Quadratic Equation?

A quadratic equation is any equation that can be written in the form:

**ax² + bx + c = 0**

where a ≠ 0. The highest power of x is 2. Examples include:

- x² + 5x + 6 = 0
- 2x² − 3x − 2 = 0
- x² − 4 = 0
- x² + 6x + 9 = 0

A quadratic equation can have two solutions (roots), one repeated solution, or no real solutions — depending on the values of a, b and c.

## Method 1 — Solving by Factorising

Factorising is the quickest method when it works. It works cleanly when the solutions are integers or simple fractions.

**How it works:** You rewrite the quadratic as a product of two brackets, then use the fact that if two things multiply to zero, one of them must be zero.

### Worked Example 1

**Solve x² + 5x + 6 = 0**

**Step 1:** Find two numbers that multiply to +6 and add to +5.
Those numbers are 2 and 3 (2 × 3 = 6, 2 + 3 = 5).

**Step 2:** Factorise: (x + 2)(x + 3) = 0

**Step 3:** Set each bracket equal to zero:
- x + 2 = 0 → **x = −2**
- x + 3 = 0 → **x = −3**

**Answer: x = −2 or x = −3**

### Worked Example 2

**Solve 2x² + 7x − 4 = 0**

When the coefficient of x² is not 1, use the AC method.

**Step 1:** Multiply a × c: 2 × (−4) = −8

**Step 2:** Find two numbers that multiply to −8 and add to +7.
Those numbers are 8 and −1.

**Step 3:** Split the middle term: 2x² + 8x − x − 4 = 0

**Step 4:** Group and factorise:
2x(x + 4) − 1(x + 4) = 0
(2x − 1)(x + 4) = 0

**Step 5:** Solve:
- 2x − 1 = 0 → **x = ½**
- x + 4 = 0 → **x = −4**

**Answer: x = ½ or x = −4**

**When to use this method:** Try factorising first whenever the numbers look "nice". If you cannot find the factor pair quickly (within about 30 seconds), switch to the quadratic formula.

## Method 2 — The Quadratic Formula

The quadratic formula always works, regardless of whether the equation factorises neatly. You must memorise it for the exam — it is not given on the formula sheet.

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

In plain text: **x = (−b ± √(b² − 4ac)) ÷ 2a**

### Worked Example 3

**Solve 2x² − 4x − 3 = 0 (give answers to 2 decimal places)**

Here a = 2, b = −4, c = −3.

**Step 1:** Calculate the discriminant: b² − 4ac = (−4)² − 4(2)(−3) = 16 + 24 = 40

**Step 2:** Apply the formula:
x = (4 ± √40) / 4

**Step 3:** Calculate both values:
- x = (4 + 6.324...) / 4 = 10.324 / 4 = **2.58** (to 2 d.p.)
- x = (4 − 6.324...) / 4 = −2.324 / 4 = **−0.58** (to 2 d.p.)

**Answer: x = 2.58 or x = −0.58**

**Important:** Always calculate the discriminant (b² − 4ac) first as a separate step. This avoids errors and makes your working easier to follow.

**The discriminant tells you:**
- b² − 4ac > 0 → two distinct real solutions
- b² − 4ac = 0 → one repeated solution
- b² − 4ac < 0 → no real solutions (the exam will not ask you to solve these at GCSE)

## Method 3 — Completing the Square

Completing the square is used to:
- Solve quadratic equations when the formula would be long-winded
- Find the minimum (or maximum) point of a quadratic graph
- Write a quadratic in vertex form

The technique transforms ax² + bx + c into the form a(x + p)² + q.

### Worked Example 4

**Solve x² + 6x + 7 = 0 by completing the square**

**Step 1:** Halve the coefficient of x: 6 ÷ 2 = 3

**Step 2:** Write (x + 3)² and expand to check: (x + 3)² = x² + 6x + 9

**Step 3:** Adjust for the difference: x² + 6x + 7 = (x + 3)² − 9 + 7 = (x + 3)² − 2

**Step 4:** Set equal to zero and solve:
(x + 3)² − 2 = 0
(x + 3)² = 2
x + 3 = ±√2
**x = −3 + √2 or x = −3 − √2**

**In decimal form:** x ≈ −1.59 or x ≈ −4.41

**When to use this method:** Completing the square is especially useful when a question asks you to find the turning point of a quadratic graph, or when b is even (making the halving step clean).

## Choosing the Right Method

| Situation | Best method |
|-----------|-------------|
| Numbers factorise neatly | Factorising |
| Decimal or surd answers needed | Quadratic formula |
| Question asks for turning point | Completing the square |
| Not sure — use as a backup | Quadratic formula |

## Common Mistakes to Avoid

**1. Forgetting ± in the formula**
The ± gives you both solutions. Leaving it out means you only get one answer and will lose marks.

**2. Sign errors with b**
If b is negative, remember that −b is positive. For example, if b = −4, then −b = +4.

**3. Not rearranging first**
The quadratic formula only works when the equation is in the form ax² + bx + c = 0. If you have 3x² = 5x + 2, rearrange to 3x² − 5x − 2 = 0 before applying the formula.

**4. Incorrect factorising of 2x² + bx + c**
Always check by expanding your brackets. If expanding does not give the original equation, your factorisation is wrong.

**5. Dividing by x**
Never divide both sides by x to cancel it. This loses one of the solutions (x = 0). Instead, factorise.

## How This Topic Appears in the Exam

At Higher tier, quadratic equations typically appear in the following ways:

- A direct "solve this quadratic equation" question (2–3 marks)
- A problem where you form and solve a quadratic from a word problem or geometry context
- A question asking you to find where two graphs intersect (requires solving a simultaneous equation where one is quadratic)
- A question asking you to find the turning point of a quadratic graph (completing the square)

At Foundation tier, simple factorising of x² + bx + c = 0 (where a = 1) may appear.

---

Practise quadratic equations with instant AI feedback — completely free on GCSEMathsAI.
