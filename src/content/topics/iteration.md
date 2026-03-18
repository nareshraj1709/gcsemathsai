---
title: "Iteration GCSE Maths – Step-by-Step Method"
description: "Learn the iteration method for GCSE Maths Higher tier. Solve equations using iterative formulas with worked examples and exam tips."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["iteration gcse maths", "iterative formula gcse", "iteration method gcse", "solving equations by iteration", "trial and improvement gcse higher"]
tier: "Higher only"
strand: "Algebra"
topicNumber: 32
---

Iteration is a Higher-tier topic that appears on AQA, Edexcel and OCR GCSE Maths papers, typically worth three to four marks. It involves using a formula repeatedly to home in on the solution to an equation. Each time you substitute your answer back into the formula, you get a more accurate approximation. The process is mechanical once you understand the setup, and it is a great opportunity to pick up marks with careful calculator work. This guide explains how iteration works, walks through examples, and highlights the common pitfalls.

## What Is Iteration?

Iteration is a method for finding approximate solutions to equations that cannot be solved exactly using algebra. You start with an initial value (called x₀) and substitute it into an **iterative formula** to generate successive approximations x₁, x₂, x₃, and so on.

[FORMULA: xₙ₊₁ = g(xₙ)]

Each new value is found by substituting the previous one into the formula. As you repeat the process, the values converge (settle down) towards the solution.

### How iterative formulas are formed

An iterative formula is created by rearranging an equation into the form x = g(x). For example:

Starting equation: x³ + 2x = 7

Rearrange: x³ = 7 − 2x → x = ∛(7 − 2x)

So the iterative formula is:

[FORMULA: xₙ₊₁ = ∛(7 − 2xₙ)]

### When iteration converges

Iteration converges when successive values get closer and closer together, eventually agreeing to a specified number of decimal places. This stable value is the approximate solution to the original equation.

---

## Step-by-Step Method

1. **Write down the iterative formula** and the starting value x₀.
2. **Substitute x₀** into the formula to find x₁. Write down the full calculator display.
3. **Substitute x₁** into the formula to find x₂. Again, write down the full value.
4. **Repeat** until the required number of iterations is complete, or until values agree to the required number of decimal places.
5. **Round** your final answer only at the end — use the full unrounded value at each step.
6. **State the solution** to the required degree of accuracy.

**Calculator tip:** Use the ANS button on your calculator. Type the formula using ANS in place of xₙ, then press = repeatedly. Each press gives the next iteration.

---

## Worked Example 1 — Using an Iterative Formula

**Question:** Use the iterative formula xₙ₊₁ = ∛(5xₙ + 2) with x₀ = 2 to find x₁, x₂ and x₃. Give x₃ to 3 decimal places.

**Step 1:** x₁ = ∛(5(2) + 2) = ∛12 = 2.289428...

**Step 2:** x₂ = ∛(5(2.289428...) + 2) = ∛(13.44714...) = 2.374577...

**Step 3:** x₃ = ∛(5(2.374577...) + 2) = ∛(13.87289...) = 2.401169...

**x₃ = 2.401** (to 3 d.p.)

Notice how the values are settling down — they are converging towards the solution of x³ = 5x + 2.

---

## Worked Example 2 — Finding a Solution to a Given Accuracy

**Question:** The equation x³ − 3x − 5 = 0 can be rearranged to give x = ∛(3x + 5). Using x₀ = 2, find the solution correct to 2 decimal places.

**Iterations:**

x₁ = ∛(3(2) + 5) = ∛11 = 2.223980...

x₂ = ∛(3(2.223980...) + 5) = ∛(11.67194...) = 2.264784...

x₃ = ∛(3(2.264784...) + 5) = ∛(11.79435...) = 2.277533...

x₄ = ∛(3(2.277533...) + 5) = ∛(11.83260...) = 2.279495...

x₅ = ∛(3(2.279495...) + 5) = ∛(11.83849...) = 2.279876...

x₄ and x₅ both round to **2.28** (to 2 d.p.).

Since two consecutive iterations agree to 2 decimal places, the solution is **x = 2.28** (to 2 d.p.).

---

## Common Mistakes

- **Rounding too early.** Always use the full unrounded value from your calculator for the next iteration. Only round the final answer. Premature rounding introduces errors that compound through each step.
- **Not showing enough iterations.** If the question asks you to find the solution to a given number of decimal places, you must show enough iterations for two consecutive values to agree to that accuracy.
- **Substituting incorrectly into the formula.** Take care with the order of operations. Write out each substitution step clearly and use brackets on your calculator.
- **Confusing xₙ and xₙ₊₁.** xₙ₊₁ is the new value — the output. xₙ is the value you put in.
- **Not verifying the formula.** If asked to show that an equation rearranges to a given iterative formula, you must show clear algebraic steps — not just state the result.

---

## Exam Tips

1. **Use the ANS button** on your calculator for efficiency. Type the formula once using ANS, then press = repeatedly to generate successive iterations. This avoids re-typing and reduces errors.
2. **Write every iteration value to at least 6 decimal places.** This shows the examiner you are not rounding early and earns method marks.
3. **On AQA papers**, you may be asked to "show that x³ − 3x − 5 = 0 can be rearranged to x = ∛(3x + 5)". Start from the equation and rearrange step by step — do not work backwards from the answer.
4. **If the question asks for a solution to n decimal places**, you need two consecutive iterations that agree when rounded to n d.p. State this explicitly in your answer.

---

## Practice Questions

**Question 1:** Use xₙ₊₁ = (xₙ³ + 4) / 7 with x₀ = 1. Find x₁, x₂ and x₃.

[ANSWER: x₁ = (1 + 4)/7 = 5/7 ≈ 0.714286. x₂ = (0.714286³ + 4)/7 = (0.364431 + 4)/7 = 4.364431/7 ≈ 0.623490. x₃ = (0.623490³ + 4)/7 = (0.242535 + 4)/7 = 4.242535/7 ≈ 0.606076.]

**Question 2:** Show that x³ + 5x = 8 can be rearranged to give x = (8 − x³) / 5.

[ANSWER: Start with x³ + 5x = 8. Subtract x³ from both sides: 5x = 8 − x³. Divide both sides by 5: x = (8 − x³)/5. ✓]

**Question 3:** The iterative formula xₙ₊₁ = √(10 − 3xₙ) with x₀ = 2 converges to a solution of x² + 3x = 10. Find this solution correct to 1 decimal place.

[ANSWER: x₁ = √(10 − 6) = √4 = 2. The sequence is already at the solution. x = 2.0 (to 1 d.p.). Check: 4 + 6 = 10 ✓]

---

Master iteration with unlimited practice on [GCSEMathsAI](https://www.gcsemathsai.co.uk/auth). Our AI provides instant step-by-step feedback so you can build confidence before exam day.

---

## Related Topics

- [Solving Quadratic Equations](/topics/solving-quadratic-equations)
- [Rearranging Formulae](/topics/rearranging-formulae)
- [Algebraic Proof](/topics/algebraic-proof)
- [Functions and Function Notation](/topics/functions-and-function-notation)

---

## Summary

- **Iteration** uses a formula xₙ₊₁ = g(xₙ) to find approximate solutions by repeated substitution.
- Start with x₀ and substitute into the formula to find x₁, then x₂, and so on.
- Use the **ANS button** on your calculator for speed and accuracy.
- **Never round** intermediate values — only round the final answer.
- The solution is found when two consecutive iterations **agree to the required number of decimal places**.
- Iterative formulas are formed by rearranging the original equation into the form x = g(x).
- Always show your working clearly, writing each iteration value to at least 6 decimal places.
