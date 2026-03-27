/**
 * 2025 program outcomes — long-form documentation copy (English).
 * Hero + carousel use originals in `public/images/achievements/` (see filenames below).
 */
export const LIVESTREAM_REPLAY_PLAYLIST =
  'https://www.youtube.com/playlist?list=PL-pt7dbiRizs_N5TVfKmj5ptuG15TeQgK';

/** Unsplash URLs only: shrink `w`/`q` for faster loads. Local `/images/...` paths are returned unchanged. */
export function compressUnsplash(src: string, width: number, quality = 72): string {
  if (!src.includes('images.unsplash.com')) return src;
  return src.replace(/\bw=\d+/i, `w=${width}`).replace(/\bq=\d+/i, `q=${quality}`);
}

/** Live session screenshots — `carousel-1.png` … `carousel-4.png` in `public/images/achievements/`. */
export const carouselSlides: { src: string; alt: string }[] = [
  { src: '/images/achievements/carousel-1.png', alt: 'TikTok Live session screenshot' },
  { src: '/images/achievements/carousel-2.png', alt: 'TikTok Live session screenshot' },
  { src: '/images/achievements/carousel-3.png', alt: 'TikTok Live session screenshot' },
  { src: '/images/achievements/carousel-4.png', alt: 'TikTok Live session screenshot' },
];

export type MetricIcon =
  | 'calendar'
  | 'radio'
  | 'users'
  | 'clapperboard'
  | 'clock'
  | 'ear'
  | 'message-circle'
  | 'shield-check'
  | 'sparkles';

export type MainMetric =
  | { label: string; text: string; icon: MetricIcon; hint: string }
  | { label: string; end: number; suffix: string; icon: MetricIcon; hint: string };

export const mainMetrics: MainMetric[] = [
  { label: 'Reporting period', text: 'Twelve months (2025)', icon: 'calendar', hint: 'Single calendar-year field window' },
  { label: 'Primary platform', text: 'TikTok Live', icon: 'radio', hint: 'Main discovery and session venue' },
  {
    label: 'Participants',
    text: 'Anonymous, self-presenting individuals',
    icon: 'users',
    hint: 'Entered via platform recommendations without prior triage',
  },
  { label: 'Session count', end: 265, suffix: '+', icon: 'clapperboard', hint: 'Documented public-benefit live sessions' },
  { label: 'Cumulative broadcast', end: 800, suffix: '+ hours', icon: 'clock', hint: 'Total logged airtime' },
  { label: 'Estimated reach', end: 70000, suffix: '+', icon: 'ear', hint: 'Platform-indicated listener contacts' },
  { label: 'Extended interviews', end: 1200, suffix: '+', icon: 'message-circle', hint: 'Structured conversations beyond initial contact' },
  {
    label: 'Presentations with reported improvement',
    end: 240,
    suffix: '+',
    icon: 'shield-check',
    hint: 'Individuals reporting mental-health–related distress reduction',
  },
  {
    label: 'Attached spirits documented',
    end: 400,
    suffix: '+ (approx.)',
    icon: 'sparkles',
    hint: 'Distinct spirit presences noted in session records; some hosts carried multiples',
  },
];

export const spiritFindings = [
  {
    title: 'Memory loss',
    stat: '90%',
    body:
      'Of spirits (ghosts) do not remember their own names, gender, or other basic pre-death information, and do not remember the death process.',
    visual: 'pie90' as const,
  },
  {
    title: 'Loss of humanity',
    stat: '100%',
    body: 'American spirits (ghosts) have lost most of their humanity and acquired new characteristics.',
    visual: 'transform' as const,
  },
  {
    title: 'New abilities',
    stat: '100%',
    body: 'American spirits (ghosts) acquired new abilities in the spiritual world.',
    visual: 'badges' as const,
  },
  {
    title: 'Master spirit transportation',
    stat: 'Majority',
    body: 'The vast majority of American spirit attachments are transported by master spirits.',
    visual: 'flow' as const,
  },
  {
    title: 'Control system',
    stat: '100%',
    body:
      'Spirits (ghosts) and their hosts are governed by two prohibition types in UMMA’s soul control system — virtually no direct communication between them.',
    visual: 'network' as const,
  },
];

