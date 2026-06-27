"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/templates";
import { ArrowLeft } from "lucide-react";

export default function AdminTemplatesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 py-4 bg-navy-800 text-white">
        <div className="mx-auto max-w-6xl flex items-center gap-2">
          <ShieldIcon />
          <span className="font-semibold">Invitasyon Admin</span>
        </div>
      </div>

      <section className="px-4 py-6 bg-gradient-romantic">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1 text-sm text-warm-500 hover:text-rosegold-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="font-serif text-2xl font-bold text-navy-800">
            Manage Templates
          </h1>
          <p className="text-warm-500">
            View and manage wedding templates ({templates.length} total)
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all">
                <div
                  className="aspect-video rounded-t-2xl flex items-center justify-center"
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
                    <h3 className="font-semibold text-navy-800">
                      {template.name}
                    </h3>
                    <Badge variant="default" className="text-[10px]">
                      {template.styleTags.length} tags
                    </Badge>
                  </div>
                  <p className="text-xs text-warm-500 mb-3 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {template.styleTags.map((tag) => (
                      <Badge key={tag} variant="warm" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-warm-400">
                    <span>Font: {template.fontFamily}</span>
                    <span className="mx-1">·</span>
                    <span>{template.features.length} features</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  );
}
