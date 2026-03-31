import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Episode } from '../../content/siteContent';
import { useI18n } from '../../i18n/LocaleProvider';

interface EpisodeItemProps extends Episode {
  index?: number;
}

/** High contrast on #E8D5B8: near-black body + vivid amber accents */
const c = {
  ink: '#1A0F05',
  inkSoft: '#3D2510',
  accent: '#A85A00',
  accentHot: '#C26700',
  badgeBg: 'rgba(255,248,235,0.85)',
  badgeBorder: 'rgba(90,50,12,0.35)',
  panelBg: 'rgba(255,252,246,0.72)',
  panelBorder: 'rgba(168,90,0,0.45)',
  rowBorder: 'rgba(31,18,8,0.15)',
} as const;

const EpisodeItem: React.FC<EpisodeItemProps> = ({
  fileNumber,
  title,
  abstract,
  keyFeatures,
  videoLength,
  youtubeLink,
  index = 0,
}) => {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const durationPercent = Math.max(3, (parseInt(videoLength, 10) / 942) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
      className="py-8 last:border-b-0"
      style={{ borderBottom: `1px solid ${c.rowBorder}` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="font-mono text-[0.95rem] md:text-[1.02rem] tracking-[0.18em] uppercase px-2.5 py-1 rounded-sm font-bold"
          style={{
            color: c.accentHot,
            background: c.badgeBg,
            border: `1px solid ${c.badgeBorder}`,
          }}
        >
          {fileNumber}
        </span>
        <div
          className="flex-1 h-px max-w-20"
          style={{
            background: 'linear-gradient(to right, rgba(31,18,8,0.22), transparent)',
          }}
        />
      </div>

      <h3
        className="font-serif font-bold leading-snug mb-5 transition-colors duration-300"
        style={{
          fontSize: 'clamp(1.3rem, 2.65vw, 1.75rem)',
          color: c.ink,
        }}
      >
        {title}
      </h3>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 transition-all duration-300 mb-5"
        style={{
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: isOpen ? c.accentHot : c.accent,
          border: `1px solid ${isOpen ? 'rgba(168,90,0,0.55)' : 'rgba(31,18,8,0.2)'}`,
          padding: '0.45rem 1.05rem',
          borderRadius: '2px',
          background: isOpen ? 'rgba(255,248,235,0.9)' : 'rgba(255,252,246,0.5)',
          fontWeight: 600,
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: c.accentHot, fontSize: '1.05rem', lineHeight: 1 }}
        >
          +
        </motion.span>
        {isOpen ? t('episode.closeDossier') : t('episode.openDossier')}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="mb-6 pl-5 py-4 pr-3"
              style={{
                borderLeft: `2px solid ${c.panelBorder}`,
                background: c.panelBg,
              }}
            >
              <p
                className="font-mono text-[0.95rem] uppercase tracking-[0.18em] mb-2 font-bold"
                style={{ color: c.accentHot }}
              >
                {t('episode.abstract')}
              </p>
              <p
                className="text-[1.05rem] md:text-[1.08rem] leading-relaxed mb-5"
                style={{ color: c.inkSoft }}
              >
                {abstract}
              </p>

              {keyFeatures && (
                <>
                  <div
                    className="h-px mb-4"
                    style={{ background: 'rgba(31,18,8,0.12)' }}
                  />
                  <p
                    className="font-mono text-[0.95rem] uppercase tracking-[0.18em] mb-2 font-bold"
                    style={{ color: c.accentHot }}
                  >
                    {t('episode.keyFeatures')}
                  </p>
                  <p
                    className="text-[1.05rem] md:text-[1.08rem] leading-relaxed"
                    style={{ color: c.inkSoft }}
                  >
                    {keyFeatures}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-6 mt-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span
              className="font-mono text-[0.95rem] uppercase tracking-wider font-bold"
              style={{ color: c.inkSoft }}
            >
              {t('episode.duration')}
            </span>
            <span
              className="font-mono text-[0.95rem] font-bold"
              style={{ color: c.accentHot }}
            >
              {videoLength}
            </span>
          </div>
          <div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(31,18,8,0.12)', maxWidth: '12rem' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${durationPercent}%`,
                background: 'linear-gradient(to right, #A85A00, #D4A020)',
              }}
            />
          </div>
        </div>

        {youtubeLink && (
          <a
            href={youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 flex-shrink-0 transition-all duration-300 font-semibold"
            style={{
              fontSize: '0.8rem',
              fontFamily: 'monospace',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: c.ink,
              border: '1px solid rgba(31,18,8,0.22)',
              padding: '0.48rem 1.05rem',
              borderRadius: '2px',
              background: 'rgba(255,252,246,0.55)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = c.accentHot;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(168,90,0,0.5)';
              (e.currentTarget as HTMLAnchorElement).style.background = '#FFFBF4';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = c.ink;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(31,18,8,0.22)';
              (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,252,246,0.55)';
            }}
          >
            <span style={{ color: '#B83226', fontSize: '0.72rem' }} aria-hidden>
              ▶
            </span>
            {t('episode.watch')}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default EpisodeItem;