export const interestingSpirits = [
  {
    badge: 'Historical attachment',
    title: 'Quebec, 1813 — sibling pair',
    body:
      'A pair of sibling spirits who died in the Quebec region in 1813, still retaining complete memories to this day.',
    tone: 'sepia' as const,
  },
  {
    badge: 'Inter-species transfer (reported)',
    title: 'Horse → caretaker transfer',
    body:
      'A spirit that parasitized a horse, then transferred to the horse’s caretaker, transmitting some equine emotion and consciousness to the host.',
    tone: 'earth' as const,
  },
  {
    badge: 'Environmental phenomena (reported)',
    title: 'Physical-environment phenomena',
    body:
      'Capable of creating scars on the host’s body, moving blankets, and numerous flying light orbs throughout the home.',
    tone: 'electric' as const,
  },
  {
    badge: 'Multi-member household pattern',
    title: 'Five family members',
    body: 'Remote Port Organs across all five family members, affecting an entire lineage.',
    tone: 'wine' as const,
  },
  {
    badge: 'Long-term co-presence',
    title: 'Co-agency from age ten',
    body:
      'Parasitized the host at age ten, manifested, and agreed to take turns controlling the body — enabling world travel and career completion.',
    tone: 'gold' as const,
  },
  {
    badge: 'Developmentally young presentation',
    title: 'Five years old',
    body: 'Manifested attached spirit estimated at five years of age.',
    tone: 'pastel' as const,
  },
];

export const masterManifestations = [
  {
    date: 'July 31',
    host: 'mkanimalsea',
    event:
      'Host and attached spirit (ghost) summoned a huge, black, rapidly moving archangel.',
    mood: 'darkAngel' as const,
  },
  {
    date: 'July 25',
    host: 'Jen',
    event:
      'After incantations, one attached spirit felt a guiding presence of light and love; another felt a dark knight.',
    mood: 'split' as const,
  },
  {
    date: 'August 14',
    host: 'Dominick',
    event: 'Summoned the arrival and instructions of the divine designation “Elohim.”',
    mood: 'divine' as const,
  },
];

export const conditionsTreated = [
  'Schizophrenia',
  'Bipolar disorder',
  'Depression',
  'Anxiety',
  'DID (dissociative identity disorder)',
  'PTSD',
  'Schizoaffective disorder',
  'ADHD',
  'OCD',
  'Social phobia',
  'Driving phobia',
];

export const patientJourneySteps = [
  { step: 1, title: 'Discovery', detail: 'Unsolicited platform recommendation' },
  { step: 2, title: 'Initial contact', detail: 'No-cost first session offered' },
  { step: 3, title: 'Remote invocation', detail: 'Attached spirits addressed per protocol' },
  { step: 4, title: 'Dialogue', detail: 'Structured exchange with host and spirits' },
  { step: 5, title: 'Regulation', detail: 'Coordinated spirit-realm techniques' },
  { step: 6, title: 'Follow-up reports', detail: 'Participant-described symptom change' },
];

export const livestreamTechnologies = [
  {
    title: 'Illumination / transmission',
    body:
      'Livestream mobile screen aimed at the host’s head, chest, and back for illumination and energy transmission.',
  },
  {
    title: 'Incantations & prohibitions',
    body: 'Release of control incantations and prohibition structures coordinated with master spirits.',
  },
];

export const outcomeCases = [
  {
    date: 'August 11',
    condition: '15+ years untreated depression and bipolar disorder',
    result: 'Relief within ~30 minutes; no recurrence reported.',
    visual: 'timeline' as const,
  },
  {
    date: 'June 14',
    condition: 'PTSD troubling the patient for many years',
    result: 'Resolved in one spirit-management session; trauma imprint dissipated.',
    visual: 'chains' as const,
  },
  {
    date: 'September 11',
    condition: 'Severe schizophrenia with malignant alters steering life',
    result: 'Within one hour, attached spirits heavily suppressed; sustained relief over the following month.',
    visual: 'chart' as const,
  },
  {
    date: 'July 18',
    condition: 'Child with autism for many years',
    result: 'After adjusting spirits within the body, symptoms began to improve.',
    visual: 'growth' as const,
  },
  {
    date: 'September 3',
    condition: 'Severe somatization',
    result: 'Home field regulated; somatization and emotional state greatly improved.',
    visual: 'body' as const,
  },
];

