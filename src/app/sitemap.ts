import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locations } from "@/data/locations";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "/",
    ...services.map((s) => s.href),
    "/locations",
    ...locations.map((l) => `/locations/${l.slug}`),
    "/about",
    "/careers",
    "/contact",
  ];
  return paths.map((p) => ({
    url: `${site.url}${p === "/" ? "" : p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "/" ? 1 : p.startsWith("/locations/") ? 0.8 : 0.7,
  }));
}
