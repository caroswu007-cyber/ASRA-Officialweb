# AI instruction: page copy workbooks ↔ source code

This document tells **human maintainers and AI assistants** how the Excel workbooks under `docs/page-copy/` map to the repository, how to **regenerate** them after site changes, and how workbook text is now **applied as the runtime source of truth**.

**Human entry point:** read [`README.md`](../README.md) section **「Page copy workbooks (Excel) & AI sync」** — it points here.

---

## 1. What the workbooks are

| Output | Path pattern |
|--------|----------------|
| Seven page-specific workbooks | `docs/page-copy/01-首页.xlsx` … `07-我们的成就.xlsx` |
| Short folder readme | `docs/page-copy/README.txt` |

**Generator:** `scripts/export-page-copy-workbooks.ts`  
**Command:** `npm run export:page-xlsx`

**Columns (every sheet):**

| Column | Meaning |
|--------|---------|
| `block_key` | Stable identifier. **Do not rename** when returning files for import; maps to i18n keys or logical paths (see §3). |
| `section_板块` | Human-readable screen area (non-authoritative). |
| `kind` | Hint only: heading / button / paragraph. |
| `english_源文` | English workbook text used by the runtime import flow. |
| `中文` | Chinese workbook text used by the runtime import flow. |
| `Latin_Latina` | Empty in export; for Latin translations. |
| `notes` | Generator hint (which file or subsystem). |

---

## 2. Route ↔ workbook ↔ source files (correspondence table)

When **routes or views change**, update **`src/App.tsx`** (and this table in this doc), then adjust **`scripts/export-page-copy-workbooks.ts`** if keys or content roots moved.

| Workbook | Primary URL(s) | View(s) | Main copy sources (authoritative) |
|----------|----------------|---------|-------------------------------------|
| `01-首页.xlsx` | `/` | `src/views/HomeView.tsx`; sections from `src/components/home/*` | Runtime text from `pageCopyDocs.generated.ts` via `pageCopyRuntime.ts`; UI keys still merge through `translate.ts` |
| `02-组织介绍.xlsx` | `/about` | `src/views/AboutView.tsx` | Runtime text from `pageCopyRuntime.ts` (`getLocalizedAboutContent`) |
| `03-创始人故事.xlsx` | `/founder-story` | `src/views/FounderStoryView.tsx` | Runtime text from `pageCopyRuntime.ts` (`getLocalizedFounderStoryContent`) |
| `04-视频目录-灵魂档案.xlsx` | `/record-of-soul` | `src/views/RecordOfSoulView.tsx`; `src/components/record/*` | Runtime text from `pageCopyRuntime.ts` (`getLocalizedSiteContent`) |
| `05-视频目录-灵体医学.xlsx` | `/spirit-medicine` | `src/views/WoosSpiritMedicineView.tsx`; `src/components/spiritMedicine/*` | Runtime text from `pageCopyRuntime.ts` + structural links from `spiritMedicineData.ts` |
| `06-视频目录-万有元神.xlsx` | `/universal-matrix`, `/universal-matrix-of-meta-awareness` | `src/views/UniversalMatrixView.tsx`; `src/components/universalMatrix/*` | Runtime text from `pageCopyRuntime.ts` + structural lists from `universalMatrixSeries.ts` |
| `07-我们的成就.xlsx` | `/our-achievements` | `src/views/OurAchievementsView.tsx`; home strip `src/components/home/Achievements.tsx` | `achievementsReport.*` still renders through i18n; workbook-driven assets and related copy also flow through `pageCopyRuntime.ts` |

**Locale merge:** `src/i18n/translate.ts` merges `messages*` / `achievementsReport*` and then overlays workbook-driven EN / ZH text from `pageCopyRuntime.ts`.

**Not fully covered in workbooks:** hardcoded JSX strings (e.g. labels only in a `.tsx` file). If you add new UI strings, prefer **`messagesEn` + `messagesZh`** with a stable key, then extend `export-page-copy-workbooks.ts` to include the new prefix or keys.

---

## 3. `block_key` conventions (for applying edits)

