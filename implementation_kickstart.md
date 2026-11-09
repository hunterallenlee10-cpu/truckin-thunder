# Truckin Thunder Concept: Implementation Kickstart

Concept website for Truckin Thunder Accessories. Front end only. Next.js 15 App Router, TypeScript, Tailwind v4, `motion`, `lucide-react`, `next/font` (Barlow superfamily only).

## 1. Image notes (every asset studied before design)

Coordinates are approximate % of width / height.

### Brand
- `brand/tt-logo-transparent-for-DARK-backgrounds.png` 978x478 RGBA. Blue "TRUCKIN" banner, arched blue "THUNDER", white outline, light "ACCESSORIES". Primary nav and footer logo on asphalt.
- `brand/tt-logo-transparent-for-LIGHT-backgrounds.png` 978x478 RGBA. Same, black outline and text. Build Sheet (paper), OG image, print.
- `brand/tt-logo-cropped-no-border.png` 978x478 RGB on white. Favicon source.
- `brand/tt-logo-original.jpg` 1026x526, thin black border on white. Fallback only, never above 260px.

### Hero
- `hero/hero-fleet-lot-capped-colorados-two-men-walking.jpg` 2400x1601. Lot of white Colorados with work caps across the top 35%; two men walk at x 52 to 68, y 15 to 40. Bottom 60% is empty cracked asphalt, perfect quiet area for type. WORK hero panel: anchor `object-position: 60% 20%`.
- `hero/hero-lifted-blue-f150-on-black-wheels.jpg` 1800x1200. Bright blue lifted F-150 FX4, three quarter front, truck spans x 13 to 85, y 24 to 76. Cornfield and treeline behind, grass and gravel in front. PLAY panel: `object-position: 45% 55%`.
- `hero/hero-offroad-raptor-dust-climb.jpg` 2400x1027 (very wide). Dark gray Ranger Raptor climbing left to right, nose at x 25, dust trail at right. Off-road page hero. Text sits bottom left over darkened gravel or at right over dust with scrim.
- `hero/fleet-ford-superduty-lineup-LOWRES.jpg` 640x328. Row of white Super Duty trucks in front of a gray warehouse. Small card only, max 420px.

### Vans
- `vans/van-interior-express-hvac-shelving-yellow-step.jpg` 2400x1600. Rear view into a Chevy Express. Hotspots (x%, y%):
  1. Shelving and bins: left gray shelving unit with caulk tubes and red bins, (27, 40).
  2. Cylinder and tank racks: yellow refrigerant cylinders on right rack, (72, 62).
  3. Safety step and rear protection: yellow rear step, (52, 91).
  4. Interior lighting and power: ceiling LED strip, (50, 17).
  5. Partition and cargo control: black bulkhead partition with window and Adrian Steel tray, (49, 46).
- `vans/van-interior-transit-shelving-snow-yellow-step.jpg` 2400x1600. Transit rear doors open in snow, long shelving run, yellow grab handles, yellow step, orange cone. Commercial page story.
- `vans/van-sprinter-ladder-rack-shelving-lifestyle.jpg` 1920x1080. Gray Sprinter, orange ladder on roof rack, side door open showing shelving; Ranger Design branded Transit nose cropped at left. Commercial hero: `object-position: 65% 50%`.
- `vans/van-transit-rear-shelving-studio-white-A.jpg` 2400x2000. White Transit, rear doors open, shelving with yellow chevron end panels, gas cylinder. Pure white studio background. Product card on white.
- `vans/van-transit-rear-shelving-studio-white-B.jpg` 2400x2000. Same style, other angle, wire spools and hard hat. Product card on white.

### Beds
- `beds/truck-cap-silverado-ladder-rack-showroom.jpg` 2400x1548. White Silverado with commercial cap and ladder rack in a bright showroom. Caps and racks.
- `beds/service-body-ford-superduty-white.jpg` 1280x884. Super Duty with white CM service body, rear three quarter, blue sky. Medium sizes only (max about 760px).
- `beds/flatbed-cm-rd-black-rear-lights.jpg` 1600x1067. Low close angle on a black CM flatbed: oval LED tail lights, CM TRUCK BEDS logo at (54, 78). Moody. Truck Beds hero and bento tile.

### Locations
- `locations/location-midlothian-8241-midlothian-tpke.jpg` 2048x1536. Blue metal facade with round Truckin Thunder sign, glass sunroom with OPEN sign, sun flare top left. Building occupies y 35 to 62. Use `object-position: 50% 48%`.
- `locations/location-broad-street-7903-w-broad-st.jpg` 859x428. Low res. Two story block building with blue hip roof, pylon sign "804 747 4321". Small card only.
- `locations/location-fredericksburg-6-commerce-pkwy.jpg` 923x468. Low res. Long low block building with big blue sign under a gable, lawn in front. Small card only, `object-position: 50% 30%`.
- `locations/location-ashland-hitch-12289-washington-hwy.jpg` 2400x1800. Tall silver metal building with red "ASHLAND HITCH" sign, white roll-up door, white Tacoma at right.

### Team
- `team/tech-installing-under-service-truck.jpg` 2400x1800. Real tech on a creeper under a service body truck rear, drill on toolbox, cable ties on floor. Face at (35, 48). Install section and Careers. `object-position: 40% 45%`.

### Partners (mixed backgrounds, all placed in uniform white tiles)
Adrian Steel (dark navy bg jpg, very wide), Buyers Products (orange bg), B&W (white bg), CM Truck Beds (transparent, tiny 200px), CURT (transparent), DECKED (transparent), Holman (transparent), Homesteader (transparent, round), Legend (transparent), Ranger Design (transparent), RealTruck / A.R.E. (transparent, 393x33 extremely wide), Samlex (transparent, wide), SpitzLift (transparent), Tommy Gate (white bg square), UWS (transparent), Weather Guard (white bg).

