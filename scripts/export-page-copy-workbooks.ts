/**
 * One workbook (.xlsx) per major page: block_key, section, kind, English/source, 中文, Latina.
 * Run: npx tsx scripts/export-page-copy-workbooks.ts
 * Output: docs/page-copy/
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';
import { achievementsReportEn, achievementsReportZh } from '../src/i18n/messages/achievementsReport.i18n';
import { messagesEn } from '../src/i18n/messages/en';
import { messagesZh } from '../src/i18n/messages/zh';
import { aboutContent, siteContent } from '../src/content/siteContent';
import { founderStoryPage, founderStorySurfaceCopy, founderTimeline } from '../src/content/founderStory2026Content';
import {
  carouselSlides,
  livestreamLinkPlaceholders,
  reportHeroFigure,
} from '../src/content/achievements2025Content';
import { spiritMedicineOfficialOutline } from '../src/content/spiritMedicineOfficialOutline';
import { spiritMedicineFileGroups } from '../src/content/spiritMedicineData';
import { universalMatrixFiles } from '../src/content/universalMatrixSeries';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'docs', 'page-copy');

type CopyRow = {
  block_key: string;
  section_板块: string;
  kind: string;
  english_源文: string;
  中文: string;
  Latin_Latina: string;
  notes: string;
};

function inferKind(key: string): string {
  const k = key.toLowerCase();
  if (k.includes('.cta') || k.includes('button') || k.includes('nav.') || k.includes('watch') || k.includes('open')) {
    return 'button / link';
  }
  if (k.includes('title') || k.includes('heading') || k.includes('badge') || k.includes('label') && !k.includes('body')) {
    return 'heading';
  }
  if (k.includes('pill') || k.includes('kicker') || k.includes('season') || k.includes('abbr')) {
    return 'label';
  }
  return 'paragraph / other';
}

function rowsForKeys(
  keys: string[],
  section: string,
  en: Record<string, string>,
  zh: Record<string, string>,
  notes = '',
): CopyRow[] {
  return keys.map(k => ({
    block_key: k,
    section_板块: section,
    kind: inferKind(k),
    english_源文: en[k] ?? '',
    中文: zh[k] ?? '',
    Latin_Latina: '',
    notes,
  }));
}

function pickKeys(prefix: string): string[] {
  return Object.keys(messagesEn)
    .filter(k => k.startsWith(prefix))
    .sort();
}

/** Split into EN vs 中文 columns for proofreading (CJK-heavy → 中文). */
function proofreadColumns(text: string): { en: string; zh: string } {
  const s = text.trim();
  if (!s) return { en: '', zh: '' };
  const cjk = (s.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const letters = (s.match(/[A-Za-z]/g) ?? []).length;
  if (cjk > 0 && (letters === 0 || cjk >= letters * 0.22)) {
    return { en: '', zh: s };
  }
  return { en: s, zh: '' };
}

function sheetFromRows(rows: CopyRow[], name: string): XLSX.WorkSheet {
  const data = rows.map(r => ({
    block_key: r.block_key,
    section_板块: r.section_板块,
    kind: r.kind,
    english_源文: r.english_源文,
    中文: r.中文,
    Latin_Latina: r.Latin_Latina,
    notes: r.notes,
  }));
  return XLSX.utils.json_to_sheet(data);
}

/** Long-form English in siteContent (no zh yet) — one row per leaf string. */
function flattenAboutStatic(): CopyRow[] {
  const rows: CopyRow[] = [];
  const add = (block_key: string, section: string, text: string, kind: string) => {
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: text,
      中文: '',
      Latin_Latina: '',
      notes: 'siteContent.aboutContent — add 中文/Latin in sheet',
    });
  };
  add('aboutContent.orgName', '组织介绍 / 元数据', aboutContent.orgName, 'label');
  add('aboutContent.orgSubtitle', '组织介绍 / 元数据', aboutContent.orgSubtitle, 'label');
  add('aboutContent.tagline', '组织介绍 / 英雄区副标题', aboutContent.tagline, 'paragraph / other');
  add('aboutContent.overview', '组织介绍 / 总述', aboutContent.overview.trim(), 'paragraph / other');
  add('aboutContent.asra.name', '组织介绍 / ASra', aboutContent.asra.name, 'heading');
  add('aboutContent.asra.abbr', '组织介绍 / ASra', aboutContent.asra.abbr, 'label');
  add('aboutContent.asra.domain', '组织介绍 / ASra', aboutContent.asra.domain, 'label');
  add('aboutContent.asra.description', '组织介绍 / ASra', aboutContent.asra.description.trim(), 'paragraph / other');
  add('aboutContent.smsc.name', '组织介绍 / SMSC', aboutContent.smsc.name, 'heading');
  add('aboutContent.smsc.abbr', '组织介绍 / SMSC', aboutContent.smsc.abbr, 'label');
  add('aboutContent.smsc.domain', '组织介绍 / SMSC', aboutContent.smsc.domain, 'label');
  add('aboutContent.smsc.description', '组织介绍 / SMSC', aboutContent.smsc.description.trim(), 'paragraph / other');
  add('aboutContent.partnership', '组织介绍 / 合作关系', aboutContent.partnership.trim(), 'paragraph / other');
  add('aboutContent.founders.title', '组织介绍 / 创始者', aboutContent.founders.title, 'heading');
  add('aboutContent.founders.subtitle', '组织介绍 / 创始者', aboutContent.founders.subtitle, 'label');
  add('aboutContent.founders.description', '组织介绍 / 创始者', aboutContent.founders.description.trim(), 'paragraph / other');
  add('aboutContent.founders.storyTeaser', '组织介绍 / 创始者', aboutContent.founders.storyTeaser.trim(), 'paragraph / other');
  aboutContent.missions.forEach((m, i) => {
    add(`aboutContent.missions[${i}].number`, '组织介绍 / 使命', m.number, 'label');
    add(`aboutContent.missions[${i}].title`, '组织介绍 / 使命', m.title, 'heading');
    add(`aboutContent.missions[${i}].description`, '组织介绍 / 使命', m.description.trim(), 'paragraph / other');
    add(`aboutContent.missions[${i}].tag`, '组织介绍 / 使命', m.tag, 'label');
  });
  return rows;
}

