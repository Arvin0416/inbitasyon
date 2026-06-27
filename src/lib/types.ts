export interface Template {
  id: string;
  name: string;
  description: string;
  styleTags: string[];
  image: string;
  previewImages: string[];
  features: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
}

export interface OrderFormData {
  coupleName1: string;
  coupleName2: string;
  email: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  photoUrl: string;
  colorPalette: string;
  notes: string;
  slug: string;
  templateId: string;
  tier: "self-serve" | "custom";
}

export interface GeneratedSite {
  id: string;
  slug: string;
  coupleName1: string;
  coupleName2: string;
  email: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  photoUrl: string;
  colorPalette: string;
  notes: string;
  templateId: string;
  tier: "self-serve" | "custom";
  status: "active" | "inactive";
  createdAt: string;
}

export interface RSVPResponse {
  id: string;
  siteId: string;
  guestName: string;
  attending: boolean;
  guestCount: number;
  message: string;
  email?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  email: string;
  slug: string;
  templateId: string;
  tier: "self-serve" | "custom";
  amount: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export interface DashboardStats {
  totalResponses: number;
  attending: number;
  notAttending: number;
  totalGuests: number;
}

export const COLOR_PALETTES = [
  { name: "Rose Gold & Cream", primary: "#B76E79", secondary: "#FFF5EE", accent: "#D4AF37" },
  { name: "Sage & Blush", primary: "#7B9E8D", secondary: "#FFE4E1", accent: "#C4A882" },
  { name: "Dusty Mauve & Navy", primary: "#8B6F8B", secondary: "#1B2A4A", accent: "#C9A96E" },
  { name: "Champagne & Ivory", primary: "#F7E7CE", secondary: "#FFFFF0", accent: "#D4AF37" },
  { name: "Classic Navy & Gold", primary: "#1B2A4A", secondary: "#F5F0EB", accent: "#C9A96E" },
  { name: "Romantic Blush & Gold", primary: "#E8B4B4", secondary: "#FFF8F0", accent: "#D4AF37" },
] as const;

export const PRICING = {
  "self-serve": { label: "Self-Serve", price: 29, description: "Perfect for couples who want a beautiful wedding website quickly." },
  "custom": { label: "Custom", price: 79, description: "Personalized design with custom colors, fonts, and more." },
} as const;
