"use client";
// Placeholder until Phase 4.
import { usePlanner } from "@/components/providers/PlannerProvider";
export default function BuildPlanner() {
  const { isOpen, closePlanner } = usePlanner();
  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/70">
      <button className="btn btn-signal" onClick={closePlanner}>Close</button>
    </div>
  );
}
