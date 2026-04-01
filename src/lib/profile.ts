import { supabase } from './supabase'

/**
 * User profile stored in Supabase `profiles` table with localStorage as a
 * fast cache. On write, both are updated. On read, localStorage is checked
 * first; if missing, Supabase is queried and localStorage is backfilled.
 *
 * Table schema (create via Supabase dashboard or migration):
 *   create table if not exists public.profiles (
 *     id uuid primary key references auth.users(id) on delete cascade,
 *     name text,
 *     year text,
 *     board text,
 *     goal text,
 *     tier text,
 *     updated_at timestamptz default now()
 *   );
 *   alter table public.profiles enable row level security;
 *   create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
 *   create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
 *   create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
 */

export type Profile = {
  name?: string
  year?: string
  board?: string
  goal?: string
  tier?: string
}

const STORAGE_KEY = 'gcse_profile'

/** Read profile from localStorage (fast, synchronous). Returns null if not found. */
export function getProfileFromCache(): Profile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/** Write profile to localStorage cache. */
function setProfileCache(profile: Profile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch { /* ignore — storage full or unavailable */ }
}

/** Clear profile from localStorage cache. */
export function clearProfileCache(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch { /* ignore */ }
}

/**
 * Load profile: tries localStorage first, then falls back to Supabase.
 * Returns the profile or null if not found / not logged in.
 */
export async function loadProfile(): Promise<Profile | null> {
  // 1. Check localStorage cache
  const cached = getProfileFromCache()
  if (cached && cached.year && cached.board) return cached

  // 2. Fall back to Supabase
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return cached // not logged in, return whatever cache has

    const { data, error } = await supabase
      .from('profiles')
      .select('name, year, board, goal, tier')
      .eq('id', session.user.id)
      .single()

    if (error || !data) return cached // table doesn't exist yet or no row

    const profile: Profile = {
      name: data.name ?? undefined,
      year: data.year ?? undefined,
      board: data.board ?? undefined,
      goal: data.goal ?? undefined,
      tier: data.tier ?? undefined,
    }

    // Backfill localStorage cache
    setProfileCache(profile)
    return profile
  } catch {
    return cached
  }
}

/**
 * Save profile to both localStorage and Supabase.
 * Always writes to localStorage; Supabase write is best-effort.
 */
export async function saveProfile(profile: Profile): Promise<void> {
  // 1. Always write to localStorage (instant)
  setProfileCache(profile)

  // 2. Best-effort write to Supabase
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    await supabase.from('profiles').upsert({
      id: session.user.id,
      name: profile.name ?? null,
      year: profile.year ?? null,
      board: profile.board ?? null,
      goal: profile.goal ?? null,
      tier: profile.tier ?? null,
      updated_at: new Date().toISOString(),
    })
  } catch {
    // Supabase write failed — localStorage still has the data
    // This handles the case where the profiles table doesn't exist yet
  }
}

/**
 * Check if the user has completed onboarding (has year + board set).
 * Uses cache first for speed.
 */
export function hasCompletedOnboarding(): boolean {
  const cached = getProfileFromCache()
  return !!(cached?.year && cached?.board)
}
