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
