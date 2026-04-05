import {
  formatEpisodeDuration,
  spiritMedicineEpisodeUrl,
  spiritMedicineFileGroups,
} from './spiritMedicineData';
import { UNIVERSAL_MATRIX_S3E1_YOUTUBE_URL } from './universalMatrixSeries';
import { WOOS_YOUTUBE_CHANNEL_URL } from './youtubeUrls';

export type Episode = {
  fileNumber: string;
  title: string;
  abstract: string;
  keyFeatures?: string;
  videoLength: string;
  youtubeLink?: string; // Optional youtube link
};

export type OldEpisode = {
  fileNumber: string;
  title: string;
  description: string;
  link: string;
  delay?: number;
};

export type Volume = {
  title: string;
  episodes: OldEpisode[];
};

const spiritMedicinePlaylistEpisodes: OldEpisode[] = (() => {
  let i = 0;
  const out: OldEpisode[] = [];
  for (const group of spiritMedicineFileGroups) {
    for (const ep of group.episodes) {
      out.push({
        fileNumber: `FILE ${ep.code}`,
        title: ep.title,
        description:
          ep.description ?? `${group.sectionTitle} · ${formatEpisodeDuration(ep.lengthSeconds)}`,
        link: spiritMedicineEpisodeUrl(ep.videoId),
        delay: i++ * 0.012,
      });
    }
  }
  return out;
})();

export type DocumentaryPage = {
  title: string;
  description: string;
  note: string;
  bannerImages: string[];
  volumes: Volume[];
};

export type RecordOfSoulContent = {
  title: string;
  description: string;
  note: string;
  episodesCount: string;
  minutes: string;
  backgroundImage: string;
  timeline: Episode[];
};

export const aboutContent = {
  orgName: 'New Era of UMMA Organization',
  orgSubtitle: 'New Era of UMMa',
  tagline: 'A Dual-Domain Organization Spanning the Spirit Realm and the Physical World',

  overview: `The New Era of UMMA Organization (New Era of UMMa) is a dual-domain organization spanning both the Spirit Realm and the physical world.

In the physical world, the New Era of UMMA Organization oversees the Association of Spirit Realm's Ambassador (ASRA). Spirit Realm Ambassadors are human beings living in the physical world. Tens of thousands of members will be distributed across all nations, ethnicities, and cultural communities worldwide.

In the Spirit Realm, the New Era of UMMA Organization oversees the Society of Master Spirit Controllers (SMSC). The SMSC comprises tens of thousands of Master Spirit members. A Master Spirit is an administrator in the Spirit Realm who governs ordinary spirits (ghosts) and human beings.`,

  asra: {
    name: "Association of Spirit Realm's Ambassador",
    abbr: 'ASra',
    domain: 'Physical World',
    description: `Spirit Realm Ambassadors are human beings living in the physical world. Tens of thousands of members will be distributed across all nations, ethnicities, and cultural communities worldwide.`,
  },

  smsc: {
    name: 'Society of Master Spirit Controllers',
    abbr: 'SMSC',
    domain: 'Spirit Realm',
    description: `The SMSC comprises tens of thousands of Master Spirit members. A Master Spirit is an administrator in the Spirit Realm who governs ordinary spirits (ghosts) and human beings.`,
  },

  partnership: `The SMSC was established specifically to support ASRA. The Master Spirits of the SMSC will assist each ASRA human member on a 1:1 or 2:1 basis — enabling human members to acquire the special ability to govern attached spirits, improve human health, and simultaneously serve as ambassadors who spread the truth about the Spirit Realm and spirit life entities.`,

  founders: {
    title: 'The Woos Father and Son',
    subtitle: 'Founders & Chief Ambassadors of ASRA',
    description: `The Woo family — father John Long Woo and his sons — founded ASRA and serve as chief ambassadors. They coordinate between ASRA (physical world) and SMSC (Spirit Realm), screening candidates for membership until Master Spirit selection is complete.`,
    storyTeaser: `First door-openers to the Spirit Realm, — truths, timeline, and staged story`,
  },

  missions: [
    {
      number: 'I',
      title: 'Spirit Governance & Human Health',
      description: `Based on the content of the Woos Spirit Archive and Woos Spirit Medicine, members acquire Class-C special abilities to govern attached spirits and improve human health. Members independently operate in the physical world and receive corresponding compensation.`,
      tag: 'Class-C Ability',
    },
    {
      number: 'II',
      title: 'Spread the Truth — Lead Humanity to the New Era',
      description: `The emergence of AI will inevitably lead to universal unemployment across all of humanity; the deployment of military AI will inevitably lead to humanity's extinction. Humanity stands at the edge of the destruction of the old Era.

Based on the three documentary series — the Woos Spirit Archive, Woos Spirit Medicine, and the Universal Matrix of Meta Awareness — members are obligated to spread to the 8 billion people of humanity the truth of Spirit and Its Governor, which has been concealed for thousands of years, and to lead humanity toward the Umma New Era.`,
      tag: 'Global Mission',
    },
  ],
};

