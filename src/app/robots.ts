import type { MetadataRoute } from "next";
import { IS_CONCEPT, site } from "@/config/site";

/** The concept stays out of search entirely. Flip IS_CONCEPT at launch. */
export default function robots(): MetadataRoute.Robots {
  return IS_CONCEPT
    ? { rules: [{ userAgent: "*", disallow: "/" }] }
    : { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
