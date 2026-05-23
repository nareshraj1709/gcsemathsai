---
title: "Combined Events Probability – GCSE Maths Revision Guide"
description: "Combined events probability GCSE Maths revision: calculate P(A and B) and P(A or B) for independent and dependent events with worked examples and practice."
date: "23 May 2026"
dateISO: "2026-05-23"
category: "Statistics & Probability"
categoryColour: "rose"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["combined events probability GCSE", "P(A and B) GCSE maths", "P(A or B) GCSE", "independent events probability", "with and without replacement probability", "combined probability GCSE"]
tier: "Foundation & Higher"
strand: "Statistics & Probability"
topicNumber: 247
---

Combined events probability is a core topic on GCSE Maths papers at both Foundation and Higher tier. Questions ask you to find the probability of two or more events occurring together ("and") or at least one occurring ("or"). At Higher level, you must handle events with and without replacement, recognise whether events are independent, and apply the correct rules. This guide explains the theory, works through graded examples and flags the mistakes examiners see most often. For the full specification overview, see our [complete GCSE Maths topics list](/blog/gcse-maths-topics-complete-list).

## What Is Combined Events Probability?

**Combined events** involve two or more outcomes happening. The key question is whether you need "and" (both events happen) or "or" (at least one happens).

### Key Formulas

**The AND rule (multiplication rule):**

For **independent** events (the outcome of one does not affect the other):

[FORMULA: P(A and B) = P(A) × P(B)]

For **dependent** events (without replacement or conditional):

[FORMULA: P(A and B) = P(A) × P(B given A)]

**The OR rule (addition rule):**

For **mutually exclusive** events (cannot happen at the same time):

[FORMULA: P(A or B) = P(A) + P(B)]

For events that are **not mutually exclusive**:

[FORMULA: P(A or B) = P(A) + P(B) − P(A and B)]

## Step-by-Step Method

1. **Identify the events** — what are A and B?
2. **Decide "and" or "or"** — does the question ask for both events or at least one?
3. **Check independence** — does the first event affect the second? (e.g. is there replacement?)
4. **Apply the correct rule:**
   - "And" with independent events: multiply the probabilities.
   - "And" without replacement: adjust the second probability.
   - "Or" with mutually exclusive events: add the probabilities.
   - "Or" with overlap: add and subtract the overlap.
5. **Simplify** your answer.

## Worked Example 1 — Foundation Level

**Question:** A fair coin is flipped and a fair six-sided dice is rolled. Find the probability of getting a head and a 6.

**Working:**

These are independent events.

P(head) = 1/2. P(6) = 1/6.

P(head and 6) = 1/2 × 1/6 = **1/12**.

**Answer:** 1/12.

## Worked Example 2 — Higher Level

**Question:** A bag contains 5 red and 3 blue counters. Two counters are drawn without replacement. Find the probability that both are red.

**Working:**

P(1st red) = 5/8.

After removing one red counter: 4 red and 3 blue remain, total = 7.

P(2nd red | 1st red) = 4/7.

P(both red) = 5/8 × 4/7 = 20/56 = **5/14**.

**Answer:** 5/14.

## Worked Example 3 — Exam Style

**Question:** A bag contains 4 green, 6 yellow and 2 white balls. One ball is drawn at random. Find (a) P(green or white), (b) P(not yellow). A second ball is drawn without replacement. (c) Find P(both balls are yellow).

**Working:**

Total balls = 4 + 6 + 2 = 12.

**(a)** Green and white are mutually exclusive.
P(green or white) = 4/12 + 2/12 = 6/12 = **1/2**.

**(b)** P(yellow) = 6/12 = 1/2. P(not yellow) = 1 − 1/2 = **1/2**.

**(c)** P(1st yellow) = 6/12 = 1/2. After removing one yellow: 5 yellow out of 11 remain.
P(2nd yellow) = 5/11.
P(both yellow) = 1/2 × 5/11 = 5/22.

**Answer:** (a) 1/2 (b) 1/2 (c) 5/22.

## Common Mistakes

- **Using "and" when the question means "or" (or vice versa).** "And" means both happen (multiply). "Or" means at least one happens (add).
- **Not adjusting for without replacement.** When items are not replaced, the total decreases and the count of the relevant items may decrease — adjust both the numerator and denominator for the second event.
- **Adding probabilities for "and" questions.** Multiplying is correct for "and"; adding is for "or."
- **Forgetting to subtract the overlap.** For non-mutually exclusive "or" questions, use P(A) + P(B) − P(A and B).

## Exam Tips

- Draw a tree diagram to visualise combined events — it helps organise the multiplication and addition clearly. See [probability tree diagrams](/topics/probability-tree-diagrams).
- "Without replacement" always means dependent events — adjust the second probability.
- "With replacement" means independent events — probabilities stay the same for each draw.
- At Foundation, most combined events questions use independent events or simple mutually exclusive situations.
- At Higher, expect without-replacement and "not mutually exclusive" questions.
- For sample spaces, see [sample space diagrams](/topics/sample-space-diagrams).

## Practice Questions

**Q1 (Foundation):** Two fair six-sided dice are rolled. Find the probability that both show a 4.

[ANSWER: P(both 4) = 1/6 × 1/6 = 1/36.]

**Q2 (Foundation):** A spinner has sections labelled 1, 2, 3, 4. Find the probability of spinning a 1 or a 3.

[ANSWER: P(1 or 3) = 1/4 + 1/4 = 2/4 = 1/2.]

**Q3 (Higher):** A bag has 7 red and 5 blue marbles. Two are drawn without replacement. Find the probability of getting one of each colour.

[ANSWER: P(red then blue) = 7/12 × 5/11 = 35/132. P(blue then red) = 5/12 × 7/11 = 35/132. P(one of each) = 35/132 + 35/132 = 70/132 = 35/66.]

---

Practise combined events probability for free on GCSEMathsAI.

## Related Topics

- [Probability Tree Diagrams](/topics/probability-tree-diagrams)
- [Sample Space Diagrams](/topics/sample-space-diagrams)
- [Conditional Probability](/topics/conditional-probability)
- [Probability Basics and Relative Frequency](/topics/probability-basics-and-relative-frequency)

## Summary

Combined events probability uses the AND rule (multiply) for events happening together and the OR rule (add) for at least one event happening. For independent events, P(A and B) = P(A) × P(B). For dependent events (without replacement), adjust the second probability based on the new total. For mutually exclusive events, P(A or B) = P(A) + P(B). When events overlap, subtract P(A and B) to avoid double-counting. Always check whether events are independent or dependent, and whether "and" or "or" is required.
