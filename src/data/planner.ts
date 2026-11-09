/**
 * Build Planner options. Upgrades come only from the services Truckin
 * Thunder lists on their site.
 */

export type VehicleId = "pickup" | "van" | "chassis" | "suv" | "fleet";
export type PurposeId = "trade" | "fleet-gov" | "offroad" | "towing" | "daily";

export const vehicles: { id: VehicleId; label: string; hint: string }[] = [
  { id: "pickup", label: "Pickup Truck", hint: "Half ton to heavy duty" },
  { id: "van", label: "Cargo Van", hint: "Transit, Sprinter, Express, ProMaster" },
  { id: "chassis", label: "Cab and Chassis", hint: "Service body or flatbed" },
  { id: "suv", label: "SUV or Jeep", hint: "Trail and overland builds" },
  { id: "fleet", label: "A Whole Fleet", hint: "Multiple matching vehicles" },
];

export const purposes: { id: PurposeId; label: string }[] = [
  { id: "trade", label: "Trade and Service Work" },
  { id: "fleet-gov", label: "Fleet or Government" },
  { id: "offroad", label: "Off-Road and Overland" },
  { id: "towing", label: "Towing and Hauling" },
  { id: "daily", label: "Daily Driver plus Weekends" },
];

export const fleetSizes = ["1 to 5", "6 to 20", "21 to 50", "50+"] as const;
export const fleetSectors = [
  "Utility and Power",
  "Public Works and Municipal",
  "Telecommunications",
  "Construction and Service",
  "Other",
] as const;

export const timelines = [
  { id: "asap", label: "ASAP" },
  { id: "30", label: "Within 30 days" },
  { id: "90", label: "1 to 3 months" },
  { id: "research", label: "Just researching" },
] as const;

const ALL: VehicleId[] = ["pickup", "van", "chassis", "suv", "fleet"];
const WORK: VehicleId[] = ["pickup", "van", "chassis", "fleet"];
const TRAIL: VehicleId[] = ["pickup", "suv"];

export type Upgrade = { id: string; label: string; vehicles: VehicleId[] };
export type UpgradeGroup = { id: string; label: string; items: Upgrade[] };

export const upgradeGroups: UpgradeGroup[] = [
  {
    id: "storage",
    label: "Storage and Organization",
    items: [
      { id: "van-shelving", label: "Van shelving and bins", vehicles: ["van", "fleet"] },
      { id: "partition", label: "Partitions", vehicles: ["van", "fleet"] },
      { id: "toolbox", label: "Toolboxes", vehicles: ["pickup", "chassis", "fleet"] },
      { id: "drawers", label: "Drawer systems", vehicles: ["pickup", "van", "suv", "fleet"] },
      { id: "cargo-mgmt", label: "Cargo management", vehicles: ALL },
    ],
  },
  {
    id: "racks",
    label: "Racks and Caps",
    items: [
      { id: "ladder-rack", label: "Ladder racks", vehicles: ["pickup", "van", "fleet"] },
      { id: "truck-cap", label: "Truck caps", vehicles: ["pickup", "fleet"] },
      { id: "bed-rack", label: "Bed racks", vehicles: ["pickup"] },
      { id: "roof-rack", label: "Roof racks", vehicles: ["pickup", "suv", "van"] },
    ],
  },
  {
    id: "beds",
    label: "Beds and Bodies",
    items: [
      { id: "service-body", label: "Service and utility body", vehicles: ["chassis", "pickup", "fleet"] },
      { id: "flatbed", label: "Flatbed", vehicles: ["chassis", "pickup", "fleet"] },
      { id: "bed-protection", label: "Bed protection", vehicles: ["pickup", "fleet"] },
    ],
  },
  {
    id: "liftgates",
    label: "Liftgates",
    items: [{ id: "liftgate", label: "Liftgate", vehicles: WORK }],
  },
  {
    id: "safety",
    label: "Safety Lighting",
    items: [
      { id: "strobes", label: "Strobes and beacons", vehicles: WORK },
      { id: "markings", label: "DOT reflective decals and markings", vehicles: WORK },
    ],
  },
  {
    id: "power",
    label: "Power and Electrical",
    items: [
      { id: "inverter", label: "Inverters", vehicles: ALL },
      { id: "wiring", label: "Wiring integration", vehicles: ALL },
      { id: "equipment", label: "Vehicle-mounted equipment", vehicles: WORK },
    ],
  },
  {
    id: "towing",
    label: "Towing and Hitches",
    items: [
      { id: "hitch", label: "Hitch", vehicles: ALL },
      { id: "trailer-wiring", label: "Trailer wiring", vehicles: ALL },
    ],
  },
  {
    id: "suspension",
    label: "Suspension and Wheels",
    items: [
      { id: "lift-kit", label: "Lift kit", vehicles: TRAIL },
      { id: "leveling-kit", label: "Leveling kit", vehicles: TRAIL },
      { id: "tires", label: "All-terrain or mud-terrain tires", vehicles: TRAIL },
    ],
  },
  {
    id: "protection",
    label: "Protection and Recovery",
    items: [
      { id: "hd-bumpers", label: "Heavy-duty bumpers", vehicles: ["pickup", "chassis", "fleet"] },
      { id: "offroad-bumpers", label: "Off-road bumpers", vehicles: TRAIL },
      { id: "grille-guard", label: "Grille and brush guards", vehicles: ALL },
      { id: "skid-plates", label: "Skid plates", vehicles: TRAIL },
      { id: "sliders", label: "Rock sliders and side steps", vehicles: TRAIL },
      { id: "nerf-bars", label: "Nerf bars", vehicles: ["pickup", "suv", "chassis"] },
      { id: "winch", label: "Winch and recovery gear", vehicles: TRAIL },
      { id: "onboard-air", label: "Onboard air", vehicles: TRAIL },
      { id: "overland", label: "Overland-ready build", vehicles: TRAIL },
    ],
  },
  {
    id: "lighting",
    label: "Lighting",
    items: [{ id: "led", label: "LED light bars, pods and ditch lights", vehicles: TRAIL }],
  },
];

export const NOT_SURE = { id: "not-sure", label: "Not sure yet, help me choose" };

export const upgradeLabel = (id: string) =>
  id === NOT_SURE.id
    ? NOT_SURE.label
    : upgradeGroups.flatMap((g) => g.items).find((i) => i.id === id)?.label ?? id;

export const groupsForVehicle = (vehicle?: VehicleId) =>
  upgradeGroups
    .map((g) => ({ ...g, items: g.items.filter((i) => !vehicle || i.vehicles.includes(vehicle)) }))
    .filter((g) => g.items.length > 0);

/** Deep-link presets: `?build=fleet` etc. */
export type PlannerPreset = "fleet" | "van" | "offroad" | "chassis" | "pickup" | "suv";
export const PRESETS: Record<PlannerPreset, { vehicle?: VehicleId; purpose?: PurposeId }> = {
  fleet: { vehicle: "fleet", purpose: "fleet-gov" },
  van: { vehicle: "van" },
  offroad: { purpose: "offroad" },
  chassis: { vehicle: "chassis" },
  pickup: { vehicle: "pickup" },
  suv: { vehicle: "suv", purpose: "offroad" },
};
export const isPreset = (v: string | null): v is PlannerPreset => !!v && v in PRESETS;
