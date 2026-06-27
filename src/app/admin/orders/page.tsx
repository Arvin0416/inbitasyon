"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/store";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function AdminOrdersPage() {
  const [siteFilter, setSiteFilter] = useState<string>("all");

  const allSites = Array.from(db.sites.values());
  const filteredSites = siteFilter === "all" 
    ? allSites 
    : allSites.filter(s => s.tier === siteFilter);

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
