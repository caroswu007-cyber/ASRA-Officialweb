import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n/LocaleProvider';
import { getLocalizedFounderStoryContent } from '../content/pageCopyRuntime';

const articleShell =
  'w-full max-w-3xl md:max-w-4xl lg:max-w-[52rem] xl:max-w-[56rem] 2xl:max-w-[60rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16';

const contentStackClass = `${articleShell} flex flex-col gap-14 md:gap-[4.25rem] lg:gap-[4.75rem]`;

const ACH_LINK_TOKEN = '{{%ACH%}}';

/** Inline **amber emphasis** */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={{ color: '#8B5413', fontWeight: 600 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const bodyProse = 'text-[0.95rem] sm:text-[1.02rem] md:text-lg lg:text-[1.125rem] leading-[1.75]';

function RichParagraph({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={`${bodyProse} ${className}`} style={{ color: '#3D2510' }}>
      <RichText text={text} />
    </p>
  );
}

function PhaseBParagraph({ text, className = '' }: { text: string; className?: string }) {
  const { t } = useI18n();
  if (!text.includes(ACH_LINK_TOKEN)) {
    return <RichParagraph text={text} className={className} />;
  }
  const [a, b] = text.split(ACH_LINK_TOKEN);
  return (
    <p className={`${bodyProse} ${className}`} style={{ color: '#3D2510' }}>
      <RichText text={a} />
      <Link to="/our-achievements" style={{ color: '#C27B20' }} className="underline-offset-2 hover:underline font-semibold">
        {t('founderStory.achievementsFeaturePageLink')}
      </Link>
      <RichText text={b} />
    </p>
  );
}

function SectionCard({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-28 md:scroll-mt-32 rounded-xl px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 ${className}`}
      style={{
        background: 'rgba(251,246,238,0.88)',
        border: '1px solid rgba(31,18,8,0.09)',
        boxShadow: '0 2px 18px rgba(31,18,8,0.06)',
      }}
    >
      {children}
    </div>
  );
}

function DarkSectionCard({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      id={id}
      className={`scroll-mt-28 md:scroll-mt-32 rounded-2xl px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 relative overflow-hidden ${className}`}
      style={{
        background: '#1A0F05',
        border: '1px solid rgba(194,123,32,0.2)',
        boxShadow: '0 8px 40px rgba(31,18,8,0.3)',
      }}
    >
      {/* Amber inner glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 90% 65% at 50% 40%, rgba(194,123,32,0.18) 0%, rgba(139,84,19,0.09) 45%, transparent 70%),
          radial-gradient(ellipse 40% 35% at 85% 90%, rgba(194,123,32,0.06) 0%, transparent 55%)
        `,
      }} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function ContentBlock({
  title,
  children,
  showDivider,
  dark = false,
}: {
  title?: string;
  children: React.ReactNode;
  showDivider?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={showDivider ? 'pt-6 mt-6' : ''} style={showDivider ? { borderTop: `1px solid ${dark ? 'rgba(212,168,83,0.12)' : 'rgba(31,18,8,0.08)'}` } : {}}>
      {title ? (
        <h4 className="font-cinzel font-bold text-base md:text-lg mb-3 tracking-wide" style={{ color: dark ? '#D4A853' : '#8B5413' }}>{title}</h4>
      ) : null}
      {children}
    </div>
  );
}

const toneDotStyle: Record<string, React.CSSProperties> = {
  sky:    { background: '#C27B20', boxShadow: '0 0 10px rgba(194,123,32,0.35)' },
  amber:  { background: '#C27B20', boxShadow: '0 0 10px rgba(194,123,32,0.35)' },
  violet: { background: '#8B5413', boxShadow: '0 0 10px rgba(139,84,19,0.35)' },
  rose:   { background: '#7A5C3A', boxShadow: '0 0 10px rgba(122,92,58,0.3)' },
  gold:   { background: '#E09A42', boxShadow: '0 0 10px rgba(224,154,66,0.35)' },
};

function TimelineRangeOnly({
  range,
  tone,
  stageLabel,
}: {
  range: string;
  tone: string;
  stageLabel?: string;
}) {
  const alignDot = stageLabel ? 'items-center' : 'items-start';
  return (
    <div className={`flex gap-4 ${alignDot} mb-7 pb-7`} style={{ borderBottom: '1px solid rgba(31,18,8,0.08)' }}>
      <span
        className={`w-3.5 h-3.5 rounded-full shrink-0 ${stageLabel ? '' : 'mt-1.5'}`}
        style={toneDotStyle[tone] ?? toneDotStyle.amber}
        aria-hidden
      />
      <div className="flex-1 min-w-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className={`font-cinzel text-sm md:text-base tracking-wide ${stageLabel ? '' : 'pt-0.5'}`} style={{ color: '#9B8E80' }}>
          {range}
        </p>
        {stageLabel ? (
          <span className="font-cinzel text-base md:text-lg font-bold tracking-[0.12em] shrink-0" style={{ color: '#1F1208' }}>
            {stageLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const phaseExpandBtnClass =
  'w-full max-w-2xl mx-auto font-cinzel font-bold text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] px-5 sm:px-8 py-4 sm:py-5 rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2';

function ArchiveButton({
  to,
  children,
  dark = false,
}: {
  to: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-cinzel font-semibold text-sm uppercase tracking-[0.14em] px-5 py-3 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
      style={dark ? {
        color: '#D4A853',
        border: '1px solid rgba(212,168,83,0.35)',
        background: 'rgba(212,168,83,0.07)',
      } : {
        color: '#8B5413',
        border: '1px solid rgba(139,84,19,0.3)',
        background: 'rgba(139,84,19,0.05)',
      }}
    >
      {children}
      <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" aria-hidden />
    </Link>
  );
}

function ArchiveButtonRow({
  buttons,
  dark = false,
}: {
  buttons: { to: string; label: string }[];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3 mt-5 pt-5" style={{ borderTop: dark ? '1px solid rgba(212,168,83,0.12)' : '1px solid rgba(31,18,8,0.08)' }}>
      {buttons.map(btn => (
        <ArchiveButton key={btn.to} to={btn.to} dark={dark}>
          {btn.label}
        </ArchiveButton>
      ))}
    </div>
  );
}

function StorylineClipBlock({ legacyStage, youtubeId }: { legacyStage: string; youtubeId: string }) {
  const { t, tFormat } = useI18n();
  return (
    <div className="mt-8 pt-8 space-y-3" style={{ borderTop: '1px solid rgba(31,18,8,0.08)' }}>
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl bg-black"
          style={{ border: '1px solid rgba(31,18,8,0.12)' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={tFormat('founderStory.storylineYoutubeIframeTitle', { stage: legacyStage })}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-cinzel font-semibold underline-offset-2 hover:underline"
          style={{ color: '#C27B20' }}
        >
          {t('spirit.watchYoutube')}
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] tracking-tight pb-4"
      style={{
        color: dark ? '#F5EDE0' : '#1F1208',
        borderBottom: dark ? '1px solid rgba(212,168,83,0.35)' : '1px solid rgba(194,123,32,0.3)',
      }}>
      {children}
    </h2>
  );
}

const FounderStoryView = () => {
  const { locale, t } = useI18n();
  const { page: p, surfaceCopy: founderStorySurfaceCopy, timeline: founderTimeline } = getLocalizedFounderStoryContent(locale);
  const [phaseAOpen, setPhaseAOpen] = useState(false);

  const timelineRowForStage = (stageId: string) =>
    founderTimeline.find(row => row.phase === stageId.toUpperCase());

  return (
    <div className="min-h-screen ed-vignette" style={{ background: '#F5EDE0', color: '#1F1208' }}>
      {/* Subtle warm ambient — replaces dark radial glows */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.5]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(194,123,32,0.1), transparent 50%)',
        }}
      />

      <header className="relative z-10 pt-24 sm:pt-28 pb-10 sm:pb-14"
        style={{ borderBottom: '1px solid rgba(31,18,8,0.1)' }}>
        <div className={`${articleShell} flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8`}>
          <div className="max-w-3xl">
            <p
              className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] sm:tracking-[0.3em] mb-3"
              style={{ color: 'rgba(194,123,32,0.65)' }}
            >
              {p.heroBadge}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold cosmic-title leading-[1.12]">
              {p.heroTitle}
            </h1>
            <p className="mt-4 sm:mt-6 font-cinzel text-lg sm:text-xl md:text-2xl leading-snug" style={{ color: '#3D2510' }}>{founderStorySurfaceCopy.heroNamesLine}</p>
          </div>
          <Link
            to="/about"
            className="shrink-0 self-start sm:self-end inline-flex items-center justify-center font-cinzel font-semibold text-base px-6 py-3 rounded-lg transition-colors"
            style={{ border: '1px solid rgba(31,18,8,0.18)', color: '#3D2510', background: 'rgba(31,18,8,0.03)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(31,18,8,0.07)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(31,18,8,0.03)'; }}
          >
            {founderStorySurfaceCopy.backToAbout}
          </Link>
        </div>
      </header>

      <div className="relative z-10 pb-32 pt-12 md:pt-16">
        <div className={contentStackClass}>
          <SectionCard id="intro">
            <RichParagraph
              text={p.intro}
              className="font-light !text-[0.97rem] sm:!text-[1.08rem] md:!text-xl lg:!text-[1.35rem] !leading-[1.68] first:mt-0"
            />
          </SectionCard>

          <section id="truths" className="scroll-mt-28 md:scroll-mt-32">
            {/* Self-contained dark walnut panel — no negative insets */}
            <div
              className="relative overflow-hidden rounded-2xl p-6 sm:p-8 md:p-10"
              style={{
                background: '#160D04',
                border: '1px solid rgba(194,123,32,0.18)',
                boxShadow: '0 12px 48px rgba(31,18,8,0.35)',
              }}
            >
              {/* Amber inner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `
                  radial-gradient(ellipse 80% 55% at 50% 35%, rgba(194,123,32,0.2) 0%, rgba(139,84,19,0.1) 45%, transparent 70%),
                  radial-gradient(ellipse 40% 30% at 10% 85%, rgba(194,123,32,0.06) 0%, transparent 55%),
                  radial-gradient(ellipse 35% 30% at 90% 15%, rgba(194,123,32,0.06) 0%, transparent 55%)
                `,
              }} />
              <div className="relative z-10 space-y-9 md:space-y-11">
                <SectionHeading dark>{p.truths.title}</SectionHeading>
                <div className="flex flex-col gap-8 md:gap-10">
                  {p.truths.items.map((item, ii) => (
                    <DarkSectionCard key={item.label}>
                      <p
                        className="font-cinzel text-sm md:text-base uppercase tracking-[0.28em] mb-7 pb-5"
                        style={{ color: '#D4A853', borderBottom: '1px solid rgba(212,168,83,0.18)' }}
                      >
                        {item.label}
                      </p>
                      <div className="space-y-0">
                        {item.blocks.map((blk, bi) => (
                          <ContentBlock key={bi} title={'title' in blk ? blk.title : undefined} showDivider={bi > 0} dark>
                            <p className={`${bodyProse}`} style={{ color: 'rgba(245,237,224,0.85)' }}>
                              <RichText text={blk.text} />
                            </p>
                          </ContentBlock>
                        ))}
                      </div>
                      {ii === 0 && (
                        <ArchiveButtonRow
                          dark
                          buttons={[
                            { to: '/record-of-soul', label: locale === 'zh' ? '吴氏灵体档案 →' : 'Woos Record of Soul →' },
                            { to: '/spirit-medicine', label: locale === 'zh' ? '灵魂医学视频档案 →' : 'Spirit Medicine Archive →' },
                          ]}
                        />
                      )}
                      {ii === 2 && (
                        <ArchiveButtonRow
                          dark
                          buttons={[
                            { to: '/universal-matrix', label: locale === 'zh' ? '万有元神母体视频档案 →' : 'Universal Matrix Archive →' },
                          ]}
                        />
                      )}
                    </DarkSectionCard>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="phases" className="scroll-mt-28 md:scroll-mt-32 space-y-10 md:space-y-12">
            <SectionHeading>{p.phasesOverview.title}</SectionHeading>

            <div className="flex flex-col gap-8 md:gap-10">
              <SectionCard>
                <h3 className="font-cinzel font-bold text-xl md:text-2xl mb-7 leading-snug" style={{ color: '#C27B20' }}>{p.phasesOverview.a.title}</h3>
                {p.phasesOverview.a.blocks.map((blk, bi) => (
                  <ContentBlock key={bi} title={blk.title} showDivider={bi > 0}>
                    <RichParagraph text={blk.text} />
                  </ContentBlock>
                ))}
              </SectionCard>

              <button
                type="button"
                id="founder-phase-a-toggle"
                aria-expanded={phaseAOpen}
                onClick={() => setPhaseAOpen(v => !v)}
                className={phaseExpandBtnClass}
                style={{
                  color: '#3D2510',
                  borderColor: 'rgba(194,123,32,0.4)',
                  background: 'rgba(194,123,32,0.05)',
                  boxShadow: '0 4px 20px rgba(31,18,8,0.08)',
                }}
              >
                <span className="flex items-center justify-center gap-3">
                  {phaseAOpen ? t('founderStory.collapsePhaseA') : t('founderStory.expandPhaseA')}
                  {phaseAOpen ? (
                    <ChevronUp className="w-5 h-5 shrink-0 opacity-70" aria-hidden />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0 opacity-70" aria-hidden />
                  )}
                </span>
              </button>

              {phaseAOpen ? (
                <div id="chronology-phase-a" className="flex flex-col gap-10 md:gap-12 -mt-1">
                  {p.phaseAStages.map(stage => {
                    const tl = timelineRowForStage(stage.id);
                    const rangeText = tl?.range ?? stage.range;
                    const tone = tl?.tone ?? 'amber';
                    const stageKey = stage.id.replace(/^a/i, 'A');
                    return (
                      <div key={stage.id} id={stage.id} className="scroll-mt-28 md:scroll-mt-32">
                        <SectionCard>
                          <TimelineRangeOnly range={rangeText} tone={tone} stageLabel={stageKey} />
                          <div className="space-y-0">
                            {stage.paragraphs.map((para, pi) => (
                              <ContentBlock key={pi} showDivider={pi > 0}>
                                <RichParagraph text={para} />
                              </ContentBlock>
                            ))}
                          </div>
                          {'storylineClip' in stage && stage.storylineClip ? (
                            <StorylineClipBlock {...stage.storylineClip} />
                          ) : null}
                        </SectionCard>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <section id={p.phaseB.id} className="scroll-mt-28 md:scroll-mt-32 pt-2 md:pt-4">
                <SectionCard>
                  <h3 className="font-cinzel font-bold text-xl md:text-2xl mb-8 tracking-wide leading-snug" style={{ color: '#8B5413' }}>
                    {p.phaseB.title}
                  </h3>
                  <div className="space-y-0">
                    {p.phaseB.blocks.map((blk, bi) => (
                      <ContentBlock key={bi} title={blk.title} showDivider={bi > 0}>
                        <PhaseBParagraph text={blk.text} />
                      </ContentBlock>
                    ))}
                  </div>
                </SectionCard>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FounderStoryView;
