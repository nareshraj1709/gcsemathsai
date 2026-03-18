---
title: "Quadratic Sequences & Nth Term – GCSE Guide"
description: "Learn how to find the nth term of a quadratic sequence for GCSE Maths Higher tier with step-by-step methods and worked examples."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Algebra"
categoryColour: "blue"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["quadratic sequences", "nth term quadratic", "second difference", "GCSE quadratic sequences", "Higher tier sequences"]
tier: "Higher only"
strand: "Algebra"
topicNumber: 18
---

# Quadratic Sequences and Nth Term

Quadratic sequences take the pattern-spotting skills you learned with linear sequences and push them one level further. Instead of a constant first difference, quadratic sequences have a constant **second** difference. This topic is exclusive to the Higher tier and is tested regularly by AQA, Edexcel, and OCR. On this page you will learn how to recognise a quadratic sequence, find its nth term formula in the form an² + bn + c, and apply the method to exam-style questions. The process has more steps than for linear sequences, but each step is straightforward once you know the routine.

## What Is a Quadratic Sequence?

A quadratic sequence is a sequence whose nth term is a quadratic expression — that is, it contains an n² term. The defining feature is that the **first differences** change, but the **second differences** are constant.

Example: 3, 8, 17, 30, 47, ...

First differences: 5, 9, 13, 17

Second differences: 4, 4, 4 — constant, so this is quadratic.

[FORMULA: nth term = an² + bn + c]

[FORMULA: a = (second difference) ÷ 2]

Once you know a, you subtract an² from each term, leaving a linear sequence from which you find bn + c using the linear nth term method.

## Step-by-Step Method

1. **Write out the sequence** and label the terms T₁, T₂, T₃, etc.
2. **Calculate the first differences** (gaps between consecutive terms).
3. **Calculate the second differences** (gaps between the first differences). If these are constant, the sequence is quadratic.
4. **Find a.** Divide the constant second difference by 2. This is the coefficient of n².
5. **Subtract an² from each original term.** Write out the values of an² for n = 1, 2, 3, 4, ... and subtract them from the corresponding terms.
6. **Find the nth term of the remaining linear sequence.** The result is bn + c.
7. **Combine** to get the full formula: an² + bn + c.
8. **Check** by substituting values of n back into the formula.

## Worked Example 1 — Foundation-style approach at Higher

**Question:** Find the nth term of 5, 12, 23, 38, 57, ...

**Working:**

Step 1: First differences: 7, 11, 15, 19.

Step 2: Second differences: 4, 4, 4. Constant ✓

Step 3: a = 4 ÷ 2 = 2. So the n² part is 2n².

Step 4: Subtract 2n² from each term.

| n | Term | 2n² | Term − 2n² |
|---|------|-----|------------|
| 1 | 5    | 2   | 3          |
| 2 | 12   | 8   | 4          |
| 3 | 23   | 18  | 5          |
| 4 | 38   | 32  | 6          |
| 5 | 57   | 50  | 7          |

Step 5: The remaining sequence is 3, 4, 5, 6, 7, ... which has nth term = n + 2.

Step 6: Full nth term = 2n² + n + 2.

**Check:** n = 3 → 2(9) + 3 + 2 = 23 ✓; n = 5 → 2(25) + 5 + 2 = 57 ✓

**Answer:** nth term = 2n² + n + 2

## Worked Example 2 — Higher Level

**Question:** Find the nth term of 0, 5, 14, 27, 44, ...

**Working:**

Step 1: First differences: 5, 9, 13, 17.

Step 2: Second differences: 4, 4, 4. Constant ✓

Step 3: a = 4 ÷ 2 = 2. n² part is 2n².

Step 4: Subtract 2n².

| n | Term | 2n² | Term − 2n² |
|---|------|-----|------------|
| 1 | 0    | 2   | −2         |
| 2 | 5    | 8   | −3         |
| 3 | 14   | 18  | −4         |
| 4 | 27   | 32  | −5         |

Step 5: Remaining sequence: −2, −3, −4, −5, ... Common difference = −1. When n = 1, value = −2. nth term of linear part: −n − 1.

Step 6: Full nth term = 2n² − n − 1.

**Check:** n = 1 → 2 − 1 − 1 = 0 ✓; n = 4 → 32 − 4 − 1 = 27 ✓

**Answer:** nth term = 2n² − n − 1

## Common Mistakes

- **Forgetting to divide the second difference by 2.** The second difference is 2a, not a. If the second difference is 6, then a = 3.
- **Errors in the subtraction table.** Calculate each value of an² carefully. A single arithmetic slip will throw off the entire linear part.
- **Not recognising a quadratic sequence.** If the first differences are not constant, always check the second differences before assuming the sequence is something more exotic.
- **Mixing up first and second differences.** First differences are the gaps between terms; second differences are the gaps between first differences. Label your rows clearly.
- **Skipping the check step.** Always verify your formula against at least two original terms. This catches sign and arithmetic errors.

## Exam Tips

1. **Set out your working in a table.** Examiners find this much easier to follow and it reduces your own errors. Columns for n, term, an², and the remainder work well.
2. **This question is typically worth 3-4 marks.** You usually get one mark for finding the second difference, one for the an² term, and one or two for the complete formula. Show each step to maximise marks.
3. **Some questions give you the nth term and ask for a specific term.** Simply substitute n into the formula. These are free marks if you can handle substitution into quadratics.
4. **Occasionally, the sequence might start with n = 0 or use different notation.** Read the question carefully to see which term corresponds to which value of n.

## Practice Questions

**Q1:** Find the nth term of 4, 13, 26, 43, 64, ...

[ANSWER: 2n² + 3n − 1 (second difference = 4, a = 2; subtract 2n² to get 2, 5, 8, 11, 14 which is 3n − 1)]

**Q2:** Find the nth term of 1, 8, 19, 34, 53, ...

[ANSWER: 2n² + n − 2 (second difference = 4, a = 2; subtract 2n² to get −1, 0, 1, 2, 3 which is n − 2)]

**Q3:** The nth term of a sequence is 3n² − 2n + 1. Find the 10th term and the difference between the 10th and 9th terms.

[ANSWER: 10th term = 3(100) − 20 + 1 = 281; 9th term = 3(81) − 18 + 1 = 226; difference = 55]

---

Want to practise quadratic sequences with step-by-step hints? [Start revising with GCSEMathsAI](https://www.gcsemathsai.co.uk/auth) — our AI tutor gives you instant feedback and adapts to your level.

## Related Topics

- [Sequences and Nth Term](/topics/sequences-and-nth-term)
- [Solving Quadratic Equations by Factorising](/topics/solving-quadratic-equations-factorising)
- [Completing the Square](/topics/completing-the-square)
- [Factorising Expressions](/topics/factorising-expressions)

For a full revision checklist, visit our [GCSE Maths Topics Complete List](/blog/gcse-maths-topics-complete-list).

## Summary

- A quadratic sequence has a constant second difference.
- The nth term takes the form an² + bn + c.
- Find a by halving the second difference.
- Subtract an² from every term to reveal a linear sequence, then find bn + c.
- Always present your working in a clear table.
- Check your final formula by substituting at least two values of n.
- This topic builds directly on linear sequences and connects to solving and graphing quadratics.
