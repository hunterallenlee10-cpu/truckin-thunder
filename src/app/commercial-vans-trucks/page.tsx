import Image from "next/image";
import { photos } from "@/data/images";
import { faqs } from "@/data/faqs";
import { reviewsFor } from "@/data/reviews";
import { commercialCategories } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/service/PageHero";
import { BrandRow, FaqSection, HowItWorks, PhotoStory, ServiceReviews, WhatWeInstall } from "@/components/service/ServiceSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Commercial Van and Truck Upfitting",
  description:
    "Van shelving, partitions, ladder racks, truck caps from A.R.E. and Adrian Steel, liftgates, toolboxes and drawer systems. Installed at four Virginia locations.",
  path: "/commercial-vans-trucks",
});

const PRODUCTS = [
  {
    photo: photos.vanStudioA,
    code: "TT-VAN / A",
    title: "Rear access, organized",
    items: ["Shelving with end panels", "Drawer unit", "Cylinder rack"],
  },
  {
    photo: photos.vanStudioB,
    code: "TT-VAN / B",
    title: "Built for the trade",
    items: ["Shelving with bins", "Wire spool holders", "Hard hat hook"],
  },
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        photo={photos.vanSprinter}
        index="02"
        eyebrow="Commercial Vans & Trucks"
        title="Turn your van into a rolling shop."
        sub="Shelving, partitions, ladder racks, truck caps, liftgates, toolboxes and drawer systems. Let our highly trained sales team find the best solutions for your needs."
        preset="van"
        crumbs={[{ name: "Commercial Vans & Trucks", path: "/commercial-vans-trucks" }]}
        tag="TT-VAN / 02"
      />

      <WhatWeInstall
        title="Everything a work truck needs."
        lede="Truck caps from A.R.E. and Adrian Steel, and the storage, racks and lifts that make every job faster."
        items={commercialCategories}
        prefix="COM"
      />

      {/* Studio product cards on white so the photo backgrounds disappear */}
      <section aria-labelledby="packages" className="on-light section-pad bg-white text-ink">
        <div className="container-site">
          <SectionHeader
            id="packages"
            index="02"
            eyebrow="Van packages"
            numeral="02"
            tone="light"
            title="Two vans. Two trades. Same crew."
            lede="Every van is laid out around the work. These two Transits show how different that can look."
          />
          <ul className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2">
            {PRODUCTS.map((p, i) => (
              <Reveal as="li" i={i} key={p.code} className="flex flex-col rounded-[4px] border border-ink/10 bg-white">
                <div className="relative aspect-[6/5]">
                  <Image src={p.photo.src} alt={p.photo.alt} fill placeholder="blur" sizes="(min-width: 1024px) 600px, 100vw" className="object-contain p-4 mix-blend-multiply" />
                </div>
                <div className="border-t border-ink/10 p-6 lg:p-8">
                  <span className="spec-tag text-ink-muted">{p.code}</span>
                  <h3 className="display mt-4 text-[2.25rem]">{p.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {p.items.map((it) => (
                      <li key={it} className="eyebrow flex items-center gap-2 !text-[12px] text-ink-muted">
                        <span aria-hidden className="size-1 bg-thunder" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10">
            <StartBuildButton preset="van" label="Plan my van" variant="ink" />
          </Reveal>
        </div>
      </section>

      <PhotoStory
        index="03"
        eyebrow="Real upfits"
        title="Shelving where you reach for it."
        lede="Inside two real upfits: a Transit with a full shelving run and safety step, and a Chevy Express set up for HVAC work. Plus a Silverado with a commercial cap and ladder rack."
        photos={[
          { photo: photos.vanTransitInterior, caption: "Ford Transit · shelving run and yellow safety step" },
          { photo: photos.vanExpressInterior, caption: "Chevrolet Express · HVAC upfit" },
          { photo: photos.capSilverado, caption: "Silverado · work cap and ladder rack" },
        ]}
      />
      <BrandRow use="commercial" index="04" />
      <HowItWorks index="05" />
      <ServiceReviews reviews={reviewsFor("commercial", 2)} index="06" />
      <FaqSection faqs={faqs.commercial} index="07" />
      <FinalCta preset="van" />
    </>
  );
}
