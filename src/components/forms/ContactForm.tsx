"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { locations, telHref, type LocationSlug } from "@/data/locations";
import { formatPhone, validateEmail, validateName, validatePhone } from "@/lib/validate";
import { useShop } from "@/components/providers/ShopProvider";
import { RadioTile } from "@/components/planner/Choices";
import { Field } from "@/components/planner/Steps";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Short contact form with a location picker. Front end only. */
export function ContactForm() {
  const { shop, chosen, setShop } = useShop();
  const [loc, setLoc] = useState<LocationSlug | "">("");
  const [v, setV] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));

  useEffect(() => {
    if (chosen && !loc) setLoc(shop.slug);
  }, [chosen, shop.slug, loc]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = {
      location: loc ? null : "Pick the shop you'd like to hear from.",
      name: validateName(v.name),
      phone: validatePhone(v.phone),
      email: validateEmail(v.email),
      message: v.message.trim().length >= 5 ? null : "Tell us a little about what you need.",
    };
    setErrors(errs);
    const first = Object.entries(errs).find(([, m]) => m);
    if (first) {
      const target =
        first[0] === "location"
          ? document.querySelector<HTMLElement>('input[name="contact-location"]')
          : document.getElementById(`ct-${first[0]}`);
      target?.focus();
      return;
    }
    // TODO: POST to n8n webhook
    await new Promise((r) => setTimeout(r, 500));
    setSent(true);
  };

  const selected = locations.find((l) => l.slug === loc);

  if (sent && selected) {
    return (
      <div className="rounded-[4px] border border-open/40 bg-open/10 p-8" role="status">
        <CheckCircle2 size={28} className="text-open" aria-hidden />
        <p className="display mt-4 text-[2rem]">Message sent.</p>
        <p className="mt-3 text-[17px] text-chalk/85">
          The {selected.name} team will get back to you within one business day.{" "}
          <span className="placeholder-pill text-fog">[CONFIRM RESPONSE TIME]</span> Need it sooner? Call{" "}
          <a href={telHref(selected.phone)} className="underline underline-offset-4 hover:text-signal">
            {selected.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <fieldset>
        <legend className="field-label">Which shop?</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {locations.map((l) => (
            <RadioTile
              key={l.slug}
              name="contact-location"
              value={l.slug}
              checked={loc === l.slug}
              onChange={(s) => {
                setLoc(s as LocationSlug);
                setShop(s as LocationSlug);
              }}
              className="items-stretch overflow-hidden"
            >
              <span className="relative w-24 shrink-0">
                <Image src={l.photo.src} alt="" fill sizes="96px" className="object-cover" style={{ objectPosition: l.photo.position }} />
              </span>
              <span className="block p-3.5 pr-10">
                <span className="display block text-[1.35rem]">
                  {l.slug === "ashland" ? "Ashland Hitch" : l.name}
                </span>
                <span className="block text-[14px] tabular-nums text-fog">{l.phone}</span>
                <span className="mt-1.5 block">
                  <StatusBadge variant="inline" showDetail={false} className="eyebrow !text-[10px] text-fog" />
                </span>
              </span>
            </RadioTile>
          ))}
        </div>
        {errors.location && <p className="field-error">{errors.location}</p>}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="ct-name" label="Name" error={errors.name} className="sm:col-span-2">
          <input id="ct-name" className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "ct-name-err" : undefined} />
        </Field>
        <Field id="ct-phone" label="Phone" error={errors.phone}>
          <input id="ct-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ct-phone-err" : undefined} />
        </Field>
        <Field id="ct-email" label="Email" error={errors.email}>
          <input id="ct-email" className="field" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "ct-email-err" : undefined} />
        </Field>
        <Field id="ct-message" label="How can we help?" error={errors.message} className="sm:col-span-2">
          <textarea id="ct-message" className="field" rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "ct-message-err" : undefined} />
        </Field>
      </div>
      <button type="submit" className="btn btn-ghost w-full sm:w-auto">
        Send message
      </button>
    </form>
  );
}
