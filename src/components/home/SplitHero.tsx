"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { m, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { photos, type Photo } from "@/data/images";
import { StartBuildButton } from "@/components/ui/StartBuildButton";

type Side = "work" | "play";

const PANELS: Record<
  Side,
  { photo: Photo; code: string; word: string; line: string; cta: string; href: string; mobilePosition: string }
> = {
  work: {
    photo: photos.heroFleetLot,
    code: "Side A",
    word: "Work",
    line: "Fleet, government and commercial upfitting.",
    cta: "Explore fleet upfitting",
    href: "/fleet-government",
    mobilePosition: "60% 6%",
  },
  play: {
    photo: photos.heroBlueF150,
    code: "Side B",
    word: "Play",
    line: "Lifts, wheels, bumpers and trail gear.",
    cta: "Explore off-road",
    href: "/offroad",
    mobilePosition: "40% 60%",
  },
};

const SEAM: Record<Side | "none", number> = { none: 50, work: 62, play: 38 };

const TRUST = ["Since 1978", "4 Virginia locations", "SEMA & NTEA members", "Dedicated install team at every shop"];

/**
 * Signature moment 1. Two full-bleed panels split at a seam. Hovering or
 * focusing a side springs it open to about 62% and reveals its line.
 * The seam is a spring exposed to CSS as --seam (see globals.css).
 */