function flattenFounderStory(zhPack: Record<string, string>): CopyRow[] {
  const rows: CopyRow[] = [];
  const add = (block_key: string, section: string, text: string, kind: string) => {
    const { en, zh } = proofreadColumns(text);
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: en,
      中文: zh,
      Latin_Latina: '',
      notes: 'founderStory2026Content.ts — ** in source = emphasis',
    });
  };
  const addPhaseBi18n = (block_key: string, section: string, enText: string, kind: string, zhKey: string) => {
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: enText.trim(),
      中文: zhPack[zhKey] ?? '',
      Latin_Latina: '',
      notes: `Phase B: EN = content file; 中文 = zh.ts → ${zhKey}`,
    });
  };
  add('founderStoryPage.heroTitle', '创始人故事 / 英雄区', founderStoryPage.heroTitle, 'heading');
  add('founderStoryPage.heroBadge', '创始人故事 / 英雄区', founderStoryPage.heroBadge, 'label');
  add('founderStoryPage.intro', '创始人故事 / 引言', founderStoryPage.intro.trim(), 'paragraph / other');
  add('founderStoryPage.truths.title', '创始人故事 / 三个真相', founderStoryPage.truths.title, 'heading');
  founderStoryPage.truths.items.forEach((item, ii) => {
    add(`founderStoryPage.truths.items[${ii}].label`, '创始人故事 / 三个真相', item.label, 'label');
    item.blocks.forEach((blk, bi) => {
      const title = 'title' in blk ? blk.title : '';
      const base = `founderStoryPage.truths.items[${ii}].blocks[${bi}]`;
      if (title) add(`${base}.title`, '创始人故事 / 三个真相', title, 'heading');
      add(`${base}.text`, '创始人故事 / 三个真相', blk.text.trim(), 'paragraph / other');
    });
  });
  add('founderStoryPage.phasesOverview.title', '创始人故事 / 两大阶段', founderStoryPage.phasesOverview.title, 'heading');
  add('founderStoryPage.phasesOverview.a.title', '创始人故事 / Phase A 概要', founderStoryPage.phasesOverview.a.title, 'heading');
  founderStoryPage.phasesOverview.a.blocks.forEach((blk, bi) => {
    add(`founderStoryPage.phasesOverview.a.blocks[${bi}].title`, '创始人故事 / Phase A 概要', blk.title, 'heading');
    add(`founderStoryPage.phasesOverview.a.blocks[${bi}].text`, '创始人故事 / Phase A 概要', blk.text.trim(), 'paragraph / other');
  });
  founderStoryPage.phaseAStages.forEach((st, si) => {
    add(`founderStoryPage.phaseAStages[${si}].label`, '创始人故事 / A 阶段', st.label, 'label');
    add(`founderStoryPage.phaseAStages[${si}].stageTitle`, '创始人故事 / A 阶段', st.stageTitle, 'heading');
    add(`founderStoryPage.phaseAStages[${si}].range`, '创始人故事 / A 阶段', st.range, 'label');
    st.paragraphs.forEach((p, pi) => {
      add(`founderStoryPage.phaseAStages[${si}].paragraphs[${pi}]`, '创始人故事 / A 阶段', p.trim(), 'paragraph / other');
    });
  });
  addPhaseBi18n(
    'founderStoryPage.phaseB.title',
    '创始人故事 / Phase B',
    founderStoryPage.phaseB.title,
    'heading',
    'founderStory.phaseB.title',
  );
  founderStoryPage.phaseB.blocks.forEach((blk, bi) => {
    addPhaseBi18n(
      `founderStoryPage.phaseB.blocks[${bi}].title`,
      '创始人故事 / Phase B',
      blk.title,
      'heading',
      `founderStory.phaseB.block${bi}.title`,
    );
    addPhaseBi18n(
      `founderStoryPage.phaseB.blocks[${bi}].text`,
      '创始人故事 / Phase B',
      blk.text.trim(),
      'paragraph / other',
      `founderStory.phaseB.block${bi}.text`,
    );
  });
  founderTimeline.forEach((row, ti) => {
    add(`founderTimeline[${ti}].range`, '创始人故事 / 年表', row.range, 'label');
    add(`founderTimeline[${ti}].label`, '创始人故事 / 年表', row.label, 'label');
  });
  return rows;
}

