"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/store";
import { ArrowLeft, Heart, Search, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminRSVPsPage() {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

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
            RSVP Responses
          </h1>
          <p className="text-warm-500">
            View all RSVPs across all wedding sites ({filteredRsvps.length} total)
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-rosegold-500" />
              All RSVPs
                </CardTitle>
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
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
                <div className="text-center py-12 text-warm-400">
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
                      <tr className="border-b border-warm-200">
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Guest Name
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Wedding
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Status
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-warm-500">
                          Guests
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500 hidden md:table-cell">
                          Message
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500 hidden md:table-cell">
                          Email
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500 hidden md:table-cell">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRsvps.map((rsvp) => (
                        <tr
                          key={rsvp.id}
                          className="border-b border-warm-100 hover:bg-warm-50 transition-colors"
                        >
                          <td className="py-3 px-2 font-medium text-navy-800">
                            {rsvp.guestName}
                          </td>
                          <td className="py-3 px-2 text-warm-600 text-xs">
                            {rsvp.coupleName}
                            <br />
                            <span className="text-warm-400">
                              /{rsvp.siteSlug}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            {rsvp.attending ? (
                              <Badge variant="green">Attending</Badge>
                            ) : (
                              <Badge variant="warm">Not Attending</Badge>
                            )}
                          </td>
                          <td className="py-3 px-2 text-center text-navy-800">
                            {rsvp.attending ? rsvp.guestCount : "-"}
                          </td>
                          <td className="py-3 px-2 text-warm-500 max-w-[200px] truncate hidden md:table-cell">
                            {rsvp.message || "-"}
                          </td>
                          <td className="py-3 px-2 text-warm-500 hidden md:table-cell">
                            {rsvp.email || "-"}
                          </td>
                          <td className="py-3 px-2 text-warm-500 hidden md:table-cell">
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
      </section>
    </div>
  );
}
