// Temporary in-memory storage for MVP demo
// Replace with Supabase in production

import { GeneratedSite, RSVPResponse, Order } from "./types";

// In-memory storage
export const db = {
  sites: new Map<string, GeneratedSite>(),
  rsvps: new Map<string, RSVPResponse[]>(),
  orders: new Map<string, Order[]>(),
  users: new Map<string, any>(),
};

// Seed data
export function seedDemoSite() {
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
  db.sites.set(demoSlug, demo);

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
  db.rsvps.set(demoSlug, demoRsvps);
}

// Initialize demo data
seedDemoSite();
