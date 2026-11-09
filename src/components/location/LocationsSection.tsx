"use client";

import { LocateFixed, Loader2 } from "lucide-react";
import { locations } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { LocationCard } from "./LocationCard";
import { VirginiaMap } from "./VirginiaMap";

export function UseMyLocation({ className = "" }: { className?: string }) {
  const { locate, locateState, shop } = useShop();
  return (
    <div className={className}>
      <button
        type="button"
        onClick={locate}
        disabled={locateState.status === "locating"}
        className="btn btn-ghost btn-sm"
      >
        {locateState.status === "locating" ? (
          <Loader2 size={16} className="animate-spin" aria-hidden />
        ) : (
          <LocateFixed size={16} strokeWidth={1.5} aria-hidden />
        )}
        Use my location
      </button>
      <p className="mt-2 min-h-6 text-[14px] text-fog" aria-live="polite">
        {locateState.status === "done" && `Nearest shop: ${shop.tradingName}, about ${locateState.miles?.toFixed(0)} miles away.`}
        {locateState.status === "error" && locateState.message}
      </p>
    </div>
  );
}

export function LocationsSection({ index = "08" }: { index?: string }) {
  const { locateState, shop } = useShop();
  return (
    <section id="locations" aria-labelledby="locations-title" className="section-pad relative scroll-mt-20 bg-asphalt">
      <div className="container-site">
        <SectionHeader
          id="locations-title"
          index={index}
          eyebrow="Locations"
          numeral={index}
          title="Four shops. One crew."
          lede="From Fredericksburg to Midlothian, every location has its own install team. Monday to Friday, 8 AM to 5 PM."
          aside={<UseMyLocation />}
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <VirginiaMap />
              <p className="mt-3 text-[14px] text-fog">Tap a pin to make it your shop. Your phone number in the menu follows it.</p>
            </div>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {locations.map((l, i) => (
              <Reveal as="li" i={i} key={l.slug}>
                <LocationCard
                  location={l}
                  nearestMiles={locateState.status === "done" && shop.slug === l.slug ? locateState.miles : undefined}
                />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
