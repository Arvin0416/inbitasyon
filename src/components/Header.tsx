"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-olive-200/60 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Heart className="h-6 w-6 text-olive-600 transition-transform group-hover:scale-110" />
          <span className="text-xl font-serif font-semibold tracking-tight text-olive-800">
            Invitasyon
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/gallery"
            className="text-sm font-medium text-charcoal-500 hover:text-olive-700 transition-colors"
          >
            Designs
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-charcoal-500 hover:text-olive-700 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-charcoal-500 hover:text-olive-700 transition-colors"
          >
            Pricing
          </Link>
          <Link href="/gallery">
            <Button variant="default" size="sm">
              Browse Designs
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden p-2 text-charcoal-500"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-olive-200/60 bg-white px-4 py-4 space-y-3">
          <Link
            href="/gallery"
            className="block py-2 text-sm font-medium text-charcoal-500 hover:text-olive-700"
            onClick={() => setMobileOpen(false)}
          >
            Designs
          </Link>
          <Link
            href="/#how-it-works"
            className="block py-2 text-sm font-medium text-charcoal-500 hover:text-olive-700"
            onClick={() => setMobileOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            className="block py-2 text-sm font-medium text-charcoal-500 hover:text-olive-700"
            onClick={() => setMobileOpen(false)}
          >
            Pricing
          </Link>
          <Link href="/gallery" onClick={() => setMobileOpen(false)}>
            <Button variant="default" size="sm" className="w-full">
              Browse Designs
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
