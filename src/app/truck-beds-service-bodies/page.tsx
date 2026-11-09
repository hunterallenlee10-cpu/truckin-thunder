import Image from "next/image";
import { photos } from "@/data/images";
import { faqs } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { bedsCategories } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/service/PageHero";
import { BrandRow, FaqSection, HowItWorks, PhotoStory, ServiceReviews, WhatWeInstall } from "@/components/service/ServiceSections";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Truck Beds, Flatbeds and Service Bodies",
  description:
    "CM Truck Beds flatbeds and component-style service bodies, plus hitches, trailer wiring, bumpers and nerf bars. Installed at four Virginia locations.",
  path: "/truck-beds-service-bodies",
});

export default function BedsPage() {
  return (
    <>
      <PageHero
        photo={photos.flatbedCM}
        index="04"
        eyebrow="Truck Beds & Service Bodies"
        title="Beds and bodies built for the work."
        sub="Whatever your work needs, we install flatbeds and service bodies from CM Truck Beds, right in our own shop."
        preset="chassis"
        crumbs={[{ name: "Truck Beds & Service Bodies", path: "/truck-beds-service-bodies" }]}
        tag="TT-BED / 04"
      />

      {/* Set the standard: CM feature */}
      <section aria-labelledby="cm" className="on-light relative overflow-hidden bg-concrete text-ink">
        <div className="container-site section-pad grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-ink-muted">
                <span className="text-ink">01</span>
                <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                CM Truck Beds
              </p>
            </Reveal>
            <Reveal i={1}>
              <h2 id="cm" className="display h-lg mt-5">
                Set the standard.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-6 text-[18px] leading-relaxed text-ink-muted">
                CM builds an industry-leading component-style service body with a modular design, so the body
                fits the way your crew works.
              </p>
            </Reveal>
            <Reveal i={3}>
              <ul className="mt-8 border-t border-ink/15">
                {["Component-style construction", "Modular design", "Flatbeds and service bodies"].map((t, i) => (
                  <li key={t} className="flex items-center gap-4 border-b border-ink/15 py-4">
                    <span className="display w-8 text-[1.5rem] text-thunder">0{i + 1}</span>
                    <span className="font-label text-[17px] font-semibold uppercase tracking-[0.04em]">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal i={4} className="mt-8">
              <StartBuildButton preset="chassis" label="Spec my body" variant="ink" />
            </Reveal>
          </div>
          <Reveal i={1} className="lg:col-span-7">
            {/* Service body photo is 1280px: keep it at medium size */}
            <figure className="ticks ml-auto max-w-[760px] [--tick:#9aa0a6]">
              <div className="relative aspect-[1280/884] overflow-hidden rounded-[4px]">
                <Image src={photos.serviceBody.src} alt={photos.serviceBody.alt} fill placeholder="blur" sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
              </div>
              <figcaption className="eyebrow mt-3 !text-[11px] text-ink-muted">Ford Super Duty · CM service body</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <WhatWeInstall index="02" title="Beds, bodies and everything behind the cab." items={bedsCategories} prefix="BED" />
      <PhotoStory
        index="03"
        title="Built in our shop."
        lede="Black CM flatbeds, white service bodies and the hitch and wiring work behind them, done by our own install teams."
        photos={[
          { photo: photos.flatbedCM, caption: "CM flatbed · LED tail lights" },
          { photo: photos.techInstall, caption: "Install team at work under a service truck" },
          { photo: photos.serviceBody, caption: "CM service body on a Super Duty" },
        ]}
      />
      <BrandRow use="beds" index="04" />
      <HowItWorks index="05" />
      <ServiceReviews reviews={[reviews.find((r) => r.id === "barrow")!, reviews.find((r) => r.id === "yopp")!]} index="06" />
      <FaqSection faqs={faqs.beds} index="07" />
      <FinalCta preset="chassis" />
    </>
  );
}
