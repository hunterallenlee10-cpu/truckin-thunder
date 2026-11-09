import type { Metadata } from "next";
import { site } from "@/config/site";
import { fullAddress, locations, type Location } from "@/data/locations";

/** Per-page metadata with canonical, Open Graph and Twitter tags. */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle = absoluteTitle ? title : `${title} | Truckin Thunder`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/images/brand/tt-logo-light-clean.png`,
    foundingDate: String(site.foundingYear),
    foundingLocation: { "@type": "Place", name: site.city },
    sameAs: [site.social.instagram, site.social.facebook],
    memberOf: [
      { "@type": "Organization", name: "SEMA (Specialty Equipment Market Association)" },
      { "@type": "Organization", name: "NTEA (National Truck Equipment Association)" },
    ],
    subOrganization: locations.map((l) => ({ "@id": `${site.url}/locations/${l.slug}#store` })),
  };
}

export function storeSchema(l: Location) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    "@id": `${site.url}/locations/${l.slug}#store`,
    name: l.tradingName,
    url: `${site.url}/locations/${l.slug}`,
    image: `${site.url}${l.photo.src.src}`,
    telephone: `+1-${l.phone.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}`,
    email: l.email,
    parentOrganization: { "@id": `${site.url}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: l.street,
      addressLocality: l.city,
      addressRegion: l.state,
      postalCode: l.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress(l))}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path === "/" ? "" : it.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    // Unconfirmed answers are left out of structured data.
    mainEntity: faqs
      .filter((f) => !f.a.includes("[TO CONFIRM"))
      .map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
