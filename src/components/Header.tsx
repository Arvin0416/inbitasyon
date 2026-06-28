"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, LayoutGrid, Sparkles, DollarSign, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/gallery", label: "Designs", icon: LayoutGrid },
  { href: "/#how-it-works", label: "How It Works", icon: Sparkles },
  { href: "/#pricing", label: "Pricing", icon: DollarSign },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop: macOS-style floating bottom dock */}
      <nav className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 px-2 py-2 bg-white/80 backdrop-blur-2xl border border-olive-200/50 rounded-full shadow-[0_8px_32px_rgba(40,54,24,0.12)]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-olive-50 transition-all duration-200 group"
          >
            <Heart className="w-5 h-5 text-olive-600 transition-transform duration-200 group-hover:scale-110" />
            <span className="text-sm font-serif font-semibold text-olive-800 tracking-tight">
              Invitasyon
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-olive-200/60 mx-1" />

          {/* Nav links */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-charcoal-500 hover:text-olive-700 hover:bg-olive-50 transition-all duration-200 group"
            >
              <item.icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="w-px h-6 bg-olive-200/60 mx-1" />

          {/* CTA */}
          <Link href="/gallery">
            <Button
              variant="default"
              size="sm"
              className="rounded-full px-5 shadow-sm"
            >
              Browse Designs
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile: bottom floating dock */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="flex items-center justify-between px-3 py-2 bg-white/85 backdrop-blur-2xl border border-olive-200/50 rounded-2xl shadow-[0_8px_32px_rgba(40,54,24,0.12)]">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-olive-50 transition-colors"
          >
            <Heart className="w-5 h-5 text-olive-600" />
            <span className="text-sm font-serif font-semibold text-olive-800">
              Invitasyon
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl hover:bg-olive-50 transition-colors"
              >
                <item.icon className="w-4 h-4 text-charcoal-500" />
                <span className="text-[10px] text-charcoal-500 font-medium">
                  {item.label}
                </span>
              </Link>
            ))}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl hover:bg-olive-50 transition-colors text-charcoal-500"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile expanded menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 bg-white/90 backdrop-blur-2xl border border-olive-200/50 rounded-2xl shadow-lg p-3 space-y-1"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-charcoal-500 hover:text-olive-700 hover:bg-olive-50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-olive-100">
                <Link href="/gallery" onClick={() => setMobileOpen(false)}>
                  <Button variant="default" size="sm" className="w-full rounded-xl">
                    Browse Designs
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


    </>
  );
}
