# Predicted Papers — Stripe + Supabase wiring

## 1. Supabase `purchases` table

Run this SQL once in the Supabase SQL editor (Database → SQL Editor → New query):

```sql
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null,
  stripe_session_id text unique,
  sku_id text,
  amount_total integer,
  currency text default 'gbp',
  paid_at timestamptz default now()
);

create index if not exists purchases_email_idx on public.purchases (customer_email);

alter table public.purchases enable row level security;

-- Logged-in users can read only their own purchases (matched by email).
create policy "users read their own purchases"
on public.purchases for select
to authenticated
using (lower(customer_email) = lower(auth.jwt() ->> 'email'));

-- Server (service-role key) can insert. The webhook uses the service-role key.
create policy "service role inserts"
on public.purchases for insert
to service_role
with check (true);
```

## 2. Environment variables (Vercel)

Set these in the Vercel dashboard → Settings → Environment Variables:

```
STRIPE_SECRET_KEY=sk_live_xxx               # from Stripe Dashboard → Developers → API keys
STRIPE_WEBHOOK_SECRET=whsec_xxx             # from the webhook endpoint you create in Stripe
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # from Supabase Settings → API → service_role key
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co    # already set
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...                # already set
```

Redeploy after adding the vars.

## 3. Stripe Payment Links

In Stripe Dashboard → Payment Links → New:

1. Create **three Products** with **Prices** (GBP, one-time):
   - Paper 2 Predicted Pack — £5.99 — Tax: "Inclusive of tax" if you sell at the stated price, or "No tax" if you're not VAT-registered (sole trader under £90k turnover).
   - Paper 3 Predicted Pack — £5.99 — same tax setting.
   - Paper 2 + Paper 3 Bundle — £9.99 — same tax setting.
2. For each, create a **Payment Link** with:
   - "Collect customer email" → ON (required)
   - "Confirmation page" → custom message:
     `Thanks! Sign in at https://www.gcsemathsai.co.uk/auth using the email you just used — your papers will be on the My Papers page.`
   - Apple Pay / Google Pay → ON
3. Copy each Payment Link URL and replace the placeholders in `src/lib/predicted-papers.ts`:
   - `STRIPE_LINK_PAPER2` for the Paper 2 link
   - `STRIPE_LINK_PAPER3` for the Paper 3 link
   - `STRIPE_LINK_BUNDLE` for the bundle link
4. Copy each **Stripe Price ID** (price_xxx) from each product and add `stripePriceId: 'price_xxx'` to the matching SKU in `predicted-papers.ts`. This is what the webhook uses to recognise which SKU was bought.

## 4. Stripe Webhook

In Stripe Dashboard → Developers → Webhooks → Add endpoint:

- Endpoint URL: `https://www.gcsemathsai.co.uk/api/stripe/webhook`
- Listen to: `checkout.session.completed`
- After creating, copy the **Signing secret** (`whsec_...`) and set it as `STRIPE_WEBHOOK_SECRET` in Vercel.

## 5. Test

1. Use Stripe test mode (toggle in dashboard). Replicate the products + payment links in test mode.
2. Buy each pack with card `4242 4242 4242 4242`, any future date, any CVC, ZIP `12345`.
3. After paying, visit `https://www.gcsemathsai.co.uk/auth`, sign up with the same email.
4. Visit `/my-papers` — your purchased pack should be unlocked and downloadable.
5. The Vercel function logs at `/api/stripe/webhook` show webhook receipts.

## 6. Going live

- Switch Stripe to live mode, re-create the products + payment links there.
- Replace test URLs / keys with live versions.
- Make sure `STRIPE_SECRET_KEY` is `sk_live_...` and `STRIPE_WEBHOOK_SECRET` matches the live endpoint.
