/**
 * Parse `messages*.ts` string records (single-quoted values, optional line breaks).
 * Writes UTF-8 BOM CSV for Excel.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const messagesDir = path.join(root, 'src', 'i18n', 'messages');

function stripLeadingComment(src) {
  return src.replace(/^\/\*\*[\s\S]*?\*\/\s*/m, '');
}

/** Read single-quoted TS string starting at i (i points at opening '). Returns { text, end } end = index after closing quote. */
function readSqString(src, i) {
  if (src[i] !== "'") return null;
  let j = i + 1;
  let out = '';
  while (j < src.length) {
    const c = src[j];
    if (c === '\\') {
      out += src[j + 1] ?? '';
      j += 2;
      continue;
    }
    if (c === "'") {
      return { text: out, end: j + 1 };
    }
    out += c;
    j += 1;
  }
  return null;
}

function readDqString(src, i) {
  if (src[i] !== '"') return null;
  let j = i + 1;
  let out = '';
  while (j < src.length) {
    const c = src[j];
    if (c === '\\') {
      out += src[j + 1] ?? '';
      j += 2;
      continue;
    }
    if (c === '"') {
      return { text: out, end: j + 1 };
    }
    out += c;
    j += 1;
  }
  return null;
}

function parseMessagesFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const src = stripLeadingComment(raw);
  const objStart = src.indexOf('{');
  if (objStart < 0) throw new Error('No { in ' + filePath);
  const map = new Map();
  let i = objStart + 1;
  while (i < src.length) {
    while (i < src.length && /\s/.test(src[i])) i += 1;
    if (src[i] === '}') break;
    if (src[i] !== "'") {
      i += 1;
      continue;
    }
    const keyR = readSqString(src, i);
    if (!keyR) break;
    i = keyR.end;
    while (i < src.length && /\s/.test(src[i])) i += 1;
    if (src[i] !== ':') {
      i += 1;
      continue;
    }
    i += 1;
    while (i < src.length && /\s/.test(src[i])) i += 1;
    const valR = src[i] === '"' ? readDqString(src, i) : readSqString(src, i);
    if (!valR) break;
    map.set(keyR.text, valR.text);
    i = valR.end;
    while (i < src.length && /\s/.test(src[i])) i += 1;
    if (src[i] === ',') i += 1;
  }
  return map;
}

function escapeCsvField(s) {
  if (s.includes('"') || s.includes('\n') || s.includes('\r') || s.includes(',')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function main() {
  const enPath = path.join(messagesDir, 'en.ts');
  const zhPath = path.join(messagesDir, 'zh.ts');

  const en = parseMessagesFile(enPath);
  const zh = parseMessagesFile(zhPath);

  /** Preserve declaration order in `en.ts` (Map insertion order). */
  const keys = [...en.keys()];

  const header = ['key', 'English (en)', '中文 (zh)', 'notes'];
  const lines = [header.map(escapeCsvField).join(',')];

  for (const key of keys) {
    const row = [
      key,
      en.get(key) ?? '',
      zh.get(key) ?? '',
      '',
    ];
    lines.push(row.map(escapeCsvField).join(','));
  }

  const bom = '\ufeff';
  const outPath = path.join(root, 'docs', 'i18n_trilingual_review.csv');
  fs.writeFileSync(outPath, bom + lines.join('\r\n'), 'utf8');
  console.log('Wrote', outPath, 'rows:', keys.length);
}

main();
