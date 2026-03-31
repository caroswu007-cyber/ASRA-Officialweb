import EpisodeItem from './EpisodeItem';
import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';
import { useI18n } from '../../i18n/LocaleProvider';

/** Max contrast on parchment (#E8D5B8): dark ink + vivid amber accents */
const tl = {
  ink: '#1A0F05',
  inkMuted: '#3D2510',
  accent: '#A85A00',
  rule: 'rgba(31,18,8,0.38)',
  line: 'linear-gradient(to bottom, rgba(90,50,12,0.65), rgba(120,70,20,0.35) 88%, transparent)',
  nodeBorder: 'rgba(90,50,12,0.55)',
  nodeBg: '#F2E6D4',
  nodeLabel: '#5A3008',
} as const;

const EpisodeTimeline = () => {
  const { recordOfSoul } = useLocalizedSiteContent();
  const { timeline } = recordOfSoul;
  const { t } = useI18n();

  return (
    <div
      className="relative py-20 px-5 sm:px-6 md:px-8 overflow-hidden"
      style={{ background: '#E8D5B8' }}
    >
      <div className="relative z-10 max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-5">
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${tl.rule})`,
            }}
          />
          <span
            className="font-mono text-[0.95rem] md:text-base tracking-[0.32em] uppercase font-bold"
            style={{ color: tl.ink }}
          >
            {t('common.episodeIndex')}
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background: `linear-gradient(to left, transparent, ${tl.rule})`,
            }}
          />
        </div>
        <p
          className="text-center font-serif tracking-widest text-[0.95rem] md:text-base font-bold"
          style={{ color: tl.accent }}
        >
          {timeline.length}&nbsp;&nbsp;{t('common.classifiedFiles')}
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="absolute top-0 h-full"
          style={{
            left: '1.25rem',
            width: '1px',
            background: tl.line,
          }}
        />

        {timeline.map((episode, index) => (
          <div key={episode.fileNumber} className="relative pl-16 mb-1">
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: '1.25rem',
                top: '2.25rem',
                transform: 'translate(-50%, -50%)',
                width: '1.85rem',
                height: '1.85rem',
                borderRadius: '50%',
                border: `1px solid ${tl.nodeBorder}`,
                background: tl.nodeBg,
                boxShadow: '0 1px 4px rgba(31,18,8,0.12)',
              }}
            >
              <span
                className="font-mono font-bold"
                style={{ fontSize: '0.62rem', color: tl.nodeLabel, lineHeight: 1 }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <EpisodeItem {...episode} index={index} />
          </div>
        ))}

        <div className="flex items-center gap-3 pl-16 pt-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              marginLeft: '-0.375rem',
              border: `1px solid ${tl.nodeBorder}`,
              background: tl.nodeBg,
            }}
          />
          <span
            className="font-mono text-[0.95rem] md:text-base uppercase tracking-[0.22em] font-bold"
            style={{ color: tl.inkMuted }}
          >
            {t('record.endArchive')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeTimeline;
