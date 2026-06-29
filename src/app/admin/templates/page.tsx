"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { localTemplates } from "@/lib/store";
import { deleteTemplate } from "@/lib/supabase-service";
import { ImageIcon, Plus, Pencil, Trash2, Code2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function AdminTemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState(() => [...localTemplates]);
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeleting(id);
    const { error } = await deleteTemplate(id);
    setDeleting(null);

    if (error) {
      toast.error(error);
    } else {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      toast.success("Template deleted");
    }
  };

  const hasHtmlContent = (t: typeof templates[0]) =>
    t.htmlContent && t.htmlContent.trim().length > 0;

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-olive-800">
            Manage Templates
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Create and edit wedding invitation templates with custom HTML and metadata variables.
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/templates/new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-olive-600 text-white rounded-xl text-sm font-medium hover:bg-olive-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-20">
          <ImageIcon className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-500">No templates yet. Create your first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Preview area */}
              <div
                className="aspect-video flex flex-col items-center justify-center relative"
                style={{
                  background: `linear-gradient(135deg, ${template.secondaryColor} 0%, ${template.primaryColor}22 100%)`,
                }}
              >
                <p
                  className="text-xl font-semibold"
                  style={{
                    fontFamily: template.fontFamily,
                    color: template.primaryColor,
                  }}
                >
                  {template.name}
                </p>
                {hasHtmlContent(template) && (
                  <Badge variant="default" className="absolute top-2 right-2 text-[10px] flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    Custom HTML
                  </Badge>
                )}
                {template.metadataDefinitions && template.metadataDefinitions.length > 0 && (
                  <span className="absolute bottom-2 right-2 text-[10px] text-charcoal-400 bg-white/70 px-2 py-0.5 rounded-full">
                    {template.metadataDefinitions.length} variable{template.metadataDefinitions.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              <CardContent className="p-4">
                {/* Name and actions */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-olive-800 text-sm">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      onClick={() => router.push(`/admin/templates/${template.id}/edit`)}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-olive-700 hover:bg-olive-50 transition-colors"
                      title="Edit template"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(template.id, template.name)}
                      disabled={deleting === template.id}
                      className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                      title="Delete template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {template.styleTags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="cream" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                  {template.styleTags.length > 3 && (
                    <span className="text-[10px] text-charcoal-400">+{template.styleTags.length - 3}</span>
                  )}
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
                  <ImageIcon className="w-3 h-3" />
                  <span>Font: {template.fontFamily}</span>
                  <span className="mx-1">·</span>
                  <span>{template.features.length} features</span>
                </div>

                {/* HTML status */}
                <div className="mt-2 pt-2 border-t border-olive-100 flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      hasHtmlContent(template) ? "bg-green-400" : "bg-charcoal-300"
                    }`}
                  />
                  <span className="text-[11px] text-charcoal-400">
                    {hasHtmlContent(template)
                      ? "HTML template ready"
                      : "No HTML content — uses default layout"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
