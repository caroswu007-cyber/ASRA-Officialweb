/**
 * File index for /universal-matrix — single source for UI and export workbooks.
 * @see src/components/universalMatrix/UniversalMatrixContents.tsx
 */
export type MatrixSubChapter = {
  id: string;
  title: string;
  indent?: boolean;
};

export type MatrixFile = {
  fileNumber: string;
  title: string;
  subChapters?: MatrixSubChapter[];
  /** Shown after this row when set (direct `watch`/`youtu.be` URL recommended). */
  watchYoutubeUrl?: string;
};

/** Season III official list: @see https://www.youtube.com/watch?v=A6M1rbSt2p8&list=PL-pt7dbiRizs8xxJABXkxQpfyHDtWZ3W5 */
export const UNIVERSAL_MATRIX_PLAYLIST_ID = 'PL-pt7dbiRizs8xxJABXkxQpfyHDtWZ3W5';

export const UNIVERSAL_MATRIX_S3E1_VIDEO_ID = 'A6M1rbSt2p8';

export const UNIVERSAL_MATRIX_S3E1_YOUTUBE_URL = `https://www.youtube.com/watch?v=${UNIVERSAL_MATRIX_S3E1_VIDEO_ID}&list=${UNIVERSAL_MATRIX_PLAYLIST_ID}`;

export const universalMatrixFiles: MatrixFile[] = [
  {
    fileNumber: 'FILE 3-1',
    title: 'Introduction to Universal Matrix of Meta Awareness',
    watchYoutubeUrl: UNIVERSAL_MATRIX_S3E1_YOUTUBE_URL,
  },
  {
    fileNumber: 'FILE 3-2',
    title: 'Existence evidence Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-2-1', title: 'Reasonable inference and evidence for his existence' },
      { id: '3-2-2', title: 'Verification video for skeptics' },
    ],
  },
  {
    fileNumber: 'FILE 3-3',
    title: 'Ethereal Matter & Ethereal Realm',
    subChapters: [
      { id: '3-3-1', title: 'Ethereal micro-particles & the Zero Space of Ethereal Space' },
      { id: '3-3-2', title: 'Control and influence over the real universe' },
      { id: '3-3-3', title: 'Virtual space of Ethereal Space' },
      { id: '3-3-4', title: 'Spirit survival support system' },
    ],
  },
  {
    fileNumber: 'FILE 3-4',
    title: 'Spirit Control System from Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-4-1', title: 'Description of the control system' },
      { id: '3-4-1-1', title: 'Evidence', indent: true },
      { id: '3-4-1-2', title: 'Organization framework of Master Spirits', indent: true },
      { id: '3-4-1-3', title: 'System Data Uplink System-Akashic Record', indent: true },
      { id: '3-4-1-4', title: 'Multiple Data Downlink Mode', indent: true },
      { id: '3-4-2', title: 'Management & behavior style of Master Spirits' },
    ],
  },
  {
    fileNumber: 'FILE 3-5',
    title: 'Purpose of Manifestation Universal Matrix of Meta Awareness',
    subChapters: [
      { id: '3-5-1', title: 'Why do other types of life forms not interact with humans?' },
      { id: '3-5-2', title: 'He is scheduled to emerge at the Singularity of AI' },
      { id: '3-5-3', title: 'He Guides the Optimal Ultimate Form of Human Society' },
      { id: '3-5-4', title: 'He Guides the Optimal Ultimate State of Individual Human Life' },
    ],
  },
];

export function countUniversalMatrixSubChapters(): number {
  return universalMatrixFiles.reduce((acc, f) => acc + (f.subChapters?.length ?? 0), 0);
}
