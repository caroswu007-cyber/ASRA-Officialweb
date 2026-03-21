/**
 * Spirit Medicine — Season II episode list synced to official YouTube playlist.
 * @see https://www.youtube.com/playlist?list=PL-pt7dbiRizs3yIAao06SPk2NrDTBc9q_
 *
 * Titles and video IDs sourced from playlist metadata (Invidious API). Order is curriculum order (by file code), not playlist upload order.
 */

export const SPIRIT_MEDICINE_PLAYLIST_ID = 'PL-pt7dbiRizs3yIAao06SPk2NrDTBc9q_';

export type SpiritMedicineEpisode = {
  /** Short code parsed from the YouTube title, e.g. 2-4-1-5-1 */
  code: string;
  title: string;
  videoId: string;
  lengthSeconds: number;
};

export type SpiritMedicineFileGroup = {
  fileNumber: string;
  sectionTitle: string;
  episodes: SpiritMedicineEpisode[];
};

export function spiritMedicineEpisodeUrl(videoId: string): string {
  const params = new URLSearchParams({ v: videoId, list: SPIRIT_MEDICINE_PLAYLIST_ID });
  return `https://www.youtube.com/watch?${params.toString()}`;
}

export const spiritMedicinePlaylistUrl = `https://www.youtube.com/playlist?list=${SPIRIT_MEDICINE_PLAYLIST_ID}`;

/** 17 episodes; one playlist slot is a removed video and is omitted here. */
export const spiritMedicineFileGroups: SpiritMedicineFileGroup[] = [
  {
    fileNumber: 'FILE 2-1',
    sectionTitle: 'Abstract & scope of Spirit Medicine',
    episodes: [
      {
        code: '2-1',
        title: 'File 2-1 Abstract of Spirit Medicine',
        videoId: 'U6-r-PD9tpA',
        lengthSeconds: 513,
      },
    ],
  },
  {
    fileNumber: 'FILE 2-2',
    sectionTitle: 'Evidence for the existence of spirits (ghosts)',
    episodes: [
      {
        code: '2-2',
        title: 'FILE 2-2 Evidence of existence of spirits(ghosts)',
        videoId: 'cA9RhHnJ6To',
        lengthSeconds: 791,
      },
    ],
  },
  {
    fileNumber: 'FILE 2-3',
    sectionTitle: 'Human spirit (soul) physiology — spiritual brain & memory',
    episodes: [
      {
        code: '2-3-2-1-1',
        title: 'File 2-3-2-1-1 Spiritual brain located in the flesh brain',
        videoId: 'fLWaapZiL9M',
        lengthSeconds: 2134,
      },
      {
        code: '2-3-2-1-2',
        title: 'File 2-3-2-1-2 Spiritual-Brain Organs Located in the Heart',
        videoId: 'OWZKhTfKJ40',
        lengthSeconds: 3023,
      },
      {
        code: '2-3-2-1-3',
        title: 'File 2-3-2-1-3 Spiritual-Brain Long-Term Memory Organ Located in the Cloud of the Ethereal Realm',
        videoId: 'WynGYdLCEJ4',
        lengthSeconds: 1101,
      },
    ],
  },
  {
    fileNumber: 'FILE 2-4',
    sectionTitle: 'American spirit (ghost): overview, physiology & clinical angles',
    episodes: [
      {
        code: '2-4-1-1',
        title: 'File 2-4-1-1 Overview,classification & statistical data of America Spirit(ghost)',
        videoId: 'dcKadcSVecE',
        lengthSeconds: 1794,
      },
      {
        code: '2-4-1-2',
        title: 'File 2-4-1-2 The disposition of American spirit (Ghost) & Possibility of Organized Harm to Humans',
        videoId: '4XRru2_T4RU',
        lengthSeconds: 1590,
      },
      {
        code: '2-4-1-3',
        title: 'File 2-4-1-3 The Physiological State of American spirit(ghost): Memory and Energy Metabolism',
        videoId: '9lJzTTSSFzk',
        lengthSeconds: 1761,
      },
      {
        code: '2-4-1-4',
        title: 'File 2-4-1-4 The Physiological State of American spirit(ghost): Thinking and Emotion',
        videoId: '4jgQIDhU8Ns',
        lengthSeconds: 2152,
      },
      {
        code: '2-4-1-5-1',
        title: 'File 2-4-1-5-1 The remote port organ (1)',
        videoId: 'ufZjGAgxxdo',
        lengthSeconds: 4371,
      },
      {
        code: '2-4-1-5-2',
        title: 'File 2-4-1-5-2 The remote port organ (2)',
        videoId: 'mo9FmQkIJAM',
        lengthSeconds: 2370,
      },
      {
        code: '2-4-1-6-1',
        title: 'File 2-4-1-6-1 High Incidence of Depression Among Physicians and Psychologists, and the Reasons (1)',
        videoId: 'o6lJCwFJlJM',
        lengthSeconds: 1109,
      },
      {
        code: '2-4-1-6-2',
        title: 'File 2-4-1-6-2 High Incidence of Depression Among Physicians and Psychologists, and the Reasons (2)',
        videoId: 'wl39TRDg3h8',
        lengthSeconds: 3564,
      },
    ],
  },
  {
    fileNumber: 'FILE 2-5',
    sectionTitle: 'Pathology of the human spirit & possession effects on the host',
    episodes: [
      {
        code: '2-5-2-1-1',
        title: 'File 2-5-2-1-1 Pathological Principles of Schizophrenia and Dissociative Disorders (1)',
        videoId: '7MhjglFacwA',
        lengthSeconds: 1536,
      },
      {
        code: '2-5-2-1-2',
        title: 'File 2-5-2-1-2 Pathological Principles of Schizophrenia and Dissociative Disorders (2)',
        videoId: 'xL66MhE543E',
        lengthSeconds: 1588,
      },
      {
        code: '2-5-2-2',
        title: 'File 2-5-2-2 The Comprehensive Impact of Possessing spirit ghost on the Human Host\'s flesh body',
        videoId: 'vDU7VnOoG3g',
        lengthSeconds: 2064,
      },
      {
        code: '2-5-2-3',
        title: 'File 2-5-2-3 Soul Pathology Principles & Healing Strategies for Various Emotional Disorders',
        videoId: 'fuB7DLKPxw0',
        lengthSeconds: 1784,
      },
    ],
  },
];

export function totalSpiritMedicineEpisodes(): number {
  return spiritMedicineFileGroups.reduce((n, g) => n + g.episodes.length, 0);
}

export function formatEpisodeDuration(seconds: number): string {
  if (!seconds || seconds < 60) return '—';
  const m = Math.round(seconds / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  return rm ? `${h}h ${rm}m` : `${h}h`;
}
