"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { photos } from "@/data/images";
import { telHref } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";

const POINTS = [
  { k: "4", v: "Locations, each with a dedicated installation team" },
  { k: "All", v: "We install every product we sell" },
  { k: "Yours", v: "Bought it online or from another vendor? We typically install it" },
];

export function InstallPromise() {
  const { shop } = useShop();
  return (
    <section aria-labelledby="install-title" className="relative bg-steel">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[420px] lg:col-span-7 lg:min-h-[780px]">
          <Image
            src={photos.techInstall.src}
            alt={photos.techInstall.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
            style={{ objectPosition: photos.techInstall.position }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-asphalt/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-steel/40" />
          <p className="eyebrow absolute bottom-5 left-[var(--gutter)] !text-[11px] text-chalk/90">
            <span className="spec-tag mr-2 text-chalk/80">TT-INSTALL</span> In the shop, on the creeper
          </p>
        </div>

        <div className="flex items-center lg:col-span-5">
          <div className="px-[var(--gutter)] py-16 lg:px-14 lg:py-24 xl:px-20">
            <Reveal>
              <Eyebrow index="04" className="text-fog">
                Professional installation
              </Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 id="install-title" className="display mt-5 text-[clamp(2.6rem,4.6vw,4.75rem)]">
                Bought your parts online? Bring them in.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-6 max-w-[46ch] text-[17px] text-chalk/85 lg:text-[18px]">
                We provide installation for everything we sell, and each of our four locations has its own dedicated
                installation team. Even if you purchased your parts from another vendor or online, we typically
                install them too.
              </p>
            </Reveal>
            <dl className="mt-10 border-t border-hairline">
              {POINTS.map((p, i) => (
                <Reveal key={p.k} i={i + 2} className="grid grid-cols-[92px_1fr] items-baseline gap-4 border-b border-hairline py-5">
                  <dt className="display text-[2.25rem] leading-none text-thunder-bright">{p.k}</dt>
                  <dd className="text-[16px] text-chalk/85">{p.v}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal i={5} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <StartBuildButton />
              <a href={telHref(shop.phone)} className="btn btn-ghost">
                <Phone size={16} strokeWidth={1.5} aria-hidden /> Call {shop.name}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
