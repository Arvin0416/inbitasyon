import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-warm-200/60 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rosegold-500" />
              <span className="text-lg font-serif font-semibold text-navy-800">
                Invitasyon
              </span>
            </Link>
            <p className="text-sm text-warm-500 max-w-xs">
              Beautiful wedding invitation websites with RSVP — created in minutes.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-navy-700 uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-sm text-warm-500 hover:text-rosegold-600 transition-colors">
                  Browse Designs
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-warm-500 hover:text-rosegold-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="text-sm text-warm-500 hover:text-rosegold-600 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-navy-700 uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-warm-500 hover:text-rosegold-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-warm-500 hover:text-rosegold-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-warm-100">
          <p className="text-center text-xs text-warm-400">
            &copy; {new Date().getFullYear()} Invitasyon. All rights reserved. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
