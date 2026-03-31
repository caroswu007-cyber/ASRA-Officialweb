import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/LocaleProvider';
import { HomeProseBlocks } from './HomeProse';

const TruthSection = () => {
  const { t } = useI18n();

  const seasons = [
    {
      season: t('home.truth.s1.season'),
      title: t('home.truth.s1.title'),
      description: t('home.truth.s1.description'),
      link: '/record-of-soul',
      cta: t('home.truth.s1.cta'),
      accent: '#9C7A4E',
      border: 'rgba(156,122,78,0.3)',
    },
    {
      season: t('home.truth.s2.season'),
      title: t('home.truth.s2.title'),
      description: t('home.truth.s2.description'),
      link: '/spirit-medicine',
      cta: t('home.truth.s2.cta'),
      accent: '#5B7C6A',
      border: 'rgba(91,124,106,0.22)',
    },
    {
      season: t('home.truth.s3.season'),
      title: t('home.truth.s3.title'),
      description: t('home.truth.s3.description'),
      link: '/universal-matrix',
      cta: t('home.truth.s3.cta'),
      accent: '#7A5C3A',
      border: 'rgba(122,92,58,0.22)',
    },
  ];

  return (
    <section
      id="truth"
      className="py-16 md:py-24 px-4 sm:px-6 relative scroll-mt-24 md:scroll-mt-28 ed-vignette"
      style={{
        background: `linear-gradient(
          180deg,
          rgba(237,224,204,0) 0%,
          rgba(237,224,204,0.7) 4%,
          rgba(237,224,204,0.85) 50%,
          rgba(237,224,204,0.7) 96%,
          rgba(237,224,204,0) 100%
        )`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.5))' }} />
            <span style={{ color: 'rgba(194,123,32,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
            <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(194,123,32,0.5))' }} />
          </div>

          <h2 className="cosmic-title mb-3" style={{ fontSize: 'clamp(1.65rem, 4.75vw, 3.75rem)', lineHeight: 1.1 }}>
            {t('home.truth.title')}
          </h2>
          <p
            className="font-cinzel mt-2 mb-5 px-2"
            style={{ fontSize: 'clamp(0.95rem, 2.65vw, 1.95rem)', color: 'rgba(61,37,16,0.5)', letterSpacing: '0.04em' }}
          >
            {t('home.truth.subtitle')}
          </p>

          <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap px-2">
            <div className="h-px w-10 sm:w-20 md:w-28 shrink-0" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.45))' }} />
            <span className="home-rule-eyebrow text-center max-w-[min(100%,42rem)]">
              {t('home.truth.seriesLabel')}
            </span>
            <div className="h-px w-10 sm:w-20 md:w-28 shrink-0" style={{ background: 'linear-gradient(to left, transparent, rgba(194,123,32,0.45))' }} />
          </div>
        </motion.div>

        {/* Abstract panel — dark walnut with amber inner glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-6 sm:p-10 md:p-14 rounded-2xl text-center max-w-5xl mx-auto mb-14 md:mb-20 overflow-hidden"
          style={{
            background: '#1A0F05',
            border: '1px solid rgba(194,123,32,0.22)',
            boxShadow: '0 8px 48px rgba(31,18,8,0.32)',
          }}
        >
          {/* Amber inner glow — center radial */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `
              radial-gradient(ellipse 80% 65% at 50% 45%, rgba(194,123,32,0.22) 0%, rgba(139,84,19,0.12) 40%, transparent 70%),
              radial-gradient(ellipse 40% 35% at 20% 80%, rgba(194,123,32,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 40% 35% at 80% 10%, rgba(194,123,32,0.07) 0%, transparent 60%)
            `,
          }} />
          <div className="relative z-10">
            <div className="h-px mb-6 md:mb-8" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.5), transparent)' }} />
            <h3
              className="font-cinzel mb-5"
              style={{ fontSize: 'clamp(1.05rem, 2.65vw, 1.65rem)', color: '#D4A853', letterSpacing: '0.06em' }}
            >
              {t('home.truth.abstractHeading')}
            </h3>
            <HomeProseBlocks
              text={t('home.truth.abstractBody')}
              tone="cream"
              align="center"
              paragraphClassName="max-w-3xl mx-auto text-balance font-light"
            />
            <div className="h-px mt-6 md:mt-8" style={{ background: 'linear-gradient(to right, transparent, rgba(194,123,32,0.5), transparent)' }} />
          </div>
        </motion.div>

        <div className="text-center mb-10 md:mb-12">
          <h3 className="font-cinzel mb-3 px-2" style={{ fontSize: 'clamp(1.1rem, 3.15vw, 2.15rem)', letterSpacing: '0.06em', color: '#1F1208' }}>
            {t('home.truth.videoTitle')}
          </h3>
          <HomeProseBlocks
            text={t('home.truth.videoSubtitle')}
            tone="muted"
            align="center"
            className="px-2 max-w-2xl mx-auto"
            paragraphClassName="text-sm sm:text-base md:text-lg font-light text-balance"
          />
        </div>

        {/* Series cards — dark walnut with light text */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {seasons.map((s, i) => (
            <motion.div
              key={s.link}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-xl flex flex-col hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              style={{
                background: i === 0 ? '#231408' : '#1A0F05',
                border: `1px solid ${s.border}`,
                boxShadow: i === 0
                  ? '0 6px 28px rgba(92,62,28,0.28)'
                  : '0 6px 28px rgba(31,18,8,0.22)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = i === 0
                  ? `0 14px 42px rgba(92,62,28,0.44)`
                  : `0 14px 42px rgba(31,18,8,0.38)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = i === 0
                  ? '0 6px 28px rgba(92,62,28,0.28)'
                  : '0 6px 28px rgba(31,18,8,0.22)';
              }}
            >
              {/* Per-card inner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: i === 0
                  ? `radial-gradient(ellipse 80% 60% at 50% 30%, rgba(156,122,78,0.28) 0%, rgba(122,90,52,0.14) 45%, transparent 65%)`
                  : `radial-gradient(ellipse 80% 60% at 50% 30%, ${s.accent}22 0%, transparent 65%)`,
              }} />

              {/* Top accent bar — artwork preserved */}
              <div className="h-0.5 w-full relative z-10" style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }} />

              <div className="p-5 sm:p-6 md:p-7 xl:p-8 flex flex-col flex-1 relative z-10 min-w-0">
                <span
                  className="inline-block font-cinzel font-bold text-xs sm:text-sm tracking-widest px-3 py-1.5 rounded-full mb-5 max-w-max"
                  style={{
                    background: `${s.accent}20`,
                    border: `1px solid ${s.accent}50`,
                    color: s.accent,
                  }}
                >
                  {s.season}
                </span>

                <h4
                  className="font-cinzel font-bold mb-4 leading-snug"
                  style={{ fontSize: 'clamp(1.05rem, 2.15vw, 1.45rem)', color: '#F5EDE0' }}
                >
                  {s.title}
                </h4>

                <div className="flex-grow mb-7 min-w-0">
                  <HomeProseBlocks
                    text={s.description}
                    tone="mutedOnDark"
                    size="comfortable"
                    paragraphClassName="text-balance [text-wrap:pretty]"
                  />
                </div>

                <Link
                  to={s.link}
                  className="block w-full text-center font-cinzel font-bold uppercase tracking-wide text-sm py-3 rounded-full transition-all duration-300"
                  style={{
                    border: `1px solid ${s.accent}60`,
                    color: s.accent,
                    background: `${s.accent}10`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${s.accent}22`;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${s.accent}bb`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = `${s.accent}10`;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = `${s.accent}60`;
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
