import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteContent } from '../../content/siteContent';
import StarBackground from '../common/StarBackground';

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
      {/* Background 1: Universe (Star animation) */}
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
        <StarBackground />
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
        <h1 className="font-serif text-3xl sm:text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-white to-accent mb-4 tracking-[0.08em] md:tracking-widest drop-shadow-2xl transition-all duration-300"
            style={{ textShadow: isHovered ? "0 0 40px rgba(251,191,36,0.8)" : "none" }}>
          {heroTitle}
        </h1>
        <p className="text-accent text-sm sm:text-base md:text-xl font-light tracking-[0.12em] sm:tracking-[0.2em] md:tracking-[0.5em] uppercase mb-8 md:mb-12">{heroSubtitle}</p>
        <a href="#introduction" className="inline-block bg-gradient-to-r from-yellow-600 to-accent hover:from-accent hover:to-yellow-400 text-black font-bold uppercase tracking-[0.08em] md:tracking-widest py-3 md:py-4 px-7 md:px-10 rounded-full transition-transform hover:-translate-y-1 shadow-lg shadow-accent/20 text-sm md:text-base">
          {heroCta}
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
