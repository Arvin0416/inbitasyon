"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/Icon-imbitasyon.svg"
      alt="Imbitasyon"
      className={className}
      width={360}
      height={360}
      style={isDark ? { filter: "invert(1) brightness(2)" } : undefined}
    />
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/text-imbitasyon.svg"
        alt="Imbitasyon"
        className="w-full max-w-[280px] sm:max-w-[360px] h-auto"
        width={887}
        height={363}
        style={isDark ? { filter: "invert(1) brightness(2)" } : undefined}
      />
    </div>
  );
}
