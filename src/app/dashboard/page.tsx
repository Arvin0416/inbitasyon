"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/store";
import { DashboardStats } from "@/lib/types";
import { toast } from "sonner";
import {
  Copy,
  CheckCircle2,
  Heart,
  Users,
  UserCheck,
  UserX,
  ExternalLink,
  MessageCircle,
  BarChart3,
} from "lucide-react";

export default function DashboardPage() {
  const [slugInput, setSlugInput] = useState("");
  const [viewingSlug, setViewingSlug] = useState<string | null>(null);

  const handleView = () => {
    const slug = slugInput.trim().toLowerCase();
    if (!slug) {
      toast.error("Please enter your wedding URL slug");
      return;
    }
    setViewingSlug(slug);
  };

  if (!viewingSlug) {
    return (
      <div className="flex flex-col min-h-[60vh]">
        <section className="px-4 py-12 sm:py-16 bg-gradient-hero">
          <div className="mx-auto max-w-2xl text-center">
            <Heart className="w-10 h-10 text-rosegold-500 mx-auto mb-4" />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              Couple Dashboard
            </h1>
            <p className="text-warm-500 mb-8">
              Enter your wedding URL slug to view your RSVPs and manage your
              website.
            </p>
            <div className="flex items-center gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  placeholder="e.g. arvin-angel"
                  value={slugInput}
                  onChange={(e) => setSlugInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleView()}
                />
              </div>
              <Button variant="default" onClick={handleView}>
                View Dashboard
              </Button>
            </div>
            <p className="text-xs text-warm-400 mt-2">
              Your slug is the unique part of your URL: invitasyon.com/your-slug
            </p>
          </div>
        </section>
      </div>
    );
  }

  const site = db.sites.get(viewingSlug);
  if (!site) {
    return (
      <div className="flex flex-col min-h-[60vh]">
        <section className="px-4 py-12 sm:py-16 bg-gradient-hero">
          <div className="mx-auto max-w-2xl text-center">
            <Heart className="w-10 h-10 text-rosegold-300 mx-auto mb-4" />
            <h1 className="font-serif text-2xl font-bold text-navy-800 mb-4">
              Wedding website not found
            </h1>
            <p className="text-warm-500 mb-8">
              No website found with slug &quot;{viewingSlug}&quot;.
            </p>
            <Button variant="default" onClick={() => setViewingSlug(null)}>
              Try Again
            </Button>
          </div>
        </section>
      </div>
    );
  }

  const rsvps = db.rsvps.get(viewingSlug) || [];
  const stats: DashboardStats = {
    totalResponses: rsvps.length,
    attending: rsvps.filter((r) => r.attending).length,
    notAttending: rsvps.filter((r) => !r.attending).length,
    totalGuests: rsvps.reduce((sum, r) => sum + r.guestCount, 0),
  };

  return (
    <div className="flex flex-col">
      <section className="px-4 py-8 bg-gradient-hero">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-800">
                {site.coupleName1} & {site.coupleName2}
              </h1>
              <p className="text-warm-500">Wedding Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/${viewingSlug}`}>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Website
                </Button>
              </Link>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://invitasyon.com/${viewingSlug}`
                  );
                  toast.success("Link copied!");
                }}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <BarChart3 className="w-6 h-6 text-navy-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-800">
                  {stats.totalResponses}
                </p>
                <p className="text-xs text-warm-500">Total Responses</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <UserCheck className="w-6 h-6 text-sage-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-800">
                  {stats.attending}
                </p>
                <p className="text-xs text-warm-500">Attending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <UserX className="w-6 h-6 text-rosegold-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-800">
                  {stats.notAttending}
                </p>
                <p className="text-xs text-warm-500">Not Attending</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 sm:p-6 text-center">
                <Users className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-800">
                  {stats.totalGuests}
                </p>
                <p className="text-xs text-warm-500">Total Guests</p>
              </CardContent>
            </Card>
          </div>

          {/* Wedding Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Wedding Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-warm-500">Date:</span>
                  <span className="ml-2 font-medium text-navy-800">
                    {new Date(site.weddingDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-warm-500">Time:</span>
                  <span className="ml-2 font-medium text-navy-800">
                    {site.weddingTime}
                  </span>
                </div>
                <div>
                  <span className="text-warm-500">Venue:</span>
                  <span className="ml-2 font-medium text-navy-800">
                    {site.venueName}
                  </span>
                </div>
                <div>
                  <span className="text-warm-500">Template:</span>
                  <span className="ml-2 font-medium text-navy-800">
                    {site.templateId}
                  </span>
                </div>
                <div>
                  <span className="text-warm-500">Tier:</span>
                  <Badge
                    variant={site.tier === "custom" ? "gold" : "default"}
                    className="ml-2"
                  >
                    {site.tier}
                  </Badge>
                </div>
                <div>
                  <span className="text-warm-500">URL:</span>
                  <span className="ml-2 font-medium text-navy-800">
                    invitasyon.com/{site.slug}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RSVP Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-rosegold-500" />
                RSVP Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              {rsvps.length === 0 ? (
                <div className="text-center py-8 text-warm-400">
                  <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No RSVPs yet. Share your link to start collecting responses.</p>
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
                          Status
                        </th>
                        <th className="text-center py-3 px-2 font-medium text-warm-500">
                          Guests
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500 hidden sm:table-cell">
                          Message
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500 hidden sm:table-cell">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rsvps.map((rsvp) => (
                        <tr
                          key={rsvp.id}
                          className="border-b border-warm-100 hover:bg-warm-50 transition-colors"
                        >
                          <td className="py-3 px-2 font-medium text-navy-800">
                            {rsvp.guestName}
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
                          <td className="py-3 px-2 text-warm-500 max-w-[200px] truncate hidden sm:table-cell">
                            {rsvp.message || "-"}
                          </td>
                          <td className="py-3 px-2 text-warm-500 hidden sm:table-cell">
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
