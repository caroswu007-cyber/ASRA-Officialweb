import type { Locale } from '../i18n/locales';
import { siteContent } from './siteContent';

export function getLocalizedSiteContent(_locale: Locale) {
  return siteContent;
}
