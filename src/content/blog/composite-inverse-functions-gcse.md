---
title: "Composite and Inverse Functions GCSE Maths Explained with Examples"
description: "Master composite functions gcse maths and inverse functions with step-by-step methods and worked examples for AQA, Edexcel and OCR."
date: "23 July 2026"
dateISO: "2026-07-23"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["composite functions gcse maths", "inverse functions gcse", "how to find inverse function gcse", "f(g(x)) gcse maths", "function notation gcse"]
---

Functions appear across the higher tier papers, and composite and inverse functions are among the trickiest — but also most rewarding — topics once you understand the logic. All three major boards test this: AQA (8300) typically places it in Paper 2 or 3, Edexcel (1MA1) on any of the three papers, and OCR (J560) usually in Section B of the higher tier. Get this right and you are looking at 3–6 marks that many students leave on the table.

## What You Need to Know First

- A **function** takes an input, applies a rule, and produces an output. We write f(x) to mean "the function f applied to x."
- You need to be confident substituting values into expressions — if f(x) = 3x + 1, then f(4) = 3(4) + 1 = 13.
- You must be able to rearrange equations to change the subject — this is essential for finding inverse functions.
- Know the difference between f(x), f(2), and f(g(x)) before you continue.
- A negative or fractional input is perfectly valid — do not panic when you see f(−3).

## Composite Functions: f(g(x))

A **composite function** means applying one function and then feeding the result straight into another. The notation fg(x) or f(g(x)) means "do g first, then apply f to the answer."

**The golden rule:** work from the inside out. Whatever is in the innermost bracket, evaluate that first.

### Worked Example 1

Let f(x) = 2x + 3 and g(x) = x² − 1.

**Find fg(4).**

**Step 1:** Start with g(4).  
g(4) = 4² − 1 = 16 − 1 = 15

**Step 2:** Now apply f to that result.  
f(15) = 2(15) + 3 = 30 + 3 = **33**

So fg(4) = 33.

**Find gf(4).**

**Step 1:** Start with f(4).  
f(4) = 2(4) + 3 = 8 + 3 = 11

**Step 2:** Apply g to 11.  
g(11) = 11² − 1 = 121 − 1 = **120**

So gf(4) = 120.

Notice that fg(4) ≠ gf(4). Order matters — composite functions are not commutative.

### Writing fg(x) as a Single Expression

Sometimes the question asks you to find fg(x) in terms of x rather than for a specific value.

Let f(x) = 5x − 2 and g(x) = x + 4.

**Find fg(x).**

**Step 1:** Replace every x in f(x) with the expression g(x).  
fg(x) = f(x + 4) = 5(x + 4) − 2

**Step 2:** Expand and simplify.  
= 5x + 20 − 2  
= **5x + 18**

To find gf(x):  
gf(x) = g(5x − 2) = (5x − 2) + 4 = **5x + 2**

Again, different answers — always check which order the question is asking for.

## Inverse Functions: Reversing the Machine

The **inverse function** f⁻¹(x) undoes what f(x) does. If f takes an input x and gives an output y, then f⁻¹ takes y and gives back x.

Think of it like this: f(x) is a machine that converts pounds to dollars. f⁻¹(x) is the same machine run in reverse, converting dollars back to pounds.

### How to Find an Inverse Function

**Step 1:** Write f(x) = y (replace f(x) with y).  
**Step 2:** Swap x and y (write x where y was, and y where x was).  
**Step 3:** Rearrange to make y the subject.  
**Step 4:** Replace y with f⁻¹(x).

### Worked Example 2

Let f(x) = 4x − 7. Find f⁻¹(x).

**Step 1:** Write as y = 4x − 7.

**Step 2:** Swap x and y: x = 4y − 7.

**Step 3:** Rearrange for y:  
x + 7 = 4y  
y = (x + 7) / 4

**Step 4:** Write the answer:  
**f⁻¹(x) = (x + 7) / 4**

**Check your answer:** f(3) = 4(3) − 7 = 5. Then f⁻¹(5) = (5 + 7) / 4 = 12 / 4 = 3. ✓ It gives back the original input.

### Worked Example 3 — Harder Case

Let g(x) = (2x + 1) / (x − 3). Find g⁻¹(x).

**Step 1:** y = (2x + 1) / (x − 3).

**Step 2:** Swap: x = (2y + 1) / (y − 3).

**Step 3:** Multiply both sides by (y − 3):  
x(y − 3) = 2y + 1  
xy − 3x = 2y + 1

Collect all y terms on one side:  
xy − 2y = 3x + 1  
y(x − 2) = 3x + 1

Divide both sides by (x − 2):  
y = (3x + 1) / (x − 2)

**Step 4:** g⁻¹(x) = **(3x + 1) / (x − 2)**

This type appears at the top end of higher tier papers and can be worth 3–4 marks on its own.

## Common Mistakes Students Make

- **Doing composite functions in the wrong order.** fg(x) means do g first — students often apply f first. Always read right to left for the order of operations.
- **Forgetting to substitute the whole expression.** If f(x) = x² and g(x) = x + 1, then fg(x) = f(x + 1) = **(x + 1)²**, not x² + 1. You must square the whole bracket.
- **Confusing f⁻¹(x) with 1/f(x).** The ⁻¹ notation here means the inverse function, not a reciprocal. f⁻¹(x) ≠ 1/f(x).
- **Forgetting to swap x and y.** This is the step students most often skip. If you do not swap, you end up rearranging the original function and get f(x) back.
- **Not checking the answer.** You can always verify an inverse by checking that f(f⁻¹(a)) = a for a simple value. One extra line of working that earns you confidence.

## Exam Tips for Functions

- **Write down every step.** Even if you get the final answer wrong, method marks (M marks) are available for showing the correct process — especially on the inverse function method.
- **Label which function you are working with.** Write "g(4) = ..." then "f(15) = ..." clearly. Examiners award marks line by line.
- **Check the question says fg or gf** — the order is everything. Mis-reading this is one of the most common single-mark losses on this topic.
- **On Edexcel, leaving an answer unsimplified often loses the accuracy (A) mark.** Always expand and simplify composite function expressions fully.
- **AQA awards the method mark for swapping x and y correctly**, even if the subsequent rearrangement has an arithmetic error. So always show the swap step explicitly.

## Practise Now

The best way to get confident with composite and inverse functions is to practise exam-style questions with instant feedback. Try composite and inverse functions questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
