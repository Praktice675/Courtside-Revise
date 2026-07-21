import { createBrowserClient } from '@supabase/ssr'
import { parseSupabaseEnv } from './env'

/**
 * Create a Supabase client for use in browser (Client Component) code.
 *
 * Uses the public publishable key only. Create per use rather than sharing a
 * singleton, per official Supabase guidance. The `process.env.NEXT_PUBLIC_*`
 * references are static so Next.js can inline them into the browser bundle.
 */
export function createClient() {
  const { url, publishableKey } = parseSupabaseEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  })

  return createBrowserClient(url, publishableKey)
}
