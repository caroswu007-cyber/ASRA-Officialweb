export type Locale = 'en' | 'zh';

export const STORAGE_KEY = 'asra-locale';

export const LOCALE_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export function isLocale(v: string): v is Locale {
  return v === 'en' || v === 'zh';
}
