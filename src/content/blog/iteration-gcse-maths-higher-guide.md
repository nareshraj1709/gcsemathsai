---
title: "Iteration at GCSE Maths — How to Use Iterative Formulae"
description: "A clear guide to iteration for GCSE Higher tier maths. How to use iterative formulae to find approximate solutions to equations, with worked examples for AQA, Edexcel and OCR."
date: "16 May 2026"
dateISO: "2026-05-16"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["iteration gcse maths", "iterative formula gcse", "iteration higher gcse", "approximate solution iteration", "gcse iteration examples", "iteration revision gcse"]
---

Iteration is one of those GCSE topics that always looks intimidating at first glance, then turns out to be one of the most procedural topics on the Higher paper. You follow the same set of steps every time. Once you have practised three or four iteration questions, the rest of them feel routine.

This guide walks you through the entire technique with the kind of worked examples you will see on AQA, Edexcel and OCR Higher papers.

## What Iteration Is, in One Sentence

Iteration uses a rearranged form of an equation to generate a sequence of values that get closer and closer to the actual solution.

## Why You Would Need Iteration

Some equations have nice solutions you can find with algebra — by factorising, by using the quadratic formula, or by rearranging. Examples: x² + 5x + 6 = 0 factorises cleanly. 2x − 3 = 7 rearranges in one step.

Other equations do not have nice algebraic solutions. Try x³ − 4x + 2 = 0. The quadratic formula does not apply because the equation is cubic, and the answer is not a whole number. You cannot factorise it.

For equations like this, iteration lets you find an **approximate** solution that is accurate to as many decimal places as you need.

## The Iteration Recipe — Same Three Steps Every Time

Every iteration question on a GCSE paper follows the same three steps.

**Step 1: Use the iterative formula you have been given.** The question usually gives you a formula in the form x_(n+1) = (something involving x_n).

**Step 2: Plug in a starting value.** The question gives you x_0 (a starting value). Use it to calculate x_1, then use x_1 to calculate x_2, and so on.

**Step 3: Stop when consecutive values agree to the required accuracy.** If the question asks for 3 decimal places, stop when x_n and x_(n+1) both round to the same value at 3 decimal places.

That is it. Once you have done this three or four times, it becomes mechanical.

## Worked Example 1 — A Standard Iteration Question

The equation x³ − 4x − 2 = 0 has a root between 2 and 3. Using the iterative formula

**x_(n+1) = ³√(4x_n + 2)**

and starting with x_0 = 2, find this root to 3 decimal places.

**Step 1: Substitute x_0 = 2.**

x_1 = ³√(4 × 2 + 2) = ³√10 = 2.15443...

**Step 2: Substitute x_1.**

x_2 = ³√(4 × 2.15443 + 2) = ³√10.61773 = 2.19942...

**Step 3: Substitute x_2.**

x_3 = ³√(4 × 2.19942 + 2) = ³√10.79767 = 2.21181...

**Step 4: Substitute x_3.**

x_4 = ³√(4 × 2.21181 + 2) = ³√10.84724 = 2.21520...

**Step 5: Substitute x_4.**

x_5 = ³√(4 × 2.21520 + 2) = ³√10.86080 = 2.21612...

**Step 6: Substitute x_5.**

x_6 = ³√(4 × 2.21612 + 2) = ³√10.86449 = 2.21637...

**Step 7: Check.** Both x_5 = 2.21612 and x_6 = 2.21637 round to **2.216** at 3 decimal places.

**Answer: x = 2.216 (to 3 d.p.)**

## Worked Example 2 — A Different Form of Iterative Formula

The equation x³ − x − 1 = 0 has a solution near x_0 = 1. Using

**x_(n+1) = ³√(x_n + 1)**

starting with x_0 = 1, find the root to 4 decimal places.

**Working:**

- x_1 = ³√(1 + 1) = ³√2 = 1.25992
- x_2 = ³√(1.25992 + 1) = ³√2.25992 = 1.31229
- x_3 = ³√(1.31229 + 1) = ³√2.31229 = 1.32235
- x_4 = ³√(1.32235 + 1) = ³√2.32235 = 1.32426
- x_5 = ³√(1.32426 + 1) = ³√2.32426 = 1.32463
- x_6 = ³√(1.32463 + 1) = ³√2.32463 = 1.32470
- x_7 = ³√(1.32470 + 1) = ³√2.32470 = 1.32471

