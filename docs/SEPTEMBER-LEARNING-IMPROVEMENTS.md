# September 2026 learning and search improvements

## Changes

- Embed existing five-question diagnostics on all 245 topic guides, with question previews, lesson shortcuts and mobile contents navigation.
- Add quiz search, next-topic actions, explicit on-device result saving, saved-practice panels and diagnostic learning events.
- Use crawlable navigation/footer links, fix generated-quiz continuation and redirect two legacy practice URLs.
- Replace unsupported homepage statistics/testimonials and stale promotional copy with factual study routes. Remove global Singapore promotional overlays from GCSE reading journeys.
- Add public quizzes to a deduplicated sitemap, omit result/upload pages, remove invented build-time freshness, use crawlable noindex headers for printable companions, and return real 404s for missing study pages.
- Remove duplicate article titles from 26 topic pages and improve keyboard focus and reduced-motion support.

## Verification

- Production build passed: 1,040 generated pages.
- Six regression tests passed, including structural validation of 245 quizzes and 1,225 questions.
- Production audit passed for 898 learning pages and 1,006 sitemap URLs; redirects, companion headers and missing-page handling passed.
- Internal links among the five audited learning route families passed.
- Changed UI files passed targeted lint with an existing analytics integration advisory. The broader initial scan found 18 errors and 19 warnings in older code; two navigation errors were then corrected. Full-project lint is not claimed clean.

Run `npm test`, `npm run build`, then start on port 3117 and run `node scripts/audit-learning.mjs` and `node scripts/check-learning-links.mjs`. AUDIT_ORIGIN can override the default HTTP origin; generated HTML checks always inspect the local build.

## Follow-up verification

Real browser/mobile quiz interaction, authenticated flows, actual GA4 collection, field Core Web Vitals and search indexing still need runtime/account evidence. Structural tests do not certify every mathematical explanation. Saved results are local to the chosen device, not cross-device or unfinished-session sync. Diagnostic analytics events do not include answer text or student names. Account-level key-event configuration has not been changed.

The private export analysis and prioritised content/product backlog remain local under scripts/gcse-review-2026-09-17/REVIEW.md; raw analytics data is not part of this release.
