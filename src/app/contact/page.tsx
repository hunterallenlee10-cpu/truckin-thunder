import { ClipboardList } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { HOURS } from "@/data/locations";
import { Breadcrumbs } from "@/components/service/Breadcrumbs";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { HazardStripe } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = pageMeta({
  title: "Contact a Truckin Thunder Location",
  description:
    "Call, email or message any of our four Virginia locations, or start a build for the fastest quote. Monday to Friday, 8 AM to 5 PM.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-asphalt pb-24 pt-36 lg:pb-32 lg:pt-44">
      <div aria-hidden className="blueprint absolute inset-x-0 top-0 h-[520px] opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-site relative">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <h1 className="display h-xl mt-8 max-w-[12ch]">Let&apos;s talk trucks.</h1>
        <p className="lede mt-6 text-chalk/85">
          {HOURS.days}, {HOURS.open} to {HOURS.close} at all four locations.
        </p>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          {/* Main path: the planner */}
          <aside className="lg:col-span-5">
            <div className="overflow-hidden rounded-[4px] border border-hairline bg-steel lg:sticky lg:top-28">
              <HazardStripe />
              <div className="p-7 lg:p-9">
                <ClipboardList size={28} strokeWidth={1.5} className="text-thunder-bright" aria-hidden />
                <p className="eyebrow mt-6 text-fog">Fastest way to a quote</p>
                <h2 className="display h-md mt-3">Start My Build.</h2>
                <p className="mt-4 text-[17px] text-chalk/85">
                  Five quick steps: your vehicle, what it&apos;s for, the upgrades you want, your shop and timeline. You
                  get a build sheet to print, and the shop gets everything it needs to quote you.
                </p>
                <StartBuildButton className="mt-8 w-full" />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <h2 className="display h-sm">Or send a quick message.</h2>
            <p className="mt-3 text-[16px] text-fog">Pick a shop and tell us what you need.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