function flattenFounderSurfaceCopy(): CopyRow[] {
  const s = founderStorySurfaceCopy;
  const add = (block_key: string, section: string, text: string, kind: string) => {
    const { en: enCol, zh: zhCol } = proofreadColumns(text);
    return {
      block_key,
      section_板块: section,
      kind,
      english_源文: enCol,
      中文: zhCol,
      Latin_Latina: '',
      notes: 'founderStorySurfaceCopy — FounderStoryView chrome',
    } satisfies CopyRow;
  };
  return [
    add('founderStorySurfaceCopy.heroNamesLine', '创始人故事 / 英雄区副标题', s.heroNamesLine, 'label'),
    add('founderStorySurfaceCopy.backToAbout', '创始人故事 / 返回', s.backToAbout, 'button / link'),
  ];
}

function flattenRecordOfSoul(): CopyRow[] {
  const r = siteContent.recordOfSoul;
  const rows: CopyRow[] = [];
  const add = (block_key: string, section: string, text: string, kind: string) => {
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: text,
      中文: '',
      Latin_Latina: '',
      notes: 'siteContent.recordOfSoul',
    });
  };
  add('siteContent.recordOfSoul.title', '灵魂档案 / 英雄区', r.title, 'heading');
  add('siteContent.recordOfSoul.description', '灵魂档案 / 英雄区', r.description.trim(), 'paragraph / other');
  add('siteContent.recordOfSoul.note', '灵魂档案 / 注释', r.note.trim(), 'paragraph / other');
  add('siteContent.recordOfSoul.episodesCount', '灵魂档案 / 统计', r.episodesCount, 'label');
  add('siteContent.recordOfSoul.minutes', '灵魂档案 / 统计', r.minutes, 'label');
  r.timeline.forEach((ep, ei) => {
    add(`recordOfSoul.timeline[${ei}].fileNumber`, '灵魂档案 / 剧集', ep.fileNumber, 'label');
    add(`recordOfSoul.timeline[${ei}].title`, '灵魂档案 / 剧集', ep.title, 'heading');
    add(`recordOfSoul.timeline[${ei}].abstract`, '灵魂档案 / 剧集', ep.abstract.trim(), 'paragraph / other');
    if (ep.keyFeatures) {
      add(`recordOfSoul.timeline[${ei}].keyFeatures`, '灵魂档案 / 剧集', ep.keyFeatures.trim(), 'paragraph / other');
    }
    add(`recordOfSoul.timeline[${ei}].videoLength`, '灵魂档案 / 剧集', ep.videoLength, 'label');
  });
  return rows;
}

