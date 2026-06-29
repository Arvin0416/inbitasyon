"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db, syncAllRSVPs, syncAllSites } from "@/lib/store";
import { Heart, Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminRSVPsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setSyncing(true);
    Promise.all([syncAllRSVPs(), syncAllSites()])
      .catch((e) => console.error("Failed to sync RSVPs:", e))
      .finally(() => setSyncing(false));
  }, []);

  // Gather all RSVPs from all sites
  const allRsvps = Array.from(db.rsvps.entries()).flatMap(([slug, rsvps]) =>
    rsvps.map((rsvp) => ({
      ...rsvp,
      siteSlug: slug,
      coupleName: db.sites.get(slug)
        ? `${db.sites.get(slug)!.coupleName1} & ${db.sites.get(slug)!.coupleName2}`
        : slug,
    }))
  );

  const filteredRsvps = allRsvps.filter(
    (rsvp) =>
      rsvp.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rsvp.siteSlug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rsvp.coupleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort by date (newest first)
  filteredRsvps.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-olive-800">
            RSVP Responses
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            View all RSVPs across all wedding sites ({filteredRsvps.length} total)
          </p>
        </div>
        <button
          onClick={async () => {
            setSyncing(true);
            try { await Promise.all([syncAllRSVPs(), syncAllSites()]); }
            catch (e) { console.error(e); }
            finally { setSyncing(false); }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-charcoal-500 hover:text-olive-700 hover:bg-olive-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Refresh"}
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-500" />
              All RSVPs
            </CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400" />
              <Input
                placeholder="Search by name or site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-12 text-charcoal-400">
              <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>
                {searchQuery
                  ? "No RSVPs match your search."
                  : "No RSVPs submitted yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-olive-200">
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Guest Name</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Wedding</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Status</th>
                    <th className="text-center py-3 px-2 font-medium text-charcoal-500">Guests</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500 hidden md:table-cell">Message</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500 hidden md:table-cell">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500 hidden md:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp) => (
                    <tr
                      key={rsvp.id}
                      className="border-b border-olive-100 hover:bg-olive-50 transition-colors"
                    >
                      <td className="py-3 px-2 font-medium text-olive-800">{rsvp.guestName}</td>
                      <td className="py-3 px-2 text-charcoal-600 text-xs">
                        {rsvp.coupleName}
                        <br />
                        <span className="text-charcoal-400">/{rsvp.siteSlug}</span>
                      </td>
                      <td className="py-3 px-2">
                        {rsvp.attending ? (
                          <Badge variant="green">Attending</Badge>
                        ) : (
                          <Badge variant="cream">Not Attending</Badge>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center text-olive-800">
                        {rsvp.attending ? rsvp.guestCount : "-"}
                      </td>
                      <td className="py-3 px-2 text-charcoal-500 max-w-[200px] truncate hidden md:table-cell">
                        {rsvp.message || "-"}
                      </td>
                      <td className="py-3 px-2 text-charcoal-500 hidden md:table-cell">
                        {rsvp.email || "-"}
                      </td>
                      <td className="py-3 px-2 text-charcoal-500 hidden md:table-cell">
                        {new Date(rsvp.createdAt).toLocaleDateString()}
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
