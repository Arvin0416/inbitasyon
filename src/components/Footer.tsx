import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-olive-200/60 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-charcoal-500 max-w-xs">
              Beautiful wedding invitation websites with RSVP — created in minutes.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-olive-700 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-sm text-charcoal-500 hover:text-olive-700 transition-colors">
                  Browse Designs
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-charcoal-500 hover:text-olive-700 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-charcoal-500 hover:text-olive-700 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-olive-700 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-charcoal-500 hover:text-olive-700 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-charcoal-500 hover:text-olive-700 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-olive-100">
          <p className="text-center text-xs text-charcoal-400">
            &copy; {new Date().getFullYear()} Imbitasyon. All rights reserved. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
