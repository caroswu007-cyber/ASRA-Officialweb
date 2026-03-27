import type { Locale } from '../i18n/locales';
import {
  founderStoryPage as baseFounderStoryPage,
  founderStorySurfaceCopy as baseFounderStorySurfaceCopy,
  founderTimeline as baseFounderTimeline,
} from './founderStory2026Content';
import { pageCopyDocs } from './pageCopyDocs.generated';
import {
  carouselSlides as baseCarouselSlides,
  livestreamLinkPlaceholders as baseLivestreamLinkPlaceholders,
  reportHeroFigure as baseReportHeroFigure,
} from './achievements2025Content';
import { siteContent as baseSiteContent, aboutContent as baseAboutContent } from './siteContent';
import {
  spiritMedicineFileGroups as baseSpiritMedicineFileGroups,
  type SpiritMedicineFileGroup,
} from './spiritMedicineData';
import {
  spiritMedicineOfficialOutline as baseSpiritMedicineOfficialOutline,
  type SpiritMedicineOutlineFile,
} from './spiritMedicineOfficialOutline';
import { universalMatrixFiles as baseUniversalMatrixFiles, type MatrixFile } from './universalMatrixSeries';

const DOC_KEY_ALIASES: Record<string, string> = {
  'about.hero.pillAsra': 'about.hero.pillASRA',
  'aboutContent.asra.name': 'aboutContent.ASRA.name',
  'aboutContent.asra.abbr': 'aboutContent.ASRA.abbr',
  'aboutContent.asra.domain': 'aboutContent.ASRA.domain',
  'aboutContent.asra.description': 'aboutContent.ASRA.description',
};

function docLocale(locale: Locale): 'en' | 'zh' {
  return locale === 'zh' ? 'zh' : 'en';
}

function lookupDoc(pack: Record<string, string>, key: string): string | undefined {
  return pack[key] ?? pack[DOC_KEY_ALIASES[key] ?? ''];
}

export function getPageCopyText(locale: Locale, key: string, fallback: string): string {
  const localized = lookupDoc(pageCopyDocs[docLocale(locale)], key);
  if (localized != null && localized !== '') return localized;
  const english = lookupDoc(pageCopyDocs.en, key);
  if (english != null && english !== '') return english;
  return fallback;
}

export function getPageCopyI18nOverrides(locale: Locale): Record<string, string> {
  const primary = pageCopyDocs[docLocale(locale)];
  const out: Record<string, string> = { ...primary };

  for (const [alias, target] of Object.entries(DOC_KEY_ALIASES)) {
    if (!(alias in out) && primary[target]) out[alias] = primary[target];
  }

  for (const key of Object.keys(pageCopyDocs.en)) {
    if (!(key in out) || out[key] === '') out[key] = pageCopyDocs.en[key];
  }

  for (const [alias, target] of Object.entries(DOC_KEY_ALIASES)) {
    if (!(alias in out) && pageCopyDocs.en[target]) out[alias] = pageCopyDocs.en[target];
  }

  return out;
}

