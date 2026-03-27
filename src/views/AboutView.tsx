import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAboutContent } from '../content/getAboutContent';
import { ABOUT_PAGE_IMAGES } from '../constants/aboutImages';
import { useI18n } from '../i18n/LocaleProvider';

/* ─── Reusable small helpers ─── */

const OrnamLine = ({ flip = false }: { flip?: boolean }) => (
  <div className="flex items-center gap-4 justify-center">
    <div className="h-px w-16" style={{ background: `linear-gradient(to ${flip ? 'left' : 'right'}, transparent, rgba(251,191,36,0.5))` }} />
    <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
    <div className="h-px w-16" style={{ background: `linear-gradient(to ${flip ? 'right' : 'left'}, transparent, rgba(251,191,36,0.5))` }} />
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-cinzel text-sm uppercase tracking-[0.4em] mt-4" style={{ color: 'rgba(251,191,36,0.35)' }}>
    {children}
  </p>
);

/** How it works card top — `<img>` + overlay so broken URLs show a gradient instead of an empty strip. */
const HowItWorksStepBanner = ({ imageSrc, accentColor, stepNum }: { imageSrc: string; accentColor: string; stepNum: string }) => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div className="h-44 relative overflow-hidden bg-slate-950">
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
            ? `linear-gradient(145deg, ${accentColor}40 0%, rgba(5,8,20,0.98) 72%)`
            : 'rgba(5,8,20,0.55)',
        }}
      />
      <div className="absolute top-4 left-4 z-[1]">
        <span className="font-cinzel font-bold text-3xl" style={{ color: accentColor, opacity: 0.7 }}>{stepNum}</span>
      </div>
    </div>
  );
};

/* ─── 1. Hero ─── */
const AboutHero = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section className="relative flex flex-col items-center justify-center text-center overflow-hidden" style={{ minHeight: '80vh' }}>
    <div
      className="absolute inset-0 bg-cover bg-center scale-105"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=1920&q=85)' }}
    />
    <div className="absolute inset-0" style={{ background: 'rgba(3,6,18,0.78)' }} />
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(120,60,200,0.1) 0%, transparent 70%)' }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-28 flex flex-col items-center"
    >
      {/* Org badge */}
      <div className="flex items-center gap-3 mb-6 md:mb-8 flex-wrap justify-center">
        <div className="h-px w-10 sm:w-14 shrink-0" style={{ background: 'rgba(251,191,36,0.4)' }} />
        <span className="font-cinzel text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-center" style={{ color: '#c9a84c' }}>
          {about.orgName}
        </span>
        <div className="h-px w-10 sm:w-14 shrink-0" style={{ background: 'rgba(251,191,36,0.4)' }} />
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
          className="font-cinzel font-bold text-sm sm:text-base tracking-[0.3em] px-3 sm:px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(251,191,36,0.5)', color: '#fbbf24', background: 'rgba(251,191,36,0.07)' }}
        >
          ASra
        </span>
        <span style={{ color: 'rgba(251,191,36,0.3)', fontSize: '1.2rem' }}>·</span>
        <span
          className="font-cinzel font-bold text-sm sm:text-base tracking-[0.3em] px-3 sm:px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(167,139,250,0.5)', color: '#a78bfa', background: 'rgba(167,139,250,0.07)' }}
        >
          SMSC
        </span>
      </div>

      <p
        className="font-serif text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8 md:mb-10 px-2"
        style={{ color: 'rgba(248,250,252,0.78)' }}
      >
        {about.tagline}
      </p>

      {/* Domain pills */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#fbbf24' }} />
          <span className="font-cinzel text-xs sm:text-sm tracking-widest uppercase" style={{ color: '#fbbf24' }}>{t('about.hero.pillAsra')}</span>
        </div>
        <div className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}>
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: '#a78bfa' }} />
          <span className="font-cinzel text-xs sm:text-sm tracking-widest uppercase" style={{ color: '#a78bfa' }}>{t('about.hero.pillSmsc')}</span>
        </div>
      </div>
    </motion.div>

    <div className="absolute bottom-0 left-0 w-full h-36 pointer-events-none" style={{ background: 'linear-gradient(to top, #05080f, transparent)' }} />
  </section>
  );
};

