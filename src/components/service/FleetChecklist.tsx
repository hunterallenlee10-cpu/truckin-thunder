"use client";

import { Download } from "lucide-react";

const ITEMS = [
  "Number of vehicles, with year, make and model",
  "Sectors and crew roles each vehicle supports",
  "Standard package per role: storage, racks, bodies",
  "Safety lighting and marking requirements",
  "Power needs: inverters and mounted equipment",
  "Preferred shop and target in-service dates",
];

/** Front-end only: downloads the checklist as a text file. */
export function FleetChecklist() {
  const download = () => {
    const text = [
      "TRUCKIN THUNDER · FLEET MANAGER CHECKLIST",
      "Bring this to your fleet quote.",
      "",
      ...ITEMS.map((i) => `[ ] ${i}`),
      "",
      "Midlothian (804) 272-4321 · Broad Street (804) 747-4321",
      "Fredericksburg (540) 371-5600 · Ashland Hitch (804) 798-3071",
    ].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "truckin-thunder-fleet-checklist.txt" });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article className="relative overflow-hidden rounded-[4px] bg-white text-ink">
      <div className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
        <p className="display text-[1.6rem] leading-none">Fleet manager checklist</p>
        <span className="spec-tag text-ink-muted">TT-FLEET / CL</span>
      </div>
      <ul className="divide-y divide-ink/10 px-6">
        {ITEMS.map((i, n) => (
          <li key={i} className="flex items-start gap-3 py-3.5 text-[15px]">
            <span aria-hidden className="mt-[3px] size-4 shrink-0 border border-ink" />
            <span>
              <span className="eyebrow mr-2 !text-[10px] text-ink-muted">0{n + 1}</span>
              {i}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-ink/10 p-6">
        <button type="button" onClick={download} className="btn btn-ink w-full">
          <Download size={16} strokeWidth={1.5} aria-hidden /> Download checklist
        </button>
      </div>
    </article>
  );
}
