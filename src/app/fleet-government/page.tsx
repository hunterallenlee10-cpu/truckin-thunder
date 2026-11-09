import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos } from "@/data/images";
import { faqs } from "@/data/faqs";
import { reviewsFor } from "@/data/reviews";
import { fleetPackages, fleetSectors, fleetWhy } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/service/PageHero";
import { BrandRow, FaqSection, HowItWorks, PhotoStory, ServiceReviews, WhatWeInstall } from "@/components/service/ServiceSections";
import { FleetChecklist } from "@/components/service/FleetChecklist";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Fleet and Government Upfitting in Virginia",
  description:
    "Standardized fleet upfitting for utilities, municipalities, contractors and government agencies across Virginia and the Mid-Atlantic. Service bodies, safety lighting, power and protection.",
  path: "/fleet-government",
});

export default function FleetPage() {
  return (
    <>
      <PageHero
        photo={photos.heroFleetLot}
        index="01"
        eyebrow="Fleet & Government"
        title="Fleet upfitting that keeps Virginia working."
        sub="Utilities, municipalities, contractors and government agencies trust our crews to upfit whole fleets the same way, every time."
        preset="fleet"
        crumbs={[{ name: "Fleet & Government", path: "/fleet-government" }]}
        tag="TT-FLEET / 01"
        secondary={
          <a href="#checklist" className="link-arrow text-chalk hover:text-signal">
            Fleet manager checklist <ArrowRight size={16} aria-hidden />
          </a>
        }
      />

      {/* Sectors */}
      <section aria-label="Sectors we serve" className="border-b border-hairline bg-asphalt">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {fleetSectors.map((s, i) => (
            <li key={s.code} className={`py-8 ${i % 2 ? "border-l border-hairline pl-5" : "pr-4"} ${i > 1 ? "border-t border-hairline lg:border-t-0" : ""} lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0`}>
              <span className="spec-tag text-thunder-bright">{s.code}</span>
              <p lang="en" className="display mt-4 text-[1.35rem] hyphens-auto sm:text-[1.75rem]">{s.name}</p>
            </li>
          ))}
        </ul>
      </section>

      <WhatWeInstall
        title="Fleet packages, built to spec."
        lede="Four packages that cover what most fleets need. Every one installed by our own crews."
        items={fleetPackages.map((p) => ({ name: p.name, body: p.body }))}
        prefix="PKG"
      />

      {/* Why + checklist */}
      <section id="checklist" aria-labelledby="why" className="section-pad scroll-mt-24 bg-steel">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader id="why" index="02" eyebrow="Why fleet managers choose us" numeral="02" title="One point of contact. Every truck the same." />
            <ol className="mt-12">
              {fleetWhy.map((w, i) => (
                <Reveal as="li" i={i} key={w.title} className="grid grid-cols-[56px_1fr] gap-4 border-t border-hairline py-6">
                  <span className="display text-[2rem] leading-none text-thunder-bright">0{i + 1}</span>
                  <div>
                    <h3 className="font-label text-[19px] font-semibold uppercase tracking-[0.04em]">{w.title}</h3>
                    <p className="mt-2 text-[16px] text-fog">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5 lg:pt-24">
            <Reveal>
              <FleetChecklist />
              <p className="mt-4 text-[14px] text-fog">
                Have these ready and your fleet quote moves faster.{" "}
                <Link href="/contact" className="text-chalk underline underline-offset-4 hover:text-signal">
                  Or just call us.
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <PhotoStory
        index="03"
        title="Matching trucks, matching upfits."
        lede="From capped pickups to service bodies, we build each vehicle in the fleet to the same standard."
        photos={[
          { photo: photos.heroFleetLot, caption: "Capped Colorado fleet pickups" },
          { photo: photos.serviceBody, caption: "Super Duty with a CM service body" },
          { photo: photos.superDutyLineup, caption: "Super Duty fleet lineup" },
        ]}
      />
      <BrandRow use="fleet" index="04" />
      <HowItWorks index="05" />
      <ServiceReviews reviews={reviewsFor("fleet", 1)} index="06" />
      <FaqSection faqs={faqs.fleet} index="07" />
      <FinalCta
        preset="fleet"
        title={
          <>
            Ready to quote your <span className="text-signal">fleet</span>?
          </>
        }
        sub="Tell us the vehicles and the work. We'll spec a standard package and price it."
      />
    </>
  );
}
