---
title: "Iteration GCSE Maths: How to Use Iterative Formulas Step by Step"
description: "Master iteration GCSE maths with step-by-step worked examples — learn how to apply iterative formulas to find solutions accurate to a given number of decimal places."
date: "25 July 2026"
dateISO: "2026-07-25"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["iteration gcse maths", "iterative formula gcse", "how to use iteration gcse", "gcse maths iteration higher", "numerical methods gcse maths"]
---

Iteration might sound intimidating, but the method itself is surprisingly mechanical once you understand what you're doing. It shows up on Higher tier GCSE papers across AQA (8300), Edexcel (1MA1), and OCR (J560) — usually worth 3–5 marks and often appearing in the latter half of Paper 2 or Paper 3 (the calculator papers). If you can follow a simple set of steps, you can pick up every one of those marks.

## What You Need to Know First

Before you dive into iteration questions, make sure you're comfortable with the following:

- Substituting values into expressions and evaluating them with a calculator
- Rounding to a given number of decimal places or significant figures
- The idea that some equations cannot be solved algebraically — iteration gives us a way to find approximate solutions
- Understanding what a **root** of an equation means (where a graph crosses the x-axis, i.e. where f(x) = 0)
- Reading carefully — iteration questions always give you the formula and a starting value

## Using an Iterative Formula

An **iterative formula** is a rule that generates a sequence of values. Each new value is calculated by substituting the previous value into the formula. With the right starting point, these values get closer and closer to the actual solution — this is called **convergence**.

The general form looks like this: x_{n+1} = f(x_n)

You're given x₁ (the starting value) and asked to find x₂, x₃, x₄, and so on, until consecutive values agree to the required number of decimal places.

**Step-by-step method:**

1. Write down the iterative formula clearly.
2. Substitute x₁ into the right-hand side and calculate x₂.
3. Substitute x₂ into the right-hand side and calculate x₃.
4. Continue until two consecutive values round to the same number at the required accuracy.
5. State your answer, rounded correctly.

**Worked Example 1**

The equation x³ + 3x − 7 = 0 has a root near x = 1.

Use the iterative formula xₙ₊₁ = (7 − 3xₙ) / xₙ² with x₁ = 1.3 to find the root correct to 2 decimal places.

**x₁ = 1.3**

x₂ = (7 − 3 × 1.3) / (1.3)²
x₂ = (7 − 3.9) / 1.69
x₂ = 3.1 / 1.69
x₂ = 1.834319...
x₂ ≈ 1.8343

x₃ = (7 − 3 × 1.8343) / (1.8343)²
x₃ = (7 − 5.5029) / 3.3647
x₃ = 1.4971 / 3.3647
x₃ = 0.4449...
x₃ ≈ 0.4449

Hmm — that jumped a lot. Let's keep going.

x₄ = (7 − 3 × 0.4449) / (0.4449)²
x₄ = (7 − 1.3347) / 0.1979
x₄ = 5.6653 / 0.1979
x₄ = 28.627...

This sequence is diverging — the values are moving away from the solution rather than towards it. In an exam, this means you've been given a formula that doesn't converge from that starting point, or the starting value is not close enough. Examiners won't set a question where this happens; they'll always give you a formula that converges nicely.

Let's use a well-behaved example instead.

**Worked Example 2**

Use the iterative formula xₙ₊₁ = ∛(7 − 3xₙ) with x₁ = 1 to find the root of x³ + 3x − 7 = 0 correct to 3 decimal places.

**x₁ = 1**

x₂ = ∛(7 − 3 × 1) = ∛(7 − 3) = ∛4 = 1.5874...
x₂ ≈ 1.5874

x₃ = ∛(7 − 3 × 1.5874) = ∛(7 − 4.7622) = ∛2.2378 = 1.3072...
x₃ ≈ 1.3072

x₄ = ∛(7 − 3 × 1.3072) = ∛(7 − 3.9216) = ∛3.0784 = 1.4536...
x₄ ≈ 1.4536

