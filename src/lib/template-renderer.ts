import type { GeneratedSite, Template, TemplateMetaVarDefinition } from "./types";

// Built-in variables derived from GeneratedSite fields.
// These are automatically available in any template's HTML.
export const BUILT_IN_VARIABLES: Array<{
  key: string;
  label: string;
  field: keyof GeneratedSite;
  type: string;
}> = [
  { key: "coupleName1", label: "First partner's name", field: "coupleName1", type: "text" },
  { key: "coupleName2", label: "Second partner's name", field: "coupleName2", type: "text" },
  { key: "email", label: "Email address", field: "email", type: "email" },
  { key: "weddingDate", label: "Wedding date", field: "weddingDate", type: "date" },
  { key: "weddingTime", label: "Wedding time", field: "weddingTime", type: "time" },
  { key: "venueName", label: "Venue name", field: "venueName", type: "text" },
  { key: "venueAddress", label: "Venue address", field: "venueAddress", type: "textarea" },
  { key: "notes", label: "Personal message", field: "notes", type: "textarea" },
  { key: "photoUrl", label: "Photo URL", field: "photoUrl", type: "image" },
  { key: "colorPalette", label: "Color palette", field: "colorPalette", type: "text" },
  { key: "slug", label: "URL slug", field: "slug", type: "text" },
  { key: "tier", label: "Plan tier", field: "tier", type: "text" },
  { key: "status", label: "Site status", field: "status", type: "text" },
];

/**
 * Build the full variable map for a given site.
 *
 * First takes built-in field values, then merges custom template_variables
 * (custom variables override built-in if there's a name collision).
 */
export function buildVariableMap(
  site: GeneratedSite
): Record<string, string> {
  const builtIn: Record<string, string> = {};
  for (const v of BUILT_IN_VARIABLES) {
    const val = site[v.field as keyof GeneratedSite];
    builtIn[v.key] = typeof val === "string" ? val : String(val ?? "");
  }
  return { ...builtIn, ...(site.templateVariables ?? {}) };
}

/**
 * Replace all {{key}} / {{ key }} placeholders in the HTML string
 * with the corresponding values from the variable map.
 *
 * Also handles:
 * - {{#if key}}...{{/if}}  — renders inner content if key is truthy
 * - {{#if key}}...{{else}}...{{/if}}  — renders first branch if truthy, else second
 * - Unknown variables are left as-is (or stripped if cleanUnknown: true)
 */
export function renderTemplateHtml(
  html: string,
  variables: Record<string, string>,
  options?: { cleanUnknown?: boolean }
): string {
  // 1. Handle {{#if key}}...{{else}}...{{/if}} blocks
  let result = html.replace(
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g,
    (_match, key, ifContent, elseContent) => {
      const val = variables[key];
      const isTruthy = val !== undefined && val !== null && val !== "" && val !== "false" && val !== "0";
      const inner = isTruthy ? ifContent : (elseContent ?? "");
      // Recursively process inner content
      return renderTemplateHtml(inner, variables, options);
    }
  );

  // 2. Replace {{key}} / {{ key }} placeholders
  result = result.replace(/\{\{(\s*)(\w+)(\s*)\}\}/g, (_match, _ws1, key, _ws2) => {
    return key in variables ? escapeHtml(variables[key]) : (options?.cleanUnknown ? "" : _match);
  });

  return result;
}

/**
 * Escape HTML entities to prevent XSS when injecting user content.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Get a list of all variable keys (built-in + custom) for display purposes.
 */
export function getAllVariableKeys(
  metadataDefs?: TemplateMetaVarDefinition[]
): string[] {
  const builtInKeys = BUILT_IN_VARIABLES.map((v) => v.key);
  const customKeys = (metadataDefs ?? []).map((d) => d.key);
  return [...new Set([...builtInKeys, ...customKeys])];
}
