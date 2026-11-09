import Image from "next/image";
import { photos } from "@/data/images";
import { faqs } from "@/data/faqs";
import { reviewsFor } from "@/data/reviews";
import { offroadGroups } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/service/PageHero";
import { BrandRow, FaqSection, HowItWorks, ServiceReviews } from "@/components/service/ServiceSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Off-Road Accessories, Lifts and Overland Builds",
  description:
    "Lift and leveling kits, all-terrain and mud-terrain tires, bumpers, armor, LED lighting, winches, racks and overland-ready builds, installed in Virginia since 1978.",
  path: "/offroad",
});

export default function OffroadPage() {
  return (
    <>
      <PageHero
        photo={photos.heroRaptor}
        index="03"
        eyebrow="Off-Road"
        title={
          <>
            Built for the <span className="text-signal">trail.</span>
          </>
        }
        sub="Professional-grade off-road upgrades designed to perform in the real world, not just look good in a parking lot."
        preset="offroad"
        crumbs={[{ name: "Off-Road", path: "/offroad" }]}
        tag="TT-TRAIL / 03"
      />

      {/* Grouped spec grid */}
      <section aria-labelledby="spec" className="section-pad bg-asphalt">
        <div className="container-site">
          <SectionHeader
            id="spec"
            index="01"
            eyebrow="What we install"
            numeral="01"
            title="The full spec sheet."
            lede="Everything from stance to recovery, grouped the way you'd plan a build."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-[4px] border border-hairline bg-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {offroadGroups.map((g, i) => (
              <Reveal key={g.code} i={i % 4} className="flex flex-col bg-asphalt p-6 lg:p-7">
                <div className="flex items-center justify-between">
                  <span className="spec-tag text-thunder-bright">{g.code}</span>
                  <span className="eyebrow !text-[11px] text-fog">{g.items.length} items</span>
                </div>
                <h3 className="display mt-8 text-[1.9rem]">{g.name}</h3>
                <ul className="mt-4 space-y-2 border-t border-hairline pt-4">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[15px] text-chalk/85">
                      <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-thunder-bright" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
            <div className="flex flex-col justify-between bg-steel p-6 lg:p-7">
              <span className="spec-tag self-start text-fog">OR-08</span>
              <div className="mt-8">
                <p className="display text-[1.9rem]">Not sure where to start?</p>
                <p className="mt-2 text-[15px] text-fog">Tell us the truck and the trail. We&apos;ll spec the build.</p>
                <StartBuildButton preset="offroad" size="sm" className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured build: the blue F-150 */}
      <section aria-labelledby="feature" className="relative overflow-hidden bg-steel">
        <div className="grid lg:grid-cols-12">
          <div className="relative min-h-[380px] lg:col-span-8 lg:min-h-[720px]">
            <Image
              src={photos.heroBlueF150.src}
              alt={photos.heroBlueF150.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 67vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "45% 55%" }}
            />
          </div>
          <div className="flex items-center lg:col-span-4">
            <div className="px-[var(--gutter)] py-14 lg:px-12">
              <Reveal>
                <p className="eyebrow flex items-center gap-3 text-fog">
                  <span className="text-thunder-bright">02</span>
                  <span aria-hidden className="h-px w-8 bg-current opacity-40" />
                  Featured stance
                </p>
              </Reveal>
              <Reveal i={1}>
                <h2 id="feature" className="display h-md mt-5">
                  Lifted, wheeled and ready to work all week.
                </h2>
              </Reveal>
              <Reveal i={2}>
                <p className="mt-5 text-[17px] text-chalk/85">
                  A lifted F-150 FX4 on black off-road wheels and mud-terrain tires. The same crews who upfit fleets
                  dial in your stance, so it drives right on Monday and climbs on Saturday.
                </p>
              </Reveal>
              <Reveal i={3}>
                <dl className="mt-8 grid grid-cols-2 border-t border-hairline">
                  {[
                    ["Stance", "Lift kit"],
                    ["Wheels", "Black off-road"],
                    ["Tires", "Mud-terrain"],
                    ["Base", "Ford F-150 FX4"],
                  ].map(([k, v]) => (
                    <div key={k} className="border-b border-hairline py-4 pr-3">
                      <dt className="eyebrow !text-[10px] text-fog">{k}</dt>
                      <dd className="mt-1 font-label text-[16px] font-semibold uppercase tracking-[0.04em]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
              <Reveal i={4} className="mt-8">
                <StartBuildButton preset="offroad" label="Build my stance" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BrandRow use="offroad" index="03" />
      <HowItWorks index="04" />
      <ServiceReviews reviews={reviewsFor("offroad", 1)} index="05" />
      <FaqSection faqs={faqs.offroad} index="06" />
      <FinalCta
        preset="offroad"
        title={
          <>
            Ready to build your <span className="text-signal">rig</span>?
          </>
        }
        sub="Tell us what you drive and where you take it. We'll spec the rest."
      />
    </>
  );
}
