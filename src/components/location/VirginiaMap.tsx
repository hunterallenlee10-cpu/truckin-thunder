"use client";

import { locations, type LocationSlug } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";

/**
 * Hand-drawn, simplified map of the Central Virginia corridor.
 * Equirectangular projection corrected for latitude (cos 38°).
 */
const BOUNDS = { north: 38.42, south: 37.42, west: -77.92, east: -77.12 };
const W = 380;
const H = 600;
const px = (lat: number, lng: number) => ({
  x: ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * W,
  y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * H,
});
const path = (pts: [number, number][]) =>
  pts
    .map(([lat, lng], i) => {
      const { x, y } = px(lat, lng);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

const I95: [number, number][] = [
  [38.45, -77.42], [38.32, -77.5], [38.1, -77.5], [37.9, -77.46], [37.75, -77.45], [37.62, -77.44], [37.54, -77.43], [37.4, -77.42],
];
const I64: [number, number][] = [
  [37.68, -77.95], [37.64, -77.7], [37.62, -77.55], [37.6, -77.47], [37.55, -77.4], [37.5, -77.25], [37.45, -77.1],
];
const JAMES: [number, number][] = [
  [37.6, -77.95], [37.56, -77.7], [37.535, -77.55], [37.53, -77.48], [37.5, -77.4], [37.42, -77.28], [37.38, -77.2],
];
const RAPPAHANNOCK: [number, number][] = [
  [38.36, -77.75], [38.32, -77.55], [38.3, -77.46], [38.25, -77.3], [38.15, -77.1],
];

const LABEL_LEFT: Record<LocationSlug, boolean> = {
  midlothian: true,
  "broad-street": true,
  ashland: false,
  fredericksburg: false,
};

export function VirginiaMap({ highlight }: { highlight?: LocationSlug }) {
  const { shop, chosen, setShop } = useShop();
  const activeSlug = highlight ?? (chosen ? shop.slug : undefined);
  const i95Label = px(37.98, -77.47);
  const i64Label = px(37.655, -77.8);

  return (
    <figure className="ticks relative overflow-hidden rounded-[4px] border border-hairline bg-steel">
      <div aria-hidden className="blueprint absolute inset-0 opacity-60" />
      <svg viewBox={`0 0 ${W} ${H}`} className="relative block h-auto w-full" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Map of Truckin Thunder locations in Central Virginia</title>
        <desc id="map-desc">
          Fredericksburg to the north on I-95, Ashland in the middle, and the Broad Street and Midlothian stores in
          Richmond to the south.
        </desc>

        {/* Rivers */}
        <path d={path(JAMES)} fill="none" stroke="#126B93" strokeOpacity="0.55" strokeWidth="2" />
        <path d={path(RAPPAHANNOCK)} fill="none" stroke="#126B93" strokeOpacity="0.55" strokeWidth="2" />

        {/* Interstates */}
        <path d={path(I95)} fill="none" stroke="#9AA4AE" strokeOpacity="0.7" strokeWidth="1.25" />
        <path d={path(I64)} fill="none" stroke="#9AA4AE" strokeOpacity="0.7" strokeWidth="1.25" />
        <Shield x={i95Label.x + 14} y={i95Label.y} label="I-95" />
        <Shield x={i64Label.x} y={i64Label.y - 16} label="I-64" />

        {/* Places */}
        <text x={px(37.585, -77.41).x} y={px(37.585, -77.41).y} className="fill-fog" style={{ font: "600 10px var(--font-label)", letterSpacing: "0.2em" }}>
          RICHMOND
        </text>
        <text x={px(38.4, -77.82).x} y={px(38.4, -77.82).y} className="fill-fog" style={{ font: "600 10px var(--font-label)", letterSpacing: "0.2em" }}>
          RAPPAHANNOCK
        </text>
        <text x={px(37.58, -77.9).x} y={px(37.58, -77.9).y} className="fill-fog" style={{ font: "600 10px var(--font-label)", letterSpacing: "0.2em" }}>
          JAMES RIVER
        </text>

        {/* North arrow and scale bar (10 miles is about 0.145 degrees of latitude) */}
        <g transform={`translate(${W - 34} 30)`} className="fill-fog">
          <path d="M0 -14 L6 6 L0 2 L-6 6 Z" />
          <text y="22" textAnchor="middle" style={{ font: "600 10px var(--font-label)" }}>N</text>
        </g>
        <g transform={`translate(20 ${H - 26})`}>
          <line x1="0" x2={(0.145 / (BOUNDS.north - BOUNDS.south)) * H} y1="0" y2="0" stroke="#9AA4AE" strokeWidth="1.5" />
          <line x1="0" x2="0" y1="-4" y2="4" stroke="#9AA4AE" />
          <line x1={(0.145 / (BOUNDS.north - BOUNDS.south)) * H} x2={(0.145 / (BOUNDS.north - BOUNDS.south)) * H} y1="-4" y2="4" stroke="#9AA4AE" />
          <text y="-8" className="fill-fog" style={{ font: "600 9px var(--font-label)", letterSpacing: "0.16em" }}>10 MI</text>
        </g>

        {/* Pins */}
        {locations.map((l) => {
          const { x, y } = px(l.geo.lat, l.geo.lng);
          const active = l.slug === activeSlug;
          const left = LABEL_LEFT[l.slug];
          return (
            <g
              key={l.slug}
              transform={`translate(${x} ${y})`}
              className="cursor-pointer outline-none [&:focus-visible>circle:first-of-type]:stroke-signal"
              role="button"
              tabIndex={0}
              aria-label={`Set ${l.tradingName} as my shop`}
              aria-pressed={active}
              onClick={() => setShop(l.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setShop(l.slug);
                }
              }}
            >
              <circle r="22" fill="transparent" stroke="transparent" strokeWidth="2" />
              {active && <circle r="16" fill="none" stroke="#FFC700" strokeWidth="1.5" />}
              <circle r="9" fill={active ? "#2A93C6" : "#126B93"} stroke="#ECEEF0" strokeWidth="2" />
              <circle r="2.5" fill="#ECEEF0" />
              <text
                x={left ? -16 : 16}
                y="4"
                textAnchor={left ? "end" : "start"}
                className={active ? "fill-chalk" : "fill-chalk/85"}
                style={{ font: "600 12px var(--font-label)", letterSpacing: "0.12em" }}
              >
                {(l.slug === "ashland" ? "ASHLAND HITCH" : l.name).toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="eyebrow absolute bottom-3 right-4 !text-[10px] text-fog">Not to scale · approximate</figcaption>
    </figure>
  );
}

function Shield({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-17" y="-9" width="34" height="18" rx="2" fill="#0E1114" stroke="#9AA4AE" strokeOpacity="0.8" />
      <text textAnchor="middle" y="4" className="fill-chalk" style={{ font: "600 10px var(--font-label)", letterSpacing: "0.08em" }}>
        {label}
      </text>
    </g>
  );
}
