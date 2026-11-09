# Truckin Thunder Accessories: Concept Website

A front-end concept for Truckin Thunder Accessories (Richmond, Virginia, since 1978). Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, `motion` and `lucide-react`. Every photo is a real Truckin Thunder asset.

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # hours utility tests
npm run build
```

## Before launch

- Set `IS_CONCEPT = false` in `src/config/site.ts`. This removes `noindex`, opens `robots.txt` and hides the concept credit in the footer.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain (used for canonicals, sitemap, Open Graph and JSON-LD).
- Wire forms: search for `// TODO: POST to n8n webhook` (Build Planner, contact, careers).

## Placeholders to confirm with the owner

| Placeholder | Where |
|---|---|
| `[GOOGLE RATING]` and review count | Home reviews section |
| `[CONFIRM RESPONSE TIME]` | Build Sheet success, contact and careers confirmations |
| `[TO CONFIRM WITH OWNER]` | Some FAQ answers (warranty terms, turnaround times, state contracts, lift kit warranty). Kept out of FAQ schema until confirmed. |
| `[CONFIRM HOLIDAY HOURS WITH OWNER]` | `src/lib/hours.ts` (holidays are not modeled) |
| Shop coordinates | `src/data/locations.ts` (approximate; used for "Use my location" and the map) |

## Where things live

- Business data: `src/data/` (locations, services, reviews, brands, timeline, planner options, FAQs)
- Live open / closed logic: `src/lib/hours.ts` (America/New_York)
- Build Planner: `src/components/planner/`
- Pitch screenshots and a printed Build Sheet: `screenshots/`
