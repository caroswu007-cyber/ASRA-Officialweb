import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { AchievementsReportCarousel } from '../components/achievements/AchievementsReportCarousel';
import {
  ReportFlowSep,
  ReportInline,
  ReportLeftRail,
  ReportParagraphs,
} from '../components/achievements/ReportRichText';
import {
  LIVESTREAM_REPLAY_PLAYLIST,
  compressUnsplash,
} from '../content/achievements2025Content';
import { getLocalizedAchievementsAssets } from '../content/pageCopyRuntime';
import { siteContent } from '../content/siteContent';
import { useI18n } from '../i18n/LocaleProvider';

const SPIRIT_ROWS = ['1', '2', '3', '4', '5'] as const;
const INTERESTING_ROWS = ['1', '2', '3', '4', '5', '6', '7'] as const;
const MASTER_ROWS = ['1', '2', '3'] as const;
const CASE_ROWS = ['1', '2', '3', '4', '5'] as const;
const EXP_ROWS = ['1', '2', '3'] as const;
const SPECIAL_ROWS = ['1', '2', '3', '4'] as const;

function ReportHeroFigure() {
  const { t, locale } = useI18n();
  const { reportHeroFigure } = getLocalizedAchievementsAssets(locale);
  const { imageSrc, alt } = reportHeroFigure;
  const caption = t('achievementsReport.hero.caption');
  const src = imageSrc?.trim() ? compressUnsplash(imageSrc, 1600, 78) : '';

  if (!src) {
    return (
      <figure
        className="relative aspect-[4/3] w-full max-w-xl mx-auto lg:mx-0 lg:max-w-none rounded-xl border-2 border-dashed border-amber-400/35 bg-black/25 flex items-center justify-center p-6 lg:sticky lg:top-28"
        aria-label={caption}
      >
        <figcaption className="text-center text-sm lg:text-base text-slate-500 font-ui leading-relaxed max-w-sm">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="relative aspect-[4/3] w-full max-w-xl mx-auto lg:mx-0 lg:max-w-none rounded-xl overflow-hidden border border-amber-400/35 shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.06] lg:sticky lg:top-28">
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" />
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0c10]/92 via-[#0b0c10]/20 to-transparent"
        aria-hidden
      />
      <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-200/95 font-ui leading-snug bg-gradient-to-t from-black/85 to-transparent">
        {caption}
      </figcaption>
    </figure>
  );
}

function ReportSection({
  id,
  num,
  title,
  subtitle,
  children,
  emphasis = false,
  compactTop = false,
}: {
  id: string;
  num: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  emphasis?: boolean;
  compactTop?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div
        className={`report-section-slab relative ${compactTop ? 'mt-8 md:mt-10' : 'mt-12 md:mt-14'} ${emphasis ? 'report-section-slab--accent' : ''}`}
      >
        <div
          className={`relative z-[1] border-t border-amber-400/25 px-5 py-8 md:px-8 md:py-10 lg:px-11 lg:py-11 xl:px-14 xl:py-12 ${compactTop ? 'pt-7 md:pt-9' : ''}`}
        >
          <div className="flex flex-col sm:flex-row gap-5 sm:items-start mb-8">
            <div
              className="shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 items-center justify-center rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-500/25 to-amber-950/40 font-cinzel text-base sm:text-lg lg:text-xl font-bold text-amber-100 tabular-nums shadow-[0_0_28px_rgba(251,191,36,0.18)] ring-2 ring-black/20"
              aria-hidden
            >
              {num}
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <h2 className="font-cinzel text-2xl sm:text-[1.65rem] md:text-[1.8rem] lg:text-[2.05rem] xl:text-[2.25rem] font-semibold tracking-[0.05em] text-slate-50 leading-snug mb-3">
                {title}
              </h2>
              <div
                className="h-0.5 w-full max-w-md lg:max-w-xl rounded-full mb-4"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(251,191,36,0.75), rgba(251,191,36,0.25), rgba(56,189,248,0.2), transparent)',
                }}
              />
              {subtitle ? (
                <p className="text-base lg:text-lg text-slate-500/90 leading-relaxed max-w-4xl">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <div className="border-t border-white/[0.08] pt-8 lg:pt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

const OurAchievementsView = () => {
  const { t, locale } = useI18n();
  const { join } = siteContent.links;
  const { livestreamLinkPlaceholders } = getLocalizedAchievementsAssets(locale);

  return (
    <div className="relative min-h-screen pt-24 pb-20 text-[#e8e6e3] overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            '#0b0c10 radial-gradient(ellipse 100% 60% at 50% -15%, rgba(201,168,76,0.14), transparent 52%), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(56,189,248,0.06), transparent 45%)',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <article className="report-document relative z-10 mx-auto w-full max-w-[42rem] px-4 sm:px-6 lg:max-w-[min(88rem,calc(100vw-3rem))] xl:max-w-[min(92rem,calc(100vw-4rem))]">
        <header className="report-hero-frame mb-8 md:mb-10 px-5 py-8 md:px-10 md:py-11 lg:px-12 lg:py-12 xl:px-14 xl:py-14">
          <div className="report-hero-rule" />

          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:gap-12 xl:gap-14 lg:items-start">
            <div className="min-w-0 order-1">
              <p className="font-ui text-[0.65rem] sm:text-xs lg:text-sm uppercase tracking-[0.2em] text-amber-200/55 text-center lg:text-left mb-3">
                {t('achievementsReport.orgLine')}
              </p>
              <h1 className="report-hero-title text-center lg:text-left">{t('achievementsReport.title')}</h1>
              {t('achievementsReport.termGloss') ? (
                <p className="text-center lg:text-left text-sm sm:text-base text-slate-500/90 max-w-3xl mx-auto lg:mx-0 mt-4 leading-relaxed">
                  {t('achievementsReport.termGloss')}
                </p>
              ) : null}
            </div>

            <div className="mt-8 lg:mt-0 order-2 w-full min-w-0">
              <ReportHeroFigure />
            </div>
          </div>
        </header>

        <ReportFlowSep />

        <nav className="report-toc-panel px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-9 mb-10 md:mb-12" aria-labelledby="toc-heading">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" aria-hidden />
            <h2 id="toc-heading" className="report-subhead !normal-case !tracking-[0.22em] text-center shrink-0">
              {t('achievementsReport.contents')}
            </h2>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" aria-hidden />
          </div>
          <ol className="grid gap-3 md:gap-4 md:grid-cols-2 text-[1.02rem] md:text-[1.08rem] list-none pl-0 leading-snug">
            {[
              ['s1', 'Ⅰ', 'achievementsReport.toc.1'],
              ['s2', 'Ⅱ', 'achievementsReport.toc.2'],
              ['s3', 'Ⅲ', 'achievementsReport.toc.3'],
            ].map(([id, roman, key]) => (
              <li
                key={id as string}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:border-amber-400/25 hover:bg-amber-500/[0.06]"
              >
                <a href={`#${id}`} className="flex gap-3 items-start text-slate-200 hover:text-amber-100">
                  <span className="font-cinzel text-amber-400/90 tabular-nums shrink-0 pt-0.5" aria-hidden>
                    {roman}
                  </span>
                  <span className="leading-snug">{t(key)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <ReportFlowSep />

        <ReportSection id="s1" num="Ⅰ" title={t('achievementsReport.s1.title')} compactTop>
          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <ReportParagraphs text={t('achievementsReport.s1.lead')} />
          </div>

          <ReportFlowSep />

          <div className="w-full">
            <AchievementsReportCarousel width="half" />
          </div>

          <ReportFlowSep />

          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <h3 className="report-subhead mt-2 mb-4">{t('achievementsReport.s1.spiritHeading')}</h3>
            <ReportParagraphs
              text={t('achievementsReport.s1.spiritIntro')}
              paragraphClassName="mb-2 leading-relaxed text-slate-400/95 lg:leading-relaxed"
            />
          </div>

          <div className="report-metric-shell mt-8">
            <table className="report-table">
              <thead>
                <tr>
                  <th scope="col">{t('achievementsReport.th.summary')}</th>
                </tr>
              </thead>
              <tbody>
                {SPIRIT_ROWS.map(row => (
                  <tr key={row}>
                    <td className="text-slate-300">
                      <ReportInline text={t(`achievementsReport.spirit.${row}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReportFlowSep />

          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <h3 className="report-subhead mb-4">{t('achievementsReport.interesting.title')}</h3>
            <p className="mb-4 leading-relaxed text-slate-500/90">
              <ReportInline text={t('achievementsReport.interesting.intro')} />
            </p>
            <ol className="list-decimal list-outside space-y-4 pl-6 text-slate-300/95 leading-relaxed marker:text-amber-400/70">
              {INTERESTING_ROWS.map(row => (
                <li key={row}>
                  <ReportInline text={t(`achievementsReport.interesting.${row}`)} />
                </li>
              ))}
            </ol>
          </div>

          <ReportFlowSep />

          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <h3 className="report-subhead mb-4">{t('achievementsReport.master.title')}</h3>
            <ul className="space-y-5 border-l-2 border-amber-400/30 pl-5">
              {MASTER_ROWS.map(row => (
                <li key={row} className="leading-relaxed text-slate-300">
                  <ReportInline text={t(`achievementsReport.master.${row}`)} />
                </li>
              ))}
            </ul>
          </div>
        </ReportSection>

        <ReportSection id="s2" num="Ⅱ" title={t('achievementsReport.s2.title')}>
          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <p className="report-subhead mb-3">{t('achievementsReport.s2.sec51')}</p>
            <p className="text-slate-500/90 mb-3 leading-relaxed">
              <ReportInline text={t('achievementsReport.s2.condNote')} />
            </p>
            <ReportLeftRail>
              <p className="leading-relaxed text-slate-200/95">
                <ReportInline text={t('achievementsReport.s2.intro')} />
              </p>
            </ReportLeftRail>
          </div>

          <ReportFlowSep />

          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <p className="report-subhead mb-5">{t('achievementsReport.s2.sec52')}</p>
            <h3 className="report-crosshead mb-3">{t('achievementsReport.cohort.title')}</h3>
            <ReportParagraphs
              text={t('achievementsReport.cohort.body')}
              paragraphClassName="leading-relaxed text-slate-400/95 lg:leading-relaxed mb-8"
            />

            <h3 className="report-crosshead mb-3">{t('achievementsReport.tech.title')}</h3>
            <ul className="space-y-3 text-slate-300/95 list-disc pl-5 mb-0">
              <li>
                <ReportInline text={t('achievementsReport.tech.1')} />
              </li>
              <li>
                <ReportInline text={t('achievementsReport.tech.2')} />
              </li>
            </ul>
          </div>

          <ReportFlowSep />

          <p className="report-subhead mb-5 mx-auto w-full max-w-[min(72rem,100%)]">{t('achievementsReport.s2.sec53')}</p>

          <div className="report-callout-key px-4 py-5 md:px-6 md:py-6 lg:px-8 lg:py-8 mb-8 mx-auto w-full max-w-[min(72rem,100%)]">
            <p className="report-subhead mb-3 !text-sky-200/90">{t('achievementsReport.callout.principalLabel')}</p>
            <ReportParagraphs
              text={t('achievementsReport.outcomes.body')}
              paragraphClassName="leading-relaxed text-slate-200/95 lg:leading-relaxed"
            />
          </div>

          <ReportFlowSep />

          <h3 className="report-subhead mb-4">{t('achievementsReport.cases.title')}</h3>
          <div className="report-metric-shell">
            <table className="report-table">
              <thead>
                <tr>
                  <th scope="col">{t('achievementsReport.th.note')}</th>
                </tr>
              </thead>
              <tbody>
                {CASE_ROWS.map(row => (
                  <tr key={row}>
                    <td className="text-slate-300">
                      <ReportInline text={t(`achievementsReport.case.${row}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReportFlowSep />

          <div className="mx-auto w-full max-w-[min(72rem,100%)]">
            <h3 className="report-subhead mb-4">{t('achievementsReport.exp.title')}</h3>
            <ol className="list-decimal list-outside space-y-4 pl-6 text-slate-300/95 marker:text-amber-400/70">
              {EXP_ROWS.map(row => (
                <li key={row}>
                  <ReportInline text={t(`achievementsReport.exp.${row}`)} />
                </li>
              ))}
            </ol>
          </div>
        </ReportSection>

        <ReportSection id="s3" num="Ⅲ" title={t('achievementsReport.s3.title')} emphasis>
          <p className="mb-6 font-semibold text-slate-200/95 mx-auto w-full max-w-[min(72rem,100%)] leading-relaxed">
            <ReportInline text={t('achievementsReport.s3.lead')} />
          </p>

          <div className="report-metric-shell">
            <table className="report-table">
              <thead>
                <tr>
                  <th scope="col">{t('achievementsReport.th.summary')}</th>
                </tr>
              </thead>
              <tbody>
                {SPECIAL_ROWS.map(row => (
                  <tr key={row}>
                    <td className="text-slate-300">
                      <ReportInline text={t(`achievementsReport.special.${row}`)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ReportSection>

        <motion.section
          id="achievements-closing"
          className="report-closing-panel report-closing-panel--heroic mt-12 md:mt-14 scroll-mt-28"
          aria-labelledby="achievements-closing-title"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="report-closing-panel__grid" aria-hidden />
          <div className="report-closing-panel__sheen" aria-hidden />
          <div className="report-closing-panel__aurora" aria-hidden />
          <div className="report-closing-panel__inner px-5 py-12 md:px-10 md:py-14 lg:px-12 lg:py-16 xl:px-14 xl:py-[4.25rem]">
            <div className="report-closing-hero-grid">
              <div className="report-closing-hero-copy min-w-0 space-y-6 md:space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="report-closing-eyebrow">{t('achievementsReport.closing.eyebrow')}</p>
                  <h2 id="achievements-closing-title" className="report-closing-title report-closing-title--heroic">
                    {t('achievementsReport.closing.miracle')}
                  </h2>
                  <ReportParagraphs
                    text={t('achievementsReport.closing.invitation')}
                    className="!mt-8 md:!mt-10"
                    paragraphClassName="text-base md:text-[1.08rem] lg:text-lg leading-[1.75] text-slate-200/95 [&_strong]:font-semibold [&_strong]:text-amber-100"
                  />
                </motion.div>
                <div
                  className="hidden xl:block h-px w-full max-w-lg bg-gradient-to-r from-amber-400/35 via-sky-400/25 to-transparent rounded-full"
                  aria-hidden
                />
              </div>

              <div className="report-closing-hero-aside min-w-0 space-y-5 md:space-y-6">
                <motion.div
                  className="report-closing-aside-cap"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                >
                  <p className="report-subhead mb-0 !normal-case !tracking-normal text-sky-100/90">
                    {t('achievementsReport.closing.linksIntro')}
                  </p>
                </motion.div>
                <ul className="space-y-3 font-ui text-sm lg:text-base">
                  {livestreamLinkPlaceholders.map((link, i) => (
                    <motion.li
                      key={link.href}
                      className="report-closing-link-card report-closing-link-card--heroic px-4 py-3.5 md:px-5 md:py-4"
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: 0.14 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ x: 4 }}
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-medium text-amber-100/90 hover:text-amber-50"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5 opacity-70 shrink-0" aria-hidden />
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <motion.a
                  href={LIVESTREAM_REPLAY_PLAYLIST}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: 0.35 }}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.99 }}
                  className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-gradient-to-r from-amber-700/95 to-amber-600/95 px-8 py-3.5 text-sm font-semibold text-amber-50 shadow-lg shadow-black/45 ring-1 ring-amber-400/35 hover:from-amber-600 hover:to-amber-500 lg:text-base"
                >
                  {t('achievementsPage.replayPlaylist')}
                  <ExternalLink className="h-4 w-4 opacity-90 shrink-0" aria-hidden />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        <footer className="mt-14 pt-10">
          <div className="report-divider-ornament mb-8" aria-hidden>
            ◆
          </div>
          <p className="mb-8 max-w-4xl font-ui text-xs leading-relaxed text-slate-500 lg:text-sm lg:leading-relaxed xl:max-w-5xl">
            {t('achievementsPage.disclaimer')}
          </p>
          <div className="flex flex-wrap items-center gap-4 font-ui text-sm lg:text-base">
            <Link
              to="/"
              className="rounded-full border border-amber-400/35 bg-amber-500/[0.08] px-6 py-2.5 text-slate-200 transition hover:border-amber-400/50 hover:text-amber-100"
            >
              {t('achievementsPage.backHome')}
            </Link>
            <a
              href={join}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-700/85 to-amber-600/85 px-6 py-2.5 text-amber-50 font-medium shadow-md hover:from-amber-600 hover:to-amber-500"
            >
              {t('achievementsPage.ctaJoin')}
            </a>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default OurAchievementsView;
