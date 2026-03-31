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
  { phase: 'A2', range: 'Jul 2020 — Nov 15, 2020', label: 'Cheating period 2', tone: 'amber' as const },
  { phase: 'A3', range: 'Nov 15, 2020 — Jul 2021', label: 'Exorcism period 1', tone: 'violet' as const },
  { phase: 'A4', range: 'Jul 2021 — Dec 2023', label: 'Exorcism 2 & high-level revealing', tone: 'violet' as const },
  { phase: 'A5', range: 'Dec 2023 — Jan 2025', label: 'Qing Xiaoxian (C2) · Qian Kai (C3)', tone: 'rose' as const },
  { phase: 'B', range: '2025年2月—2026年3月', label: 'B阶段 · TikTok 直播与灵魂医学档案', tone: 'gold' as const },
];

export const founderStoryPage = {
  heroTitle: 'ASRA Founders: The Story of the Woo Family',
  heroBadge: 'Founder narrative',

  intro: `I am **John Long Woo**. Together with my two sons, **Caros** and **Sam** — we three, father and sons — have lived through too many extraordinary stories involving the **spirit realm** to count. These experiences have made us the **first door-openers to the Spirit Realm** and the **first explorers of the truth of spirit life** (First door-opener to the Spirit Realm and first explorer of the Spirit life's truth).`,

  truths: {
    title: 'Discovered Truths of the Spirit Realm',
    items: [
      {
        label: 'Truth 1',
        blocks: [
          {
            text: `A living person is composed of both the **physical body** and the **spirit (soul)**. After death, the spirit becomes a **ghost (spirit ghost)**. For the **billions** of them, the only means of survival is to **attach to human beings** and obtain energy. This leads to global diseases such as **epilepsy**, **depression**, **schizophrenia**, and **somatic symptoms**. Through **managing spirits (ghosts) by master spirits**, these conditions can be rapidly improved. From this work we created **Spirit Medicine**.`,
          },
          {
            title: 'Archives',
            text: `Further documentation appears in the **Woos Record of Soul** and the **Woos Spirit Medicine** video archives.`,
          },
        ],
      },
      {
        label: 'Truth 2',
        blocks: [
          {
            text: `The **Spirit Realm** has governors — tremendous **master spirits**, upgraded from ordinary **C1 spirit ghosts** through the **Universal Matrix of Meta Awareness** (spirit realm has governor, who are tremendous master spirits, upgraded from C1 spirit ghost by Universal Matrix of Meta Awareness).`,
          },
        ],
      },
      {
        label: 'Truth 3',
        blocks: [
          {
            text: `The **Universal Matrix of Meta Awareness** is the **true creator**. Our **13.8-billion-year universe** is a part of **its body**. Further documentation appears in the **Universal Matrix of Meta Awareness** video archive.`,
          },
        ],
      },
    ],
  },

  phasesOverview: {
    title: 'Two Major Chapters',
    a: {
      title: 'Phase A — May 2014 through February 2025',
      blocks: [
        {
          title: 'What happened',
          text: `In this phase, we mainly fought the **attached spirits (ghosts) of different levels** parasitizing our bodies — including the **C1-level** entity (Hui'an), the **C2-level** ghost **Qing Xiaoxian**, and the **C3-level** ghost **Qian Kai**. They caused **various illnesses across our entire family**.`,
        },
        {
          title: 'Motive and methods',
          text: `We fought only for **self-rescue** — trying and researching every possible method to **kill** them. In the process of harming and destroying them, we learned the **physiological and physical properties of ghost bodies**, and communicated through **epileptic discharge**, **auditory hallucination sounds**, **consciousness dialogue**, **consciousness control**, and other modes — building a verified picture of the spirit world.`,
        },
        {
          title: 'Regret',
          text: `Our greatest regret in **Phase A** is that we did **not** engage with attached spirits on **other people** outside our family, or those in **other countries**.`,
        },
        {
          title: 'Record',
          text: `During this period we filmed the **Woos Record of Soul**.`,
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
        `During this period, the **C1 spirit ghost** in my body used the way of releasing **high voltage electrostatic** in drinks and wine to change the taste of drinks, aimed to fabricate a series of scientific phenomena and laws, which would finally lead to the proof of the existence of **Buddhism**. The details are complicated to explain clearly in words.`,
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
        `During this time, the **C1 spirit ghost** in my body used ways of **epilepsy seizure** to disguise itself as the **three greatest gods of Buddhism** by time and pretend conveying deity's will to us, made me and my two sons converted to **Buddhism** finally. It's actually a big joke and we were just like **toy monkeys** at that time. However we exchanged a lot of **philosophy cognition and knowledge** during the cheating.`,
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
        `At **Nov 15, 2020**, the **real identities** of spirit ghosts inside us and their tricks were finally **debunked**. In great fear and anger, we want to **exorcise** them. After many failures using traditional ways, we recalled that they always forbade us to touch any **strong magnets** with various excuses in previous communications. So we started using **magnets** to hurt them.`,
        `A few days later, the spirit ghost inside my **elder son** couldn't stand it and **left first**. Then after a **month and a half**, the spirit ghost inside my **younger son** also left due to the same reason. But the spirit ghost in my body was unable to leave even it was already slightly injured, it made me puzzled.`,
        `I found out that using a **strong electrostatic field** could greatly weaken it from discharging, and my **epilepsy** was eliminated immediately once it happens. But the spirit ghost was still inside me and continued **played hide and seek** with me.`,
      ],
    },
    {
      id: 'a4',
      label: 'A 4',
      stageTitle: 'Exorcism period 2 · and high-level revealing',
      range: 'July 2021 — December 2023',
      paragraphs: [
        `During this stage, several ways of **interfering, hurting and killing C1 spirit ghost** were found and confirmed.`,
        `The limitation of **electronic and magnet therapy** raised interest of a **master ghost** who died **1500 years ago** in China. It participated in the exploration of how to exorcise and kill **C1 spirit ghost** without raising the C1 spirit ghost and my attention. During the process, it used ways of **consciousness transmission** to give me hint, inspiration. In the same time, it also **manipulated the behavior** of that C1 spirit ghost, which finally let me know how to kill and exorcise C1 spirit ghost **precisely and efficiently**.`,
        `I **entangled, fought, and coexisted** with the C1 spirit ghost every day, formed a subtle relationship that was both **enemy and friend**. In the process of injuring the spirit ghost, we also exchanged a lot of knowledge about **spiritual related information**. Finally, the master ghost **showed up** and demonstrated its **extraordinary abilities**. It explained various confusions over the past year and taught me much knowledge of the **spiritual realm**, then it left my body and vanished quickly.`,
      ],
    },
    {
      id: 'a5',
      label: 'A 5',
      stageTitle: 'Class-C2 Qing Xiaoxian · Class-C3 Qian Kai',
      range: 'December 2023 — January 2025',
      paragraphs: [
        `In **December 2023**, I was again possessed by the **C2-level** ghost **Qing Xiaoxian**. During its **1,700 years** as a ghost, this entity had devoured approximately **5,000 to 10,000** other souls, becoming an **enormous spirit body**. It turned the Woo home into a **haunted house**, created **multiple avatars** that attached to both sons, and the core entity could **communicate with these avatars remotely**.`,
        `In my body, this ghost caused **schizophrenia**, **bipolar disorder**, **epilepsy**, **somatization**, and other manifestations. It also attacked my **heart** with extremely powerful electric currents, causing **heart failure symptoms**. In both sons, it caused **fatigue (energy synergy)**, **depression**, **pain disorders**, **irritable bowel syndrome**, and other somatic symptoms.`,
        `We continued to refine **exorcism and ghost-elimination** techniques and ultimately **successfully destroyed** this ghost.`,
        `From **September 2024** to **January 2025**, I was again possessed by the **C3-level** ghost **Qian Kai**. Qian Kai's density was far **higher** than the C2-level Qing Xiaoxian. The higher the ghost's density, the **stronger its capabilities** — so Qian Kai's **thought-control and pathogenic power** were also stronger. We continued **self-rescue** and killed this ghost as well.`,
      ],
    },
  ],

  /** English canonical copy; Simplified Chinese: `founderStory.phaseB.*` in `zh.ts`. */
  phaseB: {
    id: 'b',
    title: 'Phase B — February 2025 through March 2026',
    blocks: [
      {
        title: 'Verification of Phase A truths',
        text: `In this phase, **Caros** communicated with a large number of **attached ghosts** in North America through **TikTok live streams**, completely confirming all the **spirit world truths** we obtained in **Phase A**. With the help of **master spirits**, Caros obtained the **superpower to remotely control attached ghosts** in North America. This superpower is the foundation upon which we built **ASRA**.`,
      },
      {
        title: 'Livestream scale and documented outcomes',
        text: `From **19 February 2025** to **24 December 2025**, **Caros** conducted a total of **255** live streams on **TikTok**, achieving **extraordinary outcomes** in the livestream field. Links to these achievements: {{%ACH%}}`,
      },
      {
        title: 'Master spirits and hybrid spirits',
        text: `A great number of **master spirits** and **hybrid spirits** reached out to us as father and sons, letting us know that the **spirit world** surprisingly has **administrators and creators**. **Master spirits** gave us a great deal of help and **special miraculous powers**, enabling **Caros**, while in **China**, to directly and **remotely control** attached ghosts on the **far side of the globe in North America**.`,
      },
      {
        title: 'How Phase A attachments were arranged',
        text: `**Most importantly**, we were told: every attached ghost on us during **Phase A** was **deliberately arranged** by **master spirits**. The killing of those attached ghosts was **permitted as research material**. All the **suffering, deception, and taunting storylines** were also part of their plan — to let us understand their **operating style and character disposition**.`,
      },
      {
        title: 'Understanding master spirit character',
        text: `This also let us fully understand: **master spirits** are **not** as **angel-like kind** as we imagined. The help provided earlier was **not** out of **kindness** but was work **assigned to them by the Universal Matrix of Meta Awareness**. Everyone can fully appreciate the **character attributes of the master spirit team** through the **Phase A stories**.`,
      },
      {
        title: 'Spirit Medicine and video archives',
        text: `During this period, **Spirit Medicine was formally established**. Part of the **Woos Spirit Medicine** and **Universal Matrix of Meta Awareness** video archive series were filmed.`,
      },
    ],
  },
} as const;
