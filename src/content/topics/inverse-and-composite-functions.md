---
title: "Inverse & Composite Functions – GCSE Maths"
description: "Learn inverse and composite functions for GCSE Maths Higher tier. Step-by-step methods for f⁻¹(x) and fg(x) with worked examples and practice."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["inverse functions gcse", "composite functions gcse", "fg(x) gcse maths", "f inverse x gcse", "composite and inverse functions higher"]
tier: "Higher only"
strand: "Algebra"
topicNumber: 30
---

Inverse and composite functions are Higher-tier GCSE topics that regularly appear on AQA, Edexcel and OCR papers — typically worth three to five marks. Once you understand the underlying idea, the methods are surprisingly straightforward. An inverse function reverses what the original function does, while a composite function applies two functions one after the other. This guide explains both concepts with clear, step-by-step methods and fully worked examples to get you exam-ready.

## What Are Inverse and Composite Functions?

### Inverse functions

The **inverse function** f⁻¹(x) reverses the effect of f(x). If f takes an input and produces an output, then f⁻¹ takes that output and gives back the original input.

[FORMULA: If f(a) = b, then f⁻¹(b) = a]

For example, if f(x) = 2x + 3, then f(5) = 13. The inverse function should take 13 and return 5.

The graph of f⁻¹(x) is a **reflection of f(x) in the line y = x**.

### Composite functions

A **composite function** applies two functions in succession. The notation fg(x) means "apply g first, then apply f to the result".

[FORMULA: fg(x) = f(g(x))]

**Important:** fg(x) is not the same as gf(x). The order matters.

For example, if f(x) = x + 1 and g(x) = 3x, then:
- fg(x) = f(3x) = 3x + 1
- gf(x) = g(x + 1) = 3(x + 1) = 3x + 3

---

## Step-by-Step Method

### How to find an inverse function

1. **Write** y = f(x), replacing f(x) with y.
2. **Swap** x and y (replace every y with x and every x with y).
3. **Rearrange** to make y the subject.
4. **Write** the answer as f⁻¹(x) = ...

### How to find a composite function

1. **Identify the inner function** — the one applied first. In fg(x), g is applied first.
2. **Substitute** g(x) into f wherever you see x.
3. **Simplify** the resulting expression.

### How to evaluate a composite function at a value

1. **Work from the inside out.** For fg(2), first find g(2), then substitute that result into f.

---

## Worked Example 1 — Inverse Function

**Question:** f(x) = 4x − 7. Find f⁻¹(x).

**Step 1:** Write y = 4x − 7.

**Step 2:** Swap x and y: x = 4y − 7.

**Step 3:** Rearrange for y:

x + 7 = 4y

y = (x + 7) / 4

**Step 4:** f⁻¹(x) = **(x + 7) / 4**

**Check:** f(3) = 4(3) − 7 = 5. f⁻¹(5) = (5 + 7)/4 = 12/4 = 3 ✓

---

## Worked Example 2 — Composite Functions

**Question:** f(x) = x² + 1 and g(x) = 2x − 3. Find: (a) fg(x), (b) gf(x), (c) fg(4).

**(a) fg(x) = f(g(x))**

Replace x in f(x) with g(x) = 2x − 3:

fg(x) = (2x − 3)² + 1

Expand: fg(x) = 4x² − 12x + 9 + 1 = **4x² − 12x + 10**

**(b) gf(x) = g(f(x))**

Replace x in g(x) with f(x) = x² + 1:

gf(x) = 2(x² + 1) − 3 = 2x² + 2 − 3 = **2x² − 1**

**(c) fg(4)**

First find g(4) = 2(4) − 3 = 5.

Then find f(5) = (5)² + 1 = 26.

So fg(4) = **26**.

Check using the expression from (a): 4(16) − 12(4) + 10 = 64 − 48 + 10 = 26 ✓

---

## Common Mistakes

- **Applying functions in the wrong order.** In fg(x), you apply g first, then f. Think of it as f(g(x)) — the innermost function runs first. Many students mistakenly apply f first.
- **Forgetting to swap x and y when finding the inverse.** If you just rearrange for x without swapping, you will get the wrong expression.
- **Not expanding brackets fully in composites.** When you substitute one function into another, expand and simplify completely. (2x − 3)² is 4x² − 12x + 9, not 4x² − 9.
- **Assuming fg(x) = gf(x).** Composite functions are not commutative — the order matters. Always check which function is applied first.
- **Writing f⁻¹(x) as 1/f(x).** The inverse function f⁻¹(x) is not the reciprocal 1/f(x). They are completely different concepts.

---

## Exam Tips

1. **Always verify your inverse.** Substitute a value into f, then put the result into f⁻¹. You should get back to the original value. This is a quick and reliable check.
2. **Show each substitution step.** For composite functions, write out fg(x) = f(g(x)) = f(2x − 3) = ... Examiners award marks for clear method.
3. **On Edexcel papers**, you may be asked to solve fg(x) = k. Find the composite expression first, then set it equal to k and solve.
4. **When finding the inverse of a fraction**, multiply both sides by the denominator early to avoid messy algebra.

---

## Practice Questions

**Question 1:** f(x) = 3x + 2. Find f⁻¹(x) and verify that f⁻¹(f(7)) = 7.

[ANSWER: y = 3x + 2. Swap: x = 3y + 2. Rearrange: y = (x − 2)/3. So f⁻¹(x) = (x − 2)/3. Check: f(7) = 23. f⁻¹(23) = (23 − 2)/3 = 21/3 = 7 ✓]

**Question 2:** f(x) = x + 4 and g(x) = x². Find fg(3) and gf(3).

[ANSWER: fg(3): g(3) = 9, f(9) = 13. So fg(3) = 13. gf(3): f(3) = 7, g(7) = 49. So gf(3) = 49.]

**Question 3:** f(x) = (2x + 1)/5. Find f⁻¹(x).

[ANSWER: y = (2x + 1)/5. Swap: x = (2y + 1)/5. Multiply by 5: 5x = 2y + 1. Rearrange: 2y = 5x − 1, y = (5x − 1)/2. So f⁻¹(x) = (5x − 1)/2.]

---

Practise inverse and composite functions with instant AI feedback on [GCSEMathsAI](https://www.gcsemathsai.co.uk/auth). Our platform generates unlimited Higher-tier questions with full worked solutions.

---

## Related Topics

- [Functions and Function Notation](/topics/functions-and-function-notation)
- [Graph Transformations](/topics/graph-transformations)
- [Solving Quadratic Equations](/topics/solving-quadratic-equations)
- [Algebraic Proof](/topics/algebraic-proof)

---

## Summary

- The **inverse function** f⁻¹(x) reverses f(x). To find it: write y = f(x), swap x and y, then rearrange for y.
- A **composite function** fg(x) means f(g(x)) — apply g first, then f.
- fg(x) and gf(x) are **not the same** — the order matters.
- The graph of f⁻¹(x) is a reflection of f(x) in the line y = x.
- Always verify your inverse by checking that f⁻¹(f(a)) = a.
- Show clear substitution steps to earn method marks in the exam.
- f⁻¹(x) is not the same as 1/f(x) — do not confuse the inverse with the reciprocal.
