-- Template Management Schema
-- Run this in your Supabase SQL editor to add template management capabilities

-- Add html_content to templates for user-pasted HTML
ALTER TABLE templates ADD COLUMN IF NOT EXISTS html_content TEXT DEFAULT '';

-- ─── Template Metadata Definitions ──────────────────────────────────────────
-- Defines what variables a template expects (e.g. {{coupleName1}}, {{customMessage}})
-- These are rendered in the template's HTML by replacing {{key}} with actual values

CREATE TABLE IF NOT EXISTS template_metadata_definitions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id TEXT NOT NULL REFERENCES templates(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'date', 'time', 'color', 'textarea', 'image', 'email', 'select', 'number')),
  options JSONB DEFAULT '[]'::jsonb,
  default_value TEXT DEFAULT '',
  required BOOLEAN DEFAULT false,
  placeholder TEXT DEFAULT '',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(template_id, key)
);

-- ─── Add template_variables to generated_sites ──────────────────────────────
-- Stores the actual variable values for each generated site (beyond the built-in fields)

ALTER TABLE generated_sites ADD COLUMN IF NOT EXISTS template_variables JSONB DEFAULT '{}'::jsonb;

-- Index for looking up metadata definitions by template
CREATE INDEX IF NOT EXISTS idx_template_metadata_template_id ON template_metadata_definitions(template_id);
