# AGENTS.md — AI / contributor briefing

Read this file first. **Do not scan the whole repo** unless a task requires it.

## What this project is

Marketing / documentary hub for **ASra** (Association of Spirit Realm’s Ambassador), Umma New Century Organization. Three “seasons”: Record of Soul (I), Spirit Medicine (II), Universal Matrix (III), plus About and **Our Achievements** (`/our-achievements`).

## Stack

- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4** (`@import "tailwindcss"` in `src/index.css`, `@theme` tokens)
- **React Router** (`src/App.tsx`)
- **Framer Motion** (section animations)
- **i18n**: `src/i18n/` — `en` base, `es` full UI (falls back to `en` for missing keys)

## Commands

```bash
npm install
npm run dev    # http://localhost:5173 (default Vite port)
npm run build
```

## Routes (canonical)

| Path | View |
|------|------|
| `/` | `HomeView` |
| `/about` | `AboutView` |
| `/record-of-soul` | `RecordOfSoulView` |
| `/spirit-medicine` | `WoosSpiritMedicineView` |
| `/universal-matrix` | `UniversalMatrixView` |
| `/our-achievements` | `OurAchievementsView` |

## Where to change content

| What | Where |
|------|--------|
| Season I episodes (titles, abstracts, YouTube) | `src/content/siteContent.ts` → `recordOfSoul.timeline` |
| Season II **structure + every episode link** | **`src/content/spiritMedicineData.ts`** (single source). Also auto-feeds `siteContent.spiritMedicine.volumes`. |
| Season III scaffold | `src/content/siteContent.ts` → `universalMatrix` |
| About copy | `src/content/siteContent.ts` → `aboutContent` + `getAboutContent.ts` |
| UI strings (nav, buttons, hero) | `src/i18n/messages/en.ts`, `es.ts` |
| Localized site hero blobs | none (all locales use `siteContent` as in English) |
| Warm theme imagery URLs | `src/content/visualTheme.ts` |

## Spirit Medicine playlist rule

Official playlist:  
`https://www.youtube.com/playlist?list=PL-pt7dbiRizs3yIAao06SPk2NrDTBc9q_`

- Episode rows on `/spirit-medicine` use `spiritMedicineEpisodeUrl(videoId)` so links include `list=` for continuity.
- When YouTube adds/removes videos: update **`spiritMedicineFileGroups`** in `spiritMedicineData.ts` only; rebuild `siteContent` is derived.

## Layout / design notes

- Global **warm** palette + Lora body text (see `index.css`, `visualTheme.ts`). **Navbar/Footer** use `font-ui` (Inter).
- Home hero uses `GalaxyBackground` + atmosphere photo (`HomeView`).
- **Spirit Medicine page** keeps its **teal medical** aesthetic (`#0a2535`, `#38bdf8`) in `SpiritMedicineHero` / `SpiritMedicineContents`.

## Deployment

`vercel.json` SPA rewrite to `index.html`. No server API.

## Deeper history

See `AI_CONTEXT.md` for dated session logs and past design decisions.
