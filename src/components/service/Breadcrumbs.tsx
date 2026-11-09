import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

/** Visible breadcrumbs plus BreadcrumbList schema. */
export function Breadcrumbs({ items, tone = "dark" }: { items: { name: string; path: string }[]; tone?: "dark" | "light" }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb">
        <ol className={`flex flex-wrap items-center gap-1 eyebrow !text-[11px] ${tone === "dark" ? "text-chalk/70" : "text-ink-muted"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className={tone === "dark" ? "text-chalk" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="inline-flex min-h-8 items-center hover:text-signal">
                    {c.name}
                  </Link>
                )}
                {!last && <ChevronRight size={12} aria-hidden className="opacity-60" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
