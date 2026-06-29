// Data store: sync in-memory for instant access + async Supabase backup
import { GeneratedSite, RSVPResponse, Order, Template, TemplateMetaVarDefinition } from "./types";
import { isSupabaseConfigured } from "./supabase";
import {
  createSite,
  getSiteBySlug,
  listAllSites,
  getRSVPsBySlug,
  listAllRSVPs,
  createRSVP,
  listAllOrders,
  createOrder,
} from "./supabase-service";

// In-memory storage (always available, Supabase syncs in background)
const inMemorySites = new Map<string, GeneratedSite>();
const inMemoryRsvps = new Map<string, RSVPResponse[]>();
const inMemoryOrders = new Map<string, Order[]>();

// ─── Templates (in-memory, sync with Supabase) ──────────────────────────────
export const localTemplates: Template[] = [];

// Import the local template data for seeding
import { templates as seedTemplates } from "@/data/templates";

// Seed local templates from the hardcoded data on first load
(function seedLocalTemplates() {
  if (localTemplates.length === 0) {
    for (const t of seedTemplates) {
      localTemplates.push({ ...t, htmlContent: "" });
    }
  }
})();

export async function syncTemplates(): Promise<void> {
  if (isSupabaseConfigured()) {
    const { listAllTemplates } = await import("./supabase-service");
    const { data } = await listAllTemplates();
    if (data) {
      localTemplates.length = 0;
      localTemplates.push(...data);
    }
  }
}

// ─── Synchronous (in-memory) access for pages ───────────────────────────────

export const db = {
  sites: {
    get(slug: string): GeneratedSite | undefined {
      return inMemorySites.get(slug);
    },
    values(): GeneratedSite[] {
      return Array.from(inMemorySites.values());
    },
    get size() {
      return inMemorySites.size;
    },
  },
  rsvps: {
    get(slug: string): RSVPResponse[] | undefined {
      return inMemoryRsvps.get(slug);
    },
    entries(): [string, RSVPResponse[]][] {
      return Array.from(inMemoryRsvps.entries());
    },
    values(): RSVPResponse[][] {
      return Array.from(inMemoryRsvps.values());
    },
    get size() {
      return inMemoryRsvps.size;
    },
    set(slug: string, data: RSVPResponse[]) {
      inMemoryRsvps.set(slug, data);
    },
  },
  orders: {
    get(slug: string): Order[] | undefined {
      return inMemoryOrders.get(slug);
    },
    values(): Order[][] {
      return Array.from(inMemoryOrders.values());
    },
  },
};

// ─── Async (Supabase-backed) operations ─────────────────────────────────────

export async function saveSite(site: GeneratedSite): Promise<void> {
  inMemorySites.set(site.slug, site);
  if (isSupabaseConfigured()) {
    await createSite(site);
  }
}

export async function fetchSiteBySlug(slug: string): Promise<GeneratedSite | null> {
  // Check memory first (instant)
  const cached = inMemorySites.get(slug);
  if (cached) return cached;

  // Fallback to Supabase
  if (isSupabaseConfigured()) {
    const { data } = await getSiteBySlug(slug);
    if (data) {
      inMemorySites.set(slug, data);
      return data;
    }
  }
  return null;
}

export async function syncAllSites(): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data } = await listAllSites();
    if (data) {
      data.forEach((site) => inMemorySites.set(site.slug, site));
    }
  }
}

export async function saveRSVP(rsvp: RSVPResponse): Promise<void> {
  const existing = inMemoryRsvps.get(rsvp.siteId) || [];
  existing.push(rsvp);
  inMemoryRsvps.set(rsvp.siteId, existing);

  if (isSupabaseConfigured()) {
    await createRSVP(rsvp);
  }
}

export async function fetchRSVPsBySlug(slug: string): Promise<RSVPResponse[]> {
  const cached = inMemoryRsvps.get(slug);
  if (cached && cached.length > 0) return cached;

  if (isSupabaseConfigured()) {
    const { data } = await getRSVPsBySlug(slug);
    if (data) {
      inMemoryRsvps.set(slug, data);
      return data;
    }
  }
  return inMemoryRsvps.get(slug) ?? [];
}

export async function syncAllRSVPs(): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data } = await listAllRSVPs();
    if (data) {
      const grouped = new Map<string, RSVPResponse[]>();
      data.forEach((rsvp) => {
        const existing = grouped.get(rsvp.siteId) || [];
        existing.push(rsvp);
        grouped.set(rsvp.siteId, existing);
      });
      grouped.forEach((rsvps, slug) => inMemoryRsvps.set(slug, rsvps));
    }
  }
}

export async function saveOrder(order: Order): Promise<void> {
  const existing = inMemoryOrders.get(order.slug) || [];
  existing.push(order);
  inMemoryOrders.set(order.slug, existing);

  if (isSupabaseConfigured()) {
    await createOrder(order);
  }
}

export async function syncAllOrders(): Promise<void> {
  if (isSupabaseConfigured()) {
    const { data } = await listAllOrders();
    if (data) {
      const grouped = new Map<string, Order[]>();
      data.forEach((order) => {
        const existing = grouped.get(order.slug) || [];
        existing.push(order);
        grouped.set(order.slug, existing);
      });
      grouped.forEach((orders, slug) => inMemoryOrders.set(slug, orders));
    }
  }
}

// ─── Demo data seed ─────────────────────────────────────────────────────────

export function seedDemoData() {
  if (inMemorySites.size > 0) return;

  const demoSlug = "arvin-angel";
  const demo: GeneratedSite = {
    id: "demo-1",
    slug: demoSlug,
    coupleName1: "Arvin",
    coupleName2: "Angel",
    email: "arvin@example.com",
    weddingDate: "2026-12-15",
    weddingTime: "15:00",
    venueName: "The Grand Garden Pavilion",
    venueAddress: "123 Love Street, Manila, Philippines",
    photoUrl: "",
    colorPalette: "Rose Gold & Cream",
    notes: "Can't wait to celebrate with everyone!",
    templateId: "romantic-blush",
    tier: "self-serve",
    status: "active",
    createdAt: new Date().toISOString(),
  };
  inMemorySites.set(demoSlug, demo);

  const demoRsvps: RSVPResponse[] = [
    {
      id: "rsvp-1",
      siteId: demoSlug,
      guestName: "Maria Santos",
      attending: true,
      guestCount: 2,
      message: "So excited for you both!",
      email: "maria@example.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: "rsvp-2",
      siteId: demoSlug,
      guestName: "Juan Dela Cruz",
      attending: false,
      guestCount: 0,
      message: "Sorry we can't make it. Wishing you all the best!",
      createdAt: new Date().toISOString(),
    },
    {
      id: "rsvp-3",
      siteId: demoSlug,
      guestName: "The Reyes Family",
      attending: true,
      guestCount: 4,
      message: "Looking forward to the wedding!",
      email: "reyes@example.com",
      createdAt: new Date().toISOString(),
    },
  ];
  inMemoryRsvps.set(demoSlug, demoRsvps);
}

// Initialize demo data
seedDemoData();
