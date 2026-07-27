---
title: "Tree Diagrams GCSE Maths: Conditional Probability Made Simple"
description: "Master tree diagrams and conditional probability for GCSE Maths — learn to handle independent and dependent events with worked examples for AQA, Edexcel and OCR."
date: "27 July 2026"
dateISO: "2026-07-27"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["tree diagrams gcse maths", "conditional probability gcse", "probability tree diagram gcse", "dependent events gcse maths", "independent events tree diagram"]
---

Tree diagrams are one of the most reliable ways to pick up marks in a GCSE probability question — if you know the method, you can work through them calmly even when the scenario sounds complicated. They appear on all three major boards: AQA 8300 (usually Paper 2 or 3), Edexcel 1MA1 (typically a 4–6 mark question on the calculator paper), and OCR J560. The key is knowing when to use them and how to handle the second branch when events depend on each other.

## What You Need to Know First

- Probability is always between 0 and 1
- Probabilities on branches coming from the same point **must add up to 1**
- To find the probability of two events both happening, **multiply** along the branches
- To find the probability of two outcomes that both satisfy a condition, **add** those products
- The difference between **independent events** (first outcome doesn't affect the second) and **dependent events** (it does)

## Independent Events: Tree Diagrams Without Replacement Concerns

When events are **independent**, the probabilities on the second set of branches stay the same regardless of what happened on the first branch.

### Worked Example 1

A bag contains 3 red counters and 2 blue counters. A counter is picked at random, noted, and **put back** before a second counter is picked. Find the probability that both counters are the same colour.

**Step 1 — Set up the first branches:**
- P(Red) = 3/5
- P(Blue) = 2/5

**Step 2 — Set up the second branches.** Because the counter is replaced, the probabilities are identical:
- After Red: P(Red) = 3/5, P(Blue) = 2/5
- After Blue: P(Red) = 3/5, P(Blue) = 2/5

**Step 3 — Multiply along each branch for the four outcomes:**
- P(Red, Red) = 3/5 × 3/5 = **9/25**
- P(Red, Blue) = 3/5 × 2/5 = 6/25
- P(Blue, Red) = 2/5 × 3/5 = 6/25
- P(Blue, Blue) = 2/5 × 2/5 = **4/25**

**Step 4 — Add the outcomes that match "same colour":**
P(same colour) = 9/25 + 4/25 = **13/25**

Quick check: all four outcomes should add to 1. 9 + 6 + 6 + 4 = 25. ✓

## Dependent Events: Conditional Probability Without Replacement

This is where many students lose marks. When a counter is **not replaced**, the second set of branches changes — the total number of counters is now one fewer, so every probability on the right-hand branches is different.

**Conditional probability** means the probability of an event given that something else has already happened. In tree diagram questions, this is built in automatically — you just need to adjust the numbers correctly.

### Worked Example 2

Using the same bag (3 red, 2 blue), this time the first counter is **not** replaced. Find the probability that both counters are red.

**Step 1 — First branches remain the same:**
- P(Red) = 3/5
- P(Blue) = 2/5

**Step 2 — Second branches NOW depend on what happened first.** There are now only 4 counters in the bag.

*If the first counter was Red (3 red remaining → now 2 red, 2 blue left):*
- P(Red | first was Red) = 2/4 = 1/2
- P(Blue | first was Red) = 2/4 = 1/2

*If the first counter was Blue (3 red, 1 blue left):*
- P(Red | first was Blue) = 3/4
- P(Blue | first was Blue) = 1/4

**Step 3 — Multiply along the branch for "both red":**
P(Red, Red) = 3/5 × 2/4 = 6/20 = **3/10**

**Step 4 — If the question asked for the probability of one red and one blue (in any order):**
- P(Red, Blue) = 3/5 × 2/4 = 6/20 = 3/10
- P(Blue, Red) = 2/5 × 3/4 = 6/20 = 3/10
- P(one of each) = 3/10 + 3/10 = **3/5**

Again, check all four outcomes sum to 1:
P(RR) + P(RB) + P(BR) + P(BB) = 6/20 + 6/20 + 6/20 + 2/20 = 20/20 = 1 ✓

## Common Mistakes Students Make

- **Keeping the denominator the same on the second branch when there is no replacement.** This is the single most common error. If you pick without replacement, the total drops by 1 after the first pick. Always ask yourself: "Does the first pick change what's left?"
- **Adding instead of multiplying along branches.** You multiply probabilities along a branch (AND), and add the results of separate branches (OR). Mixing these up is an instant mark loss.
- **Forgetting to consider all valid outcomes.** Questions like "at least one red" are easiest solved by finding P(no red) and subtracting from 1 — but students sometimes miss a branch combination when listing outcomes directly.
- **Not checking that branches sum to 1.** If your second-branch probabilities don't add to 1, something is wrong. Catching this before you move on saves you from compounding the error.
- **Writing unsimplified fractions when the question asks for an exact answer.** You won't lose a mark for leaving an answer as 6/20, but simplifying to 3/10 shows confident handling of fractions and avoids any doubt.

## Exam Tips for Tree Diagrams

- **Draw the tree fully before answering any part of the question.** Rushing to calculate the first answer before the diagram is complete leads to errors on later parts. Two minutes drawing the tree neatly is always worth it.
- **Label every branch with its probability and every endpoint with the combined outcome** (e.g. "RR", "RB"). This makes it much easier to identify the right paths later, especially in multi-part questions.
- **For "at least one" questions, use the complement.** P(at least one red) = 1 − P(no red) is almost always quicker than adding three separate outcomes. Examiners award method marks for this approach.
- **AQA and Edexcel both award marks for a correctly structured tree diagram** even if probabilities are wrong. If you draw the tree correctly but make an arithmetic error, you will still earn the method marks — so show your structure clearly.
- **State your working as a multiplication.** Write something like P(RR) = 3/5 × 2/4 = 3/10 on the diagram or in your working. Examiners follow your reasoning, and a single slip is less damaging if your method is visible.
- **If the question says "given that," this is always a conditional probability question.** Identify what you're conditioning on, find the restricted sample space, and recalculate — or use the tree diagram you've already drawn to pick out only the relevant branches.

## Practise Now

The best way to get confident with tree diagrams is to practise exam-style questions with instant feedback. Try tree diagrams and conditional probability questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
