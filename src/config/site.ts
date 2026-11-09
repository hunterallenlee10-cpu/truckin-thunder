/**
 * Site-wide config.
 *
 * IS_CONCEPT keeps this preview out of search results (noindex, nofollow)
 * and shows the "Concept preview" footer line. Flip to false at launch.
 */
export const IS_CONCEPT = true;

export const site = {
  name: "Truckin Thunder Accessories",
  shortName: "Truckin Thunder",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://truckin-thunder.vercel.app").replace(/\/$/, ""),
  foundingYear: 1978,
  city: "Richmond, Virginia",
  description:
    "Truck accessories, commercial upfitting, fleet and government upfitting, truck beds and off-road builds with expert installation. A Virginia family business since 1978 with four locations.",
  social: {
    instagram: "https://www.instagram.com/truckinthunderva",
    facebook: "https://www.facebook.com/p/Truckin-Thunder-100063841501520/",
  },
  associations: ["SEMA", "NTEA"],
  conceptCredit: "Concept preview by Lee Enterprises Unlimited.",
} as const;

export const nav = [
  { label: "Fleet & Government", href: "/fleet-government" },
  { label: "Commercial", href: "/commercial-vans-trucks" },
  { label: "Off-Road", href: "/offroad" },
  { label: "Truck Beds", href: "/truck-beds-service-bodies" },
  { label: "Locations", href: "/locations" },
  { label: "About", href: "/about" },
] as const;
