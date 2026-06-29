"use client";

import { Template } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, Sparkles } from "lucide-react";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[3/4] overflow-hidden bg-olive-100">
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${template.secondaryColor} 0%, ${template.primaryColor}22 100%)`,
          }}
        >
          <div className="text-center p-6">
            <div
              className="text-4xl mb-2"
              style={{ color: template.primaryColor }}
            >
              <Sparkles className="w-8 h-8 mx-auto opacity-50" />
            </div>
            <p
              className="text-lg font-semibold"
              style={{
                fontFamily: template.fontFamily,
                color: template.primaryColor,
              }}
            >
              {template.name}
            </p>
            <div
              className="w-12 h-0.5 mx-auto mt-2"
              style={{ backgroundColor: template.accentColor }}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <Link href={`/templates/${template.id}`}>
            <Button variant="secondary" size="sm" className="w-full bg-white/90 backdrop-blur-sm">
              <Eye className="w-4 h-4 mr-1" />
              Preview Design
            </Button>
          </Link>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="text-lg font-semibold text-olive-800"
            style={{ fontFamily: template.fontFamily }}
          >
            {template.name}
          </h3>
        </div>
        <p className="text-sm text-charcoal-500 mb-3 line-clamp-2">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.styleTags.map((tag) => (
            <Badge key={tag} variant="default" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/order?template=${template.id}`}>
          <Button variant="default" size="sm" className="w-full">
            Get This Design
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
