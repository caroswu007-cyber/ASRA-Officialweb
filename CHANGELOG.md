# Changelog

All notable changes to this project are documented in this file (local workspace only; not synced to Git unless you choose to commit).

## [Unreleased] — 2026-03-20

### Added
- **Home**: Shared canvas galaxy layer in `HomeView` so the rotating galaxy spans Hero and the upper part of Introduction; `GalaxyBackground` uses device pixel ratio for sharper stars.
- **Home — Galaxy ↔ nebula merge**: Hero + Introduction are wrapped in one column; galaxy uses `absolute inset-0` to match that full height (no mid-page drop to body-only). A violet gradient wash and a **masked** layer of the same Unsplash starfield as `body` (`screen` blend + gradient mask) blends the rotating galaxy into the purple nebula look so the overview→cards region is one continuous backdrop.
- **Galaxy hub**: `GalaxyBackground` hub uses `CENTER_X/Y_RATIO` (default Y ≈ 0.2) so the bright core sits in the hero viewport instead of the geometric center of the tall Hero+Intro canvas.
- **Home — Hero**: Main title mount animation (slow gather: letter-spacing, scale, blur easing); optional bridge copy “Spirit Ambassador Association” above Introduction when the divider between Hero and Introduction was removed.
- **Universal Matrix**: New `UniversalMatrixHero` and `UniversalMatrixContents` under `src/components/universalMatrix/`, matching **Spirit Medicine** index/timeline layout; page composes them in `UniversalMatrixView`.
- **`SectionDivider`**: `compact` prop for a lighter strip after Introduction.
- **Docs**: This `CHANGELOG.md`.
- **i18n / language switcher**: historical note from that session. Current supported locales are maintained in `src/i18n/locales.ts`; use that file and `AGENTS.md` as the live source of truth rather than this older changelog entry.

### Changed
- **Record of Soul**: Each timeline episode now includes `youtubeLink` from the official listing on [ess-esw.org/woos-record-of-soul-2](https://ess-esw.org/woos-record-of-soul-2/); the existing **Watch** control in `EpisodeItem` opens the matching YouTube video.
- **Global typography**: Larger root `html` font scale in `index.css`; many views/components bumped one step for readability (Navbar, Footer, home sections, About, record/spirit/matrix pages, etc.).
- **Home — Introduction**: Scaffold gradients tuned to **purple/violet** (aligned with merged nebula), lighter opacity so the shared backdrop reads through; overview panel and card plateau use violet-tinted glass instead of flat black.
- **Home — aesthetics**: Section shells use `home-blur-surface`; Hero/Intro seam refined (overlap, softer Hero bottom fade, softer galaxy vignette).
- **Record of Soul — contrast & library hero**: Hero overlays tuned so **`LibraryAmbientBackground`** (shelves, lamp, dust, spines) reads more clearly; brighter title, rules, stats, archival note, and scroll cue; timeline section (`#14110c`), ghost filters, dividers, and **`EpisodeItem`** typography/borders boosted for legibility.
- **Universal Matrix — palette**: Reworked to **low-saturation blue-gray** (`#060a14` / `#121a2a`, accents around `#9aaccc` / slate) with a **cool starfield** hero image — clearly separate from Spirit Medicine’s **teal clinic** (`#0a2535`, `#38bdf8`).
- **`UniversalMatrixView`**: Outer background `#060a14`; hero bottom fade aligns with contents `#121a2a`.

### Fixed
- **`UniversalMatrixHero.tsx`**: Removed stray non-code tokens accidentally appended after `export default` that broke Vite/OXC parse (`Unexpected token`).

### Removed / unused
- Home Hero no longer embeds its own `GalaxyBackground` (handled at `HomeView` level).
- Local reference image `public/matrix-consciousness-hero.png` is not required for the current Matrix hero (CSS + stock photo only); safe to delete manually if unused.

---

## Earlier history

Git history is the authoritative source for older iterations beyond the entries in this file.
