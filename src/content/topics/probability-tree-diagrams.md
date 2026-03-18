---
title: "Probability Tree Diagrams – GCSE Maths Guide"
description: "Learn how to draw and use probability tree diagrams for GCSE Maths with worked examples, exam tips and practice questions."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Statistics & Probability"
categoryColour: "rose"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["tree diagrams GCSE", "probability tree diagrams", "combined events probability", "without replacement GCSE", "and or probability rules"]
tier: "Foundation & Higher"
strand: "Statistics & Probability"
topicNumber: 70
---

Probability tree diagrams are a powerful tool for solving multi-stage probability problems in GCSE Maths. They appear on both Foundation and Higher papers across AQA, Edexcel and OCR, and the Higher tier frequently includes "without replacement" questions. A tree diagram organises all possible outcomes, making it easy to apply the AND and OR rules correctly. This guide shows you how to draw and use tree diagrams step by step, provides worked examples at both tiers, highlights the errors examiners see repeatedly, and finishes with practice questions so you can build confidence. For a full overview of all topics, visit our [complete GCSE Maths topics list](/blog/gcse-maths-topics-complete-list).

## What Is a Probability Tree Diagram?

A **tree diagram** is a branching diagram where each branch represents a possible outcome at each stage of an experiment. The probability of each outcome is written along its branch.

### Key Rules

**AND rule (multiplication):** To find the probability of a sequence of outcomes, **multiply** along the branches.

[FORMULA: P(A and B) = P(A) × P(B)]

**OR rule (addition):** To find the probability of one outcome **or** another (when they are mutually exclusive), **add** the probabilities of the relevant end results.

[FORMULA: P(A or B) = P(A) + P(B)]

### With and Without Replacement

- **With replacement** — the probabilities stay the same at each stage because the item is put back. The events are independent.
- **Without replacement** — the probabilities change at the second stage because the item is not put back. The total number of outcomes decreases by one. This is tested heavily at Higher level.

### Checking Your Diagram

- At every set of branches from a single point, the probabilities must add up to **1**.
- All the end probabilities (products of branches) must also add up to **1**.

## Step-by-Step Method

### Drawing a Tree Diagram

1. Identify the stages of the experiment (e.g. first pick, second pick).
2. For the first stage, draw branches for each possible outcome and label them with their probabilities.
3. From the end of each first-stage branch, draw branches for the second stage.
4. If the experiment is "with replacement", probabilities stay the same. If "without replacement", adjust the numerator and denominator.
5. Write the outcome combination at the end of each path.

### Calculating Probabilities

1. **Multiply along branches** to find the probability of each path.
2. **Add the path probabilities** for paths that satisfy the event you are asked about.
3. Write your answer as a fraction in its simplest form (unless told otherwise).

## Worked Example 1 — Foundation Level

**Question:** A bag contains 4 red and 6 blue counters. A counter is taken out, its colour noted, and it is **replaced**. A second counter is then taken. Find the probability that (a) both counters are red, (b) the counters are different colours.

**Working:**

Total counters = 10. P(red) = 4/10 = 2/5. P(blue) = 6/10 = 3/5.

**Tree diagram:**

First pick → Red (2/5) or Blue (3/5).
Second pick (same probabilities because of replacement) → Red (2/5) or Blue (3/5) from each branch.

**Paths and probabilities:**

- Red, Red: 2/5 × 2/5 = 4/25
- Red, Blue: 2/5 × 3/5 = 6/25
- Blue, Red: 3/5 × 2/5 = 6/25
- Blue, Blue: 3/5 × 3/5 = 9/25

Check: 4/25 + 6/25 + 6/25 + 9/25 = 25/25 = 1 ✓

**(a)** P(both red) = 4/25.

**(b)** P(different colours) = P(Red, Blue) + P(Blue, Red) = 6/25 + 6/25 = **12/25**.

## Worked Example 2 — Higher Level

**Question:** A bag contains 5 green and 3 yellow balls. A ball is taken out **without replacement**, then a second ball is taken. Find the probability that (a) both balls are green, (b) at least one ball is yellow.

**Working:**

First pick: P(green) = 5/8, P(yellow) = 3/8.

Second pick (without replacement — total is now 7):

- If first was green: P(green) = 4/7, P(yellow) = 3/7.
- If first was yellow: P(green) = 5/7, P(yellow) = 2/7.

