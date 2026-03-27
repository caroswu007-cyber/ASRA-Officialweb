import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../i18n/LocaleProvider';
import { STORYLINE_OF_WOOS_URL } from '../content/founderStory2026Content';
import { getLocalizedFounderStoryContent } from '../content/pageCopyRuntime';

/**
 * Readable column: comfortable measure; consistent horizontal padding.
 * Vertical flow uses flex `gap` instead of large figure breaks (page is illustration-free).
 */
const articleShell =
  'w-full max-w-3xl md:max-w-4xl lg:max-w-[52rem] xl:max-w-[56rem] 2xl:max-w-[60rem] mx-auto px-4 sm:px-6 md:px-10 lg:px-14 xl:px-16';

const contentStackClass = `${articleShell} flex flex-col gap-14 md:gap-[4.25rem] lg:gap-[4.75rem]`;

const ACH_LINK_TOKEN = '{{%ACH%}}';

/** Inline **gold emphasis** */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} className="text-amber-100 font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const bodyProse = 'text-[0.95rem] sm:text-[1.02rem] md:text-lg lg:text-[1.125rem] leading-[1.75] text-slate-200/95';

function RichParagraph({ text, className = '' }: { text: string; className?: string }) {
  return (
    <p className={`${bodyProse} ${className}`}>
      <RichText text={text} />
    </p>
  );
}

/** Phase B copy: inline link token for `/our-achievements` (label from i18n per locale). */
function PhaseBParagraph({ text, className = '' }: { text: string; className?: string }) {
  const { t } = useI18n();
  if (!text.includes(ACH_LINK_TOKEN)) {
    return <RichParagraph text={text} className={className} />;
  }
  const [a, b] = text.split(ACH_LINK_TOKEN);
  return (
    <p className={`${bodyProse} ${className}`}>
      <RichText text={a} />
      <Link to="/our-achievements" className="text-amber-200 underline-offset-2 hover:underline font-semibold">
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
      className={`scroll-mt-28 md:scroll-mt-32 rounded-2xl border border-white/[0.1] bg-[rgba(12,16,28,0.82)] backdrop-blur-md px-4 py-7 sm:px-6 sm:py-8 md:px-10 md:py-10 ${className}`}
    >
      {children}
    </div>
  );
}

/** Sub-block inside a card: optional kicker + divider from previous */
function ContentBlock({
  title,
  children,
  showDivider,
}: {
  title?: string;
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <div className={showDivider ? 'pt-6 mt-6 border-t border-white/[0.08]' : ''}>
      {title ? (
        <h4 className="font-ui font-bold text-amber-200/90 text-base md:text-lg mb-3 tracking-wide">{title}</h4>
      ) : null}
      {children}
    </div>
  );
}

const toneDot: Record<string, string> = {
  sky: 'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.45)]',
  amber: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]',
  violet: 'bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.45)]',
  rose: 'bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.4)]',
  gold: 'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.4)]',
};

/** Date-only timeline strip (no “period” subtitle) — used for A1–A5. */
function TimelineRangeOnly({ range, tone }: { range: string; tone: string }) {
  return (
    <div className="flex gap-4 items-start mb-7 pb-7 border-b border-white/[0.09]">
      <span
        className={`mt-1.5 w-3.5 h-3.5 rounded-full shrink-0 ${toneDot[tone] ?? toneDot.sky}`}
        aria-hidden
      />
      <p className="font-mono text-sm md:text-base text-slate-300 tracking-wide pt-0.5">{range}</p>
    </div>
  );
}

const phaseExpandBtnClass =
  'w-full max-w-2xl mx-auto font-cinzel font-bold text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] px-5 sm:px-8 py-4 sm:py-5 rounded-xl border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060812]';

