---
title: "Iteration Method – GCSE Maths Revision Guide"
description: "Master the iteration method for GCSE Maths Higher tier. Learn to apply iterative formulas, show rearrangements, and find solutions to given decimal places."
date: "23 May 2026"
dateISO: "2026-05-23"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 7
keywords: ["iteration method gcse", "iterative formula gcse maths", "xn+1 formula gcse", "solving equations by iteration", "iteration higher tier"]
tier: "Higher only"
strand: "Algebra"
topicNumber: 95
---

The iteration method is a Higher-tier technique for finding approximate solutions to equations that cannot be solved algebraically. By applying a formula repeatedly, each answer gets closer to the true solution. This guide focuses on applying the iterative formula, demonstrating rearrangements, and determining solutions to a given number of decimal places.

## What Is the Iteration Method?

Iteration means "repeated application". You start with an initial estimate x₀ and feed it into a formula to produce x₁, then feed x₁ back in to get x₂, and so on. Each value is a better approximation of the solution.

### Key Formulas

[FORMULA: xₙ₊₁ = f(xₙ) — the iterative formula]

[FORMULA: The solution is found when consecutive iterations agree to the required decimal places]

The iterative formula comes from rearranging the original equation into the form x = f(x). For example, x³ − 5x − 3 = 0 can be rearranged to x = ∛(5x + 3), giving the iterative formula xₙ₊₁ = ∛(5xₙ + 3).

## Step-by-Step Method

1. **Write down** the iterative formula and the starting value x₀.
2. **Substitute** x₀ into the formula to calculate x₁. Write the full calculator display.
3. **Substitute** x₁ to find x₂. Use the unrounded value from the previous step.
4. **Repeat** until the question is answered — either a set number of iterations or until values agree to the required decimal places.
5. **Never round** intermediate values. Only round your final answer.
6. **State** the solution clearly, to the accuracy requested.

## Worked Example 1 — Foundation Level

**Question:** Use the iterative formula xₙ₊₁ = (xₙ² + 3) / 5 with x₀ = 1 to find x₁, x₂ and x₃ to 4 decimal places.

**Working:**

x₁ = (1² + 3) / 5 = 4/5 = 0.8000

x₂ = (0.8² + 3) / 5 = (0.64 + 3) / 5 = 3.64/5 = 0.7280

x₃ = (0.728² + 3) / 5 = (0.529984 + 3) / 5 = 3.529984/5 = 0.7060

**Answer:** x₁ = 0.8000, x₂ = 0.7280, x₃ = 0.7060

## Worked Example 2 — Higher Level

**Question:** Show that x³ + 2x − 9 = 0 can be rearranged to x = (9 − x³) / 2. Using x₀ = 1.5, find the solution correct to 1 decimal place.

**Working:**

Rearrangement: x³ + 2x = 9 → 2x = 9 − x³ → x = (9 − x³) / 2 ✓

x₁ = (9 − 1.5³) / 2 = (9 − 3.375) / 2 = 5.625 / 2 = 2.8125

x₂ = (9 − 2.8125³) / 2 = (9 − 22.24121...) / 2 = −13.24121... / 2 = −6.620605...

This diverges. The rearrangement x = ∛(9 − 2x) is more stable.

Using xₙ₊₁ = ∛(9 − 2xₙ) with x₀ = 1.5:

x₁ = ∛(9 − 3) = ∛6 = 1.817120...

x₂ = ∛(9 − 3.634241...) = ∛(5.365759...) = 1.750690...

x₃ = ∛(9 − 3.501380...) = ∛(5.498620...) = 1.765030...

x₄ = ∛(9 − 3.530061...) = ∛(5.469939...) = 1.761955...

x₅ = ∛(9 − 3.523910...) = ∛(5.476090...) = 1.762616...

x₄ and x₅ both round to 1.8 (to 1 d.p.).

**Answer:** x = 1.8 (to 1 d.p.)

## Worked Example 3 — Exam Style

