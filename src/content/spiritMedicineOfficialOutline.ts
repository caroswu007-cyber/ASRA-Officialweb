/**
 * Full curriculum outline aligned with https://ess-esw.org/spirit-medicine/
 * Display order: FILE 2-1 → 2-2 → 2-4 → 2-3 → 2-5 (2-4 moved before 2-3 per editorial request).
 * anchorId must match `id` on main list in SpiritMedicineContents (`sm-file-${fileNumber}`).
 */
export type SpiritMedicineOutlineFile = {
  fileLabel: string;
  heading: string;
  anchorId: string;
  subsections?: { code: string; title: string }[];
};

export const spiritMedicineOfficialOutline: SpiritMedicineOutlineFile[] = [
  {
    fileLabel: 'FILE 2-1',
    heading: 'General Principles and Definition of Spirit Medicine',
    anchorId: 'sm-file-FILE-2-1',
  },
  {
    fileLabel: 'FILE 2-2',
    heading: 'Evidence for the Existence of Spirits (Ghosts)',
    anchorId: 'sm-file-FILE-2-2',
  },
  {
    fileLabel: 'FILE 2-4',
    heading: 'Overview: Physiology & Pathology of Spirits (Ghosts)',
    anchorId: 'sm-file-FILE-2-4',
    subsections: [
      { code: '2-4-1', title: 'Overview: American Spirits (Ghosts)' },
      { code: '2-4-2', title: 'PSI Ability of Spirits (Ghosts)' },
      { code: '2-4-3', title: 'Process of Human Death & the Birth of a Ghost' },
      { code: '2-4-4', title: 'The Intersection of Spirits (Ghosts) & the Physical World' },
      { code: '2-4-5', title: 'Mutual Harm & Death Among Spirits (Ghosts)' },
      { code: '2-4-6', title: 'Basic Pathology of Spirits (Ghosts)' },
    ],
  },
  {
    fileLabel: 'FILE 2-3',
    heading: 'Human Spirit (Soul) Physiology',
    anchorId: 'sm-file-FILE-2-3',
    subsections: [
      { code: '2-3-1', title: 'Understand the Spirit (Soul) from Meridians' },
      { code: '2-3-2', title: 'Physiological Systems of Spirit (Soul)' },
    ],
  },
  {
    fileLabel: 'FILE 2-5',
    heading: 'Pathology of Human Spirit (Soul)',
    anchorId: 'sm-file-FILE-2-5',
    subsections: [
      { code: '2-5-1', title: 'Intrinsic Pathology of the Human Spirit (Soul) Body' },
      { code: '2-5-2', title: 'Diseases Caused by Possessed Spirits (Ghosts)' },
      { code: '2-5-3', title: 'Harmonious Coexistence of Humans and Spirits (Ghosts)' },
    ],
  },
];
