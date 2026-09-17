# Student presentation and account journey ? 17 September 2026

## Changes

- Searchable, filterable revision library with 51 unique article URLs, lightweight maths illustrations, featured revision guide and practice links.
- Consistent article headers, mobile contents, calmer typography and colours, and clearer homepage learning shortcuts. Existing article content, paths, titles and canonical tags retained.
- Accessible account forms with native validation, password visibility, duplicate-submit protection, bounded waits, clearer errors and direct access to free quizzes.
- Signup handles both immediate sessions and email confirmation. Confirmation callbacks handle existing sessions, expired links and password recovery without awaiting Supabase calls inside its auth event callback.
- Clear stale profile cache on entry to an account. Onboarding awaits profile saving and reports failures. Session guards no longer wait indefinitely after a request failure.

## Signup service incident ? unresolved infrastructure dependency

The deployed JavaScript and local configuration both reference `usoxmihqtqrorfqrgifu.supabase.co`. Direct read-only health/settings requests fail with `ENOTFOUND`. Google public DNS independently returned status 3 (NXDOMAIN) with no answers on 17 September 2026. This establishes that the configured hostname does not resolve; it does not establish whether the project is paused, deleted or misconfigured.

The project owner needs to inspect this Supabase project and restore it if paused. If it was replaced, configure the new project URL and matching public anonymous/publishable key in Vercel and redeploy; do not use a service-role key in browser configuration. Confirm the existing profiles table and row-level security policies are present before moving to a replacement project.

In Supabase Authentication URL Configuration, verify the production Site URL and allow both redirects:

- `https://www.gcsemathsai.co.uk/auth/callback`
- `https://www.gcsemathsai.co.uk/auth/callback?flow=recovery`

After restoration, verify health/settings, then use an owner-controlled test account to complete signup, confirmation, onboarding, logout/login and password reset. No real account was created and no test email was sent during this change.

## Validation

- Production build: 1,040 generated pages.
- Ten regression tests pass, including error mapping, both recovery-link formats, bounded operations and guide filtering.
- Targeted ESLint passes for all changed account components and the blog/library components, navigation, accordion and profile helper.
- Baseline comparison: 1,022 generated paths, titles and canonical tags unchanged (excluding the previous audit's intentionally nonexistent cached 404).
- All 51 article pages have the shared header and one H1; blog lists 51 unique guide cards.
- Learning audit: 898 rendered learning pages, 1,006 sitemap entries, no failures. Internal learning link check passes.
- Browser rendering was unavailable in this session. These are build, source and HTTP checks, not visual or complete account-flow verification.
