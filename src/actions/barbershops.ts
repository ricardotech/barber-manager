
"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Barbershop, BarbershopRow, BarbershopTheme } from "@/lib/types";
import { revalidatePath } from "next/cache";

const DEFAULT_THEME: BarbershopTheme = {
  primary_color: "#0A84FF", // accentBlue from user's spec
  secondary_color: "#6CB2FF", // secondaryAccentBlue from user's spec
  accent_color: "#FF9500", // accentOrange from user's spec
  logo_mobile_url: "",
};

// Fetch all barbershops (simplified version for table)
export async function getBarbershops(): Promise<BarbershopRow[]> {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated for getBarbershops");
    return []; 
  }

  const { data, error } = await supabase
    .from("barbershops")
    .select("id, name, address, phone, created_at")
    .eq("user_id", user.id) 
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching barbershops:", error);
    return [];
  }
  return data as BarbershopRow[];
}

// Fetch a single barbershop by ID
export async function getBarbershopById(id: string): Promise<Barbershop | null> {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error("User not authenticated for getBarbershopById");
    return null;
  }

  const { data, error } = await supabase
    .from("barbershops")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id) // Ensure user owns the record
    .single();

  if (error) {
    console.error("Error fetching barbershop by ID:", error);
    return null;
  }
  // Ensure theme is an object, even if null from DB, for form consistency
  return { ...data, theme: data.theme || DEFAULT_THEME } as Barbershop;
}

// Create a new barbershop
export async function createBarbershop(formData: Partial<Omit<Barbershop, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'theme'> & { theme?: Partial<BarbershopTheme> }>) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated", data: null };
  }

  if (!formData.name) {
    return { error: "Barbershop name is required", data: null };
  }
  
  const barbershopToInsert = {
    ...formData,
    user_id: user.id,
    theme: { ...DEFAULT_THEME, ...formData.theme }, // Merge with defaults, allow partial override
  };

  const { data, error } = await supabase
    .from("barbershops")
    .insert([barbershopToInsert])
    .select()
    .single();

  if (error) {
    console.error("Error creating barbershop:", error);
    return { error: error.message, data: null };
  }

  revalidatePath("/app/barbershops");
  return { error: null, data };
}

// Update a barbershop
export async function updateBarbershop(id: string, formData: Partial<Barbershop>) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated", data: null };
  }

  // If formData includes theme, ensure it's handled correctly for JSONB update
  // Supabase client typically handles partial JSONB updates fine if you pass `theme: { new_color: ... }`
  // However, to be safe, we might fetch existing theme and merge if only partial theme is sent.
  // For now, assuming `formData.theme` if provided, is the complete new theme object or `null`.

  const { data, error } = await supabase
    .from("barbershops")
    .update(formData)
    .eq("id", id)
    .eq("user_id", user.id) // Ensure user owns the record
    .select()
    .single();

  if (error) {
    console.error("Error updating barbershop:", error);
    return { error: error.message, data: null };
  }
  
  revalidatePath("/app/barbershops");
  revalidatePath(`/app/barbershops/${id}`);
  return { error: null, data };
}


// Delete a barbershop
export async function deleteBarbershop(id: string) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated" };
  }

  const { error } = await supabase
    .from("barbershops")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Ensure user owns the record

  if (error) {
    console.error("Error deleting barbershop:", error);
    return { error: error.message };
  }
  
  revalidatePath("/app/barbershops");
  return { error: null };
}
