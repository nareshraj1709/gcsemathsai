---
title: "Venn Diagrams and Set Notation GCSE Maths: Union, Intersection and Probability"
description: "Learn to read Venn diagrams and use set notation for GCSE Maths, with union, intersection and probability worked examples."
date: "01 August 2026"
dateISO: "2026-08-01"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 7
keywords: ["venn diagrams gcse maths", "set notation gcse maths", "how to read a venn diagram gcse", "union and intersection gcse", "probability from venn diagram gcse"]
---

Venn diagrams appear in the Statistics and Probability sections of GCSE Maths — usually on Papers 2 or 3 where a calculator is allowed. AQA (8300), Edexcel (1MA1) and OCR (J560) all include them, and at Higher tier you'll also face three-set diagrams and conditional probability. What makes this topic tricky isn't the diagram itself — most students can draw overlapping circles — it's the **set notation** that goes with it, and the careful arithmetic needed to fill in the regions correctly.

## What You Need to Know First

Make sure you're comfortable with:

- Basic probability: P(event) = number of favourable outcomes ÷ total number of outcomes
- Writing probability as a fraction, decimal or percentage
- Listing outcomes systematically (sample space)
- Simplifying fractions
- For Higher tier: conditional probability (the probability of A given B has occurred)

## Understanding Set Notation

**Set notation** is the shorthand language used to describe groups of items. You need to know four symbols for GCSE Maths:

| Symbol | Name | Meaning |
|--------|------|---------|
| ξ | Universal set | All elements being considered |
| A ∪ B | Union | A or B or both |
| A ∩ B | Intersection | A and B (only what's in both) |
| A' | Complement of A | Everything in ξ that is NOT in A |

The **universal set** (ξ) is the boundary of the problem — everything you're considering sits inside it. If ξ = {1, 2, 3, ..., 10}, then no other numbers enter the question.

A useful memory trick: **∪ looks like a cup** — it holds everything in A or B. **∩ looks like an arch** — it only covers the crossing point where A and B overlap.

**Worked Example 1:**

ξ = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}  
A = {2, 4, 6, 8, 10} (even numbers)  
B = {1, 2, 3, 4, 5} (numbers less than 6)

Find each set:

- **A ∪ B** = {1, 2, 3, 4, 5, 6, 8, 10} — everything in A or B (combine both, no repeats)
- **A ∩ B** = {2, 4} — only what appears in both
- **A'** = {1, 3, 5, 7, 9} — numbers in ξ that are not in A
- **(A ∩ B)'** = {1, 3, 5, 6, 7, 8, 9, 10} — everything not in the intersection

Notice that A ∪ B does not mean "A plus B then remove duplicates from a list" — you just list everything that belongs to at least one of the sets, once each.

## Drawing and Completing Venn Diagrams

A Venn diagram uses overlapping circles inside a rectangle. The rectangle is ξ. Each circle represents a set. The overlapping region is A ∩ B. Values that belong to ξ but to neither circle sit outside both circles, inside the rectangle.

### The four regions

| Region | What goes there |
|--------|----------------|
| Left circle only (A only) | In A but not B |
| Overlap | In both A and B (A ∩ B) |
| Right circle only (B only) | In B but not A |
| Outside both circles | In ξ but not in A or B |

### Step-by-step method for completing a Venn diagram from totals

1. Fill in the **intersection** (A ∩ B) first — this anchors everything else.
2. Subtract to find **A only** = total of A − intersection.
3. Subtract to find **B only** = total of B − intersection.
4. Find the **outside** = total of ξ − A only − intersection − B only.
5. Check: all four regions must add up to the total of ξ.

**Worked Example 2:**

In a class of 30 students:
- 18 study French (F)
- 15 study Spanish (S)
- 7 study both languages

Complete the Venn diagram.

Step 1: Intersection = **7** (both French and Spanish)  
Step 2: French only = 18 − 7 = **11**  
Step 3: Spanish only = 15 − 7 = **8**  
Step 4: Neither = 30 − 11 − 7 − 8 = **4**

