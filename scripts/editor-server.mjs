/**
 * ASra Copy Editor — v2
 * Start:  npm run editor
 *
 * Features:
 *  • Live-reload via SSE: browser auto-refreshes when xlsx files change on disk
 *    (whether from AI edits, manual edits, or npm run copy:import)
 *  • Backup on every save: timestamped snapshots in .editor-backups/
 *  • Restore from any backup via UI
 *  • EN + ZH side-by-side editing
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
const ROOT       = path.resolve(__dirname, '..');
const DOCS_DIR   = path.join(ROOT, 'docs', 'page-copy');
const BACKUP_DIR = path.join(ROOT, '.editor-backups');
const PORT       = 4099;

// ── ensure backup dir ──────────────────────────
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

// ── xlsx helpers ───────────────────────────────
function norm(v) {
  return String(v ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function xlsxFiles() {
  return fs.readdirSync(DOCS_DIR)
    .filter(f => /\.xlsx$/i.test(f) && !f.startsWith('~$'))
    .sort();
}

function readBook(file) {
  const wb   = XLSX.read(fs.readFileSync(path.join(DOCS_DIR, file)), { type: 'buffer' });
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws);
  return rows
    .filter(r => norm(r.block_key).trim())
    .map(r => ({
      key: norm(r.block_key).trim(),
      en:  norm(r['english_源文'] ?? ''),
      zh:  norm(r['中文'] ?? ''),
    }));
}

function readAllWorkbooks() {
  return xlsxFiles().map(file => ({ file, entries: readBook(file) }));
}

function saveWorkbook(file, updatedEntries) {
  const filePath = path.join(DOCS_DIR, file);
  const wb   = XLSX.read(fs.readFileSync(filePath), { type: 'buffer' });
  const ws   = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  const map  = new Map(updatedEntries.map(e => [e.key, e]));

  const newRows = rows.map(r => {
    const key = norm(r.block_key).trim();
    if (key && map.has(key)) {
      const u = map.get(key);
      return { ...r, 'english_源文': u.en, '中文': u.zh };
    }
    return r;
  });

  wb.Sheets[wb.SheetNames[0]] = XLSX.utils.json_to_sheet(newRows);
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

// ── backup helpers ─────────────────────────────
function createBackup(changedFiles) {
  const ts  = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const dir = path.join(BACKUP_DIR, ts);
  fs.mkdirSync(dir, { recursive: true });

  for (const file of changedFiles) {
    const src = path.join(DOCS_DIR, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(dir, file));
  }

  // write metadata
  fs.writeFileSync(
    path.join(dir, '_meta.json'),
    JSON.stringify({ timestamp: new Date().toISOString(), files: changedFiles }, null, 2),
  );
  return ts;
}

function listBackups() {
  if (!fs.existsSync(BACKUP_DIR)) return [];
  return fs.readdirSync(BACKUP_DIR)
    .filter(d => {
      try {
        const s = fs.statSync(path.join(BACKUP_DIR, d));
        return s.isDirectory() && !d.startsWith('.');
      } catch { return false; }
    })
    .sort()
    .reverse()
    .slice(0, 30)          // keep at most 30 shown
    .map(d => {
      try {
        const meta = JSON.parse(
          fs.readFileSync(path.join(BACKUP_DIR, d, '_meta.json'), 'utf8')
        );
        return { id: d, ...meta };
      } catch {
        return { id: d, timestamp: d, files: [] };
      }
    });
}

function restoreBackup(id) {
  const dir = path.join(BACKUP_DIR, id);
  if (!fs.existsSync(dir)) throw new Error('Backup not found: ' + id);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, '_meta.json'), 'utf8'));

  // first take a "before-restore" snapshot of current state
  createBackup(meta.files.map(f => f).filter(f => fs.existsSync(path.join(DOCS_DIR, f))));

  for (const file of meta.files) {
    const src = path.join(dir, file);
    const dst = path.join(DOCS_DIR, file);
    if (fs.existsSync(src)) fs.copyFileSync(src, dst);
  }
  return runImport();
}

// ── SSE live-reload ────────────────────────────
const sseClients = new Set();

function broadcast(type, payload) {
  const msg = `data: ${JSON.stringify({ type, payload })}\n\n`;
  for (const res of sseClients) {
    try { res.write(msg); } catch {}
  }
}

// watch xlsx directory — fire when any xlsx changes
let debounce;
const watcher = fs.watch(DOCS_DIR, (event, filename) => {
  if (!filename || !/\.xlsx$/i.test(filename) || filename.startsWith('~$')) return;
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    try {
      const books = readAllWorkbooks();
      broadcast('reload', books);
    } catch {}
  }, 600);
});
watcher.on('error', () => {});   // suppress any watcher errors

// ── Express ────────────────────────────────────
const app = express();
app.use(express.json({ limit: '12mb' }));

// SSE endpoint
app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type',  'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection',    'keep-alive');
  res.flushHeaders();
  res.write('data: {"type":"connected"}\n\n');

  // keepalive every 20s
  const ping = setInterval(() => { try { res.write(': ping\n\n'); } catch {} }, 20000);
  sseClients.add(res);

  req.on('close', () => {
    clearInterval(ping);
    sseClients.delete(res);
  });
});

app.get('/api/workbooks', (_req, res) => {
  try { res.json(readAllWorkbooks()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/save', (req, res) => {
  try {
    const { file, entries } = req.body;
    const backupId = createBackup([file]);
    saveWorkbook(file, entries);
    const imp = runImport();
    res.json({ saved: true, backupId, importResult: imp });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/backups', (_req, res) => {
  try { res.json(listBackups()); }
  catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/restore/:id', (req, res) => {
  try {
    const result = restoreBackup(req.params.id);
    res.json({ restored: true, importResult: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(HTML);
});

app.listen(PORT, '127.0.0.1', () => {
  const addr = `http://127.0.0.1:${PORT}`;
  console.log(`\n  ✦  ASra Copy Editor v2  →  ${addr}`);
  console.log(`     Watching: ${DOCS_DIR}`);
  console.log(`     Backups:  ${BACKUP_DIR}\n`);
  try { execSync(`start "" "${addr}"`, { shell: true, stdio: 'ignore' }); } catch {}
});

// ══════════════════════════════════════════════
// HTML
// ══════════════════════════════════════════════
const HTML = /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>ASra Copy Editor v2</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root {
  --gold:#C27B20; --gold-l:#E09A42; --gold-dim:rgba(194,123,32,.16);
  --bg:#F5EDE0; --surface:#FDFAF5; --dark:#1A0E03; --mid:#3D2510;
  --muted:#9B8E80; --border:rgba(31,18,8,.10); --r:10px;
  --shadow:0 2px 16px rgba(31,18,8,.07);
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:15px}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--dark);min-height:100vh}

/* ── topbar ── */
.topbar{
  position:sticky;top:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;gap:.7rem;
  padding:0 1.2rem;height:52px;
  background:var(--dark);border-bottom:2px solid var(--gold);
  box-shadow:0 2px 14px rgba(0,0,0,.45)
}
.brand{font-family:'Cinzel',serif;font-size:.9rem;font-weight:600;color:var(--gold-l);letter-spacing:.12em;flex-shrink:0}
.brand em{font-style:normal;font-weight:400;opacity:.45;font-size:.78rem;margin-left:.35em}
.tb-right{display:flex;align-items:center;gap:.55rem}

