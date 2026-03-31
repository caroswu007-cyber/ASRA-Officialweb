import { useI18n } from '../i18n/LocaleProvider';

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer
      className="font-cinzel py-14 md:py-16 text-center mt-auto"
      style={{
        background: 'linear-gradient(180deg, #1a0f08 0%, #160D04 45%, #120a06 100%)',
        borderTop: '1px solid rgba(194,123,32,0.14)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      <p className="mb-3 text-sm md:text-[0.95rem] tracking-wide" style={{ color: 'rgba(245,237,224,0.56)' }}>
        {t('footer.copyright')}
      </p>
      <p
        className="text-xs md:text-sm max-w-2xl mx-auto px-4 sm:px-6 leading-[1.75] font-light"
        style={{ color: 'rgba(245,237,224,0.36)' }}
      >
        {t('footer.disclaimer')}
      </p>
    </footer>
  );
};

export default Footer;
