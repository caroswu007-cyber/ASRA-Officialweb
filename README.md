# thenewcenturyweb — ASra / SAA (ESS-ESW)

Official site for **Spirit Ambassador Association (SAA)** / brand **ASra** — multi-route React app with documentary-style pages, EN + ES + ZH UI, plus workbook-driven EN/ZH page copy.

| Quick fact | Value |
|------------|--------|
| **Stack** | React 19, Vite 8, TypeScript, Tailwind CSS v4, React Router 7, Framer Motion, Lucide |
| **Live** | https://ess-esw.org |
| **GitHub** | https://github.com/caroswu007-cyber/ASRA-Officialweb |
| **npm name** | `saa-react-app` |

---

## AI quick map (edit here first)

| Need | File(s) |
|------|---------|
| Routes, lazy loading | `src/App.tsx` — `/our-achievements` uses `React.lazy` + `Suspense` |
| Nav labels / global UI strings | `src/i18n/messages/en.ts`, `es.ts`, `zh.ts` — merged via `src/i18n/translate.ts` |
| Page copy runtime source of truth | `docs/page-copy/*.xlsx` → `npm run import:page-xlsx` → `src/content/pageCopyDocs.generated.ts` |
| Runtime workbook mapping layer | `src/content/pageCopyRuntime.ts` |
| Nav labels / global UI strings | `src/i18n/messages/en.ts`, `es.ts`, `zh.ts` — merged via `src/i18n/translate.ts` |
| 2025 achievements report | `src/i18n/messages/achievementsReport.i18n.ts`; layout `src/views/OurAchievementsView.tsx`; assets in `src/content/achievements2025Content.ts` |
| Founder story structural fallback | `src/content/founderStory2026Content.ts` + `src/views/FounderStoryView.tsx` |
| Home / about / record structural fallback | `src/content/siteContent.ts`, components under `src/components/home/` |
| Spirit Medicine structural data | `src/content/spiritMedicineData.ts`, `src/content/spiritMedicineOfficialOutline.ts` |
| Universal Matrix structural data | `src/content/universalMatrixSeries.ts` |
| Theme / typography tokens | `src/index.css` |

**Emphasis in long strings:** wrap phrases in `**…**`; rendered on report page via `ReportInline` / `ReportParagraphs`.

---

## Routes → view → data

| Path | View | Main copy / data |
|------|------|------------------|
| `/` | `HomeView.tsx` | `siteContent` + i18n `home.*` |
| `/about` | `AboutView.tsx` | `pageCopyRuntime` + about i18n |
| `/founder-story` | `FounderStoryView.tsx` | `pageCopyRuntime` + founder fallback content |
| `/our-achievements` | `OurAchievementsView.tsx` (lazy) | `achievementsReport.*` i18n + `pageCopyRuntime` assets |
| `/record-of-soul` | `RecordOfSoulView.tsx` | `pageCopyRuntime` + record fallback content |
| `/spirit-medicine` | `WoosSpiritMedicineView.tsx` | `pageCopyRuntime` + `spiritMedicineData.ts` |
| `/universal-matrix` (alias: `…-meta-awareness`) | `UniversalMatrixView.tsx` | `pageCopyRuntime` + matrix structural data |

Shared chrome: `PageShell.tsx`, `Navbar.tsx`, `Footer.tsx`.

---

## Commands

```bash
npm install
npm run dev      # Vite dev server (port from terminal)
npm run build    # tsc -b && vite build → dist/
npm run lint
npm run preview  # preview production build
npm run export:page-xlsx   # refresh docs/page-copy/*.xlsx
npm run import:page-xlsx   # generate runtime page-copy source from workbooks
```

---

## Visual / UX (short)

Dark UI, **amber/gold** accents; home uses `GalaxyBackground`. Founder story and achievements report use dark **glass-card** panels (`#060812`-range wash, subtle borders). Remote images: prefer `compressUnsplash()` where defined in content helpers.

---

## Deeper docs

- [`CHANGELOG.md`](./CHANGELOG.md) — release-oriented notes  
- [`docs/AI_PAGE_COPY_SYNC.md`](./docs/AI_PAGE_COPY_SYNC.md) — workbook ↔ runtime mapping, `block_key`, import/export workflow  

---

## Contributing

1. Prefer a feature branch for code; content-only changes may touch `src/content/` and `src/i18n/messages/` only.  
2. Run **`npm run build`** before PR.  
3. © Spirit Ambassador Association. All rights reserved.
