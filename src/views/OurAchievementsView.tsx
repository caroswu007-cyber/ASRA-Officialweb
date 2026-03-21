import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { siteContent } from '../content/siteContent';
import { warmImagery } from '../content/visualTheme';
import { useI18n } from '../i18n/LocaleProvider';

const WarmPhoto = ({
  src,
  alt,
  className = '',
  aspect = '',
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) => (
  <figure
    className={`overflow-hidden rounded-2xl ring-1 ring-amber-200/15 shadow-[0_24px_60px_rgba(0,0,0,0.4)] ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className={`w-full object-cover ${aspect || 'h-full min-h-[200px]'}`}
      loading="lazy"
      decoding="async"
    />
  </figure>
);

const OrnamLine = ({ flip = false }: { flip?: boolean }) => (
  <div className="flex items-center gap-4 justify-center">
    <div
      className="h-px w-16"
      style={{
        background: `linear-gradient(to ${flip ? 'left' : 'right'}, transparent, rgba(232,165,75,0.5))`,
      }}
    />
    <span style={{ color: 'rgba(232,165,75,0.55)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
    <div
      className="h-px w-16"
      style={{
        background: `linear-gradient(to ${flip ? 'right' : 'left'}, transparent, rgba(232,165,75,0.5))`,
      }}
    />
  </div>
);

const CASE_KEYS = [
  { title: 'achievementsPage.case.did.title', body: 'achievementsPage.case.did.body' },
  { title: 'achievementsPage.case.cult.title', body: 'achievementsPage.case.cult.body' },
  { title: 'achievementsPage.case.depression.title', body: 'achievementsPage.case.depression.body' },
  { title: 'achievementsPage.case.ptsd.title', body: 'achievementsPage.case.ptsd.body' },
  { title: 'achievementsPage.case.psychosis.title', body: 'achievementsPage.case.psychosis.body' },
  { title: 'achievementsPage.case.somatization.title', body: 'achievementsPage.case.somatization.body' },
] as const;

const OurAchievementsView = () => {
  const { t } = useI18n();
  const { join } = siteContent.links;

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[#120e0c]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.38]"
          style={{ backgroundImage: `url(${warmImagery.bodyBackdrop})` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,10,8,0.92) 0%, rgba(22,14,12,0.82) 45%, rgba(12,9,10,0.94) 100%)',
          }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.055]" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232,165,75,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,165,75,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '52px 52px',
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% -5%, rgba(255,200,150,0.14) 0%, transparent 50%), radial-gradient(ellipse 50% 45% at 100% 70%, rgba(180,120,90,0.08) 0%, transparent 45%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
        <motion.header
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mb-16 md:mb-24"
        >
          <OrnamLine />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <p
                className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.45em] mb-4"
                style={{ color: 'rgba(251,191,136,0.85)' }}
              >
                {t('achievementsPage.hero.badge')}
              </p>
              <h1
                className="cosmic-title font-bold leading-tight mb-5 px-1 lg:px-0"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.35rem)' }}
              >
                {t('achievementsPage.hero.title')}
              </h1>
              <p className="text-stone-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('achievementsPage.hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
                <span
                  className="text-xs font-cinzel uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{
                    border: '1px solid rgba(232,165,75,0.4)',
                    color: '#fcd9a8',
                    background: 'rgba(232,165,75,0.08)',
                  }}
                >
                  {t('achievementsPage.hero.pill1')}
                </span>
                <span
                  className="text-xs font-cinzel uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{
                    border: '1px solid rgba(255,200,160,0.35)',
                    color: '#fde8c8',
                    background: 'rgba(255,200,160,0.06)',
                  }}
                >
                  {t('achievementsPage.hero.pill2')}
                </span>
                <span
                  className="text-xs font-cinzel uppercase tracking-widest px-4 py-2 rounded-full"
                  style={{
                    border: '1px solid rgba(196,160,130,0.4)',
                    color: '#e8d4c4',
                    background: 'rgba(196,160,130,0.07)',
                  }}
                >
                  {t('achievementsPage.hero.pill3')}
                </span>
              </div>
            </div>
            <WarmPhoto
              src={warmImagery.achievementsHero}
              alt=""
              className="max-w-md mx-auto lg:max-w-none"
              aspect="aspect-[4/3] w-full"
            />
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="home-blur-surface rounded-2xl p-8 md:p-10 mb-12 border border-amber-200/10"
        >
          <div className="grid gap-8 md:grid-cols-5 md:gap-10 items-start">
            <div className="md:col-span-3">
              <h2 className="font-cinzel text-lg md:text-xl text-[#fff8f0] mb-4 tracking-wide flex items-center gap-3">
                <span className="inline-block w-1 h-6 rounded-full bg-gradient-to-b from-amber-300 to-amber-600/50" />
                {t('achievementsPage.scope.title')}
              </h2>
              <p className="text-stone-300 leading-loose text-base md:text-lg">{t('achievementsPage.scope.body')}</p>
            </div>
            <div className="md:col-span-2">
              <WarmPhoto src={warmImagery.healingConnection} alt="" aspect="aspect-[4/5] w-full" />
              <p className="text-stone-500 text-xs mt-3 text-center md:text-left italic">
                {t('achievementsPage.scope.caption')}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden mb-10 h-48 md:h-56 border border-amber-900/20"
        >
          <img
            src={warmImagery.gentleTogether}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-90"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(12,8,6,0.88) 0%, rgba(18,12,10,0.45) 55%, rgba(12,8,6,0.75) 100%)',
            }}
          />
          <p className="absolute inset-0 flex items-center px-8 md:px-12 text-stone-200/95 text-base md:text-lg font-light max-w-lg leading-relaxed">
            {t('achievementsPage.banner.together')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {[
            { valueKey: 'achievementsPage.stat1.value', labelKey: 'achievementsPage.stat1.label' },
            { valueKey: 'achievementsPage.stat2.value', labelKey: 'achievementsPage.stat2.label' },
            { valueKey: 'achievementsPage.stat3.value', labelKey: 'achievementsPage.stat3.label' },
          ].map((s, i) => (
            <motion.div
              key={s.valueKey}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 md:p-7 text-center border backdrop-blur-xl"
              style={{
                background: 'rgba(40,28,22,0.72)',
                borderColor: 'rgba(232,165,75,0.22)',
                boxShadow: '0 0 36px rgba(232,165,75,0.06)',
              }}
            >
              <div
                className="font-cinzel text-3xl md:text-4xl font-bold mb-3 tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #fff4e6 0%, #e8a54b 48%, #fcd9a8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t(s.valueKey)}
              </div>
              <p className="text-stone-500 text-sm leading-relaxed">{t(s.labelKey)}</p>
            </motion.div>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="font-cinzel text-lg md:text-xl text-[#fff8f0] mb-5 tracking-wide">
            {t('achievementsPage.conditions.title')}
          </h2>
          <p className="text-stone-500 text-sm mb-4 uppercase tracking-widest font-cinzel">
            {t('achievementsPage.conditions.caption')}
          </p>
          <div
            className="rounded-2xl p-6 md:p-8 border backdrop-blur-xl leading-relaxed text-stone-200 text-sm md:text-base"
            style={{
              background: 'rgba(28,20,16,0.75)',
              borderColor: 'rgba(232,165,75,0.15)',
            }}
          >
            {t('achievementsPage.conditions.list')}
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 rounded-2xl overflow-hidden border border-amber-900/25 h-40 md:h-48"
        >
          <img
            src={warmImagery.pathRenewal}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-88"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#0e0a08]/75 via-transparent to-[#0e0a08]/25 pointer-events-none"
            aria-hidden
          />
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-cinzel text-lg md:text-xl text-[#fff8f0] mb-2 tracking-wide">{t('achievementsPage.cases.title')}</h2>
          <p className="text-stone-500 text-sm mb-8 font-light italic">{t('achievementsPage.cases.note')}</p>
          <div className="grid md:grid-cols-2 gap-6">
            {CASE_KEYS.map((c, idx) => (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl p-6 border backdrop-blur-xl hover:border-amber-400/25 transition-colors duration-300"
                style={{
                  background: 'rgba(32,22,18,0.68)',
                  borderColor: 'rgba(232,165,75,0.14)',
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="shrink-0 font-mono text-xs text-amber-400/90 tabular-nums mt-1"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-cinzel text-base md:text-lg text-[#fff8f0] tracking-wide">{t(c.title)}</h3>
                </div>
                <p className="text-stone-400 text-sm md:text-base leading-relaxed pl-0 md:pl-9">{t(c.body)}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="home-blur-surface rounded-2xl p-8 md:p-10 mb-12 border border-amber-200/12"
        >
          <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-start">
            <div>
              <h2 className="font-cinzel text-lg md:text-xl text-[#fff8f0] mb-4 tracking-wide">{t('achievementsPage.team.title')}</h2>
              <p className="text-stone-300 leading-loose text-base md:text-lg mb-6">{t('achievementsPage.team.body')}</p>
              <p className="text-stone-400 leading-loose text-base">{t('achievementsPage.team.body2')}</p>
            </div>
            <WarmPhoto src={warmImagery.sharedJourney} alt="" aspect="aspect-[3/2] w-full" />
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl p-8 md:p-10 mb-12 border overflow-hidden border-amber-200/15"
        >
          <img
            src={warmImagery.lightThroughClouds}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1a1210]/95 via-[#1c1412]/92 to-[#120e0c]/95 pointer-events-none"
            aria-hidden
          />
          <div className="relative z-[1]">
            <h2 className="font-cinzel text-lg md:text-xl text-[#fff8f0] mb-4 tracking-wide">
              {t('achievementsPage.phenomenology.title')}
            </h2>
            <p className="text-stone-300 leading-loose text-base md:text-lg">{t('achievementsPage.phenomenology.body')}</p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <OrnamLine flip />
          <h2 className="cosmic-title text-2xl md:text-3xl mt-10 mb-5">{t('achievementsPage.closing.title')}</h2>
          <p className="text-stone-300 leading-loose text-base md:text-lg max-w-2xl mx-auto mb-4">
            {t('achievementsPage.closing.body')}
          </p>
          <p className="text-stone-400 leading-relaxed max-w-xl mx-auto">{t('achievementsPage.closing.body2')}</p>
        </motion.section>

        <p className="text-stone-500 text-xs md:text-sm leading-relaxed border-t border-amber-900/20 pt-8 mb-10 font-light">
          {t('achievementsPage.disclaimer')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-block font-cinzel font-semibold uppercase tracking-widest text-sm py-3 px-10 rounded-full transition-all hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(232,165,75,0.45)',
              color: '#fcd9a8',
              background: 'rgba(232,165,75,0.08)',
            }}
          >
            {t('achievementsPage.backHome')}
          </Link>
          <a
            href={join}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-cinzel font-semibold uppercase tracking-widest text-sm py-3 px-10 rounded-full transition-all hover:-translate-y-0.5"
            style={{
              border: '1px solid rgba(251,191,36,0.4)',
              color: '#f0c078',
              background: 'rgba(251,191,36,0.08)',
            }}
          >
            {t('achievementsPage.ctaJoin')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurAchievementsView;
