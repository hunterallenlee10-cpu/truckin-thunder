import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

// Asymmetric editorial grid: big / small, small / big.
const LAYOUT = [
  "lg:col-span-7 lg:row-span-1 lg:h-[560px]",
  "lg:col-span-5 lg:h-[560px]",
  "lg:col-span-5 lg:h-[500px]",
  "lg:col-span-7 lg:h-[500px]",
];

export function ServicesBento() {
  return (
    <section aria-labelledby="paths-title" className="section-pad relative bg-asphalt">
      <div className="container-site">
        <SectionHeader
          id="paths-title"
          index="01"
          eyebrow="Choose your path"
          numeral="01"
          title="One crew. Four specialties."
          lede="Whether you run fifty service trucks or one weekend rig, start where your build starts."
        />

        <ul className="mt-14 grid grid-cols-1 gap-4 lg:mt-20 lg:grid-cols-12">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} i={i} className={LAYOUT[i]}>
              <Link
                href={s.href}
                className="group relative flex h-[440px] flex-col justify-between overflow-hidden rounded-[4px] border border-hairline bg-steel p-6 transition-colors duration-300 hover:border-signal focus-visible:border-signal lg:h-full lg:p-8"
              >
                <Image
                  src={s.photo.src}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease)] group-hover:scale-[1.04]"
                  style={{ objectPosition: s.photo.position }}
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/55 to-asphalt/10" />

                <div className="relative flex items-start justify-between">
                  <span className="display text-[3.5rem] leading-none text-chalk/90">{s.index}</span>
                  <span className="grid size-12 place-items-center rounded-[4px] border border-chalk/30 bg-asphalt/40 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                    <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden />
                  </span>
                </div>

                <div className="relative">
                  <h3 className="display h-md">{s.name}</h3>
                  <p className="mt-3 max-w-[44ch] text-[16px] text-chalk/85">{s.line}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-chalk/15 pt-4">
                    {s.bullets.map((b) => (
                      <li key={b} className="eyebrow flex items-center gap-2 !text-[11px] text-chalk/80">
                        <span aria-hidden className="size-1 bg-thunder-bright" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
