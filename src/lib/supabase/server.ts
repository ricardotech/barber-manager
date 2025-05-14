
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createSupabaseServerClient() {
  const cookieStore = cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Please check your environment variables (e.g., .env.local for local development, or deployment settings)."
    );
  }
  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your environment variables (e.g., .env.local for local development, or deployment settings)."
    );
  }

  try {
    // Validate that supabaseUrl is a valid URL.
    new URL(supabaseUrl);
  } catch (e) {
    throw new Error(
      `The provided NEXT_PUBLIC_SUPABASE_URL "${supabaseUrl}" is not a valid URL. Please check its format (e.g., it should start with http:// or https://).`
    );
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options, path: options.path ?? '/' })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete({ name, ...options, path: options.path ?? '/' })
        },
      },
    }
  )
}

