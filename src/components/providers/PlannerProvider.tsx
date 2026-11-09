"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { isPreset, PRESETS, type PlannerPreset, type PurposeId, type VehicleId } from "@/data/planner";
import type { LocationSlug } from "@/data/locations";

// The planner UI only loads the first time someone opens it.
const BuildPlanner = dynamic(() => import("@/components/planner/BuildPlanner"), { ssr: false });

export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  company: string;
  year: string;
  make: string;
  model: string;
  notes: string;
};

export type PlannerState = {
  step: number;
  vehicle?: VehicleId;
  purpose?: PurposeId;
  fleetSize?: string;
  sector?: string;
  upgrades: string[];
  location?: LocationSlug;
  timeline?: string;
  contact: ContactInfo;
  /** Set when the Build Sheet is generated. */
  buildNumber?: string;
  submitted?: boolean;
};

export const emptyContact: ContactInfo = {
  name: "",
  phone: "",
  email: "",
  company: "",
  year: "",
  make: "",
  model: "",
  notes: "",
};

export const initialPlannerState: PlannerState = { step: 0, upgrades: [], contact: emptyContact };

type PlannerContextValue = {
  isOpen: boolean;
  openPlanner: (preset?: PlannerPreset) => void;
  closePlanner: () => void;
  state: PlannerState;
  update: (patch: Partial<PlannerState>) => void;
  reset: () => void;
};

const PlannerContext = createContext<PlannerContextValue | null>(null);
const STORAGE_KEY = "tt-build";

export function PlannerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [state, setState] = useState<PlannerState>(initialPlannerState);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Restore an in-progress build from this browser session.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...initialPlannerState, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const openPlanner = useCallback((preset?: PlannerPreset) => {
    returnFocus.current = (document.activeElement as HTMLElement) ?? null;
    if (preset) {
      const p = PRESETS[preset];
      setState((s) => {
        // A finished build starts fresh; otherwise keep answers and apply the preset.
        const base = s.submitted ? initialPlannerState : s;
        return {
          ...base,
          ...p,
          upgrades: p.vehicle && p.vehicle !== base.vehicle ? [] : base.upgrades,
          step: p.vehicle ? 1 : 0,
        };
      });
    }
    setHasOpened(true);
    setOpen(true);
  }, []);

  const closePlanner = useCallback(() => {
    setOpen(false);
    // Clean the deep-link param so a refresh doesn't reopen it.
    const url = new URL(window.location.href);
    if (url.searchParams.has("build")) {
      url.searchParams.delete("build");
      window.history.replaceState(null, "", url.toString());
    }
    requestAnimationFrame(() => returnFocus.current?.focus?.());
  }, []);

  const update = useCallback((patch: Partial<PlannerState>) => setState((s) => ({ ...s, ...patch })), []);
  const reset = useCallback(() => setState(initialPlannerState), []);

  // Deep link: any page with ?build=<preset> (or ?build) opens the planner.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("build");
    if (param === null) return;
    openPlanner(isPreset(param) ? param : undefined);
  }, [openPlanner]);

  const value = useMemo(
    () => ({ isOpen, openPlanner, closePlanner, state, update, reset }),
    [isOpen, openPlanner, closePlanner, state, update, reset],
  );

  return (
    <PlannerContext.Provider value={value}>
      {children}
      {hasOpened && <BuildPlanner />}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}
