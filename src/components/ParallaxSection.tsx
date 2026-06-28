"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  speed?: number;
  bgClassName?: string;
}

export function ParallaxSection({
  children,
  id,
  className = "",
  speed = 0.3,
  bgClassName = "",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    // Skip parallax for users who prefer reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Parallax background that moves slower than scroll
      gsap.fromTo(
        bg,
        { yPercent: -15 * speed },
        {
          yPercent: 15 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={sectionRef} id={id} className={`relative overflow-hidden ${className}`}>
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className={`absolute inset-0 -top-[15%] -bottom-[15%] ${bgClassName}`}
        style={{ willChange: "transform" }}
      />
      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
