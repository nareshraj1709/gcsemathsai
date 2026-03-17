---
title: "Trigonometry GCSE: SOH-CAH-TOA, Sine Rule and Cosine Rule Explained"
description: "Complete GCSE Maths trigonometry guide — SOH-CAH-TOA for right-angled triangles (Foundation and Higher), sine rule, cosine rule and area formula (Higher), with step-by-step worked examples for AQA, Edexcel and OCR."
date: "17 March 2026"
dateISO: "2026-03-17"
category: "Geometry"
categoryColour: "green"
author: "GCSEMathsAI Team"
readMins: 12
keywords: ["trigonometry gcse", "gcse maths trigonometry", "soh cah toa gcse", "trigonometry gcse questions", "sine rule gcse", "cosine rule gcse", "gcse higher trigonometry", "trigonometry gcse examples"]
---

Trigonometry is one of the most consistently examined topics across all GCSE Maths papers. For Foundation students, mastering SOH-CAH-TOA is essential for multiple guaranteed marks. For Higher students, the sine and cosine rules extend this to non-right-angled triangles. This guide covers everything from first principles to Higher tier in one place.

## Part 1: SOH-CAH-TOA (Foundation and Higher)

### What Is SOH-CAH-TOA?

SOH-CAH-TOA is a mnemonic for the three trigonometric ratios used in right-angled triangles:

**SOH:** sin θ = Opposite / Hypotenuse

**CAH:** cos θ = Adjacent / Hypotenuse

**TOA:** tan θ = Opposite / Adjacent

These ratios relate the angles of a right-angled triangle to the ratios of its sides. Before using any of them, you must correctly identify the three sides relative to the angle you are working with.

### Labelling the Sides

Given angle θ in a right-angled triangle:
- **Hypotenuse (H):** Always the longest side, always opposite the right angle
- **Opposite (O):** The side directly opposite angle θ
- **Adjacent (A):** The side next to angle θ (not the hypotenuse)

**Critical step:** Label the three sides before writing any formula. Mislabelling is the most common error in trigonometry questions.

---

## Finding a Missing Side

### When to use which ratio

- If you are using or finding the **hypotenuse** → use **sin or cos**
- If the hypotenuse is not involved → use **tan**
- If the opposite side is involved → use **sin or tan**
- If the adjacent side is involved → use **cos or tan**

### Method: Finding a missing side

**Step 1:** Label O, H, A relative to the given angle.

**Step 2:** Identify which sides are involved (given + required) and choose the appropriate ratio.

**Step 3:** Write the formula and substitute the known values.

**Step 4:** Solve for the unknown side.

### Worked Example 1 — Find the opposite side
*In a right-angled triangle, the hypotenuse is 15 cm and the angle is 32°. Find the opposite side.*

Step 1: H = 15, θ = 32°, need O.

Step 2: Opposite and Hypotenuse → use **sin**.

Step 3: sin 32° = O / 15

Step 4: O = 15 × sin 32° = 15 × 0.5299 = **7.95 cm (to 3 s.f.)**

### Worked Example 2 — Find the adjacent side
*A right-angled triangle has a hypotenuse of 12 cm and an angle of 47°. Find the adjacent side.*

cos 47° = A / 12 → A = 12 × cos 47° = 12 × 0.6820 = **8.18 cm (to 3 s.f.)**

### Worked Example 3 — Use tan (no hypotenuse involved)
*A right-angled triangle has an opposite side of 9 cm and an angle of 55°. Find the adjacent side.*

tan 55° = 9 / A → A = 9 / tan 55° = 9 / 1.428 = **6.30 cm (to 3 s.f.)**

---

## Finding a Missing Angle

When all three sides are known but an angle is missing, use the **inverse trigonometric functions**: sin⁻¹, cos⁻¹, or tan⁻¹.

### Method: Finding a missing angle

**Step 1:** Label O, H, A.

**Step 2:** Choose the ratio using the two sides you know.

**Step 3:** Write the ratio as a decimal (e.g. sin θ = 5/13 = 0.385).

**Step 4:** Apply the inverse function: θ = sin⁻¹(0.385) on your calculator.

### Worked Example 4 — Find an angle using sin
*A right-angled triangle has opposite = 5 cm and hypotenuse = 13 cm. Find the angle.*

sin θ = 5/13 = 0.3846

θ = sin⁻¹(0.3846) = **22.6° (to 1 d.p.)**

### Worked Example 5 — Find an angle using cos
*Adjacent = 7 cm, hypotenuse = 11 cm. Find the angle.*

cos θ = 7/11

θ = cos⁻¹(7/11) = **50.5° (to 1 d.p.)**

### Worked Example 6 — Real-world context (typical AQA/Edexcel style)
*A ramp rises 1.2 m over a horizontal distance of 5 m. Find the angle of inclination.*

The triangle has opposite = 1.2, adjacent = 5.

tan θ = 1.2 / 5 = 0.24

θ = tan⁻¹(0.24) = **13.5° (to 1 d.p.)**

---

## Trigonometry in Non-Right-Angled Triangles (Higher)

Standard SOH-CAH-TOA only works in **right-angled** triangles. For triangles without a right angle, Higher tier students need two additional tools: the **sine rule** and the **cosine rule**.

