"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Sparkles, DollarSign, Menu, X, Sun, Moon } from "lucide-react";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/gallery", label: "Designs", icon: LayoutGrid },
  { href: "/#how-it-works", label: "How It Works", icon: Sparkles },
  { href: "/#pricing", label: "Pricing", icon: DollarSign },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-olive-50 dark:hover:bg-olive-800/30 transition-colors text-charcoal-500 dark:text-charcoal-300"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = mounted && theme === "dark";

  // When not scrolled (on dark video section): use dark glass
  // When scrolled (past video): use the existing light/dark frosted glass
  const navBg = !scrolled
    ? "bg-black/35 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    : isDark
      ? "bg-charcoal-800/90 backdrop-blur-2xl border border-olive-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      : "bg-white/90 backdrop-blur-2xl border border-olive-200/50 shadow-[0_8px_32px_rgba(40,54,24,0.15)]";

  // Text styles for each state
  const textStyles = !scrolled
    ? {
        brand: "text-cream-100",
        navLink: "text-cream-200/80 hover:text-white",
        hoverBg: "hover:bg-white/10",
        divider: "bg-white/15",
        icon: "text-cream-200/60",
      }
    : {
        brand: "text-olive-800 dark:text-olive-200",
        navLink: "text-charcoal-500 dark:text-charcoal-300 hover:text-olive-700 dark:hover:text-olive-300",
        hoverBg: "hover:bg-olive-50 dark:hover:bg-olive-800/30",
        divider: "bg-olive-200/60 dark:bg-olive-700/30",
        icon: "text-charcoal-500 dark:text-charcoal-300",
      };

  return (
    <>
      {/* Desktop: floating top navbar */}
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
        <div className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-300 ${navBg}`}>
          {/* Logo */}
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 group ${textStyles.hoverBg}`}
          >
            <Logo className="w-8 h-8" />
            <span className={`text-sm font-serif font-semibold tracking-tight italic ${textStyles.brand}`}>
              Imbitasyon
            </span>
          </Link>

          {/* Divider */}
          <div className={`w-px h-6 mx-1 ${textStyles.divider}`} />

          {/* Nav links */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group ${textStyles.navLink} ${textStyles.hoverBg}`}
            >
              <item.icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className={`w-px h-6 mx-1 ${textStyles.divider}`} />

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

      {/* Mobile: floating top bar */}
      <nav className="md:hidden fixed top-3 left-3 right-3 z-50">
        <div className={`flex items-center justify-between px-3 py-2 rounded-2xl transition-all duration-300 ${navBg}`}>
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors ${textStyles.hoverBg}`}
          >
            <Logo className="w-8 h-8" />
            <span className={`text-sm font-serif font-semibold italic ${textStyles.brand}`}>
              Imbitasyon
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${textStyles.hoverBg}`}
              >
                <item.icon className={`w-4 h-4 ${textStyles.icon}`} />
                <span className={`text-[10px] font-medium ${textStyles.icon}`}>
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Mobile Theme Toggle */}
            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl transition-colors ${textStyles.hoverBg} ${textStyles.icon}`}
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
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`mt-2 backdrop-blur-2xl border rounded-2xl shadow-lg p-3 space-y-1 ${
                isDark
                  ? "bg-charcoal-800/90 border-olive-700/30"
                  : "bg-white/90 border-olive-200/50"
              }`}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${textStyles.navLink} ${textStyles.hoverBg}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-olive-100 dark:border-olive-700/30">
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
