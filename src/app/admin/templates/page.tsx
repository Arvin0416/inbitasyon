"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { templates } from "@/data/templates";
import { ImageIcon } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-olive-800">
          Manage Templates
        </h1>
        <p className="text-charcoal-500 text-sm mt-1">
          View and manage wedding templates ({templates.length} total)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-all overflow-hidden">
            <div
              className="aspect-video flex items-center justify-center"
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
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-olive-800">
                  {template.name}
                </h3>
                <Badge variant="default" className="text-[10px]">
                  {template.styleTags.length} tags
                </Badge>
              </div>
              <p className="text-xs text-charcoal-500 mb-3 line-clamp-2">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {template.styleTags.map((tag) => (
                  <Badge key={tag} variant="cream" className="text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-charcoal-400">
                <ImageIcon className="w-3 h-3" />
                <span>Font: {template.fontFamily}</span>
                <span className="mx-1">·</span>
                <span>{template.features.length} features</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
