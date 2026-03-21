import { motion } from 'framer-motion';
import { siteContent } from '../../content/siteContent';
import { useI18n } from '../../i18n/LocaleProvider';

const JoinSection = () => {
  const { join } = siteContent.links;
  const { t } = useI18n();

  return (
    <section
      id="join"
      className="home-blur-surface relative py-36 px-4 sm:px-6 text-center overflow-hidden scroll-mt-24 md:scroll-mt-28"
    >
      {/* Ambient glow behind the CTA */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,200,140,0.1) 0%, transparent 70%)',
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
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
          <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
        </div>

        <h2
          className="cosmic-title mb-6"
          style={{ fontSize: 'clamp(2.15rem, 5.2vw, 4.1rem)', lineHeight: 1.15 }}
        >
          {t('home.join.title')}
        </h2>

        {/* Subtitle rule */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
          <span
            className="font-cinzel text-sm uppercase tracking-[0.35em]"
            style={{ color: 'rgba(251,191,36,0.35)' }}
          >
            {t('home.join.subtitle')}
          </span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
        </div>

        <p className="text-slate-300 text-xl md:text-2xl mb-14 leading-relaxed max-w-2xl mx-auto font-light">{t('home.join.body')}</p>

        <a
          href={join}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-cinzel font-bold uppercase tracking-widest text-lg md:text-xl py-5 px-16 rounded-full transition-all hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, #92610a, #fbbf24, #d97706)',
            color: '#0f0a00',
            boxShadow: '0 4px 30px rgba(251,191,36,0.35)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 40px rgba(251,191,36,0.55)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 30px rgba(251,191,36,0.35)';
          }}
        >
          {t('home.join.cta')}
        </a>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-32" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.2))' }} />
          <span style={{ color: 'rgba(251,191,36,0.2)', fontSize: '0.9rem' }}>◈</span>
          <div className="h-px w-32" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.2))' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default JoinSection;
