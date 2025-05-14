
import { createBrowserClient } from '@supabase/ssr'

export function createSupabaseBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Please check your .env.local file or environment variables for deployment."
    );
  }
  if (!supabaseAnonKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Please check your .env.local file or environment variables for deployment."
    );
  }

  try {
    // Validate that supabaseUrl is a valid URL.
    // The Supabase client itself will also do this, but this provides a clearer error message earlier.
    new URL(supabaseUrl);
  } catch (e) {
    throw new Error(
      `The provided NEXT_PUBLIC_SUPABASE_URL "${supabaseUrl}" is not a valid URL. Please check its format (e.g., it should start with http:// or https://).`
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