export const experiments = [
  {
    title: 'Symptom conversion',
    body: 'Rapid conversion between emotional disorders, schizophrenia, and DID symptoms in a short window.',
  },
  {
    title: 'Spirit (ghost) movement',
    body: 'Attached spirit relocation vs. host symptom improvement — correlation mapping.',
  },
  {
    title: 'External drug application',
    body: 'Experimental external medication application during live field conditions.',
  },
];

export const featuredCases = [
  {
    badge: 'Illustrative case',
    handle: 'annabella',
    title: 'Multi-identity DID',
    body:
      'DID presentation with 30+ identities — mutual control, influence, and amnesia among attached spirits within one host.',
    finding: 'Complex inter–spirit dynamics and control hierarchies in a single body.',
  },
  {
    badge: 'Illustrative case',
    handle: 'gabby',
    title: 'Cult survivor',
    body:
      'Survivor exiting a cult — attached spirits revealed how cults and spiritual mediums steer health at the spirit level.',
    finding: 'Mechanisms of spiritual manipulation in high-control environments.',
  },
  {
    badge: 'Illustrative case',
    handle: 'idk',
    title: 'Delusion of divinity',
    body:
      'Patient posing as demons and deities — after structured experiments, attached spirit admitted identities were fabricated.',
    finding: 'False identity projection and deception capacity of attached spirits.',
  },
  {
    badge: 'Illustrative case',
    handle: 'dominick',
    title: 'Sexuality transformation',
    body:
      'DID presentation — attached spirit described gradually shaping the host’s sexual orientation over years.',
    finding: 'Long-horizon spirit influence on psychosexual development.',
  },
];

export const livestreamLinkPlaceholders = [
  { label: 'YouTube — replay playlist', href: LIVESTREAM_REPLAY_PLAYLIST, platform: 'youtube' as const },
  { label: 'TikTok — @ASra field archive (placeholder)', href: 'https://www.tiktok.com/', platform: 'tiktok' as const },
];

export const cohortSourcesBody =
  'Presentations described as treatment-resistant or refractory entered chiefly through platform discovery, with an initial no-cost contact window. Interventions were conducted in live field conditions alongside Master Spirit collaboration.';

/** One-line header metrics — plain text, no decorative “badges.” */
export const heroHighlights: { label: string; value: string }[] = [
  { label: 'Documented sessions', value: '265+' },
  { label: 'Broadcast hours', value: '800+' },
  { label: 'Estimated reach', value: '70k+' },
];

export const pageIntro = {
  heroBadge: '2025 · Field documentation',
  heroTitle: '2025 Program Outcomes and Documentation',
  heroSubtitle:
    'Structured summary of anonymized TikTok Live sessions coordinated with Master Spirit teams: descriptive statistics, qualitative spirit-realm observations, mental-health presentations, and representative case narratives. Findings are reported for transparency; they do not constitute a randomized clinical trial.',
  systematicNote:
    'Baseline interview data covered memory content, reported mental state, living conditions, accounts of death-related transition, and self-reported awareness of the spirit realm.',
};

