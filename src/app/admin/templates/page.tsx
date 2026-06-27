"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { templates } from "@/data/templates";
import { useAuth } from "@/lib/auth-context";
import { ArrowLeft, Shield, LogOut } from "lucide-react";

export default function AdminTemplatesPage() {
  const { user, signOut } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4 py-4 bg-navy-800 text-white">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Invitasyon Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60 hidden sm:block">{user?.email}</span>
            <Link href="/"><Button variant="ghost" size="sm" className="text-white/80 hover:text-white">View Site</Button></Link>
            <button onClick={() => signOut()} className="text-white/60 hover:text-white transition-colors p-1" title="Sign out"><LogOut className="w-4 h-4" /></button>
          </div>
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
