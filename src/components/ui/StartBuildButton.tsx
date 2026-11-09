"use client";

import { ArrowRight } from "lucide-react";
import { usePlanner } from "@/components/providers/PlannerProvider";
import type { PlannerPreset } from "@/data/planner";

type Props = {
  preset?: PlannerPreset;
  label?: string;
  className?: string;
  size?: "md" | "sm";
  variant?: "signal" | "ink" | "link";
  arrow?: boolean;
};

/** The one primary action on every page. Opens the Build Planner. */
export function StartBuildButton({
  preset,
  label = "Start My Build",
  className = "",
  size = "md",
  variant = "signal",
  arrow = true,
}: Props) {
  const { openPlanner } = usePlanner();
  const cls =
    variant === "link"
      ? `link-arrow ${className}`
      : `btn ${variant === "ink" ? "btn-ink" : "btn-signal"} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  return (
    <button type="button" className={cls} onClick={() => openPlanner(preset)} aria-haspopup="dialog">
      {label}
      {arrow && <ArrowRight aria-hidden size={size === "sm" ? 16 : 18} strokeWidth={1.75} />}
    </button>
  );
}
