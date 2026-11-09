import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { howItWorks } from "@/data/services";
import { brandsFor } from "@/data/brands";
import type { Faq } from "@/data/faqs";
import type { Photo } from "@/data/images";
import type { Review } from "@/data/reviews";
import { faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { BrandTile } from "@/components/home/BrandWall";
import { ReviewCard } from "@/components/home/Reviews";

/* What we install: a spec grid of categories. */
export function WhatWeInstall({
  index = "01",
  title = "What we install.",
  lede,
  items,
  prefix,
}: {
  index?: string;
  title?: string;
  lede?: string;
  items: { name: string; body: string }[];
  prefix: string;
}) {
  return (
    <section aria-labelledby="install-grid" className="section-pad bg-asphalt">
      <div className="container-site">
        <SectionHeader id="install-grid" index={index} eyebrow="What we install" numeral={index} title={title} lede={lede} />
        <ul className="mt-14 grid border-l border-t border-hairline sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal as="li" i={i % 4} key={it.name} className="flex min-h-[200px] flex-col justify-between border-b border-r border-hairline p-6 lg:p-7">
              <span className="spec-tag self-start text-fog">
                {prefix}-{String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-10">
                <h3 className="display text-[1.85rem]">{it.name}</h3>
                <p className="mt-2 text-[15px] text-fog">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Featured photo story: 2 or 3 real photos with captions. */
export function PhotoStory({
  index = "02",
  eyebrow = "In the shop",
  title,
  lede,
  photos,
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  photos: { photo: Photo; caption: string; tone?: "white" }[];
}) {
  const [lead, ...rest] = photos;
  return (
    <section aria-labelledby="story" className="on-light section-pad bg-concrete text-ink">
      <div className="container-site">
        <SectionHeader id="story" index={index} eyebrow={eyebrow} numeral={index} tone="light" title={title} lede={lede} />
        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12">
          <Reveal as="figure" className="lg:col-span-7">
            <StoryImage {...lead} large />
          </Reveal>
          <div className="grid gap-4 lg:col-span-5">
            {rest.map((p, i) => (
              <Reveal as="figure" i={i + 1} key={p.caption}>
                <StoryImage {...p} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryImage({ photo, caption, tone, large }: { photo: Photo; caption: string; tone?: "white"; large?: boolean }) {
  // Never stretch a low-res photo past its native width.
  const capped = photo.maxWidth < 1200;
  return (
    <>
      <div
        className={`relative overflow-hidden rounded-[4px] ${tone === "white" ? "bg-white" : "bg-concrete-2"} ${
          large ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[560px]" : "aspect-[16/10]"
        }`}
        style={capped ? { maxWidth: photo.maxWidth } : undefined}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          placeholder="blur"
          sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
          className={tone === "white" ? "object-contain p-4" : "object-cover"}
          style={{ objectPosition: photo.position }}
        />
      </div>
      <figcaption className="eyebrow mt-3 !text-[11px] text-ink-muted">{caption}</figcaption>
    </>
  );
}

/* Brands relevant to this service. */
export function BrandRow({ use, index = "03" }: { use: Parameters<typeof brandsFor>[0]; index?: string }) {
  const list = brandsFor(use);
  return (
    <section aria-labelledby="brand-row" className="section-pad bg-asphalt">
      <div className="container-site">
        <SectionHeader id="brand-row" index={index} eyebrow="Brands we install" numeral={index} title="Proven brands. Certified installers." />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-16 lg:grid-cols-4">
          {list.map((b, i) => (
            <Reveal as="li" i={i % 4} key={b.name}>
              <BrandTile brand={b} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* How it works: 4 steps. */
export function HowItWorks({ index = "04" }: { index?: string }) {
  return (
    <section aria-labelledby="how" className="section-pad relative overflow-hidden bg-steel">
      <div aria-hidden className="blueprint absolute inset-0 opacity-40" />
      <div className="container-site relative">
        <SectionHeader id="how" index={index} eyebrow="How it works" numeral={index} title="Four steps from idea to installed." />
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {howItWorks.map((s, i) => (
            <Reveal as="li" i={i} key={s.step} className="relative rounded-[4px] border border-hairline bg-asphalt p-6 lg:p-7">
              <span className="display text-[4rem] leading-none text-thunder-bright">{s.step}</span>
              <h3 className="display mt-8 text-[1.75rem]">{s.title}</h3>
              <p className="mt-3 text-[15px] text-fog">{s.body}</p>
              {i < 3 && <span aria-hidden className="absolute -right-3 top-12 z-10 hidden h-px w-6 bg-chalk/30 lg:block" />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* One or two matching real reviews. */
export function ServiceReviews({ reviews, index = "05" }: { reviews: Review[]; index?: string }) {
  return (
    <section aria-labelledby="svc-reviews" className="section-pad bg-asphalt">
      <div className="container-site">
        <SectionHeader id="svc-reviews" index={index} eyebrow="Customer reviews" numeral={index} title="In their words." />
        <ul className={`mt-12 grid gap-4 lg:mt-16 ${reviews.length > 1 ? "lg:grid-cols-2" : "max-w-3xl"}`}>
          {reviews.map((r, i) => (
            <Reveal as="li" i={i} key={r.id}>
              <ReviewCard review={r} tone="dark" />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* FAQ accordion with FAQPage schema for confirmed answers. */
export function FaqSection({ faqs, index = "06" }: { faqs: Faq[]; index?: string }) {
  return (
    <section aria-labelledby="faq" className="on-light section-pad bg-concrete text-ink">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeader id="faq" index={index} eyebrow="Questions" tone="light" title="Straight answers." />
        </div>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => (
            <Reveal key={f.q} i={i % 3}>
              <details className="group border-t border-ink/15 last:border-b">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-label text-[18px] font-semibold uppercase tracking-[0.04em] lg:text-[20px]">{f.q}</span>
                  <ChevronDown size={20} strokeWidth={1.5} aria-hidden className="shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="max-w-[62ch] pb-6 text-[16px] leading-relaxed text-ink-muted">
                  {f.a.includes("[TO CONFIRM") ? (
                    <>
                      {f.a.replace("[TO CONFIRM WITH OWNER]", "").trim()}{" "}
                      <span className="placeholder-pill">[TO CONFIRM WITH OWNER]</span>
                    </>
                  ) : (
                    f.a
                  )}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
