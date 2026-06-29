"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let authClient: ReturnType<typeof createClient> | null = null;

export function getAuthClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  if (!authClient) {
    authClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: "invitasyon-auth",
      },
    });
  }
  return authClient;
}

export function isAuthConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey);
}