**Question:** The equation x³ − 4x − 1 = 0 has a solution near x = 2. Use the iterative formula xₙ₊₁ = ∛(4xₙ + 1) with x₀ = 2 to find this solution correct to 2 decimal places.

**Working:**

x₁ = ∛(4(2) + 1) = ∛9 = 2.080084...

x₂ = ∛(4(2.080084...) + 1) = ∛(9.320336...) = 2.104585...

x₃ = ∛(4(2.104585...) + 1) = ∛(9.418340...) = 2.112060...

x₄ = ∛(4(2.112060...) + 1) = ∛(9.448241...) = 2.114346...

x₅ = ∛(4(2.114346...) + 1) = ∛(9.457384...) = 2.115046...

x₄ and x₅ both round to 2.11 (to 2 d.p.).

**Answer:** x = 2.11 (to 2 d.p.)

## Common Mistakes

- **Rounding intermediate values.** Using a rounded value in the next step compounds errors. Always use the full unrounded calculator display and only round the final answer.
- **Not showing enough iterations.** You must continue until two consecutive values agree to the required number of decimal places. Stopping early loses accuracy marks.
- **Substituting incorrectly into cube roots.** Be careful with brackets on your calculator. ∛(4x + 1) is different from ∛4 × x + 1.

## Exam Tips

- Use the ANS button on your calculator: type the formula once using ANS in place of xₙ, then press = repeatedly to generate successive values.
- Write every iteration value to at least 6 decimal places to demonstrate you are not rounding early.
- If asked to show a rearrangement leads to the iterative formula, start from the original equation and work algebraically — do not work backwards.

## Practice Questions

**Q1 (Higher):** Use xₙ₊₁ = ∛(2xₙ + 7) with x₀ = 2 to find x₁, x₂ and x₃ to 4 decimal places.

[ANSWER: x₁ = ∛(4 + 7) = ∛11 = 2.2239. x₂ = ∛(4.4479 + 7) = ∛11.4479 = 2.2530. x₃ = ∛(4.5060 + 7) = ∛11.5060 = 2.2568.]

**Q2 (Higher):** Show that x³ − 6x + 2 = 0 can be rearranged to x = (x³ + 2) / 6.

[ANSWER: Start with x³ − 6x + 2 = 0. Add 6x to both sides: x³ + 2 = 6x. Divide by 6: x = (x³ + 2)/6. ✓]

**Q3 (Higher):** Use xₙ₊₁ = ∛(6xₙ − 2) with x₀ = 2 to find the solution of x³ − 6x + 2 = 0 correct to 2 decimal places.

[ANSWER: x₁ = ∛(12 − 2) = ∛10 = 2.154435. x₂ = ∛(12.926609 − 2) = ∛10.926609 = 2.219708. x₃ = ∛(13.318247 − 2) = ∛11.318247 = 2.247126. x₄ = ∛(13.482758 − 2) = ∛11.482758 = 2.257977. x₅ = ∛(13.547862 − 2) = ∛11.547862 = 2.262249. x₆ = ∛(13.573494 − 2) = ∛11.573494 = 2.263932. x₅ and x₆ both round to 2.26. Solution: x = 2.26 (to 2 d.p.).]

---

Practise iteration method questions with instant AI feedback — completely free on GCSEMathsAI.

## Related Topics

- [Iteration](/topics/iteration)
- [Solving Quadratic Equations — Quadratic Formula](/topics/solving-quadratic-equations-quadratic-formula)
- [Functions and Function Notation](/topics/functions-and-function-notation)

## Summary

- Iteration finds approximate solutions by repeatedly applying a formula xₙ₊₁ = f(xₙ).
- Start with x₀ and substitute to generate x₁, x₂, x₃, and so on.
- The iterative formula comes from rearranging the equation into the form x = f(x).
- Never round intermediate values — only round the final answer.
- The solution is confirmed when two consecutive iterations agree to the required number of decimal places.
