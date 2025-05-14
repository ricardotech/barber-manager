"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

// Assuming LoginForm.tsx uses a schema like this
const loginSchema = {
  email: "",
  password: "",
};
type LoginCredentials = typeof loginSchema;


export async function signInWithEmail(credentials: LoginCredentials) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout"); // Revalidate all paths to update auth state
  // Redirect is handled by middleware or client-side router after success
  return { error: null };
}

export async function signOut() {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
    return { error };
  }
  
  revalidatePath("/", "layout");
  redirect("/login");
}
