"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Barbershop, BarbershopRow } from "@/lib/types";
import { revalidatePath } from "next/cache";

// Fetch all barbershops (simplified version for table)
export async function getBarbershops(): Promise<BarbershopRow[]> {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return []; // Or throw error
  }

  const { data, error } = await supabase
    .from("barbershops")
    .select("id, name, address, phone, created_at")
    .eq("user_id", user.id) // Assuming RLS is set up or filtering by user_id
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
  const { data, error } = await supabase
    .from("barbershops")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching barbershop by ID:", error);
    return null;
  }
  return data;
}

// Create a new barbershop (simplified placeholder for now)
// In a real scenario, this would take BarbershopFormData
export async function createBarbershop(formData: Partial<Barbershop>) {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated", data: null };
  }

  // Basic validation or use Zod
  if (!formData.name) {
    return { error: "Barbershop name is required", data: null };
  }
  
  const { data, error } = await supabase
    .from("barbershops")
    .insert([{ ...formData, user_id: user.id }])
    .select()
    .single();

  if (error) {
    console.error("Error creating barbershop:", error);
    return { error: error.message, data: null };
  }

  revalidatePath("/app/barbershops");
  return { error: null, data };
}

// Update a barbershop (placeholder)
export async function updateBarbershop(id: string, formData: Partial<Barbershop>) {
  const supabase = createSupabaseServerClient();
   const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not authenticated", data: null };
  }

  const { data, error } await supabase
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


// Delete a barbershop (placeholder)
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

