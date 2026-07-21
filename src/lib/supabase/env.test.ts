import { describe, expect, it } from 'vitest'
import { parseSupabaseEnv } from './env'

const validUrl = 'https://example.supabase.co'
const validPublishableKey = 'sb_publishable_example_placeholder_not_a_secret'

describe('parseSupabaseEnv', () => {
  it('returns a frozen, typed object for a valid URL and publishable key', () => {
    const env = parseSupabaseEnv({
      NEXT_PUBLIC_SUPABASE_URL: validUrl,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: validPublishableKey,
    })

    expect(env).toEqual({ url: validUrl, publishableKey: validPublishableKey })
    expect(Object.isFrozen(env)).toBe(true)
  })

  it('throws when the URL is missing', () => {
    expect(() =>
      parseSupabaseEnv({
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: validPublishableKey,
      }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_URL/)
  })

  it('throws when the URL is malformed', () => {
    expect(() =>
      parseSupabaseEnv({
        NEXT_PUBLIC_SUPABASE_URL: 'not-a-url',
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: validPublishableKey,
      }),
    ).toThrow(/valid http or https URL/)
  })

  it('throws when the publishable key is missing', () => {
    expect(() =>
      parseSupabaseEnv({ NEXT_PUBLIC_SUPABASE_URL: validUrl }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/)
  })

  it('treats a whitespace-only publishable key as missing', () => {
    expect(() =>
      parseSupabaseEnv({
        NEXT_PUBLIC_SUPABASE_URL: validUrl,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '   ',
      }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/)
  })
})
