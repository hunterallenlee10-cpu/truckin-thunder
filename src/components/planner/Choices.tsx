"use client";

import { Check } from "lucide-react";

/** Radio tile. Native input keeps arrow-key navigation and screen reader semantics. */
export function RadioTile({
  name,
  value,
  checked,
  onChange,
  children,
  className = "",
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`group relative flex cursor-pointer rounded-[4px] border bg-steel transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
        checked ? "border-signal bg-steel-2" : "border-hairline hover:border-chalk/30 hover:bg-steel-2"
      } ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {children}
      <span
        aria-hidden
        className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border transition-colors ${
          checked ? "border-signal bg-signal text-ink" : "border-chalk/30"
        }`}
      >
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
    </label>
  );
}

/** Multi-select chip (checkbox). */
export function Chip({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`inline-flex min-h-11 cursor-pointer select-none items-center gap-2.5 rounded-[4px] border px-3.5 py-2 text-[15px] transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
        checked ? "border-signal bg-signal/10 text-chalk" : "border-hairline bg-steel text-chalk/85 hover:border-chalk/30"
      }`}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      <span
        aria-hidden
        className={`grid size-4 shrink-0 place-items-center rounded-[2px] border ${
          checked ? "border-signal bg-signal text-ink" : "border-chalk/40"
        }`}
      >
        {checked && <Check size={11} strokeWidth={3} />}
      </span>
      {children}
    </label>
  );
}

/** Compact rectangular radio pills for short option lists. */
export function Segmented({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  legend: string;
  options: readonly string[] | { id: string; label: string }[];
  value?: string;
  onChange: (v: string) => void;
  error?: string | null;
}) {
  const opts = (options as Array<string | { id: string; label: string }>).map((o) =>
    typeof o === "string" ? { id: o, label: o } : o,
  );
  return (
    <fieldset>
      <legend className="field-label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => {
          const checked = value === o.id;
          return (
            <label
              key={o.id}
              className={`inline-flex min-h-11 cursor-pointer items-center rounded-[4px] border px-4 font-label text-[14px] font-semibold uppercase tracking-[0.08em] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-signal ${
                checked ? "border-signal bg-signal text-ink" : "border-hairline bg-steel text-chalk/85 hover:border-chalk/30"
              }`}
            >
              <input type="radio" name={name} value={o.id} checked={checked} onChange={() => onChange(o.id)} className="sr-only" />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && <p className="field-error">{error}</p>}
    </fieldset>
  );
}
