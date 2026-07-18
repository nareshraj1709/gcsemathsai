---
title: "Completing the Square GCSE Maths: Full Method with Worked Examples"
description: "Learn how to complete the square for GCSE Maths — full step-by-step method, finding the minimum point, and solving quadratics for AQA, Edexcel and OCR."
date: "18 July 2026"
dateISO: "2026-07-18"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 9
keywords: ["completing the square gcse maths", "how to complete the square gcse", "completing the square method", "completing the square to find minimum", "gcse maths quadratics"]
---

Completing the square is one of the most versatile techniques in GCSE Maths. It appears on all three main exam boards — AQA (8300), Edexcel (1MA1), and OCR (J560) — and it's almost exclusively a Higher tier topic. You'll typically see it on Paper 2 or Paper 3, either as a standalone quadratics question or as part of a coordinate geometry question asking for the vertex or minimum of a curve. It can earn you 4–6 marks in a single question, so it's well worth mastering.

## What You Need to Know First

Completing the square builds on several earlier topics. Before you start, make sure you're solid on:

- Expanding double brackets, especially (x + a)²
- Collecting like terms
- Solving equations by taking square roots (including ±)
- The fact that (x + a)² = x² + 2ax + a²
- Basic knowledge of quadratic graphs — what a minimum or maximum looks like

If you need a refresher on expanding (x + a)², work through a few examples before reading on.

## The Core Method: Completing the Square

Every quadratic in the form x² + bx + c can be rewritten in the form (x + p)² + q. This is called **completed square form**. Here's how you get there.

**The method:**

1. Write (x + half the coefficient of x)²
2. Expand that bracket and compare it to the original expression
3. Adjust by adding or subtracting a constant to make them equal

Let's go step by step with numbers.

**Worked Example 1 — Complete the square for x² + 6x + 2**

Step 1: Take half the coefficient of x. The coefficient of x is 6, so half of that is **3**.
Write: (x + 3)²

Step 2: Expand (x + 3)² = x² + 6x + 9.
Our original expression is x² + 6x + 2.
The difference is: 9 − 2 = 7. We have 7 too many.

Step 3: Subtract 7 to compensate.
(x + 3)² − 7

**Check:** (x + 3)² − 7 = x² + 6x + 9 − 7 = x² + 6x + 2 ✓

So x² + 6x + 2 = **(x + 3)² − 7**

**Worked Example 2 — Complete the square for x² − 10x + 3**

Step 1: Half of −10 is **−5**.
Write: (x − 5)²

Step 2: Expand (x − 5)² = x² − 10x + 25.
Our expression has + 3 at the end. We have 25 − 3 = 22 too many.

Step 3: Subtract 22.
(x − 5)² − 22

**Check:** x² − 10x + 25 − 22 = x² − 10x + 3 ✓

So x² − 10x + 3 = **(x − 5)² − 22**

The shortcut formula, once you're comfortable: for x² + bx + c, the answer is always (x + b/2)² − (b/2)² + c. But understanding why it works — through the steps above — is what lets you adapt when the question changes slightly.

## Finding the Minimum Point and Solving Quadratics

Once you have the completed square form, you can immediately read off two things: the **minimum point** of the curve, and you can **solve the equation** by rearranging.

**Reading off the minimum point**

The expression (x + p)² + q reaches its minimum when the bracket equals zero — since (x + p)² is always ≥ 0, adding q gives a minimum value of q. This happens when x = −p.

So for y = (x + 3)² − 7, the minimum point is **(−3, −7)**.
For y = (x − 5)² − 22, the minimum point is **(5, −22)**.

Notice the sign flip: if the bracket is (x + 3), the x-coordinate of the minimum is x = −3.

**Worked Example 3 — Solve x² + 6x + 2 = 0, giving answers in surd form**

We already know x² + 6x + 2 = (x + 3)² − 7.

Set equal to zero:
(x + 3)² − 7 = 0
(x + 3)² = 7
x + 3 = ±√7
x = −3 ± √7

So x = −3 + √7 or x = −3 − √7.

These are exact surd answers — exactly what the mark scheme wants when a question says "leave your answer in surd form."

**What about when the coefficient of x² isn't 1?**

If the quadratic is 2x² + 8x + 3, you first factorise out the coefficient of x²:
2(x² + 4x) + 3

Now complete the square on the bracket:
x² + 4x → (x + 2)² − 4

So: 2[(x + 2)² − 4] + 3 = 2(x + 2)² − 8 + 3 = **2(x + 2)² − 5**

This version appears more often on AQA and Edexcel Higher papers in recent years, so make sure you're comfortable with it.

**Worked Example 4 — Complete the square for 3x² − 12x + 7**

Step 1: Factorise the 3 from the x terms.
3(x² − 4x) + 7

Step 2: Complete the square inside the bracket.
Half of −4 is −2. (x − 2)² = x² − 4x + 4, so x² − 4x = (x − 2)² − 4.
Replace: 3[(x − 2)² − 4] + 7

Step 3: Expand the outer bracket.
3(x − 2)² − 12 + 7 = **3(x − 2)² − 5**

Minimum point: x = 2, y = −5, so minimum is **(2, −5)**.

## Common Mistakes Students Make

- **Getting the sign wrong on p.** From (x + 3)² − 7, students often write the minimum as (3, −7) instead of (−3, −7). The x-coordinate of the minimum is −p, not p. Say it out loud: "the bracket is zero when x is the opposite of what's in the bracket."
- **Forgetting the ± when taking square roots.** When solving (x + 3)² = 7, writing x + 3 = √7 gives only one solution. Every quadratic equation has two roots (unless it's a perfect square). Always write ±.
- **Errors with fractions when b is odd.** If the coefficient of x is 5, then b/2 = 5/2 = 2.5 and (b/2)² = 6.25. Students often round or get muddled. Write fractions explicitly: (5/2)² = 25/4.
- **Not adjusting after factorising the leading coefficient.** In 2(x² + 4x) + 3, after completing the square inside to get 2[(x+2)² − 4] + 3, students forget to multiply the −4 by 2, writing 2(x+2)² − 4 + 3 instead of 2(x+2)² − 8 + 3.
- **Confusing minimum with maximum.** If the coefficient of x² is negative (e.g. −x² + …), the parabola opens downward and has a **maximum**, not a minimum. The vertex is still read off in the same way, but describe it correctly.

## Exam Tips for Completing the Square

- **The method mark comes from the structure.** AQA and Edexcel mark schemes typically award an M1 for writing (x ± p)² even if p is wrong, as long as the method is clearly shown. Never skip the intermediate lines.
- **Write out your check.** Expand your completed square form back to x² + bx + c as a separate line labelled "check." Examiners love it, and it costs you nothing if correct — but catches errors before they cost you marks.
- **For "minimum point" questions, write coordinates clearly.** Don't just write "x = −3, y = −7" — write it as a coordinate pair (−3, −7) or state "the minimum point is (−3, −7)" explicitly.
- **Surd solutions from completing the square are exact.** If the question says "give exact answers" or "leave in surd form," completing the square is the right method — the quadratic formula will work too, but completing the square with neat numbers produces cleaner answers.
- **Watch for combined topics.** Completing the square often appears in questions about quadratic graphs — finding the turning point, the axis of symmetry (x = −p), or the y-intercept. Read the whole question before choosing your method.

## Practise Now

The best way to get confident with completing the square is to practise exam-style questions with instant feedback. Try completing the square questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
