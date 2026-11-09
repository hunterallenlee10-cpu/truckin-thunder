import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { StartBuildButton } from "@/components/ui/StartBuildButton";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-asphalt pb-20 pt-36">
      <div aria-hidden className="blueprint absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <span aria-hidden className="outline-numeral absolute -right-6 bottom-0 text-[42vw] leading-[0.75] lg:text-[34vw]">
        404
      </span>
      <div className="container-site relative">
        <p className="eyebrow text-thunder-bright">Error 404 · Road closed</p>
        <h1 className="display h-xl mt-5 max-w-[12ch]">
          Wrong turn. Let&apos;s get you back on the <span className="text-signal">road.</span>
        </h1>
        <p className="lede mt-6 text-fog">The page you were looking for moved or never existed. These are good places to start.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
          <StartBuildButton />
        </div>
        <ul className="mt-14 grid max-w-3xl gap-px overflow-hidden rounded-[4px] border border-hairline bg-hairline sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} className="group flex min-h-16 items-center justify-between bg-steel px-5 py-4 hover:bg-steel-2">
                <span className="font-label text-[16px] font-semibold uppercase tracking-[0.06em]">{s.name}</span>
                <ArrowRight size={16} className="text-fog group-hover:text-signal" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
