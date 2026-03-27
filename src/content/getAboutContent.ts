import type { Locale } from '../i18n/locales';
import type { AboutPageContent } from './siteContent';
import { getLocalizedAboutContent } from './pageCopyRuntime';

export function getAboutContent(locale: Locale): AboutPageContent {
  return getLocalizedAboutContent(locale);
}
