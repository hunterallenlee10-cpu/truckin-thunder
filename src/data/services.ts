import { photos, type Photo } from "./images";

export type ServiceSlug = "fleet-government" | "commercial-vans-trucks" | "offroad" | "truck-beds-service-bodies";

export type Service = {
  slug: ServiceSlug;
  href: `/${ServiceSlug}`;
  index: string;
  name: string;
  shortName: string;
  line: string;
  bullets: [string, string, string];
  photo: Photo;
  /** Build Planner preset this page's CTA opens. */
  plannerPreset: "fleet" | "van" | "offroad" | "chassis";
};

export const services: Service[] = [
  {
    slug: "fleet-government",
    href: "/fleet-government",
    index: "01",
    name: "Fleet & Government",
    shortName: "Fleet",
    line: "Standardized upfits for utilities, municipalities, contractors and agencies.",
    bullets: ["Service and utility bodies", "DOT-compliant safety lighting", "Power and electrical"],
    photo: photos.heroFleetLot,
    plannerPreset: "fleet",
  },
  {
    slug: "commercial-vans-trucks",
    href: "/commercial-vans-trucks",
    index: "02",
    name: "Commercial Vans & Trucks",
    shortName: "Commercial",
    line: "Shelving, racks, caps and liftgates that turn a van into a workspace.",
    bullets: ["Shelving and partitions", "Ladder racks and truck caps", "Liftgates and drawer systems"],
    photo: photos.vanSprinter,
    plannerPreset: "van",
  },
  {
    slug: "offroad",
    href: "/offroad",
    index: "03",
    name: "Off-Road",
    shortName: "Off-Road",
    line: "Built to perform in the real world, not just look good in a parking lot.",
    bullets: ["Lift and leveling kits", "Bumpers, armor and recovery", "LED lighting and racks"],
    photo: photos.heroRaptor,
    plannerPreset: "offroad",
  },
  {
    slug: "truck-beds-service-bodies",
    href: "/truck-beds-service-bodies",
    index: "04",
    name: "Truck Beds & Service Bodies",
    shortName: "Truck Beds",
    line: "Flatbeds and modular service bodies from CM Truck Beds.",
    bullets: ["CM flatbeds", "Component-style service bodies", "Hitches and trailer wiring"],
    photo: photos.flatbedCM,
    plannerPreset: "chassis",
  },
];

/* ---------- Fleet and Government ---------- */

export const fleetSectors = [
  { code: "UTL", name: "Utility and Power" },
  { code: "PWM", name: "Public Works and Municipal" },
  { code: "TEL", name: "Telecommunications" },
  { code: "CSF", name: "Construction and Service Fleets" },
];

export const fleetWhy = [
  {
    title: "Certified installers, proven vendors",
    body: "Our installers work with the brands fleets already trust, including Weather Guard, Adrian Steel and Ranger Design.",
  },
  {
    title: "Turnkey coordination",
    body: "Standardized fleet packages keep every vehicle consistent, from the first truck to the last.",
  },
  {
    title: "Fast turnaround, volume pricing",
    body: "Competitive pricing on volume orders with turnaround that keeps your crews on the road.",
  },
  {
    title: "Warranty and service at every location",
    body: "Dedicated service support at all four Virginia shops, long after the upfit is done.",
  },
];

export const fleetPackages = [
  { code: "PKG-01", name: "Service and Utility Bodies", body: "Custom tool and storage systems for every trade." },
  { code: "PKG-02", name: "Safety Lighting and Markings", body: "DOT-compliant strobes, beacons and reflective decals." },
  { code: "PKG-03", name: "Power and Electrical", body: "Inverters, wiring integration and vehicle-mounted equipment." },
  { code: "PKG-04", name: "Vehicle Protection", body: "Heavy-duty bumpers, grille guards and bed protection." },
];

/* ---------- Commercial ---------- */

export const commercialCategories = [
  { name: "Van Shelving", body: "Shelving and bins laid out for your trade." },
  { name: "Partitions", body: "Bulkheads that separate cab and cargo." },
  { name: "Ladder Racks", body: "Roof and bed racks for ladders and long stock." },
  { name: "Truck Caps", body: "Work caps from A.R.E. and Adrian Steel." },
  { name: "Liftgates", body: "Liftgates for heavy loads and safer backs." },
  { name: "Toolboxes", body: "Crossover, side mount and chest boxes." },
  { name: "Drawer Systems", body: "Slide-out drawers for beds and vans." },
];

/* ---------- Off-Road, grouped spec grid ---------- */

export const offroadGroups = [
  { code: "OR-01", name: "Lift and Stance", items: ["Lift kits", "Leveling kits"] },
  { code: "OR-02", name: "Wheels and Tires", items: ["All-terrain tires", "Mud-terrain tires"] },
  {
    code: "OR-03",
    name: "Armor and Protection",
    items: ["Front and rear off-road bumpers", "Skid plates and underbody protection", "Rock sliders and side steps", "Grille and brush guards"],
  },
  { code: "OR-04", name: "Lighting", items: ["LED light bars", "Light pods", "Ditch lights"] },
  { code: "OR-05", name: "Recovery", items: ["Winches and recovery systems", "Tow hooks, shackles and straps", "Onboard air"] },
  { code: "OR-06", name: "Racks and Storage", items: ["Bed racks", "Roof racks", "Cargo management", "Tool storage and drawer systems"] },
  { code: "OR-07", name: "Overland", items: ["Overland-ready builds"] },
];

/* ---------- Truck Beds ---------- */

export const bedsCategories = [
  { name: "Flatbeds", body: "Steel flatbeds for haulers and contractors." },
  { name: "Service Bodies", body: "CM component-style service bodies with a modular design." },
  { name: "Hitches", body: "Receiver, gooseneck and fifth wheel hitch installs." },
  { name: "Trailer Wiring", body: "Clean, reliable wiring harness installs." },
  { name: "Bumpers", body: "Heavy-duty front and rear bumpers." },
  { name: "Lifts and Nerf Bars", body: "Stance and step-up access for every truck." },
  { name: "Trailers", body: "Homesteader trailers." },
];

export const howItWorks = [
  { step: "01", title: "Tell us the build", body: "Start My Build, call your shop or stop in. Tell us what you drive and what it needs to do." },
  { step: "02", title: "We spec it and quote it", body: "Our team matches the right products to your truck, your trade and your budget." },
  { step: "03", title: "We install it in our shop", body: "A dedicated install team at every location does the work in house." },
  { step: "04", title: "You get back to work, or the trail", body: "Pick it up ready to go, with service support at all four locations." },
];
