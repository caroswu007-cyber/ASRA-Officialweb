/**
 * Founder story — dedicated page copy (English in this file).
 * Phase B Chinese: `zh.ts` keys `founderStory.phaseB.*`.
 * Use **double asterisks** for inline emphasis (rendered as gold bold).
 * @see https://ess-esw.org/storyline-of-woos/
 */
export const STORYLINE_OF_WOOS_URL = 'https://ess-esw.org/storyline-of-woos/' as const;

/**
 * Strings rendered only in `FounderStoryView` (outside `founderStoryPage` blocks or hardwired there).
 * Centralized for export workbooks and copy edits.
 */
export const founderStorySurfaceCopy = {
  heroNamesLine: 'John Long Woo · Caros · Sam',
  backToAbout: '← Organization overview',
  legacyTimelineLink: 'View full storyline archive',
  achievementsFeaturePageLink: 'View our achievements',
} as const;

export const founderStoryIllustrations: { src: string; alt: string }[] = [];

export const founderTimeline = [
  { phase: 'A', range: 'May 2014 — Feb 2025', label: 'Phase A — family field work', tone: 'sky' as const },
  { phase: 'A1', range: 'Mar 2018 — Jul 2020', label: 'Cheating Period 1', tone: 'amber' as const },
  { phase: 'A2', range: 'Jul 2020 — Nov 2020', label: 'Cheating period 2', tone: 'amber' as const },
  { phase: 'A3', range: 'Nov 2020 — Jul 2021', label: 'Exorcism period 1', tone: 'violet' as const },
  { phase: 'A4', range: 'Jul 2021 — Apr 2022', label: 'Exorcism 2 & high-level revealing', tone: 'violet' as const },
  { phase: 'A5', range: 'Dec 2023 — Jan 2025', label: 'Qing Xiaoxian (C2) · Qian Kai (C3)', tone: 'rose' as const },
  { phase: 'B', range: '2025年2月—2026年3月', label: 'B阶段 · TikTok 直播与灵魂医学档案', tone: 'gold' as const },
];

