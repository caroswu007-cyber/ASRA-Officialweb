/**
 * Home-only readable typography: splits copy on newlines / sentence boundaries
 * (no wording changes) and supports **inline bold** like FounderStoryView.
 */

type HomeProseTone = 'umber' | 'cream' | 'creamSoft' | 'muted' | 'mutedOnDark';

const toneColor: Record<HomeProseTone, string> = {
  umber: '#3D2510',
  cream: 'rgba(245,237,224,0.92)',
  creamSoft: 'rgba(245,237,224,0.82)',
  muted: '#9B8E80',
  mutedOnDark: 'rgba(245,237,224,0.78)',
};

function HomeRichText({
  text,
  tone,
}: {
  text: string;
  tone: HomeProseTone;
}) {
  const strongStyle =
    tone === 'umber' || tone === 'muted'
      ? { color: '#8B5413', fontWeight: 600 as const }
      : { color: '#E09A42', fontWeight: 600 as const };

  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i} style={strongStyle}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const READABILITY_MIN_LEN = 88;

/** "spirits.It" → two segments for layout only (characters unchanged). */
function splitLatinRunOnPeriodCapital(s: string): string[] {
  const chunks: string[] = [];
  let i = 0;
  while (i < s.length) {
    const rest = s.slice(i);
    const m = /(?<=[a-z])\.(?=[A-Z])/.exec(rest);
    if (!m || m.index === undefined) {
      chunks.push(s.slice(i));
      break;
    }
    const cut = i + m.index + 1;
    chunks.push(s.slice(i, cut));
    i = cut;
  }
  return chunks.map(c => c.trim()).filter(Boolean);
}

function splitCjkRuns(s: string): string[] {
  const out: string[] = [];
  let buf = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    buf += ch;
    if ('。！？'.includes(ch)) {
      out.push(buf);
      buf = '';
    } else if (ch === '；') {
      out.push(buf);
      buf = '';
    }
  }
  if (buf.trim()) out.push(buf);
  return out.map(p => p.trim()).filter(Boolean);
}

/**
 * Sentence breaks for Latin. Never treat "1." / "2." enumerators as sentence ends
 * (digit may not precede the period).
 */
function splitLatinSentenceBoundaries(segment: string): string[] {
  const out: string[] = [];
  let start = 0;
  const re = /(?<!\d)([.!?])\s+(?=[A-Z0-9"'\u201c(])/g;
  let m: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((m = re.exec(segment)) !== null) {
    const end = m.index + m[1].length;
    out.push(segment.slice(start, end).trim());
    start = re.lastIndex;
  }
  if (start < segment.length) {
    const tail = segment.slice(start).trim();
    if (tail) out.push(tail);
  }
  return out.filter(Boolean);
}

/**
 * Inline lists: "Intro: 1. First …" → intro + "1. First …" so item 1 gets the same bar as 2–4;
 * also "2. Foo 3. Bar" where items are space-separated.
 */
function splitLatinInlineNumberedItems(para: string): string[] {
  const enumHead = /\d{1,2}\.\s+[A-Za-z]/g;
  const colonSplitPieces = para
    .split(/(?<=:)\s+(?=\d{1,2}\.\s+[A-Za-z])/)
    .map(p => p.trim())
    .filter(Boolean);

  const out: string[] = [];

  for (const piece of colonSplitPieces) {
    const matches = [...piece.matchAll(enumHead)];
    if (matches.length < 2) {
      out.push(piece);
      continue;
    }
    out.push(
      ...piece
        .split(/(?<!:)\s+(?=\d{1,2}\.\s+[A-Za-z])/)
        .map(p => p.trim())
        .filter(Boolean),
    );
  }

  return out;
}

function splitLatinRuns(s: string): string[] {
  const runFixed = splitLatinRunOnPeriodCapital(s);
  const sentences: string[] = [];
  for (const chunk of runFixed) {
    sentences.push(...splitLatinSentenceBoundaries(chunk));
  }
  const withItems: string[] = [];
  for (const sent of sentences) {
    withItems.push(...splitLatinInlineNumberedItems(sent));
  }
  return withItems;
}

/** Preserves all characters; only groups into paragraph strings for layout. */
export function splitHomeCopyIntoParagraphs(text: string): string[] {
  const normalized = text.replace(/\r\n/g, '\n');
  const coarse = normalized.split(/\n\s*\n+/).map(b => b.trim()).filter(Boolean);

  const flatten: string[] = [];

  for (const block of coarse) {
    if (block.includes('\n')) {
      const lines = block.split('\n').map(l => l.trimEnd());
      for (const line of lines) {
        if (line.length > 0) flatten.push(line);
      }
      continue;
    }

    if (block.length < READABILITY_MIN_LEN) {
      flatten.push(block);
      continue;
    }

    if (/[\u4e00-\u9fff]/.test(block)) {
      const pieces = splitCjkRuns(block);
      if (pieces.length > 1) flatten.push(...pieces);
      else flatten.push(block);
      continue;
    }

    const pieces = splitLatinRuns(block);
    if (pieces.length > 1) flatten.push(...pieces);
    else flatten.push(block);
  }

  return flatten;
}

const paraScaleDefault =
  'font-serif text-[0.95rem] sm:text-[1.05rem] md:text-[1.12rem] leading-[1.78] tracking-[0.01em]';
const paraScaleComfortable =
  'font-serif text-[1.02rem] sm:text-[1.12rem] md:text-[1.22rem] lg:text-[1.28rem] leading-[1.76] tracking-[0.01em]';

export function HomeProseBlocks({
  text,
  tone,
  className = '',
  paragraphClassName = '',
  /** When set, overrides default responsive body scale (e.g. truth cards). */
  size = 'default',
  align = 'left',
}: {
  text: string;
  tone: HomeProseTone;
  className?: string;
  paragraphClassName?: string;
  size?: 'default' | 'comfortable';
  align?: 'left' | 'center';
}) {
  const paras = splitHomeCopyIntoParagraphs(text);
  const color = toneColor[tone];
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  const scaleCls = size === 'comfortable' ? paraScaleComfortable : paraScaleDefault;

  return (
    <div className={className}>
      {paras.map((p, i) => {
        const numbered = /^\s*\d+[\.\、]/.test(p);
        return (
          <p
            key={`${i}-${p.slice(0, 24)}`}
            className={`${scaleCls} ${alignCls} ${paragraphClassName} ${i > 0 ? 'mt-4 md:mt-5' : ''} ${
              numbered ? 'pl-3 sm:pl-4 border-l-2 border-[rgba(194,123,32,0.38)]' : ''
            }`}
            style={{ color }}
          >
            <HomeRichText text={p} tone={tone} />
          </p>
        );
      })}
    </div>
  );
}
