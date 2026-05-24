---
title: "Vectors at GCSE Maths — The Complete Higher Tier Guide"
description: "Everything you need for GCSE vectors at Higher tier — adding and subtracting vectors, position vectors, magnitude, and the vector proof questions that appear at the end of every paper."
date: "16 May 2026"
dateISO: "2026-05-16"
category: "Algebra"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 11
keywords: ["vectors gcse", "vectors gcse higher", "gcse vector proof", "vector geometry gcse", "column vectors gcse", "position vectors gcse", "gcse maths vectors revision"]
---

Vectors are one of the most consistently feared topics on GCSE Higher tier maths. The reason is not that vectors are particularly difficult — the operations themselves are not — it is that the questions at the end of the paper combine vectors with geometric reasoning in a way most students do not practise enough. This guide takes you from "what is a vector" through to the full proof questions worth 5 or 6 marks at the back of the Higher paper.

## What Is a Vector?

A vector is a quantity that has both a **size** (magnitude) and a **direction**. You can think of it as an arrow pointing from one place to another.

This is in contrast to a **scalar**, which has size only. The number 5 is a scalar. "5 metres east" is a vector.

We write vectors in different ways:

- **Bold lowercase letters:** **a**, **b**
- **Letters with arrows:** AB with an arrow above it (a vector going from point A to point B)
- **Column vectors:** (3 over 2) — three units right, two units up

GCSE Maths Higher uses all three notations. You must be comfortable converting between them.

## Column Vectors — The Foundation

A column vector with top entry x and bottom entry y describes a translation: x units right (or left if negative) and y units up (or down if negative).

### Example

The vector (4 over −3) means: 4 units right, 3 units down.

### Adding Column Vectors

To add two column vectors, add the top entries together and add the bottom entries together.

(2, 5) + (3, −1) = (5, 4)

Geometrically, this is saying: do one translation, then the other, and the result is the combined translation.

### Subtracting Column Vectors

Subtract entry by entry, same as adding.

(6, 2) − (4, 5) = (2, −3)

### Multiplying a Vector by a Scalar

When you multiply a vector by a number (a scalar), every entry gets multiplied by that number.

3 × (2, −1) = (6, −3)

Geometrically, multiplying by 3 stretches the vector to be three times longer in the same direction. Multiplying by −1 reverses the direction.

## Magnitude of a Vector

The magnitude of a vector is its length. For a column vector with entries x and y:

**|v| = √(x² + y²)**

This is just Pythagoras' theorem applied to the right-angled triangle formed by the x and y components.

### Example

The magnitude of (3, 4) is √(3² + 4²) = √25 = **5**.

This is one of the easier vector questions to spot — it usually comes as a 2-mark warm-up before the harder questions. Do not lose easy marks here.

## Position Vectors

A **position vector** describes where a point is, relative to the origin (0, 0).

If point A is at coordinates (3, 5), its position vector is OA = (3, 5).

### Finding a Vector Between Two Points

This is the most-tested vector skill on the Higher paper. To find the vector from A to B:

**AB = OB − OA**

In words: position vector of the destination minus position vector of the starting point.

### Example

A is at (2, 1) and B is at (7, 4). Find AB.

AB = (7, 4) − (2, 1) = (5, 3)

This says: to get from A to B you move 5 right and 3 up.

## Vectors in Geometric Proofs

This is where vectors questions become the 5–6 mark beasts at the end of the Higher paper. The setup is always similar:

- You are given a parallelogram, triangle or quadrilateral
- Two of the sides are labelled with vector letters like **a** and **b**
- Points are marked on the sides — usually midpoints or points that divide a side in a ratio
- You are asked to find vectors expressed in terms of **a** and **b**
- The final part asks you to prove three points are collinear or that two lines are parallel

The good news: every one of these proofs uses the same handful of ideas. Once you have the toolkit, the proofs become almost routine.

### The Toolkit — Five Ideas You Need

**1. Reversing a vector.** If AB = **a**, then BA = **−a**.

**2. Splitting a journey.** To get from A to C through B, you can go A → B → C. So AC = AB + BC.

