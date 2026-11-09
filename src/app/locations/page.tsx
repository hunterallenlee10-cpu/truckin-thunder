import { pageMeta } from "@/lib/seo";
import { HOURS } from "@/data/locations";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { LocationsSection } from "@/components/location/LocationsSection";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Locations: Midlothian, Broad Street, Fredericksburg and Ashland",
  description:
    "Four Virginia locations, each with a dedicated installation team. Midlothian, West Broad Street in Richmond, Fredericksburg and Ashland Hitch. Monday to Friday, 8 AM to 5 PM.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-asphalt pb-4 pt-36 lg:pt-44">
        <div aria-hidden className="blueprint absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative">
          <Breadcrumbs items={[{ name: "Locations", path: "/locations" }]} />
          <h1 className="display h-xl mt-8 max-w-[12ch]">Four Virginia shops.</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="lede text-chalk/85">
              {HOURS.days}, {HOURS.open} to {HOURS.close}. A dedicated install team at every one.
            </p>
            <StatusBadge />
          </div>
        </div>
      </section>
      <LocationsSection index="01" />
      <FinalCta />
    </>
  );
}
