import Image from "next/image";
import Link from "next/link";
import { IS_CONCEPT, site } from "@/config/site";
import { logos } from "@/data/images";
import { HOURS, locations, telHref } from "@/data/locations";
import { services } from "@/data/services";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-hairline bg-asphalt print:hidden">
      <div className="container-site pb-10 pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={logos.dark} alt="Truckin Thunder Accessories" sizes="180px" className="h-auto w-[180px]" />
            <p className="mt-6 max-w-[38ch] text-[16px] text-fog">
              Truck accessories, commercial and fleet upfitting, truck beds and off-road builds, installed by our own
              crews. A Virginia family business since 1978.
            </p>
            <p className="eyebrow mt-6 text-chalk/80">SEMA &amp; NTEA members</p>
            <div className="mt-6 flex gap-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Truckin Thunder on Instagram"
                className="grid size-11 place-items-center rounded-[4px] border border-hairline text-fog transition-colors hover:border-chalk/40 hover:text-chalk"
              >
                <InstagramIcon />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener"
                aria-label="Truckin Thunder on Facebook"
                className="grid size-11 place-items-center rounded-[4px] border border-hairline text-fog transition-colors hover:border-chalk/40 hover:text-chalk"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
            {locations.map((l) => (
              <address key={l.slug} className="not-italic">
                <Link href={`/locations/${l.slug}`} className="eyebrow text-chalk hover:text-signal">
                  {l.slug === "ashland" ? "Ashland Hitch" : l.name}
                </Link>
                <p className="mt-2 text-[15px] leading-relaxed text-fog">
                  {l.street}
                  <br />
                  {l.city}, {l.state} {l.zip}
                </p>
                <a href={telHref(l.phone)} className="mt-1 inline-block py-1 text-[15px] tabular-nums text-chalk hover:text-signal">
                  {l.phone}
                </a>
                <p className="text-[13px] text-fog">
                  {HOURS.daysShort} {HOURS.short}
                </p>
              </address>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-3 lg:grid-cols-1">
            <nav aria-label="Services">
              <p className="eyebrow text-fog">Services</p>
              <ul className="mt-3 space-y-0.5">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={s.href} className="inline-block py-1.5 text-[15px] text-chalk/85 hover:text-chalk">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company">
              <p className="eyebrow text-fog">Company</p>
              <ul className="mt-3 space-y-0.5">
                <li>
                  <Link href="/about" className="inline-block py-1.5 text-[15px] text-chalk/85 hover:text-chalk">
                    About and brands
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="inline-block py-1.5 text-[15px] text-chalk/85 hover:text-chalk">
                    Locations
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="inline-block py-1.5 text-[15px] text-chalk/85 hover:text-chalk">
                    Careers <span className="text-thunder-bright">· We&apos;re hiring techs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="inline-block py-1.5 text-[15px] text-chalk/85 hover:text-chalk">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 text-[13px] text-fog sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Truckin Thunder Accessories. All rights reserved.</p>
          {IS_CONCEPT && <p className="eyebrow !text-[11px]">{site.conceptCredit}</p>}
        </div>
      </div>
    </footer>
  );
}
