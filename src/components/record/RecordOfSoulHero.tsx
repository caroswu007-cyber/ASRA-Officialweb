import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';
import { useI18n } from '../../i18n/LocaleProvider';
import LibraryAmbientBackground from './LibraryAmbientBackground';

const RecordOfSoulHero = () => {
  const { recordOfSoul } = useLocalizedSiteContent();
  const { title, description, note, episodesCount, minutes, backgroundImage } = recordOfSoul;
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Library-style ambient motion (dust, shelves, lamp) — like homepage galaxy layer */}
      <div className="absolute inset-0 z-[1] opacity-[0.98]">
        <LibraryAmbientBackground />
      </div>

      {/* Readable veil — slightly lighter so library motion reads; typography stays crisp */}
      <div className="absolute inset-0 z-[2] bg-black/36" />

      {/* Edge vignette — deeper at corners for contrast */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 36%, rgba(0,0,0,0) 18%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Warm amber glow at center — gives depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 58% at 50% 42%, rgba(235, 195, 120, 0.16) 0%, transparent 68%)',
        }}
      />

      {/* Film scanline texture */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.14]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 py-32">

        {/* Archive classification label */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px w-16" style={{ background: 'rgba(235,195,110,0.78)' }} />
          <span
            className="font-mono text-sm tracking-[0.35em] uppercase"
            style={{ color: '#f0d078' }}
          >
            {t('record.archiveSeries')}
          </span>
          <div className="h-px w-16" style={{ background: 'rgba(235,195,110,0.78)' }} />
        </div>

        {/* Title */}
        <h1
          className="font-serif font-bold tracking-tight leading-none mb-2"
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            color: '#fffdf6',
            textShadow:
              '0 2px 28px rgba(0,0,0,0.92), 0 4px 90px rgba(250,210,120,0.65), 0 0 120px rgba(255,220,150,0.35)',
          }}
        >
          {title}
        </h1>

        {/* Ornamental rule */}
        <div className="flex items-center gap-5 my-8 w-full max-w-sm">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, #c4904a)' }}
          />
          <span style={{ color: '#c4904a', fontSize: '0.7rem' }}>✦ ✦ ✦</span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to left, transparent, #c4904a)' }}
          />
        </div>

        {/* Description */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl mb-12 font-light tracking-wide"
          style={{ color: '#faf2e4' }}
        >
          {description}
        </p>

        {/* Stats — archival table style */}
        <div
          className="flex items-stretch mb-12"
          style={{ border: '1px solid rgba(240,205,120,0.85)' }}
        >
          <div
            className="px-6 md:px-12 py-5 text-center"
            style={{ borderRight: '1px solid rgba(240,205,120,0.85)' }}
          >
            <p
              className="font-mono font-bold mb-1"
              style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', color: '#ffe090', lineHeight: 1 }}
            >
              {episodesCount}
            </p>
            <p
              className="font-mono text-sm uppercase tracking-[0.25em]"
              style={{ color: '#f0e4cc' }}
            >
              {t('common.episodes')}
            </p>
          </div>
          <div className="px-6 md:px-12 py-5 text-center">
            <p
              className="font-mono font-bold mb-1"
              style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', color: '#ffe090', lineHeight: 1 }}
            >
              {minutes}
            </p>
            <p
              className="font-mono text-sm uppercase tracking-[0.25em]"
              style={{ color: '#f0e4cc' }}
            >
              {t('common.minutes')}
            </p>
          </div>
        </div>

        {/* Archival note */}
        <div
          className="max-w-2xl w-full text-left px-5 py-4"
          style={{
            borderLeft: '3px solid rgba(245,200,110,0.92)',
            background: 'rgba(18,14,10,0.92)',
          }}
        >
          <p
            className="font-mono text-sm uppercase tracking-[0.25em] mb-2"
            style={{ color: '#f0c860' }}
          >
            {t('record.archivalNote')}
          </p>
          <p
            className="text-base leading-relaxed italic"
            style={{ color: '#f5ead8' }}
          >
            {note}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-85">
        <span
          className="font-mono text-sm tracking-[0.25em] uppercase"
          style={{ color: '#d4a050' }}
        >
          {t('common.scroll')}
        </span>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #d4a050, transparent)' }}
        />
      </div>

      {/* Bottom gradient — smooth fade into timeline */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-[3]"
        style={{ background: 'linear-gradient(to top, #14110c, transparent)' }}
      />
    </section>
  );
};

export default RecordOfSoulHero;
