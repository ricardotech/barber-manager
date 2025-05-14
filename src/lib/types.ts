export interface Barbershop {
  id: string; // UUID
  user_id: string; // UUID of the admin who created it
  name: string;
  logo_url?: string | null; // Allow null for DB consistency
  address?: string | null;
  phone?: string | null;
  opening_time?: string | null; // Format "HH:MM"
  closing_time?: string | null; // Format "HH:MM"
  appointment_duration_minutes?: number | null;
  theme?: BarbershopTheme | null;
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}

export interface BarbershopTheme {
  primary_color?: string | null; // Hex color
  secondary_color?: string | null; // Hex color
  accent_color?: string | null; // Hex color
  logo_mobile_url?: string | null; 
}

export interface Service {
  id: string; // UUID
  barbershop_id: string; // UUID
  name: string;
  price: number; // Store as a numeric value (e.g., 170.00)
  duration_minutes: number;
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}

export interface Professional {
  id: string; // UUID
  barbershop_id: string; // UUID
  name: string;
  image_url?: string;
  rating?: number; // e.g. 4.5
  created_at: string; // Timestamp
  updated_at: string; // Timestamp
}

// For Supabase table data fetching (e.g. with react-table)
export type BarbershopRow = Pick<Barbershop, "id" | "name" | "address" | "phone" | "created_at">;
