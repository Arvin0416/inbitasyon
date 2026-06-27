"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/store";
import { templates } from "@/data/templates";
import {
  Layout,
  ShoppingBag,
  Heart,
  Image,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function AdminDashboard() {
  const totalSites = db.sites.size;
  const totalOrders = Array.from(db.orders.values()).reduce(
    (sum, orders) => sum + orders.length,
    0
  );
  const totalRsvps = Array.from(db.rsvps.values()).reduce(
    (sum, rsvps) => sum + rsvps.length,
    0
  );
  const totalTemplates = templates.length;

  const stats = [
    {
      title: "Active Sites",
      value: totalSites,
      icon: Layout,
      color: "text-sage-500",
      bg: "bg-sage-50",
      href: "/admin",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-navy-500",
      bg: "bg-navy-50",
      href: "/admin/orders",
    },
    {
      title: "RSVPs",
      value: totalRsvps,
      icon: Heart,
      color: "text-rosegold-500",
      bg: "bg-rosegold-50",
      href: "/admin/rsvps",
    },
    {
      title: "Templates",
      value: totalTemplates,
      icon: Image,
      color: "text-gold-500",
      bg: "bg-gold-50",
      href: "/admin/templates",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Header */}
      <div className="px-4 py-4 bg-navy-800 text-white">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
          {/* Header uses ShieldIcon below */}
            <span className="font-semibold">Invitasyon Admin</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">
              View Site
            </Button>
          </Link>
        </div>
      </div>

      <section className="px-4 py-8 bg-gradient-romantic">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-2xl font-bold text-navy-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-warm-500">
            Manage templates, orders, and RSVP responses.
          </p>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Link key={stat.title} href={stat.href}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-warm-500 mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-navy-800">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                      >
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/admin/templates">
                  <Card className="hover:border-sage-300 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Image className="w-5 h-5 text-sage-500" />
                      <div className="flex-1">
                        <p className="font-medium text-navy-800 text-sm">
                          Manage Templates
                        </p>
                        <p className="text-xs text-warm-400">
                          Add or edit wedding templates
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-warm-300" />
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/admin/orders">
                  <Card className="hover:border-navy-300 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-navy-500" />
                      <div className="flex-1">
                        <p className="font-medium text-navy-800 text-sm">
                          View Orders
                        </p>
                        <p className="text-xs text-warm-400">
                          Manage customer orders
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-warm-300" />
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/admin/rsvps">
                  <Card className="hover:border-rosegold-300 transition-colors cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-3">
                      <Heart className="w-5 h-5 text-rosegold-500" />
                      <div className="flex-1">
                        <p className="font-medium text-navy-800 text-sm">
                          View RSVPs
                        </p>
                        <p className="text-xs text-warm-400">
                          See all RSVP responses
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-warm-300" />
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sites */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Wedding Sites</CardTitle>
            </CardHeader>
            <CardContent>
              {db.sites.size === 0 ? (
                <p className="text-sm text-warm-400 text-center py-8">
                  No wedding sites created yet.
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
                          Slug
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Email
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Tier
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Status
                        </th>
                        <th className="text-left py-3 px-2 font-medium text-warm-500">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(db.sites.values()).map((site) => (
                        <tr
                          key={site.id}
                          className="border-b border-warm-100 hover:bg-warm-50"
                        >
                          <td className="py-3 px-2 font-medium text-navy-800">
                            {site.coupleName1} & {site.coupleName2}
                          </td>
                          <td className="py-3 px-2 text-warm-600">
                            {site.slug}
                          </td>
                          <td className="py-3 px-2 text-warm-600">
                            {site.email}
                          </td>
                          <td className="py-3 px-2 capitalize">
                            {site.tier}
                          </td>
                          <td className="py-3 px-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-700">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-2 text-warm-500">
                            {new Date(site.createdAt).toLocaleDateString()}
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