## 2. Design tokens

| Token | Hex | Role |
|---|---|---|
| asphalt | #0E1114 | Main dark bg |
| steel | #161B20 | Raised surfaces |
| steel-2 | #1E252C | Hover, inputs |
| hairline | #2A3138 | 1px borders |
| chalk | #ECEEF0 | Text on dark |
| fog | #9AA4AE | Muted on dark |
| concrete | #F2F2EF | Light sections |
| ink | #111417 | Text on light |
| thunder-blue | #126B93 | Brand blue (on light) |
| thunder-blue-bright | #2A93C6 | Brand blue on dark |
| signal | #FFC700 | The only action color |

Type: Barlow Condensed 700/800 display (uppercase, -0.01em, lh 0.9), Barlow 400/500/600 body (17 to 18px, lh 1.6), Barlow Semi Condensed 600 eyebrows (0.14em, 12 to 13px). Fluid `clamp()` scale. Radius 4px cards/buttons, 2px tags. 8px grid. Sections 120 to 160px desktop, 72 to 88px mobile. Max content 1280px.

Signature language: spec-sheet labels (`TT-UPFIT / 04`), corner tick marks on key images, hazard stripe (max 3 on home), huge outlined section numerals, 2.5% film grain, hairline blueprint grid.

Motion: only two signature moments on home (split hero, upfit anatomy). Everything else a single reveal (16px rise, 600ms, `cubic-bezier(0.22,1,0.36,1)`, 60ms stagger). Count-up on 1978 only. Reduced motion respected everywhere.

## 3. Sitemap

`/`, `/fleet-government`, `/commercial-vans-trucks`, `/offroad`, `/truck-beds-service-bodies`, `/locations`, `/locations/[midlothian|broad-street|fredericksburg|ashland]`, `/about`, `/careers`, `/contact`, custom 404. Plus `sitemap.xml`, `robots.txt`, OG image, icons.

## 4. Architecture

```
src/
  config/site.ts            IS_CONCEPT flag, URLs, socials
  data/                     locations, services, reviews, brands, timeline, planner, faqs
  lib/hours.ts (+ test)     live open/closed in America/New_York
  lib/geo.ts                haversine nearest shop
  lib/seo.ts                metadata + JSON-LD builders
  components/layout/        UtilityBar, Nav, MobileMenu, Footer
  components/ui/            Button, Eyebrow, Reveal, HazardStripe, CornerTicks, StatusBadge, Container
  components/planner/       PlannerProvider, BuildPlanner, steps, BuildSheet, VehicleIcons
  components/home/          one file per home section
  components/service/       shared service page sections
  components/location/      location card, map, location page parts
  app/                      routes
```

State: `PlannerProvider` (open state, preset, persisted answers in sessionStorage, `?build=` deep link) and `ShopProvider` (preferred location, persisted in localStorage, drives nav phone).

## 5. Section content plan (home)

1. Split hero WORK / PLAY, H1 "Built for the job site. Ready for the trail." (TRAIL in yellow), trust strip.
2. Choose your path bento: Fleet, Commercial, Off-Road, Truck Beds.
3. Anatomy of an Upfit (concrete): pinned Express interior, 5 hotspots.
4. Fleet band (dark, blueprint grid): sectors, why, packages, fleet CTA.
5. Installation promise: tech photo, "Bought your parts online? Bring them in."
6. Reviews: 1 featured + 3, `[GOOGLE RATING]` placeholder.
7. Brands we install: 16 white tiles.
8. Since 1978: outlined count-up year, mini timeline.
9. Locations: SVG corridor map + 4 cards, use my location.
10. Final CTA band with hazard stripe.
11. Footer.

## 6. Phased checklist

- [x] Phase 0: Plan (this file), assets downloaded and verified (37/37)
- [x] Phase 1: Foundation: scaffold, tokens, fonts, layout, nav, utility bar, footer, hours util + tests
- [x] Phase 2: Split hero
- [x] Phase 3: Rest of home
- [x] Phase 4: Build Planner + Build Sheet + print
- [x] Phase 5: Inner pages (services, locations, about, careers, contact, 404)
- [x] Phase 6: SEO, metadata, schema, OG, favicons, sitemap
- [x] Phase 7: Polish and QA checklist, Lighthouse, final screenshots

## 7. Placeholders for Hunter to confirm with the owner

- `[GOOGLE RATING]` and review count
- `[CONFIRM RESPONSE TIME]` for the Build Sheet phone promise
- FAQ answers marked `[TO CONFIRM WITH OWNER]`
- Exact map coordinates per shop (approximate values used)

## 8. QA results (Phase 7)

- Lighthouse mobile, production build (local): Accessibility 100 on every page tested. Performance 91 to 98 (home 91 to 95, service 96, location 98, careers 94). Best Practices 96: the only flag is the Vercel Analytics script 404, which exists only once deployed. SEO 69: the only failing audit is "is-crawlable", caused on purpose by the IS_CONCEPT noindex; all other SEO audits pass.
- CLS 0 to 0.001. TBT 20 to 120 ms.
- 13 internal pages crawled, all 200; 404 page works. All tel:, mailto: and Google Maps links present.
- Hours utility: 12 unit tests (weekday, open and close edges, after hours, Friday night, weekend, DST, visitor timezone).
- Reduced motion: no pinning, no Ken Burns, reveals instant.
- Mobile menu and Build Planner: focus trapped, Escape closes, focus returns to the trigger.
- Yellow coverage measured on 113 viewport screenshots: all at or under about 5%.
- No em dashes or double hyphens in copy.