/** Legacy Storyline of Woos — YouTube embed only (no companion image). */
function StorylineClipBlock({ legacyStage, youtubeId }: { legacyStage: string; youtubeId: string }) {
  const { t, tFormat } = useI18n();
  return (
    <div className="mt-8 pt-8 border-t border-white/[0.08] space-y-5">
      <p className={`${bodyProse} text-slate-400 text-sm md:text-base`}>
        <RichText text={tFormat('founderStory.storylineClipLead', { stage: legacyStage })} />{' '}
        <a
          href={STORYLINE_OF_WOOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400/90 hover:text-sky-300 underline-offset-2 font-semibold break-words"
        >
          {t('founderStory.storylineClipPageLink')}
        </a>
        .
      </p>
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.12] shadow-xl shadow-black/45 bg-black">
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
          className="inline-flex items-center gap-2 text-amber-300/90 hover:text-amber-200 text-sm font-ui font-semibold underline-offset-2 hover:underline"
        >
          {t('spirit.watchYoutube')}
        </a>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] text-white tracking-tight pb-4 border-b border-amber-500/40">
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
    <div className="min-h-screen text-slate-200" style={{ background: '#060812' }}>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(201,168,76,0.12), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 60%, rgba(56,189,248,0.08), transparent 45%)',
        }}
      />

      <header className="relative z-10 pt-24 sm:pt-28 pb-10 sm:pb-14 border-b border-white/[0.09]">
        <div className={`${articleShell} flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8`}>
          <div className="max-w-3xl">
            <p
              className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] sm:tracking-[0.3em] mb-3"
              style={{ color: 'rgba(251,191,36,0.55)' }}
            >
              {p.heroBadge}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-bold cosmic-title leading-[1.12]">
              {p.heroTitle}
            </h1>
            <p className="mt-4 sm:mt-6 text-slate-300/95 font-ui text-lg sm:text-xl md:text-2xl leading-snug">{founderStorySurfaceCopy.heroNamesLine}</p>
          </div>
          <Link
            to="/about"
            className="shrink-0 self-start sm:self-end inline-flex items-center justify-center font-ui font-semibold text-base px-6 py-3 rounded-lg border border-white/20 text-slate-200 hover:bg-white/[0.06] transition-colors"
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

          <section id="truths" className="scroll-mt-28 md:scroll-mt-32 space-y-9 md:space-y-11">
            <SectionHeading>{p.truths.title}</SectionHeading>
            <div className="flex flex-col gap-8 md:gap-10">
              {p.truths.items.map(item => (
                <SectionCard key={item.label}>
                  <p
                    className="font-cinzel text-sm md:text-base uppercase tracking-[0.28em] mb-7 pb-5 border-b border-white/[0.07]"
                    style={{ color: '#c9a84c' }}
                  >
                    {item.label}
                  </p>
                  <div className="space-y-0">
                    {item.blocks.map((blk, bi) => (
                      <ContentBlock key={bi} title={'title' in blk ? blk.title : undefined} showDivider={bi > 0}>
                        <RichParagraph text={blk.text} />
                      </ContentBlock>
                    ))}
                  </div>
                </SectionCard>
              ))}
            </div>
          </section>

          <section id="phases" className="scroll-mt-28 md:scroll-mt-32 space-y-10 md:space-y-12">
            <SectionHeading>{p.phasesOverview.title}</SectionHeading>

            <div className="flex flex-col gap-8 md:gap-10">
              <SectionCard>
                <h3 className="font-ui font-bold text-sky-200 text-xl md:text-2xl mb-7 leading-snug">{p.phasesOverview.a.title}</h3>
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
                  color: '#fcd9a8',
                  borderColor: 'rgba(56,189,248,0.5)',
                  background: 'linear-gradient(180deg, rgba(56,189,248,0.1) 0%, rgba(12,16,28,0.85) 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <span className="flex items-center justify-center gap-3">
                  {phaseAOpen ? t('founderStory.collapsePhaseA') : t('founderStory.expandPhaseA')}
                  {phaseAOpen ? (
                    <ChevronUp className="w-5 h-5 shrink-0 opacity-80" aria-hidden />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0 opacity-80" aria-hidden />
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
                          <TimelineRangeOnly range={rangeText} tone={tone} />
                          <h4 className="font-cinzel text-xl md:text-2xl font-bold text-white tracking-[0.12em] mb-7">
                            {stageKey}
                          </h4>
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
                  <h3 className="font-ui font-bold text-amber-200 text-xl md:text-2xl mb-8 tracking-wide leading-snug">
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
