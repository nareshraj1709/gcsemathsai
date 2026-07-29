---
title: "Bounds and Error Intervals GCSE Maths: Upper, Lower Bounds and Calculations"
description: "Master upper and lower bounds for GCSE Maths — learn how to write error intervals for rounded and truncated values, and use bounds in calculations."
date: "29 July 2026"
dateISO: "2026-07-29"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["bounds gcse maths", "error intervals gcse maths", "upper and lower bounds gcse", "how to find bounds gcse", "truncation gcse maths"]
---

Bounds and error intervals is one of those topics that trips up a surprising number of students — not because it is genuinely hard, but because a small misunderstanding at the start snowballs into lost marks. All three major exam boards test this: **AQA 8300**, **Edexcel 1MA1**, and **OCR J560** include bounds questions, typically on the calculator papers (Paper 2 and Paper 3). On higher tier, you can expect at least one question — sometimes worth 4–5 marks — that asks you to find bounds and use them in a calculation.

## What You Need to Know First

Before diving in, make sure you are comfortable with:

- **Rounding** to a given number of decimal places or significant figures
- The difference between **rounding** and **truncating** — rounding adjusts to the nearest value; truncating simply cuts off digits without adjusting
- **Inequality notation** — you will need to write error intervals using ≤ and <
- Basic substitution — bounds questions in calculations require you to swap values into formulas
- Units of measurement — some questions involve lengths, masses, or speeds rounded to different degrees of accuracy

## Error Intervals: Rounding vs Truncation

An **error interval** shows the range of values a number could have taken before it was rounded or truncated. You write it as:

**lower bound ≤ x < upper bound**

Notice the inequality signs: the lower bound uses ≤ (the actual value could equal the lower bound), and the upper bound uses < (the actual value is always strictly less than the upper bound).

### Finding Error Intervals After Rounding

When a value has been **rounded**, you go half a unit either side of the last given digit.

**Worked Example 1:** A length *l* is measured as 8.4 cm, correct to 1 decimal place. Write the error interval for *l*.

- The last digit is in the tenths column (0.1), so half a unit = 0.05
- Lower bound: 8.4 − 0.05 = **8.35**
- Upper bound: 8.4 + 0.05 = **8.45**
- Error interval: **8.35 ≤ l < 8.45**

**Worked Example 2:** A mass *m* is given as 3,600 g, rounded to the nearest 100 g. Write the error interval for *m*.

- Half of 100 = 50
- Lower bound: 3,600 − 50 = **3,550**
- Upper bound: 3,600 + 50 = **3,650**
- Error interval: **3,550 ≤ m < 3,650**

### Finding Error Intervals After Truncation

**Truncation** chops digits off rather than rounding. This changes the lower bound rule.

When a value has been **truncated**, the number itself becomes the lower bound. The upper bound is one unit above the last digit.

**Worked Example 3:** A number *n* is truncated to 2 decimal places and gives 4.73. Write the error interval for *n*.

- After truncation to 2 d.p., the actual value could be anywhere from 4.73 up to (but not including) 4.74
- Lower bound: **4.73**
- Upper bound: **4.74**
- Error interval: **4.73 ≤ n < 4.74**

This is the key distinction: with rounding, you subtract half a unit from the given value to find the lower bound. With truncation, the given value *is* the lower bound.

## Upper and Lower Bounds in Calculations

Once you can find bounds for individual measurements, the next step is using them in calculations. This is where the higher-mark questions live.

The rules depend on whether you are trying to find the **maximum** or **minimum** possible result:

| To find... | For addition (+) | For subtraction (−) | For multiplication (×) | For division (÷) |
|---|---|---|---|---|
| **Maximum result** | Upper + Upper | Upper − Lower | Upper × Upper | Upper ÷ Lower |
| **Minimum result** | Lower + Lower | Lower − Upper | Lower × Lower | Lower ÷ Upper |

The logic behind division: to make a fraction as large as possible, you want the numerator as big as possible and the denominator as small as possible — hence Upper ÷ Lower.

**Worked Example 4:** A rectangle has length *l* = 12 cm and width *w* = 7 cm, both measured to the nearest centimetre. Find the upper bound for the area of the rectangle.

Step 1: Find bounds for each measurement.
- Length: half unit = 0.5, so 11.5 ≤ l < 12.5
- Width: half unit = 0.5, so 6.5 ≤ w < 7.5

Step 2: Upper bound for area = upper bound of length × upper bound of width
- Upper bound = 12.5 × 7.5 = **93.75 cm²**

Step 3: Lower bound for area = lower bound of length × lower bound of width
- Lower bound = 11.5 × 6.5 = **74.75 cm²**

**Worked Example 5:** A car travels a distance *d* = 240 km, rounded to the nearest 10 km, in a time *t* = 3 hours, rounded to the nearest hour. Find the upper bound for the speed of the car.

Step 1: Find bounds.
- Distance: 235 ≤ d < 245
- Time: 2.5 ≤ t < 3.5

Step 2: Speed = distance ÷ time. To maximise speed, use the largest possible distance and the smallest possible time.
- Upper bound for speed = 245 ÷ 2.5 = **98 km/h**

Step 3: Lower bound for speed = smallest distance ÷ largest time
- Lower bound = 235 ÷ 3.5 = **67.1 km/h** (to 1 d.p.)

This type of question is very common on Edexcel and AQA higher papers and is worth practising until the setup feels automatic.

## Common Mistakes Students Make

- **Using the wrong inequality sign on the upper bound.** The upper bound always uses a strict inequality (<), not ≤. Many students write 8.35 ≤ l ≤ 8.45 — this is wrong and will lose the accuracy mark.
- **Confusing rounding and truncation.** With truncation, the given number is the lower bound — students often subtract half a unit anyway, which gives the wrong answer.
- **Getting maximum and minimum mixed up in calculations.** For division, students often divide upper by upper thinking that gives the maximum. Remember: max = upper ÷ lower.
- **Forgetting to find both bounds when only one is asked for.** Always establish both before deciding which you need.
- **Rounding their final answer when the question says to leave it exactly.** Bounds questions often ask for the exact value — double-check before rounding.

## Exam Tips for Bounds and Error Intervals

- **Write out both bounds clearly before doing any calculation.** Setting out "upper bound of l = 12.5, lower bound of l = 11.5" takes ten seconds and prevents errors.
- **Underline whether the question says 'rounded' or 'truncated'** — these require different methods. Misreading this is a common source of dropped marks.
- **For multi-step calculations, identify what you are trying to maximise or minimise first.** AQA often gives a formula and asks for an upper bound — decide which bounds to use for each variable before you start substituting.
- **Show all your working.** On a 3-mark bounds question, AQA and Edexcel typically award: one mark for correct upper and lower bounds, one mark for the correct setup of the calculation, and one mark for the final answer. You can still collect the method marks even if you slip up on arithmetic.
- **Check your error interval makes sense.** The given value should always sit in the middle of a rounding error interval. If it does not, you have made an error.

## Practise Now

The best way to get confident with bounds and error intervals is to practise exam-style questions with instant feedback. Try bounds questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
