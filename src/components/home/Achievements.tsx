import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Microscope, Radio } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';

/** Matches TruthSection / JoinSection: home-blur-surface + amber accents (same family as Founder Story) */
const Achievements = () => {
  const { t } = useI18n();

  return (
    <section
      id="achievements"
      className="home-blur-surface py-16 md:py-24 px-4 sm:px-6 md:px-12 relative scroll-mt-24 md:scroll-mt-28 border-t border-[rgba(251,191,36,0.12)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="font-cinzel text-xs md:text-sm uppercase tracking-[0.22em] mb-6" style={{ color: 'rgba(251,191,36,0.45)' }}>
            {t('home.achievements.subtitle')}
          </p>

          <h2
            className="cosmic-title font-bold mb-10"
            style={{ fontSize: 'clamp(1.85rem, 4.25vw, 3.35rem)', lineHeight: 1.12 }}
          >
            {t('home.achievements.title')}
          </h2>

          <p className="text-slate-200/95 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 md:mb-10 font-light">
            {t('home.achievements.lead')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-10 gap-y-3 mb-12 text-slate-300/95 text-sm md:text-base max-w-2xl mx-auto font-ui border-t border-b border-white/[0.08] py-6">
            <span className="inline-flex items-center gap-2 justify-center">
              <Microscope className="w-4 h-4 text-sky-400/80 shrink-0" aria-hidden />
              {t('home.achievements.kickerDoc')}
            </span>
            <span className="inline-flex items-center gap-2 justify-center">
              <Radio className="w-4 h-4 text-amber-200/80 shrink-0" aria-hidden />
              {t('home.achievements.kickerMetrics')}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg p-6 sm:p-8 md:p-10 backdrop-blur-md border border-white/[0.1] bg-[rgba(15,23,42,0.55)]"
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <BarChart3 className="w-6 h-6 md:w-7 md:h-7 text-sky-300/95 shrink-0" aria-hidden />
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, rgba(56,189,248,0.35), transparent)' }}
              />
            </div>
            <h3 className="font-ui text-lg sm:text-xl md:text-2xl text-white mb-4 font-semibold tracking-tight">{t('home.achievements.card1Title')}</h3>
            <p className="text-slate-200/90 leading-relaxed text-sm sm:text-base md:text-lg font-ui">{t('home.achievements.card1Body')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="rounded-lg p-6 sm:p-8 md:p-10 backdrop-blur-md border border-white/[0.1] bg-[rgba(15,23,42,0.55)]"
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <Microscope className="w-6 h-6 md:w-7 md:h-7 text-amber-200/95 shrink-0" aria-hidden />
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.35), transparent)' }}
              />
            </div>
            <h3 className="font-ui text-lg sm:text-xl md:text-2xl text-white mb-4 font-semibold tracking-tight">{t('home.achievements.card2Title')}</h3>
            <p className="text-slate-200/90 leading-relaxed text-sm sm:text-base md:text-lg font-ui">{t('home.achievements.card2Body')}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-slate-300/95 mb-6 md:mb-8 text-base sm:text-lg md:text-xl font-ui font-light max-w-2xl mx-auto leading-relaxed">
            {t('home.achievements.ctaIntro')}
          </p>
          <Link
            to="/our-achievements"
            className="inline-flex items-center gap-2 font-ui font-medium text-base md:text-lg py-3.5 px-8 rounded-md border border-amber-500/30 bg-slate-900/80 text-slate-100 hover:border-amber-400/45 hover:bg-slate-900 transition-colors"
          >
            <BarChart3 className="w-5 h-5 text-amber-200/80 shrink-0" aria-hidden />
            {t('home.achievements.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