- **i18n:** key exactly matches `messagesEn` / `messagesZh` (e.g. `home.intro.title`, `about.hero.titleLine1`).
- **Achievements report:** key matches `achievementsReport.i18n.ts` (e.g. `achievementsReport.s1.lead`).
- **Embedded content:** logical paths as in the export script, e.g. `aboutContent.overview`, `founderStoryPage.phaseB.blocks[0].text`, `founderStorySurfaceCopy.backToAbout`, `universalMatrixFiles[1].title`, `recordOfSoul.timeline[3].abstract`, `spiritMedicineFileGroups[2].episodes[1].title`.

When applying user-edited sheets, map each row’s `block_key` back to the correct file and property; preserve emphasis markers like `**bold**` where the UI uses `RichText` / `ReportInline`.

---

## 4. Runtime import flow

Current import flow:

1. Edit workbook text in `docs/page-copy/*.xlsx`
2. Run `npm run import:page-xlsx`
3. Script `scripts/generate-page-copy-runtime.ts` generates `src/content/pageCopyDocs.generated.ts`
4. Components read localized workbook text via `src/content/pageCopyRuntime.ts`

Important:

- Duplicate `block_key` across multiple workbooks is allowed mechanically, but **first workbook by filename wins**.
- Prefer fixing duplicated keys in the exporter instead of relying on override order.

---

## 5. When the site structure changes (checklist for AI)

1. **Routes/views:** update `src/App.tsx` and the **§2 table** in this file.
2. **New page or new string bundles:**  
   - Add i18n keys under `src/i18n/messages/*.ts`, **or** add structured content under `src/content/*.ts`.  
   - Extend `scripts/export-page-copy-workbooks.ts`: new `pickKeys('prefix.')` rows, or new `flatten*` helpers, and add or rename a workbook in the `books` array.
3. **Regenerate artifacts:** `npm run export:page-xlsx` (refresh `docs/page-copy/*.xlsx`).
4. **Verify:** `npm run build`.
5. **Latin (or third column workflow):** if Latin should drive the site, there is **no** `la.ts` pack yet — either add a locale and `translate.ts` merge, or keep Latin in sheets for external use only until product asks for on-site Latin.

---

## 6. Applying edits coming back from spreadsheets

Current workflow:

1. User edits `english_源文` and / or `中文` in `docs/page-copy/*.xlsx`
2. Run `npm run import:page-xlsx`
3. Run `npm run build`

Fallback / structural files such as `siteContent.ts`, `founderStory2026Content.ts`, `spiritMedicineData.ts`, and `universalMatrixSeries.ts` still matter for links, images, and object shape, but rendered EN / ZH text should now follow the workbook import layer first.

---

## 7. Related scripts

| Script | Role |
|--------|------|
| `npm run export:page-xlsx` | Regenerate `docs/page-copy/*.xlsx` from current repo |
| `npm run import:page-xlsx` | Generate runtime workbook source file |
| `npm run dump:page-copy` | Dump workbook rows to `docs/page-copy-dump.json` |
| `npm run export:i18n-csv` | Full i18n CSV: `docs/i18n_trilingual_review.csv` |
| `npm run export:site-copy` | Broader copy export (`scripts/export-all-site-copy.ts`) |

---

## 8. File index (quick links)

| Path | Role |
|------|------|
| `scripts/export-page-copy-workbooks.ts` | Excel generator — edit when workbook structure/keys change |
| `scripts/generate-page-copy-runtime.ts` | Workbook → runtime source generator |
| `docs/page-copy/` | Generated `.xlsx` + `README.txt` |
| `src/content/pageCopyDocs.generated.ts` | Generated runtime workbook text |
| `src/content/pageCopyRuntime.ts` | Runtime text lookup / object mapping layer |
| `src/i18n/messages/en.ts` | English UI strings |
| `src/i18n/messages/zh.ts` | Chinese overrides |
| `src/i18n/messages/achievementsReport.i18n.ts` | EN/ZH long achievements report |
| `src/i18n/translate.ts` | Locale pack merge |
| `src/content/siteContent.ts` | `aboutContent`, `recordOfSoul`, documentary pages |
| `src/content/founderStory2026Content.ts` | Founder narrative + `founderStorySurfaceCopy` |
| `src/content/universalMatrixSeries.ts` | UMMA / 万有元神 on-page FILE index |
| `src/content/spiritMedicineData.ts` | Spirit Medicine episodes |
| `src/content/spiritMedicineOfficialOutline.ts` | Spirit Medicine outline headings |

---

*If behavior diverges, treat `generate-page-copy-runtime.ts` + `pageCopyRuntime.ts` as the current rendering truth and update this document.*
