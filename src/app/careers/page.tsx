import Image from "next/image";
import { Wrench } from "lucide-react";
import { photos } from "@/data/images";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata = pageMeta({
  title: "Careers: Now Hiring Upfit Technicians",
  description:
    "Build something real. Get paid for it. Truckin Thunder is hiring technicians to upfit work trucks with liftgates, service bodies, lighting and electrical systems. Hourly pay plus performance bonus.",
  path: "/careers",
});

const WORK = [
  { code: "JOB-01", name: "Liftgates", body: "Install liftgates on work trucks and vans." },
  { code: "JOB-02", name: "Service bodies", body: "Mount and finish service and utility bodies." },
  { code: "JOB-03", name: "Lighting", body: "Wire strobes, beacons and work lighting." },
  { code: "JOB-04", name: "Electrical systems", body: "Inverters, wiring and vehicle-mounted equipment." },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-asphalt">
        <div className="grid lg:min-h-[92svh] lg:grid-cols-12">
          <div className="relative min-h-[52svh] lg:order-2 lg:col-span-6 lg:min-h-0">
            <Image src={photos.techInstall.src} alt={photos.techInstall.alt} fill priority placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: photos.techInstall.position }} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-asphalt via-transparent to-asphalt/60 lg:bg-gradient-to-r lg:from-asphalt lg:via-transparent lg:to-transparent" />
          </div>
          <div className="relative flex items-end lg:order-1 lg:col-span-6 lg:items-center">
            <div className="container-site pb-14 lg:max-w-none lg:pl-[max(var(--gutter),calc((100vw-1280px)/2))] lg:pr-12 lg:pt-36">
              <Breadcrumbs items={[{ name: "Careers", path: "/careers" }]} />
              <p className="mt-8">
                <span className="spec-tag text-thunder-bright">Now hiring · Technicians</span>
              </p>
              <h1 className="display h-xl mt-5">
                Build something <span className="text-signal">real.</span> Get paid for it.
              </h1>
              <p className="lede mt-6 text-chalk/85">
                Our techs upfit work trucks with liftgates, service bodies, lighting and electrical systems at four
                Virginia shops.
              </p>
              <a href="#apply" className="btn btn-signal mt-8">
                Apply now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pay + tool program */}
      <section aria-labelledby="pay" className="section-pad bg-steel">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader id="pay" index="01" eyebrow="Pay" numeral="01" title="Hourly pay plus a bonus that rewards good work." />
            <Reveal i={2}>
              <p className="mt-6 max-w-[52ch] text-[18px] leading-relaxed text-chalk/85">
                Competitive hourly pay, plus a performance bonus tied to efficiency and shop success. When the shop
                does well, you do too.
              </p>
            </Reveal>
          </div>
          <Reveal i={1} className="lg:col-span-5 lg:col-start-8">
            <article className="relative h-full overflow-hidden rounded-[4px] bg-white p-8 text-ink lg:p-10">
              <div aria-hidden className="hazard absolute inset-x-0 top-0 h-2" />
              <Wrench size={32} strokeWidth={1.5} aria-hidden className="mt-2" />
              <h3 className="display mt-6 text-[2.75rem] leading-[0.9]">No tools? No problem.</h3>
              <p className="mt-4 text-[18px] leading-relaxed text-ink-muted">
                We&apos;ll get you set up. If you stay a year, they&apos;re yours.
              </p>
              <p className="eyebrow mt-8 text-ink-muted">Tool program</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* What techs work on */}
      <section aria-labelledby="work" className="section-pad bg-asphalt">
        <div className="container-site">
          <SectionHeader id="work" index="02" eyebrow="The work" numeral="02" title="What you'll build." />
          <ul className="mt-12 grid border-l border-t border-hairline sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {WORK.map((w, i) => (
              <Reveal as="li" i={i} key={w.code} className="border-b border-r border-hairline p-6 lg:p-7">
                <span className="spec-tag text-fog">{w.code}</span>
                <h3 className="display mt-10 text-[1.9rem]">{w.name}</h3>
                <p className="mt-2 text-[15px] text-fog">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" aria-labelledby="apply-title" className="section-pad scroll-mt-20 border-t border-hairline bg-steel">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="apply-title" index="03" eyebrow="Apply" title="Start here." lede="Two minutes. The team at the shop you pick will follow up." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
