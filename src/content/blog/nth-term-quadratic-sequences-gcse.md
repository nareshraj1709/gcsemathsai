---
title: "Nth Term of Quadratic Sequences GCSE Maths: How to Find It Every Time"
description: "Master the nth term of quadratic sequences in GCSE Maths with a clear step-by-step method, two fully worked examples, and board-specific exam tips."
date: "21 July 2026"
dateISO: "2026-07-21"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["nth term quadratic sequences gcse", "quadratic sequences gcse maths", "how to find nth term quadratic gcse", "gcse maths sequences higher"]
---

Quadratic sequences come up on every GCSE Higher paper — AQA 8300, Edexcel 1MA1, and OCR J560 all include them, typically on Paper 2 or Paper 3. They often appear as a multi-part question worth 4–6 marks, so getting this method locked in is one of the most efficient things you can do before your exam.

## What You Need to Know First

Before tackling quadratic sequences, make sure you're comfortable with these:

- Finding the **nth term of a linear sequence** (e.g. 3n + 2) — you'll need this as part of the method
- What **first differences** and **second differences** mean — the gap between consecutive terms, and the gap between those gaps
- Substituting values into an expression — you'll be checking your answer by putting n = 1, 2, 3 back in
- Squaring whole numbers up to at least 10 — you'll be working with n² repeatedly
- The standard form of a quadratic nth term: **an² + bn + c**, where a, b, and c are numbers to find

## How to Spot a Quadratic Sequence

The key test is the second differences.

Take the sequence **3, 8, 15, 24, 35**.

Write out the **first differences** — the gaps between terms:

- 8 − 3 = 5
- 15 − 8 = 7
- 24 − 15 = 9
- 35 − 24 = 11

First differences: 5, 7, 9, 11 — not constant, so this isn't a linear sequence.

Now write out the **second differences** — the gaps between the first differences:

- 7 − 5 = 2
- 9 − 7 = 2
- 11 − 9 = 2

Second differences: 2, 2, 2 — **constant**. That tells you the sequence is quadratic.

The value of **a** in your formula an² + bn + c is always:

> **a = second difference ÷ 2**

So here, a = 2 ÷ 2 = **1**, and the formula starts with n².

## Finding the Nth Term: The Full Method

Let's find the nth term of **3, 8, 15, 24, 35** step by step.

**Step 1: Confirm it's quadratic and find a.**
Second differences are all 2, so a = 2 ÷ 2 = 1.

**Step 2: Write out the values of an².**
Since a = 1, we write out n²:

| n | 1 | 2 | 3 | 4  | 5  |
|---|---|---|---|----|----|
| n² | 1 | 4 | 9 | 16 | 25 |

**Step 3: Subtract an² from the original sequence.**

| Position (n) | Sequence | n² | Remainder |
|---|---|---|---|
| 1 | 3 | 1 | 2 |
| 2 | 8 | 4 | 4 |
| 3 | 15 | 9 | 6 |
| 4 | 24 | 16 | 8 |
| 5 | 35 | 25 | 10 |

The remainders are 2, 4, 6, 8, 10 — a linear sequence.

**Step 4: Find the nth term of the remainder sequence.**
The remainder sequence 2, 4, 6, 8, 10 has a common difference of 2 and starts at 2.
Nth term = 2n.

**Step 5: Add everything together.**
Nth term = n² + 2n

**Check:** n = 1 → 1 + 2 = 3 ✓. n = 4 → 16 + 8 = 24 ✓. n = 5 → 25 + 10 = 35 ✓

## A Harder Example: When a Is Not 1

When the second difference is bigger than 2, a will be greater than 1. The method is identical — you just subtract an² instead of n².

**Find the nth term of 5, 14, 29, 50, 77.**

**Step 1: Find the differences.**
- First differences: 9, 15, 21, 27
- Second differences: 6, 6, 6 → constant ✓

**Step 2: Find a.**
a = 6 ÷ 2 = **3**. The formula starts with **3n²**.

**Step 3: Write out 3n².**

| n | 1 | 2 | 3 | 4  | 5  |
|---|---|---|---|----|----|
| 3n² | 3 | 12 | 27 | 48 | 75 |

**Step 4: Subtract 3n² from the original sequence.**

| n | Sequence | 3n² | Remainder |
|---|---|---|---|
| 1 | 5 | 3 | 2 |
| 2 | 14 | 12 | 2 |
| 3 | 29 | 27 | 2 |
| 4 | 50 | 48 | 2 |
| 5 | 77 | 75 | 2 |

The remainders are all **2** — a constant. A constant remainder means b = 0 and c = 2.

**The nth term is 3n² + 2.**

**Check:** n = 2 → 3(4) + 2 = 12 + 2 = 14 ✓. n = 5 → 3(25) + 2 = 75 + 2 = 77 ✓

## Using the Formula Once You Have It

Examiners also ask you to find a specific term, or to decide whether a given number is in the sequence.

**Example using 3n² + 2:**

*"Is 110 a term in the sequence?"*

Set 3n² + 2 = 110, then solve:
- 3n² = 108
- n² = 36
- n = 6

n = 6 is a positive whole number, so **yes, 110 is the 6th term**.

*"Is 80 a term in the sequence?"*
- 3n² = 78
- n² = 26
- n = √26 ≈ 5.1

Not a whole number, so **80 is not in the sequence**.

This type of question appears frequently on Edexcel 1MA1 Higher and AQA 8300 — it's worth 1–2 marks and only takes a minute if you know the formula.

## Common Mistakes Students Make

- **Dividing by 2 is essential — and often forgotten.** The second difference equals 2a, not a. If the second difference is 6, then a = 3, not 6. This is the single most common error on quadratic sequence questions.
- **Subtracting in the wrong direction.** In Step 4, the remainder = (original sequence) − (an²). Getting this the wrong way round gives you the wrong linear sequence.
- **Not checking by substituting back.** Once you have your formula, always substitute n = 1 and n = 2 to check. This takes 30 seconds and will catch sign errors every time.
- **Stopping at the remainder.** If the remainder sequence in Step 4 isn't a constant, students sometimes panic and stop. It's just a linear sequence — find *its* nth term and add it to an².
- **Confusing the n value.** n is the position of the term, starting at 1 — not the term itself. The 4th term uses n = 4.

## Exam Tips for Quadratic Sequences

- **Show both rows of differences.** AQA 8300 typically awards a method mark for finding the second differences, even if the final nth term is wrong. Never skip this working.
- **State the value of a explicitly.** Writing "a = 3" on your working line makes it clear to the examiner exactly where your 3n² comes from. It earns method marks even if arithmetic errors creep in later.
- **Learn to recognise the three possible outcomes in Step 4.** The remainder is always either (1) a constant, (2) a linear sequence, or (3) something that doesn't simplify — if it's the third, you've made an error somewhere.
- **On OCR J560, the sequence may be presented as a diagram.** Count the objects in each pattern to build your number sequence, then apply the method above. The maths is identical.
- **Practise working backwards.** Given the nth term, you should also be able to write down the first 5 terms. Edexcel sometimes tests this in one-mark starter questions.

## Practise Now

The best way to get confident with quadratic sequences is to practise exam-style questions with instant feedback. Try quadratic sequences questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