/* ─── 2. Dual-Domain Structure ─── */
const DualDomain = () => {
  const { locale, t } = useI18n();
  const about = useMemo(() => getAboutContent(locale), [locale]);
  return (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12" style={{ background: 'rgba(5,8,15,0.65)' }}>
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
        className="text-center mb-12 mx-auto max-w-2xl rounded-2xl py-7 px-8"
        style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.2)' }}
      >
        <p className="font-cinzel text-sm uppercase tracking-[0.35em] mb-3" style={{ color: 'rgba(251,191,36,0.5)' }}>{t('about.dual.umbrellaLabel')}</p>
        <h3 className="font-cinzel font-bold text-white text-xl md:text-2xl tracking-wide">{about.orgName}</h3>
        <p className="font-cinzel text-sm mt-1 tracking-widest" style={{ color: 'rgba(251,191,36,0.4)' }}>{about.orgSubtitle}</p>
      </motion.div>

      {/* Connecting lines visual */}
      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0 max-w-5xl mx-auto">
        {/* ASra Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="flex-1 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(251,191,36,0.25)', background: 'rgba(10,18,35,0.8)' }}
        >
          <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=75)' }}>
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.4)', color: '#fbbf24' }}>{t('about.card.physicalLabel')}</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="h-0.5 mb-5" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.5), transparent)' }} />
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] mb-2" style={{ color: '#fbbf24' }}>ASra</p>
            <h3 className="font-cinzel font-bold text-white text-base sm:text-lg mb-3 leading-snug">{about.asra.name}</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{about.asra.description}</p>
          </div>
        </motion.div>

        {/* Center connector */}
        <div className="flex flex-col md:flex-row items-center justify-center px-0 md:px-6 py-4 md:py-0 gap-3 md:gap-0 md:flex-col flex-shrink-0">
          <div className="flex-1 w-px md:w-auto md:h-full border-t md:border-t-0 md:border-l border-dashed" style={{ borderColor: 'rgba(251,191,36,0.2)' }} />
          <div className="flex flex-col items-center gap-1 text-center px-4">
            <span style={{ color: 'rgba(251,191,36,0.4)', fontSize: '1.4rem' }}>⇄</span>
            <span className="font-cinzel font-bold text-xs sm:text-sm tracking-wider text-center" style={{ color: 'rgba(251,191,36,0.6)' }}>{t('about.connector.ratio')}</span>
            <span className="font-cinzel text-xs sm:text-sm text-center" style={{ color: 'rgba(251,191,36,0.35)' }}>{t('about.connector.partnership')}</span>
          </div>
          <div className="flex-1 w-px md:w-auto md:h-full border-t md:border-t-0 md:border-l border-dashed" style={{ borderColor: 'rgba(251,191,36,0.2)' }} />
        </div>

        {/* SMSC Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex-1 rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(167,139,250,0.25)', background: 'rgba(10,18,35,0.8)' }}
        >
          <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=75)' }}>
            <div className="absolute inset-0" style={{ background: 'rgba(30,0,60,0.55)' }} />
            <div className="absolute inset-0 flex items-end p-5">
              <span className="font-cinzel font-bold text-sm tracking-[0.3em] uppercase px-3 py-1 rounded-full" style={{ background: 'rgba(167,139,250,0.15)', border: '1px solid rgba(167,139,250,0.4)', color: '#a78bfa' }}>{t('about.card.spiritLabel')}</span>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="h-0.5 mb-5" style={{ background: 'linear-gradient(to right, rgba(167,139,250,0.5), transparent)' }} />
            <p className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.2em] mb-2" style={{ color: '#a78bfa' }}>SMSC</p>
            <h3 className="font-cinzel font-bold text-white text-base sm:text-lg mb-3 leading-snug">{about.smsc.name}</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{about.smsc.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Partnership quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="mt-14 max-w-3xl mx-auto text-center px-8 py-7 rounded-2xl"
        style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(251,191,36,0.15)' }}
      >
        <span style={{ color: 'rgba(251,191,36,0.3)', fontSize: '2.5rem', lineHeight: 1 }}>"</span>
        <p className="font-serif text-lg md:text-xl text-slate-200 leading-relaxed italic mt-1">
          {about.partnership}
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
      color: '#a78bfa',
      title: t('about.how.step1.title'),
      body: t('about.how.step1.body'),
      img: ABOUT_PAGE_IMAGES.howStep01,
    },
    {
      num: '02',
      color: '#38bdf8',
      title: t('about.how.step2.title'),
      body: t('about.how.step2.body'),
      img: ABOUT_PAGE_IMAGES.howStep02,
    },
    {
      num: '03',
      color: '#fbbf24',
      title: t('about.how.step3.title'),
      body: t('about.how.step3.body'),
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=70',
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
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
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(10,18,35,0.8)', border: `1px solid ${s.color}28` }}
            >
              <HowItWorksStepBanner imageSrc={s.img} accentColor={s.color} stepNum={s.num} />
              <div className="p-6">
                <div className="h-0.5 mb-5" style={{ background: `linear-gradient(to right, ${s.color}80, transparent)` }} />
                <h3 className="font-cinzel font-bold text-lg text-white mb-3 tracking-wide">{s.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed">{s.body}</p>
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
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden" style={{ background: 'rgba(5,8,15,0.7)' }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <OrnamLine />
        <h2 className="cosmic-title mt-5 mb-2" style={{ fontSize: 'clamp(1.95rem, 4.2vw, 3.45rem)' }}>{t('about.founders.title')}</h2>
        <SectionLabel>{t('about.founders.label')}</SectionLabel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.2)' }}
      >
        {/* Image side */}
        <div
          className="relative h-72 md:h-auto bg-cover bg-center"
          style={{ backgroundImage: `url(${ABOUT_PAGE_IMAGES.founders})` }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(10,6,0,0.6)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center" style={{ background: 'rgba(201,168,76,0.12)', border: '2px solid rgba(201,168,76,0.4)' }}>
              <span style={{ fontSize: '2rem' }}>✦</span>
            </div>
            <p className="font-cinzel font-bold text-xl text-white tracking-wide">{t('about.founders.woos')}</p>
            <p className="font-cinzel text-sm uppercase tracking-[0.3em] mt-1" style={{ color: '#c9a84c' }}>{t('about.founders.fatherSon')}</p>
          </div>
        </div>

        {/* Text side */}
        <div className="p-6 sm:p-8 md:p-10" style={{ background: 'rgba(10,18,35,0.85)' }}>
          <div className="h-0.5 mb-7" style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.5), transparent)' }} />
          <h3 className="font-cinzel font-bold text-white text-xl md:text-2xl mb-2 leading-snug">{about.founders.title}</h3>
          <p className="font-cinzel text-sm uppercase tracking-widest mb-6" style={{ color: '#c9a84c' }}>{about.founders.subtitle}</p>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">{about.founders.description}</p>
          <p className="mt-5 text-slate-400 text-sm md:text-base leading-relaxed font-ui border-l-2 border-amber-500/40 pl-4">
            {about.founders.storyTeaser}
          </p>
          <Link
            to="/founder-story"
            className="mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 font-cinzel font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-sm md:text-base py-3.5 sm:py-4 px-7 sm:px-10 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(251,191,36,0.25)]"
            style={{
              background: 'linear-gradient(135deg, #92610a, #fbbf24, #d97706)',
              color: '#0f0a00',
              boxShadow: '0 4px 24px rgba(251,191,36,0.35)',
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
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
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
            className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-0 rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${i === 0 ? 'rgba(56,189,248,0.2)' : 'rgba(251,191,36,0.2)'}`, background: 'rgba(10,18,35,0.8)' }}
          >
            {/* Number column */}
            <div
              className="flex flex-row md:flex-col items-center justify-center px-6 py-4 md:px-8 md:py-0 gap-3 md:gap-0 border-b md:border-b-0"
              style={{ background: i === 0 ? 'rgba(56,189,248,0.06)' : 'rgba(251,191,36,0.06)', borderRight: `1px solid ${i === 0 ? 'rgba(56,189,248,0.15)' : 'rgba(251,191,36,0.15)'}`, borderBottom: `1px solid ${i === 0 ? 'rgba(56,189,248,0.15)' : 'rgba(251,191,36,0.15)'}`, minWidth: '0' }}
            >
              <span
                className="font-cinzel font-bold"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: i === 0 ? 'rgba(56,189,248,0.7)' : 'rgba(251,191,36,0.7)', lineHeight: 1 }}
              >
                {m.number}
              </span>
              <span
                className="font-cinzel text-xs sm:text-sm uppercase tracking-widest md:mt-2 text-center"
                style={{ color: i === 0 ? 'rgba(56,189,248,0.45)' : 'rgba(251,191,36,0.45)' }}
              >
                {m.tag}
              </span>
            </div>

            {/* Content column */}
              <div className="p-5 sm:p-7 md:p-9">
              <div className="h-0.5 mb-6" style={{ background: `linear-gradient(to right, ${i === 0 ? 'rgba(56,189,248,0.5)' : 'rgba(251,191,36,0.5)'}, transparent)` }} />
              <h3
                className="font-cinzel font-bold text-white text-lg md:text-xl mb-4 leading-snug"
              >
                {m.title}
              </h3>
              {m.description.split('\n\n').map((para, pi) => (
                <p key={pi} className="text-slate-300 text-base md:text-lg leading-relaxed mb-3 last:mb-0">
                  {para}
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

/* ─── Main View ─── */
const AboutCTA = () => {
  const { t } = useI18n();
  return (
    <section className="py-24 px-4 sm:px-6 text-center relative overflow-hidden" style={{ background: 'rgba(5,8,15,0.8)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(251,191,36,0.05) 0%, transparent 70%)' }} />
      <div className="relative z-10 max-w-3xl mx-auto">
        <OrnamLine />
        <h2 className="cosmic-title mt-6 mb-4" style={{ fontSize: 'clamp(1.65rem, 3.75vw, 3rem)' }}>
          {t('about.cta.title')}
        </h2>
        <p className="font-cinzel text-sm uppercase tracking-[0.35em] mb-8" style={{ color: 'rgba(251,191,36,0.4)' }}>
          {t('about.cta.subtitle')}
        </p>
        <a
          href="https://ess-esw.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-cinzel font-bold uppercase tracking-wide py-3.5 sm:py-4 px-8 sm:px-14 rounded-full transition-all hover:-translate-y-1"
          style={{ background: 'linear-gradient(135deg, #92610a, #fbbf24, #d97706)', color: '#0f0a00', boxShadow: '0 4px 30px rgba(251,191,36,0.3)' }}
        >
          {t('about.cta.button')}
        </a>
      </div>
    </section>
  );
};

const AboutView = () => (
  <div style={{ background: '#05080f' }}>
    <AboutHero />
    <DualDomain />
    <HowItWorks />
    <Founders />
    <Missions />
    <AboutCTA />
  </div>
);

export default AboutView;
