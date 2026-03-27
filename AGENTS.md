# AGENTS.md — AI / contributor briefing

Read this file first. Only scan deeper when the task needs it.

## Project

ASra marketing / documentary site built with React + Vite. Main routes:

- `/`
- `/about`
- `/founder-story`
- `/record-of-soul`
- `/spirit-medicine`
- `/universal-matrix`
- `/our-achievements`

## Stack

- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4
- React Router
- Framer Motion
- i18n in `src/i18n/`

## Commands

```bash
npm install
npm run dev
npm run build
npm run export:page-xlsx
npm run import:page-xlsx
```

## Copy source of truth

For rendered English / Chinese page copy, the authority is:

- `docs/page-copy/*.xlsx`

Runtime flow:

1. Edit workbook text in `docs/page-copy/`
2. Run `npm run import:page-xlsx`
3. This generates `src/content/pageCopyDocs.generated.ts`
4. The app reads that through `src/content/pageCopyRuntime.ts`

Do not assume `src/content/siteContent.ts` or `src/i18n/messages/*.ts` are the final rendered truth for EN/ZH page copy. They are now fallback / structural sources in many places.

## Main content entry points

| Need | File(s) |
|------|---------|
| Workbook runtime mapping | `src/content/pageCopyRuntime.ts` |
| Generated workbook data | `src/content/pageCopyDocs.generated.ts` |
| i18n merge | `src/i18n/translate.ts` |
| Home / record / about fallback structures | `src/content/siteContent.ts` |
| Founder story fallback structure | `src/content/founderStory2026Content.ts` |
| Spirit Medicine playlist data | `src/content/spiritMedicineData.ts` |
| Spirit Medicine outline | `src/content/spiritMedicineOfficialOutline.ts` |
| Universal Matrix file list | `src/content/universalMatrixSeries.ts` |
| Achievements assets | `src/content/achievements2025Content.ts` |

## Notes

- If duplicate `block_key` exists in multiple workbooks, first workbook by filename wins.
- `spiritMedicineData.ts` remains the structural source for playlist video IDs / links.
- `vercel.json` is SPA-only; there is no server API.

## History

Use `CHANGELOG.md` only as optional background. For current guidance, rely on this file and `docs/AI_PAGE_COPY_SYNC.md`.
