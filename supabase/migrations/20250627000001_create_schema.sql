-- Invitasyon Database Schema
-- Run this in your Supabase SQL editor to create all tables

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Generated Sites ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS generated_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  couple_name_1 TEXT NOT NULL,
  couple_name_2 TEXT NOT NULL,
  email TEXT NOT NULL,
  wedding_date TEXT NOT NULL,
  wedding_time TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  venue_address TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  color_palette TEXT DEFAULT 'Rose Gold & Cream',
  notes TEXT DEFAULT '',
  template_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('self-serve', 'custom')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_generated_sites_slug ON generated_sites(slug);
CREATE INDEX IF NOT EXISTS idx_generated_sites_email ON generated_sites(email);

-- ─── RSVP Responses ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_slug TEXT NOT NULL REFERENCES generated_sites(slug) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1,
  message TEXT DEFAULT '',
  email TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_rsvp_responses_site_slug ON rsvp_responses(site_slug);

-- ─── Orders ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  slug TEXT NOT NULL,
  template_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('self-serve', 'custom')),
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_slug ON orders(slug);

-- ─── Templates (reference data) ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  style_tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '',
  preview_images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  primary_color TEXT DEFAULT '#E8B4B4',
  secondary_color TEXT DEFAULT '#FFF8F0',
  accent_color TEXT DEFAULT '#D4AF37',
  font_family TEXT DEFAULT 'Playfair Display',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed template data
INSERT INTO templates (id, name, description, style_tags, features, primary_color, secondary_color, accent_color, font_family) VALUES
  ('romantic-blush', 'Romantic Blush', 'A soft, romantic design with delicate floral accents and warm blush tones.', ARRAY['Romantic', 'Floral', 'Soft'], ARRAY['Custom color palette', 'Floral accent decorations', 'Mobile-optimized layout', 'RSVP management', 'Photo gallery section', 'Venue & directions'], '#E8B4B4', '#FFF8F0', '#D4AF37', 'Playfair Display'),
  ('classic-elegance', 'Classic Elegance', 'Timeless design with navy and gold tones. Sophisticated and refined for formal wedding celebrations.', ARRAY['Classic', 'Elegant', 'Formal'], ARRAY['Gold accent details', 'Navy color scheme', 'Timeless typography', 'RSVP management', 'Event schedule', 'Accommodation info'], '#1B2A4A', '#F5F0EB', '#C9A96E', 'Cormorant Garamond'),
  ('garden-sage', 'Garden Sage', 'Earthy and organic with sage green and dusty rose accents. Ideal for outdoor and garden weddings.', ARRAY['Garden', 'Earthy', 'Organic'], ARRAY['Sage green palette', 'Botanical illustrations', 'Natural textures', 'RSVP management', 'Photo gallery', 'Registry links'], '#7B9E8D', '#FFE4E1', '#C4A882', 'Lora'),
  ('minimal-chic', 'Minimal Chic', 'Clean, modern, and minimalist. Simple lines and elegant whitespace.', ARRAY['Minimal', 'Modern', 'Clean'], ARRAY['Clean typography', 'Minimalist layout', 'Monochrome palette', 'RSVP management', 'Photo gallery', 'Event details'], '#2C2C2C', '#FAFAFA', '#C9A96E', 'Inter'),
  ('vintage-lace', 'Vintage Lace', 'Vintage-inspired with lace textures and warm cream tones.', ARRAY['Vintage', 'Lace', 'Warm'], ARRAY['Lace texture overlays', 'Vintage color palette', 'Ornamental details', 'RSVP management', 'Photo gallery', 'Accommodation info'], '#D4A574', '#FFF8F0', '#8B6F8B', 'Playfair Display'),
  ('tropical-breeze', 'Tropical Breeze', 'Bright and vibrant with tropical floral elements.', ARRAY['Tropical', 'Vibrant', 'Beachy'], ARRAY['Tropical palette', 'Beach elements', 'Vibrant colors', 'RSVP management', 'Photo gallery', 'Travel info'], '#2E8B57', '#FFF5EE', '#FF6B6B', 'DM Serif Display')
ON CONFLICT (id) DO NOTHING;

-- Seed demo site
INSERT INTO generated_sites (slug, couple_name_1, couple_name_2, email, wedding_date, wedding_time, venue_name, venue_address, color_palette, notes, template_id, tier, status) VALUES
  ('arvin-angel', 'Arvin', 'Angel', 'arvin@example.com', '2026-12-15', '15:00', 'The Grand Garden Pavilion', '123 Love Street, Manila, Philippines', 'Rose Gold & Cream', 'Can''t wait to celebrate with everyone!', 'romantic-blush', 'self-serve', 'active')
ON CONFLICT (slug) DO NOTHING;

-- Seed demo RSVPs
INSERT INTO rsvp_responses (site_slug, guest_name, attending, guest_count, message, email) VALUES
  ('arvin-angel', 'Maria Santos', true, 2, 'So excited for you both!', 'maria@example.com'),
  ('arvin-angel', 'Juan Dela Cruz', false, 0, 'Sorry we can''t make it. Wishing you all the best!', NULL),
  ('arvin-angel', 'The Reyes Family', true, 4, 'Looking forward to the wedding!', 'reyes@example.com')
ON CONFLICT DO NOTHING;
