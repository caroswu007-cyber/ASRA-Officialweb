import { useI18n } from '../../i18n/LocaleProvider';

const SpiritMedicineHero = () => {
  const { t } = useI18n();
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Medical lab background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=85)',
        }}
      />

      {/* Teal medical overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(6, 78, 104, 0.68)' }} />

      {/* Subtle center brightening */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(14,165,233,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Main content — typography scale aligned with Record of Soul hero */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 py-32">

        {/* Series badge */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16" style={{ background: 'rgba(103,232,249,0.5)' }} />
          <span
            className="font-mono text-sm tracking-[0.35em] uppercase"
            style={{ color: '#67e8f9' }}
          >
            {t('spirit.seriesBadge')}
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(103,232,249,0.5)' }} />
        </div>

        {/* Title — same clamp as Record of Soul */}
        <h1
          className="font-serif font-bold tracking-tight leading-none mb-2"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            color: '#fffdf6',
            textShadow:
              '0 2px 28px rgba(0,0,0,0.85), 0 4px 70px rgba(56,189,248,0.35), 0 0 90px rgba(125,211,252,0.2)',
          }}
        >
          {t('spirit.hero.titleBefore')}{' '}
          <span
            style={{
              borderBottom: '3px solid #f59e0b',
              paddingBottom: '4px',
            }}
          >
            {t('spirit.hero.titleHighlight')}
          </span>
        </h1>

        {/* Ornamental rule — match Record spacing */}
        <div className="flex items-center gap-5 my-8 w-full max-w-sm">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(103,232,249,0.55))' }}
          />
          <span style={{ color: 'rgba(103,232,249,0.75)', fontSize: '0.7rem' }}>✦ ✦ ✦</span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(103,232,249,0.55))' }}
          />
        </div>

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-light tracking-wide"
          style={{ color: 'rgba(255,255,255,0.9)' }}
        >
          {t('spirit.hero.body')}
        </p>

        {/* Stats — number size / padding aligned with Record of Soul archival stats */}
        <div
          className="flex flex-wrap sm:flex-nowrap items-stretch justify-center mb-12 w-full max-w-3xl"
          style={{ border: '1px solid rgba(103,232,249,0.45)' }}
        >
          {[
            { value: '5', label: t('common.files') },
            { value: '11', label: t('common.subChapters') },
            { value: '2025', label: t('common.series') },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className="px-6 md:px-12 py-5 text-center flex-1 min-w-[5.5rem] sm:min-w-0"
              style={i < arr.length - 1 ? { borderRight: '1px solid rgba(103,232,249,0.35)' } : {}}
            >
              <p
                className="font-mono font-bold mb-1"
                style={{
                  fontSize: 'clamp(2rem, 8vw, 2.8rem)',
                  color: '#67e8f9',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </p>
              <p
                className="font-mono text-sm uppercase tracking-[0.25em]"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — same rhythm as Record of Soul */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-85">
        <span
          className="font-mono text-sm tracking-[0.25em] uppercase"
          style={{ color: '#7dd3fc' }}
        >
          {t('common.scroll')}
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #7dd3fc, transparent)' }}
        />
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-[2]"
        style={{ background: 'linear-gradient(to top, #0a2535, transparent)' }}
      />
    </section>
  );
};

export default SpiritMedicineHero;
