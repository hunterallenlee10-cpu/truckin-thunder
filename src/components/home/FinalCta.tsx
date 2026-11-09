import { locations, telHref } from "@/data/locations";
import { HazardStripe } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import type { PlannerPreset } from "@/data/planner";

type Props = {
  title?: React.ReactNode;
  sub?: string;
  preset?: PlannerPreset;
};

export function FinalCta({
  title = (
    <>
      Ready to <span className="text-signal">upfit</span> your fleet or truck?
    </>
  ),
  sub = "Let's talk about your next build.",
  preset,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-steel">
      <HazardStripe />
      <div aria-hidden className="blueprint absolute inset-0 top-[6px] opacity-40" />
      <div className="container-site relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="cta-title" className="display h-lg max-w-[14ch]">
                {title}
              </h2>
            </Reveal>
            <Reveal i={1}>
              <p className="lede mt-6 text-chalk/85">{sub}</p>
            </Reveal>
            <Reveal i={2} className="mt-8">
              <StartBuildButton preset={preset} />
            </Reveal>
          </div>
          <Reveal i={2} className="lg:col-span-5">
            <p className="eyebrow text-fog">Or call the shop closest to you</p>
            <ul className="mt-4 border-t border-hairline">
              {locations.map((l) => (
                <li key={l.slug} className="border-b border-hairline">
                  <a href={telHref(l.phone)} className="group flex min-h-14 items-center justify-between gap-4 py-3">
                    <span className="font-label text-[15px] font-semibold uppercase tracking-[0.1em] text-fog group-hover:text-chalk">
                      {l.slug === "ashland" ? "Ashland Hitch" : l.name}
                    </span>
                    <span className="font-label text-[20px] font-semibold tabular-nums group-hover:text-signal">{l.phone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
