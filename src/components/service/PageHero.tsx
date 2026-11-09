import Image from "next/image";
import { Breadcrumbs } from "./Breadcrumbs";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import type { Photo } from "@/data/images";
import type { PlannerPreset } from "@/data/planner";

type Props = {
  photo: Photo;
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  sub: string;
  preset?: PlannerPreset;
  crumbs: { name: string; path: string }[];
  secondary?: React.ReactNode;
  /** Tag line in the corner, spec-sheet style. */
  tag?: string;
};

/** Full-bleed photo hero for service pages. */
export function PageHero({ photo, eyebrow, index, title, sub, preset, crumbs, secondary, tag }: Props) {
  // The hero is at least 88% of the viewport tall and cover-cropped, so on
  // narrow screens a wide photo renders much wider than the viewport.
  const aspect = photo.src.width / photo.src.height;
  const sizes = `(max-aspect-ratio: ${Math.round(aspect * 100)}/100) ${Math.ceil(aspect * 88)}vh, 100vw`;
  return (
    <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-asphalt lg:min-h-[86svh]">
      <div className="kenburns absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          quality={60}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/55 to-asphalt/20" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-asphalt/80 via-asphalt/20 to-transparent" />

      <div className="container-site relative pb-14 pt-36 lg:pb-20">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-8 flex items-center gap-3 text-chalk/85">
          {index && <span className="text-thunder-bright">{index}</span>}
          {index && <span aria-hidden className="h-px w-8 bg-chalk/40" />}
          {eyebrow}
        </p>
        <h1 className="display h-xl mt-5 max-w-[14ch]">{title}</h1>
        <p className="lede mt-6 text-chalk/90">{sub}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <StartBuildButton preset={preset} />
          {secondary}
        </div>
      </div>
      {tag && (
        <p className="eyebrow absolute bottom-6 right-[var(--gutter)] hidden !text-[11px] text-chalk/60 lg:block">
          <span className="spec-tag">{tag}</span>
        </p>
      )}
    </section>
  );
}
