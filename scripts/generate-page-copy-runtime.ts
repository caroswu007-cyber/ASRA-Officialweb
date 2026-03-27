import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';

type Row = {
  block_key?: string;
  english_源文?: string;
  中文?: string;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const docsDir = path.join(root, 'docs', 'page-copy');
const outFile = path.join(root, 'src', 'content', 'pageCopyDocs.generated.ts');

function norm(value: unknown): string {
  return String(value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function toTsRecord(name: string, data: Record<string, string>): string {
  const keys = Object.keys(data).sort();
  const lines = keys.map(key => `  ${JSON.stringify(key)}: ${JSON.stringify(data[key])},`);
  return `export const ${name}: Record<string, string> = {\n${lines.join('\n')}\n};\n`;
}

function main() {
  const files = fs
    .readdirSync(docsDir)
    .filter(file => /\.xlsx$/i.test(file))
    .sort();

  const en: Record<string, string> = {};
  const zh: Record<string, string> = {};
  const seen = new Set<string>();

  for (const file of files) {
    const wb = XLSX.read(fs.readFileSync(path.join(docsDir, file)), { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws) as Row[];

    for (const row of rows) {
      const key = norm(row.block_key).trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      en[key] = norm(row.english_源文);
      zh[key] = norm(row.中文);
    }
  }

  const out =
    `/**\n` +
    ` * Generated from docs/page-copy/*.xlsx.\n` +
    ` * First workbook wins when duplicate block_key appears in multiple files.\n` +
    ` * Run: npx tsx scripts/generate-page-copy-runtime.ts\n` +
    ` */\n\n` +
    `export type PageCopyDocLocale = 'en' | 'zh';\n\n` +
    toTsRecord('pageCopyDocsEn', en) +
    `\n` +
    toTsRecord('pageCopyDocsZh', zh) +
    `\n` +
    `export const pageCopyDocs: Record<PageCopyDocLocale, Record<string, string>> = {\n` +
    `  en: pageCopyDocsEn,\n` +
    `  zh: pageCopyDocsZh,\n` +
    `};\n`;

  fs.writeFileSync(outFile, out, 'utf8');
  console.log(`Generated ${path.relative(root, outFile)} with ${seen.size} unique block_key entries.`);
}

main();
