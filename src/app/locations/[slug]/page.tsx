import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail, Navigation, Phone } from "lucide-react";
import {
  directionsHref,
  fullAddress,
  getLocation,
  HOURS,
  locations,
  mapEmbedSrc,
  telHref,
} from "@/data/locations";
import { services } from "@/data/services";
import { reviews } from "@/data/reviews";
import { pageMeta, storeSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { ServiceReviews } from "@/components/service/ServiceSections";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { MakeMyShop } from "@/components/location/MakeMyShop";
import { FinalCta } from "@/components/home/FinalCta";

type Params = { slug: string };

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return pageMeta({
    title: l.h1,
    description: `${l.tradingName} at ${fullAddress(l)}. Truck accessories, commercial and fleet upfitting, truck beds and off-road builds with a dedicated install team. Call ${l.phone}.`,
    path: `/locations/${l.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const l = getLocation((await params).slug);
  if (!l) notFound();
  const others = locations.filter((o) => o.slug !== l.slug);
  const display = l.slug === "ashland" ? "Ashland Hitch" : l.name;

  return (
    <>
      <JsonLd data={storeSchema(l)} />

      <section className="relative overflow-hidden bg-asphalt pb-16 pt-32 lg:pb-24 lg:pt-44">
        <div aria-hidden className="blueprint absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <Breadcrumbs
              items={[
                { name: "Locations", path: "/locations" },
                { name: display, path: `/locations/${l.slug}` },
              ]}
            />
            <p className="eyebrow mt-8 text-thunder-bright">{l.tradingName}</p>
            <h1 className="display mt-4 text-[clamp(2.6rem,5vw,4.75rem)]">{l.h1}</h1>
            {l.note && <p className="mt-4 font-label text-[17px] font-semibold uppercase tracking-[0.06em] text-chalk/85">{l.note}</p>}
            <div className="mt-6">
              <StatusBadge />
            </div>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-[4px] border border-hairline bg-hairline sm:grid-cols-2">
              <div className="bg-steel p-5">
                <dt className="eyebrow !text-[11px] text-fog">Address</dt>
                <dd className="mt-2 text-[16px]">
                  <address className="not-italic">
                    {l.street}
                    <br />
                    {l.city}, {l.state} {l.zip}
                  </address>
                </dd>
              </div>
              <div className="bg-steel p-5">
                <dt className="eyebrow !text-[11px] text-fog">Hours</dt>
                <dd className="mt-2 text-[16px]">
                  {HOURS.days}
                  <br />
                  {HOURS.open} to {HOURS.close}
                </dd>
              </div>
              <div className="bg-steel p-5">
                <dt className="eyebrow !text-[11px] text-fog">Phone</dt>
                <dd className="mt-2">
                  <a href={telHref(l.phone)} className="inline-flex min-h-9 items-center gap-2 text-[18px] tabular-nums hover:text-signal">
                    <Phone size={16} strokeWidth={1.5} className="text-thunder-bright" aria-hidden />
                    {l.phone}
                  </a>
                </dd>
              </div>
              <div className="bg-steel p-5">
                <dt className="eyebrow !text-[11px] text-fog">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${l.email}`} className="inline-flex min-h-9 items-center gap-2 break-all text-[16px] hover:text-signal">
                    <Mail size={16} strokeWidth={1.5} className="shrink-0 text-thunder-bright" aria-hidden />
                    {l.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <StartBuildButton />
              <a href={telHref(l.phone)} className="btn btn-ghost">
                <Phone size={16} strokeWidth={1.5} aria-hidden /> Call {display}
              </a>
              <a href={directionsHref(l)} target="_blank" rel="noopener" className="btn btn-ghost">
                <Navigation size={16} strokeWidth={1.5} aria-hidden /> Directions
              </a>
            </div>
            <MakeMyShop slug={l.slug} />
          </div>

          <div className="lg:col-span-6">
            {/* Never wider than the photo's native width (Broad Street is 859px) */}
            <figure className="ticks mx-auto lg:ml-auto lg:mr-0" style={{ maxWidth: Math.min(l.photo.maxWidth, 640) }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                <Image
                  src={l.photo.src}
                  alt={l.photo.alt}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                  style={{ objectPosition: l.photo.position }}
                />
              </div>
              <figcaption className="eyebrow mt-3 !text-[11px] text-fog">{fullAddress(l)}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* What this shop offers */}
      <section aria-labelledby="offers" className="section-pad border-t border-hairline bg-asphalt">
        <div className="container-site">
          <SectionHeader id="offers" index="01" eyebrow="At this shop" numeral="01" title={`Everything we do, at ${display}.`} lede={l.servingLine} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal as="li" i={i} key={s.slug}>
                <Link href={s.href} className="group flex h-full flex-col justify-between rounded-[4px] border border-hairline bg-steel p-6 transition-colors hover:border-signal">
                  <span className="display text-[2.5rem] leading-none text-thunder-bright">{s.index}</span>
                  <div className="mt-10">
                    <h3 className="display text-[1.7rem]">{s.name}</h3>
                    <p className="mt-2 text-[15px] text-fog">{s.line}</p>
                  </div>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="mt-6 text-fog transition-colors group-hover:text-signal" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-4 rounded-[4px] border border-hairline bg-steel p-6 lg:flex lg:items-center lg:justify-between">
            <p className="font-label text-[18px] font-semibold uppercase tracking-[0.04em]">Dedicated installation team on site</p>
            <p className="mt-2 text-[15px] text-fog lg:mt-0">We install everything we sell, and typically parts you bought elsewhere too.</p>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section aria-label={`Map of ${l.tradingName}`} className="bg-steel">
        <div className="container-site py-16 lg:py-24">
          <div className="ticks relative overflow-hidden rounded-[4px] border border-hairline bg-asphalt">
            {/* Shown until (or if) the map loads */}
            <div aria-hidden className="blueprint absolute inset-0 grid place-items-center opacity-80">
              <p className="eyebrow text-fog">{fullAddress(l)}</p>
            </div>
            <iframe
              title={`Google Map of ${l.tradingName}, ${fullAddress(l)}`}
              src={mapEmbedSrc(l)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative block h-[380px] w-full grayscale-[35%] lg:h-[480px]"
            />
          </div>
        </div>
      </section>

      <ServiceReviews reviews={l.slug === "ashland" ? [reviews[3], reviews[0]] : [reviews[2], reviews[1]]} index="02" />

      {/* Other shops */}
      <section aria-labelledby="others" className="section-pad border-t border-hairline bg-asphalt">
        <div className="container-site">
          <SectionHeader id="others" index="03" eyebrow="Other locations" title="Closer to another shop?" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/locations/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-[4px] border border-hairline bg-steel p-5 transition-colors hover:border-chalk/40">
                  <span>
                    <span className="display block text-[1.6rem]">{o.slug === "ashland" ? "Ashland Hitch" : o.name}</span>
                    <span className="mt-1 block text-[14px] text-fog">
                      {o.street}, {o.city}
                    </span>
                    <span className="mt-1 block text-[14px] tabular-nums text-chalk/85">{o.phone}</span>
                  </span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="text-fog group-hover:text-signal" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
