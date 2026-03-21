import { motion } from 'framer-motion';
import { useI18n } from '../../i18n/LocaleProvider';

type SubChapter = {
  id: string;
  title: string;
  indent?: boolean;
};

type MatrixFile = {
  fileNumber: string;
  title: string;
  subChapters?: SubChapter[];
};

const files: MatrixFile[] = [
  {
    fileNumber: 'FILE 3-1',
    title: 'Introduction to Universal Matrix of Meta Awareness',
  },
  {
    fileNumber: 'FILE 3-2',
    title: 'Existence evidence Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-2-1', title: 'Reasonable inference and evidence for his existence' },
      { id: '3-2-2', title: 'Verification video for skeptics' },
    ],
  },
  {
    fileNumber: 'FILE 3-3',
    title: 'Ethereal Matter & Ethereal Realm',
    subChapters: [
      { id: '3-3-1', title: 'Ethereal micro-particles & the Zero Space of Ethereal Space' },
      { id: '3-3-2', title: 'Control and influence over the real universe' },
      { id: '3-3-3', title: 'Virtual space of Ethereal Space' },
      { id: '3-3-4', title: 'Spirit survival support system' },
    ],
  },
  {
    fileNumber: 'FILE 3-4',
    title: 'Spirit Control System from Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-4-1', title: 'Description of the control system' },
      { id: '3-4-1-1', title: 'Evidence', indent: true },
      { id: '3-4-1-2', title: 'Organization framework of Master Spirits', indent: true },
      { id: '3-4-1-3', title: 'System Data Uplink System-Akashic Record', indent: true },
      { id: '3-4-1-4', title: 'Multiple Data Downlink Mode', indent: true },
      { id: '3-4-2', title: 'Management & behavior style of Master Spirits' },
    ],
  },
  {
    fileNumber: 'FILE 3-5',
    title: 'Purpose of Manifestation Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-5-1', title: 'Why do other types of life forms not interact with humans?' },
      { id: '3-5-2', title: 'He is scheduled to emerge at the Singularity of AI' },
      { id: '3-5-3', title: 'He Guides the Optimal Ultimate Form of Human Society' },
      { id: '3-5-4', title: 'He Guides the Optimal Ultimate State of Individual Human Life' },
    ],
  },
];

/** Desaturated blue-gray — distinct from Spirit Medicine (#0a2535 / #38bdf8). */
const pageBg = '#121a2a';
const accent = '#9aaccc';
const accentDim = 'rgba(154,172,204,0.32)';
const accentLine = 'rgba(154,172,204,0.52)';
const titleColor = '#e8edf5';
const bodyMuted = '#8b96ab';

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
  const { t, tFormat } = useI18n();
  const totalSubs = files.reduce((acc, f) => acc + (f.subChapters?.length ?? 0), 0);

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
          {tFormat('common.indexSummary', { files: files.length, subs: totalSubs })}
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

        {files.map((file, index) => (
          <motion.div
            key={file.fileNumber}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
            className="relative pl-16"
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
                className="font-serif font-bold leading-snug mb-6"
                style={{
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                  color: titleColor,
                }}
              >
                {file.title}
              </h3>

              {file.subChapters ? (
                <div
                  className="pl-5 py-2 space-y-0"
                  style={{
                    borderLeft: `2px solid ${accentDim}`,
                  }}
                >
                  {file.subChapters.map((sub, si) => (
                    <div
                      key={sub.id}
                      className={`flex items-center justify-between gap-4 py-3 ${sub.indent ? 'md:pl-6' : ''}`}
                      style={
                        si < file.subChapters!.length - 1
                          ? { borderBottom: '1px solid rgba(255,255,255,0.04)' }
                          : {}
                      }
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-1.5 h-1.5 rounded-sm rotate-45 flex-shrink-0"
                          style={{ background: accent, marginTop: '1px' }}
                        />
                        <span
                          className="font-mono text-sm font-semibold flex-shrink-0"
                          style={{ color: accent }}
                        >
                          {sub.id}
                        </span>
                        <span className="text-base leading-snug" style={{ color: bodyMuted }}>
                          {sub.title}
                        </span>
                      </div>
                      <ComingSoonBadge />
                    </div>
                  ))}
                </div>
              ) : (
                <ComingSoonBadge />
              )}
            </div>
          </motion.div>
        ))}

        <div className="flex items-center gap-3 pl-16 pt-4" style={{ opacity: 0.4 }}>
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
