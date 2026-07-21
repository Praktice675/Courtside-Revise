export interface SupabaseEnv {
  readonly url: string
  readonly publishableKey: string
}

/**
 * The subset of environment variables the Supabase clients require.
 *
 * Both values are public (`NEXT_PUBLIC_*`) and browser-safe. A secret or
 * service-role key must never be added here or read by this module.
 */
export interface SupabaseEnvSource {
  NEXT_PUBLIC_SUPABASE_URL?: string
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string
}

/**
 * Validate the public Supabase environment contract and return a frozen,
 * typed object.
 *
 * This runs only when called (a client factory requests it), never on import,
 * so importing a Supabase module does not require credentials. Error messages
 * name the offending variable but never include its value.
 */
export function parseSupabaseEnv(source: SupabaseEnvSource): SupabaseEnv {
  const url = source.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const publishableKey = source.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()

  if (!url) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable.')
  }
  if (!isValidHttpUrl(url)) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid http or https URL.')
  }
  if (!publishableKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable.',
    )
  }

  return Object.freeze({ url, publishableKey })
}

function isValidHttpUrl(value: string): boolean {
  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return false
  }
  return parsed.protocol === 'http:' || parsed.protocol === 'https:'
}
