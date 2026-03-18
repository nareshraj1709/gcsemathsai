---
title: "Sine & Cosine Rules – GCSE Higher Guide"
description: "Master the sine rule and cosine rule for GCSE Higher Maths with step-by-step methods, worked examples and practice questions."
date: "18 March 2026"
dateISO: "2026-03-18"
category: "Geometry"
categoryColour: "green"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["sine rule GCSE", "cosine rule GCSE", "sine and cosine rule", "non right angled triangles GCSE", "area of triangle sine rule"]
tier: "Higher only"
strand: "Geometry"
topicNumber: 50
---

The sine and cosine rules extend trigonometry beyond right-angled triangles — and they are among the most important topics on the GCSE Higher paper. While SOHCAHTOA only works when there is a 90° angle, the sine and cosine rules work for **any triangle**. AQA, Edexcel and OCR all include these rules on their Higher papers, often as 4- or 5-mark questions. This guide explains when to use each rule, walks through the method step by step, provides worked examples, highlights common errors and gives you practice questions to build exam-ready confidence. For the foundations of trigonometry, see our [trigonometry blog post](/blog/trigonometry-gcse-maths), and for a formula reference visit our [GCSE Maths formulas guide](/blog/gcse-maths-formulas-you-must-know).

## What Are the Sine and Cosine Rules?

Both rules relate the sides and angles of **any triangle** (not just right-angled ones). In a triangle where the sides are a, b, c and the opposite angles are A, B, C:

### The Sine Rule

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

Or flipped (when finding an angle):

$$\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}$$

### The Cosine Rule

**Finding a side:**
$$a^2 = b^2 + c^2 - 2bc\cos A$$

**Finding an angle:**
$$\cos A = \frac{b^2 + c^2 - a^2}{2bc}$$

### Area of a Triangle Using Sine

$$\text{Area} = \frac{1}{2}ab\sin C$$

where a and b are two sides and C is the **included angle** (the angle between them).

### Which Formulas Are Given?

On AQA and Edexcel, all three formulas above are provided on the formula sheet. However, you still need to know **when and how** to use them.

---

## Step-by-Step Method

### When to Use the Sine Rule

Use the sine rule when you have:
- **Two angles and one side** (AAS or ASA) — to find a missing side.
- **Two sides and a non-included angle** (SSA) — to find a missing angle. (Beware: this can give an ambiguous case.)

### When to Use the Cosine Rule

Use the cosine rule when you have:
- **Two sides and the included angle** (SAS) — to find the third side.
- **Three sides** (SSS) — to find a missing angle.

### Step-by-Step: Sine Rule (Finding a Side)

1. Identify two angle-side pairs (one complete, one with the missing side).
2. Set up a/sin A = b/sin B using those pairs.
3. Substitute known values.
4. Solve for the unknown side.

### Step-by-Step: Sine Rule (Finding an Angle)

1. Identify two side-angle pairs.
2. Set up sin A/a = sin B/b.
3. Substitute and solve for sin of the unknown angle.
4. Use sin⁻¹ to find the angle.

### Step-by-Step: Cosine Rule (Finding a Side)

1. Identify the two known sides and the included angle.
2. Substitute into a² = b² + c² − 2bc cos A.
3. Calculate a².
4. Take the square root.

### Step-by-Step: Cosine Rule (Finding an Angle)

1. You know all three sides.
2. Substitute into cos A = (b² + c² − a²) / (2bc).
3. Calculate cos A.
4. Use cos⁻¹ to find the angle.

---

## Worked Example 1 — Sine Rule

*In triangle PQR, angle P = 42°, angle Q = 73° and side p (opposite P) = 9 cm. Find side q (opposite Q).*

**Step 1:** Use the sine rule: p/sin P = q/sin Q.

**Step 2:** 9/sin 42° = q/sin 73°.

**Step 3:** 9/0.6691 = q/0.9563.

**Step 4:** 13.451 = q/0.9563.

**Step 5:** q = 13.451 × 0.9563 = **12.9 cm** (1 d.p.).

---

## Worked Example 2 — Cosine Rule

*In triangle ABC, AB = 8 cm, AC = 11 cm and angle A = 55°. Find BC.*

**Step 1:** The included angle is A, so we are finding side a (BC), with b = 11 and c = 8 (or vice versa — the labelling is flexible).

**Step 2:** a² = b² + c² − 2bc cos A = 11² + 8² − 2(11)(8) cos 55°.

**Step 3:** a² = 121 + 64 − 176 × 0.5736 = 185 − 100.95 = 84.05.

**Step 4:** a = √84.05 = **9.2 cm** (1 d.p.).

### Area Example

*Find the area of triangle ABC above.*

$$\text{Area} = \frac{1}{2} \times 11 \times 8 \times \sin 55° = 44 \times 0.8192 = \textbf{36.0 cm}^2 \text{ (1 d.p.)}$$

### Finding an Angle with the Cosine Rule

