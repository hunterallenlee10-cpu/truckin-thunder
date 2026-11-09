import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos } from "@/data/images";
import { fleetPackages, fleetSectors, fleetWhy } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";

export function FleetBand() {
  return (
    <section aria-labelledby="fleet-title" className="section-pad relative overflow-hidden bg-asphalt">
      <div aria-hidden className="blueprint absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_75%)]" />
      <div className="container-site relative">
        <SectionHeader
          id="fleet-title"
          index="03"
          eyebrow="Fleet & government"
          numeral="03"
          title={
            <>
              Fleet upfitting that keeps <span className="text-thunder-bright">Virginia</span> working.
            </>
          }
          lede="Serving utilities, municipalities, contractors and government agencies across Virginia and the Mid-Atlantic."
          aside={
            <figure className="ticks hidden w-[360px] shrink-0 xl:block">
              <Image
                src={photos.superDutyLineup.src}
                alt={photos.superDutyLineup.alt}
                placeholder="blur"
                sizes="360px"
                className="h-auto w-full rounded-[4px]"
              />
              <figcaption className="eyebrow mt-3 !text-[11px] text-fog">Super Duty fleet lineup</figcaption>
            </figure>
          }
        />

        {/* Sectors */}
        <ul className="mt-14 grid grid-cols-2 border-l border-t border-hairline lg:mt-20 lg:grid-cols-4">
          {fleetSectors.map((s, i) => (
            <Reveal as="li" i={i} key={s.code} className="border-b border-r border-hairline bg-asphalt/60 p-4 sm:p-5 lg:p-7">
              <span className="spec-tag text-thunder-bright">{s.code}</span>
              <p lang="en" className="display mt-6 text-[1.35rem] hyphens-auto [overflow-wrap:anywhere] sm:text-[1.6rem] lg:text-[2rem]">{s.name}</p>
            </Reveal>
          ))}
        </ul>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* Why */}
          <div className="lg:col-span-6">
            <p className="eyebrow text-fog">Why fleet managers choose us</p>
            <ol className="mt-6">
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

          {/* Packages */}
          <div className="lg:col-span-6">
            <p className="eyebrow text-fog">Fleet packages</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {fleetPackages.map((p, i) => (
                <Reveal as="li" i={i} key={p.code} className="flex flex-col justify-between rounded-[4px] border border-hairline bg-steel p-6">
                  <span className="spec-tag self-start text-fog">{p.code}</span>
                  <div className="mt-10">
                    <h3 className="display text-[1.75rem]">{p.name}</h3>
                    <p className="mt-2 text-[15px] text-fog">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>

        <Reveal className="mt-14 flex flex-col gap-4 border-t border-hairline pt-10 sm:flex-row sm:items-center lg:mt-20">
          <StartBuildButton preset="fleet" label="Start a Fleet Quote" />
          <Link href="/fleet-government" className="link-arrow text-chalk hover:text-signal sm:ml-4">
            Fleet and government upfitting <ArrowRight size={16} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
