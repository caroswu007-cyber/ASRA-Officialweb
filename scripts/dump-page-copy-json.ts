/**
 * One-off: dump docs/page-copy/*.xlsx → docs/page-copy-dump.json
 * Run: npx tsx scripts/dump-page-copy-json.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as XLSX from 'xlsx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const pageCopyDir = path.join(root, 'docs', 'page-copy');
const out: { file: string; rows: Record<string, unknown>[] }[] = [];
for (const f of fs.readdirSync(pageCopyDir).filter(x => /\.xlsx$/i.test(x)).sort()) {
  const buf = fs.readFileSync(path.join(pageCopyDir, f));
  const wb = XLSX.read(buf, { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  out.push({ file: f, rows: XLSX.utils.sheet_to_json(ws) as Record<string, unknown>[] });
}
const outPath = path.join(root, 'docs', 'page-copy-dump.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log('Wrote', outPath, 'files:', out.length, 'rows:', out.reduce((a, b) => a + b.rows.length, 0));
