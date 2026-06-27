"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db, syncAllSites } from "@/lib/store";
import { ArrowLeft, ShoppingBag, Shield, LogOut, RefreshCw } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminOrdersPage() {
  const { user, signOut } = useAuth();
  const [siteFilter, setSiteFilter] = useState<string>("all");
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setSyncing(true);
    syncAllSites()
      .catch((e) => console.error("Failed to sync sites:", e))
      .finally(() => setSyncing(false));
  }, []);

  const allSites = Array.from(db.sites.values());
  const filteredSites = siteFilter === "all" 
    ? allSites 
    : allSites.filter(s => s.tier === siteFilter);

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
            <button onClick={async () => {
                setSyncing(true);
                try { await syncAllSites(); }
                catch (e) { console.error(e); }
                finally { setSyncing(false); }
              }} className="text-white/60 hover:text-white transition-colors p-1" title="Refresh"><RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} /></button>
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
            Orders
          </h1>
          <p className="text-warm-500">
            View and manage all orders ({filteredSites.length} sites)
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {["all", "self-serve", "custom"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSiteFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  siteFilter === filter
                    ? "bg-navy-700 text-white"
                    : "bg-warm-100 text-warm-600 hover:bg-warm-200"
                }`}
              >
                {filter === "all" ? "All" : filter === "self-serve" ? "Self-Serve ($29)" : "Custom ($79)"}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-navy-500" />
                Site Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSites.length === 0 ? (
                <p className="text-sm text-warm-400 text-center py-8">
                  No orders found.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-warm-200">
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Couple
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Email
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Tier
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Amount
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Status
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Created
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          URL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSites.map((site) => (
                        <tr
                          key={site.id}
                          className="border-b border-warm-100 hover:bg-warm-50"
                        >
                          <td className="py-3 px-2 font-medium text-navy-800">
                            {site.coupleName1} & {site.coupleName2}
                          </td>
                          <td className="py-3 px-2 text-warm-600">
                            {site.email}
                          </td>
                          <td className="py-3 px-2 capitalize">
                            <Badge
                              variant={
                                site.tier === "custom" ? "gold" : "default"
                              }
                            >
                              {site.tier}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 font-medium text-navy-800">
                            ${site.tier === "custom" ? "79" : "29"}
                          </td>
                          <td className="py-3 px-2">
                            <Badge variant="green">Completed</Badge>
                          </td>
                          <td className="py-3 px-2 text-warm-500">
                            {new Date(site.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-2">
                            <a
                              href={`/${site.slug}`}
                              className="text-rosegold-600 hover:underline"
                              target="_blank"
                            >
                              /{site.slug}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
