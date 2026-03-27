/**
 * About page imagery: static files in `public/images/about/`.
 * Update filenames only here (and keep files in sync — missing files show a styled fallback in How it works).
 */
const DIR = '/images/about';

export const ABOUT_PAGE_IMAGES = {
  founders: `${DIR}/founders-woos.png`,
  howStep01: `${DIR}/how-01.png`,
  howStep02: `${DIR}/how-02.png`,
} as const;