The standard labelling convention for these rules:
- Sides are labelled **a, b, c** (lowercase)
- Angles opposite those sides are labelled **A, B, C** (uppercase)
- So side a is opposite angle A, side b opposite angle B, etc.

---

## The Sine Rule

$$\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$$

Or equivalently (for finding angles):

$$\frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}$$

### When to use the sine rule
Use the sine rule when you know:
- **Two angles and one side** (AAS or ASA) — to find another side
- **Two sides and a non-included angle** (SSA) — to find another angle

### Worked Example 7 — Find a missing side using sine rule
*In triangle ABC: angle A = 48°, angle B = 65°, side a = 12 cm. Find side b.*

$$\frac{b}{\sin 65°} = \frac{12}{\sin 48°}$$

$$b = \frac{12 \times \sin 65°}{\sin 48°} = \frac{12 \times 0.9063}{0.7431} = \frac{10.876}{0.7431} = \textbf{14.6 cm (to 3 s.f.)}$$

### Worked Example 8 — Find a missing angle using sine rule
*In triangle ABC: angle A = 35°, side a = 8 cm, side b = 12 cm. Find angle B.*

$$\frac{\sin B}{12} = \frac{\sin 35°}{8}$$

$$\sin B = \frac{12 \times \sin 35°}{8} = \frac{12 \times 0.5736}{8} = \frac{6.883}{8} = 0.8604$$

$$B = \sin^{-1}(0.8604) = \textbf{59.4° (to 1 d.p.)}$$

**Note on the ambiguous case:** If sin B < 1 but greater than the value needed for 90°, there may be two possible triangles. The exam will usually indicate which is required, or the context makes it obvious.

---

## The Cosine Rule

**To find a missing side:**
$$a^2 = b^2 + c^2 - 2bc\cos A$$

**To find a missing angle:**
$$\cos A = \frac{b^2 + c^2 - a^2}{2bc}$$

### When to use the cosine rule
Use the cosine rule when you know:
- **Two sides and the included angle** (SAS) — to find the third side
- **All three sides** (SSS) — to find any angle

### Worked Example 9 — Find a missing side using cosine rule
*In triangle ABC: b = 9 cm, c = 7 cm, angle A = 110°. Find side a.*

$$a^2 = 9^2 + 7^2 - 2(9)(7)\cos 110°$$

$$a^2 = 81 + 49 - 126 \times (-0.342)$$

$$a^2 = 130 + 43.1 = 173.1$$

$$a = \sqrt{173.1} = \textbf{13.2 cm (to 3 s.f.)}$$

**Note:** cos 110° is **negative** (110° is obtuse). This increases a², giving a longer side — which makes sense geometrically.

### Worked Example 10 — Find a missing angle using cosine rule
*A triangle has sides a = 5, b = 7, c = 8. Find angle A.*

$$\cos A = \frac{b^2 + c^2 - a^2}{2bc} = \frac{49 + 64 - 25}{2 \times 7 \times 8} = \frac{88}{112} = 0.7857$$

$$A = \cos^{-1}(0.7857) = \textbf{38.2° (to 1 d.p.)}$$

---

## Area of a Triangle Using Trigonometry (Higher)

When you know two sides and the included angle, you can find the area without the height:

$$\text{Area} = \frac{1}{2}ab\sin C$$

### Worked Example 11
*A triangle has sides 8 cm and 11 cm with an included angle of 67°. Find its area.*

$$\text{Area} = \frac{1}{2} \times 8 \times 11 \times \sin 67° = \frac{1}{2} \times 88 \times 0.9205 = \textbf{40.5 cm}^2 \text{ (to 3 s.f.)}$$

---

## Which Rule to Use — Decision Guide

| Information given | Find | Rule |
|-------------------|------|------|
| Two sides + included angle | Third side | Cosine rule |
| All three sides | Any angle | Cosine rule |
| Two angles + any side | A side | Sine rule |
| Two sides + non-included angle | An angle | Sine rule |
| Right-angled triangle | Side or angle | SOH-CAH-TOA |
| Two sides + included angle | Area | ½ab sin C |

---

## Common Mistakes in Trigonometry Questions

**Mistake 1: Using SOH-CAH-TOA on a non-right-angled triangle.**
Always check first: is there a right angle? If not, you need sine or cosine rule.

**Mistake 2: Mislabelling opposite and adjacent.**
Always label sides relative to the angle you are working with — not the right angle.

**Mistake 3: Forgetting that cos is negative for obtuse angles.**
When applying the cosine rule with an obtuse angle, the −2bc cos A term becomes + (since cos A is negative). Students often forget this and get the wrong answer.

**Mistake 4: Not rounding at the final step.**
Keep full calculator precision throughout multi-step calculations and only round at the end.

**Mistake 5: Not giving the angle as a degree.**
Your calculator should be in degrees (DEG) mode, not radians (RAD). Check this at the start of every paper.

---

[Practise trigonometry questions from Foundation SOH-CAH-TOA to Higher sine and cosine rule](/learn) — select Geometry & Measures and choose your tier for instant AI-marked practice.
