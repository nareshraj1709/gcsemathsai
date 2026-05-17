-- 0003_purchases.sql
-- Creates the table that the Stripe webhook writes into and the My Papers
-- page reads from. Safe to run more than once — every statement is idempotent.
--
-- HOW TO RUN
--   Option A (Supabase Dashboard):
--     1. Open Supabase Dashboard → SQL Editor → New query
--     2. Paste the contents of this file and click "Run"
--   Option B (Supabase CLI):
--     supabase db push
--
-- Verifies at the bottom by selecting from the table.

-- ─────────────────────────────────────────────────────────────────────────────
-- Table
-- ─────────────────────────────────────────────────────────────────────────────
create table if not exists public.purchases (
  id                 uuid primary key default gen_random_uuid(),
  customer_email     text not null,
  stripe_session_id  text unique,
  sku_id             text,
  amount_total       integer,         -- in pence (Stripe convention)
  currency           text default 'gbp',
  paid_at            timestamptz default now(),
  created_at         timestamptz default now()
);

comment on table  public.purchases is 'One row per successful Stripe checkout. Written by the /api/stripe/webhook endpoint.';
comment on column public.purchases.customer_email   is 'Email collected at Stripe checkout. Lowercased and trimmed by the webhook.';
comment on column public.purchases.stripe_session_id is 'Unique key — Stripe checkout session id. Used to upsert on webhook retries.';
comment on column public.purchases.sku_id            is 'One of paper2 | paper3 | bundle. Derived from client_reference_id or Price ID.';
comment on column public.purchases.amount_total      is 'Total paid, in pence. £5.99 = 599.';

-- ─────────────────────────────────────────────────────────────────────────────
-- Indexes
-- ─────────────────────────────────────────────────────────────────────────────
create index if not exists purchases_email_idx
  on public.purchases (lower(customer_email));

create index if not exists purchases_paid_at_idx
  on public.purchases (paid_at desc);

-- ─────────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────────────────────────────────────
alter table public.purchases enable row level security;

-- Drop existing policies of the same name so the file is re-runnable
drop policy if exists "users read their own purchases" on public.purchases;
drop policy if exists "service role inserts"          on public.purchases;
drop policy if exists "service role updates"          on public.purchases;

-- Authenticated users can SELECT their own purchases, matched by email.
-- The Supabase JWT carries the user's email at `auth.jwt() ->> 'email'`.
create policy "users read their own purchases"
on public.purchases
for select
to authenticated
using (
  lower(customer_email) = lower(coalesce(auth.jwt() ->> 'email', ''))
);

-- The Stripe webhook uses the service-role key, which already bypasses RLS,
-- but we still spell out an explicit insert/update policy so any future tools
-- using the service role (manual reconciliation, admin scripts) are clean.
create policy "service role inserts"
on public.purchases
for insert
to service_role
with check (true);

create policy "service role updates"
on public.purchases
for update
to service_role
using (true)
with check (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- Verification
-- ─────────────────────────────────────────────────────────────────────────────
-- Should return 0 rows on first run, and the row count after each purchase.
select count(*) as purchase_count from public.purchases;
