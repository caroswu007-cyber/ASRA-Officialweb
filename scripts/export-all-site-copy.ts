/**
 * Full site copy export: every user-facing string for EN / ZH review.
 * Run: npx tsx scripts/export-all-site-copy.ts
 * Output: docs/full_site_copy_review.csv (UTF-8 BOM, Excel-friendly)
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { messagesEn } from '../src/i18n/messages/en';
import { messagesZh } from '../src/i18n/messages/zh';
import { aboutContent, siteContent } from '../src/content/siteContent';
import { founderStoryPage, founderTimeline } from '../src/content/founderStory2026Content';
import * as ach from '../src/content/achievements2025Content';
import { spiritMedicineFileGroups } from '../src/content/spiritMedicineData';
import type { MainMetric } from '../src/content/achievements2025Content';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const OUT = join(root, 'docs', 'full_site_copy_review.csv');

const NOTE_I18N = '';
const NOTE_TRANSLATE = '源码仅英文；核对后补中文';

type Row = {
  route: string;
  source_file: string;
  content_id: string;
  kind: 'i18n' | 'content' | 'hardcoded';
  English: string;
  中文: string;
  notes: string;
};

const OMIT_KEYS = new Set([
  'videoId',
  'lengthSeconds',
  'src',
  'youtubeLink',
  'delay',
  'code',
  'icon',
  'visual',
  'tone',
  'mood',
  'platform',
  'href',
  'end',
  'suffix',
]);

function isProbablyBareUrl(s: string): boolean {
  const t = s.trim();
  return /^https?:\/\//i.test(t) && !/\s/.test(t) && t.length < 2048;
}

function escapeCsvField(s: string): string {
  const safe = String(s).replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (/[",\n]/.test(safe)) return `"${safe.replace(/"/g, '""')}"`;
  return safe;
}

function walk(
  val: unknown,
  path: string,
  ctx: { route: string; file: string },
  rows: Row[],
  kind: 'content' | 'hardcoded' = 'content',
): void {
  if (val == null) return;
  if (typeof val === 'string') {
    if (!val.trim()) return;
    if (isProbablyBareUrl(val)) return;
    rows.push({
      route: ctx.route,
      source_file: ctx.file,
      content_id: path,
      kind,
      English: val,
      中文: '',
      notes: NOTE_TRANSLATE,
    });
    return;
  }
  if (typeof val === 'number' || typeof val === 'boolean') return;
  if (Array.isArray(val)) {
    val.forEach((item, i) => walk(item, `${path}[${i}]`, ctx, rows, kind));
    return;
  }
  if (typeof val === 'object') {
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (OMIT_KEYS.has(k)) continue;
      if (k === 'link' && typeof v === 'string' && isProbablyBareUrl(v)) continue;
      const next = path ? `${path}.${k}` : k;
      walk(v, next, ctx, rows, kind);
    }
  }
}

function pushI18n(rows: Row[]): void {
  for (const key of Object.keys(messagesEn)) {
    rows.push({
      route: '(all pages via t())',
      source_file: 'src/i18n/messages/*.ts',
      content_id: key,
      kind: 'i18n',
      English: messagesEn[key] ?? '',
      中文: messagesZh[key] ?? messagesEn[key] ?? '',
      notes: NOTE_I18N,
    });
  }
}

function pushMainMetrics(rows: Row[]): void {
  const list = ach.mainMetrics as MainMetric[];
  list.forEach((m, i) => {
    const base = {
      route: '/our-achievements',
      source_file: 'src/content/achievements2025Content.ts',
      kind: 'content' as const,
      中文: '',
      notes: NOTE_TRANSLATE,
    };
    rows.push({
      ...base,
      content_id: `mainMetrics[${i}].label`,
      English: m.label,
    });
    rows.push({
      ...base,
      content_id: `mainMetrics[${i}].hint`,
      English: m.hint,
    });
    const valueText = 'text' in m ? m.text : `${m.end}${m.suffix}`;
    rows.push({
      ...base,
      content_id: `mainMetrics[${i}].displayValue`,
      English: valueText,
    });
  });
}

function pushAchievementExports(rows: Row[]): void {
  const file = 'src/content/achievements2025Content.ts';
  const route = '/our-achievements';
  const ctx = { route, file };

  const parts: [string, unknown][] = [
    ['carouselSlides', ach.carouselSlides],
    ['spiritFindings', ach.spiritFindings],
    ['interestingSpirits', ach.interestingSpirits],
    ['masterManifestations', ach.masterManifestations],
    ['conditionsTreated', ach.conditionsTreated],
    ['patientJourneySteps', ach.patientJourneySteps],
    ['livestreamTechnologies', ach.livestreamTechnologies],
    ['outcomeCases', ach.outcomeCases],
    ['experiments', ach.experiments],
    ['featuredCases', ach.featuredCases],
    ['livestreamLinkPlaceholders', ach.livestreamLinkPlaceholders],
    ['pageIntro', ach.pageIntro],
    ['sectionTitles', ach.sectionTitles],
    ['closingCopy', ach.closingCopy],
    ['scientificStockFigures', ach.scientificStockFigures],
  ];
  for (const [name, v] of parts) walk(v, name, ctx, rows);
}

function pushSpiritMedicineGroups(rows: Row[]): void {
  const ctx = {
    route: '/spirit-medicine (playlist & sections)',
    file: 'src/content/spiritMedicineData.ts',
  };
  spiritMedicineFileGroups.forEach((g, gi) => {
    walk(g, `spiritMedicineFileGroups[${gi}]`, ctx, rows);
  });
}

function pushHardcoded(rows: Row[]): void {
  const h: Omit<Row, 'English' | '中文'> & {
    English: string;
    中文: string;
  }[] = [
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'header.subtitleNames',
      kind: 'hardcoded',
      English: 'John Long Woo · Caros · Sam',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'link.organizationOverview',
      kind: 'hardcoded',
      English: '← Organization overview',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'section.timeline.heading',
      kind: 'hardcoded',
      English: 'Timeline',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'section.phaseA.detailHeading',
      kind: 'hardcoded',
      English: 'Phase A — storyline detail',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'section.phaseA.detailIntro',
      kind: 'hardcoded',
      English:
        'Stages A1–A4 follow the family’s published English chronology; A5 closes the C2 / C3 arc.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'link.achievementsVisible',
      kind: 'hardcoded',
      English: 'Our Achievements',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/founder-story',
      source_file: 'src/views/FounderStoryView.tsx',
      content_id: 'link.achievementsSuffix',
      kind: 'hardcoded',
      English: ' page',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '(* Documentary hub)',
      source_file: 'src/views/DocumentarySeriesView.tsx',
      content_id: 'note.prefix',
      kind: 'hardcoded',
      English: '* Note:',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '(App shell)',
      source_file: 'src/App.tsx',
      content_id: 'suspense.loading',
      kind: 'hardcoded',
      English: 'Loading…',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '(document)',
      source_file: 'index.html',
      content_id: 'title',
      kind: 'hardcoded',
      English: 'Spirit Ambassador Association',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'footer.backHome',
      kind: 'hardcoded',
      English: '← Back to Home',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/components/achievements/LivestreamCarousel.tsx',
      content_id: 'cta.openPlaylist',
      kind: 'hardcoded',
      English: 'Open playlist',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/record-of-soul',
      source_file: 'src/components/record/EpisodeCard.tsx',
      content_id: 'youtube.cta',
      kind: 'hardcoded',
      English: '▶ Watch on YouTube',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '(* collapsible)',
      source_file: 'src/components/achievements/CollapsibleText.tsx',
      content_id: 'toggle.showMore',
      kind: 'hardcoded',
      English: 'Show more',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '(* collapsible)',
      source_file: 'src/components/achievements/CollapsibleText.tsx',
      content_id: 'toggle.showLess',
      kind: 'hardcoded',
      English: 'Show less',
      中文: '',
      notes: NOTE_TRANSLATE,
    },

    /* ─── OurAchievementsView.tsx — inline copy not in content/*.ts ─── */
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'hero.replayPlaylistButton',
      kind: 'hardcoded',
      English: 'Replay playlist',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'hero.pill.sessions265',
      kind: 'hardcoded',
      English: '265+ sessions',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'hero.pill.hours800',
      kind: 'hardcoded',
      English: '800+ hrs',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'hero.pill.reach70k',
      kind: 'hardcoded',
      English: '70k+ reach',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.findings.subtitle',
      kind: 'hardcoded',
      English: 'Synthesis from baseline interviews with American spirits (ghosts).',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.interesting.subtitle',
      kind: 'hardcoded',
      English: 'Notable attached-spirit presentations — use “Show more” when a card runs long.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.master.subtitle',
      kind: 'hardcoded',
      English: 'Chronological highlights from livestreams.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'cohort.sources.body',
      kind: 'hardcoded',
      English:
        'Treatment-resistant, refractory cases predominantly entered through TikTok recommendations with a “free trial” posture. All management work occurred in live field conditions with master spirit collaboration.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'cohort.process.stageHint',
      kind: 'hardcoded',
      English: ' — stages connect in order below.',
      中文: '',
      notes: NOTE_TRANSLATE + '（接在 sectionTitles.journey 译文之后）',
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.tech.subtitle',
      kind: 'hardcoded',
      English: 'Two intervention modalities used with master-spirit coordination.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'tech.card.labelPrefix',
      kind: 'hardcoded',
      English: 'Technology ',
      中文: '',
      notes: NOTE_TRANSLATE + '（后接数字 1、2）',
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'tech.illumination.head',
      kind: 'hardcoded',
      English: 'Head',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'tech.illumination.chest',
      kind: 'hardcoded',
      English: 'Chest',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'tech.illumination.back',
      kind: 'hardcoded',
      English: 'Back',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'spiritFinding.pie.legend',
      kind: 'hardcoded',
      English: 'no memory',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'spiritFinding.flow.master',
      kind: 'hardcoded',
      English: 'Master',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'spiritFinding.flow.host',
      kind: 'hardcoded',
      English: 'Host',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'masterCard.hostPrefix',
      kind: 'hardcoded',
      English: 'Host · ',
      中文: '',
      notes: NOTE_TRANSLATE + '（后接主播名）',
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'outcomes.reliefParagraph',
      kind: 'hardcoded',
      English:
        'Within 30 minutes, >80% of hosts and attached spirits report relief from acute mental suffering (spirits also presented with disorder states). As of December 24, 2025, most had not requested secondary management — suggesting no relapse in that window.',
      中文: '',
      notes: NOTE_TRANSLATE + '（原文含 HTML <strong>，上线时需保留强调结构）',
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'outcomes.rapidReliefLabel',
      kind: 'hardcoded',
      English: 'rapid relief',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.outcomes.subtitle',
      kind: 'hardcoded',
      English: 'Reported relief windows and anonymized case snapshots.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.experiments.subtitle',
      kind: 'hardcoded',
      English: 'Structured trials conducted within live sessions.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.special.subtitle',
      kind: 'hardcoded',
      English: 'Long-form case dossiers — long text folds open per card.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'featuredCase.footer',
      kind: 'hardcoded',
      English: 'For full session context, use the live archives linked above.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'section.links.subtitle',
      kind: 'hardcoded',
      English: 'Official channels and placeholders for mirrors once published.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'links.archivePlaceholder',
      kind: 'hardcoded',
      English: 'Search & calendar filters — connect when your archive API is ready.',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/our-achievements',
      source_file: 'src/views/OurAchievementsView.tsx',
      content_id: 'footer.applyJoin',
      kind: 'hardcoded',
      English: 'Apply / Join',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/',
      source_file: 'src/components/home/Achievements.tsx',
      content_id: 'homeAchievements.badge.fieldDoc',
      kind: 'hardcoded',
      English: 'Field documentation',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
    {
      route: '/',
      source_file: 'src/components/home/Achievements.tsx',
      content_id: 'homeAchievements.badge.cohortMetrics',
      kind: 'hardcoded',
      English: 'Live cohort metrics',
      中文: '',
      notes: NOTE_TRANSLATE,
    },
  ];
  rows.push(...h);
}