function flattenSpiritMedicineExtra(): CopyRow[] {
  const d = siteContent.spiritMedicine;
  const rows: CopyRow[] = [];
  const add = (block_key: string, section: string, text: string, kind: string) => {
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: text,
      中文: '',
      Latin_Latina: '',
      notes: 'siteContent.spiritMedicine',
    });
  };
  add('siteContent.spiritMedicine.title', '灵体医学 / 英雄区', d.title, 'heading');
  add('siteContent.spiritMedicine.description', '灵体医学 / 英雄区', d.description.trim(), 'paragraph / other');
  add('siteContent.spiritMedicine.note', '灵体医学 / 注释', d.note.trim(), 'paragraph / other');
  d.volumes.forEach((vol, vi) => {
    add(`siteContent.spiritMedicine.volumes[${vi}].title`, '灵体医学 / 卷', vol.title, 'heading');
    vol.episodes.forEach((ep, ei) => {
      add(`siteContent.spiritMedicine.volumes[${vi}].episodes[${ei}].fileNumber`, '灵体医学 / 列表', ep.fileNumber, 'label');
      add(`siteContent.spiritMedicine.volumes[${vi}].episodes[${ei}].title`, '灵体医学 / 列表', ep.title, 'heading');
      add(`siteContent.spiritMedicine.volumes[${vi}].episodes[${ei}].description`, '灵体医学 / 列表', ep.description.trim(), 'paragraph / other');
    });
  });
  spiritMedicineOfficialOutline.forEach((file, fi) => {
    add(`spiritMedicineOfficialOutline[${fi}].fileLabel`, '灵体医学 / 完整目录', file.fileLabel, 'label');
    add(`spiritMedicineOfficialOutline[${fi}].heading`, '灵体医学 / 完整目录', file.heading, 'heading');
    file.subsections?.forEach((sub, si) => {
      add(`spiritMedicineOfficialOutline[${fi}].subsections[${si}].code`, '灵体医学 / 完整目录', sub.code, 'label');
      add(`spiritMedicineOfficialOutline[${fi}].subsections[${si}].title`, '灵体医学 / 完整目录', sub.title, 'paragraph / other');
    });
  });
  spiritMedicineFileGroups.forEach((g, gi) => {
    add(`spiritMedicineFileGroups[${gi}].fileNumber`, '灵体医学 / 播放表', g.fileNumber, 'label');
    add(`spiritMedicineFileGroups[${gi}].sectionTitle`, '灵体医学 / 播放表', g.sectionTitle, 'heading');
    g.episodes.forEach((ep, ei) => {
      add(`spiritMedicineFileGroups[${gi}].episodes[${ei}].code`, '灵体医学 / 播放表', ep.code, 'label');
      add(`spiritMedicineFileGroups[${gi}].episodes[${ei}].title`, '灵体医学 / 播放表', ep.title, 'paragraph / other');
    });
  });
  return rows;
}

