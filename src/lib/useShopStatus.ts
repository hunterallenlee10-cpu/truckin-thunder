"use client";

import { useEffect, useState } from "react";
import { getShopStatus, type ShopStatus } from "./hours";

/**
 * Live shop status, refreshed every 30 seconds.
 * Returns null during server render so the markup never disagrees with the
 * visitor's clock on hydration.
 */
export function useShopStatus(): ShopStatus | null {
  const [status, setStatus] = useState<ShopStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(getShopStatus());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
