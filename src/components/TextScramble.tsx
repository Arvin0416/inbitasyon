"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  duration?: number;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function TextScramble({
  text,
  duration = 1200,
  className = "",
  tag: Tag = "span",
}: TextScrambleProps) {
  const [display, setDisplay] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runScramble = useCallback(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(text);
      return;
    }

    const totalChars = text.length;
    const frameRate = 30;
    const totalFrames = Math.ceil((duration / 1000) * frameRate);
    let frame = 0;

    timerRef.current = setInterval(() => {
      const progress = frame / totalFrames;
      let result = "";

      for (let i = 0; i < totalChars; i++) {
        if (text[i] === " ") {
          result += " ";
        } else if (i / totalChars < progress) {
          result += text[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      setDisplay(result);
      frame++;

      if (frame > totalFrames) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setDisplay(text);
      }
    }, 1000 / frameRate);
  }, [text, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [runScramble]);

  return (
    <div ref={elementRef} className="inline">
      <Tag className={className}>{display || "\u00A0"}</Tag>
    </div>
  );
}