export function getLocalizedAboutContent(locale: Locale) {
  return {
    ...baseAboutContent,
    orgName: getPageCopyText(locale, 'aboutContent.orgName', baseAboutContent.orgName),
    orgSubtitle: getPageCopyText(locale, 'aboutContent.orgSubtitle', baseAboutContent.orgSubtitle),
    tagline: getPageCopyText(locale, 'aboutContent.tagline', baseAboutContent.tagline),
    overview: getPageCopyText(locale, 'aboutContent.overview', baseAboutContent.overview),
    asra: {
      ...baseAboutContent.asra,
      name: getPageCopyText(locale, 'aboutContent.asra.name', baseAboutContent.asra.name),
      abbr: getPageCopyText(locale, 'aboutContent.asra.abbr', baseAboutContent.asra.abbr),
      domain: getPageCopyText(locale, 'aboutContent.asra.domain', baseAboutContent.asra.domain),
      description: getPageCopyText(locale, 'aboutContent.asra.description', baseAboutContent.asra.description),
    },
    smsc: {
      ...baseAboutContent.smsc,
      name: getPageCopyText(locale, 'aboutContent.smsc.name', baseAboutContent.smsc.name),
      abbr: getPageCopyText(locale, 'aboutContent.smsc.abbr', baseAboutContent.smsc.abbr),
      domain: getPageCopyText(locale, 'aboutContent.smsc.domain', baseAboutContent.smsc.domain),
      description: getPageCopyText(locale, 'aboutContent.smsc.description', baseAboutContent.smsc.description),
    },
    partnership: getPageCopyText(locale, 'aboutContent.partnership', baseAboutContent.partnership),
    founders: {
      ...baseAboutContent.founders,
      title: getPageCopyText(locale, 'aboutContent.founders.title', baseAboutContent.founders.title),
      subtitle: getPageCopyText(
        locale,
        'aboutContent.founders.subtitle',
        baseAboutContent.founders.subtitle,
      ),
      description: getPageCopyText(
        locale,
        'aboutContent.founders.description',
        baseAboutContent.founders.description,
      ),
      storyTeaser: getPageCopyText(
        locale,
        'aboutContent.founders.storyTeaser',
        baseAboutContent.founders.storyTeaser,
      ),
    },
    missions: baseAboutContent.missions.map((mission, i) => ({
      ...mission,
      number: getPageCopyText(locale, `aboutContent.missions[${i}].number`, mission.number),
      title: getPageCopyText(locale, `aboutContent.missions[${i}].title`, mission.title),
      description: getPageCopyText(locale, `aboutContent.missions[${i}].description`, mission.description),
      tag: getPageCopyText(locale, `aboutContent.missions[${i}].tag`, mission.tag),
    })),
  };
}

export function getLocalizedSiteContent(locale: Locale) {
  return {
    ...baseSiteContent,
    home: {
      ...baseSiteContent.home,
      heroTitle: getPageCopyText(locale, 'siteContent.home.heroTitle', baseSiteContent.home.heroTitle),
      heroSubtitle: getPageCopyText(
        locale,
        'siteContent.home.heroSubtitle',
        baseSiteContent.home.heroSubtitle,
      ),
      introTitle: getPageCopyText(locale, 'siteContent.home.introTitle', baseSiteContent.home.introTitle),
    },
    recordOfSoul: {
      ...baseSiteContent.recordOfSoul,
      title: getPageCopyText(locale, 'siteContent.recordOfSoul.title', baseSiteContent.recordOfSoul.title),
      description: getPageCopyText(
        locale,
        'siteContent.recordOfSoul.description',
        baseSiteContent.recordOfSoul.description,
      ),
      note: getPageCopyText(locale, 'siteContent.recordOfSoul.note', baseSiteContent.recordOfSoul.note),
      episodesCount: getPageCopyText(
        locale,
        'siteContent.recordOfSoul.episodesCount',
        baseSiteContent.recordOfSoul.episodesCount,
      ),
      minutes: getPageCopyText(locale, 'siteContent.recordOfSoul.minutes', baseSiteContent.recordOfSoul.minutes),
      timeline: baseSiteContent.recordOfSoul.timeline.map((episode, i) => ({
        ...episode,
        fileNumber: getPageCopyText(locale, `recordOfSoul.timeline[${i}].fileNumber`, episode.fileNumber),
        title: getPageCopyText(locale, `recordOfSoul.timeline[${i}].title`, episode.title),
        abstract: getPageCopyText(locale, `recordOfSoul.timeline[${i}].abstract`, episode.abstract),
        keyFeatures: episode.keyFeatures
          ? getPageCopyText(locale, `recordOfSoul.timeline[${i}].keyFeatures`, episode.keyFeatures)
          : lookupDoc(pageCopyDocs[docLocale(locale)], `recordOfSoul.timeline[${i}].keyFeatures`) ||
            lookupDoc(pageCopyDocs.en, `recordOfSoul.timeline[${i}].keyFeatures`) ||
            undefined,
        videoLength: getPageCopyText(locale, `recordOfSoul.timeline[${i}].videoLength`, episode.videoLength),
      })),
    },
    spiritMedicine: {
      ...baseSiteContent.spiritMedicine,
      title: getPageCopyText(locale, 'siteContent.spiritMedicine.title', baseSiteContent.spiritMedicine.title),
      description: getPageCopyText(
        locale,
        'siteContent.spiritMedicine.description',
        baseSiteContent.spiritMedicine.description,
      ),
      note: getPageCopyText(locale, 'siteContent.spiritMedicine.note', baseSiteContent.spiritMedicine.note),
      volumes: baseSiteContent.spiritMedicine.volumes.map((volume, vi) => ({
        ...volume,
        title: getPageCopyText(locale, `siteContent.spiritMedicine.volumes[${vi}].title`, volume.title),
      })),
    },
    universalMatrix: {
      ...baseSiteContent.universalMatrix,
      title: getPageCopyText(locale, 'siteContent.universalMatrix.title', baseSiteContent.universalMatrix.title),
      description: getPageCopyText(
        locale,
        'siteContent.universalMatrix.description',
        baseSiteContent.universalMatrix.description,
      ),
      note: getPageCopyText(locale, 'siteContent.universalMatrix.note', baseSiteContent.universalMatrix.note),
    },
  };
}

