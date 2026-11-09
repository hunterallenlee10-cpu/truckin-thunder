"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Phone, Printer, RotateCcw, Send } from "lucide-react";
import { logos } from "@/data/images";
import { fleetSizes, purposes, timelines, upgradeLabel, vehicles } from "@/data/planner";
import { fullAddress, getLocation, HOURS, telHref } from "@/data/locations";
import { usePlanner, type PlannerState } from "@/components/providers/PlannerProvider";

const label = <T extends { id: string; label: string }>(list: readonly T[], id?: string) =>
  list.find((x) => x.id === id)?.label ?? "Not specified";

/** The printable work order. Light "paper" styling on screen and in print. */
export function SheetDocument({ state }: { state: PlannerState }) {
  const loc = state.location ? getLocation(state.location) : undefined;
  const c = state.contact;
  const vehicleLine = [c.year, c.make, c.model].filter(Boolean).join(" ");
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <article className="build-sheet relative rounded-[4px] bg-white text-ink shadow-[0_1px_0_rgb(0_0_0/0.04)] print:rounded-none print:shadow-none">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink p-5 sm:p-7">
        <Image src={logos.light} alt="Truckin Thunder Accessories" sizes="150px" className="h-auto w-[130px] sm:w-[150px]" />
        <div className="text-right">
          <p className="display text-[1.9rem] leading-none sm:text-[2.4rem]">Build Sheet</p>
          <p className="eyebrow mt-2 !text-[11px] text-ink-muted">Work order request</p>
        </div>
      </header>

      <dl className="grid grid-cols-2 border-b border-ink/15 sm:grid-cols-3">
        <Cell label="Build no." value={<span className="font-label text-[18px] font-semibold tabular-nums tracking-[0.06em]">{state.buildNumber}</span>} />
        <Cell label="Date" value={date} />
        <Cell label="Timeline" value={label(timelines as unknown as { id: string; label: string }[], state.timeline)} className="col-span-2 sm:col-span-1" />
      </dl>

      <div className="grid sm:grid-cols-2">
        <section className="border-b border-ink/15 p-5 sm:border-r sm:p-6">
          <h3 className="eyebrow !text-[11px] text-ink-muted">01 · Vehicle</h3>
          <p className="display mt-2 text-[1.6rem]">{label(vehicles, state.vehicle)}</p>
          {vehicleLine && <p className="mt-1 text-[15px]">{vehicleLine}</p>}
          <h3 className="eyebrow mt-5 !text-[11px] text-ink-muted">02 · Purpose</h3>
          <p className="mt-1 text-[16px] font-medium">{label(purposes, state.purpose)}</p>
          {state.vehicle === "fleet" && (
            <p className="mt-1 text-[15px] text-ink-muted">
              {state.fleetSize && fleetSizes.includes(state.fleetSize as (typeof fleetSizes)[number]) ? `${state.fleetSize} vehicles` : ""}
              {state.sector ? ` · ${state.sector}` : ""}
            </p>
          )}
        </section>

        <section className="border-b border-ink/15 p-5 sm:p-6">
          <h3 className="eyebrow !text-[11px] text-ink-muted">04 · Shop</h3>
          {loc ? (
            <>
              <p className="display mt-2 text-[1.6rem]">{loc.tradingName}</p>
              <p className="mt-1 text-[15px]">{fullAddress(loc)}</p>
              <p className="mt-1 text-[15px] tabular-nums">
                {loc.phone} · {loc.email}
              </p>
              <p className="mt-1 text-[13px] text-ink-muted">
                {HOURS.days}, {HOURS.open} to {HOURS.close}
              </p>
            </>
          ) : (
            <p className="mt-2">Not specified</p>
          )}
        </section>
      </div>

      <section className="border-b border-ink/15 p-5 sm:p-6">
        <h3 className="eyebrow !text-[11px] text-ink-muted">03 · Upgrades requested</h3>
        <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {state.upgrades.map((id) => (
            <li key={id} className="flex items-start gap-2.5 text-[15px]">
              <span aria-hidden className="mt-[3px] grid size-4 shrink-0 place-items-center border border-ink">
                <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.5 6.5l2.2 2L9.5 3.5" />
                </svg>
              </span>
              {upgradeLabel(id)}
            </li>
          ))}
        </ul>
      </section>

      <section className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
        <div>
          <h3 className="eyebrow !text-[11px] text-ink-muted">Customer</h3>
          <p className="mt-1 text-[15px] font-medium">{c.name}</p>
          {c.company && <p className="text-[14px] text-ink-muted">{c.company}</p>}
        </div>
        <div>
          <h3 className="eyebrow !text-[11px] text-ink-muted">Phone</h3>
          <p className="mt-1 text-[15px] tabular-nums">{c.phone}</p>
        </div>
        <div className="min-w-0">
          <h3 className="eyebrow !text-[11px] text-ink-muted">Email</h3>
          <p className="mt-1 break-all text-[15px]">{c.email}</p>
        </div>
        {c.notes && (
          <div className="sm:col-span-3">
            <h3 className="eyebrow !text-[11px] text-ink-muted">Notes</h3>
            <p className="mt-1 whitespace-pre-line text-[15px]">{c.notes}</p>
          </div>
        )}
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink px-5 py-3 sm:px-6">
        <p className="eyebrow !text-[10px] text-ink-muted">Truckin Thunder Accessories · Since 1978 · SEMA &amp; NTEA members</p>
        <p className="eyebrow !text-[10px] text-ink-muted">Installed in our shop</p>
      </footer>
    </article>
  );
}