*In a triangle, the sides are 7 cm, 9 cm and 12 cm. Find the largest angle.*

The largest angle is opposite the longest side (12 cm). Let a = 12, b = 7, c = 9.

$$\cos A = \frac{7^2 + 9^2 - 12^2}{2 \times 7 \times 9} = \frac{49 + 81 - 144}{126} = \frac{-14}{126} = -0.1111$$

$$A = \cos^{-1}(-0.1111) = \textbf{96.4°} \text{ (1 d.p.)}$$

The negative cosine confirms the angle is obtuse (greater than 90°).

---

## Common Mistakes

- **Using the wrong rule.** If you have the included angle and two sides, use cosine. If you have a complete angle-side pair, use sine. Choosing the wrong one makes the question impossible.
- **Mislabelling sides and angles.** Side a must be opposite angle A, side b opposite angle B, and so on. Getting this wrong produces an incorrect answer.
- **Forgetting to square root in the cosine rule.** The formula gives a² — do not forget the final square root.
- **Not recognising the obtuse angle.** If cos A is negative, the angle is obtuse. Some students panic — this is perfectly normal and expected.
- **The ambiguous case.** When using the sine rule to find an angle (SSA), there can be two possible triangles. At GCSE this is rare but be aware of it.
- **Calculator in radian mode.** Ensure your calculator is set to degrees.

---

## Exam Tips

- **Decide which rule to use before writing anything.** Draw a quick sketch, label the sides and angles, and check: do I have SAS or SSS (cosine rule) or a matching pair (sine rule)?
- **Copy the formula from the formula sheet** into your working. This shows the examiner which rule you are applying.
- **For area questions**, use ½ab sin C rather than base × height when you do not have a perpendicular height.
- **Show intermediate values** — examiners award marks for the substitution and for the calculation before the final answer.
- **If finding all angles**, use the cosine rule for the first angle, then the sine rule (or angle sum) for the rest.
- **Practice sketching triangles** from descriptions. Being able to visualise the triangle helps you choose the right approach.

---

## Practice Questions

**Question 1**
In triangle ABC, angle A = 65°, angle B = 48° and side a = 14 cm. Find side b.

[ANSWER: Sine rule: 14/sin 65° = b/sin 48°. 14/0.9063 = b/0.7431. 15.449 = b/0.7431. b = 15.449 × 0.7431 = 11.5 cm (1 d.p.).]

**Question 2**
In triangle DEF, DE = 10 cm, EF = 7 cm and angle E = 110°. Find DF.

[ANSWER: Cosine rule: DF² = 10² + 7² − 2(10)(7) cos 110° = 100 + 49 − 140 × (−0.3420) = 149 + 47.88 = 196.88. DF = √196.88 = 14.0 cm (1 d.p.).]

**Question 3**
A triangle has sides 5 cm, 8 cm and 10 cm. Find the smallest angle.

[ANSWER: The smallest angle is opposite the shortest side (5 cm). cos A = (8² + 10² − 5²)/(2 × 8 × 10) = (64 + 100 − 25)/160 = 139/160 = 0.86875. A = cos⁻¹(0.86875) = 29.7° (1 d.p.).]

**Question 4**
Find the area of a triangle with sides 9 cm and 13 cm and an included angle of 72°.

[ANSWER: Area = ½ × 9 × 13 × sin 72° = 58.5 × 0.9511 = 55.6 cm² (1 d.p.).]

**Question 5**
In triangle XYZ, XY = 15 cm, angle X = 40° and angle Y = 85°. Find angle Z and side XZ.

[ANSWER: Angle Z = 180 − 40 − 85 = 55°. Sine rule for XZ (opposite Y): XZ/sin 85° = 15/sin 55°. XZ = 15 × sin 85° / sin 55° = 15 × 0.9962 / 0.8192 = 18.2 cm (1 d.p.).]

---

Ready to practise the sine and cosine rules with instant feedback? [Create your free GCSEMathsAI account](https://www.gcsemathsai.co.uk/auth) and generate personalised Higher-tier questions now.

---

## Related Topics

- Trigonometry (SOHCAHTOA) — the starting point for right-angled triangle trig
- Pythagoras' Theorem — connects to the cosine rule when the angle is 90°
- Bearings — sine and cosine rules are often used in bearing problems
- Area of 2D Shapes — the sine area formula extends the standard triangle formula
- Circle Theorems — some problems combine circles with triangle trigonometry

---

## Summary

The **sine rule** (a/sin A = b/sin B) is used when you have a matching angle-side pair, and the **cosine rule** (a² = b² + c² − 2bc cos A) is used when you have SAS or SSS. The area formula ½ab sin C lets you find the area of any triangle without a perpendicular height. Always label sides and angles correctly (side a opposite angle A), choose the right rule before starting, and show your substitution clearly for method marks. These formulas are on the formula sheet, so the key skill is recognising when and how to apply them. Mastering both rules makes you exam-ready for any non-right-angled triangle question on GCSE Higher.
