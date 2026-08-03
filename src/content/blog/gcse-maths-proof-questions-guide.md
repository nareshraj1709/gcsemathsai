---
title: "Proof Questions GCSE Maths: Algebraic, Geometric and Show That"
description: "Understand proof gcse maths with step-by-step methods for algebraic proof, show that questions, and geometric proof — including worked examples for Higher tier."
date: "03 August 2026"
dateISO: "2026-08-03"
category: "Topic Guide"
categoryColour: "purple"
author: "GCSEMathsAI Team"
readMins: 8
keywords: ["proof gcse maths", "algebraic proof gcse", "show that questions gcse maths", "how to write a proof gcse", "mathematical proof gcse higher"]
---

Proof questions appear almost exclusively on Higher tier GCSE Maths and are worth 3–5 marks each — usually in the final third of the paper, where students lose confidence. AQA 8300, Edexcel 1MA1, and OCR J560 all include proof questions, typically in Papers 1, 2, and 3. The difference between a student who scores full marks and one who scores nothing is almost never natural ability — it's knowing the conventions. Learn the structure, and these marks become predictable.

## What You Need to Know First

- A proof must show something is **always** true — not just true for one or two examples.
- The two main types tested at GCSE are **algebraic proof** and **geometric proof**.
- "Show that" questions give you the target result and ask you to prove it. You must never assume the answer and work backwards.
- For algebraic proof, always use general expressions: consecutive integers as n and n + 1, even numbers as 2n, odd numbers as 2n + 1, multiples of 3 as 3n.
- For geometric proof, every angle fact you use must be accompanied by a written reason — just the number is never enough.

## Algebraic Proof

**Algebraic proof** means using algebra to show that a statement is true for every integer — not just specific values.

**Key representations to memorise:**

| Type of number | Expression |
|---|---|
| Any integer | n |
| Consecutive integers | n, n + 1, n + 2 |
| Even number | 2n |
| Odd number | 2n + 1 |
| Multiple of 3 | 3n |
| Square number | n² |

**The golden rule:** Start with an expression on one side and manipulate it step by step until you reach what you need to show. Show every single line of working.

**Worked example 1:**

Prove that the product of any two odd numbers is always odd.

Let the two odd numbers be 2m + 1 and 2n + 1, where m and n are integers.

Product = (2m + 1)(2n + 1)

Expand the brackets:
= 4mn + 2m + 2n + 1
= 2(2mn + m + n) + 1

Since m and n are integers, 2mn + m + n is also an integer.
So the product equals 2k + 1 where k = 2mn + m + n.

This is of the form 2k + 1, which is always odd. ∎

**Worked example 2:**

Prove that n² + n is always even for any positive integer n.

n² + n = n(n + 1)

Any integer n is either even or odd.

**Case 1:** n is even. Let n = 2k. Then n(n + 1) = 2k(2k + 1), which is divisible by 2.

**Case 2:** n is odd. Let n = 2k + 1. Then n + 1 = 2k + 2 = 2(k + 1). So n(n + 1) = (2k + 1) × 2(k + 1), which is divisible by 2.

In both cases, n² + n is divisible by 2, so it is always even. ∎

## Show That Questions

**"Show that" questions** give you the answer up front and ask you to prove it. The most common mistake is assuming the result is true and reverse-engineering the algebra — this is circular reasoning and earns no marks.

Always start with one side of the equation or an expression from the question, and work towards the stated result.

**Worked example 1:**

Show that (2n + 1)² − 1 is always a multiple of 4, for any positive integer n.

Start with the expression:

(2n + 1)² − 1

Expand (2n + 1)²:
= 4n² + 4n + 1 − 1

Simplify:
= 4n² + 4n

Factorise:
= 4n(n + 1)

Since n and n + 1 are consecutive integers, n(n + 1) is an integer.
Therefore (2n + 1)² − 1 = 4 × n(n + 1), which is always a multiple of 4. ∎

**Worked example 2:**

Show that the sum of three consecutive integers is always a multiple of 3.

Let the three consecutive integers be n, n + 1, and n + 2.

