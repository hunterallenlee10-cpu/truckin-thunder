"use client";

import { MotionConfig } from "motion/react";
import { ShopProvider } from "./ShopProvider";
import { PlannerProvider } from "./PlannerProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ShopProvider>
        <PlannerProvider>{children}</PlannerProvider>
      </ShopProvider>
    </MotionConfig>
  );
}
