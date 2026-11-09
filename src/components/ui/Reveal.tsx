"use client";

import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Fade and 16px rise when scrolled into view. One shared observer for the
 * whole page. Content stays visible without JS and under reduced motion.
 */
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            observer?.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
  }
  return observer;
}

type Props = {
  children: ReactNode;
  /** Stagger index: each step adds 60ms. */
  i?: number;
  as?: ElementType;
  className?: string;
} & Record<string, unknown>;

export function Reveal({ children, i = 0, as = "div", className = "", ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver();
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);
  return createElement(
    as,
    { ref, className: `reveal ${className}`, style: { "--d": `${i * 60}ms` }, ...rest },
    children,
  );
}
