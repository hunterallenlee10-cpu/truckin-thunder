import Image from "next/image";
import { photos } from "@/data/images";
import { timeline } from "@/data/timeline";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { BrandWall } from "@/components/home/BrandWall";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata = pageMeta({
  title: "Our Story: A Virginia Family Business Since 1978",
  description:
    "Founded by Tom and Judy Brooks on Midlothian Turnpike in 1978, Truckin Thunder is led today by the next generation of the Brooks family. Four locations. SEMA and NTEA members.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      {/* Typographic hero */}
      <section className="relative overflow-hidden bg-asphalt pb-16 pt-36 lg:pb-24 lg:pt-44">
        <div aria-hidden className="blueprint absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative">
          <Breadcrumbs items={[{ name: "About", path: "/about" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-fog">Our story</p>
              <h1 className="display h-xl mt-5">
                A Virginia family business since <span className="text-thunder-bright">1978.</span>
              </h1>
            </div>
            <p className="lede text-chalk/80 lg:col-span-5 lg:pb-3">
              Truckin Thunder started with a franchise on Midlothian Turnpike and a lot of customers asking for more.
              Four locations later, the Brooks family still runs it.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline" className="section-pad bg-asphalt">
        <div className="container-site">
          <h2 id="timeline" className="sr-only">
            Timeline
          </h2>
          <ol className="relative">
            {timeline.map((m, i) => (
              <li key={m.title} className="grid gap-4 border-t border-hairline py-10 lg:grid-cols-12 lg:gap-8 lg:py-16">
                <div className="lg:col-span-5">
                  <p className="display text-[clamp(4rem,10vw,9rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_var(--color-chalk)] lg:sticky lg:top-32">
                    {m.year}
                  </p>
                </div>
                <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-4">
                  <span className="spec-tag text-thunder-bright">TT-{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display h-md mt-5">{m.title}</h3>
                  <p className="mt-4 text-[18px] leading-relaxed text-chalk/85">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next generation */}
      <section aria-labelledby="family" className="relative overflow-hidden bg-steel">
        <div className="grid lg:grid-cols-12">
          <div className="relative min-h-[360px] lg:col-span-6 lg:min-h-[640px]">
            <Image src={photos.locMidlothian.src} alt={photos.locMidlothian.alt} fill placeholder="blur" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: "50% 50%" }} />
          </div>
          <div className="flex items-center lg:col-span-6">
            <div className="px-[var(--gutter)] py-16 lg:px-16">
              <Reveal>
                <p className="eyebrow text-fog">The next generation</p>
              </Reveal>
              <Reveal i={1}>
                <h2 id="family" className="display h-md mt-5">
                  Still the Brooks family.
                </h2>
              </Reveal>
              <Reveal i={2}>
                <p className="mt-5 text-[18px] leading-relaxed text-chalk/85">
                  Today Truckin Thunder is led by the next generation of the Brooks family, with four locations serving
                  individuals, contractors and fleet operators across Virginia.
                </p>
              </Reveal>
              {/* Associations as text marks (no fetched logos) */}
              <Reveal i={3} className="mt-10 grid grid-cols-2 gap-3">
                {[
                  ["SEMA", "Specialty Equipment Market Association"],
                  ["NTEA", "National Truck Equipment Association"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[4px] border border-hairline bg-asphalt p-5">
                    <p className="display text-[2.75rem] leading-none">{k}</p>
                    <p className="mt-3 text-[13px] leading-snug text-fog">{v}</p>
                    <p className="eyebrow mt-4 !text-[10px] text-thunder-bright">Active member</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <BrandWall index="02" />
      <FinalCta />
    </>
  );
}
