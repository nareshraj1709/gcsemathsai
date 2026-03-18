---
title: "Growth and Decay – GCSE Maths Higher Guide"
description: "Master exponential growth and decay for GCSE Higher Maths with formulas, worked examples and practice questions for AQA, Edexcel and OCR."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Ratio"
categoryColour: "amber"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["exponential growth GCSE", "exponential decay GCSE", "growth and decay GCSE higher", "exponential functions GCSE", "percentage multiplier"]
tier: "Higher only"
strand: "Ratio"
topicNumber: 43
---

Growth and decay is a Higher-tier topic that extends compound interest and depreciation into a broader mathematical framework. It covers any situation where a quantity increases or decreases by a fixed percentage over equal intervals — from bacteria populations doubling to radioactive substances losing mass. AQA, Edexcel and OCR all include growth and decay questions on their Higher papers, and they can carry significant marks. This guide shows you the general formula, explains how to interpret and use it, works through examples, and gives you practice questions to prepare effectively. If you need to revise the basics of compound change first, start with our compound interest and depreciation topic guide. For a list of all formulas you need, see our [GCSE Maths formulas guide](/blog/gcse-maths-formulas-you-must-know).

## What Is Growth and Decay?

Growth and decay describe situations where a value changes by a **constant percentage** over regular time intervals. The result is **exponential** change — the amount grows or shrinks faster and faster over time.

### The General Formula

$$A = P \times k^n$$

Where:
- **A** is the amount after n time intervals
- **P** is the initial (starting) amount
- **k** is the multiplier per time interval
- **n** is the number of time intervals

### Growth

If the quantity is **growing** by r% per interval:
$$k = 1 + \frac{r}{100}$$

For example, a population growing by 3% per year has k = 1.03.

### Decay

If the quantity is **decaying** (decreasing) by r% per interval:
$$k = 1 - \frac{r}{100}$$

For example, a substance losing 8% of its mass per hour has k = 0.92.

### Recognising Exponential Change

- If k > 1, the quantity is growing.
- If 0 < k < 1, the quantity is decaying.
- If k = 1, nothing is changing.

### Connection to Compound Interest

Compound interest is simply financial growth: P is the principal, r is the interest rate, and n is the number of years. Depreciation is financial decay. Growth and decay generalise this to any context.

---

## Step-by-Step Method

### Using the Formula

1. Identify the initial amount P.
2. Determine the percentage change and calculate the multiplier k.
3. Identify the number of time intervals n.
4. Substitute into A = P × kⁿ and calculate.

### Finding the Multiplier from a Table or Graph

If given data points rather than a percentage:
1. Divide any value by the previous value to find k.
2. Check that k is consistent across the data (it should be for true exponential change).

### Finding the Number of Intervals

If asked "after how many hours/years/cycles does the amount exceed (or fall below) a target":
1. Set up A = P × kⁿ with your target value.
2. Use trial and improvement: calculate A for n = 1, 2, 3, … until you pass the target.
3. State the value of n clearly.

### Interpreting Graphs

Exponential growth produces a curve that gets steeper over time. Exponential decay produces a curve that flattens out, approaching (but never reaching) zero.

---

## Worked Example 1 — Growth

*A colony of bacteria contains 500 organisms. The population increases by 15% every hour. How many bacteria are there after 6 hours?*

**Step 1:** P = 500, r = 15%, so k = 1.15, n = 6.

**Step 2:** A = 500 × 1.15⁶.

**Step 3:** 1.15⁶ = 2.313060… (use a calculator).

**Step 4:** A = 500 × 2.313060… = **1,156.5** (since we cannot have half a bacterium, round to **1,157 bacteria**).

---

## Worked Example 2 — Decay

*A radioactive substance has a mass of 80 g. It loses 5% of its remaining mass every hour. After how many complete hours will the mass first fall below 50 g?*

**Step 1:** P = 80, k = 1 − 0.05 = 0.95, target < 50.

**Step 2:** Calculate year by year:
- n = 1: 80 × 0.95 = 76
- n = 2: 80 × 0.95² = 72.2
- n = 3: 80 × 0.95³ = 68.59
- n = 4: 80 × 0.95⁴ = 65.16
- n = 5: 80 × 0.95⁵ = 61.90
- n = 6: 80 × 0.95⁶ = 58.81
- n = 7: 80 × 0.95⁷ = 55.87
- n = 8: 80 × 0.95⁸ = 53.07
- n = 9: 80 × 0.95⁹ = 50.42
- n = 10: 80 × 0.95¹⁰ = 47.90

