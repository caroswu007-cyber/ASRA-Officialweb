import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAboutContent } from '../content/getAboutContent';
import { ABOUT_PAGE_IMAGES } from '../constants/aboutImages';
import { useI18n } from '../i18n/LocaleProvider';
import { InlineRich } from '../components/common/InlineRich';

/* ─── Reusable small helpers ─── */

const OrnamLine = ({ flip = false }: { flip?: boolean }) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="h-px w-16" style={{ background: `linear-gradient(to ${flip ? 'left' : 'right'}, transparent, rgba(194,123,32,0.5))` }} />
    <span style={{ color: 'rgba(194,123,32,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
    <div className="h-px w-16" style={{ background: `linear-gradient(to ${flip ? 'right' : 'left'}, transparent, rgba(194,123,32,0.5))` }} />
  </div>
);

/** Section kicker under H2 — strong contrast on parchment (#F5EDE0 / creams) */
const ABOUT_SUBHEAD_FG = '#924C12';

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-cinzel text-sm font-semibold uppercase tracking-[0.4em] mt-4"
    style={{ color: ABOUT_SUBHEAD_FG }}
  >
    {children}
  </p>
);

const HowItWorksStepBanner = ({ imageSrc, accentColor, stepNum }: { imageSrc: string; accentColor: string; stepNum: string }) => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="h-44 relative overflow-hidden" style={{ background: '#2A1508' }}>
      {!imgFailed ? (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
          onError={() => setImgFailed(true)}
        />
      ) : null}
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: imgFailed
            ? `linear-gradient(145deg, ${accentColor}40 0%, rgba(31,18,8,0.88) 72%)`
            : 'rgba(22,13,4,0.52)',
        }}
      />
      <div className="absolute top-4 left-4 z-[1]">
        <span className="font-cinzel font-bold text-3xl" style={{ color: accentColor, opacity: 0.72 }}>{stepNum}</span>
      </div>
    </div>
  );
};

