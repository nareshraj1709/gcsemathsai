---
title: "Composite Functions – GCSE Maths Revision Guide"
description: "Learn composite functions for GCSE Maths Higher tier. Understand fg(x), gf(x), ff(x) with clear worked examples, common mistakes and exam tips."
date: "23 May 2026"
dateISO: "2026-05-23"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 7
keywords: ["composite functions gcse", "fg(x) gcse maths", "gf(x) composite function", "ff(x) gcse", "composite functions higher tier"]
tier: "Higher only"
strand: "Algebra"
topicNumber: 96
---

Composite functions combine two or more functions by applying them one after the other. They appear regularly on Higher-tier GCSE papers and are worth understanding well because the method is systematic once you grasp the order of operations.

## What Is a Composite Function?

A composite function applies one function to the result of another. The notation fg(x) means "apply g first, then apply f to the result". This is sometimes written as f(g(x)).

The order matters: fg(x) and gf(x) usually give different results.

### Key Formulas

[FORMULA: fg(x) = f(g(x)) — apply g first, then f]

[FORMULA: gf(x) = g(f(x)) — apply f first, then g]

[FORMULA: ff(x) = f(f(x)) — apply f twice]

Think of it as working from the inside out: the function closest to x is applied first.

## Step-by-Step Method

1. **Identify** which function is applied first (the inner function, closest to x).
2. **Write down** the expression for the inner function.
3. **Substitute** that entire expression into the outer function, replacing every x.
4. **Simplify** the result.
5. To **evaluate** at a number (e.g., fg(2)), either substitute 2 into your composite expression or find g(2) first, then apply f to the result.

## Worked Example 1 — Foundation Level

**Question:** f(x) = 3x + 1 and g(x) = x². Find fg(2).

**Working:**

Step 1: fg(2) means apply g first, then f.

Step 2: Find g(2) = 2² = 4.

Step 3: Apply f to the result: f(4) = 3(4) + 1 = 13.

**Answer:** fg(2) = 13

## Worked Example 2 — Higher Level

**Question:** f(x) = 2x − 5 and g(x) = x² + 1. Find expressions for (a) fg(x) and (b) gf(x).

**Working:**

**(a)** fg(x) = f(g(x)) = f(x² + 1)

Replace x in f with (x² + 1): 2(x² + 1) − 5 = 2x² + 2 − 5 = 2x² − 3.

**(b)** gf(x) = g(f(x)) = g(2x − 5)

Replace x in g with (2x − 5): (2x − 5)² + 1 = 4x² − 20x + 25 + 1 = 4x² − 20x + 26.

**Answer:** (a) fg(x) = 2x² − 3, (b) gf(x) = 4x² − 20x + 26

## Worked Example 3 — Exam Style

**Question:** f(x) = 4x − 3 and g(x) = x/2 + 1. (a) Find ff(x). (b) Solve fg(x) = 17.

**Working:**

**(a)** ff(x) = f(f(x)) = f(4x − 3)

Replace x in f with (4x − 3): 4(4x − 3) − 3 = 16x − 12 − 3 = 16x − 15.

**(b)** First find fg(x):

fg(x) = f(g(x)) = f(x/2 + 1) = 4(x/2 + 1) − 3 = 2x + 4 − 3 = 2x + 1.

Set 2x + 1 = 17: 2x = 16, so x = 8.

Check: g(8) = 4 + 1 = 5. f(5) = 20 − 3 = 17 ✓

**Answer:** (a) ff(x) = 16x − 15, (b) x = 8

## Common Mistakes

- **Applying functions in the wrong order.** fg(x) means g first, then f. The function written first (f) is applied second. Always work from the inside out.
- **Forgetting to replace every x.** When substituting g(x) into f(x), every x in the expression for f must be replaced with the entire expression for g(x), not just part of it.
- **Not expanding brackets fully.** When gf(x) involves squaring a linear expression, you must expand (2x − 5)² correctly as 4x² − 20x + 25, not 4x² + 25.

## Exam Tips

- To evaluate fg(2), you can either find the composite expression fg(x) first and substitute 2, or find g(2) and then apply f to that number. Both are valid; the second is often quicker.
- Show intermediate substitution clearly — for example, write "f(g(x)) = f(x² + 1) = 2(x² + 1) − 5" rather than jumping to the answer.
- If asked to solve fg(x) = k, find the composite expression first, then solve the resulting equation.

## Practice Questions

**Q1 (Higher):** f(x) = 5x − 2 and g(x) = x + 4. Find fg(3).

[ANSWER: g(3) = 3 + 4 = 7. f(7) = 5(7) − 2 = 33. fg(3) = 33.]

**Q2 (Higher):** f(x) = x² and g(x) = 2x + 3. Find an expression for gf(x).

[ANSWER: gf(x) = g(f(x)) = g(x²) = 2(x²) + 3 = 2x² + 3.]

**Q3 (Higher):** f(x) = 3x + 1 and g(x) = x − 2. Solve gf(x) = 10.

[ANSWER: gf(x) = g(3x + 1) = (3x + 1) − 2 = 3x − 1. Set 3x − 1 = 10: 3x = 11, x = 11/3.]

---

Practise composite functions questions with instant feedback — completely free on GCSEMathsAI.

## Related Topics

- [Functions and Function Notation](/topics/functions-and-function-notation)
- [Inverse and Composite Functions](/topics/inverse-and-composite-functions)
- [Solving Linear Equations](/topics/solving-linear-equations)

## Summary

- A composite function applies one function to the result of another: fg(x) = f(g(x)).
- Always apply the inner function (closest to x) first, then the outer function.
- fg(x) and gf(x) are generally different — the order matters.
- ff(x) means applying the same function twice: f(f(x)).
- To solve fg(x) = k, find the composite expression first, then solve the equation.
