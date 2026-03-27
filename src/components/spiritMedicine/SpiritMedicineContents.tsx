import { motion } from 'framer-motion';
import {
  formatEpisodeDuration,
  orderSpiritMedicineFileGroupsForDetailView,
  spiritMedicineEpisodeUrl,
  spiritMedicinePlaylistUrl,
  totalSpiritMedicineEpisodes,
  type SpiritMedicineEpisode,
} from '../../content/spiritMedicineData';
import { getLocalizedSpiritMedicineFileGroups } from '../../content/pageCopyRuntime';
import { useI18n } from '../../i18n/LocaleProvider';

function displayEpisodeTitle(raw: string): string {
  const stripped = raw.replace(/^(?:File|FILE)\s+[\d.-]+\s+/i, '').trim();
  return stripped || raw;
}

const ghostImages = [
  {
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80',
    style: { top: '4%', right: '-3%', width: '38%', opacity: 0.13 },
    blur: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80',
    style: { top: '28%', left: '-3%', width: '36%', opacity: 0.11 },
    blur: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    style: { top: '55%', right: '-2%', width: '40%', opacity: 0.12 },
    blur: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=80',
    style: { bottom: '5%', left: '-3%', width: '38%', opacity: 0.11 },
    blur: 4,
  },
];

const YoutubeEpisodeButton = ({ episode }: { episode: SpiritMedicineEpisode }) => {
  const { t } = useI18n();
  const href = spiritMedicineEpisodeUrl(episode.videoId);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm uppercase tracking-widest px-3 py-2 rounded-md flex-shrink-0 transition-all hover:brightness-110"
      style={{
        background: 'rgba(239,68,68,0.12)',
        color: '#fca5a5',
        border: '1px solid rgba(239,68,68,0.35)',
      }}
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      {t('spirit.watchYoutube')}
    </a>
  );
};

const SpiritMedicineContents = () => {
  const { t, tFormat, locale } = useI18n();
  const spiritMedicineFileGroups = orderSpiritMedicineFileGroupsForDetailView(
    getLocalizedSpiritMedicineFileGroups(locale),
  );
  const fileCount = spiritMedicineFileGroups.length;
  const episodeCount = totalSpiritMedicineEpisodes();

  return (
    <div
      className="relative overflow-hidden text-white py-20 px-5 sm:px-6 md:px-8"
      style={{ background: '#0a2535' }}
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
            filter: `blur(${img.blur}px) saturate(0.4) brightness(0.7)`,
            zIndex: 0,
          }}
        />
      ))}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 50%, transparent 20%, rgba(10,37,53,0.55) 100%)',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.4))' }}
          />
          <span className="font-mono text-sm tracking-[0.35em] uppercase" style={{ color: '#38bdf8' }}>
            {t('common.fileIndex')}
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: 'linear-gradient(to left, transparent, rgba(56,189,248,0.4))' }}
          />
        </div>
        <p
          className="text-center font-serif tracking-widest text-sm font-semibold mb-6"
          style={{ color: '#4a7a96' }}
        >
          {tFormat('common.indexSummary', { files: fileCount, subs: episodeCount })}
        </p>
        <p className="text-center">
          <a
            href={spiritMedicinePlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-md transition-opacity hover:opacity-90"
            style={{
              color: '#7dd3fc',
              border: '1px solid rgba(56,189,248,0.35)',
              background: 'rgba(56,189,248,0.08)',
            }}
          >
            {t('spirit.openPlaylist')}
          </a>
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="absolute top-0 h-full"
          style={{
            left: '1.25rem',
            width: '1px',
            background:
              'linear-gradient(to bottom, rgba(56,189,248,0.7), rgba(56,189,248,0.15) 90%, transparent)',
          }}
        />

        {spiritMedicineFileGroups.map((file, index) => (
          <motion.div
            key={file.fileNumber}
            id={`sm-file-${file.fileNumber.replace(/\s+/g, '-')}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
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
                border: '1px solid rgba(56,189,248,0.55)',
                background: '#0a2535',
                boxShadow: '0 0 10px rgba(56,189,248,0.12)',
              }}
            >
              <span
                className="font-mono font-bold"
                style={{ fontSize: '0.55rem', color: '#38bdf8', lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="py-10 last:border-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="font-mono text-sm tracking-[0.2em] uppercase px-2.5 py-1 rounded-sm font-semibold"
                  style={{
                    color: '#38bdf8',
                    background: 'rgba(56,189,248,0.08)',
                    border: '1px solid rgba(56,189,248,0.3)',
                  }}
                >
                  {file.fileNumber}
                </span>
                <div
                  className="flex-1 h-px max-w-16"
                  style={{
                    background: 'linear-gradient(to right, rgba(56,189,248,0.3), transparent)',
                  }}
                />
              </div>

              <p className="font-mono text-sm mb-6 pl-0.5" style={{ color: '#5a8aa8' }}>
                {file.sectionTitle}
              </p>

              <div
                className="pl-5 py-2 space-y-0"
                style={{ borderLeft: '2px solid rgba(56,189,248,0.3)' }}
              >
                {file.episodes.map((ep, si) => (
                  <div
                    key={ep.videoId}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4"
                    style={
                      si < file.episodes.length - 1
                        ? { borderBottom: '1px solid rgba(255,255,255,0.04)' }
                        : {}
                    }
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span
                        className="w-1.5 h-1.5 rounded-sm rotate-45 flex-shrink-0 mt-2"
                        style={{ background: '#38bdf8' }}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold" style={{ color: '#38bdf8' }}>
                            {ep.code}
                          </span>
                          <span className="font-mono text-xs" style={{ color: '#5a8aa8' }}>
                            {formatEpisodeDuration(ep.lengthSeconds)}
                          </span>
                        </div>
                        <span
                          className="font-serif font-bold leading-snug block"
                          style={{
                            fontSize: 'clamp(0.95rem, 3.5vw, 1.6rem)',
                            color: '#94b8cc',
                          }}
                        >
                          {displayEpisodeTitle(ep.title)}
                        </span>
                      </div>
                    </div>
                    <YoutubeEpisodeButton episode={ep} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex items-center gap-3 pl-12 sm:pl-16 pt-4" style={{ opacity: 0.4 }}>
          <div
            className="w-3 h-3 rounded-full"
            style={{
              marginLeft: '-0.375rem',
              border: '1px solid rgba(56,189,248,0.5)',
              background: '#0a2535',
            }}
          />
          <span className="font-mono text-sm uppercase tracking-[0.25em]" style={{ color: '#38bdf8' }}>
            {t('spirit.endSeries')}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto mt-16 text-center">
        <p className="text-sm font-mono uppercase tracking-widest" style={{ color: '#2d5c74' }}>
          {t('footer.researchNote')}
        </p>
      </div>
    </div>
  );
};

export default SpiritMedicineContents;
