import type { Locale } from '../i18n/locales';
import { aboutContent, type AboutPageContent } from './siteContent';

export function getAboutContent(_locale: Locale): AboutPageContent {
  return aboutContent;
}