function Cell({ label, value, className = "" }: { label: string; value: React.ReactNode; className?: string }) {
  return (
    <div className={`border-r border-ink/15 px-5 py-3.5 last:border-r-0 sm:px-6 ${className}`}>
      <dt className="eyebrow !text-[10px] text-ink-muted">{label}</dt>
      <dd className="mt-1 text-[15px]">{value}</dd>
    </div>
  );
}

/** Result screen: the sheet plus Send, Print and Call. */
export function BuildSheetView() {
  const { state, update, reset } = usePlanner();
  const loc = state.location ? getLocation(state.location) : undefined;
  const [sending, setSending] = useState(false);
  const [printRoot, setPrintRoot] = useState<HTMLElement | null>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Bring the confirmation into view once the build is sent.
  useEffect(() => {
    if (!state.submitted) return;
    confirmRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    confirmRef.current?.focus({ preventScroll: true });
  }, [state.submitted]);

  // A copy of the sheet lives outside the dialog so print CSS can show only it.
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "print-root";
    document.body.appendChild(el);
    setPrintRoot(el);
    const after = () => document.body.classList.remove("printing-sheet");
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("afterprint", after);
      el.remove();
    };
  }, []);

  const print = () => {
    document.body.classList.add("printing-sheet");
    window.print();
  };

  const send = async () => {
    setSending(true);
    // TODO: POST to n8n webhook
    // await fetch(process.env.NEXT_PUBLIC_BUILD_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(state),
    // });
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    update({ submitted: true });
  };

  return (
    <div>
      {state.submitted ? (
        <div ref={confirmRef} tabIndex={-1} className="mb-6 scroll-mt-4 rounded-[4px] border border-open/40 bg-open/10 p-5 outline-none" role="status">
          <p className="flex items-center gap-2.5 font-label text-[17px] font-semibold uppercase tracking-[0.06em]">
            <CheckCircle2 size={20} className="text-open" aria-hidden /> Sent
          </p>
          <p className="mt-2 text-[16px] text-chalk/90">
            Your build sheet is in. The {loc?.name ?? "Truckin Thunder"} team will call you within one business day.{" "}
            <span className="placeholder-pill ml-1 align-middle text-fog">[CONFIRM RESPONSE TIME]</span>
          </p>
        </div>
      ) : (
        <p className="mb-6 text-[16px] text-fog">
          Review your build. Send it to the {loc?.name ?? "shop"} team, or save a copy for your records.
        </p>
      )}

      <SheetDocument state={state} />

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {!state.submitted ? (
          <button type="button" onClick={send} disabled={sending} className="btn btn-signal sm:col-span-3">
            <Send size={16} strokeWidth={1.75} aria-hidden /> {sending ? "Sending..." : "Send My Build"}
          </button>
        ) : (
          <button type="button" onClick={reset} className="btn btn-ghost sm:col-span-3">
            <RotateCcw size={16} strokeWidth={1.5} aria-hidden /> Start another build
          </button>
        )}
        <button type="button" onClick={print} className="btn btn-ghost sm:col-span-1">
          <Printer size={16} strokeWidth={1.5} aria-hidden /> Print / Save PDF
        </button>
        {loc && (
          <a href={telHref(loc.phone)} className="btn btn-ghost sm:col-span-2">
            <Phone size={16} strokeWidth={1.5} aria-hidden /> Call {loc.name} now
          </a>
        )}
      </div>

      {printRoot && createPortal(<SheetDocument state={state} />, printRoot)}
    </div>
  );
}
