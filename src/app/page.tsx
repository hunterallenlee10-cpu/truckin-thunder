import { SplitHero } from "@/components/home/SplitHero";
import { ServicesBento } from "@/components/home/ServicesBento";
import { UpfitAnatomy } from "@/components/home/UpfitAnatomy";
import { FleetBand } from "@/components/home/FleetBand";
import { InstallPromise } from "@/components/home/InstallPromise";
import { Reviews } from "@/components/home/Reviews";
import { BrandWall } from "@/components/home/BrandWall";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { LocationsSection } from "@/components/location/LocationsSection";
import { FinalCta } from "@/components/home/FinalCta";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Truckin Thunder | Truck Accessories, Upfitting and Installation in Virginia",
  description:
    "Truck accessories, commercial and fleet upfitting, truck beds and off-road builds with expert installation. A Virginia family business since 1978 with four locations: Midlothian, Broad Street, Fredericksburg and Ashland.",
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <SplitHero />
      <ServicesBento />
      <UpfitAnatomy />
      <FleetBand />
      <InstallPromise />
      <Reviews />
      <BrandWall />
      <StoryTeaser />
      <LocationsSection />
      <FinalCta />
    </>
  );
}
