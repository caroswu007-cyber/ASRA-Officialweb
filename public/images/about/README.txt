About page — your original images only
=======================================

URL paths are defined once in: src/constants/aboutImages.ts

Put your own files here (no rename needed beyond these exact names):

  founders-woos.png   → Founders card (left photo)
  how-01.png          → “How it works” card 01
  how-02.png          → “How it works” card 02

The site uses CSS `background-size: cover` and `background-position: center` on the Founders panel (narrow/tall on desktop), so the founder photo is exported with a slight portrait center-crop for that layout.

To refresh `founders-woos.png` after you replace the file: copy your PNG to the repo root as `founders-src.png`, then run:
  node scripts/crop-founders-once.mjs
(Uses sharp only for crop/resize — no AI.)

`how-01.png` / `how-02.png`: drop your originals here as named; edit/crop in any editor if needed.