Both x_6 and x_7 round to **1.3247** at 4 decimal places.

**Answer: x = 1.3247 (to 4 d.p.)**

## What "Convergence" Means

In every iteration that works, the values get closer and closer to the answer. This is called **convergence**.

Look at the differences in Example 1: 2.154, 2.199, 2.211, 2.215, 2.216, 2.216. The gaps shrink quickly. This is the signature of a converging iteration.

Sometimes an iteration does not converge — the values bounce around or grow without bound. If this happens on a GCSE paper, you have probably:
- Used the wrong starting value
- Made an arithmetic error
- Misread the iterative formula

If you spot the values diverging, **stop, check your formula and your starting value**, and restart. The exam will give you an iterative formula that converges; if yours is not, something has gone wrong.

## How to Show Your Working in the Exam

Examiners want to see your intermediate iterations. Lay your working out clearly:

- x_0 = 2
- x_1 = 2.154
- x_2 = 2.199
- x_3 = 2.212
- x_4 = 2.215
- x_5 = 2.216
- x_6 = 2.216

Then write: "Both x_5 and x_6 round to 2.216, so x = 2.216 to 3 d.p."

Showing every iteration earns the method marks even if your final answer is slightly off. Skipping straight to the answer can cost 2–3 marks on a 4-mark question.

## How Many Iterations Do You Need?

Most GCSE iteration questions converge in 4–6 iterations to 3 decimal places. If you have done 8 iterations and consecutive values still do not agree, double-check your formula and arithmetic.

A good rule of thumb: keep iterating until two consecutive values agree at one more decimal place than the question asks for. So if asked for 3 d.p., keep iterating until consecutive values match at 4 d.p. — that way you know rounding to 3 d.p. is safe.

## Where Iteration Fits in the GCSE Higher Paper

Iteration usually appears as a 4–6 mark question on Paper 2 or Paper 3 (the calculator papers). It is a topic that students who panic at it lose 6 marks on, and students who practise it pick up 6 marks on. Few topics offer such consistent, recoverable marks.

The marks distribution is usually:

- **1–2 marks** for x_1 and x_2 (showing you can substitute correctly)
- **2 marks** for further iterations and showing convergence
- **1 mark** for the final answer to the correct precision
- **1 mark** sometimes for showing why the value satisfies the original equation

## Common Mistakes

**Using the wrong starting value.** Read the question carefully. If it says "starting with x_0 = 2", use 2, not anything else.

**Rounding too early.** Keep at least 5 decimal places in your intermediate values. Rounding to 3 d.p. between each iteration causes the final answer to be wrong.

**Stopping too soon.** If you have only done two iterations, you have not shown convergence. Do at least 4–5.

**Forgetting calculator mode.** Some calculators interpret cube root differently. On a Casio fx-83/85, use the **shift + cube root** key, not x^(1/3) unless you are confident with brackets.

**Skipping the "check" sentence.** "x_5 and x_6 both round to 2.216, so x = 2.216 to 3 d.p." is a sentence the examiner is looking for. Write it.

## Iteration on the Three Boards

**AQA:** Iteration appears regularly on Higher Paper 3. Questions are usually contextless and follow the standard recipe.

**Edexcel:** Iteration appears every 2–3 years on Higher Paper 2 or Paper 3. The form is the same as AQA, sometimes with the iterative formula provided in a slightly different layout.

**OCR:** Iteration appears on Higher papers, sometimes presented with the iterative formula derived from a quadratic or cubic equation in the question setup.

All three boards mark iteration the same way. The mark scheme rewards substitution accuracy, intermediate working, and a clear final answer to the required precision.

## What to Practise Next

Once iteration is solid, the next topic that combines well with it is **solving equations approximately by trial and improvement** — a Foundation-level technique that builds intuition for what iteration is doing geometrically. Then move on to **algebraic proof** for the kind of multi-step reasoning that closes out most Higher papers.

For drills on iteration with instant feedback, [practise iteration questions with instant marking](/learn). Free, unlimited, calibrated to AQA, Edexcel and OCR mark schemes.

---

Related guides:
- [How to Solve Quadratic Equations](/blog/how-to-solve-quadratic-equations-gcse)
- [GCSE Maths Formulas You Must Know](/blog/gcse-maths-formulas-you-must-know)
- [Pythagoras' Theorem at GCSE](/blog/pythagoras-theorem-gcse)