export function getLocalizedSpiritMedicineFileGroups(locale: Locale): SpiritMedicineFileGroup[] {
  return baseSpiritMedicineFileGroups.map((group, gi) => ({
    ...group,
    fileNumber: getPageCopyText(locale, `spiritMedicineFileGroups[${gi}].fileNumber`, group.fileNumber),
    sectionTitle: getPageCopyText(
      locale,
      `spiritMedicineFileGroups[${gi}].sectionTitle`,
      group.sectionTitle,
    ),
    episodes: group.episodes.map((episode, ei) => ({
      ...episode,
      code: getPageCopyText(locale, `spiritMedicineFileGroups[${gi}].episodes[${ei}].code`, episode.code),
      title: getPageCopyText(locale, `spiritMedicineFileGroups[${gi}].episodes[${ei}].title`, episode.title),
    })),
  }));
}

export function getLocalizedSpiritMedicineOfficialOutline(locale: Locale): SpiritMedicineOutlineFile[] {
  return baseSpiritMedicineOfficialOutline.map((file, fi) => ({
    ...file,
    fileLabel: getPageCopyText(locale, `spiritMedicineOfficialOutline[${fi}].fileLabel`, file.fileLabel),
    heading: getPageCopyText(locale, `spiritMedicineOfficialOutline[${fi}].heading`, file.heading),
    subsections: file.subsections?.map((sub, si) => ({
      ...sub,
      code: getPageCopyText(
        locale,
        `spiritMedicineOfficialOutline[${fi}].subsections[${si}].code`,
        sub.code,
      ),
      title: getPageCopyText(
        locale,
        `spiritMedicineOfficialOutline[${fi}].subsections[${si}].title`,
        sub.title,
      ),
    })),
  }));
}

export function getLocalizedUniversalMatrixFiles(locale: Locale): MatrixFile[] {
  return baseUniversalMatrixFiles.map((file, fi) => ({
    ...file,
    fileNumber: getPageCopyText(locale, `universalMatrixFiles[${fi}].fileNumber`, file.fileNumber),
    title: getPageCopyText(locale, `universalMatrixFiles[${fi}].title`, file.title),
    subChapters: file.subChapters?.map((sub, si) => ({
      ...sub,
      id: getPageCopyText(locale, `universalMatrixFiles[${fi}].subChapters[${si}].id`, sub.id),
      title: getPageCopyText(locale, `universalMatrixFiles[${fi}].subChapters[${si}].title`, sub.title),
    })),
  }));
}

