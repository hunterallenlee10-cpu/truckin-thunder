"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { photos } from "@/data/images";
import { anatomy } from "@/data/anatomy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { StartBuildButton } from "@/components/ui/StartBuildButton";

const COUNT = anatomy.length;

/**
 * Signature moment 2. On desktop the van photo pins while scrolling lights
 * the five hotspots in turn. On mobile, or with reduced motion, nothing pins:
 * tap a hotspot or swipe the callout cards.
 */
export function UpfitAnatomy() {
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;

  const outerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pinned) return;
    setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT * 0.999 + 0.0001))));
  });

  const select = (i: number) => {
    if (pinned && outerRef.current) {
      // Scroll to the middle of that hotspot's segment of the pinned range.
      const el = outerRef.current;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const range = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (range * (i + 0.5)) / COUNT, behavior: "smooth" });
      return;
    }
    setActive(i);
    const rail = railRef.current;
    const card = rail?.children[i] as HTMLElement | undefined;
    if (rail && card && rail.scrollWidth > rail.clientWidth) {
      rail.scrollTo({ left: card.offsetLeft - rail.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    }
  };

  // Swiping the mobile cards moves the active hotspot.
  const onRailScroll = () => {
    const rail = railRef.current;
    if (!rail || pinned || rail.scrollWidth <= rail.clientWidth) return;
    const card = rail.children[0] as HTMLElement;
    const i = Math.round(rail.scrollLeft / (card.offsetWidth + 12));
    if (i !== active) setActive(Math.min(COUNT - 1, i));
  };

  const spot = anatomy[active];

  return (
    <section aria-labelledby="anatomy-title" className="on-light relative bg-concrete text-ink">
      <div ref={outerRef} className={pinned ? "h-[460svh]" : ""}>
        <div className={pinned ? "sticky top-0 flex h-[100svh] items-center overflow-hidden" : "section-pad"}>
          <div className="container-site grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Copy and callout */}
            <div className="lg:col-span-5 lg:pt-16">
              <Eyebrow index="02" accent="ink" className="text-ink-muted">
                Anatomy of an upfit
              </Eyebrow>
              <h2 id="anatomy-title" className="display mt-5 text-[clamp(2.6rem,4.4vw,4.5rem)]">
                Every shelf where your crew expects it.
              </h2>
              <p className="mt-5 max-w-[46ch] text-[17px] text-ink-muted lg:[@media(max-height:820px)]:hidden">
                A real Chevy Express, upfit for HVAC work. Five decisions that turn an empty cargo van into a rolling
                shop.
              </p>

              {/* Desktop: one callout at a time */}
              <div className="mt-8 hidden lg:block" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={spot.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Callout index={active} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress segments */}
              <ol className="mt-6 hidden gap-1.5 lg:flex" aria-label="Upfit features">
                {anatomy.map((h, i) => (
                  <li key={h.id} className="flex-1">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={i === active ? "step" : undefined}
                      className="group block w-full py-3 text-left"
                    >
                      <span className={`block h-[3px] transition-colors duration-300 ${i === active ? "bg-ink" : i < active ? "bg-ink/40" : "bg-ink/12 group-hover:bg-ink/30"}`} />
                      <span className={`eyebrow mt-2 block !text-[11px] ${i === active ? "text-ink" : "text-ink-muted"}`}>
                        0{i + 1}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="mt-6 hidden lg:block">
                <StartBuildButton preset="van" label="Plan a van like this" variant="ink" />
              </div>
            </div>

            {/* Photo with hotspots */}
            <div className="lg:col-span-7">
              <div className="ticks [--tick:#9aa0a6]">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[4px] bg-concrete-2">
                  <Image
                    src={photos.vanExpressInterior.src}
                    alt={photos.vanExpressInterior.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                  {anatomy.map((h, i) => (
                    <HotspotButton key={h.id} index={i} active={i === active} onSelect={() => select(i)} />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex justify-between">
                <p className="eyebrow !text-[11px] text-ink-muted">Chevrolet Express · HVAC upfit</p>
                <p className="eyebrow !text-[11px] text-ink-muted tabular-nums">
                  {String(active + 1).padStart(2, "0")} / 0{COUNT}
                </p>
              </div>
            </div>

            {/* Mobile and reduced motion: swipeable cards */}
            <div className="min-w-0 lg:hidden">
              <ul
                ref={railRef}
                onScroll={onRailScroll}
                className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none]"
                aria-label="Upfit features"
              >
                {anatomy.map((h, i) => (
                  <li key={h.id} className="w-[86%] shrink-0 snap-start xs:w-[78%]">
                    <Callout index={i} dim={i !== active} />
                  </li>
                ))}
              </ul>
              <StartBuildButton preset="van" label="Plan a van like this" variant="ink" className="mt-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HotspotButton({ index, active, onSelect }: { index: number; active: boolean; onSelect: () => void }) {
  const h = anatomy[index];
  const labelLeft = h.x > 60;
  return (
    <div className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${index + 1}: ${h.title}`}
        aria-pressed={active}
        className="relative z-10 -translate-x-1/2 -translate-y-1/2"
      >
        {active && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-signal/60 motion-reduce:hidden" />}
        <span
          className={`relative grid size-11 place-items-center rounded-full font-label text-[15px] font-semibold tabular-nums shadow-[0_2px_10px_rgb(0_0_0/0.35)] transition-all duration-300 lg:size-10 ${
            active ? "scale-110 bg-signal text-ink ring-2 ring-ink" : "bg-ink/85 text-chalk ring-1 ring-white/70 hover:bg-ink"
          }`}
        >
          {index + 1}
        </span>
      </button>
      {active && (
        <span
          aria-hidden
          className={`pointer-events-none absolute top-0 hidden -translate-y-1/2 whitespace-nowrap rounded-[2px] bg-ink px-2.5 py-1.5 eyebrow !text-[11px] text-chalk sm:block ${
            labelLeft ? "right-7" : "left-7"
          }`}
        >
          {h.title}
        </span>
      )}
    </div>
  );
}

function Callout({ index, dim = false }: { index: number; dim?: boolean }) {
  const h = anatomy[index];
  return (
    <article
      className={`relative h-full rounded-[4px] border border-ink/12 bg-white p-6 transition-opacity duration-300 ${dim ? "opacity-60" : ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="spec-tag text-ink-muted">{h.code}</span>
        <span className="display text-[2.5rem] leading-none text-ink/15">0{index + 1}</span>
      </div>
      <h3 className="display mt-3 text-[2rem]">{h.title}</h3>
      <p className="mt-3 text-[16px] leading-relaxed text-ink-muted">{h.body}</p>
      <dl className="mt-5 grid grid-cols-2 border-t border-ink/10 pt-4 text-[13px]">
        <div>
          <dt className="eyebrow !text-[10px] text-ink-muted">Category</dt>
          <dd className="mt-1 font-medium">{h.category}</dd>
        </div>
        <div>
          <dt className="eyebrow !text-[10px] text-ink-muted">Installed by</dt>
          <dd className="mt-1 font-medium">Our in-house team</dd>
        </div>
      </dl>
    </article>
  );
}
