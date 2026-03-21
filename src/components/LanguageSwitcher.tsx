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
        className="font-ui font-cinzel text-[0.65rem] sm:text-xs uppercase tracking-widest rounded-md border border-amber-800/40 bg-[#1a120e]/85 px-2 py-1.5 text-amber-100/90 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 hover:border-amber-500/45 max-w-[7.5rem] sm:max-w-none"
        style={{ color: '#e8a54b' }}
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
