export type Locale = 'en' | 'es';

export const STORAGE_KEY = 'asra-locale';

export const LOCALE_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export function isLocale(v: string): v is Locale {
  return v === 'en' || v === 'es';
}
