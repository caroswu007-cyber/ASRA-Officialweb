import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Microscope, Radio } from 'lucide-react';
import { useI18n } from '../../i18n/LocaleProvider';
import { HomeProseBlocks } from './HomeProse';

const Achievements = () => {
  const { t } = useI18n();

  return (
    <section
      id="achievements"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-12 relative scroll-mt-24 md:scroll-mt-28 ed-vignette"
      style={{
        borderTop: '1px solid rgba(194,123,32,0.12)',
        background: `linear-gradient(
          180deg,
          rgba(245,237,224,0) 0%,
          rgba(245,237,224,0.65) 4%,
          #F5EDE0 50%,
          rgba(245,237,224,0.65) 96%,
          rgba(245,237,224,0) 100%
        )`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="home-rule-eyebrow mb-6 md:mb-8">
            {t('home.achievements.subtitle')}
          </p>

          <h2
            className="cosmic-title font-bold mb-10"
            style={{ fontSize: 'clamp(1.85rem, 4.25vw, 3.35rem)', lineHeight: 1.12 }}
          >
            {t('home.achievements.title')}
          </h2>

          <HomeProseBlocks
            text={t('home.achievements.lead')}
            tone="umber"
            align="center"
            className="mb-8 md:mb-10 max-w-3xl mx-auto"
            paragraphClassName="font-light text-balance"
          />

          <div
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-x-10 gap-y-3 mb-12 text-sm md:text-base max-w-2xl mx-auto font-cinzel border-t border-b py-6"
            style={{ borderColor: 'rgba(31,18,8,0.1)', color: '#3D2510' }}
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <Microscope className="w-4 h-4 shrink-0" style={{ color: '#C27B20' }} aria-hidden />
              {t('home.achievements.kickerDoc')}
            </span>
            <span className="inline-flex items-center gap-2 justify-center">
              <Radio className="w-4 h-4 shrink-0" style={{ color: '#8B5413' }} aria-hidden />
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
            className="rounded-xl p-6 sm:p-8 md:p-10"
            style={{
              background: 'rgba(251,246,238,0.88)',
              border: '1px solid rgba(31,18,8,0.09)',
              boxShadow: '0 3px 22px rgba(31,18,8,0.07)',
            }}
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <BarChart3 className="w-6 h-6 md:w-7 md:h-7 shrink-0" style={{ color: '#C27B20' }} aria-hidden />
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, rgba(194,123,32,0.35), transparent)' }}
              />
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl mb-4 font-semibold tracking-tight" style={{ color: '#1F1208' }}>{t('home.achievements.card1Title')}</h3>
            <HomeProseBlocks text={t('home.achievements.card1Body')} tone="umber" paragraphClassName="text-balance" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="rounded-xl p-6 sm:p-8 md:p-10"
            style={{
              background: 'rgba(237,224,204,0.7)',
              border: '1px solid rgba(31,18,8,0.09)',
              boxShadow: '0 3px 22px rgba(31,18,8,0.07)',
            }}
          >
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <Microscope className="w-6 h-6 md:w-7 md:h-7 shrink-0" style={{ color: '#8B5413' }} aria-hidden />
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, rgba(139,84,19,0.35), transparent)' }}
              />
            </div>
            <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl mb-4 font-semibold tracking-tight" style={{ color: '#1F1208' }}>{t('home.achievements.card2Title')}</h3>
            <HomeProseBlocks text={t('home.achievements.card2Body')} tone="umber" paragraphClassName="text-balance" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <HomeProseBlocks
            text={t('home.achievements.ctaIntro')}
            tone="umber"
            align="center"
            className="mb-6 md:mb-8 max-w-2xl mx-auto"
            paragraphClassName="text-base sm:text-lg md:text-xl font-light text-balance"
          />
          <Link
            to="/our-achievements"
            className="inline-flex items-center gap-2 font-cinzel font-medium text-base md:text-lg py-3.5 px-8 rounded-full border transition-colors"
            style={{
              borderColor: 'rgba(31,18,8,0.22)',
              background: 'rgba(251,246,238,0.8)',
              color: '#1F1208',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(194,123,32,0.5)'; (e.currentTarget as HTMLAnchorElement).style.color = '#C27B20'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(31,18,8,0.22)'; (e.currentTarget as HTMLAnchorElement).style.color = '#1F1208'; }}
          >
            <BarChart3 className="w-5 h-5 shrink-0" style={{ color: '#C27B20' }} aria-hidden />
            {t('home.achievements.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
