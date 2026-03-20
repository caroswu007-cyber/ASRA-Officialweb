import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Introduction = () => {
  return (
    <section id="introduction" className="py-28 px-6 md:px-12 max-w-6xl mx-auto">

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.5))' }} />
          <span style={{ color: 'rgba(251,191,36,0.5)', fontSize: '0.6rem', letterSpacing: '0.4em' }}>✦ ✦ ✦</span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.5))' }} />
        </div>

        <h2 className="cosmic-title mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', lineHeight: 1.1 }}>
          What is ASra?
        </h2>

        <div className="flex items-center justify-center gap-4 mt-5">
          <div className="h-px w-32" style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.3))' }} />
          <span className="font-cinzel text-xs uppercase tracking-[0.35em]" style={{ color: 'rgba(251,191,36,0.35)' }}>
            Umma New Century Organization
          </span>
          <div className="h-px w-32" style={{ background: 'linear-gradient(to left, transparent, rgba(251,191,36,0.3))' }} />
        </div>
      </motion.div>

      {/* Overview text */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="text-center text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-16 font-light"
      >
        The Umma New Century Organization is a <span style={{ color: '#fbbf24' }}>dual-domain organization</span> spanning
        both the Spirit Realm and the physical world — uniting human ambassadors on Earth with Master
        Spirit administrators in the ethereal realm.
      </motion.p>

      {/* Two domain cards */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-14">
        {/* ASra card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="backdrop-blur-xl p-9 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: 'rgba(15,23,42,0.68)',
            border: '1px solid rgba(251,191,36,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(251,191,36,0.15)'; }}
        >
          <div className="h-px mb-7" style={{ background: 'linear-gradient(to right, rgba(251,191,36,0.5), transparent)' }} />
          <span className="font-cinzel font-bold text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5 inline-block" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', color: '#fbbf24' }}>
            Physical World
          </span>
          <h3 className="font-cinzel text-xl text-white mb-1 mt-3 tracking-wide">ASra</h3>
          <p className="font-cinzel text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(251,191,36,0.5)' }}>
            Association of Spirit Realm's Ambassador
          </p>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            Tens of thousands of human members distributed across all nations, ethnicities, and cultural
            communities worldwide. Empowered by Master Spirits, each member governs attached spirits and
            improves human health.
          </p>
        </motion.div>

        {/* SMSC card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="backdrop-blur-xl p-9 rounded-2xl shadow-2xl transition-all duration-300"
          style={{
            background: 'rgba(15,23,42,0.68)',
            border: '1px solid rgba(167,139,250,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.35)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,139,250,0.15)'; }}
        >
          <div className="h-px mb-7" style={{ background: 'linear-gradient(to right, rgba(167,139,250,0.5), transparent)' }} />
          <span className="font-cinzel font-bold text-xs tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-5 inline-block" style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.3)', color: '#a78bfa' }}>
            Spirit Realm
          </span>
          <h3 className="font-cinzel text-xl text-white mb-1 mt-3 tracking-wide">SMSC</h3>
          <p className="font-cinzel text-xs uppercase tracking-widest mb-5" style={{ color: 'rgba(167,139,250,0.5)' }}>
            Society of Master Spirit Controllers
          </p>
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            Tens of thousands of Master Spirits — administrators in the Spirit Realm who govern ordinary
            spirits and human beings. Each Master Spirit is assigned 1:1 or 2:1 to an ASra human member.
          </p>
        </motion.div>
      </div>

      {/* Learn more CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <Link
          to="/about"
          className="inline-block font-cinzel font-bold uppercase tracking-widest text-sm py-3.5 px-10 rounded-full transition-all hover:-translate-y-1"
          style={{ border: '1px solid rgba(251,191,36,0.35)', color: '#fbbf24', background: 'rgba(251,191,36,0.05)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(251,191,36,0.05)'; }}
        >
          ✦ &nbsp; Full Organization Introduction &nbsp; ✦
        </Link>
      </motion.div>
    </section>
  );
};

export default Introduction;