export const sectionTitles = {
  stats: 'Descriptive statistics',
  statsSub: 'Aggregated indicators for the 2025 reporting window',
  findings: 'Synthesis: baseline interviews with attached spirits',
  findingsSub:
    'Qualitative patterns from structured interviews with American attached spirits (ghosts), summarized below.',
  interesting: 'Illustrative attachment profiles',
  interestingSub:
    'Selected narratives; use “Show more” on long entries. Categories are descriptive, not a formal taxonomy.',
  master: 'Chronology: notable live-session events',
  masterSub: 'Chronological excerpts from session documentation.',
  mental: 'Mental-health presentations',
  mentalSub: 'Cohort receiving coordinated spirit-realm support',
  conditions: 'Condition categories (non-exhaustive)',
  /** Cohort section — sources + process (conditions listed first in-page) */
  cohortSources: 'Cohort sources',
  cohortProcess: 'Session sequence',
  journey: 'Cohort entry and session flow',
  journeyNote: 'Typical sequence (individual trajectories may vary).',
  tech: 'Two primary technical modalities',
  techSub: 'Used with Master Spirit coordination during live sessions.',
  outcomes: 'Reported outcomes',
  outcomesSub: 'Anonymized summaries; participant-described relief windows.',
  experiments: 'In-session structured observations',
  experimentsSub: 'Pilot procedures documented within live sessions.',
  special: 'Illustrative case summaries',
  specialSub: 'Extended text is collapsed per card for readability.',
  links: 'Archives and official channels',
  linksSub: 'Primary playlist and channel placeholders.',
};

export const closingCopy = {
  ctaHeadline: 'Further reading and membership',
  ctaSub:
    'Session replays are preserved for independent review. General inquiries and applications are handled through the Association’s public membership page.',
  ctaButton: 'Open YouTube replay playlist',
  disclaimer:
    'This page summarizes session-documented field work. It is not medical advice, not a randomized trial, and does not replace care by licensed professionals. Clinical labels are used for reader orientation only.',
};

/** Academic report shell — title block and running heads */
export const reportMeta = {
  documentLabel: 'Field report',
  affiliation: 'Spirit Ambassador Association (ASra)',
  reportingPeriod: 'Primary data window: calendar year 2025',
  distributionNote:
    'Public-facing summary of anonymized session logs and participant narratives; not a peer-reviewed study.',
};

/** Table of contents anchors — labels match on-page section headings */
export const reportToc: { id: string; label: string }[] = [
  { id: 's1', label: '1. Descriptive statistics' },
  { id: 's2', label: '2. Synthesis: baseline interviews with attached spirits' },
  { id: 's3', label: '3. Illustrative attachment profiles' },
  { id: 's4', label: '4. Chronology: notable live-session events' },
  { id: 's5', label: '5. Mental-health presentations' },
  { id: 's6', label: '6. Technical modalities' },
  { id: 's7', label: '7. Reported outcomes' },
  { id: 's8', label: '8. In-session structured observations' },
  { id: 's9', label: '9. Illustrative case summaries' },
  { id: 's10', label: '10. Archives and official channels' },
];

/** Results — main narrative paragraph (§7 lead-in) */
export const outcomesNarrative =
  'Within approximately 30 minutes of the initial structured contact, more than 80% of hosts and attached spirits reported relief from acute mental distress (spirits in this cohort were also described with presentations analogous to clinical disorder categories). Through 24 December 2025, most participants had not requested a second intensive session; in their own accounts, that pattern was interpreted as stable benefit across the observation interval. These statements are self-reported and were not independently verified against medical records.';

export const archivePlaceholderNote =
  'Additional index, search, and calendar views may be attached when the archive API is available.';

export const caseArchiveNote =
  'For primary-source context, see the replay materials listed in §10.';

/**
 * Lead figure at top of /our-achievements — `public/images/achievements/report-hero.png`.
 */
export const reportHeroFigure: { imageSrc: string; alt: string; caption: string } = {
  imageSrc: '/images/achievements/report-hero.png',
  alt: 'Portrait — program principal',
  caption: 'Figure 1 — Field leadership portrait',
};

/** Stock imagery for “open science / clinical lab” section strips on the achievements page. */
export const scientificStockFigures: { src: string; label: string }[] = [
  {
    src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    label: 'Session metrics are paired with structured, repeatable field notes (open-documentation style).',
  },
  {
    src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80',
    label: 'Baseline interviews with spirits (ghosts) are treated like clinical observations: dated, anonymized, comparable.',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    label: 'Cohort-scale charts summarize distribution patterns across hundreds of livestreams.',
  },
  {
    src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    label: 'Methods—illumination paths, incantation timing, and outcome windows—are reported for transparency.',
  },
];
