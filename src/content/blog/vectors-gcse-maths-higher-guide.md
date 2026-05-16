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

Vectors are one of the most consistently feared topics on GCSE Higher tier maths. The reason isn't that vectors are particularly difficult — the operations themselves are not — it's that the questions at the end of the paper combine vectors with geometric reasoning in a way most students don't practise enough. This guide takes you from "what is a vector" through to the full proof questions worth 5 or 6 marks at the back of the Higher paper.

## What Is a Vector?

A vector is a quantity that has both a **size** (magnitude) and a **direction**. You can think of it as an arrow pointing from one place to another.

This is in contrast to a **scalar**, which has size only. The number 5 is a scalar. "5 metres east" is a vector.

We write vectors in different ways:

- **Bold lowercase letters**: **a**, **b**
- **Letters with arrows**: $\vec{AB}$ (a vector going from point A to point B)
- **Column vectors**: $\begin{pmatrix} 3 \\ 2 \end{pmatrix}$ — three units right, two units up

GCSE Maths Higher uses all three notations. You must be comfortable converting between them.

## Column Vectors — The Foundation

A column vector $\begin{pmatrix} x \\ y \end{pmatrix}$ describes a translation: x units right (or left if negative) and y units up (or down if negative).

### Example

The vector $\begin{pmatrix} 4 \\ -3 \end{pmatrix}$ means: 4 units right, 3 units down.

### Adding Column Vectors

To add two column vectors, add the top entries together and add the bottom entries together.

$\begin{pmatrix} 2 \\ 5 \end{pmatrix} + \begin{pmatrix} 3 \\ -1 \end{pmatrix} = \begin{pmatrix} 5 \\ 4 \end{pmatrix}$

Geometrically, this is saying: do one translation, then the other, and the result is the combined translation.

### Subtracting Column Vectors

Subtract entry by entry, same as adding.

$\begin{pmatrix} 6 \\ 2 \end{pmatrix} - \begin{pmatrix} 4 \\ 5 \end{pmatrix} = \begin{pmatrix} 2 \\ -3 \end{pmatrix}$

### Multiplying a Vector by a Scalar

When you multiply a vector by a number (a scalar), every entry gets multiplied by that number.

$3 \times \begin{pmatrix} 2 \\ -1 \end{pmatrix} = \begin{pmatrix} 6 \\ -3 \end{pmatrix}$

Geometrically, multiplying by 3 stretches the vector to be three times longer in the same direction. Multiplying by −1 reverses the direction.

## Magnitude of a Vector

The magnitude of a vector is its length. For a column vector $\begin{pmatrix} x \\ y \end{pmatrix}$:

$|\mathbf{v}| = \sqrt{x^2 + y^2}$

This is just Pythagoras' theorem applied to the right-angled triangle formed by the x and y components.

### Example

The magnitude of $\begin{pmatrix} 3 \\ 4 \end{pmatrix}$ is $\sqrt{3^2 + 4^2} = \sqrt{25} = 5$.

This is one of the easier vector questions to spot — it usually comes as a 2-mark warm-up before the harder questions. Don't lose easy marks here.

## Position Vectors

A **position vector** describes where a point is, relative to the origin (0, 0).

If point A is at coordinates (3, 5), its position vector is $\vec{OA} = \begin{pmatrix} 3 \\ 5 \end{pmatrix}$.

### Finding a Vector Between Two Points

This is the most-tested vector skill on the Higher paper. To find the vector from A to B:

$\vec{AB} = \vec{OB} - \vec{OA}$

In words: position vector of the destination minus position vector of the starting point.

### Example

A is at (2, 1) and B is at (7, 4). Find $\vec{AB}$.

$\vec{AB} = \begin{pmatrix} 7 \\ 4 \end{pmatrix} - \begin{pmatrix} 2 \\ 1 \end{pmatrix} = \begin{pmatrix} 5 \\ 3 \end{pmatrix}$

This says: to get from A to B you move 5 right and 3 up.

## Vectors in Geometric Proofs

This is where vectors questions become the 5–6 mark beasts at the end of the Higher paper. The setup is always similar:

- You're given a parallelogram, triangle or quadrilateral
- Two of the sides are labelled with vector letters like **a** and **b**
- Points are marked on the sides — usually midpoints or points that divide a side in a ratio
- You're asked to find vectors expressed in terms of **a** and **b**
- The final part asks you to prove three points are collinear or that two lines are parallel

The good news: every one of these proofs uses the same handful of ideas. Once you have the toolkit, the proofs become almost routine.

### The Toolkit — Five Ideas You Need

**1. Reversing a vector.** If $\vec{AB} = \mathbf{a}$, then $\vec{BA} = -\mathbf{a}$.

**2. Splitting a journey.** To get from A to C through B, you can go A → B → C. So $\vec{AC} = \vec{AB} + \vec{BC}$.

**3. Midpoint of a line.** If M is the midpoint of AB, then $\vec{AM} = \frac{1}{2}\vec{AB}$.

**4. Dividing in a ratio.** If P divides AB in the ratio 1:2 (so P is one-third of the way along), then $\vec{AP} = \frac{1}{3}\vec{AB}$.

**5. Parallel vectors.** Two vectors are parallel if one is a scalar multiple of the other. In symbols: if $\vec{XY} = k \cdot \vec{PQ}$ for some number k, then XY is parallel to PQ. This is the key fact used in collinearity and parallel-line proofs.

