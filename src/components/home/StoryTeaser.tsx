"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { timelineShort } from "@/data/timeline";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** The one count-up on the site: the founding year. */
function YearCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [year, setYear] = useState(1978);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    setYear(1900);
    const controls = animate(1900, 1978, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setYear(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <span ref={ref} aria-hidden className="tabular-nums">
      {year}
    </span>
  );
}

export function StoryTeaser() {
  return (
    <section aria-labelledby="story-title" className="on-light section-pad relative overflow-hidden bg-concrete text-ink">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p
              className="display select-none text-[clamp(7rem,24vw,22rem)] leading-[0.78] text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
              aria-hidden
            >
              <YearCounter />
            </p>
          </div>
          <div className="lg:col-span-5 lg:pb-6">
            <Reveal>
              <Eyebrow index="07" accent="ink" className="text-ink-muted">
                Since 1978
              </Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 id="story-title" className="display h-md mt-5">
                <span className="sr-only">Since 1978. </span>A family shop that grew up with Virginia&apos;s trucks.
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-5 text-[17px] text-ink-muted">
                Tom and Judy Brooks opened their first store on Midlothian Turnpike in 1978. Customers kept asking for
                accessories, so Truckin Thunder was born. Today the next generation of the Brooks family runs four
                Virginia locations.
              </p>
            </Reveal>
            <Reveal i={3}>
              <Link href="/about" className="link-arrow mt-6 text-ink hover:text-thunder">
                Read our story <ArrowRight size={16} aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid grid-cols-2 gap-y-8 border-t border-ink/15 sm:grid-cols-3 lg:mt-20 lg:grid-cols-5">
          {timelineShort.map((t, i) => (
            <Reveal as="li" i={i} key={t.year} className="relative pr-4 pt-6">
              <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full border border-ink bg-concrete" />
              <span className="display block text-[2rem] leading-none">{t.year}</span>
              <span className="mt-2 block text-[15px] text-ink-muted">{t.label}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
