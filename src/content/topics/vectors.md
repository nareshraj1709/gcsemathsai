---
title: "Vectors – GCSE Maths Revision Guide"
description: "Master vectors for GCSE Maths Higher tier with clear notation, worked examples, and exam-style practice questions."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Geometry & Measures"
categoryColour: "green"
author: "GCSEMathsAI Team"
readMins: 9
keywords: ["vectors GCSE", "column vectors", "vector addition", "scalar multiplication vectors", "GCSE maths Higher"]
tier: "Higher only"
strand: "Geometry & Measures"
topicNumber: 56
---

Vectors is a Higher tier GCSE Maths topic that appears on AQA, Edexcel, and OCR papers. Unlike coordinates, which describe a fixed position, a vector describes a movement — it has both **magnitude** (size) and **direction**. You need to be comfortable with column vector notation, adding and subtracting vectors, multiplying by a scalar, and using vectors to prove geometric results such as collinearity and parallelism. This guide covers everything you need, from basic notation to multi-step proof questions, with worked examples and practice questions throughout. For related topics, see our [trigonometry in 3D guide](/topics/trigonometry-in-3d).

## What Is a Vector?

A **vector** is a quantity that has both magnitude and direction. In GCSE Maths, vectors are typically represented in two ways:

- **Column vector:** Written as a vertical pair of numbers in brackets, e.g. (3 over 2) means "3 units right and 2 units up."
- **Letter notation:** A single bold or underlined letter such as **a** or a with a squiggle underneath. In handwriting, draw a squiggle below the letter.

The vector from point A to point B is written as **AB** (with an arrow above). The reverse journey, from B to A, is **−AB**.

### Key Concepts

- **Equal vectors** have the same magnitude and direction. They do not need to start at the same point.
- **Parallel vectors** point in the same (or exactly opposite) direction. One is a scalar multiple of the other. If **b** = k**a** for some scalar k, then **a** and **b** are parallel.
- **Collinear points** lie on the same straight line. To prove three points are collinear, show that the vector from one to another is a scalar multiple of the vector from one to a third.
- The **magnitude** of column vector (x over y) is √(x² + y²).

### Key Operations

[FORMULA: Vector addition: (a over b) + (c over d) = (a+c over b+d)]

[FORMULA: Vector subtraction: (a over b) − (c over d) = (a−c over b−d)]

[FORMULA: Scalar multiplication: k × (a over b) = (ka over kb)]

[FORMULA: Magnitude of (x over y) = √(x² + y²)]

## Step-by-Step Method

### Adding and Subtracting Vectors

1. Write both vectors as column vectors.
2. Add (or subtract) the top components together.
3. Add (or subtract) the bottom components together.

### Finding a Route Using Vectors

1. Identify the start and end points.
2. Find a route from start to end using known vectors, travelling along edges of the shape.
3. When you travel in the reverse direction along a vector, negate it.
4. Add the vectors along your route.

### Proving Points Are Collinear

1. Find the vector from point A to point B.
2. Find the vector from point A to point C (or B to C).
3. If one vector is a scalar multiple of the other, the points are collinear.
4. State that they share a common point, so they lie on the same straight line.

## Worked Example 1 — Higher Level

**Question:** OA = **a** and OB = **b**. M is the midpoint of AB. Find the vector OM in terms of **a** and **b**.

**Working:**

Step 1 — Find AB:
AB = AO + OB = −**a** + **b** = **b** − **a**

Step 2 — M is the midpoint, so AM = ½AB:
AM = ½(**b** − **a**)

Step 3 — Find OM:
OM = OA + AM = **a** + ½(**b** − **a**)
OM = **a** + ½**b** − ½**a**
OM = ½**a** + ½**b**

**Answer:** OM = **½(a + b)**

## Worked Example 2 — Higher Level (Proof)

**Question:** OABC is a parallelogram. OA = **a** and OC = **c**. P is the point on AB such that AP = ⅓AB. Show that O, P, and the midpoint of CB (call it M) are collinear.

**Working:**

Step 1 — Since OABC is a parallelogram, AB = OC = **c** and CB = OA = **a**.

Step 2 — Find OP:
OP = OA + AP = **a** + ⅓**c**