**Paths and probabilities:**

- Green, Green: 5/8 × 4/7 = 20/56
- Green, Yellow: 5/8 × 3/7 = 15/56
- Yellow, Green: 3/8 × 5/7 = 15/56
- Yellow, Yellow: 3/8 × 2/7 = 6/56

Check: 20 + 15 + 15 + 6 = 56 ✓

**(a)** P(both green) = 20/56 = **5/14**.

**(b)** "At least one yellow" means everything except "both green".

P(at least one yellow) = 1 − P(both green) = 1 − 5/14 = **9/14**.

Alternatively: 15/56 + 15/56 + 6/56 = 36/56 = 9/14.

## Common Mistakes

- **Forgetting to adjust probabilities** for "without replacement" — the denominator and sometimes the numerator must change for the second stage.
- **Adding instead of multiplying** along a branch — multiply along, add between paths.
- **Missing a path** — for "at least one", there are usually multiple paths to add. Using the complement (1 minus the opposite) is often quicker and avoids this error.
- **Not simplifying fractions** — always reduce to lowest terms unless told otherwise.
- **Probabilities at a branch point not adding to 1** — this is a quick self-check. If they do not add to 1, you have made an error.

## Exam Tips

1. **Draw the diagram neatly** — use a ruler for branches and clearly label outcomes and probabilities. A messy diagram leads to reading errors.
2. **Use the complement** for "at least one" — it is much faster to calculate 1 − P(none) than to add multiple paths.
3. **Three-stage trees** — some Higher questions have three stages. The method is the same: multiply along and add between. Just be careful with the arithmetic.
4. **Link to Venn diagrams** — some problems can also be solved using Venn diagrams. See [Venn diagrams](/topics/venn-diagrams).
5. **Show all working** — write out each path probability and clearly state which paths you are adding. This earns method marks.
6. For probability fundamentals, revisit [probability basics and relative frequency](/topics/probability-basics-and-relative-frequency). For key formulas, see our [GCSE Maths formulas list](/blog/gcse-maths-formulas-you-must-know).

## Practice Questions

**Question 1 (Foundation):** A coin is flipped twice. Draw a tree diagram and find the probability of getting exactly one head.

[ANSWER: Paths: HH (1/4), HT (1/4), TH (1/4), TT (1/4). Exactly one head = HT + TH = 1/4 + 1/4 = 1/2.]

**Question 2 (Foundation):** The probability of rain on any day is 0.4. Find the probability that it rains on both Monday and Tuesday (independent events).

[ANSWER: P(rain and rain) = 0.4 × 0.4 = 0.16.]

**Question 3 (Higher):** A box has 6 red and 4 white chocolates. Two are taken without replacement. Find the probability of getting one of each colour.

[ANSWER: P(RW) = 6/10 × 4/9 = 24/90. P(WR) = 4/10 × 6/9 = 24/90. Total = 48/90 = 8/15.]

**Question 4 (Higher):** Using the same box, find the probability that at least one chocolate is red.

[ANSWER: P(no red) = P(WW) = 4/10 × 3/9 = 12/90 = 2/15. P(at least one red) = 1 − 2/15 = 13/15.]

---

Ready to practise these skills with instant, personalised feedback? Try our AI-powered GCSE Maths tutor at [gcsemathsai.co.uk](https://www.gcsemathsai.co.uk/auth) — it adapts to your level and helps you build confidence before exam day.

## Related Topics

- [Probability Basics and Relative Frequency](/topics/probability-basics-and-relative-frequency)
- [Venn Diagrams](/topics/venn-diagrams)
- [Conditional Probability](/topics/conditional-probability)
- [Fractions](/topics/fractions)

## Summary

Probability tree diagrams break multi-stage experiments into a clear, visual structure. Each branch carries a probability; you **multiply along branches** to find the probability of a combined outcome and **add between paths** to find the probability of one outcome or another. With replacement, probabilities stay the same at each stage; **without replacement**, the denominator (and sometimes numerator) decreases. Use the complement — P(at least one) = 1 − P(none) — to save time and reduce errors. Always check that branch probabilities sum to 1 and that all end probabilities sum to 1. These skills feed directly into Venn diagrams and conditional probability at Higher level.