Check: 11 + 7 + 8 + 4 = 30 ✓

Your completed diagram shows 11 in the left region, 7 in the overlap, 8 in the right region, and 4 outside both circles.

## Using Venn Diagrams for Probability

Once the Venn diagram is complete, probability questions are straightforward: identify which region (or regions) you need, count the values, and divide by the total.

**Worked Example 3** (using the class of 30 students from above):

One student is chosen at random. Find:

**a) P(studies French)**  
= 18/30 = **3/5**  
(Count everyone in the French circle — that's 11 + 7 = 18)

**b) P(studies French but not Spanish)**  
= 11/30  
(Only the French-only region — not the overlap)

**c) P(studies neither language)**  
= 4/30 = **2/15**  
(Only the region outside both circles)

**d) P(F ∪ S) — studies French or Spanish**  
= (11 + 7 + 8)/30 = 26/30 = **13/15**  
(The union covers all three regions inside the circles)

**e) P(F ∩ S) — studies both**  
= 7/30  
(Only the overlap)

### Higher tier — conditional probability

P(A | B) is read as "the probability of A, given that B has occurred". When using a Venn diagram, restrict yourself to set B only — the denominator becomes the total of B, not ξ.

**Worked Example 4:**

Using the same class of 30 students, find P(F | S) — the probability that a student studies French, given that they study Spanish.

There are 15 students who study Spanish. Of those 15, exactly 7 also study French (the overlap).

P(F | S) = 7/15

Notice: the denominator is 15 (the size of set S), not 30 (the full class). This is the most common error on conditional probability questions.

**Worked Example 5:**

The Venn diagram shows results of a survey asking 50 people whether they own a dog (D) or a cat (C):

- D only: 14
- D ∩ C: 9
- C only: 21
- Neither: 6

Check: 14 + 9 + 21 + 6 = 50 ✓

Find P(D' ∩ C) — owns a cat but not a dog.

D' means "not a dog" — so we want people in C but not in D. That's the C only region: 21.

P(D' ∩ C) = 21/50

## Common Mistakes Students Make

- **Double-counting the intersection**: If 7 students study both, the French circle should show 11 + 7 = 18 total, but only 11 goes in the French-only region. Students often write 18 in the left region and 7 in the overlap, which counts the 7 twice and inflates the total.
- **Forgetting the outside region**: After filling in the circles, students forget that some elements of ξ belong to neither set. Always check your four regions sum to the correct total.
- **Confusing A ∪ B with A ∩ B**: Union is the whole shaded area of both circles combined. Intersection is only the overlap in the middle. These are not interchangeable.
- **Wrong denominator in conditional probability**: For P(A | B), use the size of B as the denominator — not the total of ξ. Using the total of ξ instead is the most common Higher-tier error on this topic.
- **Reading P(A ∪ B) as just the overlap**: P(A ∪ B) includes everything inside either circle — all three inner regions, not just the intersection.

## Exam Tips for Venn Diagrams

- **Always fill in the intersection first**: This is the fixed value that everything else is built around. Starting anywhere else leads to errors.
- **Write the check sum in your working**: After completing all four regions, write "total = X + X + X + X = 30 ✓" in your working. If it doesn't add up, you've made an error in one of the subtractions — find it before moving on. AQA and Edexcel both award a mark for a correctly structured diagram even if one region contains a carried-forward error.
- **For set notation questions with no diagram given**, sketch a quick Venn diagram in rough. Even a simple sketch makes the notation concrete and prevents mistakes with complements and unions.
- **Label your regions**: Clearly write the number inside the correct part of each circle. If an examiner can't read where your values sit, they cannot award the mark.
- **At Higher tier, write down which region you're counting**: For probability questions, write the region name (e.g. "F ∩ S = 7") before writing the fraction. This earns the method mark even if you simplify the fraction incorrectly.

## Practise Now

The best way to get confident with Venn diagrams and set notation is to practise exam-style questions with instant feedback. Try Venn diagram questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
