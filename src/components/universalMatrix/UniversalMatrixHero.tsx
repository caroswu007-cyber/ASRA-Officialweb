import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';
import { useI18n } from '../../i18n/LocaleProvider';

const UniversalMatrixHero = () => {
  const { universalMatrix } = useLocalizedSiteContent();
  const { t } = useI18n();
  return (
    <section className="relative flex flex-col justify-center items-center overflow-hidden" style={{ minHeight: '72vh' }}>
      {/* Cool starfield base — reads blue-gray, not clinical Spirit Medicine teal */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=85)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 95% 75% at 50% 32%, rgba(30,58,95,0.38) 0%, rgba(15,23,42,0.78) 52%, #080c16 100%)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 100% 72% at 22% 78%, rgba(148,163,184,0.12) 0%, transparent 52%), radial-gradient(ellipse 85% 58% at 88% 22%, rgba(100,116,139,0.1) 0%, transparent 48%)',
        }}
      />

      {/* Macro-awareness field: desaturated steel + faint warm core (no emerald) */}
      <div
        className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'min(48rem, 110vw)',
          height: 'min(30rem, 55vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(254,243,199,0.12) 0%, rgba(148,163,184,0.11) 35%, rgba(71,85,105,0.07) 56%, transparent 74%)',
          filter: 'blur(56px)',
          opacity: 0.9,
        }}
      />
      <div
        className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'min(36rem, 92vw)',
          height: 'min(36rem, 92vw)',
          borderRadius: '50%',
          background:
            'conic-gradient(from 200deg at 50% 50%, transparent 0deg, rgba(251,191,36,0.035) 100deg, transparent 190deg, rgba(148,163,184,0.07) 275deg, transparent 360deg)',
          filter: 'blur(42px)',
          opacity: 0.55,
        }}
      />
      <div
        className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 'min(14rem, 40vw)',
          height: 'min(14rem, 40vw)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(148,163,184,0.05) 45%, transparent 72%)',
          filter: 'blur(24px)',
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 120px 40px rgba(0,0,0,0.58)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-14" style={{ background: 'rgba(148,163,184,0.5)' }} />
          <span className="font-mono text-sm tracking-[0.35em] uppercase" style={{ color: '#cbd5e1' }}>
            {t('matrix.seriesBadge')}
          </span>
          <div className="h-px w-14" style={{ background: 'rgba(148,163,184,0.5)' }} />
        </div>

        <h1
          className="font-serif font-bold mb-3 leading-tight"
          style={{
            fontSize: 'clamp(2.2rem, 6.8vw, 4.85rem)',
            color: '#f1f5f9',
            textShadow: '0 2px 40px rgba(0,0,0,0.8), 0 0 48px rgba(148,163,184,0.15)',
          }}
        >
          {universalMatrix.title}
        </h1>

        <h2
          className="font-serif font-semibold mb-2"
          style={{
            fontSize: 'clamp(1.35rem, 3.5vw, 2.1rem)',
            color: '#cbd5e1',
            textShadow: '0 2px 28px rgba(0,0,0,0.65)',
          }}
        >
          {t('matrix.subtitle')}
        </h2>

        <div className="flex items-center gap-4 my-7 w-full max-w-xs">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(148,163,184,0.45))' }}
          />
          <span style={{ color: 'rgba(148,163,184,0.65)', fontSize: '0.65rem', letterSpacing: '0.2em' }}>◆ ◆ ◆</span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(148,163,184,0.45))' }}
          />
        </div>

        <p
          className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8 sm:mb-10 px-1"
          style={{ color: 'rgba(203,213,225,0.92)' }}
        >
          {universalMatrix.description}
        </p>

        <div className="flex flex-wrap sm:flex-nowrap items-stretch border border-slate-500/25 bg-slate-950/35 backdrop-blur-sm w-full max-w-xs sm:max-w-none sm:w-auto">
          {[
            { value: '5', label: t('common.files') },
            { value: '16', label: t('common.subChapters') },
            { value: '2025', label: t('common.series') },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className="px-5 sm:px-8 py-4 text-center flex-1 min-w-[5rem]"
              style={i < arr.length - 1 ? { borderRight: '1px solid rgba(148,163,184,0.18)' } : {}}
            >
              <p
                className="font-mono font-bold mb-0.5"
                style={{ fontSize: '1.6rem', color: '#a8b4cc', lineHeight: 1 }}
              >
                {stat.value}
              </p>
              <p
                className="font-mono text-sm uppercase tracking-[0.2em]"
                style={{ color: 'rgba(148,163,184,0.75)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p
          className="mt-6 max-w-md mx-auto font-serif text-sm sm:text-base leading-relaxed px-2"
          style={{ color: 'rgba(203,213,225,0.88)' }}
        >
          {t('matrix.season3FilmingNote')}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, #121a2a 0%, rgba(18,26,42,0.9) 38%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default UniversalMatrixHero;