Sum = n + (n + 1) + (n + 2)
    = 3n + 3
    = 3(n + 1)

Since n + 1 is an integer, this is always a multiple of 3. ∎

Notice the final sentence explicitly states why the expression is a multiple of 3. This conclusion sentence earns a separate mark on most mark schemes — students who stop at 3(n + 1) without explaining often lose it.

## Geometric Proof

**Geometric proof** involves using angle facts, shape properties, or congruence to prove that a statement about a diagram is always true. The structure is different from algebraic proof, but the same principle applies: state every reason explicitly.

**Key reasons you must write (not just assume):**

- Angles in a triangle sum to 180°
- Angles on a straight line sum to 180°
- Vertically opposite angles are equal
- Base angles of an isosceles triangle are equal
- Corresponding angles are equal (parallel lines)
- The angle at the centre is twice the angle at the circumference
- Angles in the same segment are equal
- Opposite angles in a cyclic quadrilateral sum to 180°

**Worked example:**

In triangle ABC, AB = AC. D is a point on BC. Prove that angle ABD = angle ACD.

Since AB = AC, triangle ABC is **isosceles**.
Base angles of an isosceles triangle are equal.
Therefore angle ABC = angle ACB.
But angle ABD = angle ABC and angle ACD = angle ACB.
Therefore angle ABD = angle ACD. ∎

**Circle theorem proof example:**

Prove that angles in the same segment are equal.

Let O be the centre of the circle. Let angles ACB and ADB both be subtended by arc AB, with C and D on the same arc.

Angle AOB = 2 × angle ACB (the angle at the centre is twice the angle at the circumference, both subtended by arc AB)
Angle AOB = 2 × angle ADB (same reason, same arc AB)

Therefore 2 × angle ACB = 2 × angle ADB
Dividing both sides by 2: angle ACB = angle ADB ∎

This exact proof — or a very close variant — appears regularly on AQA and Edexcel Higher papers.

## Common Mistakes Students Make

- **Substituting specific numbers instead of using algebra.** Testing with n = 5 or n = 10 checks a claim but does not prove it. Proofs must work for every integer, and the mark scheme will give zero for any proof based on examples alone.
- **Working backwards from the answer.** On "show that" questions, students sometimes write the target at the top and rearrange until it matches the starting expression. This is circular and earns no marks — start from the given expression and work forward.
- **Dropping the conclusion sentence.** Most Higher mark schemes award a final mark for a statement such as "Therefore this is always a multiple of 4" or "Therefore the angles are equal." Stopping at the algebra without this sentence loses a free mark.
- **Omitting reasons in geometric proof.** Writing "angle x = 35°" with no reason is not accepted. The reason — "angles in a triangle sum to 180°" — is where the marks are. No reason, no mark.
- **Using vague language.** Writing "it's even because there's a 2 in it" won't earn marks. You must write "it is of the form 2k where k is an integer, so it is even."

## Exam Tips for Proof Questions

- **Write "Let n be any integer" at the start.** This sets up your proof formally and signals to the examiner that you know what you're doing. AQA and Edexcel mark schemes reward this opening.
- **Always end with a conclusion.** A brief statement — "Therefore the expression is always even" or "Therefore the two angles are equal" — almost always earns the final mark and takes three seconds to write.
- **Expand fully before factorising.** On algebraic proof questions, expand all brackets completely first, then collect like terms, then factorise. Students who try to skip steps often make errors that invalidate the whole proof.
- **For "show that" questions, write the target result at the bottom — not the top.** Aim for it, don't start from it. A quick way to check: could your working have gone somewhere different? If yes, you started correctly. If your opening line already contained the answer, you've reversed the argument.
- **In geometric proof on OCR J560 Higher, name angles with full notation.** Write angle BAC, not just angle A. Two different angles can share the same vertex, and ambiguous labelling can cost a mark.

## Practise Now

The best way to get confident with proof is to practise exam-style questions with instant feedback. Try proof questions now on [GCSEMathsAI](https://www.gcsemathsai.co.uk/practice) — AI-generated questions matched to your board and tier, with detailed marking and personalised feedback.
