import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, Barlow_Semi_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { IS_CONCEPT, site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers/Providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});
const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow-semi",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Truckin Thunder | Truck Accessories and Upfitting in Virginia Since 1978",
    template: "%s | Truckin Thunder",
  },
  description: site.description,
  applicationName: site.shortName,
  robots: IS_CONCEPT
    ? { index: false, follow: false, googleBot: { index: false, follow: false } }
    : { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0E1114",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${barlow.variable} ${barlowCondensed.variable} ${barlowSemi.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks JS as available so scroll reveals can start hidden. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="grain">
        <a
          href="#main"
          className="btn btn-signal fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
