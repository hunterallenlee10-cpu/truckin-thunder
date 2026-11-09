"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { locations } from "@/data/locations";
import { formatPhone, validateEmail, validateName, validatePhone } from "@/lib/validate";
import { Field } from "@/components/planner/Steps";

const EXPERIENCE = ["No experience yet", "Less than 1 year", "1 to 3 years", "3 to 5 years", "5+ years"];

/** Front-end technician application with inline validation. */
export function ApplicationForm() {
  const [v, setV] = useState({ name: "", phone: "", email: "", location: "", experience: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const set = (k: keyof typeof v, val: string) => setV((s) => ({ ...s, [k]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = {
      name: validateName(v.name),
      phone: validatePhone(v.phone),
      email: validateEmail(v.email),
      location: v.location ? null : "Pick the shop you'd like to work at.",
      experience: v.experience ? null : "Tell us roughly how much experience you have.",
    };
    setErrors(errs);
    const first = Object.entries(errs).find(([, m]) => m);
    if (first) {
      document.getElementById(`ap-${first[0]}`)?.focus();
      return;
    }
    setState("sending");
    // TODO: POST to n8n webhook
    await new Promise((r) => setTimeout(r, 700));
    setState("sent");
  };

  if (state === "sent") {
    return (
      <div className="rounded-[4px] border border-open/40 bg-open/10 p-8" role="status">
        <CheckCircle2 size={28} className="text-open" aria-hidden />
        <p className="display mt-4 text-[2rem]">Application received.</p>
        <p className="mt-3 text-[17px] text-chalk/85">
          Thanks, {v.name.split(" ")[0]}. The {locations.find((l) => l.slug === v.location)?.name} team will be in touch.{" "}
          <span className="placeholder-pill text-fog">[CONFIRM RESPONSE TIME]</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="ap-name" label="Full name" error={errors.name} className="sm:col-span-2">
        <input id="ap-name" className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "ap-name-err" : undefined} />
      </Field>
      <Field id="ap-phone" label="Phone" error={errors.phone}>
        <input id="ap-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ap-phone-err" : undefined} />
      </Field>
      <Field id="ap-email" label="Email" error={errors.email}>
        <input id="ap-email" className="field" type="email" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "ap-email-err" : undefined} />
      </Field>
      <Field id="ap-location" label="Preferred location" error={errors.location}>
        <select id="ap-location" className="field" value={v.location} onChange={(e) => set("location", e.target.value)} aria-invalid={!!errors.location} aria-describedby={errors.location ? "ap-location-err" : undefined}>
          <option value="">Choose a shop</option>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.slug === "ashland" ? "Ashland Hitch" : l.name}
            </option>
          ))}
        </select>
      </Field>
      <Field id="ap-experience" label="Experience" error={errors.experience}>
        <select id="ap-experience" className="field" value={v.experience} onChange={(e) => set("experience", e.target.value)} aria-invalid={!!errors.experience} aria-describedby={errors.experience ? "ap-experience-err" : undefined}>
          <option value="">Choose one</option>
          {EXPERIENCE.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field id="ap-message" label="Anything else?" optional className="sm:col-span-2">
        <textarea id="ap-message" className="field" rows={4} placeholder="Certifications, trucks you've worked on, when you can start." value={v.message} onChange={(e) => set("message", e.target.value)} />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-signal w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? "Sending..." : "Apply now"}
        </button>
      </div>
    </form>
  );
}
