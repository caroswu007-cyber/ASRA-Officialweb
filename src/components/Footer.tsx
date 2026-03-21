import { useI18n } from '../i18n/LocaleProvider';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="font-ui bg-[#0e0a08] py-12 text-center border-t border-amber-900/25 mt-auto">
      <p className="text-amber-200/45 mb-2 text-sm md:text-base">{t('footer.copyright')}</p>
      <p className="text-stone-500 text-sm md:text-base max-w-2xl mx-auto px-4 sm:px-6 leading-relaxed">
        {t('footer.disclaimer')}
      </p>
    </footer>
  );
};

export default Footer;