x₅ = ∛(7 − 3 × 1.4536) = ∛(7 − 4.3608) = ∛2.6392 = 1.3817...
x₅ ≈ 1.3817

x₆ = ∛(7 − 3 × 1.3817) = ∛(7 − 4.1451) = ∛2.8549 = 1.4170...
x₆ ≈ 1.4170

x₇ = ∛(7 − 3 × 1.4170) = ∛(7 − 4.2510) = ∛2.7490 = 1.4002...
x₇ ≈ 1.4002

x₈ = ∛(7 − 3 × 1.4002) = ∛(7 − 4.2006) = ∛2.7994 = 1.4066...
x₈ ≈ 1.4066

x₉ = ∛(7 − 3 × 1.4066) = ∛(7 − 4.2198) = ∛2.7802 = 1.4042...
x₉ ≈ 1.4042

x₁₀ = ∛(7 − 3 × 1.4042) = ∛(7 − 4.2126) = ∛2.7874 = 1.4051...
x₁₀ ≈ 1.4051

x₉ and x₁₀ both round to **1.405** to 3 decimal places.

**The root is x ≈ 1.405**

## Showing a Root Lies in an Interval

Some iteration questions first ask you to show that a root exists between two values — for example, between x = 1 and x = 2. This uses **change of sign**.

The method: substitute both values into the original equation f(x). If one result is positive and the other is negative, there must be a root between them (because the curve must cross zero to get from one side to the other).

**Worked Example 3**

Show that x³ + 3x − 7 = 0 has a root between x = 1 and x = 2.

Let f(x) = x³ + 3x − 7

f(1) = 1 + 3 − 7 = **−3** (negative)

f(2) = 8 + 6 − 7 = **7** (positive)

There is a change of sign between x = 1 and x = 2, so there is a root in the interval (1, 2). ✓

This is often the first part (a) of an iteration question — don't skip it, it's usually worth 1–2 easy marks.

## Common Mistakes Students Make

- **Not keeping enough decimal places during working.** If you round x₂ too aggressively before substituting it to get x₃, your final answer will drift. Use the full value shown on your calculator at each step, and only round your final answer.
- **Stopping too early.** Two consecutive values might round to the same 1 d.p. value but differ at 2 d.p. Always check that both values round to the same figure at the *required* accuracy before stopping.
- **Confusing xₙ and xₙ₊₁.** The formula tells you what goes on the right-hand side (always xₙ) and what comes out on the left (always xₙ₊₁). Students sometimes substitute their new value back in when they've already used it.
- **Forgetting to show the change-of-sign clearly.** In part (a) of these questions, you must evaluate f(x) at both endpoints and explicitly state that there's a change of sign. Saying "one is positive and one is negative" without the calculation earns no marks.
- **Using a starting value that's too far from the root.** The iterative formula given in the question will always converge from the suggested starting value. Use the one they give you, not one you choose yourself.

## Exam Tips for Iteration

- **Always write down at least 4 decimal places for each iteration.** Many mark schemes award method marks for seeing correct iterative steps, even if your final answer slips. Showing working protects your marks.
- **Use your calculator's ANS button.** Once you've worked out x₂, press the formula again using ANS in place of xₙ. This speeds up the process enormously and reduces copying errors.
- **Check your answer makes sense.** If you've been told the root is near x = 1.4 and your final answer is 7.3, something has gone wrong. The answer should be in the same region as the starting value.
- **The question will tell you when to stop.** "Find the root correct to 2 decimal places" means stop when two consecutive values round to the same 2 d.p. value — you don't need to go further.
- **AQA and Edexcel often award the final accuracy mark only if you show at least two consecutive values that agree.** Don't just state the answer — show the values that converge to it.

## Practise Now

The best way to get confident with iteration is to practise exam-style questions with instant feedback. Try iteration questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
