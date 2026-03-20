import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteContent } from '../../content/siteContent';
import GalaxyBackground from '../common/GalaxyBackground';

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { heroTitle, heroSubtitle, heroCta } = siteContent.home;

  return (
    <section 
      id="home" 
      className="hero-bg min-h-[92vh] md:h-screen flex items-center justify-center text-center relative px-4 overflow-hidden cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background 1: Universe (Galaxy animation) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 0 : 1,
        }}
        transition={{
          opacity: { duration: isHovered ? 0.1 : 2, ease: "easeOut" },
        }}
        className="absolute inset-0 bg-black pointer-events-none"
      >
        <GalaxyBackground />
      </motion.div>

      {/* Background 2: Spirit Realm (Sudden entrance on hover) */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1, filter: "hue-rotate(0deg) contrast(1) brightness(1)" }}
        animate={{ 
          opacity: isHovered ? 0.8 : 0, 
          scale: isHovered ? 1 : 1.1,
          filter: isHovered ? "hue-rotate(120deg) contrast(1.8) brightness(1.5)" : "hue-rotate(0deg) contrast(1) brightness(1)"
        }}
        transition={{ 
          duration: isHovered ? 0.1 : 1, // '一下子' means very fast entry (0.1s)
          ease: isHovered ? "linear" : "easeOut" 
        }}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-screen pointer-events-none"
      />
      
      {/* Dim overlay for text readability, darkens slightly when entering spirit realm to make colors pop */}
      <div 
        className="absolute inset-0 bg-slate-900 pointer-events-none transition-opacity duration-300" 
        style={{ opacity: isHovered ? 0.7 : 0.4 }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 transition-transform duration-300"
        style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
      >
        {/* Pre-title badge */}
        <p
          className="font-cinzel text-xs uppercase tracking-[0.45em] mb-5"
          style={{ color: 'rgba(251,191,36,0.55)' }}
        >
          {heroSubtitle}
        </p>

        <h1
          className="font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-amber-200 to-accent mb-3 drop-shadow-2xl transition-all duration-300 tracking-tight"
          style={{
            fontSize: 'clamp(1.8rem, 6vw, 5.5rem)',
            lineHeight: 1.1,
            textShadow: isHovered ? "0 0 60px rgba(251,191,36,0.8)" : "none",
            WebkitTextFillColor: isHovered ? 'transparent' : undefined,
          }}
        >
          {heroTitle}
        </h1>

        <p
          className="font-cinzel text-xs sm:text-sm uppercase tracking-[0.35em] mb-10 md:mb-14"
          style={{ color: 'rgba(251,191,36,0.45)' }}
        >
          Umma New Century Organization
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <a
            href="#introduction"
            className="inline-block font-cinzel font-bold uppercase tracking-widest py-3 md:py-4 px-8 md:px-12 rounded-full transition-transform hover:-translate-y-1 shadow-lg text-sm md:text-base"
            style={{
              background: 'linear-gradient(135deg, #92610a, #fbbf24, #d97706)',
              color: '#0f0a00',
              boxShadow: '0 4px 30px rgba(251,191,36,0.35)',
            }}
          >
            {heroCta}
          </a>
          <a
            href="/about"
            className="inline-block font-cinzel font-bold uppercase tracking-widest py-3 md:py-4 px-8 md:px-12 rounded-full transition-all hover:-translate-y-1 text-sm md:text-base"
            style={{
              border: '1px solid rgba(251,191,36,0.35)',
              color: '#fbbf24',
              background: 'rgba(251,191,36,0.05)',
            }}
          >
            About ASra
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
