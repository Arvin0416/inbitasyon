"use client";

import { AuthProvider, useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

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
      <div className="flex items-center justify-center min-h-screen bg-warm-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-rosegold-200 border-t-rosegold-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-warm-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && !isPublicPage) {
    return null;
  }

  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}