.lang-group{display:flex;border:1px solid rgba(255,255,255,.14);border-radius:5px;overflow:hidden}
.lang-btn{
  padding:.28rem .72rem;border:none;cursor:pointer;
  font:600 .68rem/1 'Inter',sans-serif;letter-spacing:.1em;text-transform:uppercase;
  background:transparent;color:rgba(255,255,255,.4);transition:background .12s,color .12s
}
.lang-btn.active{background:var(--gold);color:#fff}

.save-btn{
  display:flex;align-items:center;gap:.35rem;
  padding:.36rem .9rem;border:none;border-radius:6px;cursor:pointer;
  font:600 .74rem/1 'Inter',sans-serif;letter-spacing:.06em;text-transform:uppercase;
  background:linear-gradient(135deg,#7B4A10,var(--gold));color:#fff;
  box-shadow:0 2px 10px rgba(123,74,16,.35);transition:opacity .12s,transform .1s
}
.save-btn:hover:not(:disabled){opacity:.85;transform:translateY(-1px)}
.save-btn:disabled{opacity:.32;cursor:not-allowed}
.save-btn svg{width:13px;height:13px;flex-shrink:0}

.hist-btn{
  display:flex;align-items:center;gap:.3rem;
  padding:.32rem .75rem;border:1px solid rgba(255,255,255,.15);border-radius:5px;cursor:pointer;
  font:500 .7rem/1 'Inter',sans-serif;background:rgba(255,255,255,.06);color:rgba(255,255,255,.6);
  transition:background .12s,color .12s
}
.hist-btn:hover{background:rgba(255,255,255,.12);color:#fff}
.hist-btn svg{width:13px;height:13px}

.live-dot{
  width:7px;height:7px;border-radius:50%;background:#22C55E;
  box-shadow:0 0 5px rgba(34,197,94,.7);flex-shrink:0
}
.live-dot.off{background:#6B7280;box-shadow:none}

/* ── layout ── */
.layout{display:flex;height:calc(100vh - 52px);overflow:hidden}

/* sidebar */
.sidebar{
  width:195px;flex-shrink:0;overflow-y:auto;
  background:var(--dark);border-right:1px solid rgba(255,255,255,.05);
  padding:.55rem .35rem;display:flex;flex-direction:column;gap:.15rem
}
.sb-label{font:.6rem/.9 'Inter',sans-serif;font-weight:700;letter-spacing:.15em;
  text-transform:uppercase;color:var(--muted);padding:.45rem .55rem .2rem}
.tab{
  display:block;width:100%;text-align:left;padding:.42rem .65rem;
  border-radius:5px;border:none;cursor:pointer;
  font:.76rem/1.3 'Inter',sans-serif;font-weight:400;
  background:transparent;color:rgba(255,255,255,.45);
  transition:background .11s,color .11s;word-break:break-word
}
.tab:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.75)}
.tab.active{background:var(--gold-dim);color:var(--gold-l);font-weight:600}
.dirty-dot{display:inline-block;width:5px;height:5px;border-radius:50%;
  background:var(--gold);margin-left:4px;vertical-align:middle}

/* main */
.main{flex:1;overflow-y:auto;padding:1.3rem 1.8rem 3rem}
.page-hdr{margin-bottom:1rem;padding-bottom:.6rem;border-bottom:1px solid var(--border)}
.page-hdr h2{font-family:'Cinzel',serif;font-size:1rem;font-weight:600;
  color:var(--mid);letter-spacing:.05em}
.page-hdr p{font-size:.72rem;color:var(--muted);margin-top:.2rem}

.search-input{
  width:100%;max-width:420px;
  padding:.45rem .85rem;border-radius:7px;
  border:1.5px solid var(--border);background:var(--surface);
  font:.84rem/1 'Inter',sans-serif;color:var(--dark);
  outline:none;transition:border-color .13s;margin-bottom:1rem
}
.search-input:focus{border-color:var(--gold)}

.entries{display:flex;flex-direction:column;gap:.75rem}
.entry{
  background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r);padding:.85rem 1rem;
  box-shadow:var(--shadow);transition:border-color .12s
}
.entry:hover{border-color:rgba(194,123,32,.22)}
.entry.dirty{border-color:rgba(194,123,32,.55);background:#fefef8}
.ekey{
  font-family:'Cinzel',serif;font-size:.62rem;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:.48rem
}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:.65rem}
@media(max-width:740px){.cols{grid-template-columns:1fr}}
.flabel{font:.62rem/1 'Inter',sans-serif;font-weight:600;letter-spacing:.1em;
  text-transform:uppercase;color:var(--muted);margin-bottom:.22rem}
.flabel.zh{color:#9B7FC4}
textarea{
  width:100%;resize:vertical;min-height:56px;
  padding:.46rem .6rem;border-radius:5px;
  border:1.5px solid var(--border);background:var(--bg);
  font:.85rem/1.62 'Inter',sans-serif;color:var(--dark);
  outline:none;transition:border-color .12s
}
textarea:focus{border-color:var(--gold);background:#fff}

.empty{padding:2.5rem 1rem;text-align:center;color:var(--muted);font-size:.88rem}
.loading{display:flex;justify-content:center;padding:3.5rem}
.spinner{width:20px;height:20px;border:2.5px solid var(--gold-dim);
  border-top-color:var(--gold);border-radius:50%;animation:spin .6s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* toast */
.toast{
  position:fixed;bottom:1.4rem;left:50%;transform:translateX(-50%);
  z-index:9999;padding:.5rem 1.2rem;border-radius:7px;pointer-events:none;
  font:.81rem/1 'Inter',sans-serif;font-weight:600;letter-spacing:.03em;
  box-shadow:0 4px 18px rgba(0,0,0,.22);transition:opacity .28s
}
.toast.ok{background:#1A5C40;color:#D4F0E3}
.toast.err{background:#8B1A2C;color:#FDDDE2}
.toast.info{background:#1A2C5C;color:#D4E3F0}
.toast.off{opacity:0}

/* history overlay */
.overlay{
  display:none;position:fixed;inset:0;z-index:200;
  background:rgba(0,0,0,.55);backdrop-filter:blur(2px)
}
.overlay.open{display:flex;align-items:center;justify-content:center}
.hist-panel{
  background:#fff;border-radius:14px;padding:1.4rem 1.6rem;
  width:min(540px,92vw);max-height:80vh;display:flex;flex-direction:column;
  box-shadow:0 8px 40px rgba(0,0,0,.28)
}
.hist-panel h3{font-family:'Cinzel',serif;font-size:.95rem;font-weight:600;
  color:var(--mid);letter-spacing:.06em;margin-bottom:.25rem}
.hist-panel .sub{font-size:.71rem;color:var(--muted);margin-bottom:1rem}
.hist-list{overflow-y:auto;display:flex;flex-direction:column;gap:.5rem;flex:1}
.hist-row{
  display:flex;align-items:center;justify-content:space-between;gap:.7rem;
  padding:.55rem .75rem;border-radius:7px;border:1px solid var(--border);
  background:var(--bg)
}
.hist-row .ts{font:.74rem/1.4 'Inter',sans-serif;color:var(--mid);word-break:break-all}
.hist-row .flist{font:.64rem/1 'Inter',sans-serif;color:var(--muted);margin-top:.15rem}
.restore-btn{
  flex-shrink:0;padding:.3rem .7rem;border:none;border-radius:5px;cursor:pointer;
  font:.7rem/1 'Inter',sans-serif;font-weight:600;
  background:var(--gold-dim);color:var(--gold);transition:background .12s
}
.restore-btn:hover{background:var(--gold);color:#fff}
.close-btn{
  margin-top:.9rem;padding:.4rem 1rem;border:1px solid var(--border);
  border-radius:6px;background:transparent;color:var(--muted);cursor:pointer;
  font:.76rem/1 'Inter',sans-serif;align-self:flex-end;transition:border-color .12s
}
.close-btn:hover{border-color:var(--gold);color:var(--gold)}
.no-backups{padding:1.5rem;text-align:center;color:var(--muted);font-size:.85rem}
</style>
</head>
<body>

<div class="topbar">
  <div class="brand">ASra Copy Editor <em>v2</em></div>
  <div class="tb-right">
    <div class="lang-group">
      <button class="lang-btn active" id="btn-en"   onclick="setLang('en')">EN</button>
      <button class="lang-btn"        id="btn-zh"   onclick="setLang('zh')">ZH</button>
      <button class="lang-btn"        id="btn-both" onclick="setLang('both')">Both</button>
    </div>
    <button class="hist-btn" onclick="openHistory()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/>
      </svg>
      Backups
    </button>
    <button class="save-btn" id="save-btn" onclick="saveAll()" disabled>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
        <polyline points="17 21 17 13 7 13 7 21"/>
        <polyline points="7 3 7 8 15 8"/>
      </svg>
      <span id="save-label">Save &amp; Sync</span>
    </button>
    <div class="live-dot off" id="live-dot" title="Live sync connection"></div>
  </div>
</div>

<div class="layout">
  <nav class="sidebar" id="sidebar"><div class="sb-label">Workbooks</div></nav>
  <main class="main" id="main"><div class="loading"><div class="spinner"></div></div></main>
</div>

<div class="toast off" id="toast"></div>

<!-- History overlay -->
<div class="overlay" id="overlay" onclick="if(event.target===this)closeHistory()">
  <div class="hist-panel">
    <h3>Backup History</h3>
    <p class="sub">Auto-created before each save. Click Restore to roll back.</p>
    <div class="hist-list" id="hist-list"><div class="no-backups">Loading…</div></div>
    <button class="close-btn" onclick="closeHistory()">Close</button>
  </div>
</div>

<script>
// ── state ──
let books = [];       // [{file, entries:[{key,en,zh}]}]
let cur   = null;
let lang  = 'both';
let dirty = {};       // {file:{key:{en,zh}}}

// ── boot ──
async function boot() {
  await loadBooks();
  connectSSE();
}

async function loadBooks() {
  const r = await fetch('/api/workbooks');
  books = await r.json();
  buildSidebar();
  if (!cur && books.length) pick(books[0].file);
  else if (cur) renderMain(document.getElementById('search-input')?.value || '');
}

// ── SSE live-reload ──
function connectSSE() {
  const es = new EventSource('/api/events');
  const dot = document.getElementById('live-dot');

  es.onopen = () => dot.classList.remove('off');
  es.onerror = () => {
    dot.classList.add('off');
    setTimeout(connectSSE, 5000);  // reconnect
    try { es.close(); } catch {}
  };

  es.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.type === 'reload') {
      // Server says xlsx changed on disk — merge fresh data, keep unsaved edits
      mergeReload(msg.payload);
      toast('Files updated from disk ↺', 'info');
    }
  };
}

function mergeReload(freshBooks) {
  for (const fb of freshBooks) {
    const existing = books.find(b => b.file === fb.file);
    if (!existing) { books.push(fb); continue; }
    // update only entries that have NO pending local dirty changes
    const fileDirty = dirty[fb.file] || {};
    existing.entries = fb.entries.map(fe => {
      if (fileDirty[fe.key]) {
        // keep local dirty value; update orig in background
        return { ...fe, en: fileDirty[fe.key].en ?? fe.en, zh: fileDirty[fe.key].zh ?? fe.zh };
      }
      return fe;
    });
  }
  buildSidebar();
  renderMain(document.getElementById('search-input')?.value || '');
}

// ── sidebar ──
function buildSidebar() {
  const sb = document.getElementById('sidebar');
  sb.innerHTML = '<div class="sb-label">Workbooks</div>';
  for (const b of books) {
    const hasDirty = dirty[b.file] && Object.keys(dirty[b.file]).length;
    const label = b.file.replace(/^\\d+-/, '').replace(/\\.xlsx$/i, '');
    const btn = document.createElement('button');
    btn.className = 'tab' + (b.file === cur ? ' active' : '');
    btn.innerHTML = esc(label) + (hasDirty ? '<span class="dirty-dot"></span>' : '');
    btn.onclick = () => pick(b.file);
    sb.appendChild(btn);
  }
}

function pick(file) {
  cur = file;
  if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
  buildSidebar();
  renderMain('');
}

// ── lang toggle ──
function setLang(l) {
  lang = l;
  ['en','zh','both'].forEach(x => document.getElementById('btn-'+x).classList.toggle('active', x===l));
  renderMain(document.getElementById('search-input')?.value || '');
}

// ── render main ──
function renderMain(q) {
  const book = books.find(b => b.file === cur);
  if (!book) return;
  const term = q.trim().toLowerCase();
  const list = term
    ? book.entries.filter(e =>
        e.key.toLowerCase().includes(term) ||
        e.en.toLowerCase().includes(term) ||
        e.zh.toLowerCase().includes(term))
    : book.entries;

  let h = \`
    <div class="page-hdr">
      <h2>\${esc(book.file)}</h2>
      <p>\${list.length} entries\${term ? ' — filtered' : ''}</p>
    </div>
    <input id="search-input" class="search-input" type="search"
      placeholder="Search key or text…" value="\${esc(q)}" oninput="renderMain(this.value)">
    <div class="entries">\`;

  if (!list.length) h += '<div class="empty">No entries match your search.</div>';

  for (const e of list) {
    const d   = dirty[cur]?.[e.key];
    const val = d ?? e;
    const isDirty = !!d;
    const showEn  = lang === 'en'   || lang === 'both';
    const showZh  = lang === 'zh'   || lang === 'both';
    h += \`<div class="entry\${isDirty?' dirty':''}" data-key="\${esc(e.key)}">
      <div class="ekey">\${esc(e.key)}</div>
      <div class="cols">\`;
    if (showEn) h += mkField('en', e.key, val.en, 'English');
    if (showZh) h += mkField('zh', e.key, val.zh, '中文');
    h += '</div></div>';
  }
  h += '</div>';
  document.getElementById('main').innerHTML = h;
}

function mkField(fld, key, value, label) {
  const rows = Math.min(Math.max((value.split('\\n').length || 1) + 1, 2), 14);
  return \`<div>
    <div class="flabel \${fld==='zh'?'zh':''}">\${esc(label)}</div>
    <textarea rows="\${rows}" oninput="onChange('\${esc(key)}','\${fld}',this.value)">\${esc(value)}</textarea>
  </div>\`;
}

function esc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── change tracking ──
function onChange(key, fld, value) {
  if (!dirty[cur]) dirty[cur] = {};
  const book = books.find(b => b.file === cur);
  const orig = book.entries.find(e => e.key === key);
  if (!dirty[cur][key]) dirty[cur][key] = { en: orig.en, zh: orig.zh };
  dirty[cur][key][fld] = value;
  // revert if back to original
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
  const btn   = document.getElementById('save-btn');
  const label = document.getElementById('save-label');
  btn.disabled = true;
  label.textContent = 'Saving…';

  const toSave = Object.entries(dirty).filter(([,d]) => Object.keys(d).length);
  try {
    for (const [file, changes] of toSave) {
      const book    = books.find(b => b.file === file);
      const entries = book.entries.map(e => ({
        key: e.key,
        en:  changes[e.key]?.en ?? e.en,
        zh:  changes[e.key]?.zh ?? e.zh,
      }));
      const r    = await fetch('/api/save', {
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
  } catch (e) {
    toast('Error: ' + e.message, 'err');
  }

  label.innerHTML = 'Save &amp; Sync';
  updateSaveBtn();
  buildSidebar();
  renderMain(document.getElementById('search-input')?.value || '');
}

// ── history ──
async function openHistory() {
  document.getElementById('overlay').classList.add('open');
  document.getElementById('hist-list').innerHTML = '<div class="no-backups">Loading…</div>';
  try {
    const r = await fetch('/api/backups');
    const backups = await r.json();
    if (!backups.length) {
      document.getElementById('hist-list').innerHTML =
        '<div class="no-backups">No backups yet — they are created automatically each time you save.</div>';
      return;
    }
    document.getElementById('hist-list').innerHTML = backups.map(b => \`
      <div class="hist-row">
        <div>
          <div class="ts">\${esc(new Date(b.timestamp).toLocaleString())}</div>
          <div class="flist">\${esc((b.files||[]).join(', '))}</div>
        </div>
        <button class="restore-btn" onclick="doRestore('\${esc(b.id)}')">Restore</button>
      </div>
    \`).join('');
  } catch (e) {
    document.getElementById('hist-list').innerHTML =
      '<div class="no-backups">Error loading backups: ' + esc(e.message) + '</div>';
  }
}

function closeHistory() {
  document.getElementById('overlay').classList.remove('open');
}

async function doRestore(id) {
  if (!confirm('Restore this backup? Current state will be backed up first.')) return;
  closeHistory();
  toast('Restoring…', 'info');
  try {
    const r    = await fetch('/api/restore/' + encodeURIComponent(id), { method: 'POST' });
    const data = await r.json();
    if (!data.restored) throw new Error('Restore failed');
    // reload books from server
    await loadBooks();
    dirty = {};
    updateSaveBtn();
    buildSidebar();
    toast('Restored & synced ✓', 'ok');
  } catch (e) {
    toast('Restore error: ' + e.message, 'err');
  }
}

// ── toast ──
function toast(msg, type) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className   = 'toast ' + type;
  clearTimeout(window._tt);
  window._tt = setTimeout(() => el.classList.add('off'), 3600);
}

boot();
</script>
</body>
</html>`;
