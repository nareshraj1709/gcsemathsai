---
title: "Quartiles and Interquartile Range – GCSE Maths Revision Guide"
description: "Quartiles and interquartile range GCSE Maths revision: find Q1, Q2, Q3 from listed data and cumulative frequency, calculate IQR and identify outliers."
date: "23 May 2026"
dateISO: "2026-05-23"
category: "Statistics & Probability"
categoryColour: "rose"
author: "GCSEMathsAI Team"
readMins: 7
keywords: ["quartiles GCSE", "interquartile range GCSE maths", "IQR GCSE", "finding quartiles", "Q1 Q2 Q3 maths", "outliers IQR GCSE", "quartiles from cumulative frequency"]
tier: "Foundation & Higher"
strand: "Statistics & Probability"
topicNumber: 250
---

Quartiles and the interquartile range (IQR) are essential statistics skills tested on GCSE Maths papers at both Foundation and Higher tier. They measure the spread of the middle 50% of a data set and are more reliable than the range because they are not affected by extreme values. You need to find Q1, Q2 (the median) and Q3 from listed data and from cumulative frequency diagrams, calculate the IQR, and at Higher level, use the IQR to identify outliers. This guide covers every method with worked examples and common pitfalls. For a full overview of every topic, see our [complete GCSE Maths topics list](/blog/gcse-maths-topics-complete-list).

## What Are Quartiles?

**Quartiles** divide an ordered data set into four equal parts:

- **Q1 (lower quartile)** — 25% of the data lies below this value.
- **Q2 (median)** — 50% of the data lies below this value.
- **Q3 (upper quartile)** — 75% of the data lies below this value.

### Key Formulas

[FORMULA: IQR = Q3 − Q1]

**For listed data with n values (ordered):**

[FORMULA: Q2 position = (n + 1) ÷ 2]

[FORMULA: Q1 position = (n + 1) ÷ 4]

[FORMULA: Q3 position = 3(n + 1) ÷ 4]

**For cumulative frequency diagrams (grouped data with total n):**

[FORMULA: Q1 at n ÷ 4 on the CF axis]

[FORMULA: Q2 at n ÷ 2 on the CF axis]

[FORMULA: Q3 at 3n ÷ 4 on the CF axis]

**Outlier rule (Higher):**

[FORMULA: An outlier is any value below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR]

## Step-by-Step Method

### From Listed Data

1. **Order the data** from smallest to largest.
2. **Find n** (the number of values).
3. **Locate Q2** at position (n + 1) ÷ 2. If this is a whole number, it is that value. If it is x.5, take the mean of the values at positions x and x + 1.
4. **Locate Q1** at position (n + 1) ÷ 4. Use the same averaging rule if needed.
5. **Locate Q3** at position 3(n + 1) ÷ 4.
6. **Calculate IQR** = Q3 − Q1.

### From a Cumulative Frequency Diagram

1. Find the total frequency n.
2. Read across from n ÷ 4 on the vertical axis to the curve, then read down for Q1.
3. Read across from n ÷ 2 for Q2.
4. Read across from 3n ÷ 4 for Q3.
5. Calculate IQR = Q3 − Q1.

## Worked Example 1 — Foundation Level

**Question:** Find Q1, Q2, Q3 and the IQR for this data: 3, 5, 7, 8, 12, 14, 17, 20, 23.

**Working:**

n = 9 (already ordered).

Q2 position = (9 + 1) ÷ 2 = 5th value = **12**.

Q1 position = (9 + 1) ÷ 4 = 2.5th value = (5 + 7) ÷ 2 = **6**.

Q3 position = 3(9 + 1) ÷ 4 = 7.5th value = (17 + 20) ÷ 2 = **18.5**.

IQR = 18.5 − 6 = **12.5**.

**Answer:** Q1 = 6, Q2 = 12, Q3 = 18.5, IQR = 12.5.

## Worked Example 2 — Higher Level

**Question:** A cumulative frequency diagram for the weights (kg) of 80 parcels gives: Q1 = 2.4 kg, Q2 = 3.8 kg, Q3 = 5.6 kg. The lightest parcel weighs 0.5 kg and the heaviest weighs 12.1 kg. (a) Find the IQR. (b) Use the 1.5 × IQR rule to determine whether 12.1 kg is an outlier.

**Working:**

**(a)** IQR = 5.6 − 2.4 = **3.2 kg**.

**(b)** Upper boundary = Q3 + 1.5 × IQR = 5.6 + 1.5 × 3.2 = 5.6 + 4.8 = 10.4 kg.

12.1 kg > 10.4 kg, so 12.1 kg **is an outlier**.

Lower boundary = Q1 − 1.5 × IQR = 2.4 − 4.8 = −2.4 kg. The lightest parcel (0.5 kg) is above this, so it is not an outlier.

