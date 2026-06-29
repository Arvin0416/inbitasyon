"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { localTemplates } from "@/lib/store";
import { updateTemplate, getMetadataDefinitions } from "@/lib/supabase-service";
import type { Template, TemplateMetaVarDefinition } from "@/lib/types";
import { generateSlug } from "@/lib/utils";
import { ArrowLeft, Plus, Trash2, GripVertical, Code2, Eye, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

const VAR_TYPES = [
  { value: "text", label: "Text" },
  { value: "date", label: "Date" },
  { value: "time", label: "Time" },
  { value: "textarea", label: "Textarea" },
  { value: "color", label: "Color" },
  { value: "image", label: "Image URL" },
  { value: "email", label: "Email" },
  { value: "select", label: "Select (Dropdown)" },
  { value: "number", label: "Number" },
] as const;

interface VarDef {
  key: string;
  label: string;
  type: string;
  options: string;
  defaultValue: string;
  required: boolean;
  placeholder: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  // Loading state
  const [loading, setLoading] = useState(true);

  // Basic info
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [styleTagsStr, setStyleTagsStr] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#E8B4B4");
  const [secondaryColor, setSecondaryColor] = useState("#FFF8F0");
  const [accentColor, setAccentColor] = useState("#D4AF37");
  const [fontFamily, setFontFamily] = useState("Playfair Display");

  // HTML content
  const [htmlContent, setHtmlContent] = useState("");

  // Metadata definitions
  const [varDefs, setVarDefs] = useState<VarDef[]>([]);

  // State
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load template data
  useEffect(() => {
    const load = async () => {
      const template = localTemplates.find((t) => t.id === templateId);
      if (!template) {
        toast.error("Template not found");
        router.push("/admin/templates");
        return;
      }

      setName(template.name);
      setDescription(template.description);
      setStyleTagsStr(template.styleTags.join(", "));
      setPrimaryColor(template.primaryColor);
      setSecondaryColor(template.secondaryColor);
      setAccentColor(template.accentColor);
      setFontFamily(template.fontFamily);
      setHtmlContent(template.htmlContent || "");

      // Fetch metadata definitions if available
      let defs = template.metadataDefinitions;
      if (!defs || defs.length === 0) {
        const { data } = await getMetadataDefinitions(templateId);
        defs = data;
      }

      if (defs && defs.length > 0) {
        setVarDefs(
          defs.map((d) => ({
            key: d.key,
            label: d.label,
            type: d.type,
            options: d.options?.join(", ") || "",
            defaultValue: d.defaultValue,
            required: d.required,
            placeholder: d.placeholder,
          }))
        );
      }

      setLoading(false);
    };
    load();
  }, [templateId, router]);

  const addVarDef = () => {
    setVarDefs((prev) => [
      ...prev,
      {
        key: "",
        label: "",
        type: "text",
        options: "",
        defaultValue: "",
        required: false,
        placeholder: "",
      },
    ]);
  };

  const updateVarDef = (index: number, field: keyof VarDef, value: string | boolean) => {
    setVarDefs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (field === "label" && typeof value === "string" && !next[index].key) {
        next[index].key = generateSlug(value);
      }
      return next;
    });
  };

  const removeVarDef = (index: number) => {
    setVarDefs((prev) => prev.filter((_, i) => i !== index));
  };

  const moveVarDef = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= varDefs.length) return;
    setVarDefs((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  const previewVariables: Record<string, string> = {
    coupleName1: "Arvin",
    coupleName2: "Angel",
    weddingDate: "December 15, 2026",
    weddingTime: "3:00 PM",
    venueName: "The Grand Garden Pavilion",
    venueAddress: "123 Love Street, Manila",
    notes: "Can't wait to celebrate with everyone!",
    ...Object.fromEntries(
      varDefs.map((d) => [d.key, d.defaultValue || `[${d.label}]`])
    ),
  };

  const renderPreview = () => {
    let html = htmlContent;
    for (const [key, val] of Object.entries(previewVariables)) {
      html = html.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g"), val);
    }
    html = html.replace(/\{\{#if\s+\w+\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, content) => content);
    return html;
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Template name is required");
      return;
    }

    setIsSaving(true);

    const styleTags = styleTagsStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const metadataDefinitions: TemplateMetaVarDefinition[] = varDefs
      .filter((d) => d.key.trim())
      .map((d, i) => ({
        id: generateId(),
        templateId,
        key: d.key.trim(),
        label: d.label.trim() || d.key.trim(),
        type: d.type as TemplateMetaVarDefinition["type"],
        options: d.type === "select" ? d.options.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
        defaultValue: d.defaultValue,
        required: d.required,
        placeholder: d.placeholder,
        order: i,
      }));

    const template: Template = {
      id: templateId,
      name: name.trim(),
      description: description.trim(),
      styleTags,
      image: "",
      previewImages: [],
      features: [],
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily,
      htmlContent,
      metadataDefinitions,
    };

    const { error } = await updateTemplate(template);

    if (error) {
      toast.error(error);
      setIsSaving(false);
    } else {
      toast.success("Template updated!");
      router.push("/admin/templates");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-olive-600 mx-auto mb-3" />
          <p className="text-sm text-charcoal-500">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/admin/templates")}
          className="p-2 rounded-lg text-charcoal-400 hover:text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-olive-800">
            Edit Template
          </h1>
          <p className="text-charcoal-500 text-sm">
            Editing: <span className="font-medium text-olive-700">{name}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Basic info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-olive-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font family</Label>
                  <Input
                    id="fontFamily"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="styleTags">Style tags (comma-separated)</Label>
                <Input
                  id="styleTags"
                  value={styleTagsStr}
                  onChange={(e) => setStyleTagsStr(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Primary</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-olive-200 cursor-pointer"
                    />
                    <span className="text-xs text-charcoal-500">{primaryColor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-olive-200 cursor-pointer"
                    />
                    <span className="text-xs text-charcoal-500">{secondaryColor}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-olive-200 cursor-pointer"
                    />
                    <span className="text-xs text-charcoal-500">{accentColor}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* HTML Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-olive-600" />
                  HTML Template
                </CardTitle>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    showPreview
                      ? "bg-olive-100 text-olive-700"
                      : "bg-cream-100 text-charcoal-500 hover:bg-cream-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  {showPreview ? "Editor" : "Preview"}
                </button>
              </div>
              <p className="text-xs text-charcoal-400 mt-1">
                Use <code className="bg-cream-100 px-1 rounded">{`{{variableName}}`}</code> to insert values.
              </p>
            </CardHeader>
            <CardContent>
              {showPreview ? (
                <div className="border border-olive-200 rounded-xl overflow-hidden bg-white">
                  <div className="bg-cream-50 px-4 py-2 border-b border-olive-100 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-olive-600" />
                    <span className="text-xs font-medium text-olive-700">Preview with sample data</span>
                  </div>
                  <iframe
                    srcDoc={renderPreview()}
                    className="w-full h-[500px]"
                    title="Template preview"
                    sandbox="allow-same-origin"
                  />
                </div>
              ) : (
                <textarea
                  value={htmlContent}
                  onChange={(e) => setHtmlContent(e.target.value)}
                  className="w-full h-[500px] font-mono text-sm p-4 border border-olive-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-olive-400 resize-y bg-white text-olive-900"
                  spellCheck={false}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-olive-600" />
                  Metadata Variables
                </CardTitle>
                <button
                  onClick={addVarDef}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-olive-600 text-white rounded-lg text-xs font-medium hover:bg-olive-700 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              <p className="text-xs text-charcoal-400 mt-1">
                Define custom variables beyond the built-in ones.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-cream-50 rounded-xl p-3">
                <p className="text-xs font-medium text-olive-700 mb-2">Built-in variables:</p>
                <div className="flex flex-wrap gap-1">
                  {["coupleName1", "coupleName2", "weddingDate", "weddingTime", "venueName", "venueAddress", "notes", "photoUrl", "colorPalette", "slug", "email"].map((v) => (
                    <code key={v} className="text-[10px] bg-white px-1.5 py-0.5 rounded text-olive-600 border border-olive-200">
                      {`{{${v}}}`}
                    </code>
                  ))}
                </div>
              </div>

              {varDefs.length === 0 ? (
                <div className="text-center py-6 text-charcoal-400 text-sm">
                  No custom variables yet.
                </div>
              ) : (
                varDefs.map((def, i) => (
                  <Card key={i} className="border border-olive-200">
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-olive-700">Variable {i + 1}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveVarDef(i, -1)}
                            disabled={i === 0}
                            className="p-1 text-charcoal-400 hover:text-olive-700 disabled:opacity-30"
                          >
                            <GripVertical className="w-3 h-3 rotate-90" />
                          </button>
                          <button
                            onClick={() => removeVarDef(i)}
                            className="p-1 text-charcoal-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Label</Label>
                          <Input
                            value={def.label}
                            onChange={(e) => updateVarDef(i, "label", e.target.value)}
                            className="text-xs h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Key</Label>
                          <Input
                            value={def.key}
                            onChange={(e) => updateVarDef(i, "key", e.target.value)}
                            className="text-xs h-8 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Type</Label>
                          <select
                            value={def.type}
                            onChange={(e) => updateVarDef(i, "type", e.target.value)}
                            className="w-full h-8 text-xs rounded-lg border border-olive-200 bg-white px-2"
                          >
                            {VAR_TYPES.map((vt) => (
                              <option key={vt.value} value={vt.value}>
                                {vt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Required</Label>
                          <label className="flex items-center gap-2 h-8 text-xs text-charcoal-600">
                            <input
                              type="checkbox"
                              checked={def.required}
                              onChange={(e) => updateVarDef(i, "required", e.target.checked)}
                              className="rounded border-olive-300"
                            />
                            Yes
                          </label>
                        </div>
                      </div>

                      {def.type === "select" && (
                        <div className="space-y-1">
                          <Label className="text-[10px]">Options (comma-separated)</Label>
                          <Input
                            value={def.options}
                            onChange={(e) => updateVarDef(i, "options", e.target.value)}
                            placeholder="option1, option2, option3"
                            className="text-xs h-8"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-[10px]">Default value</Label>
                          <Input
                            value={def.defaultValue}
                            onChange={(e) => updateVarDef(i, "defaultValue", e.target.value)}
                            className="text-xs h-8"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px]">Placeholder</Label>
                          <Input
                            value={def.placeholder}
                            onChange={(e) => updateVarDef(i, "placeholder", e.target.value)}
                            className="text-xs h-8"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          <Button
            variant="default"
            size="lg"
            className="w-full"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
