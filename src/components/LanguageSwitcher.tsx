import { LOCALE_OPTIONS, type Locale } from '../i18n/locales';
import { useI18n } from '../i18n/LocaleProvider';

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <label htmlFor="asra-lang" className="sr-only">
        {t('lang.label')}
      </label>
      <select
        id="asra-lang"
        value={locale}
        onChange={e => setLocale(e.target.value as Locale)}
        className="font-ui font-cinzel text-[0.65rem] sm:text-xs uppercase tracking-widest rounded-lg border border-amber-700/35 bg-[#1a120e]/88 px-2.5 py-1.5 text-amber-100/92 cursor-pointer outline-none shadow-sm focus-visible:ring-2 focus-visible:ring-amber-400/45 focus-visible:ring-offset-1 focus-visible:ring-offset-[#F5EDE0] hover:border-amber-500/50 max-w-[9.5rem] sm:max-w-none transition-[border-color,box-shadow] duration-200"
        style={{ color: '#ebb066' }}
        aria-label={t('lang.label')}
      >
        {LOCALE_OPTIONS.map(opt => (
          <option key={opt.code} value={opt.code}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
