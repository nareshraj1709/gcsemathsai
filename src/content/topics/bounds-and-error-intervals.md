---
title: "Bounds and Error Intervals – GCSE Maths"
description: "Master bounds and error intervals for GCSE Maths Higher tier with clear rules for upper and lower bounds in calculations."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Number"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["bounds GCSE maths", "error intervals", "upper bound", "lower bound", "truncation"]
tier: "Higher only"
strand: "Number"
topicNumber: 7
---

Bounds and error intervals are a Higher tier topic that tests your understanding of accuracy and measurement. When a number has been rounded, the true value could lie anywhere within a range — and exam questions ask you to find that range, then use it in calculations. This topic links closely to rounding, significant figures, and real-world measurement contexts. This page covers how to find upper and lower bounds for rounded and truncated values, how to combine bounds in calculations, and how to determine a suitable degree of accuracy for a final answer. For a full picture of Higher tier content, check our [complete GCSE Maths topics list](/blog/gcse-maths-topics-complete-list).

## What Are Bounds and Error Intervals?

When a measurement or value has been rounded, the **lower bound** is the smallest value that would round up to the given number, and the **upper bound** is the smallest value that would round up to the next number.

For example, a length given as 5.3 cm (rounded to 1 decimal place) has:
- Lower bound = 5.25 cm
- Upper bound = 5.35 cm

The **error interval** is written using inequality notation:

[FORMULA: For a value x rounded to a given degree of accuracy: lower bound ≤ x < upper bound]

Note the strict inequality (<) on the upper bound — the upper bound itself would round up to the next value.

### Truncation vs Rounding

**Truncation** means cutting off digits without rounding. If 7.86 is truncated to 1 decimal place, it becomes 7.8 (not 7.9). The error interval for a truncated value is different:

[FORMULA: For a value x truncated to 1 d.p.: truncated value ≤ x < truncated value + 0.1]

So for 7.8 (truncated to 1 d.p.): 7.8 ≤ x < 7.9.

### Key Formulas for Combining Bounds

[FORMULA: Maximum value of A + B = upper bound of A + upper bound of B]

[FORMULA: Minimum value of A + B = lower bound of A + lower bound of B]

[FORMULA: Maximum value of A − B = upper bound of A − lower bound of B]

[FORMULA: Minimum value of A − B = lower bound of A − upper bound of B]

[FORMULA: Maximum value of A × B = upper bound of A × upper bound of B]

[FORMULA: Minimum value of A × B = lower bound of A × lower bound of B]

[FORMULA: Maximum value of A ÷ B = upper bound of A ÷ lower bound of B]

[FORMULA: Minimum value of A ÷ B = lower bound of A ÷ upper bound of B]

## Step-by-Step Method

### Finding Bounds for a Rounded Value

1. Identify the degree of accuracy (e.g. nearest 10, 1 d.p., 2 s.f.).
2. Find half the rounding unit. For 1 d.p. the unit is 0.1, so half is 0.05.
3. Lower bound = given value − half the unit.
4. Upper bound = given value + half the unit.
5. Write the error interval: lower bound ≤ x < upper bound.

### Using Bounds in Calculations

1. Write down the upper and lower bounds of every value in the calculation.
2. Decide which combination gives the maximum result and which gives the minimum.
3. For division and subtraction, remember the counter-intuitive rule: to maximise A ÷ B, use the upper bound of A and the **lower** bound of B.
4. Calculate both the maximum and minimum results.
5. If asked for a suitable degree of accuracy, round both results and see where they agree.

### Determining a Suitable Degree of Accuracy

1. Calculate the upper and lower bounds of the final answer.
2. Round both to 1 significant figure, then 2, then 3, and so on.
3. The suitable degree of accuracy is the one where both rounded values are the same.

## Worked Example 1 — Higher Level

**Question:** A field is 120 m long, measured to the nearest 10 m. Write down the error interval for the length.

**Working:**

Step 1 — The rounding unit is 10 m. Half of this is 5 m.

Step 2 — Lower bound = 120 − 5 = 115 m.

Step 3 — Upper bound = 120 + 5 = 125 m.

Step 4 — Error interval: 115 ≤ length < 125.

