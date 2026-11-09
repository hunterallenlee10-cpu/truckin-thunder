"use client";

import Link from "next/link";
import { site } from "@/config/site";
import { useShopStatus } from "@/lib/useShopStatus";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

/** Slim desktop-only bar with live status in Eastern time. */
export function UtilityBar({ hidden }: { hidden: boolean }) {
  const status = useShopStatus();
  const dot = status === null ? "bg-fog" : status.isOpen ? "bg-open" : "bg-closed";
  const text =
    status === null
      ? "4 Virginia locations · Mon to Fri 8 to 5"
      : status.isOpen
        ? "Open now at all 4 Virginia locations · Mon to Fri 8 to 5"
        : `Closed now · ${status.detail} · Mon to Fri 8 to 5`;

  return (
    <div
      className={`hidden overflow-hidden border-b border-chalk/10 bg-asphalt/80 transition-[height,opacity] duration-300 lg:block ${
        hidden ? "h-0 opacity-0" : "h-9 opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="container-site flex h-9 items-center justify-between eyebrow !text-[11px] !tracking-[0.16em] text-fog">
        <p className="flex items-center gap-2.5" aria-live="polite">
          <span className={`size-1.5 rounded-full ${dot}`} />
          <span className="text-chalk/85" suppressHydrationWarning>
            {text}
          </span>
        </p>
        <div className="flex items-center gap-5">
          <span>Since 1978 · SEMA &amp; NTEA members</span>
          <span aria-hidden className="h-3 w-px bg-hairline" />
          <Link href="/careers" tabIndex={hidden ? -1 : undefined} className="hover:text-chalk">
            We&apos;re hiring techs
          </Link>
          <span aria-hidden className="h-3 w-px bg-hairline" />
          <a href={site.social.instagram} tabIndex={hidden ? -1 : undefined} aria-label="Truckin Thunder on Instagram" className="hover:text-chalk" rel="noopener" target="_blank">
            <InstagramIcon size={15} />
          </a>
          <a href={site.social.facebook} tabIndex={hidden ? -1 : undefined} aria-label="Truckin Thunder on Facebook" className="hover:text-chalk" rel="noopener" target="_blank">
            <FacebookIcon size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