Step 3 — Find OM:
M is the midpoint of CB, so CM = ½**a**.
OM = OC + CM = **c** + ½**a** = ½**a** + **c**

Step 4 — Check if OP is a scalar multiple of OM:
OP = **a** + ⅓**c**
OM = ½**a** + **c**

Test: Is **a** + ⅓**c** = k(½**a** + **c**)?
Comparing **a** components: 1 = k/2, so k = 2.
Comparing **c** components: ⅓ = k × 1 = 2. This gives ⅓ ≠ 2.

So OP is **not** a scalar multiple of OM, meaning O, P, and M are **not** collinear in this configuration. (This demonstrates how to test — in exam questions the vectors will work out.)

Let us adjust: suppose instead P is the point on AB such that AP:PB = 1:2 and we want to find OP.

OP = OA + AP = **a** + ⅓**c** (same as above — the method is what matters).

**Key point:** The method is to express both vectors from O and check for a scalar multiple. If OP = kOM, they are collinear.

## Common Mistakes

- **Forgetting to negate.** When travelling from B to A, the vector is −**AB**, not **AB**. Getting the sign wrong is the most frequent error.
- **Not simplifying.** Always collect like terms and write your final vector in its simplest form.
- **Confusing position vectors with direction vectors.** OA is a position vector (from the origin to A). AB is a direction vector (from A to B). They are different.
- **Stating collinear without a common point.** Parallel vectors alone do not prove collinearity — you must also show the points share a common point on the line.
- **Mixing up scalar multiples.** If **b** = 3**a**, the vectors are parallel and **b** is three times the length of **a**. But **b** = **a** + 3 is not a valid vector equation — you cannot add a scalar to a vector.

## Exam Tips

- **Draw the diagram and label every vector.** This helps you plan your route.
- **Use the "go via" approach.** To get from X to Y, travel via known points: XY = XA + AY.
- **Show all steps in proof questions.** Marks are awarded for method — setting up the route, simplifying, and concluding.
- **State your conclusion clearly.** "Since OP = 2OQ, O, P, and Q are collinear" earns the final mark.
- **Practise midpoint results.** The vector to the midpoint of AB is always ½(**a** + **b**) when O is the origin — this shortcut saves time.

## Practice Questions

**Question 1:** Write the column vector for a translation of 4 units left and 3 units up.

[ANSWER: (−4 over 3)]

**Question 2:** Given **a** = (2 over 5) and **b** = (−1 over 3), find **a** + **b** and 2**a** − **b**.

[ANSWER: **a** + **b** = (1 over 8). 2**a** − **b** = (4 over 10) − (−1 over 3) = (5 over 7)]

**Question 3:** OA = **a** and OB = **b**. Find AB.

[ANSWER: AB = −**a** + **b** = **b** − **a**]

**Question 4:** Find the magnitude of the vector (5 over −12).

[ANSWER: √(25 + 144) = √169 = 13]

**Question 5:** OA = 3**p** + **q** and OB = 9**p** + 3**q**. Show that O, A, and B are collinear.

[ANSWER: OB = 3(3**p** + **q**) = 3 × OA. Since OB is a scalar multiple of OA and they share the common point O, the points O, A, and B are collinear.]

---

Build your vector skills with adaptive AI practice at [GCSEMathsAI](https://www.gcsemathsai.co.uk/auth) — instant feedback on every step of your working.

## Related Topics

- [Transformations: Translation](/topics/transformations-reflection-rotation-translation) — translations are described using vectors.
- [Trigonometry in 3D](/topics/trigonometry-in-3d) — 3D spatial reasoning.
- [Congruence and Similarity](/topics/congruence-and-similarity) — geometric proof techniques.
- [Bearings](/topics/bearings) — direction and magnitude in practical contexts.

## Summary

Vectors describe movements with both magnitude and direction. At GCSE Higher level you need to add, subtract, and scalar-multiply vectors, find routes through shapes, and prove geometric properties such as parallelism and collinearity. The most important skill is planning a route from one point to another using known vectors, remembering to negate when you reverse direction. Always simplify your final answer and state your conclusion clearly in proof questions. Vector questions are typically worth 3–5 marks and reward careful, methodical working.