**Answer:** 115 ≤ length < 125

## Worked Example 2 — Higher Level

**Question:** A rectangle has a length of 8.4 cm and a width of 3.7 cm, both measured to 1 decimal place. Calculate the upper and lower bounds of the area. Give the area to a suitable degree of accuracy.

**Working:**

Step 1 — Find the bounds:
- Length: lower = 8.35, upper = 8.45
- Width: lower = 3.65, upper = 3.75

Step 2 — Maximum area = 8.45 × 3.75 = 31.6875 cm²

Step 3 — Minimum area = 8.35 × 3.65 = 30.4775 cm²

Step 4 — Find a suitable degree of accuracy:
- To 1 s.f.: both round to 30 — they agree.
- To 2 s.f.: max rounds to 32, min rounds to 30 — they do NOT agree.

So the area can be given to 1 significant figure.

**Answer:** Upper bound = 31.6875 cm², lower bound = 30.4775 cm². Area = 30 cm² (to a suitable degree of accuracy, 1 s.f.)

## Common Mistakes

- **Using a strict inequality at the lower bound.** For rounding, the lower bound IS included (≤), and the upper bound is NOT included (<). Do not write < on both sides.
- **Confusing rounding and truncation error intervals.** For rounding, the error is ± half the unit. For truncation, the value can only be equal to or larger than the truncated value, up to one full unit above.
- **Using the wrong combination of bounds for division.** To find the maximum of A ÷ B, you need the upper bound of A divided by the **lower** bound of B, not upper ÷ upper.
- **Forgetting to state the suitable degree of accuracy.** If the question asks for it, you must include a justification — show that both bounds round to the same value at that degree of accuracy.
- **Rounding bounds themselves.** Bounds should be exact — do not round 8.35 to 8.4; that defeats the purpose.

## Exam Tips

- **Draw a table of upper and lower bounds** before you start the calculation. This keeps your working organised and reduces errors.
- **Remember the subtraction and division rules by thinking about extremes.** The biggest difference comes from a big number minus a small number. The biggest quotient comes from a big number divided by a small number.
- **This topic frequently combines with speed, density, and pressure questions.** For instance, "distance = 240 km to 2 s.f., time = 3.2 hours to 1 d.p. — find the bounds of the speed." The method is the same; only the context changes. Check our [how to revise guide](/blog/how-to-revise-gcse-maths) for tips on linking topics together.
- **On calculator papers, keep full precision in your working** and only round at the very end.

## Practice Questions

**Q1:** A mass is given as 250 g, rounded to the nearest 10 g. Write the error interval.

[ANSWER: Half of 10 = 5. Lower bound = 245 g. Upper bound = 255 g. Error interval: 245 ≤ mass < 255.]

**Q2:** A number is truncated to 2 decimal places, giving 4.37. Write the error interval.

[ANSWER: For truncation to 2 d.p., the unit is 0.01. Error interval: 4.37 ≤ x < 4.38.]

**Q3:** A car travels a distance of 84 km (to 2 s.f.) in a time of 1.2 hours (to 1 d.p.). Calculate the upper bound of its speed.

[ANSWER: Upper bound of speed = upper bound of distance ÷ lower bound of time = 84.5 ÷ 1.15 = 73.478... = 73.5 km/h (to 3 s.f.).]

---

Get targeted Higher tier practice on bounds and error intervals. [Create your free account](https://www.gcsemathsai.co.uk/auth) and let our AI tutor guide your revision.

## Related Topics

- [Decimals](/topics/decimals)
- [Standard Form](/topics/standard-form)
- [Percentages](/topics/percentages)
- [Indices and Index Laws](/topics/indices-and-index-laws)

## Summary

- Bounds define the range of possible values when a number has been rounded or truncated.
- For rounding: lower bound ≤ x < upper bound, where the error is ± half the rounding unit.
- For truncation: the true value lies between the truncated value and one full unit above it.
- To maximise a quotient or difference, use the upper bound of the first value and the lower bound of the second.
- A suitable degree of accuracy is found by rounding both bounds until they agree.
- Always keep bounds exact — never round them during working.
- This topic commonly appears alongside speed, density, and area calculations.
