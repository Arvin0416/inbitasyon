"use client";

import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      <section className="px-4 py-12 sm:py-16 bg-gradient-hero">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-olive-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-olive-100 text-olive-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Wedding Templates
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-olive-800 mb-4">
              Choose your perfect design
            </h1>
            <p className="text-lg text-charcoal-500 max-w-2xl mx-auto">
              Each template is crafted with love, fully customizable, and
              optimized for mobile. Click any design to preview or get started.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-romantic">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-olive-800 mb-4">
            Not sure which design to pick?
          </h2>
          <p className="text-charcoal-500 mb-8 max-w-lg mx-auto">
            Every template can be customized with your colors, photos, and
            personal touches. Start with any design and make it yours.
          </p>
          <Link href="/order">
            <Button variant="default" size="lg">
              Start Creating Your Website
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
