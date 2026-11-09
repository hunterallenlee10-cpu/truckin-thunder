"use client";

import { LazyMotion, MotionConfig } from "motion/react";

// Animation features load after first paint.
const loadFeatures = () => import("./motionFeatures").then((m) => m.default);
import { ShopProvider } from "./ShopProvider";
import { PlannerProvider } from "./PlannerProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <ShopProvider>
        <PlannerProvider>{children}</PlannerProvider>
      </ShopProvider>
    </MotionConfig>
    </LazyMotion>
  );
}
