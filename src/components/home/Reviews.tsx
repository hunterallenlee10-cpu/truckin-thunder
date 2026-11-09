import { reviews, type Review } from "@/data/reviews";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/** Static editorial layout: one featured quote plus three. No carousel. */
export function Reviews({ featuredId = "elkin" }: { featuredId?: string }) {
  const featured = reviews.find((r) => r.id === featuredId)!;
  const rest = reviews.filter((r) => r.id !== featuredId);
  return (
    <section aria-labelledby="reviews-title" className="on-light section-pad relative bg-concrete text-ink">
      <div className="container-site">
        <SectionHeader
          id="reviews-title"
          index="05"
          eyebrow="Customer reviews"
          numeral="05"
          tone="light"
          title="In their words."
          aside={
            <span className="placeholder-pill text-ink-muted" title="Fill in with the owner before launch">
              [GOOGLE RATING] · [REVIEW COUNT]
            </span>
          }
        />

        <Reveal as="figure" className="relative mt-14 grid gap-8 border-t border-ink/15 pt-10 lg:mt-20 lg:grid-cols-12 lg:pt-14">
          <QuoteMark className="h-16 w-20 lg:col-span-2 lg:h-24 lg:w-28" />
          <div className="lg:col-span-10">
            <blockquote>
              <p className="display text-[clamp(2rem,3.6vw,3.5rem)] !leading-[1.02] !normal-case !tracking-[-0.005em]">
                {featured.quote}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="eyebrow !text-[14px] text-ink">{featured.name}</span>
              <span aria-hidden className="h-px w-8 bg-ink/30" />
              <span className="eyebrow text-ink-muted">{featured.context}</span>
            </figcaption>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3">
          {rest.map((r, i) => (
            <Reveal as="li" i={i} key={r.id}>
              <ReviewCard review={r} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReviewCard({ review, tone = "light" }: { review: Review; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <figure
      className={`flex h-full flex-col rounded-[4px] border p-7 ${
        dark ? "border-hairline bg-steel text-chalk" : "border-ink/10 bg-white text-ink"
      }`}
    >
      <QuoteMark className="h-8 w-10" />
      <blockquote className="mt-5 flex-1">
        <p className={`text-[16px] leading-relaxed ${dark ? "text-chalk/85" : "text-ink/85"}`}>{review.quote}</p>
      </blockquote>
      <figcaption className={`mt-6 border-t pt-4 ${dark ? "border-hairline" : "border-ink/10"}`}>
        <span className="eyebrow block">{review.name}</span>
        <span className={`eyebrow mt-1 block !text-[11px] ${dark ? "text-fog" : "text-ink-muted"}`}>{review.context}</span>
      </figcaption>
    </figure>
  );
}

/** Big yellow quote mark, drawn as a shape so it reads as an accent, not text. */
export function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 44" className={`text-signal ${className}`} aria-hidden fill="currentColor">
      <path d="M0 44V25.6C0 11.2 7.4 2.6 22.2 0l2.6 6.2C17 8.4 13.2 13 12.8 19.6H24V44H0Zm32 0V25.6C32 11.2 39.4 2.6 54.2 0l2.6 6.2c-7.8 2.2-11.6 6.8-12 13.4H56V44H32Z" />
    </svg>
  );
}