function flattenUniversalMatrixExtra(): CopyRow[] {
  const u = siteContent.universalMatrix;
  const rows: CopyRow[] = [];
  const add = (block_key: string, section: string, text: string, kind: string, notes: string) => {
    rows.push({
      block_key,
      section_板块: section,
      kind,
      english_源文: text,
      中文: '',
      Latin_Latina: '',
      notes,
    });
  };
  add('siteContent.universalMatrix.title', '万有元神 / 英雄区 H1', u.title, 'heading', 'siteContent + UniversalMatrixHero');
  add(
    'siteContent.universalMatrix.description',
    '万有元神 / 英雄区导语',
    u.description.trim(),
    'paragraph / other',
    'siteContent — under H2 from i18n matrix.subtitle',
  );
  add(
    'siteContent.universalMatrix.note',
    '万有元神 / scaffold 注释（非页内主文案）',
    u.note.trim(),
    'paragraph / other',
    'Maintainer note only; not shown as body copy on public page',
  );

  universalMatrixFiles.forEach((file, fi) => {
    add(
      `universalMatrixFiles[${fi}].fileNumber`,
      '万有元神 / 目录 FILE',
      file.fileNumber,
      'label',
      'src/content/universalMatrixSeries.ts — matches UniversalMatrixContents',
    );
    add(
      `universalMatrixFiles[${fi}].title`,
      '万有元神 / 目录 FILE 标题',
      file.title,
      'heading',
      'On-page file block title',
    );
    file.subChapters?.forEach((sub, si) => {
      add(
        `universalMatrixFiles[${fi}].subChapters[${si}].id`,
        '万有元神 / 子章节编号',
        sub.id,
        'label',
        '',
      );
      add(
        `universalMatrixFiles[${fi}].subChapters[${si}].title`,
        '万有元神 / 子章节标题',
        sub.title,
        sub.indent ? 'label' : 'paragraph / other',
        sub.indent ? 'indented row on page' : '',
      );
    });
  });
  return rows;
}

/** Assets and link labels used on /our-achievements beyond achievementsReport i18n. */
function flattenOurAchievementsAssets(): CopyRow[] {
  const rows: CopyRow[] = [];
  livestreamLinkPlaceholders.forEach((link, i) => {
    rows.push({
      block_key: `achievements2025.livestreamLinkPlaceholders[${i}].label`,
      section_板块: '成就页 / 收束区外链',
      kind: 'button / link',
      english_源文: link.label,
      中文: '',
      Latin_Latina: '',
      notes: `achievements2025Content — href: ${link.href}`,
    });
  });
  rows.push({
    block_key: 'reportHeroFigure.alt',
    section_板块: '成就页 / 英雄区配图',
    kind: 'label',
    english_源文: reportHeroFigure.alt,
    中文: '',
    Latin_Latina: '',
    notes: 'Hero `<img alt>` (caption text = i18n achievementsReport.hero.caption)',
  });
  carouselSlides.forEach((slide, i) => {
    rows.push({
      block_key: `carouselSlides[${i}].alt`,
      section_板块: '成就页 / 轮播占位图',
      kind: 'label',
      english_源文: slide.alt,
      中文: '',
      Latin_Latina: '',
      notes: 'Decorative stock alts; visible caption = achievementsReport.carouselNote',
    });
  });
  return rows;
}