export function getLocalizedFounderStoryContent(locale: Locale) {
  return {
    surfaceCopy: {
      ...baseFounderStorySurfaceCopy,
      heroNamesLine: getPageCopyText(
        locale,
        'founderStorySurfaceCopy.heroNamesLine',
        baseFounderStorySurfaceCopy.heroNamesLine,
      ),
      backToAbout: getPageCopyText(
        locale,
        'founderStorySurfaceCopy.backToAbout',
        baseFounderStorySurfaceCopy.backToAbout,
      ),
    },
    timeline: baseFounderTimeline.map((row, i) => ({
      ...row,
      range: getPageCopyText(locale, `founderTimeline[${i}].range`, row.range),
      label: getPageCopyText(locale, `founderTimeline[${i}].label`, row.label),
    })),
    page: {
      ...baseFounderStoryPage,
      heroTitle: getPageCopyText(locale, 'founderStoryPage.heroTitle', baseFounderStoryPage.heroTitle),
      heroBadge: getPageCopyText(locale, 'founderStoryPage.heroBadge', baseFounderStoryPage.heroBadge),
      intro: getPageCopyText(locale, 'founderStoryPage.intro', baseFounderStoryPage.intro),
      truths: {
        ...baseFounderStoryPage.truths,
        title: getPageCopyText(locale, 'founderStoryPage.truths.title', baseFounderStoryPage.truths.title),
        items: baseFounderStoryPage.truths.items.map((item, ii) => ({
          ...item,
          label: getPageCopyText(locale, `founderStoryPage.truths.items[${ii}].label`, item.label),
          blocks: item.blocks.map((block, bi) => {
            const baseBlock = {
              ...block,
              text: getPageCopyText(
                locale,
                `founderStoryPage.truths.items[${ii}].blocks[${bi}].text`,
                block.text,
              ),
            };
            if ('title' in block) {
              return {
                ...baseBlock,
                title: getPageCopyText(
                  locale,
                  `founderStoryPage.truths.items[${ii}].blocks[${bi}].title`,
                  block.title,
                ),
              };
            }
            return baseBlock;
          }),
        })),
      },
      phasesOverview: {
        ...baseFounderStoryPage.phasesOverview,
        title: getPageCopyText(
          locale,
          'founderStoryPage.phasesOverview.title',
          baseFounderStoryPage.phasesOverview.title,
        ),
        a: {
          ...baseFounderStoryPage.phasesOverview.a,
          title: getPageCopyText(
            locale,
            'founderStoryPage.phasesOverview.a.title',
            baseFounderStoryPage.phasesOverview.a.title,
          ),
          blocks: baseFounderStoryPage.phasesOverview.a.blocks.map((block, bi) => ({
            ...block,
            title: getPageCopyText(
              locale,
              `founderStoryPage.phasesOverview.a.blocks[${bi}].title`,
              block.title,
            ),
            text: getPageCopyText(
              locale,
              `founderStoryPage.phasesOverview.a.blocks[${bi}].text`,
              block.text,
            ),
          })),
        },
      },
      phaseAStages: baseFounderStoryPage.phaseAStages.map((stage, si) => {
        const baseStage = {
          ...stage,
          label: getPageCopyText(locale, `founderStoryPage.phaseAStages[${si}].label`, stage.label),
          stageTitle: getPageCopyText(
            locale,
            `founderStoryPage.phaseAStages[${si}].stageTitle`,
            stage.stageTitle,
          ),
          range: getPageCopyText(locale, `founderStoryPage.phaseAStages[${si}].range`, stage.range),
          paragraphs: stage.paragraphs.map((paragraph, pi) =>
            getPageCopyText(locale, `founderStoryPage.phaseAStages[${si}].paragraphs[${pi}]`, paragraph),
          ),
        };
        if ('storylineClip' in stage && stage.storylineClip) {
          return {
            ...baseStage,
            storylineClip: { ...stage.storylineClip },
          };
        }
        return baseStage;
      }),
      phaseB: {
        ...baseFounderStoryPage.phaseB,
        title: getPageCopyText(locale, 'founderStoryPage.phaseB.title', baseFounderStoryPage.phaseB.title),
        blocks: baseFounderStoryPage.phaseB.blocks.map((block, bi) => ({
          ...block,
          title: getPageCopyText(locale, `founderStoryPage.phaseB.blocks[${bi}].title`, block.title),
          text: getPageCopyText(locale, `founderStoryPage.phaseB.blocks[${bi}].text`, block.text),
        })),
      },
    },
  };
}

export function getLocalizedAchievementsAssets(locale: Locale) {
  return {
    carouselSlides: baseCarouselSlides.map((slide, i) => ({
      ...slide,
      alt: getPageCopyText(locale, `carouselSlides[${i}].alt`, slide.alt),
    })),
    livestreamLinkPlaceholders: baseLivestreamLinkPlaceholders.map((link, i) => ({
      ...link,
      label: getPageCopyText(
        locale,
        `achievements2025.livestreamLinkPlaceholders[${i}].label`,
        link.label,
      ),
    })),
    reportHeroFigure: {
      ...baseReportHeroFigure,
      alt: getPageCopyText(locale, 'reportHeroFigure.alt', baseReportHeroFigure.alt),
    },
  };
}
