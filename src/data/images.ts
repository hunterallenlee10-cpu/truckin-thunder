/**
 * Every photo on the site is a real Truckin Thunder asset from Drive.
 * Static imports give next/image the intrinsic size and a blur placeholder.
 * `maxWidth` is the native width: never render an image larger than it.
 */
import type { StaticImageData } from "next/image";

import logoDark from "../../public/images/brand/tt-logo-dark-clean.png";
import logoLight from "../../public/images/brand/tt-logo-light-clean.png";

import heroFleetLot from "../../public/images/hero/hero-fleet-lot-capped-colorados-two-men-walking.jpg";
import heroBlueF150 from "../../public/images/hero/hero-lifted-blue-f150-on-black-wheels.jpg";
import heroRaptor from "../../public/images/hero/hero-offroad-raptor-dust-climb.jpg";
import superDutyLineup from "../../public/images/hero/fleet-ford-superduty-lineup-LOWRES.jpg";

import vanSprinter from "../../public/images/vans/van-sprinter-ladder-rack-shelving-lifestyle.jpg";
import vanStudioA from "../../public/images/vans/van-transit-rear-shelving-studio-white-A.jpg";
import vanStudioB from "../../public/images/vans/van-transit-rear-shelving-studio-white-B.jpg";
import vanExpressInterior from "../../public/images/vans/van-interior-express-hvac-shelving-yellow-step.jpg";
import vanTransitInterior from "../../public/images/vans/van-interior-transit-shelving-snow-yellow-step.jpg";

import capSilverado from "../../public/images/beds/truck-cap-silverado-ladder-rack-showroom.jpg";
import serviceBody from "../../public/images/beds/service-body-ford-superduty-white.jpg";
import flatbedCM from "../../public/images/beds/flatbed-cm-rd-black-rear-lights.jpg";

import locMidlothian from "../../public/images/locations/location-midlothian-8241-midlothian-tpke.jpg";
import locBroad from "../../public/images/locations/location-broad-street-7903-w-broad-st.jpg";
import locFred from "../../public/images/locations/location-fredericksburg-6-commerce-pkwy.jpg";
import locAshland from "../../public/images/locations/location-ashland-hitch-12289-washington-hwy.jpg";

import techInstall from "../../public/images/team/tech-installing-under-service-truck.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** CSS object-position that keeps the subject in frame. */
  position?: string;
  /** Native pixel width. Layouts must not exceed this. */
  maxWidth: number;
};

export const logos = { dark: logoDark, light: logoLight };

export const photos = {
  heroFleetLot: {
    src: heroFleetLot,
    alt: "Two Truckin Thunder team members walking through a lot of white Chevrolet Colorado fleet pickups fitted with matching work caps",
    position: "62% 18%",
    maxWidth: 2400,
  },
  heroBlueF150: {
    src: heroBlueF150,
    alt: "Lifted bright blue Ford F-150 FX4 on black off-road wheels and mud-terrain tires in front of a cornfield",
    position: "42% 55%",
    maxWidth: 1800,
  },
  heroRaptor: {
    src: heroRaptor,
    alt: "Dark gray Ford Ranger Raptor climbing a dusty gravel hill with dust trailing behind",
    position: "35% 45%",
    maxWidth: 2400,
  },
  superDutyLineup: {
    src: superDutyLineup,
    alt: "Row of white Ford Super Duty fleet trucks parked in front of a gray warehouse",
    position: "40% 60%",
    maxWidth: 640,
  },
  vanSprinter: {
    src: vanSprinter,
    alt: "Gray Mercedes Sprinter van with an orange ladder on its roof rack and side door open to reveal shelving and drawers",
    position: "62% 50%",
    maxWidth: 1920,
  },
  vanStudioA: {
    src: vanStudioA,
    alt: "White Ford Transit with rear doors open showing shelving, a drawer unit and a gas cylinder rack",
    maxWidth: 2400,
  },
  vanStudioB: {
    src: vanStudioB,
    alt: "White Ford Transit with rear doors open showing shelving, wire spool holders and a hard hat hook",
    maxWidth: 2400,
  },
  vanExpressInterior: {
    src: vanExpressInterior,
    alt: "Inside a Chevrolet Express work van: gray shelving with bins, refrigerant cylinder racks, a bulkhead partition and a yellow rear safety step",
    maxWidth: 2400,
  },
  vanTransitInterior: {
    src: vanTransitInterior,
    alt: "Ford Transit with rear doors open in the snow showing a long run of shelving, yellow grab handles and a yellow safety step",
    position: "55% 50%",
    maxWidth: 2400,
  },
  capSilverado: {
    src: capSilverado,
    alt: "White Chevrolet Silverado with a commercial truck cap and ladder rack in a bright showroom",
    position: "45% 50%",
    maxWidth: 2400,
  },
  serviceBody: {
    src: serviceBody,
    alt: "Ford Super Duty with a white CM service body with side compartments, parked outside a commercial building",
    position: "45% 55%",
    maxWidth: 1280,
  },
  flatbedCM: {
    src: flatbedCM,
    alt: "Close, low angle of a black CM flatbed truck bed showing its oval LED tail lights and CM Truck Beds logo",
    position: "50% 50%",
    maxWidth: 1600,
  },
  techInstall: {
    src: techInstall,
    alt: "Truckin Thunder technician lying on a creeper, installing equipment under the rear of a service body truck",
    position: "40% 45%",
    maxWidth: 2400,
  },
  locMidlothian: {
    src: locMidlothian,
    alt: "Truckin Thunder Midlothian store with a blue metal facade and round Truckin Thunder sign on a sunny day",
    position: "50% 50%",
    maxWidth: 2048,
  },
  locBroad: {
    src: locBroad,
    alt: "Truckin Thunder Broad Street store, a two-story building with a blue roof and a pylon sign reading 804 747 4321",
    position: "50% 45%",
    maxWidth: 859,
  },
  locFred: {
    src: locFred,
    alt: "Truckin Thunder Fredericksburg facility, a long low building with a large Truckin Thunder sign",
    position: "50% 28%",
    maxWidth: 923,
  },
  locAshland: {
    src: locAshland,
    alt: "Ashland Hitch building with a red Ashland Hitch sign above a white roll-up service door",
    position: "50% 45%",
    maxWidth: 2400,
  },
} satisfies Record<string, Photo>;
