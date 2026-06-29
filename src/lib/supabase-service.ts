import { getSupabaseClient, isSupabaseConfigured } from "./supabase";
import type { GeneratedSite, RSVPResponse, Order, Template, TemplateMetaVarDefinition } from "./types";
import { localTemplates, syncTemplates } from "./store";

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

// ─── Templates ────────────────────────────────────────────────────────────────

export async function createTemplate(template: Template): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) {
    // In-memory only — save locally
    localTemplates.push(template);
    return {};
  }

  const supabase = getSupabaseClient()!;

  const { error } = await supabase.from("templates").insert({
    id: template.id,
    name: template.name,
    description: template.description,
    style_tags: template.styleTags,
    image_url: template.image,
    preview_images: template.previewImages,
    features: template.features,
    primary_color: template.primaryColor,
    secondary_color: template.secondaryColor,
    accent_color: template.accentColor,
    font_family: template.fontFamily,
    html_content: template.htmlContent ?? "",
  } as any);    if (error) return { error: error.message };

  // Save metadata definitions
  if (template.metadataDefinitions && template.metadataDefinitions.length > 0) {
    const defRows = template.metadataDefinitions.map((def) => ({
      template_id: def.templateId,
      key: def.key,
      label: def.label,
      type: def.type,
      options: def.options ?? [],
      default_value: def.defaultValue,
      required: def.required,
      placeholder: def.placeholder,
      order: def.order,
    }));
    const { error: defsError } = await (supabase as any)
      .from("template_metadata_definitions")
      .insert(defRows);

    if (defsError) return { error: defsError.message };
  }

  // Sync back to local store
  await syncTemplates();
  return {};
}

export async function updateTemplate(template: Template): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) {
    // Update in-memory
    const idx = localTemplates.findIndex((t) => t.id === template.id);
    if (idx >= 0) localTemplates[idx] = template;
    return {};
  }

  const supabase = getSupabaseClient()!;

  const { error } = await (supabase as any)
    .from("templates")
    .update({
      name: template.name,
      description: template.description,
      style_tags: template.styleTags,
      image_url: template.image,
      preview_images: template.previewImages,
      features: template.features,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      font_family: template.fontFamily,
      html_content: template.htmlContent ?? "",
    })
    .eq("id", template.id);

  if (error) return { error: error.message };

  // Replace metadata definitions: delete all, then re-insert
  await (supabase as any).from("template_metadata_definitions").delete().eq("template_id", template.id);

  if (template.metadataDefinitions && template.metadataDefinitions.length > 0) {
    const defRows = template.metadataDefinitions.map((def) => ({
      template_id: def.templateId,
      key: def.key,
      label: def.label,
      type: def.type,
      options: def.options ?? [],
      default_value: def.defaultValue,
      required: def.required,
      placeholder: def.placeholder,
      order: def.order,
    }));
    const { error: defsError } = await (supabase as any)
      .from("template_metadata_definitions")
      .insert(defRows);

    if (defsError) return { error: defsError.message };
  }

  await syncTemplates();
  return {};
}

export async function deleteTemplate(id: string): Promise<{ error?: string }> {
  if (!isSupabaseConfigured()) {
    const idx = localTemplates.findIndex((t) => t.id === id);
    if (idx >= 0) localTemplates.splice(idx, 1);
    return {};
  }

  const supabase = getSupabaseClient()!;

  // Delete metadata definitions first (cascade should handle it, but explicit is safer)
  await (supabase as any).from("template_metadata_definitions").delete().eq("template_id", id);

  const { error } = await (supabase as any).from("templates").delete().eq("id", id);

  if (error) return { error: error.message };

  await syncTemplates();
  return {};
}

export async function listAllTemplates(): Promise<{ data?: Template[]; error?: string }> {
  if (!isSupabaseConfigured()) return { data: [...localTemplates] };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: false }) as any;

  if (error) return { error: error.message };

  // Fetch metadata definitions for all templates
  const templateRows: Template[] = (data ?? []).map((row: any) => toTemplate(row));

  // Fetch definitions for each (in parallel for performance)
  const defsResults = await Promise.all(
    templateRows.map((t) => getMetadataDefinitions(t.id))
  );
  for (let i = 0; i < templateRows.length; i++) {
    templateRows[i].metadataDefinitions = defsResults[i].data;
  }

  return { data: templateRows };
}

export async function getMetadataDefinitions(templateId: string): Promise<{
  data?: TemplateMetaVarDefinition[];
  error?: string;
}> {
  if (!isSupabaseConfigured()) return { data: [] };

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("template_metadata_definitions")
    .select("*")
    .eq("template_id", templateId)
    .order("order", { ascending: true }) as any;

  if (error) return { error: error.message };

  return {
    data: (data ?? []).map(toMetaDef),
  };
}

export async function fetchTemplateById(id: string): Promise<{
  data?: Template;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    const t = localTemplates.find((t) => t.id === id);
    return { data: t };
  }

  const supabase = getSupabaseClient()!;

  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("id", id)
    .maybeSingle() as any;

  if (error) return { error: error.message };
  if (!data) return { error: "Template not found" };

  // Also fetch metadata definitions
  const { data: defs } = await getMetadataDefinitions(id);

  return { data: toTemplate(data, defs) };
}

function toTemplate(row: any, defs?: TemplateMetaVarDefinition[]): Template {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "",
    styleTags: row.style_tags ?? [],
    image: row.image_url ?? "",
    previewImages: row.preview_images ?? [],
    features: row.features ?? [],
    primaryColor: row.primary_color ?? "#E8B4B4",
    secondaryColor: row.secondary_color ?? "#FFF8F0",
    accentColor: row.accent_color ?? "#D4AF37",
    fontFamily: row.font_family ?? "Playfair Display",
    htmlContent: row.html_content ?? "",
    metadataDefinitions: defs,
  };
}

function toMetaDef(row: any): TemplateMetaVarDefinition {
  return {
    id: row.id,
    templateId: row.template_id,
    key: row.key,
    label: row.label,
    type: row.type,
    options: row.options ?? [],
    defaultValue: row.default_value ?? "",
    required: row.required ?? false,
    placeholder: row.placeholder ?? "",
    order: row.order ?? 0,
  };
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
