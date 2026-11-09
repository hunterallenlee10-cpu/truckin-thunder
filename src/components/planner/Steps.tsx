"use client";

import Image from "next/image";
import { useState } from "react";
import { LocateFixed, Loader2 } from "lucide-react";
import {
  fleetSectors,
  fleetSizes,
  groupsForVehicle,
  NOT_SURE,
  purposes,
  timelines,
  vehicles,
} from "@/data/planner";
import { HOURS, locations } from "@/data/locations";
import { getBrowserPosition, nearestLocation } from "@/lib/geo";
import { formatPhone } from "@/lib/validate";
import { usePlanner, type ContactInfo } from "@/components/providers/PlannerProvider";
import { useShop } from "@/components/providers/ShopProvider";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Chip, RadioTile, Segmented } from "./Choices";
import { VehicleIcon } from "./VehicleIcons";

export type StepErrors = Record<string, string | null | undefined>;

/* 1. What are we outfitting? */
export function StepVehicle({ errors }: { errors: StepErrors }) {
  const { state, update } = usePlanner();
  return (
    <fieldset>
      <legend className="sr-only">Vehicle type</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {vehicles.map((v, i) => (
          <RadioTile
            key={v.id}
            name="vehicle"
            value={v.id}
            checked={state.vehicle === v.id}
            onChange={(id) =>
              update({
                vehicle: id as typeof v.id,
                // Fleets default to the fleet purpose; changing vehicle clears upgrades that may not apply.
                purpose: id === "fleet" ? "fleet-gov" : state.purpose === "fleet-gov" && state.vehicle === "fleet" ? undefined : state.purpose,
                upgrades: id === state.vehicle ? state.upgrades : [],
              })
            }
            className={`flex-col p-4 pt-5 ${i === vehicles.length - 1 ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <VehicleIcon id={v.id} className={`h-14 w-full max-w-[150px] ${state.vehicle === v.id ? "text-signal" : "text-chalk/80"}`} />
            <span className="display mt-4 block text-[1.5rem]">{v.label}</span>
            <span className="mt-1 block text-[14px] text-fog">{v.hint}</span>
          </RadioTile>
        ))}
      </div>
      {errors.vehicle && <p className="field-error">{errors.vehicle}</p>}
    </fieldset>
  );
}

/* 2. What's it for? */
export function StepPurpose({ errors }: { errors: StepErrors }) {
  const { state, update } = usePlanner();
  const fleet = state.vehicle === "fleet";
  return (
    <div className="space-y-8">
      <fieldset>
        <legend className="sr-only">Purpose</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {purposes.map((p, i) => (
            <RadioTile
              key={p.id}
              name="purpose"
              value={p.id}
              checked={state.purpose === p.id}
              onChange={(id) => update({ purpose: id as typeof p.id })}
              className="min-h-[72px] items-center px-5 py-4 pr-12"
            >
              <span className="eyebrow mr-4 text-fog">0{i + 1}</span>
              <span className="font-label text-[17px] font-semibold uppercase tracking-[0.06em]">{p.label}</span>
            </RadioTile>
          ))}
        </div>
        {errors.purpose && <p className="field-error">{errors.purpose}</p>}
      </fieldset>

      {fleet && (
        <div className="space-y-6 rounded-[4px] border border-hairline bg-steel/60 p-5">
          <p className="eyebrow text-thunder-bright">Fleet details</p>
          <Segmented
            name="fleetSize"
            legend="How many vehicles?"
            options={fleetSizes}
            value={state.fleetSize}
            onChange={(v) => update({ fleetSize: v })}
            error={errors.fleetSize}
          />
          <Segmented
            name="sector"
            legend="Sector"
            options={fleetSectors}
            value={state.sector}
            onChange={(v) => update({ sector: v })}
            error={errors.sector}
          />
        </div>
      )}
    </div>
  );
}

/* 3. Pick your upgrades. */
export function StepUpgrades({ errors }: { errors: StepErrors }) {
  const { state, update } = usePlanner();
  const groups = groupsForVehicle(state.vehicle);
  const toggle = (id: string, on: boolean) => {
    const set = new Set(state.upgrades);
    if (on) set.add(id);
    else set.delete(id);
    update({ upgrades: Array.from(set) });
  };
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-fog">
          Showing upgrades for{" "}
          <strong className="font-semibold text-chalk">
            {vehicles.find((v) => v.id === state.vehicle)?.label ?? "any vehicle"}
          </strong>
          . Pick as many as you like.
        </p>
        <span className="eyebrow text-fog" aria-live="polite">
          {state.upgrades.length} selected
        </span>
      </div>
      {groups.map((g) => (
        <fieldset key={g.id}>
          <legend className="eyebrow mb-3 text-fog">{g.label}</legend>
          <div className="flex flex-wrap gap-2">
            {g.items.map((it) => (
              <Chip key={it.id} checked={state.upgrades.includes(it.id)} onChange={(on) => toggle(it.id, on)}>
                {it.label}
              </Chip>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="border-t border-hairline pt-6">
        <Chip checked={state.upgrades.includes(NOT_SURE.id)} onChange={(on) => toggle(NOT_SURE.id, on)}>
          {NOT_SURE.label}
        </Chip>
      </div>
      {errors.upgrades && <p className="field-error">{errors.upgrades}</p>}
    </div>
  );
}

/* 4. Where and when? */
export function StepWhere({ errors }: { errors: StepErrors }) {
  const { state, update } = usePlanner();
  const { setShop } = useShop();
  const [geo, setGeo] = useState<{ status: "idle" | "busy" | "done" | "error"; msg?: string }>({ status: "idle" });

  const useMyLocation = async () => {
    setGeo({ status: "busy" });
    try {
      const pos = await getBrowserPosition();
      const { location, miles } = nearestLocation(pos);
      update({ location: location.slug });
      setShop(location.slug);
      setGeo({ status: "done", msg: `${location.tradingName} is closest, about ${miles.toFixed(0)} miles away.` });
    } catch (e) {
      setGeo({ status: "error", msg: (e as Error).message });
    }
  };

  return (
    <div className="space-y-8">
      <fieldset>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <legend className="field-label !mb-0">Preferred location</legend>
          <button type="button" onClick={useMyLocation} className="btn btn-ghost btn-sm" disabled={geo.status === "busy"}>
            {geo.status === "busy" ? <Loader2 size={15} className="animate-spin" aria-hidden /> : <LocateFixed size={15} strokeWidth={1.5} aria-hidden />}
            Use my location
          </button>
        </div>
        <p className="mb-3 min-h-5 text-[14px] text-fog" aria-live="polite">
          {geo.msg}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {locations.map((l) => (
            <RadioTile
              key={l.slug}
              name="location"
              value={l.slug}
              checked={state.location === l.slug}
              onChange={(slug) => {
                update({ location: slug as typeof l.slug });
                setShop(slug as typeof l.slug);
              }}
              className="items-stretch overflow-hidden"
            >
              <span className="relative w-24 shrink-0 sm:w-28">
                <Image src={l.photo.src} alt="" fill sizes="112px" className="object-cover" style={{ objectPosition: l.photo.position }} />
              </span>
              <span className="block p-3.5 pr-10">
                <span className="display block text-[1.35rem]">{l.slug === "ashland" ? "Ashland Hitch" : l.name}</span>
                <span className="mt-0.5 block text-[13px] text-fog">
                  {l.street}, {l.city}
                </span>
                <span className="mt-2 block">
                  <StatusBadge variant="inline" showDetail={false} className="eyebrow !text-[10px] text-fog" />
                </span>
              </span>
            </RadioTile>
          ))}
        </div>
        <p className="mt-2 text-[13px] text-fog">
          All locations: {HOURS.days}, {HOURS.open} to {HOURS.close}.
        </p>
        {errors.location && <p className="field-error">{errors.location}</p>}
      </fieldset>

      <Segmented
        name="timeline"
        legend="Timeline"
        options={timelines as unknown as { id: string; label: string }[]}
        value={state.timeline}
        onChange={(v) => update({ timeline: v })}
        error={errors.timeline}
      />
    </div>
  );
}

/* 5. Your info. */
export function StepInfo({ errors }: { errors: StepErrors }) {
  const { state, update } = usePlanner();
  const c = state.contact;
  const set = (patch: Partial<ContactInfo>) => update({ contact: { ...c, ...patch } });
  const showCompany = state.vehicle === "fleet" || state.purpose === "fleet-gov" || state.purpose === "trade";

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="pl-name" label="Full name" error={errors.name} className="sm:col-span-2">
        <input id="pl-name" className="field" autoComplete="name" value={c.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "pl-name-err" : undefined} required />
      </Field>
      <Field id="pl-phone" label="Phone" error={errors.phone}>
        <input id="pl-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="(804) 555-0123" value={c.phone} onChange={(e) => set({ phone: formatPhone(e.target.value) })} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "pl-phone-err" : undefined} required />
      </Field>
      <Field id="pl-email" label="Email" error={errors.email}>
        <input id="pl-email" className="field" type="email" inputMode="email" autoComplete="email" value={c.email} onChange={(e) => set({ email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "pl-email-err" : undefined} required />
      </Field>
      {showCompany && (
        <Field id="pl-company" label="Company or agency" optional className="sm:col-span-2">
          <input id="pl-company" className="field" autoComplete="organization" value={c.company} onChange={(e) => set({ company: e.target.value })} />
        </Field>
      )}
      <fieldset className="grid grid-cols-[1fr_1.4fr_1.4fr] gap-3 sm:col-span-2">
        <legend className="field-label">
          Vehicle <span className="normal-case tracking-normal text-fog">(optional)</span>
        </legend>
        <div>
          <label htmlFor="pl-year" className="sr-only">Year</label>
          <input id="pl-year" className="field" inputMode="numeric" maxLength={4} placeholder="Year" value={c.year} onChange={(e) => set({ year: e.target.value.replace(/\D/g, "") })} aria-invalid={!!errors.year} aria-describedby={errors.year ? "pl-year-err" : undefined} />
        </div>
        <div>
          <label htmlFor="pl-make" className="sr-only">Make</label>
          <input id="pl-make" className="field" placeholder="Make" autoComplete="off" value={c.make} onChange={(e) => set({ make: e.target.value })} />
        </div>
        <div>
          <label htmlFor="pl-model" className="sr-only">Model</label>
          <input id="pl-model" className="field" placeholder="Model" autoComplete="off" value={c.model} onChange={(e) => set({ model: e.target.value })} />
        </div>
        {errors.year && (
          <p id="pl-year-err" className="field-error col-span-3">
            {errors.year}
          </p>
        )}
      </fieldset>
      <Field id="pl-notes" label="Notes" optional className="sm:col-span-2">
        <textarea id="pl-notes" className="field" rows={4} placeholder="Anything we should know? Trade, equipment, deadlines." value={c.notes} onChange={(e) => set({ notes: e.target.value })} />
      </Field>
    </div>
  );
}

export function Field({
  id,
  label,
  error,
  optional,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string | null;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="normal-case tracking-normal text-fog">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
