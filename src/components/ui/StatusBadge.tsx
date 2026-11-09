"use client";

import { useShopStatus } from "@/lib/useShopStatus";

type Props = {
  /** "badge" = pill with dot. "inline" = dot plus text. */
  variant?: "badge" | "inline";
  tone?: "dark" | "light";
  showDetail?: boolean;
  className?: string;
};

/** Live open / closed status in Eastern time. All shops share hours. */
export function StatusBadge({ variant = "badge", tone = "dark", showDetail = true, className = "" }: Props) {
  const status = useShopStatus();
  const open = status?.isOpen;
  const dot = status === null ? "bg-fog" : open ? "bg-open" : "bg-closed";
  const text = status === null ? "Mon to Fri 8 to 5" : showDetail ? status.label : status.badge;

  const base =
    variant === "badge"
      ? `inline-flex items-center gap-2 rounded-[2px] px-2.5 py-1 eyebrow !text-[11px] ${
          tone === "dark" ? "bg-asphalt/80 text-chalk ring-1 ring-hairline" : "bg-white text-ink ring-1 ring-ink/10"
        }`
      : "inline-flex items-center gap-2";

  return (
    <span className={`${base} ${className}`} aria-live="polite">
      <span className="relative flex size-2">
        {open && (
          <span className={`absolute inset-0 animate-ping rounded-full ${dot} opacity-60 motion-reduce:hidden`} />
        )}
        <span className={`relative size-2 rounded-full ${dot}`} />
      </span>
      <span suppressHydrationWarning>{text}</span>
    </span>
  );
}
