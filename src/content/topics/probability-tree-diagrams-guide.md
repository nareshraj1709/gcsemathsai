---
title: "Probability Tree Diagrams – GCSE Maths Revision Guide"
description: "Master probability tree diagrams for GCSE Maths. Independent and dependent events, AND/OR rules, without replacement and worked examples."
date: "23 May 2026"
dateISO: "2026-05-23"
category: "Statistics & Probability"
categoryColour: "rose"
author: "GCSEMathsAI Team"
readMins: 7
keywords: ["probability tree diagrams", "independent events GCSE", "without replacement probability", "AND OR rule probability", "tree diagram GCSE maths"]
tier: "Foundation & Higher"
strand: "Statistics & Probability"
topicNumber: 122
---

Tree diagrams are one of the most important tools in GCSE probability. They let you organise multi-stage events clearly, showing every possible outcome and its probability. Whether events are independent (with replacement) or dependent (without replacement), the method is the same: multiply along branches for AND, add between branches for OR. This guide covers both types with fully worked examples.

## What Is a Probability Tree Diagram?

A **tree diagram** is a visual way to show all possible outcomes of two or more events in sequence. Each branch represents one possible outcome, and the probability is written along the branch. The branches at each stage must have probabilities that add up to 1.

For **independent events**, the outcome of one event does not affect the other. If you flip a coin and roll a die, the coin result does not change the die probabilities. The probabilities on the second set of branches are the same regardless of the first outcome.

For **dependent events** (also called "without replacement"), the outcome of the first event changes the probabilities for the second event. If you pick a sweet from a bag and do not put it back, the number of sweets left changes, and so do the probabilities for the next pick.

### Key Formulas

[FORMULA: P(A and B) = P(A) × P(B) — multiply along branches]

[FORMULA: P(A or B) = P(A and B₁) + P(A and B₂) — add between outcomes]

## Step-by-Step Method

1. **Draw the first set of branches** for the first event, labelling each outcome and its probability.
2. **Draw the second set of branches** from each first-event outcome, updating probabilities if the events are dependent.
3. **Multiply along branches** to find the probability of each combined outcome.
4. **Add probabilities** of the outcomes that satisfy the condition in the question.

## Worked Example 1 — Foundation Level

**Question:** A bag contains 4 red and 6 blue counters. A counter is picked at random, replaced, and a second counter is picked. Find the probability of getting two red counters.

**Working:**
P(Red) = 4/10 = 2/5. P(Blue) = 6/10 = 3/5. Since the counter is replaced, probabilities stay the same.
P(Red and Red) = 2/5 × 2/5 = 4/25.

**Answer:** P(two red) = 4/25.

## Worked Example 2 — Higher Level

**Question:** A bag contains 5 green and 3 yellow balls. Two balls are picked without replacement. Find the probability of getting one of each colour.

**Working:**
P(Green 1st) = 5/8. Then P(Yellow 2nd) = 3/7. So P(Green then Yellow) = 5/8 × 3/7 = 15/56.
P(Yellow 1st) = 3/8. Then P(Green 2nd) = 5/7. So P(Yellow then Green) = 3/8 × 5/7 = 15/56.
P(one of each) = 15/56 + 15/56 = 30/56 = 15/28.

**Answer:** P(one of each colour) = 15/28.

## Worked Example 3 — Exam Style

**Question:** The probability that it rains on any day is 0.3. Mia walks to school on two consecutive days. Find the probability that it rains on exactly one of the two days.

**Working:**
P(Rain) = 0.3, P(No Rain) = 0.7. Events are independent.
P(Rain then No Rain) = 0.3 × 0.7 = 0.21.
P(No Rain then Rain) = 0.7 × 0.3 = 0.21.
P(exactly one rainy day) = 0.21 + 0.21 = 0.42.

**Answer:** P(rain on exactly one day) = 0.42.

## Common Mistakes

- **Adding instead of multiplying along branches.** To find P(A and B), multiply the branch probabilities. Only add when combining separate outcomes at the end.
- **Not adjusting probabilities for without replacement.** If a ball is not returned, the total and the count for that colour both change on the second pick. For example, after removing one green ball from 5 green and 3 yellow, there are 7 balls left.
- **Forgetting to consider both orders.** "One of each" means Green-then-Yellow OR Yellow-then-Green. Both paths must be included.
- **Incorrect simplification of fractions.** When multiplying fractions along branches, simplify only at the end. For example, 4/10 × 3/9 = 12/90 = 2/15, not 12/100.

## Exam Tips

- Always check that branches at each stage add up to 1. This is a quick error check.
- Label your tree diagram clearly with outcomes and probabilities — examiners award marks for a well-drawn tree even if the final answer is wrong.
- For "at least one" questions, it is often easier to calculate P(none) and subtract from 1: P(at least one) = 1 − P(none).
- Leave probabilities as fractions throughout your working. Only convert to decimals at the end if the question requires it.
- For without-replacement questions, write the adjusted totals clearly on the second set of branches to avoid errors.

## Practice Questions

**Q1 (Foundation):** A spinner has P(Win) = 0.4. It is spun twice. Find P(two wins).

[ANSWER: P(Win and Win) = 0.4 × 0.4 = 0.16.]

**Q2 (Foundation):** Using the same spinner, find P(exactly one win in two spins).

[ANSWER: P(Win then Lose) = 0.4 × 0.6 = 0.24. P(Lose then Win) = 0.6 × 0.4 = 0.24. P(exactly one win) = 0.24 + 0.24 = 0.48.]

**Q3 (Higher):** A box has 6 milk and 4 dark chocolates. Two are taken without replacement. Find P(both dark).

[ANSWER: P(Dark 1st) = 4/10 = 2/5. P(Dark 2nd) = 3/9 = 1/3. P(both dark) = 2/5 × 1/3 = 2/15.]

---

Practise probability tree diagram questions with instant feedback — completely free on GCSEMathsAI.

## Related Topics

- [Probability Tree Diagrams](/topics/probability-tree-diagrams)
- [Conditional Probability](/topics/conditional-probability)
- [Venn Diagrams](/topics/venn-diagrams)

## Summary

- A tree diagram shows all possible outcomes for multi-stage events.
- Multiply along branches to find P(A and B). Add separate outcome probabilities for P(A or B).
- For independent events (with replacement), probabilities stay the same at each stage.
- For dependent events (without replacement), adjust the total and counts after each pick.
- For "at least one" questions, use P(at least one) = 1 − P(none).
- Always check that all branch probabilities at each stage add to 1 and all final outcome probabilities add to 1.
- Tree diagrams can extend to three or more stages — the same multiply-along, add-between rules apply at every level.
