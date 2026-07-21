import 'server-only'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { parseSupabaseEnv } from './env'

/**
 * Create a Supabase client for use in server-only code (Server Components,
 * Server Actions, Route Handlers).
 *
 * The `server-only` import and `next/headers` dependency prevent this module
 * from being imported into browser code. Created per request so it reads the
 * current request's cookies. Uses the public publishable key only.
 */
export async function createClient() {
  const { url, publishableKey } = parseSupabaseEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  })

  const cookieStore = await cookies()

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // `setAll` was called from a Server Component, which cannot write
          // cookies. Safe to ignore when session refresh is handled by
          // middleware (added in a later authentication ticket).
        }
      },
    },
  })
}
