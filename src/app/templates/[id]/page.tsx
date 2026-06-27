"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { templates, getTemplateById } from "@/data/templates";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Palette,
} from "lucide-react";
export default function TemplateDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const template = getTemplateById(id);

  if (!template) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="px-4 py-8 bg-gradient-hero">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1 text-sm text-warm-500 hover:text-rosegold-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Gallery
          </Link>
        </div>
      </section>

      <section className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview */}
            <div className="space-y-4">
              <div
                className="aspect-[3/4] rounded-2xl overflow-hidden border border-warm-200 flex items-center justify-center relative group"
                style={{
                  background: `linear-gradient(135deg, ${template.secondaryColor} 0%, ${template.primaryColor}15 100%)`,
                }}
              >
                <div className="text-center p-12">
                  <div
                    className="text-4xl mb-4"
                    style={{ color: template.primaryColor }}
                  >
                    <Sparkles className="w-12 h-12 mx-auto opacity-40" />
                  </div>
                  <h2
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{
                      fontFamily: template.fontFamily,
                      color: template.primaryColor,
                    }}
                  >
                    {template.name}
                  </h2>
                  <div
                    className="w-16 h-0.5 mx-auto mb-4"
                    style={{ backgroundColor: template.accentColor }}
                  />
                  <p
                    className="text-lg max-w-xs mx-auto"
                    style={{
                      fontFamily: template.fontFamily,
                      color: template.primaryColor,
                      opacity: 0.8,
                    }}
                  >
                    Arvin & Angel
                  </p>
                  <p
                    className="text-sm mt-4"
                    style={{ color: template.primaryColor, opacity: 0.6 }}
                  >
                    December 15, 2026
                  </p>
                </div>
              </div>

              {/* Color Palette Preview */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-4 h-4 text-warm-500" />
                    <span className="text-sm font-medium text-navy-700">
                      Color Palette
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.primaryColor }}
                      title="Primary Color"
                    />
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.secondaryColor }}
                      title="Secondary Color"
                    />
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: template.accentColor }}
                      title="Accent Color"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details */}
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.styleTags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1
                  className="text-3xl sm:text-4xl font-bold text-navy-800 mb-4"
                  style={{ fontFamily: template.fontFamily }}
                >
                  {template.name}
                </h1>
                <p className="text-lg text-warm-600 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sage-500" />
                  What&apos;s Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {template.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 text-sm text-warm-600"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sage-500 mt-0.5 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-navy-800 mb-3">
                  Font
                </h3>
                <p
                  className="text-xl"
                  style={{ fontFamily: template.fontFamily }}
                >
                  {template.fontFamily}
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Link href={`/order?template=${template.id}`}>
                  <Button variant="default" size="xl" className="w-full">
                    Get This Design
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href={`/order?template=${template.id}&tier=custom`}>
                  <Button variant="secondary" size="lg" className="w-full">
                    Get Custom Design — $79
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Templates */}
      <section className="px-4 py-16 bg-gradient-romantic">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-serif text-2xl font-bold text-navy-800 mb-8 text-center">
            Explore other designs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter((t) => t.id !== template.id)
              .slice(0, 3)
              .map((t) => (
                <Link key={t.id} href={`/templates/${t.id}`}>
                  <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-4">
                      <div
                        className="aspect-[3/4] rounded-xl mb-3 flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${t.secondaryColor} 0%, ${t.primaryColor}22 100%)`,
                        }}
                      >
                        <p
                          className="text-lg font-semibold"
                          style={{
                            fontFamily: t.fontFamily,
                            color: t.primaryColor,
                          }}
                        >
                          {t.name}
                        </p>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {t.styleTags.map((tag) => (
                          <Badge key={tag} variant="default" className="text-[10px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
