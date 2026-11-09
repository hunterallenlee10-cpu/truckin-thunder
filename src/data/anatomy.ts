/**
 * Hotspots for the "Anatomy of an Upfit" section, placed on the real
 * objects in van-interior-express-hvac-shelving-yellow-step.jpg.
 * x / y are percentages of the photo's width / height.
 */
export type Hotspot = {
  id: string;
  code: string;
  title: string;
  body: string;
  category: string;
  x: number;
  y: number;
};

export const anatomy: Hotspot[] = [
  {
    id: "shelving",
    code: "TT-UPFIT / 01",
    title: "Shelving and bins",
    body: "Shelving, bins and tube holders laid out for the trade, so every part has a place you can reach from the rear doors.",
    category: "Storage and Organization",
    x: 27,
    y: 40,
  },
  {
    id: "cylinders",
    code: "TT-UPFIT / 02",
    title: "Cylinder and tank racks",
    body: "Dedicated racks hold refrigerant and gas cylinders upright and secured for the drive between jobs.",
    category: "Storage and Organization",
    x: 72,
    y: 62,
  },
  {
    id: "step",
    code: "TT-UPFIT / 03",
    title: "Safety step and rear protection",
    body: "A high-visibility yellow rear step gives the crew a safer climb in and protects the door opening.",
    category: "Safety and Protection",
    x: 52,
    y: 91,
  },
  {
    id: "lighting",
    code: "TT-UPFIT / 04",
    title: "Interior lighting and power",
    body: "Interior lighting and power wired into the van, so the crew can see and work at the back of the cargo area.",
    category: "Power and Electrical",
    x: 50,
    y: 17,
  },
  {
    id: "partition",
    code: "TT-UPFIT / 05",
    title: "Partition and cargo control",
    body: "A bulkhead partition separates the cab from the cargo area and keeps the load where it belongs.",
    category: "Partitions",
    x: 49,
    y: 46,
  },
];
