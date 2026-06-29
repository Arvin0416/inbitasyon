"use client";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  ImageIcon,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    label: "RSVPs",
    href: "/admin/rsvps",
    icon: Heart,
  },
  {
    label: "Templates",
    href: "/admin/templates",
    icon: ImageIcon,
  },
];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublicPage =
    pathname === "/admin/login" || pathname === "/admin/signup";

  useEffect(() => {
    if (!loading && !user && !isPublicPage) {
      router.push("/admin/login");
    }
  }, [user, loading, router, isPublicPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-cream-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-olive-200 border-t-olive-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-charcoal-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isPublicPage) {
    return null;
  }

  return <>{children}</>;
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/signup";

  // Auth pages don't use the sidebar layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-cream-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-olive-200/60 flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-olive-100">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-olive-600" />
            <span className="font-serif font-semibold text-olive-800">
              Invitasyon
            </span>
          </Link>
          <button
            className="lg:hidden text-charcoal-400 hover:text-charcoal-600"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-olive-100 text-olive-800"
                    : "text-charcoal-500 hover:bg-olive-50 hover:text-olive-700"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-4 py-4 border-t border-olive-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-olive-600 flex items-center justify-center text-white text-xs font-semibold">
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-olive-800 truncate">
                {user?.email || "Admin"}
              </p>
              <p className="text-xs text-charcoal-400">Administrator</p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-charcoal-400 hover:text-olive-700 transition-colors p-1"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header bar */}
        <header className="h-16 border-b border-olive-200/60 bg-white flex items-center px-4 sm:px-6 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden text-charcoal-500 hover:text-olive-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            className="text-xs text-charcoal-400 hover:text-olive-700 transition-colors"
          >
            View Site
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>
        <AdminShell>{children}</AdminShell>
      </AuthGuard>
    </AuthProvider>
  );
}
