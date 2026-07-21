---
title: "Vectors GCSE Maths: Magnitude, Direction and Proof Step by Step"
description: "A complete guide to vectors in GCSE Maths — column vectors, magnitude, scalar multiplication, and vector proof fully explained with worked examples."
date: "21 July 2026"
dateISO: "2026-07-21"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 9
keywords: ["vectors gcse maths", "column vectors gcse", "vector proof gcse maths", "how to do vectors gcse", "gcse maths vectors higher tier"]
---

Vectors appear exclusively on the Higher tier of every major GCSE board — AQA 8300, Edexcel 1MA1, and OCR J560 all include them on Paper 2 or Paper 3. A typical vectors question is worth 4–6 marks and combines arithmetic, magnitude, and proof in a single block. It can feel intimidating, but the method is very structured: once you know the steps, the marks follow.

## What You Need to Know First

- A **vector** describes a movement — it has both size (magnitude) and direction, unlike a scalar which has size only
- Vectors are written as **bold letters** (**a**, **b**) or as column vectors like $\binom{3}{-2}$ (3 right, 2 down)
- A negative vector **reverses the direction**: if OA = **a**, then AO = −**a**
- You need **Pythagoras' theorem** to find the magnitude (length) of a vector
- Two vectors are **parallel** if one is a scalar multiple of the other: 3**a** and 12**a** are parallel
- Three points are **collinear** (lie on a straight line) if one connecting vector is a scalar multiple of another and they share a point

## Column Vectors and Vector Arithmetic

A column vector $\binom{x}{y}$ means x units right and y units up. Negative values mean left and down.

**Adding and subtracting vectors** is done component by component — top with top, bottom with bottom. **Multiplying by a scalar** scales each component by that number.

**Worked Example 1**

Let **p** = $\binom{4}{-1}$ and **q** = $\binom{-2}{3}$.

Find **p** + **q**, **p** − **q**, and 3**p**.

**p** + **q** = $\binom{4 + (-2)}{-1 + 3}$ = $\binom{2}{2}$

**p** − **q** = $\binom{4 − (-2)}{-1 − 3}$ = $\binom{6}{-4}$

3**p** = $\binom{3 \times 4}{3 \times (-1)}$ = $\binom{12}{-3}$

### The Triangle Rule

The most important tool for vector problems is the **triangle rule**:

> To get from A to C, you can go A → B → C:   **AC = AB + BC**

You can always find a vector by writing it as a path through points you already know. This is the foundation of every vector proof at GCSE.

For example, if you know OA = **a** and OB = **b**, then:

AB = AO + OB = −**a** + **b** = **b** − **a**

You must go *from* A *to* O first (that's −**a**, because OA = **a** so AO = −**a**), then *from* O *to* B (that's **b**).

## Magnitude of a Vector

The **magnitude** (or modulus) of a vector is its length. For a column vector $\binom{x}{y}$:

> |**v**| = √(x² + y²)

This is Pythagoras — the horizontal component is one leg of a right-angled triangle, the vertical component is the other leg, and the magnitude is the hypotenuse.

**Worked Example 2**

Find the magnitude of **a** = $\binom{5}{-12}$.

|**a**| = √(5² + (−12)²)

= √(25 + 144)

= √169

= **13**

Always check whether the surd simplifies to a whole number. GCSE questions are almost always designed to give a clean answer — if yours doesn't, check your arithmetic.

**A second example:** Find the magnitude of **v** = $\binom{-3}{4}$.

|**v**| = √((-3)² + 4²) = √(9 + 16) = √25 = **5**

### Finding a Unit Vector

A **unit vector** has length 1 and points in the same direction as the original vector. To find it, divide each component by the magnitude:

Unit vector of **a** = $\dfrac{1}{13}\binom{5}{-12}$ = $\binom{\frac{5}{13}}{-\frac{12}{13}}$

You can verify: √((5/13)² + (12/13)²) = √(25/169 + 144/169) = √(169/169) = 1 ✓

## Vector Proof

Vector proof questions are the most heavily marked part of the vectors topic. They ask you to prove that lines are parallel, that they're equal in length, or that three points are collinear. The approach is always the same:

1. Express the target vector as a path using vectors you know
2. Simplify algebraically
3. Compare to another vector — if it's a scalar multiple, the lines are parallel; if they share a point, the points are collinear

**Worked Example 3: Proving Parallel Lines**

OAB is a triangle. OA = **a** and OB = **b**.

P is the midpoint of OA and Q is the midpoint of AB.

Show that PQ is parallel to OB and find the ratio PQ:OB.

**Find AB:**

AB = AO + OB = −**a** + **b** = **b** − **a**

**Find PQ:**

PQ = PA + AQ

PA = ½OA = ½**a** (P is the midpoint of OA, so PO = ½**a** and OP = ½**a** — but we need PA = AO + OP... let's use a direct path)

Actually: PQ = PO + OA + AQ
PO = −OP = −½**a**
AQ = ½AB = ½(**b** − **a**)
PQ = −½**a** + **a** + ½**b** − ½**a** = ½**b**

**Conclusion:**

PQ = ½**b** and OB = **b**, so PQ = ½ OB.

Since PQ is a scalar multiple of OB, **PQ is parallel to OB**.

The ratio PQ:OB = ½:1 = **1:2**.

This is the midpoint theorem — the line joining the midpoints of two sides of a triangle is parallel to the third side and half its length. It comes up in almost every GCSE vectors paper.

**Worked Example 4: Proving Collinearity**

OAB is a triangle. OA = **a** and OB = **b**.

C is a point such that OC = ⅔**a** + ⅓**b**.

Show that A, C, and B are collinear.

**Find AB:**

AB = AO + OB = −**a** + **b** = **b** − **a**

**Find AC:**

AC = AO + OC = −**a** + ⅔**a** + ⅓**b** = −⅓**a** + ⅓**b** = ⅓(**b** − **a**)

**Conclusion:**

AC = ⅓(**b** − **a**) = ⅓ AB

Since AC = ⅓ AB:
- AC is **parallel** to AB (scalar multiple)
- A is a **common point** on both vectors

Therefore A, C, and B are collinear — they all lie on the same straight line.

You can also state that C divides AB in the ratio AC:CB = 1:2 (since C is one-third of the way from A to B).

## Common Mistakes Students Make

- **Forgetting that AO = −OA.** This reversal is essential — if OA = **a**, then AO = −**a**. Getting the direction wrong invalidates your entire proof.
- **Adding the wrong vectors in the path.** Each step in your chain must flow in one direction. Write arrows above your paths as you go: A→O→B, not A→O and B→O.
- **Confusing position vectors and displacement vectors.** OA = **a** is a displacement from O to A. The position vector of A is also **a** if O is the origin. Know which one the question is using.
- **Stopping after "parallel."** For collinearity, you must state both that the vectors are parallel *and* that the points share a common point. Many students lose the final mark by writing only half the conclusion.
- **Sign errors in subtraction.** When simplifying expressions like **a** + ½(**b** − **a**), expand the bracket fully before collecting terms: **a** + ½**b** − ½**a** = ½**a** + ½**b**.

## Exam Tips for Vectors

- **Write the path first, then substitute.** Always write "XY = XO + OY" before substituting the actual vectors. This habit prevents direction errors and earns method marks even if your arithmetic slips.
- **Label your vectors clearly.** Use bold (**a**, **b**) or underline (a, b) consistently throughout. Examiners mark what you write — an ambiguous letter may not earn the mark.
- **On AQA 8300, proof questions award marks for method even with arithmetic errors.** If your final vector is wrong but your path was set up correctly, you will often still pick up 2 out of 3 marks. Show every step.
- **Check whether the question asks you to "find" or "prove."** Finding OC requires a calculation and a vector as your answer. Proving requires a calculation *and* a written conclusion stating what it shows.
- **Fractions are common — work carefully.** Expressions like ⅔**a** − ⅓**a** = ⅓**a** are easy to rush. Write each fraction on its own line before combining.

## Practise Now

The best way to get confident with vectors is to practise exam-style questions with instant feedback. Try vectors questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