function main() {
  fs.mkdirSync(outDir, { recursive: true });
  const en = messagesEn as Record<string, string>;
  const zh = messagesZh as Record<string, string>;

  const books: { filename: string; rows: CopyRow[] }[] = [
    {
      filename: '01-首页.xlsx',
      rows: [
        ...rowsForKeys(
          [...pickKeys('home.'), ...pickKeys('nav.'), ...pickKeys('footer.'), 'lang.label'],
          '首页',
          en,
          zh,
          'Hero 文案在 home.*；导航在 nav.*',
        ),
        ...((): CopyRow[] => {
          const h = siteContent.home;
          return [
            {
              block_key: 'siteContent.home.heroTitle',
              section_板块: '首页 / siteContent（与 hero 可能重复）',
              kind: 'heading',
              english_源文: h.heroTitle,
              中文: '',
              Latin_Latina: '',
              notes: '核对与 i18n 是否一致',
            },
            {
              block_key: 'siteContent.home.heroSubtitle',
              section_板块: '首页 / siteContent',
              kind: 'label',
              english_源文: h.heroSubtitle,
              中文: '',
              Latin_Latina: '',
              notes: '',
            },
            {
              block_key: 'siteContent.home.introTitle',
              section_板块: '首页 / siteContent',
              kind: 'heading',
              english_源文: h.introTitle,
              中文: '',
              Latin_Latina: '',
              notes: '',
            },
          ];
        })(),
        ...rowsForKeys(pickKeys('common.'), '首页（全站通用文案，可仅在此表改）', en, zh),
      ],
    },
    {
      filename: '02-组织介绍.xlsx',
      rows: [...rowsForKeys(pickKeys('about.'), '组织介绍 / i18n', en, zh), ...flattenAboutStatic()],
    },
    {
      filename: '03-创始人故事.xlsx',
      rows: [
        ...rowsForKeys(pickKeys('founderStory.'), '创始人故事 / i18n', en, zh),
        ...flattenFounderSurfaceCopy(),
        ...flattenFounderStory(zh),
      ],
    },
    {
      filename: '04-视频目录-灵魂档案.xlsx',
      rows: [
        ...rowsForKeys([...pickKeys('record.'), ...pickKeys('episode.')], '灵魂档案 / i18n', en, zh),
        ...flattenRecordOfSoul(),
      ],
    },
    {
      filename: '05-视频目录-灵体医学.xlsx',
      rows: [...rowsForKeys(pickKeys('spirit.'), '灵体医学 / i18n', en, zh), ...flattenSpiritMedicineExtra()],
    },
    {
      filename: '06-视频目录-万有元神.xlsx',
      rows: [...rowsForKeys(pickKeys('matrix.'), '万有元神 / i18n', en, zh), ...flattenUniversalMatrixExtra()],
    },
    {
      filename: '07-我们的成就.xlsx',
      rows: [
        ...Object.keys(achievementsReportEn)
          .sort()
          .map(k => ({
            block_key: k,
            section_板块: '成就长文 / OurAchievementsView',
            kind: inferKind(k),
            english_源文: achievementsReportEn[k] ?? '',
            中文: achievementsReportZh[k] ?? '',
            Latin_Latina: '',
            notes: 'achievementsReport.i18n.ts — matches translate() merge on site',
          })),
        /** `home.achievements.*` lives only in `01-首页.xlsx` — do not duplicate here or later sheets overwrite imports. */
        ...rowsForKeys(pickKeys('achievementsPage.'), '成就页页脚与说明文案', en, zh).map(r => ({
          ...r,
          notes: 'OurAchievementsView footer / CTA; not home marketing strip',
        })),
        ...flattenOurAchievementsAssets(),
      ],
    },
  ];

  for (const { filename, rows } of books) {
    const wb = XLSX.utils.book_new();
    const ws = sheetFromRows(rows, filename);
    const colW = [{ wch: 36 }, { wch: 28 }, { wch: 16 }, { wch: 72 }, { wch: 72 }, { wch: 48 }, { wch: 28 }];
    ws['!cols'] = colW;
    XLSX.utils.book_append_sheet(wb, ws, 'copy');
    const fp = path.join(outDir, filename);
    XLSX.writeFile(wb, fp);
    console.log('Wrote', fp, 'rows:', rows.length);
  }

  const readme = `Page copy workbooks (trilingual workflow)
============================================

Files in this folder:
- 01-首页.xlsx
- 02-组织介绍.xlsx
- 03-创始人故事.xlsx
- 04-视频目录-灵魂档案.xlsx
- 05-视频目录-灵体医学.xlsx
- 06-视频目录-万有元神.xlsx
- 07-我们的成就.xlsx

Columns:
- block_key: stable id — keep when sending edits back
- section_板块: rough screen location
- kind: heading / button / paragraph (hint only)
- english_源文: current English or source text on site
- 中文: Simplified Chinese (from zh layer where present)
- Latin_Latina: fill in for Latin
- notes: file/source hint

Regenerate from repo: npm run export:page-xlsx
`;
  fs.writeFileSync(path.join(outDir, 'README.txt'), readme, 'utf8');
  console.log('Done. See docs/page-copy/README.txt');
}

main();
