"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Mail, Navigation, Phone } from "lucide-react";
import { directionsHref, HOURS, telHref, type Location } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Store card: real storefront photo, live status, tap-to-call and directions. */
export function LocationCard({ location: l, nearestMiles }: { location: Location; nearestMiles?: number }) {
  const { shop, chosen, setShop } = useShop();
  const mine = chosen && shop.slug === l.slug;

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-[4px] border bg-steel transition-colors duration-300 ${
        mine ? "border-thunder-bright" : "border-hairline"
      }`}
    >
      <Link href={`/locations/${l.slug}`} className="relative block aspect-[16/9] overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={l.photo.src}
          alt=""
          fill
          placeholder="blur"
          // Broad Street and Fredericksburg photos are low-res: keep cards small.
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          style={{ objectPosition: l.photo.position }}
        />
        <div className="absolute left-3 top-3">
          <StatusBadge showDetail={false} />
        </div>
        {mine && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] bg-thunder-bright px-2.5 py-1 eyebrow !text-[11px] text-asphalt">
            <Check size={12} strokeWidth={2.5} aria-hidden />
            {nearestMiles !== undefined ? `Nearest · ${nearestMiles.toFixed(0)} mi` : "Your shop"}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="display text-[1.9rem]">
          <Link href={`/locations/${l.slug}`} className="hover:text-signal">
            {l.slug === "ashland" ? "Ashland Hitch" : l.name}
          </Link>
        </h3>
        {l.slug === "ashland" && <p className="eyebrow mt-1 !text-[11px] text-fog">A Truckin Thunder company</p>}
        <address className="mt-3 not-italic text-[15px] leading-relaxed text-fog">
          {l.street}
          <br />
          {l.city}, {l.state} {l.zip}
        </address>
        <p className="mt-2 text-[14px] text-fog">
          {HOURS.daysShort}, {HOURS.open} to {HOURS.close}
        </p>
        <div className="mt-3 flex flex-col gap-0.5 text-[15px]">
          <a href={telHref(l.phone)} className="inline-flex min-h-9 items-center gap-2 tabular-nums text-chalk hover:text-signal">
            <Phone size={15} strokeWidth={1.5} aria-hidden className="text-thunder-bright" />
            {l.phone}
          </a>
          <a href={`mailto:${l.email}`} className="inline-flex min-h-9 items-center gap-2 break-all text-chalk/85 hover:text-signal">
            <Mail size={15} strokeWidth={1.5} aria-hidden className="text-thunder-bright" />
            {l.email}
          </a>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <a href={directionsHref(l)} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
            <Navigation size={14} strokeWidth={1.5} aria-hidden /> Directions
          </a>
          <a href={telHref(l.phone)} className="btn btn-ghost btn-sm">
            <Phone size={14} strokeWidth={1.5} aria-hidden /> Call
          </a>
        </div>
        {!mine && (
          <button
            type="button"
            onClick={() => setShop(l.slug)}
            className="mt-2 min-h-11 self-start eyebrow !text-[11px] text-fog underline-offset-4 hover:text-chalk hover:underline"
          >
            Make this my shop
          </button>
        )}
      </div>
    </article>
  );
}
