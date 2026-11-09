"use client";

import { Check } from "lucide-react";
import type { LocationSlug } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";

/** Lets a visitor pin this shop; the header phone number follows it. */
export function MakeMyShop({ slug }: { slug: LocationSlug }) {
  const { shop, chosen, setShop } = useShop();
  const mine = chosen && shop.slug === slug;
  return (
    <button
      type="button"
      onClick={() => setShop(slug)}
      disabled={mine}
      className="mt-4 inline-flex min-h-11 items-center gap-2 eyebrow !text-[11px] text-fog hover:text-chalk disabled:text-thunder-bright"
    >
      {mine ? (
        <>
          <Check size={14} strokeWidth={2} aria-hidden /> This is your shop
        </>
      ) : (
        "Make this my shop"
      )}
    </button>
  );
}
