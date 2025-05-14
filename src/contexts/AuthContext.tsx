"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthError, SignInWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  supabase: SupabaseClient | null; // Expose Supabase client if needed by other parts of the app
  signIn: (credentials: SignInWithPasswordCredentials) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      setLoading(false); // If supabase client isn't initialized, stop loading.
      setError({ name: "InitializationError", message: "Supabase client failed to initialize." } as AuthError);
      return;
    }

    // Initial check for session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Error getting initial session:", sessionError);
          setError(sessionError);
        }
        setUser(session?.user ?? null);
      } catch (e) {
        console.error("Exception during getInitialSession:", e);
        setError({ name: "SessionError", message: "Failed to retrieve session." } as AuthError);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // console.log('Auth event:', event, 'Session:', session); // Useful for debugging
        
        setUser(session?.user ?? null);
        setLoading(false); // Ensure loading is false after any auth event

        if (event === 'SIGNED_OUT') {
          // Ensure user state is cleared and redirect to login
          // The setUser(null) above handles the state part.
          router.push('/login');
        }
        // For SIGNED_IN, TOKEN_REFRESHED, USER_UPDATED, INITIAL_SESSION,
        // setUser and setLoading updates are generally sufficient.
        // Specific redirection for SIGNED_IN is handled by the signIn method.
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    if (!supabase) {
      const err = { message: "Supabase client not initialized", name: "AuthError", status: 500 } as AuthError;
      setError(err);
      setLoading(false);
      return { error: err };
    }

    setLoading(true);
    setError(null); // Clear previous errors

    const { data, error: signInError } = await supabase.auth.signInWithPassword(credentials);

    if (signInError) {
      setError(signInError);
      setUser(null); 
      setLoading(false);
      return { error: signInError };
    }

    // Successfully signed in if data.session and data.user are present
    if (data.session && data.user) {
      setUser(data.user); // Update context immediately
      setError(null);
      router.push('/dashboard'); // Changed redirect to /app/dashboard
      router.refresh(); // Important for server components to pick up the new session
      // setLoading will be managed by the onAuthStateChange listener triggered by signIn.
      return { error: null };
    }
    
    // Fallback for unexpected scenarios (e.g., no error but no session/user)
    // This case should ideally not be reached with password auth if no error.
    const unexpectedError = { message: "Sign-in attempt did not result in a user session.", name: "AuthError", status: 500 } as AuthError;
    setError(unexpectedError);
    setUser(null);
    setLoading(false);
    return { error: unexpectedError };
  };

  const signOut = async () => {
    if (!supabase) {
      const err = { message: "Supabase client not initialized", name: "AuthError", status: 500 } as AuthError;
      setError(err);
      return { error: err };
    }
    setLoading(true); // Indicate an operation is in progress
    const { error: signOutError } = await supabase.auth.signOut();
    
    // The onAuthStateChange listener will handle:
    // - Setting user to null
    // - Setting loading to false
    // - Redirecting to /login on 'SIGNED_OUT' event

    if (signOutError) {
      setError(signOutError);
      setLoading(false); // Explicitly set loading false if sign out had an error and listener might not fire as expected
    }
    return { error: signOutError };
  };

  const value = {
    user,
    loading,
    error,
    supabase,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
