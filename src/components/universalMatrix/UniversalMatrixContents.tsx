import { motion } from 'framer-motion';
import { getLocalizedUniversalMatrixFiles } from '../../content/pageCopyRuntime';
import { useI18n } from '../../i18n/LocaleProvider';

/** Desaturated blue-gray — distinct from Spirit Medicine (#0a2535 / #38bdf8). */
const pageBg = '#121a2a';
const accent = '#9aaccc';
const accentDim = 'rgba(154,172,204,0.32)';
const accentLine = 'rgba(154,172,204,0.52)';
const titleColor = '#e8edf5';

const ghostImages = [
  {
    src: 'https://images.unsplash.com/photo-1518172193747-38bdc08de8d5?auto=format&fit=crop&w=900&q=80',
    style: { top: '4%', right: '-3%', width: '38%', opacity: 0.09 },
    blur: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    style: { top: '28%', left: '-4%', width: '36%', opacity: 0.08 },
    blur: 7,
  },
  {
    src: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=900&q=80',
    style: { top: '52%', right: '-2%', width: '40%', opacity: 0.07 },
    blur: 6,
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707bb888c?auto=format&fit=crop&w=900&q=80',
    style: { bottom: '4%', left: '-3%', width: '38%', opacity: 0.08 },
    blur: 7,
  },
];

const ComingSoonBadge = () => {
  const { t } = useI18n();
  return (
    <span
      className="inline-flex items-center font-mono text-sm uppercase tracking-widest px-2 py-0.5 rounded-sm flex-shrink-0"
      style={{
        background: 'rgba(148,163,184,0.1)',
        color: '#b8c5db',
        border: '1px solid rgba(154,172,204,0.28)',
      }}
    >
      {t('common.comingSoon')}
    </span>
  );
};

const UniversalMatrixContents = () => {
  const { t, tFormat, locale } = useI18n();
  const universalMatrixFiles = getLocalizedUniversalMatrixFiles(locale);

  return (
    <div
      className="relative overflow-hidden text-white py-20 px-5 sm:px-6 md:px-8"
      style={{ background: pageBg }}
    >
      {ghostImages.map((img, i) => (
        <div
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            ...img.style,
            aspectRatio: '1 / 1',
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: `blur(${img.blur}px) saturate(0.32) brightness(0.52) hue-rotate(12deg)`,
            zIndex: 0,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 65% 50% at 50% 50%, transparent 16%, rgba(10,14,24,0.72) 100%)`,
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${accentDim})` }}
          />
          <span className="font-mono text-sm tracking-[0.35em] uppercase" style={{ color: accent }}>
            {t('common.fileIndex')}
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to left, transparent, ${accentDim})` }}
          />
        </div>
        <p className="text-center font-serif tracking-widest text-base font-semibold" style={{ color: '#5c6b82' }}>
          {tFormat('matrix.indexSummary', { files: String(universalMatrixFiles.length) })}
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="absolute top-0 h-full"
          style={{
            left: '1.25rem',
            width: '1px',
            background: `linear-gradient(to bottom, ${accentLine}, ${accentDim} 88%, transparent)`,
          }}
        />

        {universalMatrixFiles.map((file, index) => (
          <motion.div
            key={file.fileNumber}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
            className="relative pl-12 sm:pl-16"
          >
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: '1.25rem',
                top: '2.6rem',
                transform: 'translate(-50%, -50%)',
                width: '1.75rem',
                height: '1.75rem',
                borderRadius: '50%',
                border: `1px solid ${accentLine}`,
                background: pageBg,
                boxShadow: '0 0 10px rgba(100,116,139,0.14)',
              }}
            >
              <span
                className="font-mono font-bold"
                style={{ fontSize: '0.55rem', color: accent, lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="py-10 last:border-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-mono text-sm tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm font-semibold"
                  style={{
                    color: accent,
                    background: 'rgba(148,163,184,0.07)',
                    border: `1px solid ${accentDim}`,
                  }}
                >
                  {file.fileNumber}
                </span>
                <div
                  className="flex-1 h-px max-w-16"
                  style={{
                    background: `linear-gradient(to right, ${accentDim}, transparent)`,
                  }}
                />
              </div>

              <h3
                className="font-serif font-bold leading-snug mb-5"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: titleColor,
                }}
              >
                {file.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3">
                {file.watchYoutubeUrl ? (
                  <a
                    href={file.watchYoutubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono font-semibold uppercase tracking-[0.18em] text-xs sm:text-sm transition-all"
                    style={{
                      color: '#d8e2f2',
                      border: '1px solid rgba(154,172,204,0.45)',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '4px',
                      background: 'rgba(15,23,42,0.35)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(154,172,204,0.12)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(191,219,254,0.55)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(15,23,42,0.35)';
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(154,172,204,0.45)';
                    }}
                  >
                    <span style={{ color: '#f87171', fontSize: '0.7rem' }} aria-hidden>
                      ▶
                    </span>
                    {t('matrix.watchOnYoutube')}
                  </a>
                ) : null}
                {!file.watchYoutubeUrl ? <ComingSoonBadge /> : null}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex items-center gap-3 pl-12 sm:pl-16 pt-4" style={{ opacity: 0.4 }}>
          <div
            className="w-3 h-3 rounded-full"
            style={{
              marginLeft: '-0.375rem',
              border: `1px solid ${accentDim}`,
              background: pageBg,
            }}
          />
          <span className="font-mono text-sm uppercase tracking-[0.25em]" style={{ color: accent }}>
            {t('matrix.endSeries')}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">
        <p className="text-sm font-mono uppercase tracking-widest" style={{ color: '#4a5568' }}>
          {t('footer.researchNote')}
        </p>
      </div>
    </div>
  );
};

export default UniversalMatrixContents;
