import Image from "next/image";
import { brands, type Brand } from "@/data/brands";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/** Uniform white 2:1 tiles so mixed logo files read as one wall. */
export function BrandTile({ brand }: { brand: Brand }) {
  return (
    <div className="group relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-[4px] bg-white">
      <div className={`relative h-full w-full ${brand.wide ? "p-[9%_11%]" : brand.solid ? "p-[12%_18%]" : "p-[13%_20%]"}`}>
        <div className="relative h-full w-full">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="(min-width: 1024px) 220px, 45vw"
            className="object-contain grayscale transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:grayscale-0 opacity-80"
          />
        </div>
      </div>
      {brand.known && (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink px-3 py-1.5 text-center eyebrow !text-[10px] text-chalk transition-transform duration-300 group-hover:translate-y-0">
          {brand.known}
        </span>
      )}
    </div>
  );
}

export function BrandWall({ index = "06" }: { index?: string }) {
  return (
    <section aria-labelledby="brands-title" className="section-pad relative bg-asphalt">
      <div className="container-site">
        <SectionHeader
          id="brands-title"
          index={index}
          eyebrow="Brands we install"
          numeral={index}
          title="Certified installers. Proven brands."
          lede="The names fleets and builders already trust, installed by the crews who know them."
        />
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {brands.map((b, i) => (
            <Reveal as="li" i={i % 4} key={b.name}>
              <BrandTile brand={b} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