**Answer:** (a) IQR = 3.2 kg. (b) Yes, 12.1 kg is an outlier because it exceeds Q3 + 1.5 × IQR = 10.4 kg.

## Worked Example 3 — Exam Style

**Question:** The ages (years) of 12 members of a running club are: 19, 22, 24, 27, 28, 31, 33, 35, 38, 41, 45, 52. (a) Find the median and IQR. (b) Determine whether any values are outliers.

**Working:**

n = 12.

**(a)** Q2 position = (12 + 1) ÷ 2 = 6.5th value = (31 + 33) ÷ 2 = **32**.

Q1 position = (12 + 1) ÷ 4 = 3.25th value. This is between the 3rd (24) and 4th (27) values: 24 + 0.25 × (27 − 24) = 24 + 0.75 = **24.75**.

Q3 position = 3(12 + 1) ÷ 4 = 9.75th value. This is between the 9th (38) and 10th (41) values: 38 + 0.75 × (41 − 38) = 38 + 2.25 = **40.25**.

IQR = 40.25 − 24.75 = **15.5**.

**(b)** Lower boundary = 24.75 − 1.5 × 15.5 = 24.75 − 23.25 = 1.5. Upper boundary = 40.25 + 1.5 × 15.5 = 40.25 + 23.25 = 63.5.

All values fall between 1.5 and 63.5, so there are **no outliers**.

**Answer:** (a) Median = 32, IQR = 15.5. (b) No outliers.

## Common Mistakes

- **Using n ÷ 2 instead of (n + 1) ÷ 2 for listed data.** For listed data, use (n + 1) to find positions. For grouped data on a cumulative frequency diagram, use n ÷ 2 (without the +1).
- **Forgetting to order the data first.** Quartiles only work on ordered data — always sort before calculating.
- **Confusing IQR with range.** IQR = Q3 − Q1 (middle 50%). Range = max − min (all data).
- **Applying the outlier rule at Foundation.** The 1.5 × IQR rule is Higher tier only. At Foundation, just calculate quartiles and IQR.

## Exam Tips

- For small data sets (listed values), use (n + 1) ÷ 4 and 3(n + 1) ÷ 4 for quartile positions.
- For large grouped data sets (cumulative frequency), use n ÷ 4 and 3n ÷ 4 — read off the curve.
- When the position is not a whole number, interpolate between the two adjacent values.
- The IQR is preferred to the range because it ignores extreme values and measures the spread of the central half of the data.
- For cumulative frequency and box plot skills, see [cumulative frequency and box plots](/topics/cumulative-frequency-and-box-plots). For comparing data, see [comparing data sets](/topics/comparing-data-sets).

## Practice Questions

**Q1 (Foundation):** Find Q1, Q2 and Q3 for: 4, 7, 9, 11, 15, 18, 22.

[ANSWER: n = 7. Q2 = (7+1)÷2 = 4th value = 11. Q1 = (7+1)÷4 = 2nd value = 7. Q3 = 3(7+1)÷4 = 6th value = 18. IQR = 18 − 7 = 11.]

**Q2 (Foundation):** The IQR of a data set is 8 and the range is 35. Which is a better measure of spread? Explain why.

[ANSWER: The IQR is better because it measures the spread of the middle 50% and is not affected by extreme values. The range may be inflated by outliers.]

**Q3 (Higher):** Data: 2, 5, 8, 10, 13, 15, 17, 20, 22, 40. Find Q1, Q3, IQR and determine whether 40 is an outlier.

[ANSWER: n = 10. Q1 position = 2.75th = 5 + 0.75(8−5) = 7.25. Q3 position = 8.25th = 20 + 0.25(22−20) = 20.5. IQR = 20.5 − 7.25 = 13.25. Upper fence = 20.5 + 1.5(13.25) = 20.5 + 19.875 = 40.375. Since 40 < 40.375, 40 is NOT an outlier (just barely).]

---

Practise quartiles and interquartile range for free on GCSEMathsAI.

## Related Topics

- [Cumulative Frequency and Box Plots](/topics/cumulative-frequency-and-box-plots)
- [Comparing Data Sets](/topics/comparing-data-sets)
- [Mean, Median, Mode and Range](/topics/mean-median-mode-and-range)

## Summary

Quartiles divide ordered data into four equal parts: Q1 (25%), Q2/median (50%) and Q3 (75%). For listed data, find positions using (n + 1) ÷ 4, (n + 1) ÷ 2 and 3(n + 1) ÷ 4. For cumulative frequency diagrams, use n ÷ 4, n ÷ 2 and 3n ÷ 4. The interquartile range (IQR = Q3 − Q1) measures the spread of the middle 50% and is more reliable than the range because it ignores extreme values. At Higher level, use the 1.5 × IQR rule to identify outliers: any value below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR is an outlier.
