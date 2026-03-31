import { motion } from 'framer-motion';
import { siteContent } from '../../content/siteContent';
import { useI18n } from '../../i18n/LocaleProvider';
import { HomeProseBlocks } from './HomeProse';

const JoinSection = () => {
  const { join } = siteContent.links;
  const { t } = useI18n();

  return (
    <section
      id="join"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 text-center overflow-hidden scroll-mt-24 md:scroll-mt-28"
      style={{
        background: '#160D04',
      }}
    >
      {/* Gradient bleed-in from cream above */}
      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(245,237,224,1) 0%, rgba(22,13,4,1) 100%)' }} />

      {/* Amber inner glow — dominant center radial like reference */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 85% 70% at 50% 50%, rgba(194,123,32,0.28) 0%, rgba(139,84,19,0.15) 38%, transparent 65%),
            radial-gradient(ellipse 45% 40% at 15% 90%, rgba(194,123,32,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 45% 40% at 85% 10%, rgba(194,123,32,0.09) 0%, transparent 60%)
          `,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Ornament top */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.6))' }} />
          <span style={{ color: 'rgba(212,168,83,0.6)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
          <div className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,83,0.6))' }} />
        </div>

        <h2
          className="font-cinzel font-bold mb-6"
          style={{
            fontSize: 'clamp(1.85rem, 5.2vw, 4.1rem)',
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #F5EDE0 10%, #D4A853 52%, #F5EDE0 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('home.join.title')}
        </h2>

        {/* Subtitle rule */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap mb-8 md:mb-10 px-2">
          <div className="h-px w-10 sm:w-20 md:w-28 shrink-0" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.5))' }} />
          <span className="home-rule-eyebrow home-rule-eyebrow--dark text-center max-w-[min(100%,36rem)]">
            {t('home.join.subtitle')}
          </span>
          <div className="h-px w-10 sm:w-20 md:w-28 shrink-0" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,83,0.5))' }} />
        </div>

        <HomeProseBlocks
          text={t('home.join.body')}
          tone="creamSoft"
          align="center"
          className="mb-10 md:mb-14 max-w-2xl mx-auto px-2"
          paragraphClassName="text-base sm:text-xl md:text-2xl font-light text-balance"
        />

        <a
          href={join}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-cinzel font-bold uppercase tracking-wide text-base sm:text-lg md:text-xl py-4 sm:py-5 px-8 sm:px-14 md:px-16 rounded-full transition-all hover:-translate-y-1 max-w-full break-words text-center"
          style={{
            background: 'linear-gradient(135deg, #C27B20 0%, #D4A853 50%, #A86918 100%)',
            color: '#1A0F05',
            boxShadow: '0 6px 32px rgba(194,123,32,0.38)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 44px rgba(194,123,32,0.55)';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 32px rgba(194,123,32,0.38)';
            (e.currentTarget as HTMLAnchorElement).style.transform = '';
          }}
        >
          {t('home.join.cta')}
        </a>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-12 md:mt-16">
          <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.28))' }} />
          <span style={{ color: 'rgba(212,168,83,0.3)', fontSize: '0.9rem' }}>◈</span>
          <div className="h-px w-20 sm:w-32" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,83,0.28))' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default JoinSection;
