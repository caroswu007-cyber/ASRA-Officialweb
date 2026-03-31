import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';
import { useI18n } from '../../i18n/LocaleProvider';
import { HomeProseBlocks } from './HomeProse';

const Introduction = () => {
  const { home } = useLocalizedSiteContent();
  const { t } = useI18n();
  return (
    <section
      id="introduction"
      className="relative z-10 -mt-20 md:-mt-28 overflow-hidden pt-16 md:pt-24 lg:pt-28 pb-36 md:pb-44 lg:pb-48 px-4 sm:px-6 md:px-12 scroll-mt-24 md:scroll-mt-28 ed-vignette"
      style={{
        background: `linear-gradient(
          180deg,
          rgba(245,237,224,0) 0%,
          rgba(237,224,204,0.35) 18%,
          rgba(237,224,204,0.68) 50%,
          rgba(237,224,204,0.85) 88%,
          rgba(237,224,204,0.95) 100%
        )`,
      }}
    >
      <div className="relative z-[1] max-w-6xl mx-auto">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 px-2 py-3 md:py-4"
        >
          <div className="flex items-center justify-center gap-4 mb-7 md:mb-8">
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.5))' }} />
            <span style={{ color: 'rgba(194,123,32,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(194,123,32,0.5))' }} />
          </div>

          <h2
            className="cosmic-title mb-4"
            style={{ fontSize: 'clamp(1.85rem, 5.2vw, 4.1rem)', lineHeight: 1.1 }}
          >
            {home.introTitle}
          </h2>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 flex-wrap" aria-hidden>
            <div className="h-px w-16 sm:w-32 shrink-0" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.3))' }} />
            <span style={{ color: 'rgba(194,123,32,0.45)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-16 sm:w-32 shrink-0" style={{ background: 'linear-gradient(to left, transparent, rgba(194,123,32,0.3))' }} />
          </div>
        </motion.div>

        {/* Overview — highlight kept inline; remainder split for readability */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.65 }}
          className="max-w-3xl mx-auto mb-16 md:mb-20 px-2 sm:px-4"
        >
          <p
            className="font-serif text-center text-[0.95rem] sm:text-[1.05rem] md:text-[1.15rem] leading-[1.78] tracking-[0.01em] text-balance"
            style={{ color: '#3D2510' }}
          >
            {t('home.intro.overviewBefore')}
            <span style={{ color: '#C27B20', fontStyle: 'italic', fontWeight: 600 }}>{t('home.intro.overviewHighlight')}</span>
          </p>
          <HomeProseBlocks
            text={t('home.intro.overviewAfter')}
            tone="umber"
            align="center"
            className="mt-3 md:mt-4"
            paragraphClassName="max-w-3xl text-balance"
          />
        </motion.div>

        {/* ASra / SMSC cards — warm paper style */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-16 md:mb-20">
          {/* ASra card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="p-6 sm:p-8 md:p-9 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(251,246,238,0.88)',
              border: '1px solid rgba(31,18,8,0.09)',
              boxShadow: '0 3px 22px rgba(31,18,8,0.07)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,123,32,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(31,18,8,0.09)'; }}
          >
            <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(194,123,32,0.5), transparent)' }} />
            <span
              className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-5 inline-block"
              style={{ background: 'rgba(194,123,32,0.08)', border: '1px solid rgba(194,123,32,0.25)', color: '#C27B20' }}
            >
              {t('home.intro.physicalWorld')}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl mb-1 mt-3 tracking-wide" style={{ color: '#1F1208' }}>{t('home.intro.asraName')}</h3>
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(194,123,32,0.65)' }}>
              {t('home.intro.asraFull')}
            </p>
            <HomeProseBlocks text={t('home.intro.asraBody')} tone="umber" paragraphClassName="max-w-[40rem]" />
          </motion.div>

          {/* SMSC card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-6 sm:p-8 md:p-9 rounded-xl transition-all duration-300"
            style={{
              background: 'rgba(237,224,204,0.7)',
              border: '1px solid rgba(31,18,8,0.09)',
              boxShadow: '0 3px 22px rgba(31,18,8,0.07)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(194,123,32,0.3)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(31,18,8,0.09)'; }}
          >
            <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(61,37,16,0.3), transparent)' }} />
            <span
              className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-5 inline-block"
              style={{ background: 'rgba(61,37,16,0.08)', border: '1px solid rgba(61,37,16,0.2)', color: '#3D2510' }}
            >
              {t('home.intro.spiritRealm')}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl mb-1 mt-3 tracking-wide" style={{ color: '#1F1208' }}>{t('home.intro.smscName')}</h3>
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(61,37,16,0.5)' }}>
              {t('home.intro.smscFull')}
            </p>
            <HomeProseBlocks text={t('home.intro.smscBody')} tone="umber" paragraphClassName="max-w-[40rem]" />
          </motion.div>
        </div>

        {/* Learn more CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-4 md:mt-6"
        >
          <Link
            to="/about"
            className="inline-block font-cinzel font-bold uppercase tracking-widest text-sm sm:text-base py-3 sm:py-3.5 px-8 sm:px-10 rounded-full transition-all hover:-translate-y-1"
            style={{ border: '1px solid rgba(31,18,8,0.25)', color: '#1F1208', background: 'rgba(31,18,8,0.04)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(31,18,8,0.08)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(194,123,32,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(31,18,8,0.04)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(31,18,8,0.25)'; }}
          >
            {t('home.intro.learnMore')}
          </Link>
        </motion.div>
      </div>

      {/* Feather into next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-52 lg:h-60 z-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(237,224,204,0.25) 30%, rgba(237,224,204,0.85) 70%, rgba(237,224,204,1) 100%)',
        }}
        aria-hidden
      />
    </section>
  );
};

export default Introduction;
