/**
 * Crop + lightly resize your founder photo for the About Founders panel (narrow
 * left column + md:h-auto → use a slightly portrait crop so bg-cover keeps all three).
 * Run: node scripts/crop-founders-once.mjs [source.png]
 * Default source: ../founders-src.png (copy your upload there if needed).
 */
import sharp from 'sharp';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outPath = join(root, 'public/images/about/founders-woos.png');
const defaultSrc = join(root, 'founders-src.png');

const src = process.argv[2] ?? defaultSrc;

// Left column: narrow vs tall row height → bg-cover favors a slightly portrait crop.
const targetWoverH = 0.74;

const meta = await sharp(src).metadata();
const w = meta.width;
const h = meta.height;
if (!w || !h) {
  console.error('Could not read image size:', src);
  process.exit(1);
}

let cropW;
let cropH;
let left;
let top;

if (w / h > targetWoverH) {
  cropH = h;
  cropW = Math.round(h * targetWoverH);
  left = Math.round((w - cropW) / 2);
  top = 0;
} else {
  cropW = w;
  cropH = Math.round(w / targetWoverH);
  left = 0;
  // Bias upward so faces (upper ~2/3 of frame) stay centered in crop
  top = Math.max(0, Math.round((h - cropH) * 0.22));
}

await sharp(src)
  .extract({ left, top, width: cropW, height: cropH })
  .resize({ width: 1600, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log('Wrote', outPath, { source: w, h, crop: [cropW, cropH], offset: [left, top] });
