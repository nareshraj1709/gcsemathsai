---
title: "Conditional Probability – GCSE Maths Higher"
description: "Master conditional probability for GCSE Maths Higher with tree diagrams, Venn diagrams, worked examples and practice questions."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Statistics & Probability"
categoryColour: "rose"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["conditional probability GCSE", "given that probability", "dependent events GCSE maths", "without replacement probability", "Higher probability revision"]
tier: "Higher only"
strand: "Statistics & Probability"
topicNumber: 72
---

Conditional probability is one of the most challenging Higher-tier topics in GCSE Maths, yet it is tested regularly on AQA, Edexcel and OCR papers. It deals with the probability of an event happening **given that** another event has already occurred. This changes the sample space and often changes the probability itself. Questions typically involve picking items without replacement, two-way tables, Venn diagrams or tree diagrams where later branches depend on earlier outcomes. This guide breaks the concept down clearly, provides fully worked examples, warns you about the most common errors, and supplies practice questions so you can prepare with confidence. For a complete list of every GCSE topic, see our [complete GCSE Maths topics list](/blog/gcse-maths-topics-complete-list).

## What Is Conditional Probability?

**Conditional probability** is the probability of event B happening **given that** event A has already happened. It is written as P(B | A), read as "the probability of B given A".

[FORMULA: P(B | A) = P(A ∩ B) ÷ P(A)]

In words: the probability of both A and B happening, divided by the probability of A.

### Why Does It Matter?

When one event affects another, the events are **dependent**. For example, if you take a red ball from a bag without replacing it, the probability of the second ball being red changes — there are fewer red balls and fewer balls overall. Ignoring this dependency leads to wrong answers.

### Independent vs Dependent Events

- **Independent events:** The outcome of one does not affect the other. P(B | A) = P(B). Example: flipping a coin twice.
- **Dependent events:** The outcome of the first affects the probabilities for the second. P(B | A) ≠ P(B). Example: picking two cards from a deck without replacement.

## Step-by-Step Method

### Using a Tree Diagram

1. Draw branches for the first event with their probabilities.
2. For each first-event outcome, draw second-event branches with **adjusted probabilities** (reflecting what has already happened).
3. Multiply along branches to find the probability of each combined outcome.
4. Add paths as needed for the required event.

### Using a Two-Way Table

1. Fill in all cells of the table using the given information.
2. To find P(B | A), restrict your attention to the **row or column** for A.
3. Divide the number in the cell for "A and B" by the total for A.

### Using a Venn Diagram

1. Complete the Venn diagram with all regions filled in.
2. To find P(B | A), look only at the elements inside circle A.
3. Of those, count how many are also in B.
4. Divide: P(B | A) = n(A ∩ B) ÷ n(A).

### Using the Formula Directly

1. Calculate P(A ∩ B) — the probability of both events occurring.
2. Calculate P(A).
3. Divide: P(B | A) = P(A ∩ B) ÷ P(A).

## Worked Example 1 — Higher Level

**Question:** A bag contains 7 blue and 3 red counters. Two counters are taken without replacement. Find (a) the probability that both are blue, (b) the probability that the second counter is red given that the first was blue.

**Working:**

**(a)** First pick: P(blue) = 7/10. After removing one blue, there are 6 blue and 3 red left (9 total). Second pick: P(blue | first blue) = 6/9 = 2/3.

P(both blue) = 7/10 × 2/3 = 14/30 = **7/15**.

**(b)** Given the first counter is blue, there are 6 blue and 3 red remaining (9 counters).

P(red | first blue) = 3/9 = **1/3**.

## Worked Example 2 — Higher Level

**Question:** The two-way table shows information about 100 students.

|  | Left-handed | Right-handed | Total |
|---|---|---|---|
| Male | 8 | 42 | 50 |
| Female | 12 | 38 | 50 |
| Total | 20 | 80 | 100 |

(a) Find the probability that a randomly chosen student is left-handed given that they are female.
(b) Are being female and being left-handed independent events? Show working.

**Working:**

**(a)** Restrict to females: there are 50 females, of whom 12 are left-handed.

P(left-handed | female) = 12/50 = **6/25**.