export const founderStoryPage = {
  heroTitle: 'Our Story Outline — 2026',
  heroBadge: 'Founder narrative',

  intro: `I am **John Long Woo**. Together with my two sons, **Caros** and **Sam** — we three, father and sons — we have lived through too many extraordinary events involving the **spirit realm** to count. Those experiences have made us the **first door-openers to the Spirit Realm** and the **first explorers of the truth of spirit life**.`,

  truths: {
    title: 'Three truths',
    items: [
      {
        label: 'Truth 1',
        blocks: [
          {
            text: `A living person is composed of both the **physical body** and the **spirit (soul)**. **Spirits (ghosts)** exist after human death. For the billions of them, the only way to survive is to **attach to human beings** and draw energy. That pattern is bound up with widespread illness such as **epilepsy**, **depression**, **schizophrenia**, and **somatic symptom disorders**. By **managing spirits (ghosts) through Master Spirits**, these conditions can often be rapidly improved. From that work we created **Spirit Medicine**. Further documentation appears in **Woos Record of Soul** and the **Woos Spirit Medicine** video archives.`,
          },
        ],
      },
      {
        label: 'Truth 2',
        blocks: [
          {
            text: `The **Spirit Realm** has governors — tremendous **Master Spirits**, upgraded from ordinary spirits through the **Universal Matrix of Meta Awareness**.`,
          },
        ],
      },
      {
        label: 'Truth 3',
        blocks: [
          {
            text: `The **Universal Matrix of Meta Awareness** is the **true creator-level substrate**; **our universe is part of its body**.`,
          },
          {
            title: 'Archive',
            text: `Further documentation appears in the **Universal Matrix of Meta Awareness** video archive.`,
          },
        ],
      },
    ],
  },

  phasesOverview: {
    title: 'Two major chapters',
    a: {
      title: 'Phase A — May 2014 through February 2025',
      blocks: [
        {
          title: 'Who was involved',
          text: `We fought **attached spirits** of different classes parasitizing our bodies — including a **Class-C1**-level entity (archive designation associated with the “**Hui’an**” tier), the **Class-C2** spirit **Qing Xiaoxian**, and the **Class-C3** spirit **Qian Kai**. They drove **severe illness across our family**.`,
        },
        {
          title: 'Motive and methods',
          text: `Our only motive was **self-rescue**: we tried every means we could to harm or destroy them. In doing so we learned the **physiological and physical properties of ghost bodies**, and communicated through **epileptic discharge**, **auditory hallucination sounds**, **consciousness dialogue**, **consciousness control**, and related modes — building a large, verified picture of the spirit world.`,
        },
        {
          title: 'Regret',
          text: `Our greatest regret in **Phase A** is that we did **not** systematically engage attached spirits on **other human hosts** outside our family, or in **other countries**.`,
        },
        {
          title: 'Record',
          text: `During this period we filmed **Woos Record of Soul**.`,
        },
      ],
    },
  },

  phaseAStages: [
    {
      id: 'a1',
      label: 'A 1',
      stageTitle: 'Stage 1 · Cheating Period 1',
      range: 'March 2018 — July 2020',
      paragraphs: [
        `During this period, the **low-level soul** in my body used **high-voltage electrostatic discharge** into drinks and wine to change their taste, aiming to fabricate a chain of “scientific” phenomena and laws that would ultimately “prove” **Buddhism**.`,
        `The details are too intricate to spell out fully in words.`,
      ],
      /** @see https://ess-esw.org/storyline-of-woos/ Stage 1 — SEE IN YOUTUBE */
      storylineClip: {
        legacyStage: '1',
        youtubeId: 'jQvr_xd7ruY',
      },
    },
    {
      id: 'a2',
      label: 'A 2',
      stageTitle: 'Cheating period 2',
      range: 'July 2020 — 15 November 2020',
      paragraphs: [
        `During this interval, the low-level soul used **epilepsy-like seizures** to impersonate, in sequence, the **three greatest gods of Buddhism**, pretending to convey **divine will** — until my sons and I had converted.`,
        `It was a **grotesque joke**; we were **playthings**. Even so, we exchanged a great deal of **philosophical insight** during the deception.`,
      ],
      /** @see https://ess-esw.org/storyline-of-woos/ Stage 2 — SEE IN YOUTUBE */
      storylineClip: {
        legacyStage: '2',
        youtubeId: 'BKcqPywrPco',
      },
    },
    {
      id: 'a3',
      label: 'A 3',
      stageTitle: 'Exorcism period 1',
      range: '15 November 2020 — July 2021',
      paragraphs: [
        `On **15 November 2020**, the **true identities** of the souls inside us and their **tricks** were finally exposed. In fear and rage we tried to **exorcise** them.`,
        `Traditional methods failed repeatedly; we remembered they had always **forbidden** us to touch **strong magnets**. We began using magnets to **hurt** them.`,
        `Within days the soul in my **elder son** could not endure it and **left first**; about **six weeks** later the soul in my **younger son** left for the same reason.`,
        `The soul in **me** refused to depart even when injured. I found that a **strong electrostatic field** could severely weaken its discharging: my **epilepsy vanished** the moment that happened — yet the soul **remained inside**, playing hide-and-seek.`,
      ],
    },
    {
      id: 'a4',
      label: 'A 4',
      stageTitle: 'Exorcism period 2 · and high-level revealing',
      range: 'July 2021 — 4 April 2022',
      paragraphs: [
        `In this stage we **found and confirmed** several ways to interfere with, injure, and **kill ordinary souls**.`,
        `The limits of **electrostatic and magnet** work drew the attention of a **high-level soul** who had died in China roughly **1,500 years ago**. It joined the exploration: **consciousness transmission** for hints, while **steering the ordinary soul’s behavior** until I learned how to kill and expel **precisely and efficiently**.`,
        `Each day I **tangled, fought, and coexisted** with the ordinary soul — **enemy and ally** at once — and traded large amounts of **spirit-relevant knowledge**.`,
        `Finally the high-level soul **disclosed itself**, demonstrated **extraordinary abilities**, cleared up a year of confusion, taught me more of the **soul world** — then **left my body** and vanished quickly.`,
      ],
    },
    {
      id: 'a5',
      label: 'A 5',
      stageTitle: 'Class-C2 Qing Xiaoxian · Class-C3 Qian Kai',
      range: 'December 2023 — January 2025',
      paragraphs: [
        `In **December 2023** I was again possessed by the **Class-C2** spirit **Qing Xiaoxian**. Across roughly **1,700 years** as a ghost it had devoured on the order of **5,000–10,000** other souls, becoming an **enormous entity**.`,
        `It turned the Woo home into a **haunted-house field**, spun **multiple avatars** onto both sons, and allowed its **core form** to coordinate those fragments **remotely**.`,
        `In the father: **schizophrenia**, **bipolar disorder**, **epilepsy**, **somatization**, and **powerful electrical assaults** on the heart. In the sons: **fatigue (energy coupling)**, **depression**, **pain disorder**, **IBS**, and further somatic patterns.`,
        `Father and sons continued to refine **exorcism** and **ghost-neutralization** until this entity was **fully destroyed**.`,
        `From **September 2024** through **January 2025** I was possessed again by the **Class-C3** spirit **Qian Kai**. **Higher ghost density means greater power** — so Qian Kai **exceeded** Qing Xiaoxian in **thought-control** and **pathogenic force**. We continued **self-rescue** until this spirit, too, was **eliminated**.`,
      ],
    },
  ],

  /** English canonical copy; Simplified Chinese: `founderStory.phaseB.*` in `zh.ts`. */
  phaseB: {
    id: 'b',
    title: 'Phase B — February 2025 through March 2026',
    blocks: [
      {
        title: 'Livestream scale and documented outcomes',
        text: `From **19 February 2025** through **24 December 2025**, **Caros** hosted **265** TikTok Live sessions and achieved **extraordinary outcomes** in the broadcast field. Full documentation and links: {{%ACH%}}`,
      },
      {
        title: 'Master Spirits, hybrid spirits, and remote capacity',
        text: `A great many **Master Spirits** and **hybrid spirits** reached out to us as father and sons, revealing that the spirit world includes order at the levels of **administrators** and **creator-class** structure. **Master Spirits** gave us extensive support and **unusual abilities**, so that **Caros**, **while in China**, could **remotely regulate** attached spirits on **hosts in North America** on the far side of the globe.`,
      },
      {
        title: 'How Phase A attachments were arranged',
        text: `**Most importantly**, we were told: every attached spirit on us during **Phase A** was **deliberately placed** by **Master Spirits**; clearing those presences was **authorized to serve as research material**.`,
      },
      {
        title: 'Illness, deception, and narrative as part of the plan',
        text: `The **suffering**, **deception**, and **taunting storylines** were also part of their plan—so we could learn their **operating style** and **disposition**.`,
      },
      {
        title: 'Understanding Master Spirit character',
        text: `That also showed us clearly: **Master Spirits** are **not** **angel-good** in the way we imagined; the help offered earlier was **not** driven by **kindness** but by **assignments** from the **Universal Matrix of Meta Awareness**. The **Phase A** stories convey the **temperament of the Master Spirit team** in depth.`,
      },
      {
        title: 'Spirit Medicine and video archives',
        text: `During this period **Spirit Medicine was formally established**; we produced **part of** the **Woos Spirit Medicine** and **Universal Matrix of Meta Awareness** video archives.`,
      },
    ],
  },
} as const;
