import type { VehicleId } from "@/data/planner";

/** Simple line silhouettes, drawn by hand. 1.5px stroke to match lucide. */
const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

function Wheels({ a, b, y = 42, r = 7 }: { a: number; b: number; y?: number; r?: number }) {
  return (
    <>
      <circle cx={a} cy={y} r={r} />
      <circle cx={a} cy={y} r={r * 0.38} />
      <circle cx={b} cy={y} r={r} />
      <circle cx={b} cy={y} r={r * 0.38} />
    </>
  );
}

function Pickup() {
  return (
    <g>
      <path d="M17 42H6V31l9-3 11-11h24l4 11h60v14h-8M33 42h55" />
      <path d="M29 20h20l3 8H21z" />
      <path d="M54 28v14M108 32h6" />
      <Wheels a={25} b={96} />
    </g>
  );
}

function Van() {
  return (
    <g>
      <path d="M17 42H6V25l9-12 9-5h90v34h-8M33 42h55" />
      <path d="M17 14l8-4h11v12H11z" />
      <path d="M62 8v34M40 22h4M70 22h4" />
      <Wheels a={25} b={96} />
    </g>
  );
}

function Chassis() {
  return (
    <g>
      <path d="M15 42H5V31l8-3 7-12h20v26M31 42h58" />
      <path d="M22 18h14v10H16z" />
      <path d="M44 13h71v29h-11M44 13v29" />
      <path d="M62 13v24M80 13v24M98 13v24M44 37h71" />
      <circle cx="56" cy="25" r="1" fill="currentColor" />
      <circle cx="74" cy="25" r="1" fill="currentColor" />
      <circle cx="92" cy="25" r="1" fill="currentColor" />
      <Wheels a={23} b={96} />
    </g>
  );
}

function Suv() {
  return (
    <g>
      <path d="M17 42H8V27l8-2 7-13h73v30h-6M33 42h41" />
      <path d="M27 15h26v10H20zM57 15h35v10H57z" />
      <path d="M96 22h3a9 9 0 0 1 0 18h-3" />
      <Wheels a={25} b={82} />
    </g>
  );
}

function Fleet() {
  // Three pickups in a row, receding.
  const truck = "M17 42H6V31l9-3 11-11h24l4 11h60v14h-8M33 42h55M29 20h20l3 8H21zM54 28v14";
  return (
    <g>
      <g transform="translate(46 2) scale(0.6)" opacity="0.45">
        <path d={truck} />
        <Wheels a={25} b={96} />
      </g>
      <g transform="translate(24 10) scale(0.66)" opacity="0.7">
        <path d={truck} />
        <Wheels a={25} b={96} />
      </g>
      <g transform="translate(0 18) scale(0.72)">
        <path d={truck} />
        <Wheels a={25} b={96} />
      </g>
    </g>
  );
}

const MAP: Record<VehicleId, () => React.JSX.Element> = {
  pickup: Pickup,
  van: Van,
  chassis: Chassis,
  suv: Suv,
  fleet: Fleet,
};

export function VehicleIcon({ id, className = "" }: { id: VehicleId; className?: string }) {
  const Icon = MAP[id];
  return (
    <svg viewBox="0 0 122 52" className={className} aria-hidden {...common}>
      <Icon />
    </svg>
  );
}
