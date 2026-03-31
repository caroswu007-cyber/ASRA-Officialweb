/**
 * Local copy editor server.
 * Start:  npm run editor
 * Opens a browser UI to edit EN/ZH text in docs/page-copy/*.xlsx,
 * then writes changes back to xlsx and auto-runs copy:import.
 */

import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs', 'page-copy');
const PORT = 4099;

// ── xlsx helpers ──────────────────────────────

function norm(v) {
  return String(v ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function readAllWorkbooks() {
  const files = fs.readdirSync(DOCS_DIR).filter(f => /\.xlsx$/i.test(f) && !f.startsWith('~$')).sort();
  return files.map(file => {
    const wb = XLSX.read(fs.readFileSync(path.join(DOCS_DIR, file)), { type: 'buffer' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws);
    const entries = rows
      .filter(r => norm(r.block_key).trim())
      .map(r => ({
        key: norm(r.block_key).trim(),
        en: norm(r['english_源文'] ?? r['english_?? ??'] ?? ''),
        zh: norm(r['中文'] ?? ''),
      }));
    return { file, entries };
  });
}

function saveWorkbook(file, updatedEntries) {
  const filePath = path.join(DOCS_DIR, file);
  const wb = XLSX.read(fs.readFileSync(filePath), { type: 'buffer' });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  const map = new Map(updatedEntries.map(e => [e.key, e]));

  const newRows = rows.map(r => {
    const key = norm(r.block_key).trim();
    if (key && map.has(key)) {
      const upd = map.get(key);
      return { ...r, 'english_源文': upd.en, '中文': upd.zh };
    }
    return r;
  });

  const newWs = XLSX.utils.json_to_sheet(newRows);
  wb.Sheets[wb.SheetNames[0]] = newWs;
  XLSX.writeFile(wb, filePath);
}

function runImport() {
  try {
    execSync('npm run copy:import', { cwd: ROOT, stdio: 'pipe' });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// ── Express server ────────────────────────────

const app = express();
app.use(express.json({ limit: '8mb' }));

app.get('/api/workbooks', (_req, res) => {
  try {
    res.json(readAllWorkbooks());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/save', (req, res) => {
  try {
    const { file, entries } = req.body;
    saveWorkbook(file, entries);
    const imp = runImport();
    res.json({ saved: true, importResult: imp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(getEditorHTML());
});

app.listen(PORT, '127.0.0.1', () => {
  const addr = `http://127.0.0.1:${PORT}`;
  console.log(`\n  ✦  ASra Copy Editor →  ${addr}\n`);
  // open browser (Windows)
  try { execSync(`start "" "${addr}"`, { shell: true, stdio: 'ignore' }); } catch {}
});

// ── Editor HTML ───────────────────────────────

function getEditorHTML() {
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ASra Copy Editor</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
:root {
  --gold:#C27B20; --gold-l:#E09A42; --gold-dim:rgba(194,123,32,.18);
  --bg:#F5EDE0; --surface:#FAF4EC; --dark:#1F1208; --mid:#3D2510;
  --muted:#9B8E80; --border:rgba(31,18,8,.10); --r:10px;
  --shadow:0 2px 16px rgba(31,18,8,.08);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:'Lato',sans-serif;background:var(--bg);color:var(--dark);min-height:100vh}

/* topbar */
.topbar{
  position:sticky;top:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 1.5rem;height:56px;
  background:var(--dark);
  border-bottom:2px solid var(--gold);
  box-shadow:0 2px 14px rgba(31,18,8,.4)
}
.brand{font-family:'Cinzel',serif;font-size:.95rem;font-weight:600;color:var(--gold-l);letter-spacing:.14em}
.brand span{opacity:.5;font-weight:400;margin-left:.4em;font-size:.85rem}
.actions{display:flex;gap:.6rem;align-items:center}

.lang-group{display:flex;border:1px solid rgba(255,255,255,.15);border-radius:6px;overflow:hidden}
.lang-btn{
  padding:.32rem .8rem;border:none;cursor:pointer;
  font-family:'Lato',sans-serif;font-size:.73rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  background:transparent;color:rgba(255,255,255,.45);transition:background .13s,color .13s
}
.lang-btn.active{background:var(--gold);color:#fff}

.save-btn{
  display:flex;align-items:center;gap:.4rem;
  padding:.4rem 1rem;border:none;border-radius:6px;cursor:pointer;
  font-family:'Lato',sans-serif;font-size:.78rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  background:linear-gradient(135deg,#8B5413,var(--gold));color:#fff;
  box-shadow:0 2px 10px rgba(139,84,19,.35);
  transition:opacity .13s,transform .1s
}
.save-btn:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
.save-btn:disabled{opacity:.38;cursor:not-allowed}
.save-btn svg{width:14px;height:14px;flex-shrink:0}

/* layout */
.layout{display:flex;height:calc(100vh - 56px);overflow:hidden}

/* sidebar */
.sidebar{
  width:200px;flex-shrink:0;overflow-y:auto;
  background:var(--dark);border-right:1px solid rgba(255,255,255,.06);
  padding:.6rem .4rem;display:flex;flex-direction:column;gap:.2rem
}
.sb-label{font-size:.63rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--muted);padding:.5rem .6rem .2rem}
.tab{
  display:block;width:100%;text-align:left;padding:.48rem .7rem;
  border-radius:5px;border:none;cursor:pointer;
  font-family:'Lato',sans-serif;font-size:.78rem;font-weight:400;
  background:transparent;color:rgba(255,255,255,.48);
  transition:background .12s,color .12s;line-height:1.3;word-break:break-word
}
.tab:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.78)}
.tab.active{background:var(--gold-dim);color:var(--gold-l);font-weight:700}
.dot{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--gold);margin-left:4px;vertical-align:middle}

/* main */
.main{flex:1;overflow-y:auto;padding:1.4rem 2rem 3rem}

.page-hdr{margin-bottom:1.1rem;padding-bottom:.65rem;border-bottom:1px solid var(--border)}
.page-hdr h2{font-family:'Cinzel',serif;font-size:1.05rem;font-weight:600;color:var(--mid);letter-spacing:.06em}
.page-hdr p{font-size:.75rem;color:var(--muted);margin-top:.25rem}

.search-input{
  width:100%;max-width:440px;
  padding:.5rem .9rem;border-radius:7px;
  border:1.5px solid var(--border);background:var(--surface);
  font-family:'Lato',sans-serif;font-size:.86rem;color:var(--dark);
  outline:none;transition:border-color .14s;margin-bottom:1.1rem
}
.search-input:focus{border-color:var(--gold)}

.entries{display:flex;flex-direction:column;gap:.8rem}

.entry{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r);padding:.9rem 1.1rem;
  box-shadow:var(--shadow);transition:border-color .13s
}
.entry:hover{border-color:rgba(194,123,32,.28)}
.entry.dirty{border-color:rgba(194,123,32,.6);background:#fffef8}

.ekey{
  font-family:'Cinzel',serif;font-size:.67rem;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem
}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:.7rem}
@media(max-width:760px){.cols{grid-template-columns:1fr}}

.flabel{font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.25rem}
.flabel.zh{color:#7B6FA0}

textarea{
  width:100%;resize:vertical;min-height:60px;
  padding:.5rem .65rem;border-radius:6px;
  border:1.5px solid var(--border);background:var(--bg);
  font-family:'Lato',sans-serif;font-size:.86rem;color:var(--dark);line-height:1.62;
  outline:none;transition:border-color .13s
}
textarea:focus{border-color:var(--gold);background:#fff}

.empty{padding:3rem 1rem;text-align:center;color:var(--muted);font-size:.9rem}
.loading{display:flex;justify-content:center;padding:4rem 0}
.spinner{width:22px;height:22px;border:3px solid var(--gold-dim);border-top-color:var(--gold);border-radius:50%;animation:spin .65s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

.toast{
  position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);
  z-index:9999;padding:.55rem 1.3rem;border-radius:8px;pointer-events:none;
  font-size:.83rem;font-weight:700;letter-spacing:.04em;
  box-shadow:0 4px 18px rgba(31,18,8,.22);transition:opacity .3s
}
.toast.ok{background:#2D6A4F;color:#fff}
.toast.err{background:#9B2335;color:#fff}
.toast.off{opacity:0}
</style>
</head>
<body>

<div class="topbar">
  <div class="brand">ASra <span>Copy Editor</span></div>
  <div class="actions">
    <div class="lang-group">
      <button class="lang-btn active" id="btn-en"   onclick="setLang('en')">EN</button>
      <button class="lang-btn"        id="btn-zh"   onclick="setLang('zh')">ZH</button>
      <button class="lang-btn"        id="btn-both" onclick="setLang('both')">Both</button>
    </div>
    <button class="save-btn" id="save-btn" onclick="saveAll()" disabled>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
      Save &amp; Sync
    </button>
  </div>
</div>

<div class="layout">
  <nav class="sidebar" id="sidebar"><div class="sb-label">Workbooks</div></nav>
  <main class="main" id="main"><div class="loading"><div class="spinner"></div></div></main>
</div>

<div class="toast off" id="toast"></div>

<script>
let books = [];          // [{file, entries:[{key,en,zh}]}]
let cur = null;          // current file name
let lang = 'both';       // 'en'|'zh'|'both'
let dirty = {};          // {file:{key:{en,zh}}}

// ── bootstrap ──
async function boot() {
  const r = await fetch('/api/workbooks');
  books = await r.json();
  buildSidebar();
  if (books.length) pick(books[0].file);
}

// ── sidebar ──
function buildSidebar() {
  const sb = document.getElementById('sidebar');
  sb.innerHTML = '<div class="sb-label">Workbooks</div>';
  for (const b of books) {
    const hasDirty = dirty[b.file] && Object.keys(dirty[b.file]).length;
    const label = b.file.replace(/^[0-9]+-/, '').replace(/\\.xlsx$/i, '');
    const btn = Object.assign(document.createElement('button'), {
      className: 'tab' + (b.file === cur ? ' active' : ''),
      innerHTML: esc(label) + (hasDirty ? '<span class="dot"></span>' : ''),
    });
    btn.onclick = () => pick(b.file);
    sb.appendChild(btn);
  }
}

function pick(file) {
  cur = file;
  const sf = document.getElementById('search-input');
  if (sf) sf.value = '';
  buildSidebar();
  renderMain('');
}

// ── lang toggle ──
function setLang(l) {
  lang = l;
  ['en','zh','both'].forEach(x => document.getElementById('btn-'+x).classList.toggle('active', x===l));
  renderMain(document.getElementById('search-input')?.value || '');
}

// ── main panel ──
function renderMain(q) {
  const book = books.find(b => b.file === cur);
  if (!book) return;
  const term = q.trim().toLowerCase();
  const list = term
    ? book.entries.filter(e => e.key.toLowerCase().includes(term) || e.en.toLowerCase().includes(term) || e.zh.toLowerCase().includes(term))
    : book.entries;

  let h = \`
  <div class="page-hdr">
    <h2>\${esc(book.file)}</h2>
    <p>\${list.length} entries\${term ? ' — filtered' : ''}</p>
  </div>
  <input id="search-input" class="search-input" type="search" placeholder="Search keys or text…"
    value="\${esc(q)}" oninput="renderMain(this.value)">
  <div class="entries">\`;

  for (const e of list) {
    const d = dirty[cur]?.[e.key];
    const val = d ?? e;
    const isDirty = !!d;
    const showEn = lang === 'en' || lang === 'both';
    const showZh = lang === 'zh' || lang === 'both';
    h += \`<div class="entry\${isDirty?' dirty':''}" data-key="\${esc(e.key)}">
      <div class="ekey">\${esc(e.key)}</div>
      <div class="cols">\`;
    if (showEn) h += field('en', e.key, val.en, 'English');
    if (showZh) h += field('zh', e.key, val.zh, '中文');
    h += \`</div></div>\`;
  }
  h += \`</div>\`;
  document.getElementById('main').innerHTML = h;
}

function field(lang, key, value, label) {
  const r = Math.min(Math.max((value.split('\\n').length || 1) + 1, 2), 12);
  return \`<div>
    <div class="flabel \${lang==='zh'?'zh':''}">\${label}</div>
    <textarea rows="\${r}" oninput="change('\${esc(key)}','\${lang}',this.value)">\${esc(value)}</textarea>
  </div>\`;
}

function esc(s) {
  return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── change tracking ──
function change(key, field, value) {
  if (!dirty[cur]) dirty[cur] = {};
  const book = books.find(b => b.file === cur);
  const orig = book.entries.find(e => e.key === key);
  if (!dirty[cur][key]) dirty[cur][key] = { en: orig.en, zh: orig.zh };
  dirty[cur][key][field] = value;
  if (dirty[cur][key].en === orig.en && dirty[cur][key].zh === orig.zh)
    delete dirty[cur][key];
  updateSaveBtn();
  buildSidebar();
}

function updateSaveBtn() {
  const any = Object.values(dirty).some(d => Object.keys(d).length);
  document.getElementById('save-btn').disabled = !any;
}

// ── save ──
async function saveAll() {
  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  const toSave = Object.entries(dirty).filter(([,d]) => Object.keys(d).length);
  try {
    for (const [file, changes] of toSave) {
      const book = books.find(b => b.file === file);
      const entries = book.entries.map(e => ({
        key: e.key,
        en: changes[e.key]?.en ?? e.en,
        zh: changes[e.key]?.zh ?? e.zh,
      }));
      const r = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file, entries }),
      });
      const data = await r.json();
      if (!data.saved) throw new Error(data.error || 'Save failed');
      book.entries = entries;
      delete dirty[file];
    }
    toast('Saved & synced ✓', 'ok');
  } catch(e) {
    toast('Error: ' + e.message, 'err');
  }

  btn.innerHTML = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>Save &amp; Sync\`;
  updateSaveBtn();
  buildSidebar();
  renderMain(document.getElementById('search-input')?.value || '');
}

function toast(msg, type) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.className = 'toast ' + type;
  clearTimeout(window._tt);
  window._tt = setTimeout(() => el.classList.add('off'), 3200);
}

boot();
</script>
</body>
</html>`;
}
