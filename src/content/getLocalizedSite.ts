import type { Locale } from '../i18n/locales';
import { getLocalizedSiteContent as getPageCopyLocalizedSiteContent } from './pageCopyRuntime';

export function getLocalizedSiteContent(locale: Locale) {
  return getPageCopyLocalizedSiteContent(locale);
}
