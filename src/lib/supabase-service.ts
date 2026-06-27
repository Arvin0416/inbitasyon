import { getSupabaseClient, isSupabaseConfigured } from "./supabase";
import type { GeneratedSite, RSVPResponse, Order } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */

function toSite(row: any): GeneratedSite {
  return {
    id: row.id,
    slug: row.slug,
    coupleName1: row.couple_name_1,
    coupleName2: row.couple_name_2,
    email: row.email,
    weddingDate: row.wedding_date,
    weddingTime: row.wedding_time,
    venueName: row.venue_name,
    venueAddress: row.venue_address ?? "",
    photoUrl: row.photo_url ?? "",
    colorPalette: row.color_palette ?? "Rose Gold & Cream",
    notes: row.notes ?? "",
    templateId: row.template_id,
    tier: row.tier,
    status: row.status ?? "active",
    createdAt: row.created_at,
  };
}

function toRSVP(row: any): RSVPResponse {
  return {
    id: row.id,
    siteId: row.site_slug,
    guestName: row.guest_name,
    attending: row.attending,
    guestCount: row.guest_count,
    message: row.message ?? "",
    email: row.email ?? undefined,
    createdAt: row.created_at,
  };
}

function toOrder(row: any): Order {
  return {
    id: row.id,
    email: row.email,
    slug: row.slug,
    templateId: row.template_id,
    tier: row.tier,
    amount: row.amount,
    status: row.status ?? "pending",
    createdAt: row.created_at,
  };
}

// ─── Sites ───────────────────────────────────────────────────────────────────

export async function createSite(site: GeneratedSite): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { error } = await supabase.from("generated_sites").insert({
    slug: site.slug,
    couple_name_1: site.coupleName1,
    couple_name_2: site.coupleName2,
    email: site.email,
    wedding_date: site.weddingDate,
    wedding_time: site.weddingTime,
    venue_name: site.venueName,
    venue_address: site.venueAddress,
    photo_url: site.photoUrl,
    color_palette: site.colorPalette,
    notes: site.notes,
    template_id: site.templateId,
    tier: site.tier,
    status: site.status,
  } as any);

  if (error) return { error: error.message };
  return {};
}

export async function getSiteBySlug(slug: string): Promise<{ data?: GeneratedSite; error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("generated_sites")
    .select("*")
    .eq("slug", slug)
    .maybeSingle() as any;

  if (error) return { error: error.message };
  if (!data) return { error: "Site not found" };

  return { data: toSite(data) };
}

export async function listAllSites(): Promise<{ data?: GeneratedSite[]; error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("generated_sites")
    .select("*")
    .order("created_at", { ascending: false }) as any;

  if (error) return { error: error.message };

  return { data: (data ?? []).map(toSite) };
}

export async function updateSiteStatus(
  slug: string,
  status: "active" | "inactive"
): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { error } = await (supabase as any)
    .from("generated_sites")
    .update({ status })
    .eq("slug", slug);

  if (error) return { error: error.message };
  return {};
}

// ─── RSVPs ───────────────────────────────────────────────────────────────────

export async function createRSVP(rsvp: RSVPResponse): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { error } = await supabase.from("rsvp_responses").insert({
    site_slug: rsvp.siteId,
    guest_name: rsvp.guestName,
    attending: rsvp.attending,
    guest_count: rsvp.guestCount,
    message: rsvp.message,
    email: rsvp.email || null,
  } as any);

  if (error) return { error: error.message };
  return {};
}

export async function getRSVPsBySlug(slug: string): Promise<{ data?: RSVPResponse[]; error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .eq("site_slug", slug)
    .order("created_at", { ascending: false }) as any;

  if (error) return { error: error.message };

  return { data: (data ?? []).map(toRSVP) };
}

export async function listAllRSVPs(): Promise<{ data?: RSVPResponse[]; error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("rsvp_responses")
    .select("*")
    .order("created_at", { ascending: false }) as any;

  if (error) return { error: error.message };

  return { data: (data ?? []).map(toRSVP) };
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function createOrder(order: Order): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { error } = await supabase.from("orders").insert({
    email: order.email,
    slug: order.slug,
    template_id: order.templateId,
    tier: order.tier,
    amount: order.amount,
  } as any);

  if (error) return { error: error.message };
  return {};
}

export async function listAllOrders(): Promise<{ data?: Order[]; error?: string }> {
  if (!isSupabaseConfigured()) return { error: "Supabase not configured" };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false }) as any;

  if (error) return { error: error.message };

  return { data: (data ?? []).map(toOrder) };
}
