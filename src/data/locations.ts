import { photos, type Photo } from "./images";

export type LocationSlug = "midlothian" | "broad-street" | "fredericksburg" | "ashland";

export type Location = {
  slug: LocationSlug;
  /** Short name used in buttons: "Call Midlothian". */
  name: string;
  /** Trading name shown on the card. Ashland trades as Ashland Hitch. */
  tradingName: string;
  street: string;
  city: string;
  state: "VA";
  zip: string;
  phone: string;
  email: string;
  /** Approximate coordinates. Verify before launch. */
  geo: { lat: number; lng: number };
  photo: Photo;
  /** General geography only. Nothing invented. */
  servingLine: string;
  /** Page H1. */
  h1: string;
  note?: string;
};

export const HOURS = {
  days: "Monday to Friday",
  daysShort: "Mon to Fri",
  open: "8:00 AM",
  close: "5:00 PM",
  short: "8 to 5",
} as const;

export const locations: Location[] = [
  {
    slug: "midlothian",
    name: "Midlothian",
    tradingName: "Truckin Thunder Midlothian",
    street: "8241 Midlothian Tpke",
    city: "Richmond",
    state: "VA",
    zip: "23235",
    phone: "(804) 272-4321",
    email: "midlo@truckinthunder.com",
    geo: { lat: 37.505, lng: -77.56 },
    photo: photos.locMidlothian,
    servingLine: "Serving Midlothian, Chesterfield County and Richmond's south side.",
    h1: "Truck Accessories and Upfitting in Midlothian, VA",
    note: "Where it started in 1978.",
  },
  {
    slug: "broad-street",
    name: "Broad Street",
    tradingName: "Truckin Thunder Broad Street",
    street: "7903 W Broad St",
    city: "Richmond",
    state: "VA",
    zip: "23294",
    phone: "(804) 747-4321",
    email: "broadstreet@truckinthunder.com",
    geo: { lat: 37.63, lng: -77.548 },
    photo: photos.locBroad,
    servingLine: "Serving Richmond's West End and Henrico County.",
    h1: "Truck Accessories and Upfitting on West Broad Street, Richmond, VA",
  },
  {
    slug: "fredericksburg",
    name: "Fredericksburg",
    tradingName: "Truckin Thunder Fredericksburg",
    street: "6 Commerce Pkwy",
    city: "Fredericksburg",
    state: "VA",
    zip: "22406",
    phone: "(540) 371-5600",
    email: "fred@truckinthunder.com",
    geo: { lat: 38.33, lng: -77.48 },
    photo: photos.locFred,
    servingLine: "Serving Fredericksburg, Stafford and Spotsylvania along the I-95 corridor.",
    h1: "Truck Accessories and Upfitting in Fredericksburg, VA",
    note: "10,000 square foot warehouse and installation facility.",
  },
  {
    slug: "ashland",
    name: "Ashland",
    tradingName: "Ashland Hitch",
    street: "12289 Washington Highway",
    city: "Ashland",
    state: "VA",
    zip: "23005",
    phone: "(804) 798-3071",
    email: "sales@ashlandhitch.com",
    geo: { lat: 37.72, lng: -77.45 },
    photo: photos.locAshland,
    servingLine: "Serving Ashland and Hanover County, just north of Richmond.",
    h1: "Truck Accessories, Hitches and Upfitting in Ashland, VA",
    note: "Ashland Hitch, a Truckin Thunder company since 2004.",
  },
];

export const DEFAULT_LOCATION: LocationSlug = "midlothian";

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);

export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`;

export const fullAddress = (l: Location) => `${l.street}, ${l.city}, ${l.state} ${l.zip}`;

export const directionsHref = (l: Location) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${l.tradingName}, ${fullAddress(l)}`)}`;

export const mapEmbedSrc = (l: Location) =>
  `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(l))}&output=embed`;