**Step 3:** At n = 9 the mass is 50.42 g (still above 50). At n = 10 it is 47.90 g (below 50).

**Answer:** After **10 complete hours**.

---

## Common Mistakes

- **Using the wrong multiplier.** Growth means k > 1; decay means k < 1. If the population is declining by 20%, the multiplier is 0.80, not 1.20.
- **Confusing the number of intervals with the number of values.** If you start at year 0 and end at year 5, that is 5 intervals, not 6.
- **Not answering "complete hours/years" correctly.** If the question says "after how many complete hours", you need the first whole number where the condition is met — not a decimal.
- **Thinking the decay reaches zero.** Exponential decay gets closer and closer to zero but never actually reaches it (in theory). Do not assume the value will hit zero.
- **Rounding too early.** Keep full calculator precision until the final step.

---

## Exam Tips

- **Set out trial and improvement clearly.** Use a table with columns for n and A. Examiners can follow your logic and award method marks even if the final answer is wrong.
- **Recognise the formula in context.** Questions might describe bacteria, population, radioactive decay, the spread of a rumour, or the cooling of a liquid — but they all use A = P × kⁿ.
- **If given a graph**, read off two consecutive values and divide to find k. Then use the formula for predictions.
- **Watch for non-standard intervals.** If the rate is "per hour" but the question asks about minutes, convert appropriately.
- **Link to compound interest.** If you are confident with compound interest, you already know this topic — just apply it beyond money.

---

## Practice Questions

**Question 1**
A population of 2,000 insects grows by 10% per week. How many insects are there after 5 weeks?

[ANSWER: k = 1.10. A = 2,000 × 1.10⁵ = 2,000 × 1.61051 = 3,221 insects (to the nearest whole number).]

**Question 2**
A car is worth £16,000. It depreciates by 18% per year. What is it worth after 3 years?

[ANSWER: k = 0.82. A = £16,000 × 0.82³ = £16,000 × 0.551368 = £8,821.89.]

**Question 3**
The mass of a chemical reduces by 4% every minute. It starts at 200 g. After how many complete minutes does the mass first drop below 120 g?

[ANSWER: k = 0.96. n = 1: 192. n = 2: 184.32. n = 3: 176.95. n = 4: 169.87. n = 5: 163.07. n = 6: 156.55. n = 7: 150.29. n = 8: 144.28. n = 9: 138.51. n = 10: 132.97. n = 11: 127.65. n = 12: 122.54. n = 13: 117.64. Answer: 13 complete minutes.]

**Question 4**
A lake contains 10,000 fish. Due to pollution, the population decreases by 7% per month. At the same time, 200 fish are added each month. Write a formula for the number of fish after n months. (Note: this is a stretch question — the addition makes it non-standard.)

[ANSWER: This cannot be solved by a single exponential formula because of the constant addition. After 1 month: 0.93 × 10,000 + 200 = 9,500. After 2 months: 0.93 × 9,500 + 200 = 9,035. You would continue iteratively. The formula for each step is Fₙ = 0.93 × Fₙ₋₁ + 200.]

---

Ready to practise growth and decay with instant feedback? [Create your free GCSEMathsAI account](https://www.gcsemathsai.co.uk/auth) and start generating Higher-tier questions now.

---

## Related Topics

- Compound Interest and Depreciation — the financial application of growth and decay
- Indices and Powers — understanding powers is essential for this topic
- Sequences — exponential sequences link directly to growth and decay
- Graphs of Exponential Functions — the visual representation of these models

---

## Summary

Growth and decay use the formula **A = P × kⁿ**, where k is the multiplier per interval. For growth, k = 1 + r/100; for decay, k = 1 − r/100. Use trial and improvement when asked "how many intervals" it takes to reach a target. Set your working out in a clear table, keep full calculator precision, and remember that exponential decay approaches zero but never reaches it. This topic generalises compound interest to any real-world context and is a reliable source of marks on Higher papers once the method is secure.
