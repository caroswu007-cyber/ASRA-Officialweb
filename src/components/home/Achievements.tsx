import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { warmImagery } from '../../content/visualTheme';
import { useI18n } from '../../i18n/LocaleProvider';

const Achievements = () => {
  const { t } = useI18n();

  return (
    <section
      id="achievements"
      className="home-blur-surface py-28 px-4 sm:px-6 md:px-12 relative scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
            <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
          </div>

          <h2
            className="cosmic-title mb-4"
            style={{ fontSize: 'clamp(2.15rem, 5.2vw, 4.1rem)', lineHeight: 1.1 }}
          >
            {t('home.achievements.title')}
          </h2>

          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
            <span
              className="font-cinzel text-sm uppercase tracking-[0.35em]"
              style={{ color: 'rgba(251,191,36,0.35)' }}
            >
              {t('home.achievements.subtitle')}
            </span>
            <div className="h-px w-24" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden h-44 md:h-52 border border-amber-200/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          aria-hidden
        >
          <img
            src={warmImagery.achievementsHero}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-95"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#120e0c]/88 via-[#1a1210]/35 to-[#120e0c]/80"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl p-10 rounded-2xl shadow-2xl hover:-translate-y-2 transition-all duration-300"
            style={{
              background: 'rgba(36,26,20,0.62)',
              border: '1px solid rgba(232,165,75,0.16)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,165,75,0.38)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,165,75,0.16)'; }}
          >
            <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, rgba(232,165,75,0.45), transparent)' }} />
            <h3 className="font-cinzel text-xl md:text-2xl text-[#fff8f0] mb-6 tracking-wide">{t('home.achievements.card1Title')}</h3>
            <p className="text-stone-300 leading-loose text-lg md:text-xl">{t('home.achievements.card1Body')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="backdrop-blur-xl p-10 rounded-2xl shadow-2xl hover:-translate-y-2 transition-all duration-300"
            style={{
              background: 'rgba(36,26,20,0.62)',
              border: '1px solid rgba(232,165,75,0.16)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,165,75,0.38)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,165,75,0.16)'; }}
          >
            <div className="h-px mb-8" style={{ background: 'linear-gradient(to right, rgba(232,165,75,0.45), transparent)' }} />
            <h3 className="font-cinzel text-xl md:text-2xl text-[#fff8f0] mb-6 tracking-wide">{t('home.achievements.card2Title')}</h3>
            <p className="text-stone-300 leading-loose text-lg md:text-xl">{t('home.achievements.card2Body')}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-stone-400 mb-8 text-xl font-light">{t('home.achievements.ctaIntro')}</p>
          <Link
            to="/our-achievements"
            className="inline-block font-cinzel font-bold uppercase tracking-widest text-base py-4 px-12 rounded-full transition-all hover:-translate-y-1"
            style={{
              border: '1px solid rgba(251,191,36,0.3)',
              color: '#fbbf24',
              background: 'rgba(251,191,36,0.05)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.12)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(251,191,36,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.05)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(251,191,36,0.3)';
            }}
          >
            {t('home.achievements.cta')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
