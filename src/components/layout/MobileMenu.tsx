"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight, Phone, X } from "lucide-react";
import { nav } from "@/config/site";
import { logos } from "@/data/images";
import { locations, telHref } from "@/data/locations";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { StatusBadge } from "@/components/ui/StatusBadge";

/** Full-screen mobile menu. Focus trapped, Escape closes. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(ref, open, onClose, closeRef);

  if (!open) return null;

  return (
    <div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-50 flex flex-col bg-asphalt nav:hidden"
    >
      <div className="container-site flex h-[68px] shrink-0 items-center justify-between border-b border-hairline">
        <Link href="/" onClick={onClose} aria-label="Truckin Thunder home">
          <Image src={logos.dark} alt="Truckin Thunder Accessories" sizes="112px" className="h-auto w-[112px]" />
        </Link>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="grid size-11 place-items-center rounded-[4px] border border-chalk/25"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} aria-hidden />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav aria-label="Mobile" className="container-site pt-4">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} className="border-b border-hairline">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-[60px] items-center justify-between py-2"
                >
                  <span className="display text-[2.4rem]">{item.label}</span>
                  <span className="eyebrow text-fog">0{i + 1}</span>
                </Link>
              </li>
            ))}
            <li className="border-b border-hairline">
              <Link href="/careers" onClick={onClose} className="flex min-h-[60px] items-center justify-between py-2">
                <span className="display text-[2.4rem]">Careers</span>
                <span className="spec-tag text-thunder-bright">Hiring</span>
              </Link>
            </li>
            <li className="border-b border-hairline">
              <Link href="/contact" onClick={onClose} className="flex min-h-[60px] items-center justify-between py-2">
                <span className="display text-[2.4rem]">Contact</span>
              </Link>
            </li>
          </ul>
        </nav>

        <section aria-label="Call a location" className="container-site py-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="eyebrow text-fog">Tap to call</p>
            <StatusBadge variant="inline" showDetail={false} className="eyebrow !text-[11px] text-fog" />
          </div>
          <ul className="grid grid-cols-1 gap-2 xs:grid-cols-2">
            {locations.map((l) => (
              <li key={l.slug}>
                <a
                  href={telHref(l.phone)}
                  className="flex min-h-[64px] items-center justify-between gap-3 rounded-[4px] border border-hairline bg-steel px-4 py-3"
                >
                  <span>
                    <span className="block font-label text-[13px] font-semibold uppercase tracking-[0.12em] text-fog">
                      {l.tradingName === "Ashland Hitch" ? "Ashland Hitch" : l.name}
                    </span>
                    <span className="block font-label text-[17px] font-semibold tabular-nums">{l.phone}</span>
                  </span>
                  <Phone size={18} strokeWidth={1.5} className="text-thunder-bright" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <Link href="/locations" onClick={onClose} className="link-arrow mt-4 text-fog">
            All locations and hours <ArrowUpRight size={16} aria-hidden />
          </Link>
        </section>
      </div>

      <div className="shrink-0 border-t border-hairline bg-steel p-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <StartBuildButton className="w-full" />
      </div>
    </div>
  );
}
