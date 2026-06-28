"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, MessageCircle, LayoutGrid, MapPin, ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface OverlayConfig {
  threshold: number;
  label: string;
  icon: string;
  desktop: { x: string; y: string };
  mobile: { x: string; y: string };
}

const overlays: OverlayConfig[] = [
  {
    threshold: 0.55,
    label: "RSVP",
    icon: "rsvp",
    desktop: { x: "12%", y: "35%" },
    mobile: { x: "10%", y: "25%" },
  },
  {
    threshold: 0.60,
    label: "Gallery",
    icon: "gallery",
    desktop: { x: "15%", y: "65%" },
    mobile: { x: "8%", y: "55%" },
  },
  {
    threshold: 0.65,
    label: "Map",
    icon: "map",
    desktop: { x: "80%", y: "65%" },
    mobile: { x: "78%", y: "55%" },
  },
  {
    threshold: 0.70,
    label: "RSVP",
    icon: "rsvp2",
    desktop: { x: "82%", y: "35%" },
    mobile: { x: "76%", y: "25%" },
  },
];

function OverlayBadge({
  config,
  isMobile,
}: {
  config: OverlayConfig;
  isMobile: boolean;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    rsvp: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
    gallery: <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />,
    map: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
    rsvp2: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
  };

  const pos = isMobile ? config.mobile : config.desktop;

  return (
    <div
      className="absolute flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full opacity-0 transition-all duration-500 scale-90"
      style={{ left: pos.x, top: pos.y }}
      data-threshold={config.threshold}
    >
      <span className="text-gold-400">{iconMap[config.icon]}</span>
      <span className="text-cream-100 text-xs sm:text-sm font-medium">
        {config.label}
      </span>
    </div>
  );
}

export function ScrollVideoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlaysRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoReady(true);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
    };
  }, []);

  useGSAP(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVideoReady(true);
      return;
    }

    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Scrub video
          video.currentTime = p * video.duration;

          // Update overlays via refs (no React state)
          updateOverlays(p);

          // Update progress bar width
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${p * 100}%`;
          }
        },
      });
    };

    if (video.readyState >= 2) {
      setupScrollTrigger();
    } else {
      video.addEventListener("loadeddata", setupScrollTrigger, { once: true });
    }
  }, { scope: containerRef });

  // Direct DOM updates for overlays (no React re-renders)
  function updateOverlays(p: number) {
    const container = overlaysRef.current;
    if (!container) return;

    // Heart: show once, persist
    if (heartRef.current) {
      const showHeart = p > 0.10;
      heartRef.current.style.opacity = showHeart ? "1" : "0";
      heartRef.current.style.transform = showHeart
        ? "translateX(-50%) scale(1)"
        : "translateX(-50%) scale(0)";
    }

    // Title: show and persist
    if (titleRef.current) {
      const showTitle = p > 0.50;
      titleRef.current.style.opacity = showTitle ? "1" : "0";
      titleRef.current.style.transform = showTitle
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(20px)";
    }

    // Scroll hint: fade out
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = p > 0.05 ? "0" : "1";
    }

    // Feature badges
    const badges = container.querySelectorAll("[data-threshold]");
    badges.forEach((el) => {
      const threshold = parseFloat(el.getAttribute("data-threshold") || "0");
      const show = p >= threshold;
      (el as HTMLElement).style.opacity = show ? "1" : "0";
      (el as HTMLElement).style.transform = show ? "scale(1)" : "scale(0.9)";
    });
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="h-screen w-full bg-[#1a1a12] flex items-center justify-center overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          src="/imbitasyon.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Scroll to discover hint */}
          <div
            ref={scrollHintRef}
            className="absolute top-[8%] left-1/2 -translate-x-1/2 text-center transition-opacity duration-300"
          >
            <p className="text-cream-200/60 text-xs sm:text-sm tracking-[0.3em] uppercase font-light">
              Scroll to discover
            </p>
            <div className="mt-3 flex justify-center animate-bounce">
              <ChevronDown className="w-5 h-5 text-gold-400/60" />
            </div>
          </div>

          {/* Heart icon */}
          <div
            ref={heartRef}
            className="absolute top-[30%] left-1/2 -translate-x-1/2 transition-all duration-500 ease-out opacity-0"
          >
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-gold-400 drop-shadow-lg" fill="currentColor" />
          </div>

          {/* Feature badges */}
          <div ref={overlaysRef}>
            {overlays.map((config) => (
              <OverlayBadge
                key={config.icon}
                config={config}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* Title text */}
          <div
            ref={titleRef}
            className="absolute top-[42%] left-1/2 -translate-x-1/2 text-center transition-all duration-600 ease-out opacity-0 px-4"
          >
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-5xl font-bold text-white/90 drop-shadow-lg">
              We&apos;re Getting Married
            </h2>
            <p className="mt-2 sm:mt-3 text-cream-200/70 text-xs sm:text-sm tracking-widest uppercase">
              You&apos;re Invited
            </p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-none"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Loading state */}
        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a12]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-gold-400/30 border-t-gold-400 rounded-full animate-spin" />
              <p className="text-cream-200/50 text-xs sm:text-sm">
                Loading experience...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