/* ─── 1. Hero ─── */
const AboutHero = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section
    className="relative flex flex-col items-center justify-center text-center overflow-hidden"
    style={{ minHeight: '80vh', background: '#EDE0CC' }}
  >
    {/* Warm ambient gradient instead of dark image */}
    <div className="absolute inset-0" style={{ background: `
      radial-gradient(ellipse 75% 60% at 50% 40%, rgba(194,123,32,0.14) 0%, transparent 65%),
      radial-gradient(ellipse 55% 45% at 80% 20%, rgba(61,37,16,0.07) 0%, transparent 55%),
      #EDE0CC
    ` }} />

    {/* Decorative ring */}
    <div className="absolute pointer-events-none" style={{
      top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
      width: 'min(600px,75vw)', height: 'min(600px,75vw)',
      borderRadius: '50%',
      border: '1px solid rgba(194,123,32,0.12)',
    }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-28 flex flex-col items-center"
    >
      {/* Org badge */}
      <div className="flex items-center gap-3 mb-6 md:mb-8 flex-wrap justify-center">
        <div className="h-px w-10 sm:w-14 shrink-0" style={{ background: 'rgba(194,123,32,0.4)' }} />
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-center" style={{ color: '#C27B20' }}>
          {about.orgName}
        </span>
        <div className="h-px w-10 sm:w-14 shrink-0" style={{ background: 'rgba(194,123,32,0.4)' }} />
      </div>

      {/* Main title */}
      <h1
        className="cosmic-title font-bold leading-tight mb-5"
        style={{ fontSize: 'clamp(1.85rem, 5.75vw, 4.85rem)' }}
      >
        {t('about.hero.titleLine1')}<br />{t('about.hero.titleLine2')}
      </h1>

      {/* Abbr badge row */}
      <div className="flex items-center gap-3 sm:gap-5 mb-6 md:mb-8 flex-wrap justify-center">
        <span
          className="font-cinzel font-bold text-sm sm:text-base px-3 sm:px-4 py-1.5 rounded-full normal-case"
          style={{
            border: '1px solid rgba(194,123,32,0.4)',
            color: '#C27B20',
            background: 'rgba(194,123,32,0.07)',
            letterSpacing: '0.12em',
            fontFeatureSettings: '"lnum" 1, "kern" 1',
          }}
        >
          ASRA
        </span>
        <span style={{ color: 'rgba(194,123,32,0.3)', fontSize: '1.2rem' }}>·</span>
        <span
          className="font-cinzel font-bold text-sm sm:text-base tracking-[0.3em] px-3 sm:px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(61,37,16,0.3)', color: '#3D2510', background: 'rgba(61,37,16,0.06)' }}
        >
          SMSC
        </span>
      </div>

      <p
        className="font-serif text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8 md:mb-10 px-2"
        style={{ color: '#3D2510' }}
      >
        <InlineRich
          text={about.tagline}
          strongClassName="font-semibold"
          strongStyle={{ color: '#8B5413' }}
        />
      </p>

      {/* Domain pills */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full" style={{ background: 'rgba(194,123,32,0.08)', border: '1px solid rgba(194,123,32,0.2)' }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#C27B20' }} />
          <span className="font-cinzel text-xs sm:text-sm tracking-wide normal-case" style={{ color: '#C27B20' }}>{t('about.hero.pillAsra')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full" style={{ background: 'rgba(61,37,16,0.07)', border: '1px solid rgba(61,37,16,0.18)' }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#3D2510' }} />
          <span className="font-cinzel text-xs sm:text-sm tracking-wide normal-case" style={{ color: '#3D2510' }}>{t('about.hero.pillSmsc')}</span>
        </div>
      </div>
    </motion.div>

    {/* Gradient feather to next section */}
    <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #EDE0CC, transparent)' }} />
  </section>
  );
};

/* ─── 2. Dual-Domain Structure ─── */
const DualDomain = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 ed-vignette" style={{
    background: `linear-gradient(180deg,
      rgba(237,224,204,0) 0%,
      rgba(245,237,224,0.7) 5%,
      #F5EDE0 50%,
      rgba(245,237,224,0.7) 95%,
      rgba(237,224,204,0) 100%
    )`,
  }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-16">
        <OrnamLine />
        <h2 className="cosmic-title mt-5 mb-2" style={{ fontSize: 'clamp(1.95rem, 4.2vw, 3.45rem)' }}>
          {t('about.dual.title')}
        </h2>
        <SectionLabel>{t('about.dual.label')}</SectionLabel>
      </motion.div>

      {/* Umbrella org */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="text-center mb-12 mx-auto max-w-2xl rounded-xl py-7 px-8"
        style={{ background: 'rgba(194,123,32,0.06)', border: '1px solid rgba(194,123,32,0.2)' }}
      >
        <p className="font-cinzel text-sm font-semibold uppercase tracking-[0.35em] mb-3" style={{ color: ABOUT_SUBHEAD_FG }}>{t('about.dual.umbrellaLabel')}</p>
        <h3 className="font-cinzel font-bold text-xl md:text-2xl tracking-wide" style={{ color: '#1F1208' }}>{about.orgName}</h3>
        <p className="font-cinzel text-sm font-medium mt-1 tracking-widest" style={{ color: '#7A3D0F' }}>{about.orgSubtitle}</p>
      </motion.div>

      {/* Connecting lines visual */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0 max-w-5xl mx-auto">
        {/* ASRA card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="flex-1 rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(194,123,32,0.22)', background: 'rgba(251,246,238,0.88)' }}
        >
          <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=75)' }}>
            <div className="absolute inset-0" style={{ background: 'rgba(245,237,224,0.45)' }} />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(194,123,32,0.12)', border: '1px solid rgba(194,123,32,0.3)', color: '#C27B20' }}>{t('about.card.physicalLabel')}</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="h-0.5 mb-5" style={{ background: 'linear-gradient(to right, rgba(194,123,32,0.5), transparent)' }} />
            <p
              className="font-cinzel text-xs sm:text-sm normal-case mb-2"
              style={{ color: '#C27B20', letterSpacing: '0.12em', fontFeatureSettings: '"lnum" 1, "kern" 1' }}
            >
              ASRA
            </p>
            <h3 className="font-cinzel font-bold text-base sm:text-lg mb-3 leading-snug" style={{ color: '#1F1208' }}>{about.asra.name}</h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#3D2510' }}>
              <InlineRich
                text={about.asra.description}
                strongClassName="font-semibold"
                strongStyle={{ color: '#8B5413' }}
              />
            </p>
          </div>
        </motion.div>

        {/* Center connector */}
        <div className="flex flex-col md:flex-row items-center justify-center px-0 md:px-6 py-4 md:py-0 gap-3 md:gap-0 md:flex-col flex-shrink-0">
          <div className="flex-1 w-px md:w-auto md:h-full border-t md:border-t-0 md:border-l border-dashed" style={{ borderColor: 'rgba(194,123,32,0.25)' }} />
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <span style={{ color: 'rgba(194,123,32,0.5)', fontSize: '1.4rem' }}>⇄</span>
            <span className="font-cinzel font-bold text-xs sm:text-sm tracking-wider text-center" style={{ color: '#7A3D0F' }}>{t('about.connector.ratio')}</span>
            <span className="font-cinzel text-xs sm:text-sm text-center font-semibold" style={{ color: ABOUT_SUBHEAD_FG }}>{t('about.connector.partnership')}</span>
          </div>
          <div className="flex-1 w-px md:w-auto md:h-full border-t md:border-t-0 md:border-l border-dashed" style={{ borderColor: 'rgba(194,123,32,0.25)' }} />
        </div>

        {/* SMSC Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex-1 rounded-xl overflow-hidden"
          style={{ border: '1px solid rgba(61,37,16,0.2)', background: 'rgba(237,224,204,0.7)' }}
        >
          <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=75)' }}>
            <div className="absolute inset-0" style={{ background: 'rgba(237,224,204,0.5)' }} />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(61,37,16,0.1)', border: '1px solid rgba(61,37,16,0.25)', color: '#3D2510' }}>{t('about.card.spiritLabel')}</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="h-0.5 mb-5" style={{ background: 'linear-gradient(to right, rgba(61,37,16,0.4), transparent)' }} />
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] mb-2" style={{ color: '#3D2510' }}>SMSC</p>
            <h3 className="font-cinzel font-bold text-base sm:text-lg mb-3 leading-snug" style={{ color: '#1F1208' }}>{about.smsc.name}</h3>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#3D2510' }}>
              <InlineRich
                text={about.smsc.description}
                strongClassName="font-semibold"
                strongStyle={{ color: '#8B5413' }}
              />
            </p>
          </div>
        </motion.div>
      </div>

      {/* Partnership quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="mt-14 max-w-3xl mx-auto text-center px-8 py-7 rounded-xl"
        style={{ background: 'rgba(237,224,204,0.55)', border: '1px solid rgba(194,123,32,0.15)' }}
      >
        <span style={{ color: 'rgba(194,123,32,0.3)', fontSize: '2.5rem', lineHeight: 1 }}>"</span>
        <p className="font-serif text-lg md:text-xl leading-relaxed italic mt-1" style={{ color: '#3D2510' }}>
          <InlineRich
            text={about.partnership}
            italic
            strongClassName="font-semibold not-italic"
            strongStyle={{ color: '#8B5413' }}
          />
        </p>
      </motion.blockquote>
    </div>
  </section>
  );
};

/* ─── 3. How It Works ─── */
const HowItWorks = () => {
  const { t } = useI18n();
  const steps = [
    {
      num: '01',
      color: '#D4A853',
      title: t('about.how.step1.title'),
      body: t('about.how.step1.body'),
      img: ABOUT_PAGE_IMAGES.howStep01,
    },
    {
      num: '02',
      color: '#C27B20',
      title: t('about.how.step2.title'),
      body: t('about.how.step2.body'),
      img: ABOUT_PAGE_IMAGES.howStep02,
    },
    {
      num: '03',
      color: '#A8C4B0',
      title: t('about.how.step3.title'),
      body: t('about.how.step3.body'),
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=70',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 ed-vignette" style={{
      background: `linear-gradient(180deg,
        rgba(245,237,224,0) 0%,
        rgba(237,224,204,0.6) 5%,
        rgba(237,224,204,0.8) 50%,
        rgba(237,224,204,0.6) 95%,
        rgba(245,237,224,0) 100%
      )`,
    }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
          <OrnamLine />
          <h2 className="cosmic-title mt-5 mb-2" style={{ fontSize: 'clamp(1.65rem, 4.2vw, 3.45rem)' }}>{t('about.how.title')}</h2>
          <SectionLabel>{t('about.how.label')}</SectionLabel>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="rounded-xl overflow-hidden relative hover:-translate-y-1 transition-all duration-300"
              style={{
                background: '#1A0F05',
                border: `1px solid ${s.color}28`,
                boxShadow: '0 6px 28px rgba(31,18,8,0.2)',
              }}
            >
              {/* Per-card amber inner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: `radial-gradient(ellipse 85% 60% at 50% 30%, ${s.color}20 0%, transparent 65%)`,
              }} />
              <HowItWorksStepBanner imageSrc={s.img} accentColor={s.color} stepNum={s.num} />
              <div className="p-6 relative z-10">
                <div className="h-0.5 mb-5" style={{ background: `linear-gradient(to right, ${s.color}80, transparent)` }} />
                <h3 className="font-cinzel font-bold text-lg mb-3 tracking-wide" style={{ color: '#F5EDE0' }}>{s.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(245,237,224,0.72)' }}>
                  <InlineRich
                    text={s.body}
                    strongClassName="font-semibold"
                    strongStyle={{ color: '#E09A42' }}
                  />
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── 4. Founders ─── */
const Founders = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden ed-vignette" style={{
    background: `linear-gradient(180deg,
      rgba(245,237,224,0) 0%,
      rgba(245,237,224,0.65) 4%,
      #F5EDE0 50%,
      rgba(245,237,224,0.65) 96%,
      rgba(245,237,224,0) 100%
    )`,
  }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(194,123,32,0.06) 0%, transparent 70%)' }} />
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <OrnamLine />
        <h2 className="cosmic-title mt-5 mb-2" style={{ fontSize: 'clamp(1.95rem, 4.2vw, 3.45rem)' }}>{t('about.founders.title')}</h2>
        <SectionLabel>{t('about.founders.label')}</SectionLabel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-0 rounded-xl overflow-hidden"
        style={{ border: '1px solid rgba(194,123,32,0.2)' }}
      >
        {/* Image side */}
        <div className="relative" style={{ minHeight: '22rem' }}>
          <img
            src={ABOUT_PAGE_IMAGES.founders}
            alt={t('about.founders.woos')}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Edge vignette — soften all 4 sides */}
          <div className="absolute inset-0 pointer-events-none" style={{
            boxShadow: 'inset 0 0 60px 30px rgba(245,237,224,0.55)',
          }} />
          {/* Name overlay at bottom */}
          <div
            className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pb-5 pt-12 text-center"
            style={{ background: 'linear-gradient(to top, rgba(245,237,224,0.88) 0%, rgba(245,237,224,0.45) 60%, transparent 100%)' }}
          >
            <p className="font-cinzel font-bold text-xl tracking-wide" style={{ color: '#1F1208' }}>{t('about.founders.woos')}</p>
            <p className="font-cinzel text-sm uppercase tracking-[0.3em] mt-1" style={{ color: '#C27B20' }}>{t('about.founders.fatherSon')}</p>
          </div>
        </div>

        {/* Text side */}
        <div className="p-6 sm:p-8 md:p-10" style={{ background: 'rgba(251,246,238,0.88)' }}>
          <div className="h-0.5 mb-7" style={{ background: 'linear-gradient(to right, rgba(194,123,32,0.5), transparent)' }} />
          <h3 className="font-cinzel font-bold text-xl md:text-2xl mb-2 leading-snug" style={{ color: '#1F1208' }}>{about.founders.title}</h3>
          <p className="font-cinzel text-sm uppercase tracking-widest mb-6" style={{ color: '#C27B20' }}>{about.founders.subtitle}</p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: '#3D2510' }}>
            <InlineRich
              text={about.founders.description}
              strongClassName="font-semibold"
              strongStyle={{ color: '#8B5413' }}
            />
          </p>
          <p className="mt-5 text-sm md:text-base leading-relaxed font-cinzel border-l-2 pl-4" style={{ color: '#9B8E80', borderColor: 'rgba(194,123,32,0.35)' }}>
            <InlineRich
              text={about.founders.storyTeaser}
              strongClassName="font-semibold"
              strongStyle={{ color: '#7A5C3A' }}
            />
          </p>
          <Link
            to="/founder-story"
            className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 font-cinzel font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-sm md:text-base py-3.5 sm:py-4 px-7 sm:px-10 rounded-full transition-all hover:-translate-y-0.5"
            style={{
              background: '#1F1208',
              color: '#F5EDE0',
              boxShadow: '0 4px 20px rgba(31,18,8,0.2)',
            }}
          >
            {t('about.founders.storyCta')}
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

/* ─── 5. Missions ─── */
const Missions = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12" style={{
    background: `linear-gradient(180deg,
      rgba(245,237,224,0) 0%,
      rgba(237,224,204,0.65) 4%,
      rgba(237,224,204,0.85) 50%,
      rgba(237,224,204,0.65) 96%,
      rgba(245,237,224,0) 100%
    )`,
  }}>
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 md:mb-16">
        <OrnamLine />
        <h2 className="cosmic-title mt-5 mb-2" style={{ fontSize: 'clamp(1.65rem, 4.2vw, 3.45rem)' }}>
          {t('about.missions.title')}
        </h2>
        <SectionLabel>{t('about.missions.label')}</SectionLabel>
      </motion.div>

      <div className="space-y-8">
        {about.missions.map((m, i) => (
          <motion.div
            key={m.number}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-0 rounded-xl overflow-hidden"
            style={{
              border: `1px solid ${i === 0 ? 'rgba(194,123,32,0.22)' : 'rgba(61,37,16,0.18)'}`,
              background: 'rgba(251,246,238,0.88)',
            }}
          >
            {/* Number column */}
            <div
              className="flex flex-row md:flex-col items-center justify-center px-6 py-4 md:px-8 md:py-0 gap-3 md:gap-0 border-b md:border-b-0"
              style={{
                background: i === 0 ? 'rgba(194,123,32,0.06)' : 'rgba(61,37,16,0.05)',
                borderRight: `1px solid ${i === 0 ? 'rgba(194,123,32,0.15)' : 'rgba(61,37,16,0.12)'}`,
                borderBottom: `1px solid ${i === 0 ? 'rgba(194,123,32,0.15)' : 'rgba(61,37,16,0.12)'}`,
                minWidth: '0',
              }}
            >
              <span
                className="font-cinzel font-bold"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: i === 0 ? 'rgba(194,123,32,0.7)' : 'rgba(61,37,16,0.55)', lineHeight: 1 }}
              >
                {m.number}
              </span>
              <span
                className="font-cinzel text-xs sm:text-sm uppercase tracking-widest md:mt-2 text-center"
                style={{ color: i === 0 ? 'rgba(194,123,32,0.55)' : 'rgba(61,37,16,0.45)' }}
              >
                {m.tag}
              </span>
            </div>

            {/* Content column */}
            <div className="p-5 sm:p-7 md:p-9">
              <div className="h-0.5 mb-6" style={{ background: `linear-gradient(to right, ${i === 0 ? 'rgba(194,123,32,0.5)' : 'rgba(61,37,16,0.35)'}, transparent)` }} />
              <h3
                className="font-cinzel font-bold text-lg md:text-xl mb-4 leading-snug"
                style={{ color: '#1F1208' }}
              >
                {m.title}
              </h3>
              {m.description.split('\n\n').map((para, pi) => (
                <p key={pi} className="text-base md:text-lg leading-relaxed mb-3 last:mb-0" style={{ color: '#3D2510' }}>
                  <InlineRich
                    text={para}
                    strongClassName="font-semibold"
                    strongStyle={{ color: '#8B5413' }}
                  />
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

/* ─── CTA ─── */
const AboutCTA = () => {
  const { t } = useI18n();
  return (
    <section className="relative py-24 px-4 sm:px-6 text-center overflow-hidden" style={{
      background: '#160D04',
    }}>
      {/* Top transition from cream sections above */}
      <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(245,237,224,1) 0%, rgba(22,13,4,1) 100%)' }} />
      {/* Amber inner glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 75% 60% at 50% 50%, rgba(194,123,32,0.25) 0%, rgba(139,84,19,0.12) 42%, transparent 68%),
          radial-gradient(ellipse 40% 35% at 80% 85%, rgba(194,123,32,0.07) 0%, transparent 55%)
        `,
      }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,168,83,0.6))' }} />
          <span style={{ color: 'rgba(212,168,83,0.6)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,168,83,0.6))' }} />
        </div>
        <h2
          className="font-cinzel font-bold mt-6 mb-4"
          style={{
            fontSize: 'clamp(1.65rem, 3.75vw, 3rem)',
            background: 'linear-gradient(135deg, #F5EDE0 15%, #D4A853 50%, #F5EDE0 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {t('about.cta.title')}
        </h2>
        <p className="font-cinzel text-sm uppercase tracking-[0.35em] mb-8" style={{ color: 'rgba(212,168,83,0.55)' }}>
          {t('about.cta.subtitle')}
        </p>
        <a
          href="https://www.facebook.com/groups/654991120042048"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-cinzel font-bold uppercase tracking-wide py-3.5 sm:py-4 px-8 sm:px-14 rounded-full transition-all hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, #C27B20 0%, #D4A853 50%, #A86918 100%)',
            color: '#1A0F05',
            boxShadow: '0 6px 32px rgba(194,123,32,0.38)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 10px 44px rgba(194,123,32,0.55)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 32px rgba(194,123,32,0.38)'; }}
        >
          {t('about.cta.button')}
        </a>
      </div>
    </section>
  );
};

const AboutView = () => (
  <div style={{ background: '#F5EDE0' }}>
    <AboutHero />
    <DualDomain />
    <HowItWorks />
    <Founders />
    <Missions />
    <AboutCTA />
  </div>
);

export default AboutView;
