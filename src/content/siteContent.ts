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
  orgName: 'Umma New Century Organization',
  orgSubtitle: 'New Century of UMMa',
  tagline: 'A Dual-Domain Organization Spanning the Spirit Realm and the Physical World',

  overview: `The Umma New Century Organization (New Century of UMMa) is a dual-domain organization spanning both the Spirit Realm and the physical world.

In the physical world, the Umma New Century Organization oversees the Association of Spirit Realm's Ambassador (ASra). Spirit Realm Ambassadors are human beings living in the physical world. Tens of thousands of members will be distributed across all nations, ethnicities, and cultural communities worldwide.

In the Spirit Realm, the Umma New Century Organization oversees the Society of Master Spirit Controllers (SMSC). The SMSC comprises tens of thousands of Master Spirit members. A Master Spirit is an administrator in the Spirit Realm who governs ordinary spirits (ghosts) and human beings.`,

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

  partnership: `The SMSC was established specifically to support ASra. The Master Spirits of the SMSC will assist each ASra human member on a 1:1 or 2:1 basis — enabling human members to acquire the special ability to govern attached spirits, improve human health, and simultaneously serve as ambassadors who spread the truth about the Spirit Realm and spirit life entities.`,

  founders: {
    title: 'The Woos Father and Son',
    subtitle: 'Founders & Chief Ambassadors of ASra',
    description: `The Woos Father and Son are the founders and chief ambassadors of ASra. They are responsible for coordinating and liaising between the two associations. In the physical world, they screen suitable human candidates to become ASra ambassadors and recommend them to the SMSC. Only after selection by the SMSC do candidates officially become ASra members. The Woos Father and Son also hold the authority to revoke the membership of unqualified ASra members.`,
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
      title: 'Spread the Truth — Lead Humanity to the New Century',
      description: `The emergence of AI will inevitably lead to universal unemployment across all of humanity; the deployment of military AI will inevitably lead to humanity's extinction. Humanity stands at the edge of the destruction of the old century.

Based on the three documentary series — the Woos Spirit Archive, Woos Spirit Medicine, and the Universal Matrix of Meta Awareness — members are obligated to spread to the 8 billion people of humanity the truth of Spirit and Its Governor, which has been concealed for thousands of years, and to lead humanity toward the Umma New Century.`,
      tag: 'Global Mission',
    },
  ],
};