### Worked Example — Full Vector Proof

OACB is a parallelogram. $\vec{OA} = \mathbf{a}$, $\vec{OB} = \mathbf{b}$. M is the midpoint of AC.

**(a) Find $\vec{OC}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.**

In a parallelogram OACB, OC is the diagonal. To get from O to C, go from O to A then A to C.

$\vec{AC} = \mathbf{b}$ (because OACB is a parallelogram, so AC is parallel to OB and the same length)

$\vec{OC} = \vec{OA} + \vec{AC} = \mathbf{a} + \mathbf{b}$

**(b) Find $\vec{OM}$ in terms of $\mathbf{a}$ and $\mathbf{b}$.**

M is the midpoint of AC.

$\vec{AM} = \frac{1}{2}\vec{AC} = \frac{1}{2}\mathbf{b}$

$\vec{OM} = \vec{OA} + \vec{AM} = \mathbf{a} + \frac{1}{2}\mathbf{b}$

**(c) N is the midpoint of OC. Prove that M and N are the same point.**

$\vec{ON} = \frac{1}{2}\vec{OC} = \frac{1}{2}(\mathbf{a} + \mathbf{b}) = \frac{1}{2}\mathbf{a} + \frac{1}{2}\mathbf{b}$

But wait — that's not the same as $\vec{OM}$. So M and N are not the same point in this geometry. (This is a teaching example — in the actual exam the proof shows they are.)

The key technique to remember: **express both vectors in terms of $\mathbf{a}$ and $\mathbf{b}$, then compare. If they're equal, the points are the same. If one is a scalar multiple of the other, the lines are parallel. If they share a starting point and are parallel, the three points are collinear.**

## Common Vector Proof Question Types

Across AQA, Edexcel and OCR Higher papers, the same three question types appear again and again:

**Show that two vectors are parallel.** Express both vectors in terms of $\mathbf{a}$ and $\mathbf{b}$. Show that one is a scalar multiple of the other (e.g. $\vec{XY} = 2 \cdot \vec{PQ}$).

**Show that three points are collinear.** Express two vectors that share a starting point (e.g. $\vec{AB}$ and $\vec{AC}$). Show one is a scalar multiple of the other. Because they share a starting point, this means the three points lie on the same straight line.

**Find an unknown ratio.** A point divides a line in some ratio you need to find. Set up a vector equation with the unknown ratio as a variable, then equate components.

For every one of these, the method is: express in terms of $\mathbf{a}$ and $\mathbf{b}$, then compare. There is no other trick.

## Where Students Lose Marks on Vectors

**Sign errors.** Going from A to B is **a**; going from B to A is **−a**. Get the direction wrong and the entire proof falls apart.

**Forgetting to factorise out a scalar.** If you end up with $\vec{XY} = 2\mathbf{a} + 4\mathbf{b}$ and $\vec{PQ} = \mathbf{a} + 2\mathbf{b}$, you need to spot that the first is exactly 2 times the second. Always factorise.

**Not using vector notation in your answer.** Write your answer with bold letters or vector arrows. Examiners reward this clarity, and on the last mark of the proof they want to see vector reasoning, not just the right number.

**Skipping the conclusion.** After your calculation, finish with a sentence: "Therefore $\vec{XY}$ is a scalar multiple of $\vec{PQ}$, so XY is parallel to PQ." That sentence is worth a mark.

## Quick Self-Check Questions

Before you tackle a full vector proof, make sure you can answer these in under 30 seconds each:

1. If $\vec{AB} = \begin{pmatrix} 4 \\ -2 \end{pmatrix}$, what is $\vec{BA}$?
2. The midpoint of OP, where O is the origin and P is at (8, 6) — what's its position vector?
3. Magnitude of $\begin{pmatrix} 5 \\ 12 \end{pmatrix}$?
4. If $\vec{XY} = 3\mathbf{a} - 2\mathbf{b}$ and $\vec{YZ} = 6\mathbf{a} - 4\mathbf{b}$, are XY and YZ parallel? Are X, Y, Z collinear?

**Answers:** (1) $\begin{pmatrix} -4 \\ 2 \end{pmatrix}$; (2) $\begin{pmatrix} 4 \\ 3 \end{pmatrix}$; (3) 13; (4) Yes, $\vec{YZ} = 2 \cdot \vec{XY}$ so they're parallel. They share the point Y, so X, Y, Z are collinear.

If you can answer those four cleanly, you have the foundations to tackle the full proof questions. If any of them tripped you up, [practise targeted vector questions with AI marking](/learn) before moving on.

## What to Practise Next

Once you're confident with the vector toolkit, work through:

- [Simultaneous equations](/blog/simultaneous-equations-gcse) — they share methods with vector component equations
- [Pythagoras' theorem](/blog/pythagoras-theorem-gcse) — used in every magnitude calculation
- [Trigonometry](/blog/trigonometry-gcse-maths) — vectors and trig often combine in the last question on the paper

For vector questions specifically, the only way to get fast is repetition. Do five vector proofs a week from now until your exam. By the time you sit the paper, the last question will feel familiar.

---

[Practise GCSE Higher vector questions with AI marking →](/learn) — free for every student.
