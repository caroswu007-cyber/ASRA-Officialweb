import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';
import { useI18n } from '../../i18n/LocaleProvider';

const Introduction = () => {
  const { home } = useLocalizedSiteContent();
  const { t } = useI18n();
  return (
    <section
      id="introduction"
      className="relative z-10 -mt-20 md:-mt-28 overflow-hidden pt-16 md:pt-24 lg:pt-28 pb-36 md:pb-44 lg:pb-48 px-4 sm:px-6 md:px-12 scroll-mt-24 md:scroll-mt-28"
      style={{
        /* Single seamless fade — no mid-section colour steps */
        background: `linear-gradient(
          180deg,
          rgba(0,0,0,0) 0%,
          rgba(18,12,10,0.08) 18%,
          rgba(18,12,10,0.22) 50%,
          rgba(18,12,10,0.72) 88%,
          rgba(18,12,10,0.95) 100%
        )`,
      }}
    >
      <div className="relative z-[1] max-w-6xl mx-auto">
        <p
          className="text-center font-cinzel text-[0.62rem] sm:text-xs uppercase tracking-[0.42em] mb-8 md:mb-10"
          style={{ color: 'rgba(251,191,36,0.38)' }}
        >
          {t('home.intro.badge')}
        </p>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 px-2 py-3 md:py-4"
        >
          <div className="flex items-center justify-center gap-4 mb-7 md:mb-8">
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
            <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
          </div>

          <h2
            className="cosmic-title mb-4"
            style={{ fontSize: 'clamp(1.85rem, 5.2vw, 4.1rem)', lineHeight: 1.1 }}
          >
            {home.introTitle}
          </h2>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 flex-wrap">
            <div className="h-px w-16 sm:w-32 shrink-0" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
            <span
              className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.35em] text-center"
              style={{ color: 'rgba(251,191,36,0.35)' }}
            >
              {t('home.intro.subtitle')}
            </span>
            <div className="h-px w-16 sm:w-32 shrink-0" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
          </div>
        </motion.div>

        {/* Overview paragraph — no card frame, just subtle text-shadow for legibility */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.65 }}
          className="text-center text-slate-200/95 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto mb-16 md:mb-20 px-2 sm:px-4"
          style={{ textShadow: '0 1px 22px rgba(0,0,0,0.45)' }}
        >
          {t('home.intro.overviewBefore')}
          <span style={{ color: '#fbbf24' }}>{t('home.intro.overviewHighlight')}</span>
          {t('home.intro.overviewAfter')}
        </motion.p>

        {/* ASra / SMSC cards — no outer container background to avoid a third dividing line */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 mb-16 md:mb-20">
          {/* ASra card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="backdrop-blur-xl p-6 sm:p-8 md:p-9 rounded-2xl transition-all duration-300"
            style={{
              background: 'rgba(15,23,42,0.42)',
              border: '1px solid rgba(251,191,36,0.08)',
              boxShadow: '0 4px 28px rgba(0,0,0,0.25)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.24)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.08)'; }}
          >
            <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.5), transparent)' }} />
            <span
              className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-5 inline-block"
              style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}
            >
              {t('home.intro.physicalWorld')}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl text-white mb-1 mt-3 tracking-wide">{t('home.intro.asraName')}</h3>
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(251,191,36,0.5)' }}>
              {t('home.intro.asraFull')}
            </p>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{t('home.intro.asraBody')}</p>
          </motion.div>

          {/* SMSC card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="backdrop-blur-xl p-6 sm:p-8 md:p-9 rounded-2xl transition-all duration-300"
            style={{
              background: 'rgba(15,23,42,0.42)',
              border: '1px solid rgba(167,139,250,0.08)',
              boxShadow: '0 4px 28px rgba(0,0,0,0.25)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.24)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.08)'; }}
          >
            <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, rgba(167,139,250,0.5), transparent)' }} />
            <span
              className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.28em] uppercase px-3 py-1 rounded-full mb-5 inline-block"
              style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}
            >
              {t('home.intro.spiritRealm')}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl text-white mb-1 mt-3 tracking-wide">{t('home.intro.smscName')}</h3>
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-widest mb-4" style={{ color: 'rgba(167,139,250,0.5)' }}>
              {t('home.intro.smscFull')}
            </p>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">{t('home.intro.smscBody')}</p>
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
            style={{ border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', background: 'rgba(251,191,36,0.05)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.05)'; }}
          >
            {t('home.intro.learnMore')}
          </Link>
        </motion.div>
      </div>

      {/* Feather into next band */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-52 lg:h-60 z-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(18,12,10,0.12) 22%, rgba(18,12,10,0.42) 58%, rgba(18,12,10,0.97) 100%)',
        }}
        aria-hidden
      />
    </section>
  );
};

export default Introduction;
