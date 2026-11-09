"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Phone } from "lucide-react";
import { nav, site } from "@/config/site";
import { logos } from "@/data/images";
import { telHref } from "@/data/locations";
import { useShop } from "@/components/providers/ShopProvider";
import { StartBuildButton } from "@/components/ui/StartBuildButton";
import { UtilityBar } from "./UtilityBar";
import { MobileMenu } from "./MobileMenu";

/**
 * Sticky header. Transparent over the hero, then asphalt at 92% with a
 * backdrop blur after 80px of scroll. The desktop utility bar folds away.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { shop } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Return focus to the button that opened the menu.
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 print:hidden">
        <UtilityBar hidden={scrolled} />
        <div
          className={`relative transition-[background-color,border-color] duration-300 ${
            solid ? "border-b border-hairline bg-asphalt/92 backdrop-blur-md" : "border-b border-transparent"
          }`}
        >
          {/* Soft top scrim keeps the transparent nav legible on bright photos. */}
          {!solid && (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[170%] bg-gradient-to-b from-asphalt/80 via-asphalt/40 to-transparent" />
          )}
          <div className="container-site relative flex h-[68px] items-center gap-6 nav:h-[84px]">
            <Link href="/" className="relative -my-2 shrink-0" aria-label={`${site.shortName} home`}>
              <Image
                src={logos.dark}
                alt="Truckin Thunder Accessories"
                priority
                sizes="(min-width: 1248px) 150px, 112px"
                className={`h-auto transition-[width] duration-300 ${scrolled ? "w-[112px] nav:w-[128px]" : "w-[112px] nav:w-[150px]"}`}
              />
            </Link>

            <nav aria-label="Main" className="hidden nav:block">
              <ul className="flex items-center gap-1">
                {nav.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative inline-flex min-h-11 items-center px-2.5 font-label text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-chalk ${
                          active ? "text-chalk" : "text-chalk/75"
                        }`}
                      >
                        {item.label}
                        {active && <span aria-hidden className="absolute inset-x-2.5 bottom-1.5 h-px bg-signal" />}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/careers"
                    className="ml-1 inline-flex min-h-11 items-center"
                    aria-current={pathname === "/careers" ? "page" : undefined}
                  >
                    <span className="spec-tag !border-thunder-bright text-thunder-bright transition-colors hover:bg-thunder-bright hover:text-asphalt">
                      Hiring
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="ml-auto flex items-center gap-2 nav:gap-5">
              <a
                href={telHref(shop.phone)}
                className="group hidden flex-col items-end leading-none nav:flex"
                aria-label={`Call ${shop.name} at ${shop.phone}`}
              >
                <span className="eyebrow !text-[11px] text-fog">Call {shop.name}</span>
                <span className="mt-1.5 font-label text-[17px] font-semibold tracking-[0.04em] tabular-nums text-chalk group-hover:text-signal">
                  {shop.phone}
                </span>
              </a>
              <StartBuildButton size="sm" className="hidden sm:inline-flex nav:min-h-[48px] nav:px-5 nav:text-[14px]" />
              <a
                href={telHref(shop.phone)}
                className="grid size-11 place-items-center rounded-[4px] border border-chalk/25 nav:hidden"
                aria-label={`Call ${shop.name} at ${shop.phone}`}
              >
                <Phone size={18} strokeWidth={1.5} aria-hidden />
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                className="grid size-11 place-items-center rounded-[4px] border border-chalk/25 nav:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
