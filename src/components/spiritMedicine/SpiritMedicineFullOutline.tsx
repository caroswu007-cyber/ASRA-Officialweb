import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';
import { getLocalizedSpiritMedicineOfficialOutline } from '../../content/pageCopyRuntime';
import { useI18n } from '../../i18n/LocaleProvider';

/**
 * Full curriculum tree (ess-esw.org/spirit-medicine style), same teal/cyan visual language as SpiritMedicineContents.
 */
const SpiritMedicineFullOutline = () => {
  const { t, locale } = useI18n();
  const spiritMedicineOfficialOutline = getLocalizedSpiritMedicineOfficialOutline(locale);

  return (
    <section
      id="spirit-medicine-full-outline"
      className="relative z-10 text-white py-20 md:py-28 px-5 sm:px-6 md:px-10"
      style={{ background: '#0a2535' }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.09]"
        style={{
          background:
            'radial-gradient(ellipse 55% 42% at 85% 8%, rgba(56,189,248,0.55), transparent), radial-gradient(ellipse 45% 38% at 8% 88%, rgba(125,211,252,0.35), transparent)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <div className="flex items-center gap-5 md:gap-8 mb-8">
            <div
              className="flex-1 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(56,189,248,0.65), rgba(125,211,252,0.35))',
              }}
            />
            <h2
              className="font-mono text-lg sm:text-xl md:text-2xl tracking-[0.14em] sm:tracking-[0.18em] uppercase text-center px-2 leading-tight font-semibold"
              style={{
                color: '#e0f2fe',
                textShadow: '0 0 28px rgba(56,189,248,0.35)',
              }}
            >
              {t('spirit.fullOutlineTitle')}
            </h2>
            <div
              className="flex-1 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(56,189,248,0.65), rgba(125,211,252,0.35))',
              }}
            />
          </div>
          <p
            className="text-sm sm:text-base md:text-lg font-serif max-w-3xl mx-auto leading-relaxed md:leading-relaxed px-2"
            style={{ color: 'rgba(186,230,253,0.92)' }}
          >
            {t('spirit.fullOutlineIntro')}
          </p>
        </header>

        <div
          className="rounded-[1.25rem] border-2 backdrop-blur-md px-5 py-7 sm:px-8 sm:py-8 md:px-10 md:py-10"
          style={{
            borderColor: 'rgba(56,189,248,0.4)',
            background:
              'linear-gradient(165deg, rgba(8,52,82,0.72) 0%, rgba(6,35,55,0.78) 45%, rgba(8,40,60,0.65) 100%)',
            boxShadow:
              '0 28px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.2)',
          }}
        >
          <ul className="space-y-8 md:space-y-10">
            {spiritMedicineOfficialOutline.map((file, fi) => (
              <motion.li
                key={file.anchorId}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, delay: fi * 0.05 }}
                className="relative pl-0 md:pl-2"
              >
                <div
                  className="absolute left-0 top-3 bottom-0 w-px hidden sm:block -ml-4 md:-ml-6 opacity-60"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(56,189,248,0.5), transparent)',
                  }}
                  aria-hidden
                />
                <a
                  href={`#${file.anchorId}`}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 rounded-xl -mx-2 px-2 py-1"
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
                    <span
                      className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-md"
                      style={{
                        color: '#7dd3fc',
                        background: 'rgba(56,189,248,0.14)',
                        border: '1px solid rgba(56,189,248,0.45)',
                        boxShadow: '0 0 20px rgba(56,189,248,0.12)',
                      }}
                    >
                      {file.fileLabel}
                    </span>
                    <span
                      className="font-serif font-bold text-base sm:text-lg md:text-xl leading-snug group-hover:text-sky-100 transition-colors"
                      style={{ color: '#f0f9ff' }}
                    >
                      {file.heading}
                    </span>
                  </div>
                </a>
                {file.subsections?.length ? (
                  <ul
                    className="mt-4 ml-2 sm:ml-4 md:ml-7 space-y-2.5 pl-4 sm:pl-5 md:pl-7 border-l-2"
                    style={{ borderColor: 'rgba(56,189,248,0.35)' }}
                  >
                    {file.subsections.map(sub => (
                      <li key={sub.code} className="flex gap-3 sm:gap-4 items-start">
                        <span
                          className="font-mono text-xs sm:text-sm shrink-0 mt-0.5 font-semibold"
                          style={{ color: '#7dd3fc' }}
                        >
                          {sub.code}
                        </span>
                        <a
                          href={`#${file.anchorId}`}
                          className="text-sm sm:text-base md:text-lg font-serif leading-snug hover:text-sky-100 transition-colors"
                          style={{ color: '#bfe9fc' }}
                        >
                          {sub.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Transition into filmed episode index below */}
        <div className="relative mt-16 md:mt-20 pt-10 md:pt-14">
          <div
            className="h-[2px] w-full max-w-3xl mx-auto mb-10 md:mb-12 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(56,189,248,0.65), rgba(251,191,36,0.5), rgba(56,189,248,0.65), transparent)',
            }}
            aria-hidden
          />
          <div
            className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 w-[min(100%,28rem)] h-16 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(56,189,248,0.18), transparent 72%)',
            }}
            aria-hidden
          />
          <div
            className="relative rounded-2xl border px-6 py-8 md:px-10 md:py-10 text-center mx-auto max-w-4xl"
            style={{
              borderColor: 'rgba(251,191,36,0.28)',
              background:
                'linear-gradient(180deg, rgba(12,42,58,0.9) 0%, rgba(10,37,53,0.65) 100%)',
              boxShadow: '0 -12px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-5">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: 'rgba(251,191,36,0.12)',
                  border: '1px solid rgba(251,191,36,0.35)',
                  color: '#fcd34d',
                  boxShadow: '0 0 24px rgba(251,191,36,0.15)',
                }}
              >
                <Clapperboard className="w-6 h-6" strokeWidth={1.75} aria-hidden />
              </span>
              <p
                className="font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.22em] font-bold"
                style={{ color: '#fde68a' }}
              >
                {t('spirit.filmedCatalogEyebrow')}
              </p>
            </div>
            <p
              className="font-serif text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'rgba(226,232,240,0.92)' }}
            >
              {t('spirit.filmedCatalogLead')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpiritMedicineFullOutline;
