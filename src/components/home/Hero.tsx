import { motion } from 'framer-motion';
import { useLocalizedSiteContent } from '../../content/useLocalizedSiteContent';

const gatherEase = [0.16, 1, 0.3, 1] as const;

/** Hero text only — shared galaxy lives in HomeView so it can extend into Introduction. */
const Hero = () => {
  const { home } = useLocalizedSiteContent();
  const { heroTitle, heroSubtitle } = home;

  return (
    <section
      id="home"
      className="relative z-10 min-h-[100svh] md:h-screen flex items-center justify-center text-center px-6 sm:px-8 overflow-hidden bg-transparent scroll-mt-24 md:scroll-mt-28"
    >
      {/* Light readability veils — keep canvas galaxy visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 88% 72% at 50% 38%, rgba(55,32,22,0.2) 0%, transparent 58%), radial-gradient(ellipse 120% 70% at 50% 92%, rgba(18,10,8,0.5) 0%, transparent 52%)',
        }}
      />

      <div className="absolute inset-0 bg-amber-950/15 pointer-events-none" aria-hidden />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44 md:h-56"
        style={{
          background:
            'linear-gradient(to top, rgba(18,12,10,0.88) 0%, rgba(18,12,10,0.5) 28%, rgba(22,14,10,0.22) 55%, rgba(24,14,10,0.06) 78%, transparent 100%)',
        }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.3, ease: gatherEase }}
        className="relative z-10 flex flex-col items-center gap-6 sm:gap-7 px-2"
      >
        {/* Decorative top line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6, ease: gatherEase }}
          className="w-16 sm:w-20 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.6), transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.8em', y: 8 }}
          animate={{ opacity: 1, letterSpacing: '0.4em', y: 0 }}
          transition={{ duration: 1.4, delay: 0.55, ease: gatherEase }}
          className="font-cinzel text-xs sm:text-sm md:text-base uppercase tracking-[0.4em]"
          style={{ color: 'rgba(251,191,36,0.75)' }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.h1
          className="font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#fffaf4] via-[#fcd9a8] to-[#e8a54b] drop-shadow-2xl leading-tight"
          style={{
            fontSize: 'clamp(2.6rem, 10vw, 5.75rem)',
            lineHeight: 1.12,
            willChange: 'transform, opacity, letter-spacing, filter',
          }}
          initial={{
            opacity: 0,
            scale: 0.85,
            letterSpacing: '0.38em',
            filter: 'blur(18px)',
            y: 16,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            letterSpacing: '0.04em',
            filter: 'blur(0px)',
            y: 0,
          }}
          transition={{
            duration: 2.6,
            delay: 0.1,
            ease: gatherEase,
          }}
        >
          {heroTitle}
        </motion.h1>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9, ease: gatherEase }}
          className="w-24 sm:w-32 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
