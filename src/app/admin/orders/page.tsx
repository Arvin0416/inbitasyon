"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db, syncAllSites } from "@/lib/store";
import { ShoppingBag, RefreshCw } from "lucide-react";

export default function AdminOrdersPage() {
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
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-olive-800">
            Orders
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            View and manage all orders ({filteredSites.length} sites)
          </p>
        </div>
        <button
          onClick={async () => {
            setSyncing(true);
            try { await syncAllSites(); }
            catch (e) { console.error(e); }
            finally { setSyncing(false); }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-charcoal-500 hover:text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Refresh"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {["all", "self-serve", "custom"].map((filter) => (
          <button
            key={filter}
            onClick={() => setSiteFilter(filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              siteFilter === filter
                ? "bg-olive-600 text-white"
                : "bg-white text-charcoal-500 border border-olive-200 hover:bg-olive-50"
            }`}
          >
            {filter === "all" ? "All" : filter === "self-serve" ? "Self-Serve ($29)" : "Custom ($79)"}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-olive-600" />
            Site Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSites.length === 0 ? (
            <p className="text-sm text-charcoal-400 text-center py-8">
              No orders found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-olive-200">
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Couple</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Tier</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Amount</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Created</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map((site) => (
                    <tr
                      key={site.id}
                      className="border-b border-olive-100 hover:bg-olive-50 transition-colors"
                    >
                      <td className="py-3 px-2 font-medium text-olive-800">
                        {site.coupleName1} & {site.coupleName2}
                      </td>
                      <td className="py-3 px-2 text-charcoal-600">{site.email}</td>
                      <td className="py-3 px-2 capitalize">
                        <Badge variant={site.tier === "custom" ? "gold" : "default"}>
                          {site.tier}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 font-medium text-olive-800">
                        ${site.tier === "custom" ? "79" : "29"}
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="green">Completed</Badge>
                      </td>
                      <td className="py-3 px-2 text-charcoal-500">
                        {new Date(site.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-2">
                        <a
                          href={`/${site.slug}`}
                          className="text-olive-600 hover:underline font-medium"
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
  );
}
