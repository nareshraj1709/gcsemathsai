# Student presentation and account journey ? 17 September 2026

## Changes

- Searchable, filterable revision library with 51 unique article URLs, lightweight maths illustrations, featured revision guide and practice links.
- Consistent article headers, mobile contents, calmer typography and colours, and clearer homepage learning shortcuts. Existing article content, paths, titles and canonical tags retained.
- Accessible account forms with native validation, password visibility, duplicate-submit protection, bounded waits, clearer errors and direct access to free quizzes.
- Signup handles both immediate sessions and email confirmation. Confirmation callbacks handle existing sessions, expired links and password recovery without awaiting Supabase calls inside its auth event callback.
- Clear stale profile cache on entry to an account. Onboarding awaits profile saving and reports failures. Session guards no longer wait indefinitely after a request failure.

## Signup service incident ? connectivity recovered

The deployed JavaScript and local configuration both reference `usoxmihqtqrorfqrgifu.supabase.co`. Direct read-only health/settings requests fail with `ENOTFOUND`. Google public DNS independently returned status 3 (NXDOMAIN) with no answers on 17 September 2026. This establishes that the configured hostname does not resolve; it does not establish whether the project is paused, deleted or misconfigured.

On the follow-up check on 18 September 2026, the same project returned HTTP 200 for both health and authentication settings. Email authentication was enabled, signup was allowed and email confirmation remained required. The original connectivity blocker has recovered; no project URL or credentials were changed in this work. The exact cause of the outage and the restoration action are unknown.

In Supabase Authentication URL Configuration, verify the production Site URL and allow both redirects:

- `https://www.gcsemathsai.co.uk/auth/callback`
- `https://www.gcsemathsai.co.uk/auth/callback?flow=recovery`

Live verification on 18 September: the signup CORS preflight returned HTTP 200 and allowed the production origin/request headers. A deliberately empty signup request reached Supabase and returned its expected HTTP 422 anonymous-provider-disabled validation response. This confirms transport and CORS, not successful email account creation. No real account was created and no test email was sent. An owner-controlled account still needs to verify email delivery, confirmation, onboarding, logout/login and password reset end to end.

The deployed homepage/blog/account routes returned HTTP 200. The live blog rendered 51 guide cards, the sampled article included its new header, and the live account JavaScript contained the new signup form and service-error handling. The latest application commit is `7c33861`, confirmed deployed successfully by Vercel.

## Validation

- Production build: 1,040 generated pages.
- Ten regression tests pass, including error mapping, both recovery-link formats, bounded operations and guide filtering.
- Targeted ESLint passes for all changed account components and the blog/library components, navigation, accordion and profile helper.
- Baseline comparison: 1,022 generated paths, titles and canonical tags unchanged (excluding the previous audit's intentionally nonexistent cached 404).
- All 51 article pages have the shared header and one H1; blog lists 51 unique guide cards.
- Learning audit: 898 rendered learning pages, 1,006 sitemap entries, no failures. Internal learning link check passes.
- Browser rendering was unavailable in this session. These are build, source and HTTP checks, not visual or complete account-flow verification.
