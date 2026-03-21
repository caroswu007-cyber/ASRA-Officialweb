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
      className="relative z-10 -mt-20 md:-mt-28 overflow-hidden pt-8 md:pt-10 pb-28 md:pb-36 px-4 sm:px-6 md:px-12 scroll-mt-24 md:scroll-mt-28"
      style={{
        background: `linear-gradient(
          180deg,
          rgba(0,0,0,0) 0%,
          rgba(22,14,10,0.08) 10%,
          rgba(30,18,12,0.18) 26%,
          rgba(34,20,16,0.28) 46%,
          rgba(30,18,16,0.34) 62%,
          rgba(24,14,12,0.42) 78%,
          rgba(18,12,10,0.72) 92%,
          rgba(18,12,10,0.95) 100%
        )`,
      }}
    >
      {/* Soft wash — ties overview copy to the starfield without a sharp horizon */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[28%] opacity-90"
        style={{
          background: `radial-gradient(ellipse 120% 70% at 50% 0%, rgba(255,180,120,0.08) 0%, transparent 55%)`,
        }}
        aria-hidden
      />
      <div className="relative z-[1] max-w-6xl mx-auto">
        <p
          className="text-center font-cinzel text-[0.62rem] sm:text-xs uppercase tracking-[0.42em] mb-10 md:mb-12"
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
        className="text-center mb-20 px-2 py-2"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
          <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
        </div>

        <h2 className="cosmic-title mb-4" style={{ fontSize: 'clamp(2.15rem, 5.2vw, 4.1rem)', lineHeight: 1.1 }}>
          {home.introTitle}
        </h2>

        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="h-px w-32" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
          <span className="font-cinzel text-sm uppercase tracking-[0.35em]" style={{ color: 'rgba(251,191,36,0.35)' }}>
            {t('home.intro.subtitle')}
          </span>
          <div className="h-px w-32" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
        </div>
      </motion.div>

      {/* Overview text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05, duration: 0.6 }}
          className="text-center text-slate-200/95 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 font-light rounded-xl px-4 py-5 backdrop-blur-md bg-[rgba(8,6,16,0.42)] border border-violet-900/25 shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
      >
        {t('home.intro.overviewBefore')}
        <span style={{ color: '#fbbf24' }}>{t('home.intro.overviewHighlight')}</span>
        {t('home.intro.overviewAfter')}
      </motion.p>

      {/* Vertical mist between overview and cards — removes the “cut line” */}
      <div
        className="pointer-events-none max-w-6xl mx-auto h-20 md:h-28 mb-2 md:mb-4 rounded-[2rem]"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(16,10,12,0.08) 0%,
            rgba(26,16,18,0.22) 45%,
            rgba(28,18,20,0.3) 100%
          )`,
        }}
        aria-hidden
      />

      {/* Shared frosted plateau so both cards read as one continuation */}
      <div
        className="rounded-[1.75rem] md:rounded-[2rem] px-4 py-8 md:px-8 md:py-10 mb-14"
        style={{
          background: `linear-gradient(165deg, rgba(14,10,26,0.48) 0%, rgba(22,12,40,0.52) 45%, rgba(16,10,32,0.58) 100%)`,
          border: '1px solid rgba(251,191,36,0.08)',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.03)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {/* ASra card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="backdrop-blur-xl p-9 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: 'rgba(15,23,42,0.68)',
            border: '1px solid rgba(251,191,36,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.15)'; }}
        >
          <div className="h-px mb-7" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.5), transparent)' }} />
          <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5 inline-block" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
            {t('home.intro.physicalWorld')}
          </span>
          <h3 className="font-cinzel text-xl text-white mb-1 mt-3 tracking-wide">{t('home.intro.asraName')}</h3>
          <p className="font-cinzel text-sm uppercase tracking-widest mb-5" style={{ color: 'rgba(251,191,36,0.5)' }}>
            {t('home.intro.asraFull')}
          </p>
          <p className="text-slate-300 leading-relaxed text-lg md:text-xl">{t('home.intro.asraBody')}</p>
        </motion.div>

        {/* SMSC card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="backdrop-blur-xl p-9 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: 'rgba(15,23,42,0.68)',
            border: '1px solid rgba(167,139,250,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.15)'; }}
        >
          <div className="h-px mb-7" style={{ background: 'linear-gradient(to right, rgba(167,139,250,0.5), transparent)' }} />
          <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5 inline-block" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
            {t('home.intro.spiritRealm')}
          </span>
          <h3 className="font-cinzel text-xl text-white mb-1 mt-3 tracking-wide">{t('home.intro.smscName')}</h3>
          <p className="font-cinzel text-sm uppercase tracking-widest mb-5" style={{ color: 'rgba(167,139,250,0.5)' }}>
            {t('home.intro.smscFull')}
          </p>
          <p className="text-slate-300 leading-relaxed text-lg md:text-xl">{t('home.intro.smscBody')}</p>
        </motion.div>
      </div>
      </div>

      {/* Learn more CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <Link
          to="/about"
          className="inline-block font-cinzel font-bold uppercase tracking-widest text-base py-3.5 px-10 rounded-full transition-all hover:-translate-y-1"
          style={{ border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', background: 'rgba(251,191,36,0.05)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.05)'; }}
        >
          {t('home.intro.learnMore')}
        </Link>
      </motion.div>
      </div>

      {/* Feather into divider / next band — same base as HomeView #120e0c */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 md:h-36 z-0"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(18,12,10,0.55) 45%, rgba(18,12,10,0.98) 100%)',
        }}
        aria-hidden
      />
    </section>
  );
};

export default Introduction;