export const siteContent = {
  brand: 'ASra',
  home: {
    heroTitle: "Association of Spirit Realm's Ambassador",
    heroSubtitle: 'Umma New Century Organization',
    heroCta: 'Discover the Truth',
    introTitle: 'What is ASra?',
  },
  links: {
    achievements: 'https://ess-esw.org/',
    join: 'https://ess-esw.org/',
  },
  recordOfSoul: {
    title: 'Woos Record of Soul',
    description:
      'This Documentary Was Shot Earlier, Recording The Process Of Woos Father And Son Being Possessed By Spirits And Fighting. And The Scientific Summary Of Human Research On Supernatural Phenomena, Near-Death Experience And Reincarnation.',
    note: 'When Woos record of Soul were filmed, Spirits were sometimes called ghost and sometimes soul, but in the spirit medicine filmed in 2025, ghosts were clearly called spirit(ghost).',
    episodesCount: '11',
    minutes: '942+',
    backgroundImage: 'https://images.unsplash.com/photo-1445264618034-159aa57a1535?auto=format&fit=crop&w=1920&q=80',
    timeline: [
      {
        fileNumber: 'FILE 1-1-1',
        title: 'Introduction to Woos Record of Soul',
        abstract: 'An overview of the entire documentary , its methodology, and its revolutionary premise.',
        videoLength: '17mins',
      },
      {
        fileNumber: 'FILE 1-1-2',
        title: 'Scientifically prove the Existence of Souls through Epilepsy',
        abstract: 'Demonstrating how electromagnetic, thermal, and quantum sensors can detect and record phenomena attributable to spirit presence.',
        videoLength: '6mins',
      },
      {
        fileNumber: 'FILE 1-1-3',
        title: 'Authenticity Research of PSI',
        abstract: 'PSI phenomena — telepathy, psychokinesis, clairvoyance — are the foundational gateway to understanding spiritual forces. Yet their legitimacy has long been dismissed as pseudoscience. This episode reveals groundbreaking research from China’s 507 Institute (China’s equivalent to NASA) — proving that spirit-derived forces are real, measurable, and reproducible.',
        keyFeatures: 'Unprecedented high-speed camera footage and irrefutable PSI experimental data never before shown to the public. The authenticity of these experiments — rigorously controlled, peer-reviewed, and non-fakeable — forms the core of this video.',
        videoLength: '64mins',
      },
      {
        fileNumber: 'FILE 1-2-1',
        title: 'Origin, Destination after death of Souls & Impact on human',
        abstract: 'Where do human souls come from? Where do they go after death? Do they ascend to heaven, descend to hell, or reincarnate according to religious doctrines?This episode reveals a startling truth: The primary destination of ancestral human spirits is not another realm — but parasitic attachment to living human beings.',
        keyFeatures: 'Drawing on 12 peer-reviewed studies from Western universities and ICD-11 Category 6B6 (Spirit Attachment Disorders), this series maps the global distribution of spirit attachment and demonstrates its direct link to dissociative disorders, identity fragmentation, and unexplained psychological symptoms.',
        videoLength: '154mins',
      },
      {
        fileNumber: 'FILE 1-2-2',
        title: 'Material Foundation of soul: Spiritual World has Natural Internet Attribute',
        abstract: 'Traditional materialism denies spirit(Ghost) existence by asserting that consciousness is merely an epiphenomenon of the brain — and thus ceases at death. But Chinese PSI research proves otherwise: The ethereal realm possesses an innate, internet-like architecture capable of transmitting conscious information in GIF-like formats via a “blog-style” addressing system.This proves: Consciousness and the soul can exist independently of the physical brain.',
        keyFeatures: 'Four groundbreaking PSI papers by Professor Shao Laisheng of Fudan University and colleagues demonstrate that humans can transmit pure conscious information — without instruments — from Shanghai to Beijing, directly through mental intent.',
        videoLength: '32mins',
      },
      {
        fileNumber: 'FILE 1-2-3',
        title: 'Scientific Proof of Soul Parasitism/Possession caused Mental / Psychosis Illnesses',
        abstract: 'In this world, where is it easy to find a spirit(ghost)? In countless patients with dissociative disorder, schizophrenia, epilepsy, depression, somatization disorder and many other diseases. This series of videos will deeply discuss the etiology research and pain brought by spirit(ghost) to mental patients.',
        keyFeatures: 'This series of videos shows the distribution of spiritual body in the world with 15 medical research papers from famous western universities and precious real video materials of spirit(ghost) possession. The statistics of psychiatry are often the distribution data of spirit(ghost).',
        videoLength: '154mins',
      },
      {
        fileNumber: 'FILE 1-2-4',
        title: 'Deep Exploration of Soul-triggering Epilepsy’s Mechanism',
        abstract: 'The Woos own epilepsy is caused by spirit(ghost) possession — directly contradicting modern neurology’s claim that epilepsy arises solely from abnormal neural firing. This series reveals: spirit(ghost) are material entities capable of emitting electromagnetic charges. These charges induce epileptogenic foci in the human brain, triggering seizures.',
        keyFeatures: 'Supported by 15 peer-reviewed medical papers from global universities and the Wu family’s personal medical records, this series provides irrefutable evidence that spirit-induced illness operates through physical, material mechanisms — not metaphysical mysticism.',
        videoLength: '76mins',
      },
      {
        fileNumber: 'FILE 1-2-5',
        title: 'The truth of NDE – sophisticated illusions orchestrated by parasitic souls',
        abstract: 'Near-death experiences (NDEs) — tunnels of light, deceased relatives, out-of-body journeys — are widely cited as proof of an afterlife. But this series proves: NDEs are not glimpses of death — they are hallucinations generated by attached spirits(ghosts). Through five analytical dimensions — consistency with other possession phenomena, visual structure, cross-cultural variation, and post-NDE psychic sequelae — this series dismantles the myth of NDEs as evidence of an afterlife.',
        keyFeatures: 'A deep analysis of 34 peer-reviewed NDE studies from top Western universities. Unlike popular media, which cherry-pick romanticized accounts, this series presents the full, unfiltered dataset — revealing NDEs as culturally conditioned, neurobiologically induced illusions orchestrated by spirit entities.',
        videoLength: '74mins',
      },
      {
        fileNumber: 'FILE 1-2-6',
        title: 'Past life memories come from parasitic souls, it can not prove reincarnation',
        abstract: 'Through the human mind’s “consciousness input port” — particularly the memory system — attached spirits(ghosts) transmit their own life experiences in first-person narrative form. The host misinterprets these as their own past-life memories, leading to the widespread belief in reincarnation. This series demonstrates that reincarnation is a cognitive illusion, not a metaphysical reality.',
        keyFeatures: 'Rigorous logical analysis: The alleged “reincarnated self” has no biological continuity. It lacks a coherent sense of “I” — no unified identity, no persistent consciousness. Memory transfer ≠ identity transfer. This series exposes a fundamental error in spiritual research: mistaking information transfer for soul migration.',
        videoLength: '42mins',
      },
      {
        fileNumber: 'FILE 1-3',
        title: 'Whether Souls have Eyes? Scientific Discovery on Spiritual Vision',
        abstract: 'Eyes are a fundamental condition shaping the very nature of spirits(ghost) existence. If spirits(ghost) lack eyes, this fundamentally challenges every cultural, religious, and metaphysical assumption about the afterlife. Across nearly all human cultures, the ethereal realm is depicted as containing hellfires, paradisiacal realms, demons, gods, and other spirits. But how can spirits(ghost) perceive these environments — or each other — without visual organs? How can the imagined existence of spirits(ghost) even be coherent without sight?',
        keyFeatures: 'This series draws upon 19 peer-reviewed academic papers from China’s most prestigious institutions — including the Institute of Physics and Institute of Biophysics (Chinese Academy of Sciences), Peking University, National Taiwan University, Beijing Normal University, and the Shanghai Institute of Laser Technology — combined with the firsthand experiential accounts of the Wu family. Collectively, they provide conclusive evidence: spirits(ghost) do not possess eyes.',
        videoLength: '77mins',
      },
      {
        fileNumber: 'FILE 1-4',
        title: 'Discover the truth of body shape, organs, material composition and metabolism of souls',
        abstract: 'The ethereal body is material in nature. This series represents the first systematic scientific exploration into the physical structure, organ systems, material composition, and energy metabolism of human spirits(soul) after death — marking humanity’s initial step toward understanding the material reality of the ethereal realm.',
        keyFeatures: 'Drawing on 8 international academic studies, the ICD-11 classification (Category 6B6: Spirit Attachment Disorders) from the World Health Organization, and rare archival footage, this series presents the most comprehensive and empirically grounded analysis to date of the spirit body’s anatomical and physiological characteristics..',
        videoLength: '243mins',
      },
    ],
  },
  spiritMedicine: {
    title: 'Woos Spirit Medicine',
    description:
      'Healing methodologies connecting the physical body and ethereal consciousness. This season focuses on practical intervention, structured recovery pathways, and ongoing restoration of balance for mind and soul.',
    note: 'This page follows the original documentary-series structure and is prepared for continuous content refinement. Full chapter media can be updated progressively.',
    bannerImages: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=2000&q=80',
      'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=2000&q=80',
    ],
    volumes: [
      {
        title: 'Vol. 1 - Foundational Medicine',
        episodes: [
          {
            fileNumber: 'FILE 2-1-1',
            title: 'Principles of Spirit Medicine',
            description:
              'Foundational framework for evaluating cases, defining intervention boundaries, and establishing treatment baselines.',
            link: 'https://ess-esw.org/',
          },
          {
            fileNumber: 'FILE 2-1-2',
            title: 'Assessment and Case Intake',
            description:
              'A structured approach for symptom mapping, progression tracking, and identifying high-priority intervention windows.',
            link: 'https://ess-esw.org/',
            delay: 0.1,
          },
        ],
      },
    ],
  } as DocumentaryPage,
  universalMatrix: {
    title: 'Universal Matrix of Meta Awareness',
    description:
      'Advanced transcendental truths governing systemic universe order and ultimate human destiny. This season presents conceptual architecture, governance logic, and higher-order awareness models.',
    note: 'This section is scaffolded using the original series layout so you can fine-tune language, hierarchy, and visual rhythm in Layrr.',
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
            link: 'https://ess-esw.org/',
          },
          {
            fileNumber: 'FILE 3-1-2',
            title: 'Origins of Universal Order',
            description:
              'Explores first principles behind life orchestration, continuity mechanics, and order-preserving constraints.',
            link: 'https://ess-esw.org/',
            delay: 0.1,
          },
        ],
      },
    ],
  } as DocumentaryPage,
};
