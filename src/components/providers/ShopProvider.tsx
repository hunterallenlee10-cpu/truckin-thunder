"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCATION, getLocation, type Location, type LocationSlug } from "@/data/locations";
import { getBrowserPosition, nearestLocation } from "@/lib/geo";

type LocateState = { status: "idle" | "locating" | "done" | "error"; message?: string; miles?: number };

type ShopContextValue = {
  shop: Location;
  /** True once the visitor picked a shop or shared their location. */
  chosen: boolean;
  setShop: (slug: LocationSlug) => void;
  locate: () => Promise<Location | null>;
  locateState: LocateState;
};

const ShopContext = createContext<ShopContextValue | null>(null);
const STORAGE_KEY = "tt-shop";

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [slug, setSlug] = useState<LocationSlug>(DEFAULT_LOCATION);
  const [chosen, setChosen] = useState(false);
  const [locateState, setLocateState] = useState<LocateState>({ status: "idle" });

  // Restore the visitor's shop after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && getLocation(saved)) {
        setSlug(saved as LocationSlug);
        setChosen(true);
      }
    } catch {
      /* storage blocked: keep default */
    }
  }, []);

  const setShop = useCallback((next: LocationSlug) => {
    setSlug(next);
    setChosen(true);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const locate = useCallback(async () => {
    setLocateState({ status: "locating" });
    try {
      const pos = await getBrowserPosition();
      const { location, miles } = nearestLocation(pos);
      setShop(location.slug);
      setLocateState({ status: "done", miles });
      return location;
    } catch (e) {
      setLocateState({ status: "error", message: (e as Error).message });
      return null;
    }
  }, [setShop]);

  const value = useMemo(
    () => ({ shop: getLocation(slug)!, chosen, setShop, locate, locateState }),
    [slug, chosen, setShop, locate, locateState],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}
