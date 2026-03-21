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
      className="relative z-10 min-h-[92vh] md:h-screen flex items-center justify-center text-center px-4 overflow-hidden bg-transparent scroll-mt-24 md:scroll-mt-28"
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
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: gatherEase }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: gatherEase }}
          className="font-cinzel text-sm sm:text-base uppercase tracking-[0.4em] mb-5"
          style={{ color: 'rgba(251,191,36,0.7)' }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.h1
          className="font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#fffaf4] via-[#fcd9a8] to-[#e8a54b] mb-3 drop-shadow-2xl"
          style={{
            fontSize: 'clamp(2rem, 6.5vw, 5.75rem)',
            lineHeight: 1.08,
            willChange: 'transform, opacity, letter-spacing, filter',
          }}
          initial={{
            opacity: 0,
            scale: 0.88,
            letterSpacing: '0.42em',
            filter: 'blur(14px)',
          }}
          animate={{
            opacity: 1,
            scale: 1,
            letterSpacing: '0.02em',
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 2.45,
            delay: 0.15,
            ease: gatherEase,
          }}
        >
          {heroTitle}
        </motion.h1>
      </motion.div>
    </section>
  );
};

export default Hero;
