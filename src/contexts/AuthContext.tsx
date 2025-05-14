
"use client";

import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, AuthError, SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { SupabaseClient } from '@supabase/supabase-js';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  supabase: SupabaseClient | null;
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
    if (!supabase) return;

    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === 'SIGNED_OUT') {
          // Ensure redirect to login after sign out from anywhere
          router.push('/login');
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const signIn = async (credentials: SignInWithPasswordCredentials) => {
    if (!supabase) return { error: { message: "Supabase client not initialized", name: "AuthError", status: 500 } as AuthError };
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword(credentials);
    setError(signInError);
    setLoading(false);
    if (!signInError) {
       router.push('/app/barbershops');
       router.refresh(); // to ensure layout re-renders with new auth state if needed
    }
    return { error: signInError };
  };

  const signOut = async () => {
    if (!supabase) return { error: { message: "Supabase client not initialized", name: "AuthError", status: 500 } as AuthError };
    setLoading(true);
    const { error: signOutError } = await supabase.auth.signOut();
    setError(signOutError);
    setLoading(false);
    // onAuthStateChange will handle redirect
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
