import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/LocaleProvider';

const TruthSection = () => {
  const { t } = useI18n();

  const seasons = [
    {
      season: t('home.truth.s1.season'),
      title: t('home.truth.s1.title'),
      description: t('home.truth.s1.description'),
      link: '/record-of-soul',
      cta: t('home.truth.s1.cta'),
      accent: '#c9a84c',
      glow: 'rgba(201,168,76,0.15)',
    },
    {
      season: t('home.truth.s2.season'),
      title: t('home.truth.s2.title'),
      description: t('home.truth.s2.description'),
      link: '/spirit-medicine',
      cta: t('home.truth.s2.cta'),
      accent: '#38bdf8',
      glow: 'rgba(56,189,248,0.12)',
    },
    {
      season: t('home.truth.s3.season'),
      title: t('home.truth.s3.title'),
      description: t('home.truth.s3.description'),
      link: '/universal-matrix',
      cta: t('home.truth.s3.cta'),
      accent: '#a78bfa',
      glow: 'rgba(167,139,250,0.12)',
    },
  ];

  return (
    <section
      id="truth"
      className="home-blur-surface py-16 md:py-24 px-4 sm:px-6 relative scroll-mt-24 md:scroll-mt-28"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
            <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
          </div>

          <h2 className="cosmic-title mb-3" style={{ fontSize: 'clamp(1.65rem, 4.75vw, 3.75rem)', lineHeight: 1.1 }}>
            {t('home.truth.title')}
          </h2>
          <p
            className="font-cinzel mt-2 mb-5 px-2"
            style={{ fontSize: 'clamp(0.95rem, 2.65vw, 1.95rem)', color: 'rgba(248,250,252,0.45)', letterSpacing: '0.04em' }}
          >
            {t('home.truth.subtitle')}
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="h-px w-12 sm:w-24 shrink-0" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
            <span
              className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.35em] text-center"
              style={{ color: 'rgba(251,191,36,0.35)' }}
            >
              {t('home.truth.seriesLabel')}
            </span>
            <div className="h-px w-12 sm:w-24 shrink-0" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl text-center max-w-4xl mx-auto mb-14 md:mb-20"
          style={{
            background: 'rgba(15,23,42,0.6)',
            border: '1px solid rgba(251,191,36,0.18)',
            boxShadow: '0 0 60px rgba(251,191,36,0.06)',
          }}
        >
          <div className="h-px mb-6 md:mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)' }} />
          <h3
            className="font-cinzel mb-4"
            style={{ fontSize: 'clamp(1.05rem, 2.65vw, 1.65rem)', color: '#fbbf24', letterSpacing: '0.04em' }}
          >
            {t('home.truth.abstractHeading')}
          </h3>
          <p className="text-slate-200 text-base sm:text-lg md:text-xl leading-relaxed font-light">{t('home.truth.abstractBody')}</p>
          <div className="h-px mt-6 md:mt-8" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)' }} />
        </motion.div>

        <div className="text-center mb-10 md:mb-12">
          <h3 className="font-cinzel text-white mb-3 px-2" style={{ fontSize: 'clamp(1.1rem, 3.15vw, 2.15rem)', letterSpacing: '0.06em' }}>
            {t('home.truth.videoTitle')}
          </h3>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light px-2">{t('home.truth.videoSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {seasons.map((s, i) => (
            <motion.div
              key={s.link}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="backdrop-blur-md rounded-2xl flex flex-col hover:-translate-y-2 transition-all duration-300 shadow-2xl overflow-hidden"
              style={{
                background: 'rgba(10,18,35,0.7)',
                border: `1px solid rgba(255,255,255,0.08)`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = s.accent + '55';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px ${s.glow}`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }} />

              <div className="p-6 md:p-7 lg:p-8 flex flex-col flex-1">
                <span
                  className="inline-block font-cinzel font-bold text-xs sm:text-sm tracking-widest px-3 py-1.5 rounded-full mb-5 max-w-max"
                  style={{
                    background: s.accent + '18',
                    border: `1px solid ${s.accent}40`,
                    color: s.accent,
                  }}
                >
                  {s.season}
                </span>

                <h4
                  className="font-serif font-bold text-white mb-4 leading-snug"
                  style={{ fontSize: 'clamp(1.05rem, 2.15vw, 1.45rem)' }}
                >
                  {s.title}
                </h4>

                <p className="text-slate-400 leading-relaxed flex-grow mb-7 text-sm sm:text-base md:text-lg">{s.description}</p>

                <Link
                  to={s.link}
                  className="block w-full text-center font-cinzel font-bold uppercase tracking-wide text-sm py-3 rounded-full transition-all duration-300"
                  style={{
                    border: `1px solid ${s.accent}60`,
                    color: s.accent,
                    background: 'transparent',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = s.accent + '18';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = s.accent + 'cc';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = s.accent + '60';
                  }}
                >
                  {s.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TruthSection;
