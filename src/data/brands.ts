import type { StaticImageData } from "next/image";

import adrian from "../../public/images/partners/trimmed/logo-adrian-steel.png";
import buyers from "../../public/images/partners/trimmed/logo-buyers-products.png";
import bw from "../../public/images/partners/trimmed/logo-bw-trailer-hitches.png";
import cm from "../../public/images/partners/trimmed/logo-cm-truck-beds.png";
import curt from "../../public/images/partners/trimmed/logo-curt.png";
import decked from "../../public/images/partners/trimmed/logo-decked.png";
import holman from "../../public/images/partners/trimmed/logo-holman.png";
import homesteader from "../../public/images/partners/trimmed/logo-homesteader-trailer.png";
import legend from "../../public/images/partners/trimmed/logo-legend.png";
import ranger from "../../public/images/partners/trimmed/logo-ranger-design.png";
import are from "../../public/images/partners/trimmed/logo-realtruck-are.png";
import samlex from "../../public/images/partners/trimmed/logo-samlex-america.png";
import spitz from "../../public/images/partners/trimmed/logo-spitzlift.png";
import tommy from "../../public/images/partners/trimmed/logo-tommy-gate.png";
import uws from "../../public/images/partners/trimmed/logo-uws.png";
import weather from "../../public/images/partners/trimmed/logo-weather-guard.png";

type Use = "fleet" | "commercial" | "offroad" | "beds";

export type Brand = {
  name: string;
  logo: StaticImageData;
  /** Only claims that are obvious from the brand itself. */
  known?: string;
  /** Service pages that show this logo in their filtered row. */
  uses: Use[];
  /** Visual tweak: very wide logos need less padding to stay legible. */
  wide?: boolean;
  /** Logo files that ship with a solid colored background block. */
  solid?: boolean;
};

export const brands: Brand[] = [
  { name: "Adrian Steel", logo: adrian, known: "Van shelving and racks", uses: ["fleet", "commercial"], wide: true, solid: true },
  { name: "Ranger Design", logo: ranger, known: "Van shelving and racks", uses: ["fleet", "commercial"] },
  { name: "Weather Guard", logo: weather, known: "Toolboxes and storage", uses: ["fleet", "commercial", "beds"], wide: true },
  { name: "A.R.E. / RealTruck", logo: are, known: "Truck caps", uses: ["commercial"], wide: true },
  { name: "Tommy Gate", logo: tommy, known: "Liftgates", uses: ["fleet", "commercial", "beds"] },
  { name: "CM Truck Beds", logo: cm, known: "Truck beds and service bodies", uses: ["fleet", "beds"] },
  { name: "DECKED", logo: decked, known: "Drawer systems", uses: ["commercial", "offroad"] },
  { name: "UWS", logo: uws, known: "Toolboxes and storage", uses: ["commercial", "beds"] },
  { name: "CURT", logo: curt, known: "Hitches", uses: ["offroad", "beds"] },
  { name: "B&W Trailer Hitches", logo: bw, known: "Hitches", uses: ["offroad", "beds"] },
  { name: "Samlex America", logo: samlex, known: "Inverters", uses: ["fleet"], wide: true },
  { name: "Buyers Products", logo: buyers, uses: [], solid: true },
  { name: "Holman", logo: holman, uses: [] },
  { name: "Legend", logo: legend, uses: [] },
  { name: "SpitzLift", logo: spitz, uses: [] },
  { name: "Homesteader Trailer", logo: homesteader, known: "Trailers", uses: ["beds"] },
];

export const brandsFor = (use: Use) => brands.filter((b) => b.uses.includes(use));
