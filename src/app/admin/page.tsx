"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db, syncAllSites, syncAllRSVPs } from "@/lib/store";
import { templates } from "@/data/templates";
import {
  Layout,
  ShoppingBag,
  Heart,
  Image,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboard() {
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const sync = async () => {
      setSyncing(true);
      try {
        await Promise.all([syncAllSites(), syncAllRSVPs()]);
      } catch (e) {
        console.error("Failed to sync data:", e);
      } finally {
        setSyncing(false);
      }
    };
    sync();
  }, []);
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
      color: "text-olive-600",
      bg: "bg-olive-100",
      href: "/admin",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-charcoal-600",
      bg: "bg-charcoal-100",
      href: "/admin/orders",
    },
    {
      title: "RSVPs",
      value: totalRsvps,
      icon: Heart,
      color: "text-gold-500",
      bg: "bg-gold-100",
      href: "/admin/rsvps",
    },
    {
      title: "Templates",
      value: totalTemplates,
      icon: Image,
      color: "text-olive-600",
      bg: "bg-olive-100",
      href: "/admin/templates",
    },
  ];

  return (
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-olive-800">
            Dashboard
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Manage templates, orders, and RSVP responses.
          </p>
        </div>
        <button
          onClick={async () => {
            setSyncing(true);
            try { await Promise.all([syncAllSites(), syncAllRSVPs()]); }
            catch (e) { console.error(e); }
            finally { setSyncing(false); }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-charcoal-500 hover:text-olive-700 hover:bg-olive-50 transition-colors"
          title="Refresh data"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-charcoal-500 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-olive-800">
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
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/admin/templates">
              <Card className="hover:border-olive-300 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Image className="w-5 h-5 text-olive-600" />
                  <div className="flex-1">
                    <p className="font-medium text-olive-800 text-sm">
                      Manage Templates
                    </p>
                    <p className="text-xs text-charcoal-400">
                      Add or edit wedding templates
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal-300" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/orders">
              <Card className="hover:border-olive-300 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-charcoal-600" />
                  <div className="flex-1">
                    <p className="font-medium text-olive-800 text-sm">
                      View Orders
                    </p>
                    <p className="text-xs text-charcoal-400">
                      Manage customer orders
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal-300" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/admin/rsvps">
              <Card className="hover:border-olive-300 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-gold-500" />
                  <div className="flex-1">
                    <p className="font-medium text-olive-800 text-sm">
                      View RSVPs
                    </p>
                    <p className="text-xs text-charcoal-400">
                      See all RSVP responses
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-charcoal-300" />
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
            <p className="text-sm text-charcoal-400 text-center py-8">
              No wedding sites created yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-olive-200">
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Couple</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Slug</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Email</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Tier</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-charcoal-500">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(db.sites.values()).map((site) => (
                    <tr
                      key={site.id}
                      className="border-b border-olive-100 hover:bg-olive-50 transition-colors"
                    >
                      <td className="py-3 px-2 font-medium text-olive-800">
                        {site.coupleName1} & {site.coupleName2}
                      </td>
                      <td className="py-3 px-2 text-charcoal-600">{site.slug}</td>
                      <td className="py-3 px-2 text-charcoal-600">{site.email}</td>
                      <td className="py-3 px-2 capitalize text-charcoal-600">{site.tier}</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-olive-100 text-olive-800">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-2 text-charcoal-500">
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
  );
}