export function SplitHero() {
  const [active, setActive] = useState<Side | null>(null);
  const [canHover, setCanHover] = useState(false);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const seam = useSpring(50, { stiffness: 90, damping: 22, mass: 1 });
  const seamVar = useTransform(seam, (v) => `${v}`);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const target = SEAM[active ?? "none"];
    if (reduce) seam.jump(target);
    else seam.set(target);
  }, [active, reduce, seam]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (!canHover || e.pointerType !== "mouse") return;
    const rect = sectionRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    // Dead zone in the middle keeps the headline area calm.
    if (x < 0.4) setActive("work");
    else if (x > 0.6) setActive("play");
  };

  return (
    <m.section
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={() => canHover && setActive(null)}
      style={{ "--seam": seamVar } as React.CSSProperties & Record<string, unknown>}
      className="split-hero relative flex flex-col overflow-hidden bg-asphalt lg:block lg:h-[100svh] lg:min-h-[760px] lg:max-h-[1200px]"
    >
      <Panel side="work" active={active} setActive={setActive} alwaysShowLine={!canHover} />

      {/* Seam hairline, desktop only */}
      <div aria-hidden className="hero-seam pointer-events-none absolute inset-y-0 z-[5] hidden w-px bg-chalk/25 lg:block">
        <span className="absolute left-1/2 top-[132px] h-3 w-3 -translate-x-1/2 border-l border-t border-chalk/50" />
        <span className="absolute bottom-[96px] left-1/2 h-3 w-3 -translate-x-1/2 border-b border-r border-chalk/50" />
      </div>

      {/* Center scrim behind the headline, desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6] hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 52% 46% at 50% 50%, rgb(14 17 20 / 0.82) 0%, rgb(14 17 20 / 0.55) 45%, rgb(14 17 20 / 0) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] hidden h-[42%] bg-gradient-to-t from-asphalt via-asphalt/50 to-transparent lg:block" />

      {/* Headline */}
      <div className="relative z-10 pt-8 lg:pointer-events-none lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:pb-[40px] lg:pt-[120px]">
        <div className="container-site text-center lg:pointer-events-auto">
          <p className="eyebrow text-chalk/80">
            <span className="text-thunder-bright">Est. 1978</span>
            <span aria-hidden className="mx-3 inline-block h-px w-6 translate-y-[-4px] bg-chalk/40" />
            Richmond, Virginia
          </p>
          <h1 id="hero-title" className="display mx-auto mt-5 max-w-[16ch] text-[clamp(3.4rem,7.1vw,8rem)] lg:max-w-none">
            <span className="block">Built for the job site.</span>
            <span className="block">
              Ready for the <span className="text-signal">trail.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-[17px] leading-relaxed text-chalk/85 lg:text-[19px]">
            Truck accessories, commercial upfitting and expert installation from a Virginia family business. Four
            locations. One crew that does it right.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <StartBuildButton className="w-full sm:w-auto" />
            <a href="#locations" className="link-arrow text-chalk hover:text-signal">
              Find your nearest shop <ArrowRight size={16} aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <Panel side="play" active={active} setActive={setActive} alwaysShowLine={!canHover} />

      {/* Desktop labels live outside the clipped panels so they sit above the scrims */}
      <PanelLabel side="work" active={active} setActive={setActive} alwaysShowLine={!canHover} desktop />
      <PanelLabel side="play" active={active} setActive={setActive} alwaysShowLine={!canHover} desktop />

      {/* Trust strip */}
      <div className="relative z-10 border-t border-hairline bg-asphalt lg:absolute lg:inset-x-0 lg:bottom-0 lg:border-chalk/10 lg:bg-transparent">
        <ul className="container-site grid grid-cols-2 lg:flex lg:h-16 lg:items-center lg:justify-center">
          {TRUST.map((t, i) => (
            <li
              key={t}
              className={`eyebrow flex min-h-14 items-center gap-2.5 py-3 text-[11px] text-chalk/80 lg:min-h-0 lg:px-7 lg:py-0 ${
                i % 2 === 1 ? "border-l border-hairline pl-4 lg:pl-7" : "pr-3"
              } ${i > 1 ? "border-t border-hairline lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <span aria-hidden className="size-1 shrink-0 bg-thunder-bright" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </m.section>
  );
}

function Panel({
  side,
  active,
  setActive,
}: {
  side: Side;
  active: Side | null;
  setActive: (s: Side | null) => void;
  alwaysShowLine?: boolean;
}) {
  const p = PANELS[side];
  const isActive = active === side;
  const dim = active === null ? 0.3 : isActive ? 0.1 : 0.6;
  const right = side === "play";

  return (
    <div
      className={`hero-panel hero-${side} relative h-[46svh] min-h-[330px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:min-h-0`}
    >
      <div className="hero-img absolute inset-0 lg:right-auto lg:w-[64%]">
        <div className="kenburns absolute inset-0">
          <Image
            src={p.photo.src}
            alt={p.photo.alt}
            fill
            priority={side === "work"}
            quality={60}
            sizes="(min-width: 1024px) 64vw, 100vw"
            className="object-cover"
            style={{ objectPosition: `var(--pos-${side})` }}
          />
        </div>
      </div>

      <m.div
        aria-hidden
        className="absolute inset-0 hidden bg-asphalt lg:block"
        initial={false}
        animate={{ opacity: dim }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Mobile fades into the page so the headline sits on asphalt */}
      <div
        aria-hidden
        className={`absolute inset-0 lg:hidden ${
          right
            ? "bg-gradient-to-b from-asphalt via-asphalt/10 to-asphalt/70"
            : "bg-gradient-to-b from-asphalt/60 via-transparent to-asphalt"
        }`}
      />

      <PanelLabel side={side} active={active} setActive={setActive} alwaysShowLine />
    </div>
  );
}

function PanelLabel({
  side,
  active,
  setActive,
  alwaysShowLine,
  desktop = false,
}: {
  side: Side;
  active: Side | null;
  setActive: (s: Side | null) => void;
  alwaysShowLine: boolean;
  desktop?: boolean;
}) {
  const p = PANELS[side];
  const right = side === "play";
  const showLine = alwaysShowLine || active === side;
  const fade = showLine ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0";

  const position = desktop
    ? `hidden lg:block bottom-[104px] ${right ? "right-[var(--gutter)] text-right" : "left-[var(--gutter)]"}`
    : "bottom-5 left-[var(--gutter)] right-[var(--gutter)] lg:hidden";

  return (
    <Link
      href={p.href}
      onFocus={() => setActive(side)}
      onBlur={() => setActive(null)}
      className={`group absolute z-20 block ${position} ${desktop ? "max-w-[320px]" : ""}`}
      aria-label={`${p.word}: ${p.line} ${p.cta}`}
    >
      <span className="spec-tag text-chalk/75">{p.code}</span>
      <span className={`mt-2 flex items-end gap-3 ${right && desktop ? "justify-end" : ""}`}>
        <span className="display block text-[3rem] leading-[0.82] lg:text-[4.5rem]">{p.word}</span>
        {!desktop && <ArrowUpRight size={26} strokeWidth={1.5} className="mb-1 text-chalk/80" aria-hidden />}
      </span>
      <span className={`mt-2 block text-[15px] leading-snug text-chalk/90 transition-all duration-500 lg:text-[16px] ${fade}`}>
        {p.line}
      </span>
      {desktop && (
        <span
          className={`link-arrow !min-h-9 text-chalk transition-all delay-75 duration-500 group-hover:text-signal ${fade} ${
            right ? "flex-row-reverse" : ""
          }`}
        >
          {p.cta} <ArrowUpRight size={16} aria-hidden />
        </span>
      )}
    </Link>
  );
}
