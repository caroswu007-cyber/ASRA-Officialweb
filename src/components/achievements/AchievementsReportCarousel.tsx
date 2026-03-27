import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { compressUnsplash } from '../../content/achievements2025Content';
import { getLocalizedAchievementsAssets } from '../../content/pageCopyRuntime';
import { useI18n } from '../../i18n/LocaleProvider';
import { ReportInline } from './ReportRichText';

const SLIDE_MS = 5000;

type CarouselWidth = 'full' | 'half';

/**
 * Multi-slide “album” for the achievements report.
 * `width="half"` keeps the carousel to ~½ content width on md+ for a lighter layout.
 */
export function AchievementsReportCarousel({ width = 'half' }: { width?: CarouselWidth }) {
  const { t, locale } = useI18n();
  const { carouselSlides } = getLocalizedAchievementsAssets(locale);
  const slides = useMemo(
    () => carouselSlides.map(s => ({ ...s, src: compressUnsplash(s.src, width === 'half' ? 900 : 1400, 78) })),
    [carouselSlides, width],
  );
  const [index, setIndex] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, slides.length]);

  /* Only scroll the thumbnail strip horizontally — never scrollIntoView (it jumps the whole page). */
  useEffect(() => {
    const strip = thumbRef.current;
    if (!strip) return;
    const el = strip.querySelector(`[data-thumb="${index}"]`) as HTMLElement | null;
    if (!el) return;
    const target =
      el.offsetLeft - strip.clientWidth / 2 + el.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [index]);

  const active = slides[reduceMotion ? 0 : index];

  const shellW = width === 'half' ? 'w-full md:w-1/2 md:max-w-none mx-auto' : 'w-full';

  return (
    <div className={shellW}>
      <div className="relative overflow-hidden rounded-xl border border-amber-400/30 bg-black/50 shadow-[0_16px_44px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.06]">
        <div className="relative aspect-[16/9] min-h-[128px] md:min-h-[140px] lg:min-h-[156px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={active.src}
              src={active.src}
              alt={active.alt}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />
          </AnimatePresence>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-amber-950/20"
            aria-hidden
          />
        </div>
        <div
          ref={thumbRef}
          className="flex gap-1.5 overflow-x-auto border-t border-white/10 bg-black/55 px-2.5 py-2 md:px-3 md:py-2.5"
        >
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              data-thumb={i}
              onClick={() => setIndex(i)}
              className={`relative h-9 w-14 shrink-0 overflow-hidden rounded-md border transition md:h-10 md:w-[4.25rem] ${
                (reduceMotion ? 0 : index) === i
                  ? 'border-amber-400/80 ring-2 ring-amber-400/35'
                  : 'border-white/15 opacity-75 hover:border-amber-400/40 hover:opacity-100'
              }`}
              aria-label={`Slide ${i + 1}`}
            >
              <img src={s.src} alt={s.alt} className="h-full w-full object-cover" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2.5 text-center font-ui text-[0.7rem] text-slate-500 md:text-xs leading-snug px-1">
        <ReportInline text={t('achievementsReport.carouselNote')} />
      </p>
    </div>
  );
}