export type AboutPageContent = typeof aboutContent;

export const siteContent = {
  brand: 'ASra',
  home: {
    heroTitle: "Association of Spirit Realm's Ambassador",
    heroSubtitle: 'New Era of UMMA Organization',
    introTitle: 'What is ASRA?',
  },
  links: {
    join: 'https://www.facebook.com/groups/654991120042048',
  },
  recordOfSoul: {
    title: 'Woos Record of Soul',
    filePageTitle: "Wu's Spirit File Page",
    description:
      'This documentary was shot at an earlier stage. It compiles research summaries on supernatural phenomena, near-death experiences, and reincarnation, and records the history of the Woo father and son contending with attached spirits (ghosts).',
    note:
      "When Wu's Spirit Files were filmed, **spirit**, **spirit (ghost)**, and **spirit (soul)** were not strictly distinguished and were used interchangeably. In *Woos Spirit Medicine* (2025), the three terms were formally defined: **spirit** — the living spirit in a person; **spirit (ghost)** — after death, the spirit that exists apart from the physical body; **spirit (soul)** — umbrella term for **spirit** and **spirit (ghost)**.",
    terminologyExplanation: '',
    episodesCount: '11',
    minutes: '942+',
    backgroundImage: 'https://images.unsplash.com/photo-1445264618034-159aa57a1535?auto=format&fit=crop&w=1920&q=80',
    /** YouTube URLs from https://ess-esw.org/woos-record-of-soul-2/ (same order as on site) */
    timeline: [
      {
        fileNumber: 'FILE 1-1-1',
        title: 'Introduction to Woos Record of Soul',
        abstract: 'A summary introduction to the full Woos Record of Soul archive.',
        videoLength: '17mins',
        youtubeLink: 'https://youtu.be/AaeSiJzgDws',
      },
      {
        fileNumber: 'FILE 1-1-2',
        title: 'Scientifically prove the Existence of Souls through Epilepsy',
        abstract: 'How to design EEG experiments to verify the existence of **spirit** (the living spirit) in a scientifically rigorous way.',
        videoLength: '6mins',
        youtubeLink: 'https://youtu.be/Tna3F0rRPGY',
      },
      {
        fileNumber: 'FILE 1-1-3',
        title: 'Authenticity Research of PSI',
        abstract: 'Mysterious PSI phenomena are foundational to uncovering **spirit (soul)** and the forces of the spirit realm—yet the authenticity of PSI has never been firmly established. This series presents startling scientific work from China’s 507 Institute (often described as China’s NASA) on whether such otherworldly forces are real.',
        keyFeatures: 'Rare high-speed footage you are unlikely to have seen, together with PSI experimental materials that are effectively impossible to fake, will broaden your perspective. The authenticity of the experiments is the essence and heart of this series.',
        videoLength: '64mins',
        youtubeLink: 'https://youtu.be/DBAXNiDF8qM',
      },
      {
        fileNumber: 'FILE 1-2-1',
        title: 'Origin, Destination after death of Souls & Impact on human',
        abstract: 'Where does human **spirit (soul)** come from? After death, where does it go? Are destinations split along religious lines? This installment makes it explicit: the principal destination of ancestral **spirits (ghosts)** worldwide is parasitic attachment to the living.',
        keyFeatures: 'Drawing on twelve papers from Western universities and ICD-11 category 6B6 (WHO), the series maps where **spirits (ghosts)** go, their global distribution, and their impact on human beings.',
        videoLength: '154mins',
        youtubeLink: 'https://youtu.be/RURvSBHvKu0',
      },
      {
        fileNumber: 'FILE 1-2-2',
        title: 'Material Foundation of soul: Spiritual World has Natural Internet Attribute',
        abstract: 'Traditional materialism denies **spirit (soul)** by arguing that consciousness is merely a by-product of the brain and ends entirely when the brain dies; as a second-order form of human consciousness, **spirit (soul)** supposedly cannot exist on its own. Chinese parapsychology experiments show instead that the spirit realm has an innate, internet-like structure: it can carry consciousness-as-image information (akin to GIFs), with addressing comparable to blogging—showing that consciousness and **spirit (soul)** can exist independently of the physical brain.',
        keyFeatures: 'Four PSI research papers by Professor Shao Laisheng of Fudan University and colleagues demonstrate—with no instruments—that human beings can transmit pure conscious information from Shanghai to Beijing.',
        videoLength: '32mins',
        youtubeLink: 'https://youtu.be/zQ2fzctwkY0',
      },
      {
        fileNumber: 'FILE 1-2-3',
        title: 'Scientific Proof of Soul Parasitism/Possession caused Mental / Psychosis Illnesses',
        abstract: 'Where are **spirits (ghosts)** easily found? Among very many people with dissociative disorders, schizophrenia, epilepsy, depression, somatization disorder, and related conditions. This series examines how **spirits (ghosts)** figure in etiology and suffering among psychiatric patients.',
        keyFeatures: 'Fifteen Western medical studies and rare real footage of attachment show how **spirits (ghosts)** are distributed among humans. Psychiatric statistics often mirror that distribution.',
        videoLength: '154mins',
        youtubeLink: 'https://youtu.be/41OSBcImghk',
      },
      {
        fileNumber: 'FILE 1-2-4',
        title: 'Deep Exploration of Soul-triggering Epilepsy’s Mechanism',
        abstract: 'The Woo father and son developed epilepsy from attachment by **spirits (ghosts)**—at odds with conventional medical etiology. These programs show **spirits (ghosts)** have a material aspect: they can discharge electrical charge; that charge creates epileptogenic foci and triggers seizures.',
        keyFeatures: 'Fifteen medical papers from leading universities worldwide, together with the Woos’ firsthand experience, support the view that pathology driven by **spirits (ghosts)** has a material, physically grounded character.',
        videoLength: '76mins',
        youtubeLink: 'https://youtu.be/GtyfFk8O5oA',
      },
      {
        fileNumber: 'FILE 1-2-5',
        title: 'The truth of NDE – sophisticated illusions orchestrated by parasitic souls',
        abstract: 'Across five themes—consistency between NDEs and other **spirit (ghost)** attachment phenomena, visual studies of NDEs, cross-national and cross-cultural differences, and paranormal after-effects—the series argues NDEs do not reveal what happens after death.',
        keyFeatures: 'Many films and books cite NDEs as proof of religion and **spirit (soul)**; popular works rarely present the full dataset. This series works through thirty-four Western-university NDE studies to show what the evidence supports.',
        videoLength: '74mins',
        youtubeLink: 'https://youtu.be/9cbr96i2MVg',
      },
      {
        fileNumber: 'FILE 1-2-6',
        title: 'Past life memories come from parasitic souls, it can not prove reincarnation',
        abstract: 'Through memory interfaces, attached **spirits (ghosts)** imprint their lives as first-person memories; hosts mistake these for past lives and infer reincarnation—a major error in much spiritual research.',
        keyFeatures: 'A close logical critique of reincarnation inferred from “past-life” memories: the supposed subject of rebirth lacks the markers of living continuity, and lacks a coherent sense of self (“I”).',
        videoLength: '42mins',
        youtubeLink: 'https://youtu.be/iB_yNqGJ1Ds',
      },
      {
        fileNumber: 'FILE 1-3',
        title: 'Whether Souls have Eyes? Scientific Discovery on Spiritual Vision',
        abstract: 'Eyes shape how **spirits (ghosts)** live; **spirits (ghosts)** without eyes overturn common spirit beliefs.\nMost cultures posit hell in the spirit realm—without eyes, how would **spirits (ghosts)** see infernal fire or paradise? How would they see one another? How could our picture of their lives hold up?',
        keyFeatures: 'Nineteen papers from CAS institutes, Peking University, National Taiwan University, Beijing Normal University, Shanghai Institute of Laser Technology, and the Woos’ experience argue that **spirits (ghosts)** have no eyes.',
        videoLength: '77mins',
        youtubeLink: 'https://youtu.be/6haJUyUxrqc',
      },
      {
        fileNumber: 'FILE 1-4',
        title: 'Discover the truth of body shape, organs, material composition and metabolism of souls',
        abstract: '**Spirits (ghosts)** have a material body. This series begins to unpack their shape, organs, material makeup, and energy metabolism after death—a first step toward the material basis of **spirits (ghosts)** and the spirit realm.',
        keyFeatures: 'Drawing on eight international studies, ICD-11 category 6B6 features (WHO), and rare footage, the series offers a wide-ranging, detailed account of **spirits (ghosts)**’ bodily characteristics.',
        videoLength: '243mins',
        youtubeLink: 'https://youtu.be/V6ua2xkHpE0',
      },
    ],
  },
  spiritMedicine: {
    title: 'Woos Spirit Medicine',
    description:
      '**Woos Spirit Medicine** — healing methodologies connecting the physical body and ethereal consciousness. This season focuses on practical intervention, structured recovery pathways, and ongoing restoration of balance for mind and **spirit (soul)**.',
    note: 'Episode list follows the official YouTube playlist; FILE groups on /spirit-medicine are ordered 2-1, 2-2, 2-4, 2-3, 2-5. Use “Full curriculum outline” for the ess-esw.org-style directory.',
    bannerImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=2000&q=80',
    ],
    volumes: [
      {
        title: 'Season II — Woos Spirit Medicine (YouTube playlist)',
        episodes: spiritMedicinePlaylistEpisodes,
      },
    ],
  } as DocumentaryPage,
  /** On-page file index lives in `src/content/universalMatrixSeries.ts` (`universalMatrixFiles`), not in `volumes` below. */
  universalMatrix: {
    title: 'Universal Matrix of Meta Awareness',
    description:
      
      
      
      
      
      'Advanced transcendental truths governing systemic universe order and ultimate human destiny. This season presents conceptual architecture, governance logic, and higher-order awareness models.',
    note: 
      
      
      
      
      'This section is scaffolded using the original series layout so you can fine-tune language, hierarchy, and visual rhythm in Layrr.',
    bannerImages: [
      'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1450849608880-6f787542c88a?auto=format&fit=crop&w=2000&q=80',
    ],
    volumes: [
      {
        title: 'Vol. 1 - Universal Architecture',
        episodes: [
          {
            fileNumber: 'FILE 3-1-1',
            title: 'Framework of the Meta Awareness Matrix',
            description:
              'A structural overview of governing layers, interaction rules, and macro-level system dependencies.',
            link: UNIVERSAL_MATRIX_S3E1_YOUTUBE_URL,
          },
          {
            fileNumber: 'FILE 3-1-2',
            title: 'Origins of Universal Order',
            description:
              'Explores first principles behind life orchestration, continuity mechanics, and order-preserving constraints.',
            link: WOOS_YOUTUBE_CHANNEL_URL,
            delay: 0.1,
          },
        ],
      },
    ],
  } as DocumentaryPage,
};