**3. Midpoint of a line.** If M is the midpoint of AB, then AM = ½ × AB.

**4. Dividing in a ratio.** If P divides AB in the ratio 1:2 (so P is one-third of the way along), then AP = ⅓ × AB.

**5. Parallel vectors.** Two vectors are parallel if one is a scalar multiple of the other. In symbols: if XY = k × PQ for some number k, then XY is parallel to PQ. This is the key fact used in collinearity and parallel-line proofs.

### Worked Example — Full Vector Proof

OACB is a parallelogram. OA = **a**, OB = **b**. M is the midpoint of AC.

**(a) Find OC in terms of a and b.**

In a parallelogram OACB, OC is the diagonal. To get from O to C, go from O to A then A to C.

AC = **b** (because OACB is a parallelogram, so AC is parallel to OB and the same length)

OC = OA + AC = **a + b**

**(b) Find OM in terms of a and b.**

M is the midpoint of AC.

AM = ½ × AC = ½**b**

OM = OA + AM = **a + ½b**

**(c) Express AB in terms of a and b.**

AB = AO + OB = −**a** + **b** = **b − a**

The key technique to remember: **express both vectors in terms of a and b, then compare. If they are equal, the points are the same. If one is a scalar multiple of the other, the lines are parallel. If they share a starting point and are parallel, the three points are collinear.**

## Common Vector Proof Question Types

Across AQA, Edexcel and OCR Higher papers, the same three question types appear again and again:

**Show that two vectors are parallel.** Express both vectors in terms of **a** and **b**. Show that one is a scalar multiple of the other (e.g. XY = 2 × PQ).

**Show that three points are collinear.** Express two vectors that share a starting point (e.g. AB and AC). Show one is a scalar multiple of the other. Because they share a starting point, this means the three points lie on the same straight line.

**Find an unknown ratio.** A point divides a line in some ratio you need to find. Set up a vector equation with the unknown ratio as a variable, then equate components.

For every one of these, the method is: express in terms of **a** and **b**, then compare. There is no other trick.

## Where Students Lose Marks on Vectors

**Sign errors.** Going from A to B is **a**; going from B to A is −**a**. Get the direction wrong and the entire proof falls apart.

**Forgetting to factorise out a scalar.** If you end up with XY = 2**a** + 4**b** and PQ = **a** + 2**b**, you need to spot that the first is exactly 2 times the second. Always factorise.

**Not using vector notation in your answer.** Write your answer with bold letters or vector arrows. Examiners reward this clarity, and on the last mark of the proof they want to see vector reasoning, not just the right number.

**Skipping the conclusion.** After your calculation, finish with a sentence: "Therefore XY is a scalar multiple of PQ, so XY is parallel to PQ." That sentence is worth a mark.

## Quick Self-Check Questions

Before you tackle a full vector proof, make sure you can answer these in under 30 seconds each:

1. If AB = (4, −2), what is BA?
2. The midpoint of OP, where O is the origin and P is at (8, 6) — what is its position vector?
3. Magnitude of (5, 12)?
4. If XY = 3**a** − 2**b** and YZ = 6**a** − 4**b**, are XY and YZ parallel? Are X, Y, Z collinear?

**Answers:** (1) (−4, 2); (2) (4, 3); (3) 13; (4) Yes, YZ = 2 × XY so they are parallel. They share the point Y, so X, Y, Z are collinear.

If you can answer those four cleanly, you have the foundations to tackle the full proof questions. If any of them tripped you up, [practise targeted vector questions with instant marking](/learn) before moving on.

## What to Practise Next

Once you are confident with the vector toolkit, work through:

- [Simultaneous equations](/blog/simultaneous-equations-gcse) — they share methods with vector component equations
- [Pythagoras' theorem](/blog/pythagoras-theorem-gcse) — used in every magnitude calculation
- [Trigonometry](/blog/trigonometry-gcse-maths) — vectors and trig often combine in the last question on the paper

For vector questions specifically, the only way to get fast is repetition. Do five vector proofs a week from now until your exam. By the time you sit the paper, the last question will feel familiar.

---

[Practise GCSE Higher vector questions with instant marking →](/learn) — free for every student.
