import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { STORAGE_KEY, isLocale, type Locale } from './locales';
import { translate, translateFormat } from './translate';

type Ctx = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tFormat: (key: string, vars: Record<string, string | number>) => string;
};

const LocaleContext = createContext<Ctx | null>(null);

function readInitialLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'zh' || raw === 'ja' || raw === 'la') {
      localStorage.setItem(STORAGE_KEY, 'en');
      return 'en';
    }
    if (raw && isLocale(raw)) return raw;
  } catch {
    /* ignore */
  }
  return 'en';
}

function htmlLang(locale: Locale): string {
  if (locale === 'es') return 'es';
  return 'en';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang(locale);
  }, [locale]);

  const value = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      t: (key: string) => translate(locale, key),
      tFormat: (key: string, vars: Record<string, string | number>) => translateFormat(locale, key, vars),
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useI18n must be used within LocaleProvider');
  return ctx;
}