**(b)** For independence, P(left-handed | female) should equal P(left-handed).

P(left-handed) = 20/100 = 1/5 = 0.20.

P(left-handed | female) = 12/50 = 6/25 = 0.24.

Since 0.24 ≠ 0.20, the events are **not independent**.

## Common Mistakes

- **Forgetting to reduce the total** — in "without replacement" problems, the denominator decreases. If you start with 10 items, the second pick has 9 items, not 10.
- **Using the whole sample space** instead of the restricted one — conditional probability means you only consider the subset where the given event has occurred.
- **Confusing P(A ∩ B) with P(B | A)** — the intersection is the probability of both; the conditional is the probability of one given the other. They are related by the formula but are not the same.
- **Assuming independence** — do not assume events are independent unless the question tells you they are. Check by comparing P(B | A) with P(B).
- **Misidentifying which event is "given"** — P(A | B) ≠ P(B | A). Read the question carefully to see which event has already occurred.

## Exam Tips

1. **Read the question twice** — identify which event is given and which event you are finding the probability of. The word "given" or the phrase "given that" is your signal.
2. **Draw a tree diagram** for without-replacement problems — it makes the adjusted probabilities visible and reduces errors.
3. **Two-way table shortcut** — when given a table, conditional probability is simply "look at the row/column for the condition, then read the relevant cell". No formula needed if you understand this logic.
4. **Show the formula** — even if you can see the answer, write P(B | A) = P(A ∩ B) ÷ P(A) to demonstrate understanding and earn method marks.
5. **Testing for independence** — if P(B | A) = P(B), the events are independent. If not, they are dependent. State this conclusion clearly.
6. For foundational probability skills, see [probability basics and relative frequency](/topics/probability-basics-and-relative-frequency) and [probability tree diagrams](/topics/probability-tree-diagrams). For all key formulas, visit our [GCSE Maths formulas page](/blog/gcse-maths-formulas-you-must-know).

## Practice Questions

**Question 1:** A box contains 5 milk and 3 dark chocolates. Two are chosen without replacement. Find the probability that both are dark.

[ANSWER: P(first dark) = 3/8. P(second dark | first dark) = 2/7. P(both dark) = 3/8 × 2/7 = 6/56 = 3/28.]

**Question 2:** In a class, 60% of students passed maths and 40% passed both maths and English. Find the probability that a student passed English given that they passed maths.

[ANSWER: P(English | Maths) = P(Maths ∩ English) ÷ P(Maths) = 0.40 ÷ 0.60 = 2/3.]

**Question 3:** A Venn diagram shows set A has 15 elements, A ∩ B has 6 elements, and B has 10 elements. ξ = 30. Find P(B | A).

[ANSWER: P(B | A) = n(A ∩ B) ÷ n(A) = 6 ÷ 15 = 2/5.]

**Question 4:** The probability that it rains is 0.3. The probability that a bus is late given that it rains is 0.5. Find the probability that it rains and the bus is late.

[ANSWER: P(Rain ∩ Late) = P(Rain) × P(Late | Rain) = 0.3 × 0.5 = 0.15.]

---

Ready to practise these skills with instant, personalised feedback? Try our AI-powered GCSE Maths tutor at [gcsemathsai.co.uk](https://www.gcsemathsai.co.uk/auth) — it adapts to your level and helps you build confidence before exam day.

## Related Topics

- [Probability Tree Diagrams](/topics/probability-tree-diagrams)
- [Venn Diagrams](/topics/venn-diagrams)
- [Probability Basics and Relative Frequency](/topics/probability-basics-and-relative-frequency)
- [Fractions](/topics/fractions)

## Summary

Conditional probability finds the likelihood of an event **given that** another event has already occurred. The key formula is P(B | A) = P(A ∩ B) ÷ P(A). In practice, you restrict the sample space to only those outcomes where the given event has happened, then calculate from there. "Without replacement" problems are the most common application — the total decreases after each pick, changing the probabilities. Use tree diagrams, two-way tables or Venn diagrams to organise your working. To test for independence, check whether P(B | A) = P(B). Always read the question carefully to identify which event is the "given" event, show the formula, and present your working clearly to earn full marks.