function main(): void {
  const rows: Row[] = [];

  pushI18n(rows);

  walk(aboutContent, 'aboutContent', { route: '/about', file: 'src/content/siteContent.ts' }, rows);
  walk(siteContent.home, 'siteContent.home', { route: '/', file: 'src/content/siteContent.ts' }, rows);
  walk(siteContent.recordOfSoul, 'siteContent.recordOfSoul', { route: '/record-of-soul', file: 'src/content/siteContent.ts' }, rows);
  /** Hub copy only — episode titles live in `spiritMedicineFileGroups` (no duplicate rows). */
  walk(
    {
      title: siteContent.spiritMedicine.title,
      description: siteContent.spiritMedicine.description,
      note: siteContent.spiritMedicine.note,
    },
    'siteContent.spiritMedicine',
    { route: '/spirit-medicine', file: 'src/content/siteContent.ts' },
    rows,
  );
  walk(siteContent.universalMatrix, 'siteContent.universalMatrix', { route: '/universal-matrix', file: 'src/content/siteContent.ts' }, rows);

  walk(founderStoryPage, 'founderStoryPage', { route: '/founder-story', file: 'src/content/founderStory2026Content.ts' }, rows);
  walk(founderTimeline, 'founderTimeline', { route: '/founder-story', file: 'src/content/founderStory2026Content.ts' }, rows);

  pushMainMetrics(rows);
  pushAchievementExports(rows);
  pushSpiritMedicineGroups(rows);
  pushHardcoded(rows);

  const header = [
    'route',
    'source_file',
    'content_id',
    'kind',
    'English',
    '中文',
    'notes',
  ];
  const lines = [
    header.join(','),
    ...rows.map(r =>
      [
        r.route,
        r.source_file,
        r.content_id,
        r.kind,
        r.English,
        r.中文,
        r.notes,
      ].map(escapeCsvField).join(','),
    ),
  ];

  writeFileSync(OUT, '\ufeff' + lines.join('\r\n'), 'utf8');
  console.log(`Wrote ${OUT} (${rows.length} data rows + header)`);
}

main();
